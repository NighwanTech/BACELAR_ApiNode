# What was optimized

This note explains the speed changes made for the admin lists and for about 1,000 requests at once. It says which file holds the code and what that code does.

Two projects were changed:

- API: `BACELAR_ApiNode`
- Admin: `bacelar_Admin`

Redis was not added. The cache lives in the memory of the student-service process.

---

## The rule that keeps old screens working

If a list API is called **without** `page`, it still returns the old full array.

If it is called **with** `page`, it returns:

```json
{ "items": [], "page": 1, "pageSize": 10, "total": 52 }
```

`pageSize` is capped at 100 (admit-card download uses up to 200).

So academic screens that still call `getAll()` keep working. The admin pages listed below send `page` and only draw that page.

---

## 1. Database connection pool

**File:** `libs/prisma/src/prisma.service.ts`

**What changed:** `connectionLimit` is `15` for each process.

Three processes use this pool: backend, student-service, and exam-result-service. That is about 45 connections. The database user is allowed 75, so 15 per process stays inside that limit.

A request waits up to 30 seconds for a free connection (`acquireTimeout: 30000`). After that it fails. This is why 1,000 heavy requests used to time out when only 2 connections existed.

Seed scripts in `prisma/seed.ts` still use limit 2. They are not the running API.

---

## 2. Master-list cache (not Redis)

**File:** `apps/student-service/src/master/master-cache.ts`

Two maps:

- `hits` stores the list and the time it was saved. It is reused for 60 seconds (`TTL_MS = 60_000`).
- `pending` stores the database call that is already running. If 1,000 requests ask for the same list at the same moment, only one query runs. The other 999 wait for that same result. This is called single-flight.

`clearMasterCache(prefix)` deletes those entries as soon as someone saves.

**Who uses it**

| List | Read | Cleared on save in |
|---|---|---|
| Academic session, including the current session | `academic-session.service.ts` `findAll`, `findCurrent` | `create`, `update`, `updateStatus`, `softDelete` |
| Program | `program.service.ts` `findAll` | `create`, `update`, `updateStatus`, `softDelete`, `bulkSoftDelete` |
| Year | `year.service.ts` `findAll` | `create`, `update`, `softDelete` |
| Semester | `semester.service.ts` `findAll` | `create`, `update`, `softDelete` |

Student rows, payments, and exam forms are not stored in this cache. Those must come from the database every time so a new admission or payment shows up immediately.

The cache disappears when student-service restarts. It is not shared with a second copy of the process. That is why Redis was not added: one process and four small lists do not need it.

---

## 3. Student registration list

**API**

- `apps/student-service/src/students/students.service.ts` — `findPage`
- `apps/student-service/src/students/students.controller.ts` — if `page` is set, call `findPage`, otherwise the old `findAll`
- `apps/backend/src/students/students.controller.ts` — `GET /students` forwards `page`, `pageSize`, search, session, program, category, payment status, dates, sort, and `source`

**What `findPage` does**

- Filters in SQL: not deleted, program, academic session, category, payment status, created-on dates, and search (name, father, registration number, mobile, email, profile, enrollment number).
- `source=ADMIN` is used only by the admin registration screen.
- Sorts name, father, registration number, mobile, or email. Any other column falls back to newest first.
- Returns 10 to 100 rows, plus `total`.
- The row still includes the fields the grid shows: profile (mother, father mobile, aadhaar, APAAR, date of birth, gender), program and category, both sessions, year, semester, up to 8 payments, up to 3 enrollments, and `loginPasswordPlain`.
- Password hash is not selected on this list.

**Same request, one query**

At the top of `students.service.ts`:

```ts
const studentPageInflight = new Map<string, Promise<any>>();
```

`findPage` builds a key from the page, filters, and sort. If that exact call is already running, the new request waits for it. The result is not kept after the call finishes, so the next click reads the database again.

**Admin**

- `bacelar_Admin/src/services/students/studentService.ts` — `getPage`
- `bacelar_Admin/src/app/students/page.tsx` — loads the current page (250 ms after typing). Excel walks pages of 100 so the file is the full filtered set, not only the 10 rows on screen.
- `bacelar_Admin/src/app/students/register/page.tsx` — `getPage` with `source: "ADMIN"`. Excel still exports every admin registration.

Checked: `GET /students?page=1&pageSize=10` returns total 52. `source=ADMIN` returns total 3.

---

## 4. Enroll student list

**API**

- `apps/student-service/src/students/student-enrollment/student-enrollment.service.ts` — `findPage`
- `apps/student-service/src/students/student-enrollment/student-enrollment.controller.ts`
- `apps/backend/src/students/student-enrollment/student-enrollment.controller.ts` — `GET /students-enrollments`

**What it filters:** session (enrollment session or the student’s academic session), program, category, year, semester, and search.

**Sort:** student name, enrollment number, registration number, father name. Default is student name A–Z. Other column headers do not reorder the full set.

**Admin:** `bacelar_Admin/src/services/students/studentEnrollmentService.ts` `getPage`, and `bacelar_Admin/src/app/enrollment/page.tsx`. Excel walks pages of 100.

Checked: page 1, size 10, total 24.

---

## 5. Exam Details

**API**

- `findExamDetailsPage` in `student-enrollment.service.ts`
- Route `GET /students-enrollments/exam-details` in the backend enrollment controller. This route is registered before `GET :id`, so the word `exam-details` is not treated as an id.
- Message `find_exam_details_page` in the student-service enrollment controller.

**What it does**

- Loads a light list of enrollments, keeps the latest enrollment per student, then keeps only the current page’s full rows.
- `filled=true` means the student has an exam-fee payment. `filled=false` is the “not filled” Excel.
- A “BACK PAPER” filter returns an empty page. The old screen marked every row as REGULAR, and that behaviour was left as it is.
- Excel in `bacelar_Admin/src/app/exam-details/page.tsx` calls `studentEnrollmentService.getExamDetailsPage` in a loop of 100.

The grid no longer downloads every student, every enrollment, and every payment into the browser.

---

## 6. Roll numbers

**List**

- `listPage` in `apps/student-service/src/students/student-roll-number/student-roll-number.service.ts`
- `GET /students-roll-numbers` forwards `page`, `pageSize`, `sortKey`, `sortDir`, and `rollStatus`
- Admin: `bacelar_Admin/src/app/generate-roll-number/page.tsx` and `studentRollNumberService.list`

`rollStatus=generated` keeps only students who already have a roll number. Search and category run in SQL.

**Generate**

`loadForGenerate` in the same service reads only enrollment id, student id, names, session ids, and program code. It does not load profile, year, semester, or attachments.

Generate still assigns a roll to every matching student, not only the visible page. The number format and the A–Z order (student name, then father name) are unchanged. Each new roll is still one insert.

Checked: page 1, size 5, total 24.

---

## 7. Admit card

**API:** `listPage` in `apps/student-service/src/students/exam-admit-card/exam-admit-card.service.ts`

When `page` is sent, only enrollments that already have a roll number are counted and paged. Exams and photos are loaded for that page only.

When `page` is omitted, the old full `list()` still runs.

**Admin:** `bacelar_Admin/src/app/admit-card/page.tsx`

The “download all” button asks for one page of 200. If `total` is above 200, it shows the existing message: download at most 200 at a time.

Checked: page 1, size 5, total 17.

---

## 8. Fee / payments

**API:** `findPage` in `apps/student-service/src/students/student-payment/student-payment.service.ts`

`GET /students-payments` without `page` is still the full array. With `page` it returns the page plus:

- `total`
- `totalAmount` (sum of the filtered rows, not only the rows on screen)
- `successCount`
- `pendingCount`

Filters match the fee screen: status, year, semester, fee type, program, category, academic session (id or the same session name), dates, and search.

**Admin:** `bacelar_Admin/src/services/students/studentPaymentService.ts` `getPage`, and `bacelar_Admin/src/app/fee-management/page.tsx`.

Checked: page 1, size 5, total 44.

---

## 9. Attendance Days

**Admin only:** `bacelar_Admin/src/app/academic-days/page.tsx`

Opening the page no longer calls `studentService.getAll()` or `studentEnrollmentService.getAll()`.

When a program is selected, `handleFetchStudents` loads that program’s enrollments with `studentEnrollmentService.getPage` in pages of 100, then applies the same session, year, and semester checks as before. Save and the PDF still use the selected filters.

The saved-attendance table on that page still loads attendance records through `attendanceDaysService.getAll()`. That list was not paged.

---

## 10. Indexes

These indexes were added on the live database and in `prisma/schema.prisma`:

- `students` on `(IsDeleted, CreatedOn)`, `(mobileNo)`, and `(IsDeleted, academicSessionId, programId)`
- `studentPayments` on `(studentId, feeType, paymentStatus)`
- `studentAttachments` on `(studentId, documentType)`

---

## 11. Load test that was run

1,000 requests were sent at the same time to the local API (`localhost:5001`).

| Call | Before | After |
|---|---|---|
| `GET /master/programs` | 1,000 succeeded, half took about 24 seconds | 1,000 succeeded, half took 151 ms |
| `GET /students?page=1&pageSize=10` | 41 succeeded, 959 timed out at 30 seconds | 1,000 succeeded, half took 1.1 seconds |

This test asks for the **same** list 1,000 times. It does not mean 1,000 different pages, logins, or payments at once.

---

## What was not changed

- Exam dashboard GET can still create an exam password when one is missing. Making that read-only would stop that existing behaviour.
- Login, one exam form, one payment, and one PDF were not rewritten.
- No Redis, no second database, no 10,000 fake students inserted.
- Roll generate still writes one row at a time, in the same order.
- Attendance saved-records, and any screen that calls `getAll()` without `page`, still receive the full list.
