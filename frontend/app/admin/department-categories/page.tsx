'use client';

import { useState, useEffect } from 'react';
import { departmentCategoriesAPI, mediaAPI } from '@/lib/api';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    PhotoIcon,
    CheckIcon,
    XMarkIcon,
    BuildingOfficeIcon,
    Bars3Icon,
    SparklesIcon,
    MagnifyingGlassIcon,
    ArrowPathIcon,
    CloudArrowUpIcon,
    ChevronRightIcon,
    Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

export default function DepartmentCategoriesAdmin() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: '',
        icon: '',
        gradient: 'from-blue-900 to-blue-700',
        order: 0,
        isActive: true,
    });
    const [uploading, setUploading] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await departmentCategoriesAPI.getAll();
            setCategories(res.data.categories || []);
        } catch (error) {
            console.error('Fetch categories error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (category: any = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                slug: category.slug,
                description: category.description || '',
                image: category.image || '',
                icon: category.icon || '',
                gradient: category.gradient || 'from-blue-900 to-blue-700',
                order: category.order || 0,
                isActive: category.isActive,
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: '',
                slug: '',
                description: '',
                image: '',
                icon: '',
                gradient: 'from-blue-900 to-blue-700',
                order: categories.length,
                isActive: true,
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await departmentCategoriesAPI.update(editingCategory.id, formData);
            } else {
                await departmentCategoriesAPI.create(formData);
            }
            setIsModalOpen(false);
            fetchCategories();
        } catch (error) {
            console.error('Save category error:', error);
            alert('Category synchronization failed.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Purge this category node? This will decouple all associated departments.')) return;
        try {
            await departmentCategoriesAPI.delete(id);
            fetchCategories();
        } catch (error) {
            console.error('Delete category error:', error);
            alert('Protocol rejection: Delete failed.');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading('image');
        try {
            const res = await mediaAPI.upload(file, 'department-categories');
            setFormData({ ...formData, image: res.data.media.url });
        } catch (error) {
            console.error('Upload error:', error);
            alert('Visual asset transmission failed.');
        } finally {
            setUploading(null);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Command Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-20 h-20 bg-slate-50 text-primary rounded-[2rem] flex items-center justify-center shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-700">
                        <Square3Stack3DIcon className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <SparklesIcon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Structural Ontology Engine</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none">Category Matrix</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 active:translate-y-0"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Deploy New Entity Node</span>
                    </button>
                </div>
            </div>

            {/* Scan Control */}
            <div className="relative max-w-xl group">
                <MagnifyingGlassIcon className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Scan structural categories by nomenclature..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-20 pr-8 py-5 bg-white border border-slate-200/60 rounded-[2rem] shadow-sm focus:ring-[15px] focus:ring-primary/5 transition-all outline-none font-medium text-slate-700 placeholder:text-slate-300"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-10 rounded-[4rem] border border-slate-50 animate-pulse h-[450px]" />
                    ))
                ) : categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                    <div className="col-span-full bg-white py-40 rounded-[4rem] border border-slate-200/60 shadow-sm text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-[3rem] flex items-center justify-center mx-auto mb-8 text-slate-200 shadow-inner">
                            <BuildingOfficeIcon className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-jakarta font-black text-slate-900 mb-2">Null Ontology Node</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">No structural categories match your currently active telemetry scan.</p>
                    </div>
                ) : (
                    categories
                        .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((category, idx) => (
                            <div key={category.id} className="bg-white rounded-[4rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-700 group overflow-hidden flex flex-col animate-in slide-in-from-bottom-12" style={{ animationDelay: `${idx * 100}ms` }}>
                                <div className="h-64 relative overflow-hidden">
                                    {category.image ? (
                                        <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" crossOrigin="anonymous" />
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${category.gradient || 'from-primary-dark to-primary'} flex items-center justify-center group-hover:scale-110 transition-transform duration-1000`}>
                                            <span className="text-8xl transform group-hover:rotate-12 transition-transform">{category.icon || '🏥'}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

                                    <div className="absolute top-6 right-6 flex flex-col items-end gap-3 z-10">
                                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest shadow-lg">
                                            INDEX: {category.order}
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg border ${category.isActive ? 'bg-emerald-500/90 text-white border-white/20' : 'bg-slate-500/90 text-white border-white/20'}`}>
                                            {category.isActive ? 'OPERATIONAL' : 'DECOMMISSIONED'}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="h-0.5 w-8 bg-primary rounded-full" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Structural Node</span>
                                        </div>
                                        <h3 className="font-jakarta font-black text-3xl tracking-tight leading-none truncate drop-shadow-2xl">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-10 flex-1 flex flex-col bg-white">
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3 mb-10 flex-1">{category.description || 'No descriptive protocol provided for this entity grouping.'}</p>

                                    <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleOpenModal(category)}
                                                className="p-4 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-2xl transition-all border border-primary/10 shadow-sm active:scale-95"
                                                title="Modify Configuration"
                                            >
                                                <PencilIcon className="w-5 h-5 stroke-[2]" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="p-4 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl transition-all border border-red-100 shadow-sm active:scale-95"
                                                title="Purge Node"
                                            >
                                                <TrashIcon className="w-5 h-5 stroke-[2]" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleOpenModal(category)}
                                            className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl active:translate-x-1"
                                        >
                                            <span>Inspect Node</span>
                                            <ChevronRightIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                )}
            </div>

            {/* Tactical Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
                        <div className="px-12 py-10 bg-slate-50/40 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-primary text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20">
                                    <Square3Stack3DIcon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-jakarta font-black text-slate-900 tracking-tight leading-none mb-1">
                                        ONTOLOGY EDITOR
                                    </h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                                        {editingCategory ? 'Protocol Modification Mode' : 'New Strategic Node Insertion'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-white rounded-[1.5rem] text-slate-400 hover:text-red-500 transition-all shadow-sm border border-slate-100 active:scale-95">
                                <XMarkIcon className="w-7 h-7" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-12 space-y-10 max-h-[75vh] overflow-y-auto no-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Node Nomenclature</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                        className="w-full px-8 py-5 bg-slate-50 border-0 rounded-3xl text-sm font-black text-slate-900 focus:ring-[12px] focus:ring-primary/5 transition-all shadow-inner placeholder:text-slate-300"
                                        placeholder="Identification"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Symbolic Indicator</label>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        className="w-full px-8 py-5 bg-slate-50 border-0 rounded-3xl text-sm font-black text-slate-900 focus:ring-[12px] focus:ring-primary/5 transition-all shadow-inner placeholder:text-slate-300"
                                        placeholder="Emoji/Symbol"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">URI Protocol Slug</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-8 py-5 bg-slate-50 border-0 rounded-3xl text-sm font-black text-slate-900 focus:ring-[12px] focus:ring-primary/5 transition-all shadow-inner placeholder:text-slate-300"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Hierarchical Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-full px-8 py-5 bg-slate-50 border-0 rounded-3xl text-sm font-black text-slate-900 focus:ring-[12px] focus:ring-primary/5 transition-all shadow-inner"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Descriptive Protocol</label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] text-sm font-bold text-slate-600 focus:ring-[12px] focus:ring-primary/5 transition-all resize-none shadow-inner leading-relaxed"
                                    placeholder="Write a brief overview of this category node..."
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Visual Spectrum (Gradient)</label>
                                <input
                                    type="text"
                                    value={formData.gradient}
                                    onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                                    className="w-full px-8 py-5 bg-slate-50 border-0 rounded-3xl text-sm font-black text-slate-900 focus:ring-[12px] focus:ring-primary/5 transition-all shadow-inner"
                                    placeholder="from-primary to-primary-dark"
                                />
                            </div>

                            <div className="space-y-8 pt-6 border-t border-slate-50">
                                <div className="flex items-center justify-between px-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Institutional Backdrop</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            accept="image/*"
                                        />
                                        <span className={`flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${uploading === 'image' ? 'opacity-50' : 'hover:bg-primary active:scale-95'}`}>
                                            {uploading === 'image' ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : <PhotoIcon className="w-4 h-4" />}
                                            {uploading === 'image' ? 'TRANSMITTING...' : 'UPDATE BACKDROP'}
                                        </span>
                                    </div>
                                </div>
                                {formData.image && (
                                    <div className="relative h-56 rounded-[2.5rem] overflow-hidden group/img shadow-2xl">
                                        <img src={formData.image} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: '' })}
                                                className="p-5 bg-red-600 text-white rounded-full hover:scale-110 active:scale-90 transition-all shadow-2xl"
                                            >
                                                <TrashIcon className="w-8 h-8" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-10 pt-10 border-t border-slate-50">
                                <label className="flex items-center gap-5 cursor-pointer group w-full md:w-auto">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        <div className="w-16 h-8 bg-slate-200 rounded-full peer peer-checked:bg-primary transition-all shadow-inner" />
                                        <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-8 shadow-md" />
                                    </div>
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">Operational Status</span>
                                </label>

                                <button
                                    type="submit"
                                    className="w-full md:flex-1 py-7 bg-primary text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(27,79,138,0.3)] hover:bg-primary-dark transition-all active:scale-95"
                                >
                                    {editingCategory ? 'COMMUTE PROTOCOL' : 'INITIALIZE NODE'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
