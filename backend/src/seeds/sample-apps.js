const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Ensure a CPD Course exists
    let course = await prisma.cPDCourse.findFirst();
    if (!course) {
        course = await prisma.cPDCourse.create({
            data: {
                title: 'Mental Health in Primary Care',
                description: 'A 2-day workshop for general practitioners.',
                instructor: 'Dr. Almaz Tesfaye',
                duration: '2 days',
                category: 'Clinical',
                status: 'PUBLISHED',
                startDate: new Date(),
                capacity: 50
            }
        });
    }

    // 2. Add sample CPD Registrations
    await prisma.cPDRegistration.createMany({
        data: [
            { courseId: course.id, firstName: 'Abebe', lastName: 'Bikila', email: 'abebe@example.com', phone: '0911223344', profession: 'Doctor', workplace: 'Black Lion Hospital' },
            { courseId: course.id, firstName: 'Martha', lastName: 'Tadesse', email: 'martha@example.com', phone: '0922334455', profession: 'Nurse', workplace: 'St. Paul Hospital', status: 'APPROVED' }
        ]
    });

    // 3. Add sample Clinical Attachment Form Submissions
    await prisma.formSubmission.create({
        data: {
            formId: 'clinical-attachment-form',
            data: JSON.stringify({
                institutionName: 'Addis Ababa University',
                departmentName: 'Adult Psychiatry',
                profession: 'Medical Student (Clinical)',
                studentCount: '15',
                durationValue: '1 Month',
                startDate: '2024-04-01',
                contactPerson: 'Dr. Girma',
                phoneNumber: '0911001122',
                email: 'aau@edu.et',
                category: 'GOVERNMENT'
            }),
            status: 'PENDING'
        }
    });

    console.log('✅ Sample data seeded');
}

main().catch(console.error).finally(() => prisma.$disconnect());
