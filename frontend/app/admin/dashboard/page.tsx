'use client';

import { useState, useEffect } from 'react';
import { analyticsAPI } from '@/lib/api';
import {
    UsersIcon,
    CalendarIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    ChartBarSquareIcon,
} from '@heroicons/react/24/outline';

const stats = [
    { label: 'Total Patients', value: '1,284', change: '+12%', trend: 'up', icon: UsersIcon, color: 'blue' },
    { label: 'Appointments', value: '45', change: '+5%', trend: 'up', icon: CalendarIcon, color: 'emerald' },
    { label: 'New Inquiries', value: '12', change: '-2%', trend: 'down', icon: EnvelopeIcon, color: 'purple' },
    { label: 'Active Posts', value: '86', change: '+8%', trend: 'up', icon: DocumentTextIcon, color: 'amber' },
];

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        analyticsAPI.getOverview()
            .then(res => setData(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Dashboard Overview</h2>
                    <p className="text-gray-500">Welcome to your AMSH administrative heartbeat.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                        📅 Monthly Report
                    </button>
                    <button className="px-4 py-2 bg-blue-900 text-white rounded-xl text-sm font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
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
                            <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.trend === 'up' ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Section */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-50 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-gray-900">Patient Traffic</h3>
                            <p className="text-xs text-gray-400">Total visits over the last 7 days</p>
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
                                        {height * 10} visits
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
                    <h3 className="text-lg font-black text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[
                            { type: 'POST', text: 'New article "Mental Wellness" published', time: '2 mins ago', icon: DocumentTextIcon, color: 'blue' },
                            { type: 'APPT', text: 'New appointment booked by Abebe B.', time: '14 mins ago', icon: CalendarIcon, color: 'emerald' },
                            { type: 'MSG', text: 'Contact form submission from Hana G.', time: '1 hour ago', icon: EnvelopeIcon, color: 'purple' },
                            { type: 'USER', text: 'Admin user "Almaz" updated a page', time: '3 hours ago', icon: UsersIcon, color: 'amber' },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className={`p-2 rounded-xl mt-0.5 ${activity.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                        activity.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                            activity.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                                'bg-amber-50 text-amber-600'
                                    }`}>
                                    <activity.icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-800 leading-tight truncate">{activity.text}</p>
                                    <p className="text-[10px] text-gray-400 font-medium mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 rounded-xl border border-gray-100 text-xs font-black text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest">
                        View All Activity
                    </button>
                </div>
            </div>

            {/* Quick Access Grid */}
            <h3 className="text-lg font-black text-gray-900">Quick Management</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: 'Add Post', icon: '📝', href: '/admin/posts/new' },
                    { label: 'Upload Media', icon: '📁', href: '/admin/media' },
                    { label: 'Manage Doctors', icon: '🩺', href: '/admin/doctors' },
                    { label: 'Edit Services', icon: '🏥', href: '/admin/services' },
                    { label: 'Site Settings', icon: '⚙️', href: '/admin/settings' },
                    { label: 'Appts List', icon: '📅', href: '/admin/appointments' },
                ].map((item) => (
                    <button
                        key={item.label}
                        className="p-6 bg-white rounded-2xl border border-gray-50 shadow-sm hover:scale-105 hover:bg-blue-900 group transition-all"
                    >
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <div className="text-xs font-black text-gray-600 group-hover:text-white uppercase tracking-wider">
                            {item.label}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
