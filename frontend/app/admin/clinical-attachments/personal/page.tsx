'use client';

import { useState, useEffect } from 'react';
import { formsAPI } from '@/lib/api';
import {
    UserGroupIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    FunnelIcon,
    ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

export default function PersonalAttachmentsAdmin() {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const res = await formsAPI.getAllSubmissions();
            // Filter only SELF_SPONSORED category
            const personalSubmissions = (res.data.submissions || []).filter((sub: any) => {
                try {
                    const data = JSON.parse(sub.data);
                    return data.category === 'SELF_SPONSORED';
                } catch (e) {
                    return false;
                }
            });
            setSubmissions(personalSubmissions);
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
            alert('Failed to update status.');
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const filtered = submissions.filter(s => {
        if (filter === 'ALL') return true;
        return s.status === filter;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                        <UserGroupIcon className="w-8 h-8 text-emerald-600" />
                        Independent / Personal Attachments
                    </h2>
                    <p className="text-gray-500 text-sm">Manage direct applications from individual students and professionals.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-all">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm overflow-x-auto no-scrollbar">
                <FunnelIcon className="w-5 h-5 text-gray-400 ml-2" />
                {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === f ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-gray-50 animate-pulse h-32" />
                    ))
                ) : filtered.length === 0 ? (
                    <div className="bg-white p-20 rounded-[40px] border border-gray-50 text-center">
                        <UserGroupIcon className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No individual applications found</p>
                    </div>
                ) : (
                    filtered.map((sub) => {
                        const data = JSON.parse(sub.data);
                        return (
                            <div key={sub.id} className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <UserGroupIcon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-black text-gray-900 text-lg leading-tight">{data.institutionName}</h3>
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${sub.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                                                    sub.status === 'REJECTED' ? 'bg-red-50 text-red-600' :
                                                        'bg-amber-50 text-amber-600'
                                                    }`}>
                                                    {sub.status || 'PENDING'}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-bold text-gray-400">
                                                <span className="flex items-center gap-1"><ClockIcon className="w-3.5 h-3.5" /> {new Date(sub.createdAt).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1">👤 {data.contactPerson}</span>
                                                <span className="flex items-center gap-1">📧 {data.email}</span>
                                                <span className="text-blue-900 uppercase">{data.profession}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="flex-1 md:flex-none px-6 py-3 bg-gray-50 hover:bg-blue-900 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Details</button>
                                        <button
                                            onClick={() => handleStatusUpdate(sub.id, 'APPROVED')}
                                            className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                        >
                                            <CheckCircleIcon className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(sub.id, 'REJECTED')}
                                            className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <XCircleIcon className="w-6 h-6" />
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
