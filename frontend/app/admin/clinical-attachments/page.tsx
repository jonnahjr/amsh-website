'use client';

import { useState, useEffect } from 'react';
import { formsAPI } from '@/lib/api';
import {
    DocumentTextIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    FunnelIcon,
    ArrowDownTrayIcon,
    DocumentMagnifyingGlassIcon,
    SparklesIcon,
    UserIcon,
    EnvelopeIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function ClinicalAttachmentsAdmin() {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const res = await formsAPI.getAllSubmissions();
            setSubmissions(res.data.submissions || []);
        } catch (error) {
            console.error('Fetch submissions error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await formsAPI.updateSubmissionStatus(id, status);
            fetchSubmissions();
        } catch (error) {
            console.error('Update status error:', error);
            alert('Status synchronization protocol failed.');
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const filtered = submissions.filter(sub => {
        const data = JSON.parse(sub.data || '{}');
        const matchesSearch = (data.institutionName || '').toLowerCase().includes(search.toLowerCase()) ||
            (data.contactPerson || '').toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'ALL' || sub.status === filter;
        return matchesSearch && matchesFilter;
    });

    const stats = [
        { label: 'Total Intake', value: submissions.length, icon: BuildingOfficeIcon, color: 'primary' },
        { label: 'Awaiting Review', value: submissions.filter(r => r.status === 'PENDING').length, icon: ClockIcon, color: 'amber' },
        { label: 'Authorized Attachments', value: submissions.filter(r => r.status === 'APPROVED').length, icon: CheckCircleIcon, color: 'emerald' },
        { label: 'Decommissioned', value: submissions.filter(r => r.status === 'REJECTED').length, icon: XCircleIcon, color: 'red' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Command Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-20 h-20 bg-slate-50 text-primary rounded-[2rem] flex items-center justify-center shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-700">
                        <DocumentTextIcon className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <SparklesIcon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Institutional Intake Hub</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none">Clinical Attachments</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <button className="flex items-center gap-4 px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-sm">
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        <span>Export Intake Matrix</span>
                    </button>
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

            {/* Strategic Filters */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm flex flex-col lg:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <MagnifyingGlassIcon className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Scan submissions by institution nomenclature or primary contact..."
                        className="w-full pl-20 pr-8 py-5 bg-slate-50 border-0 rounded-[1.8rem] text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:ring-[10px] focus:ring-primary/5 transition-all outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-[1.8rem] border border-slate-100 shadow-inner">
                    {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-8 py-3 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === f ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 hover:text-primary hover:bg-white/50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Intake Feed Area */}
            <div className="grid grid-cols-1 gap-8">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white h-48 rounded-[3rem] animate-pulse border border-slate-100" />
                    ))
                ) : filtered.length === 0 ? (
                    <div className="bg-white p-32 rounded-[4rem] border border-slate-200/60 text-center shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-slate-200 shadow-inner">
                            <DocumentMagnifyingGlassIcon className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-jakarta font-black text-slate-900 mb-2">No Operations Found</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">The intake repository contains no submissions matching your telemetry scan.</p>
                    </div>
                ) : (
                    filtered.map((sub, idx) => {
                        const data = JSON.parse(sub.data || '{}');
                        return (
                            <div key={idx} className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group animate-in slide-in-from-bottom-8" style={{ animationDelay: `${idx * 100}ms` }}>
                                <div className="absolute top-0 right-0 w-64 h-full bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                                    <div className="flex items-start gap-8">
                                        <div className="w-20 h-20 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-sm">
                                            <BuildingOfficeIcon className="w-10 h-10" />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-center gap-4">
                                                <h3 className="font-jakarta font-black text-slate-900 text-2xl tracking-tight leading-tight group-hover:text-primary transition-colors">{data.institutionName || 'INDEPENDENT APPLICANT'}</h3>
                                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${sub.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                        sub.status === 'REJECTED' ? 'bg-red-50 text-red-600 border-red-100' :
                                                            'bg-amber-50 text-amber-600 border-amber-100 animate-pulse'
                                                    }`}>
                                                    {sub.status || 'INTAKE PENDING'}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[12px] font-bold text-slate-400 pt-2">
                                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 group-hover:bg-white transition-all"><ClockIcon className="w-4 h-4" /> {new Date(sub.createdAt).toLocaleDateString()}</div>
                                                <div className="flex items-center gap-2 text-slate-900 uppercase font-black"><UserIcon className="w-4 h-4 text-primary" /> {data.contactPerson}</div>
                                                <div className="flex items-center gap-2"><EnvelopeIcon className="w-4 h-4" /> {data.email}</div>
                                                <div className="flex items-center gap-3 bg-amber-50 text-amber-600 px-3 py-1 rounded-lg border border-amber-100 text-[10px] font-black uppercase tracking-widest leading-none">
                                                    {data.profession || 'Clinical Rotation'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
                                        <button className="flex-1 md:flex-none px-10 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl">Audit Dossier</button>
                                        <button
                                            onClick={() => handleStatusUpdate(sub.id, 'APPROVED')}
                                            className="p-5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-[1.5rem] transition-all border border-emerald-100 shadow-sm"
                                        >
                                            <CheckCircleIcon className="w-7 h-7 stroke-[2.5]" />
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(sub.id, 'REJECTED')}
                                            className="p-5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-[1.5rem] transition-all border border-red-100 shadow-sm"
                                        >
                                            <XCircleIcon className="w-7 h-7 stroke-[2.5]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
