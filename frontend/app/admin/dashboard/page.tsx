'use client';

import { useState, useEffect } from 'react';
import { analyticsAPI } from '@/lib/api';
import Link from 'next/link';
import {
    UsersIcon,
    CalendarIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    ChartBarSquareIcon,
    BriefcaseIcon,
    CircleStackIcon,
    AcademicCapIcon,
    BuildingLibraryIcon,
    UserGroupIcon,
    ArrowRightIcon,
    PlusIcon,
    ArrowTopRightOnSquareIcon,
    SparklesIcon,
    MegaphoneIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ATTACHMENTS' | 'CPD'>('OVERVIEW');

    useEffect(() => {
        analyticsAPI.getOverview()
            .then(res => setData(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const stats = [
        { label: 'Clinical Services', value: data?.stats?.totalServices || '0', change: '+2.5%', trend: 'up', icon: BriefcaseIcon, color: 'primary' },
        { label: 'Active Departments', value: data?.stats?.totalDepartments || '0', change: 'Stable', trend: 'up', icon: CircleStackIcon, color: 'accent' },
        { label: 'CPD Applicants', value: data?.stats?.totalCpdRegistrations || '0', change: '+12%', trend: 'up', icon: AcademicCapIcon, color: 'emerald' },
        { label: 'Unread Messages', value: data?.stats?.totalMessages || '0', change: 'Priority', trend: 'down', icon: EnvelopeIcon, color: 'amber' },
    ];

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                <div className="w-16 h-16 border-[5px] border-slate-100 border-t-primary rounded-full animate-spin" />
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] animate-pulse">Syncing Enterprise Data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-20">
            {/* --- HERO HEADER --- */}
            <div className="relative group overflow-hidden bg-white border border-slate-200/60 p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_20px_50px_rgba(27,79,138,0.05)]">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none transition-opacity group-hover:opacity-80" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/10 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                Operational Live
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                            Welcome back, <span className="text-primary italic">Command Center</span>
                        </h2>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                            System health is optimal. We've detected <span className="text-primary font-bold decoration-primary/30 decoration-2 underline-offset-4">12 prioritized applications</span> awaiting your executive verification.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link href="/" target="_blank" className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" /> Live Portal
                        </Link>
                        <button className="flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-primary-dark transition-all shadow-[0_15px_30px_rgba(27,79,138,0.25)] hover:shadow-[0_20px_40px_rgba(27,79,138,0.35)] hover:-translate-y-1 active:translate-y-0 group">
                            <PlusIcon className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" /> New Directive
                        </button>
                    </div>
                </div>
            </div>

            {/* --- ANALYTICS CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={stat.label}
                        className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group relative overflow-hidden"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500 ${stat.color === 'primary' ? 'bg-primary/10 text-primary' :
                                stat.color === 'accent' ? 'bg-accent/10 text-accent' :
                                    stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                        'bg-amber-50 text-amber-600'
                                }`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
                                }`}>
                                {stat.trend === 'up' ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <span className="block text-4xl font-jakarta font-black text-slate-900 tracking-tight mb-2">{stat.value}</span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</span>
                        </div>
                        <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                            <stat.icon className="w-24 h-24 rotate-12" />
                        </div>
                    </div>
                ))}
            </div>

            {/* --- CORE MANAGEMENT LAYERS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* FLOW BREAKDOWN */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-10 shadow-sm overflow-hidden relative">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-12">
                            <div>
                                <h3 className="text-2xl font-jakarta font-black text-slate-900 tracking-tight mb-2">Operational Analytics</h3>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">Cross-functional performance metrics</p>
                            </div>
                            <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                {['OVERVIEW', 'ATTACHMENTS', 'CPD'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as any)}
                                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-700'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {activeTab === 'OVERVIEW' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-6">
                                    <div className="bg-primary p-10 rounded-[2rem] text-white shadow-xl shadow-primary/20 group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-20">
                                            <SparklesIcon className="w-16 h-16" />
                                        </div>
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.25em] mb-8 text-primary-light">System Efficiency</h4>
                                        <div className="flex items-end gap-3 mb-6">
                                            <div className="text-7xl font-jakarta font-black tracking-tight leading-none">94</div>
                                            <div className="pb-2 text-xs font-bold text-white/60 uppercase tracking-widest">Score</div>
                                        </div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="w-[94%] h-full bg-accent rounded-full transition-all duration-1000" />
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-center justify-between group hover:border-primary/20 transition-all">
                                        <div>
                                            <div className="text-3xl font-jakarta font-black text-slate-900 mb-1">{data?.stats?.totalMessages || 0}</div>
                                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Channels</div>
                                        </div>
                                        <Link href="/admin/messages" className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <EnvelopeIcon className="w-6 h-6" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="bg-white border-2 border-dashed border-slate-200 p-10 rounded-[2rem] flex flex-col justify-center text-center group hover:bg-slate-50 transition-all">
                                    <div className="w-20 h-20 bg-primary/5 text-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 transform transition-transform group-hover:scale-110 group-hover:rotate-6">
                                        <PlusIcon className="w-10 h-10" />
                                    </div>
                                    <h5 className="font-jakarta font-black text-slate-900 text-lg mb-3">Service Expansion</h5>
                                    <p className="text-sm text-slate-500 mb-8 max-w-[200px] mx-auto leading-relaxed">Instantiate new clinical modules or departmental units.</p>
                                    <button className="px-8 py-3.5 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">Start Module</button>
                                </div>
                            </div>
                        )}

                        {(activeTab === 'ATTACHMENTS' || activeTab === 'CPD') && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {[
                                    { label: 'Public Sector', key: 'government', color: 'primary', icon: BuildingLibraryIcon },
                                    { label: 'Enterprise', key: 'private', color: 'accent', icon: AcademicCapIcon },
                                    { label: 'Individual', key: 'personal', color: 'emerald', icon: UserGroupIcon },
                                ].map((cat) => {
                                    const val = activeTab === 'ATTACHMENTS'
                                        ? data?.stats?.attachmentCategories?.[cat.key]
                                        : data?.stats?.cpdCategories?.[cat.key];
                                    const link = activeTab === 'ATTACHMENTS'
                                        ? `/admin/clinical-attachments/${cat.key}`
                                        : `/admin/cpd-applications/${cat.key}`;

                                    return (
                                        <Link key={cat.key} href={link} className="bg-white border border-slate-200/60 p-8 rounded-[2rem] hover:border-primary/20 group transition-all hover:bg-slate-50/50">
                                            <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${cat.color === 'primary' ? 'bg-primary/10 text-primary' :
                                                cat.color === 'accent' ? 'bg-accent/10 text-accent' :
                                                    'bg-emerald-50 text-emerald-600'
                                                }`}>
                                                <cat.icon className="w-6 h-6" />
                                            </div>
                                            <div className="text-4xl font-jakarta font-black text-slate-900 mb-2">{val || 0}</div>
                                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">{cat.label}</div>
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                                                Audit Hub <ArrowRightIcon className="w-3.5 h-3.5" />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* VOLUME METRICS */}
                    <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-10 shadow-sm relative">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-2xl font-jakarta font-black text-slate-900 tracking-tight mb-2">Inflow Velocity</h3>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">Application throughput analysis</p>
                            </div>
                            <div className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-500 flex items-center gap-2">
                                <ChartBarSquareIcon className="w-4 h-4 text-primary" /> 7-Day Matrix
                            </div>
                        </div>

                        <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 px-4">
                            {[45, 62, 51, 88, 76, 92, 68].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-5 group">
                                    <div
                                        className="w-full bg-slate-100 rounded-xl group-hover:bg-primary transition-all duration-500 relative flex items-end overflow-hidden"
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                                        <div className="absolute top-0 left-0 w-full h-full bg-accent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700 opacity-20" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FEED */}
                <div className="lg:col-span-4 h-full">
                    <div className="bg-primary-dark rounded-[2.5rem] p-10 shadow-xl h-full flex flex-col text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -mr-32 -mt-32" />

                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <div>
                                <h3 className="text-2xl font-jakarta font-black tracking-tight mb-2">Realtime Pulse</h3>
                                <p className="text-[11px] text-white/50 font-bold uppercase tracking-[0.2em]">Active Intake Feed</p>
                            </div>
                            <div className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                            </div>
                        </div>

                        <div className="space-y-4 flex-1 relative z-10 overflow-y-auto pr-2 no-scrollbar">
                            {(data?.recent?.applications || []).map((app: any, idx: number) => (
                                <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group group relative">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center font-black text-accent text-lg">
                                            {app.firstName.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold truncate">{app.firstName} {app.lastName}</div>
                                            <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{app.type || 'Inquiry'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className="text-[10px] font-bold text-white/30 uppercase">{new Date(app.createdAt).toLocaleDateString()}</span>
                                        <span className="px-3 py-1 bg-accent/20 text-accent rounded-lg text-[9px] font-black uppercase tracking-widest border border-accent/20">
                                            {app.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {(!data?.recent?.applications?.length) && (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                        <CircleStackIcon className="w-10 h-10 text-white/10" />
                                    </div>
                                    <p className="text-[11px] text-white/30 font-black uppercase tracking-widest">No Active Intake</p>
                                </div>
                            )}
                        </div>

                        <Link href="/admin/clinical-attachments" className="mt-10 w-full py-5 bg-accent text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:text-primary transition-all group shadow-2xl shadow-black/20">
                            Global Records <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- CONTROL GRID --- */}
            <div className="space-y-8 pt-10">
                <div className="flex items-center gap-6">
                    <h3 className="text-2xl font-jakarta font-black text-slate-900 tracking-tight">System Infrastructure</h3>
                    <div className="h-px bg-slate-200 flex-1" />
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.3em] whitespace-nowrap">Core Management Modules</span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                    {[
                        { label: 'Departments', icon: <BuildingLibraryIcon className="w-8 h-8" />, href: '/admin/departments', desc: 'Organizational Units', color: 'primary' },
                        { label: 'Clinical Portfolio', icon: <BriefcaseIcon className="w-8 h-8" />, href: '/admin/services', desc: 'Service Catalog', color: 'accent' },
                        { label: 'Education Hub', icon: <AcademicCapIcon className="w-8 h-8" />, href: '/admin/cpd-applications', desc: 'CPD Accreditation', color: 'emerald' },
                        { label: 'Residency Training', icon: <UserGroupIcon className="w-8 h-8" />, href: '/admin/clinical-attachments', desc: 'Intake Management', color: 'purple' },
                        { label: 'Broadcasts', icon: <MegaphoneIcon className="w-8 h-8" />, href: '/admin/posts', desc: 'Public Relations', color: 'amber' },
                        { label: 'System Kernel', icon: <Cog6ToothIcon className="w-8 h-8" />, href: '/admin/settings', desc: 'Server Parameters', color: 'slate' },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="p-8 bg-white rounded-[2rem] border border-slate-200/60 shadow-sm hover:border-primary/20 hover:shadow-xl group transition-all text-center flex flex-col items-center"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-3 ${item.color === 'primary' ? 'bg-primary/5 text-primary' :
                                item.color === 'accent' ? 'bg-accent/5 text-accent' :
                                    item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                        item.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                            item.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                                                'bg-slate-50 text-slate-600'
                                } group-hover:bg-primary group-hover:text-white`}>
                                {item.icon}
                            </div>
                            <div className="text-[13px] font-black text-slate-900 uppercase tracking-tight mb-2">
                                {item.label}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.desc}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
