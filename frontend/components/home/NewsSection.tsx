'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { postsAPI } from '@/lib/api';

export default function NewsSection() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Try fetching featured posts first
        postsAPI.getAll({ limit: 3, status: 'PUBLISHED', isFeatured: 'true' })
            .then(res => {
                if (res.data?.posts?.length > 0) {
                    setPosts(res.data.posts);
                } else {
                    // Fallback to latest posts if no featured items marked
                    return postsAPI.getAll({ limit: 3, status: 'PUBLISHED' })
                        .then(resFallback => setPosts(resFallback.data?.posts || []));
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    // Sort by newest first; take top 3
    const displayPosts = [...posts].sort(
        (a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
    ).slice(0, 3);
    const typeColors: Record<string, string> = {
        NEWS: 'bg-blue-100 text-blue-800',
        EVENT: 'bg-yellow-100 text-yellow-800',
        ANNOUNCEMENT: 'bg-green-100 text-green-800',
        BLOG: 'bg-purple-100 text-purple-800',
    };

    return (
        <section className="section bg-gray-50">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
                    <div>
                        <span className="section-badge">📰 News & Updates</span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
                            Latest News & Announcements
                        </h2>
                    </div>
                    <Link href="/news" className="btn-primary whitespace-nowrap">
                        View All News →
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="card p-0 overflow-hidden">
                                <div className="skeleton h-48 rounded-none" />
                                <div className="p-6 space-y-3">
                                    <div className="skeleton h-5 rounded w-3/4" />
                                    <div className="skeleton h-4 rounded w-full" />
                                    <div className="skeleton h-4 rounded w-5/6" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayPosts.map((post, i) => (
                            <Link key={post.id} href={`/news/${post.slug}`} className="card p-0 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                {/* Picture Holder */}
                                <div className="h-52 relative overflow-hidden bg-gray-200">
                                    {post.featuredImage ? (
                                        <img
                                            src={post.featuredImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            crossOrigin="anonymous"
                                        />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center text-white ${i === 0 ? 'bg-gradient-to-br from-blue-700 to-blue-900' :
                                            i === 1 ? 'bg-gradient-to-br from-emerald-700 to-teal-900' :
                                                'bg-gradient-to-br from-purple-700 to-purple-900'
                                            }`}>
                                            <div className="text-6xl opacity-30">
                                                {post.type === 'NEWS' ? '📰' : post.type === 'EVENT' ? '📅' : '📢'}
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>

                                {/* Content Area */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-md ${typeColors[post.type] || typeColors['BLOG']}`}>
                                            {post.type === 'NEWS' ? '📰' : post.type === 'EVENT' ? '📅' : '📢'} {post.type}
                                        </span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <h3 className="font-black text-gray-900 text-lg leading-tight mb-3 group-hover:text-blue-900 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                                        {post.excerpt}
                                    </p>

                                    <div className="text-blue-950 text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Read More
                                        <span className="text-lg">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
