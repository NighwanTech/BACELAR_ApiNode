CREATE TABLE IF NOT EXISTS `employeeDepartmentMaster` (
    `employeeDepartmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeDepartmentName` VARCHAR(100) NOT NULL,
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
    UNIQUE INDEX `employeeDepartmentMaster_employeeDepartmentName_key`(`employeeDepartmentName`),
    PRIMARY KEY (`employeeDepartmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
