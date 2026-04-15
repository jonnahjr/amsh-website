'use client';

import ChatbotButton from '@/components/chatbot/ChatbotButton';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { settingsAPI, resolveImageUrl } from '@/lib/api';
import {
    AcademicCapIcon,
    BanknotesIcon,
    BeakerIcon,
    BuildingLibraryIcon,
    CalendarDaysIcon,
    CheckBadgeIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ClinicalAttachmentPage() {
    const [staff, setStaff] = useState<any[]>([]);
    const [prices, setPrices] = useState({ eth: '2,500', int: '5,000' });

    useEffect(() => {
        settingsAPI.getAll().then(res => {
            const settings = res.data.settings;
            if (settings) {
                if (settings.clinical_attachment_eth_price) {
                    setPrices(prev => ({ ...prev, eth: Number(settings.clinical_attachment_eth_price).toLocaleString() }));
                }
                if (settings.clinical_attachment_int_price) {
                    setPrices(prev => ({ ...prev, int: Number(settings.clinical_attachment_int_price).toLocaleString() }));
                }

                if (settings.staff_directory) {
                    try {
                        let rawDir = settings.staff_directory;
                        if (typeof rawDir === 'string') {
                            rawDir = rawDir.trim();
                            if (rawDir.startsWith("'") || rawDir.includes("':")) {
                                rawDir = rawDir.replace(/'/g, '"');
                            }
                            rawDir = rawDir.replace(/,(\s*[\]}])/g, '$1');
                        }
                        const dir = JSON.parse(rawDir);
                        setStaff(Array.isArray(dir) ? dir : []);
                    } catch (e) {
                        console.error('Failed to parse staff directory:', e);
                        setStaff([]);
                    }
                }
            }
        }).catch(err => console.error('Failed to load settings:', err));
    }, []);

    const defaultStaff = [
        { id: 'zegeye', name: "Mr. Zegeye Yohannis", role: "CPD, Clinical Training and Research Director", phone: "+251 91 330 7290", image: "/assets/research/mr_zegeye_yohannis_headshot_1775135176650.png" },
        { id: 'habtamu', name: "Mr. Habtamu Derajaw", role: "Research & Clinical Training Desk Head", phone: "", image: "/assets/research/mr_habtamu_derajaw_headshot_1775135205786.png" },
        { id: 'azmera', name: "Mrs. Azmera Hadush", role: "CPD Desk Head", phone: "+251 91 216 0130", image: "" },
        { id: 'zebiba', name: "Mrs. Zebiba Nassir", role: "CPD Officer", phone: "+251 93 208 2657", image: "" },
        { id: 'mensur', name: "Mr. Mensur Nesru", role: "Research Officer", phone: "", image: "/assets/research/mr_mensur_nesru_headshot_1775135244113.png" }
    ];

    const sourceStaff = staff.length > 0 ? staff : defaultStaff;
    const trainingTeam = sourceStaff.filter(p => {
        if (Array.isArray(p.pages)) return p.pages.includes('clinical_attachment');
        // Fallback for legacy compatibility
        return p.name?.toLowerCase().includes('zegeye') || 
               p.name?.toLowerCase().includes('habtamu');
    });

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <EmergencyBanner />
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-blue-950 py-24 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '48px 48px',
                    }} />
                </div>

                {/* Decorative Blue Orbs */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-float pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-400/5 rounded-full blur-[80px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                <div className="container-custom relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 text-cyan-400 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 animate-fade-in-up">
                        🎓 Clinical Education
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                        <span className="text-gray-400 italic font-medium">Professional</span><br />
                        Attachment Portal
                    </h1>
                    <p className="text-blue-100/70 text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                        Join Amanuel's specialized psychiatric teaching hospital. We offer specialized clinical exposure for government and private institutions as well as self-sponsored professionals.
                    </p>
                </div>
            </section>

            {/* Training Hub & Statistics */}
            <section className="py-24 bg-white border-b border-gray-100">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-4 block">National Hub</span>
                            <h2 className="text-4xl font-black text-blue-950 mb-8 tracking-tight">Coordination of Clinical Practice Training</h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-10">
                                Amanuel Mental Specialized Hospital serves as a clinical practice training hub for mental health for government universities and private colleges in the fields of health sciences, psychology, and social work.
                            </p>
                            
                            <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 flex items-center gap-6">
                                <div className="p-4 bg-white rounded-2xl shadow-sm">
                                    <UserGroupIcon className="w-10 h-10 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-blue-900">2,500+</div>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">Annual Student Attachments</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "Psychiatry Residency",
                                "Postgraduate CMH",
                                "Medicine",
                                "Psychiatry Nursing",
                                "General Nursing",
                                "Midwifery",
                                "Clinical Psychology",
                                "General Psychology",
                                "Pharmacy",
                                "Medical Lab Tech"
                            ].map((prog, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                    <span className="text-sm font-black text-blue-900">{prog}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialized Training Program */}
            <section className="py-24 bg-blue-50/30">
                <div className="container-custom">
                    <div className="bg-white rounded-[40px] p-8 md:p-16 border border-blue-100 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <span className="px-4 py-1.5 rounded-full bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
                                    Specialized Certificate
                                </span>
                                <h2 className="text-4xl font-black text-blue-950 mb-6 tracking-tight">Self-Sponsor Psychiatry Nursing Training</h2>
                                <p className="text-gray-600 font-medium leading-relaxed mb-8">
                                    Amanuel Mental Specialized Hospital offers a premium <span className="text-blue-900 font-bold">one-month intensive</span> Psychiatry Nursing Training Program. This curriculum is specifically designed for health professionals aiming to strengthen their clinical competencies for local or international practice.
                                </p>
                                
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">Ideal For:</h4>
                                    {[
                                        "Nurses seeking professional specialization in mental health",
                                        "Health professionals planning to practice internationally (USA, Europe, etc.)",
                                        "Clinicians wanting to strengthen psychiatric nursing core skills"
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3">
                                            <CheckBadgeIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                            <span className="text-sm font-bold text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="bg-blue-950 rounded-3xl p-8 text-white">
                                <h3 className="text-xl font-black mb-6">Program Highlights</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                            <CalendarDaysIcon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black">1 Month Duration</div>
                                            <div className="text-[10px] text-blue-200 uppercase tracking-wider">Condensed Intensive</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                            <AcademicCapIcon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black">Global Standards</div>
                                            <div className="text-[10px] text-blue-200 uppercase tracking-wider">International Readiness</div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <Link 
                                            href="/clinical-attachment/apply?category=SELF_SPONSORED"
                                            className="w-full bg-blue-950 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center"
                                        >
                                            Inquire About Program
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="section bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Government Institutions */}
                        <div className="card p-8 bg-white group hover:border-blue-300 transition-all duration-500 flex flex-col h-full">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-900 mb-8 group-hover:scale-110 transition-transform">
                                <BuildingLibraryIcon className="w-8 h-8" />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <CheckBadgeIcon className="w-4 h-4" /> Academic
                                </span>
                                <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">Public Institutions</h2>
                                <p className="text-gray-600 text-xs font-semibold leading-relaxed mb-6">
                                    Partner programs for public universities and government Colleges with full academic integration.
                                </p>
                                <ul className="space-y-4 mb-10 flex-1">
                                    {[
                                        "Teaching placement",
                                        "Academic integration",
                                        "MoH compliance",
                                        "Research access",
                                        "Zero fees",
                                        "Group schedules"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/clinical-attachment/apply?category=GOVERNMENT"
                                    className="w-full bg-blue-950 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-950/20 flex items-center justify-center mt-auto"
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </div>

                        {/* Private Colleges & Universities */}
                        <div className="card p-8 bg-white border-t-4 border-t-blue-900 group hover:border-blue-300 transition-all duration-500 flex flex-col h-full">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-900 mb-8 group-hover:scale-110 transition-transform">
                                <AcademicCapIcon className="w-8 h-8" />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <span className="text-amber-600 font-bold text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <BanknotesIcon className="w-4 h-4" /> Private Access
                                </span>
                                <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">Private Colleges</h2>
                                <p className="text-gray-600 text-xs font-semibold leading-relaxed mb-6">
                                    Clinical placement for private medical colleges, nursing schools, and health science institutes.
                                </p>
                                <ul className="space-y-4 mb-10 flex-1">
                                    {[
                                        "Clinical supervisors",
                                        "Standardized fees",
                                        "Flexible windows",
                                        "Hours verification",
                                        "Specialized exposure",
                                        "Training support"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                                            <div className="w-1 h-1 rounded-full bg-amber-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/clinical-attachment/apply?category=PRIVATE"
                                    className="w-full bg-blue-950 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-950/20 flex items-center justify-center mt-auto"
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </div>

                        {/* Individual / Self-Sponsored Applicants */}
                        <div className="card p-8 bg-white group hover:border-emerald-300 transition-all duration-500 flex flex-col h-full">
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-110 transition-transform">
                                <UserGroupIcon className="w-8 h-8" />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <CheckBadgeIcon className="w-4 h-4" /> Self-Sponsor
                                </span>
                                <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter">Independent Applicants</h2>
                                <p className="text-gray-600 text-xs font-semibold leading-relaxed mb-6">
                                    Direct application for healthcare professionals or students seeking unaffiliated clinical exposure.
                                </p>
                                <ul className="space-y-4 mb-4 flex-1">
                                    {[
                                        "Specialist mentorship",
                                        "Custom objectives",
                                        "Hospital liaison"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500" /> {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mb-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100/50">
                                    <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <BanknotesIcon className="w-3.5 h-3.5" /> Investment (2 Weeks - 1 Month)
                                    </h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center bg-white/50 p-2 rounded-lg">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">Ethiopian</span>
                                            <span className="text-sm font-black text-emerald-700">{prices.eth} ETB</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white/50 p-2 rounded-lg">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">International</span>
                                            <span className="text-sm font-black text-emerald-700">{prices.int} ETB</span>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="/clinical-attachment/apply?category=SELF_SPONSORED"
                                    className="w-full bg-blue-950 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center mt-auto"
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer Section */}
            <section className="pb-24">
                <div className="container-custom">
                    <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 flex gap-6 items-center flex-col md:flex-row text-center md:text-left">
                        <div className="p-4 bg-white rounded-2xl shadow-sm">
                            <BeakerIcon className="w-10 h-10 text-amber-600" />
                        </div>
                        <div>
                            <h4 className="font-black text-blue-950 mb-2 italic">Institutional Note</h4>
                            <p className="text-sm text-gray-600 font-medium">All clinical attachments are subject to bed capacity and availability of clinical supervisors. Priority is given to established academic partners.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership & Contact Section */}
            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-3 block">Directorate Leadership</span>
                        <h2 className="text-4xl font-black text-blue-950 tracking-tight">Contact Clinical Training Desk</h2>
                    </div>

                    <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 lg:gap-8 overflow-x-auto pb-4">
                        {trainingTeam.map((person, i) => (
                            <div key={i} className="content-box-premium group flex flex-col items-center text-center min-w-[200px] max-w-[240px] p-6 rounded-[32px]">
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-4 border-white shadow-md group-hover:scale-105 transition-all duration-500">
                                        <img 
                                            src={resolveImageUrl(person.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name.replace(/^(Mr\.|Mrs\.|Dr\.)\s+/i, ''))}&background=eff6ff&color=1e3a8a&size=256&font-size=0.33`)} 
                                            alt={person.name} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-7 h-7 flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                            <path fill="#0095F6" d="M12,1 L14.46,2.82 L17.5,2.47 L18.72,5.28 L21.53,6.5 L21.18,9.54 L23,12 L21.18,14.46 L21.53,17.5 L18.72,18.72 L17.5,21.53 L14.46,21.18 L12,23 L9.54,21.18 L6.5,21.53 L5.28,18.72 L2.47,17.5 L2.82,14.46 L1,12 L2.82,9.54 L2.47,6.5 L5.28,5.28 L6.5,2.47 L9.54,2.82 Z"/>
                                            <path d="M7 12.5L10.5 15.5L17 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-sm font-black text-blue-950 mb-1 group-hover:text-blue-700 transition-colors uppercase tracking-tight">{person.name}</h3>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-tight mb-4">{person.role}</p>
                                <div className="mt-auto space-y-2 w-full">
                                    {person.phone && person.showPhone !== false && (
                                        <a href={`tel:${person.phone?.replace(/\s+/g, '')}`} className="px-4 py-2 rounded-xl bg-blue-50 text-blue-950 text-[10px] font-black hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                                            <PhoneIcon className="w-3 h-3" />
                                            {person.phone}
                                        </a>
                                    )}
                                    {person.email && person.showEmail !== false && (
                                        <a href={`mailto:${person.email}`} className="px-4 py-2 rounded-xl bg-blue-50 text-blue-950 text-[10px] font-black hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                                            <EnvelopeIcon className="w-3 h-3" />
                                            Email Card
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <Footer />
            <ChatbotButton />
        </div >
    );
}
