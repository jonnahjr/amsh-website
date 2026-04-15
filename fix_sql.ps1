
$sqlPath = "c:\Users\jonas\Desktop\AMSH\backend\SUPABASE_ULTIMATE_SETUP_MYSQL55.sql"

$missingTables = @"
CREATE TABLE `users` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) DEFAULT 'USER',
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `site_settings` (
    `id` VARCHAR(255) NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `value` TEXT,
    `type` VARCHAR(50),
    `group` VARCHAR(50),
    `label` VARCHAR(255),
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME,
    PRIMARY KEY (`id`),
    UNIQUE KEY `site_settings_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

"@

$content = Get-Content $sqlPath -Raw
$headerEnd = $content.IndexOf("SET FOREIGN_KEY_CHECKS = 0;") + "SET FOREIGN_KEY_CHECKS = 0;".Length + 2
$final = $content.Substring(0, $headerEnd) + $missingTables + $content.Substring($headerEnd)

$final | Out-File $sqlPath -Encoding utf8
