# Optimization Guide — 10,000 Students Scale

**Status:** Guidance only. No code has been changed for this document.  
**Date:** 16 September 2026  
**Scope:** API (`BACELAR_ApiNode`), Admin (`bacelar_Admin`), Student website (`BACELAR_Website-Development`)

This document records **what is not ready for ~10,000 students**, **why it will break**, **what is already fine**, and **in what order to optimize**. Use it as a implementation checklist later. Do not treat it as a license to rewrite unrelated features.

---

## 1. Short verdict

The system is **not optimized for 10,000 students**.

| Load | Expected behaviour |
|------|--------------------|
| 200–500 students | Works. Slow pages are not obvious. |
| ~2,000 students | Admin lists become heavy. Generate / exam-details lag. |
| ~10,000 students | Admin student list, roll generate, enrollment number, exam-details, and bulk PDF will fail or hang. |

**One-student flows are fine.** Login, profile, exam form, Razorpay payment, and a single exam-form / fee-receipt PDF only load that student’s data. Those do not need to be rewritten for scale.

The failure pattern is the same almost everywhere:

1. API does `findMany` with **no `take` / `skip`**.
2. Nested `include` hydrates 6–9 relations for every row.
3. Payload goes TCP (microservice → gateway) then HTTP (gateway → browser).
4. Browser filters, sorts, joins, and paginates in React.

At 10k rows this is tens of megabytes of JSON, a blocked TCP socket, and a frozen UI.

---

## 2. Architecture reminder (why lists hurt more here)

```text
Browser  →  HTTP  →  apps/backend (gateway)
                         │
                         │  TCP (one ClientProxy / socket)
                         ▼
                   student-service / exam-result-service
                         │
                         ▼
                   Prisma  →  MariaDB / MySQL
```

- There is **no pagination contract** on list APIs.
- There is **no cache** (no Redis, no in-memory master-data cache).
- Heavy list responses share the **same TCP connection** as login and payment. One 40 MB `findAll` can stall other students.

---

## 3. What is already reasonably OK (do not rewrite)

These paths scale with **one student**, not with total college size. Leave them unless a real bug appears.

| Area | Why it is OK |
|------|----------------|
| `findOne` / login / `findByStudent` / payment by order id | Indexed unique keys. Cost does not grow with 10k students. |
| Student exam-form PDF, fee receipt, registration PDF | One document, one student, on demand. |
| Wizard `localStorage` | Small flags only (step, student id). No file blobs. |
| Attachment upload | Size cap (10 MB / 25 MB). S3 via `STORAGE_PROVIDER` is supported. |
| Razorpay create / verify | Reuses SUCCESS / PENDING instead of duplicating payments. |
| Newer table indexes | `StudentExam`, `StudentExamPaper`, `StudentRollNumber`, `ExamResult`, `ExamAttendance` already have useful indexes and unique constraints. |
| Exam-result tabulation | Bounded by program + category. Uses `Map` grouping (good pattern). |
| Promotion search / save | Selects needed columns, batches with `in: [...]`, writes in `$transaction`. **Internal reference for other fixes.** |
| Two existing caps | Grievance list `take: 500`. Attendance last fallback `take: 50`. |

---

## 4. What must be optimized, and why

Priority: **P0** before a large cohort, **P1** while traffic grows, **P2** architecture.

---

### P0-1. Admin student list — one HTTP call per student

**Where**

- `bacelar_Admin/src/app/students/page.tsx` → `fetchAll()`
- After loading all students it does `Promise.all` → `studentProfileService.getByStudentId(id)` for **every** row.

**What happens at 10k**

- 10,000 extra HTTP requests from one browser tab (on top of students + payments + enrollments + fee configs).
- Browser allows ~6 connections per origin; the rest queue.
- Each call is Next → gateway → TCP → Prisma → MySQL.
- Result: multi-minute load, connection-pool exhaustion, hung tab.

**Why optimize**

This is the single largest waste. Profile fields needed on the grid should arrive **with the list**, or via **one batch API** (`ids[]`). One round trip instead of 10,000.

**What “done” looks like**

- Opening Students does **not** fan out per-row HTTP.
- List payload includes photo / profile fields the grid actually shows.

---

### P0-2. Unbounded `findAll` on students (and similar lists)

**Where**

- `apps/student-service/src/students/students.service.ts` → `findAll()`
- Same pattern: enrollments, payments, attachments, roll-number list, admit-card list, admin exam-details `fetchAll`.

**What happens at 10k**

- `student.findMany` with 6 includes (`loginMaster`, `program`+category, academic session, admission session, year, semester) and **no `take`**.
- Prisma turns includes into extra `IN (...)` queries.
- `orderBy: CreatedOn` has **no index** → MySQL filesort on the whole table.
- ~30–60 MB JSON, serialized twice (TCP then HTTP).
- Consumed by multiple admin pages.

**Why optimize**

You never need 10,000 full student graphs in the browser. You need **page 1 of 50**, for the current session/program, with a `total` count.

**What “done” looks like**

Shared list envelope, used everywhere:

```text
{ items, page, pageSize, total }
```

Apply to: students, enrollments, payments, attachments, roll-number list, admit-card list.

---

### P0-3. Filters run in JavaScript after loading everything

**Where (examples)**

- Roll-number `loadEnrollments()` — `programCategoryId` and search applied in JS after fetch.
- Admit-card `list()` — session, exam type, search filtered in JS.
- Exam login dashboard — exam type filtered in JS after `examinationDetails.findMany` with no program/session filter.
- Admin pages — `useMemo` filters on the full array.

**What happens at 10k**

Search for **one** student still hydrates every enrollment in the session. Pagination on the client is fake: you still paid for the full table.

**Why optimize**

SQL `WHERE` + index makes pagination **correct**. Client filter + `slice` is only correct if the dataset is tiny.

**What “done” looks like**

Search, `academicSessionId`, `programId`, category, exam type, payment status live in Prisma `where`. UI only renders the page it received.

---

### P0-4. Enrollment number generation scans the whole table

**Where**

- `apps/student-service/src/students/student-enrollment/student-enrollment.service.ts` → `nextEnrollmentNo()`
- Called from `confirm()`, with up to **8 retries** on unique collision.

**What happens at 10k**

- `findMany({ select: { enrollmentNo: true } })` with **no `where`**.
- Max serial computed with a regex in JavaScript.
- One confirmation can scan the table 8 times.
- Concurrent confirmations race on the same next serial; retry is the only safety.

**Why it was written this way**

A `startsWith` filter was removed because of a MariaDB collation error. The next design must stay collation-safe (prefix/`MAX()` on an indexed column, or a counter table — not `LIKE` on a mixed collation).

**Why optimize**

Admission rush = many confirms at once. Full-table scan + race becomes a throughput collapse and duplicate-serial retries.

**What “done” looks like**

- Next serial from a **bounded** query (`MAX` on indexed prefix) or a **counter / sequence** row.
- Uniqueness enforced in the database.
- Retry is rare, not the main mechanism.

---

### P0-5. Roll-number list + generate

**Where**

- `apps/student-service/src/students/student-roll-number/student-roll-number.service.ts`
- `loadEnrollments()`, `list()`, `generate()`, `nextSerial()`, `findRoll()`

**What happens at 10k**

- Deep include tree (~9 relations) for every enrollment.
- Category + search still filtered in JS (see P0-3).
- `generate()` calls `nextSerial()` per program group (another unbounded `findMany` on `studentRollNumber`) plus a full read for `usedRolls`.
- Assignment is `create()` in a nested loop, **no transaction** → mid-run failure leaves half the batch generated.
- `findRoll()` can scan the roll map per student (O(n²) on misses).

**Why optimize**

Generate is an admin burst operation. 10k sequential inserts without a transaction is slow and unsafe. Listing the generate screen should not hydrate every enrollment graph.

**What “done” looks like**

- List is paginated and filtered in SQL.
- Next serial is bounded (same idea as enrollment numbers).
- `createMany` (or batched creates) inside a transaction.
- Joins via `Map`, not linear `find` per student.

---

### P0-6. Exam Details admin page — whole DB in the browser

**Where**

- `bacelar_Admin/src/app/exam-details/page.tsx` → `fetchAll()`
- `bacelar_Admin/src/utils/examDetails.ts` → `buildExamDetailsRows`, `pickExamPayment`

**What happens at 10k**

- Loads examinations, categories, programs, years, semesters, paper details, **all students, all enrollments, all payments**, fee configs.
- For each enrollment, `pickExamPayment` does `.filter` over **all payments**.
- Example: 10k enrollments × 20k payments ≈ **200 million** string comparisons on the UI thread, inside `useMemo` that re-runs on every filter change.
- Same O(n²) join pattern: `pickPayment` / `pickEnrollment` on `students/page.tsx`.

**Why optimize**

This is not a rendering problem first — it is a **data-shape** problem. The grid should receive rows already joined on the server (or built with `Map` after a **paged** fetch).

**What “done” looks like**

- Server (or a dedicated exam-details API) returns paged rows: student + enrollment + latest exam payment.
- Client `Map` by `studentId` if a join is still needed.
- Sticky columns and UI stay as they are; only the data path changes.

---

### P0-7. Missing indexes on old hot tables

**Where**

- `prisma/schema.prisma` — `Student`, `StudentPayment`, `StudentAttachment`

**What is missing**

| Table | Used as | Missing index (typical) |
|-------|---------|-------------------------|
| `Student` | every list `where` | `IsDeleted` |
| `Student` | `findAll` order | `CreatedOn` |
| `Student` | registration / availability | `mobileNo` |
| `Student` | common filter | composite `(IsDeleted, academicSessionId, programId)` |
| `StudentPayment` | payment lookup | composite `(studentId, feeType, paymentStatus)` |
| `StudentAttachment` | profile + exam form | composite `(studentId, documentType)` — table has **no indexes at all** besides what FK auto-creates |

**Why optimize**

Without indexes, “list students for this session” is a table scan + filesort on every admin click and many student reads (attachments on every profile / exam form).

**What “done” looks like**

- Indexes added via Prisma migrate / SQL.
- Verified with `EXPLAIN` on a **seeded 10k** dataset, not by reading the schema.

---

### P0-8. Bulk admit-card / ID-card PDF in the browser

**Where**

- `bacelar_Admin/src/utils/exportAdmitCardPdf.ts`
- `bacelar_Admin/src/utils/exportStudentIdCardPdf.ts`

**What happens at 10k**

- For every row: image fetches + `html2canvas` at scale 2 + JPEG into one `jsPDF`.
- ~200 KB × 10k ≈ **~2 GB** retained in the tab, plus 10k main-thread rasterizations.
- Export uses the filtered set with **no cap**. One unfiltered click crashes the tab.

**Why optimize**

This work does not belong in the browser. Single-student PDFs (exam form, receipt) stay as they are.

**What “done” looks like**

- Hard batch limit (e.g. 100–200).
- Export disabled until a real filter is chosen (session + program).
- Later: server job / stream, not `html2canvas` in a tab.

---

### P1-1. Admit-card list — in-memory cross join

**Where**

- `apps/student-service/src/students/exam-admit-card/exam-admit-card.service.ts` → `list()`

**Why**

Loads enrollments (deep include), all rolls, all student exams (`examInclude()` even pulls **all** `studentAttachments`). Then `rows.find(...)` per exam (linear scan). Session / exam type / search filtered in JS. Extra `schemePaperMap` query per unique exam-program-year-sem key.

**Optimize by**

SQL filters, `select` only needed fields, `Map` joins, do not attach every document on a list row.

---

### P1-2. Exam dashboard GET writes to the database

**Where**

- `apps/student-service/src/students/exam-login/exam-login.service.ts` → `getDashboardData()`

**Why this is dangerous at exam-form week**

- Highest-concurrency **student** endpoint.
- ~10–14 sequential queries per request (`loadStudentFull` alone has a large include tree).
- If no exam-login row exists, GET calls `createPassword()` (upsert + enrollment update).
- Read traffic takes write locks. Concurrent tabs for the same student race on upsert.
- `replaceSelectedPapers()` does per-paper `update`/`create`, no transaction.

**Optimize by**

- GET is **read-only**.
- Provision password / draft on an explicit POST (or first login).
- Collapse sequential queries; wrap paper replace in a transaction / `createMany`.

---

### P1-3. Attendance student list — four unfiltered fallbacks

**Where**

- `apps/student-service/src/students/student-attendance/student-attendance.service.ts` → `getPaperDetailsAndStudents()`

**Why**

Level 1: `OR` across `programId` / `student.programId` / `enrollment.programId` (hard for MySQL to index). Levels 2–3 repeat on enrollment and exam. Level 4 loads all students for a program. Most levels **do not filter session/year**, so one sheet can pull every historical enrollment in that program.

**Optimize by**

One indexed query: session + program + year + exam (and paper). Fallbacks hide missing data with unbounded scans.

---

### P1-4. No cache for master data

**Where**

Every admin page mount: programs, categories, years, semesters, sessions, papers, fee configs.

**Why**

Master data almost never changes during a session. Refetching it on every screen multiplies DB load for no benefit. There is no `CacheModule`, Redis, or HTTP cache headers today.

**Optimize by**

- Short TTL in-memory cache on the gateway (5–10 minutes).
- HTTP cache headers for masters.
- Redis later if you run more than one Node instance.

---

### P1-5. Registration number generation — count then probe

**Where**

- `apps/student-service/src/students/students.service.ts` → `generateRegistrationNumber()`

**Why**

Counts students since April cycle start (`CreatedOn` unindexed → scan), sets `serial = count + 1`, then `findUnique` in a loop until free. Concurrent registrations compute the same count and walk forward one query at a time. `checkAvailability` / `create` also `findFirst` on unindexed `mobileNo`.

**Optimize by**

Same as enrollment/roll: sequence or `MAX` + unique constraint. Index `mobileNo`.

---

### P1-6. Other unbounded lists (lower blast radius, same bug)

| Location | Issue |
|----------|--------|
| `student-payment.service.ts` `findAll()` | Unbounded + nested includes |
| `resolveFeeTypeId()` | Loads all fee types, matches in JS, every payment |
| `resolveAdmissionSessionIdForFee()` | Loads all admission sessions |
| `student-attachment.service.ts` `findAll()` | Embeds full student on every attachment |
| Admin `enrollment/page.tsx` `fetchAll()` | 9-relation include tree, no page |

Same fix: paginate, filter in SQL, `select` slim fields.

---

### P2-1. TCP head-of-line blocking

**Where**

- `apps/backend` — one `ClientProxy` (`Transport.TCP`) for student-service.

**Why**

Nest multiplexes on one socket. A huge `find_all_students` response blocks login and payment callbacks until it finishes.

**Optimize by (decide, don’t guess)**

- Separate `ClientProxy` / connections for heavy lists vs interactive calls, or
- Connection pool, or
- Heavy **reads** on gateway Prisma; microservice keeps writes.

Do this after pagination, or the payload is still huge.

---

### P2-2. Batch writes and transactions

**Where**

Roll-number `create` loop, `replaceSelectedPapers`, attendance detail rewrite.

**Why**

Speed, and **correctness**: a crash mid-loop leaves partial generate / partial paper selection.

**Optimize by**

`createMany` / `updateMany` inside `$transaction`.

---

### P2-3. Observability

**Why**

Without slow-query logs and pool metrics you will argue about which of the above dominates. Prisma query logging (threshold) + connection-pool metrics + a 10k seed + load test (admin list, roll generate, exam-form week, payment).

Browser profiling matters as much as backend timing, because much work sits in `useMemo`.

---

## 5. Recommended implementation order

Do **not** start with Redis, microservices split, or rewriting exam-form PDF.

### Phase A — before onboarding a large cohort (P0)

1. Stop per-student HTTP on admin student list (batch or include profile).
2. Add pagination contract (`items`, `page`, `pageSize`, `total`) on all student-scale lists.
3. Move search/filters into `where`.
4. Replace enrollment + roll serial generators (bounded `MAX` or counter table; keep MariaDB collation in mind).
5. Add missing indexes; `EXPLAIN` on 10k seed.
6. Cap bulk PDF; require filters.

### Phase B — during ramp / before exam-form window (P1)

7. Slim `include` / `select`; drop attachments from list APIs.
8. Make `getDashboardData` read-only.
9. Cache master data.
10. One bounded attendance query.
11. Replace O(n²) `.filter` joins with `Map` (students, exam-details, admit-card, `findRoll`).

### Phase C — architecture (P2)

12. TCP / list-read topology.
13. Batch writes + transactions.
14. Slow query + pool metrics.
15. 10k seed + load test of the real flows above.

---

## 6. Rule of thumb (for every new screen)

**Never:** “load all students, then filter in the UI.”  
**Always:** “this academic session + this program, page size 50, page N.”

If a feature needs “all students” (e.g. generate roll numbers for a year), it is a **server job with a transaction**, not a browser `findMany`.

---

## 7. What we will not touch as part of this work

Unless a later ticket says otherwise:

- Exam-form PDF layout (college header, signature, NAAC spacing).
- Wizard resume / payment lock behaviour.
- Single-student PDF download (`html2canvas` + jsPDF for one form is acceptable).
- Unrelated master CRUD and website CMS.

Optimize **lists, generate APIs, indexes, exam-week GET, bulk export**. Keep feature behaviour the same.

---

## 8. Suggested later tickets (when coding starts)

Use one PR per item so review stays small:

1. Student list: remove N+1 profile fetches + paginated `findAll`.
2. Enrollment + payment + attachment list pagination.
3. Serial generation (enrollment no + roll no + registration no).
4. Prisma indexes + SQL migrate.
5. Exam-details / exam-details join API (or Map + paged data).
6. Bulk PDF cap.
7. Exam dashboard GET read-only.
8. Master-data cache.
9. Admit-card / attendance query slimming.
10. Load-test script + 10k seed.

---

## 9. Success criteria (how we know it worked)

| Check | Target at 10k students |
|-------|------------------------|
| Admin Students first page | One (or few) HTTP calls, not 10k. Loads in a few seconds. |
| List APIs | Always `take`/`skip` (or cursor) + `total`. No unbounded `findMany` on student-scale tables. |
| Search / session / program filter | Applied in SQL. Changing page does not reload the whole college. |
| Confirm enrollment / generate roll | No full-table read of all enrollmentNos / all rolls. |
| Exam Details | No O(n²) payment scan on the UI thread. |
| Exam-form week | Dashboard GET does not create rows. |
| Bulk PDF | Cannot run on unfiltered 10k; batch limit enforced. |
| EXPLAIN | List/filter queries use indexes, not full table scan + filesort. |

---

*This file is a planning document only. Implementation should follow Phase A first, one ticket at a time, without changing unrelated behaviour.*
