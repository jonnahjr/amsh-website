const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.siteSetting.upsert({
        where: { key: 'facebook_page_id' },
        update: { value: '100064026784319' },
        create: { key: 'facebook_page_id', value: '100064026784319', label: 'Facebook Page ID', type: 'text', group: 'facebook' }
    });

    await prisma.siteSetting.upsert({
        where: { key: 'facebook_integration_enabled' },
        update: { value: 'true' },
        create: { key: 'facebook_integration_enabled', value: 'true', label: 'Enable Facebook Integration', type: 'boolean', group: 'facebook' }
    });

    console.log('Successfully updated Facebook page ID to 100064026784319 and enabled integration.');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
