-- Safe for existing admin panels: default false, no break on old rows.
-- Table map: Student → students
-- Run on the SAME database your student-service uses (DATABASE_URL in .env)
-- Idempotent: skips if column already exists (MySQL 8.0.12+ / MariaDB with IF NOT EXISTS support).

ALTER TABLE `students`
  ADD COLUMN IF NOT EXISTS `hasSportCertificate` BOOLEAN NOT NULL DEFAULT false;
