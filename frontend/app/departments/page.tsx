'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import { departmentsAPI, departmentCategoriesAPI } from '@/lib/api';
import {
    ChevronRightIcon,
    BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

export default function DepartmentsPage() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            departmentsAPI.getAll(),
            departmentCategoriesAPI.getAll()
        ]).then(([deptRes, catRes]) => {
            setDepartments(deptRes.data.departments || []);
            setCategories(catRes.data.categories || []);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    const grouped = departments.reduce((acc: any, dept: any) => {
        const cat = dept.categoryName || 'General';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(dept);
        return acc;
    }, {});

    const totalDepartments = departments.length;
    const totalServicesAcrossDepts = departments.reduce((total, d) => total + (d.services?.length || 0), 0);

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">
                {/* Hero */}
                <section className="relative bg-blue-950 pt-40 pb-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%, #1e3a8a 0%, transparent 55%)' }} />
                    <div className="container-custom relative z-10">
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-8">
                            <BuildingOfficeIcon className="w-4 h-4" />
                            Emmanuel Mental Specialized Hospital
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.92] mb-5">
                            Hospital <br className="hidden md:block" />
                            <span className="text-cyan-400">Departments</span>
                        </h1>
                        <p className="text-blue-100/50 text-xl max-w-xl font-medium leading-relaxed mb-10">
                            {loading ? '—' : `${totalDepartments}`} specialized departments and {loading ? '—' : `${totalServicesAcrossDepts}+`} clinical services, organized for comprehensive healing.
                        </p>
                    </div>
                </section>

                {/* Department Cards */}
                <section className="py-20 lg:py-28">
                    <div className="container-custom">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(9)].map((_, i) => <div key={i} className="h-72 bg-gray-100 rounded-[40px] animate-pulse" />)}
                            </div>
                        ) : departments.length === 0 ? (
                            <div className="text-center py-32">
                                <BuildingOfficeIcon className="w-20 h-20 text-gray-100 mx-auto mb-6" />
                                <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No departments found</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {departments.map((dept: any) => {
                                    const catData = categories.find(c => c.name === dept.categoryName) || {};
                                    const gradient = catData.gradient || 'from-blue-900 to-blue-700';
                                    const cat = dept.categoryName || 'General';
                                    return (
                                        <Link
                                            key={dept.id}
                                            href={`/departments/${dept.slug}`}
                                            className="group relative rounded-[40px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                                        >
                                            {/* Image / Gradient Header (Picture Holder) */}
                                            <div className="relative h-60 overflow-hidden bg-blue-900">
                                                {dept.image ? (
                                                    <>
                                                        <img src={dept.image} alt={dept.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" crossOrigin="anonymous" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent" />
                                                    </>
                                                ) : (
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`}>
                                                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                                            <span className="text-4xl opacity-20 filter grayscale mb-2">{dept.icon || '🏥'}</span>
                                                            <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Department Photo</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Category Label Overlay */}
                                                <div className="absolute bottom-5 left-5 z-20">
                                                    <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[8px] font-black text-white uppercase tracking-widest">
                                                        {cat}
                                                    </div>
                                                </div>

                                                {/* Services Count Badge */}
                                                {dept.services?.length > 0 && (
                                                    <div className="absolute top-5 right-5 z-20 px-3 py-1.5 bg-blue-950/80 backdrop-blur-md border border-white/10 rounded-xl text-[9px] font-black text-cyan-400 uppercase tracking-widest shadow-2xl">
                                                        {dept.services.length} svc
                                                    </div>
                                                )}

                                                {/* Icon Badge - Floating */}
                                                <div className="absolute top-5 left-5 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center text-xl shadow-2xl group-hover:-translate-y-1 transition-transform duration-300 z-20">
                                                    {dept.icon || '🏥'}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="bg-blue-950 p-8 flex-1 flex flex-col relative overflow-hidden">
                                                {/* Subtle decorative element */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400 opacity-[0.03] rounded-full -mr-16 -mt-16 blur-2xl" />

                                                <h3 className="font-black text-white text-base mb-3 uppercase tracking-wide leading-tight group-hover:text-cyan-400 transition-colors">{dept.name}</h3>
                                                <p className="text-sm text-blue-100/40 leading-relaxed line-clamp-2 flex-1 font-medium">{dept.description}</p>

                                                {/* Head preview */}
                                                {dept.headName && (
                                                    <div className="flex items-center gap-3 mt-5 py-4 border-t border-white/5">
                                                        <div className="w-8 h-8 rounded-full bg-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center border border-white/10">
                                                            {dept.headImage ? (
                                                                <img src={dept.headImage} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                                            ) : (
                                                                <span className="text-sm opacity-30">👤</span>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[9px] font-black text-blue-200/30 uppercase tracking-widest">Dept Head</p>
                                                            <p className="text-xs font-black text-blue-50 truncate">{dept.headName}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest group-hover:text-cyan-400/50 transition-colors">Learn More</span>
                                                    <div className="w-10 h-10 rounded-xl bg-blue-900 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all shadow-lg group-hover:shadow-cyan-500/20">
                                                        <ChevronRightIcon className="w-5 h-5 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </main >
            <Footer />
            <ChatbotButton />
        </>
    );
}
