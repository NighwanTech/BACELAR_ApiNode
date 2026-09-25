# ERP, Moodle and Koha student sync

College ERP is the only place a student is created. The ERP backend copies that student into Moodle and Koha. The website and the admin panel never call Moodle or Koha directly.

## Student steps

A new student does not get a Moodle or Koha password at registration. The password appears only after the student creates it on the exam form.

1. **Registration.** The student registers on the website. ERP stores `registrationNo` and `academicSessionId` on the student row. No Moodle user and no Koha patron are created here. The registration login password is not sent to Moodle or Koha.

2. **Confirm Admission.** Admin confirms the student after successful payment. ERP creates the enrollment number, for example `BACE2025070015`, and stores the same `academicSessionId` on `studentEnrollment`. The confirm API then syncs that enrollment number. Moodle user, Koha patron, program category, paper courses, and course enrolment are created or updated. No password is given to the student at this step. If the exam password does not exist yet, Moodle gets a one-time random password that is not saved and is not shown.

3. **Exam form, Create Password.** The student opens the examination form, verifies enrollment number and date of birth, and creates a password. That password is saved on the exam login. The same call then updates Moodle and Koha, so this password is the login password for the exam portal, Moodle, and Koha.

Login after step 3:

| System | What to type |
|---|---|
| Exam portal | Enrollment number and the password from step 3 |
| Moodle `https://lms.bacelar.org/login/index.php` | Username is the enrollment number in lowercase, for example `bace2025070015`. Password is the exam-form password |
| Koha OPAC `https://library.bacelar.org/cgi-bin/koha/opac-user.pl` | Card number is the enrollment number, for example `BACE2025070015`. Password is the same exam-form password |

Running sync again for the same enrollment number updates the same Moodle user and the same Koha patron. It does not create a second account.

## Identity

The cross-system id is the enrollment number.

| System | Field |
|---|---|
| ERP | `studentEnrollment.enrollmentNo`, and `examLoginMaster.enrollmentNo` after the exam password exists |
| Moodle | `idnumber`, and username in lowercase |
| Koha | `cardnumber` |

`registrationNo` is stored on the mapping row only as a reference. It is not the Moodle or Koha key. `StudentRegistrationId` is only the internal database id. Email is not the key.

Sync reads `examLoginMaster` first. If that row does not exist yet, it reads `studentEnrollment`. That is why Confirm Admission can create the accounts before the student has opened the exam form.

The password sent to Moodle and Koha is `examLoginMaster.plainPassword`, or `studentEnrollment.examPassword` when the exam-login row is not there yet. `loginMaster.PlainPassword` is never sent.

## What starts a sync

| When | What runs |
|---|---|
| Confirm Admission | `POST /api/v1/students-enrollments/confirm` creates the enrollment, then syncs that enrollment number. A Moodle or Koha failure does not undo the admission |
| Exam form Create Password | `POST /api/v1/students-exam-login/create-password` saves the password, then syncs it to Moodle and Koha |
| Admin student list | The sync icon next to an enrollment number calls the manual route below |
| Manual API | `POST /api/v1/integrations/sync/student/{enrollmentNo}` |
| Optional timer | If `IDENTITY_SYNC_INTERVAL_MINUTES` is a number greater than 0, the backend syncs up to 10 enrollments that are missing or not `success`. Leave it empty. It does not sync every student on startup |

Status of one enrollment:

```http
GET /api/v1/integrations/sync/student/{enrollmentNo}
```

Manual sync example:

```http
POST http://localhost:5001/api/v1/integrations/sync/student/BACE2026010007
```

A success response looks like this:

```json
{
  "enrollmentNo": "BACE2026010007",
  "moodle": "updated",
  "koha": "updated",
  "status": "success",
  "moodleUserId": 4,
  "kohaPatronId": 3,
  "courses": {
    "created": 0,
    "updated": 5,
    "enrolled": 5,
    "removed": 0,
    "failed": 0,
    "error": ""
  }
}
```

`moodle` and `koha` can be `created`, `updated`, `suspended`, or `failed`. `status` is `success` only when both the Moodle user and the Koha patron succeed. Course problems are reported in `courses` and do not by themselves mark the user sync as failed.

`IsActive = false` suspends the Moodle user and sets the Koha patron expiry to today. History is not deleted. Turning the student active again updates the same accounts.

## Courses

After the Moodle user exists, sync loads active papers for that enrollment's program, year, and semester. At most 30 papers are sent.

| ERP | Moodle |
|---|---|
| Program code | Course category `idnumber` |
| Program name | Course category name |
| `{paperCode}-{paperId}` | Course `shortname` |
| Paper name | Course `fullname` |
| Enrollment number | Manual enrolment as Student (role id 5) |

An inactive student is removed from those courses. The Moodle course itself is not deleted.

Course ids are stored in `local_erp_course_mapping` (`paperId`, `shortname`, `moodleCategoryId`, `moodleCourseId`, `status`).

## Where the code lives

| File | Job |
|---|---|
| `apps/backend/src/integrations/identity-sync.controller.ts` | Manual sync, status, and the pending route |
| `apps/backend/src/integrations/identity-sync.service.ts` | Loads the student, calls Moodle and Koha, saves the identity mapping |
| `apps/backend/src/integrations/course-sync.service.ts` | Creates or updates Moodle courses and enrols the student |
| `apps/backend/src/integrations/moodle.client.ts` | Moodle REST calls |
| `apps/backend/src/integrations/koha.client.ts` | Koha OAuth, patron, and password calls |
| `apps/backend/src/integrations/identity.util.ts` | Splits the full name and builds the Moodle username |
| `apps/backend/src/students/student-enrollment/student-enrollment.controller.ts` | Syncs after Confirm Admission |
| `apps/backend/src/students/exam-login/exam-login.controller.ts` | Syncs after the exam password is created |
| `bacelar_Admin` student list | Sync icon. It calls the ERP backend only |

The backend listens on port `5001`. The route prefix is `/api/v1`.

## Outside calls

Moodle base URL is `MOODLE_BASE_URL` (`https://lms.bacelar.org`).

```http
POST {MOODLE_BASE_URL}/webservice/rest/server.php
```

| Moodle function | When |
|---|---|
| `core_user_get_users` | Find the user by `idnumber`, then by username |
| `core_user_create_users` | First time the Moodle user does not exist |
| `core_user_update_users` | Later sync, password change, or suspend |
| `core_course_get_categories` | Find the program category |
| `core_course_create_categories` | First time that program category does not exist |
| `core_course_get_courses_by_field` | Find a paper course by shortname |
| `core_course_create_courses` | First time that paper course does not exist |
| `core_course_update_courses` | Later sync |
| `core_enrol_get_users_courses` | See if the student is already in the course |
| `enrol_manual_enrol_users` | Enrol the student |
| `enrol_manual_unenrol_users` | Remove an inactive student from the course |

Koha base URL is `KOHA_BASE_URL` (`https://library.bacelar.org`).

| Call | When |
|---|---|
| `POST /api/v1/oauth/token` | Client-credentials token |
| `GET /api/v1/patrons?cardnumber={enrollmentNo}` | Find the patron |
| `POST /api/v1/patrons` | First sync |
| `PUT /api/v1/patrons/{patron_id}` | Later sync |
| `POST /api/v1/patrons/{patron_id}/password` | Set the exam-form password |

New Koha patrons use library `BAC` and category `STUDENT`.

Secrets stay in the server `.env`. They are not in the website, not in the admin app, and not committed. Logs must not print the Moodle token, the Koha secret, or the student password.

```text
MOODLE_BASE_URL
MOODLE_WS_TOKEN
KOHA_BASE_URL
KOHA_CLIENT_ID
KOHA_CLIENT_SECRET
KOHA_LIBRARY_ID
KOHA_STUDENT_CATEGORY
IDENTITY_SYNC_INTERVAL_MINUTES
```

`.env.example` has empty placeholders only. After changing `.env`, restart the backend.

The Moodle token user needs these capabilities at **System** context, and that role must be allowed to assign the Student role:

- `moodle/user:create`
- `moodle/user:update`
- `moodle/user:viewdetails`
- `moodle/site:viewuseridentity`
- `moodle/category:manage`
- `moodle/course:create`
- `moodle/course:update`
- `moodle/course:view`
- `moodle/course:viewhiddencourses`
- `enrol/manual:enrol`
- `enrol/manual:unenrol`
- `moodle/role:assign`

The Koha API user needs to list patrons, edit patrons, and set a patron password.

## Mapping table

Table: `local_erp_identity_mapping`. Prisma model: `ErpIdentityMapping`. Created on backend startup if missing.

| Column | Meaning |
|---|---|
| `enrollmentNo` | Unique. The sync key |
| `registrationNo` | Reference only |
| `moodleUserId` | Moodle numeric user id |
| `kohaPatronId` | Koha numeric patron id |
| `status` | `success`, `partial`, or `failed` |
| `lastSynced` | Last attempt time |

## What was tested

| Enrollment | Moodle | Koha | Courses |
|---|---|---|---|
| `BACE2026010007` | User 4 updated | Patron 3 updated | 5 courses updated, student enrolled |
| `BACE2025070015` | User 5 created, then updated | Patron 4 created, then updated | 8 courses created, then the student enrolled |

A second sync of each enrollment updated the same ids. An inactive flag suspended Moodle user 4 and Koha patron 3, and the restore updated those same ids.

`BACE2026010007` was then given an exam-form password. That password updated Moodle user 4 and Koha patron 3. Moodle login with the lowercase enrollment number and that password succeeded.

## Not built

- Grade sync from Moodle back into ERP results
- Single sign-on
- A full sync of every student on a timer, unless `IDENTITY_SYNC_INTERVAL_MINUTES` is set
