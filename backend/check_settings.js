
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const settings = await prisma.siteSetting.findMany();
    console.log('--- SITE SETTINGS ---');
    console.log(JSON.stringify(settings, null, 2));
    console.log('---------------------');
  } catch (err) {
    console.error('Error checking settings:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
