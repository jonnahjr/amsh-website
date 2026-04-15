
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkReg() {
    try {
        const regs = await prisma.cPDRegistration.findMany({ 
            select: { courseId: true, email: true, createdAt: true, firstName: true, lastName: true },
            orderBy: { createdAt: 'desc' },
            take: 10
        });
        console.log('--- RECENT CPD REGISTRATIONS ---');
        console.log(JSON.stringify(regs, null, 2));

        const courses = await prisma.cPDCourse.findMany({ select: { id: true, title: true } });
        console.log('--- ALL CPD COURSES ---');
        console.log(JSON.stringify(courses, null, 2));
        
    } catch (e) {
        console.error('DATABASE ERROR:', e);
    } finally {
        await prisma.$disconnect();
    }
}

checkReg();
