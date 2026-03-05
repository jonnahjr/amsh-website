'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { servicesAPI } from '@/lib/api';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function ServicesSection() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        servicesAPI.getAll().then(res => {
            setServices(res.data.services || []);
        }).catch(err => {
            console.error('Failed to fetch services:', err);
        }).finally(() => setLoading(false));
    }, []);

    // Fallback static data if loading or empty
    const displayServices = services.length > 0 ? services.slice(0, 4) : [
        { icon: '🚑', name: 'Emergency Service', slug: 'emergency-service', description: '24/7 rapid psychiatric intervention and crisis stabilization.' },
        { icon: '🏥', name: 'Outpatient Services', slug: 'outpatient-services', description: 'Expert psychiatric consultations and follow-up care.' },
        { icon: '🛏️', name: 'Inpatient Services', slug: 'inpatient-services', description: 'Intensive psychiatric care in a safe, restorative environment.' },
        { icon: '🧠', name: 'Psychological Services', slug: 'psychological-services', description: 'Psychological assessment and evidence-based therapies.' },
    ];

    return (
        <section className="section bg-[#F8FAFB] overflow-hidden py-24">
            <div className="container-custom">
                <div className="text-center max-w-5xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-lg shadow-blue-900/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Our Medical Expertise
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-blue-950 tracking-tighter leading-tight mb-8">
                        Clinical Solutions for <br />
                        <span className="text-blue-900 italic font-medium ml-2">Every Patient</span>
                    </h2>

                    <p className="text-blue-900/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        Comprehensive, multidisciplinary care delivered by East Africa's leading psychiatric specialists.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayServices.map((service, i) => (
                        <div
                            key={service.slug}
                            className="group relative bg-white rounded-[48px] p-8 text-blue-950 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] flex flex-col h-full border border-gray-100 overflow-hidden shadow-sm"
                        >
                            {/* Card Header with Image/Icon */}
                            <div className="relative h-40 w-full mb-8 rounded-[32px] overflow-hidden bg-blue-50">
                                {service.image ? (
                                    <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" crossOrigin="anonymous" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-6xl opacity-50">
                                        {service.icon || '💉'}
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-2xl shadow-lg border border-white/50">
                                    {service.icon || '💉'}
                                </div>
                            </div>

                            <div className="flex flex-col flex-1">
                                <h3 className="font-black text-xl mb-4 leading-tight uppercase tracking-tight group-hover:text-blue-900 transition-colors">
                                    {service.name}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed font-medium mb-10 flex-1 line-clamp-3">
                                    {service.description}
                                </p>

                                <div className="pt-8 border-t border-gray-50 mt-auto">
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="flex items-center justify-center gap-3 w-full py-5 bg-blue-950 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-blue-900 hover:shadow-xl transition-all shadow-lg active:scale-95"
                                    >
                                        Clinical Details <ArrowRightIcon className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

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
