'use client';

import { useState, useEffect } from 'react';
import { usersAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import {
    UserPlusIcon,
    KeyIcon,
    TrashIcon,
    PencilSquareIcon,
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// ─── Roles (matched to real AMSH admin sections) ─────────────────────────────

const ROLES = [
    {
        value: 'SUPER_ADMIN',
        label: 'Super Admin',
        description: 'Full access — all modules, settings & user management',
        color: 'from-violet-600 to-purple-700',
        badge: 'bg-violet-100 text-violet-800',
        icon: '👑',
    },
    {
        value: 'CPD_ADMIN',
        label: 'CPD Training Admin',
        description: 'Manage Gov, Private & Independent CPD applications',
        color: 'from-blue-600 to-indigo-700',
        badge: 'bg-blue-100 text-blue-800',
        icon: '🎓',
    },
    {
        value: 'CLINICAL_ADMIN',
        label: 'Clinical Attachment Admin',
        description: 'Handle Gov, Private & Personal clinical attachments',
        color: 'from-orange-500 to-amber-600',
        badge: 'bg-orange-100 text-orange-800',
        icon: '🏥',
    },
    {
        value: 'RESEARCH_ADMIN',
        label: 'Research Admin',
        description: 'Review, approve and publish research submissions',
        color: 'from-emerald-600 to-teal-700',
        badge: 'bg-emerald-100 text-emerald-800',
        icon: '🔬',
    },
    {
        value: 'NEWS_ADMIN',
        label: 'News & Posts Admin',
        description: 'Create, edit and publish hospital news articles',
        color: 'from-rose-500 to-pink-600',
        badge: 'bg-rose-100 text-rose-800',
        icon: '📰',
    },
    {
        value: 'CONTACT_ADMIN',
        label: 'Contact & Appointments Admin',
        description: 'Manage contact messages and appointment requests',
        color: 'from-cyan-500 to-sky-600',
        badge: 'bg-cyan-100 text-cyan-800',
        icon: '✉️',
    },
    {
        value: 'CONTENT_ADMIN',
        label: 'Content Admin',
        description: 'Manage departments, services, FAQs & testimonials',
        color: 'from-fuchsia-500 to-purple-600',
        badge: 'bg-fuchsia-100 text-fuchsia-800',
        icon: '📋',
    },
];

// ─── Default permissions per role (pre-checked when role is selected) ─────────

const DEFAULT_PERMISSIONS: Record<string, string[]> = {
    SUPER_ADMIN: ['posts', 'cpd', 'clinical', 'research', 'appointments', 'contact', 'departments', 'faqs', 'media', 'pages', 'navigation', 'settings', 'users'],
    CPD_ADMIN: ['cpd', 'media'],
    CLINICAL_ADMIN: ['clinical', 'appointments', 'contact'],
    RESEARCH_ADMIN: ['research', 'media'],
    NEWS_ADMIN: ['posts', 'media'],
    CONTACT_ADMIN: ['contact', 'appointments'],
    CONTENT_ADMIN: ['departments', 'faqs', 'media'],
};

// ─── All modules matching the actual AMSH admin sidebar ───────────────────────

const ALL_MODULES = [
    { key: 'posts', label: 'Posts & News', desc: '/admin/posts — Create and publish hospital news', icon: '📰', group: 'Content' },
    { key: 'media', label: 'Media Library', desc: '/admin/media — Upload and organise all media files', icon: '🖼️', group: 'Content' },
    { key: 'pages', label: 'Pages & Builder', desc: '/admin/pages — Visual page builder for static pages', icon: '🌐', group: 'Content' },
    { key: 'navigation', label: 'Navigation', desc: '/admin/navigation — Header & footer menu structure', icon: '🧭', group: 'Content' },
    { key: 'cpd', label: 'CPD Applications', desc: '/admin/cpd-applications — Gov, Private & Independent', icon: '🎓', group: 'Management' },
    { key: 'clinical', label: 'Clinical Attachments', desc: '/admin/clinical-attachments — All attachment types', icon: '🏥', group: 'Management' },
    { key: 'departments', label: 'Departments & Services', desc: '/admin/departments — Hospital departments & services', icon: '🏢', group: 'Management' },
    { key: 'research', label: 'Research Submissions', desc: '/admin/research — Review and approve research papers', icon: '🔬', group: 'Interactions' },
    { key: 'appointments', label: 'Appointments', desc: '/admin/appointments — View and update appointment status', icon: '📅', group: 'Interactions' },
    { key: 'contact', label: 'Contact Messages', desc: '/admin/messages — View incoming contact messages', icon: '✉️', group: 'Interactions' },
    { key: 'faqs', label: 'FAQs & Testimonials', desc: '/admin/faqs — Manage FAQs and testimonial entries', icon: '💬', group: 'System' },
    { key: 'settings', label: 'Site Settings', desc: '/admin/settings — SEO, integrations, general config', icon: '⚙️', group: 'System' },
    { key: 'users', label: 'User Management', desc: '/admin/users — Add and manage admin accounts', icon: '👥', group: 'System' },
];

const MODULE_GROUPS = ['Content', 'Management', 'Interactions', 'System'];

const getRoleInfo = (role: string) => ROLES.find(r => r.value === role) ?? ROLES[0];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminUsersPage() {
    const { isSuperAdmin, user: me } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<any | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

    const [form, setForm] = useState({
        name: '',
        email: '',
        role: 'NEWS_ADMIN',
        password: '',
        permissions: DEFAULT_PERMISSIONS['NEWS_ADMIN'] ?? [],
    });

    const handleRoleChange = (role: string) => {
        setForm(f => ({ ...f, role, permissions: DEFAULT_PERMISSIONS[role] ?? [] }));
    };

    const togglePerm = (key: string) => {
        setForm(f => ({
            ...f,
            permissions: f.permissions.includes(key)
                ? f.permissions.filter(p => p !== key)
                : [...f.permissions, key],
        }));
    };

    const showToast = (msg: string, type: 'ok' | 'err') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await usersAPI.getAll();
            setUsers(res.data.users || []);
        } catch {
            setUsers([
                {
                    id: '1',
                    name: 'AMSH Administrator',
                    email: 'admin@amsh.gov.et',
                    role: 'SUPER_ADMIN',
                    isActive: true,
                    lastLogin: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const openCreate = () => {
        setEditUser(null);
        setForm({ name: '', email: '', role: 'NEWS_ADMIN', password: '', permissions: DEFAULT_PERMISSIONS['NEWS_ADMIN'] ?? [] });
        setIsModalOpen(true);
    };

    const openEdit = (user: any) => {
        setEditUser(user);
        setForm({ name: user.name, email: user.email, role: user.role, password: '', permissions: DEFAULT_PERMISSIONS[user.role] ?? [] });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editUser) {
                await usersAPI.update(editUser.id, { name: form.name, role: form.role, isActive: editUser.isActive });
                showToast('User updated successfully.', 'ok');
            } else {
                await usersAPI.create({ name: form.name, email: form.email, password: form.password, role: form.role });
                showToast('Admin user created successfully.', 'ok');
            }
            setIsModalOpen(false);
            fetchUsers();
        } catch (err: any) {
            showToast(err?.response?.data?.error || 'Operation failed.', 'err');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await usersAPI.delete(deleteTarget.id);
            showToast('User deleted.', 'ok');
            setDeleteTarget(null);
            fetchUsers();
        } catch {
            showToast('Failed to delete user.', 'err');
        }
    };

    if (!isSuperAdmin) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center p-12 bg-red-50 rounded-3xl border border-red-100">
                    <ExclamationTriangleIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-red-600 uppercase tracking-widest">Access Denied</h3>
                    <p className="text-sm text-red-400 mt-2">This section is restricted to Super Admins only.</p>
                </div>
            </div>
        );
    }

    const roleInfo = getRoleInfo(form.role);

    return (
        <div className="space-y-8 animate-fade-in">

            {/* ── Toast ── */}
            {toast && (
                <div className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm animate-fade-in-up ${toast.type === 'ok' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                    {toast.type === 'ok' ? <CheckIcon className="w-5 h-5" /> : <ExclamationTriangleIcon className="w-5 h-5" />}
                    {toast.msg}
                </div>
            )}

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Admin User Management</h2>
                    <p className="text-gray-400 text-sm mt-1">Create role-based access for AMSH backend staff.</p>
                </div>
                <button onClick={openCreate} className="btn-primary">
                    <UserPlusIcon className="w-5 h-5" />
                    <span>Add New Admin</span>
                </button>
            </div>

            {/* ── Role Count Strip ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {ROLES.map(role => (
                    <div key={role.value} className={`bg-gradient-to-br ${role.color} p-4 rounded-2xl text-white text-center shadow-sm`}>
                        <div className="text-xl mb-1">{role.icon}</div>
                        <div className="text-[9px] font-black uppercase tracking-widest opacity-80 leading-tight">{role.label.replace(' Admin', '').replace(' & Appointments', '')}</div>
                        <div className="text-2xl font-black mt-1">{users.filter(u => u.role === role.value).length}</div>
                    </div>
                ))}
            </div>

            {/* ── Users Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-pulse h-64" />
                    ))
                ) : users.length === 0 ? (
                    <div className="col-span-3 text-center p-20 text-gray-400 font-bold">No admin users found.</div>
                ) : (
                    users.map(user => {
                        const ri = getRoleInfo(user.role);
                        const perms = (DEFAULT_PERMISSIONS[user.role] ?? [])
                            .map(key => ALL_MODULES.find(m => m.key === key))
                            .filter(Boolean) as typeof ALL_MODULES;

                        return (
                            <div key={user.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                                <div className={`h-2 bg-gradient-to-r ${ri.color}`} />
                                <div className="p-7">
                                    {/* Info */}
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ri.color} flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0`}>
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-black text-gray-900 leading-tight">{user.name}</h3>
                                                <p className="text-xs font-medium text-gray-400 mt-0.5 truncate max-w-[160px]">{user.email}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${ri.badge} flex items-center gap-1`}>
                                            {ri.icon} {ri.label.replace(' Admin', '')}
                                        </span>
                                    </div>

                                    {/* Module access */}
                                    <div className="mb-5">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Module Access</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {perms.length === 0 && <span className="text-xs text-gray-400">No modules assigned.</span>}
                                            {perms.map(p => (
                                                <span key={p.key} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-100">
                                                    <span>{p.icon}</span> {p.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Meta */}
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-5">
                                        <span className="flex items-center gap-1.5">
                                            <KeyIcon className="w-3.5 h-3.5" />
                                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('en-GB') : 'Never'}
                                        </span>
                                        <span className={`flex items-center gap-1.5 ${user.isActive ? 'text-emerald-500' : 'text-red-400'}`}>
                                            <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-emerald-500' : 'bg-red-400'}`} />
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(user)} className="flex-1 py-2.5 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl text-xs font-black text-gray-500 uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                            <PencilSquareIcon className="w-4 h-4" /> Edit
                                        </button>
                                        {user.id !== me?.id && (
                                            <button onClick={() => setDeleteTarget(user)} className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* ── Create / Edit Modal ── */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="absolute inset-0 bg-[#0B1224]/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-2xl z-10 overflow-hidden animate-fade-in-up my-8">

                        {/* Modal Header */}
                        <div className={`bg-gradient-to-br ${roleInfo.color} p-8 text-white relative`}>
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                                <XMarkIcon className="w-5 h-5 text-white" />
                            </button>
                            <div className="text-3xl mb-2">{roleInfo.icon}</div>
                            <h3 className="text-xl font-black">{editUser ? 'Edit Admin User' : 'Add New Admin User'}</h3>
                            <p className="text-white/60 text-sm mt-1">
                                {editUser ? 'Update role and access level' : 'Grant backend access to an AMSH staff member'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-7">
                            {/* Basic Fields Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Display Name</label>
                                    <input required className="form-input" placeholder="e.g. Dr. Almaz Tesfaye" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                {!editUser && (
                                    <div>
                                        <label className="form-label">Email Address</label>
                                        <input required type="email" className="form-input" placeholder="email@amsh.gov.et" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                    </div>
                                )}
                                {!editUser && (
                                    <div className={!editUser ? '' : 'sm:col-span-2'}>
                                        <label className="form-label">Initial Password</label>
                                        <input required type="password" className="form-input" placeholder="Min. 8 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} minLength={8} />
                                    </div>
                                )}
                            </div>

                            {/* Role Picker */}
                            <div>
                                <label className="form-label">Admin Role</label>

                                {/* Super Admin — top tier */}
                                <div className="mb-3">
                                    <p className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-2">👑 Top-Level Access</p>
                                    <button
                                        type="button"
                                        onClick={() => handleRoleChange('SUPER_ADMIN')}
                                        className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl border-2 text-left transition-all ${form.role === 'SUPER_ADMIN' ? 'border-transparent bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg' : 'border-violet-100 bg-violet-50 text-violet-700 hover:border-violet-200'}`}
                                    >
                                        <span className="text-2xl">👑</span>
                                        <div className="flex-1">
                                            <div className="text-[12px] font-black uppercase tracking-wide">Super Admin</div>
                                            <div className={`text-[10px] mt-0.5 ${form.role === 'SUPER_ADMIN' ? 'text-violet-200' : 'text-violet-400'}`}>Full unrestricted access — all modules & user management</div>
                                        </div>
                                        {form.role === 'SUPER_ADMIN' && <CheckIcon className="w-5 h-5 shrink-0" />}
                                    </button>
                                </div>

                                {/* Specialized roles */}
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">🔧 Specialized Roles</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {ROLES.filter(r => r.value !== 'SUPER_ADMIN').map(role => (
                                        <button
                                            key={role.value}
                                            type="button"
                                            onClick={() => handleRoleChange(role.value)}
                                            className={`flex items-center gap-2.5 px-4 py-3.5 rounded-2xl border-2 text-left transition-all ${form.role === role.value ? `border-transparent bg-gradient-to-r ${role.color} text-white shadow-lg` : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'}`}
                                        >
                                            <span className="text-lg shrink-0">{role.icon}</span>
                                            <div className="min-w-0">
                                                <div className="text-[10px] font-black uppercase leading-tight tracking-wide truncate">{role.label.replace(' Admin', '').replace(' & Appointments', '')}</div>
                                                <div className={`text-[9px] mt-0.5 leading-tight ${form.role === role.value ? 'text-white/60' : 'text-gray-400'} line-clamp-2`}>{role.description}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Permissions — all modules grouped, all toggleable */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="form-label m-0">Module Access Granted</label>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => setForm(f => ({ ...f, permissions: ALL_MODULES.map(m => m.key) }))} className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:underline">Select All</button>
                                        <span className="text-gray-200 text-xs">|</span>
                                        <button type="button" onClick={() => setForm(f => ({ ...f, permissions: [] }))} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:underline">Clear</button>
                                    </div>
                                </div>

                                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                                    {MODULE_GROUPS.map(group => {
                                        const groupModules = ALL_MODULES.filter(m => m.group === group);
                                        return (
                                            <div key={group}>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">{group}</p>
                                                <div className="space-y-1.5">
                                                    {groupModules.map(p => (
                                                        <button
                                                            key={p.key}
                                                            type="button"
                                                            onClick={() => togglePerm(p.key)}
                                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all border ${form.permissions.includes(p.key) ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200'}`}
                                                        >
                                                            <span className="text-base shrink-0">{p.icon}</span>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-[11px] font-black uppercase tracking-wider">{p.label}</div>
                                                                <div className="text-[10px] text-gray-400 mt-0.5 truncate">{p.desc}</div>
                                                            </div>
                                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${form.permissions.includes(p.key) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-200'}`}>
                                                                {form.permissions.includes(p.key) && <CheckIcon className="w-3 h-3 text-white" />}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-[10px] text-gray-400 mt-2 ml-1">{form.permissions.length} of {ALL_MODULES.length} modules granted</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-1">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-50 text-gray-500 font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-gray-100 transition-all">
                                    Cancel
                                </button>
                                <button type="submit" disabled={saving} className={`flex-1 py-4 text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-lg transition-all bg-gradient-to-r ${roleInfo.color} hover:opacity-90 disabled:opacity-50`}>
                                    {saving ? 'Saving...' : editUser ? 'Update User' : 'Create Admin'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Delete Confirm ── */}
            {deleteTarget && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0B1224]/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
                    <div className="relative bg-white rounded-[28px] shadow-2xl w-full max-w-sm z-10 p-8 text-center animate-fade-in-up">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900">Delete User?</h3>
                        <p className="text-sm text-gray-400 mt-2">This will permanently remove <strong className="text-gray-700">{deleteTarget.name}</strong>. This action cannot be undone.</p>
                        <div className="flex gap-3 mt-8">
                            <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3.5 bg-gray-50 text-gray-500 font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-gray-100 transition-all">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 py-3.5 bg-red-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-red-700 transition-all">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
