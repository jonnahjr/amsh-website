'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import {
    ChevronRightIcon,
    HomeIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

const departments = [
    {
        name: 'Adult Psychiatry',
        slug: 'adult-psychiatry',
        icon: '🧠',
        color: 'from-blue-600 to-blue-900',
        desc: 'Specialized diagnosis and treatment for a wide range of mental health conditions in adults, following evidence-based clinical practices.'
    },
    {
        name: 'Child & Adolescent Psychiatry',
        slug: 'child-psychiatry',
        icon: '👶',
        color: 'from-purple-600 to-purple-900',
        desc: 'Compassionate mental health services tailored for children and adolescents, focusing on developmental and behavioral well-being.'
    },
    {
        name: 'Addiction Treatment Unit',
        slug: 'addiction-treatment',
        icon: '💊',
        color: 'from-teal-600 to-teal-900',
        desc: 'Comprehensive rehabilitation and recovery programs for individuals struggling with substance use and addictive behaviors.'
    },
    {
        name: 'Emergency Psychiatry',
        slug: 'emergency',
        icon: '🚨',
        color: 'from-red-600 to-red-900',
        desc: '24/7 immediate crisis intervention and stabilization for acute psychiatric emergencies and mental health crises.'
    },
    {
        name: 'Clinical Psychology',
        slug: 'psychology',
        icon: '🔬',
        color: 'from-green-600 to-green-900',
        desc: 'In-depth psychological assessments, psychotherapy, and counseling services provided by our team of expert clinical psychologists.'
    },
    {
        name: 'Neurology / EEG',
        slug: 'neurology',
        icon: '⚡',
        color: 'from-blue-400 to-blue-600',
        desc: 'Advanced neurological diagnostics including Electroencephalogram (EEG) to assist in the diagnosis of various brain-related conditions.'
    },
    {
        name: 'Clinical Mental Health',
        slug: 'clinical-mental-health',
        icon: '🏥',
        color: 'from-cyan-600 to-cyan-900',
        desc: 'Comprehensive primary psychiatric care, including outpatient consultations and longitudinal patient management.'
    },
    {
        name: 'Rehabilitation Services',
        slug: 'rehabilitation',
        icon: '🔄',
        color: 'from-emerald-600 to-emerald-900',
        desc: 'Occupational therapy and social skills training aimed at restoring independence and community integration.'
    },
    {
        name: 'Telepsychiatry Services',
        slug: 'telepsychiatry',
        icon: '💻',
        color: 'from-indigo-600 to-indigo-900',
        desc: 'Remote psychiatric consultations and follow-ups providing accessible care to patients regardless of their location.'
    },
    {
        name: 'Pharmacy Services',
        slug: 'pharmacy',
        icon: '⚕️',
        color: 'from-yellow-600 to-yellow-900',
        desc: 'Specialized psychiatric medication management and clinical pharmacy support for evidence-based pharmacological treatment.'
    },
    {
        name: 'Laboratory Services',
        slug: 'laboratory',
        icon: '🔬',
        color: 'from-rose-600 to-rose-900',
        desc: 'Advanced clinical laboratory tests catering specifically to the needs of psychiatric patients and medical screenings.'
    },
    {
        name: 'Training & Education',
        slug: 'training-education',
        icon: '📚',
        color: 'from-sky-600 to-sky-900',
        desc: 'National lead in training mental health professionals including psychiatrists, psychologists, and specialized nurses.'
    },
    {
        name: 'Research Services',
        slug: 'research',
        icon: '📊',
        color: 'from-amber-600 to-amber-900',
        desc: 'Pioneering research in clinical psychiatry and public mental health to advance national healthcare protocols.'
    },
    {
        name: 'Community Mental Health',
        slug: 'community-mental-health',
        icon: '🤝',
        color: 'from-orange-600 to-orange-900',
        desc: 'Outreach programs and awareness campaigns aimed at reducing stigma and improving mental health literacy nationwide.'
    },
    {
        name: 'Forensic Psychiatry',
        slug: 'forensic-psychiatry',
        icon: '⚖️',
        color: 'from-slate-600 to-slate-900',
        desc: 'Expert legal and court-ordered psychiatric evaluations for criminal responsibility and fitness-to-stand-trial.'
    },
    {
        name: 'Referral Services',
        slug: 'referral-services',
        icon: '🏥',
        color: 'from-lime-600 to-lime-900',
        desc: 'Coordinating complex mental health referrals from health centers and regional hospitals across Ethiopia.'
    },
    {
        name: 'Counseling Services',
        slug: 'counseling-services',
        icon: '🗣️',
        color: 'from-rose-400 to-rose-600',
        desc: 'Specialized counseling for depression, anxiety, and trauma, provided by qualified therapists and clinical staff.'
    },
    {
        name: 'Promotion & Prevention',
        slug: 'promotion-prevention',
        icon: '🛡️',
        color: 'from-cyan-400 to-cyan-600',
        desc: 'Public health initiatives focused on the prevention of mental illness and the promotion of psychological well-being.'
    },
];

export default function DepartmentsPage() {
    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white min-h-screen">
                {/* Hero Header */}
                {/* Hero */}
                <section className="relative min-h-[70vh] bg-blue-950 flex items-center overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '48px 48px',
                        }} />
                    </div>

                    {/* Decorative Blue Orbs */}
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                    {/* Content */}
                    <div className="container-custom relative z-10 py-32 text-center">
                        <div className="max-w-4xl mx-auto">
                            {/* Breadcrumbs */}
                            <div className="flex items-center justify-center gap-2 text-blue-300 mb-8 text-[11px] font-black uppercase tracking-[0.2em] animate-fade-in-up">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <ChevronRightIcon className="w-3 h-3" />
                                <span className="text-white">Our Departments</span>
                            </div>

                            {/* Badge */}
                            <div className="animate-fade-in-up mb-6" style={{ animationDelay: '0.1s' }}>
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-semibold uppercase tracking-widest">
                                    ✦ Clinical Centers of Excellence
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.2s' }}>
                                Specialized <br />
                                <span className="text-gray-400 italic font-medium">Departments</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-2xl text-blue-100/60 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.3s' }}>
                                Expert clinical teams dedicated to specific areas of mental health including child, adult, and geriatric psychiatry at AMSH.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <button className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                    Find Specialist
                                </button>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Departments Grid */}
                <section className="relative z-20 py-24 bg-white border-t border-gray-100">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {departments.map((dept) => (
                                <Link
                                    key={dept.slug}
                                    href={`/departments/${dept.slug}`}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-cyan-400 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                                    <div className="relative bg-blue-950 border border-white/5 p-8 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden min-h-[400px] flex flex-col group-hover:shadow-2xl">
                                        {/* Background Accent */}
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${dept.color} opacity-[0.03] group-hover:opacity-[0.08] rounded-bl-[100px] transition-opacity duration-500`}></div>

                                        <div className={`w-16 h-16 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-lg shadow-blue-900/10 group-hover:scale-110 transition-transform duration-500`}>
                                            {dept.icon}
                                        </div>

                                        <h3 className="text-2xl font-black text-white mb-4 tracking-tight leading-tight group-hover:text-cyan-400 transition-colors">
                                            {dept.name}
                                        </h3>

                                        <p className="text-blue-100/70 text-base leading-relaxed mb-8 flex-1 italic">
                                            "{dept.desc}"
                                        </p>

                                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">Explore Center</span>
                                            <div className="w-10 h-10 rounded-full bg-white/5 text-white flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-blue-950 transition-all duration-300">
                                                <ArrowRightIcon className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="section bg-white pt-0">
                    <div className="container-custom">
                        <div className="bg-blue-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center shadow-2xl">
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                                backgroundSize: '24px 24px',
                            }} />
                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">
                                    Need specialized assistance?
                                </h2>
                                <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                                    If you are unsure which department best suits your needs, our referral coordination team is here to help you find the right specialist.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/appointment" className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-500/30">
                                        Book a Consultation
                                    </Link>
                                    <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-xl font-bold transition-all">
                                        Contact Us Now
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
