'use client';

import { useState, useEffect, useCallback } from 'react';
import { testimonialsAPI, mediaAPI } from '@/lib/api';
import {
    MegaphoneIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    StarIcon,
    CheckCircleIcon,
    XCircleIcon,
    PhotoIcon,
    XMarkIcon,
    CloudArrowUpIcon,
    SparklesIcon,
    ChatBubbleBottomCenterTextIcon,
    UserIcon,
    ArrowPathIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    AdjustmentsHorizontalIcon,
    ShieldCheckIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';

const SAMPLE_DATA = [
    {
        id: 'sample-1',
        name: 'Dawit Bekele',
        role: 'Patient Family Member',
        content: 'AMSH provided exceptional care for my family member during a crisis. The staff were professional, compassionate, and thorough. We are eternally grateful.',
        rating: 5,
        image: '',
        isActive: true,
        order: 1,
        createdAt: new Date().toISOString()
    },
    {
        id: 'sample-2',
        name: 'Dr. Almaz Tesfaye',
        role: 'Healthcare Professional',
        content: 'The CPD programs at AMSH are world-class. I have enhanced my skills significantly and apply new knowledge daily in my practice.',
        rating: 5,
        image: '',
        isActive: true,
        order: 2,
        createdAt: new Date().toISOString()
    },
    {
        id: 'sample-3',
        name: 'Hana Girma',
        role: 'Research Collaborator',
        content: 'Collaborating with AMSH on mental health research has been a rewarding experience. Their commitment to advancing knowledge is inspiring.',
        rating: 5,
        image: '',
        isActive: true,
        order: 3,
        createdAt: new Date().toISOString()
    },
    {
        id: 'sample-4',
        name: 'Daniel Kebede',
        role: 'Patient',
        content: 'The holistic approach at EMSH really helped me recover. I am grateful to the entire team.',
        rating: 5,
        image: '',
        isActive: true,
        order: 4,
        createdAt: new Date().toISOString()
    },
    {
        id: 'sample-5',
        name: 'Aster Mamo',
        role: 'Parent',
        content: 'Finding a child psychiatrist who understands our culture was a relief. Highly recommend EMSH.',
        rating: 5,
        image: '',
        isActive: true,
        order: 5,
        createdAt: new Date().toISOString()
    }
];

export default function TestimonialsAdmin() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [filterRating, setFilterRating] = useState<number | 'ALL'>('ALL');
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'DRAFT'>('ALL');

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        content: '',
        rating: 5,
        image: '',
        isActive: true,
        order: 0
    });

    const fetchTestimonials = useCallback(async () => {
        setLoading(true);
        try {
            const res = await testimonialsAPI.getAll({ all: true });
            const data = res.data.testimonials || [];
            if (data.length === 0) {
                setTestimonials(SAMPLE_DATA);
            } else {
                setTestimonials(data);
            }
        } catch (error) {
            console.error('Fetch testimonials error:', error);
            setTestimonials(SAMPLE_DATA);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTestimonials();
    }, [fetchTestimonials]);

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        try {
            const res = await mediaAPI.upload(file, 'testimonials');
            setFormData(prev => ({ ...prev, image: res.data.media.url }));
        } catch {
            alert('Image capture failed.');
        } finally {
            setUploading(false);
        }
    };

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
            if (editingItem && !editingItem.id.startsWith('sample-')) {
                await testimonialsAPI.update(editingItem.id, formData);
            } else {
                // If it was a sample or new
                await testimonialsAPI.create(formData);
            }
            setIsModalOpen(false);
            fetchTestimonials();
        } catch (error) {
            alert('Data persistence failed.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Purge this success story from the global directory?')) return;
        try {
            if (!id.startsWith('sample-')) {
                await testimonialsAPI.delete(id);
            }
            setTestimonials(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            alert('Delete protocol failed.');
        }
    };

    const toggleStatus = async (item: any) => {
        try {
            if (!item.id.startsWith('sample-')) {
                await testimonialsAPI.update(item.id, { ...item, isActive: !item.isActive });
            }
            setTestimonials(prev => prev.map(t => t.id === item.id ? { ...t, isActive: !t.isActive } : t));
        } catch (error) {
            alert('Status toggle failed.');
        }
    };

    const filtered = testimonials.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.role.toLowerCase().includes(search.toLowerCase()) ||
            t.content.toLowerCase().includes(search.toLowerCase());
        const matchesRating = filterRating === 'ALL' || t.rating === filterRating;
        const matchesStatus = filterStatus === 'ALL' || (filterStatus === 'ACTIVE' ? t.isActive : !t.isActive);
        return matchesSearch && matchesRating && matchesStatus;
    });

    const stats = {
        total: testimonials.length,
        active: testimonials.filter(t => t.isActive).length,
        highRating: testimonials.filter(t => t.rating === 5).length,
        pending: testimonials.filter(t => !t.isActive).length
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Command Center Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[4rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">Institutional Success Metrics</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none mb-6">Customer Stories</h2>
                    <p className="text-slate-500 font-medium max-w-2xl leading-relaxed text-lg">Curating high-impact narratives and success telemetry to validate institutional excellence across global channels.</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 relative z-10">
                    <div className="hidden xl:flex items-center gap-8 pr-8 border-r border-slate-100">
                        <div className="text-center">
                            <p className="text-2xl font-black text-slate-900 leading-none">{stats.active}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Active Nodes</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-primary leading-none">{stats.highRating}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Tier-1 Rating</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-4 px-12 py-6 bg-primary text-white rounded-[2.2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-[0_20px_50px_rgba(27,79,138,0.25)] hover:-translate-y-1 active:translate-y-0"
                    >
                        <PlusIcon className="w-5 h-5 stroke-[2.5]" />
                        <span>Deploy Success Story</span>
                    </button>
                </div>
            </div>

            {/* Tactical Control Room (Filters) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-8 rounded-[3.5rem] border border-slate-200/60 shadow-sm">
                <div className="lg:col-span-5 relative group">
                    <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by nomenclature, role, or narrative content..."
                        className="w-full pl-16 pr-8 py-5 bg-slate-50 border-0 rounded-[1.8rem] text-sm font-bold text-slate-700 focus:ring-[12px] focus:ring-primary/5 transition-all outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="lg:col-span-3 flex items-center gap-3">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <StarIcon className="w-5 h-5 text-primary" />
                    </div>
                    <select
                        className="flex-1 bg-slate-50 border-0 rounded-[1.8rem] py-5 px-6 text-xs font-black text-slate-600 uppercase tracking-widest outline-none focus:ring-[12px] focus:ring-primary/5 appearance-none"
                        value={filterRating}
                        onChange={(e) => setFilterRating(e.target.value === 'ALL' ? 'ALL' : parseInt(e.target.value))}
                    >
                        <option value="ALL">All Ratings</option>
                        {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star Signal</option>)}
                    </select>
                </div>

                <div className="lg:col-span-3 flex items-center gap-3">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <AdjustmentsHorizontalIcon className="w-5 h-5 text-primary" />
                    </div>
                    <select
                        className="flex-1 bg-slate-50 border-0 rounded-[1.8rem] py-5 px-6 text-xs font-black text-slate-600 uppercase tracking-widest outline-none focus:ring-[12px] focus:ring-primary/5 appearance-none"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                    >
                        <option value="ALL">Operational Status</option>
                        <option value="ACTIVE">Broadcast Active</option>
                        <option value="DRAFT">Draft Mode</option>
                    </select>
                </div>

                <div className="lg:col-span-1 flex justify-center">
                    <button onClick={fetchTestimonials} className="w-full lg:w-16 h-16 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-primary hover:text-white rounded-2xl transition-all border border-slate-100 group">
                        <ArrowPathIcon className={`w-6 h-6 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
                    </button>
                </div>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {loading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white p-16 rounded-[4rem] border border-slate-50 shadow-sm animate-pulse h-[450px]" />
                    ))
                ) : filtered.length === 0 ? (
                    <div className="col-span-full bg-white py-48 rounded-[5rem] border border-slate-200/60 shadow-sm text-center">
                        <div className="w-32 h-32 bg-slate-50 rounded-[3.5rem] flex items-center justify-center mx-auto mb-10 text-slate-100 shadow-inner">
                            <MegaphoneIcon className="w-16 h-16" />
                        </div>
                        <h3 className="text-3xl font-jakarta font-black text-slate-900 mb-3">No Narrative Nodes Found</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">Adjust your filtering parameters or deploy a new success story.</p>
                    </div>
                ) : (
                    filtered.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`group bg-white p-8 rounded-[2.5rem] border transition-all duration-700 relative flex flex-col hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-2 animate-in slide-in-from-bottom-8 ${!item.isActive ? 'border-amber-100/50 opacity-80' : 'border-slate-100'}`}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {!item.isActive && (
                                <div className="absolute top-6 right-6 bg-amber-500 text-white px-4 py-1.5 text-[7px] font-black uppercase tracking-[0.3em] rounded-xl shadow-lg z-20 animate-pulse">
                                    DRAFT MODE
                                </div>
                            )}

                            <div className="flex items-center gap-6 mb-8 relative z-10">
                                <div className="relative flex-shrink-0">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full object-cover border-[4px] border-slate-50 shadow-xl group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-slate-300 border border-slate-200 group-hover:bg-primary/5 group-hover:text-primary transition-all duration-700 shadow-inner">
                                            <UserIcon className="w-8 h-8" />
                                        </div>
                                    )}
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-2xl border border-slate-50 flex items-center justify-center">
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] font-black text-amber-500">{item.rating}</span>
                                            <StarIcon className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-jakarta font-black text-slate-900 truncate group-hover:text-primary transition-colors uppercase tracking-tight text-lg leading-none mb-2 underline decoration-primary/5 decoration-2 underline-offset-4">{item.name}</h3>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-400 rounded-lg text-[8px] font-black uppercase tracking-widest border border-slate-100 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/10 transition-all">
                                        {item.role}
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex-1 bg-slate-50/40 p-8 rounded-[2rem] mb-10 border border-slate-100 group-hover:bg-white transition-all duration-500 overflow-hidden shadow-inner group-hover:shadow-none">
                                <div className="absolute -top-3 -right-2 text-primary/5 font-serif text-[8rem] leading-none select-none opacity-0 group-hover:opacity-100 transition-opacity">“</div>
                                <p className="text-slate-600 text-base leading-relaxed italic font-medium relative z-10 first-letter:text-3xl first-letter:font-black first-letter:text-primary first-letter:mr-1">
                                    {item.content}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-auto relative z-10">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleStatus(item)}
                                        className={`px-5 py-3 rounded-xl text-[7px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${item.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white' : 'bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-600 hover:text-white'}`}
                                    >
                                        {item.isActive ? <><ShieldCheckIcon className="w-3.5 h-3.5" /> ACTIVE</> : <><AdjustmentsHorizontalIcon className="w-3.5 h-3.5" /> DRAFT</>}
                                    </button>

                                    <div className="flex flex-col gap-0.5 p-0.5 bg-slate-50 rounded-lg border border-slate-100">
                                        <button
                                            onClick={async () => {
                                                const idx = testimonials.findIndex(t => t.id === item.id);
                                                if (idx > 0) {
                                                    const prev = testimonials[idx - 1];
                                                    await Promise.all([
                                                        testimonialsAPI.update(item.id, { ...item, order: prev.order }),
                                                        testimonialsAPI.update(prev.id, { ...prev, order: item.order })
                                                    ]);
                                                    fetchTestimonials();
                                                }
                                            }}
                                            className="p-1 hover:bg-white text-slate-400 hover:text-primary rounded-md transition-all"
                                            title="Shift Priority Up"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
                                        </button>
                                        <button
                                            onClick={async () => {
                                                const idx = testimonials.findIndex(t => t.id === item.id);
                                                if (idx < testimonials.length - 1) {
                                                    const next = testimonials[idx + 1];
                                                    await Promise.all([
                                                        testimonialsAPI.update(item.id, { ...item, order: next.order }),
                                                        testimonialsAPI.update(next.id, { ...next, order: item.order })
                                                    ]);
                                                    fetchTestimonials();
                                                }
                                            }}
                                            className="p-1 hover:bg-white text-slate-400 hover:text-primary rounded-md transition-all"
                                            title="Shift Priority Down"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-100 shadow-sm active:scale-90"
                                        title="Recalibrate Node"
                                    >
                                        <PencilSquareIcon className="w-5 h-5 stroke-[2]" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="w-12 h-12 bg-slate-50 text-slate-200 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-slate-100 shadow-sm active:scale-90"
                                        title="Purge Node"
                                    >
                                        <TrashIcon className="w-5 h-5 stroke-[2]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Tactical Insertion Terminal (Modal) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white rounded-[4.5rem] w-full max-w-3xl shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
                        <div className="relative h-40 bg-slate-900 overflow-hidden flex items-center px-16">
                            <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
                            <SparklesIcon className="absolute -top-10 -left-10 w-64 h-64 text-white opacity-5" />

                            <div className="relative z-10 flex items-center gap-10">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-white border border-white/20 shadow-2xl">
                                    <ChatBubbleBottomCenterTextIcon className="w-10 h-10" />
                                </div>
                                <div>
                                    <h3 className="text-4xl font-jakarta font-black text-white tracking-tight leading-none mb-3 uppercase">
                                        SENTIMENT CONFIG
                                    </h3>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">
                                        {editingItem ? 'Protocol Modification Protocol' : 'New Success Metric Deployment'}
                                    </p>
                                </div>
                            </div>

                            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-4 bg-white/5 hover:bg-white text-slate-400 hover:text-red-500 rounded-2xl transition-all border border-white/10 group active:scale-95">
                                <XMarkIcon className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-16 space-y-12 max-h-[65vh] overflow-y-auto no-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Operator Nomenclature</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-10 py-6 bg-slate-50 border-0 rounded-[2rem] text-sm font-black text-slate-900 focus:ring-[15px] focus:ring-primary/5 transition-all shadow-inner placeholder:text-slate-200 outline-none"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Identification Signature"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Structural Role</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-10 py-6 bg-slate-50 border-0 rounded-[2rem] text-sm font-black text-slate-900 focus:ring-[15px] focus:ring-primary/5 transition-all shadow-inner placeholder:text-slate-200 outline-none"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        placeholder="Operational Status"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Narrative Payload</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full px-10 py-8 bg-slate-50 border-0 rounded-[2.5rem] text-base font-bold text-slate-600 focus:ring-[15px] focus:ring-primary/5 transition-all resize-none shadow-inner leading-relaxed outline-none"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Enter full success narrative documentation..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div className="space-y-6">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Identity Visualization</label>
                                    <div className="flex items-center gap-8">
                                        <div className="relative w-32 h-32 group/avatar">
                                            {formData.image ? (
                                                <>
                                                    <img src={formData.image} className="w-full h-full object-cover rounded-[2.5rem] border-4 border-white shadow-2xl" crossOrigin="anonymous" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                                        className="absolute -top-3 -right-3 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity shadow-lg active:scale-95 z-20"
                                                    >
                                                        <XMarkIcon className="w-5 h-5" />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="w-full h-full bg-slate-50 border-4 border-dashed border-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-100">
                                                    <PhotoIcon className="w-12 h-12 opacity-30" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <label className="inline-flex items-center gap-4 px-8 py-4 bg-slate-900 hover:bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer transition-all shadow-xl active:scale-95">
                                                {uploading ? (
                                                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <CloudArrowUpIcon className="w-4 h-4" />
                                                )}
                                                {uploading ? 'SYNCING...' : 'UPLOAD ASSET'}
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                                            </label>
                                            <p className="text-[9px] text-slate-300 font-bold max-w-[200px] leading-relaxed italic uppercase">Optimized for 1:1 ratio PNG/JPG</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Sentiment Priority</label>
                                    <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-inner">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, rating: star })}
                                                className="transition-transform hover:scale-125 active:scale-90"
                                            >
                                                <StarIcon className={`w-10 h-10 ${star <= formData.rating ? 'text-amber-400 fill-amber-400 shadow-2xl shadow-amber-500/20' : 'text-slate-100'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-10 pt-16 border-t border-slate-100">
                                <label className="flex items-center gap-6 cursor-pointer group w-full md:w-auto p-5 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:border-primary/20 transition-all">
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
                                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em]">Authorize Global Broadcast</span>
                                </label>

                                <button
                                    type="submit"
                                    className="w-full md:flex-1 h-24 bg-primary text-white rounded-[2.5rem] text-xs font-black uppercase tracking-[0.4em] shadow-[0_25px_60px_rgba(27,79,138,0.35)] hover:bg-primary-dark transition-all hover:scale-105 active:scale-95"
                                >
                                    {editingItem ? 'CALIBRATE SUCCESS PROTOCOL' : 'INITIALIZE STORY COMMAND'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
