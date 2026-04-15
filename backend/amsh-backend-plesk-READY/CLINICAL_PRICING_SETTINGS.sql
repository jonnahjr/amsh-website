-- ============================================================
-- AMSH CLINICAL ATTACHMENT PRICING SETTINGS
-- Add this to your database to allow admin control over pricing
-- ============================================================

USE `orginal`;

-- Add Ethiopian Price Setting
REPLACE INTO `site_settings` (`id`, `key`, `value`, `type`, `group`, `label`, `createdAt`, `updatedAt`)
VALUES (
    'clinical-eth-price',
    'clinical_attachment_eth_price',
    '2500',
    'number',
    'clinical_attachment',
    'Clinical Attachment Price (Ethiopian - ETB)',
    NOW(),
    NOW()
);

-- Add International Price Setting
REPLACE INTO `site_settings` (`id`, `key`, `value`, `type`, `group`, `label`, `createdAt`, `updatedAt`)
VALUES (
    'clinical-int-price',
    'clinical_attachment_int_price',
    '5000',
    'number',
    'clinical_attachment',
    'Clinical Attachment Price (International - ETB)',
    NOW(),
    NOW()
);

-- Done!
SELECT 'Clinical pricing settings added successfully!' AS result;
