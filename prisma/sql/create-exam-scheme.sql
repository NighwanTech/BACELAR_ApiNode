CREATE TABLE IF NOT EXISTS `examScheme` (
    `examSchemeId` INTEGER NOT NULL AUTO_INCREMENT,
    `examinationDetailId` INTEGER NOT NULL,
    `examinationName` VARCHAR(100) NOT NULL,
    `academicSessionId` INTEGER NULL,
    `academicSessionName` VARCHAR(100) NULL,
    `programCategoryId` INTEGER NULL,
    `programCategoryName` VARCHAR(255) NULL,
    `programId` INTEGER NOT NULL,
    `programName` VARCHAR(255) NULL,
    `yearId` INTEGER NOT NULL,
    `yearName` VARCHAR(100) NULL,
    `semId` INTEGER NULL,
    `semName` VARCHAR(100) NULL,
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
    UNIQUE INDEX `examScheme_examinationDetailId_programId_yearId_semId_key`(`examinationDetailId`, `programId`, `yearId`, `semId`),
    INDEX `examScheme_examinationDetailId_idx`(`examinationDetailId`),
    INDEX `examScheme_academicSessionId_idx`(`academicSessionId`),
    INDEX `examScheme_programCategoryId_idx`(`programCategoryId`),
    INDEX `examScheme_programId_idx`(`programId`),
    INDEX `examScheme_yearId_idx`(`yearId`),
    INDEX `examScheme_semId_idx`(`semId`),
    PRIMARY KEY (`examSchemeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `examSchemePaper` (
    `examSchemePaperId` INTEGER NOT NULL AUTO_INCREMENT,
    `examSchemeId` INTEGER NOT NULL,
    `srNo` INTEGER NOT NULL DEFAULT 0,
    `programId` INTEGER NULL,
    `programName` VARCHAR(255) NULL,
    `paperId` INTEGER NULL,
    `subjectName` VARCHAR(255) NULL,
    `paperName` VARCHAR(255) NULL,
    `paperCode` VARCHAR(100) NULL,
    `paperNameWithCode` VARCHAR(255) NULL,
    `paperTypeId` INTEGER NULL,
    `paperType` VARCHAR(100) NULL,
    `examDate` DATETIME(3) NULL,
    `examTime` VARCHAR(100) NULL,
    `shift` VARCHAR(20) NULL,
    `noOfStudent` INTEGER NOT NULL DEFAULT 0,
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
    UNIQUE INDEX `examSchemePaper_examSchemeId_paperId_key`(`examSchemeId`, `paperId`),
    INDEX `examSchemePaper_examSchemeId_idx`(`examSchemeId`),
    INDEX `examSchemePaper_paperId_idx`(`paperId`),
    INDEX `examSchemePaper_paperTypeId_idx`(`paperTypeId`),
    PRIMARY KEY (`examSchemePaperId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `examScheme` ADD CONSTRAINT `examScheme_examinationDetailId_fkey` FOREIGN KEY (`examinationDetailId`) REFERENCES `examinationDetails`(`examinationId`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `examScheme` ADD CONSTRAINT `examScheme_academicSessionId_fkey` FOREIGN KEY (`academicSessionId`) REFERENCES `academicSessionMaster`(`academicSessionId`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `examScheme` ADD CONSTRAINT `examScheme_programCategoryId_fkey` FOREIGN KEY (`programCategoryId`) REFERENCES `programCategory`(`programCategoryId`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `examScheme` ADD CONSTRAINT `examScheme_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `programs`(`programId`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `examScheme` ADD CONSTRAINT `examScheme_yearId_fkey` FOREIGN KEY (`yearId`) REFERENCES `yearMaster`(`yearId`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `examScheme` ADD CONSTRAINT `examScheme_semId_fkey` FOREIGN KEY (`semId`) REFERENCES `semesterMaster`(`semId`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `examSchemePaper` ADD CONSTRAINT `examSchemePaper_examSchemeId_fkey` FOREIGN KEY (`examSchemeId`) REFERENCES `examScheme`(`examSchemeId`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `examSchemePaper` ADD CONSTRAINT `examSchemePaper_paperId_fkey` FOREIGN KEY (`paperId`) REFERENCES `paperDetailMaster`(`paperId`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `examSchemePaper` ADD CONSTRAINT `examSchemePaper_paperTypeId_fkey` FOREIGN KEY (`paperTypeId`) REFERENCES `paperTypeMaster`(`paperTypeId`) ON DELETE SET NULL ON UPDATE CASCADE;
