
$sqlPath = "c:\Users\jonas\Desktop\AMSH\backend\SUPABASE_ULTIMATE_SETUP.sql"
$outputPath = "c:\Users\jonas\Desktop\AMSH\backend\SUPABASE_ULTIMATE_SETUP_MYSQL55.sql"

$content = Get-Content $sqlPath -Raw
$lines = $content -split "`r?`n"

# Only take lines from 63 onwards (Postgres block)
$relevantContent = $lines[62..($lines.Count - 1)] -join "`r`n"

# Replace double quotes with backticks
$newContent = $relevantContent.Replace('"', '`')

# Ensure all CREATE TABLE have backticks
$newContent = [regex]::Replace($newContent, 'CREATE TABLE (\w+)', 'CREATE TABLE `$1`')

# Data types
$newContent = $newContent.Replace('BOOLEAN', 'TINYINT(1)')
$newContent = $newContent.Replace('false', '0')
$newContent = $newContent.Replace('true', '1')
$newContent = $newContent.Replace('INTEGER', 'INT')
$newContent = $newContent.Replace('DOUBLE PRECISION', 'DOUBLE')

# Handle TIMESTAMP/DATETIME for MySQL 5.5
$newContent = $newContent.Replace('TIMESTAMP(3)', 'DATETIME')
$newContent = $newContent.Replace('DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP', 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP')
$newContent = $newContent.Replace('DATETIME DEFAULT CURRENT_TIMESTAMP', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP')

# MySQL 5.5 Index Length Fix
$newContent = $newContent.Replace('VARCHAR(255)', 'VARCHAR(191)')

# MySQL 5.5 Fix: TEXT columns CANNOT have a DEFAULT value
$newContent = [regex]::Replace($newContent, '`(\w+)` TEXT( NOT NULL)? DEFAULT', '`$1` VARCHAR(191)$2 DEFAULT')

# PRIMARY KEY Fix
$newContent = [regex]::Replace($newContent, 'CONSTRAINT `\w+_pkey` PRIMARY KEY \(`(\w+)`\)', 'PRIMARY KEY (`$1`)')

# IDs/Slugs/Emails/FKs to VARCHAR(191)
# Catching columns that end in Id, email, slug, By, or are exactly 'id' 'target' 'value' 'key' if needed
$newContent = [regex]::Replace($newContent, '`(\w*Id|id|slug|email|submittedBy|postedById)` TEXT( NOT NULL)?', '`$1` VARCHAR(191)$2')

# UNIQUE INDEXES
$newContent = [regex]::Replace($newContent, 'CREATE UNIQUE INDEX `(\w+)` ON `(\w+)`\(`(\w+)`\);', 'ALTER TABLE `$2` ADD UNIQUE KEY `$1` (`$3`);')

# Remove session replication role
$newContent = [regex]::Replace($newContent, 'SET session_replication_role = ''\w+'';', '')

# Idempotency: Add DROP TABLE IF EXISTS before CREATE TABLE
$newContent = [regex]::Replace($newContent, 'CREATE TABLE (`\w+`)', "DROP TABLE IF EXISTS `$1;`r`nCREATE TABLE `$1")

# Ensure InnoDB charset ONLY on CREATE TABLE
$newContent = [regex]::Replace($newContent, '(?is)(CREATE TABLE `\w+` \(.*?\)\s*);', '$1 ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;')

# Duplicate Index Removal
$newContent = [regex]::Replace($newContent, 'ALTER TABLE `users` ADD UNIQUE KEY `users_email_key` \(.*?\);', '-- (Duplicate Index Removed)')
$newContent = [regex]::Replace($newContent, 'ALTER TABLE `site_settings` ADD UNIQUE KEY `site_settings_key_key` \(.*?\);', '-- (Duplicate Index Removed)')

# Add Header/Footer
$header = @'
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(50) DEFAULT 'USER',
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `value` TEXT,
    `type` VARCHAR(50),
    `group` VARCHAR(50),
    `label` VARCHAR(191),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`),
    UNIQUE KEY `site_settings_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

'@

$footer = "`n`nSET FOREIGN_KEY_CHECKS = 1;"

$finalContent = $header + $newContent + $footer
$finalContent | Out-File $outputPath -Encoding utf8
