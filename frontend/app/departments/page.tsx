'use client';

import React from 'react';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import {
    ChevronRightIcon,
    HomeIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

import {
    Brain,
    Baby,
    Activity,
    AlertCircle,
    Microscope,
    Zap,
    RefreshCcw,
    Pill,
    Scale,
    Stethoscope,
    MessageSquare,
} from 'lucide-react';

const categories = [
    { id: 'clinical', label: 'Clinical Services', icon: Stethoscope },
    { id: 'diagnostic', label: 'Diagnostic & Support', icon: Microscope },
];

const departments = [
    {
        name: 'Adult Psychiatry',
        slug: 'adult-psychiatry',
        icon: Brain,
        category: 'clinical',
        color: 'from-blue-600 to-blue-900',
        desc: 'Specialized diagnosis and treatment for mental health conditions in adults, utilizing global evidence-based standards.'
    },
    {
        name: 'Child & Adolescent Psychiatry',
        slug: 'child-psychiatry',
        icon: Baby,
        category: 'clinical',
        color: 'from-purple-600 to-purple-900',
        desc: 'Comprehensive mental health services for children and adolescents, focusing on early intervention and development.'
    },
    {
        name: 'Addiction Treatment Unit',
        slug: 'addiction-treatment',
        icon: Activity,
        category: 'clinical',
        color: 'from-teal-600 to-teal-900',
        desc: 'World-class rehabilitation programs for substance use disorders and behavioral addictions.'
    },
    {
        name: 'Emergency Psychiatry',
        slug: 'emergency',
        icon: AlertCircle,
        category: 'clinical',
        color: 'from-red-600 to-red-900',
        desc: '24/7 acute crisis intervention and stabilization services for immediate psychiatric care.'
    },
    {
        name: 'Clinical Psychology',
        slug: 'psychology',
        icon: Microscope,
        category: 'clinical',
        color: 'from-green-600 to-green-900',
        desc: 'Advanced psychological assessments and evidence-based psychotherapy provided by expert clinicians.'
    },
    {
        name: 'Neurology / EEG',
        slug: 'neurology',
        icon: Zap,
        category: 'diagnostic',
        color: 'from-blue-400 to-blue-600',
        desc: 'Cutting-edge neurological diagnostics and EEG monitoring for comprehensive brain health assessment.'
    },
    {
        name: 'Clinical Mental Health',
        slug: 'clinical-mental-health',
        icon: Brain,
        category: 'clinical',
        color: 'from-cyan-600 to-cyan-900',
        desc: 'Primary psychiatric consultations and long-term outpatient management for stable recovery.'
    },
    {
        name: 'Rehabilitation Services',
        slug: 'rehabilitation',
        icon: RefreshCcw,
        category: 'clinical',
        color: 'from-emerald-600 to-emerald-900',
        desc: 'Holistic occupational therapy and social skills training for full community reintegration.'
    },
    {
        name: 'Telepsychiatry Services',
        slug: 'telepsychiatry',
        icon: Stethoscope,
        category: 'clinical',
        color: 'from-indigo-600 to-indigo-900',
        desc: 'Globally accessible remote psychiatric consultations leveraging modern digital health technology.'
    },
    {
        name: 'Pharmacy Services',
        slug: 'pharmacy',
        icon: Pill,
        category: 'diagnostic',
        color: 'from-yellow-600 to-yellow-900',
        desc: 'Specialized psychiatric medication management and clinical pharmacy support services.'
    },
    {
        name: 'Laboratory Services',
        slug: 'laboratory',
        icon: Microscope,
        category: 'diagnostic',
        color: 'from-rose-600 to-rose-900',
        desc: 'Advanced clinical laboratory screenings specifically tailored for psychiatric patient needs.'
    },
    {
        name: 'Forensic Psychiatry',
        slug: 'forensic-psychiatry',
        icon: Scale,
        category: 'clinical',
        color: 'from-slate-600 to-slate-900',
        desc: 'Expert legal psychiatric evaluations and specialized care for the forensic population.'
    },
    {
        name: 'Counseling Services',
        slug: 'counseling-services',
        icon: MessageSquare,
        category: 'clinical',
        color: 'from-rose-400 to-rose-600',
        desc: 'Specialized therapeutic support for trauma, depression, and anxiety disorders.'
    },
];

export default function DepartmentsPage() {
    const [activeCategory, setActiveCategory] = React.useState('all');

    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const heroRef = React.useRef<HTMLElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const filteredDepartments = departments.filter(dept => {
        return activeCategory === 'all' || dept.category === activeCategory;
    });

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white min-h-screen">
                {/* Hero */}
                <section
                    ref={heroRef}
                    onMouseMove={handleMouseMove}
                    className="relative min-h-[75vh] bg-blue-950 flex items-center overflow-hidden animate-mesh"
                    style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, #1e3a8a 0%, #0f172a 100%)`,
                    }}
                >
                    {/* Interactive Mouse Glow */}
                    <div
                        className="absolute pointer-events-none opacity-50 blur-[120px] transition-transform duration-300 ease-out"
                        style={{
                            width: '600px',
                            height: '600px',
                            background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
                            transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
                            left: 0,
                            top: 0,
                        }}
                    />

                    {/* Advanced Background Pattern */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                            backgroundSize: '80px 80px',
                        }} />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-950/20 to-blue-950" />
                    </div>

                    {/* Floating Orbs */}
                    <div className="absolute top-20 right-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] animate-float" />
                    <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-cyan-400/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-2s' }} />

                    <div className="container-custom relative z-10 py-24">
                        <div className="max-w-4xl">
                            {/* Breadcrumbs */}


                            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] mb-8 animate-fade-in-up tracking-tighter">
                                Excellence in <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Psychiatry</span>
                            </h1>




                            <p className="text-xl md:text-2xl text-blue-100/60 max-w-2xl mb-14 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.1s' }}>
                                EMSH sets the gold standard for clinical psychiatric care in East Africa through innovation, expertise, and compassionate dedication.
                            </p>

                        </div>
                    </div>
                </section>

                {/* Filter & Grid Section */}
                <section className="py-24 bg-[#FFF9F0] relative" id="departments-grid">
                    <div className="container-custom">
                        {/* Search & Categories Header */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
                            {/* Category Tabs - Floating Style */}
                            <div className="flex flex-wrap items-center gap-4 flex-1">
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className={`px-10 py-4 font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-2xl text-[11px] ${activeCategory === 'all'
                                        ? 'bg-blue-900 text-white shadow-[0_20px_40px_rgba(30,58,138,0.2)] translate-y-[-4px]'
                                        : 'bg-white text-gray-400 hover:text-blue-950 shadow-sm border border-gray-100'
                                        }`}
                                >
                                    All Departments
                                </button>
                                {categories.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`flex items-center gap-3 px-10 py-4 font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-2xl text-[11px] ${activeCategory === cat.id
                                                ? 'bg-blue-900 text-white shadow-[0_20px_40px_rgba(30,58,138,0.2)] translate-y-[-4px]'
                                                : 'bg-white text-gray-400 hover:text-blue-950 shadow-sm border border-gray-100'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {cat.label}
                                        </button>
                                    );
                                })}
                            </div>


                        </div>

                        {/* Advanced Grid with 3D Interaction */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-[400px]">
                            {filteredDepartments.map((dept, index) => {
                                const Icon = dept.icon;
                                return (
                                    <Link
                                        key={dept.slug}
                                        href={`/departments/${dept.slug}`}
                                        className="group perspective-1000"
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                            transitionDelay: `${index * 50}ms`
                                        }}
                                    >
                                        <div className="h-full bg-blue-950 border border-white/5 rounded-[2rem] p-6 transition-all duration-700 ease-out group-hover:rotate-x-2 group-hover:rotate-y-[-2px] group-hover:shadow-[0_30px_60px_rgba(30,58,138,0.3)] flex flex-col relative overflow-hidden group-hover:-translate-y-2">
                                            {/* Dynamic Color Glow */}
                                            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-20 blur-[50px] transition-opacity duration-700`} />

                                            {/* Category & Status */}
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 bg-white/5 px-2.5 py-1 rounded-full group-hover:bg-white/10 group-hover:text-cyan-400 transition-all duration-500">
                                                    {categories.find(c => c.id === dept.category)?.label}
                                                </span>

                                            </div>

                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                                                <Icon className="w-5 h-5" />
                                            </div>

                                            <h3 className="text-lg font-black text-white mb-3 tracking-tighter leading-none group-hover:text-cyan-400 transition-colors duration-500">
                                                {dept.name}
                                            </h3>

                                            <p className="text-blue-100/60 text-[11px] leading-relaxed mb-6 flex-1 font-medium">
                                                {dept.desc}
                                            </p>

                                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-cyan-400/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-500">
                                                        Explore
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-white/10" />
                                                    <Link
                                                        href="/contact"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors"
                                                    >
                                                        Contact
                                                    </Link>
                                                </div>
                                                <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 group-hover:scale-110 transition-all duration-500 shadow-sm`}>
                                                    <ArrowRightIcon className="w-3.5 h-3.5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>


                    </div>
                </section>

                {/* International Impact CTA - Super Premium */}
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="container-custom">
                        <div className="bg-blue-950 rounded-[4rem] p-12 md:p-32 relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)]">
                            {/* Mesh Gradient Background */}
                            <div className="absolute inset-0 opacity-30 animate-mesh" style={{
                                background: 'radial-gradient(circle at 0% 0%, #1e40af 0%, transparent 50%), radial-gradient(circle at 100% 100%, #1e3a8a 0%, transparent 50%)',
                                backgroundSize: '200% 200%'
                            }} />

                            <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
                                <div className="animate-fade-in">
                                    <div className="w-12 h-1 bg-cyan-400 mb-10" />
                                    <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-[0.9] uppercase">
                                        Impact on <br />
                                        <span className="text-cyan-400">Global</span> <br />
                                        Health
                                    </h2>
                                    <p className="text-blue-100/60 text-xl mb-14 leading-relaxed font-medium max-w-lg">
                                        Leveraging nine decades of psychiatric excellence to lead mental health initiatives across the continent and beyond.
                                    </p>
                                    <div className="flex flex-wrap gap-8">
                                        <Link href="/contact" className="px-12 py-6 bg-cyan-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-all shadow-[0_20px_40px_rgba(6,182,212,0.3)] hover:-translate-y-1">
                                            Institutional Referral
                                        </Link>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    {[
                                        { label: 'Founded', value: '1930 E.C.', desc: 'Clinical Pioneer' },
                                        { label: 'Partners', value: '12+', desc: 'Global Entities' },
                                        { label: 'Research', value: '450+', desc: 'Publications' },
                                        { label: 'Specialists', value: '150+', desc: 'Expert Staff' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors duration-500">
                                            <div className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                                            <div className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{stat.label}</div>
                                            <div className="text-blue-100/30 text-[11px] font-bold uppercase tracking-widest">{stat.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
