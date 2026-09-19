ALTER TABLE `academicSessionMaster`
  ADD COLUMN `isCurrent` BOOLEAN NOT NULL DEFAULT FALSE AFTER `endYear`;

ALTER TABLE `students`
  ADD COLUMN `academicSessionId` INTEGER NULL AFTER `admissionSessionId`;

ALTER TABLE `students`
  ADD INDEX `students_academicSessionId_idx` (`academicSessionId`);

ALTER TABLE `students`
  ADD CONSTRAINT `students_academicSessionId_fkey`
  FOREIGN KEY (`academicSessionId`) REFERENCES `academicSessionMaster`(`academicSessionId`)
  ON DELETE SET NULL ON UPDATE CASCADE;
