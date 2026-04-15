-- ============================================================
-- AMSH CONSOLIDATED RESEARCH TABLE FIX (COMPATIBILITY VERSION)
-- Works on MySQL 5.5, 5.7, 8.0 and MariaDB.
-- Ensures the 'research' table has all required fields.
-- ============================================================

DELIMITER $$

DROP PROCEDURE IF EXISTS AddResearchColumns $$

CREATE PROCEDURE AddResearchColumns()
BEGIN
    -- 1. sampleSize
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'sampleSize') THEN
        ALTER TABLE `research` ADD COLUMN `sampleSize` varchar(191) DEFAULT NULL;
    END IF;

    -- 2. correspondingAuthorName
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'correspondingAuthorName') THEN
        ALTER TABLE `research` ADD COLUMN `correspondingAuthorName` varchar(191) DEFAULT NULL;
    END IF;

    -- 3. correspondingAuthorEmail
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'correspondingAuthorEmail') THEN
        ALTER TABLE `research` ADD COLUMN `correspondingAuthorEmail` varchar(191) DEFAULT NULL;
    END IF;

    -- 4. ethicsApproved
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'ethicsApproved') THEN
        ALTER TABLE `research` ADD COLUMN `ethicsApproved` tinyint(1) DEFAULT 0;
    END IF;

    -- 5. ethicsCommittee
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'ethicsCommittee') THEN
        ALTER TABLE `research` ADD COLUMN `ethicsCommittee` varchar(191) DEFAULT NULL;
    END IF;

    -- 6. ethicsApprovalNumber
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'ethicsApprovalNumber') THEN
        ALTER TABLE `research` ADD COLUMN `ethicsApprovalNumber` varchar(191) DEFAULT NULL;
    END IF;

    -- 7. fundingSource
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'fundingSource') THEN
        ALTER TABLE `research` ADD COLUMN `fundingSource` varchar(191) DEFAULT NULL;
    END IF;

    -- 8. volume
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'volume') THEN
        ALTER TABLE `research` ADD COLUMN `volume` varchar(191) DEFAULT NULL;
    END IF;

    -- 9. issue
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'issue') THEN
        ALTER TABLE `research` ADD COLUMN `issue` varchar(191) DEFAULT NULL;
    END IF;

    -- 10. findingsSummary
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'findingsSummary') THEN
        ALTER TABLE `research` ADD COLUMN `findingsSummary` longtext DEFAULT NULL;
    END IF;
    
    -- 11. findingsSummary (ensure type correctness if already exists)
    ALTER TABLE `research` MODIFY COLUMN `findingsSummary` longtext DEFAULT NULL;

    -- 12. coInvestigators (ensure TEXT type)
    ALTER TABLE `research` MODIFY COLUMN `coInvestigators` text DEFAULT NULL;

    -- 13. keywords (ensure TEXT type)
    ALTER TABLE `research` MODIFY COLUMN `keywords` text DEFAULT NULL;

    -- 14. doi
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'doi') THEN
        ALTER TABLE `research` ADD COLUMN `doi` varchar(191) DEFAULT NULL;
    END IF;

    -- 15. publishedAt
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'research' AND COLUMN_NAME = 'publishedAt') THEN
        ALTER TABLE `research` ADD COLUMN `publishedAt` datetime DEFAULT NULL;
    END IF;

END $$

DELIMITER ;

-- Execute the procedure
CALL AddResearchColumns();

-- Clean up
DROP PROCEDURE AddResearchColumns;

SELECT 'AMSH RESEARCH TABLE SYNC COMPLETE' AS result;
