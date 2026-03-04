import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Updating seeded posts with real news content...');

    // Update the old "90 Years Celebration" post to the Board Visit news
    await prisma.post.update({
        where: { slug: 'amsh-celebrates-90-years' },
        data: {
            title: 'Board of Directors Conducts Comprehensive Supervision Visit',
            slug: 'hospital-board-strategic-visit-2018',
            excerpt: 'On February 17, 2018 E.C., the Board of Directors conducted a strategic review of service delivery, patient care standards, and digital health implementation across all hospital wards.',
            content: `<p>The Board of Directors of Emmanuel Mental Specialized Hospital (EMSH) recently concluded a high-level strategic supervision visit aimed at assessing the hospital's performance and service quality. The visit, which took place on February 17, 2018 E.C., included a detailed review of clinical operations, patient care standards, and the implementation of modern healthcare technologies.</p><p>During the session, board members toured several specialized departments, including the acute care psychiatric unit and the rehabilitation center. They engaged with department heads to discuss challenges and opportunities for further enhancing mental health service delivery in Ethiopia.</p><p>The board expressed satisfaction with the hospital's progress in digital health transformation and emphasized the importance of maintaining EMSH's position as a regional center of excellence.</p><h3>Key Supervision Areas:</h3><ul><li><strong>Inpatient Bed Capacity:</strong> Reviewed the expansion of the new acute care ward.</li><li><strong>Research Integration:</strong> Evaluated the progress of the neuropsychiatry research department.</li><li><strong>Community Outreach:</strong> Assessed the performance of regional mental health support programs.</li></ul>`,
            type: 'NEWS',
            status: 'PUBLISHED',
            publishedAt: new Date('2026-02-24T10:00:00Z'),
            tags: JSON.stringify(['institutional', 'governance', 'board', 'supervision']),
        },
    });
    console.log('✅ Updated post 1: Board Visit');

    // Update the old "Mental Health Awareness Week 2024" post to CHW Training news
    await prisma.post.update({
        where: { slug: 'mental-health-awareness-week-2024' },
        data: {
            title: 'EMSH Trains 134 Community Health Workers in Mental Health Crisis Response',
            slug: 'community-health-worker-training-program',
            excerpt: 'A three-day intensive training program equipped community health workers from 10 Addis Ababa sub-cities with crisis detection, referral, and anti-stigma skills.',
            content: `<p>Emmanuel Mental Specialized Hospital recently completed a landmark training initiative that equipped over 120 community health workers (CHWs) from Addis Ababa sub-cities with the knowledge and skills to identify and respond to mental health crises at the community level.</p><p>The three-day intensive program, conducted in both Amharic and English, covered critical topics including early symptom recognition, suicide risk assessment, anti-stigma communication, and clear referral pathways to EMSH's outpatient department.</p><h3>Training Program Highlights:</h3><ul><li><strong>134 participants</strong> from 10 sub-cities trained</li><li>Modules on schizophrenia, bipolar disorder, and substance use</li><li>Practical crisis de-escalation role-play exercises</li><li>Certification awarded to all successful graduates</li></ul><p>This program is part of EMSH's broader community mental health integration strategy, working in partnership with the Addis Ababa City Health Bureau to decentralize mental health support.</p>`,
            type: 'NEWS',
            status: 'PUBLISHED',
            publishedAt: new Date('2026-02-12T07:30:00Z'),
            tags: JSON.stringify(['training', 'community', 'health-workers', 'outreach']),
            eventDate: null,
            eventLocation: null,
        },
    });
    console.log('✅ Updated post 2: CHW Training');

    console.log('\n🎉 Posts updated successfully!');
}

main()
    .catch(console.error)
    .finally(async () => { await prisma.$disconnect(); });
