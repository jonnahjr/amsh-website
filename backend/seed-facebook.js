const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const settings = [
        { key: 'facebook_page_id', value: '', label: 'Facebook Page ID', type: 'text', group: 'facebook' },
        { key: 'facebook_access_token', value: '', label: 'Facebook Access Token', type: 'password', group: 'facebook' },
        { key: 'facebook_integration_enabled', value: 'false', label: 'Enable Facebook Integration', type: 'boolean', group: 'facebook' },
    ];

    for (const setting of settings) {
        await prisma.siteSetting.upsert({
            where: { key: setting.key },
            update: {},
            create: setting,
        });
    }

    console.log('Facebook settings seeded.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
