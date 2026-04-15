
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixUrls() {
    console.log('🔍 Locating staff_directory settings...');
    
    const settings = await prisma.siteSetting.findMany({
        where: { key: 'staff_directory' }
    });

    for (const setting of settings) {
        try {
            let staff = JSON.parse(setting.value);
            if (!Array.isArray(staff)) continue;

            let changed = false;
            staff = staff.map(person => {
                if (person.image && person.image.includes('api.amsh.gov.et/uploads/')) {
                    const relativePath = '/uploads/' + person.image.split('/uploads/')[1];
                    console.log(`✅ Fixed URL for ${person.name}: ${person.image} -> ${relativePath}`);
                    person.image = relativePath;
                    changed = true;
                }
                return person;
            });

            if (changed) {
                await prisma.siteSetting.update({
                    where: { id: setting.id },
                    data: { value: JSON.stringify(staff) }
                });
                console.log(`💾 Saved updated settings for ID: ${setting.id}`);
            }
        } catch (e) {
            console.error('Failed to parse/fix JSON:', e);
        }
    }
    
    console.log('✅ URL cleanup complete.');
    await prisma.$disconnect();
}

fixUrls();
