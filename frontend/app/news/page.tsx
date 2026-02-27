'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { postsAPI } from '@/lib/api';
import Link from 'next/link';
import { CalendarIcon, UserIcon, ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function NewsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        postsAPI.getAll({ type: 'NEWS', status: 'PUBLISHED' })
            .then(res => setPosts(res.data.posts))
            .catch(() => {
                // Fallback mock data
                setPosts([
                    {
                        id: '1',
                        title: 'AMSH Celebrates 90+ Years of Mental Health Service',
                        slug: 'amsh-celebrates-90-years',
                        excerpt: 'Amanuel Mental Specialized Hospital marks over nine decades of dedicated service to Ethiopian mental health patients.',
                        featuredImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
                        author: { name: 'Admin' },
                        publishedAt: new Date().toISOString(),
                        category: { name: 'News', color: '#1B4F8A' }
                    },
                    {
                        id: '2',
                        title: 'New Mental Health Awareness Campaign Launched',
                        slug: 'mental-health-awareness-2024',
                        excerpt: 'We are launching a nationwide campaign to reduce stigma and promote mental wellness in our community.',
                        featuredImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
                        author: { name: 'Public Relations' },
                        publishedAt: new Date().toISOString(),
                        category: { name: 'Awareness', color: '#00B4D8' }
                    }
                ]);
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(search.toLowerCase())
    );

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

                {/* Search & Filter */}
                <div className="container-custom -mt-8">
                    <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 items-center border border-blue-50">
                        <div className="relative flex-1 w-full">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-900 transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <span className="px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-sm font-bold border border-blue-100 uppercase tracking-wider whitespace-nowrap">
                                {filteredPosts.length} Articles
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <section className="section">
                    <div className="container-custom">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white rounded-[32px] overflow-hidden shadow-sm animate-pulse h-[450px]">
                                        <div className="h-64 bg-gray-200" />
                                        <div className="p-8 space-y-4">
                                            <div className="h-4 bg-gray-200 w-1/4 rounded" />
                                            <div className="h-8 bg-gray-200 w-3/4 rounded" />
                                            <div className="h-20 bg-gray-200 w-full rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-[40px] shadow-sm border border-gray-100">
                                <div className="text-6xl mb-6">🗞️</div>
                                <h2 className="text-2xl font-bold text-gray-900">No articles found</h2>
                                <p className="text-gray-500 mt-2">Try adjusting your search criteria or check back later.</p>
                                <button onClick={() => setSearch('')} className="mt-6 text-blue-900 font-bold hover:underline">Clear all filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/news/${post.slug}`}
                                        className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col"
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={post.featuredImage || 'https://images.unsplash.com/photo-1519494140681-891f9302e48e?auto=format&fit=crop&q=80&w=1200'}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg" style={{ backgroundColor: post.category?.color || '#1B4F8A' }}>
                                                    {post.category?.name || 'General'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col">
                                            <div className="flex items-center gap-4 text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                                                <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1.5"><UserIcon className="w-4 h-4" /> {post.author.name}</span>
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-900 transition-colors mb-4 line-clamp-2 leading-tight">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-auto flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                                                Read Story <ArrowRightIcon className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main >

            <Footer />
        </>
    );
}
