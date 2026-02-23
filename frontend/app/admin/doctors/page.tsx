'use client';

import { useState, useEffect } from 'react';
import { doctorsAPI, departmentsAPI } from '@/lib/api';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';

export default function AdminDoctorsPage() {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [docRes, deptRes] = await Promise.all([
                doctorsAPI.getAll({ search }),
                departmentsAPI.getAll()
            ]);
            setDoctors(docRes.data.doctors || []);
            setDepartments(deptRes.data.departments || []);
        } catch {
            setDoctors([
                { id: '1', name: 'Dr. Zelalem G.', specialization: 'Adult Psychiatrist', department: { name: 'Adult Psychiatry' }, isDepartmentHead: true },
                { id: '2', name: 'Dr. Hana W.', specialization: 'Child Psychiatrist', department: { name: 'Child Psychiatry' }, isDepartmentHead: false },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [search]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Medical Staff</h2>
                    <p className="text-gray-500 text-sm">Manage doctor profiles, specializations, and departmental leadership.</p>
                </div>
                <button className="btn-primary">
                    <PlusIcon className="w-5 h-5" />
                    <span>Add New Doctor</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search doctors by name or specialization..."
                        className="w-full pl-11 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-900"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-64 animate-pulse" />
                    ))
                ) : (
                    doctors.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                            {doc.isDepartmentHead && (
                                <div className="absolute top-0 right-0 bg-gold px-3 py-1 rounded-bl-xl text-[8px] font-black text-white uppercase tracking-widest">
                                    Dept Head
                                </div>
                            )}

                            <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-900 text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                                {doc.image ? <img src={doc.image} className="w-full h-full object-cover rounded-2xl" /> : <UserCircleIcon className="w-12 h-12" />}
                            </div>

                            <h3 className="font-black text-gray-900 text-lg leading-tight">{doc.name}</h3>
                            <p className="text-blue-900 font-bold text-[10px] uppercase tracking-wider mt-1">{doc.specialization}</p>
                            <div className="mt-3 px-3 py-1 bg-gray-50 rounded-full inline-block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                {doc.department?.name || 'Unassigned'}
                            </div>

                            <div className="mt-6 flex items-center gap-2 pt-4 border-t border-gray-50">
                                <button className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                                    <PencilIcon className="w-3 h-3" /> Edit
                                </button>
                                <button className="p-2 text-gray-300 hover:text-red-500 rounded-xl transition-colors">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
