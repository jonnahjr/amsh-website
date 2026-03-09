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
    ArrowRightIcon,
    SparklesIcon,
    ChatBubbleBottomCenterTextIcon,
    CalendarDaysIcon,
    MegaphoneIcon,
    DocumentTextIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';

const TYPE_COLORS: Record<string, string> = {
    NEWS: 'bg-orange-50 text-orange-600 border-orange-100',
    BLOG: 'bg-primary/5 text-primary border-primary/10',
    EVENT: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    ANNOUNCEMENT: 'bg-purple-50 text-purple-600 border-purple-100',
};

const TYPE_ICONS: Record<string, React.ElementType> = {
    NEWS: NewspaperIcon,
    BLOG: DocumentTextIcon,
    EVENT: CalendarDaysIcon,
    ANNOUNCEMENT: MegaphoneIcon,
};

const EMOJI_ICONS: Record<string, string> = {
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
            const res = await postsAPI.getAll({
                page,
                limit: LIMIT,
                search: search || undefined,
                type: typeFilter || undefined,
                status: statusFilter || 'ALL',
            });
            setPosts(res.data.posts || []);
            setTotal(res.data.total || res.data.pagination?.total || 0);

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

    useEffect(() => { setPage(1); }, [search, typeFilter, statusFilter]);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Purge "${title}" from the editorial directory?`)) return;
        try {
            await postsAPI.delete(id);
            fetchPosts();
        } catch {
            alert('Editorial deletion protocol failed.');
        }
    };

    const totalPages = Math.ceil(total / LIMIT);

    const stats = [
        { label: 'Global Archives', value: counts.total || total, icon: ArchiveBoxIcon, color: 'primary', filterType: 'status', filterValue: '' },
        { label: 'News Telemetry', value: counts.news, icon: NewspaperIcon, color: 'amber', filterType: 'type', filterValue: 'NEWS' },
        { label: 'Public Release', value: counts.published, icon: CheckCircleIcon, color: 'emerald', filterType: 'status', filterValue: 'PUBLISHED' },
        { label: 'Internal Drafts', value: counts.draft, icon: ClockIcon, color: 'slate', filterType: 'status', filterValue: 'DRAFT' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Command Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-20 h-20 bg-slate-50 text-primary rounded-[2rem] flex items-center justify-center shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-700">
                        <ChatBubbleBottomCenterTextIcon className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <SparklesIcon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Institutional Communication Hub</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none">Editorial Desk</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <Link href="/admin/posts/new" className="flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 active:translate-y-0">
                        <PlusIcon className="w-5 h-5" />
                        <span>Deploy New Directive</span>
                    </Link>
                </div>
            </div>

            {/* Tactical Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((s, idx) => {
                    const Icon = s.icon;
                    const isActive = s.filterType === 'status'
                        ? (statusFilter === s.filterValue)
                        : (typeFilter === s.filterValue);

                    return (
                        <button
                            key={idx}
                            onClick={() => {
                                if (s.filterType === 'status') {
                                    setStatusFilter(s.filterValue);
                                    if (s.filterValue === '') setTypeFilter('');
                                } else {
                                    setTypeFilter(s.filterValue);
                                    setStatusFilter('');
                                }
                            }}
                            className={`p-8 rounded-[2.5rem] border transition-all text-left relative overflow-hidden group flex items-center gap-6 ${isActive
                                ? 'bg-slate-900 border-slate-900 shadow-[0_25px_50px_rgba(0,0,0,0.2)] scale-[1.02]'
                                : 'bg-white border-slate-200/60 shadow-sm hover:border-primary/20'
                                }`}
                        >
                            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 ${isActive
                                ? 'bg-primary text-white'
                                : s.color === 'primary' ? 'bg-primary/5 text-primary' :
                                    s.color === 'amber' ? 'bg-amber-50 text-amber-500' :
                                        s.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' :
                                            'bg-slate-50 text-slate-400'
                                } shadow-inner`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            <div className="relative z-10">
                                <p className={`text--[10px] font-black uppercase tracking-[0.2em] mb-1 ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                                    {s.label}
                                </p>
                                <p className={`text-4xl font-jakarta font-black leading-none ${isActive ? 'text-white' : 'text-slate-900'}`}>
                                    {s.value}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-8 rounded-[3.5rem] border border-slate-200/60 shadow-sm flex flex-col xl:flex-row gap-8 items-center">
                <div className="relative flex-1 w-full group">
                    <MagnifyingGlassIcon className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Scan publications by nomenclature, authors, or tags..."
                        className="w-full pl-20 pr-8 py-5 bg-slate-50 border-0 rounded-[1.8rem] text-sm font-black text-slate-900 focus:ring-[15px] focus:ring-primary/5 transition-all outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                    <select
                        className="flex-1 xl:w-56 bg-white border border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-500 px-6 py-5 focus:ring-[12px] focus:ring-primary/5 focus:border-primary transition-all cursor-pointer shadow-sm"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="">CLASS: ALL</option>
                        <option value="NEWS">NEWS BROADCAST</option>
                        <option value="BLOG">EDITORIAL BLOG</option>
                        <option value="EVENT">SCHEDULED EVENT</option>
                        <option value="ANNOUNCEMENT">SYSTEM NOTICE</option>
                    </select>
                    <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
                        {['', 'PUBLISHED', 'DRAFT', 'ARCHIVED'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === s ? 'bg-white text-primary shadow-md' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {s === '' ? 'ALL' : s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Feed */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-[4rem] border border-slate-50 h-[500px] animate-pulse shadow-sm" />
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-40 bg-white rounded-[4rem] border border-slate-200/60 shadow-sm">
                    <div className="w-24 h-24 bg-slate-50 rounded-[3rem] flex items-center justify-center mx-auto mb-8 text-slate-200 shadow-inner">
                        <ArchiveBoxIcon className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-jakarta font-black text-slate-900 mb-2">Null Content Zone</h3>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-12">No broadcast records match your currently active telemetry scan.</p>
                    <Link href="/admin/posts/new" className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                        <PlusIcon className="w-5 h-5" /> Initiate New Publication
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post, idx) => {
                        const Icon = TYPE_ICONS[post.type] || DocumentTextIcon;
                        return (
                            <div key={post.id} className="group bg-white rounded-[4rem] border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-700 hover:-translate-y-3 flex flex-col relative animate-in slide-in-from-bottom-12" style={{ animationDelay: `${idx * 100}ms` }}>
                                <div className="relative h-72 overflow-hidden bg-slate-950">
                                    {post.featuredImage ? (
                                        <img
                                            src={post.featuredImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
                                            crossOrigin="anonymous"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-9xl opacity-10 group-hover:scale-125 transition-transform duration-1000">
                                            {EMOJI_ICONS[post.type] || '📝'}
                                        </div>
                                    )}

                                    <div className="absolute top-8 left-8 flex flex-col gap-3 z-10">
                                        <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest backdrop-blur-xl border flex items-center gap-2 shadow-2xl ${TYPE_COLORS[post.type] || 'bg-white/90 text-slate-900 border-white/20'}`}>
                                            <Icon className="w-4 h-4" /> {post.type}
                                        </span>
                                        {post.isFeatured && (
                                            <span className="px-4 py-2 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest backdrop-blur-xl shadow-2xl border border-white/20 flex items-center gap-2">
                                                <SparklesIcon className="w-4 h-4" /> Priority Signal
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute top-8 right-8 z-10">
                                        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-xl shadow-2xl border border-white/20 text-[9px] font-black uppercase ${post.status === 'PUBLISHED' ? 'bg-emerald-500/90 text-white' :
                                            post.status === 'DRAFT' ? 'bg-amber-500/90 text-white' :
                                                'bg-slate-900/90 text-white'
                                            }`}>
                                            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                            {post.status}
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                                </div>

                                <div className="p-10 flex flex-col flex-1 bg-white">
                                    <h3 className="font-jakarta font-black text-slate-900 text-2xl leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="text-sm text-slate-500 line-clamp-3 mb-10 leading-relaxed font-medium italic">{post.excerpt}</p>
                                    )}

                                    <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-[1rem] bg-slate-50 border border-slate-100 text-primary flex items-center justify-center text-sm font-black group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                                {post.author?.name?.charAt(0) || 'A'}
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{post.author?.name || 'EMSH ADMIN'}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/news/${post.slug}`}
                                                target="_blank"
                                                className="p-4 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all border border-transparent hover:border-primary/10"
                                                title="Visual Audit"
                                            >
                                                <EyeIcon className="w-6 h-6 stroke-[1.5]" />
                                            </Link>
                                            <Link
                                                href={`/admin/posts/edit/${post.id}`}
                                                className="p-4 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all border border-transparent hover:border-primary/10"
                                                title="Modification Suite"
                                            >
                                                <PencilIcon className="w-6 h-6 stroke-[1.5]" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id, post.title)}
                                                className="p-4 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                                                title="Purge Record"
                                            >
                                                <TrashIcon className="w-6 h-6 stroke-[1.5]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Matrix Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white px-12 py-8 rounded-[3rem] border border-slate-200/60 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        DATA SEGMENT <span className="text-primary">{page}</span> OF <span className="text-slate-900">{totalPages}</span> <span className="mx-4 text-slate-100">|</span> <span className="text-slate-900">{total}</span> NODES INDEXED
                    </p>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-inner active:scale-95"
                        >
                            <ChevronLeftIcon className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-2">
                            {[...Array(totalPages)].map((_, i) => {
                                const p = i + 1;
                                if (totalPages > 5 && Math.abs(p - page) > 2) return null;
                                return (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`w-12 h-12 rounded-2xl text-[11px] font-black transition-all ${page === p
                                            ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-110'
                                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 disabled:opacity-20 hover:bg-primary hover:text-white transition-all shadow-inner active:scale-95"
                        >
                            <ChevronRightIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
