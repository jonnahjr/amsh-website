import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    console.log('--- FORMS ---');
    const forms = await prisma.form.findMany();
    console.log(JSON.stringify(forms, null, 2));

    console.log('--- RECENT SUBMISSIONS ---');
    const submissions = await prisma.formSubmission.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    });
    console.log(JSON.stringify(submissions, null, 2));
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
