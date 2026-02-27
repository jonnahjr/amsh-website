'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import {
    PhoneIcon,
    CalendarIcon,
    CheckCircleIcon,
    AcademicCapIcon,
    GlobeAltIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    BookOpenIcon,
    LightBulbIcon
} from '@heroicons/react/24/outline';

export default function CPDTrainingPage() {
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
                                    ✦ Professional Excellence & Career Growth
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                CPD <br />
                                <span className="text-gray-400 italic font-medium">Training Programs</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-2xl text-blue-100/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Accredited Continuing Professional Development (CPD) programs designed to empower mental health practitioners with world-class skills and accredited knowledge.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <Link href="/cpd" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                    🎓 Browse Courses
                                </Link>
                                <a href="tel:+2511118685385" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    <PhoneIcon className="w-5 h-5" /> Inquire Training
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
                                        <span className="w-12 h-[1px] bg-blue-900"></span> Lifelong Learning
                                    </h2>
                                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                                        Empowering the <br />
                                        <span className="text-blue-900">Next Generation.</span>
                                    </h3>
                                    <div className="prose prose-lg text-gray-600 leading-relaxed font-medium space-y-6">
                                        <p>
                                            Continuing Professional Development (CPD) at Amanuel Mental Specialized Hospital is dedicated to the continuous growth of healthcare professionals. We provide accredited training programs that cover the latest advancements in psychiatry, neurophysiology, and clinical mental health.
                                        </p>
                                        <p>
                                            As a center of excellence, our CPD unit collaborates with national and international bodies to deliver high-quality, diverse training opportunities that ensure mental health practitioners remain at the forefront of clinical and ethical excellence in the field.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="bg-blue-50 p-10 rounded-[40px] border border-blue-100 shadow-sm relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                        <h4 className="text-xl font-black text-blue-950 mb-4 flex items-center gap-3">
                                            <AcademicCapIcon className="w-7 h-7 text-blue-900" /> Accredited Courses
                                        </h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Our programs are fully accredited by regulatory bodies, ensuring that the credits earned are recognized for professional licensing and career advancement.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 p-10 rounded-[40px] text-white shadow-2xl relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                        <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                                            <LightBulbIcon className="w-7 h-7 text-cyan-400" /> Research-Led Training
                                        </h4>
                                        <p className="text-blue-100/60 text-sm leading-relaxed">
                                            Training content is informed by our clinical research department, ensuring that practitioners learn evidence-based skills tailored to the local context.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Training Pillars */}
                <section className="py-24 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Training Pillars</h2>
                            <p className="text-gray-500">Core areas of professional development.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Clinical Skills', text: 'Advanced pharmacological and psychosocial interventions in psychiatric care.', icon: <ShieldCheckIcon className="w-8 h-8" /> },
                                { title: 'Specialized Tools', text: 'Workshop training on EEG, psychological assessments, and diagnostic tools.', icon: <BookOpenIcon className="w-8 h-8" /> },
                                { title: 'Ethics & Policy', text: 'Understanding mental health legislation and ethical professional conduct.', icon: <GlobeAltIcon className="w-8 h-8" /> },
                            ].map((pillar, i) => (
                                <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="text-blue-900 mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">{pillar.icon}</div>
                                    <h3 className="text-xl font-black text-gray-900 mb-4">{pillar.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{pillar.text}</p>
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
                                <span className="text-blue-500 font-black text-9xl absolute -top-16 -left-8 opacity-[0.03] select-none pointer-events-none uppercase">Vision</span>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-blue-900 rounded-[28px] flex items-center justify-center text-white mb-8 shadow-2xl">
                                        <GlobeAltIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">Our <span className="text-blue-900">Vision</span></h2>
                                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                        To be the premier center for mental health education and professional development in Africa, fostering a culture of lifelong learning and clinical excellence.
                                    </p>
                                </div>
                            </div>

                            {/* Mission */}
                            <div className="relative">
                                <span className="text-cyan-500 font-black text-9xl absolute -top-16 -left-8 opacity-[0.03] select-none pointer-events-none uppercase">Mission</span>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-cyan-500 rounded-[28px] flex items-center justify-center text-white mb-8 shadow-2xl">
                                        <AcademicCapIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">Our <span className="text-blue-900">Mission</span></h2>
                                    <ul className="space-y-6">
                                        {[
                                            'Providing accessible and high-quality accredited training programs for all healthcare professionals.',
                                            'Strengthening clinical competency through specialized research-informed training modules.',
                                            'Collaborating with global partners to expand the scope and impact of mental health professional education.'
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
                <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto text-center relative z-10">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-6 font-primary">Academic Target</h2>
                            <h3 className="text-4xl font-black mb-8 leading-tight">Goal of CPD Training</h3>
                            <div className="text-2xl font-black text-blue-200 mb-10 leading-relaxed italic">
                                "To elevate the standard of psychiatric care in Ethiopia by empowering practitioners with accredited knowledge and specialized clinical skills."
                            </div>
                            <p className="text-blue-100/40 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
                                Through continuous education, we aim to ensure that our clinical workforce remains motivated, ethically grounded, and professionally competent.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href="/cpd" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2">
                                    <AcademicCapIcon className="w-5 h-5" /> Browse Courses
                                </Link>
                                <Link href="/contact" className="px-10 py-5 bg-transparent border border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                    Inquire Training
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
