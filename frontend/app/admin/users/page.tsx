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
    SparklesIcon,
    ShieldCheckIcon,
    FingerPrintIcon,
    UserGroupIcon,
    LockClosedIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const ROLES = [
    {
        value: 'SUPER_ADMIN',
        label: 'Super Admin',
        description: 'Global authority — root access to all core systems & users',
        color: 'from-violet-600 to-indigo-700',
        badge: 'bg-violet-50 text-violet-600 border-violet-100',
        icon: '👑',
    },
    {
        value: 'CPD_ADMIN',
        label: 'CPD Training',
        description: 'Managing governmental and private sector CPD applications',
        color: 'from-blue-600 to-cyan-700',
        badge: 'bg-blue-50 text-blue-600 border-blue-100',
        icon: '🎓',
    },
    {
        value: 'CLINICAL_ADMIN',
        label: 'Clinical Intake',
        description: 'Regulating clinical attachments and medical placements',
        color: 'from-amber-500 to-orange-600',
        badge: 'bg-amber-50 text-amber-600 border-amber-100',
        icon: '🏥',
    },
    {
        value: 'RESEARCH_ADMIN',
        label: 'Research Lab',
        description: 'Reviewing and validating institutional research submissions',
        color: 'from-emerald-600 to-teal-700',
        badge: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        icon: '🔬',
    },
    {
        value: 'NEWS_ADMIN',
        label: 'News & Media',
        description: 'Broadcasting hospital updates and editorial content',
        color: 'from-rose-500 to-pink-600',
        badge: 'bg-rose-50 text-rose-600 border-rose-100',
        icon: '📰',
    },
    {
        value: 'CONTACT_ADMIN',
        label: 'Contact Response Manager',
        description: 'Handling official institutional communications and inquiry streams',
        color: 'from-sky-500 to-blue-600',
        badge: 'bg-sky-50 text-sky-600 border-sky-100',
        icon: '✉️',
    },
    {
        value: 'CONTENT_ADMIN',
        label: 'Core Assets',
        description: 'Managing departments, services and static hospital data',
        color: 'from-fuchsia-500 to-purple-600',
        badge: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100',
        icon: '📋',
    },
];

const DEFAULT_PERMISSIONS: Record<string, string[]> = {
    SUPER_ADMIN: ['posts', 'cpd', 'clinical', 'research', 'contact', 'departments', 'faqs', 'media', 'pages', 'navigation', 'settings', 'users'],
    CPD_ADMIN: ['cpd', 'media'],
    CLINICAL_ADMIN: ['clinical', 'contact'],
    RESEARCH_ADMIN: ['research', 'media'],
    NEWS_ADMIN: ['posts', 'media'],
    CONTACT_ADMIN: ['contact'],
    CONTENT_ADMIN: ['departments', 'faqs', 'media'],
};

const ALL_MODULES = [
    { key: 'posts', label: 'News Broadcasts', desc: 'Narrative and media publication', icon: '📰', group: 'Narrative Control' },
    { key: 'media', label: 'Media Bank', desc: 'Centralized asset management', icon: '🖼️', group: 'Narrative Control' },
    { key: 'pages', label: 'Site Canvas', desc: 'Visual architecture of core pages', icon: '🌐', group: 'Narrative Control' },
    { key: 'navigation', label: 'Navigation', desc: 'Structural menu hierarchies', icon: '🧭', group: 'Narrative Control' },
    { key: 'cpd', label: 'CPD Training', desc: 'Educational application lifecycle', icon: '🎓', group: 'Strategic Intel' },
    { key: 'clinical', label: 'Clinical Intake', desc: 'Placement and verification cycles', icon: '🏥', group: 'Strategic Intel' },
    { key: 'departments', label: 'Structural Hubs', desc: 'Dept and service infrastructure', icon: '🏢', group: 'Strategic Intel' },
    { key: 'research', label: 'Research Lab', desc: 'Validation of scientific data', icon: '🔬', group: 'Engagement' },
    { key: 'contact', label: 'Contact Response Manage', desc: 'Global communication streams', icon: '✉️', group: 'Engagement' },
    { key: 'faqs', label: 'Static Data', desc: 'FAQs and validation testimonials', icon: '💬', group: 'Core Engine' },
    { key: 'settings', label: 'Engine Config', desc: 'System-wide parameter tuning', icon: '⚙️', group: 'Core Engine' },
    { key: 'users', label: 'Access Control', desc: 'Authentication and authorization', icon: '👥', group: 'Core Engine' },
];

const MODULE_GROUPS = ['Narrative Control', 'Strategic Intel', 'Engagement', 'Core Engine'];

const getRoleInfo = (role: string) => ROLES.find(r => r.value === role) ?? ROLES[0];

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
                showToast('Personnel parameters synchronized.', 'ok');
            } else {
                await usersAPI.create({ name: form.name, email: form.email, password: form.password, role: form.role });
                showToast('New operator authorized.', 'ok');
            }
            setIsModalOpen(false);
            fetchUsers();
        } catch (err: any) {
            showToast(err?.response?.data?.error || 'Authorization protocol failure.', 'err');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await usersAPI.delete(deleteTarget.id);
            showToast('Operator de-authorized.', 'ok');
            setDeleteTarget(null);
            fetchUsers();
        } catch {
            showToast('Termination protocol failed.', 'err');
        }
    };

    if (!isSuperAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-10">
                <div className="w-24 h-24 bg-red-50 rounded-[2rem] flex items-center justify-center mb-8 border border-red-100/50 shadow-inner">
                    <FingerPrintIcon className="w-12 h-12 text-red-400" />
                </div>
                <h3 className="text-3xl font-jakarta font-black text-slate-900 mb-2">Unauthorized Terminal Exponent</h3>
                <p className="text-slate-400 font-bold uppercase tracking-[0.25em] text-[10px] text-center max-w-sm">Access to the access control matrix is restricted to Tier-1 operators only.</p>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Header / Command Strip */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <ShieldCheckIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Identity & Authorization Hub</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none mb-6">Security Permissions</h2>
                    <p className="text-slate-500 font-medium max-w-2xl leading-relaxed text-lg">Define role-based hierarchies and module-level access for backend operators. Maintain the integrity of the hospital command system.</p>
                </div>

                <button
                    onClick={openCreate}
                    className="flex items-center justify-center gap-4 px-12 py-6 bg-primary text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-[0_20px_40px_rgba(27,79,138,0.25)] hover:-translate-y-1 active:translate-y-0 relative z-10"
                >
                    <UserPlusIcon className="w-5 h-5" />
                    <span>Authorize Operator</span>
                </button>
            </div>

            {/* Role Spectrum */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                {ROLES.map(role => (
                    <div key={role.value} className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1 flex flex-col h-full">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">{role.icon}</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-tight mb-2">{role.label}</div>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-6 flex-1 line-clamp-2">{role.description}</p>
                        <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-50">
                            <div>
                                <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Active Nodes</div>
                                <div className="text-2xl font-black text-slate-900">{users.filter(u => u.role === role.value).length}</div>
                            </div>
                            <div className="w-16 h-1 w-20 bg-slate-100 rounded-full overflow-hidden mb-2">
                                <div className={`h-full bg-gradient-to-r ${role.color}`} style={{ width: `${Math.max(10, (users.filter(u => u.role === role.value).length / Math.max(1, users.length)) * 100)}%` }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Operator Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {loading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-slate-50 animate-pulse h-80" />
                    ))
                ) : (
                    users.map(user => {
                        const ri = getRoleInfo(user.role);
                        return (
                            <div key={user.id} className="group bg-white rounded-[3.5rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden">
                                <div className={`h-2 bg-gradient-to-r ${ri.color} opacity-80`} />
                                <div className="p-10">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex items-center gap-5">
                                            <div className="relative">
                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ri.color} flex items-center justify-center text-white font-black text-2xl shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500`}>
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white shadow-lg ${user.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-jakarta font-black text-slate-900 text-lg leading-none truncate mb-1.5">{user.name}</h3>
                                                <p className="text-[11px] font-bold text-slate-400 truncate tracking-wide">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border border-slate-100 shadow-sm ${ri.badge}`}>
                                            {user.role === 'SUPER_ADMIN' ? 'Tier-1 Root' : 'Operator Mode'}
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-8">
                                        <div className="flex items-center justify-between mb-3 px-1">
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Clearance Level</span>
                                            <span className="text-[9px] font-black text-primary uppercase tracking-widest">{ri.label}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {(DEFAULT_PERMISSIONS[user.role] ?? []).slice(0, 4).map(p => (
                                                <div key={p} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:bg-primary/5 group-hover:border-primary/10 group-hover:text-primary transition-all">
                                                    {p}
                                                </div>
                                            ))}
                                            {(DEFAULT_PERMISSIONS[user.role] ?? []).length > 4 && (
                                                <div className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                    +{(DEFAULT_PERMISSIONS[user.role] ?? []).length - 4} MORE
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 mb-8 px-1">
                                        <span className="flex items-center gap-2">
                                            <KeyIcon className="w-4 h-4 opacity-40 text-primary" />
                                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'INITIALIZING'}
                                        </span>
                                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                                        <span className="flex items-center gap-2">
                                            <ShieldCheckIcon className="w-4 h-4 opacity-40 text-primary" />
                                            {user.isActive ? 'OPERATIONAL' : 'STANDBY'}
                                        </span>
                                    </div>

                                    <div className="flex gap-3 mt-auto">
                                        <button
                                            onClick={() => openEdit(user)}
                                            className="flex-1 py-4 bg-slate-50 hover:bg-slate-900 group-hover:bg-slate-900 hover:text-white group-hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-sm border border-slate-100 group-hover:border-slate-900"
                                        >
                                            <PencilSquareIcon className="w-4 h-4" /> RE-CALIBRATE
                                        </button>
                                        {user.id !== me?.id && (
                                            <button
                                                onClick={() => setDeleteTarget(user)}
                                                className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Authorization Terminal (Modal) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-3xl rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden animate-in slide-in-from-bottom-12 duration-500 my-10">
                        <div className={`p-12 text-white relative flex flex-col items-center text-center overflow-hidden bg-gradient-to-br ${getRoleInfo(form.role).color}`}>
                            <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all group backdrop-blur-md">
                                <XMarkIcon className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
                            </button>
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center text-5xl mb-6 shadow-2xl border border-white/20">
                                {getRoleInfo(form.role).icon}
                            </div>
                            <h3 className="text-4xl font-jakarta font-black tracking-tight leading-none mb-4">{editUser ? 'Re-authorize Operator' : 'Initialize Command Node'}</h3>
                            <p className="text-white/70 font-bold uppercase tracking-[0.25em] text-[10px] max-w-md">Configure tactical permissions and identity protocols.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-12 space-y-10 max-h-[60vh] overflow-y-auto no-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Personnel Nomenclature</label>
                                    <input required className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-primary/5 transition-all text-sm font-bold outline-none" placeholder="e.g. Dr. Almaz Tesfaye" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                {!editUser && (
                                    <div className="space-y-4">
                                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Authorized Email</label>
                                        <input required type="email" className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-primary/5 transition-all text-sm font-bold outline-none" placeholder="operator@amsh.gov.et" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                    </div>
                                )}
                                {!editUser && (
                                    <div className="md:col-span-2 space-y-4">
                                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Initial Authentication Credential</label>
                                        <div className="relative group">
                                            <LockClosedIcon className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                            <input required type="password" className="w-full pl-16 pr-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-primary/5 transition-all text-sm font-bold outline-none" placeholder="Secure unique sequence (Min. 8 chars)" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} minLength={8} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-8">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 ml-2">Designated Directive</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {ROLES.map(role => (
                                        <button
                                            key={role.value}
                                            type="button"
                                            onClick={() => handleRoleChange(role.value)}
                                            className={`flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all text-left ${form.role === role.value ? `bg-white border-primary shadow-2xl ring-[10px] ring-primary/5` : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 opacity-60 hover:opacity-100'}`}
                                        >
                                            <div className="text-3xl grayscale group-hover:grayscale-0">{role.icon}</div>
                                            <div className="min-w-0">
                                                <div className="text-[11px] font-black uppercase tracking-wider text-slate-900 mb-1">{role.label}</div>
                                                <div className="text-[10px] font-medium text-slate-400 leading-tight">{role.description}</div>
                                            </div>
                                            {form.role === role.value && <div className="ml-auto w-6 h-6 bg-primary rounded-full flex items-center justify-center"><CheckIcon className="w-4 h-4 text-white" /></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-10 pt-10 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] ml-2">Granular Module Clearance</h4>
                                    <div className="flex items-center gap-6">
                                        <button type="button" onClick={() => setForm(f => ({ ...f, permissions: ALL_MODULES.map(m => m.key) }))} className="text-[10px] font-black text-primary uppercase tracking-widest hover:translate-y-px transition-all">Max Authorization</button>
                                        <button type="button" onClick={() => setForm(f => ({ ...f, permissions: [] }))} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:translate-y-px transition-all">Revoke All</button>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    {MODULE_GROUPS.map(group => {
                                        const groupModules = ALL_MODULES.filter(m => m.group === group);
                                        return (
                                            <div key={group}>
                                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6 ml-2">{group} Matrix</p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {groupModules.map(p => (
                                                        <button
                                                            key={p.key}
                                                            type="button"
                                                            onClick={() => togglePerm(p.key)}
                                                            className={`w-full flex items-center gap-5 p-6 rounded-3xl border-2 transition-all text-left ${form.permissions.includes(p.key) ? 'bg-primary/5 border-primary shadow-sm text-primary' : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-100'}`}
                                                        >
                                                            <span className="text-2xl opacity-60">{p.icon}</span>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-[11px] font-black uppercase tracking-widest leading-none mb-1.5">{p.label}</div>
                                                                <div className="text-[9px] font-bold opacity-60 truncate tracking-tight">{p.desc}</div>
                                                            </div>
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${form.permissions.includes(p.key) ? 'bg-primary border-primary' : 'border-slate-200'}`}>
                                                                {form.permissions.includes(p.key) && <CheckIcon className="w-4 h-4 text-white" />}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full sm:flex-1 h-20 bg-slate-50 text-slate-400 rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all">
                                    CANCEL MISSION
                                </button>
                                <button type="submit" disabled={saving} className={`w-full sm:flex-1 h-20 text-white rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.3em] bg-primary hover:bg-primary-dark transition-all shadow-[0_20px_40px_rgba(27,79,138,0.2)] disabled:opacity-50`}>
                                    {saving ? 'SYNCHRONIZING...' : editUser ? 'SYNC PARAMETERS' : 'AUTHORIZE COMMAND'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Termination Sequence Confirm */}
            {deleteTarget && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="relative bg-white rounded-[4rem] shadow-2xl w-full max-w-md z-10 p-12 text-center animate-in zoom-in-95 duration-300">
                        <div className="w-24 h-24 bg-red-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-red-100/50">
                            <TrashIcon className="w-10 h-10 text-red-500" />
                        </div>
                        <h3 className="text-3xl font-jakarta font-black text-slate-900 leading-tight mb-4">Confirm Termination?</h3>
                        <p className="text-slate-400 font-medium leading-relaxed mb-10">You are about to permanently de-authorize <strong className="text-slate-900">{deleteTarget.name}</strong> from the secure backend. This protocol is irreversible.</p>
                        <div className="flex flex-col gap-4">
                            <button onClick={handleDelete} className="w-full py-6 bg-red-600 text-white font-black rounded-[2rem] uppercase tracking-[0.2em] text-[11px] hover:bg-red-700 transition-all shadow-xl shadow-red-200">EXECUTE TERMINATION</button>
                            <button onClick={() => setDeleteTarget(null)} className="w-full py-6 bg-slate-50 text-slate-400 font-bold rounded-[2rem] uppercase tracking-widest text-[11px] hover:bg-slate-100 transition-all">ABORT PROTOCOL</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Communication Feedbacks */}
            {toast && (
                <div className={`fixed bottom-10 right-10 z-[200] flex items-center gap-4 px-8 py-6 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] font-bold text-sm animate-in slide-in-from-bottom-10 duration-500 border border-white/10 ${toast.type === 'ok' ? 'bg-slate-900 text-white' : 'bg-red-600 text-white'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${toast.type === 'ok' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/20 text-white'}`}>
                        {toast.type === 'ok' ? <CheckIcon className="w-6 h-6" /> : <ExclamationTriangleIcon className="w-6 h-6" />}
                    </div>
                    <div>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${toast.type === 'ok' ? 'text-emerald-400' : 'text-white/60'}`}>{toast.type === 'ok' ? 'Success Alert' : 'System Failure'}</p>
                        <p className="text-[15px] font-jakarta font-black">{toast.msg}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
