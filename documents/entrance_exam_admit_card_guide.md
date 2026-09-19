# Entrance Exam, Paper Master & Entrance Roll Number

Simple guide: kya save hota hai, kahan save hota hai, roll number kaise banta hai, admit card kaise aata hai.

---

## 1. Ye system kya karta hai?

Entrance exam ke liye teen cheezein chahiye:

1. **Paper list** — Paper-1, Paper-2, …
2. **Exam mapping** — kis session + program pe kaunsa paper, kis date/time pe
3. **Entrance roll number** — registered student ke naam pe unique roll, phir admit card PDF

Regular college roll number (`Generate Roll Number` page) alag hai.  
Entrance roll **sirf entrance exam / admit card** ke liye hai.

Roll number **automatic student register pe nahi** banta.  
Admin **Entrance Exam** page pe **Generate Roll Number** dabata hai.

---

## 2. Daily use (admin)

Sidebar → **Exam Master**

| Page | URL | Kaam |
|------|-----|------|
| Entrance Paper | `/master/entrance-paper` | Paper names banao (Paper-1, Paper-2) |
| Entrance Exam | `/master/entrance-exam` | Session + category + program pe paper map karo, date/time bharo, rolls generate karo |
| Register Student | `/students` | List pe Entrance Roll dikhta hai. Actions se admit card download |

### Step by step

1. **Entrance Paper** pe Paper-1, Paper-2 add karo (ek baar).
2. **Entrance Exam** pe same program ke liye har paper **alag row** banao, **alag date/time**.
   - Same paper dobara same session + program pe nahi lagega (duplicate).
   - Alag paper (Paper-2) lagega.
3. Filter se **Category + Program** select karo, **Generate Roll Number** dabao.
4. Register Student list se **Download Admit Card** — us program ke **saare papers ek card** pe aate hain.

---

## 3. Data kahan save hota hai? (database)

| Cheez | Table | Column / note |
|-------|--------|----------------|
| Paper name | `entrancePaperMaster` | `entrancePaperName` (Paper-1, Paper-2) |
| Exam mapping | `entranceExamMaster` | session, category, program, paper, `examDate`, `fromTime`, `toTime` |
| Entrance roll | `students` | `entranceRollnumber` — **unique**, student row pe |
| Student photo / sign | `studentAttachments` | admit card PDF yahi se leta hai |

Prisma models: `prisma/schema.prisma`  
- `EntrancePaperMaster`  
- `EntranceExamMaster`  
- `Student.entranceRollnumber`

Tables + stored procedure SQL:

`prisma/sql/create-entrance-exam-masters.sql`

Pehli baar DB pe ye SQL chalana padta hai (tables + `sp_bulk_generate_entrance_roll`).

**Roll number `entranceExamMaster` table mein nahi jata.**  
Woh **student** pe save hota hai. Mapping sirf paper + date/time hai.

---

## 4. Duplicate rule (paper mapping)

Unique combination:

`academicSessionId` + `programId` + `entrancePaperId`

| Example | Result |
|---------|--------|
| B.Ed + Paper-1 + 18 Sep | OK |
| B.Ed + Paper-2 + 19 Sep | OK (alag paper) |
| B.Ed + Paper-1 dubara | Error — same paper already mapped |

Add modal mein already-mapped papers dropdown se hide ho jate hain.

---

## 5. Entrance roll number ka format

Pattern:

```text
{session start year}{686}{2-digit program code}{3-digit serial}
```

Example: `202568607009`

| Part | Value | Meaning |
|------|--------|---------|
| Year | `2025` | Academic session `startYear` (na ho to current year) |
| College | `686` | Fixed college code |
| Program | `07` | `programs.programCode` agar number hai, warna `programId` — 2 digit |
| Serial | `009` | Us prefix ke next 001, 002, 003… |

Kis student ko milta hai:

- `students.programId` = selected program
- program category match
- session filter ho to `students.academicSessionId` bhi match
- `entranceRollnumber` empty / null
- already roll wale **skip** (dobara overwrite nahi)

Serial last 3 digits se continue hota hai, taaki same prefix pe clash na ho.

---

## 6. Generate automatic hai ya button?

**Button se.** Automatic nahi.

| Kya | Automatic? |
|-----|------------|
| Student register / apply | Roll **nahi** banta |
| Paper / exam mapping save | Roll **nahi** banta |
| **Generate Roll Number** (Entrance Exam page) | Haan — us category + program ke registered students |
| Same student dubara generate | Skip — purana roll same rehta hai |

Button tab enable hai jab **Category + Program** select ho.

Logic file:

`apps/student-service/src/master/entrance-exam/entrance-exam.service.ts`  
method: `generateRolls()`

1. Pehle DB procedure: `sp_bulk_generate_entrance_roll`  
   defined in `prisma/sql/create-entrance-exam-masters.sql`
2. Procedure missing / fail ho to same formula **JS fallback** (`generateRollsFallback`)  
   MySQL lock: `GET_LOCK('sp_bulk_generate_entrance_roll')` — double click pe duplicate serial nahi.

API:

`POST /master/entrance-exams/generate-rolls`

Body: `academicSessionId` (optional), `programCategoryId`, `programId`

---

## 7. Admit card kaise banta hai?

1. Admin Register Student se download (single ya bulk).
2. API: `GET /master/entrance-exams/admit-card?studentId=…` ya `entranceRollnumber=…`
3. Service student nikalta hai + us **program** ke **saare active papers** (`entranceExamMaster`).
4. Session match ho to wahi papers; warna program ke saare papers.
5. Browser PDF: `bacelar_Admin/src/utils/exportEntranceAdmitCardPdf.ts`  
   Paper-1 aur Paper-2 **ek hi line** pe, apni date + time ke saath.

Roll na ho to download nahi hota — pehle generate karo.

---

## 8. Request flow (code)

```text
Admin UI
    │  HTTP  /master/entrance-papers
    │        /master/entrance-exams
    │        /master/entrance-exams/generate-rolls
    │        /master/entrance-exams/admit-card
    ▼
apps/backend   (gateway, DTO only — DB nahi)
    │  TCP cmd: create_entrance_paper, create_entrance_exam,
    │           generate_entrance_rolls, get_entrance_admit_card, …
    ▼
apps/student-service
    │  entrance-paper.service.ts
    │  entrance-exam.service.ts
    ▼
Prisma → MariaDB
    entrancePaperMaster
    entranceExamMaster
    students.entranceRollnumber
```

Backend + **student-service** dono chalna zaroori hai.

---

## 9. File map

### API (`BACELAR_ApiNode`)

| File | Role |
|------|------|
| `prisma/schema.prisma` | Models + `Student.entranceRollnumber` |
| `prisma/sql/create-entrance-exam-masters.sql` | Tables + bulk generate SP |
| `apps/backend/src/master/entrance-paper/` | HTTP `/master/entrance-papers` |
| `apps/backend/src/master/entrance-exam/` | HTTP `/master/entrance-exams` |
| `apps/student-service/src/master/entrance-paper/` | Paper CRUD |
| `apps/student-service/src/master/entrance-exam/entrance-exam.service.ts` | Mapping, generate rolls, admit card data |
| `apps/student-service/src/master/master.module.ts` | Dono modules wired |

### Admin (`bacelar_Admin`)

| File | Role |
|------|------|
| `src/app/master/entrance-paper/page.tsx` | Paper master UI |
| `src/app/master/entrance-exam/page.tsx` | Mapping + Generate Roll Number |
| `src/app/students/page.tsx` | Admit card download (single + bulk) |
| `src/components/students/StudentListTable.tsx` | Entrance Roll column |
| `src/utils/exportEntranceAdmitCardPdf.ts` | PDF layout |
| `src/services/master/entrancePaperMasterService.ts` | API calls |
| `src/services/master/entranceExamMasterService.ts` | API calls + generate + admit-card |
| `src/config/apiConfig.ts` | `ENTRANCE_PAPER_MASTER`, `ENTRANCE_EXAM_MASTER` |
| `src/components/Sidebar.tsx` | Exam Master links |

---

## 10. HTTP APIs (short)

**Papers** — `/master/entrance-papers`

- `GET` list  
- `POST` create  
- `PUT /:id` update  
- `PATCH /:id/status`  
- `DELETE /:id`  
- `POST /bulk-delete`

**Exams** — `/master/entrance-exams`

- `GET` list (`academicSessionId`, `programCategoryId`, `programId`, `activeOnly`)
- `POST` create mapping  
- `PUT /:id` update  
- `POST /generate-rolls`  
- `GET /admit-card?studentId=` or `?entranceRollnumber=`  
- delete / bulk-delete / status same pattern as other masters

---

## 11. Common mistakes

| Problem | Reason |
|---------|--------|
| Duplicate error | Same Paper-1 already mapped — Paper-2 choose karo |
| Dropdown empty | Saare papers map ho chuke — naya paper Paper master mein banao |
| Generate disabled | Category + Program select nahi |
| “No registered students” | Us program/session pe student nahi, ya sabke rolls already hain |
| Admit card download fail | `entranceRollnumber` empty — pehle generate |
| Admit card pe ek hi paper | Dusra paper Entrance Exam pe map nahi, ya student-service restart nahi |
| Collation / generate fail | Fallback JS use hota hai; SP `utf8mb4_unicode_ci` LIKE use karti hai |

---

## 12. One-line summary

- **Paper master** → paper names (`entrancePaperMaster`)  
- **Exam master** → program + paper + date/time (`entranceExamMaster`)  
- **Generate Roll Number** → `students.entranceRollnumber` = year + `686` + program code + 001…  
- **Admit card** → student + us program ke saare papers, PDF admin side pe
