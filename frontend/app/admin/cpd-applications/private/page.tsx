'use client';

import { useState, useEffect } from 'react';
import { cpdAPI } from '@/lib/api';
import {
    AcademicCapIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    ArrowDownTrayIcon,
    EnvelopeIcon,
    PhoneIcon,
    AcademicCapIcon as SchoolIcon,
} from '@heroicons/react/24/outline';

export default function PrivateCpdApplications() {
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const res = await cpdAPI.getAllRegistrations();
            // Filter by PRIVATE category
            const filtered = (res.data.registrations || []).filter((r: any) => r.category === 'PRIVATE');
            setRegistrations(filtered);
        } catch (error) {
            console.error('Fetch registrations error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await cpdAPI.updateRegistrationStatus(id, status);
            fetchRegistrations();
        } catch (error) {
            console.error('Update status error:', error);
            alert('Failed to update status.');
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-900 text-white flex items-center justify-center shadow-lg shadow-purple-900/20">
                        <SchoolIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900">Private Institution CPD</h2>
                        <p className="text-gray-500 text-sm">Applications from private colleges and clinics.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-all">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-gray-50 animate-pulse h-32" />
                    ))
                ) : registrations.length === 0 ? (
                    <div className="bg-white p-20 rounded-[40px] border border-gray-50 text-center">
                        <SchoolIcon className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No applications found</p>
                    </div>
                ) : (
                    registrations.map((reg) => (
                        <div key={reg.id} className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-900 flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <AcademicCapIcon className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-black text-gray-900 text-lg leading-tight">{reg.firstName} {reg.lastName}</h3>
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${reg.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' :
                                                reg.status === 'REJECTED' ? 'bg-red-50 text-red-600' :
                                                    'bg-amber-50 text-amber-600'
                                                }`}>
                                                {reg.status || 'PENDING'}
                                            </span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-[10px] font-black text-purple-900 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded mr-2">
                                                PRIVATE
                                            </span>
                                            <span className="text-[10px] font-black text-blue-900 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                                                Course: {reg.course?.title || 'Unknown Course'}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-bold text-gray-400">
                                            <span className="flex items-center gap-1"><ClockIcon className="w-3.5 h-3.5" /> {new Date(reg.createdAt).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1 font-black text-gray-600 uppercase tracking-widest">{reg.profession}</span>
                                            <span className="flex items-center gap-1"><EnvelopeIcon className="w-3.5 h-3.5" /> {reg.email}</span>
                                            <span className="flex items-center gap-1"><PhoneIcon className="w-3.5 h-3.5" /> {reg.phone}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="flex-1 md:flex-none px-6 py-3 bg-gray-50 hover:bg-purple-900 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">View Details</button>
                                    <button
                                        onClick={() => handleStatusUpdate(reg.id, 'APPROVED')}
                                        className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                    >
                                        <CheckCircleIcon className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(reg.id, 'REJECTED')}
                                        className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                    >
                                        <XCircleIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
