'use client';

import { useState, useEffect } from 'react';
import { navigationAPI, pagesAPI } from '@/lib/api';
import {
    PlusIcon,
    TrashIcon,
    Bars3Icon,
    CheckIcon,
    XMarkIcon,
    MapIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ArrowPathIcon,
    GlobeAltIcon,
    PuzzlePieceIcon,
    CommandLineIcon,
    SparklesIcon,
    ArrowTopRightOnSquareIcon,
    AcademicCapIcon,
    Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function NavigationAdmin() {
    const [navItems, setNavItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pages, setPages] = useState<any[]>([]);

    useEffect(() => {
        fetchNavAndPages();
    }, []);

    const fetchNavAndPages = async () => {
        setLoading(true);
        try {
            // Fetch ALL pages (including drafts) to ensure everything is linkable
            const [navRes, pagesRes] = await Promise.all([
                navigationAPI.getAll(),
                pagesAPI.getAll({ status: 'ALL' })
            ]);
            setNavItems(navRes.data.navigation || []);
            setPages(pagesRes.data.pages || (Array.isArray(pagesRes.data) ? pagesRes.data : []));
        } catch (error) {
            console.error('Core synchronization error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = (parentId: string | null = null) => {
        const newItem = {
            id: 'new-' + Date.now(),
            label: 'New Navigation Node',
            href: '/',
            order: navItems.length,
            parentId,
            children: [],
            isActive: true,
            target: '_self'
        };

        if (parentId) {
            setNavItems(navItems.map(item => {
                if (item.id === parentId) {
                    return { ...item, children: [...(item.children || []), newItem] };
                }
                return item;
            }));
        } else {
            setNavItems([...navItems, newItem]);
        }
    };

    const handleUpdateItem = (id: string, updates: any, parentId: string | null = null) => {
        if (parentId) {
            setNavItems(navItems.map(item => {
                if (item.id === parentId) {
                    return {
                        ...item,
                        children: (item.children || []).map((child: any) => child.id === id ? { ...child, ...updates } : child)
                    };
                }
                return item;
            }));
        } else {
            setNavItems(navItems.map(item => item.id === id ? { ...item, ...updates } : item));
        }
    };

    const handleDeleteItem = (id: string, parentId: string | null = null) => {
        if (!confirm('Abort this navigation node? Hierarchy children will also be decoupled.')) return;
        if (parentId) {
            setNavItems(navItems.map(item => {
                if (item.id === parentId) {
                    return { ...item, children: (item.children || []).filter((child: any) => child.id !== id) };
                }
                return item;
            }));
        } else {
            setNavItems(navItems.filter(item => item.id !== id));
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await navigationAPI.update(navItems);
            alert('Navigation Matrix synchronized successfully!');
        } catch (error) {
            console.error('Save error:', error);
            alert('Save failed. Infrastructure sync conflict.');
        } finally {
            setSaving(false);
        }
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        const newItems = [...navItems];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newItems.length) return;

        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(targetIndex, 0, movedItem);
        setNavItems(newItems);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1400px] mx-auto">
            {/* Strategy Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-20 h-20 bg-slate-50 text-primary rounded-[2rem] flex items-center justify-center shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-700">
                        <MapIcon className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <PuzzlePieceIcon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Institutional Route Architect</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none">Navigation Controller</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-4 px-10 py-5 bg-emerald-600 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50 hover:-translate-y-1 active:translate-y-0"
                    >
                        {saving ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <CheckIcon className="w-5 h-5" />}
                        <span>{saving ? 'SYNCING...' : 'SAVE CORE NAV'}</span>
                    </button>
                    <button
                        onClick={() => handleAddItem()}
                        className="flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 active:translate-y-0"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Add Global Node</span>
                    </button>
                </div>
            </div>

            {/* Structure Matrix */}
            <div className="space-y-6">
                {loading ? (
                    [...Array(5)].map((_, i) => (
                        <div key={i} className="bg-white h-24 rounded-[2rem] animate-pulse border border-slate-50 shadow-sm" />
                    ))
                ) : navItems.length === 0 ? (
                    <div className="bg-white py-40 rounded-[4rem] border border-slate-200/60 shadow-sm text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-slate-200 shadow-inner">
                            <MapIcon className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-jakarta font-black text-slate-900 mb-2">Null Route Configuration</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-10">The global navigation matrix is currently decommissioned.</p>
                        <button onClick={() => handleAddItem()} className="px-12 py-5 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-2xl">Initialize Architecture</button>
                    </div>
                ) : (
                    navItems.map((item, index) => (
                        <div key={item.id} className="space-y-4 animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                            {/* Main Nav Card */}
                            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-2xl transition-all flex flex-col md:flex-row items-center gap-8 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-full bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                <div className="flex items-center gap-4 flex-shrink-0">
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => moveItem(index, 'up')}
                                            disabled={index === 0}
                                            className="p-2 text-slate-200 hover:text-primary transition-all disabled:opacity-0"
                                        >
                                            <ChevronUpIcon className="w-5 h-5 stroke-[3]" />
                                        </button>
                                        <button
                                            onClick={() => moveItem(index, 'down')}
                                            disabled={index === navItems.length - 1}
                                            className="p-2 text-slate-200 hover:text-primary transition-all disabled:opacity-0"
                                        >
                                            <ChevronDownIcon className="w-5 h-5 stroke-[3]" />
                                        </button>
                                    </div>
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-primary/5 group-hover:text-primary transition-all border border-slate-100 font-black text-lg">
                                        {index + 1}
                                    </div>
                                </div>

                                <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Node Title</label>
                                        <input
                                            type="text"
                                            value={item.label}
                                            onChange={(e) => handleUpdateItem(item.id, { label: e.target.value })}
                                            className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 focus:ring-[10px] focus:ring-primary/5 focus:bg-white transition-all shadow-inner"
                                            placeholder="Label Protocol"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Destination Signal</label>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 relative group/input">
                                                <GlobeAltIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within/input:text-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    value={item.href}
                                                    onChange={(e) => handleUpdateItem(item.id, { href: e.target.value })}
                                                    className="w-full bg-slate-50 border-0 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-primary focus:ring-[10px] focus:ring-primary/5 focus:bg-white transition-all shadow-inner"
                                                    placeholder="/protocol-path"
                                                />
                                            </div>
                                            <select
                                                className="w-48 bg-slate-950 text-white border-0 rounded-2xl px-4 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer hover:bg-slate-800 transition-all shadow-xl"
                                                value={item.href}
                                                onChange={(e) => handleUpdateItem(item.id, { href: e.target.value })}
                                            >
                                                <option value="">CUSTOM URL</option>
                                                <optgroup label="INSTITUTIONAL NODES" className="bg-white text-slate-900">
                                                    {pages.map(p => (
                                                        <option key={p.id} value={`/${p.slug}`}>[{p.status}] {p.title}</option>
                                                    ))}
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
                                    <button
                                        onClick={() => handleAddItem(item.id)}
                                        className="flex-1 md:flex-none p-5 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-[1.5rem] transition-all border border-primary/10 shadow-sm"
                                        title="Initialize Sub-node"
                                    >
                                        <PlusIcon className="w-6 h-6 stroke-[3]" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="flex-1 md:flex-none p-5 bg-red-50 text-red-400 hover:bg-red-600 hover:text-white rounded-[1.5rem] transition-all border border-red-100 shadow-sm"
                                        title="Purge Node"
                                    >
                                        <TrashIcon className="w-6 h-6 stroke-[3]" />
                                    </button>
                                </div>
                            </div>

                            {/* Sub-node Hierarchy */}
                            {(item.children || []).length > 0 && (
                                <div className="ml-16 md:ml-24 space-y-3 relative before:absolute before:left-[-2rem] before:top-0 before:bottom-0 before:w-1 before:bg-slate-100 before:rounded-full">
                                    {(item.children || []).map((child: any) => (
                                        <div key={child.id} className="bg-slate-50/50 p-5 rounded-[1.5rem] border border-slate-100/60 flex flex-col md:flex-row items-center gap-6 group/child hover:bg-white hover:shadow-xl hover:border-primary/10 transition-all animate-in slide-in-from-left-2 duration-300">
                                            <div className="w-3 h-3 rounded-full bg-primary/20 group-hover/child:scale-150 group-hover/child:bg-primary transition-all" />
                                            <input
                                                type="text"
                                                value={child.label}
                                                onChange={(e) => handleUpdateItem(child.id, { label: e.target.value }, item.id)}
                                                className="flex-1 bg-transparent border-0 rounded-xl px-2 py-1 text-sm font-black text-slate-800 focus:ring-4 focus:ring-primary/5"
                                                placeholder="Sub-node Label"
                                            />
                                            <div className="flex-1 relative group/childinput w-full md:w-auto">
                                                <GlobeAltIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within/childinput:text-primary" />
                                                <input
                                                    type="text"
                                                    value={child.href}
                                                    onChange={(e) => handleUpdateItem(child.id, { href: e.target.value }, item.id)}
                                                    className="w-full bg-white/50 border-0 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-slate-500 focus:ring-4 focus:ring-primary/5 transition-all"
                                                    placeholder="/sub-path"
                                                />
                                            </div>
                                            <button
                                                onClick={() => handleDeleteItem(child.id, item.id)}
                                                className="p-3 bg-white text-slate-200 hover:text-red-500 rounded-xl shadow-sm border border-slate-100 opacity-0 group-hover/child:opacity-100 transition-all"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Strategic Roadmap Card */}
            <div className="bg-slate-900 p-10 lg:p-14 rounded-[4rem] text-white shadow-[0_40px_80px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/20 blur-[100px] pointer-events-none group-hover:bg-primary/30 transition-all duration-1000" />
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
                    <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform duration-700">
                        <SparklesIcon className="w-12 h-12 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-jakarta font-black mb-4">Master Menu Architecture</h3>
                        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed italic">
                            "Institutional clarity is achieved through hierarchical precision. Ensure all strategic content nodes are properly indexed within the global navigation matrix for optimal visitor orientation."
                        </p>
                    </div>
                    <div className="flex-shrink-0 ml-auto pt-6 lg:pt-0">
                        <Link
                            href="/admin/pages"
                            className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all"
                        >
                            <span>Check Content Registry</span>
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
