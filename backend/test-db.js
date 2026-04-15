
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
    try {
        const cpdCount = await prisma.cPDRegistration.count();
        const formsCount = await prisma.formSubmission.count();
        const contactCount = await prisma.contactMessage.count();
        const researchCount = await prisma.research.count();

        console.log('--- DB INTEGRITY SCAN ---');
        console.log('CPD Registrations:', cpdCount);
        console.log('Form Submissions (Clinical):', formsCount);
        console.log('Contact Messages:', contactCount);
        console.log('Research Items:', researchCount);

        // Check recent entries
        const lastCpd = await prisma.cPDRegistration.findFirst({ orderBy: { createdAt: 'desc' } });
        console.log('Last CPD at:', lastCpd ? lastCpd.createdAt : 'None');

        const lastForm = await prisma.formSubmission.findFirst({ orderBy: { createdAt: 'desc' } });
        console.log('Last Form at:', lastForm ? lastForm.createdAt : 'None');

    } catch (e) {
        console.error('DATABASE ERROR:', e);
    } finally {
        await prisma.$disconnect();
    }
}

checkData();
