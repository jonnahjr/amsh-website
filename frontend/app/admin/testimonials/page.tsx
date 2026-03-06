'use client';

import { useState, useEffect } from 'react';
import { testimonialsAPI, mediaAPI } from '@/lib/api';
import {
    MegaphoneIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    UserCircleIcon,
    StarIcon,
    CheckCircleIcon,
    XCircleIcon,
    PhotoIcon,
    XMarkIcon,
    CloudArrowUpIcon,
} from '@heroicons/react/24/outline';

export default function TestimonialsAdmin() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        content: '',
        rating: 5,
        image: '',
        isActive: true,
        order: 0
    });

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        try {
            const res = await mediaAPI.upload(file, 'testimonials');
            setFormData(prev => ({ ...prev, image: res.data.media.url }));
        } catch {
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const res = await testimonialsAPI.getAll({ all: true });
            setTestimonials(res.data.testimonials || []);
        } catch (error) {
            console.error('Fetch testimonials error:', error);
            setTestimonials([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleOpenModal = (item: any = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                role: item.role,
                content: item.content,
                rating: item.rating,
                image: item.image || '',
                isActive: item.isActive,
                order: item.order
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                role: '',
                content: '',
                rating: 5,
                image: '',
                isActive: true,
                order: testimonials.length + 1
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await testimonialsAPI.update(editingItem.id, formData);
            } else {
                await testimonialsAPI.create(formData);
            }
            setIsModalOpen(false);
            fetchTestimonials();
        } catch (error) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await testimonialsAPI.delete(id);
                fetchTestimonials();
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const toggleStatus = async (item: any) => {
        try {
            await testimonialsAPI.update(item.id, { ...item, isActive: !item.isActive });
            fetchTestimonials();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Patient Testimonials</h2>
                    <p className="text-gray-500 text-sm">Manage patient success stories and reviews displayed on the website.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn-primary"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Testimonial</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm animate-pulse h-64" />
                    ))
                ) : testimonials.length === 0 ? (
                    <div className="col-span-full bg-white py-24 rounded-[2rem] border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MegaphoneIcon className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No testimonials added yet</p>
                    </div>
                ) : (
                    testimonials.map((item) => (
                        <div key={item.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden flex flex-col">
                            {!item.isActive && (
                                <div className="absolute top-0 right-0 bg-gray-100 text-gray-400 px-4 py-1 text-[8px] font-black uppercase tracking-widest rounded-bl-xl border-b border-l border-gray-200">
                                    INACTIVE
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-6">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-50" />
                                ) : (
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-900 border border-blue-100">
                                        <UserCircleIcon className="w-8 h-8" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-gray-900 truncate group-hover:text-blue-900 transition-colors uppercase tracking-tight text-lg">{item.name}</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.role}</p>
                                </div>
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className={`w-3 h-3 ${i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1 italic font-medium">
                                "{item.content}"
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleStatus(item)}
                                        className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all ${item.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100'}`}
                                    >
                                        {item.isActive ? <><CheckCircleIcon className="w-3.5 h-3.5" /> Active</> : <><XCircleIcon className="w-3.5 h-3.5" /> Hidden</>}
                                    </button>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="p-2.5 bg-blue-50 text-blue-900 rounded-xl hover:bg-blue-100 transition-all border border-blue-100"
                                        title="Edit"
                                    >
                                        <PencilSquareIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all border border-red-100"
                                        title="Delete"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">
                                    {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
                                </h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                                    {editingItem ? 'Update patient feedback' : 'Share a new success story'}
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white rounded-2xl text-gray-400 hover:text-gray-600 transition-all shadow-sm">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-10 space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Patient Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-900 transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Role / Relation</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-900 transition-all"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        placeholder="e.g. Patient, Family Member"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Feedback Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-900 transition-all resize-none"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Enter patient testimony..."
                                />
                            </div>

                            {/* Profile Image */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Profile Photo</label>
                                <div className="flex items-center gap-6">
                                    <div className="relative w-24 h-24 group">
                                        {formData.image ? (
                                            <>
                                                <img src={formData.image} className="w-full h-full object-cover rounded-[1.5rem] border-2 border-blue-50" crossOrigin="anonymous" />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                                    className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                                >
                                                    <XMarkIcon className="w-3 h-3" />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="w-full h-full bg-gray-50 border-2 border-dashed border-gray-100 rounded-[1.5rem] flex items-center justify-center text-gray-200">
                                                <UserCircleIcon className="w-12 h-12 opacity-30" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <label className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-900/10 text-blue-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 cursor-pointer transition-all">
                                            {uploading ? (
                                                <span className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <CloudArrowUpIcon className="w-4 h-4" />
                                            )}
                                            {uploading ? 'Uploading...' : 'Choose Photo'}
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                                        </label>
                                        <p className="text-[10px] text-gray-400 font-bold max-w-[200px] leading-relaxed">
                                            Best size: 200x200px. JPG, PNG or WEBP.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Rating (1-5)</label>
                                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, rating: star })}
                                                className="transition-transform active:scale-95"
                                            >
                                                <StarIcon className={`w-8 h-8 ${star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest ml-1">Display Order</label>
                                    <input
                                        type="number"
                                        className="w-full px-5 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-900 transition-all"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-8 pt-6">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-900 transition-colors shadow-inner" />
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-sm" />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-blue-900 transition-colors">Visible on Website</span>
                                </label>

                                <button
                                    type="submit"
                                    className="flex-1 btn-primary py-5 rounded-[1.5rem] shadow-xl shadow-blue-900/20 text-xs tracking-[0.2em]"
                                >
                                    {editingItem ? 'Update Testimonial' : 'Save Testimonial'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

