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
    { icon: '🚑', name: 'Emergency Service', slug: 'emergency-service', category: 'Clinical', tag: '24/7', description: '24/7 rapid psychiatric intervention, crisis stabilization, and immediate mental health support.' },
    { icon: '🏥', name: 'Outpatient Services', slug: 'outpatient-services', category: 'Clinical', tag: 'Daily', description: 'Expert psychiatric consultations, specialized mental health clinics, and comprehensive follow-up care tailored to promote long-term recovery and wellness.' },
    { icon: '🛏️', name: 'Inpatient Services', slug: 'inpatient-services', category: 'Clinical', tag: '24/7', description: 'Compassionate 24/7 clinical care, therapeutic stabilization, and dedicated recovery support within a safe, restorative hospital environment.' },
    { icon: '⚡', name: 'EEG Services', slug: 'eeg-services', category: 'Diagnostic', tag: 'Advanced', description: 'State-of-the-art neurophysiological diagnostic testing and brain mapping to support precise clinical assessment and personalized treatment planning.' },
    { icon: '🧠', name: 'Psychological Services', slug: 'psychological-services', category: 'Clinical', tag: 'Specialist', description: 'Psychological assessment and therapies including CBT, family, group, and trauma counseling.' },
    { icon: '💊', name: 'Addiction & Substance Abuse', slug: 'addiction-substance-abuse', category: 'Clinical', tag: 'Programme', description: 'Detoxification, rehabilitation programs, and counseling for alcohol and drug addiction.' },
    { icon: '👶', name: 'Child & Adolescent Mental Health', slug: 'child-adolescent', category: 'Clinical', tag: 'Specialist', description: 'Assessment and therapy for Autism, ADHD, behavioral disorders, and child depression.' },
    { icon: '🔄', name: 'Rehabilitation Services', slug: 'rehabilitation', category: 'Rehabilitation', tag: 'Ongoing', description: 'Occupational therapy, social skills training, and psychosocial rehabilitation programs.' },
    { icon: '💻', name: 'Telepsychiatry Services', slug: 'telepsychiatry', category: 'Clinical', tag: 'Digital', description: 'Remote psychiatric consultation and tele-counseling to expand mental health access.' },
    { icon: '⚕️', name: 'Pharmacy Services', slug: 'pharmacy', category: 'Diagnostic', tag: 'On-site', description: 'On-site pharmacy providing psychiatric medications, counseling, and prescription management.' },
    { icon: '🔬', name: 'Laboratory Services', slug: 'laboratory', category: 'Diagnostic', tag: 'On-site', description: 'Comprehensive blood tests, drug screening, and medical screening tests.' },
    { icon: '🎓', name: 'Training & Education', slug: 'training-education', category: 'Training', tag: 'Accredited', description: 'Clinical training, internship, and residency programs for medical and mental health professionals.' },
    { icon: '📚', name: 'CPD Training', slug: 'cpd-training', category: 'Training', tag: 'CPD', description: 'Accredited Continuing Professional Development programs for mental health practitioners.' },
    { icon: '📊', name: 'Research Services', slug: 'research', category: 'Training', tag: 'Academic', description: 'Conducting clinical, epidemiological, and public health research to support national policies.' },
    { icon: '🤝', name: 'Community Mental Health', slug: 'community-mental-health', category: 'Rehabilitation', tag: 'Outreach', description: 'Mental health awareness programs, community screening, and regional hospital outreach clinics.' },
    { icon: '⚖️', name: 'Forensic Psychiatry', slug: 'forensic-psychiatry', category: 'Clinical', tag: 'Specialist', description: 'Mental health evaluation for legal purposes, criminal responsibility, and fitness-to-stand-trial.' },
    { icon: '🏥', name: 'Referral Services', slug: 'referral-services', category: 'Clinical', tag: 'National', description: 'National referral center receiving patients from health centers, regional hospitals, and private clinics.' },
    { icon: '🗣️', name: 'Counseling Services', slug: 'counseling-services', category: 'Clinical', tag: 'Specialist', description: 'Professional counseling for depression, anxiety, stress, trauma, and family problems.' },
    { icon: '🛡️', name: 'Promotion & Prevention', slug: 'promotion-prevention', category: 'Rehabilitation', tag: 'Community', description: 'Awareness campaigns, education programs, and mental health prevention programs.' },
];

const categories = ['All', 'Clinical', 'Diagnostic', 'Rehabilitation', 'Training'];

const categoryTagColors: Record<string, string> = {
    Clinical: 'bg-white/10 text-cyan-300',
    Diagnostic: 'bg-white/10 text-emerald-300',
    Rehabilitation: 'bg-white/10 text-violet-300',
    Training: 'bg-white/10 text-amber-300',
};

const categoryIconBg: Record<string, string> = {
    Clinical: 'bg-white/5 border border-white/10',
    Diagnostic: 'bg-white/5 border border-white/10',
    Rehabilitation: 'bg-white/5 border border-white/10',
    Training: 'bg-white/5 border border-white/10',
};

const stats = [
    { value: '19+', label: 'Specialized Services' },
    { value: '24/7', label: 'Emergency Care' },
    { value: '500+', label: 'Bed Capacity' },
    { value: '50+', label: 'Years of Excellence' },
    { value: '1,000+', label: 'Patients Daily' },
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

    const filtered = activeCategory === 'All' ? mergedServices : mergedServices.filter(s => s.category === activeCategory);

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

                            {/* Accreditation badges */}
                            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                                {[
                                    { icon: '🌍', text: 'WHO Affiliated' },
                                    { icon: '🏆', text: 'Nationally Accredited' },
                                    { icon: '✅', text: 'ISO-Quality Standards' },
                                    { icon: '🎓', text: 'Academic Teaching Hospital' },
                                ].map((badge) => (
                                    <span key={badge.text} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur border border-white/10 rounded-full text-blue-200 text-xs font-semibold tracking-widest uppercase">
                                        <span>{badge.icon}</span> {badge.text}
                                    </span>
                                ))}
                            </div>

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
                                <Link href="/appointment" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-all shadow-2xl hover:-translate-y-1">
                                    <CalendarIcon className="w-5 h-5" /> Book Appointment
                                </Link>
                                <a href="#services-grid" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                    Explore Services <ArrowRightIcon className="w-4 h-4" />
                                </a>
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
                        <div className="text-center mb-12">
                            <span className="section-badge mb-4">🏥 Our Services</span>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
                                Specialized Medical Services
                            </h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                                Every service is designed around the patient — with clinical excellence, compassion, and evidence-based care at its core.
                            </p>
                        </div>

                        {/* Category Filter Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 border-2 ${activeCategory === cat
                                        ? 'bg-blue-950 text-white border-blue-950 shadow-lg'
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-900'
                                        }`}
                                >
                                    {cat}
                                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        {cat === 'All' ? mergedServices.length : mergedServices.filter(s => s.category === cat).length}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Service Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((service) => (
                                <div
                                    key={service.slug}
                                    className="group relative bg-blue-950 rounded-[2rem] p-8 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col overflow-hidden border border-white/5"
                                >
                                    {/* Card Top */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-6">
                                            {/* Icon */}
                                            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-900 transition-all duration-500">
                                                {service.icon}
                                            </div>
                                            {/* Tag */}
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

                                    {/* Card Actions */}
                                    <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
                                        <Link
                                            href="/appointment"
                                            className="flex items-center justify-center gap-2 py-3 bg-white text-blue-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-all"
                                        >
                                            <CalendarIcon className="w-3.5 h-3.5" /> Book Now
                                        </Link>
                                        <Link
                                            href={`/services/${service.slug}`}
                                            className="flex items-center justify-center gap-2 py-3 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-blue-950 transition-all group/btn"
                                        >
                                            Details <ArrowRightIcon className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>

                                    {/* Faded background icon */}
                                    <div className="absolute -bottom-4 -right-4 text-8xl opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none select-none">
                                        {service.icon}
                                    </div>
                                </div>
                            ))}
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
                                <Link href="/appointment" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-all shadow-2xl hover:-translate-y-1">
                                    <CalendarIcon className="w-5 h-5" /> Book an Appointment
                                </Link>
                                <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                    <PhoneIcon className="w-5 h-5" /> Contact Us
                                </Link>
                            </div>
                            <p className="mt-8 text-blue-300/40 text-xs uppercase tracking-widest">
                                Amanuel Mental Specialized Hospital · Addis Ababa, Ethiopia
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
