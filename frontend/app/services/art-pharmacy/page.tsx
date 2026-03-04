'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import { PhoneIcon, ArrowRightIcon, CheckCircleIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

const features = [
    { id: '01', name: 'ART Dispensing & Regimen Management', badge: 'ART Dispensing', color: 'bg-violet-950', accent: 'text-violet-400', badgeColor: 'bg-violet-400/10 text-violet-400', desc: 'Individualized dispensing of antiretroviral drugs across all approved regimens (1st, 2nd, and 3rd line ART) with pharmacist-led regimen review, dosage verification, and co-prescription management for patients with concurrent psychiatric medications.' },
    { id: '02', name: 'Adherence Counseling Program', badge: 'Counseling', color: 'bg-blue-950', accent: 'text-cyan-400', badgeColor: 'bg-cyan-400/10 text-cyan-400', desc: 'Structured individual and group adherence counseling sessions delivered by trained pharmacy staff and adherence counselors, addressing barriers to ART adherence including stigma, forgetfulness, side effects, substance use, and psychiatric illness.' },
    { id: '03', name: 'Drug Interaction Surveillance', badge: 'Safety', color: 'bg-indigo-950', accent: 'text-indigo-300', badgeColor: 'bg-indigo-300/10 text-indigo-300', desc: 'Specialized monitoring of clinically significant interactions between antiretroviral drugs and psychotropic medications — a critical service for EMSH patients who frequently require both ART and psychiatric pharmacotherapy simultaneously.' },
    { id: '04', name: 'Multi-Month Dispensing (MMD)', badge: 'Convenience', color: 'bg-teal-950', accent: 'text-teal-400', badgeColor: 'bg-teal-400/10 text-teal-400', desc: 'Multi-month dispensing of ART for stable, adherent patients — reducing clinic visits, transport burden, and stigma while maintaining medication continuity and regular clinical review at appropriate intervals per national ART guidelines.' },
];

const stats = [
    { value: 'ART', label: 'Specialist Pharmacy', icon: '🎗️' },
    { value: 'MMD', label: 'Multi-Month Dispensing', icon: '📦' },
    { value: '100%', label: 'Confidential Service', icon: '🔒' },
    { value: 'Expert', label: 'Adherence Counseling', icon: '👩‍⚕️' },
];

export default function ARTPharmacyPage() {
    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] bg-blue-950 flex items-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                    </div>
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />
                    <div className="container-custom relative z-10 py-24 -translate-y-10">
                        <div className="max-w-4xl">
                            <div className="animate-fade-in-up mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-semibold uppercase tracking-widest">
                                    🎗️ Pharmacy Services
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                ART <br /><span className="text-gray-400 italic font-medium">Pharmacy</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-blue-100/80 max-w-3xl mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Specialized Antiretroviral Therapy pharmacy managing ART dispensing, adherence counseling, drug interaction monitoring, and multi-month dispensing — with expert support for patients on concurrent psychiatric medications.
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <a href="tel:+2511118685385" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1 flex items-center gap-2">
                                    <PhoneIcon className="w-5 h-5" /> Contact ART Pharmacy
                                </a>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    Contact Hospital
                                </Link>
                            </div>
                            <div className="mt-12 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                                <span className="text-blue-200 text-sm font-black uppercase tracking-widest">ART Dispensing · Adherence · Drug Interactions · Multi-Month Dispensing</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="bg-white border-b border-gray-100">
                    <div className="container-custom">
                        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
                            {stats.map((s) => (
                                <div key={s.label} className="px-8 py-10 text-center group hover:bg-blue-950 transition-colors duration-300">
                                    <div className="text-3xl mb-2">{s.icon}</div>
                                    <div className="text-3xl md:text-4xl font-black text-blue-950 group-hover:text-white transition-colors mb-1">{s.value}</div>
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-200 transition-colors">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="py-28 bg-white">
                    <div className="container-custom">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900 mb-6 flex items-center gap-3">
                                    <span className="w-10 h-px bg-blue-900 inline-block" /> About This Service
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tighter">Expert HIV Care <br /><span className="text-blue-900">Integrated with Psychiatry</span></h2>
                                <div className="space-y-5 text-gray-600 leading-relaxed font-medium">
                                    <p>HIV and mental health co-morbidity is highly prevalent — depression, substance use disorders, and other psychiatric conditions are significantly more common among people living with HIV. EMSH's ART Pharmacy is uniquely equipped to manage this complexity, with clinical pharmacists expert in both ART and psychotropic pharmacology.</p>
                                    <p>Our ART Pharmacy maintains strict confidentiality, offers a supportive environment, and delivers all services on an individualized basis — respecting the dignity of every patient while ensuring optimal adherence and clinical outcomes aligned with national and international HIV treatment guidelines.</p>
                                </div>
                                <div className="mt-10 grid grid-cols-2 gap-4">
                                    {['1st/2nd/3rd Line ART', 'PMTCT Drug Dispensing', 'PEP & PrEP', 'TB-HIV Co-infection Drugs', 'Opportunistic Infection Meds', 'Psychiatric Drug Interactions'].map(item => (
                                        <div key={item} className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl">
                                            <CheckCircleIcon className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm font-bold text-blue-950">{item}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="w-full h-[520px] bg-gradient-to-br from-blue-950 to-blue-900 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center gap-4 border border-blue-800/30 shadow-2xl">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><BuildingOffice2Icon className="w-10 h-10 text-blue-300" /></div>
                                    <div className="text-center px-8">
                                        <p className="text-white font-black text-lg mb-2">ART Pharmacy</p>
                                        <p className="text-blue-300/60 text-sm">Photo — EMSH ART Dispensing Unit</p>
                                    </div>
                                    <span className="mt-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-blue-300 uppercase font-bold tracking-widest">Image Placeholder</span>
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-violet-800 text-white rounded-3xl px-6 py-4 shadow-2xl">
                                    <div className="text-2xl font-black">ART</div>
                                    <div className="text-xs font-black uppercase tracking-widest opacity-80">Specialist</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-28 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-20">
                            <span className="section-badge mb-4">🎗️ ART Services</span>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">ART Pharmacy Services</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                                Four specialized ART pharmacy services ensuring optimal HIV treatment delivery with psychiatric integration.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((u) => (
                                <div key={u.id} className={`group relative ${u.color} rounded-[2.5rem] overflow-hidden flex flex-col border border-white/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
                                    <div className="relative h-44 flex items-center justify-center bg-white/5 border-b border-white/5">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500"><BuildingOffice2Icon className={`w-7 h-7 ${u.accent}`} /></div>
                                            <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Unit Photo</span>
                                        </div>
                                        <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"><span className={`text-sm font-black ${u.accent}`}>{u.id}</span></div>
                                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${u.badgeColor}`}>{u.badge}</div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <h3 className="text-xl font-black text-white mb-4 leading-tight">{u.name}</h3>
                                        <p className="text-blue-100/60 text-sm leading-relaxed flex-1">{u.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 bg-blue-950 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                    <div className="container-custom relative z-10 text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">Access ART Pharmacy Services</h2>
                            <p className="text-blue-200/60 text-lg mb-10 leading-relaxed">
                                ART services are confidential and available Monday–Friday. Bring your ART card and clinician prescription. Emergency ART access available via the Emergency Department.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="tel:+2511118685385" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                    <PhoneIcon className="w-5 h-5" /> Call Now
                                </a>
                                <Link href="/services" className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                    All Services <ArrowRightIcon className="w-5 h-5" />
                                </Link>
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
