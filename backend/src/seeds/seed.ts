import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

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
        { key: 'youtube_url', value: '', label: 'YouTube URL', group: 'social' },
        { key: 'hero_title', value: 'Welcome to Amanuel Mental Specialized Hospital', label: 'Hero Title', group: 'homepage' },
        { key: 'hero_subtitle', value: 'We Are Always Ready to Help You & Your Family', label: 'Hero Subtitle', group: 'homepage' },
        { key: 'hero_cta_primary', value: 'Book Appointment', label: 'Hero CTA Primary', group: 'homepage' },
        { key: 'hero_cta_secondary', value: 'Learn More', label: 'Hero CTA Secondary', group: 'homepage' },
        { key: 'about_history', value: 'The hospital was established by Italian invaders in 1930 E.C. The Hospital has been serving as the only public specialized Mental hospital since 1930 E.C. In addition to providing clinical service, the hospital has been delivering different types of long-term and short-term training for health professionals.', label: 'Hospital History', group: 'about' },
        { key: 'about_mission', value: 'To provide comprehensive, compassionate, and evidence-based mental health care to all patients, while advancing research and professional development in psychiatry.', label: 'Mission', group: 'about' },
        { key: 'about_vision', value: 'To be the leading center of excellence in mental health care, research, and education in Africa.', label: 'Vision', group: 'about' },
        { key: 'hospital_beds', value: '300+', label: 'Hospital Beds', group: 'stats' },
        { key: 'total_doctors', value: '50+', label: 'Total Doctors', group: 'stats' },
        { key: 'annual_patients', value: '10,000+', label: 'Annual Patients', group: 'stats' },
        { key: 'years_experience', value: '90+', label: 'Years of Experience', group: 'stats' },
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
        { name: 'Events', slug: 'events', color: '#B8860B' },
        { name: 'Health Tips', slug: 'health-tips', color: '#4682B4' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
    }
    console.log('✅ Categories seeded');

    // Departments
    const departments = [
        { name: 'Adult Psychiatry', slug: 'adult-psychiatry', description: 'Comprehensive psychiatric evaluation and treatment for adults with mental health conditions.', icon: '🧠', order: 1 },
        { name: 'Child & Adolescent Psychiatry', slug: 'child-psychiatry', description: 'Specialized mental health services for children and adolescents.', icon: '👶', order: 2 },
        { name: 'Addiction Treatment Unit', slug: 'addiction-treatment', description: 'Evidence-based addiction treatment and rehabilitation services.', icon: '💊', order: 3 },
        { name: 'Emergency Psychiatry', slug: 'emergency', description: '24/7 emergency psychiatric services for acute mental health crises.', icon: '🚨', order: 4 },
        { name: 'Clinical Psychology', slug: 'psychology', description: 'Psychological assessment, therapy, and counseling services.', icon: '🔬', order: 5 },
        { name: 'Neurology', slug: 'neurology', description: 'EEG and neurological diagnostic services.', icon: '⚡', order: 6 },
    ];

    for (const dept of departments) {
        await prisma.department.upsert({ where: { slug: dept.slug }, update: {}, create: { ...dept, isActive: true } });
    }
    console.log('✅ Departments seeded');

    // Services
    const services = [
        { name: 'Emergency Service', slug: 'emergency-service', description: 'AMSH Emergency is available 24/7. Call us at 991 in case of mental health emergencies.', icon: '🚨', order: 1 },
        { name: 'Outpatient Services', slug: 'outpatient', description: 'Comprehensive outpatient psychiatric evaluation, diagnosis, and treatment.', icon: '🏥', order: 2 },
        { name: 'Inpatient Services', slug: 'inpatient', description: 'Full residential care for patients requiring intensive psychiatric treatment.', icon: '🛏️', order: 3 },
        { name: 'Laboratory Service', slug: 'laboratory', description: 'Full diagnostic laboratory services supporting psychiatric care.', icon: '🔬', order: 4 },
        { name: 'Pharmacy', slug: 'pharmacy', description: 'Well-stocked pharmacy with all psychiatric medications readily available.', icon: '💊', order: 5 },
        { name: 'EEG Services', slug: 'eeg', description: 'Electroencephalogram (EEG) diagnostic testing for neurological assessment.', icon: '⚡', order: 6 },
        { name: 'CPD Training', slug: 'cpd-training', description: 'Continuing Professional Development training for healthcare professionals.', icon: '📚', order: 7 },
        { name: 'Research Unit', slug: 'research', description: 'Active research programs advancing mental health knowledge and treatment.', icon: '🔭', order: 8 },
    ];

    for (const service of services) {
        await prisma.service.upsert({ where: { slug: service.slug }, update: {}, create: { ...service, isActive: true } });
    }
    console.log('✅ Services seeded');

    // Sample News Posts
    const newsPost = await prisma.post.upsert({
        where: { slug: 'hospital-board-strategic-visit-2018' },
        update: {},
        create: {
            title: 'Board of Directors Conducts Comprehensive Supervision Visit',
            slug: 'hospital-board-strategic-visit-2018',
            excerpt: 'On February 17, 2018 E.C., the Board of Directors conducted a strategic review of service delivery, patient care standards, and digital health implementation across all hospital wards.',
            content: `<p>The Board of Directors of Emmanuel Mental Specialized Hospital (EMSH) recently concluded a high-level strategic supervision visit aimed at assessing the hospital's performance and service quality. The visit, which took place on February 17, 2018 E.C., included a detailed review of clinical operations, patient care standards, and the implementation of modern healthcare technologies.</p>
      <p>During the session, board members toured several specialized departments, including the acute care psychiatric unit and the rehabilitation center. They engaged with department heads to discuss challenges and opportunities for further enhancing mental health service delivery in Ethiopia.</p>
      <p>The board expressed satisfaction with the hospital's progress in digital health transformation and emphasized the importance of maintaining EMSH's position as a regional center of excellence.</p>
      <h3>Key Supervision Areas:</h3>
      <ul>
        <li><strong>Inpatient Bed Capacity:</strong> Reviewed the expansion of the new acute care ward.</li>
        <li><strong>Research Integration:</strong> Evaluated the progress of the neuropsychiatry research department.</li>
        <li><strong>Community Outreach:</strong> Assessed the performance of regional mental health support programs.</li>
      </ul>`,
            type: 'NEWS',
            status: 'PUBLISHED',
            authorId: admin.id,
            tags: JSON.stringify(['institutional', 'governance', 'board']),
            publishedAt: new Date(),
        },
    });

    await prisma.post.upsert({
        where: { slug: 'community-health-worker-training-program' },
        update: {},
        create: {
            title: 'EMSH Trains 134 Community Health Workers in Mental Health Crisis Response',
            slug: 'community-health-worker-training-program',
            excerpt: 'A three-day intensive training program equipped community health workers from 10 Addis Ababa sub-cities with crisis detection, referral, and anti-stigma skills.',
            content: `<p>Emmanuel Mental Specialized Hospital recently completed a landmark training initiative that equipped over 120 community health workers (CHWs) from Addis Ababa sub-cities with the knowledge and skills to identify and respond to mental health crises at the community level.</p>
      <p>The three-day intensive program, conducted in both Amharic and English, covered critical topics including early symptom recognition, suicide risk assessment, anti-stigma communication, and clear referral pathways to EMSH's outpatient department.</p>
      <h3>Training Program Highlights:</h3>
      <ul>
        <li><strong>134 participants</strong> from 10 sub-cities trained</li>
        <li>Modules on schizophrenia, bipolar disorder, and substance use</li>
        <li>Practical crisis de-escalation role-play exercises</li>
        <li>Certification awarded to all successful graduates</li>
      </ul>`,
            type: 'NEWS',
            status: 'PUBLISHED',
            authorId: admin.id,
            tags: JSON.stringify(['training', 'community', 'health-workers']),
            publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        },
    });

    console.log('✅ Sample posts seeded');

    // FAQ
    const faqs = [
        { question: 'How do I book an appointment?', answer: 'You can book an appointment online through our website, call us at +251-111-868-53-85, or visit us directly at our facility in Addis Ababa.', order: 1 },
        { question: 'What are your working hours?', answer: 'Our outpatient services operate Monday to Friday from 2:30 AM to 10:00 AM. Emergency services are available 24/7.', order: 2 },
        { question: 'Is there emergency psychiatric care?', answer: 'Yes, our emergency psychiatric services are available 24 hours a day, 7 days a week. Call 991 for immediate assistance.', order: 3 },
        { question: 'Do you offer CPD training for health professionals?', answer: 'Yes, AMSH offers various CPD training programs for healthcare professionals. Visit our CPD page to see upcoming courses and register.', order: 4 },
        { question: 'Can I submit research for review?', answer: 'Yes, researchers can submit their work through our Research page. All submissions are reviewed by our expert panel.', order: 5 },
        { question: 'Are services free or paid?', answer: 'As a public government hospital, AMSH provides services at subsidized rates. Emergency services are always provided regardless of ability to pay.', order: 6 },
    ];

    for (const faq of faqs) {
        await prisma.fAQ.create({ data: { ...faq, isActive: true } }).catch(() => { });
    }
    console.log('✅ FAQs seeded');

    const testimonialData = [
        { name: 'Dawit Bekele', role: 'Patient Family Member', content: 'AMSH provided exceptional care for my family member during a crisis. The staff were professional, compassionate, and thorough. We are eternally grateful.', rating: 5, order: 1, isActive: true },
        { name: 'Dr. Almaz Tesfaye', role: 'Healthcare Professional', content: 'The CPD programs at AMSH are world-class. I have enhanced my skills significantly and apply new knowledge daily in my practice.', rating: 5, order: 2, isActive: true },
        { name: 'Hana Girma', role: 'Research Collaborator', content: 'Collaborating with AMSH on mental health research has been a rewarding experience. Their commitment to advancing knowledge is inspiring.', rating: 5, order: 3, isActive: true },
    ];

    for (const test of testimonialData) {
        await prisma.testimonial.create({ data: test }).catch(() => { });
    }
    console.log('✅ Testimonials seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Admin Login:');
    console.log('   Email: admin@amsh.gov.et');
    console.log('   Password: Admin@AMSH2024!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
    .catch(console.error)
    .finally(async () => { await prisma.$disconnect(); });
