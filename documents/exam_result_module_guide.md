# Exam Result Module — Developer Guide

This document explains the **Exam Result** feature in simple, step-by-step language.  
It covers architecture, folder layout, how to run the services, and every HTTP API you can call.

---

## 1. What is this module?

Exam Result stores **one row per student + paper** for a given exam context (session, examination, program, year, semester, etc.).

Typical use cases:

- Enter / update marks for a student paper
- List results with filters (program, semester, roll no, etc.)
- View all papers for one student
- Soft-delete wrong entries (single or bulk)
- Activate / deactivate a result row

---

## 2. Architecture (same pattern as Master / Students)

This project uses an **API Gateway + Microservice** pattern.

| Layer | App | Role |
|-------|-----|------|
| HTTP Gateway | `apps/backend` | REST APIs, Swagger, DTO validation. **No direct DB access.** |
| Microservice | `apps/exam-result-service` | Business logic + Prisma → MySQL. Listens on **TCP**. |
| Shared DB | `libs/prisma` + `prisma/schema.prisma` | One database schema for the whole monorepo |

### Request flow

```text
Client (Postman / Frontend)
    │
    │  HTTP  POST /api/v1/exam-results
    ▼
backend (ExamResultController)
    │  validates CreateExamResultDto
    │  ClientProxy.send({ cmd: 'create_exam_result' }, body)
    ▼
TCP  →  EXAM_RESULT_TCP_PORT (default 4002)
    │
    ▼
exam-result-service (@MessagePattern)
    │  ExamResultService.create()
    │  snapshot student + masters from DB
    ▼
Prisma → table `examResult`
    │
    ▼
Response back over TCP → HTTP JSON to client
```

> **Important:** Backend alone is not enough.  
> You must run **backend + exam-result-service** together (and usually student-service too for other modules).

---

## 3. Folder structure

```text
BACELAR_ApiNode/
├── apps/
│   ├── backend/src/exam-result/          # HTTP gateway for exam results
│   │   ├── exam-result.controller.ts     # REST routes → TCP cmds
│   │   ├── exam-result.module.ts         # ClientsModule → EXAM_RESULT_SERVICE
│   │   └── dto/
│   │       ├── create-exam-result.dto.ts
│   │       ├── update-exam-result.dto.ts
│   │       └── bulk-delete-exam-results.dto.ts
│   │
│   └── exam-result-service/              # Microservice (DB + logic)
│       ├── src/
│       │   ├── main.ts                   # TCP bootstrap (port 4002)
│       │   ├── exam-result-service.module.ts
│       │   ├── common/active-only.ts
│       │   └── exam-result/
│       │       ├── exam-result.controller.ts   # @MessagePattern handlers
│       │       ├── exam-result.service.ts      # Prisma + business rules
│       │       └── exam-result.module.ts
│       ├── tsconfig.app.json
│       └── tsconfig.json
│
├── prisma/schema.prisma                  # model ExamResult → table examResult
└── documents/exam_result_module_guide.md # this file
```

---

## 4. How it was built (step by step)

Use this checklist when you add the **next** exam-result–related feature.

### Step 1 — Database

1. Add / update model in `prisma/schema.prisma` (`ExamResult`).
2. Run migrate / generate as per project practice:
   ```bash
   npm run prisma:generate
   # and migrate if needed
   npm run prisma:migrate
   ```

### Step 2 — Microservice (business logic)

1. Create folder under `apps/exam-result-service/src/...`
2. Add:
   - `*.service.ts` → Prisma CRUD, snapshots, soft delete
   - `*.controller.ts` → `@MessagePattern({ cmd: '...' })`
   - `*.module.ts` → register controller + service
3. Import the module in `exam-result-service.module.ts`
4. Ensure `main.ts` listens on `EXAM_RESULT_TCP_PORT`

### Step 3 — Backend gateway (public API)

1. Create folder under `apps/backend/src/exam-result/`
2. Add:
   - DTOs with `class-validator` + Swagger `@ApiProperty`
   - Controller with `@Controller('exam-results')` and `ClientProxy.send(...)`
   - Module with `ClientsModule.register([{ name: 'EXAM_RESULT_SERVICE', ... }])`
3. Import module in `apps/backend/src/app.module.ts`

### Step 4 — Wire TCP command names

Gateway `cmd` and microservice `@MessagePattern` **must match exactly**.

| HTTP action | TCP `cmd` |
|-------------|-----------|
| Create | `create_exam_result` |
| List all | `find_all_exam_results` |
| Get one | `find_one_exam_result` |
| By student | `find_exam_results_by_student` |
| Update | `update_exam_result` |
| Update status | `update_status_exam_result` |
| Soft delete | `delete_exam_result` |
| Bulk soft delete | `bulk_delete_exam_results` |

### Step 5 — Run and test

1. Start services (see Section 5).
2. Open Swagger: `http://localhost:3000/api-docs` (port from `.env` `PORT`).
3. Call APIs from Postman / Swagger (Section 7).

---

## 5. How to run

### Environment (`.env`)

```env
PORT=3000
TCP_PORT=4001
EXAM_RESULT_TCP_PORT=4002
DATABASE_URL=...
```

| Variable | Used by | Meaning |
|----------|---------|---------|
| `PORT` | backend | HTTP port for REST + Swagger |
| `TCP_PORT` | student-service | Existing student/master microservice |
| `EXAM_RESULT_TCP_PORT` | exam-result-service + backend client | Exam result TCP port |

### Start commands

```bash
# Exam result microservice only
npm run start:exam-result

# Backend gateway only
npm run start:backend

# All apps together (recommended for full testing)
npm run start:dev:all
```

### Swagger

After backend is up:

- Docs UI: `http://localhost:3000/api-docs`
- Tag: **Exam Results**

Base URL for all REST calls below:

```text
http://localhost:3000/api/v1
```

---

## 6. Business rules (important)

### Required on create

- `studentId` (StudentRegistrationId) — **required**
- `CreatedBy` — **required**

Other fields are optional in the DTO. The service **auto-fills** names/max marks from masters and student tables when you pass IDs (`paperId`, `programId`, `academicSessionId`, etc.).

### Snapshot behaviour

On create/update, the service may copy:

- Student: name, father/mother, enrolment, roll, contact, etc.
- Masters: session name, examination name, program, year, semester, exam type, paper code / max marks

So historical result rows keep readable labels even if master names change later.

### Duplicate prevention

DB unique key (soft-deleted rows aside, service checks active rows):

```text
academicSessionId + examinationDetailId + programId + yearId + semId + paperId + studentId
```

Creating the same combination again returns a conflict-style error message.

### Soft delete

Delete does **not** remove the row permanently. It sets:

- `IsDeleted = true`
- `IsActive = false`
- `DeletedOn`, `DeletedBy`, `DeletedRemarks`

### `activeOnly` query flag

- Omit / false → list rows used like a master table (all non-deleted)
- `activeOnly=true` → only `IsActive = true` rows (useful for dropdowns)

### Microservice error shape

If the microservice catches an error, it often returns:

```json
{
  "status": "error",
  "message": "..."
}
```

The gateway currently forwards this as a normal HTTP body (may still be HTTP 200). Always check `status` / message in clients.

---

## 7. API reference

All routes are under:

```text
/api/v1/exam-results
```

Replace `BASE` with `http://localhost:3000/api/v1`.

---

### 7.1 Create exam result

| Item | Value |
|------|--------|
| Method | `POST` |
| URL | `/exam-results` |
| Body | JSON (`CreateExamResultDto`) |

**Minimal example**

```http
POST {{BASE}}/exam-results
Content-Type: application/json

{
  "studentId": 1,
  "academicSessionId": 1,
  "examinationDetailId": 1,
  "programId": 1,
  "yearId": 1,
  "semId": 1,
  "examTypeId": 1,
  "paperId": 1,
  "theoryExternalObt": 42,
  "sessionalInternalObt": 18,
  "practicalObt": 20,
  "totalMarks": 80,
  "percentage": 80,
  "grade": "A",
  "result": "PASS",
  "CreatedBy": "Admin User",
  "Remarks": "Entered after evaluation"
}
```

**cURL**

```bash
curl -X POST "http://localhost:3000/api/v1/exam-results" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "paperId": 1,
    "academicSessionId": 1,
    "examinationDetailId": 1,
    "programId": 1,
    "yearId": 1,
    "semId": 1,
    "theoryExternalObt": 42,
    "CreatedBy": "Admin User"
  }'
```

---

### 7.2 List exam results (with filters)

| Item | Value |
|------|--------|
| Method | `GET` |
| URL | `/exam-results` |

**Query params (all optional)**

| Param | Example | Description |
|-------|---------|-------------|
| `academicSessionId` | `1` | Filter by session |
| `examinationDetailId` | `1` | Filter by examination |
| `programId` | `1` | Filter by program |
| `programCategoryId` | `1` | Filter by category |
| `yearId` | `1` | Filter by year |
| `semId` | `1` | Filter by semester |
| `examTypeId` | `1` | Filter by exam type |
| `studentId` | `10` | Filter by student |
| `paperId` | `5` | Filter by paper |
| `enrolmentNo` | `ENR001` | Exact enrolment |
| `rollNo` | `26001001` | Exact roll |
| `activeOnly` | `true` | Only active rows |

**Example**

```http
GET {{BASE}}/exam-results?programId=1&semId=1&activeOnly=true
```

```bash
curl "http://localhost:3000/api/v1/exam-results?studentId=1&academicSessionId=1"
```

---

### 7.3 Get results by student

| Item | Value |
|------|--------|
| Method | `GET` |
| URL | `/exam-results/student/:studentId` |

**Optional query:** `academicSessionId`, `examinationDetailId`, `programId`, `yearId`, `semId`

```http
GET {{BASE}}/exam-results/student/1?semId=1
```

```bash
curl "http://localhost:3000/api/v1/exam-results/student/1?yearId=1&semId=1"
```

---

### 7.4 Get one by ID

| Item | Value |
|------|--------|
| Method | `GET` |
| URL | `/exam-results/:id` |

```http
GET {{BASE}}/exam-results/15
```

```bash
curl "http://localhost:3000/api/v1/exam-results/15"
```

---

### 7.5 Update exam result

| Item | Value |
|------|--------|
| Method | `PUT` |
| URL | `/exam-results/:id` |
| Body | JSON (`UpdateExamResultDto`) — **`UpdatedBy` required** |

```http
PUT {{BASE}}/exam-results/15
Content-Type: application/json

{
  "theoryExternalObt": 45,
  "totalMarks": 83,
  "percentage": 83,
  "grade": "A",
  "result": "PASS",
  "UpdatedBy": "Admin User",
  "Remarks": "Marks corrected"
}
```

```bash
curl -X PUT "http://localhost:3000/api/v1/exam-results/15" \
  -H "Content-Type: application/json" \
  -d '{
    "theoryExternalObt": 45,
    "UpdatedBy": "Admin User"
  }'
```

---

### 7.6 Update active / inactive status

| Item | Value |
|------|--------|
| Method | `PATCH` |
| URL | `/exam-results/:id/status` |

```http
PATCH {{BASE}}/exam-results/15/status
Content-Type: application/json

{
  "IsActive": false,
  "UpdatedBy": "Admin User"
}
```

```bash
curl -X PATCH "http://localhost:3000/api/v1/exam-results/15/status" \
  -H "Content-Type: application/json" \
  -d '{"IsActive": false, "UpdatedBy": "Admin User"}'
```

---

### 7.7 Soft delete one

| Item | Value |
|------|--------|
| Method | `DELETE` |
| URL | `/exam-results/:id` |
| Query | `DeletedBy` **required**, `DeletedRemarks` optional |

```http
DELETE {{BASE}}/exam-results/15?DeletedBy=Admin%20User&DeletedRemarks=Mistake%20entry
```

```bash
curl -X DELETE \
  "http://localhost:3000/api/v1/exam-results/15?DeletedBy=Admin%20User&DeletedRemarks=Mistake%20entry"
```

---

### 7.8 Bulk soft delete

| Item | Value |
|------|--------|
| Method | `POST` |
| URL | `/exam-results/bulk-delete` |

```http
POST {{BASE}}/exam-results/bulk-delete
Content-Type: application/json

{
  "ids": [15, 16, 17],
  "DeletedBy": "Admin User",
  "DeletedRemarks": "Bulk cleanup"
}
```

```bash
curl -X POST "http://localhost:3000/api/v1/exam-results/bulk-delete" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": [15, 16, 17],
    "DeletedBy": "Admin User",
    "DeletedRemarks": "Bulk cleanup"
  }'
```

---

## 8. Route order note (for developers)

In the gateway controller, declare routes carefully:

1. `POST /` create  
2. `GET /` list  
3. `POST /bulk-delete`  
4. `GET /student/:studentId`  
5. `GET /:id`  
6. `PUT /:id`  
7. `PATCH /:id/status`  
8. `DELETE /:id`  

Static paths like `bulk-delete` and `student/...` must stay **above** `/:id`, or Nest will treat `"bulk-delete"` as an id.

---

## 9. Database model (summary)

Table: **`examResult`** (`model ExamResult` in Prisma)

Main groups of columns:

| Group | Examples |
|-------|----------|
| Context | academicSessionId, examinationDetailId, yearId, semId, programId, examTypeId |
| Student snapshot | studentId, enrolmentNo, rollNo, studentName, fatherName, … |
| Paper snapshot | paperId, paperCode, subjectName, paperName, max/min marks |
| Obtained marks | theoryExternalObt, sessionalInternalObt, practicalObt, creditObt |
| Result summary | totalMarks, percentage, grade, gradePoint, sgpa, ygpa, cgpa, result |
| Audit | CreatedBy, UpdatedBy, IsActive, IsDeleted, DeletedBy, … |

---

## 10. Where to put future exam APIs

| New feature type | Put logic in | Put HTTP in |
|------------------|--------------|-------------|
| Result / marks / grade / marksheet related | `apps/exam-result-service` | `apps/backend/src/exam-result` (or sibling folder) |
| Master data (exam type, scheme, examination details) | `apps/student-service/src/master` | `apps/backend/src/master` |
| Student exam login / admit card | `apps/student-service/src/students` | `apps/backend/src/students` |

Always keep the split:

1. **Backend** = public HTTP + DTOs + Swagger  
2. **Microservice** = `@MessagePattern` + Prisma logic  

---

## 11. Quick troubleshooting

| Problem | Check |
|---------|--------|
| API hangs / connection error | Is `exam-result-service` running on `EXAM_RESULT_TCP_PORT`? |
| Wrong port | Backend client and microservice must use the **same** env port (`4002` by default) |
| Validation error (400) | Required fields / types in DTO (e.g. missing `CreatedBy` or `studentId`) |
| “already exists” | Same unique combination already present and not deleted |
| Student not found | `studentId` must exist in `students` and not be soft-deleted |
| Empty list | Filters too strict, or rows are soft-deleted (`IsDeleted = true`) |
| Swagger missing tag | Restart backend after adding `ExamResultModule` to `AppModule` |

---

## 12. Related files (quick links)

| Purpose | Path |
|---------|------|
| Gateway controller | `apps/backend/src/exam-result/exam-result.controller.ts` |
| Gateway module | `apps/backend/src/exam-result/exam-result.module.ts` |
| Microservice handlers | `apps/exam-result-service/src/exam-result/exam-result.controller.ts` |
| Business logic | `apps/exam-result-service/src/exam-result/exam-result.service.ts` |
| Prisma model | `prisma/schema.prisma` → `model ExamResult` |
| Nest project config | `nest-cli.json` → project `exam-result-service` |
| npm scripts | `package.json` → `start:exam-result`, `start:dev:all` |

---

## 13. One-page cheat sheet

```text
Create     POST   /api/v1/exam-results
List       GET    /api/v1/exam-results?...filters
By student GET    /api/v1/exam-results/student/:studentId
Get one    GET    /api/v1/exam-results/:id
Update     PUT    /api/v1/exam-results/:id
Status     PATCH  /api/v1/exam-results/:id/status
Delete     DELETE /api/v1/exam-results/:id?DeletedBy=...
Bulk del   POST   /api/v1/exam-results/bulk-delete
```

Run:

```bash
npm run start:exam-result   # TCP :4002
npm run start:backend       # HTTP :3000
```

Docs: `http://localhost:3000/api-docs`

---

*Document location: `documents/exam_result_module_guide.md`*  
*Matches the gateway + microservice pattern used by Master and Students modules.*
