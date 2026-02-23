'use client';

import { useState, useEffect } from 'react';
import { usersAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import {
    UserPlusIcon,
    ShieldCheckIcon,
    PencilSquareIcon,
    TrashIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';

export default function AdminUsersPage() {
    const { isSuperAdmin } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', role: 'EDITOR', password: '' });

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await usersAPI.getAll();
            setUsers(res.data.users || []);
        } catch {
            setUsers([
                { id: '1', name: 'Super Admin', email: 'admin@amsh.gov.et', role: 'SUPER_ADMIN', lastLogin: new Date().toISOString() },
                { id: '2', name: 'Editor One', email: 'editor@amsh.gov.et', role: 'EDITOR', lastLogin: new Date().toISOString() },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await usersAPI.create(form);
            setIsModalOpen(false);
            fetchUsers();
            setForm({ name: '', email: '', role: 'EDITOR', password: '' });
        } catch {
            alert('Failed to create user');
        }
    };

    if (!isSuperAdmin) return <div className="p-20 text-center font-black text-red-600">ACCESS DENIED. SUPER ADMIN ONLY.</div>;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Admin User Management</h2>
                    <p className="text-gray-500 text-sm">Create and manage access levels for AMSH backend staff.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                    <UserPlusIcon className="w-5 h-5" />
                    <span>Add New Admin</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-pulse h-48" />
                    ))
                ) : (
                    users.map((user) => (
                        <div key={user.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden relative">
                            {/* Badge */}
                            <div className={`absolute -top-1 -right-1 px-4 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${user.role === 'SUPER_ADMIN' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {user.role}
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-lg">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900">{user.name}</h3>
                                    <p className="text-xs font-medium text-gray-400">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                    <ShieldCheckIcon className="w-4 h-4 text-blue-900" />
                                    <span>Permissions: Full Access</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                    <KeyIcon className="w-4 h-4 text-gray-400" />
                                    <span>Last Login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-black text-gray-600 uppercase tracking-widest transition-all">Edit Profile</button>
                                <button className="p-2 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><TrashIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up">
                        <div className="bg-blue-900 p-8 text-white text-center">
                            <h3 className="text-2xl font-black">Add New Admin User</h3>
                            <p className="text-blue-200 text-sm mt-1">Grant backend access to a team member</p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Display Name</label>
                                <input required className="form-input" placeholder="e.g. Dr. Almaz" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Email Address</label>
                                <input required type="email" className="form-input" placeholder="email@amsh.gov.et" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Access Role</label>
                                <select className="form-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                                    <option value="EDITOR">Editor (Content Only)</option>
                                    <option value="ADMIN">Admin (Content + Settings)</option>
                                    <option value="SUPER_ADMIN">Super Admin (Full Access)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Initial Password</label>
                                <input required type="password" className="form-input" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-50 text-gray-500 font-black rounded-2xl uppercase tracking-widest text-xs">Cancel</button>
                                <button type="submit" className="flex-1 py-4 bg-blue-900 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-lg shadow-blue-900/20">Create User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
