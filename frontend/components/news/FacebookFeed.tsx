'use client';

import { useState, useEffect } from 'react';
import { facebookAPI } from '@/lib/api';
import { ShareIcon, HandThumbUpIcon, ChatBubbleLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface FacebookPost {
    id: string;
    message?: string;
    created_time: string;
    full_picture?: string;
    permalink_url: string;
    internalSlug?: string | null;
    attachments?: {
        data: Array<{
            type: string;
            media?: { image: { src: string } };
            url?: string;
            description?: string;
        }>;
    };
}

export default function FacebookFeed() {
    const [posts, setPosts] = useState<FacebookPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [nextCursor, setNextCursor] = useState<string | null>(null);

    const fetchPosts = async (after = '') => {
        try {
            const res = await facebookAPI.getPosts({ limit: 6, after });
            const newPosts = res.data.data || [];
            if (after) {
                setPosts(prev => [...prev, ...newPosts]);
            } else {
                setPosts(newPosts);
            }
            setNextCursor(res.data.paging?.cursors?.after || null);
            setError(false);
        } catch (err) {
            console.error('FB Feed Error:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading && posts.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 animate-pulse">
                        <div className="aspect-video bg-gray-100 rounded-3xl mb-6" />
                        <div className="h-4 bg-gray-100 rounded-full w-3/4 mb-4" />
                        <div className="h-3 bg-gray-100 rounded-full w-full mb-2" />
                        <div className="h-3 bg-gray-100 rounded-full w-2/3" />
                    </div>
                ))}
            </div>
        );
    }

    if (error && posts.length === 0) return null;

    return (
        <section className="py-12">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-3 block">From Social Media</span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase flex items-center gap-3">
                        <svg className="w-8 h-8 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Latest on Facebook
                    </h2>
                </div>
                <a
                    href="https://web.facebook.com/p/Amanuel-mental-specialized-hospital-100064026784319/?_rdc=1&_rdr#"
                    target="_blank"
                    className="hidden sm:flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
                >
                    Visit Page <ArrowRightIcon className="w-4 h-4" />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                    const date = new Date(post.created_time).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });

                    const imageUrl = post.full_picture || post.attachments?.data?.[0]?.media?.image?.src;
                    const text = post.message || '';
                    const title = text.split('\n')[0].slice(0, 60) + (text.split('\n')[0].length > 60 ? '...' : '');
                    const description = text.split('\n').slice(1).join(' ').slice(0, 120) + (text.length > 120 ? '...' : '');

                    return (
                        <article
                            key={post.id}
                            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
                        >
                            <LinkOverlay href={post.internalSlug ? `/news/${post.internalSlug}` : post.permalink_url} isExternal={!post.internalSlug}>
                                {imageUrl ? (
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt="Post image"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                            crossOrigin="anonymous"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center p-8">
                                        <svg className="w-12 h-12 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </div>
                                )}
                            </LinkOverlay>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{date}</span>
                                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                    <span className="text-[10px] font-black text-[#1877F2] uppercase tracking-widest flex items-center gap-1">
                                        Facebook
                                    </span>
                                </div>

                                <h3 className="text-xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-900 transition-colors tracking-tight">
                                    {title || 'Facebook Post'}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                                    {description || 'See the full post on our Facebook page...'}
                                </p>

                                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <a
                                        href={post.internalSlug ? `/news/${post.internalSlug}` : post.permalink_url}
                                        target={post.internalSlug ? '_self' : '_blank'}
                                        className="px-6 py-2.5 bg-gray-50 rounded-xl text-[10px] font-black text-gray-900 uppercase tracking-widest hover:bg-[#1877F2] hover:text-white transition-all shadow-sm"
                                    >
                                        {post.internalSlug ? 'Read Full Report' : 'Read on Facebook'}
                                    </a>
                                    <div className="flex items-center gap-4 text-gray-400">
                                        <HandThumbUpIcon className="w-4 h-4" />
                                        <ChatBubbleLeftIcon className="w-4 h-4" />
                                        <ShareIcon className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {nextCursor && (
                <div className="mt-16 text-center">
                    <button
                        onClick={() => fetchPosts(nextCursor)}
                        disabled={loading}
                        className="px-12 py-4 bg-white border-2 border-gray-100 rounded-2xl text-xs font-black text-gray-900 uppercase tracking-widest hover:border-blue-900 hover:text-blue-900 transition-all shadow-xl shadow-black/5 flex items-center gap-3 mx-auto"
                    >
                        {loading && <span className="w-3 h-3 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />}
                        Load More Reports
                    </button>
                </div>
            )}
        </section>
    );
}

function LinkOverlay({ href, children, isExternal }: { href: string; children: React.ReactNode, isExternal?: boolean }) {
    if (isExternal) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden">
                {children}
            </a>
        );
    }
    return (
        <a href={href} className="block relative overflow-hidden">
            {children}
        </a>
    );
}
