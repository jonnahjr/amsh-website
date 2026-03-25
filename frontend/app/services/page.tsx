'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import { departmentsAPI, serviceCategoriesAPI } from '@/lib/api';
import { BriefcaseIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ServicesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [serviceCounts, setServiceCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catsRes, deptsRes] = await Promise.all([
                    serviceCategoriesAPI.getAll(),
                    departmentsAPI.getAll()
                ]);

                const cats = catsRes.data.categories || [];
                const depts = deptsRes.data.departments || [];

                setCategories(cats);

                const counts: Record<string, number> = {};
                cats.forEach((cat: any) => {
                    let total = 0;
                    const slugs = cat.deptSlugs ? cat.deptSlugs.split(';') : [];
                    slugs.forEach((ds: string) => {
                        const dept = depts.find((d: any) => d.slug === ds);
                        if (dept) total += dept.services?.length || 0;
                    });
                    counts[cat.slug] = total;
                });
                setServiceCounts(counts);
            } catch (error) {
                console.error('Fetch data error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalServices = Object.values(serviceCounts).reduce((a, b) => a + b, 0);

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-blue-50/30">
                {/* Hero */}
                <section className="relative min-h-screen bg-blue-950 flex items-center overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                    </div>

                    {/* Decorative Blue Orbs */}
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />
                    <div className="container-custom relative z-10 py-32">
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-8">
                            <BriefcaseIcon className="w-4 h-4" />
                            Emmanuel Mental Specialized Hospital
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.92] mb-5">
                            Clinical <br className="hidden md:block" />
                            <span className="text-cyan-400">Services</span>
                        </h1>
                        <p className="text-blue-100/50 text-xl max-w-xl font-medium leading-relaxed mb-10">
                            {loading ? '—' : `${totalServices}+`} specialized sub-services across 12 clinical service areas, dedicated to holistic healing and medical excellence.
                        </p>
                    </div>
                </section>

                {/* Rich Content Section */}
                <section className="py-24 bg-white border-b border-gray-50">
                    <div className="container-custom">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-1 bg-blue-900" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900">Our Care Philosophy</h2>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tighter">
                                    Comprehensive Care For <br />
                                    <span className="text-blue-900">Mental & Physical Health.</span>
                                </h3>
                                <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg">
                                    <p>
                                        At Emmanuel Mental Specialized Hospital, we believe that true recovery is holistic. Our clinical services are designed to bridge the gap between psychiatric excellence and specialized medical care, ensuring that every patient receives a seamless, integrated treatment experience.
                                    </p>
                                    <p>
                                        With over 50 specialized sub-services, we provide a full continuum of care—from acute emergency triage and intensive care to long-term rehabilitation and community outreach. Our multidisciplinary team of psychiatrists, internists, and allied health professionals work in unison to deliver evidence-based interventions tailored to each individual's unique journey.
                                    </p>
                                </div>
                                <div className="mt-10 grid grid-cols-2 gap-6">
                                    <div className="p-6 bg-blue-50 rounded-3xl">
                                        <div className="text-2xl mb-2">🤝</div>
                                        <p className="font-black text-blue-950 text-sm uppercase tracking-wide">Integrated Approach</p>
                                        <p className="text-gray-500 text-xs mt-1">Mental and physical health managed under one roof.</p>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-3xl">
                                        <div className="text-2xl mb-2">⭐</div>
                                        <p className="font-black text-gray-900 text-sm uppercase tracking-wide">Evidence-Based</p>
                                        <p className="text-gray-500 text-xs mt-1">Treatments following international clinical standards.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary side - Simple Process */}
                            <div className="bg-gray-950 rounded-[56px] p-12 lg:p-16 text-white relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 10% 10%, #3b82f6 0%, transparent 60%)' }} />
                                <div className="relative z-10">
                                    <h4 className="text-2xl font-black mb-8 tracking-tight">How to Access Our Services</h4>
                                    <div className="space-y-8">
                                        {[
                                            { step: '01', title: 'Registration & Triage', desc: 'Visit our reception for initial screening and patient registration.' },
                                            { step: '02', title: 'Clinical Assessment', desc: 'Meet with our specialists for a comprehensive diagnostic evaluation.' },
                                            { step: '03', title: 'Personalized Care Plan', desc: 'Receive a tailored treatment plan involving medical and therapeutic support.' },
                                            { step: '04', title: 'Follow-up & Recovery', desc: 'Ongoing monitoring and support through our specialized clinics.' }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-6">
                                                <span className="text-cyan-400 font-black text-sm pt-1">{item.step}</span>
                                                <div>
                                                    <p className="font-black text-base mb-1">{item.title}</p>
                                                    <p className="text-blue-100/40 text-sm leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 12-Card Grid */}
                <section className="py-20 lg:py-28">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {categories.map((cat: any) => (
                                <Link
                                    key={cat.id}
                                    href={`/services/category/${cat.slug}`}
                                    className="group rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                                >
                                    {/* Card Image / Placeholder Header */}
                                    <div className={`relative h-44 bg-blue-50 flex items-center justify-center overflow-hidden border-b border-gray-100`}>
                                        {/* Image Header */}
                                        {cat.image ? (
                                            <img
                                                src={cat.image}
                                                alt={cat.name}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                crossOrigin="anonymous"
                                            />
                                        ) : (
                                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient || 'from-blue-200 to-blue-100'} flex flex-col items-center justify-center`}>
                                                <span className="text-[50px] opacity-[0.1] text-blue-900 group-hover:scale-110 transition-transform duration-500 leading-none select-none">
                                                    {cat.icon}
                                                </span>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-blue-900/10 mt-2">Category Photo</p>
                                            </div>
                                        )}

                                        {/* Icon badge - Now floats between image and content */}
                                        <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-2xl shadow-md z-10 group-hover:-translate-y-1 transition-transform duration-300">
                                            {cat.icon}
                                        </div>

                                        {/* Count badge */}
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg text-[9px] font-black text-gray-700 uppercase tracking-widest shadow-sm">
                                            {loading ? '…' : `${serviceCounts[cat.slug] || 0} svc`}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="bg-blue-950 flex-1 flex flex-col px-6 pb-6 pt-8 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400 opacity-[0.02] rounded-full -mr-12 -mt-12 blur-xl" />

                                        <h2 className="font-black text-white text-sm leading-tight mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                            {cat.name}
                                        </h2>
                                        <p className="text-blue-100/40 text-[11px] leading-relaxed font-medium flex-1 line-clamp-3">
                                            {cat.description}
                                        </p>
                                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest group-hover:text-cyan-400/50 transition-colors">
                                                View Services
                                            </span>
                                            <div className="w-8 h-8 rounded-xl bg-blue-900 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-300 shadow-lg group-hover:shadow-cyan-500/20">
                                                <ChevronRightIcon className="w-4 h-4 text-white group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
