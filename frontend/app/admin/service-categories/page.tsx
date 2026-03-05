'use client';

import { useState, useEffect } from 'react';
import { serviceCategoriesAPI, mediaAPI } from '@/lib/api';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    PhotoIcon,
    CheckIcon,
    XMarkIcon,
    BriefcaseIcon,
    Bars3Icon,
} from '@heroicons/react/24/outline';

export default function ServiceCategoriesAdmin() {
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
        gradient: 'from-blue-950 to-blue-800',
        accentColor: 'bg-blue-900',
        order: 0,
        isActive: true,
        deptSlugs: '',
    });
    const [uploading, setUploading] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await serviceCategoriesAPI.getAll();
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
                description: category.description,
                image: category.image || '',
                icon: category.icon || '',
                gradient: category.gradient || 'from-blue-950 to-blue-800',
                accentColor: category.accentColor || 'bg-blue-900',
                order: category.order || 0,
                isActive: category.isActive,
                deptSlugs: category.deptSlugs || '',
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: '',
                slug: '',
                description: '',
                image: '',
                icon: '',
                gradient: 'from-blue-950 to-blue-800',
                accentColor: 'bg-blue-900',
                order: categories.length,
                isActive: true,
                deptSlugs: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await serviceCategoriesAPI.update(editingCategory.id, formData);
            } else {
                await serviceCategoriesAPI.create(formData);
            }
            setIsModalOpen(false);
            fetchCategories();
        } catch (error) {
            console.error('Save category error:', error);
            alert('Failed to save category.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            await serviceCategoriesAPI.delete(id);
            fetchCategories();
        } catch (error) {
            console.error('Delete category error:', error);
            alert('Failed to delete category.');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading('image');
        try {
            const res = await mediaAPI.upload(file, 'categories');
            setFormData({ ...formData, image: res.data.media.url });
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image.');
        } finally {
            setUploading(null);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Service Categories</h2>
                    <p className="text-gray-500 text-sm">Manage major clinical service groupings and their visual assets.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
                >
                    <PlusIcon className="w-4 h-4" />
                    <span>Add Category</span>
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <input
                    type="text"
                    placeholder="Search categories..."
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
                ) : categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                    <div className="col-span-full bg-white p-20 rounded-[40px] border border-gray-50 text-center">
                        <BriefcaseIcon className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No categories found</p>
                    </div>
                ) : (
                    categories
                        .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((category) => (
                            <div key={category.id} className="bg-white rounded-[32px] border border-gray-50 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                                <div className="h-40 relative group-hover:scale-105 transition-transform duration-700">
                                    {category.image ? (
                                        <img src={category.image} alt={category.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${category.gradient || 'from-blue-900 to-blue-700'} flex items-center justify-center opacity-80`}>
                                            <span className="text-6xl">{category.icon || '🏥'}</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-white/20 text-white backdrop-blur-md border border-white/30`}>
                                            Order: {category.order}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${category.isActive ? 'bg-emerald-500/80' : 'bg-gray-500/80'} text-white backdrop-blur-md`}>
                                            {category.isActive ? 'Active' : 'Draft'}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="text-white font-black text-lg drop-shadow-md">{category.name}</span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-gray-400 text-xs line-clamp-3 mb-6 flex-1">{category.description}</p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleOpenModal(category)}
                                                className="p-2.5 bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-all"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="p-2.5 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-slide-up">
                        <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-black text-gray-900">{editingCategory ? 'Edit' : 'Add'} Service Category</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-xl transition-all">
                                <XMarkIcon className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 placeholder-gray-300 text-sm font-bold"
                                        placeholder="e.g. Mental Health Services"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Icon (Emoji)</label>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-bold"
                                        placeholder="🧠"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
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
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Display Order</label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-bold"
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
                                    placeholder="Write a brief overview of this category..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">CSS Gradient Class</label>
                                    <input
                                        type="text"
                                        value={formData.gradient}
                                        onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-bold"
                                        placeholder="from-blue-950 to-blue-800"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">CSS Accent Class</label>
                                    <input
                                        type="text"
                                        value={formData.accentColor}
                                        onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-bold"
                                        placeholder="bg-blue-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Department Slugs (Semicolon separated)</label>
                                <input
                                    type="text"
                                    value={formData.deptSlugs}
                                    onChange={(e) => setFormData({ ...formData, deptSlugs: e.target.value })}
                                    className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-900/10 text-sm font-bold"
                                    placeholder="psychiatry;neurology;radiology"
                                />
                                <p className="text-[9px] text-gray-400 ml-1">Connects this category to departments and their services.</p>
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

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category Photo</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={handleImageUpload}
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
                                    {editingCategory ? 'Update' : 'Create'} Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
