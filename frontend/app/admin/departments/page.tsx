'use client';

import { useState, useEffect } from 'react';
import { departmentsAPI, mediaAPI, departmentCategoriesAPI } from '@/lib/api';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    PhotoIcon,
    CheckIcon,
    XMarkIcon,
    BuildingOfficeIcon,
    Bars3Icon,
    UserCircleIcon,
    SparklesIcon,
    ArrowPathIcon,
    IdentificationIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function DepartmentsAdmin() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDept, setEditingDept] = useState<any>(null);
    const [view, setView] = useState<'grid' | 'heads'>('grid');
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: '',
        icon: '',
        headName: '',
        headTitle: '',
        headProfession: '',
        headImage: '',
        category: 'Clinical Departments',
        categoryId: '',
        vision: '',
        mission: '',
        goal: '',
        order: 0,
        isActive: true,
        gallery: '',
    });
    const [uploading, setUploading] = useState<string | null>(null);

    useEffect(() => {
        fetchDepartments();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await departmentCategoriesAPI.getAll();
            setCategories(res.data.categories || []);
        } catch (error) {
            console.error('Fetch categories error:', error);
        }
    };

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const res = await departmentsAPI.getAll();
            setDepartments(res.data.departments || []);
        } catch (error) {
            console.error('Fetch departments error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (dept: any = null) => {
        if (dept) {
            setEditingDept(dept);
            setFormData({
                name: dept.name,
                slug: dept.slug,
                description: dept.description,
                image: dept.image || '',
                icon: dept.icon || '',
                headName: dept.headName || '',
                headTitle: dept.headTitle || '',
                headProfession: dept.headProfession || '',
                headImage: dept.headImage || '',
                category: dept.categoryName || dept.category || 'Clinical Departments',
                categoryId: dept.categoryId || '',
                vision: dept.vision || '',
                mission: dept.mission || '',
                goal: dept.goal || '',
                order: dept.order || 0,
                isActive: dept.isActive,
                gallery: dept.gallery || '',
            });
        } else {
            setEditingDept(null);
            setFormData({
                name: '',
                slug: '',
                description: '',
                image: '',
                icon: '',
                headName: '',
                headTitle: '',
                headProfession: '',
                headImage: '',
                category: categories[0]?.name || 'Clinical Departments',
                categoryId: categories[0]?.id || '',
                vision: '',
                mission: '',
                goal: '',
                order: departments.length,
                isActive: true,
                gallery: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingDept) {
                await departmentsAPI.update(editingDept.id, formData);
            } else {
                await departmentsAPI.create(formData);
            }
            setIsModalOpen(false);
            fetchDepartments();
        } catch (error) {
            console.error('Save department error:', error);
            alert('Failed to save department.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this department?')) return;
        try {
            await departmentsAPI.delete(id);
            fetchDepartments();
        } catch (error) {
            console.error('Delete department error:', error);
            alert('Failed to delete department.');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'headImage' | 'gallery') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(field);
        try {
            const folder = field === 'image' ? 'departments' : field === 'headImage' ? 'heads' : 'gallery';
            const res = await mediaAPI.upload(file, folder);

            if (field === 'gallery') {
                const currentGallery = formData.gallery ? formData.gallery.split(';') : [];
                currentGallery.push(res.data.media.url);
                setFormData({ ...formData, gallery: currentGallery.join(';') });
            } else {
                setFormData({ ...formData, [field]: res.data.media.url });
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image.');
        } finally {
            setUploading(null);
        }
    };

    const removeGalleryImage = (url: string) => {
        const currentGallery = formData.gallery.split(';').filter(u => u !== url);
        setFormData({ ...formData, gallery: currentGallery.join(';') });
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/10">Structural Units</div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Directory</span>
                    </div>
                    <h2 className="text-4xl font-jakarta font-black text-slate-900 tracking-tight leading-none mb-4">Functional Entities</h2>
                    <p className="text-slate-500 font-medium max-w-xl leading-relaxed">System-wide management of clinical, administrative, and strategic hospital departments. Organize the structural core of EMSH.</p>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                        <button
                            onClick={() => setView('grid')}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'grid' ? 'bg-white text-primary shadow-lg ring-1 ring-slate-200/50' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Catalog
                        </button>
                        <button
                            onClick={() => setView('heads')}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'heads' ? 'bg-white text-primary shadow-lg ring-1 ring-slate-200/50' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Leadership
                        </button>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-primary-dark transition-all shadow-[0_15px_30px_rgba(27,79,138,0.25)] hover:-translate-y-1 active:translate-y-0"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Deploy Entity</span>
                    </button>
                </div>
            </div>

            {view === 'heads' && (
                <div className="bg-white rounded-[3rem] border border-slate-200/60 overflow-hidden animate-in fade-in duration-500 shadow-sm">
                    <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-jakarta font-black text-slate-900 uppercase tracking-tight">Leadership Matrix</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em] mt-2">Authenticated listing of department heads and clinical directors.</p>
                        </div>
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
                            <IdentificationIcon className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-50 bg-slate-50/30">
                                    <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Assignment Department</th>
                                    <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Designated Personnel</th>
                                    <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Title</th>
                                    <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Assignment Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {departments.map((dept) => (
                                    <tr key={dept.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl transition-transform group-hover:scale-110">{dept.icon || '🏥'}</div>
                                                <span className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{dept.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm ring-1 ring-slate-100">
                                                    {dept.headImage ? <img src={dept.headImage} className="w-full h-full object-cover" /> : <UserCircleIcon className="w-full h-full text-slate-200" />}
                                                </div>
                                                <span className="font-black text-slate-900 text-sm">{dept.headName || 'NOT ASSIGNED'}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 font-bold text-slate-400 text-xs tracking-wide">{dept.headTitle || 'PENDING CLASSIFICATION'}</td>
                                        <td className="px-10 py-6">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${dept.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${dept.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                                                {dept.isActive ? 'Active Duty' : 'Standby'}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {view === 'grid' && (
                <>
                    <div className="relative max-w-xl group">
                        <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Scan entities by nomenclature, category, or objective..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-16 pr-8 py-5 bg-white border border-slate-200/60 rounded-3xl shadow-sm focus:ring-[10px] focus:ring-primary/5 focus:border-primary/20 transition-all font-medium text-slate-700 placeholder:text-slate-300 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {loading ? (
                            [...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 animate-pulse h-[450px]" />
                            ))
                        ) : departments.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                            <div className="col-span-full bg-white p-32 rounded-[4rem] border border-slate-200/60 text-center shadow-sm">
                                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-slate-200">
                                    <BuildingOfficeIcon className="w-12 h-12" />
                                </div>
                                <h3 className="text-2xl font-jakarta font-black text-slate-900 mb-2">Entity Not Found</h3>
                                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-12">No structural matches found for your current query</p>
                                <button onClick={() => handleOpenModal()} className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                                    <PlusIcon className="w-5 h-5" /> Deploy New Structural Unit
                                </button>
                            </div>
                        ) : (
                            departments
                                .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((dept) => (
                                    <div key={dept.id} className="group bg-white rounded-[3rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden relative">
                                        {/* Visualization Header */}
                                        <div className="h-56 relative overflow-hidden flex-shrink-0">
                                            {dept.image ? (
                                                <img src={dept.image} alt={dept.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" crossOrigin="anonymous" />
                                            ) : (
                                                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                                    <BuildingOfficeIcon className="w-20 h-20 text-white/5" />
                                                </div>
                                            )}

                                            {/* Meta Overlays */}
                                            <div className="absolute top-6 left-6 flex flex-col gap-3">
                                                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black text-slate-900 uppercase tracking-widest border border-white/20 shadow-lg">
                                                    INDEX: {dept.order}
                                                </span>
                                                <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg border border-white/20 flex items-center gap-2 ${dept.isActive ? 'bg-emerald-500/90 text-white' : 'bg-slate-500/90 text-white'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full bg-current ${dept.isActive && 'animate-pulse'}`} />
                                                    {dept.isActive ? 'OPERATIONAL' : 'STANDBY'}
                                                </span>
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            <div className="absolute bottom-6 left-8 right-8">
                                                <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2">{dept.categoryName || dept.category || 'Clinical Departments'}</p>
                                                <h4 className="text-white font-jakarta font-black text-2xl tracking-tight leading-none group-hover:translate-x-1 transition-transform">{dept.name}</h4>
                                            </div>
                                        </div>

                                        {/* Core Interaction Matrix */}
                                        <div className="p-10 flex flex-col flex-1">
                                            <p className="text-slate-500 text-[13px] leading-relaxed mb-8 line-clamp-2 font-medium">{dept.description}</p>

                                            {dept.headName && (
                                                <div className="flex items-center gap-4 mb-10 p-4 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner group/head">
                                                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white border border-slate-200 flex-shrink-0 group-hover/head:scale-110 transition-transform shadow-sm">
                                                        {dept.headImage ? <img src={dept.headImage} alt={dept.headName} className="w-full h-full object-cover" crossOrigin="anonymous" /> : <UserCircleIcon className="w-full h-full text-slate-100" />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest truncate">{dept.headName}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold truncate tracking-tight">{dept.headTitle || 'PRINCIPAL DIRECTOR'}</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-auto flex items-center gap-3 pt-6 border-t border-slate-50">
                                                <button
                                                    onClick={() => handleOpenModal(dept)}
                                                    className="flex-1 px-6 py-4 bg-slate-100 hover:bg-primary hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                                                >
                                                    Modify Spec
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(dept.id)}
                                                    className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </>
            )}

            {/* Entity Deployment Terminal (Modal) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.25)] overflow-hidden animate-in slide-in-from-bottom-12 duration-500">
                        <div className="px-10 py-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-jakarta font-black text-slate-900 tracking-tight">{editingDept ? 'Synchronize Entity' : 'Initialize Structural Hub'}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em] mt-1">Configure structural and leadership parameters.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-white rounded-full transition-all text-slate-400 group border border-transparent hover:border-slate-200">
                                <XMarkIcon className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[75vh] overflow-y-auto no-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Entity Nomenclature</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                        className="w-full px-6 py-5 bg-slate-50 border-0 rounded-3xl focus:ring-[6px] focus:ring-primary/5 focus:border-primary/20 placeholder-slate-200 text-sm font-bold transition-all outline-none"
                                        placeholder="Identification e.g. Clinical Neurology"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Release Category</label>
                                    <select
                                        value={formData.categoryId || formData.category}
                                        onChange={(e) => {
                                            const selectedCat = categories.find(c => c.id === e.target.value || c.name === e.target.value);
                                            setFormData({
                                                ...formData,
                                                categoryId: selectedCat?.id || '',
                                                category: selectedCat?.name || e.target.value
                                            });
                                        }}
                                        className="w-full px-6 py-5 bg-slate-50 border-0 rounded-3xl focus:ring-[6px] focus:ring-primary/5 text-sm font-bold transition-all outline-none"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Symbolic Identifier (Emoji)</label>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        className="w-full px-6 py-5 bg-slate-50 border-0 rounded-3xl focus:ring-[6px] focus:ring-primary/5 text-sm font-bold transition-all outline-none"
                                        placeholder="🏥 Icon Signal"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">System Asset Slug</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-6 py-5 bg-slate-50 border-0 rounded-3xl focus:ring-[6px] focus:ring-primary/5 text-sm font-bold transition-all outline-none placeholder-slate-200"
                                        placeholder="internal-slug-path"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Operational Descriptor</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-6 py-5 bg-slate-50 border-0 rounded-3xl focus:ring-[6px] focus:ring-primary/5 transition-all placeholder-slate-200 text-sm font-bold outline-none resize-none"
                                    placeholder="Provide comprehensive structural overview..."
                                />
                            </div>

                            <div className="space-y-6 pt-8 border-t border-slate-100">
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.25em]">Strategic Objectives</h4>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Strategic Vision</label>
                                        <textarea
                                            rows={2}
                                            value={formData.vision}
                                            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                                            className="w-full px-6 py-5 bg-slate-50 border-0 rounded-3xl focus:ring-2 focus:ring-primary/10 text-sm font-bold outline-none resize-none"
                                            placeholder="Future operational horizon..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Tactical Mission (List)</label>
                                            <textarea
                                                rows={4}
                                                value={formData.mission}
                                                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                                                className="w-full px-6 py-5 bg-slate-900 border-0 rounded-3xl text-sm font-bold text-slate-300 outline-none resize-none"
                                                placeholder="Vector 1&#10;Vector 2&#10;Vector 3..."
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Operational Goal</label>
                                            <textarea
                                                rows={4}
                                                value={formData.goal}
                                                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                                className="w-full px-6 py-5 bg-primary/5 border border-primary/10 rounded-3xl text-sm font-bold text-primary outline-none resize-none"
                                                placeholder="Primary objective for current cycle..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 p-8 rounded-[3rem] space-y-6 border border-white/5 shadow-2xl">
                                <h4 className="text-[11px] font-black text-accent uppercase tracking-[0.3em] flex items-center gap-3">
                                    <IdentificationIcon className="w-5 h-5" /> Leadership Designation
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-2">Personnel Identity</label>
                                        <input
                                            type="text"
                                            value={formData.headName}
                                            onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent/20 text-xs font-bold text-white outline-none"
                                            placeholder="e.g. Director General Name"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-2">Functional Role / Title</label>
                                        <input
                                            type="text"
                                            value={formData.headTitle}
                                            onChange={(e) => setFormData({ ...formData, headTitle: e.target.value })}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent/20 text-xs font-bold text-white outline-none"
                                            placeholder="e.g. Department Director / Head"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-2">Profession / Specialization</label>
                                        <input
                                            type="text"
                                            value={formData.headProfession}
                                            onChange={(e) => setFormData({ ...formData, headProfession: e.target.value })}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:ring-2 focus:ring-accent/20 text-xs font-bold text-white outline-none"
                                            placeholder="e.g. MD, PhD, Psychiatrist"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-2">Authorized ID Photo</label>
                                    <div className="flex items-center gap-6">
                                        {formData.headImage && (
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl flex-shrink-0 group relative">
                                                <img src={formData.headImage} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                                <div className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => setFormData({ ...formData, headImage: '' })}>
                                                    <XMarkIcon className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="relative flex-1 group">
                                            <input
                                                type="file"
                                                onChange={(e) => handleImageUpload(e, 'headImage')}
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                accept="image/*"
                                            />
                                            <div className="w-full px-6 py-4 bg-white/5 border-2 border-dashed border-white/10 rounded-[1.5rem] text-[10px] font-black text-slate-300 uppercase tracking-widest text-center group-hover:bg-white/10 group-hover:border-accent/40 transition-all">
                                                {uploading === 'headImage' ? 'SYNCHRONIZING ASSET...' : 'UPLOAD PERSonNel PHOTO'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Display Sequence</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-full px-6 py-5 bg-slate-50 border-0 rounded-3xl focus:ring-2 focus:ring-primary/10 text-sm font-bold outline-none"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Entity Authorization</label>
                                    <select
                                        value={formData.isActive ? 'true' : 'false'}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                        className="w-full px-6 py-5 bg-slate-50 border-0 rounded-3xl focus:ring-2 focus:ring-primary/10 text-sm font-bold outline-none appearance-none"
                                    >
                                        <option value="true">✅ OPERATIONAL</option>
                                        <option value="false">⚠️ NON-AUTHORIZED / DRAFT</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-6 pt-8 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-900 ml-2">Asset Integration Hub</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            onChange={(e) => handleImageUpload(e, 'gallery')}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            accept="image/*"
                                        />
                                        <span className="text-[10px] font-black text-primary group-hover:text-primary-dark transition-all uppercase tracking-widest flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl border border-primary/10">
                                            {uploading === 'gallery' ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : <><PlusIcon className="w-4 h-4" /> SECURE INTEGRAL ASSET</>}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                    {formData.gallery && formData.gallery.split(';').map((url, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-[1.5rem] overflow-hidden group shadow-lg">
                                            <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" crossOrigin="anonymous" />
                                            <div className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => removeGalleryImage(url)}>
                                                <TrashIcon className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    ))}
                                    {(!formData.gallery || formData.gallery.split(';').length < 6) && (
                                        <div className="aspect-square rounded-[1.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-200 gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <PhotoIcon className="w-6 h-6" />
                                            <span className="text-[8px] font-black font-jakarta uppercase tracking-tighter">EMPTY NODE</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6 pt-8 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-900 ml-2">Master Visibility Asset</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            onChange={(e) => handleImageUpload(e, 'image')}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            accept="image/*"
                                        />
                                        <span className="text-[10px] font-black text-primary transition-all uppercase tracking-widest flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl">
                                            {uploading === 'image' ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : <><PhotoIcon className="w-4 h-4" /> OVERWRITE MASTER IMAGE</>}
                                        </span>
                                    </div>
                                </div>
                                {formData.image ? (
                                    <div className="relative h-64 rounded-[2.5rem] overflow-hidden group shadow-2xl ring-4 ring-slate-50">
                                        <img src={formData.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" crossOrigin="anonymous" />
                                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: '' })}
                                                className="px-10 py-4 bg-red-600/90 text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-2xl"
                                            >
                                                UNLINK MASTER media
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-48 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-200 gap-3">
                                        <BuildingOfficeIcon className="w-12 h-12" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Master Node Inactive</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col lg:flex-row items-center gap-4 pt-10 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full lg:flex-1 h-20 bg-slate-50 text-slate-400 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.25em] hover:bg-slate-100 transition-all border border-slate-100"
                                >
                                    ABORT MISSION
                                </button>
                                <button
                                    type="submit"
                                    className="w-full lg:flex-1 h-20 bg-primary text-white rounded-[2rem] text-[12px] font-black uppercase tracking-[0.25em] hover:bg-primary-dark transition-all shadow-[0_20px_40px_rgba(27,79,138,0.3)] hover:-translate-y-1 active:translate-y-0"
                                >
                                    {editingDept ? 'SYNCHRONIZE UPDATE' : 'DEPLOY ENTITY'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
