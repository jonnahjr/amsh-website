'use client';

import { institutionsAPI } from '@/lib/api';
import {
    AcademicCapIcon,
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function InstitutionAdmin() {
    const [institutions, setInstitutions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mouStart: '',
        status: 'Approved'
    });
    const [editingItem, setEditingItem] = useState<any>(null);

    const fetchInstitutions = async () => {
        setLoading(true);
        try {
            const res = await institutionsAPI.getAdminAll();
            const data = (res.data || []).map((inst: any) => {
                let daysLeft = 0;
                if (inst.mouEnd) {
                    const end = new Date(inst.mouEnd);
                    const now = new Date();
                    const diffTime = end.getTime() - now.getTime();
                    daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                }
                return {
                    ...inst,
                    daysLeft,
                    isExpired: daysLeft <= 0 || inst.status === 'Expired'
                };
            });
            setInstitutions(data);
        } catch (error) {
            console.error('Fetch institutions error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstitutions();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await institutionsAPI.create(formData);
            setIsAddModalOpen(false);
            setFormData({ name: '', mouStart: '', status: 'Approved' });
            fetchInstitutions();
        } catch (error) {
            console.error('Add failed:', error);
            alert('Failed to add institution.');
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await institutionsAPI.update(editingItem.id, editingItem);
            setIsEditModalOpen(false);
            fetchInstitutions();
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update institution.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this institution?')) return;
        try {
            await institutionsAPI.delete(id);
            fetchInstitutions();
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete institution.');
        }
    };

    if (loading && institutions.length === 0) {
        return <div className="p-8 text-center animate-pulse">Loading institutions...</div>;
    }

    return (
        <div className="p-8 space-y-8 bg-[#FAFAFA] min-h-screen">
             {/* Header */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Institutional Partners</h1>
                    <p className="text-gray-500 text-sm font-medium italic">Manage University & College MOUs and expiry tracking.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-900 text-white px-6 py-4 rounded-[20px] font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition-all hover:-translate-y-0.5"
                >
                    <PlusIcon className="w-5 h-5" /> Add New Institution
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-7 rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-3xl flex items-center justify-center">
                        <AcademicCapIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Partners</p>
                        <p className="text-2xl font-black text-gray-900 leading-none mt-1">{institutions.length}</p>
                    </div>
                </div>
                <div className="bg-white p-7 rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-900 rounded-3xl flex items-center justify-center">
                        <CheckCircleIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-[10px) font-black text-gray-400 uppercase tracking-widest">Active MOUs</p>
                        <p className="text-2xl font-black text-emerald-600 leading-none mt-1">{institutions.filter(i => !i.isExpired).length}</p>
                    </div>
                </div>
                <div className="bg-white p-7 rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-red-50 text-red-900 rounded-3xl flex items-center justify-center">
                        <ExclamationTriangleIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expired / Review</p>
                        <p className="text-2xl font-black text-red-600 leading-none mt-1">{institutions.filter(i => i.isExpired || i.daysLeft < 30).length}</p>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-[48px] border border-gray-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Institution Name</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">MOU Validity Period</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Time Remaining</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {institutions.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-10 py-8">
                                        <p className="font-black text-gray-900 text-sm uppercase tracking-tighter">{item.name}</p>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-1.5">
                                            <p className="text-[11px] font-bold text-gray-500 flex items-center gap-2">
                                                <CalendarIcon className="w-4 h-4 text-gray-300" /> 
                                                <span className="text-gray-900">{new Date(item.mouStart).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span> 
                                                <span className="text-gray-300">to</span> 
                                                <span className="text-gray-900">{new Date(item.mouEnd).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2">
                                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                item.daysLeft > 60 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                item.daysLeft > 0 ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 'bg-red-50 text-red-700 border-red-100'
                                            }`}>
                                                <div className="flex items-center gap-1.5">
                                                    <ClockIcon className="w-3.5 h-3.5" />
                                                    {item.daysLeft} Days Left
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-2 ${
                                            item.status === 'Approved' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' :
                                            item.status === 'Expired' ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20'
                                        }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full bg-white opacity-60`} />
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button 
                                                onClick={() => {
                                                    setEditingItem(item);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="p-3 bg-white text-gray-400 border border-gray-100 hover:border-blue-500 hover:text-blue-950 rounded-2xl shadow-sm transition-all hover:scale-105"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="p-3 bg-white text-gray-400 border border-gray-100 hover:border-red-500 hover:text-red-950 rounded-2xl shadow-sm transition-all hover:scale-105"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md transition-all">
                    <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-blue-950 text-white">
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tighter">Add Institution</h2>
                                <p className="text-blue-200/50 text-[10px] font-bold uppercase tracking-widest mt-1">Expiry = Start + 2 Years</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><XMarkIcon className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleAdd} className="p-10 space-y-7">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">College/University Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter full legal name"
                                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-[24px] transition-all font-bold text-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">MOU Commencement Date</label>
                                <input
                                    required
                                    type="date"
                                    value={formData.mouStart}
                                    onChange={(e) => setFormData({ ...formData, mouStart: e.target.value })}
                                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-[24px] transition-all font-bold text-sm"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-[24px] transition-all font-bold text-sm"
                                >
                                    <option value="Approved">Approved</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Expired">Expired</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full bg-blue-950 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-blue-950/20 hover:-translate-y-1 transition-all">
                                Finalize Registration
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md transition-all">
                    <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-blue-950 text-white">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Edit Record</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><XMarkIcon className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleEdit} className="p-10 space-y-7">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Institutional Name</label>
                                <input
                                    required
                                    type="text"
                                    value={editingItem.name}
                                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-[24px] transition-all font-bold text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={editingItem.mouStart.split('T')[0]}
                                        onChange={(e) => setEditingItem({ ...editingItem, mouStart: e.target.value })}
                                        className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-[24px] transition-all font-bold text-sm"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">End Date</label>
                                    <input
                                        type="date"
                                        value={editingItem.mouEnd.split('T')[0]}
                                        onChange={(e) => setEditingItem({ ...editingItem, mouEnd: e.target.value })}
                                        className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-[24px] transition-all font-bold text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status Override</label>
                                <select
                                    value={editingItem.status}
                                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-[24px] transition-all font-bold text-sm"
                                >
                                    <option value="Approved">Approved (Active)</option>
                                    <option value="Pending">Pending Review</option>
                                    <option value="Expired">Force Expired</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full bg-blue-950 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-blue-950/20 hover:-translate-y-1 transition-all">
                                Update Partnership Data
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
