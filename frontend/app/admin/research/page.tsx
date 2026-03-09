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
    SparklesIcon,
    RocketLaunchIcon,
    IdentificationIcon,
    AcademicCapIcon,
    ChartBarIcon,
    BeakerIcon,
} from '@heroicons/react/24/outline';

export default function ResearchAdmin() {
    const [research, setResearch] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    const fetchResearch = async () => {
        setLoading(true);
        try {
            const res = await researchAPI.getAll();
            setResearch(res.data.research || []);
        } catch (error) {
            console.error('Fetch research error:', error);
            // Fallback for UI visualization
            setResearch([
                { id: '1', title: 'Impact of COVID-19 on Mental Health in Addis Ababa', abstract: 'A comprehensive study on the psychological effects of the pandemic on urban populations, focusing on anxiety levels and social isolation metrics.', authors: '["Dr. Solomon T.", "Dr. Helina M."]', keywords: '["COVID-19", "Addis Ababa", "Psychology"]', status: 'PENDING', createdAt: new Date().toISOString() },
                { id: '2', title: 'Prevalence of Schizophrenia in Rural Ethiopia', abstract: 'Researching the occurrence and social stigma in rural areas, analyzing community-based intervention strategies and cultural perceptions.', authors: '["Prof. Abebe K."]', keywords: '["Schizophrenia", "Rural", "Mental Health"]', status: 'PUBLISHED', publishedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
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
            alert('Research protocol update failed.');
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

    const stats = [
        { label: 'Global Submissions', value: research.length, icon: BeakerIcon, color: 'primary' },
        { label: 'Awaiting Validation', value: research.filter(r => r.status === 'PENDING').length, icon: LightBulbIcon, color: 'amber' },
        { label: 'Validated Findings', value: research.filter(r => r.status === 'PUBLISHED').length, icon: CheckCircleIcon, color: 'emerald' },
        { label: 'Archived Nodes', value: research.filter(r => r.status === 'REJECTED').length, icon: XCircleIcon, color: 'red' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Intel Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-20 h-20 bg-slate-50 text-amber-500 rounded-[2rem] flex items-center justify-center shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-700">
                        <BeakerIcon className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-50 rounded-xl border border-amber-100">
                                <SparklesIcon className="w-5 h-5 text-amber-600" />
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Institutional Research Lab</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none">Intelligence Hub</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-[1.8rem] border border-slate-100 shadow-inner">
                        {['ALL', 'PENDING', 'PUBLISHED', 'REJECTED'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`px-6 py-3 rounded-[1.2rem] text-[9px] font-black uppercase tracking-widest transition-all ${filter === s ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 hover:text-primary hover:bg-white/50'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tactical Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((s, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm flex items-center gap-6 group hover:border-primary/20 transition-all">
                        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 ${s.color === 'primary' ? 'bg-primary/5 text-primary' :
                                s.color === 'amber' ? 'bg-amber-50 text-amber-500' :
                                    s.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' :
                                        'bg-red-50 text-red-500'
                            } group-hover:scale-110 shadow-inner`}>
                            <s.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                            <p className="text-3xl font-jakarta font-black text-slate-900 leading-none">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scan Control */}
            <div className="relative max-w-2xl group">
                <MagnifyingGlassIcon className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Scan publications by keywords, abstract nomenclature, or title signatures..."
                    className="w-full pl-20 pr-8 py-5 bg-white border border-slate-200/60 rounded-[2rem] shadow-sm focus:ring-[15px] focus:ring-primary/5 transition-all outline-none font-medium text-slate-700"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Research Grid Area */}
            <div className="grid grid-cols-1 gap-10">
                {loading ? (
                    [...Array(2)].map((_, i) => (
                        <div key={i} className="bg-white h-[400px] rounded-[4rem] animate-pulse border border-slate-100" />
                    ))
                ) : filteredResearch.length === 0 ? (
                    <div className="bg-white py-40 rounded-[4rem] border border-slate-200/60 text-center shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-slate-200 shadow-inner">
                            <LightBulbIcon className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-jakarta font-black text-slate-900 mb-2">Null Findings Detected</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">The research repository contains no entries matching your currently active telemetry scan.</p>
                    </div>
                ) : (
                    filteredResearch.map((item, idx) => (
                        <div key={item.id} className="bg-white p-10 md:p-14 rounded-[4rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group animate-in slide-in-from-bottom-12" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="absolute top-0 right-0 w-96 h-full bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <div className="relative z-10 flex flex-col xl:flex-row gap-12">
                                <div className="flex-1 space-y-8">
                                    <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                                        <div className="space-y-4 flex-1">
                                            <div className="flex flex-wrap items-center gap-4">
                                                <h3 className="text-3xl font-jakarta font-black text-slate-900 tracking-tight leading-tight group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>
                                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${item.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                        item.status === 'REJECTED' ? 'bg-red-50 text-red-600 border-red-100' :
                                                            'bg-amber-50 text-amber-600 border-amber-100 animate-pulse'
                                                    }`}>
                                                    {item.status || 'VALIADTION PENDING'}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[12px] font-bold text-slate-400">
                                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 group-hover:bg-white transition-all"><CalendarIcon className="w-4 h-4 text-primary" /> Submitted: {new Date(item.createdAt).toLocaleDateString()}</div>
                                                {item.publishedAt && <div className="flex items-center gap-2 text-emerald-600 uppercase font-black tracking-widest text-[9px]"><CheckCircleIcon className="w-4 h-4" /> Finalized: {new Date(item.publishedAt).toLocaleDateString()}</div>}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                                            {item.status === 'PENDING' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(item.id, 'PUBLISHED')}
                                                        className="flex-1 md:flex-none px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20"
                                                    >
                                                        Validate Finding
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(item.id, 'REJECTED')}
                                                        className="flex-1 md:flex-none px-8 py-4 bg-white border border-red-100 text-red-600 hover:bg-red-50 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                                                    >
                                                        Decommission
                                                    </button>
                                                </>
                                            )}
                                            {item.status === 'PUBLISHED' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(item.id, 'REJECTED')}
                                                    className="px-8 py-4 bg-white border border-slate-200 text-slate-400 hover:text-red-600 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    Retract Release
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 relative group/abs shadow-inner hover:bg-white transition-colors">
                                        <h4 className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">
                                            <DocumentTextIcon className="w-5 h-5" /> Abstract Protocol
                                        </h4>
                                        <p className="text-slate-600 text-base leading-relaxed font-medium italic">
                                            {item.abstract}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
                                                <UserIcon className="w-5 h-5" /> Research Squad
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {JSON.parse(item.authors || '[]').map((author: string, i: number) => (
                                                    <span key={i} className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[11px] font-black text-slate-900 shadow-sm uppercase tracking-tight">
                                                        {author}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
                                                <TagIcon className="w-5 h-5" /> Semantic Tags
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {JSON.parse(item.keywords || '[]').map((keyword: string, i: number) => (
                                                    <span key={i} className="px-4 py-2 bg-primary/5 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary/10">
                                                        #{keyword}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="xl:w-64 flex flex-col gap-6">
                                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden group/card shadow-primary/20 hover:shadow-primary/30 transition-all">
                                        <ChartBarIcon className="absolute -bottom-10 -right-10 w-40 h-40 text-primary opacity-10 group-hover/card:scale-110 transition-transform duration-700" />
                                        <div className="relative z-10 space-y-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Operational Track</p>
                                            <p className="font-black text-lg tracking-tight leading-none truncate">{item.category || 'CLINICAL'}</p>
                                        </div>
                                        {item.document ? (
                                            <a
                                                href={item.document}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="relative z-10 flex items-center justify-center gap-3 w-full py-5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary-dark shadow-xl shadow-primary/40 active:translate-y-1"
                                            >
                                                <ArrowTopRightOnSquareIcon className="w-5 h-5" /> Full Protocol
                                            </a>
                                        ) : (
                                            <div className="relative z-10 py-5 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/20 text-center border border-white/10 italic">
                                                No PDF Signal
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
