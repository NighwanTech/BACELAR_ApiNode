CREATE TABLE IF NOT EXISTS `academicYearMaster` (
    `academicYearId` INTEGER NOT NULL AUTO_INCREMENT,
    `academicYearName` VARCHAR(100) NOT NULL,
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
    UNIQUE INDEX `academicYearMaster_academicYearName_key`(`academicYearName`),
    PRIMARY KEY (`academicYearId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
