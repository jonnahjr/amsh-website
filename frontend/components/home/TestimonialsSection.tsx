'use client';

import { useState, useEffect, useRef } from 'react';
import { testimonialsAPI, mediaAPI } from '@/lib/api';
import {
    StarIcon,
    ChatBubbleBottomCenterTextIcon,
    SparklesIcon,
    PlusIcon,
    XMarkIcon,
    CloudArrowUpIcon,
    ArrowPathIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        content: '',
        rating: 5,
        image: ''
    });

    const scrollRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);

    useEffect(() => {
        testimonialsAPI.getAll()
            .then(res => {
                const data = res.data.testimonials || [];
                if (data.length > 0) {
                    setTestimonials([...data, ...data, ...data]);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const animate = (time: number) => {
        if (lastTimeRef.current !== null && scrollRef.current && !isPaused && testimonials.length > 0) {
            const deltaTime = time - lastTimeRef.current;
            const speed = 0.05;
            scrollRef.current.scrollLeft += speed * deltaTime;

            const singleSetWidth = scrollRef.current.scrollWidth / 3;
            if (scrollRef.current.scrollLeft >= singleSetWidth * 2) {
                scrollRef.current.scrollLeft -= singleSetWidth;
            }
        }
        lastTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPaused, testimonials.length]);

    const handleImageUpload = async (file: File) => {
        try {
            const res = await mediaAPI.upload(file, 'submissions');
            setFormData(prev => ({ ...prev, image: res.data.media.url }));
        } catch {
            alert('Asset capture failed.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await testimonialsAPI.submit(formData);
            setSubmitted(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitted(false);
                setFormData({ name: '', role: '', content: '', rating: 5, image: '' });
            }, 3000);
        } catch {
            alert('Transmission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!loading && testimonials.length === 0 && !isModalOpen) return null;

    return (
        <section className="section bg-[#FDFDFD] overflow-hidden py-32 relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
                    <div className="text-left max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-blue-900/5 flex items-center justify-center">
                                <SparklesIcon className="w-4 h-4 text-blue-900" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900/60 block">
                                Success Narratives
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-8 leading-[0.9] lg:leading-none">
                            Community Stories of <span className="text-blue-900">Transformation</span>
                        </h2>
                        <p className="text-gray-500 text-xl font-medium leading-relaxed opacity-80 max-w-xl">
                            Validated experiences from individuals who have successfully navigated their mental health journeys with EMSH support.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center gap-4 px-10 py-6 bg-slate-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-900 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-2 active:translate-y-0"
                    >
                        <PlusIcon className="w-5 h-5 stroke-[2.5]" />
                        <span>Share Your Story</span>
                        <div className="w-8 h-px bg-white/20 group-hover:w-12 transition-all" />
                    </button>
                </div>
            </div>

            {/* Continuous Marquee */}
            <div
                className="relative cursor-grab active:cursor-grabbing"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#FDFDFD] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[#FDFDFD] to-transparent z-10 pointer-events-none" />

                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto no-scrollbar py-10 px-6"
                    style={{ scrollBehavior: 'auto' }}
                >
                    {testimonials.map((t, idx) => (
                        <div
                            key={`${t.id}-${idx}`}
                            className="flex-shrink-0 w-[380px] bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] transition-all duration-700 flex flex-col group/card relative overflow-hidden active:scale-95"
                        >
                            <div className="absolute top-6 right-8 text-7xl font-serif text-blue-900/5 group-hover/card:text-blue-900/10 transition-colors select-none italic">“</div>

                            <div className="flex items-center gap-1 mb-6 translate-z-0">
                                {[...Array(5)].map((_, si) => (
                                    <StarIcon
                                        key={si}
                                        className={`w-4 h-4 ${si < (t.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-gray-100'}`}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-600 text-base leading-[1.7] italic mb-8 flex-1 font-medium line-clamp-4 relative z-10 first-letter:text-3xl first-letter:font-black first-letter:text-blue-900 first-letter:mr-1">
                                {t.content}
                            </p>

                            <div className="flex items-center gap-4 pt-8 border-t border-gray-50 mt-auto">
                                <div className="relative shrink-0">
                                    {t.image ? (
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            className="w-14 h-14 rounded-full object-cover shadow-lg group-hover/card:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center font-black text-white text-lg shadow-lg uppercase">
                                            {t.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center transform scale-110 drop-shadow-md">
                                        <svg viewBox="0 0 48 48" className="w-full h-full">
                                            <polygon fill="#42a5f5" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"></polygon>
                                            <polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"></polygon>
                                        </svg>
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <div className="font-black text-gray-900 uppercase tracking-tighter text-lg leading-none mb-1.5 truncate group-hover/card:text-blue-900 transition-colors">
                                        {t.name}
                                    </div>
                                    <div className="text-[9px] font-black text-blue-900/40 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-900/20" />
                                        {t.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submission Portal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-500">
                    <div className="bg-white rounded-[4rem] w-full max-w-2xl shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20">
                        {submitted ? (
                            <div className="p-24 text-center space-y-8 animate-in zoom-in-90 duration-700">
                                <div className="w-32 h-32 bg-green-50 rounded-[3.5rem] flex items-center justify-center mx-auto text-green-500 shadow-inner">
                                    <CheckCircleIcon className="w-16 h-16 stroke-[1.5]" />
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 tracking-tighter">Story Broadcast Initialized</h3>
                                <p className="text-gray-500 font-medium uppercase tracking-[0.2em] text-[10px]">Your experience has been queued for institutional validation.</p>
                            </div>
                        ) : (
                            <>
                                <div className="px-12 py-12 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-blue-900 text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-blue-900/20">
                                            <ChatBubbleBottomCenterTextIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter leading-none mb-2 uppercase">Narrative Entry</h3>
                                            <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-[0.4em]">Community Knowledge Insertion</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-white rounded-2xl text-gray-400 hover:text-red-500 transition-all border border-transparent hover:border-slate-100">
                                        <XMarkIcon className="w-8 h-8" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-12 space-y-10 group/form">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em] ml-2">Your Nomenclature</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-8 py-5 bg-slate-50 border-0 rounded-[1.5rem] text-sm font-black text-gray-900 focus:ring-[12px] focus:ring-blue-900/5 transition-all outline-none placeholder:text-gray-300 shadow-inner"
                                                placeholder="Full Signature"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em] ml-2">Affiliation / Status</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-8 py-5 bg-slate-50 border-0 rounded-[1.5rem] text-sm font-black text-gray-900 focus:ring-[12px] focus:ring-blue-900/5 transition-all outline-none placeholder:text-gray-300 shadow-inner"
                                                placeholder="e.g. Member, Professional"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em] ml-2">Success Narrative</label>
                                        <textarea
                                            required
                                            rows={4}
                                            className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] text-base font-medium text-gray-600 focus:ring-[12px] focus:ring-blue-900/5 transition-all outline-none resize-none shadow-inner leading-relaxed"
                                            placeholder="Document your journey of transformation..."
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center gap-12">
                                        <div className="flex-1 space-y-4">
                                            <label className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em] ml-2">Sentiment Level</label>
                                            <div className="flex items-center gap-3">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, rating: star })}
                                                        className="hover:scale-125 transition-transform active:scale-95"
                                                    >
                                                        <StarIcon className={`w-10 h-10 ${star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-100'}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="shrink-0 flex items-center gap-6">
                                            <div className="relative w-20 h-20 group/avatar">
                                                {formData.image ? (
                                                    <img src={formData.image} className="w-full h-full object-cover rounded-[1.5rem] border-2 border-slate-100 shadow-lg" />
                                                ) : (
                                                    <div className="w-full h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[1.5rem] flex items-center justify-center text-gray-200">
                                                        <CloudArrowUpIcon className="w-8 h-8" />
                                                    </div>
                                                )}
                                            </div>
                                            <label className="px-6 py-4 bg-slate-900 hover:bg-blue-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] cursor-pointer transition-all active:scale-95 shadow-lg">
                                                {formData.image ? 'RESYNC AVATAR' : 'UPLOAD AVATAR'}
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-8 bg-blue-900 text-white rounded-[2.5rem] text-xs font-black uppercase tracking-[0.4em] shadow-[0_25px_50px_rgba(30,58,138,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                                    >
                                        {submitting ? (
                                            <ArrowPathIcon className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <span>Commute Transformation Story</span>
                                                <div className="w-12 h-px bg-white/30" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}
