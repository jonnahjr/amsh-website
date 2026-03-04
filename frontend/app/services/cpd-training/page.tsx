'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import {
    PhoneIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    AcademicCapIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    BookOpenIcon,
    LightBulbIcon,
    BuildingOffice2Icon
} from '@heroicons/react/24/outline';

const units = [
    { id: '01', name: 'Clinical Skills Workshops', badge: 'Accredited', color: 'bg-blue-950', accent: 'text-cyan-400', badgeColor: 'bg-cyan-400/10 text-cyan-400', desc: 'Hands-on workshops covering advanced pharmacological interventions, psychosocial rehabilitation techniques, and crisis management protocols in psychiatric care.' },
    { id: '02', name: 'Diagnostic Tool Training', badge: 'Specialized', color: 'bg-indigo-950', accent: 'text-violet-400', badgeColor: 'bg-violet-400/10 text-violet-400', desc: 'Expert training on specialized diagnostic instruments, including EEG interpretation, standardized psychometric assessments, and neurophysiological testing procedures.' },
    { id: '03', name: 'Ethics & Legal Frameworks', badge: 'Policy', color: 'bg-teal-950', accent: 'text-teal-400', badgeColor: 'bg-teal-400/10 text-teal-400', desc: 'Comprehensive modules on mental health legislation, patient rights, and professional ethical conduct within the Ethiopian and international psychiatric context.' },
    { id: '04', name: 'Research-Led Learning', badge: 'Research', color: 'bg-slate-900', accent: 'text-slate-300', badgeColor: 'bg-slate-300/10 text-slate-300', desc: 'Training programs informed by our internal research department, ensuring practitioners learn evidence-based skills tailored to regional clinical presentations.' },
];

const stats = [
    { value: 'Accredited', label: 'CPD Credits', icon: '🎓' },
    { value: 'Specialized', label: 'Mental Health focus', icon: '🧠' },
    { value: 'Monthly', label: 'Training Sessions', icon: '📅' },
    { value: 'Global', label: 'Best Practices', icon: '🌍' },
];

export default function CPDTrainingPage() {
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
                                    🎓 Professional Excellence
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                CPD <br /><span className="text-gray-400 italic font-medium">Training</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-blue-100/80 max-w-3xl mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Accredited Continuing Professional Development (CPD) programs designed to empower mental health practitioners with advanced clinical skills and evidence-based knowledge.
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <Link href="/cpd" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1 flex items-center gap-2">
                                    <AcademicCapIcon className="w-5 h-5" /> Browse Courses
                                </Link>
                                <a href="tel:+2511118685385" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    Inquire Training
                                </a>
                            </div>
                            <div className="mt-12 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                                <span className="text-blue-200 text-sm font-black uppercase tracking-widest">Accredited Credits · Clinical Workshops · Ethics Policy</span>
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
                                    <span className="w-10 h-px bg-blue-900 inline-block" /> Lifelong Learning
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tighter">Empowering the <br /><span className="text-blue-900">Next Generation</span></h2>
                                <div className="space-y-5 text-gray-600 leading-relaxed font-medium">
                                    <p>Continuing Professional Development (CPD) at Emmanuel Mental Specialized Hospital is dedicated to the continuous growth of healthcare professionals. We provide accredited training programs that cover the latest advancements in psychiatry and clinical mental health.</p>
                                    <p>As a center of excellence, our CPD unit collaborates with national and international bodies to deliver high-quality training opportunities that ensure mental health practitioners remain at the forefront of clinical and ethical excellence.</p>
                                </div>
                                <div className="mt-10 grid grid-cols-2 gap-4">
                                    {['Clinical Competency', 'Evidence-Based Training', 'State-of-the-art Tools', 'Ethical Standards', 'Certified Programs', 'Specialist Workshops'].map(item => (
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
                                        <p className="text-white font-black text-lg mb-2">CPD Training Center</p>
                                        <p className="text-blue-300/60 text-sm">Photo — EMSH Education Pavilion</p>
                                    </div>
                                    <span className="mt-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-blue-100/40 uppercase font-black tracking-widest">Image Placeholder</span>
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-blue-900 text-white rounded-3xl px-6 py-4 shadow-2xl">
                                    <div className="text-2xl font-black">Accredited</div>
                                    <div className="text-xs font-black uppercase tracking-widest opacity-80">Provider</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Units Section */}
                <section className="py-28 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-20">
                            <span className="section-badge mb-4">🎓 Training Pillars</span>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">Our Training Areas</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                                Core areas of professional development designed for mental health practitioners.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {units.map((u) => (
                                <div key={u.id} className={`group relative ${u.color} rounded-[2.5rem] overflow-hidden flex flex-col border border-white/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
                                    <div className="relative h-44 flex items-center justify-center bg-white/5 border-b border-white/5">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500"><BuildingOffice2Icon className={`w-7 h-7 ${u.accent}`} /></div>
                                            <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Training Unit Photo</span>
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
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase">Elevate Your Career</h2>
                            <p className="text-blue-200/60 text-lg mb-10 leading-relaxed italic">
                                "To elevate the standard of psychiatric care in Ethiopia by empowering practitioners with accredited knowledge and specialized clinical skills."
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/cpd" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                    <AcademicCapIcon className="w-5 h-5" /> Browse Courses
                                </Link>
                                <a href="tel:+2511118685385" className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                    Inquire Now <ArrowRightIcon className="w-5 h-5" />
                                </a>
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

