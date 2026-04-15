
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const columns = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM research`);
        console.log("Research Columns:", columns);
        
        const testId = 'cmmd6qdb300018sjotbjhcw8e';
        const item = await prisma.research.findUnique({ where: { id: testId } });
        console.log("Existing item:", item);
        
        // Try a dry-run update with only title
        if (item) {
            console.log("Attempting test update...");
            const updated = await prisma.research.update({
                where: { id: testId },
                data: { title: item.title + " (Test Update)" }
            });
            console.log("Successfully updated title.");
            
            // Revert
            await prisma.research.update({
                where: { id: testId },
                data: { title: item.title }
            });
            console.log("Successfully reverted title.");
        }
    } catch (e) {
        console.error("DEBUG ERROR:", e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
