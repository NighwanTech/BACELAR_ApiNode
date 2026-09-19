CREATE TABLE IF NOT EXISTS `pramanSubParameterMaster` (
    `subPramanParameterId` INTEGER NOT NULL AUTO_INCREMENT,
    `pramanId` INTEGER NOT NULL,
    `pramanName` VARCHAR(255) NULL,
    `subPramanParameterName` VARCHAR(255) NOT NULL,
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
    PRIMARY KEY (`subPramanParameterId`),
    INDEX `pramanSubParameterMaster_pramanId_idx`(`pramanId`),
    CONSTRAINT `pramanSubParameterMaster_pramanId_fkey` FOREIGN KEY (`pramanId`) REFERENCES `pramanMaster` (`pramanId`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
