
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCourses() {
    try {
        const courses = await prisma.cPDCourse.findMany();
        console.log('--- CPD COURSES IN DB ---');
        console.log(JSON.stringify(courses, null, 2));
    } catch (e) {
        console.error('DATABASE ERROR:', e);
    } finally {
        await prisma.$disconnect();
    }
}

checkCourses();
