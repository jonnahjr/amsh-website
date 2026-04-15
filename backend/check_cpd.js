const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  try {
    let course = await prisma.cPDCourse.findUnique({
        where: { id: '1' }
    });
    if (!course) {
        course = await prisma.cPDCourse.create({
            data: {
                id: '1',
                title: 'Training Course',
                description: 'Auto-generated for legacy frontend link',
                instructor: 'AMSH Staff',
                duration: 'Varies',
                category: 'General',
                status: 'PUBLISHED'
            }
        });
    }
    const reg = await prisma.cPDRegistration.create({
        data: { courseId: '1', firstName: 'Test', lastName: 'User', email: 't@t.com', phone: '12', profession: 'Nurse', workplace: 'Hos', licenseNo: 'L', category: 'PERSONAL' }
    });
    console.log("Success:", reg);
  } catch(e) {
    console.error("Prisma Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}
run();
