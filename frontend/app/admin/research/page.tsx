'use client';

import { useState, useEffect } from 'react';
import { researchAPI } from '@/lib/api';
import {
    LightBulbIcon,
    CheckCircleIcon,
    XCircleIcon,
    UserIcon,
    TagIcon,
    DocumentTextIcon,
    CalendarIcon,
    MagnifyingGlassIcon,
    ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

export default function ResearchAdmin() {
    const [research, setResearch] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    const fetchResearch = async () => {
        setLoading(true);
        try {
            const res = await researchAPI.getAll(); // Using admin/all or generic with filter
            setResearch(res.data.research || []);
        } catch (error) {
            console.error('Fetch research error:', error);
            // Fallback for UI testing
            setResearch([
                { id: '1', title: 'Impact of COVID-19 on Mental Health in Addis Ababa', abstract: 'A comprehensive study on the psychological effects of the pandemic...', authors: '["Dr. Solomon T.", "Dr. Helina M."]', keywords: '["COVID-19", "Addis Ababa", "Psychology"]', status: 'PENDING', createdAt: new Date().toISOString() },
                { id: '2', title: 'Prevalence of Schizophrenia in Rural Ethiopia', abstract: 'Researching the occurrence and social stigma in rural areas...', authors: '["Prof. Abebe K."]', keywords: '["Schizophrenia", "Rural", "Mental Health"]', status: 'PUBLISHED', publishedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await researchAPI.updateStatus(id, status);
            fetchResearch();
        } catch (error) {
            console.error('Update status error:', error);
            alert('Failed to update status.');
        }
    };

    useEffect(() => {
        fetchResearch();
    }, []);

    const filteredResearch = research.filter(item => {
        const matchesFilter = filter === 'ALL' || item.status === filter;
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.abstract.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const statusColors: any = {
        PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
        PUBLISHED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        REJECTED: 'bg-red-100 text-red-700 border-red-200',
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Research Submissions</h2>
                    <p className="text-gray-500 text-sm">Review and manage medical research publications from staff.</p>
                </div>
                <div className="flex items-center gap-2 p-1 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    {['ALL', 'PENDING', 'PUBLISHED', 'REJECTED'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${filter === s ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search research by title or abstract..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-900 transition-all font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm animate-pulse space-y-4">
                            <div className="h-6 bg-gray-100 rounded w-3/4" />
                            <div className="h-4 bg-gray-100 rounded w-1/2" />
                            <div className="h-20 bg-gray-50 rounded" />
                        </div>
                    ))
                ) : filteredResearch.length === 0 ? (
                    <div className="bg-white py-24 rounded-[2rem] border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <LightBulbIcon className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No research submissions found</p>
                    </div>
                ) : (
                    filteredResearch.map((item) => (
                        <div key={item.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group">
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="flex-1 space-y-6">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-900 transition-colors tracking-tight">
                                                    {item.title}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${statusColors[item.status]}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4 text-blue-900" /> Submitted: {new Date(item.createdAt).toLocaleDateString()}</span>
                                                {item.publishedAt && <span className="flex items-center gap-1.5 text-emerald-600"><CheckCircleIcon className="w-4 h-4" /> Published: {new Date(item.publishedAt).toLocaleDateString()}</span>}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {item.status === 'PENDING' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(item.id, 'PUBLISHED')}
                                                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20"
                                                    >
                                                        Approve & Publish
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(item.id, 'REJECTED')}
                                                        className="px-6 py-2.5 bg-white border border-red-100 text-red-600 hover:bg-red-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {item.status === 'PUBLISHED' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(item.id, 'REJECTED')}
                                                    className="px-6 py-2.5 bg-white border border-gray-100 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                                >
                                                    Unpublish
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                                        <h4 className="flex items-center gap-2 text-[10px] font-black text-blue-900 uppercase tracking-widest mb-3">
                                            <DocumentTextIcon className="w-4 h-4" /> Abstract
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                                            {item.abstract}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h4 className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                <UserIcon className="w-4 h-4" /> Authors
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {JSON.parse(item.authors || '[]').map((author: string, i: number) => (
                                                    <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[11px] font-bold text-gray-600">
                                                        {author}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                <TagIcon className="w-4 h-4" /> Keywords
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {JSON.parse(item.keywords || '[]').map((keyword: string, i: number) => (
                                                    <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-tight">
                                                        {keyword}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:w-48 flex flex-col gap-3">
                                    <div className="p-6 bg-blue-900 rounded-3xl text-white space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-300">Category</p>
                                            <p className="font-bold text-sm truncate">{item.category}</p>
                                        </div>
                                        {item.document ? (
                                            <a
                                                href={item.document}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                <ArrowTopRightOnSquareIcon className="w-4 h-4" /> View Full PDF
                                            </a>
                                        ) : (
                                            <div className="py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 text-center italic">
                                                No PDF Attached
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

