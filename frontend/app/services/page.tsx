'use client';

import { useState, useEffect } from 'react';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { ArrowRightIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { servicesAPI } from '@/lib/api';

const services = [
    {
        icon: '🚑',
        name: 'Emergency Service',
        slug: 'emergency-service',
        description: '24/7 rapid psychiatric intervention, crisis stabilization, and immediate mental health support.',
    },
    {
        icon: '🏥',
        name: 'Outpatient Services',
        slug: 'outpatient-services',
        description: 'Expert psychiatric consultations, specialized mental health clinics, and comprehensive follow-up care tailored to promote long-term recovery and wellness.',
    },
    {
        icon: '🛏️',
        name: 'Inpatient Services',
        slug: 'inpatient-services',
        description: 'Compassionate 24/7 clinical care, therapeutic stabilization, and dedicated recovery support within a safe, restorative hospital environment.',
    },
    {
        icon: '⚡',
        name: 'EEG Services',
        slug: 'eeg-services',
        description: 'State-of-the-art neurophysiological diagnostic testing and brain mapping to support precise clinical assessment and personalized treatment planning.',
    },
    {
        icon: '📚',
        name: 'CPD Training',
        slug: 'cpd-training',
        description: 'Accredited Continuing Professional Development programs for mental health practitioners.',
    },
    {
        icon: '🧠',
        name: 'Psychological Services',
        slug: 'psychological-services',
        description: 'Psychological assessment and therapies including CBT, family, group, and trauma counseling.'
    },
    {
        icon: '💊',
        name: 'Addiction & Substance Abuse',
        slug: 'addiction-substance-abuse',
        description: 'Detoxification, rehabilitation programs, and counseling for alcohol and drug addiction.'
    },
    {
        icon: '👶',
        name: 'Child & Adolescent Mental Health',
        slug: 'child-adolescent',
        description: 'Assessment and therapy for Autism, ADHD, behavioral disorders, and child depression.'
    },
    {
        icon: '🔄',
        name: 'Rehabilitation Services',
        slug: 'rehabilitation',
        description: 'Occupational therapy, social skills training, and psychosocial rehabilitation programs.'
    },
    {
        icon: '💻',
        name: 'Telepsychiatry Services',
        slug: 'telepsychiatry',
        description: 'Remote psychiatric consultation and tele-counseling to expand mental health access.'
    },
    {
        icon: '⚕️',
        name: 'Pharmacy Services',
        slug: 'pharmacy',
        description: 'On-site pharmacy providing psychiatric medications, counseling, and prescription management.'
    },
    {
        icon: '🔬',
        name: 'Laboratory Services',
        slug: 'laboratory',
        description: 'Comprehensive blood tests, drug screening, and medical screening tests.'
    },
    {
        icon: '🎓',
        name: 'Training & Education',
        slug: 'training-education',
        description: 'Clinical training, internship, and residency programs for medical and mental health professionals.'
    },
    {
        icon: '📊',
        name: 'Research Services',
        slug: 'research',
        description: 'Conducting clinical, epidemiological, and public health research to support national policies.'
    },
    {
        icon: '🤝',
        name: 'Community Mental Health',
        slug: 'community-mental-health',
        description: 'Mental health awareness programs, community screening, and regional hospital outreach clinics.'
    },
    {
        icon: '⚖️',
        name: 'Forensic Psychiatry Services',
        slug: 'forensic-psychiatry',
        description: 'Mental health evaluation for legal purposes, criminal responsibility, and fitness-to-stand-trial.'
    },
    {
        icon: '🏥',
        name: 'Referral Services',
        slug: 'referral-services',
        description: 'National referral center receiving patients from health centers, regional hospitals, and private clinics.'
    },
    {
        icon: '🗣️',
        name: 'Counseling Services',
        slug: 'counseling-services',
        description: 'Professional counseling for depression, anxiety, stress, trauma, and family problems.'
    },
    {
        icon: '🛡️',
        name: 'Promotion & Prevention',
        slug: 'promotion-prevention',
        description: 'Awareness campaigns, education programs, and mental health prevention programs.'
    }
];

export default function ServicesPage() {
    const [apiServices, setApiServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await servicesAPI.getAll();
                setApiServices(res.data.services);
            } catch (err) {
                setError('Failed to load services');
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
                                    ✦ Specialized Medical Excellence
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                Our Specialized <br />
                                <span className="text-gray-400 italic font-medium">Medical Services</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-2xl text-blue-100/60 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Comprehensive psychiatric care and mental health solutions provided by Ethiopia's leading specialists at Amanuel Mental Specialized Hospital.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <Link href="/appointment" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                    📅 Book Appointment
                                </Link>
                                <a href="#services-grid" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    View All Sections
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Grid - Smaller Boxes, 3 columns on LG */}
                <section className="py-20 bg-[#F8FAFB]">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(() => {
                                // Merge local services with API services to ensure all 15 boxes are present
                                const merged = services.map(localSvc => {
                                    const apiSvc = apiServices.find(s => s.slug === localSvc.slug);
                                    // Handle API data but prioritize our high-quality local descriptions
                                    return apiSvc
                                        ? {
                                            ...localSvc,
                                            ...apiSvc,
                                            description: localSvc.description || apiSvc.description || apiSvc.short_description
                                        }
                                        : localSvc;
                                });

                                // Add any API services that aren't in the local list
                                apiServices.forEach(apiSvc => {
                                    if (!services.find(s => s.slug === apiSvc.slug)) {
                                        merged.push(apiSvc);
                                    }
                                });

                                return merged;
                            })().map((service) => (
                                <div
                                    key={service.slug}
                                    className="group relative bg-blue-950 rounded-[3rem] p-9 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center overflow-hidden border border-white/5"
                                >
                                    <div className="relative z-10 flex flex-col items-center w-full">
                                        {/* Slimmer Icon Container */}
                                        <div className="w-16 h-16 bg-white/5 backdrop-blur-2xl rounded-[1.5rem] flex items-center justify-center text-4xl mb-8 border border-white/10 group-hover:bg-blue-900 transition-all duration-700 shadow-xl">
                                            <span>{service.icon}</span>
                                        </div>

                                        <h2 className="text-xl md:text-2xl font-black mb-4 leading-tight uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                                            {service.name}
                                        </h2>

                                        <p className="text-blue-100/80 text-[13px] md:text-sm leading-relaxed font-medium mb-10 min-h-[60px]">
                                            {service.description}
                                        </p>

                                        {/* Compact Actions */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-8 border-t border-white/5 uppercase tracking-widest font-black text-[9px]">
                                            <Link
                                                href="/appointment"
                                                className="relative z-20 flex items-center justify-center gap-2 py-4 bg-white text-blue-950 rounded-xl hover:bg-cyan-400 transition-all shadow-lg"
                                            >
                                                <CalendarIcon className="w-3.5 h-3.5" />
                                                Book
                                            </Link>
                                            <Link
                                                href={`/services/${service.slug}`}
                                                className="flex items-center justify-center gap-2 py-4 bg-transparent border border-white/10 text-white rounded-xl hover:bg-white hover:text-blue-950 transition-all after:absolute after:inset-0 after:z-10"
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
