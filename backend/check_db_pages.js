const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkPages() {
    try {
        const pages = await prisma.page.findMany();
        console.log('--- PAGES IN DATABASE ---');
        console.log(JSON.stringify(pages, null, 2));
        console.log('Total Count:', pages.length);
    } catch (error) {
        console.error('Error fetching pages:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkPages();
