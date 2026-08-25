-- Optional one-shot: add B.P.Ed. sport-certificate graduation % rules
-- without full seed. Tables: programs, programEligibility

INSERT INTO `programEligibility`
  (`programId`, `ruleType`, `qualificationLevel`, `category`, `ruleKey`, `minPercent`, `severity`, `displayOrder`, `message`, `CreatedBy`, `IsActive`, `IsDeleted`)
SELECT p.programId, 'MIN_PERCENT', 'GRAD', 'GENERAL', 'NO_SPORT_CERT', 50.00, 'Compulsory', 6,
  'Compulsory: Without Sport Certificate — minimum Graduation aggregate 50% for GEN/OBC/Minority.',
  'System Seed', 1, 0
FROM `programs` p
WHERE p.programCode = '6' AND p.IsDeleted = 0
  AND NOT EXISTS (
    SELECT 1 FROM `programEligibility` e
    WHERE e.programId = p.programId AND e.ruleKey = 'NO_SPORT_CERT' AND e.category = 'GENERAL' AND e.IsDeleted = 0
  );

INSERT INTO `programEligibility`
  (`programId`, `ruleType`, `qualificationLevel`, `category`, `ruleKey`, `minPercent`, `severity`, `displayOrder`, `message`, `CreatedBy`, `IsActive`, `IsDeleted`)
SELECT p.programId, 'MIN_PERCENT', 'GRAD', 'RESERVED', 'NO_SPORT_CERT', 45.00, 'Compulsory', 7,
  'Compulsory: Without Sport Certificate — minimum Graduation aggregate 45% for SC/ST.',
  'System Seed', 1, 0
FROM `programs` p
WHERE p.programCode = '6' AND p.IsDeleted = 0
  AND NOT EXISTS (
    SELECT 1 FROM `programEligibility` e
    WHERE e.programId = p.programId AND e.ruleKey = 'NO_SPORT_CERT' AND e.category = 'RESERVED' AND e.IsDeleted = 0
  );

INSERT INTO `programEligibility`
  (`programId`, `ruleType`, `qualificationLevel`, `category`, `ruleKey`, `minPercent`, `severity`, `displayOrder`, `message`, `CreatedBy`, `IsActive`, `IsDeleted`)
SELECT p.programId, 'MIN_PERCENT', 'GRAD', 'GENERAL', 'SPORT_CERT', 45.00, 'Compulsory', 8,
  'Compulsory: With Sport Certificate — minimum Graduation aggregate 45% for GEN/OBC/Minority.',
  'System Seed', 1, 0
FROM `programs` p
WHERE p.programCode = '6' AND p.IsDeleted = 0
  AND NOT EXISTS (
    SELECT 1 FROM `programEligibility` e
    WHERE e.programId = p.programId AND e.ruleKey = 'SPORT_CERT' AND e.category = 'GENERAL' AND e.IsDeleted = 0
  );

INSERT INTO `programEligibility`
  (`programId`, `ruleType`, `qualificationLevel`, `category`, `ruleKey`, `minPercent`, `severity`, `displayOrder`, `message`, `CreatedBy`, `IsActive`, `IsDeleted`)
SELECT p.programId, 'MIN_PERCENT', 'GRAD', 'RESERVED', 'SPORT_CERT', 40.00, 'Compulsory', 9,
  'Compulsory: With Sport Certificate — minimum Graduation aggregate 40% for SC/ST.',
  'System Seed', 1, 0
FROM `programs` p
WHERE p.programCode = '6' AND p.IsDeleted = 0
  AND NOT EXISTS (
    SELECT 1 FROM `programEligibility` e
    WHERE e.programId = p.programId AND e.ruleKey = 'SPORT_CERT' AND e.category = 'RESERVED' AND e.IsDeleted = 0
  );
