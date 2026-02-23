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
        where: { slug: 'amsh-celebrates-90-years' },
        update: {},
        create: {
            title: 'AMSH Celebrates 90+ Years of Mental Health Service',
            slug: 'amsh-celebrates-90-years',
            excerpt: 'Amanuel Mental Specialized Hospital marks over nine decades of dedicated service to Ethiopian mental health patients.',
            content: `<p>Amanuel Mental Specialized Hospital (AMSH) proudly celebrates over 90 years of providing comprehensive mental health services to the people of Ethiopia. Established in 1930, AMSH has grown from a small facility to become Ethiopia's premier public mental health institution.</p>
      <p>Throughout its history, AMSH has treated hundreds of thousands of patients, trained thousands of health professionals, and contributed significantly to mental health research in Africa.</p>
      <p>The hospital continues to expand its services, including the recent establishment of the Child & Adolescent Psychiatry Unit and the modern Addiction Treatment Center.</p>`,
            type: 'NEWS',
            status: 'PUBLISHED',
            authorId: admin.id,
            tags: JSON.stringify(['anniversary', 'milestone', 'mental-health']),
            publishedAt: new Date(),
        },
    });

    await prisma.post.upsert({
        where: { slug: 'mental-health-awareness-week-2024' },
        update: {},
        create: {
            title: 'Mental Health Awareness Week 2024 - AMSH Events',
            slug: 'mental-health-awareness-week-2024',
            excerpt: 'Join AMSH for a week of mental health awareness activities, free screenings, and community outreach.',
            content: `<p>AMSH is proud to announce our Mental Health Awareness Week activities. This year's theme focuses on "Mental Health is a Human Right," aligning with global mental health advocacy efforts.</p>
      <p>Activities include free mental health screenings, public lectures, and community outreach programs.</p>`,
            type: 'EVENT',
            status: 'PUBLISHED',
            authorId: admin.id,
            tags: JSON.stringify(['awareness', 'event', 'community']),
            publishedAt: new Date(),
            eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            eventLocation: 'AMSH Main Campus, Addis Ababa',
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
