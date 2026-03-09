const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedPages() {
    try {
        const count = await prisma.page.count();
        if (count > 0) {
            console.log('Database already has pages. Skipping seed.');
            return;
        }

        const pages = [
            {
                title: 'Institutional Overview',
                slug: 'about-us',
                content: '<h1>About AMSH</h1><p>The AMSH Hospital is a premier medical institution dedicated to excellence in patient care and medical research.</p>',
                status: 'PUBLISHED',
                order: 1
            },
            {
                title: 'Patient Rights & Responsibilities',
                slug: 'patient-rights',
                content: '<h1>Your Rights</h1><p>Every patient has the right to receive respectful and ethical care.</p>',
                status: 'PUBLISHED',
                order: 2
            },
            {
                title: 'Clinical Research Protocols',
                slug: 'research-protocols',
                content: '<h1>Research at AMSH</h1><p>Our research wing is focused on innovative clinical trials and ethics-first medical advancement.</p>',
                status: 'DRAFT',
                order: 3
            }
        ];

        for (const page of pages) {
            await prisma.page.create({ data: page });
        }

        console.log('✅ 3 Pages seeded successfully.');
    } catch (error) {
        console.error('Seed error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedPages();
