const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inspect() {
    try {
        console.log('--- Inspecting Research Table Columns ---');
        const columns = await prisma.$queryRawUnsafe('SHOW COLUMNS FROM research');
        console.log(JSON.stringify(columns, null, 2));
    } catch (e) {
        console.error('Failed to inspect table:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

inspect();
