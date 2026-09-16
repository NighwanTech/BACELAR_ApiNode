-- Additive: store Academic Session on generated roll numbers
ALTER TABLE `studentRollNumber`
  ADD COLUMN `academicSessionId` INT NULL AFTER `sessionId`;

ALTER TABLE `studentRollNumber`
  ADD INDEX `studentRollNumber_academicSessionId_idx` (`academicSessionId`);

ALTER TABLE `studentRollNumber`
  ADD CONSTRAINT `studentRollNumber_academicSessionId_fkey`
  FOREIGN KEY (`academicSessionId`) REFERENCES `academicSessionMaster` (`academicSessionId`)
  ON DELETE SET NULL ON UPDATE CASCADE;

UPDATE `studentRollNumber` r
INNER JOIN `students` s ON s.StudentRegistrationId = r.studentId
SET r.academicSessionId = s.academicSessionId
WHERE r.academicSessionId IS NULL
  AND s.academicSessionId IS NOT NULL;
