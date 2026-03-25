'use client';

import { useState, useEffect } from 'react';
import { servicesAPI, departmentsAPI, mediaAPI } from '@/lib/api';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    PhotoIcon,
    XMarkIcon,
    BriefcaseIcon,
    BuildingLibraryIcon,
    Bars3Icon,
    SparklesIcon,
    MagnifyingGlassIcon,
    ArrowPathIcon,
    LifebuoyIcon,
    GlobeAltIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function ServicesAdmin() {
    const [services, setServices] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDept, setFilterDept] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        content: '',
        image: '',
        icon: '',
        departmentId: '',
        headName: '',
        headTitle: '',
        headProfession: '',
        headImage: '',
        vision: '',
        mission: '',
        goal: '',
        highlights: '',
        order: 0,
        isActive: true,
        gallery: '',
    });
    const [uploading, setUploading] = useState<string | null>(null);

    useEffect(() => {
        fetchServicesAndDepts();
    }, []);

    const fetchServicesAndDepts = async () => {
        setLoading(true);
        try {
            const [servRes, deptRes] = await Promise.all([
                servicesAPI.getAll(),
                departmentsAPI.getAll()
            ]);
            setServices(servRes.data.services || []);
            setDepartments(deptRes.data.departments || []);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (service: any = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                name: service.name,
                slug: service.slug,
                description: service.description,
                content: service.content || '',
                image: service.image || '',
                icon: service.icon || '',
                departmentId: service.departmentId || '',
                headName: service.headName || '',
                headTitle: service.headTitle || '',
                headProfession: service.headProfession || '',
                headImage: service.headImage || '',
                vision: service.vision || '',
                mission: service.mission || '',
                goal: service.goal || '',
                highlights: service.highlights || '',
                order: service.order || 0,
                isActive: service.isActive,
                gallery: service.gallery || '',
            });
        } else {
            setEditingService(null);
            setFormData({
                name: '',
                slug: '',
                description: '',
                content: '',
                image: '',
                icon: '',
                departmentId: filterDept || '',
                headName: '',
                headTitle: '',
                headProfession: '',
                headImage: '',
                vision: '',
                mission: '',
                goal: '',
                highlights: '',
                order: services.length,
                isActive: true,
                gallery: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingService) {
                await servicesAPI.update(editingService.id, formData);
            } else {
                await servicesAPI.create(formData);
            }
            setIsModalOpen(false);
            fetchServicesAndDepts();
        } catch (error) {
            console.error('Save service error:', error);
            alert('Failed to save service.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        try {
            await servicesAPI.delete(id);
            fetchServicesAndDepts();
        } catch (error) {
            console.error('Delete service error:', error);
            alert('Failed to delete service.');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'gallery' | 'headImage') => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(field);
        try {
            const res = await mediaAPI.upload(file, field === 'gallery' ? 'gallery' : 'services');
            if (field === 'gallery') {
                const current = formData.gallery ? formData.gallery.split(';') : [];
                current.push(res.data.media.url);
                setFormData({ ...formData, gallery: current.join(';') });
            } else if (field === 'headImage') {
                setFormData({ ...formData, headImage: res.data.media.url });
            } else {
                setFormData({ ...formData, image: res.data.media.url });
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image.');
        } finally {
            setUploading(null);
        }
    };

    const removeGalleryImage = (url: string) => {
        const current = formData.gallery.split(';').filter(u => u !== url);
        setFormData({ ...formData, gallery: current.join(';') });
    };

    const filtered = services
        .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(s => filterDept ? s.departmentId === filterDept : true);

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Command Center Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <BriefcaseIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Operational Services Matrix</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none mb-6">Clinical Offering Console</h2>
                    <p className="text-slate-500 font-medium max-w-2xl leading-relaxed text-lg">System-wide management of global clinical services, procedural offerings, and user support ecosystems across all hospital departments.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
                    <div className="flex flex-col items-center px-8 border-r border-slate-100 hidden xl:flex">
                        <span className="text-3xl font-black text-slate-900 leading-none">{services.length}</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Active Protocols</span>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="w-full sm:w-auto flex items-center justify-center gap-4 px-12 py-6 bg-primary text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-[0_20px_40px_rgba(27,79,138,0.25)] hover:-translate-y-1 active:translate-y-0"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span>Deploy Protocol</span>
                    </button>
                </div>
            </div>

            {/* Filter Hub */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="relative flex-1 group">
                    <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Scan protocols by nomenclature, objectives, or clinical markers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-16 pr-8 py-5 bg-white border border-slate-200/60 rounded-[2rem] shadow-sm focus:ring-[10px] focus:ring-primary/5 focus:border-primary/20 transition-all font-medium text-slate-700 outline-none"
                    />
                </div>
                <div className="relative group min-w-[300px]">
                    <BuildingLibraryIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <select
                        value={filterDept}
                        onChange={e => setFilterDept(e.target.value)}
                        className="w-full pl-16 pr-10 py-5 bg-white border border-slate-200/60 rounded-[2rem] shadow-sm focus:ring-[10px] focus:ring-primary/5 focus:border-primary/20 transition-all font-bold text-slate-600 outline-none appearance-none"
                    >
                        <option value="">Global Structural View</option>
                        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {loading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-slate-50 animate-pulse h-[500px]" />
                    ))
                ) : filtered.length === 0 ? (
                    <div className="col-span-full bg-white p-32 rounded-[4rem] border border-slate-200/60 text-center shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-slate-200">
                            <BriefcaseIcon className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-jakarta font-black text-slate-900 mb-2">Protocol Archive Empty</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-12">No clinical matches found for the specified filters</p>
                        <button onClick={() => handleOpenModal()} className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary-dark transition-all">
                            <PlusIcon className="w-5 h-5" /> Initialize New Service Node
                        </button>
                    </div>
                ) : (
                    filtered.map((service) => (
                        <div key={service.id} className="group bg-white rounded-[3.5rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden">
                            {/* Visualization Module */}
                            <div className="h-64 relative overflow-hidden flex-shrink-0">
                                {service.image ? (
                                    <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" crossOrigin="anonymous" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-primary-dark flex items-center justify-center">
                                        <div className="opacity-10 group-hover:scale-150 transition-transform duration-700">
                                            <SparklesIcon className="w-40 h-40 text-white" />
                                        </div>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                <div className="absolute top-8 left-8 w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center text-3xl shadow-2xl transition-transform group-hover:scale-110 duration-500">
                                    {service.icon || '💉'}
                                </div>

                                <div className="absolute top-8 right-8">
                                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 shadow-xl ${service.isActive ? 'bg-emerald-500/90 text-white' : 'bg-slate-500/90 text-white'}`}>
                                        {service.isActive ? 'OPERATIONAL' : 'DRAFT'}
                                    </span>
                                </div>

                                <div className="absolute bottom-8 left-10 right-10">
                                    {service.department && (
                                        <div className="flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-[0.25em] mb-2 opacity-80">
                                            <BuildingLibraryIcon className="w-3 h-3" />
                                            {service.department.name}
                                        </div>
                                    )}
                                    <h3 className="font-jakarta font-black text-white text-2xl tracking-tight leading-none group-hover:translate-x-1 transition-transform">{service.name}</h3>
                                </div>
                            </div>

                            {/* Analysis Matrix */}
                            <div className="p-10 flex flex-col flex-1">
                                <p className="text-slate-500 text-[14px] leading-relaxed mb-8 line-clamp-2 font-medium">{service.description}</p>

                                {service.gallery && (
                                    <div className="flex items-center gap-2 mb-8 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                        <div className="flex -space-x-3">
                                            {service.gallery.split(';').slice(0, 3).map((url: string, i: number) => (
                                                <div key={i} className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm hover:z-10 transition-transform hover:scale-110">
                                                    <img src={url} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                                </div>
                                            ))}
                                            {service.gallery.split(';').length > 3 && (
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-400 border-2 border-white shadow-sm">
                                                    +{service.gallery.split(';').length - 3}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Asset Pool</span>
                                    </div>
                                )}

                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Priority Index</span>
                                        <span className="text-sm font-black text-slate-900">NODE-{service.order.toString().padStart(3, '0')}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleOpenModal(service)}
                                            className="p-4 bg-slate-50 text-slate-400 hover:bg-primary hover:text-white rounded-2xl transition-all shadow-sm"
                                            title="Modify Parameters"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service.id)}
                                            className="p-4 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all shadow-sm"
                                            title="Terminate Node"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Service Deployment Terminal (Modal) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-4xl rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden animate-in slide-in-from-bottom-12 duration-500">
                        <div className="px-12 py-10 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-3xl font-jakarta font-black text-slate-900 tracking-tight">{editingService ? 'Calibrate Protocol' : 'Initialize Service Node'}</h3>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.25em] mt-2">Authenticated configuration of clinical service parameters.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-5 hover:bg-white rounded-full transition-all text-slate-300 hover:text-slate-900 group border border-transparent hover:border-slate-200">
                                <XMarkIcon className="w-7 h-7 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-12 space-y-10 max-h-[75vh] overflow-y-auto no-scrollbar">
                            {/* Primary Identity Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Protocol Nomenclature</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[\s/]+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                                        className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-primary/5 focus:border-primary/20 placeholder-slate-200 text-[15px] font-bold transition-all outline-none"
                                        placeholder="Identification e.g. Neonatal Intensive Care"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Structural Alignment</label>
                                    <div className="relative group">
                                        <BuildingLibraryIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                        <select
                                            value={formData.departmentId}
                                            onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                                            className="w-full pl-16 pr-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-primary/5 text-[15px] font-bold transition-all outline-none appearance-none"
                                        >
                                            <option value="">Choose Component Department</option>
                                            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Symbolic and Navigation Tags */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Clinical Icon Symbol</label>
                                    <div className="relative group">
                                        <SparklesIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                            className="w-full pl-16 pr-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-primary/5 text-2xl font-black text-center transition-all outline-none"
                                            placeholder="💉"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Secure Alpha Slug</label>
                                    <div className="relative group">
                                        <GlobeAltIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            className="w-full pl-16 pr-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-primary/5 text-[15px] font-bold text-primary transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Narrative Matrix */}
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Operational Digest</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2.5rem] focus:ring-[10px] focus:ring-primary/5 transition-all placeholder-slate-200 text-[15px] font-medium outline-none resize-none leading-relaxed"
                                    placeholder="Brief clinical summary for global indexing..."
                                />
                            </div>

                            {/* Service Head Details */}
                            <div className="space-y-8 pt-10 border-t border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em]">Service Head / Leadership</h4>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border border-slate-100 p-8 rounded-[3rem] bg-white">
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Head Name</label>
                                            <input
                                                type="text"
                                                value={formData.headName}
                                                onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                                                className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-emerald-500/5 focus:border-emerald-500/20 text-[15px] font-bold transition-all outline-none"
                                                placeholder="e.g. Dr. Abebe Kebede"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Head Title</label>
                                            <input
                                                type="text"
                                                value={formData.headTitle}
                                                onChange={(e) => setFormData({ ...formData, headTitle: e.target.value })}
                                                className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-emerald-500/5 focus:border-emerald-500/20 text-[15px] font-bold transition-all outline-none"
                                                placeholder="e.g. Head of Psychiatry Service"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Professional Background</label>
                                            <input
                                                type="text"
                                                value={formData.headProfession}
                                                onChange={(e) => setFormData({ ...formData, headProfession: e.target.value })}
                                                className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-emerald-500/5 focus:border-emerald-500/20 text-[15px] font-bold transition-all outline-none"
                                                placeholder="e.g. Consultant Psychiatrist"
                                            />
                                        </div>
                                    </div>

                                    {/* Head Image Upload */}
                                    <div className="space-y-4 flex flex-col items-center justify-center">
                                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 w-full text-center">Head Profile Picture</label>
                                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-slate-50 shadow-xl group bg-slate-100 flex items-center justify-center">
                                            {formData.headImage ? (
                                                <>
                                                    <img src={formData.headImage} alt="Head" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" crossOrigin="anonymous" />
                                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
                                                        <span className="text-[10px] font-black text-white px-3 py-1 bg-black/50 rounded-full mt-2">Change Image</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center group-hover:text-emerald-500 transition-colors pointer-events-none">
                                                    <PhotoIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest opacity-50 block px-4">Upload Portrait</span>
                                                </div>
                                            )}
                                            <input
                                                title="Upload Image"
                                                type="file"
                                                onChange={(e) => handleImageUpload(e, 'headImage')}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                accept="image/*"
                                            />
                                        </div>
                                        {uploading === 'headImage' && (
                                            <p className="text-[10px] font-black text-emerald-500 animate-pulse mt-2 uppercase tracking-widest">Uploading...</p>
                                        )}
                                        {formData.headImage && (
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, headImage: '' })}
                                                className="mt-4 text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest px-4 py-2 hover:bg-red-50 rounded-xl transition-colors"
                                            >
                                                Remove Image
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Tactical Core Section */}
                            <div className="space-y-8 pt-10 border-t border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-8 bg-primary rounded-full" />
                                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em]">Strategic Architecture</h4>
                                </div>
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Protocol Vision</label>
                                        <textarea
                                            rows={2}
                                            value={formData.vision}
                                            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                                            className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2.5rem] focus:ring-2 focus:ring-primary/10 text-[14px] font-medium outline-none resize-none"
                                            placeholder="Long-term clinical objective..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Tactical Mission Map</label>
                                            <textarea
                                                rows={4}
                                                value={formData.mission}
                                                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                                                className="w-full px-8 py-6 bg-slate-900 border-0 rounded-[2.5rem] text-[13px] font-bold text-slate-300 outline-none resize-none font-mono"
                                                placeholder="Vector 1&#10;Vector 2&#10;Vector 3..."
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Target Goal Signature</label>
                                            <textarea
                                                rows={4}
                                                value={formData.goal}
                                                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                                className="w-full px-8 py-6 bg-primary/5 border border-primary/10 rounded-[2.5rem] text-[13px] font-bold text-primary outline-none resize-none"
                                                placeholder="Primary metric for current deployment..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Clinical Highlight Matrix (JSON Registry)</label>
                                        <div className="relative">
                                            <ChartBarIcon className="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-200" />
                                            <textarea
                                                rows={2}
                                                value={formData.highlights}
                                                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                                                className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-2 focus:ring-primary/10 text-[13px] font-mono outline-none"
                                                placeholder='[{"label": "Standard", "value": "Enhanced"}, {"label": "Status", "value": "Verified"}]'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Extended Intelligence Data */}
                            <div className="space-y-4 pt-10 border-t border-slate-100">
                                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 ml-2">Comprehensive Intelligence Feed</label>
                                <textarea
                                    rows={8}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-10 py-10 bg-slate-50 border-0 rounded-[3rem] focus:ring-[15px] focus:ring-primary/5 placeholder-slate-200 text-[15px] font-mono outline-none leading-relaxed"
                                    placeholder="Detailed clinical documentation and protocol breakdown..."
                                />
                            </div>

                            {/* Asset Management Hub */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between px-2">
                                        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Master Asset</label>
                                        <div className="relative group">
                                            <input type="file" onChange={(e) => handleImageUpload(e, 'image')} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                                            <span className="text-[10px] font-black text-primary transition-all uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 hover:bg-primary hover:text-white cursor-pointer">
                                                {uploading === 'image' ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : 'SYNCHRONIZE'}
                                            </span>
                                        </div>
                                    </div>
                                    {formData.image ? (
                                        <div className="relative h-64 rounded-[3rem] overflow-hidden group shadow-2xl">
                                            <img src={formData.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" crossOrigin="anonymous" />
                                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="px-10 py-4 bg-red-600/90 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-2xl">
                                                    PURGE ASSET
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-64 rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-100 gap-4 group hover:border-primary/20 hover:bg-primary/5 transition-all">
                                            <PhotoIcon className="w-16 h-16 opacity-30 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Master Node Inactive</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between px-2">
                                        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Collateral Pool</label>
                                        <div className="relative group">
                                            <input type="file" onChange={(e) => handleImageUpload(e, 'gallery')} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                                            <span className="text-[10px] font-black text-primary transition-all uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 hover:bg-primary hover:text-white cursor-pointer">
                                                {uploading === 'gallery' ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : 'INTEGRATE'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {formData.gallery && formData.gallery.split(';').map((url, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-[1.5rem] overflow-hidden group shadow-xl">
                                                <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" crossOrigin="anonymous" />
                                                <div className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => removeGalleryImage(url)}>
                                                    <TrashIcon className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                        ))}
                                        {(!formData.gallery || formData.gallery.split(';').length < 8) && (
                                            <div className="aspect-square rounded-[1.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-100 relative group hover:border-primary/20 hover:bg-primary/5 transition-all">
                                                <input type="file" onChange={(e) => handleImageUpload(e, 'gallery')} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                                                <PlusIcon className="w-6 h-6 opacity-30 group-hover:rotate-90 transition-transform" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Priority and Authorization Matrix */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Protocol Priority Index</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-primary/5 text-[15px] font-bold outline-none"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Entity Authorization Status</label>
                                    <select
                                        value={formData.isActive ? 'true' : 'false'}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                        className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[10px] focus:ring-primary/5 text-[15px] font-bold outline-none appearance-none"
                                    >
                                        <option value="true">✅ AUTHORIZED / OPERATIONAL</option>
                                        <option value="false">⚠️ RESTRICTED / DRAFT</option>
                                    </select>
                                </div>
                            </div>

                            {/* Termination Controls */}
                            <div className="flex flex-col lg:flex-row items-center gap-6 pt-12 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full lg:flex-1 h-24 bg-slate-50 text-slate-400 rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all border border-slate-100"
                                >
                                    ABORT SYNCHRONIZATION
                                </button>
                                <button
                                    type="submit"
                                    className="w-full lg:flex-1 h-24 bg-primary text-white rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.3em] hover:bg-primary-dark transition-all shadow-[0_20px_50px_rgba(27,79,138,0.3)] hover:-translate-y-1 active:translate-y-0"
                                >
                                    {editingService ? 'CALIBRATE PROTOCOL' : 'INITIALIZE NODE'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
