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
            // Mock for demo
            setPost({
                title: 'EMSH Launching New Mental Health Awareness Campaign',
                content: '<p>Emmanuel Mental Specialized Hospital is proud to announce its latest initiative aimed at raising mental health awareness across Ethiopia. This campaign, titled "Mind Our Future", will focus on youth mental health and destigmatizing psychiatric treatment.</p><p>Over the next six months, EMSH teams will visit schools, universities, and community centers to provide education and resources.</p><h3>Key Objectives:</h3><ul><li>Increase mental health literacy</li><li>Reduce stigma associated with seeking care</li><li>Provide early intervention resources for youth</li></ul>',
                publishedAt: new Date().toISOString(),
                type: 'NEWS',
                author: { name: 'Dr. Zelalem G.' },
                category: { name: 'Community Outreach' },
                featuredImage: 'https://images.unsplash.com/photo-1576091160550-2173bdb999ef?w=1200'
            });
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
