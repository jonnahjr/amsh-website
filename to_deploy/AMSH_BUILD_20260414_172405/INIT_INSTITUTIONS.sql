-- Create Institutions table for MOU management (Maximum compatibility for older MySQL/Prisma)
CREATE TABLE IF NOT EXISTS `institutions` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `mouStart` DATETIME NOT NULL,
  `mouEnd` DATETIME NOT NULL,
  `status` VARCHAR(191) NOT NULL DEFAULT 'Approved',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `institutions_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seed initial data
INSERT IGNORE INTO `institutions` (`id`, `name`, `mouStart`, `mouEnd`, `status`, `createdAt`, `updatedAt`) VALUES 
('uni_001', 'Addis Ababa University (AAU)', '2024-01-01 00:00:00', '2026-01-01 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_002', 'St. Paul''s Hospital Millennium Medical College', '2024-01-01 00:00:00', '2026-01-01 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_003', 'Jimma University', '2024-01-10 00:00:00', '2026-01-10 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_004', 'Gondar University', '2024-02-15 00:00:00', '2026-02-15 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_005', 'Bahir Dar University', '2023-11-20 00:00:00', '2025-11-20 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_006', 'Mekelle University', '2024-03-10 00:00:00', '2026-03-10 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_007', 'Hawassa University', '2023-05-01 00:00:00', '2025-05-01 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_008', 'Arsi University', '2024-01-10 00:00:00', '2026-01-10 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_011', 'Hayat Medical College', '2022-01-01 00:00:00', '2024-01-01 00:00:00', 'Expired', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_012', 'Better Bridge College', '2022-06-01 00:00:00', '2024-06-01 00:00:00', 'Expired', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_013', 'Central Health College', '2023-12-01 00:00:00', '2025-12-01 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_014', 'MyungSung Medical College (MCM)', '2024-01-20 00:00:00', '2026-01-20 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_015', 'Unity University', '2024-02-01 00:00:00', '2026-02-01 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('uni_016', 'Africa Medical College', '2024-03-01 00:00:00', '2026-03-01 00:00:00', 'Approved', '2024-01-01 00:00:00', '2024-01-01 00:00:00');
