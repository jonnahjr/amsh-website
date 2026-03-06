
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const mockPosts = [
    {
        title: 'Strategic Institutional Update: Board of Directors Conducts Supervision Visit',
        slug: 'hospital-board-strategic-visit-2018',
        excerpt: 'On February 17, 2018 E.C., the Board of Directors of Emmanuel Mental Specialized Hospital conducted a comprehensive supervision visit to evaluate service delivery, administrative performance, and infrastructural development across various wards.',
        content: `
            <p>The Board of Directors of Emmanuel Mental Specialized Hospital (EMSH) recently concluded a high-level strategic supervision visit aimed at assessing the hospital's performance and service quality. The visit, which took place on February 17, 2018 E.C., included a detailed review of clinical operations, patient care standards, and the implementation of modern healthcare technologies.</p>
            <p>During the session, board members toured several specialized departments, including the acute care psychiatric unit and the rehabilitation center. They engaged with department heads to discuss challenges and opportunities for further enhancing mental health service delivery in Ethiopia.</p>
            <p>The board expressed satisfaction with the hospital's progress in digital health transformation and emphasized the importance of maintaining EMSH's position as a regional center of excellence.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1504813184591-01592f2bb0cd?auto=format&fit=crop&q=80&w=1200',
        type: 'NEWS',
        status: 'PUBLISHED',
        publishedAt: new Date('2026-02-24T10:00:00Z'),
    },
    {
        title: 'Addressing the Digital Age: Understanding Social Media Addiction in Modern Ethiopia',
        slug: 'understanding-social-media-addiction-impact',
        excerpt: 'As social media becomes central to youth life, behavioral addictions are on the rise. Our clinical teams discuss the Dopamine-driven patterns, psychological symptoms, and strategic steps for digital detoxification.',
        content: `
            <p>Social media addiction is an increasing concern affecting millions, particularly young adults and adolescents. At Emmanuel Mental Specialized Hospital, we are seeing a growing number of cases related to behavioral addictions linked to digital consumption.</p>
            <p>This "Dopamine-driven" addiction occurs when the brain repeatedly seeks the instant gratification provided by social media interactions such as likes, comments, and shares. Symptoms often include excessive screen time, anxiety when offline, and a withdrawal from real-world relationships and responsibilities.</p>
            <h3>Key Strategies for Recovery:</h3>
            <ul>
                <li><strong>Set Time Limits:</strong> Dedicate specific windows for social media use.</li>
                <li><strong>Notification Management:</strong> Disable non-essential alerts to reduce compulsive checking.</li>
                <li><strong>Digital-Free Zones:</strong> Designate meal times and bedroom hours as "phone-free."</li>
            </ul>
            <p>Prioritizing mental health in the digital age is essential for long-term psychological well-being.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1200',
        type: 'NEWS',
        status: 'PUBLISHED',
        publishedAt: new Date('2026-02-23T09:00:00Z'),
    },
    {
        title: 'A Century of Care: EMSH\'s Continuing Legacy in Mental Health Pioneerism',
        slug: 'emsh-legacy-90-years',
        excerpt: 'Established in 1930 E.C. (1938 G.C.), Emmanuel Mental Specialized Hospital remains the primary pillar for psychiatric care in Ethiopia, serving millions through specialized treatments and research.',
        content: `<p>Emmanuel Mental Specialized Hospital (EMSH) stands as Ethiopia's foremost and oldest specialized institution dedicated exclusively to mental health care. Established in 1930 E.C., the hospital has served as a cornerstone of psychiatric services for over nine decades.</p><p>Our comprehensive services include specialized psychiatry, clinical psychology, world-class rehabilitation, and community-based outreach. As we move forward, we remain committed to our founding motto: "ለአእምሮ ጤና እንተጋለን!" (Working together for mental health).</p>`,
        featuredImage: 'https://images.unsplash.com/photo-1538108149393-fdfd816944fd?auto=format&fit=crop&q=80&w=1200',
        type: 'NEWS',
        status: 'PUBLISHED',
        publishedAt: new Date('2026-02-20T14:30:00Z'),
    },
    {
        title: 'Understanding Depression: Symptoms, Causes, and When to Seek Help',
        slug: 'understanding-depression-symptoms-causes',
        excerpt: 'Depression is one of the most misunderstood mental health conditions. EMSH clinical experts explain the difference between sadness and clinical depression, and how modern treatments offer a path to recovery.',
        content: `<p>Depression (Ye'Hibet Beshita – የሐዘን ህመም) is more than just feeling sad. It is a serious medical condition that affects how a person thinks, feels, and functions in daily life. At Emmanuel Mental Specialized Hospital, depression is one of the most commonly treated psychiatric conditions.</p><h3>Common Symptoms of Depression:</h3><ul><li>Persistent sadness or feelings of emptiness lasting more than two weeks</li><li>Loss of interest in activities once enjoyed (anhedonia)</li><li>Changes in appetite and sleep patterns</li><li>Fatigue, low energy, and difficulty concentrating</li><li>Feelings of worthlessness or excessive guilt</li><li>In severe cases: thoughts of self-harm or suicide</li></ul><h3>Effective Treatments Available at EMSH:</h3><ul><li><strong>Pharmacotherapy:</strong> Antidepressant medications tailored to individual patient profiles</li><li><strong>Cognitive Behavioural Therapy (CBT):</strong> Evidence-based talk therapy to reshape negative thinking patterns</li><li><strong>Group Therapy:</strong> Peer support sessions facilitated by licensed clinical psychologists</li><li><strong>Community Follow-up:</strong> Outreach teams to support patients after discharge</li></ul><p>If you or someone you know is experiencing these symptoms for more than two weeks, please reach out. Early treatment leads to faster recovery. <strong>ለአእምሮ ጤና እንተጋለን!</strong></p>`,
        featuredImage: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=1200',
        type: 'NEWS',
        status: 'PUBLISHED',
        publishedAt: new Date('2026-02-17T08:00:00Z'),
    },
    {
        title: 'EMSH Conducts Intensive Mental Health Training for Community Health Workers',
        slug: 'community-health-worker-training-program',
        excerpt: 'Over 120 community health workers from across Addis Ababa attended a three-day intensive training at EMSH, covering early detection, crisis management, and referral protocols for mental health conditions.',
        content: `<p>Emmanuel Mental Specialized Hospital recently completed a landmark training initiative that equipped over 120 community health workers (CHWs) from Addis Ababa sub-cities with the knowledge and skills to identify and respond to mental health crises at the community level.</p><p>The three-day intensive program, conducted in both Amharic and English, covered critical topics including early symptom recognition, suicide risk assessment, anti-stigma communication, and clear referral pathways to EMSH's outpatient department.</p><h3>Training Program Highlights:</h3><ul><li><strong>134 participants</strong> from 10 sub-cities trained</li><li>Modules on schizophrenia, bipolar disorder, and substance use</li><li>Practical crisis de-escalation role-play exercises</li><li>Certification awarded to all successful graduates</li></ul><p>This program is part of EMSH's broader community mental health integration strategy, working in partnership with the Addis Ababa City Health Bureau to decentralize mental health support.</p><p>"This training will enable us to reach patients who would otherwise never make it to a hospital," said the lead facilitator from EMSH's Community Psychiatry Department.</p>`,
        featuredImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200',
        type: 'NEWS',
        status: 'PUBLISHED',
        publishedAt: new Date('2026-02-12T07:30:00Z'),
    },
    {
        title: 'World Mental Health Day 2025: EMSH Leads Nationwide Awareness Drive',
        slug: 'world-mental-health-day-2025-awareness',
        excerpt: 'On World Mental Health Day, October 10, 2025, EMSH spearheaded a nationwide awareness campaign across schools, universities, and media platforms under the theme "Mental Health is a Human Right."',
        content: `<p>On October 10, 2025, Emmanuel Mental Specialized Hospital marked World Mental Health Day with a comprehensive nationwide awareness campaign. Under the global theme <em>"Mental Health is a Universal Human Right,"</em> the hospital organized a series of events designed to reduce stigma and promote access to mental health services for all Ethiopians.</p><h3>Key Activities:</h3><ul><li><strong>Public Symposium:</strong> A major conference held at EMSH bringing together policymakers, clinicians, researchers, and civil society organizations</li><li><strong>University Outreach:</strong> Clinical teams visited 8 universities across Addis Ababa, reaching over 5,000 students</li><li><strong>Radio & TV Campaigns:</strong> Educational spots broadcast on ETV and FM stations in Amharic and Afaan Oromo</li><li><strong>Free Consultations:</strong> Walk-in mental health screening offered free of charge at EMSH for the entire week</li></ul><p>Dr. [Medical Director] remarked: "Every Ethiopian deserves access to quality mental health care. Today is a reminder that mental health is not a luxury — it is a fundamental human right. Our doors are always open."</p><p>EMSH treated over 800 walk-in patients during the free consultation week, demonstrating the enormous unmet need for mental health services in the country.</p>`,
        featuredImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200',
        type: 'NEWS',
        status: 'PUBLISHED',
        publishedAt: new Date('2025-10-10T09:00:00Z'),
    },
    {
        title: 'New Neuropsychiatry Research Unit Opens at EMSH, Advancing Brain Science in Africa',
        slug: 'neuropsychiatry-research-unit-launch',
        excerpt: 'EMSH has officially inaugurated its dedicated Neuropsychiatry Research Unit, a state-of-the-art facility for studying the biological basis of psychiatric disorders — a first of its kind in Ethiopia.',
        content: `<p>Emmanuel Mental Specialized Hospital has taken a landmark step in advancing psychiatric science in Africa with the inauguration of its new dedicated <strong>Neuropsychiatry Research Unit</strong>. The unit, equipped with modern neuroimaging support systems, EEG facilities, and a clinical trials coordination center, represents a major investment in evidence-based mental health understanding for the region.</p><p>The unit will focus on research areas critical to Ethiopia's mental health landscape, including:</p><ul><li><strong>Genetic and biomarker studies</strong> in schizophrenia and bipolar disorder</li><li><strong>Neurological co-morbidities</strong> in psychiatric patients</li><li><strong>Pharmacogenomics:</strong> personalizing medication for Ethiopian patient populations</li><li><strong>Epilepsy and psychiatric comorbidity</strong> management protocols</li></ul><p>In its first year, the unit aims to publish at least 10 peer-reviewed papers in collaboration with international academic partners, including institutions in Europe and North America.</p><p>"Ethiopian patients deserve treatments developed with their biology in mind," said the Head of the Research Department. "This unit is our first step toward that future."</p><p>The facility will also serve as a training ground for the next generation of psychiatric researchers in Ethiopia, offering postgraduate research fellowships.</p>`,
        featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1200',
        type: 'NEWS',
        status: 'PUBLISHED',
        publishedAt: new Date('2026-01-15T11:00:00Z'),
    },
    {
        title: 'Caring for Caregivers: EMSH Launches Support Program for Families of Psychiatric Patients',
        slug: 'caregiver-support-program-launch',
        excerpt: 'Recognizing the mental burden on families, EMSH has launched a structured caregiver support and education program — providing free counseling, psychoeducation, and peer support groups every Saturday.',
        content: `<p>Mental illness does not only affect the individual — it profoundly impacts entire families. Addressing this often-overlooked dimension of mental health, Emmanuel Mental Specialized Hospital has officially launched its <strong>Caregiver Support and Psychoeducation Program</strong>, offering structured support to families and loved ones of psychiatric patients.</p><h3>Program Components:</h3><ul><li><strong>Weekly Psychoeducation Sessions:</strong> Every Saturday, 9:00 AM – 11:00 AM, at the EMSH Outpatient Compound. Topics include understanding diagnosis, medication management, crisis prevention, and handling relapses.</li><li><strong>Free Family Counseling:</strong> Up to four free individual counseling sessions with a licensed clinical psychologist</li><li><strong>Peer Support Groups:</strong> Facilitated groups connecting families who are navigating similar challenges</li><li><strong>Mental Health First Aid Training:</strong> Teaching families how to safely respond to a psychiatric emergency at home</li></ul><p>The program is free of charge and open to all families of current and former EMSH patients. Registration is done at the Outpatient Department reception desk.</p><p>"A family that understands mental illness is a family that can heal together," said the program coordinator. "We want caregivers to feel seen, supported, and equipped."</p>`,
        featuredImage: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=1200',
        type: 'NEWS',
        status: 'PUBLISHED',
        publishedAt: new Date('2026-01-28T10:00:00Z'),
    }
];

async function main() {
    const authorId = 'cmlux3st9000020sdshmhqif9'; // AMSH Administrator

    console.log('Seeding news posts...');

    for (const post of mockPosts) {
        await prisma.post.upsert({
            where: { slug: post.slug },
            update: {
                ...post,
                authorId,
            },
            create: {
                ...post,
                authorId,
            },
        });
        console.log(`✅ Upserted: ${post.title}`);
    }

    console.log('Done.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
