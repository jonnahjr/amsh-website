-- ============================================================
-- AMSH ULTIMATE DATABASE FIX (V3 - MySQL 5.5 Compatibility)
-- Run this on your production MySQL database to fix ALL 500 errors.
-- This version removed datetime(3) to support older MySQL versions.
-- ============================================================

USE `orginal`;

-- ============================================================
-- 1. FIX SITE SETTINGS (Essential for Dashboard & Mail)
-- ============================================================
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` longtext NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'text',
  `group` varchar(191) NOT NULL DEFAULT 'general',
  `label` varchar(191) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. FIX FORMS & CLINICAL ATTACHMENT
-- ============================================================
CREATE TABLE IF NOT EXISTS `forms` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `fields` longtext NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `isPublic` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed the Clinical Attachment Form (Required for foreign key)
REPLACE INTO `forms` (`id`, `title`, `description`, `fields`, `isActive`, `isPublic`, `createdAt`, `updatedAt`)
VALUES (
    'clinical-attachment-form',
    'Clinical Attachment Application',
    'Institutional and individual clinical attachment requests',
    '[{"name":"institutionName","label":"Institution/Full Name","type":"text","required":true},{"name":"departmentName","label":"Department","type":"select","required":true},{"name":"profession","label":"Profession","type":"select","required":true},{"name":"studentCount","label":"Student Count","type":"number","required":true},{"name":"durationValue","label":"Duration","type":"text","required":true},{"name":"startDate","label":"Start Date","type":"date","required":true},{"name":"contactPerson","label":"Contact Person","type":"text","required":true},{"name":"phoneNumber","label":"Phone Number","type":"text","required":true},{"name":"email","label":"Email","type":"email","required":true}]',
    1,
    1,
    NOW(),
    NOW()
);

-- ============================================================
-- 3. FIX FORM SUBMISSIONS (Missing 'status' column)
-- ============================================================
CREATE TABLE IF NOT EXISTS `form_submissions` (
  `id` varchar(191) NOT NULL,
  `formId` varchar(191) NOT NULL,
  `data` longtext NOT NULL,
  `userId` varchar(191) DEFAULT NULL,
  `ipAddress` varchar(191) DEFAULT NULL,
  `userAgent` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `form_submissions_formId_fkey` (`formId`),
  CONSTRAINT `form_submissions_formId_fkey` FOREIGN KEY (`formId`) REFERENCES `forms` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add 'status' column if table exists without it
SET @dbname = DATABASE();
SET @tablename = 'form_submissions';
SET @columnname = 'status';
SET @preparedStatement = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = @dbname AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) > 0,
  'SELECT 1',
  CONCAT('ALTER TABLE ', @tablename, ' ADD COLUMN ', @columnname, ' VARCHAR(191) NOT NULL DEFAULT "PENDING"')
));
PREPARE stmt FROM @preparedStatement; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- ============================================================
-- 4. FIX RESEARCH TABLE (Adding missing fields from v16 schema)
-- ============================================================
-- Add missing research columns safely
SET @dbname = DATABASE();
SET @tablename = 'research';

-- Helper function simulation for multiple columns in old MySQL
DROP PROCEDURE IF EXISTS AddResearchColumns;
DELIMITER //
CREATE PROCEDURE AddResearchColumns()
BEGIN
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='research' AND COLUMN_NAME='sampleSize') THEN
        ALTER TABLE `research` ADD COLUMN `sampleSize` VARCHAR(191) NULL;
    END IF;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='research' AND COLUMN_NAME='correspondingAuthorName') THEN
        ALTER TABLE `research` ADD COLUMN `correspondingAuthorName` VARCHAR(191) NULL;
    END IF;
     IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='research' AND COLUMN_NAME='correspondingAuthorEmail') THEN
        ALTER TABLE `research` ADD COLUMN `correspondingAuthorEmail` VARCHAR(191) NULL;
    END IF;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='research' AND COLUMN_NAME='ethicsApproved') THEN
        ALTER TABLE `research` ADD COLUMN `ethicsApproved` TINYINT(1) DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='research' AND COLUMN_NAME='ethicsCommittee') THEN
        ALTER TABLE `research` ADD COLUMN `ethicsCommittee` VARCHAR(191) NULL;
    END IF;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='research' AND COLUMN_NAME='ethicsApprovalNumber') THEN
        ALTER TABLE `research` ADD COLUMN `ethicsApprovalNumber` VARCHAR(191) NULL;
    END IF;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='research' AND COLUMN_NAME='fundingSource') THEN
        ALTER TABLE `research` ADD COLUMN `fundingSource` VARCHAR(191) NULL;
    END IF;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='research' AND COLUMN_NAME='volume') THEN
        ALTER TABLE `research` ADD COLUMN `volume` VARCHAR(191) NULL;
    END IF;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='research' AND COLUMN_NAME='issue') THEN
        ALTER TABLE `research` ADD COLUMN `issue` VARCHAR(191) NULL;
    END IF;
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='research' AND COLUMN_NAME='findingsSummary') THEN
        ALTER TABLE `research` ADD COLUMN `findingsSummary` LONGTEXT NULL;
    END IF;
END //
DELIMITER ;
CALL AddResearchColumns();
DROP PROCEDURE IF EXISTS AddResearchColumns;

-- Ensure required status default
ALTER TABLE `research` MODIFY COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING';

-- ============================================================
-- 5. FIX CPD REGISTRATIONS (Ensure professions columns exist)
-- ============================================================
SET @tablename = 'cpd_registrations';
SET @columnname = 'profession';
SET @preparedStatement = (SELECT IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) > 0, 'SELECT 1', 'ALTER TABLE `cpd_registrations` ADD COLUMN `profession` VARCHAR(191) NOT NULL DEFAULT ""'));
PREPARE stmt FROM @preparedStatement; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @columnname = 'workplace';
SET @preparedStatement = (SELECT IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) > 0, 'SELECT 1', 'ALTER TABLE `cpd_registrations` ADD COLUMN `workplace` VARCHAR(191) NOT NULL DEFAULT ""'));
PREPARE stmt FROM @preparedStatement; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @columnname = 'category';
SET @preparedStatement = (SELECT IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = @tablename AND COLUMN_NAME = @columnname) > 0, 'SELECT 1', 'ALTER TABLE `cpd_registrations` ADD COLUMN `category` VARCHAR(191) NOT NULL DEFAULT "PERSONAL"'));
PREPARE stmt FROM @preparedStatement; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Done!
SELECT 'AMSH Ultimate Database Fix (V3) compatibility version applied!' AS result;
