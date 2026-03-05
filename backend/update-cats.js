const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newCategories = [
    { name: "Department of Psychiatry", icon: "🧠", description: "Comprehensive outpatient and inpatient psychiatric care for all ages, including specialized addiction and forensic services." },
    { name: "Department of Internal Medicine", icon: "🩺", description: "Expert diagnosis and management of complex adult medical conditions, both acute and chronic." },
    { name: "Department of Neurology", icon: "🔬", description: "Specialized care for disorders of the brain, spinal cord, and peripheral nervous system." },
    { name: "Radiology Department", icon: "🩻", description: "Advanced diagnostic imaging including X-Ray and Ultrasound services for clinical decision support." },
    { name: "Laboratory Department", icon: "🧪", description: "Full-service clinical laboratory providing accurate diagnostic testing for inpatient and outpatient care." },
    { name: "Pharmacy Department", icon: "💊", description: "Clinical pharmacy services ensuring safe, effective, and accessible medication management." },
    { name: "Biomedical Engineering Department", icon: "⚙️", description: "Maintenance, calibration, and technical management of all medical equipment." },
    { name: "Emergency Department", icon: "🚑", description: "24/7 emergency and trauma care with rapid response psychiatric and medical triage." },
    { name: "Intensive Care Unit (ICU)", icon: "❤️🔥", description: "Highest-level continuous monitoring and life-support for critically ill patients." },
    { name: "High Dependency Unit (HDU)", icon: "🏥", description: "Intermediate-level care for patients requiring more support than general wards but less than ICU." },
    { name: "Nursing and Midwifery Department", icon: "👩‍⚕️", description: "Professional nursing care and midwifery services across all clinical areas." },
    { name: "Rehabilitation and Psychosocial Services", icon: "🔄", description: "Holistic therapeutic services improving patient independence and social functioning." },
    { name: "Community Health Service Department", icon: "🤝", description: "Proactive community-level mental health services and outreach programs." },
    { name: "Disease Prevention & Health Literacy", icon: "📋", description: "Evidence-based prevention programs and community health education initiatives." },
    { name: "Clinical Service Facilitation Department", icon: "📁", description: "Coordinating patient flow, referrals, and administrative clinical processes." },
    { name: "Liaison and Information Department", icon: "📞", description: "Patient liaison, call center, and inter-departmental coordination services." },
    { name: "Health Information System Department", icon: "💻", description: "Managing medical records, data integrity, and hospital information systems." },
    { name: "CPD, Training & Research Department", icon: "🎓", description: "Continuing professional development, clinical training programs, and academic research." },
    { name: "Quality Improvement & Innovation Department", icon: "⭐", description: "Driving clinical excellence through standards, audits, and continuous quality improvement." }
];

async function main() {
    console.log('Cleaning existing categories...');
    await prisma.departmentCategory.deleteMany({});

    console.log('Inserting new categories...');
    for (let i = 0; i < newCategories.length; i++) {
        const cat = newCategories[i];
        const slug = cat.name.toLowerCase().replace(/ & /g, '-').replace(/, /g, '-').replace(/ /g, '-').replace(/[()]/g, '');

        // Auto-generate a simple gradient
        const gradients = [
            'from-blue-900 to-blue-700',
            'from-cyan-600 to-blue-800',
            'from-indigo-600 to-blue-900',
            'from-blue-800 to-cyan-600'
        ];
        const gradient = gradients[i % gradients.length];

        await prisma.departmentCategory.create({
            data: {
                name: cat.name,
                slug,
                icon: cat.icon,
                description: cat.description,
                gradient,
                order: i,
                isActive: true
            }
        });
    }

    // Also update existing departments to point to these new categories if names match
    console.log('Linking departments to new categories...');
    const cats = await prisma.departmentCategory.findMany();
    const depts = await prisma.department.findMany();

    for (const dept of depts) {
        const matchingCat = cats.find(c => c.name === dept.name);
        if (matchingCat) {
            await prisma.department.update({
                where: { id: dept.id },
                data: {
                    categoryId: matchingCat.id,
                    categoryName: matchingCat.name
                }
            });
            console.log(`Linked ${dept.name} to its category.`);
        } else {
            // Fallback or leave as is
            // All of these say "Clinical Departments" in the prompt, maybe we should have one group?
            // But the user said "add only those box", so they want 19 boxes.
        }
    }

    console.log('Done!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
