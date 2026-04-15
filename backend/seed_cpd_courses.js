const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  try {
    for (let i = 1; i <= 20; i++) {
        let course = await prisma.cPDCourse.findUnique({ where: { id: i.toString() } });
        if (!course) {
            await prisma.cPDCourse.create({
                data: {
                    id: i.toString(),
                    title: 'Dummy Course ' + i,
                    description: 'Auto-seeded for frontend links',
                    instructor: 'AMSH Staff',
                    duration: 'Varies',
                    category: 'General',
                    status: 'PUBLISHED'
                }
            });
            console.log('Created course:', i);
        }
    }
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
run();
