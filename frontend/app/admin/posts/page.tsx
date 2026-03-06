'use client';

import { useState, useEffect, useCallback } from 'react';
import { postsAPI } from '@/lib/api';
import Link from 'next/link';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    EyeIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    NewspaperIcon,
    CheckCircleIcon,
    ClockIcon,
    ArchiveBoxIcon,
} from '@heroicons/react/24/outline';

const TYPE_COLORS: Record<string, string> = {
    NEWS: 'bg-orange-100 text-orange-600',
    BLOG: 'bg-blue-100 text-blue-600',
    EVENT: 'bg-green-100 text-green-600',
    ANNOUNCEMENT: 'bg-purple-100 text-purple-600',
};
const TYPE_ICONS: Record<string, string> = {
    NEWS: '📰',
    BLOG: '✍️',
    EVENT: '📅',
    ANNOUNCEMENT: '📢',
};

export default function AdminPostsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [counts, setCounts] = useState({ published: 0, draft: 0, archived: 0, total: 0, news: 0 });
    const LIMIT = 12;

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            // Pass 'ALL' when no specific status filter so admin sees drafts + archived + published
            const res = await postsAPI.getAll({
                page,
                limit: LIMIT,
                search: search || undefined,
                type: typeFilter || undefined,
                status: statusFilter || 'ALL',
            });
            setPosts(res.data.posts || []);
            setTotal(res.data.total || res.data.pagination?.total || 0);

            // Fetch counts for stats bar (only on first load or when filters change)
            if (!search && !typeFilter && !statusFilter) {
                const [pub, draft, arch, all, news] = await Promise.all([
                    postsAPI.getAll({ limit: 1, status: 'PUBLISHED' }),
                    postsAPI.getAll({ limit: 1, status: 'DRAFT' }),
                    postsAPI.getAll({ limit: 1, status: 'ARCHIVED' }),
                    postsAPI.getAll({ limit: 1, status: 'ALL' }),
                    postsAPI.getAll({ limit: 1, type: 'NEWS' }),
                ]);
                setCounts({
                    published: pub.data.total || pub.data.pagination?.total || 0,
                    draft: draft.data.total || draft.data.pagination?.total || 0,
                    archived: arch.data.total || arch.data.pagination?.total || 0,
                    total: all.data.total || all.data.pagination?.total || 0,
                    news: news.data.total || news.data.pagination?.total || 0,
                });
            }
        } catch {
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, [page, search, typeFilter, statusFilter]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Reset page on filter change
    useEffect(() => { setPage(1); }, [search, typeFilter, statusFilter]);

    const handleDelete = async (id: string, title: string) => {
        if (confirm(`Delete "${title}"? This cannot be undone.`)) {
            try {
                await postsAPI.delete(id);
                fetchPosts();
            } catch {
                alert('Failed to delete post');
            }
        }
    };

    const totalPages = Math.ceil(total / LIMIT);

    const stats = [
        { label: 'Total Posts', value: counts.total || total, icon: NewspaperIcon, color: 'text-blue-600 bg-blue-50', filterType: 'status', filterValue: '' },
        { label: 'News Articles', value: counts.news, icon: NewspaperIcon, color: 'text-orange-600 bg-orange-50', filterType: 'type', filterValue: 'NEWS' },
        { label: 'Published', value: counts.published, icon: CheckCircleIcon, color: 'text-green-600 bg-green-50', filterType: 'status', filterValue: 'PUBLISHED' },
        { label: 'Drafts', value: counts.draft, icon: ClockIcon, color: 'text-amber-600 bg-amber-50', filterType: 'status', filterValue: 'DRAFT' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Posts & News</h2>
                    <p className="text-gray-500 text-sm">Manage all articles, announcements, and news updates.</p>
                </div>
                <Link href="/admin/posts/new" className="btn-primary">
                    <PlusIcon className="w-5 h-5" />
                    <span>Create New Post</span>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map(s => {
                    const Icon = s.icon;
                    const isActive = s.filterType === 'status'
                        ? (statusFilter === s.filterValue)
                        : (typeFilter === s.filterValue);

                    return (
                        <button
                            key={s.label}
                            onClick={() => {
                                if (s.filterType === 'status') {
                                    setStatusFilter(s.filterValue);
                                    if (s.filterValue === '') setTypeFilter(''); // Reset type filter if showing all
                                } else {
                                    setTypeFilter(s.filterValue);
                                    setStatusFilter(''); // Reset status filter if showing specific type
                                }
                            }}
                            className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group ${isActive
                                ? 'bg-blue-900 border-blue-900 shadow-lg shadow-blue-900/20'
                                : 'bg-white border-gray-100 shadow-sm hover:border-blue-900/30'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-white/20 text-white' : s.color
                                }`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className={`text-2xl font-black transition-colors ${isActive ? 'text-white' : 'text-gray-900'}`}>
                                    {s.value}
                                </p>
                                <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-white/60' : 'text-gray-400'
                                    }`}>
                                    {s.label}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by title, author..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-900 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select
                        className="flex-1 md:w-40 bg-gray-50 border-0 rounded-xl text-sm font-bold text-gray-600 px-4 py-2.5 focus:ring-2 focus:ring-blue-900"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="NEWS">📰 News</option>
                        <option value="BLOG">✍️ Blog</option>
                        <option value="EVENT">📅 Events</option>
                        <option value="ANNOUNCEMENT">📢 Announcements</option>
                    </select>
                    <select
                        className="flex-1 md:w-40 bg-gray-50 border-0 rounded-xl text-sm font-bold text-gray-600 px-4 py-2.5 focus:ring-2 focus:ring-blue-900"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="PUBLISHED">✅ Published</option>
                        <option value="DRAFT">✏️ Draft</option>
                        <option value="ARCHIVED">📦 Archived</option>
                    </select>
                    {(search || typeFilter || statusFilter) && (
                        <button
                            onClick={() => { setSearch(''); setTypeFilter(''); setStatusFilter(''); }}
                            className="px-3 py-2.5 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors whitespace-nowrap"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Post Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden animate-pulse">
                            <div className="h-44 bg-gray-100" />
                            <div className="p-5 space-y-3">
                                <div className="h-4 bg-gray-100 rounded w-3/4" />
                                <div className="h-3 bg-gray-100 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-3xl border border-gray-100">
                    <div className="text-6xl mb-4">📭</div>
                    <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No posts found</p>
                    <Link href="/admin/posts/new" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-900 text-white rounded-xl text-sm font-bold hover:bg-blue-800 transition-colors">
                        <PlusIcon className="w-4 h-4" /> Create your first post
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                            {/* Thumbnail */}
                            <div className="relative h-44 bg-gradient-to-br from-blue-900 to-blue-700 overflow-hidden flex-shrink-0">
                                {post.featuredImage ? (
                                    <img
                                        src={post.featuredImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        crossOrigin="anonymous"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
                                        {TYPE_ICONS[post.type] || '📝'}
                                    </div>
                                )}
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                {/* Type badge */}
                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${TYPE_COLORS[post.type] || 'bg-gray-100 text-gray-600'} backdrop-blur-sm self-start`}>
                                        {TYPE_ICONS[post.type]} {post.type}
                                    </span>
                                    {post.isFeatured && (
                                        <span className="px-2 py-1 bg-cyan-400 text-white rounded-lg text-[8px] font-black uppercase tracking-widest backdrop-blur-sm self-start shadow-lg">
                                            ✦ Featured
                                        </span>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="absolute top-3 right-3">
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg backdrop-blur-sm text-[9px] font-black uppercase ${post.status === 'PUBLISHED' ? 'bg-green-500/90 text-white' :
                                        post.status === 'DRAFT' ? 'bg-amber-500/90 text-white' :
                                            'bg-gray-500/90 text-white'
                                        }`}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                        {post.status}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="font-black text-gray-900 text-sm leading-tight line-clamp-2 mb-2 group-hover:text-blue-900 transition-colors">
                                    {post.title}
                                </h3>
                                {post.excerpt && (
                                    <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">{post.excerpt}</p>
                                )}

                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-black">
                                            {post.author?.name?.charAt(0) || 'A'}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-700 leading-none">{post.author?.name || 'Admin'}</p>
                                            <p className="text-[9px] text-gray-300">{new Date(post.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Link
                                            href={`/news/${post.slug}`}
                                            target="_blank"
                                            className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            title="View on site"
                                        >
                                            <EyeIcon className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/posts/edit/${post.id}`}
                                            className="p-2 text-gray-300 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all"
                                            title="Edit post"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id, post.title)}
                                            className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                            title="Delete post"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Page {page} of {totalPages} · {total} total posts
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 bg-gray-50 border border-gray-100 rounded-lg text-gray-500 disabled:opacity-30 hover:bg-gray-100 transition-colors"
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                        </button>
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            const p = i + 1;
                            return (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-8 h-8 rounded-lg text-xs font-black transition-colors ${page === p ? 'bg-blue-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {p}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-2 bg-gray-50 border border-gray-100 rounded-lg text-gray-500 disabled:opacity-30 hover:bg-gray-100 transition-colors"
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
