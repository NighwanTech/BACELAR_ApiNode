ALTER TABLE `entranceExamMaster`
  ADD COLUMN IF NOT EXISTS `rollNumberSequence` VARCHAR(50) NULL AFTER `toTime`;
