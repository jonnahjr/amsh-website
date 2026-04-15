
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixStaffDirectory() {
    try {
        const setting = await prisma.siteSetting.findUnique({
            where: { key: 'staff_directory' }
        });

        if (!setting || !setting.value) {
            console.log('No staff_directory setting found.');
            return;
        }

        console.log('Current staff_directory value:', setting.value);

        // Try to fix common JSON issues
        let fixed = setting.value
            .replace(/'/g, '"') // Replace single quotes with double quotes
            .replace(/,(\s*[\]}])/g, '$1'); // Remove trailing commas

        try {
            JSON.parse(fixed);
            console.log('Fixed JSON successfully.');
            
            await prisma.siteSetting.update({
                where: { key: 'staff_directory' },
                data: { value: fixed }
            });
            console.log('Updated database with fixed JSON.');
        } catch (e) {
            console.error('Still failing to parse after naive fix:', e.message);
            // If it's still broken, maybe it's just garbage.
            // Let's reset it to an empty array or the default team if we want to be safe.
            const defaultTeam = [
                { id: 'zegeye', name: "Mr. Zegeye Yohannis", role: "CPD, Clinical Training and Research Director", phone: "", image: "/assets/research/mr_zegeye_yohannis_headshot_1775135176650.png" },
                { id: 'habtamu', name: "Mr. Habtamu Derajaw", role: "Research & Clinical Training Desk Head", phone: "", image: "/assets/research/mr_habtamu_derajaw_headshot_1775135205786.png" },
                { id: 'mensur', name: "Mr. Mensur Nesru", role: "Research Officer", phone: "", image: "/assets/research/mr_mensur_nesru_headshot_1775135244113.png" }
            ];
            await prisma.siteSetting.update({
                where: { key: 'staff_directory' },
                data: { value: JSON.stringify(defaultTeam) }
            });
            console.log('Reset staff_directory to default team due to persistent corruption.');
        }

    } catch (err) {
        console.error('Error fixing staff directory:', err);
    } finally {
        await prisma.$disconnect();
    }
}

fixStaffDirectory();
