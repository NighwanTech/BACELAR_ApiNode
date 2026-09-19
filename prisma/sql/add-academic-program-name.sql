-- Graduation / PG degree name on student academic qualifications.
-- This is the student's previous degree (B.A., M.Sc., custom typed), NOT the admission programId.

ALTER TABLE `studentAcademicDetails`
  ADD COLUMN IF NOT EXISTS `programName` VARCHAR(100) NULL AFTER `stream`;
