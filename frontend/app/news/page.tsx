'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { postsAPI, newsletterAPI } from '@/lib/api';
import Link from 'next/link';
import { CalendarIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function NewsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setIsSubmitting(true);
        setSubscribeStatus('idle');
        try {
            await newsletterAPI.subscribe(email);
            setSubscribeStatus('success');
            setEmail('');
            setTimeout(() => setSubscribeStatus('idle'), 5000);
        } catch (error) {
            setSubscribeStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        postsAPI.getAll({ type: 'NEWS', status: 'PUBLISHED' })
            .then(res => {
                setPosts(res.data?.posts || []);
            })
            .catch(() => setPosts([]))
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
                <section className="relative min-h-screen bg-blue-950 flex items-center overflow-hidden">
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
                    <div className="container-custom relative z-10 py-32 text-center">
                        <div className="max-w-4xl mx-auto">
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
                                                        src={filteredPosts[0].featuredImage || '/hospital_legacy_building.png'}
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
                                                            src={post.featuredImage || '/hospital_legacy_building.png'}
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
                                                {subscribeStatus === 'success' ? (
                                                    <div className="p-3 bg-green-50/50 text-green-700 text-[11px] font-black uppercase tracking-wider rounded-xl border border-green-200">
                                                        Successfully Subscribed
                                                    </div>
                                                ) : (
                                                    <form onSubmit={handleSubscribe} className="space-y-3">
                                                        <input
                                                            type="email"
                                                            required
                                                            placeholder="Email Address"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-900/20 focus:bg-white transition-all outline-none text-center"
                                                        />
                                                        <button
                                                            type="submit"
                                                            disabled={isSubmitting}
                                                            className="w-full py-3 bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-800 transition-colors disabled:opacity-50"
                                                        >
                                                            {isSubmitting ? 'Processing...' : 'Subscribe to Gazette'}
                                                        </button>
                                                        {subscribeStatus === 'error' && (
                                                            <p className="text-[10px] text-red-500 font-bold mt-2">Subscription failed. Try again.</p>
                                                        )}
                                                    </form>
                                                )}
                                            </div>
                                        </div>

                                        {/* Quick Links / Tags */}
                                        <div className="p-8 bg-blue-900 rounded-3xl text-white">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6">Publication Desk</h4>
                                            <div className="space-y-4">
                                                {[
                                                    { label: 'Press Releases', href: '/press-releases' },
                                                    { label: 'Media Kit', href: '/media-kit' },
                                                    { label: 'Public Archive', href: '/public-archive' }
                                                ].map(link => (
                                                    <Link key={link.label} href={link.href} className="block w-full text-left text-sm font-bold text-blue-200 hover:text-white transition-colors">
                                                        {link.label} ➔
                                                    </Link>
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
