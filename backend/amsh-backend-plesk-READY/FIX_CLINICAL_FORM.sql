-- ============================================================
-- AMSH CLINICAL FORM FIX
-- Run this on your production MySQL database to fix 500 errors
-- during clinical attachment form submission.
-- ============================================================

USE `orginal`;

-- 1. Ensure the 'forms' table exists (Safety check)
CREATE TABLE IF NOT EXISTS `forms` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `fields` longtext NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `isPublic` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Insert the missing Clinical Attachment Form record
-- This is NECESSARY because form_submissions has a foreign key to this table.
REPLACE INTO `forms` (`id`, `title`, `description`, `fields`, `isActive`, `isPublic`, `updatedAt`)
VALUES (
    'clinical-attachment-form',
    'Clinical Attachment Application',
    'Institutional and individual clinical attachment requests',
    '[{"name":"institutionName","label":"Institution/Full Name","type":"text","required":true},{"name":"departmentName","label":"Department","type":"select","required":true},{"name":"profession","label":"Profession","type":"select","required":true},{"name":"studentCount","label":"Student Count","type":"number","required":true},{"name":"durationValue","label":"Duration","type":"text","required":true},{"name":"startDate","label":"Start Date","type":"date","required":true},{"name":"contactPerson","label":"Contact Person","type":"text","required":true},{"name":"phoneNumber","label":"Phone Number","type":"text","required":true},{"name":"email","label":"Email","type":"email","required":true}]',
    1,
    1,
    NOW()
);

-- 3. Ensure the 'form_submissions' table has the 'status' column
-- (Fixes "Unknown column 'status'" errors)
SET @dbname = DATABASE();
SET @tablename = 'form_submissions';
SET @columnname = 'status';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_SCHEMA = @dbname
     AND TABLE_NAME = @tablename
     AND COLUMN_NAME = @columnname) > 0,
  'SELECT 1',
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(191) NOT NULL DEFAULT "PENDING"')
));
PREPARE stmt FROM @preparedStatement;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Done!
SELECT 'Clinical Form successfully registered in database. Submissions should now work.' AS result;
