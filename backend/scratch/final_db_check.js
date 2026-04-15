const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    console.log('🔄 Checking database connection...');
    await prisma.$connect();
    console.log('✅ Connected to database successfully.');
    
    console.log('📊 Fetching admin user...');
    const admin = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' }
    });
    
    if (admin) {
      console.log('👤 Root Admin found:', admin.email);
    } else {
      console.log('❌ No Super Admin found!');
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
