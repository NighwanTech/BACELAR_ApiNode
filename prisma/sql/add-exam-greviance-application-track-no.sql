-- Additive: tracking number for exam grievance applications
ALTER TABLE `examGrevianceApplication`
  ADD COLUMN `trackNo` VARCHAR(50) NULL AFTER `grevianceTypeName`;

ALTER TABLE `examGrevianceApplication`
  ADD UNIQUE INDEX `examGrevianceApplication_trackNo_key` (`trackNo`);

ALTER TABLE `examGrevianceApplication`
  ADD INDEX `examGrevianceApplication_trackNo_idx` (`trackNo`);
