'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import {
    PhoneIcon,
    CheckCircleIcon,
    BoltIcon,
    BeakerIcon,
    MagnifyingGlassIcon,
    CpuChipIcon,
    ShieldCheckIcon,
    PresentationChartLineIcon
} from '@heroicons/react/24/outline';

export default function EEGServicesPage() {
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
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} />

                    {/* Content */}
                    <div className="container-custom relative z-10 py-24 text-center">
                        <div className="max-w-4xl mx-auto">
                            {/* Badge */}
                            <div className="animate-fade-in-up mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-semibold uppercase tracking-widest">
                                    Neurophysiological Diagnostic Excellence
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                EEG <br />
                                <span className="text-cyan-400 italic font-medium">Services</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-2xl text-blue-100/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Advanced Electroencephalography (EEG) services providing critical insights into brain activity to support precision diagnostics in psychiatry and neurology.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <a href="tel:+2511118685385" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                    📞 Schedule Test
                                </a>
                                <a href="#details" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    <MagnifyingGlassIcon className="w-5 h-5" /> Diagnostic Overview
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Introduction Section */}
                <section id="details" className="py-32 relative overflow-hidden">
                    <div className="container-custom relative z-10">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                <div>
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900 mb-6 flex items-center gap-4">
                                        <span className="w-12 h-[1px] bg-blue-900"></span> Neuro-Diagnostics
                                    </h2>
                                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                                        Precision Mapping for the <br />
                                        <span className="text-blue-900">Modern Mind.</span>
                                    </h3>
                                    <div className="prose prose-lg text-gray-600 leading-relaxed font-medium space-y-6">
                                        <p>
                                            Electroencephalography (EEG) is a non-invasive diagnostic procedure that records electrical activity within the brain. At Amanuel Mental Specialized Hospital, our EEG department play a vital role in identifying neurophysiological foundations of mental and neurological disorders.
                                        </p>
                                        <p>
                                            Utilizing advanced digital EEG technology, our specialized technicians and neurophysiologists provide precise data that informs medication adjustments, confirms clinical diagnoses, and supports the evaluation of complex psychiatric conditions and seizure disorders.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="bg-cyan-50 p-10 rounded-[40px] border border-cyan-100 shadow-sm relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                        <h4 className="text-xl font-black text-cyan-900 mb-4 flex items-center gap-3">
                                            <CpuChipIcon className="w-7 h-7 text-cyan-600" /> Advanced Technology
                                        </h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Our department is equipped with modern digital EEG systems capable of sensitive brainwave monitoring, ensuring high-fidelity recordings and accurate clinical reports.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 p-10 rounded-[40px] text-white shadow-2xl relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                        <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                                            <PresentationChartLineIcon className="w-7 h-7 text-cyan-400" /> Clinical Integration
                                        </h4>
                                        <p className="text-blue-100/60 text-sm leading-relaxed">
                                            We integrate neurophysiological data with psychiatric assessments to provide a comprehensive understanding of a patient's condition, enabling truly personalized care.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Diagnostic Process */}
                <section className="py-24 bg-blue-50">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Diagnostic Capabilities</h2>
                            <p className="text-gray-500">Comprehensive neurophysiological evaluation.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { title: 'Routine EEG', text: 'Baseline monitoring of brain activity for common neurological assessments.', icon: <BoltIcon className="w-6 h-6" /> },
                                { title: 'Sleep EEG', text: 'Specialized recording during sleep to identify specific seizure patterns.', icon: <CheckCircleIcon className="w-6 h-6" /> },
                                { title: 'Report Analysis', text: 'Expert interpretation by senior neurophysiologists and consultants.', icon: <PresentationChartLineIcon className="w-6 h-6" /> },
                                { title: 'Fast Results', text: 'Streamlined processing to ensure timely results for clinical decision-making.', icon: <ShieldCheckIcon className="w-6 h-6" /> },
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm text-center">
                                    <div className="text-blue-900 flex justify-center mb-6">{item.icon}</div>
                                    <h3 className="text-lg font-black text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.text}</p>
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
                                        <BeakerIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">Our <span className="text-blue-900">Vision</span></h2>
                                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                        To be the national center of excellence for advanced neurophysiological diagnostic services in Ethiopia, leveraging technology to unlock the mysteries of the human brain.
                                    </p>
                                </div>
                            </div>

                            {/* Mission */}
                            <div className="relative">
                                <span className="text-cyan-500 font-black text-9xl absolute -top-16 -left-8 opacity-[0.03] select-none pointer-events-none uppercase">Mission</span>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-cyan-500 rounded-[28px] flex items-center justify-center text-white mb-8 shadow-2xl">
                                        <CpuChipIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">Our <span className="text-blue-900">Mission</span></h2>
                                    <ul className="space-y-6">
                                        {[
                                            'Providing high-fidelity, advanced neurophysiological diagnostic services to every patient.',
                                            'Integrating digital EEG technology with clinical psychiatry for more accurate and personalized care.',
                                            'Leading in the diagnostic evaluation of complex neurological and mental health disorders nationally.'
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
                <section className="py-24 bg-gray-50 border-t border-gray-100">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto bg-white rounded-[50px] p-16 shadow-xl border border-blue-100 relative overflow-hidden text-center group">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-110" />
                            <div className="relative z-10">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900 mb-6">Department Objective</h2>
                                <h3 className="text-4xl font-black text-gray-900 mb-8 leading-tight">Goal of EEG Services</h3>
                                <div className="text-2xl font-black text-blue-950 mb-10 leading-relaxed italic">
                                    "To achieve diagnostic precision through advanced brainwave monitoring, informing better clinical outcomes for every patient."
                                </div>
                                <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
                                    By bridging the gap between neurophysiology and clinical practice, we ensure that mental health treatment is grounded in objective neurological data.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <button onClick={() => window.location.href = 'tel:+2511118685385'} className="px-10 py-5 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-900 transition-all shadow-xl hover:-translate-y-1">
                                        Schedule a Test
                                    </button>
                                    <Link href="/services" className="px-10 py-5 bg-gray-100 text-gray-600 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-all">
                                        View All Services
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
