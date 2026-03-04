'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { postsAPI } from '@/lib/api';

export default function NewsSection() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postsAPI.getAll({ limit: 3, status: 'PUBLISHED' })
            .then(res => setPosts(res.data.posts || []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    // The 3 newest articles — always updated here
    const mockPosts = [
        {
            id: 'fb-1', slug: 'hospital-board-strategic-visit-2018',
            title: 'Board of Directors Conducts Comprehensive Supervision Visit',
            excerpt: 'On February 17, 2018 E.C., the Board of Directors conducted a strategic review of service delivery, patient care standards, and digital health implementation across all wards.',
            type: 'NEWS', publishedAt: '2026-02-24T10:00:00Z',
            category: { name: 'Institutional', color: '#1B4F8A' },
            isBreaking: true,
        },
        {
            id: 'fb-2', slug: 'neuropsychiatry-research-unit-launch',
            title: 'New Neuropsychiatry Research Unit Opens — A First in Ethiopia',
            excerpt: 'EMSH inaugurates a state-of-the-art Neuropsychiatry Research Unit with EEG facilities and a clinical trials center, advancing brain science across Africa.',
            type: 'NEWS', publishedAt: '2026-01-15T11:00:00Z',
            category: { name: 'Research', color: '#2E8B57' },
            isBreaking: true,
        },
        {
            id: 'fb-3', slug: 'community-health-worker-training-program',
            title: 'EMSH Trains 134 Community Health Workers in Mental Health Crisis Response',
            excerpt: 'A three-day intensive training program equipped community health workers from 10 Addis Ababa sub-cities with crisis detection, referral, and anti-stigma skills.',
            type: 'ANNOUNCEMENT', publishedAt: '2026-02-12T07:30:00Z',
            category: { name: 'Training', color: '#B8860B' },
        },
    ];

    // Merge real API posts with our latest mock posts; sort by newest first; take top 3
    const allPosts = [...posts, ...mockPosts].sort(
        (a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
    );
    const displayPosts = allPosts.slice(0, 3);
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
                            <Link key={post.id} href={`/news/${post.slug}`} className="card group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                                {/* Image Area */}
                                <div className={`h-48 flex items-center justify-center text-white relative overflow-hidden ${i === 0 ? 'bg-gradient-to-br from-blue-700 to-blue-900' :
                                    i === 1 ? 'bg-gradient-to-br from-emerald-700 to-teal-900' :
                                        'bg-gradient-to-br from-purple-700 to-purple-900'
                                    }`}>
                                    <div className="text-6xl opacity-30">
                                        {post.type === 'NEWS' ? '📰' : post.type === 'EVENT' ? '📅' : '📢'}
                                    </div>
                                    <div className="absolute inset-0 flex items-end p-4">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeColors[post.type] || typeColors['BLOG']}`}>
                                            {post.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-xs text-gray-400 mb-3">
                                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </p>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 group-hover:text-blue-900 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-4 text-blue-900 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read More →
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
