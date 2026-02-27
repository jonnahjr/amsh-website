'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { researchAPI } from '@/lib/api';
import {
    InboxArrowDownIcon,
    BeakerIcon,
    BookOpenIcon,
    AcademicCapIcon,
    ChevronRightIcon,
    CloudArrowUpIcon,
} from '@heroicons/react/24/outline';

export default function ResearchPage() {
    const [publications, setPublications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        researchAPI.getPublished().then(res => {
            setPublications(res.data.publications || []);
        }).catch(() => {
            setPublications([
                { id: '1', title: 'Mental Health Stigma in Sub-Saharan Africa: A Systematic Review', authors: 'Zelalem G., et al.', journal: 'Ethiopian Medical Journal', year: '2023', type: 'ARTICLE' },
                { id: '2', title: 'Prevalence of Depression Among Postpartum Women in Addis Ababa', authors: 'Hana W., Bekele A.', journal: 'Journal of Psychiatry & Neuroscience', year: '2024', type: 'ARTICLE' },
            ]);
        }).finally(() => setLoading(false));
    }, []);

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">
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
                    <div className="container-custom relative z-10 py-24 text-center">
                        <div className="max-w-4xl mx-auto">
                            {/* Badge */}
                            <div className="animate-fade-in-up mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-semibold uppercase tracking-widest">
                                    ✦ Research & Innovation
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                Advancing Mental Health <br />
                                <span className="text-gray-400 italic font-medium">Knowledge in Africa</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-2xl text-blue-100/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                AMSH is a leading center for psychiatric research, conducting impactful studies that shape mental health policy and clinical practice across the continent.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <a href="#submit" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                    Submit Proposal
                                </a>
                                <a href="#publications" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    Browse Publications
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-20 bg-gray-50 border-b border-gray-100">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-gray-900">Research Priorities</h2>
                            <p className="text-gray-500">Focusing our efforts on the most critical mental health challenges.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: <BeakerIcon className="w-8 h-8" />, title: 'Neuroscience', text: 'Investigating biological markers and neurological foundations of mental disorders.' },
                                { icon: <AcademicCapIcon className="w-8 h-8" />, title: 'Clinical Trials', text: 'Evaluating efficacy of pharmacological and psychosocial interventions.' },
                                { icon: <InboxArrowDownIcon className="w-8 h-8" />, title: 'Public Health', text: 'Studying epidemiological trends and mental health delivery systems.' },
                                { icon: <BookOpenIcon className="w-8 h-8" />, title: 'Policy Research', text: 'Shaping mental health legislation and resource allocation strategies.' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                                    <div className="text-blue-900 mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">{item.icon}</div>
                                    <h3 className="text-lg font-black text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Publication Feed */}
                <section id="publications" className="py-24">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div>
                                <span className="text-blue-900 text-[10px] font-black uppercase tracking-widest mb-2 block">Our Database</span>
                                <h2 className="text-4xl font-black text-gray-900">Latest Publications</h2>
                            </div>
                            <button className="text-blue-900 font-black text-sm uppercase tracking-widest flex items-center gap-2 group border-b-2 border-blue-900 pb-1">
                                View Full Repository <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {loading ? (
                                [...Array(3)].map((_, i) => <div key={i} className="h-32 bg-gray-50 rounded-3xl animate-pulse" />)
                            ) : publications.map((pub) => (
                                <div key={pub.id} className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500 flex flex-col md:flex-row gap-8 items-center">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-900 text-2xl font-black flex-shrink-0">
                                        {pub.year}
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-1 block">{pub.type}</span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{pub.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-400">
                                            <span className="flex items-center gap-1.5"><UserIcon className="w-4 h-4" /> {pub.authors}</span>
                                            <span className="flex items-center gap-1.5"><BookOpenIcon className="w-4 h-4" /> {pub.journal}</span>
                                        </div>
                                    </div>
                                    <button className="px-6 py-3 bg-gray-50 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-widest group hover:bg-blue-900 hover:text-white transition-all">
                                        Read Abstract
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Submit Portal */}
                <section id="submit" className="py-24 bg-blue-950 text-white overflow-hidden relative">
                    <div className="container-custom max-w-4xl relative z-10">
                        <div className="bg-white/10 backdrop-blur-md rounded-[50px] p-12 border border-white/10">
                            <div className="text-center mb-10">
                                <CloudArrowUpIcon className="w-16 h-16 mx-auto mb-4 text-cyan-400 opacity-50" />
                                <h2 className="text-3xl font-black mb-4">Research Proposal Submission</h2>
                                <p className="text-blue-200">Are you a researcher looking to collaborate or conduct a study at AMSH? Submit your detailed proposal via our portal for Ethic Committee review.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                        <span>Download Submission Guidelines (PDF)</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                        <span>Review Ethical Approval Process</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                        <span>IRB Contact Information</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                        <span>Consent Form Templates</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-cyan-500 text-blue-950 font-black rounded-3xl uppercase tracking-widest text-sm hover:bg-cyan-400 transition-all shadow-2xl shadow-cyan-500/20">
                                Access Submission Portal
                            </button>
                        </div>
                    </div>
                </section>
            </main >
            <Footer />
            <ChatbotButton />
        </>
    );
}

function UserIcon(props: any) {
    return (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}
