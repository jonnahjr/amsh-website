'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { postsAPI } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';

export default function NewsDetailPage() {
    const { slug } = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postsAPI.getBySlug(slug as string).then(res => {
            setPost(res.data.post);
        }).catch(() => {
            // Updated Mock cases based on Facebook content
            if (slug === 'hospital-board-strategic-visit-2018') {
                setPost({
                    title: 'Strategic Institutional Update: Board of Directors Conducts Supervision Visit',
                    content: `
                        <p>The Board of Directors of Emmanuel Mental Specialized Hospital (EMSH) recently concluded a high-level strategic supervision visit aimed at assessing the hospital's performance and service quality. The visit, which took place on February 17, 2018 E.C., included a detailed review of clinical operations, patient care standards, and the implementation of modern healthcare technologies.</p>
                        <p>During the session, board members toured several specialized departments, including the acute care psychiatric unit and the rehabilitation center. They engaged with department heads to discuss challenges and opportunities for further enhancing mental health service delivery in Ethiopia.</p>
                        <p>The board expressed satisfaction with the hospital's progress in digital health transformation and emphasized the importance of maintaining EMSH's position as a regional center of excellence.</p>
                         <h3>Key Supervision Areas:</h3>
                        <ul>
                            <li><strong>Inpatient Bed Capacity:</strong> Reviewed the expansion of the new acute care ward.</li>
                            <li><strong>Research Integration:</strong> Evaluated the progress of the neuropsychiatry research department.</li>
                            <li><strong>Community Outreach:</strong> Assessed the performance of regional mental health support programs.</li>
                        </ul>
                    `,
                    publishedAt: '2026-02-24T10:00:00Z',
                    type: 'NEWS',
                    author: { name: 'Hospital PR Desk' },
                    category: { name: 'Institutional' },
                    featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173dad99961?auto=format&fit=crop&q=80&w=1200'
                });
            } else if (slug === 'understanding-social-media-addiction-impact') {
                setPost({
                    title: 'Addressing the Digital Age: Understanding Social Media Addiction in Modern Ethiopia',
                    content: `
                        <p>Social media addiction is an increasing concern affecting millions, particularly young adults and adolescents. At Emmanuel Mental Specialized Hospital, we are seeing a growing number of cases related to behavioral addictions linked to digital consumption.</p>
                        <p>This "Dopamine-driven" addiction occurs when the brain repeatedly seeks the instant gratification provided by social media interactions such as likes, comments, and shares. Symptoms often include excessive screen time, anxiety when offline, and a withdrawal from real-world relationships and responsibilities.</p>
                        <h3>Psychological Symptoms:</h3>
                        <ul>
                            <li>Excessive preoccupation with online platforms.</li>
                            <li>Anxiety, restlessness, or irritability when access is restricted.</li>
                            <li>Decline in academic or professional performance due to screen time.</li>
                            <li>Sleep disturbances caused by late-night scrolling.</li>
                        </ul>
                        <h3>Key Strategies for Recovery:</h3>
                        <ul>
                            <li><strong>Set Time Limits:</strong> Dedicate specific windows for social media use.</li>
                            <li><strong>Notification Management:</strong> Disable non-essential alerts to reduce compulsive checking.</li>
                            <li><strong>Digital-Free Zones:</strong> Designate meal times and bedroom hours as "phone-free."</li>
                        </ul>
                        <p>Prioritizing mental health in the digital age is essential for long-term psychological well-being. Our outpatient clinic is available for those seeking professional guidance on managing behavioral addictions.</p>
                    `,
                    publishedAt: '2026-02-23T09:00:00Z',
                    type: 'NEWS',
                    author: { name: 'Clinical Psychology Dept' },
                    category: { name: 'Clinical' },
                    featuredImage: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1200'
                });
            } else if (slug === 'emsh-legacy-90-years') {
                setPost({
                    title: 'A Century of Care: EMSH’s Continuing Legacy in Mental Health Pioneerism',
                    content: `
                        <p>Emmanuel Mental Specialized Hospital (EMSH) stands as Ethiopia's foremost and oldest specialized institution dedicated exclusively to mental health care. Established in 1930 E.C., the hospital has served as a cornerstone of psychiatric services for over nine decades.</p>
                        <p>Our comprehensive services include specialized psychiatry, clinical psychology, world-class rehabilitation, and community-based outreach. As we move forward, we remain committed to our founding motto: "ለአእምሮ ጤና እንተጋለን!" (Working together for mental health).</p>
                        <p>Over the years, EMSH has transitioned from a modest facility into a national center of excellence, delivering specialized psychiatric treatment, advancing clinical research, and training generations of mental health professionals who serve across the healthcare system.</p>
                    `,
                    publishedAt: '2026-02-20T14:30:00Z',
                    type: 'NEWS',
                    author: { name: 'Institutional Archive' },
                    category: { name: 'Announcements' },
                    featuredImage: 'https://images.unsplash.com/photo-1519494140681-891f9302e48e?auto=format&fit=crop&q=80&w=1200'
                });
            } else {
                // Default fallback
                setPost({
                    title: 'EMSH Mental Health Update',
                    content: '<p>Emmanuel Mental Specialized Hospital is committed to delivering the highest standard of psychiatric care in Ethiopia. Stay connected for the latest updates from our clinical and research teams.</p>',
                    publishedAt: new Date().toISOString(),
                    type: 'NEWS',
                    author: { name: 'EMSH Media Desk' },
                    category: { name: 'Announcements' },
                    featuredImage: 'https://images.unsplash.com/photo-1519494140681-891f9302e48e?auto=format&fit=crop&q=80&w=1200'
                });
            }
        }).finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading article...</div>;
    if (!post) return <div className="min-h-screen flex items-center justify-center">Article not found.</div>;

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">
                {/* Article Header */}
                <div className="bg-gray-50 py-16 border-b border-gray-100">
                    <div className="container-custom max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                {post.type}
                            </span>
                            <span className="text-gray-300">|</span>
                            <span className="text-blue-900 text-xs font-bold uppercase tracking-widest">
                                {post.category?.name}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 text-[10px] font-black">
                                    {post.author?.name.charAt(0)}
                                </div>
                                <span>By {post.author?.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-gray-400" />
                                <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {post.featuredImage && (
                    <div className="container-custom max-w-5xl -mt-10 mb-16 px-4">
                        <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white aspect-[21/9]">
                            <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}

                {/* Article Body */}
                <div className="container-custom max-w-3xl pb-24">
                    <article
                        className="prose-emsh prose-lg"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <TagIcon className="w-5 h-5 text-gray-400" />
                            <div className="flex gap-2">
                                {['Mental Health', 'Community', 'Ethiopia', 'Awareness'].map(tag => (
                                    <span key={tag} className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter hover:bg-blue-100 cursor-pointer transition-colors">#{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Share this:</span>
                            <div className="flex gap-2">
                                {['f', '𝕏', 'in'].map(p => (
                                    <button key={p} className="w-8 h-8 bg-gray-50 border border-gray-100 rounded-lg text-gray-500 hover:bg-blue-900 hover:text-white transition-all text-xs font-bold">{p}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
