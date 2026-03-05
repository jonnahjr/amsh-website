const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const form = await prisma.form.upsert({
        where: { id: 'clinical-attachment-form' },
        update: {},
        create: {
            id: 'clinical-attachment-form',
            title: 'Clinical Attachment Application',
            description: 'Institutional and individual clinical attachment requests',
            fields: JSON.stringify([
                { name: 'institutionName', label: 'Institution/Full Name', type: 'text', required: true },
                { name: 'departmentName', label: 'Department', type: 'select', required: true },
                { name: 'profession', label: 'Profession', type: 'select', required: true },
                { name: 'studentCount', label: 'Student Count', type: 'number', required: true },
                { name: 'durationValue', label: 'Duration', type: 'text', required: true },
                { name: 'startDate', label: 'Start Date', type: 'date', required: true },
                { name: 'contactPerson', label: 'Contact Person', type: 'text', required: true },
                { name: 'phoneNumber', label: 'Phone Number', type: 'text', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true }
            ]),
            isActive: true,
            isPublic: true
        }
    });
    console.log('FORM_ID:' + form.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
