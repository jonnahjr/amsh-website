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
];

export default function DepartmentsPage() {
    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white min-h-screen">
                {/* Hero Header */}
                <section className="relative pt-20 pb-32 overflow-hidden bg-blue-950">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }} />
                    <div className="glow-blue w-[500px] h-[500px] -top-64 -right-32 opacity-20"></div>
                    <div className="glow-cyan w-[500px] h-[500px] -bottom-64 -left-32 opacity-20"></div>

                    <div className="container-custom relative z-10 text-center">
                        <div className="flex items-center justify-center gap-2 text-blue-300 mb-6 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRightIcon className="w-3 h-3" />
                            <span className="text-white">Our Departments</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter">
                            Medical <span className="text-cyan-400 italic">Departments</span>
                        </h1>
                        <p className="text-blue-100/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Discover our specialized centers of excellence, where expert clinicians and modern technology converge to provide the highest standard of mental health care in Ethiopia.
                        </p>
                    </div>
                </section>

                {/* Departments Grid */}
                <section className="relative -mt-16 z-20 pb-24">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {departments.map((dept) => (
                                <Link
                                    key={dept.slug}
                                    href={`/departments/${dept.slug}`}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-blue-900 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                                    <div className="relative bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden min-h-[400px] flex flex-col">
                                        {/* Background Accent */}
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${dept.color} opacity-[0.03] group-hover:opacity-[0.08] rounded-bl-[100px] transition-opacity duration-500`}></div>

                                        <div className={`w-16 h-16 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-lg shadow-blue-900/10 group-hover:scale-110 transition-transform`}>
                                            {dept.icon}
                                        </div>

                                        <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight leading-tight group-hover:text-blue-900 transition-colors">
                                            {dept.name}
                                        </h3>

                                        <p className="text-gray-500 text-base leading-relaxed mb-8 flex-1 italic">
                                            "{dept.desc}"
                                        </p>

                                        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-900 group-hover:translate-x-1 transition-transform">Explore Services</span>
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
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
