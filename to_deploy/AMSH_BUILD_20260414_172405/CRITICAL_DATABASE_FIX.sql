-- CRITICAL DATABASE FIX FOR AMSH PRODUCTION
-- Run this script in your MySQL console (via Plesk or phpMyAdmin) to ensure your database 
-- schema matches the application requirements.

USE orginal;

-- 1. Ensure 'research' table has ALL required columns
ALTER TABLE `research` ADD COLUMN `publishedAt` DATETIME NULL;
ALTER TABLE `research` ADD COLUMN `abstract` TEXT NULL;
ALTER TABLE `research` ADD COLUMN `submissionId` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `investigatorName` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `institution` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `category` VARCHAR(191) NOT NULL DEFAULT 'General';
ALTER TABLE `research` ADD COLUMN `views` INT NOT NULL DEFAULT 0;
ALTER TABLE `research` ADD COLUMN `downloads` INT NOT NULL DEFAULT 0;
ALTER TABLE `research` ADD COLUMN `journal` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `year` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `doi` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `researchType` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `studyArea` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `studyLocation` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `startDate` DATETIME NULL;
ALTER TABLE `research` ADD COLUMN `endDate` DATETIME NULL;
ALTER TABLE `research` ADD COLUMN `keywords` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `publishedEthical` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `publishedProposal` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `email` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `phone` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `department` VARCHAR(191) NULL;
ALTER TABLE `research` ADD COLUMN `position` VARCHAR(191) NULL;

-- Ensure departments has required columns
ALTER TABLE `departments` ADD COLUMN `image` VARCHAR(191) NULL;
ALTER TABLE `departments` ADD COLUMN `headImage` VARCHAR(191) NULL;
ALTER TABLE `departments` ADD COLUMN `gallery` TEXT NULL;
ALTER TABLE `departments` ADD COLUMN `headName` VARCHAR(191) NULL;
ALTER TABLE `departments` ADD COLUMN `headTitle` VARCHAR(191) NULL;
ALTER TABLE `departments` ADD COLUMN `headProfession` VARCHAR(191) NULL;
ALTER TABLE `departments` ADD COLUMN `categoryName` VARCHAR(191) NULL DEFAULT 'Clinical Departments';
ALTER TABLE `departments` ADD COLUMN `categoryId` VARCHAR(191) NULL;
ALTER TABLE `departments` ADD COLUMN `showOnHome` TINYINT(1) NOT NULL DEFAULT 0;

-- Ensure site_settings exists properly
ALTER TABLE `site_settings` MODIFY COLUMN `value` MEDIUMTEXT NULL;

-- Final verification
DESCRIBE `research`;
