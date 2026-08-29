-- Move rollNo next to rollId in existing studentRollNumber table
ALTER TABLE `studentRollNumber`
  MODIFY COLUMN `rollNo` VARCHAR(12) NOT NULL AFTER `rollId`;
