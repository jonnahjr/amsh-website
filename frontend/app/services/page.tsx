'use client';

import { useState, useEffect } from 'react';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { ArrowRightIcon, CalendarIcon, PhoneIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { servicesAPI } from '@/lib/api';

const services = [
    // Clinical Services
    { icon: '🧠', name: 'Psychiatry Services (Adult, Child & Adolescent, Addiction, Geriatric, Forensic)', slug: 'psychiatry-services', category: 'Clinical', tag: 'Expert', description: 'Comprehensive psychiatric evaluation and treatment across all age groups and specialized mental health needs.' },
    { icon: '🩺', name: 'Internal Medicine Services', slug: 'internal-medicine', category: 'Clinical', tag: 'Specialist', description: 'Expert medical care focusing on complex adult health conditions and chronic disease management.' },
    { icon: '🔬', name: 'Neurology Services', slug: 'neurology-services', category: 'Clinical', tag: 'Expert', description: 'Specialized diagnosis and management of brain, spine, and nervous system disorders.' },
    { icon: '🚑', name: 'Emergency Services (24/7)', slug: 'emergency-services', category: 'Clinical', tag: '24/7', description: 'Round-the-clock psychiatric emergency care and immediate crisis stabilization services.' },
    { icon: '🏥', name: 'ICU & HDU Services', slug: 'icu-hdu-services', category: 'Clinical', tag: 'Critical', description: 'Intensive and High Dependency units providing specialized care for critical medical and psychiatric conditions.' },

    // Diagnostic Services
    { icon: '🧪', name: 'Laboratory Services', slug: 'laboratory-services', category: 'Diagnostic', tag: 'On-site', description: 'Full-spectrum clinical laboratory testing and diagnostic analysis to support treatment planning.' },
    { icon: '🩻', name: 'Radiology (X-Ray, Ultrasound)', slug: 'radiology', category: 'Diagnostic', tag: 'Imaging', description: 'Comprehensive diagnostic imaging services including X-ray and ultrasound for precise medical assessment.' },
    { icon: '⚡', name: 'EEG Services', slug: 'eeg-services', category: 'Diagnostic', tag: 'Advanced', description: 'Recording brain activity to assist in the diagnosis of epilepsy, sleep disorders, and other neurological conditions.' },

    // Pharmacy Services
    { icon: '💊', name: 'Outpatient Pharmacy', slug: 'outpatient-pharmacy', category: 'Pharmacy', tag: 'Daily', description: 'Dedicated pharmacy services for outpatients with professional medication counseling and dispensing.' },
    { icon: '🏨', name: 'Inpatient Pharmacy', slug: 'inpatient-pharmacy', category: 'Pharmacy', tag: '24/7', description: 'Ensuring safe and timely medication administration for all hospitalized patients.' },
    { icon: '🎗️', name: 'ART Pharmacy', slug: 'art-pharmacy', category: 'Pharmacy', tag: 'Specialist', description: 'Specialized pharmacy handling Antiretroviral Therapy (ART) with dedicated patient support.' },
    { icon: '🏪', name: 'Community Pharmacy', slug: 'community-pharmacy', category: 'Pharmacy', tag: 'Public', description: 'Full-service pharmacy accessible to the community for psychiatric and general prescription needs.' },

    // Specialized Services
    { icon: '📉', name: 'ECT Service', slug: 'ect-service', category: 'Specialized', tag: 'Procedure', description: 'Advanced Electroconvulsive Therapy (ECT) for severe treatment-resistant psychiatric conditions.' },
    { icon: '👩‍⚕️', name: 'Clinical Psychology', slug: 'clinical-psychology', category: 'Specialized', tag: 'Therapy', description: 'Psychological assessment, psychotherapy, and evidence-based mental health interventions.' },
    { icon: '🎨', name: 'Occupational & Art Therapy', slug: 'occupational-art-therapy', category: 'Specialized', tag: 'Recovery', description: 'Rehabilitative therapy using creative and practical activities to support recovery and daily living.' },
    { icon: '🤝', name: 'Social Services', slug: 'social-services', category: 'Specialized', tag: 'Support', description: 'Holistic support for patients and families addressing social, economic, and community reintegration needs.' },
    { icon: '👪', name: 'Family Planning', slug: 'family-planning', category: 'Specialized', tag: 'Clinic', description: 'Comprehensive reproductive health services and family planning education for the community.' },
    { icon: '🤱', name: 'MCH Services', slug: 'mch-services', category: 'Specialized', tag: 'Maternal', description: 'Dedicated Maternal and Child Health (MCH) services focused on prenatal, postnatal, and pediatric care.' },
];

const categories = ['All', 'Clinical', 'Diagnostic', 'Pharmacy', 'Specialized'];

const categoryTagColors: Record<string, string> = {
    Clinical: 'bg-white/10 text-cyan-300',
    Diagnostic: 'bg-white/10 text-emerald-300',
    Pharmacy: 'bg-white/10 text-violet-300',
    Specialized: 'bg-white/10 text-rose-300',
};

const categoryIconBg: Record<string, string> = {
    Clinical: 'bg-white/5 border border-white/10',
    Diagnostic: 'bg-white/5 border border-white/10',
    Pharmacy: 'bg-white/5 border border-white/10',
    Specialized: 'bg-white/5 border border-white/10',
};

const stats = [
    { value: '18+', label: 'Core Medical Services' },
    { value: '24/7', label: 'Emergency Response' },
    { value: '500+', label: 'Inpatient Capacity' },
    { value: '50+', label: 'Years of Excellence' },
    { value: 'WHO', label: 'Care Standards' },
];

const trustPillars = [
    { icon: '🌍', title: 'International Standards', desc: 'Aligned with WHO and global psychiatric care protocols' },
    { icon: '🏅', title: '50+ Years of Excellence', desc: "Ethiopia's oldest and most trusted mental health institution" },
    { icon: '🔬', title: 'Research-Driven Care', desc: 'Evidence-based treatment backed by clinical research' },
    { icon: '🤝', title: 'Community-Centred', desc: 'Serving patients from all regions of Ethiopia and beyond' },
];

export default function ServicesPage() {
    const [apiServices, setApiServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');


    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await servicesAPI.getAll();
                setApiServices(res.data.services);
            } catch (err) {
                // silently use local data
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const mergedServices = services.map(localSvc => {
        const apiSvc = apiServices.find(s => s.slug === localSvc.slug);
        return apiSvc ? { ...localSvc, ...apiSvc, description: localSvc.description || apiSvc.description } : localSvc;
    });

    const filtered = mergedServices.filter(s => {
        return activeCategory === 'All' || s.category === activeCategory;
    });

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">

                {/* ═══════════════════════════════════════════════════ */}
                {/* HERO — CENTRE OF EXCELLENCE MASTHEAD                */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="relative min-h-[85vh] bg-blue-950 flex flex-col items-center justify-center overflow-hidden">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                    {/* Glowing orbs */}
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container-custom relative z-10 py-28 text-center">
                        <div className="max-w-5xl mx-auto">


                            {/* Masthead Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tighter">
                                Centre of Clinical<br />
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Excellence</span>
                            </h1>
                            <p className="text-lg md:text-xl text-blue-100/60 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                                Comprehensive, evidence-based psychiatric and mental health services delivered by Ethiopia's foremost specialists — meeting international standards of care.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                                <a href="#services-grid" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-all shadow-2xl hover:-translate-y-1">
                                    Explore Our Services <ArrowRightIcon className="w-5 h-5" />
                                </a>
                                <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                    <PhoneIcon className="w-5 h-5" /> Contact Hospital
                                </Link>
                            </div>

                            {/* Live Stats Bar */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="bg-white/5 backdrop-blur px-6 py-5 text-center">
                                        <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                                        <div className="text-blue-300/70 text-xs uppercase tracking-widest font-semibold">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* TRUST STRIP                                          */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="py-16 bg-gray-50 border-b border-gray-100">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {trustPillars.map((pillar) => (
                                <div key={pillar.title} className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-950 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                                        {pillar.icon}
                                    </div>
                                    <div>
                                        <div className="font-black text-gray-900 text-sm uppercase tracking-tight mb-1">{pillar.title}</div>
                                        <div className="text-gray-500 text-sm leading-relaxed">{pillar.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* SERVICES GRID                                        */}
                {/* ═══════════════════════════════════════════════════ */}
                <section id="services-grid" className="py-20 bg-white">
                    <div className="container-custom">

                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <span className="section-badge mb-4">🏥 Our Services</span>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
                                Specialized Medical Services
                            </h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                                Every service is designed around the patient — with clinical excellence, compassion, and evidence-based care at its core.
                            </p>
                        </div>

                        {/* Filter & Search Header */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                            {/* Category Filter Tabs */}
                            <div className="flex flex-wrap items-center gap-2 flex-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-2 ${activeCategory === cat
                                            ? 'bg-blue-950 text-white border-blue-950 shadow-xl'
                                            : 'bg-white text-gray-500 border-gray-100 hover:border-blue-900 hover:text-blue-900'
                                            }`}
                                    >
                                        {cat}
                                        <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            {cat === 'All' ? mergedServices.length : mergedServices.filter(s => s.category === cat).length}
                                        </span>
                                    </button>
                                ))}
                            </div>


                        </div>

                        <div className="space-y-20">
                            {categories.filter(cat => cat !== 'All' && (activeCategory === 'All' || activeCategory === cat)).map(category => {
                                const categoryServices = filtered.filter(s => s.category === category);
                                if (categoryServices.length === 0) return null;

                                return (
                                    <div key={category} className="animate-fade-in group/section">
                                        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-gray-100">
                                            <div className="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-950/20 group-hover/section:scale-110 transition-transform">
                                                ✔
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">
                                                {category} Services
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {categoryServices.map((service) => (
                                                <div
                                                    key={service.slug}
                                                    className="group relative bg-blue-950 rounded-[2rem] p-8 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col overflow-hidden border border-white/5"
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-6">
                                                            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-900 transition-all duration-500">
                                                                {service.icon}
                                                            </div>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${categoryTagColors[service.category] || 'bg-white/10 text-cyan-300'}`}>
                                                                {service.tag}
                                                            </span>
                                                        </div>

                                                        <h3 className="text-xl font-black text-white mb-3 leading-tight group-hover:text-cyan-400 transition-colors">
                                                            {service.name}
                                                        </h3>
                                                        <p className="text-blue-100/70 text-sm leading-relaxed mb-8">
                                                            {service.description}
                                                        </p>
                                                    </div>

                                                    <div className="pt-6 border-t border-white/5">
                                                        <Link
                                                            href={`/services/${service.slug}`}
                                                            className="flex items-center justify-center gap-3 py-4 border border-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-blue-950 transition-all group/btn"
                                                        >
                                                            View Full Details <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                        </Link>
                                                    </div>

                                                    <div className="absolute -bottom-4 -right-4 text-8xl opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none select-none">
                                                        {service.icon}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* GLOBAL CTA SECTION                                   */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="py-24 bg-blue-950 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                    <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="container-custom relative z-10 text-center">
                        <div className="max-w-3xl mx-auto">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-blue-300 text-xs font-semibold uppercase tracking-widest mb-8">
                                🌍 Serving Ethiopia & the Region
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">
                                Ready to Access World-Class<br />
                                <span className="text-cyan-400">Mental Health Care?</span>
                            </h2>
                            <p className="text-blue-200/60 text-lg mb-10 leading-relaxed">
                                Accepting patients from across Ethiopia and the East African region. Our team of specialists is ready to provide the highest standard of psychiatric care.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-all shadow-2xl hover:-translate-y-1">
                                    <PhoneIcon className="w-5 h-5" /> Get in Touch
                                </Link>
                                <Link href="/departments" className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                    <ArrowRightIcon className="w-5 h-5" /> View Departments
                                </Link>
                            </div>
                            <p className="mt-8 text-blue-300/40 text-xs uppercase tracking-widest">
                                Emmanuel Mental Specialized Hospital · Addis Ababa, Ethiopia
                            </p>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
