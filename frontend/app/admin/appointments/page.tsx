'use client';

import { useState, useEffect } from 'react';
import { appointmentsAPI } from '@/lib/api';
import {
    CalendarIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    PhoneIcon,
    EnvelopeIcon,
    MagnifyingGlassIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

export default function AdminAppointmentsPage() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('PENDING');

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const res = await appointmentsAPI.getAll({ status: filter !== 'ALL' ? filter : undefined });
            setAppointments(res.data.appointments || []);
        } catch {
            setAppointments([
                { id: '1', firstName: 'Abebe', lastName: 'Bekele', email: 'abebe@example.com', phone: '0911223344', department: 'Adult Psychiatry', date: '2024-05-20', time: '9:00 AM', status: 'PENDING', createdAt: new Date().toISOString() },
                { id: '2', firstName: 'Hana', lastName: 'Girma', email: 'hana@example.com', phone: '0988776655', department: 'Child Psychiatry', date: '2024-05-21', time: '10:30 AM', status: 'CONFIRMED', createdAt: new Date().toISOString() },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [filter]);

    const updateStatus = async (id: string, status: string) => {
        try {
            await appointmentsAPI.updateStatus(id, status);
            fetchAppointments();
        } catch {
            alert('Failed to update status');
        }
    };

    const statusColors: any = {
        PENDING: 'bg-amber-100 text-amber-700 border-amber-200',
        CONFIRMED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        CANCELLED: 'bg-red-100 text-red-700 border-red-200',
        COMPLETED: 'bg-blue-100 text-blue-700 border-blue-200',
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Appointments</h2>
                    <p className="text-gray-500 text-sm">Review and manage patient appointment requests.</p>
                </div>
                <div className="flex items-center gap-2 p-1 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'].map((s) => (
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

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-pulse flex gap-6">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl" />
                            <div className="flex-1 space-y-3">
                                <div className="h-5 bg-gray-100 rounded w-1/4" />
                                <div className="h-4 bg-gray-100 rounded w-1/2" />
                            </div>
                        </div>
                    ))
                ) : appointments.length === 0 ? (
                    <div className="bg-white py-20 rounded-3xl border border-gray-100 text-center">
                        <div className="text-6xl mb-4">📅</div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No {filter.toLowerCase()} appointments</p>
                    </div>
                ) : (
                    appointments.map((appt) => (
                        <div key={appt.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col lg:flex-row gap-6 lg:items-center">
                            {/* Date Block */}
                            <div className="flex flex-col items-center justify-center w-20 h-20 bg-blue-50 rounded-2xl text-blue-900 border border-blue-100 flex-shrink-0">
                                <span className="text-xs font-black uppercase tracking-tighter">
                                    {new Date(appt.date).toLocaleDateString(undefined, { month: 'short' })}
                                </span>
                                <span className="text-2xl font-black">
                                    {new Date(appt.date).getDate()}
                                </span>
                            </div>

                            {/* Patient Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-black text-gray-900 text-lg truncate">
                                        {appt.firstName} {appt.lastName}
                                    </h3>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border uppercase tracking-wider ${statusColors[appt.status]}`}>
                                        {appt.status}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                    <span className="flex items-center gap-1.5"><ClockIcon className="w-4 h-4 text-blue-900" /> {appt.time}</span>
                                    <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4 text-blue-900" /> {appt.department}</span>
                                    <span className="flex items-center gap-1.5"><PhoneIcon className="w-4 h-4 text-gray-400" /> {appt.phone}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex lg:flex-col items-center gap-2 border-t lg:border-t-0 lg:border-l border-gray-50 pt-4 lg:pt-0 lg:pl-6">
                                {appt.status === 'PENDING' && (
                                    <>
                                        <button
                                            onClick={() => updateStatus(appt.id, 'CONFIRMED')}
                                            className="flex-1 lg:w-32 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                        >
                                            <CheckCircleIcon className="w-4 h-4" /> Confirm
                                        </button>
                                        <button
                                            onClick={() => updateStatus(appt.id, 'CANCELLED')}
                                            className="flex-1 lg:w-32 py-2 bg-white border border-red-50 text-red-600 hover:bg-red-50 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                        >
                                            <XCircleIcon className="w-4 h-4" /> Cancel
                                        </button>
                                    </>
                                )}
                                {appt.status === 'CONFIRMED' && (
                                    <button
                                        onClick={() => updateStatus(appt.id, 'COMPLETED')}
                                        className="flex-1 lg:w-32 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                                    >
                                        Mark Done
                                    </button>
                                )}
                                <button className="p-2 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
