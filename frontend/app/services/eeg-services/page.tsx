'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import { PhoneIcon, ArrowRightIcon, CheckCircleIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

const units = [
    { id: '01', name: 'Routine EEG Unit', badge: 'Standard', color: 'bg-blue-950', accent: 'text-cyan-400', badgeColor: 'bg-cyan-400/10 text-cyan-400', desc: 'Standard non-invasive monitoring of brain electrical activity for adults and children, used to diagnose epilepsy, seizure types, and investigate altered states of consciousness.' },
    { id: '02', name: 'Sleep EEG Section', badge: 'Specialized', color: 'bg-indigo-950', accent: 'text-violet-400', badgeColor: 'bg-violet-400/10 text-violet-400', desc: 'Specialized recordings during sleep or after sleep deprivation to reveal abnormalities not visible in routine waking EEG, critical for certain forms of epilepsy and sleep disorders.' },
    { id: '03', name: 'Digital Neuro-Mapping', badge: 'Advanced', color: 'bg-emerald-950', accent: 'text-emerald-400', badgeColor: 'bg-emerald-400/10 text-emerald-400', desc: 'High-fidelity digital recording and analysis providing clear brainwave visualization, facilitating precise clinical reports and longitudinal monitoring of treatment response.' },
    { id: '04', name: 'Pediatric EEG Corner', badge: 'Children', color: 'bg-teal-950', accent: 'text-teal-400', badgeColor: 'bg-teal-400/10 text-teal-400', desc: 'A child-friendly environment for pediatric neuro-diagnostic testing, supported by technicians trained in managing young patients with compassion and clinical sensitivity.' },
];

const stats = [
    { value: 'Digital', label: 'High-Fidelity', icon: '⚡' },
    { value: 'Special', label: 'Sleep Studies', icon: '🌙' },
    { value: 'Expert', label: 'Technicians', icon: '👨‍🔬' },
    { value: 'Precise', label: 'Clinical Data', icon: '📋' },
];

export default function EEGServicesPage() {
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
                                    ⚡ Diagnostic Services
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                EEG <br /><span className="text-gray-400 italic font-medium">Services</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-blue-100/80 max-w-3xl mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Advanced Electroencephalography (EEG) recording brain activity to assist in the diagnosis of epilepsy, sleep disorders, and complex neurological conditions with precision.
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <a href="tel:+2511118685385" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1 flex items-center gap-2">
                                    <PhoneIcon className="w-5 h-5" /> Schedule Test
                                </a>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    Contact Hospital
                                </Link>
                            </div>
                            <div className="mt-12 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                                <span className="text-blue-200 text-sm font-black uppercase tracking-widest">Routine EEG · Sleep Studies · Pediatric Testing · Brain Activity Mapping</span>
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
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tighter">Precision Brain <br /><span className="text-blue-900">Activity Monitoring</span></h2>
                                <div className="space-y-5 text-gray-600 leading-relaxed font-medium">
                                    <p>Electroencephalography (EEG) is a non-invasive diagnostic procedure that records electrical activity within the brain. At Emmanuel Mental Specialized Hospital, our EEG department play a vital role in identifying neurophysiological foundations of mental and neurological disorders.</p>
                                    <p>Utilizing advanced digital EEG technology, our specialized technicians and neurophysiologists provide precise data that informs medication adjustments, confirms clinical diagnoses, and supports the evaluation of complex psychiatric conditions and seizure disorders.</p>
                                </div>
                                <div className="mt-10 grid grid-cols-2 gap-4">
                                    {['Routine EEG', 'Provocative Tests', 'Sleep-Deprived EEG', 'Pediatric EEG', 'Expert Analysis', 'Rapid Reporting'].map(item => (
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
                                        <p className="text-white font-black text-lg mb-2">EEG Laboratory</p>
                                        <p className="text-blue-300/60 text-sm">Photo — EMSH Neuro-Diagnostic Unit</p>
                                    </div>
                                    <span className="mt-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-blue-300 uppercase font-bold tracking-widest">Image Placeholder</span>
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-blue-900 text-white rounded-3xl px-6 py-4 shadow-2xl">
                                    <div className="text-2xl font-black">Digital</div>
                                    <div className="text-xs font-black uppercase tracking-widest opacity-80">Neuro-Mapping</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Units Section */}
                <section className="py-28 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-20">
                            <span className="section-badge mb-4">⚡ Our Units</span>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">EEG Specialties</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                                Integrated neuro-diagnostic units delivering tailored brainwave monitoring services.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {units.map((u) => (
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
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">Book an EEG Test</h2>
                            <p className="text-blue-200/60 text-lg mb-10 leading-relaxed">
                                Referrals accepted from all clinical departments. Tests available for both inpatients and outpatients.
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

