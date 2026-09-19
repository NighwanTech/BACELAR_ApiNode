-- Registration channel: WEBSITE | ADMIN. Nullable so existing rows and website creates stay valid.
-- Table map: Student → students
-- Run on the SAME database your student-service uses (DATABASE_URL in .env)

ALTER TABLE `students`
  ADD COLUMN IF NOT EXISTS `source` VARCHAR(20) NULL;
