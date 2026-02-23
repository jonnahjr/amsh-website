'use client';

import Link from 'next/link';
import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const services = [
    {
        icon: '🚨',
        name: 'Emergency Service',
        slug: 'emergency-service',
        description: 'Available 24/7 for acute psychiatric emergencies. Call 991 immediately for mental health crises.',
        highlight: true
    },
    {
        icon: '🧠',
        name: 'Outpatient Services (OPD)',
        slug: 'outpatient',
        description: 'Comprehensive outpatient psychiatric evaluation, diagnosis, and treatment by specialized psychiatrists.'
    },
    {
        icon: '🛏️',
        name: 'Inpatient Services',
        slug: 'inpatient',
        description: 'Full residential psychiatric care for patients requiring intensive, supervised mental health treatment.'
    },
    {
        icon: '👶',
        name: 'Child & Adolescent Psychiatry',
        slug: 'child-psychiatry',
        description: 'Specialized mental health evaluation and treatment tailored for children and adolescents.'
    },
    {
        icon: '💊',
        name: 'Addiction Treatment',
        slug: 'addiction-treatment',
        description: 'Evidence-based addiction treatment and rehabilitation programs for substance use disorders.'
    },
    {
        icon: '🔬',
        name: 'Laboratory Services',
        slug: 'laboratory',
        description: 'Full diagnostic laboratory services supporting accurate psychiatric diagnoses and treatment monitoring.'
    },
    {
        icon: '💊',
        name: 'Pharmacy',
        slug: 'pharmacy',
        description: 'Enriched pharmacy stocked with all essential psychiatric medications, conveniently on-site.'
    },
    {
        icon: '⚡',
        name: 'EEG Services',
        slug: 'eeg',
        description: 'Electroencephalogram (EEG) diagnostic testing for neurological and psychiatric conditions assessment.'
    },
];

export default function ServicesSection() {
    return (
        <section className="section bg-[#F8FAFB] overflow-hidden py-20">
            <div className="container-custom">
                {/* Header- More compact */}
                <div className="text-center max-w-4xl mx-auto mb-16 px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900 text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Clinical Departments
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tighter leading-tight mb-6">
                        Specialized Mental <span className="text-blue-900 italic font-medium">Healthcare</span>
                    </h2>
                </div>

                {/* Smaller Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <div
                            key={service.slug}
                            className="group relative bg-[#0A1A31] rounded-[2.5rem] p-7 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full border border-white/5 overflow-hidden"
                        >

                            <div className="relative z-10 flex flex-col h-full text-center items-center">
                                {/* Compact Icon Container */}
                                <div className="w-14 h-14 bg-white/5 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-3xl mb-6 border border-white/10 group-hover:bg-blue-900 transition-all duration-700 shadow-lg">
                                    <span>{service.icon}</span>
                                </div>

                                <h3 className="font-black text-lg mb-3 leading-tight uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                                    {service.name}
                                </h3>

                                <p className="text-blue-100/50 text-[13px] leading-relaxed font-medium mb-8 line-clamp-3">
                                    {service.description}
                                </p>

                                {/* Slimmer Actions */}
                                <div className="mt-auto w-full space-y-3 pt-6 border-t border-white/5">
                                    <Link
                                        href="/appointment"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-950 rounded-xl font-black uppercase tracking-wider text-[9px] hover:bg-cyan-400 transition-all shadow-md"
                                    >
                                        <CalendarIcon className="w-3 h-3" />
                                        Book
                                    </Link>
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-transparent border border-white/10 text-white/80 rounded-xl font-black uppercase tracking-wider text-[9px] hover:bg-white/5 transition-all"
                                    >
                                        Details <ArrowRightIcon className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>

                            {/* Faded Background Element - Smaller */}
                            <div className="absolute -bottom-4 -right-4 text-8xl opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none select-none blur-sm">
                                {service.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <Link href="/services" className="inline-flex items-center gap-3 group text-blue-950 font-black uppercase tracking-widest text-[10px] hover:text-blue-700 transition-colors">
                        View All Services
                        <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform">
                            →
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
