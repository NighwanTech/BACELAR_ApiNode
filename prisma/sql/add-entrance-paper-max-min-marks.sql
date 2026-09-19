ALTER TABLE `entrancePaperMaster`
  ADD COLUMN IF NOT EXISTS `maxMarks` DOUBLE NULL AFTER `entrancePaperName`,
  ADD COLUMN IF NOT EXISTS `minMarks` DOUBLE NULL AFTER `maxMarks`;
