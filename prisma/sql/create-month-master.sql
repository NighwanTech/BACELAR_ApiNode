CREATE TABLE IF NOT EXISTS `monthMaster` (
    `monthId` INTEGER NOT NULL AUTO_INCREMENT,
    `monthName` VARCHAR(100) NOT NULL,
    `monthShortCode` VARCHAR(10) NOT NULL,
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
    UNIQUE INDEX `monthMaster_monthName_key`(`monthName`),
    UNIQUE INDEX `monthMaster_monthShortCode_key`(`monthShortCode`),
    PRIMARY KEY (`monthId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
