'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import {
    PhoneIcon,
    CalendarIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    HomeIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    SparklesIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

export default function InpatientServicesPage() {
    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">
                {/* Hero Section */}
                <section className="relative min-h-[70vh] bg-blue-950 flex items-center overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '48px 48px',
                        }} />
                    </div>

                    {/* Decorative Orbs */}
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                    {/* Content */}
                    <div className="container-custom relative z-10 py-24 text-center">
                        <div className="max-w-4xl mx-auto">
                            {/* Badge */}
                            <div className="animate-fade-in-up mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-semibold uppercase tracking-widest">
                                    Intensive Care & Recovery
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                Inpatient <br />
                                <span className="text-gray-400 italic font-medium">Services</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-2xl text-blue-100/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                A safe, therapeutic, and 24/7 monitored clinical environment dedicated to the stabilization and rehabilitation of acute psychiatric conditions.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <Link href="/contact" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                    🏥 Admission Inquiry
                                </Link>
                                <a href="tel:+2511118685385" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    <PhoneIcon className="w-5 h-5" /> Visit Guidelines
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="py-32 relative overflow-hidden">
                    <div className="container-custom relative z-10">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                <div>
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900 mb-6 flex items-center gap-4">
                                        <span className="w-12 h-[1px] bg-blue-900"></span> Therapeutic Sanctuary
                                    </h2>
                                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                                        Intensive Care for <br />
                                        <span className="text-blue-900">Mental Restoration.</span>
                                    </h3>
                                    <div className="prose prose-lg text-gray-600 leading-relaxed font-medium space-y-6">
                                        <p>
                                            Inpatient services at Amanuel Mental Specialized Hospital provide a secure and compassionate environment for patients requiring 24-hour clinical monitoring. Our wards are designed to facilitate stabilization, intensive pharmacological treatment, and psychosocial rehabilitation.
                                        </p>
                                        <p>
                                            With over 300 beds and specialized wards for various demographic and clinical needs, our inpatient department ensures that individuals in acute crisis receive the highest level of psychiatric expertise and nursing care aimed at achieving safe community reintegration.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="bg-blue-50 p-10 rounded-[40px] border border-blue-100 shadow-sm relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                        <h4 className="text-xl font-black text-blue-950 mb-4 flex items-center gap-3">
                                            <ShieldCheckIcon className="w-7 h-7 text-blue-900" /> Secure Environment
                                        </h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Our facility provides a safe and highly structured clinical setting essential for treating severe psychiatric disorders that require constant observation and professional intervention.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 p-10 rounded-[40px] text-white shadow-2xl relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                        <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                                            <UserGroupIcon className="w-7 h-7 text-indigo-400" /> Multidisciplinary Care
                                        </h4>
                                        <p className="text-blue-100/60 text-sm leading-relaxed">
                                            Each patient receives a comprehensive treatment plan developed and monitored by a team of senior psychiatrists, psychologists, social workers, and specialized psychiatric nurses.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ward Highlights */}
                <section className="py-24 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-gray-900">Ward Specializations</h2>
                            <p className="text-gray-500">Tailored inpatient care for diverse clinical needs.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Acute Wards', text: 'Fast-track stabilization for individuals in severe psychiatric crisis.', icon: <SparklesIcon className="w-8 h-8" /> },
                                { title: 'Rehab Wards', text: 'Psychosocial support aimed at long-term recovery and skill development.', icon: <HomeIcon className="w-8 h-8" /> },
                                { title: 'Specialized Units', text: 'Dedicated units for women, forensics, and geriatric psychiatric care.', icon: <MapPinIcon className="w-8 h-8" /> },
                            ].map((ward, i) => (
                                <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="text-blue-900 mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">{ward.icon}</div>
                                    <h3 className="text-xl font-black text-gray-900 mb-4">{ward.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{ward.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vision & Mission Sections */}
                <section className="py-32 overflow-hidden">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                            {/* Vision */}
                            <div className="relative">
                                <span className="text-blue-500 font-black text-9xl absolute -top-16 -left-8 opacity-[0.03] select-none pointer-events-none">VISION</span>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-blue-900 rounded-[28px] flex items-center justify-center text-white mb-8 shadow-2xl">
                                        <ShieldCheckIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">Our <span className="text-blue-900">Vision</span></h2>
                                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                        To provide a specialized sanctuary for mental restoration, recognized for safety, therapeutic excellence, and the dignity of every admitted patient.
                                    </p>
                                </div>
                            </div>

                            {/* Mission */}
                            <div className="relative">
                                <span className="text-indigo-500 font-black text-9xl absolute -top-16 -left-8 opacity-[0.03] select-none pointer-events-none">MISSION</span>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-indigo-500 rounded-[28px] flex items-center justify-center text-white mb-8 shadow-2xl">
                                        <HomeIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">Our <span className="text-blue-900">Mission</span></h2>
                                    <ul className="space-y-6">
                                        {[
                                            'Delivering intensive clinical care and physiological stabilization through 24/7 specialized monitoring.',
                                            'Providing comprehensive psychosocial rehabilitation and skill training within the inpatient environment.',
                                            'Ensuring safe and supportive transitioning of patients back to their families and communities.'
                                        ].map((text, i) => (
                                            <li key={i} className="flex gap-4 items-start text-gray-600 font-medium">
                                                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-1">
                                                    <CheckCircleIcon className="w-4 h-4" />
                                                </div>
                                                <p className="leading-relaxed">{text}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Goal Section */}
                <section className="py-24 bg-white border-t border-gray-100 overflow-hidden relative">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto text-center relative z-10 bg-gray-900 p-16 rounded-[60px] shadow-2xl overflow-hidden group">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-6 font-primary">Patient Outcome</h2>
                                <h3 className="text-4xl font-black mb-8 leading-tight text-white">Goal of Inpatient Services</h3>
                                <div className="text-2xl font-black text-blue-200 mb-10 leading-relaxed italic">
                                    "To achieve clinical stabilization and successful reintegration, ensuring no individual in crisis is left without professional sanctuary."
                                </div>
                                <p className="text-blue-100/40 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
                                    Through intensive treatment and compassionate care, we aim to minimize the trauma of mental health crises and restore hope for long-term recovery.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link href="/contact" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1">
                                        Contact Admissions
                                    </Link>
                                    <Link href="/services" className="px-10 py-5 bg-transparent border border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                        Explore Services
                                    </Link>
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
