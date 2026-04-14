'use client';

import Link from 'next/link';
import {
    AcademicCapIcon,
    BeakerIcon,
    GlobeAltIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function ResearchCPDSection() {
    const features = [
        {
            title: 'CPD Programs',
            desc: 'Continuous Professional Development specifically designed for healthcare practitioners to maintain global clinical standards.',
            icon: <AcademicCapIcon className="w-8 h-8" />,
            href: '/cpd',
            badge: 'Professional'
        },
        {
            title: 'Research Hub',
            desc: 'Leading evidence-based clinical trials and high-impact mental health studies across East African populations.',
            icon: <BeakerIcon className="w-8 h-8" />,
            href: '/research',
            badge: 'Scientific'
        },
        {
            title: 'Global Networks',
            desc: 'Connecting institutional experts with global psychiatric networks to modernize mental health care delivery.',
            icon: <GlobeAltIcon className="w-8 h-8" />,
            href: '/contact',
            badge: 'Strategic'
        }
    ];

    return (
        <section className="relative py-24 bg-white border-y-2 border-gray-100/50">
            {/* CLEAN INSTITUTIONAL SEPARATION: BOLD CREAMY CANVAS */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
            
            <div className="container-custom relative z-10">
                {/* Header: Institutional & High-Contrast */}
                <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-blue-900 text-[10px] font-bold uppercase tracking-[0.2em] rounded-md mb-8 border border-gray-200 shadow-sm">
                            Academic & Clinical Excellence
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8 max-w-2xl">
                            Knowledge That <br />
                            <span className="text-blue-900 italic">Redefines</span> Mental Health
                        </h2>
                        <p className="text-slate-600 text-lg md:text-xl max-w-3xl leading-relaxed font-medium">
                            Empowering the next generation of psychiatric leaders through rigorous CPD programs, 
                            cutting-edge clinical research, and extensive peer-to-peer global networking.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, i) => (
                        <Link
                            key={i}
                            href={feature.href}
                            className="group relative bg-white rounded-[45px] p-10 flex flex-col h-full shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 overflow-hidden border border-gray-100"
                        >
                            {/* Institutional Corner Aperture */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[60px] translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="w-16 h-16 bg-blue-950 text-white rounded-2xl flex items-center justify-center group-hover:bg-blue-800 transition-all duration-500 shadow-xl shadow-blue-900/10">
                                        {feature.icon}
                                    </div>
                                    <span className="px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[9px] font-black text-blue-900/30 uppercase tracking-widest group-hover:text-blue-900/50 transition-colors">
                                        {feature.badge}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase group-hover:text-blue-950 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 text-[15px] leading-relaxed mb-10 flex-1 font-medium">
                                    {feature.desc}
                                </p>

                                <div className="flex items-center gap-3 text-blue-900 text-xs font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-all border-t border-gray-50 pt-8">
                                    Discover Potential <ArrowRightIcon className="w-5 h-5 ml-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom Callouts: Government Style High-Contrast Navigation */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-12 border-t border-gray-200">
                    <Link href="/cpd" className="px-12 py-5 bg-blue-900 border border-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-800 transition-all shadow-xl hover:-translate-y-1">
                        Explore CPD Portal
                    </Link>
                    <Link href="/research" className="px-12 py-5 bg-white border-2 border-gray-100 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-gray-50 hover:border-gray-200 transition-all shadow-md hover:-translate-y-1">
                        Research Initiatives
                    </Link>
                </div>
            </div>
        </section>
    );
}
