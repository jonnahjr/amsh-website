'use client';

import { servicesAPI, resolveImageUrl, sanitizeIcon } from '@/lib/api';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';



export default function ServicesSection() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Focus exclusively on clinical individual services as requested
                const servRes = await servicesAPI.getAll();
                setCategories(servRes.data.services || []);
            } catch (err) {
                console.error('Failed to resolve clinical services synchronization:', err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchServices();
    }, []);

    // Exclusive High-Authority Filter: Only show if FEATURED and HAS PHOTO (no placeholders)
    const visibleServices = categories.filter(s => {
        const isFeatured = s.show_on_home === true || s.show_on_home === 1 || s.showOnHome === true || s.is_featured === 1;
        const hasPhoto = !!s.image;
        return isFeatured && hasPhoto;
    });

    if (loading) {
        return (
            <div className="py-24 animate-pulse container-custom">
                <div className="h-4 w-32 bg-gray-200 rounded-full mx-auto mb-8" />
                <div className="h-12 w-96 bg-gray-200 rounded-2xl mx-auto mb-20" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-80 bg-gray-100 rounded-[40px]" />)}
                </div>
            </div>
        );
    }

    return (
        <section className="relative py-24 bg-white overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
            
            <div className="container-custom relative z-10">
                <div className="text-center max-w-5xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-lg shadow-blue-900/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Trusted Medical Partners
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-blue-950 tracking-tighter leading-tight mb-8">
                        Clinical Solutions for <br />
                        <span className="text-blue-900 italic font-medium">Every Patient</span>
                    </h2>
                    <p className="text-blue-900/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        Comprehensive, multidisciplinary care delivered by East Africa's leading psychiatric specialists.
                    </p>
                </div>

                {visibleServices.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                        {visibleServices.map((s, i) => (
                        <div key={i} className="group relative bg-blue-950 rounded-[40px] p-4 flex flex-col h-full hover:-translate-y-3 transition-all duration-700 shadow-3xl overflow-hidden border border-white/5">
                            {/* Decorative Corner Aperture */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-[50px] translate-x-3 -translate-y-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                            {/* Category Photo Aperture */}
                            <div className="relative h-48 w-full rounded-[32px] overflow-hidden bg-white/5 group-hover:p-1 transition-all">
                                {s.image ? (
                                    <img 
                                        src={resolveImageUrl(s.image)} 
                                        alt={s.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 group-hover:rounded-[30px]"
                                        
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/10 font-black uppercase tracking-[0.2em] text-[10px] border-2 border-dashed border-white/10 rounded-[30px]">
                                        Service Photo
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                                
                                {/* Floating Icon Badge */}
                                {s.icon && (
                                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-2xl z-20 group-hover:scale-110 transition-transform">
                                        {sanitizeIcon(s.icon)}
                                    </div>
                                )}
                            </div>

                            <div className="px-3 pt-6 pb-2 flex flex-col flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-black text-white leading-tight tracking-tight uppercase group-hover:text-cyan-400 transition-colors">
                                        {s.name}
                                    </h3>
                                </div>
                                <p className="text-[12px] text-blue-100/50 font-medium leading-relaxed mb-6 flex-1 line-clamp-2 italic">
                                    "{s.description}"
                                </p>
                                <Link 
                                    href={`/services/${s.slug}`} 
                                    className="mt-auto py-4 bg-white/5 hover:bg-white hover:text-blue-950 border border-white/10 rounded-xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-xl active:scale-95 group/btn"
                                >
                                    View Services <ArrowRightIcon className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                )}

                <div className="mt-20 text-center">
                    <Link href="/services" className="inline-flex items-center gap-4 group text-blue-950 font-black uppercase tracking-[0.3em] text-[11px] hover:text-blue-700 transition-all">
                        EXPLORE ALL SERVICES
                        <div className="w-10 h-10 bg-blue-950 text-white rounded-full flex items-center justify-center text-lg group-hover:translate-x-2 group-hover:bg-cyan-500 transition-all shadow-xl">
                            →
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
