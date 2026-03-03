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
    BoltIcon,
    GlobeAltIcon,
    UserGroupIcon,
    AcademicCapIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function EmergencyServicePage() {
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

                    {/* Decorative Orbs - Using Red for Urgency but Blue for Hospital Identity */}
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                    {/* Content */}
                    <div className="container-custom relative z-10 py-24 text-center">
                        <div className="max-w-4xl mx-auto">
                            {/* Badge */}
                            <div className="animate-fade-in-up mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-semibold uppercase tracking-widest">
                                    Critical Care & Urgent Support
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                Emergency <br />
                                <span className="text-red-400 italic font-medium">Department</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-2xl text-blue-100/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Immediate, high-quality psychiatric and medical care for acute conditions—saving lives and preventing long-term disability without requirement of an appointment.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <a href="tel:+2511118685385" className="px-10 py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-500 transition-all shadow-2xl shadow-red-600/20 hover:-translate-y-1 flex items-center gap-2">
                                    <PhoneIcon className="w-5 h-5" /> Call Hotline
                                </a>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    Contact Hospital
                                </Link>
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
                                        <span className="w-12 h-[1px] bg-blue-900"></span> Clinical Purpose
                                    </h2>
                                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                                        Immediate Care for <br />
                                        <span className="text-blue-900">Critical Moments.</span>
                                    </h3>
                                    <div className="prose prose-lg text-gray-600 leading-relaxed font-medium space-y-6">
                                        <p>
                                            Emergency department services refer to the provision of immediate medical care for sudden illnesses or pre-existing conditions that have worsened to a severe level and, unless treated urgently, may result in death or permanent physical or mental disability.
                                        </p>
                                        <p>
                                            Accessible and high-quality emergency medical care not only saves lives and prevents long-term illness and disability, but also helps prevent loss of productivity in the community and contributes to reducing high healthcare expenditures.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="bg-blue-50 p-10 rounded-[40px] border border-blue-100 shadow-sm relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                        <h4 className="text-xl font-black text-blue-950 mb-4 flex items-center gap-3">
                                            <ShieldCheckIcon className="w-7 h-7 text-blue-900" /> Breaking Barriers
                                        </h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Factors that hinder access to emergency medical services include the distance of service-providing health facilities from the community, high medical costs (financial barriers), and the community’s perceptions of the quality and acceptability of available services.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 p-10 rounded-[40px] text-white shadow-2xl relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                        <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                                            <BoltIcon className="w-7 h-7 text-cyan-400" /> Time-Sensitive Care
                                        </h4>
                                        <p className="text-blue-100/60 text-sm leading-relaxed">
                                            Conditions that require emergency medical care are time-sensitive and demand immediate attention without any restrictions. AMSH is equipped with the medical equipment and specialized mental health professionals necessary to alleviate suffering and prevent complications.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AMSH Emergency Specifics */}
                <section className="py-24 bg-white border-t border-gray-100">
                    <div className="container-custom">
                        <div className="max-w-5xl mx-auto text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-gray-900">
                                Amanuel Hospital <br /><span className="text-blue-900">Emergency Services</span>
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed max-w-3xl mx-auto">
                                Our Emergency Department is a place where patients with emergency conditions—who are at risk of death or permanent physical or mental complications—can receive both physical and mental health services without requiring a prior appointment.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                { title: 'No Appointment Needed', text: 'Immediate care provided to patients arriving on their own or with family support.', icon: <UserGroupIcon className="w-10 h-10" /> },
                                { title: 'Ambulance Access', text: 'Receiving critical cases via ambulance from homes or other health facilities nationwide.', icon: <BoltIcon className="w-10 h-10" /> },
                                { title: 'Integrated Care', text: 'Concurrent treatment of acute physical and severe psychiatric conditions.', icon: <ShieldCheckIcon className="w-10 h-10" /> },
                            ].map((item, i) => (
                                <div key={i} className="bg-blue-950 border border-white/5 p-10 rounded-[40px] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                                    <div className="text-cyan-400 mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">{item.icon}</div>
                                    <h3 className="text-xl font-black mb-4 uppercase tracking-tighter text-white">{item.title}</h3>
                                    <p className="text-blue-100/70 text-sm leading-relaxed">{item.text}</p>
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
                                        <GlobeAltIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">Our <span className="text-blue-900">Vision</span></h2>
                                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                        To be an accessible, technology-supported, and highly skilled professional center that provides high-quality emergency medical, neurological, psychiatric, surgical, obstetric, and other emergency care services.
                                    </p>
                                </div>
                            </div>

                            {/* Mission */}
                            <div className="relative">
                                <span className="text-cyan-500 font-black text-9xl absolute -top-16 -left-8 opacity-[0.03] select-none pointer-events-none">MISSION</span>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-cyan-500 rounded-[28px] flex items-center justify-center text-white mb-8 shadow-2xl">
                                        <AcademicCapIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">Our <span className="text-blue-900">Mission</span></h2>
                                    <ul className="space-y-6">
                                        {[
                                            'To become a center of excellence for training and research, equipped with high-quality medical equipment.',
                                            'To make diverse emergency services accessible through national and international collaborations.',
                                            'To strengthen and expand emergency medicine specialty services by developing competent professionals.'
                                        ].map((text, i) => (
                                            <li key={i} className="flex gap-4 items-start text-gray-600 font-medium">
                                                <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 flex-shrink-0 mt-1">
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
                <section className="py-24 bg-gray-50">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto bg-white rounded-[50px] p-16 shadow-xl border border-blue-50 relative overflow-hidden text-center group">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900 mb-6">Our Core Objective</h2>
                                <h3 className="text-4xl font-black text-gray-900 mb-8 leading-tight">Goal of the Emergency Department</h3>
                                <div className="text-2xl font-black text-blue-950 mb-10 leading-relaxed italic">
                                    "To prevent death and long-term physical or mental complications resulting from emergency medical and psychiatric conditions."
                                </div>
                                <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
                                    By providing timely and high-quality emergency care, we strive to either prevent complications entirely or minimize the impact of physical and mental trauma.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link href="/contact" className="px-10 py-5 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-900 transition-all shadow-xl hover:-translate-y-1">
                                        Contact Hospital
                                    </Link>
                                    <Link href="/contact" className="px-10 py-5 bg-gray-100 text-gray-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-all">
                                        Contact Us
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
