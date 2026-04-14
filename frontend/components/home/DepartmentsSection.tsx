'use client';

import { departmentsAPI, resolveImageUrl, sanitizeIcon } from '@/lib/api';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';



export default function DepartmentsSection() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await departmentsAPI.getAll();
                setDepartments(res.data.departments || []);
            } catch (err) {
                console.error('Failed to fetch departments:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDepartments();
    }, []);

    // Filter: Show featured departments with images
    const visibleDepts = departments.filter(d => {
        const isFeatured = d.show_on_home === true || d.show_on_home === 1 || d.showOnHome === true || d.is_featured === 1;
        const hasPhoto = !!d.image;
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

    if (visibleDepts.length === 0) return null;

    return (
        <section className="relative py-24 bg-[#F5F1E6] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
            
            <div className="container-custom relative z-10">
                <div className="text-center max-w-5xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-lg shadow-blue-900/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Our Specialized Units
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-blue-950 tracking-tighter leading-tight mb-8">
                        Centers of <br />
                        <span className="text-blue-900 italic font-medium">Clinical Excellence</span>
                    </h2>
                    <p className="text-blue-900/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        Expert medical departments specializing in comprehensive mental health and psychological wellness.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                    {visibleDepts.map((dept, i) => (
                        <div key={i} className="group relative bg-blue-950 rounded-[40px] p-4 flex flex-col h-full hover:-translate-y-3 transition-all duration-700 shadow-3xl overflow-hidden border border-white/5">
                            {/* Decorative Corner Aperture */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-bl-[50px] translate-x-3 -translate-y-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                            {/* Department Photo Aperture */}
                            <div className="relative h-48 w-full rounded-[32px] overflow-hidden bg-white/5 group-hover:p-1 transition-all">
                                {dept.image ? (
                                    <img 
                                        src={resolveImageUrl(dept.image)} 
                                        alt={dept.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 group-hover:rounded-[30px]"
                                        
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/10 font-black uppercase tracking-[0.2em] text-[10px] border-2 border-dashed border-white/10 rounded-[30px]">
                                        Unit Image
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                                
                                {/* Floating Icon Badge */}
                                {dept.icon && (
                                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-2xl z-20 group-hover:scale-110 transition-transform">
                                        {sanitizeIcon(dept.icon)}
                                    </div>
                                )}
                            </div>

                            <div className="px-3 pt-6 pb-2 flex flex-col flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-black text-white leading-tight tracking-tight uppercase group-hover:text-cyan-400 transition-colors">
                                        {dept.name}
                                    </h3>
                                </div>
                                <p className="text-[12px] text-blue-100/50 font-medium leading-relaxed mb-6 flex-1 line-clamp-2 italic">
                                    "{dept.description}"
                                </p>
                                <Link 
                                    href={`/departments/${dept.slug}`} 
                                    className="mt-auto py-4 bg-white/5 hover:bg-cyan-500 hover:text-white border border-white/10 rounded-xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-xl active:scale-95 group/btn"
                                >
                                    Explore Unit <ArrowRightIcon className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link href="/departments" className="inline-flex items-center gap-4 group text-blue-950 font-black uppercase tracking-[0.3em] text-[11px] hover:text-blue-700 transition-all">
                        VIEW ALL DEPARTMENTS
                        <div className="w-10 h-10 bg-blue-950 text-white rounded-full flex items-center justify-center text-lg group-hover:translate-x-2 group-hover:bg-cyan-500 transition-all shadow-xl">
                            →
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}

