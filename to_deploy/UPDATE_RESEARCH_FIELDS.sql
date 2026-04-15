-- ============================================================
-- AMSH RESEARCH TABLE FIX SCRIPT
-- Run this on your production MySQL database to add the new
-- research metadata fields (Journal Info, Sample Size, Ethics)
-- ============================================================

USE `orginal`;

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

SELECT 'AMSH Research fields successfully updated.' AS result;
