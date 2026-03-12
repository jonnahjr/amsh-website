import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const departmentsData = [
    // CLINICAL DEPARTMENTS
    { name: 'Department of Psychiatry', slug: 'psychiatry', description: 'Comprehensive outpatient and inpatient psychiatric care for all ages, including specialized addiction and forensic services.', icon: '🧠', category: 'Clinical Departments', order: 1 },
    { name: 'Department of Internal Medicine', slug: 'internal-medicine', description: 'Expert diagnosis and management of complex adult medical conditions, both acute and chronic.', icon: '🩺', category: 'Clinical Departments', order: 2 },
    { name: 'Department of Neurology', slug: 'neurology', description: 'Specialized care for disorders of the brain, spinal cord, and peripheral nervous system.', icon: '🔬', category: 'Clinical Departments', order: 3 },

    // DIAGNOSTIC AND SUPPORT
    { name: 'Radiology Department', slug: 'radiology', description: 'Advanced diagnostic imaging including X-Ray and Ultrasound services for clinical decision support.', icon: '🩻', category: 'Diagnostic & Support', order: 4 },
    { name: 'Laboratory Department', slug: 'laboratory', description: 'Full-service clinical laboratory providing accurate diagnostic testing for inpatient and outpatient care.', icon: '🧪', category: 'Diagnostic & Support', order: 5 },
    { name: 'Pharmacy Department', slug: 'pharmacy', description: 'Clinical pharmacy services ensuring safe, effective, and accessible medication management.', icon: '💊', category: 'Diagnostic & Support', order: 6 },
    { name: 'Biomedical Engineering Department', slug: 'biomedical-engineering', description: 'Maintenance, calibration, and technical management of all medical equipment.', icon: '⚙️', category: 'Diagnostic & Support', order: 7 },

    // EMERGENCY AND CRITICAL CARE
    { name: 'Emergency Department', slug: 'emergency-dept', description: '24/7 emergency and trauma care with rapid response psychiatric and medical triage.', icon: '🚑', category: 'Emergency & Critical Care', order: 8 },
    { name: 'Intensive Care Unit (ICU)', slug: 'icu-dept', description: 'Highest-level continuous monitoring and life-support for critically ill patients.', icon: '❤️‍🔥', category: 'Emergency & Critical Care', order: 9 },
    { name: 'High Dependency Unit (HDU)', slug: 'hdu-dept', description: 'Intermediate-level care for patients requiring more support than general wards but less than ICU.', icon: '🏥', category: 'Emergency & Critical Care', order: 10 },

    // NURSING AND CLINICAL SUPPORT
    { name: 'Nursing and Midwifery Department', slug: 'nursing-midwifery', description: 'Professional nursing care and midwifery services across all clinical areas.', icon: '👩‍⚕️', category: 'Nursing & Clinical Support', order: 11 },
    { name: 'Rehabilitation and Psychosocial Services', slug: 'rehabilitation', description: 'Holistic therapeutic services improving patient independence and social functioning.', icon: '🔄', category: 'Nursing & Clinical Support', order: 12 },

    // COMMUNITY AND PUBLIC HEALTH
    { name: 'Community Health Service Department', slug: 'community-health-dept', description: 'Proactive community-level mental health services and outreach programs.', icon: '🤝', category: 'Community & Public Health', order: 13 },
    { name: 'Disease Prevention & Health Literacy', slug: 'disease-prevention-dept', description: 'Evidence-based prevention programs and community health education initiatives.', icon: '📋', category: 'Community & Public Health', order: 14 },

    // CLINICAL ADMINISTRATION
    { name: 'Clinical Service Facilitation Department', slug: 'clinical-facilitation', description: 'Coordinating patient flow, referrals, and administrative clinical processes.', icon: '📁', category: 'Clinical Administration', order: 15 },
    { name: 'Liaison and Information Department', slug: 'liaison-dept', description: 'Patient liaison, call center, and inter-departmental coordination services.', icon: '📞', category: 'Clinical Administration', order: 16 },
    { name: 'Health Information System Department', slug: 'health-information', description: 'Managing medical records, data integrity, and hospital information systems.', icon: '💻', category: 'Clinical Administration', order: 17 },

    // TRAINING, RESEARCH AND QUALITY
    { name: 'CPD, Training & Research Department', slug: 'cpd-training-research', description: 'Continuing professional development, clinical training programs, and academic research.', icon: '🎓', category: 'Training, Research & Quality', order: 18 },
    { name: 'Quality Improvement & Innovation Department', slug: 'quality-improvement', description: 'Driving clinical excellence through standards, audits, and continuous quality improvement.', icon: '⭐', category: 'Training, Research & Quality', order: 19 },
];

const servicesData = [
    // PSYCHIATRY SERVICES
    { name: 'Psychiatry Outpatient Services', slug: 'psychiatry-outpatient', description: 'Regular psychiatric consultations for non-emergency mental health needs.', icon: '🧠', deptSlug: 'psychiatry', order: 1 },
    { name: 'Psychiatry Inpatient Services', slug: 'psychiatry-inpatient', description: 'Round-the-clock specialized care for patients requiring hospitalization.', icon: '🛏️', deptSlug: 'psychiatry', order: 2 },
    { name: 'Child and Adolescent Psychiatry', slug: 'child-adolescent-psychiatry', description: 'Dedicated care for developmental and mental health needs of children and youth.', icon: '👶', deptSlug: 'psychiatry', order: 3 },
    { name: 'Addiction Treatment Services', slug: 'addiction-treatment', description: 'Comprehensive detox and rehabilitation for substance use disorders.', icon: '🌿', deptSlug: 'psychiatry', order: 4 },
    { name: 'Geriatric Psychiatry Services', slug: 'geriatric-psychiatry', description: 'Specialized psychiatric care for elderly populations.', icon: '👴', deptSlug: 'psychiatry', order: 5 },
    { name: 'Forensic Psychiatry Services', slug: 'forensic-psychiatry', description: 'Mental health assessment and treatment related to legal proceedings.', icon: '⚖️', deptSlug: 'psychiatry', order: 6 },
    { name: 'Clozapine Treatment Service', slug: 'clozapine-treatment', description: 'Monitoring and management for treatment-resistant schizophrenia.', icon: '💊', deptSlug: 'psychiatry', order: 7 },
    { name: 'Electroconvulsive Therapy (ECT)', slug: 'ect-service', description: 'Safe, advanced procedure for severe mental health conditions.', icon: '⚡', deptSlug: 'psychiatry', order: 8 },
    { name: 'Clinical Psychology Services', slug: 'clinical-psychology-services', description: 'Individual and group therapy based on evidence-based psychological principles.', icon: '🪑', deptSlug: 'psychiatry', order: 9 },
    { name: 'Psychosocial Support Services', slug: 'psychosocial-support', description: 'Integrating social support into clinical mental health care.', icon: '🤲', deptSlug: 'psychiatry', order: 10 },

    // INTERNAL MEDICINE SERVICES
    { name: 'Internal Medicine Outpatient Services', slug: 'internal-medicine-outpatient', description: 'General medical consultations and specialized adult care.', icon: '🩺', deptSlug: 'internal-medicine', order: 1 },
    { name: 'Internal Medicine Inpatient Services', slug: 'internal-medicine-inpatient', description: 'Internal medicine care for hospitalized patients.', icon: '🛏️', deptSlug: 'internal-medicine', order: 2 },
    { name: 'Referral Internal Medicine Services', slug: 'referral-medicine', description: 'Specialized second-opinion consults for complex cases.', icon: '📋', deptSlug: 'internal-medicine', order: 3 },

    // NEUROLOGY SERVICES
    { name: 'Neurology Outpatient Services', slug: 'neurology-outpatient', description: 'Consultations for epilepsy, stroke, and neurological disorders.', icon: '🔬', deptSlug: 'neurology', order: 1 },
    { name: 'Neurophysiology Services', slug: 'neurophysiology', description: 'Advanced clinical testing of the nervous system.', icon: '⚡', deptSlug: 'neurology', order: 2 },
    { name: 'EEG Diagnostic Services', slug: 'eeg-diagnostic', description: 'Brain activity monitoring and seizure diagnosis.', icon: '📊', deptSlug: 'neurology', order: 3 },

    // EMERGENCY DEPT SERVICES
    { name: 'Emergency Triage Services', slug: 'emergency-triage', description: 'Immediate assessment and prioritization of clinical cases.', icon: '🚨', deptSlug: 'emergency-dept', order: 1 },
    { name: 'Emergency Psychiatric Services', slug: 'emergency-psychiatry', description: 'Rapid intervention for mental health crises.', icon: '🧠', deptSlug: 'emergency-dept', order: 2 },
    { name: 'Emergency Procedure Services', slug: 'emergency-procedures', description: 'Urgent medical and minor surgical interventions.', icon: '🔧', deptSlug: 'emergency-dept', order: 3 },
    { name: 'Intensive Care Services', slug: 'icu', description: 'Highest level of medical care for critically ill patients.', icon: '❤️‍🔥', deptSlug: 'icu-dept', order: 1 },
    { name: 'High Dependency Care', slug: 'hdu', description: 'Intermediate care for patients transitioning out of intensive care.', icon: '🏥', deptSlug: 'hdu-dept', order: 1 },

    // PHARMACY SERVICES
    { name: 'Outpatient Pharmacy Services', slug: 'outpatient-pharmacy', description: 'Counseling and dispensing for non-hospitalized patients.', icon: '💊', deptSlug: 'pharmacy', order: 1 },
    { name: 'Inpatient Pharmacy Services', slug: 'inpatient-pharmacy', description: 'Specialized medication management for wards.', icon: '🏥', deptSlug: 'pharmacy', order: 2 },
    { name: 'ART Pharmacy Services', slug: 'art-pharmacy', description: 'Expert management of antiretroviral therapies.', icon: '🎗️', deptSlug: 'pharmacy', order: 3 },
    { name: 'Community Pharmacy Services', slug: 'community-pharmacy', description: 'Accessible pharmacy services for the surrounding area.', icon: '🤝', deptSlug: 'pharmacy', order: 4 },
    { name: 'Drug Compounding Services', slug: 'drug-compounding', description: 'Tailored medication formulations for specific patient needs.', icon: '⚗️', deptSlug: 'pharmacy', order: 5 },
    { name: 'Drug Supply and Storage Services', slug: 'pharmacy-supply', description: 'Managing the hospital medical supply chain.', icon: '📦', deptSlug: 'pharmacy', order: 6 },

    // LABORATORY SERVICES
    { name: 'Outpatient Laboratory Services', slug: 'outpatient-lab', description: 'Standard and specialized diagnostic testing.', icon: '🧪', deptSlug: 'laboratory', order: 1 },
    { name: 'Inpatient Laboratory Services', slug: 'inpatient-lab', description: 'Laboratory support for acute hospital care.', icon: '🔬', deptSlug: 'laboratory', order: 2 },
    { name: 'Central Laboratory Services', slug: 'central-lab', description: 'Advanced reference laboratory services.', icon: '🏛️', deptSlug: 'laboratory', order: 3 },
    { name: 'Sample Collection Services', slug: 'sample-collection', description: 'Safe and professional collection of diagnostic samples.', icon: '💉', deptSlug: 'laboratory', order: 4 },

    // RADIOLOGY SERVICES
    { name: 'X-Ray Diagnostic Services', slug: 'xray-services', description: 'Fixed and mobile radiography services.', icon: '🩻', deptSlug: 'radiology', order: 1 },
    { name: 'Ultrasound Diagnostic Services', slug: 'ultrasound-services', description: 'Advanced sonography and doppler imaging.', icon: '📡', deptSlug: 'radiology', order: 2 },

    // REHABILITATION SERVICES
    { name: 'Occupational Therapy', slug: 'occupational-therapy', description: 'Adaptive skills and activity-based recovery.', icon: '🖐️', deptSlug: 'rehabilitation', order: 1 },
    { name: 'Recreational Therapy', slug: 'recreational-therapy', description: 'Structured restorative activities for well-being.', icon: '🎯', deptSlug: 'rehabilitation', order: 2 },
    { name: 'Art Therapy', slug: 'art-therapy', description: 'Creative expression as a psychological intervention.', icon: '🎨', deptSlug: 'rehabilitation', order: 3 },
    { name: 'Speech Therapy', slug: 'speech-therapy', description: 'Assessing and treating communication and swallowing disorders.', icon: '🗣️', deptSlug: 'rehabilitation', order: 4 },
];

const serviceCategoriesData = [
    {
        slug: 'mental-health',
        name: 'Mental Health Services',
        icon: '🧠',
        gradient: 'from-blue-950 to-blue-800',
        accentColor: 'bg-blue-900',
        description: 'Comprehensive inpatient, outpatient, and specialized psychiatric care for adults, children, and older adults.',
        deptSlugs: 'psychiatry',
        order: 1
    },
    {
        slug: 'internal-medicine',
        name: 'Internal Medicine Services',
        icon: '🩺',
        gradient: 'from-indigo-950 to-indigo-800',
        accentColor: 'bg-indigo-900',
        description: 'Expert adult medical care for complex conditions — outpatient, inpatient, and specialist referral services.',
        deptSlugs: 'internal-medicine',
        order: 2
    },
    {
        slug: 'neurology',
        name: 'Neurology Services',
        icon: '🔬',
        gradient: 'from-violet-950 to-violet-800',
        accentColor: 'bg-violet-900',
        description: 'Advanced diagnosis and treatment of neurological conditions including EEG and neurophysiology testing.',
        deptSlugs: 'neurology',
        order: 3
    },
    {
        slug: 'emergency-critical-care',
        name: 'Emergency & Critical Care Services',
        icon: '🚑',
        gradient: 'from-red-950 to-rose-800',
        accentColor: 'bg-red-900',
        description: '24/7 emergency triage, psychiatric crisis response, intensive care, and high dependency care.',
        deptSlugs: 'emergency-dept;icu-dept;hdu-dept',
        order: 4
    },
    {
        slug: 'pharmacy',
        name: 'Pharmacy Services',
        icon: '💊',
        gradient: 'from-cyan-950 to-teal-800',
        accentColor: 'bg-cyan-900',
        description: 'Inpatient, outpatient, ART, community pharmacy plus drug compounding and supply management.',
        deptSlugs: 'pharmacy',
        order: 5
    },
    {
        slug: 'laboratory',
        name: 'Laboratory Services',
        icon: '🧪',
        gradient: 'from-teal-950 to-emerald-800',
        accentColor: 'bg-teal-900',
        description: 'Full-spectrum clinical diagnostics — outpatient, inpatient, central lab and dedicated sample collection.',
        deptSlugs: 'laboratory',
        order: 6
    },
    {
        slug: 'diagnostic-imaging',
        name: 'Diagnostic Imaging Services',
        icon: '🩻',
        gradient: 'from-sky-950 to-cyan-800',
        accentColor: 'bg-sky-900',
        description: 'Advanced X-Ray and Ultrasound imaging for accurate, timely clinical diagnosis and intervention.',
        deptSlugs: 'radiology',
        order: 7
    },
    {
        slug: 'rehabilitation-therapy',
        name: 'Rehabilitation & Therapy Services',
        icon: '🔄',
        gradient: 'from-emerald-950 to-green-800',
        accentColor: 'bg-emerald-900',
        description: 'Occupational, recreational, art, and speech therapy for holistic patient recovery and independence.',
        deptSlugs: 'rehabilitation',
        order: 8
    },
    {
        slug: 'community-preventive',
        name: 'Community & Preventive Services',
        icon: '🌍',
        gradient: 'from-green-950 to-lime-800',
        accentColor: 'bg-green-900',
        description: 'Community outreach programs, disease prevention, and health education to promote population wellbeing.',
        deptSlugs: 'community-health-dept;disease-prevention-dept',
        order: 9
    },
    {
        slug: 'patient-support',
        name: 'Patient Support Services',
        icon: '📋',
        gradient: 'from-slate-900 to-slate-700',
        accentColor: 'bg-slate-800',
        description: 'Patient information, medical records, call center and liaison services for seamless care navigation.',
        deptSlugs: 'liaison-dept;health-information',
        order: 10
    },
    {
        slug: 'hospital-support',
        name: 'Hospital Support Services',
        icon: '🏗️',
        gradient: 'from-zinc-900 to-zinc-700',
        accentColor: 'bg-zinc-800',
        description: 'Central sterilization, laundry, nutrition, and biomedical equipment maintenance for clinical operations.',
        deptSlugs: 'biomedical-engineering',
        order: 11
    },
    {
        slug: 'private-specialized',
        name: 'Private & Specialized Services',
        icon: '👑',
        gradient: 'from-amber-900 to-orange-700',
        accentColor: 'bg-amber-800',
        description: 'Premium private wing and one-stop OPD services for a personalized, efficient patient experience.',
        deptSlugs: 'clinical-facilitation',
        order: 12
    },
];

async function main() {
    console.log('🌱 Seeding database...');

    // Create Super Admin
    const hashedPassword = await bcrypt.hash('Admin@AMSH2024!', 12);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@amsh.gov.et' },
        update: {},
        create: {
            email: 'admin@amsh.gov.et',
            password: hashedPassword,
            name: 'AMSH Administrator',
            role: 'SUPER_ADMIN',
            isActive: true,
        },
    });
    console.log('✅ Super admin created:', admin.email);

    // Site Settings
    const settings = [
        { key: 'site_name', value: 'Amanuel Mental Specialized Hospital', label: 'Site Name', group: 'general' },
        { key: 'site_tagline', value: 'Comprehensive Mental Health Care You Can Trust', label: 'Tagline', group: 'general' },
        { key: 'site_description', value: "Ethiopia's premier public mental health institution providing comprehensive psychiatric care since 1930.", label: 'Description', group: 'general' },
        { key: 'contact_phone', value: '+251-111-868-53-85', label: 'Phone', group: 'contact' },
        { key: 'contact_emergency', value: '991', label: 'Emergency Number', group: 'contact' },
        { key: 'contact_email', value: 'info@amsh.gov.et', label: 'Email', group: 'contact' },
        { key: 'contact_address', value: 'Addis Ababa, Ethiopia', label: 'Address', group: 'contact' },
        { key: 'working_hours', value: 'Monday - Friday: 2:30 AM - 10:00 AM', label: 'Working Hours', group: 'contact' },
        { key: 'emergency_hours', value: '24/7 Emergency Services', label: 'Emergency Hours', group: 'contact' },
        { key: 'facebook_url', value: 'https://facebook.com/amsh.gov.et', label: 'Facebook URL', group: 'social' },
        { key: 'twitter_url', value: 'https://twitter.com/amsh_hospital', label: 'Twitter URL', group: 'social' },
    ];

    for (const setting of settings) {
        await prisma.siteSetting.upsert({
            where: { key: setting.key },
            update: {},
            create: { ...setting, type: 'text' },
        });
    }
    console.log('✅ Site settings seeded');

    // Categories
    const categories = [
        { name: 'Announcements', slug: 'announcements', color: '#1B4F8A' },
        { name: 'News', slug: 'news', color: '#2E8B57' },
        { name: 'Research', slug: 'research', color: '#8B1A4A' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
    }
    console.log('✅ Blog Categories seeded');

    // Departments
    console.log('Seeding departments...');
    for (const d of departmentsData) {
        await prisma.department.upsert({
            where: { slug: d.slug },
            update: {
                categoryName: d.category,
                description: d.description,
                icon: d.icon,
                order: d.order
            },
            create: {
                name: d.name,
                slug: d.slug,
                description: d.description,
                icon: d.icon,
                categoryName: d.category,
                order: d.order,
                isActive: true
            }
        });
    }
    console.log(`✅ Seeded ${departmentsData.length} departments.`);

    // Services
    console.log('Seeding services...');
    for (const s of servicesData) {
        const dept = await prisma.department.findUnique({ where: { slug: s.deptSlug } });
        if (!dept) continue;

        await prisma.service.upsert({
            where: { slug: s.slug },
            update: {
                departmentId: dept.id,
                description: s.description,
                icon: s.icon,
                order: s.order
            },
            create: {
                name: s.name,
                slug: s.slug,
                description: s.description,
                icon: s.icon,
                order: s.order,
                departmentId: dept.id,
                isActive: true
            }
        });
    }
    console.log(`✅ Seeded ${servicesData.length} services.`);

    // Service Categories
    console.log('Seeding service categories...');
    for (const c of serviceCategoriesData) {
        await prisma.serviceCategory.upsert({
            where: { slug: c.slug },
            update: {
                name: c.name,
                icon: c.icon,
                gradient: c.gradient,
                accentColor: c.accentColor,
                description: c.description,
                deptSlugs: c.deptSlugs,
                order: c.order,
                isActive: true
            },
            create: {
                name: c.name,
                slug: c.slug,
                description: c.description,
                icon: c.icon,
                gradient: c.gradient,
                accentColor: c.accentColor,
                order: c.order,
                isActive: true,
                deptSlugs: c.deptSlugs
            }
        });
    }
    console.log(`✅ Seeded ${serviceCategoriesData.length} service categories.`);

    console.log('\n🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
