-- Entrance paper + exam masters, student entrance roll, bulk generate SP

ALTER TABLE `students`
  ADD COLUMN IF NOT EXISTS `entranceRollnumber` VARCHAR(50) NULL;

CREATE UNIQUE INDEX IF NOT EXISTS `students_entranceRollnumber_key`
  ON `students` (`entranceRollnumber`);

CREATE TABLE IF NOT EXISTS `entrancePaperMaster` (
  `entrancePaperId` INTEGER NOT NULL AUTO_INCREMENT,
  `entrancePaperName` VARCHAR(100) NOT NULL,
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

  DROP TEMPORARY TABLE IF EXISTS tmp_ent_roll_students;
  CREATE TEMPORARY TABLE tmp_ent_roll_students (
    seq INT NOT NULL AUTO_INCREMENT,
    studentId INT NOT NULL,
    PRIMARY KEY (seq)
  );

  INSERT INTO tmp_ent_roll_students (studentId)
  SELECT s.StudentRegistrationId
  FROM students s
  INNER JOIN programs p ON p.programId = s.programId
  WHERE s.IsDeleted = 0
    AND s.programId = p_programId
    AND p.programCategoryId = p_programCategoryId
    AND (
      p_academicSessionId IS NULL
      OR p_academicSessionId = 0
      OR s.academicSessionId = p_academicSessionId
    )
    AND (s.entranceRollnumber IS NULL OR TRIM(s.entranceRollnumber) = '')
  ORDER BY s.StudentRegistrationId ASC;

  SELECT COUNT(*) INTO v_generated FROM tmp_ent_roll_students;

  SELECT COUNT(*) INTO v_skipped
  FROM students s
  INNER JOIN programs p ON p.programId = s.programId
  WHERE s.IsDeleted = 0
    AND s.programId = p_programId
    AND p.programCategoryId = p_programCategoryId
    AND (
      p_academicSessionId IS NULL
      OR p_academicSessionId = 0
      OR s.academicSessionId = p_academicSessionId
    )
    AND s.entranceRollnumber IS NOT NULL AND TRIM(s.entranceRollnumber) <> '';

  SET v_total = v_generated + v_skipped;

  SELECT IFNULL(MAX(CAST(RIGHT(entranceRollnumber, 3) AS UNSIGNED)), 0)
    INTO v_max
  FROM students
  WHERE entranceRollnumber LIKE CONCAT(CONVERT(v_prefix USING utf8mb4) COLLATE utf8mb4_unicode_ci, '%')
    AND CHAR_LENGTH(entranceRollnumber) = CHAR_LENGTH(CONCAT(v_prefix, '000'));

  UPDATE students s
  INNER JOIN tmp_ent_roll_students t ON t.studentId = s.StudentRegistrationId
  SET s.entranceRollnumber = CONCAT(v_prefix, LPAD(v_max + t.seq, 3, '0')),
      s.UpdatedBy = IFNULL(p_updatedBy, 'Admin User'),
      s.UpdatedOn = CURRENT_TIMESTAMP(3);

  DROP TEMPORARY TABLE IF EXISTS tmp_ent_roll_students;
  SELECT RELEASE_LOCK('sp_bulk_generate_entrance_roll') INTO @ent_unlock;

  SELECT v_generated AS generated, v_skipped AS skipped, v_total AS total, v_prefix AS prefix;
END;
