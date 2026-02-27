'use client';

import Link from 'next/link';
import {
    AcademicCapIcon,
    BeakerIcon,
    UserGroupIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function ResearchCPDSection() {
    const features = [
        {
            title: 'CPD Programs',
            desc: 'Continuous Professional Development for healthcare workers.',
            icon: <AcademicCapIcon className="w-8 h-8" />,
            href: '/cpd'
        },
        {
            title: 'Research Hub',
            desc: 'Leading clinical trials and mental health studies.',
            icon: <BeakerIcon className="w-8 h-8" />,
            href: '/research'
        },
        {
            title: 'Professional Networks',
            desc: 'Connect with mental health experts globally.',
            icon: <UserGroupIcon className="w-8 h-8" />,
            href: '/contact'
        }
    ];

    return (
        <section className="section bg-[#FFF9F0] relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #1e3a8a 1px, transparent 0)',
                backgroundSize: '40px 40px',
            }} />
            <div className="glow-blue w-[600px] h-[600px] -bottom-64 -right-32 opacity-[0.05]"></div>
            <div className="glow-cyan w-[600px] h-[600px] -top-64 -left-32 opacity-10"></div>

            <div className="container-custom relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/10 border border-blue-900/20 text-blue-900 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        ✦ Research & Professional Development
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-blue-950 mb-8 tracking-tighter leading-tight">
                        Advancing Mental Health<br />
                        <span className="text-blue-900 italic">Knowledge Across Africa</span>
                    </h2>
                    <p className="text-blue-900/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Join our CPD programs, research initiatives, and professional networks to lead the future of psychiatry.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, i) => (
                        <Link
                            key={i}
                            href={feature.href}
                            className="group relative bg-blue-950 border border-white/5 p-8 rounded-[2.5rem] hover:-translate-y-3 transition-all duration-500 overflow-hidden shadow-3xl hover:shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[60px] translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform"></div>

                            <div className="w-16 h-16 bg-blue-900/50 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-950 transition-all duration-500">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-black text-white mb-3 tracking-tight uppercase">
                                {feature.title}
                            </h3>
                            <p className="text-blue-100/60 text-sm leading-relaxed mb-6 italic">
                                "{feature.desc}"
                            </p>

                            <div className="flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                Learn More <ArrowRightIcon className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/cpd" className="bg-cyan-500 hover:bg-blue-50 hover:text-blue-950 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                        Explore CPD Programs
                    </Link>
                    <Link href="/research" className="bg-blue-900 border border-blue-900 hover:bg-transparent hover:text-blue-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-xl">
                        Research Initiatives
                    </Link>
                </div>
            </div>
        </section>
    );
}
