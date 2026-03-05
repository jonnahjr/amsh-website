'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { departmentsAPI } from '@/lib/api';

export default function DepartmentsSection() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        departmentsAPI.getAll().then(res => {
            setDepartments(res.data.departments || []);
        }).catch(err => {
            console.error('Failed to fetch departments:', err);
        }).finally(() => setLoading(false));
    }, []);

    // Fallback static data if loading or empty
    const displayDepts = departments.length > 0 ? departments.slice(0, 3) : [
        { name: 'Clinical Mental Health', slug: 'clinical-mental-health', icon: '🏥', description: 'Outpatient (OPD), Inpatient, and Emergency Services' },
        { name: 'Psychological Services', slug: 'psychological-services', icon: '🧠', description: 'Assessment, Therapies, and Counseling' },
        { name: 'Addiction & Substance Abuse', slug: 'addiction-substance-abuse', icon: '💊', description: 'Detox, Rehabilitation, and Counseling' },
    ];

    return (
        <section className="section bg-[#FFF9F0] py-24">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/10 border border-blue-900/20 text-blue-900 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                        🏛️ Our Departments
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-6 tracking-tighter">
                        Specialized Clinical Units
                    </h2>
                    <p className="text-blue-900/60 text-lg font-medium">
                        Each department is staffed by expert specialists dedicated to providing the best mental health care in the region.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayDepts.map((dept) => (
                        <Link
                            key={dept.slug}
                            href={`/departments/${dept.slug}`}
                            className="group relative bg-blue-950 rounded-[40px] overflow-hidden text-white transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] shadow-2xl flex flex-col h-[400px]"
                        >
                            {/* Background Image / Placeholder */}
                            <div className="absolute inset-0 z-0">
                                {dept.image ? (
                                    <img src={dept.image} alt={dept.name} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" crossOrigin="anonymous" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-950 opacity-40" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent" />
                            </div>

                            <div className="relative z-10 p-10 mt-auto">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500 shadow-xl">
                                    {dept.icon || (dept.name.toLowerCase().includes('child') ? '👶' : '🧠')}
                                </div>
                                <h3 className="font-black text-2xl mb-3 tracking-tighter group-hover:text-cyan-400 transition-colors uppercase">
                                    {dept.name}
                                </h3>
                                <p className="text-blue-100/60 text-sm font-medium mb-6 line-clamp-2">
                                    {dept.description}
                                </p>
                                <div className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 group-hover:gap-4 transition-all">
                                    EXPLORE DEPARTMENT <span className="text-lg">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link href="/departments" className="inline-flex items-center gap-3 px-12 py-6 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 hover:-translate-y-1">
                        View All Departments
                    </Link>
                </div>
            </div>
        </section>
    );
}
