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
    const [uploading, setUploading] = useState<string | null>(null); // 'image' | 'headImage' | 'gallery' | null

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
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Hospital Departments</h2>
                    <p className="text-gray-500 text-sm">Manage clinical and administrative units of EMSH.</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-2xl">
                    <button
                        onClick={() => setView('grid')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'grid' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Directory
                    </button>
                    <button
                        onClick={() => setView('heads')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'heads' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Heads
                    </button>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
                >
                    <PlusIcon className="w-4 h-4" />
                    <span>Add Department</span>
                </button>
            </div>

            {view === 'heads' && (
                <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden animate-fade-in shadow-sm">
                    <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Department Heads Directory</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Listing all clinical and administrative leadership.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Department</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Head Name</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {departments.map((dept) => (
                                    <tr key={dept.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-sm">{dept.icon || '🏥'}</div>
                                                <span className="font-bold text-gray-900 text-sm">{dept.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                                                    {dept.headImage ? <img src={dept.headImage} className="w-full h-full object-cover" /> : <UserCircleIcon className="w-full h-full text-gray-200" />}
                                                </div>
                                                <span className="font-black text-blue-900 text-sm">{dept.headName || '—'}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 font-bold text-gray-500 text-xs">{dept.headTitle || '—'}</td>
                                        <td className="px-8 py-5">
                                            <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${dept.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                                                {dept.isActive ? 'Active' : 'Inactive'}
                                            </span>
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
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Search departments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-900/10 text-sm font-bold placeholder-gray-300 pl-12"
                        />
                        <Bars3Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-50 animate-pulse h-64" />
                            ))
                        ) : departments.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                            <div className="col-span-full bg-white p-20 rounded-[40px] border border-gray-50 text-center">
                                <BuildingOfficeIcon className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No departments found</p>
                            </div>
                        ) : (
                            departments
                                .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((dept) => (
                                    <div key={dept.id} className="bg-white rounded-[32px] border border-gray-50 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                                        <div className="h-40 relative group-hover:scale-105 transition-transform duration-700">
                                            {dept.image ? (
                                                <img src={dept.image} alt={dept.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                            ) : (
                                                <div className="w-full h-full bg-blue-50 flex items-center justify-center">
                                                    <BuildingOfficeIcon className="w-12 h-12 text-blue-200" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-white/20 text-white backdrop-blur-md border border-white/30`}>
                                                    Order: {dept.order}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${dept.isActive ? 'bg-emerald-500/80' : 'bg-gray-500/80'} text-white backdrop-blur-md`}>
                                                    {dept.isActive ? 'Active' : 'Draft'}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <p className="text-[10px] font-black text-cyan-300 uppercase tracking-widest mb-1">{dept.categoryName || dept.category || 'Clinical Departments'}</p>
                                                <span className="text-white font-black text-lg">{dept.name}</span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <p className="text-gray-400 text-xs line-clamp-2 mb-6 flex-1">{dept.description}</p>
                                            {dept.headName && (
                                                <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-2xl">
                                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                                                        {dept.headImage ? <img src={dept.headImage} alt={dept.headName} className="w-full h-full object-cover" crossOrigin="anonymous" /> : <UserCircleIcon className="w-full h-full text-gray-200" />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest truncate">{dept.headName}</p>
                                                        <p className="text-[9px] text-gray-400 font-bold truncate">{dept.headTitle || 'Head of Department'}</p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleOpenModal(dept)} className="flex-1 px-4 py-2 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-950 hover:text-white transition-all">Edit</button>
                                                <button onClick={() => handleDelete(dept.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-slide-up">
                        <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-black text-gray-900">{editingDept ? 'Edit' : 'Add'} Department</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-xl transition-all">
                                <XMarkIcon className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Dept Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 placeholder-gray-300 text-sm font-bold"
                                        placeholder="e.g. Psychiatry"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
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
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-bold"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Dept Icon (Emoji)</label>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-bold"
                                        placeholder="🏥"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">URL Slug</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 placeholder-gray-300 text-sm font-bold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 placeholder-gray-300 text-sm font-bold"
                                    placeholder="Write a brief overview of this department..."
                                />
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Strategy & Goals</h4>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Department Vision</label>
                                        <textarea
                                            rows={2}
                                            value={formData.vision}
                                            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-bold"
                                            placeholder="The department's long-term vision..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Mission Points (One per line)</label>
                                        <textarea
                                            rows={3}
                                            value={formData.mission}
                                            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-mono"
                                            placeholder="Point 1&#10;Point 2&#10;Point 3..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Key Department Goal</label>
                                        <textarea
                                            rows={2}
                                            value={formData.goal}
                                            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-bold"
                                            placeholder="The main strategic goal for this year..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50/50 p-6 rounded-[32px] space-y-4">
                                <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">Head of Department</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.headName}
                                            onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                                            className="w-full px-4 py-3 bg-white border-0 rounded-xl focus:ring-2 focus:ring-blue-900/10 text-xs font-bold"
                                            placeholder="Dr. John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Title/Role</label>
                                        <input
                                            type="text"
                                            value={formData.headTitle}
                                            onChange={(e) => setFormData({ ...formData, headTitle: e.target.value })}
                                            className="w-full px-4 py-3 bg-white border-0 rounded-xl focus:ring-2 focus:ring-blue-900/10 text-xs font-bold"
                                            placeholder="Chief Psychiatrist"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Head Person Photo</label>
                                    <div className="flex items-center gap-4">
                                        {formData.headImage && (
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-100 flex-shrink-0">
                                                <img src={formData.headImage} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                            </div>
                                        )}
                                        <div className="relative flex-1">
                                            <input
                                                type="file"
                                                onChange={(e) => handleImageUpload(e, 'headImage')}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                accept="image/*"
                                            />
                                            <div className="w-full px-4 py-3 bg-white border border-dashed border-blue-200 rounded-xl text-[10px] font-black text-blue-900 uppercase tracking-widest text-center">
                                                {uploading === 'headImage' ? 'Uploading...' : 'Upload Head Photo'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Display Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Status</label>
                                    <select
                                        value={formData.isActive ? 'true' : 'false'}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-bold"
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Department Gallery (2-3 photos)</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={(e) => handleImageUpload(e, 'gallery')}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept="image/*"
                                        />
                                        <span className="text-xs font-black text-blue-900 hover:text-blue-700 transition-colors uppercase tracking-widest flex items-center gap-2">
                                            {uploading === 'gallery' ? 'Uploading...' : <><PlusIcon className="w-4 h-4" /> Add Photo</>}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {formData.gallery && formData.gallery.split(';').map((url, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                                            <img src={url} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                            <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removeGalleryImage(url)}
                                                    className="p-2 bg-red-600 text-white rounded-full hover:scale-110 transition-transform"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {(!formData.gallery || formData.gallery.split(';').length < 6) && (
                                        <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-center text-gray-300">
                                            <PhotoIcon className="w-8 h-8 opacity-20" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Dept Featured Image</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={(e) => handleImageUpload(e, 'image')}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept="image/*"
                                        />
                                        <span className="text-xs font-black text-blue-900 hover:text-blue-700 transition-colors uppercase tracking-widest flex items-center gap-2">
                                            {uploading === 'image' ? 'Uploading...' : <><PhotoIcon className="w-4 h-4" /> Change Image</>}
                                        </span>
                                    </div>
                                </div>
                                {formData.image && (
                                    <div className="relative h-48 rounded-2xl overflow-hidden group">
                                        <img src={formData.image} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                        <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: '' })}
                                                className="p-3 bg-red-600 text-white rounded-full hover:scale-110 transition-transform"
                                            >
                                                <TrashIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-8 py-4 bg-blue-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
                                >
                                    {editingDept ? 'Update' : 'Create'} Department
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
