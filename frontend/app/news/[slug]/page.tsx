'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { postsAPI } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { CalendarIcon, UserIcon, TagIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function NewsDetailPage() {
    const { slug } = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const slugKey = typeof slug === 'string' ? slug : Array.isArray(slug) ? slug[0] : '';
        if (!slugKey) return;

        setLoading(true);

        const mockPosts: Record<string, any> = {
            'hospital-board-strategic-visit-2018': {
                title: 'Strategic Institutional Update: Board of Directors Conducts Supervision Visit',
                content: `<p>The Board of Directors of Emmanuel Mental Specialized Hospital (EMSH) recently concluded a high-level strategic supervision visit aimed at assessing the hospital's performance and service quality. The visit, which took place on February 17, 2018 E.C., included a detailed review of clinical operations, patient care standards, and the implementation of modern healthcare technologies.</p><p>During the session, board members toured several specialized departments, including the acute care psychiatric unit and the rehabilitation center. They engaged with department heads to discuss challenges and opportunities for further enhancing mental health service delivery in Ethiopia.</p><p>The board expressed satisfaction with the hospital's progress in digital health transformation and emphasized the importance of maintaining EMSH's position as a regional center of excellence.</p><h3>Key Supervision Areas:</h3><ul><li><strong>Inpatient Bed Capacity:</strong> Reviewed the expansion of the new acute care ward.</li><li><strong>Research Integration:</strong> Evaluated the progress of the neuropsychiatry research department.</li><li><strong>Community Outreach:</strong> Assessed the performance of regional mental health support programs.</li></ul>`,
                publishedAt: '2026-02-24T10:00:00Z',
                type: 'NEWS',
                author: { name: 'Hospital PR Desk' },
                category: { name: 'Institutional' },
                featuredImage: 'https://images.unsplash.com/photo-1504813184591-01592f2bb0cd?auto=format&fit=crop&q=80&w=1200'
            },
            'understanding-social-media-addiction-impact': {
                title: 'Addressing the Digital Age: Understanding Social Media Addiction in Modern Ethiopia',
                content: `<p>Social media addiction is an increasing concern affecting millions, particularly young adults and adolescents. At Emmanuel Mental Specialized Hospital, we are seeing a growing number of cases related to behavioral addictions linked to digital consumption.</p><p>This "Dopamine-driven" addiction occurs when the brain repeatedly seeks the instant gratification provided by social media interactions such as likes, comments, and shares.</p><h3>Psychological Symptoms:</h3><ul><li>Excessive preoccupation with online platforms.</li><li>Anxiety, restlessness, or irritability when access is restricted.</li><li>Decline in academic or professional performance due to screen time.</li><li>Sleep disturbances caused by late-night scrolling.</li></ul><h3>Key Strategies for Recovery:</h3><ul><li><strong>Set Time Limits:</strong> Dedicate specific windows for social media use.</li><li><strong>Notification Management:</strong> Disable non-essential alerts to reduce compulsive checking.</li><li><strong>Digital-Free Zones:</strong> Designate meal times and bedroom hours as "phone-free."</li></ul><p>Our outpatient clinic is available for those seeking professional guidance on managing behavioral addictions.</p>`,
                publishedAt: '2026-02-23T09:00:00Z',
                type: 'NEWS',
                author: { name: 'Clinical Psychology Dept' },
                category: { name: 'Clinical' },
                featuredImage: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1200'
            }
        };

        postsAPI.getBySlug(slugKey)
            .then(res => {
                if (res.data.post) {
                    setPost(res.data.post);
                } else if (mockPosts[slugKey]) {
                    setPost(mockPosts[slugKey]);
                }
            })
            .catch(() => {
                if (mockPosts[slugKey]) {
                    setPost(mockPosts[slugKey]);
                }
            })
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                <div className="text-center max-w-md">
                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Article Not Found</h2>
                    <p className="text-gray-500 mb-8 font-medium">The news story you're looking for might have been moved or removed.</p>
                    <a href="/news" className="px-8 py-4 bg-blue-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20">
                        Back to News
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <EmergencyBanner />
            <Navbar />
            <main className="flex-grow bg-white">
                <div className="bg-gray-50 py-16 border-b border-gray-100">
                    <div className="container-custom max-w-4xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                {post.category?.name || 'News'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-blue-900" />
                                <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-blue-900" />
                                <span>{post.author?.name || 'Emmanuel Hospital'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TagIcon className="w-4 h-4 text-blue-900" />
                                <span>{post.type}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-custom max-w-4xl py-16">
                    {post.featuredImage && (
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl mb-16 group">
                            <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                crossOrigin="anonymous"
                            />
                        </div>
                    )}

                    <div
                        className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tighter prose-headings:uppercase prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900 prose-img:rounded-3xl shadow-none mb-16"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Gallery Section */}
                    {(() => {
                        let galleryImages: string[] = [];
                        if (post.gallery) {
                            try {
                                const parsed = JSON.parse(post.gallery);
                                if (Array.isArray(parsed)) galleryImages = parsed;
                            } catch {
                                // If it's not JSON, check if it's semicolon separated (common pattern in this project)
                                if (typeof post.gallery === 'string' && post.gallery.includes(';')) {
                                    galleryImages = post.gallery.split(';').filter(Boolean);
                                }
                            }
                        }

                        if (galleryImages.length === 0) return null;

                        return (
                            <div className="pt-16 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center">
                                            <PhotoIcon className="w-5 h-5" />
                                        </div>
                                        Article Gallery
                                    </h2>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                        {galleryImages.length} {galleryImages.length === 1 ? 'Photo' : 'Photos'}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {galleryImages.map((img, i) => (
                                        <div key={i} className={`relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 bg-gray-50 ${i === 0 && galleryImages.length % 2 !== 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}`}>
                                            <img
                                                src={img}
                                                alt={`Gallery image ${i + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                crossOrigin="anonymous"
                                            />
                                            <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors pointer-events-none" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </main>
            <Footer />
            <ChatbotButton />
        </div>
    );
}
