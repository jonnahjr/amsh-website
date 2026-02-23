'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { servicesAPI } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import {
    CheckIcon,
    PhoneIcon,
    CalendarIcon,
    ArrowLongRightIcon,
} from '@heroicons/react/24/outline';

export default function ServiceDetailPage() {
    const { slug } = useParams();
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        servicesAPI.getBySlug(slug as string).then(res => {
            setService(res.data.service);
        }).catch(() => {
            // Mock for common services if slug matches
            const details: any = {
                'emergency-service': {
                    name: 'Emergency Psychiatry',
                    description: '24/7 psychiatric emergency services for acute mental health crises.',
                    content: 'Amanuel Hospital’s Emergency Department is the only 24-hour psychiatric emergency center in Ethiopia. We provide immediate evaluation, stabilization, and intensive intervention for individuals experiencing acute mental health crises including suicidal thoughts, severe agitation, or psychosis.',
                    icon: '🚨',
                    color: 'from-red-600 to-red-800',
                    features: ['24/7 Emergency Response', 'Acute Crisis Stabilization', 'Immediate Triage', 'On-call Psychiatrists'],
                    hours: '24 Hours / 7 Days'
                },
                'outpatient': {
                    name: 'Outpatient Services (OPD)',
                    description: 'Expert evaluation and ongoing treatment for mental wellness.',
                    content: 'Our Outpatient Services (OPD) cater to thousands of patients annually, offering diagnostic assessments, medication management, and specialized therapeutic interventions. We operate specialized clinics for various mental health conditions throughout the week.',
                    icon: '🧠',
                    color: 'from-blue-600 to-blue-800',
                    features: ['Diagnostic Evaluation', 'Medication Management', 'Specialized Clinics', 'Follow-up Care'],
                    hours: 'Mon-Fri: 2:30 AM - 10:00 AM'
                }
            };
            setService(details[slug as string] || details['outpatient']);
        }).finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading service details...</div>;

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main>
                {/* Header Section */}
                <section className={`bg-gradient-to-br ${service.color || 'from-blue-900 to-blue-700'} py-24 text-white uppercase`}>
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-[40px] flex items-center justify-center text-6xl shadow-2xl animate-float">
                                {service.icon || '🏥'}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white text-xs font-black tracking-widest mb-4">
                                    Hospital Service
                                </span>
                                <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">{service.name}</h1>
                                <p className="text-blue-100 text-lg max-w-2xl font-medium lowercase first-letter:uppercase">{service.description}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="section bg-white">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-10">
                                <div className="prose-amsh max-w-none">
                                    <h2 className="text-3xl font-black text-gray-900 mb-6">Service Overview</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">{service.content}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {service.features?.map((f: string) => (
                                        <div key={f} className="flex items-center gap-4 p-5 bg-gray-50 rounded-3xl border border-gray-100 group hover:bg-blue-900 hover:text-white transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-blue-100 group-hover:bg-white/20 flex items-center justify-center text-blue-900 group-hover:text-white transition-colors">
                                                <CheckIcon className="w-6 h-6" />
                                            </div>
                                            <span className="font-black text-sm uppercase tracking-wider">{f}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA for appointments */}
                                <div className="p-10 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 rounded-[40px] text-white overflow-hidden relative group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-black mb-4">Ready to seek professional care?</h3>
                                        <p className="text-blue-200 mb-8 max-w-md">Our specialized teams are here to support your journey towards mental wellness with compassion and expertise.</p>
                                        <div className="flex flex-wrap gap-4">
                                            <Link href="/appointment" className="btn-accent px-8">📅 Book Now</Link>
                                            <Link href="/contact" className="px-8 py-3 rounded-xl border border-white/30 font-bold hover:bg-white/10 transition-colors uppercase text-sm tracking-widest flex items-center gap-2">
                                                Inquire More <ArrowLongRightIcon className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                <div className="card p-8 bg-gray-50 border-0">
                                    <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm mb-6 pb-2 border-b border-gray-200">Service Logistics</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-900"><ClockIcon className="w-6 h-6" /></div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Available Hours</p>
                                                <p className="text-sm font-bold text-gray-900 uppercase">{service.hours}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-white rounded-2xl shadow-sm text-red-600 shadow-red-100"><PhoneIcon className="w-6 h-6" /></div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Contact Directly</p>
                                                <p className="text-sm font-bold text-gray-900">+251-111-868-53-85</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-8 bg-blue-50 border-0">
                                    <h3 className="font-black text-blue-900 uppercase tracking-widest text-sm mb-4">Other Services</h3>
                                    <div className="space-y-4">
                                        {['Laboratory', 'Pharmacy', 'Inpatient', 'Research'].map(s => (
                                            <Link key={s} href={`/services/${s.toLowerCase()}`} className="flex items-center justify-between group bg-white p-4 rounded-2xl hover:bg-blue-900 transition-all">
                                                <span className="font-bold text-sm text-gray-600 group-hover:text-white">{s} Services</span>
                                                <ArrowLongRightIcon className="w-4 h-4 text-blue-900 group-hover:text-white" />
                                            </Link>
                                        ))}
                                    </div>
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

function ClockIcon(props: any) {
    return (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
