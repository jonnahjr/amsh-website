'use client';

import { useState, useEffect, useMemo } from 'react';
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
    CalendarIcon,
    ArrowRightIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    AcademicCapIcon,
    GlobeAltIcon,
    BeakerIcon,
    HeartIcon,
    SparklesIcon,
    HomeIcon,
    ClockIcon,
    LightBulbIcon,
    LinkIcon,
    BriefcaseIcon,
    ArrowPathRoundedSquareIcon,
    ChatBubbleLeftRightIcon,
    SpeakerWaveIcon
} from '@heroicons/react/24/outline';

const SERVICE_DATA: any = {
    'psychological-services': {
        name: 'Psychological Services',
        badge: 'Holistic Mind Care',
        description: 'Comprehensive psychological assessments, individual therapy, and evidence-based interventions for diverse mental health needs.',
        introduction: 'Our Psychological Services department offers a wide range of therapeutic interventions tailored to children, adolescents, and adults. We focus on evidence-based practices such as Cognitive Behavioral Therapy (CBT), interpersonal therapy, and holistic counseling to support emotional growth and resilience.',
        vision: 'To be the leading center for evidence-based psychological interventions in East Africa, recognized for excellence in therapeutic outcomes.',
        mission: [
            'Providing patient-centered psychological support through diagnostic excellence and evidence-based treatments.',
            'Integrating research-led therapeutic techniques to ensure the highest standards of mental health care.',
            'Empowering individuals and families through compassion, education, and professional guidance.'
        ],
        goal: 'To achieve sustainable emotional well-veing and empower individuals through therapeutic excellence and psychological resilience.',
        stats: [
            { label: 'Therapists', value: '15+', icon: <UserGroupIcon /> },
            { label: 'Methodologies', value: 'Evidence-Led', icon: <LightBulbIcon /> },
            { label: 'Care Type', value: 'Holistic', icon: <HeartIcon /> }
        ],
        icon: '🧠',
        color: 'blue'
    },
    'addiction-substance-abuse': {
        name: 'Addiction & Substance Abuse',
        badge: 'Recovery & Transformation',
        description: 'Specialized detoxification, rehabilitation, and counseling services for individuals overcoming substance use disorders.',
        introduction: 'AMSH provides a safe and supportive environment for individuals battling addiction. Our comprehensive program includes clinical detoxification, intensive psychotherapy, and social reintegration strategies designed to break the cycle of substance abuse and restore the dignity of our patients.',
        vision: 'Creating a drug-free community through compassionate, expert-led addiction recovery and clinical excellence.',
        mission: [
            'Providing scientifically grounded addiction treatment and compassionate clinical support.',
            'Promoting social reintegration through skill training and dedicated psychosocial rehabilitation.',
            'Engaging in community outreach to prevent substance abuse through education and advocacy.'
        ],
        goal: 'To achieve sustainable sobriety and successful community reintegration for individuals affected by addiction.',
        stats: [
            { label: 'Support Groups', value: '24/7', icon: <UserGroupIcon /> },
            { label: 'Programs', value: 'Intensive', icon: <SparklesIcon /> },
            { label: 'Success Rate', value: 'High', icon: <ShieldCheckIcon /> }
        ],
        icon: '🌱',
        color: 'red'
    },
    'child-adolescent': {
        name: 'Child & Adolescent Mental Health',
        badge: 'Securing Future Minds',
        description: 'Dedicated psychiatric and psychological support for children and teenagers facing developmental and emotional challenges.',
        introduction: 'Our Child and Adolescent unit specializes in early identification and treatment of mental health disorders in youth. We understand that early intervention is critical for healthy development, and our multidisciplinary team works closely with families and schools to provide a supportive environment.',
        vision: 'To be a center of excellence for youth mental health, ensuring every child has the foundation for a healthy and productive life.',
        mission: [
            'Providing specialized pediatric psychiatric care through diagnostic precision and family-centered therapy.',
            'Advancing developmental mental health through specialized training for parents and educators.',
            'Leading in the protection and promotion of children\'s mental well-being nationally.'
        ],
        goal: 'To ensure every child and adolescent has access to the professional support needed for optimal mental development.',
        stats: [
            { label: 'Specialists', value: 'Senior', icon: <AcademicCapIcon /> },
            { label: 'Approach', value: 'Family-First', icon: <UserGroupIcon /> },
            { label: 'Impact', value: 'National', icon: <GlobeAltIcon /> }
        ],
        icon: '🧒',
        color: 'indigo'
    },
    'rehabilitation': {
        name: 'Rehabilitation Services',
        badge: 'Restoring Independence',
        description: 'Comprehensive psychosocial rehabilitation programs aimed at restoring functional abilities and community integration.',
        introduction: 'Rehabilitation at Amanuel goes beyond clinical treatment. We focus on restoring the social and vocational skills necessary for patients to lead independent lives. Our programs include occupational therapy, industrial therapy, and social skills training within a therapeutic community.',
        vision: 'To be the premier center for psychosocial rehabilitation, transforming lives through holistic skill development.',
        mission: [
            'Providing comprehensive rehabilitation services that target social, vocational, and emotional independence.',
            'Creating therapeutic environments that foster community integration and personal growth.',
            'Advancing the science of rehabilitation through specialized professional training and research.'
        ],
        goal: 'To empower individuals in recovery to achieve their full potential and successfully reintegrate into society.',
        stats: [
            { label: 'Workshops', value: 'Vocational', icon: <HomeIcon /> },
            { label: 'Integration', value: 'Community-Focused', icon: <GlobeAltIcon /> },
            { label: 'Outcome', value: 'Independence', icon: <ShieldCheckIcon /> }
        ],
        icon: '🏗️',
        color: 'emerald'
    },
    'telepsychiatry': {
        name: 'Telepsychiatry Services',
        badge: 'Virtual Care Access',
        description: 'Remote psychiatric consultations and follow-up care using secure telecommunication technology.',
        introduction: 'Our Telepsychiatry unit bridges the gap for patients at a distance, providing high-quality psychiatric care through secure video consultations. This service ensures continuity of care for those in remote areas or those unable to travel to the hospital.',
        vision: 'To expand mental health reach across Ethiopia through innovative telehealth solutions.',
        mission: [
            'Providing secure and accessible remote psychiatric consultations.',
            'Ensuring clinical standards are maintained in virtual environments.',
            'Leveraging technology to reduce the geographical barriers to mental health care.'
        ],
        goal: 'To make expert psychiatric care available to every individual in Ethiopia, regardless of their location.',
        stats: [
            { label: 'Reach', value: 'Nationwide', icon: <GlobeAltIcon /> },
            { label: 'Tech Stack', value: 'Secure', icon: <ShieldCheckIcon /> },
            { label: 'Availability', value: 'Extended', icon: <ClockIcon /> }
        ],
        icon: '💻',
        color: 'cyan'
    },
    'pharmacy': {
        name: 'Pharmacy Services',
        badge: 'Reliable Medication',
        description: 'Specialized psychiatric and general pharmacy services ensuring the availability of essential mental health medications.',
        introduction: 'The AMSH Pharmacy is a specialized unit dedicated to providing essential psychiatric medications. We manage a robust supply chain to ensure that life-saving treatments are always accessible to our patients, backed by expert pharmaceutical advice.',
        vision: 'To be the national center for psychiatric pharmaceutical excellence and supply reliability.',
        mission: [
            'Ensuring the continuous availability of essential psychiatric and general medications.',
            'Providing expert pharmacological guidance to patients and clinical teams.',
            'Maintaining the highest standards of medication safety and pharmaceutical storage.'
        ],
        goal: 'To ensure every patient receives the right medication at the right time for their recovery.',
        stats: [
            { label: 'Stock', value: 'Specialized', icon: <BeakerIcon /> },
            { label: 'Safety', value: 'Certified', icon: <ShieldCheckIcon /> },
            { label: 'Guidance', value: 'Expert', icon: <LightBulbIcon /> }
        ],
        icon: '💊',
        color: 'emerald'
    },
    'laboratory': {
        name: 'Laboratory Services',
        badge: 'Diagnostic Excellence',
        description: 'State-of-the-art clinical laboratory services providing accurate and timely diagnostic tests.',
        introduction: 'The AMSH Laboratory provides comprehensive diagnostic services including hematology, clinical chemistry, and specialized psychiatric monitoring. We use advanced automated systems to ensure the highest accuracy for clinical decision-making.',
        vision: 'To be the leading psychiatric diagnostic laboratory in the region, recognized for precision and efficiency.',
        mission: [
            'Providing accurate and timely laboratory diagnostic services.',
            'Maintaining the highest standards of quality control and laboratory safety.',
            'Supporting clinical research through specialized diagnostic testing and data analysis.'
        ],
        goal: 'To provide the objective clinical data necessary for optimal patient treatment and monitoring.',
        stats: [
            { label: 'Tests', value: 'Comprehensive', icon: <BeakerIcon /> },
            { label: 'Accuracy', value: 'Certified', icon: <ShieldCheckIcon /> },
            { label: 'Turnaround', value: 'Rapid', icon: <ClockIcon /> }
        ],
        icon: '🔬',
        color: 'blue'
    },
    'research': {
        name: 'Research Services',
        badge: 'Advancing Science',
        description: 'Leading psychiatric research initiatives to improve mental health outcomes in Ethiopia and globally.',
        introduction: 'The Research department at AMSH is a hub for psychiatric innovation. We conduct large-scale epidemiological studies, clinical trials, and psychosocial research to better understand mental health challenges in the Ethiopian context and beyond.',
        vision: 'To be a globally recognized center for mental health research excellence and innovation.',
        mission: [
            'Conducting high-impact psychiatric research that informs national policy and clinical practice.',
            'Fostering collaborations with international research institutions and universities.',
            'Building national capacity for mental health research through training and mentorship.'
        ],
        goal: 'To transform mental health care through evidence-based research and scientific discovery.',
        stats: [
            { label: 'Papers', value: 'Peer-Reviewed', icon: <AcademicCapIcon /> },
            { label: 'Partners', value: 'Global', icon: <GlobeAltIcon /> },
            { label: 'Focus', value: 'Innovation', icon: <LightBulbIcon /> }
        ],
        icon: '📊',
        color: 'indigo'
    },
    'community-mental-health': {
        name: 'Community Mental Health',
        badge: 'Beyond Hospital Walls',
        description: 'Decentralized mental health services providing care and support within local communities.',
        introduction: 'Our Community Mental Health unit focuses on bringing psychiatric care to where patients live. We operate outreach clinics, provide home-based support, and work with local health centers to ensure that mental health services are accessible and culturally integrated within the community.',
        vision: 'To be the pioneer of community-based psychiatric care, ensuring every community member has local access to mental wellness support.',
        mission: [
            'Developing and maintaining community-based outreach clinics.',
            'Providing psychosocial support and crisis intervention within local neighborhoods.',
            'Empowering community health workers through specialized psychiatric training.'
        ],
        goal: 'To shift the focus of mental health care from institutionalization to community-based recovery and support.',
        stats: [
            { label: 'Outreach', value: 'Active', icon: <GlobeAltIcon /> },
            { label: 'Impact', value: 'Localized', icon: <HomeIcon /> },
            { label: 'Partners', value: 'Community', icon: <UserGroupIcon /> }
        ],
        icon: '🏘️',
        color: 'emerald'
    },
    'forensic-psychiatry': {
        name: 'Forensic Psychiatry Services',
        badge: 'Legal & Clinical Bridge',
        description: 'Specialized psychiatric evaluation and treatment for individuals involved in the legal system.',
        introduction: 'The Forensic Psychiatry department at AMSH provides expert evaluations for legal cases, including fitness to stand trial and criminal responsibility assessments. We also provide specialized treatment for individuals in our high-security forensic wards, balancing clinical rehabilitation with public safety.',
        vision: 'To be the national authority on forensic psychiatric evaluation and ethical clinical management.',
        mission: [
            'Providing impartial and expert psychiatric evaluations for the Ethiopian legal system.',
            'Ensuring ethical and secure clinical care for individuals in forensic custody.',
            'Leading national policy development in the intersection of mental health and law.'
        ],
        goal: 'To provide objective clinical expertise that serves both the patient and the integrity of the justice system.',
        stats: [
            { label: 'Experts', value: 'Senior', icon: <BriefcaseIcon /> },
            { label: 'Security', value: 'High', icon: <ShieldCheckIcon /> },
            { label: 'Influence', value: 'National', icon: <AcademicCapIcon /> }
        ],
        icon: '⚖️',
        color: 'indigo'
    },
    'training-education': {
        name: 'Training & Education',
        badge: 'Academic Excellence',
        description: 'Comprehensive clinical training, residency programs, and academic development for mental health professionals.',
        introduction: 'Amanuel Hospital is a hub for psychiatric education in Ethiopia. We provide specialized training for residents, medical students, and mental health professionals, ensuring that the next generation of caregivers is equipped with the highest standards of clinical knowledge.',
        vision: 'To be the center of excellence for psychiatric education and academic innovation in East Africa.',
        mission: [
            'Providing high-quality clinical residency and internship programs.',
            'Fostering a culture of academic research and evidence-based clinical practice.',
            'Expanding the mental health workforce through specialized training and professional development.'
        ],
        goal: 'To build a competent and compassionate mental health workforce for Ethiopia and the region.',
        stats: [
            { label: 'Graduates', value: 'National', icon: <AcademicCapIcon /> },
            { label: 'Programs', value: 'Specialized', icon: <LightBulbIcon /> },
            { label: 'Standard', value: 'Academic', icon: <ShieldCheckIcon /> }
        ],
        icon: '🎓',
        color: 'indigo'
    },
    'referral-services': {
        name: 'Referral Services',
        badge: 'Seamless Transitions',
        description: 'Managing inward and outward patient referrals to ensure continuity of care across the health system.',
        introduction: 'Our Referral unit coordinates the seamless movement of patients between Amanuel and other healthcare providers. We ensure that clinical information is accurately communicated and that patients transition safely to the appropriate level of care.',
        vision: 'To be the national coordinator for psychiatric referral excellence and health system integration.',
        mission: [
            'Streamlining referral processes through digital tracking and clear clinical protocols.',
            'Ensuring every referred patient receives timely evaluation and follow-up care.',
            'Strengthening partnerships with regional health bureaus and primary care providers.'
        ],
        goal: 'To ensure no patient is lost in the healthcare system through efficient and coordinated referral management.',
        stats: [
            { label: 'Partners', value: 'National', icon: <ArrowPathRoundedSquareIcon /> },
            { label: 'Coordination', value: 'Digital', icon: <LinkIcon /> },
            { label: 'Efficiency', value: 'High-Speed', icon: <ClockIcon /> }
        ],
        icon: '🔄',
        color: 'blue'
    },
    'counseling-services': {
        name: 'Counseling Services',
        badge: 'Emotional Support',
        description: 'Professional counseling and psychosocial support for individuals and families.',
        introduction: 'AMSH provides dedicated counseling services to support individuals facing life transitions, grief, or interpersonal challenges. our counselors provide a safe, confidential space for emotional exploration and the development of healthy coping strategies.',
        vision: 'To provide accessible, high-quality counseling services that empower individuals toward emotional resilience.',
        mission: [
            'Providing professional, confidential counseling for individuals and families.',
            'Utilizing integrative therapeutic approaches to support varied emotional needs.',
            'Promoting the importance of psychological counseling through community education.'
        ],
        goal: 'To provide the emotional foundation for long-term mental wellness and personal growth.',
        stats: [
            { label: 'Sessions', value: 'Private', icon: <ChatBubbleLeftRightIcon /> },
            { label: 'Approach', value: 'Person-Centered', icon: <HeartIcon /> },
            { label: 'Impact', value: 'Holistic', icon: <SparklesIcon /> }
        ],
        icon: '🗣️',
        color: 'cyan'
    },
    'promotion-prevention': {
        name: 'Promotion & Prevention',
        badge: 'Proactive Wellness',
        description: 'Initiatives aimed at promoting mental health awareness and preventing the onset of psychiatric disorders.',
        introduction: 'The Promotion and Prevention unit at AMSH is our proactive arm. We conduct public awareness campaigns, school programs, and workplace interventions designed to reduce stigma and promote early-stage mental wellness strategies across the nation.',
        vision: 'To lead the national movement for mental health awareness and proactive preventive care.',
        mission: [
            'Designing and implementing large-scale mental health promotion campaigns.',
            'Collaborating with media and community leaders to reduce mental health stigma.',
            'Providing early intervention strategies through community and school outreach.'
        ],
        goal: 'To foster a society that understands, protects, and promotes mental health for all.',
        stats: [
            { label: 'Impact', value: 'Nationwide', icon: <SpeakerWaveIcon /> },
            { label: 'Awareness', value: 'High-Impact', icon: <GlobeAltIcon /> },
            { label: 'Prevention', value: 'Evidence-Led', icon: <LightBulbIcon /> }
        ],
        icon: '📢',
        color: 'indigo'
    }
};

export default function ServiceDetailPage() {
    const { slug } = useParams();
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // First check local data
        const localData = SERVICE_DATA[slug as string];
        if (localData) {
            setService(localData);
            setLoading(false);
            return;
        }

        // Fallback to API
        servicesAPI.getBySlug(slug as string).then(res => {
            const apiService = res.data.service;
            setService({
                name: apiService.title || apiService.name,
                badge: 'Specialized Care',
                description: apiService.description || apiService.short_description,
                introduction: apiService.content || apiService.description,
                vision: 'To provide exceptional clinical excellence in all specialized medical fields.',
                mission: [
                    'Providing high-quality diagnostic and treatment services.',
                    'Advancing medical knowledge through research and education.',
                    'Ensuring patient safety and clinical integrity at all times.'
                ],
                goal: 'To achieve optimal health outcomes through professional medical expertise.',
                stats: [
                    { label: 'Staff', value: 'Qualified', icon: <ShieldCheckIcon /> },
                    { label: 'Standard', value: 'Premium', icon: <SparklesIcon /> },
                    { label: 'Service', value: 'Patient-First', icon: <HeartIcon /> }
                ],
                icon: '🏥',
                color: 'blue'
            });
        }).catch(() => {
            // Ultimate fallback
            setService(SERVICE_DATA['psychological-services']);
        }).finally(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-blue-950 flex flex-col items-center justify-center text-white">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-black uppercase tracking-widest text-sm opacity-50">Initializing Premium Care...</p>
        </div>
    );

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">
                {/* Hero Section */}
                <section className="relative min-h-[70vh] bg-blue-950 flex items-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '48px 48px',
                        }} />
                    </div>

                    <div className={`absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-${service.color === 'blue' ? 'blue' : service.color === 'red' ? 'red' : 'cyan'}-600/10 rounded-full blur-[120px] animate-float pointer-events-none`} />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                    <div className="container-custom relative z-10 py-24 text-center">
                        <div className="max-w-4xl mx-auto">
                            <div className="animate-fade-in-up mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-semibold uppercase tracking-widest">
                                    {service.badge}
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                {service.name.split(' ').map((word: string, i: number) => i === service.name.split(' ').length - 1 ? <span key={i}><br className="md:hidden" /><span className="text-gray-400 italic font-medium ml-2">{word}</span></span> : word + ' ')}
                            </h1>

                            <p className="text-lg md:text-2xl text-blue-100/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                {service.description}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <Link href="/contact" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                    📞 Contact Hospital
                                </Link>
                                <a href="tel:+2511118685385" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    <PhoneIcon className="w-5 h-5" /> Contact Center
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="py-32 relative overflow-hidden">
                    <div className="container-custom relative z-10">
                        <div className="max-w-7xl mx-auto text-center lg:text-left">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                <div>
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900 mb-6 flex items-center justify-center lg:justify-start gap-4">
                                        <span className="w-12 h-[1px] bg-blue-900 hidden lg:block"></span> Specialized Department
                                    </h2>
                                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                                        Expert Guidance for <br />
                                        <span className="text-blue-900">Healthier Lives.</span>
                                    </h3>
                                    <div className="prose prose-lg text-gray-600 leading-relaxed font-medium space-y-6 mx-auto lg:mx-0">
                                        <p>{service.introduction}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                                    {service.stats.map((stat: any, i: number) => (
                                        <div key={i} className="bg-blue-50/50 p-8 rounded-[32px] border border-blue-100/50 flex items-center gap-6 hover:bg-white hover:shadow-xl transition-all group">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-900 shadow-sm group-hover:bg-blue-900 group-hover:text-white transition-all">
                                                {stat.icon && <stat.icon.type className="w-7 h-7" />}
                                            </div>
                                            <div>
                                                <p className="text-2xl font-black text-gray-900 leading-none mb-1">{stat.value}</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission Sections */}
                <section className="py-32 overflow-hidden bg-gray-50/50">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                            <div className="relative">
                                <span className="text-blue-500 font-black text-[120px] absolute -top-20 -left-12 opacity-[0.03] select-none pointer-events-none uppercase">VISION</span>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-blue-900 rounded-[28px] flex items-center justify-center text-white mb-8 shadow-2xl">
                                        <GlobeAltIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">Our <span className="text-blue-900">Vision</span></h2>
                                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                        {service.vision}
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                <span className="text-cyan-500 font-black text-[120px] absolute -top-20 -left-12 opacity-[0.03] select-none pointer-events-none uppercase">MISSION</span>
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-cyan-500 rounded-[28px] flex items-center justify-center text-white mb-8 shadow-2xl">
                                        <AcademicCapIcon className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase leading-tight">Our <span className="text-blue-900">Mission</span></h2>
                                    <ul className="space-y-6">
                                        {service.mission.map((text: string, i: number) => (
                                            <li key={i} className="flex gap-4 items-start text-gray-600 font-medium group">
                                                <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 flex-shrink-0 mt-1 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
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
                <section className="py-32 relative group overflow-hidden">
                    <div className="container-custom">
                        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[64px] p-16 md:p-24 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
                            <div className="relative z-10">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-8">Strategic Objective</h2>
                                <h3 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter leading-tight">Professional Goal</h3>
                                <div className="text-2xl md:text-3xl font-black text-blue-200 mb-12 leading-relaxed italic max-w-4xl mx-auto">
                                    "{service.goal}"
                                </div>
                                <div className="flex flex-col sm:flex-row justify-center gap-6">
                                    <Link href="/contact" className="px-12 py-6 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl active:scale-95">
                                        📞 Contact Us
                                    </Link>
                                    <Link href="/services" className="px-12 py-6 bg-transparent border border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                        View Grid
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

function WrenchScrewdriverIcon(props: any) {
    return (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}
