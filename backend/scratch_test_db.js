const { PrismaClient } = require('@prisma/client');

async function testConnection(url) {
    console.log(`Testing connection to: ${url.replace(/:[^:]*@/, ':****@')}`);
    const prisma = new PrismaClient({
        datasources: {
            db: { url }
        }
    });

    try {
        await prisma.$connect();
        const result = await prisma.$queryRaw`SELECT 1 as connected`;
        console.log('✅ Connection Successful:', result);
    } catch (error) {
        console.error('❌ Connection Failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

const originalUrl = 'mysql://amsh:Jonnahjnr%400945628075YONas@10.180.50.140:3306/orginal';
const publicUrl = 'mysql://amsh:Jonnahjnr%400945628075YONas@213.55.96.149:3306/orginal';

async function run() {
    console.log('--- DB CONNECTION TEST ---');
    await testConnection(originalUrl);
    console.log('\n--- PUBLIC IP TEST ---');
    await testConnection(publicUrl);
}

run();
