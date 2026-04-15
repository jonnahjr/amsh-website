
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function reset() {
  try {
    const newPassword = 'Jonnahjnr@0945628075YONas';
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const user = await prisma.user.upsert({
      where: { email: 'admin@amsh.gov.et' },
      update: {
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        isActive: true
      },
      create: {
        email: 'admin@amsh.gov.et',
        password: hashedPassword,
        name: 'AMSH Administrator',
        role: 'SUPER_ADMIN',
        isActive: true
      }
    });
    console.log('✅ Admin user password updated to: ' + newPassword);
  } catch (err) {
    console.error('Error resetting admin:', err);
  } finally {
    await prisma.$disconnect();
  }
}

reset();
