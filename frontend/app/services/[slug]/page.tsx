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
    CheckCircleIcon,
    PhoneIcon,
    ChevronRightIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    ClockIcon,
    LightBulbIcon,
    BuildingLibraryIcon,
    StarIcon,
} from '@heroicons/react/24/outline';

// Service-specific rich content
const SERVICE_CONTENT: Record<string, {
    about: string;
    vision: string;
    mission: string[];
    goal: string;
    highlights: { label: string; value: string }[];
}> = {
    'psychiatry-outpatient': {
        about: 'Our Psychiatry Outpatient Services provide comprehensive mental health consultations for adults requiring non-emergency psychiatric care. Patients receive evidence-based assessment, diagnosis, and treatment planning from our team of experienced psychiatrists and clinical psychologists.',
        vision: 'To be the primary access point for quality outpatient mental health care in the region.',
        mission: ['Provide accessible, dignified psychiatric consultations.', 'Deliver evidence-based treatment and follow-up.', 'Coordinate care with GPs, hospitals, and community services.'],
        goal: 'Ensure every patient receives timely, patient-centered outpatient psychiatric care.',
        highlights: [{ label: 'Setting', value: 'Outpatient Clinic' }, { label: 'Referrals', value: 'Open & Referred' }, { label: 'Follow-up', value: 'Scheduled' }],
    },
    'addiction-treatment': {
        about: 'Our Addiction Treatment Services offer a full continuum of care for individuals with substance use disorders, including detoxification, rehabilitation, and relapse prevention. Our multidisciplinary approach combines medical management with psychosocial support.',
        vision: 'To lead comprehensive addiction care that restores lives and rebuilds families.',
        mission: ['Provide safe, medically supervised detoxification.', 'Deliver evidence-based rehabilitation programs.', 'Support long-term recovery through community integration.'],
        goal: 'Achieve lasting recovery and improved quality of life for every patient.',
        highlights: [{ label: 'Program Type', value: 'Inpatient & Outpatient' }, { label: 'Approach', value: 'Biopsychosocial' }, { label: 'Duration', value: 'Personalized' }],
    },
    'ect-service': {
        about: 'Electroconvulsive Therapy (ECT) at EMSH is administered by a specialist team under full anesthesia and monitoring. It is an evidence-based, effective treatment for severe depression, treatment-resistant conditions, and certain psychiatric emergencies.',
        vision: 'To provide safe, state-of-the-art ECT with excellent clinical outcomes.',
        mission: ['Ensure patient safety throughout every ECT session.', 'Provide thorough pre-treatment assessment and consent.', 'Monitor outcomes and adjust protocols for best results.'],
        goal: 'Deliver safe, effective ECT treatment that transforms outcomes for treatment-resistant conditions.',
        highlights: [{ label: 'Anesthesia', value: 'General' }, { label: 'Monitoring', value: 'Continuous' }, { label: 'Indication', value: 'Specialist Referral' }],
    },
    'outpatient-pharmacy': {
        about: 'The Outpatient Pharmacy provides dedicated pharmaceutical care for clinic patients. We specialize in psychiatric pharmacology, ensuring accurate dispensing and professional counseling to support treatment adherence and mental health recovery.',
        vision: 'To ensure every outpatient has access to safe, effective, and professional pharmacy services.',
        mission: ['Provide expert medication counseling and dispensing.', 'Monitor patient adherence to psychiatric treatments.', 'Maintain a high standard of patient safety and drug information.'],
        goal: 'Support therapeutic success through professional pharmaceutical intervention.',
        highlights: [{ label: 'Service', value: 'Outpatient' }, { label: 'Specialty', value: 'Psychiatric Drugs' }, { label: 'Care', value: 'Counseling' }],
    },
    'inpatient-pharmacy': {
        about: 'Our Inpatient Pharmacy department manages the supply and distribution of medications to all hospital wards. We work closely with clinical teams to ensure timely medication administration for hospitalized patients with acute mental health needs.',
        vision: 'Excellence in ward-based pharmaceutical support and patient safety.',
        mission: ['Ensure timely and accurate delivery of ward medications.', 'Collaborate with doctors on patient medication charts.', 'Maintain strict control over hospital-based drug administration.'],
        goal: 'Provide 24/7 pharmaceutical support to all hospital departments and wards.',
        highlights: [{ label: 'Coverage', value: 'All Wards' }, { label: 'Team', value: 'Liaison Pharmacy' }, { label: 'Safety', value: 'Strict Protocol' }],
    },
    'art-pharmacy': {
        about: 'The ART Pharmacy specializes in the management and dispensing of Antiretroviral Therapies. We provide critical support for patients on chronic treatment, focusing on long-term adherence, counseling, and confidentiality.',
        vision: 'Lifelong health and viral suppression through expert ART pharmacy care.',
        mission: ['Manage ART medication supply and counseling.', 'Support patients with adherence strategies.', 'Ensure discreet and compassionate service delivery.'],
        goal: 'Achieve 100% medication adherence for every patient in the ART program.',
        highlights: [{ label: 'Focus', value: 'ART Management' }, { label: 'Patient Support', value: 'Chronic Care' }, { label: 'Privacy', value: 'Strict' }],
    },
    'community-pharmacy': {
        about: 'Our Community Pharmacy services extend pharmaceutical care to the surrounding neighborhood, providing accessible medications and health advice to the local public.',
        vision: 'To be the most trusted healthcare partner in our local community.',
        mission: ['Provide neighborhood access to essential medicines.', 'Offer professional health advice to the public.', 'Ensure affordable and safe pharmaceutical products.'],
        goal: 'Improve community health through accessible pharmaceutical services.',
        highlights: [{ label: 'Access', value: 'Public' }, { label: 'Location', value: 'On-Site' }, { label: 'Support', value: 'Community First' }],
    },
    'drug-compounding': {
        about: 'The Drug Compounding unit prepares tailored medication formulations for patients with specific clinical needs that cannot be met by standard manufactured products.',
        vision: 'Precision pharmaceutical preparation for unique patient requirements.',
        mission: ['Prepare high-quality extemporaneous formulations.', 'Ensure accuracy in customized drug dosing.', 'Maintain sterile compounding environments where required.'],
        goal: 'Meet the unique therapeutic needs of every patient through expert compounding.',
        highlights: [{ label: 'Facility', value: 'Advanced Lab' }, { label: 'Customization', value: 'High' }, { label: 'Expertise', value: 'Specialized' }],
    },
    'pharmacy-supply': {
        about: 'The Pharmacy Supply and Storage unit manages the entire hospital medical supply chain, ensuring that critical medications and medical supplies are always available for clinical use.',
        vision: 'Uninterrupted clinical supply chains for continuous patient care.',
        mission: ['Maintain robust inventory management systems.', 'Ensure proper storage of temperature-sensitive drugs.', 'Guarantee availability of essential medicines across the hospital.'],
        goal: 'Eliminate supply-related interruptions in hospital clinical services.',
        highlights: [{ label: 'Scope', value: 'Hospital-Wide' }, { label: 'Control', value: 'Inventory Management' }, { label: 'Priority', value: 'Supply Continuity' }],
    },
};

const DEFAULT_CONTENT = {
    about: '',
    vision: 'To deliver this specialized service at the highest level of clinical excellence, setting the standard for patient-centered care in Ethiopia.',
    mission: [
        'Provide safe, effective, and dignified clinical services to every patient.',
        'Continuously improve through evidence-based practice and professional development.',
        'Collaborate across departments to ensure holistic, coordinated care.',
    ],
    goal: 'Achieve outstanding clinical outcomes through compassionate, expert service delivery.',
    highlights: [
        { label: 'Care Standard', value: 'Evidence-Based' },
        { label: 'Team', value: 'Multidisciplinary' },
        { label: 'Access', value: 'Referral & Direct' },
    ],
};

export default function ServiceDetailPage() {
    const { slug } = useParams();
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        servicesAPI.getBySlug(slug as string).then(res => {
            setService(res.data.service);
        }).catch(() => {
            setService({
                name: 'Clinical Service',
                description: 'Specialized care service at Emmanuel Mental Specialized Hospital.',
                icon: '🏥',
                content: '',
            });
        }).finally(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-blue-950 flex flex-col items-center justify-center text-white">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-black uppercase tracking-widest text-sm opacity-50">Loading Service...</p>
        </div>
    );

    if (!service) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl font-black text-gray-400 uppercase tracking-widest">Service Not Found</p>
        </div>
    );

    const content = SERVICE_CONTENT[slug as string] || DEFAULT_CONTENT;

    // Use DB fields if available, otherwise fallback to static content
    const visionText = service.vision || content.vision;
    const missionPoints = service.mission ? service.mission.split('\n') : content.mission;
    const goalText = service.goal || content.goal;
    const aboutText = service.content || content.about || service.description || 'Our dedicated clinical team provides this service with the highest standards of patient care and safety.';

    let highlights = content.highlights;
    if (service.highlights) {
        try {
            highlights = JSON.parse(service.highlights);
        } catch (e) {
            console.error('Error parsing highlights JSON:', e);
        }
    }

    const galleryImages = service.gallery ? service.gallery.split(';').filter(Boolean) : [];

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">
                {/* Hero */}
                <section className="relative min-h-[70vh] bg-blue-950 flex items-end overflow-hidden">
                    {service.image ? (
                        <>
                            <img src={service.image} alt={service.name} className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105" crossOrigin="anonymous" />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/60 to-blue-950/20" />
                        </>
                    ) : (
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 70%, #1e3a8a 0%, transparent 60%)' }} />
                        </div>
                    )}

                    <div className="container-custom relative z-10 pb-24">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-1 bg-cyan-400" />
                                <Link href="/services" className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 hover:text-white transition-colors">
                                    Our Clinical Services
                                </Link>
                            </div>
                            <h1 className="text-[60px] lg:text-[100px] font-black text-white leading-[0.85] tracking-[-0.04em] mb-12">
                                {service.name.split(' ').map((word: string, i: number) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </h1>
                            <div className="flex flex-wrap items-center gap-8">
                                <div className="px-8 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-4">
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-blue-200">Department</p>
                                        <p className="text-white font-black">{service.department?.name || 'General Clinical'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-custom py-20 max-w-5xl space-y-32">

                    {/* ABOUT SECTION */}
                    <div className="space-y-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-1 bg-blue-900" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900">Service Overview</h2>
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
                                    Expert Care,<br /><span className="text-blue-900">Patient-Centered.</span>
                                </h3>
                                <div className="text-gray-600 text-lg leading-relaxed space-y-6 font-medium">
                                    {aboutText.split('\n').map((p: string, i: number) => <p key={i}>{p}</p>)}
                                </div>
                            </div>
                            <div className="space-y-5">
                                {highlights.map((h: any, i: number) => (
                                    <div key={i} className="flex items-center gap-5 p-6 bg-gray-50 rounded-3xl">
                                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            {i === 0 ? <ShieldCheckIcon className="w-6 h-6 text-blue-900" /> :
                                                i === 1 ? <UserGroupIcon className="w-6 h-6 text-blue-900" /> :
                                                    <ClockIcon className="w-6 h-6 text-blue-900" />}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{h.label}</p>
                                            <p className="font-black text-gray-900 mt-0.5">{h.value}</p>
                                        </div>
                                    </div>
                                ))}
                                {/* Department link */}
                                {service.department && (
                                    <Link href={`/departments/${service.department.slug}`}
                                        className="flex items-center gap-4 p-6 bg-blue-900 rounded-3xl text-white hover:bg-blue-800 transition-all group">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <BuildingLibraryIcon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Parent Department</p>
                                            <p className="font-black mt-0.5">{service.department.name}</p>
                                        </div>
                                        <ChevronRightIcon className="w-5 h-5 text-blue-300 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Service image */}
                        {service.image && (
                            <div className="rounded-[56px] overflow-hidden shadow-2xl aspect-video">
                                <img src={service.image} alt={service.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                            </div>
                        )}
                    </div>

                    {/* Integrated Care Philosophy */}
                    <div className="py-24 border-y border-gray-100 bg-gray-50/30 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-20 lg:px-20 rounded-[80px]">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-4 mb-8 justify-center">
                                <div className="w-8 h-1 bg-cyan-500 rounded-full" />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-600">Our Clinical Philosophy</h2>
                                <div className="w-8 h-1 bg-cyan-500 rounded-full" />
                            </div>
                            <h3 className="text-3xl lg:text-[50px] font-black text-gray-900 mb-10 tracking-tighter leading-tight text-center">
                                Evidence-Based Care <br />
                                <span className="text-blue-900">Tailored To Your Journey.</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-center md:text-left">
                                    <p>
                                        We approach {service?.name} with a deep understanding that clinical excellence requires both technical expertise and human compassion. Our protocols are regularly reviewed against international mental health standards.
                                    </p>
                                </div>
                                <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-center md:text-left">
                                    <p>
                                        Every patient's path is unique. That's why our clinical team focuses on personalized interventions that consider not only the immediate diagnosis but also the long-term well-being of the individual.
                                    </p>
                                </div>
                            </div>

                            {/* Service pathway infographic style */}
                            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { label: 'Evaluation', title: 'Specialized Screening', desc: 'Expert assessment and clinical history.' },
                                    { label: 'Planning', title: 'Custom Care Path', desc: 'Personalized treatment strategy.' },
                                    { label: 'Treatment', title: 'Active Intervention', desc: 'Evidence-based therapy and care.' },
                                    { label: 'Recovery', title: 'Continuity of Care', desc: 'Long-term monitoring and support.' }
                                ].map((step, i) => (
                                    <div key={i} className="relative p-6 bg-blue-950 rounded-[32px] shadow-sm border border-white/5 group hover:border-cyan-500/30 transition-all duration-300">
                                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 font-black mb-4 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                                            {i + 1}
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-cyan-400/50 mb-1">{step.label}</p>
                                        <p className="font-black text-white text-sm mb-2 leading-tight">{step.title}</p>
                                        <p className="text-blue-100/40 text-[10px] leading-relaxed">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* VISION & MISSION SECTION */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-1 bg-cyan-500" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-600">Vision & Mission</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            {/* Vision Card */}
                            <div className="p-12 bg-blue-950 rounded-[48px] relative group overflow-hidden border border-white/5">
                                <StarIcon className="absolute -right-8 -top-8 w-40 h-40 text-cyan-400 opacity-[0.03] rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                                <div className="relative z-10">
                                    <h3 className="text-sm font-black text-cyan-400/50 uppercase tracking-widest mb-6">Service Vision</h3>
                                    <p className="text-xl font-black text-white leading-tight">
                                        "{visionText}"
                                    </p>
                                </div>
                            </div>

                            {/* Mission & Goal */}
                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-sm font-black text-blue-950 uppercase tracking-widest mb-8">Clinical Mission</h3>
                                    <div className="space-y-6">
                                        {missionPoints.map((m: string, i: number) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                                                    <CheckCircleIcon className="w-4 h-4 text-blue-900" />
                                                </div>
                                                <p className="text-gray-600 font-medium leading-relaxed">{m}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 bg-blue-900 rounded-[32px] text-white">
                                    <div className="flex items-center gap-3 mb-4">
                                        <LightBulbIcon className="w-5 h-5 text-cyan-400" />
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-200">Key Strategic Goal</h4>
                                    </div>
                                    <p className="font-bold text-lg leading-snug">
                                        {goalText}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Core Values */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: ShieldCheckIcon, title: 'Safety First', desc: 'Patient safety is our non-negotiable priority in every procedure and interaction.' },
                                { icon: StarIcon, title: 'Excellence', desc: 'We uphold the highest clinical standards and continually improve our practice.' },
                                { icon: UserGroupIcon, title: 'Compassion', desc: 'Every patient is treated with dignity, empathy, and respect.' },
                            ].map((v, i) => (
                                <div key={i} className="bg-blue-950 rounded-[32px] p-8 shadow-xl shadow-blue-950/10 border border-white/5 group hover:border-cyan-500/30 transition-all duration-500">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                                        <v.icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h4 className="font-black text-white mb-2 text-sm uppercase tracking-wide group-hover:text-cyan-400 transition-colors">{v.title}</h4>
                                    <p className="text-blue-100/40 text-xs leading-relaxed font-medium">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SERVICE VISUALS SECTION */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-1 bg-blue-900" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900">Service Visuals</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[0, 1].map((idx) => (
                                <div key={idx} className="rounded-[56px] overflow-hidden shadow-2xl aspect-[4/3] relative group bg-blue-50 border border-blue-100 flex flex-col items-center justify-center">
                                    {galleryImages[idx] ? (
                                        <img
                                            src={galleryImages[idx]}
                                            alt={`${service.name} view ${idx + 1}`}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            crossOrigin="anonymous"
                                        />
                                    ) : (
                                        <>
                                            {/* Background Pattern for placeholder */}
                                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1e3a8a 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                                            <div className="text-8xl mb-6 grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700 scale-90 group-hover:scale-100">
                                                {idx === 0 ? '🏥' : '🔬'}
                                            </div>

                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className="px-6 py-2 bg-blue-900/5 backdrop-blur-sm rounded-full border border-blue-900/10 transition-all group-hover:bg-blue-900 group-hover:border-blue-900">
                                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-900/40 group-hover:text-white transition-colors">
                                                        {idx === 0 ? 'Clinical Environment' : 'Diagnostic Equipment'}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {/* Glassy overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 to-transparent opacity-60 pointer-events-none" />
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-gray-400 text-[10px] font-black uppercase tracking-widest opacity-50">
                            Images representative of our specialized {service.name} facilities
                        </p>
                    </div>


                </div>
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
