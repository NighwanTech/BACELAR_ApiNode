ALTER TABLE `examinationDetails`
  ADD COLUMN `programId` INTEGER NULL AFTER `academicId`,
  ADD COLUMN `programName` VARCHAR(255) NULL AFTER `programId`;

ALTER TABLE `examinationDetails`
  ADD INDEX `examinationDetails_programId_idx` (`programId`);

ALTER TABLE `examinationDetails`
  ADD CONSTRAINT `examinationDetails_programId_fkey`
  FOREIGN KEY (`programId`) REFERENCES `programs`(`programId`)
  ON DELETE SET NULL ON UPDATE CASCADE;
