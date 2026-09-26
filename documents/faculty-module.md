# Faculty module

Faculty is an admin master. A person is created only in the ERP admin. The website does not create faculty.

The admin screen talks to the API gateway. The gateway talks to the student service. The student service writes MariaDB.

```text
Admin (localhost:3000)
    →  POST/GET http://localhost:5001/api/v1/master/faculties
        →  TCP student-service :4001
            →  table facultyMaster and its child tables
```

Files are saved by the gateway first (MinIO, or local `/uploads` if MinIO does not answer in 8 seconds). The database stores only the file URL.

## Admin screens

| Screen | Path |
|---|---|
| Faculty list and profile | `/master/faculty-list` and `/master/faculty-list/{facultyId}` |
| Add / edit wizard | Modal on those pages, component `FacultyForm` |
| Employee Type | `/master/employe-type-list` |
| Employee Category | `/master/employee-category-list` |
| Designation | `/master/employee-designation-list` |
| Department | `/master/employee-department-list` |
| Faculty Qualification | `/master/faculty-qualification-list` |
| Faculty Specialization | `/master/faculty-specialization-list` |

The wizard has five steps: Basic Details, Education, Academic / Research, Uploads, Bank. On edit, those step titles are clickable. On add, you move forward with Next.

The list has two views. List is the table. Card is a profile box. A card click opens `/master/faculty-list/{facultyId}`. Column headers sort the table. Filters are Type, Emp. Category, Designation, Department, and Status.

## How a save works

1. The form loads the job masters: type, category, designation, department, qualification, specialization, plus state, city, and zipcode.
2. Create sends `POST /api/v1/master/faculties`. The service generates a unique 6-digit `employeeId` (100000–999999). The admin does not type it.
3. The same request body carries education rows, experience rows, and one research object. Those are saved in the same transaction path as the faculty row.
4. Uploads are separate calls after the faculty id exists. Profile photo, Aadhaar, PAN, signature, passbook, and other files go to `facultyDocument`. Education certificates and experience letters update the matching child row.
5. Edit sends `PUT /api/v1/master/faculties/{facultyId}`. Delete is a soft delete: `IsDeleted = true`. The row stays in the table.

Name fields are stored in title case. Pay scale, basic salary, and district are still columns, but the form does not show them and an update does not send them, so old values stay.

## Faculty API

Base path: `/api/v1/master/faculties`.

| Method | Path | What it does | TCP command |
|---|---|---|---|
| POST | `/master/faculties` | Create faculty, education, experience, research | `create_faculty` |
| GET | `/master/faculties?activeOnly=true` | List. `activeOnly=true` is for dropdowns | `find_all_faculties` |
| GET | `/master/faculties/{id}` | One faculty with documents, education, experience, research | `find_one_faculty` |
| PUT | `/master/faculties/{id}` | Update the same graph | `update_faculty` |
| PATCH | `/master/faculties/{id}/status` | Active or inactive | `update_status_faculty` |
| DELETE | `/master/faculties/{id}?DeletedBy=` | Soft delete faculty and its documents | `delete_faculty` |
| POST | `/master/faculties/bulk-delete` | Soft delete many | `bulk_delete_faculties` |
| POST | `/master/faculties/{id}/documents/upload` | Multipart field `file` plus `documentType` | `create_faculty_document` |
| GET | `/master/faculties/{id}/documents` | List documents | `find_faculty_documents` |
| DELETE | `/master/faculties/{id}/documents/{documentId}` | Soft delete one document | `delete_faculty_document` |
| POST | `/master/faculties/{id}/educations/{educationId}/certificate` | Certificate file | `upload_faculty_education_certificate` |
| POST | `/master/faculties/{id}/experiences/{experienceId}/letter` | Experience letter | `upload_faculty_experience_letter` |

Document `documentType` values used by the form: `PROFILE_PHOTO`, `AADHAR`, `PAN`, `SIGNATURE`, `BANK_PASSBOOK`, `OTHER`.

Gateway code: `apps/backend/src/master/faculty/`. Database code: `apps/student-service/src/master/faculty/faculty.service.ts`. Admin form: `bacelar_Admin/src/components/faculty/FacultyForm.tsx`. List: `bacelar_Admin/src/app/master/faculty-list/page.tsx`. Profile: `bacelar_Admin/src/components/faculty/FacultyProfile.tsx`.

## Tables

### `facultyMaster`

One row per faculty. Primary key `facultyId`. Business key `employeeId` (6 characters, unique).

Job links store both the id and the name, so the list can show the name even if the master label changes later:

| Columns | Master table |
|---|---|
| `employeTypeId`, `employeTypeName` | `employeTypeMaster` |
| `employeeCategoryId`, `employeeCategoryName` | `employeeCategoryMaster` |
| `employeeDesignationId`, `employeeDesignationName` | `employeeDesignationMaster` |
| `employeeDepartmentId`, `employeeDepartmentName` | `employeeDepartmentMaster` |

Also stored: name, father or husband name, gender, date of birth, Aadhaar, PAN, marital status, religion, category, blood group, mobiles, emails, address, state, city, pincode, joining and confirmation dates, bank, PF flag, and the usual audit columns (`CreatedOn`, `CreatedBy`, `UpdatedOn`, `UpdatedBy`, `IsActive`, `IsDeleted`, `Remarks`).

`aadharNo` and `panNo` are unique when present.

### `facultyEducation`

Many rows per faculty. Qualification and specialization come from their masters. The text name is stored next to the id.

| Column | Meaning |
|---|---|
| `facultyQualificationId`, `qualification` | From `facultyQualificationMaster` |
| `facultySpecializationId`, `specializationSubject` | From `facultySpecializationMaster` |
| `university`, `collegeInstitute`, `passingYear` | Typed on the form |
| `certificateUrl`, `certificateName` | Uploaded certificate |

There is no `degreeName` column. Qualification is the degree.

### `facultyExperience`

Many rows per faculty. School or college, CTC, `startYear` and `endYear` as dates, plus `experienceLetterUrl` and `experienceLetterName`. A blank end date means the job is current.

### `facultyResearch`

One row per faculty (`facultyId` is unique). Scholar, Vidwan, ORCID, Scopus, Researcher, ResearchGate, research area, and academic profile.

### `facultyDocument`

Many files per faculty. `documentType`, `fileUrl`, `fileName`. Profile photo on the list and the card is the row whose type is `PROFILE_PHOTO`.

### `facultyQualificationMaster` and `facultySpecializationMaster`

Small name masters. Columns are `qualificationName` and `specializationName`, each unique, plus the usual audit columns. They are not the student `qualificationMaster` (10th / 12th). Do not mix those.

| API | Table |
|---|---|
| `/api/v1/master/faculty-qualifications` | `facultyQualificationMaster` |
| `/api/v1/master/faculty-specializations` | `facultySpecializationMaster` |

Each of those supports list, create, update, status, delete, and bulk delete, same pattern as designation.

## Job masters the form depends on

These are separate masters. Faculty only stores the chosen id.

| API | Table | Used on the form as |
|---|---|---|
| `/api/v1/master/employe-types` | `employeTypeMaster` | Employee Type |
| `/api/v1/master/employee-categories` | `employeeCategoryMaster` | Employee Category |
| `/api/v1/master/employee-designations` | `employeeDesignationMaster` | Designation |
| `/api/v1/master/employee-departments` | `employeeDepartmentMaster` | Department |

Department can also be linked to many programs through `employeeDepartmentProgram` (`employeeDepartmentId` + `programId`). That link is saved from the department screen, not from the faculty wizard. Faculty still stores one department id.

State, city, and zipcode dropdowns use the existing address masters. The user can type a value that is not in the list. Qualification and specialization cannot. They must be picked from their masters.

## Dropdowns

Faculty form dropdowns use `FloatingSearchableSelect` from `bacelar_Admin/src/components/form/FloatingFields.tsx`. Each one has a chevron and a search box. Inside the wizard modal they use `fixedMenu` so the menu is not clipped.
