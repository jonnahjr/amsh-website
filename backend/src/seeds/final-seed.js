const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Research Submissions
    await prisma.research.createMany({
        data: [
            {
                title: 'Telemedicine Adoption in Ethiopia',
                abstract: 'Evaluating the challenges and opportunities for remote consultation in rural areas.',
                authors: JSON.stringify(['Dr. Abel M.', 'Sara K.']),
                keywords: JSON.stringify(['Telemedicine', 'Ethiopia', 'Rural Health']),
                category: 'Health Systems',
                status: 'PENDING'
            },
            {
                title: 'Efficacy of Cognitive Behavioral Therapy',
                abstract: 'A randomized controlled trial on Ethiopian patients with anxiety disorders.',
                authors: JSON.stringify(['Prof. Tadesse G.']),
                keywords: JSON.stringify(['CBT', 'Anxiety', 'Mental Health']),
                category: 'Clinical Psychology',
                status: 'PUBLISHED',
                publishedAt: new Date()
            }
        ]
    });

    // 2. Contact Messages
    await prisma.contactMessage.createMany({
        data: [
            {
                name: 'Samuel Alemu',
                email: 'samuel@example.com',
                phone: '0911002233',
                subject: 'Sponsorship Query',
                message: 'Hello, our organization is interested in sponsoring your upcoming CPD course.',
                isRead: false
            },
            {
                name: 'Genet Sisay',
                email: 'genet@example.com',
                subject: 'Career Opportunities',
                message: 'Do you have any openings for clinical psychologists in the adult department?',
                isRead: true
            }
        ]
    });

    // 3. Testimonials
    await prisma.testimonial.createMany({
        data: [
            {
                name: 'Daniel Kebede',
                role: 'Patient',
                content: 'The holistic approach at EMSH really helped me recover. I am grateful to the entire team.',
                rating: 5,
                isActive: true,
                order: 3
            },
            {
                name: 'Aster Mamo',
                role: 'Parent',
                content: 'Finding a child psychiatrist who understands our culture was a relief. Highly recommend EMSH.',
                rating: 5,
                isActive: true,
                order: 4
            }
        ]
    });

    // 4. FAQs
    await prisma.fAQ.createMany({
        data: [
            {
                question: 'Do you accept international insurance?',
                answer: 'Yes, we work with several international insurance providers. Please contact our billing office for details.',
                category: 'Billing',
                isActive: true,
                order: 1
            },
            {
                question: 'Is parking available at the hospital?',
                answer: 'Yes, we have a dedicated parking lot for patients and visitors available 24/7.',
                category: 'General',
                isActive: true,
                order: 3
            }
        ]
    });

    // 5. Categorized Form Submissions (Clinical Attachments)
    await prisma.formSubmission.createMany({
        data: [
            {
                formId: 'clinical-attachment-form',
                status: 'PENDING',
                data: JSON.stringify({
                    institutionName: 'Addis Ababa University',
                    contactPerson: 'Dr. Girma',
                    email: 'girma@aau.edu.et',
                    profession: 'Medical Student',
                    studentCount: 15,
                    category: 'GOVERNMENT',
                    startDate: '2024-06-01'
                })
            },
            {
                formId: 'clinical-attachment-form',
                status: 'APPROVED',
                data: JSON.stringify({
                    institutionName: 'Bethel Medical College',
                    contactPerson: 'W/ro Selam',
                    email: 'info@bethel.edu.et',
                    profession: 'Nursing',
                    studentCount: 8,
                    category: 'PRIVATE',
                    startDate: '2024-07-15'
                })
            },
            {
                formId: 'clinical-attachment-form',
                status: 'PENDING',
                data: JSON.stringify({
                    institutionName: 'Marta Tadesse (Independent)',
                    contactPerson: 'Marta Tadesse',
                    email: 'marta@example.com',
                    profession: 'Psychology Intern',
                    studentCount: 1,
                    category: 'SELF_SPONSORED',
                    startDate: '2024-05-20'
                })
            }
        ]
    });

    console.log('✅ All sample modules and categorized attachments seeded successfully');
}

main().catch(console.error).finally(() => prisma.$disconnect());
