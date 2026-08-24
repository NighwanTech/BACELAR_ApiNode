ALTER TABLE `studentExam`
  ADD COLUMN `examinationDetailId` INTEGER NULL AFTER `examPaymentIds`,
  ADD COLUMN `examinationName` VARCHAR(100) NULL AFTER `examinationDetailId`;

ALTER TABLE `studentExam`
  ADD INDEX `studentExam_examinationDetailId_idx` (`examinationDetailId`);

ALTER TABLE `studentExam`
  ADD CONSTRAINT `studentExam_examinationDetailId_fkey`
  FOREIGN KEY (`examinationDetailId`) REFERENCES `examinationDetails`(`examinationId`)
  ON DELETE SET NULL ON UPDATE CASCADE;
