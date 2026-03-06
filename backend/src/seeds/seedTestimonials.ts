import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testimonials = [
    {
        name: 'Dawit Bekele',
        role: 'Patient Family Member',
        content: 'EMSH provided exceptional care for my family member during a crisis. The staff were professional, compassionate, and thorough. We are eternally grateful for their support.',
        rating: 5,
        order: 1,
        isActive: true
    },
    {
        name: 'Dr. Almaz Tesfaye',
        role: 'Healthcare Professional',
        content: 'The CPD programs at EMSH are exceptional. I have enhanced my psychiatric skills significantly and apply new knowledge every day in my practice.',
        rating: 5,
        order: 2,
        isActive: true
    },
    {
        name: 'Hana Girma',
        role: 'Research Collaborator',
        content: 'Collaborating with EMSH on mental health research has been a deeply rewarding experience. Their commitment to advancing knowledge in psychiatry is truly inspiring.',
        rating: 5,
        order: 3,
        isActive: true
    }
];

async function main() {
    console.log('Seeding testimonials...');
    for (const t of testimonials) {
        await prisma.testimonial.upsert({
            where: { id: t.name.replace(/\s+/g, '-').toLowerCase() }, // Using name as a pseudo-unique ID for seeding if ID not present, but better to check by name
            update: t,
            create: {
                ...t,
                id: t.name.replace(/\s+/g, '-').toLowerCase()
            }
        });
        console.log(`✅ Upserted testimonial for: ${t.name}`);
    }
    console.log('Done.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
