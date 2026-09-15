-- Exam grievance applications (Photocopy / Scrutiny / Revaluation)

CREATE TABLE IF NOT EXISTS `examGrevianceApplication` (
    `examGrevianceApplicationId` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NULL,
    `rollNo` VARCHAR(100) NOT NULL,
    `enrolmentNo` VARCHAR(100) NULL,
    `examTypeId` INTEGER NULL,
    `examTypeName` VARCHAR(100) NULL,
    `programCategoryId` INTEGER NULL,
    `programCategoryName` VARCHAR(255) NULL,
    `programId` INTEGER NULL,
    `programName` VARCHAR(255) NULL,
    `studentName` VARCHAR(255) NULL,
    `fatherName` VARCHAR(255) NULL,
    `motherName` VARCHAR(255) NULL,
    `dob` DATETIME(3) NULL,
    `castCategory` VARCHAR(100) NULL,
    `gender` VARCHAR(50) NULL,
    `emailId` VARCHAR(255) NULL,
    `mobileNo` VARCHAR(20) NULL,
    `academicSessionId` INTEGER NULL,
    `examinationDetailId` INTEGER NULL,
    `examinationName` VARCHAR(100) NULL,
    `yearId` INTEGER NULL,
    `yearName` VARCHAR(100) NULL,
    `semId` INTEGER NULL,
    `semesterName` VARCHAR(100) NULL,
    `grevianceTypeId` INTEGER NULL,
    `grevianceTypeName` VARCHAR(100) NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'SUBMITTED',
    `feeAmount` DOUBLE NULL DEFAULT 0,
    `paymentStatus` VARCHAR(50) NULL DEFAULT 'PENDING',
    `paymentRef` VARCHAR(100) NULL,
    `CreatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CreatedBy` VARCHAR(255) NULL,
    `UpdatedOn` DATETIME(3) NULL,
    `UpdatedBy` VARCHAR(255) NULL,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsDeleted` BOOLEAN NOT NULL DEFAULT false,
    `DeletedRemarks` VARCHAR(255) NULL,
    `DeletedOn` DATETIME(3) NULL,
    `DeletedBy` VARCHAR(255) NULL,
    `Remarks` VARCHAR(255) NULL,
    INDEX `examGrevianceApplication_rollNo_idx`(`rollNo`),
    INDEX `examGrevianceApplication_studentId_idx`(`studentId`),
    INDEX `examGrevianceApplication_grevianceTypeId_idx`(`grevianceTypeId`),
    INDEX `examGrevianceApplication_status_idx`(`status`),
    INDEX `examGrevianceApplication_programId_idx`(`programId`),
    PRIMARY KEY (`examGrevianceApplicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `examGrevianceApplicationPaper` (
    `examGrevianceApplicationPaperId` INTEGER NOT NULL AUTO_INCREMENT,
    `examGrevianceApplicationId` INTEGER NOT NULL,
    `examResultId` INTEGER NULL,
    `paperId` INTEGER NULL,
    `paperCode` VARCHAR(100) NULL,
    `subjectName` VARCHAR(255) NULL,
    `paperName` VARCHAR(255) NULL,
    `paperType` VARCHAR(100) NULL,
    `CreatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX `examGrevianceApplicationPaper_app_idx`(`examGrevianceApplicationId`),
    INDEX `examGrevianceApplicationPaper_examResultId_idx`(`examResultId`),
    INDEX `examGrevianceApplicationPaper_paperId_idx`(`paperId`),
    PRIMARY KEY (`examGrevianceApplicationPaperId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seed greviance types if missing
INSERT IGNORE INTO `grevianceTypeMaster` (`grevianceTypeName`, `CreatedBy`, `IsActive`, `IsDeleted`)
VALUES
  ('Photocopy of Answersheet', 'System', true, false),
  ('Scrutiny/Rechecking', 'System', true, false),
  ('Revaluation', 'System', true, false);
