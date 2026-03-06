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
        { label: 'Clinical Services', value: data?.stats?.totalServices || '0', change: '+2.5%', trend: 'up', icon: BriefcaseIcon, color: 'blue' },
        { label: 'Departments', value: data?.stats?.totalDepartments || '0', change: 'Active', trend: 'up', icon: CircleStackIcon, color: 'emerald' },
        { label: 'CPD Applicants', value: data?.stats?.totalCpdRegistrations || '0', change: '+12%', trend: 'up', icon: AcademicCapIcon, color: 'purple' },
        { label: 'Unread Messages', value: data?.stats?.totalMessages || '0', change: 'Priority', trend: 'down', icon: EnvelopeIcon, color: 'amber' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Syncing Realtime Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-10 pb-20 animate-fade-in">
            {/* --- HERO HEADER --- */}
            <div className="relative overflow-hidden bg-white border border-gray-100 p-10 rounded-[3rem] shadow-sm">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-900/20">System Status: Live</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <h2 className="text-4xl font-black text-gray-950 tracking-tighter leading-none mb-4">
                            Welcome Back, <span className="text-blue-900">Chief Admin</span>
                        </h2>
                        <p className="text-gray-500 font-medium max-w-lg leading-relaxed">
                            Your operational heartbeat is healthy. We've detected <span className="text-blue-900 font-bold">12 new applications</span> in the last 24 hours that require your attention.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" target="_blank" className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" /> Live Website
                        </Link>
                        <button className="flex items-center gap-2 px-8 py-4 bg-blue-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-950 transition-all shadow-2xl shadow-blue-900/30 group">
                            <PlusIcon className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Quick Action
                        </button>
                    </div>
                </div>
            </div>

            {/* --- ANALYTICS TABS & CARDS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {stats.map((stat, idx) => (
                    <div key={stat.label}
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-blue-950/5 transition-all group relative overflow-hidden"
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className={`p-4 rounded-2xl shadow-lg shadow-${stat.color}-900/10 ${stat.color === 'blue' ? 'bg-blue-900 text-white' :
                                    stat.color === 'emerald' ? 'bg-emerald-900 text-white' :
                                        stat.color === 'purple' ? 'bg-purple-900 text-white' :
                                            'bg-amber-600 text-white'
                                }`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}>
                                {stat.trend === 'up' ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="relative z-10 mb-2">
                            <span className="text-4xl font-black text-gray-950 tracking-tighter">{stat.value}</span>
                        </div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* --- CORE MANAGEMENT LAYERS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* ADVANCED BREAKDOWN (Left 8 cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-white border border-gray-50 rounded-[3.5rem] p-10 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 tracking-tighter mb-1">Operational Flow</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Resource Allocation</p>
                            </div>
                            <div className="flex bg-gray-50 p-1.5 rounded-2xl">
                                {['OVERVIEW', 'ATTACHMENTS', 'CPD'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab as any)}
                                        className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-900'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {activeTab === 'OVERVIEW' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-fade-in-up">
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-950/20 group">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-blue-200">System Activity Score</h4>
                                        <div className="flex items-end gap-4 mb-4">
                                            <div className="text-6xl font-black tracking-tighter">94</div>
                                            <div className="pb-2 text-[10px] font-bold text-blue-200 uppercase tracking-widest">Percent Performance</div>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="w-[94%] h-full bg-blue-300 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 flex items-center justify-between">
                                        <div>
                                            <div className="text-3xl font-black text-gray-950 mb-1">{data?.stats?.totalMessages || 0}</div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Conversations</div>
                                        </div>
                                        <Link href="/admin/messages" className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-blue-900">
                                            <EnvelopeIcon className="w-6 h-6" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="bg-white border-2 border-dashed border-gray-100 p-8 rounded-[2.5rem] flex flex-col justify-center text-center">
                                    <div className="w-20 h-20 bg-blue-50 text-blue-900 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                                        <PlusIcon className="w-8 h-8" />
                                    </div>
                                    <h5 className="font-black text-gray-950 uppercase tracking-tighter mb-2">Integrate Service</h5>
                                    <p className="text-xs text-gray-400 mb-6">Add new clinical modules or departments to the public platform.</p>
                                    <button className="px-6 py-3 bg-gray-950 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-900 transition-all">Start Integration</button>
                                </div>
                            </div>
                        )}

                        {(activeTab === 'ATTACHMENTS' || activeTab === 'CPD') && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                                {[
                                    { label: 'Public Institution', key: 'government', color: 'blue', icon: BuildingLibraryIcon },
                                    { label: 'Private Sector', key: 'private', color: 'emerald', icon: AcademicCapIcon },
                                    { label: 'Personal Stream', key: 'personal', color: 'purple', icon: UserGroupIcon },
                                ].map((cat) => {
                                    const val = activeTab === 'ATTACHMENTS'
                                        ? data?.stats?.attachmentCategories?.[cat.key]
                                        : data?.stats?.cpdCategories?.[cat.key];
                                    const link = activeTab === 'ATTACHMENTS'
                                        ? `/admin/clinical-attachments/${cat.key}`
                                        : `/admin/cpd-applications/${cat.key}`;

                                    return (
                                        <div key={cat.key} className="bg-white border border-gray-100 p-8 rounded-[2.5rem] hover:border-blue-900/20 group transition-all">
                                            <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${cat.color === 'blue' ? 'bg-blue-50 text-blue-900' :
                                                    cat.color === 'emerald' ? 'bg-emerald-50 text-emerald-900' :
                                                        'bg-purple-50 text-purple-900'
                                                }`}>
                                                <cat.icon className="w-6 h-6" />
                                            </div>
                                            <div className="text-4xl font-black text-gray-950 mb-2">{val || 0}</div>
                                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">{cat.label}</div>
                                            <Link href={link} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-blue-900 group-hover:gap-3 transition-all">
                                                Audit Data <ArrowRightIcon className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* CHART & TRENDS */}
                    <div className="bg-white border border-gray-50 rounded-[3.5rem] p-10 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 tracking-tighter mb-1">Inflow Velocity</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Application intake metrics</p>
                            </div>
                            <div className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black text-gray-500 flex items-center gap-2">
                                <ChartBarSquareIcon className="w-4 h-4" /> Weekly Scan
                            </div>
                        </div>

                        <div className="h-48 flex items-end justify-between gap-4 sm:gap-8 px-4">
                            {[45, 62, 51, 88, 76, 92, 68].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                    <div
                                        className="w-full bg-gray-100 group-hover:bg-blue-900 rounded-full transition-all duration-700 relative flex items-end"
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-950 text-white text-[9px] font-black px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl">
                                            {height} APPS
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">
                                        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* REALTIME INFLOW FEED (Right 4 cols) */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white border border-gray-50 rounded-[3.5rem] p-10 shadow-sm h-full flex flex-col">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 tracking-tighter mb-1">Realtime</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Latest Application Feed</p>
                            </div>
                            <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                        </div>

                        <div className="space-y-4 flex-1">
                            {(data?.recent?.applications || []).map((app: any, i: number) => (
                                <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-blue-900/10 hover:bg-white transition-all group cursor-pointer">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center font-black text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-all">
                                            {app.firstName.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-black text-gray-950 truncate">{app.firstName} {app.lastName}</div>
                                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{app.type || 'Clinical'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                                        <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase">
                                            <CalendarIcon className="w-3.5 h-3.5" />
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </div>
                                        <span className="px-2.5 py-1 bg-white rounded-lg text-[8px] font-black uppercase text-blue-900 shadow-sm border border-gray-100">
                                            {app.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {(!data?.recent?.applications?.length) && (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CircleStackIcon className="w-6 h-6 text-gray-300" />
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Zero Inflow Detected</p>
                                </div>
                            )}
                        </div>

                        <Link href="/admin/clinical-attachments" className="mt-10 w-full py-5 bg-gray-950 text-white rounded-[2rem] text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-blue-900 transition-all group shadow-xl shadow-gray-950/20">
                            Central Record Hub <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- ADVANCED CONTROL GRID --- */}
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-black text-gray-950 tracking-tighter">System Core</h3>
                    <div className="h-px bg-gray-100 flex-1" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Master Control HUD</span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                    {[
                        { label: 'Departments', icon: '🏢', href: '/admin/departments', desc: 'Resource Tree' },
                        { label: 'Clinical Services', icon: '💉', href: '/admin/services', desc: 'Service Matrix' },
                        { label: 'CPD applicants', icon: '🎓', href: '/admin/cpd-applications', desc: 'Education' },
                        { label: 'Attachments', icon: '📑', href: '/admin/clinical-attachments', desc: 'Training' },
                        { label: 'Manage News', icon: '📰', href: '/admin/posts', desc: 'Media Center' },
                        { label: 'System Setup', icon: '⚙️', href: '/admin/settings', desc: 'Core Engine' },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-900/20 group transition-all"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-900 group-hover:scale-110 transition-all">
                                {item.icon}
                            </div>
                            <div className="text-xs font-black text-gray-900 uppercase tracking-tighter mb-1">
                                {item.label}
                            </div>
                            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                {item.desc}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
