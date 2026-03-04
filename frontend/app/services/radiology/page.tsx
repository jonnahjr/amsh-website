'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import { PhoneIcon, ArrowRightIcon, CheckCircleIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

const units = [
    { id: '01', name: 'Digital X-Ray Suite', badge: 'Radiography', color: 'bg-blue-950', accent: 'text-cyan-400', badgeColor: 'bg-cyan-400/10 text-cyan-400', desc: 'High-resolution digital X-ray services for chest, skeletal, and abdominal imaging. Rapid image acquisition with digital processing allows immediate review by the treating clinical team and on-site radiologist reporting.' },
    { id: '02', name: 'Ultrasound Imaging Unit', badge: 'Ultrasound', color: 'bg-indigo-950', accent: 'text-violet-400', badgeColor: 'bg-violet-400/10 text-violet-400', desc: 'General and focused ultrasound examinations including abdominal, pelvic, thyroid, and soft-tissue studies. Ultrasound-guided procedures also available. Daily scheduled and urgent sessions provided.' },
    { id: '03', name: 'Emergency Imaging', badge: '24/7 Imaging', color: 'bg-red-950', accent: 'text-red-400', badgeColor: 'bg-red-400/10 text-red-400', desc: 'Rapid imaging support for the Emergency Department, providing prioritized X-ray and ultrasound services for acute presentations including trauma, chest emergencies, and acute abdominal conditions without requiring prior scheduling.' },
    { id: '04', name: 'Radiology Reporting & Consultation', badge: 'Reporting', color: 'bg-slate-900', accent: 'text-slate-300', badgeColor: 'bg-slate-300/10 text-slate-300', desc: 'Formal radiological reports issued by qualified radiologists for all imaging studies. Tele-radiology consultation available for complex or specialist reporting needs. Reports delivered electronically to requesting clinicians.' },
];

const stats = [
    { value: 'Digital', label: 'X-Ray System', icon: '🩻' },
    { value: 'Daily', label: 'Ultrasound Sessions', icon: '📅' },
    { value: 'STAT', label: 'Emergency Imaging', icon: '⚡' },
    { value: 'On-site', label: 'Radiologist Reporting', icon: '👨‍⚕️' }
];

export default function RadiologyPage() {
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
                                    🩻 Diagnostic Imaging
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                Radiology <br /><span className="text-gray-400 italic font-medium">X-Ray & Ultrasound</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-blue-100/80 max-w-3xl mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Comprehensive diagnostic imaging services — digital X-ray and ultrasound — supporting precise clinical assessment for all cases.
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <a href="tel:+2511118685385" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1 flex items-center gap-2">
                                    <PhoneIcon className="w-5 h-5" /> Book Imaging
                                </a>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    Contact Hospital
                                </Link>
                            </div>
                            <div className="mt-12 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                                <span className="text-blue-200 text-sm font-black uppercase tracking-widest">Digital X-Ray · Ultrasound · Emergency Imaging · Radiology Reporting</span>
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
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tighter">
                                    Precision Imaging for <br /><span className="text-blue-900">Accurate Diagnosis</span>
                                </h2>
                                <div className="space-y-5 text-gray-600 leading-relaxed">
                                    <p>
                                        EMSH Radiology provides essential diagnostic imaging that underpins the clinical decision-making process across all departments. Using digital X-ray and real-time ultrasound technology, our team delivers high-quality images with rapid read-out and radiologist-issued formal reports.
                                    </p>
                                    <p>
                                        Our radiology unit serves the Emergency Department, inpatient wards, operating theatre, and outpatient clinics, ensuring continuous access to imaging regardless of clinical setting or time of day.
                                    </p>
                                </div>
                                <div className="mt-10 grid grid-cols-2 gap-4">
                                    {['Chest X-Ray', 'Skeletal Radiography', 'Abdominal Ultrasound', 'Pelvic Ultrasound', 'Thyroid Ultrasound', 'Portable Bedside X-Ray'].map(item => (
                                        <div key={item} className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl">
                                            <CheckCircleIcon className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm font-bold text-blue-950">{item}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="w-full h-[520px] bg-gradient-to-br from-blue-950 to-blue-900 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center gap-4 border border-blue-800/30 shadow-2xl">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <BuildingOffice2Icon className="w-10 h-10 text-blue-300" />
                                    </div>
                                    <div className="text-center px-8">
                                        <p className="text-white font-black text-lg mb-2">Radiology Department</p>
                                        <p className="text-blue-300/60 text-sm">Photo — EMSH Imaging Suite</p>
                                    </div>
                                    <span className="mt-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-blue-300 uppercase font-bold tracking-widest">Image Placeholder</span>
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-blue-900 text-white rounded-3xl px-6 py-4 shadow-2xl">
                                    <div className="text-2xl font-black">Digital</div>
                                    <div className="text-xs font-black uppercase tracking-widest opacity-80">Imaging</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Units Section */}
                <section className="py-28 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-20">
                            <span className="section-badge mb-4">🩻 Our Units</span>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">Imaging Units</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                                Four radiology units covering scheduled, urgent, and emergency imaging needs across the hospital.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {units.map((u) => (
                                <div key={u.id} className={`group relative ${u.color} rounded-[2.5rem] overflow-hidden flex flex-col border border-white/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
                                    <div className="relative h-44 flex items-center justify-center bg-white/5 border-b border-white/5">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                                <BuildingOffice2Icon className={`w-7 h-7 ${u.accent}`} />
                                            </div>
                                            <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Unit Photo</span>
                                        </div>
                                        <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                                            <span className={`text-sm font-black ${u.accent}`}>{u.id}</span>
                                        </div>
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
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">Book Imaging Services</h2>
                            <p className="text-blue-200/60 text-lg mb-10 leading-relaxed">
                                Scheduled imaging available daily. Emergency imaging prioritized for acute presentations. Clinician referral required for outpatient non-emergency scans.
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

