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
    BeakerIcon,
    UserGroupIcon,
    AcademicCapIcon,
    ShieldCheckIcon,
    ClockIcon,
    HeartIcon
} from '@heroicons/react/24/outline';

export default function OutpatientServicesPage() {
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
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                    {/* Content */}
                    <div className="container-custom relative z-10 py-24 text-center">
                        <div className="max-w-4xl mx-auto">
                            {/* Badge */}
                            <div className="animate-fade-in-up mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-semibold uppercase tracking-widest">
                                    ✦ Comprehensive Psychiatry & Wellness
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                Outpatient <br />
                                <span className="text-gray-400 italic font-medium">Services (OPD)</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-2xl text-blue-100/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Providing expert psychiatric evaluation, specialized clinics, and ongoing medication management for over 400 patients daily with compassion and precision.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <Link href="/contact" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                    📞 Contact Hospital
                                </Link>
                                <a href="tel:+2511118685385" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    <PhoneIcon className="w-5 h-5" /> Contact Clinic
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
                                        <span className="w-12 h-[1px] bg-blue-900"></span> Clinical Continuity
                                    </h2>
                                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                                        Expert Guidance for <br />
                                        <span className="text-blue-900">Mental Wellness.</span>
                                    </h3>
                                    <div className="prose prose-lg text-gray-600 leading-relaxed font-medium space-y-6">
                                        <p>
                                            Outpatient services at Amanuel Mental Specialized Hospital represent the heartbeat of our clinical care, serving as the primary point of access for mental health support in Ethiopia. We cater to thousands of individuals annually, offering specialized diagnostic assessments and long-term treatment plans.
                                        </p>
                                        <p>
                                            Our highly skilled multidisciplinary teams work across specialized clinics to manage a wide range of psychiatric conditions, ensuring that high-quality care is accessible without the need for hospital admission, thereby promoting productivity and integration within the community.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="bg-blue-50 p-10 rounded-[40px] border border-blue-100 shadow-sm relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                        <h4 className="text-xl font-black text-blue-950 mb-4 flex items-center gap-3">
                                            <UserGroupIcon className="w-7 h-7 text-blue-900" /> High Volume Excellence
                                        </h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Managing over 400 patient visits daily, our OPD is geared for efficiency without compromising on the depth of psychiatric evaluation and the compassion every patient deserves.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 p-10 rounded-[40px] text-white shadow-2xl relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                        <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                                            <BeakerIcon className="w-7 h-7 text-cyan-400" /> Specialized Clinics
                                        </h4>
                                        <p className="text-blue-100/60 text-sm leading-relaxed">
                                            From mood disorders to specialized geriatric and pediatric outpatient care, we offer dedicated clinic days led by senior consultants and specialists in various fields of psychiatry.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics/Features */}
                <section className="py-24 bg-blue-50">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { label: 'Daily Patients', value: '400+', icon: <UserGroupIcon className="w-6 h-6" /> },
                                { label: 'Specialized Clinics', value: '12+', icon: <ShieldCheckIcon className="w-6 h-6" /> },
                                { label: 'Clinic Days', value: 'Mon-Fri', icon: <ClockIcon className="w-6 h-6" /> },
                                { label: 'Service Quality', value: 'National Lead', icon: <HeartIcon className="w-6 h-6" /> },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border border-blue-100 text-center shadow-sm">
                                    <div className="text-blue-900 flex justify-center mb-4">{stat.icon}</div>
                                    <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
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
                                        <HeartIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">Our <span className="text-blue-900">Vision</span></h2>
                                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                        To be the national benchmark for outpatient psychiatric care, recognized for accessibility, clinical excellence, and the seamless integration of mental wellness into daily life.
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
                                            'Providing patient-centered outpatient care through diagnostic excellence and evidence-based treatments.',
                                            'Ensuring accessibility by managing high patient volumes with optimized clinical workflows.',
                                            'Providing continuous professional follow-up to support long-term recovery and community integration.'
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
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900 mb-6">Strategic Goal</h2>
                                <h3 className="text-4xl font-black text-gray-900 mb-8 leading-tight">Goal of Outpatient Services</h3>
                                <div className="text-2xl font-black text-blue-950 mb-10 leading-relaxed italic">
                                    "To ensure consistent, high-quality mental health support that prevents relapse and empowers patients to lead productive lives."
                                </div>
                                <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
                                    By providing timely diagnostic interventions and expert medication management, we strive to reduce the burden of mental illness in families across Ethiopia.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link href="/contact" className="px-10 py-5 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-900 transition-all shadow-xl hover:-translate-y-1">
                                        Contact Us
                                    </Link>
                                    <Link href="/services" className="px-10 py-5 bg-gray-100 text-gray-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-all">
                                        All Services
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
