'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import { departmentsAPI, serviceCategoriesAPI } from '@/lib/api';
import {
    ChevronRightIcon,
    BriefcaseIcon,
    PhoneIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

const SERVICE_GRADIENTS = [
    'from-blue-900 to-indigo-900',
    'from-indigo-900 to-violet-900',
    'from-teal-900 to-cyan-900',
    'from-emerald-900 to-teal-900',
    'from-rose-900 to-red-900',
    'from-amber-900 to-orange-900',
    'from-purple-900 to-fuchsia-900',
    'from-sky-900 to-blue-900',
    'from-cyan-900 to-sky-900',
    'from-green-900 to-emerald-900',
];

export default function ServiceCategoryPage() {
    const { slug } = useParams();
    const [category, setCategory] = useState<any>(null);
    const [subServices, setSubServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                // Fetch the specific category by slug
                const catRes = await serviceCategoriesAPI.getBySlug(slug as string);
                const cat = catRes.data.category;
                setCategory(cat);

                if (cat) {
                    // Fetch all departments to get their services
                    const deptsRes = await departmentsAPI.getAll();
                    const allDepts = deptsRes.data.departments || [];

                    const deptSlugs = cat.deptSlugs ? cat.deptSlugs.split(';') : [];
                    const gatheredServices = deptSlugs.flatMap((ds: string) => {
                        const dept = allDepts.find((d: any) => d.slug === ds);
                        return dept?.services || [];
                    });
                    setSubServices(gatheredServices);
                }
            } catch (error) {
                console.error('Fetch data error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (!loading && !category) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-xl font-black text-gray-400 uppercase tracking-widest mb-4">Service Category Not Found</p>
                <Link href="/services" className="text-blue-900 font-black text-sm underline">← Back to Services</Link>
            </div>
        </div>
    );

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">
                {/* Hero Banner */}
                <section className={`relative min-h-[55vh] flex items-end overflow-hidden ${category?.image ? '' : `bg-gradient-to-br ${category?.gradient || 'from-blue-950 to-blue-800'}`}`}>
                    {category?.image && (
                        <img
                            src={category.image}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            crossOrigin="anonymous"
                        />
                    )}
                    {category?.image && <div className="absolute inset-0 bg-blue-950/70 backdrop-blur-[2px]" />}
                    {/* Dot grid */}
                    <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                    {/* Glow */}
                    <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />


                    <div className="container-custom relative z-10 pb-16 pt-40">
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 rounded-full text-white/70 text-[10px] font-black uppercase tracking-widest mb-6">
                            <BriefcaseIcon className="w-4 h-4" />
                            {subServices.length} Sub-Service{subServices.length !== 1 ? 's' : ''}
                        </div>


                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.92] mb-5 max-w-3xl">
                            {category?.name}
                        </h1>
                        <p className="text-white/50 text-lg max-w-2xl font-medium leading-relaxed mb-10">
                            {category?.description}
                        </p>
                    </div>
                </section>

                {/* Category Rich Content */}
                <section className="py-24 bg-white border-b border-gray-50">
                    <div className="container-custom">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-1 bg-blue-900" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900">Clinical Excellence</h2>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tighter">
                                    Specialized Care in <br /><span className="text-blue-900">{category?.name}.</span>
                                </h3>
                                <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg">
                                    <p>
                                        Our {category?.name} represent a cornerstone of medical and psychiatric intervention at EMSH. We combine years of clinical expertise with modern diagnostic tools to ensure that every patient receives the most accurate assessment and effective treatment plan possible.
                                    </p>
                                    <p>
                                        Whether you are seeking consultation for common conditions or requiring highly specialized long-term care, our multidisciplinary units are equipped to support your recovery. We adhere to strict international safety protocols and maintain a compassionate environment dedicated to your health and dignity.
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { title: 'Standardized Care', desc: 'Following national and WHO clinical pathways for every unit.', icon: '🛡️' },
                                    { title: 'Expert Team', desc: 'Specialists and nurses with deep clinical experience.', icon: '👩‍⚕️' },
                                    { title: 'Patient Safety', desc: 'Rigorous monitoring and safety standards across all clinics.', icon: '🔒' },
                                    { title: 'Holistic Support', desc: 'Integrated care that addresses both mind and body.', icon: '🔄' }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-blue-950 rounded-[40px] hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-blue-950/20 border border-white/5 group overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400 opacity-[0.03] rounded-full -mr-12 -mt-12 blur-xl" />
                                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                                        <h4 className="font-black text-white text-sm uppercase mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                                        <p className="text-blue-100/40 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sub-Services Grid */}
                <section className="py-20 lg:py-28">
                    <div className="container-custom max-w-6xl">
                        {/* Section header */}
                        <div className="flex items-center gap-4 mb-14">
                            <div className="w-14 h-1 bg-blue-900 rounded-full" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900">All Sub-Services</h2>
                            <span className="text-[9px] font-black text-gray-300 uppercase">{subServices.length} available</span>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-72 bg-gray-100 rounded-[32px] animate-pulse" />
                                ))}
                            </div>
                        ) : subServices.length === 0 ? (
                            <div className="text-center py-24 bg-gray-50 rounded-[48px]">
                                <div className="text-6xl mb-4 opacity-20">{category?.icon}</div>
                                <p className="text-gray-400 font-bold uppercase tracking-widest">No sub-services available yet.</p>
                                <p className="text-gray-300 text-xs mt-2">Contact us for more information about this service area.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {subServices.map((svc: any, index: number) => {
                                    const grad = SERVICE_GRADIENTS[index % SERVICE_GRADIENTS.length];
                                    return (
                                        <Link
                                            key={svc.id || svc.slug}
                                            href={`/services/${svc.slug}`}
                                            className="group rounded-[32px] overflow-hidden border border-gray-100 hover:border-blue-900/20 bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                                        >
                                            {/* Card Image / Placeholder Header */}
                                            <div className="relative h-44 bg-blue-50 flex items-center justify-center overflow-hidden border-b border-gray-100">
                                                {svc.image ? (
                                                    <img
                                                        src={svc.image}
                                                        alt={svc.name}
                                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        crossOrigin="anonymous"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 flex flex-col items-center justify-center">
                                                        <span className="text-[50px] opacity-[0.1] text-blue-900 group-hover:scale-110 transition-transform duration-500 leading-none select-none">
                                                            {svc.icon || '🏥'}
                                                        </span>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-blue-900/10 mt-2">Service Photo</p>
                                                    </div>
                                                )}

                                                {/* Icon badge - floats between image and content */}
                                                <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-2xl shadow-md z-10 group-hover:-translate-y-1 transition-transform duration-300">
                                                    {svc.icon || '💉'}
                                                </div>

                                                {/* Hover arrow top-right */}
                                                <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-1 shadow-sm">
                                                    <ChevronRightIcon className="w-4 h-4 text-gray-700" />
                                                </div>
                                            </div>

                                            {/* Card Body */}
                                            <div className="bg-blue-950 flex-1 flex flex-col px-6 pb-6 pt-8 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400 opacity-[0.02] rounded-full -mr-12 -mt-12 blur-xl" />

                                                <h3 className="font-black text-white group-hover:text-cyan-400 transition-colors text-base leading-tight mb-2">
                                                    {svc.name}
                                                </h3>
                                                <p className="text-blue-100/40 text-[12px] leading-relaxed font-medium flex-1 line-clamp-3">
                                                    {svc.description || 'Specialized clinical service delivered by our expert multidisciplinary team.'}
                                                </p>
                                                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                                                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest group-hover:text-cyan-400/50 transition-colors">
                                                        Learn More
                                                    </span>
                                                    <div className="w-8 h-8 rounded-xl bg-blue-900 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-300 shadow-lg group-hover:shadow-cyan-500/20">
                                                        <ChevronRightIcon className="w-4 h-4 text-white group-hover:text-white transition-colors" />
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

                {/* Why This Service */}
                <section className="py-20 bg-gray-50">
                    <div className="container-custom max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: ShieldCheckIcon, title: 'Evidence-Based Care', desc: 'All services follow national and WHO clinical guidelines for safe, effective patient outcomes.' },
                                { icon: UserGroupIcon, title: 'Multidisciplinary Team', desc: 'Our specialists, nurses, and support staff work collaboratively to provide holistic care.' },
                                { icon: ClockIcon, title: '24/7 Availability', desc: 'Emergency and critical services are available around the clock for urgent needs.' },
                            ].map((v, i) => (
                                <div key={i} className="bg-blue-950 rounded-[32px] p-8 shadow-xl shadow-blue-950/10 border border-white/5 group hover:border-cyan-500/30 transition-all duration-500">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                                        <v.icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h4 className="font-black text-white mb-2 text-sm uppercase tracking-wide group-hover:text-cyan-400 transition-colors">{v.title}</h4>
                                    <p className="text-blue-100/40 text-xs leading-relaxed font-medium">{v.desc}</p>
                                </div>
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
