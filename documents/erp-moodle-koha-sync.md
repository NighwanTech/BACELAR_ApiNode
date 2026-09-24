# ERP, Moodle and Koha student sync

College ERP is the only place a student is created. This sync copies that student into Moodle and Koha so nobody has to make the same account by hand.

The public website does not call Moodle or Koha. The admin panel does not call them either. Only the ERP backend does.

## Identity

The cross-system id is `examLoginMaster.enrollmentNo`.

| System | Field |
|---|---|
| ERP | `examLoginMaster.enrollmentNo` |
| Moodle | `idnumber` |
| Koha | `cardnumber` |

`registrationNo` stays in the ERP. It is not the Moodle or Koha key. `StudentRegistrationId` is only the internal database id. Email is not the key, because email can change.

Name, email and mobile are read from `examLoginMaster` (`studentName`, `emailId`, `mobileNo`). The exam-portal password and `loginMaster` password are not sent.

If there is no `examLoginMaster` row for that enrollment number, sync stops. It does not fall back to the registration number.

## What you call

One ERP API exists today.

```http
POST /api/v1/integrations/sync/student/{enrollmentNo}
```

Example:

```http
POST http://localhost:5001/api/v1/integrations/sync/student/BACE2026010007
```

Success looks like this:

```json
{
  "enrollmentNo": "BACE2026010007",
  "moodle": "created",
  "koha": "created",
  "status": "success",
  "moodleUserId": 42,
  "kohaPatronId": 18
}
```

`moodle` and `koha` can be `created`, `updated`, `suspended`, or `failed`. `status` is `success` only when both sides work. If one side fails, `status` is `partial`. If both fail, `status` is `failed`.

Run the same enrollment number again. The second call must update the same Moodle user and the same Koha patron. It must not create a second account.

There is no bulk sync and no scheduler yet. Nothing runs by itself when a student is saved.

## Where the code lives

| File | Job |
|---|---|
| `apps/backend/src/integrations/identity-sync.controller.ts` | The HTTP route above |
| `apps/backend/src/integrations/identity-sync.service.ts` | Reads ERP, calls Moodle, calls Koha, saves the mapping |
| `apps/backend/src/integrations/moodle.client.ts` | Moodle REST calls |
| `apps/backend/src/integrations/koha.client.ts` | Koha OAuth and patron calls |
| `apps/backend/src/integrations/identity.util.ts` | Splits the full name and builds a Moodle username |
| `apps/backend/src/integrations/integration.module.ts` | Wires those classes into the backend |
| `apps/backend/src/app.module.ts` | Loads `IntegrationModule` |

The backend listens on port `5001`. The route prefix is `/api/v1`.

## What happens on one sync

1. The route receives the enrollment number.
2. The service loads `examLoginMaster` where `enrollmentNo` matches and `IsDeleted` is false.
3. Moodle is searched by `idnumber`. If a user exists, it is updated. If not, it is created.
4. Koha is searched by `cardnumber`. If a patron exists, it is updated. If not, it is created.
5. The result is stored in `local_erp_identity_mapping`.

`IsActive = false` asks Moodle to suspend the user and asks Koha to set the patron expiry to today. History is not deleted.

Moodle create sends a random password. That password is not stored and is not returned. The student cannot log in to Moodle with the exam-portal password.

A Moodle username is the enrollment number in lowercase. `BACE2026010007` becomes `bace2026010007`. The real link is still `idnumber`, not the username.

## Outside calls

Moodle base URL comes from `MOODLE_BASE_URL` (production: `https://lms.bacelar.org`).

```http
POST {MOODLE_BASE_URL}/webservice/rest/server.php
```

Functions used:

| Moodle function | When |
|---|---|
| `core_user_get_users_by_field` | Find the user by `idnumber` |
| `core_user_create_users` | First sync |
| `core_user_update_users` | Later sync, or when the student is inactive |

Koha base URL comes from `KOHA_BASE_URL` (production: `https://library.bacelar.org`).

| Call | When |
|---|---|
| `POST /api/v1/oauth/token` | Get an access token with client id and secret |
| `GET /api/v1/patrons?cardnumber={enrollmentNo}` | Find the patron |
| `POST /api/v1/patrons` | First sync |
| `PUT /api/v1/patrons/{patron_id}` | Later sync |

New Koha patrons are library `BAC` and category `STUDENT`.

Tokens and the Koha secret stay in the server `.env`. They are not in the website, not in the admin app, and not in `.env.example`. Logs must not print them.

`.env` keys:

```text
MOODLE_BASE_URL
MOODLE_WS_TOKEN
KOHA_BASE_URL
KOHA_CLIENT_ID
KOHA_CLIENT_SECRET
KOHA_LIBRARY_ID
KOHA_STUDENT_CATEGORY
```

After changing `.env`, restart the backend. A running process does not pick up new keys by itself.

## Mapping table

Table: `local_erp_identity_mapping`.

The backend creates it on startup if it is missing. Prisma model: `ErpIdentityMapping`.

| Column | Meaning |
|---|---|
| `enrollmentNo` | Unique. The sync key |
| `registrationNo` | Copy for reference only |
| `moodleUserId` | Moodle numeric user id |
| `kohaPatronId` | Koha numeric patron id |
| `status` | `success`, `partial`, or `failed` |
| `lastSynced` | Last attempt time |

## What was tested

Enrollment `BACE2026010007` was synced once.

| Step | Result |
|---|---|
| ERP row | Found, active, name and email present |
| Moodle search by `idnumber` | Works. No user yet |
| Moodle create | Failed. The token user is not allowed to create users |
| Koha token | Works |
| Koha patron search | Failed with HTTP 403. Missing permission `borrowers: list_borrowers` |

No Moodle user and no Koha patron were created, so there is no duplicate to clean up.

## What you still set on Moodle and Koha

Moodle external service needs these functions, and the token user needs the matching capabilities:

- `core_user_get_users_by_field` (already allowed)
- `core_user_create_users`
- `core_user_update_users`
- capabilities `moodle/user:create` and `moodle/user:update`

The Koha patron tied to the OAuth client needs patron permissions:

- view patrons (`list_borrowers`)
- add and modify patrons (`edit_borrowers`)

## Not built yet

- Course sync from paper or subject into a Moodle course
- Enrolling that student into Moodle courses
- A scheduler that syncs everyone with `UpdatedOn`
- A Sync button in the admin or on the website
- Using the exam-portal password as the Moodle or Koha password
- Grade sync and single sign-on
