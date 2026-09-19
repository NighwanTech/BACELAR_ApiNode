CREATE TABLE IF NOT EXISTS `examGreviancePriceMaster` (
    `examGreviancePriceMasterId` INTEGER NOT NULL AUTO_INCREMENT,
    `programCategoryId` INTEGER NOT NULL,
    `programCategoryName` VARCHAR(100) NOT NULL,
    `programId` INTEGER NOT NULL,
    `programName` VARCHAR(100) NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `pgRate` DOUBLE NOT NULL DEFAULT 2,
    `gstRate` DOUBLE NOT NULL DEFAULT 18,
    `finalPrice` DOUBLE NOT NULL DEFAULT 0,
    `CreatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CreatedBy` VARCHAR(255) NOT NULL,
    `UpdatedOn` DATETIME(3) NULL,
    `UpdatedBy` VARCHAR(255) NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedRemarks` VARCHAR(255) NULL,
    `DeletedOn` DATETIME(3) NULL,
    `DeletedBy` VARCHAR(255) NULL,
    `Remarks` VARCHAR(255) NULL,
    UNIQUE INDEX `examGreviancePriceMaster_programId_key`(`programId`),
    INDEX `examGreviancePriceMaster_programCategoryId_idx`(`programCategoryId`),
    INDEX `examGreviancePriceMaster_programId_idx`(`programId`),
    PRIMARY KEY (`examGreviancePriceMasterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `examGreviancePriceMaster`
  ADD CONSTRAINT `examGreviancePriceMaster_programCategoryId_fkey`
  FOREIGN KEY (`programCategoryId`) REFERENCES `programCategory`(`programCategoryId`)
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `examGreviancePriceMaster`
  ADD CONSTRAINT `examGreviancePriceMaster_programId_fkey`
  FOREIGN KEY (`programId`) REFERENCES `programs`(`programId`)
  ON DELETE CASCADE ON UPDATE CASCADE;
