const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const departmentsData = [
    // CLINICAL DEPARTMENTS
    { name: 'Department of Psychiatry', slug: 'psychiatry', description: 'Comprehensive outpatient and inpatient psychiatric care for all ages, including specialized addiction and forensic services.', icon: '🧠', category: 'Clinical Departments', order: 1 },
    { name: 'Department of Internal Medicine', slug: 'internal-medicine', description: 'Expert diagnosis and management of complex adult medical conditions, both acute and chronic.', icon: '🩺', category: 'Clinical Departments', order: 2 },
    { name: 'Department of Neurology', slug: 'neurology', description: 'Specialized care for disorders of the brain, spinal cord, and peripheral nervous system.', icon: '🔬', category: 'Clinical Departments', order: 3 },

    // DIAGNOSTIC AND SUPPORT
    { name: 'Radiology Department', slug: 'radiology', description: 'Advanced diagnostic imaging including X-Ray and Ultrasound services for clinical decision support.', icon: '🩻', category: 'Diagnostic & Support Departments', order: 4 },
    { name: 'Laboratory Department', slug: 'laboratory', description: 'Full-service clinical laboratory providing accurate diagnostic testing for inpatient and outpatient care.', icon: '🧪', category: 'Diagnostic & Support Departments', order: 5 },
    { name: 'Pharmacy Department', slug: 'pharmacy', description: 'Clinical pharmacy services ensuring safe, effective, and accessible medication management.', icon: '💊', category: 'Diagnostic & Support Departments', order: 6 },
    { name: 'Biomedical Engineering Department', slug: 'biomedical-engineering', description: 'Maintenance, calibration, and technical management of all medical equipment.', icon: '⚙️', category: 'Diagnostic & Support Departments', order: 7 },

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
    { name: 'Clinical Service Facilitation Department', slug: 'clinical-facilitation', description: 'Coordinating patient flow, referrals, and administrative clinical processes.', icon: '📁', category: 'Clinical Administration & Coordination', order: 15 },
    { name: 'Liaison and Information Department', slug: 'liaison-dept', description: 'Patient liaison, call center, and inter-departmental coordination services.', icon: '📞', category: 'Clinical Administration & Coordination', order: 16 },
    { name: 'Health Information System Department', slug: 'health-information', description: 'Managing medical records, data integrity, and hospital information systems.', icon: '💻', category: 'Clinical Administration & Coordination', order: 17 },

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

    // COMMUNITY HEALTH SERVICES
    { name: 'Community Outreach Services', slug: 'outreach-services', description: 'Mental health services delivered outside the hospital.', icon: '🤝', deptSlug: 'community-health-dept', order: 1 },
    { name: 'Disease Prevention Programs', slug: 'prevention-programs', description: 'Education and screenings for health promotion.', icon: '🛡️', deptSlug: 'disease-prevention-dept', order: 1 },
    { name: 'Health Education and Health Literacy', slug: 'health-literacy', description: 'Empowering patients through knowledge.', icon: '📚', deptSlug: 'disease-prevention-dept', order: 2 },

    // LIAISON / PATIENT SUPPORT
    { name: 'Patient Information Services', slug: 'patient-info', description: 'Guidance and administrative support for patients.', icon: 'ℹ️', deptSlug: 'liaison-dept', order: 1 },
    { name: 'Medical Record Services', slug: 'medical-records', description: 'Secure management of patient health histories.', icon: '📂', deptSlug: 'health-information', order: 1 },
    { name: 'Call Center Services', slug: 'call-center', description: 'Information and remote clinical guidance.', icon: '📞', deptSlug: 'liaison-dept', order: 2 },
    { name: 'Liaison Services', slug: 'liaison', description: 'Coordination between hospital and other health partners.', icon: '🔗', deptSlug: 'liaison-dept', order: 3 },

    // HOSPITAL SUPPORT / BIOMEDICAL
    { name: 'Central Sterilization Services', slug: 'cssd', description: 'Ensuring absolute sterility for clinical instruments.', icon: '🧹', deptSlug: 'biomedical-engineering', order: 1 },
    { name: 'Laundry Services', slug: 'laundry', description: 'Hospital linen and hygienic management.', icon: '🧺', deptSlug: 'biomedical-engineering', order: 2 },
    { name: 'Nutrition and Kitchen Services', slug: 'nutrition', description: 'Dietary planning and clinical nutrition support.', icon: '🍽️', deptSlug: 'biomedical-engineering', order: 3 },
    { name: 'Biomedical Equipment Maintenance', slug: 'bio-maintenance', description: 'Ensuring critical medical equipment readiness.', icon: '🔧', deptSlug: 'biomedical-engineering', order: 4 },

    // CLINICAL FACILITATION
    { name: 'One Stop OPD Services', slug: 'one-stop-opd', description: 'Streamlined, all-in-one clinical consultation experience.', icon: '👑', deptSlug: 'clinical-facilitation', order: 1 },
    { name: 'Private Wing Services', slug: 'private-services', description: 'Personalized care in a dedicated hospital environment.', icon: '🌟', deptSlug: 'clinical-facilitation', order: 2 },
];

async function main() {
    console.log('Clearing existing departments and services...');
    await prisma.service.deleteMany({});
    await prisma.department.deleteMany({});
    console.log('Cleared.');

    console.log('Seeding departments...');
    for (const d of departmentsData) {
        await prisma.department.create({
            data: {
                name: d.name,
                slug: d.slug,
                description: d.description,
                icon: d.icon,
                order: d.order,
            }
        });
    }
    console.log(`Seeded ${departmentsData.length} departments.`);

    console.log('Seeding services...');
    for (const s of servicesData) {
        const dept = await prisma.department.findUnique({ where: { slug: s.deptSlug } });
        if (!dept) {
            console.warn(`  WARNING: Dept not found for slug "${s.deptSlug}" - service "${s.name}" skipped.`);
            continue;
        }
        await prisma.service.create({
            data: {
                name: s.name,
                slug: s.slug,
                description: s.description,
                icon: s.icon,
                order: s.order,
                departmentId: dept.id,
            }
        });
    }
    console.log(`Seeded ${servicesData.length} services.`);
    console.log('Done!');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
