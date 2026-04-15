-- ============================================================
-- AMSH DATABASE FIX SCRIPT
-- Run this on your production MySQL database to fix 500 errors
-- on /api/cpd/registrations/all and /api/forms/all/submissions
-- ============================================================

USE `orginal`;

-- ============================================================
-- 1. CREATE cpd_courses TABLE (if not exists)
-- ============================================================
CREATE TABLE IF NOT EXISTS `cpd_courses` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` longtext NOT NULL,
  `content` longtext,
  `instructor` varchar(191) NOT NULL,
  `duration` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `level` varchar(191) NOT NULL DEFAULT 'Intermediate',
  `image` varchar(191) DEFAULT NULL,
  `documents` longtext,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `location` varchar(191) DEFAULT NULL,
  `isOnline` tinyint(1) NOT NULL DEFAULT '0',
  `capacity` int DEFAULT NULL,
  `price` double NOT NULL DEFAULT '0',
  `cpdPoints` int NOT NULL DEFAULT '0',
  `status` varchar(191) NOT NULL DEFAULT 'DRAFT',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. CREATE cpd_registrations TABLE (if not exists)
-- ============================================================
CREATE TABLE IF NOT EXISTS `cpd_registrations` (
  `id` varchar(191) NOT NULL,
  `courseId` varchar(191) NOT NULL,
  `firstName` varchar(191) NOT NULL,
  `lastName` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `profession` varchar(191) NOT NULL DEFAULT '',
  `workplace` varchar(191) NOT NULL DEFAULT '',
  `category` varchar(191) NOT NULL DEFAULT 'PERSONAL',
  `licenseNo` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'PENDING',
  `certificate` varchar(191) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cpd_registrations_courseId_fkey` (`courseId`),
  CONSTRAINT `cpd_registrations_courseId_fkey`
    FOREIGN KEY (`courseId`) REFERENCES `cpd_courses` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. ADD MISSING COLUMNS to cpd_registrations (if table exists but columns are missing)
-- ============================================================
ALTER TABLE `cpd_registrations`
  ADD COLUMN IF NOT EXISTS `profession` varchar(191) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS `workplace` varchar(191) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS `category` varchar(191) NOT NULL DEFAULT 'PERSONAL',
  ADD COLUMN IF NOT EXISTS `certificate` varchar(191) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `status` varchar(191) NOT NULL DEFAULT 'PENDING';

-- ============================================================
-- 4. CREATE forms TABLE (if not exists)
-- ============================================================
CREATE TABLE IF NOT EXISTS `forms` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `fields` longtext NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `isPublic` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 5. CREATE form_submissions TABLE (if not exists)
-- ============================================================
CREATE TABLE IF NOT EXISTS `form_submissions` (
  `id` varchar(191) NOT NULL,
  `formId` varchar(191) NOT NULL,
  `data` longtext NOT NULL,
  `userId` varchar(191) DEFAULT NULL,
  `ipAddress` varchar(191) DEFAULT NULL,
  `userAgent` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `form_submissions_formId_fkey` (`formId`),
  KEY `form_submissions_userId_fkey` (`userId`),
  CONSTRAINT `form_submissions_formId_fkey`
    FOREIGN KEY (`formId`) REFERENCES `forms` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `form_submissions_userId_fkey`
    FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 6. ADD MISSING COLUMNS to form_submissions (if table exists but status column is missing)
-- ============================================================
ALTER TABLE `form_submissions`
  ADD COLUMN IF NOT EXISTS `status` varchar(191) NOT NULL DEFAULT 'PENDING';

-- Done!
SELECT 'AMSH Database fix complete. All CPD and Forms tables are ready.' AS result;

-- ============================================================
-- 7. UPDATE RESEARCH TABLE
-- ============================================================
ALTER TABLE `research`
  ADD COLUMN IF NOT EXISTS `sampleSize` varchar(191) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `correspondingAuthorName` varchar(191) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `correspondingAuthorEmail` varchar(191) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `ethicsApproved` tinyint(1) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `ethicsCommittee` varchar(191) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `ethicsApprovalNumber` varchar(191) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `fundingSource` varchar(191) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `volume` varchar(191) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `issue` varchar(191) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `findingsSummary` longtext DEFAULT NULL;

