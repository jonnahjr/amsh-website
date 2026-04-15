USE `orginal`;

-- ============================================================
-- Fix existing NULL values that are crashing Prisma
-- ============================================================
UPDATE `site_settings` SET `type` = 'text' WHERE `type` IS NULL;
UPDATE `site_settings` SET `group` = 'general' WHERE `group` IS NULL;
UPDATE `site_settings` SET `label` = `key` WHERE `label` IS NULL;
UPDATE `site_settings` SET `value` = '' WHERE `value` IS NULL;

-- ============================================================
-- Alter table to match strict Prisma schema requirements
-- ============================================================
ALTER TABLE `site_settings` 
  MODIFY `value` LONGTEXT NOT NULL,
  MODIFY `type` VARCHAR(191) NOT NULL DEFAULT 'text',
  MODIFY `group` VARCHAR(191) NOT NULL DEFAULT 'general',
  MODIFY `label` VARCHAR(191) NOT NULL;

-- Insert default essential settings if they don't exist
INSERT IGNORE INTO `site_settings` (`id`, `key`, `value`, `type`, `group`, `label`, `createdAt`, `updatedAt`) VALUES 
('setting_1', 'siteName', 'Amanuel Mental Specialized Hospital', 'text', 'general', 'Site Name', NOW(), NOW()),
('setting_2', 'contactEmail', 'info@amsh.gov.et', 'email', 'general', 'Contact Email', NOW(), NOW()),
('setting_3', 'contactPhone', '+251 112 75 01 22', 'text', 'general', 'Contact Phone', NOW(), NOW()),
('setting_4', 'address', 'Addis Ababa, Ethiopia', 'text', 'general', 'Address', NOW(), NOW());

SELECT 'AMSH site_settings fix complete.' AS result;
