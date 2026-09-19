-- Entrance paper + exam masters. Roll is not stored on students.

ALTER TABLE `students`
  DROP INDEX IF EXISTS `students_entranceRollnumber_key`;

ALTER TABLE `students`
  DROP COLUMN IF EXISTS `entranceRollnumber`;

CREATE TABLE IF NOT EXISTS `entrancePaperMaster` (
  `entrancePaperId` INTEGER NOT NULL AUTO_INCREMENT,
  `entrancePaperName` VARCHAR(100) NOT NULL,
  `maxMarks` DOUBLE NULL,
  `minMarks` DOUBLE NULL,
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
  PRIMARY KEY (`entrancePaperId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `entranceExamMaster` (
  `entranceExamId` INTEGER NOT NULL AUTO_INCREMENT,
  `academicSessionId` INTEGER NOT NULL,
  `academicSessionName` VARCHAR(100) NULL,
  `programCategoryId` INTEGER NOT NULL,
  `programCategoryName` VARCHAR(100) NULL,
  `programId` INTEGER NOT NULL,
  `programName` VARCHAR(100) NULL,
  `entrancePaperId` INTEGER NOT NULL,
  `entrancePaperName` VARCHAR(100) NULL,
  `examDate` VARCHAR(50) NULL,
  `fromTime` VARCHAR(50) NULL,
  `toTime` VARCHAR(50) NULL,
  `rollNumberSequence` VARCHAR(50) NULL,
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
  PRIMARY KEY (`entranceExamId`),
  INDEX `entranceExamMaster_session_program_paper_idx` (`academicSessionId`, `programId`, `entrancePaperId`),
  INDEX `entranceExamMaster_programCategoryId_idx` (`programCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DROP PROCEDURE IF EXISTS `sp_bulk_generate_entrance_roll`;

CREATE PROCEDURE `sp_bulk_generate_entrance_roll`(
  IN p_academicSessionId INT,
  IN p_programCategoryId INT,
  IN p_programId INT,
  IN p_updatedBy VARCHAR(255)
)
BEGIN
  DECLARE v_year CHAR(4) DEFAULT '0000';
  DECLARE v_code VARCHAR(8) DEFAULT '00';
  DECLARE v_prefix VARCHAR(32);
  DECLARE v_max INT DEFAULT 0;
  DECLARE v_generated INT DEFAULT 0;
  DECLARE v_skipped INT DEFAULT 0;
  DECLARE v_total INT DEFAULT 0;

  IF p_programId IS NULL OR p_programId <= 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'programId is required';
  END IF;
  IF p_programCategoryId IS NULL OR p_programCategoryId <= 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'programCategoryId is required';
  END IF;

  SELECT GET_LOCK('sp_bulk_generate_entrance_roll', 15) INTO @ent_lock;

  SELECT LPAD(CAST(IFNULL(startYear, 0) AS CHAR), 4, '0')
    INTO v_year
  FROM academicSessionMaster
  WHERE academicSessionId = p_academicSessionId AND IsDeleted = 0
  LIMIT 1;

  IF v_year IS NULL OR v_year = '0000' THEN
    SET v_year = DATE_FORMAT(NOW(), '%Y');
  END IF;

  SELECT LPAD(
    CASE
      WHEN programCode REGEXP '^[0-9]+$' THEN CAST(programCode AS UNSIGNED)
      ELSE programId
    END, 2, '0')
  INTO v_code
  FROM programs
  WHERE programId = p_programId AND IsDeleted = 0
  LIMIT 1;

  IF v_code IS NULL THEN
    SET v_code = LPAD(p_programId, 2, '0');
  END IF;

  SET v_prefix = CONCAT(v_year, '686', v_code);

  SELECT COUNT(*) INTO v_total
  FROM students s
  INNER JOIN programs p ON p.programId = s.programId
  WHERE s.IsDeleted = 0
    AND s.programId = p_programId
    AND p.programCategoryId = p_programCategoryId
    AND (
      p_academicSessionId IS NULL
      OR p_academicSessionId = 0
      OR s.academicSessionId = p_academicSessionId
    );

  SET v_generated = 0;
  SET v_skipped = v_total;

  SELECT RELEASE_LOCK('sp_bulk_generate_entrance_roll') INTO @ent_unlock;

  SELECT v_generated AS generated, v_skipped AS skipped, v_total AS total, v_prefix AS prefix;
END;

CREATE TABLE IF NOT EXISTS `entranceStudent` (
  `entranceStudentId` INTEGER NOT NULL AUTO_INCREMENT,
  `studentId` INTEGER NOT NULL,
  `academicSessionId` INTEGER NOT NULL,
  `academicSessionName` VARCHAR(100) NULL,
  `programCategoryId` INTEGER NOT NULL,
  `programCategoryName` VARCHAR(100) NULL,
  `programId` INTEGER NOT NULL,
  `programName` VARCHAR(100) NULL,
  `programShortName` VARCHAR(50) NULL,
  `entranceRollnumber` VARCHAR(50) NOT NULL,
  `registrationNo` VARCHAR(100) NULL,
  `candidateName` VARCHAR(255) NULL,
  `fatherName` VARCHAR(255) NULL,
  `motherName` VARCHAR(255) NULL,
  `mobileNo` VARCHAR(20) NULL,
  `email` VARCHAR(255) NULL,
  `stream` VARCHAR(100) NULL,
  `photoUrl` VARCHAR(500) NULL,
  `signatureUrl` VARCHAR(500) NULL,
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
  PRIMARY KEY (`entranceStudentId`),
  UNIQUE INDEX `entranceStudent_entranceRollnumber_key` (`entranceRollnumber`),
  UNIQUE INDEX `entranceStudent_student_session_program_key` (`studentId`, `academicSessionId`, `programId`),
  INDEX `entranceStudent_programCategoryId_idx` (`programCategoryId`),
  INDEX `entranceStudent_programId_idx` (`programId`),
  INDEX `entranceStudent_academicSessionId_idx` (`academicSessionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `entranceStudentPaper` (
  `entranceStudentPaperId` INTEGER NOT NULL AUTO_INCREMENT,
  `entranceStudentId` INTEGER NOT NULL,
  `studentId` INTEGER NOT NULL,
  `entranceExamId` INTEGER NULL,
  `entrancePaperId` INTEGER NOT NULL,
  `entrancePaperName` VARCHAR(100) NULL,
  `examDate` VARCHAR(50) NULL,
  `fromTime` VARCHAR(50) NULL,
  `toTime` VARCHAR(50) NULL,
  `maxMarks` DOUBLE NULL,
  `minMarks` DOUBLE NULL,
  `obtainedMarks` DOUBLE NULL,
  `attendanceStatus` VARCHAR(10) NULL,
  `result` VARCHAR(20) NULL,
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
  PRIMARY KEY (`entranceStudentPaperId`),
  UNIQUE INDEX `entranceStudentPaper_student_paper_key` (`entranceStudentId`, `entrancePaperId`),
  INDEX `entranceStudentPaper_studentId_idx` (`studentId`),
  INDEX `entranceStudentPaper_entrancePaperId_idx` (`entrancePaperId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
