'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const services = [
    {
        icon: '🚨',
        name: 'Emergency Service',
        slug: 'emergency-service',
        desc: 'Available 24/7 for acute psychiatric emergencies. Call 991 immediately for mental health crises.'
    },
    {
        icon: '🧠',
        name: 'Outpatient Services (OPD)',
        slug: 'outpatient',
        desc: 'Comprehensive outpatient psychiatric evaluation, diagnosis, and treatment by specialized psychiatrists.'
    },
    {
        icon: '🛏️',
        name: 'Inpatient Services',
        slug: 'inpatient',
        desc: 'Full residential psychiatric care for patients requiring intensive, supervised mental health treatment.'
    },
    {
        icon: '👶',
        name: 'Child & Adolescent Psychiatry',
        slug: 'child-psychiatry',
        desc: 'Specialized mental health evaluation and treatment tailored for children and adolescents.'
    },
    {
        icon: '💊',
        name: 'Addiction Treatment',
        slug: 'addiction-treatment',
        desc: 'Evidence-based addiction treatment and rehabilitation programs for substance use disorders.'
    },
    {
        icon: '🔬',
        name: 'Laboratory Services',
        slug: 'laboratory',
        desc: 'Full diagnostic laboratory services supporting accurate psychiatric diagnoses and treatment monitoring.'
    },
    {
        icon: '💊',
        name: 'Pharmacy',
        slug: 'pharmacy',
        desc: 'Enriched pharmacy stocked with all essential psychiatric medications, conveniently on-site.'
    },
    {
        icon: '⚡',
        name: 'EEG Services',
        slug: 'eeg',
        desc: 'Electroencephalogram (EEG) diagnostic testing for neurological and psychiatric conditions assessment.'
    },
];

export default function ServicesPage() {
    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">
                {/* Hero - More compact */}
                <section className="relative bg-[#0A1A31] py-24 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -mr-64 -mt-64 pointer-events-none" />

                    <div className="container-custom relative z-10 text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-cyan-400 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-8">
                            Clinical Excellence
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
                            Specialized <span className="text-gray-400 italic font-medium">Mental Health</span>
                        </h1>
                        <p className="text-blue-100/50 text-lg max-w-xl mx-auto mb-10 font-medium leading-relaxed">
                            Comprehensive psychiatric care and diagnostic services delivered by Ethiopia's leading mental health professionals.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/appointment" className="px-8 py-4 bg-white text-blue-950 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-cyan-400 transition-all shadow-xl">
                                📅 Book Now
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Services Grid - Smaller Boxes, 3 columns on LG */}
                <section className="py-20 bg-[#F8FAFB]">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <div
                                    key={service.slug}
                                    className="group relative bg-[#0A1A31] rounded-[3rem] p-9 text-white transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl flex flex-col items-center text-center overflow-hidden border border-white/5"
                                >
                                    <div className="relative z-10 flex flex-col items-center w-full">
                                        {/* Slimmer Icon Container */}
                                        <div className="w-16 h-16 bg-white/5 backdrop-blur-2xl rounded-[1.5rem] flex items-center justify-center text-4xl mb-8 border border-white/10 group-hover:bg-blue-900 transition-all duration-700 shadow-xl">
                                            <span>{service.icon}</span>
                                        </div>

                                        <h2 className="text-xl md:text-2xl font-black mb-4 leading-tight uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                                            {service.name}
                                        </h2>

                                        <p className="text-blue-100/50 text-sm leading-relaxed font-medium mb-10 min-h-[60px]">
                                            {service.desc}
                                        </p>

                                        {/* Compact Actions */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-8 border-t border-white/5 uppercase tracking-widest font-black text-[9px]">
                                            <Link
                                                href="/appointment"
                                                className="flex items-center justify-center gap-2 py-4 bg-white text-blue-950 rounded-xl hover:bg-cyan-400 transition-all shadow-lg"
                                            >
                                                <CalendarIcon className="w-3.5 h-3.5" />
                                                Book
                                            </Link>
                                            <Link
                                                href={`/services/${service.slug}`}
                                                className="flex items-center justify-center gap-2 py-4 bg-transparent border border-white/10 text-white rounded-xl hover:bg-white hover:text-blue-950 transition-all"
                                            >
                                                Clinical Details <ArrowRightIcon className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Large Background Icon Faded */}
                                    <div className="absolute -bottom-6 -right-6 text-9xl opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none select-none blur-sm">
                                        {service.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
