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
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        analyticsAPI.getOverview()
            .then(res => setData(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const stats = [
        { label: 'Clinical Services', value: data?.stats?.totalServices || '0', change: 'Live', trend: 'up', icon: BriefcaseIcon, color: 'blue' },
        { label: 'Departments', value: data?.stats?.totalDepartments || '0', change: 'Active', trend: 'up', icon: CircleStackIcon, color: 'emerald' },
        { label: 'CPD Applicants', value: data?.stats?.totalCpdRegistrations || '0', change: 'New', trend: 'up', icon: CalendarIcon, color: 'purple' },
        { label: 'Unread Messages', value: data?.stats?.totalMessages || '0', change: 'Inbox', trend: 'down', icon: EnvelopeIcon, color: 'amber' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Dashboard Overview</h2>
                    <p className="text-gray-500 text-sm">Welcome to your EMSH administrative heartbeat.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/" target="_blank" className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-blue-900 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                        <span>🌐 View Website</span>
                    </Link>
                    <button className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
                        ➕ Quick Action
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                    stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                        'bg-amber-50 text-amber-600'
                                } group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.change}
                            </div>
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Categorized Attachments Breakdown */}
            <h3 className="text-lg font-black text-gray-900 -mb-4">Attachment Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/20 text-white group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-blue-200">Public Institution Applicants</h4>
                    <div className="flex items-end justify-between">
                        <div className="text-4xl font-black">{data?.stats?.attachmentCategories?.government || 0}</div>
                        <Link href="/admin/clinical-attachments/government" className="text-[10px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all">View List</Link>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-blue-200 transition-all group overflow-hidden relative">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Private College Applicants</h4>
                    <div className="flex items-end justify-between">
                        <div className="text-4xl font-black text-gray-900">{data?.stats?.attachmentCategories?.private || 0}</div>
                        <Link href="/admin/clinical-attachments/private" className="text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-900 px-3 py-2 rounded-lg transition-all">View List</Link>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-blue-200 transition-all group overflow-hidden relative">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Independent / Personal</h4>
                    <div className="flex items-end justify-between">
                        <div className="text-4xl font-black text-gray-900">{data?.stats?.attachmentCategories?.personal || 0}</div>
                        <Link href="/admin/clinical-attachments/personal" className="text-[10px] font-black uppercase tracking-widest bg-gray-50 text-gray-600 px-3 py-2 rounded-lg transition-all">View List</Link>
                    </div>
                </div>
            </div>

            {/* Categorized CPD Breakdown */}
            <h3 className="text-lg font-black text-gray-900 -mb-4">CPD Registration Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-8 rounded-[2.5rem] shadow-xl shadow-emerald-900/20 text-white group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-emerald-200">Gov. Institution CPD</h4>
                    <div className="flex items-end justify-between">
                        <div className="text-4xl font-black">{data?.stats?.cpdCategories?.government || 0}</div>
                        <Link href="/admin/cpd-applications/government" className="text-[10px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all">View List</Link>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-emerald-200 transition-all group overflow-hidden relative">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Private College CPD</h4>
                    <div className="flex items-end justify-between">
                        <div className="text-4xl font-black text-gray-900">{data?.stats?.cpdCategories?.private || 0}</div>
                        <Link href="/admin/cpd-applications/private" className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-900 px-3 py-2 rounded-lg transition-all">View List</Link>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-emerald-200 transition-all group overflow-hidden relative">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">Personal / Independent CPD</h4>
                    <div className="flex items-end justify-between">
                        <div className="text-4xl font-black text-gray-900">{data?.stats?.cpdCategories?.personal || 0}</div>
                        <Link href="/admin/cpd-applications/personal" className="text-[10px] font-black uppercase tracking-widest bg-gray-50 text-gray-600 px-3 py-2 rounded-lg transition-all">View List</Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Activity Chart Section */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-50 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-gray-900">Applicant Trends</h3>
                            <p className="text-xs text-gray-400">Total applications over the last 7 days</p>
                        </div>
                        <select className="bg-gray-50 border-0 rounded-lg text-xs font-bold text-gray-500 px-3 py-1.5 focus:ring-0">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-4">
                        {[45, 62, 51, 88, 76, 92, 68].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-blue-900 to-blue-500 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {height} apps
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-gray-300 uppercase">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl border border-gray-50 p-8 shadow-sm">
                    <h3 className="text-lg font-black text-gray-900 mb-6">Recent Inflow</h3>
                    <div className="space-y-6">
                        {(data?.recent?.applications || []).map((app: any, i: number) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="p-2 rounded-xl mt-0.5 bg-blue-50 text-blue-600">
                                    <UsersIcon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-800 leading-tight truncate">New App: {app.firstName}</p>
                                    <p className="text-[10px] text-gray-400 font-medium mt-1">{new Date(app.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className="text-[9px] font-black uppercase text-blue-900">{app.status}</span>
                            </div>
                        ))}
                        {(!data?.recent?.applications?.length) && (
                            <div className="text-center py-10">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">No recent applications</p>
                            </div>
                        )}
                    </div>
                    <button className="w-full mt-8 py-3 rounded-xl border border-gray-100 text-[10px] font-black text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest">
                        View All Applicants
                    </button>
                </div>
            </div>

            {/* Quick Access Grid */}
            <h3 className="text-lg font-black text-gray-900">Advanced Control</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: 'Departments', icon: '🏢', href: '/admin/departments' },
                    { label: 'Clinical Services', icon: '💉', href: '/admin/services' },
                    { label: 'CPD Applicants', icon: '🎓', href: '/admin/cpd-applications' },
                    { label: 'Attachments', icon: '📑', href: '/admin/clinical-attachments' },
                    { label: 'Add News', icon: '📰', href: '/admin/posts/new' },
                    { label: 'Site Settings', icon: '⚙️', href: '/admin/settings' },
                ].map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:scale-105 hover:bg-blue-900 group transition-all text-center"
                    >
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <div className="text-[10px] font-black text-gray-600 group-hover:text-white uppercase tracking-widest">
                            {item.label}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
