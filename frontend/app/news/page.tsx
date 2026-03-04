'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { postsAPI } from '@/lib/api';
import Link from 'next/link';
import { CalendarIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function NewsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const mockPosts = [
            {
                id: '1',
                title: 'Strategic Institutional Update: Board of Directors Conducts Supervision Visit',
                slug: 'hospital-board-strategic-visit-2018',
                excerpt: 'On February 17, 2018 E.C., the Board of Directors of Emmanuel Mental Specialized Hospital conducted a comprehensive supervision visit to evaluate service delivery, administrative performance, and infrastructural development across various wards.',
                content: `
                    <p>The Board of Directors of Emmanuel Mental Specialized Hospital (EMSH) recently concluded a high-level strategic supervision visit aimed at assessing the hospital's performance and service quality. The visit, which took place on February 17, 2018 E.C., included a detailed review of clinical operations, patient care standards, and the implementation of modern healthcare technologies.</p>
                    <p>During the session, board members toured several specialized departments, including the acute care psychiatric unit and the rehabilitation center. They engaged with department heads to discuss challenges and opportunities for further enhancing mental health service delivery in Ethiopia.</p>
                    <p>The board expressed satisfaction with the hospital's progress in digital health transformation and emphasized the importance of maintaining EMSH's position as a regional center of excellence.</p>
                `,
                featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dad99961?auto=format&fit=crop&q=80&w=1200',
                type: 'NEWS',
                status: 'PUBLISHED',
                category: { name: 'Institutional', slug: 'institutional' },
                isBreaking: true,
                publishedAt: '2026-02-24T10:00:00Z',
            },
            {
                id: '2',
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
                category: { name: 'Clinical', slug: 'clinical' },
                isBreaking: false,
                publishedAt: '2026-02-23T09:00:00Z',
            },
            {
                id: '3',
                title: 'A Century of Care: EMSH\'s Continuing Legacy in Mental Health Pioneerism',
                slug: 'emsh-legacy-90-years',
                excerpt: 'Established in 1930 E.C. (1938 G.C.), Emmanuel Mental Specialized Hospital remains the primary pillar for psychiatric care in Ethiopia, serving millions through specialized treatments and research.',
                content: `<p>Emmanuel Mental Specialized Hospital (EMSH) stands as Ethiopia's foremost and oldest specialized institution dedicated exclusively to mental health care. Established in 1930 E.C., the hospital has served as a cornerstone of psychiatric services for over nine decades.</p><p>Our comprehensive services include specialized psychiatry, clinical psychology, world-class rehabilitation, and community-based outreach. As we move forward, we remain committed to our founding motto: "ለአእምሮ ጤና እንተጋለን!" (Working together for mental health).</p>`,
                featuredImage: 'https://images.unsplash.com/photo-1519494140681-891f9302e48e?auto=format&fit=crop&q=80&w=1200',
                type: 'NEWS',
                status: 'PUBLISHED',
                category: { name: 'Announcements', slug: 'announcements' },
                isBreaking: false,
                publishedAt: '2026-02-20T14:30:00Z',
            },
            {
                id: '4',
                title: 'Understanding Depression: Symptoms, Causes, and When to Seek Help',
                slug: 'understanding-depression-symptoms-causes',
                excerpt: 'Depression is one of the most misunderstood mental health conditions. EMSH clinical experts explain the difference between sadness and clinical depression, and how modern treatments offer a path to recovery.',
                content: `<p>Depression (Ye'Hibet Beshita – የሐዘን ህመም) is more than just feeling sad. It is a serious medical condition that affects how a person thinks, feels, and functions in daily life. At Emmanuel Mental Specialized Hospital, depression is one of the most commonly treated psychiatric conditions.</p><h3>Common Symptoms of Depression:</h3><ul><li>Persistent sadness or feelings of emptiness lasting more than two weeks</li><li>Loss of interest in activities once enjoyed (anhedonia)</li><li>Changes in appetite and sleep patterns</li><li>Fatigue, low energy, and difficulty concentrating</li><li>Feelings of worthlessness or excessive guilt</li><li>In severe cases: thoughts of self-harm or suicide</li></ul><h3>Effective Treatments Available at EMSH:</h3><ul><li><strong>Pharmacotherapy:</strong> Antidepressant medications tailored to individual patient profiles</li><li><strong>Cognitive Behavioural Therapy (CBT):</strong> Evidence-based talk therapy to reshape negative thinking patterns</li><li><strong>Group Therapy:</strong> Peer support sessions facilitated by licensed clinical psychologists</li><li><strong>Community Follow-up:</strong> Outreach teams to support patients after discharge</li></ul><p>If you or someone you know is experiencing these symptoms for more than two weeks, please reach out. Early treatment leads to faster recovery. <strong>ለአእምሮ ጤና እንተጋለን!</strong></p>`,
                featuredImage: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=1200',
                type: 'NEWS',
                status: 'PUBLISHED',
                category: { name: 'Clinical', slug: 'clinical' },
                isBreaking: false,
                publishedAt: '2026-02-17T08:00:00Z',
            },
            {
                id: '5',
                title: 'EMSH Conducts Intensive Mental Health Training for Community Health Workers',
                slug: 'community-health-worker-training-program',
                excerpt: 'Over 120 community health workers from across Addis Ababa attended a three-day intensive training at EMSH, covering early detection, crisis management, and referral protocols for mental health conditions.',
                content: `<p>Emmanuel Mental Specialized Hospital recently completed a landmark training initiative that equipped over 120 community health workers (CHWs) from Addis Ababa sub-cities with the knowledge and skills to identify and respond to mental health crises at the community level.</p><p>The three-day intensive program, conducted in both Amharic and English, covered critical topics including early symptom recognition, suicide risk assessment, anti-stigma communication, and clear referral pathways to EMSH's outpatient department.</p><h3>Training Program Highlights:</h3><ul><li><strong>134 participants</strong> from 10 sub-cities trained</li><li>Modules on schizophrenia, bipolar disorder, and substance use</li><li>Practical crisis de-escalation role-play exercises</li><li>Certification awarded to all successful graduates</li></ul><p>This program is part of EMSH's broader community mental health integration strategy, working in partnership with the Addis Ababa City Health Bureau to decentralize mental health support.</p><p>"This training will enable us to reach patients who would otherwise never make it to a hospital," said the lead facilitator from EMSH's Community Psychiatry Department.</p>`,
                featuredImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1200',
                type: 'NEWS',
                status: 'PUBLISHED',
                category: { name: 'Training', slug: 'training' },
                isBreaking: false,
                publishedAt: '2026-02-12T07:30:00Z',
            },
            {
                id: '6',
                title: 'World Mental Health Day 2025: EMSH Leads Nationwide Awareness Drive',
                slug: 'world-mental-health-day-2025-awareness',
                excerpt: 'On World Mental Health Day, October 10, 2025, EMSH spearheaded a nationwide awareness campaign across schools, universities, and media platforms under the theme "Mental Health is a Human Right."',
                content: `<p>On October 10, 2025, Emmanuel Mental Specialized Hospital marked World Mental Health Day with a comprehensive nationwide awareness campaign. Under the global theme <em>"Mental Health is a Universal Human Right,"</em> the hospital organized a series of events designed to reduce stigma and promote access to mental health services for all Ethiopians.</p><h3>Key Activities:</h3><ul><li><strong>Public Symposium:</strong> A major conference held at EMSH bringing together policymakers, clinicians, researchers, and civil society organizations</li><li><strong>University Outreach:</strong> Clinical teams visited 8 universities across Addis Ababa, reaching over 5,000 students</li><li><strong>Radio & TV Campaigns:</strong> Educational spots broadcast on ETV and FM stations in Amharic and Afaan Oromo</li><li><strong>Free Consultations:</strong> Walk-in mental health screening offered free of charge at EMSH for the entire week</li></ul><p>Dr. [Medical Director] remarked: "Every Ethiopian deserves access to quality mental health care. Today is a reminder that mental health is not a luxury — it is a fundamental human right. Our doors are always open."</p><p>EMSH treated over 800 walk-in patients during the free consultation week, demonstrating the enormous unmet need for mental health services in the country.</p>`,
                featuredImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200',
                type: 'NEWS',
                status: 'PUBLISHED',
                category: { name: 'Community Outreach', slug: 'community-outreach' },
                isBreaking: false,
                publishedAt: '2025-10-10T09:00:00Z',
            },
            {
                id: '7',
                title: 'New Neuropsychiatry Research Unit Opens at EMSH, Advancing Brain Science in Africa',
                slug: 'neuropsychiatry-research-unit-launch',
                excerpt: 'EMSH has officially inaugurated its dedicated Neuropsychiatry Research Unit, a state-of-the-art facility for studying the biological basis of psychiatric disorders — a first of its kind in Ethiopia.',
                content: `<p>Emmanuel Mental Specialized Hospital has taken a landmark step in advancing psychiatric science in Africa with the inauguration of its new dedicated <strong>Neuropsychiatry Research Unit</strong>. The unit, equipped with modern neuroimaging support systems, EEG facilities, and a clinical trials coordination center, represents a major investment in evidence-based mental health understanding for the region.</p><p>The unit will focus on research areas critical to Ethiopia's mental health landscape, including:</p><ul><li><strong>Genetic and biomarker studies</strong> in schizophrenia and bipolar disorder</li><li><strong>Neurological co-morbidities</strong> in psychiatric patients</li><li><strong>Pharmacogenomics:</strong> personalizing medication for Ethiopian patient populations</li><li><strong>Epilepsy and psychiatric comorbidity</strong> management protocols</li></ul><p>In its first year, the unit aims to publish at least 10 peer-reviewed papers in collaboration with international academic partners, including institutions in Europe and North America.</p><p>"Ethiopian patients deserve treatments developed with their biology in mind," said the Head of the Research Department. "This unit is our first step toward that future."</p><p>The facility will also serve as a training ground for the next generation of psychiatric researchers in Ethiopia, offering postgraduate research fellowships.</p>`,
                featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1200',
                type: 'NEWS',
                status: 'PUBLISHED',
                category: { name: 'Research', slug: 'research' },
                isBreaking: true,
                publishedAt: '2026-01-15T11:00:00Z',
            },
            {
                id: '8',
                title: 'Caring for Caregivers: EMSH Launches Support Program for Families of Psychiatric Patients',
                slug: 'caregiver-support-program-launch',
                excerpt: 'Recognizing the mental burden on families, EMSH has launched a structured caregiver support and education program — providing free counseling, psychoeducation, and peer support groups every Saturday.',
                content: `<p>Mental illness does not only affect the individual — it profoundly impacts entire families. Addressing this often-overlooked dimension of mental health, Emmanuel Mental Specialized Hospital has officially launched its <strong>Caregiver Support and Psychoeducation Program</strong>, offering structured support to families and loved ones of psychiatric patients.</p><h3>Program Components:</h3><ul><li><strong>Weekly Psychoeducation Sessions:</strong> Every Saturday, 9:00 AM – 11:00 AM, at the EMSH Outpatient Compound. Topics include understanding diagnosis, medication management, crisis prevention, and handling relapses.</li><li><strong>Free Family Counseling:</strong> Up to four free individual counseling sessions with a licensed clinical psychologist</li><li><strong>Peer Support Groups:</strong> Facilitated groups connecting families who are navigating similar challenges</li><li><strong>Mental Health First Aid Training:</strong> Teaching families how to safely respond to a psychiatric emergency at home</li></ul><p>The program is free of charge and open to all families of current and former EMSH patients. Registration is done at the Outpatient Department reception desk.</p><p>"A family that understands mental illness is a family that can heal together," said the program coordinator. "We want caregivers to feel seen, supported, and equipped."</p>`,
                featuredImage: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=1200',
                type: 'NEWS',
                status: 'PUBLISHED',
                category: { name: 'Community Outreach', slug: 'community-outreach' },
                isBreaking: false,
                publishedAt: '2026-01-28T10:00:00Z',
            }
        ];

        postsAPI.getAll({ type: 'NEWS', status: 'PUBLISHED' })
            .then(res => {
                if (res.data.posts && res.data.posts.length > 0) {
                    setPosts(res.data.posts);
                } else {
                    setPosts(mockPosts);
                }
            })
            .catch(() => setPosts(mockPosts))
            .finally(() => setLoading(false));
    }, []);

    const breakingPosts = posts.filter(post =>
        post.category?.name?.toLowerCase() === 'breaking' ||
        post.isBreaking === true
    );

    const filteredPosts = posts;

    return (
        <>
            <EmergencyBanner />
            <Navbar />

            <main className="bg-gray-50 min-h-screen">
                {/* Hero */}
                <section className="relative min-h-[60vh] bg-blue-950 flex items-center overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '48px 48px',
                        }} />
                    </div>

                    {/* Decorative Blue Orbs */}
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                    {/* Content */}
                    <div className="container-custom relative z-10 py-24 text-center">
                        <div className="max-w-4xl mx-auto">
                            {/* Badge */}
                            <div className="animate-fade-in-up mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-semibold uppercase tracking-widest">
                                    ✦ Hospital News & Media
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                Latest Updates <br />
                                <span className="text-gray-400 italic font-medium">& Announcements</span>
                            </h1>


                            {/* Subtitle */}
                            <p className="text-lg md:text-2xl text-blue-100/60 max-w-2xl mx-auto leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Follow our journey in transforming mental health care in Ethiopia through research, community outreach, and clinical excellence.
                            </p>
                        </div>
                    </div>
                </section>



                {/* ADVANCED GAZETTE FEATURES */}
                <div className="bg-[#F9F7F2]">
                    {/* 1. BREAKING NEWS TICKER */}
                    {breakingPosts.length > 0 && (
                        <div className="bg-blue-900 text-white overflow-hidden py-2 border-y border-white/10 group">
                            <div className="container-custom flex items-center">
                                <span className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded text-[9px] font-black uppercase tracking-widest mr-6 shrink-0 shadow-lg">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                    Breaking
                                </span>
                                <div className="flex animate-[scroll_40s_linear_infinite] whitespace-nowrap gap-12 text-[10px] font-bold uppercase tracking-widest opacity-80 group-hover:[animation-play-state:paused] cursor-default">
                                    {breakingPosts.map((post, i) => (
                                        <span key={i} className="hover:text-cyan-300 transition-colors">✦ {post.title}</span>
                                    ))}
                                    {/* Duplicate for loop */}
                                    {breakingPosts.map((post, i) => (
                                        <span key={`dup-${i}`} className="hover:text-cyan-300 transition-colors">✦ {post.title}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. THE MASTHEAD */}
                    <div className="container-custom pt-12 pb-8 text-center border-b-2 border-gray-200">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6">
                                <span>Vol. LXXXIX</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                <span>No. 248</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                <span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <h2 className="text-6xl md:text-9xl font-black text-gray-900 tracking-tighter mb-4 font-serif italic">
                                EMSH <span className="text-blue-900 not-italic">Gazette</span>
                            </h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-900/40">
                                The Official Institutional Publication of Emmanuel Mental Specialized Hospital
                            </p>
                        </div>
                    </div>
                </div>

                {/* Newspaper Content */}
                <section className="py-16 bg-[#F9F7F2]"> {/* Warm newsprint background */}
                    <div className="container-custom">
                        {loading ? (
                            <div className="animate-pulse space-y-8">
                                <div className="h-[500px] bg-gray-200 rounded-3xl" />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-2xl" />)}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col lg:flex-row gap-12">
                                {/* MAIN CONTENT AREA */}
                                <div className="flex-1">
                                    {/* FEATURED STORY (ABOVE THE FOLD) */}
                                    {filteredPosts[0] && (
                                        <article className="group mb-16 border-b-4 border-double border-gray-200 pb-16">
                                            <Link href={`/news/${filteredPosts[0].slug}`} className="block">
                                                <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem] mb-12 shadow-2xl transition-all duration-700 group-hover:shadow-blue-900/10">
                                                    <img
                                                        src={filteredPosts[0].featuredImage || 'https://images.unsplash.com/photo-1519494140681-891f9302e48e?auto=format&fit=crop&q=80&w=1200'}
                                                        alt={filteredPosts[0].title}
                                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                                    />
                                                    <div className="absolute top-8 left-8">
                                                        <span className="px-6 py-2 bg-blue-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl">
                                                            Institutional Lead
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="max-w-4xl">
                                                    <div className="flex items-center gap-6 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                                                        <span className="flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-blue-900" /> {new Date(filteredPosts[0].publishedAt).toLocaleDateString()}</span>
                                                        <span className="flex items-center gap-2 text-blue-900 bg-blue-50 px-3 py-1 rounded-lg">Hospital Journal</span>
                                                    </div>
                                                    <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 group-hover:text-blue-900 transition-colors leading-[1.05] tracking-tighter">
                                                        {filteredPosts[0].title}
                                                    </h2>
                                                    <div className="relative">
                                                        {/* DROP CAP Effect */}
                                                        <p className="text-2xl text-gray-600 leading-relaxed mb-10 font-serif italic first-letter:text-7xl first-letter:font-black first-letter:text-blue-900 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
                                                            {filteredPosts[0].excerpt}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all border-b-2 border-blue-900/10 pb-2 w-max">
                                                        Continue to Article <ArrowRightIcon className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </article>
                                    )}

                                    {/* SECONDARY STORIES GRID */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                        {filteredPosts.slice(1).map((post, idx) => (
                                            <article key={post.id} className={`group ${idx % 2 === 0 ? 'md:border-r md:border-gray-200 md:pr-12' : ''}`}>
                                                <Link href={`/news/${post.slug}`} className="block">
                                                    <div className="aspect-video overflow-hidden rounded-2xl mb-6 grayscale hover:grayscale-0 transition-all duration-700">
                                                        <img
                                                            src={post.featuredImage}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-4 text-gray-400 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                                                        <span className="px-2 py-0.5 border border-gray-200 rounded text-blue-900">{post.category?.name}</span>
                                                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-900 transition-colors tracking-tight">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 font-serif">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="text-blue-900 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                                        Read Full Report ➔
                                                    </div>
                                                </Link>
                                            </article>
                                        ))}
                                    </div>
                                </div>

                                {/* SIDEBAR - THE DAILY BRIEFING */}
                                <aside className="lg:w-80 shrink-0">
                                    <div className="sticky top-32 space-y-8">
                                        <div className="bg-white border-t-4 border-blue-900 p-8 shadow-xl rounded-b-3xl">
                                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-900 mb-6 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                                Daily Briefing
                                            </h4>
                                            <div className="space-y-6">
                                                {posts.slice(0, 4).map((post, idx) => (
                                                    <Link key={post.id} href={`/news/${post.slug}`} className="block group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-2">Notice {idx + 1}</p>
                                                        <h5 className="font-bold text-gray-900 group-hover:text-blue-900 transition-colors leading-snug">
                                                            {post.title}
                                                        </h5>
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                                                <p className="text-[10px] text-gray-400 font-medium mb-4 uppercase tracking-[0.2em]">Established 1930 E.C.</p>
                                                <button className="w-full py-3 bg-gray-50 text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-colors">
                                                    Subscribe to Gazette
                                                </button>
                                            </div>
                                        </div>

                                        {/* Quick Links / Tags */}
                                        <div className="p-8 bg-blue-900 rounded-3xl text-white">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6">Publication Desk</h4>
                                            <div className="space-y-4">
                                                {['Press Releases', 'Media Kit', 'Clinical Journals', 'Public Archive'].map(tag => (
                                                    <button key={tag} className="block w-full text-left text-sm font-bold text-blue-200 hover:text-white transition-colors">
                                                        {tag} ➔
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        )}

                    </div>
                </section>
            </main >

            <Footer />
        </>
    );
}
