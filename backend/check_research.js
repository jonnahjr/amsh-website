
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const research = await prisma.research.findMany({
      select: {
        id: true,
        submissionId: true,
        email: true,
        status: true,
        title: true,
        investigatorName: true
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    console.log('--- RECENT RESEARCH ENTRIES ---');
    console.log(JSON.stringify(research, null, 2));
    console.log('-------------------------------');
  } catch (err) {
    console.error('Error checking research:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
