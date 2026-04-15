-- Create site_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` VARCHAR(191) NOT NULL,
  `key` VARCHAR(191) NOT NULL,
  `value` TEXT NOT NULL,
  `type` VARCHAR(191) NOT NULL DEFAULT 'text',
  `group` VARCHAR(191) NOT NULL DEFAULT 'general',
  `label` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `site_settings_key_key`(`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seed default financial settings for clinical attachment
INSERT IGNORE INTO `site_settings` (`id`, `key`, `value`, `type`, `group`, `label`, `createdAt`, `updatedAt`) VALUES 
('set_001', 'attachment_bank_account', 'Commercial Bank of Ethiopia: 1000163359676', 'text', 'finance', 'Hospital Bank Account', NOW(), NOW()),
('set_002', 'attachment_rate_1m', '300', 'number', 'finance', 'Rate: Up to 1 Month', NOW(), NOW()),
('set_003', 'attachment_rate_1_5m', '450', 'number', 'finance', 'Rate: 1.5 Months', NOW(), NOW()),
('set_004', 'attachment_rate_2m', '600', 'number', 'finance', 'Rate: 2 Months', NOW(), NOW());
