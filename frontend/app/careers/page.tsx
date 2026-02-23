'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { jobsAPI } from '@/lib/api';
import {
    BriefcaseIcon,
    MapPinIcon,
    ClockIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function CareersPage() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await jobsAPI.getAll({ search });
            setJobs(res.data.jobs || []);
        } catch {
            setJobs([
                { id: '1', title: 'Consultant Psychiatrist', type: 'FULL_TIME', department: 'Adult Psychiatry', deadline: '2024-06-15', location: 'Main Hospital' },
                { id: '2', title: 'Senior Psychiatric Nurse', type: 'FULL_TIME', department: 'Nursing', deadline: '2024-05-30', location: 'Emergency Ward' },
                { id: '3', title: 'Clinical Psychologist', type: 'CONTRACT', department: 'Child Psychiatry', deadline: '2024-06-01', location: 'Main Hospital' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [search]);

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-gray-50 pb-24">
                {/* Hero */}
                <section className="bg-blue-950 py-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }} />
                    <div className="container-custom text-center relative z-10">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-cyan-300 text-xs font-black uppercase tracking-widest mb-6">
                            Career Opportunity
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">Join Our Dedicated Team</h1>
                        <p className="text-blue-200 text-xl max-w-2xl mx-auto">
                            Build your career at Ethiopia's premier mental health institution.
                            Help us shape the future of psychiatric care.
                        </p>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-16 bg-white border-b border-gray-100">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: '🌟', title: 'Meaningful Work', desc: 'Touch lives and make a direct impact on mental wellness in Ethiopia.' },
                                { icon: '📚', title: 'Continuous Growth', desc: 'Access specialized training, research opportunities, and CPD programs.' },
                                { icon: '🤝', title: 'Expert Collaboration', desc: 'Work alongside the country\'s leading psychiatric professionals.' }
                            ].map((benefit) => (
                                <div key={benefit.title} className="text-center p-8">
                                    <div className="text-5xl mb-4">{benefit.icon}</div>
                                    <h3 className="text-xl font-black text-gray-900 mb-3">{benefit.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Job Listings */}
                <section className="section">
                    <div className="container-custom max-w-5xl">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900">Current Openings</h2>
                                <p className="text-gray-500">Find the perfect role that matches your skills.</p>
                            </div>
                            <div className="relative w-full md:w-80">
                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all outline-none"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {loading ? (
                                [...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 animate-pulse h-32" />
                                ))
                            ) : jobs.length === 0 ? (
                                <div className="bg-white p-20 rounded-[40px] border border-gray-100 text-center">
                                    <div className="text-5xl mb-4">🔍</div>
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No positions found matching your search</p>
                                </div>
                            ) : (
                                jobs.map((job) => (
                                    <div key={job.id} className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex-1">
                                                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-900 text-[10px] font-black uppercase tracking-widest rounded-lg mb-3">
                                                    {job.department}
                                                </span>
                                                <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-900 transition-colors mb-4">{job.title}</h3>
                                                <div className="flex flex-wrap gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                    <div className="flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-blue-900" /> {job.location}</div>
                                                    <div className="flex items-center gap-2"><ClockIcon className="w-4 h-4 text-blue-900" /> {job.type.replace('_', ' ')}</div>
                                                    <div className="flex items-center gap-2 text-red-400"><span className="w-4 h-4 text-center">⏳</span> Deadline: {new Date(job.deadline).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button className="px-8 py-3 bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/10">
                                                    Apply Now
                                                </button>
                                                <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 transition-colors">
                                                    <ChevronRightIcon className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Spontaneous Application */}
                        <div className="mt-16 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-[40px] p-12 text-center text-white overflow-hidden relative">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black mb-4">Don't see a matching role?</h2>
                                <p className="text-blue-200 mb-10 max-w-xl mx-auto">We are always looking for passionate mental health professionals. Send us your CV and we will keep you on file for future opportunities.</p>
                                <button className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all shadow-2xl">
                                    Submit General Application
                                </button>
                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
