'use client';

import { useState, useEffect } from 'react';
import { pagesAPI } from '@/lib/api';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    GlobeAltIcon,
    MagnifyingGlassIcon,
    ArrowTopRightOnSquareIcon,
    DocumentTextIcon,
    SparklesIcon,
    ClockIcon,
    BoltIcon,
    EyeIcon,
    RocketLaunchIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AdminPages() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        setLoading(true);
        setError(null);
        try {
            // Updated backend supports status='ALL' to return both PUBLISHED and DRAFTS
            const res = await pagesAPI.getAll({ status: 'ALL' });
            // Ensure pages is an array, handle different API response shapes
            const pagesList = res.data.pages || (Array.isArray(res.data) ? res.data : []);
            setPages(pagesList);
        } catch (error: any) {
            console.error('Failed to fetch pages from repository', error);
            setError('The content repository is currently unreachable or syncing. Please verify backend status.');
            setPages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Initiate permanent deletion of this content node?')) return;
        try {
            await pagesAPI.delete(id);
            setPages(pages.filter(p => p.id !== id));
        } catch (error) {
            alert('Termination failed. Node is locked or unreachable.');
        }
    };

    const filteredPages = pages.filter(page =>
        (page.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (page.slug || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Pages Command Center */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <DocumentTextIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.35em]">Institutional Content Matrix</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none mb-6">Pages & Builder</h2>
                    <p className="text-slate-500 font-medium max-w-2xl leading-relaxed text-lg">Architecting static institutional content, custom landing modules, and global informational nodes from the core database.</p>
                </div>

                <Link
                    href="/admin/pages/new"
                    className="w-full lg:w-auto flex items-center justify-center gap-4 px-12 py-6 bg-primary text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-[0_20px_40px_rgba(27,79,138,0.25)] hover:-translate-y-1 active:translate-y-0 relative z-10"
                >
                    <PlusIcon className="w-5 h-5 stroke-[2.5]" />
                    <span>Deploy New Node</span>
                </Link>
            </div>

            {/* Tactical Metrics & Search */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-[3rem] border border-slate-200/60 shadow-sm flex items-center gap-6 group hover:border-primary/20 transition-all">
                    <div className="w-16 h-16 bg-primary/5 text-primary rounded-[1.5rem] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                        <RocketLaunchIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Live Payloads</p>
                        <p className="text-3xl font-jakarta font-black text-slate-900 leading-none">{pages.length}</p>
                    </div>
                </div>

                <div className="lg:col-span-3 h-full">
                    <div className="relative h-full group">
                        <MagnifyingGlassIcon className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors duration-300" />
                        <input
                            type="text"
                            placeholder="Scan repository by title, URL signature, or node metadata..."
                            className="w-full h-full pl-20 pr-10 py-8 bg-white border border-slate-200/60 rounded-[3rem] shadow-sm focus:ring-[15px] focus:ring-primary/5 focus:border-primary/20 transition-all font-medium text-slate-700 outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <button onClick={fetchPages} className="p-3 text-slate-300 hover:text-primary transition-colors">
                                <SparklesIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Matrix Display */}
            {error ? (
                <div className="bg-red-50 p-12 rounded-[4rem] border border-red-100/50 flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-red-100 rounded-[2rem] flex items-center justify-center text-red-600">
                        <ExclamationCircleIcon className="w-10 h-10" />
                    </div>
                    <div className="max-w-md">
                        <h3 className="text-xl font-jakarta font-black text-red-900 mb-2 underline decoration-red-200">System Protocol Failure</h3>
                        <p className="text-red-700/60 font-medium text-sm leading-relaxed">{error}</p>
                    </div>
                    <button onClick={fetchPages} className="px-8 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all">Reconnect Sync</button>
                </div>
            ) : (
                <div className="bg-white rounded-[4rem] border border-slate-200/60 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Content Node Entity</th>
                                    <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Global URL Slug</th>
                                    <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Status</th>
                                    <th className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Operations Hub</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    [...Array(4)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-12 py-10"><div className="h-14 bg-slate-50 w-64 rounded-[1.5rem]" /></td>
                                            <td className="px-12 py-10"><div className="h-10 bg-slate-50 w-32 rounded-xl" /></td>
                                            <td className="px-12 py-10"><div className="h-8 bg-slate-50 w-24 rounded-full" /></td>
                                            <td className="px-12 py-10"><div className="h-12 bg-slate-50 w-32 rounded-xl ml-auto" /></td>
                                        </tr>
                                    ))
                                ) : filteredPages.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-12 py-40 text-center">
                                            <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-slate-100 shadow-inner">
                                                <DocumentTextIcon className="w-12 h-12" />
                                            </div>
                                            <h3 className="text-3xl font-jakarta font-black text-slate-900 mb-2">Null Content Detected</h3>
                                            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">The institutional node repository is currently empty.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPages.map((page) => (
                                        <tr key={page.id} className="hover:bg-slate-50/20 transition-all duration-500 group relative">
                                            <td className="px-12 py-10">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:scale-110 group-hover:shadow-xl group-hover:border-primary/20 transition-all duration-500 shadow-sm">
                                                        <GlobeAltIcon className="w-7 h-7" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="font-jakarta font-black text-slate-900 text-lg leading-none mb-3 truncate group-hover:translate-x-1 transition-transform tracking-tight">{page.title}</div>
                                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                                                            <ClockIcon className="w-4 h-4" /> Node Synced: {new Date(page.updatedAt || page.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-12 py-10">
                                                <div className="inline-flex items-center gap-3 bg-slate-50 text-primary px-5 py-3 rounded-2xl text-[11px] font-black tracking-widest border border-slate-100 group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20">
                                                    <BoltIcon className="w-4 h-4 opacity-40 group-hover:rotate-12 transition-transform" /> /{page.slug}
                                                </div>
                                            </td>
                                            <td className="px-12 py-10">
                                                <div className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-sm border ${page.status === 'PUBLISHED'
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    : 'bg-amber-50 text-amber-600 border-amber-100'
                                                    }`}>
                                                    <div className={`w-2 h-2 rounded-full ${page.status === 'PUBLISHED' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                                    {page.status}
                                                </div>
                                            </td>
                                            <td className="px-12 py-10 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                    <Link
                                                        href={`/${page.slug}`}
                                                        target="_blank"
                                                        className="w-14 h-14 bg-white text-slate-400 hover:text-primary rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30"
                                                        title="Visualize Protocol"
                                                    >
                                                        <EyeIcon className="w-6 h-6 border-slate-100" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/pages/edit/${page.id}`}
                                                        className="w-14 h-14 bg-white text-slate-400 hover:text-amber-600 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-amber-200"
                                                        title="Modify Node"
                                                    >
                                                        <PencilSquareIcon className="w-6 h-6" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(page.id)}
                                                        className="w-14 h-14 bg-white text-slate-200 hover:text-red-500 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-red-200"
                                                        title="Purge Node"
                                                    >
                                                        <TrashIcon className="w-6 h-6" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Tactical Intelligence Hud */}
            <div className="fixed bottom-12 right-12 z-[100] group">
                <Link
                    href="/admin/pages/new"
                    className="w-24 h-24 bg-slate-950 text-white rounded-full flex items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.4)] hover:bg-primary transition-all hover:scale-110 active:scale-95 relative"
                >
                    <PlusIcon className="w-10 h-10 group-hover:rotate-180 transition-transform duration-700" />
                    <div className="absolute -top-2 -right-2 p-3 bg-accent rounded-full animate-bounce shadow-xl">
                        <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                </Link>
                <div className="absolute bottom-full right-0 mb-8 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] px-8 py-5 rounded-3xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none shadow-[0_30px_60px_rgba(0,0,0,0.5)] translate-y-4 group-hover:translate-y-0">
                    Deploy Intelligent Content Node
                </div>
            </div>
        </div>
    );
}
