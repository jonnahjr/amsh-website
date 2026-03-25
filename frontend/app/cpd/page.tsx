'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { cpdAPI, settingsAPI } from '@/lib/api';
import {
    AcademicCapIcon,
    VideoCameraIcon,
    UserGroupIcon,
    CalendarDaysIcon,
    EyeIcon,
    ArrowRightIcon,
    ClockIcon,
    CheckBadgeIcon,
    BuildingOfficeIcon,
    UserIcon,
    IdentificationIcon,
    ShieldCheckIcon,
    XMarkIcon,
    DocumentArrowUpIcon,
    BriefcaseIcon,
    MapPinIcon,
    EnvelopeIcon,
    PhoneIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { CPD_COURSES } from './data';

export default function CPDPage() {
    const [staff, setStaff] = useState<any[]>([]);

    useEffect(() => {
        settingsAPI.getAll().then(res => {
            if (res.data.settings?.staff_directory) {
                try {
                    const dir = JSON.parse(res.data.settings.staff_directory);
                    if (Array.isArray(dir) && dir.length > 0) {
                        setStaff(dir);
                    }
                } catch (e) {
                    console.error('Failed to parse staff directory:', e);
                }
            }
        }).catch(err => console.error('Failed to load staff settings:', err));
    }, []);

    const cpdTeam = staff.length > 0 
        ? staff.filter(p => p.role.toLowerCase().includes('cpd') || p.role.toLowerCase().includes('clinical training'))
        : [
            { id: 'zegeye', name: "Mr. Zegeye Yohannis", role: "CPD, Clinical Training and Research Director", phone: "+251 91 330 7290", image: "" },
            { id: 'azmera', name: "Mrs. Azmera Hadush", role: "CPD Desk Head", phone: "+251 91 216 0130", image: "" },
            { id: 'zebiba', name: "Mrs. Zebiba Nassir", role: "CPD Officer", phone: "+251 93 208 2657", image: "" }
        ];

    return (
        <div className="min-h-screen bg-[#FDFCF9]">
            <EmergencyBanner />
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden bg-blue-950 flex items-center">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                </div>

                {/* Decorative Blue Orbs */}
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />
                <div className="container-custom relative z-10 py-32">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter animate-fade-in-up">
                            Continuing Professional <br />
                            <span className="text-blue-400 italic">Development</span> (CPD)
                        </h1>
                        <p className="text-xl text-blue-100/70 max-w-2xl font-medium leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Advancing the expertise of mental health professionals through accredited training,
                            rigorous standards, and evidence-based practice.
                        </p>
                    </div>
                </div>
            </section>

            {/* About CPD Section */}
            <section className="py-24 border-b border-gray-100">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl font-black text-blue-950 mb-4 tracking-tight">What is CPD?</h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-8">
                                Continuous Professional Development (CPD) refers to the on-going process of learning and development that professionals engage in to improve and maintain their Knowledge, Skills, and Attitudes (KSA) throughout their careers.
                            </p>

                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        Purpose of CPD
                                    </h3>
                                    <p className="text-gray-600 font-medium leading-relaxed mb-6">
                                        Continuing Professional Development (CPD) focuses on developing and improving professional practice. It helps professionals maintain and enhance their skills, knowledge, and competence throughout their careers.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            "Keep skills and knowledge up to date",
                                            "Prepare for greater responsibilities",
                                            "Build confidence in roles",
                                            "Enhance professional creativity",
                                            "Make better professional decisions",
                                            "Progress further in careers"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                                <CheckBadgeIcon className="w-5 h-5 text-emerald-500" />
                                                <span className="text-sm font-bold text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-cyan-50 rounded-lg">
                                            <ShieldCheckIcon className="w-6 h-6 text-cyan-600" />
                                        </div>
                                        Benefits of CPD
                                    </h3>
                                    <ul className="grid grid-cols-1 gap-4">
                                        {[
                                            { title: "Maintaining Knowledge", desc: "Ensures professionals remain competent in their field." },
                                            { title: "Changing Trends", desc: "Helps professionals stay informed about developments." },
                                            { title: "Workplace Effectiveness", desc: "Enhances efficiency and capability in performance." },
                                            { title: "Professional Engagement", desc: "Encourages continuous learning and motivation." },
                                            { title: "Access to Experts", desc: "Opportunities to learn from specialists and leaders." },
                                            { title: "Industry Standards", desc: "Ensures professionals meet required standards." }
                                        ].map((benefit, i) => (
                                            <li key={i} className="flex gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-black text-gray-900 leading-none mb-1">{benefit.title}</h4>
                                                    <p className="text-sm text-gray-500 font-medium">{benefit.desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-blue-950 rounded-[40px] p-10 lg:p-16 text-white overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                                <h3 className="text-3xl font-black mb-8 italic relative z-10">Directorate Message</h3>
                                <p className="text-blue-100/80 leading-relaxed font-medium mb-10 relative z-10">
                                    "Our Directorate is committed to transforming mental health care in Ethiopia by building a workforce that is not only highly skilled but also deeply compassionate and ethically grounded."
                                </p>
                                
                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                        <div className="p-3 bg-blue-500/20 rounded-xl">
                                            <BuildingOfficeIcon className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm">National Center of Excellence</h4>
                                            <p className="text-xs text-blue-200/60 uppercase tracking-widest mt-1">Accredited Provider</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/10 backdrop-blur-sm">
                                        <div className="p-3 bg-cyan-500/20 rounded-xl">
                                            <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm">MOH Certification</h4>
                                            <p className="text-xs text-blue-200/60 uppercase tracking-widest mt-1">Quality Assurance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="py-24 bg-gray-50/50">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div>
                            <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-3 block">Course Catalog</span>
                            <h2 className="text-4xl font-black text-blue-950 tracking-tight">Accredited CPD Courses</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CPD_COURSES.map((course) => (
                            <div key={course.id} className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${course.mode === 'Online' ? 'bg-emerald-50 text-emerald-600' :
                                        course.mode === 'Hybrid' ? 'bg-purple-50 text-purple-600' :
                                            'bg-blue-50 text-blue-600'
                                        }`}>
                                        {course.mode}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-blue-900">
                                        <ClockIcon className="w-4 h-4" />
                                        <span className="text-xs font-black">{course.duration}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-blue-950 mb-4 group-hover:text-blue-700 transition-colors leading-tight">
                                    {course.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                                    {course.description}
                                </p>

                                <div className="space-y-3 mb-8 pb-6 border-b border-gray-50">
                                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                                        <CalendarDaysIcon className="w-4 h-4 text-blue-900" />
                                        <span>{new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                                        <CheckBadgeIcon className="w-4 h-4 text-blue-900" />
                                        <span className="text-blue-900 uppercase tracking-tighter">{course.credits}</span>
                                        {course.status && (
                                            <span className={`ml-auto px-2 py-0.5 rounded text-[10px] ${course.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {course.status}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                                        <UserGroupIcon className="w-4 h-4 text-blue-900" />
                                        <span className="text-gray-600">Target: {course.targetProfessionals}</span>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="text-gray-900 font-black text-lg">
                                        {course.fee}
                                    </div>
                                    {course.status === 'On-going' ? (
                                        <div
                                            title="Registration Closed"
                                            className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-gray-900 overflow-hidden group cursor-not-allowed"
                                        >
                                            <div className="absolute inset-0 opacity-20 bg-[conic-gradient(from_0deg_at_50%_50%,#3b82f6_0%,transparent_60%,#3b82f6_100%)] animate-[spin_4s_linear_infinite]" />
                                            <div className="absolute inset-[2px] bg-gray-900 rounded-[14px]" />
                                            
                                            <div className="relative z-10 overflow-hidden h-4 w-full">
                                                <div className="flex flex-col animate-text-swap">
                                                    <div className="flex items-center justify-center gap-2 h-4 text-gray-400 font-black text-xs uppercase tracking-widest text-center whitespace-nowrap">
                                                        <LockClosedIcon className="w-4 h-4 text-gray-500" />
                                                        Closed
                                                    </div>
                                                    <div className="flex items-center justify-center gap-2 h-4 text-gray-500 font-black text-xs uppercase tracking-widest text-center whitespace-nowrap">
                                                        Not Available
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={`/cpd/${course.id}/apply`}
                                            className="bg-blue-950 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-xl shadow-blue-900/10 inline-block"
                                        >
                                            Apply Now
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership & Contact Section */}
            <section className="py-24 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-3 block">Directorate Leadership</span>
                        <h2 className="text-4xl font-black text-blue-950 tracking-tight">Contact Our CPD Team</h2>
                    </div>

                    <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 lg:gap-8 overflow-x-auto pb-4">
                        {cpdTeam.map((person, i) => (
                            <div key={i} className="group flex flex-col items-center text-center min-w-[200px] max-w-[240px] p-6 bg-white rounded-[32px] border border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-500">
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-50 border-4 border-white shadow-md group-hover:scale-105 transition-all duration-500">
                                        <img 
                                            src={person.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name.replace(/^(Mr\.|Mrs\.|Dr\.)\s+/i, ''))}&background=eff6ff&color=1e3a8a&size=256&font-size=0.33`} 
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
                                <a href={`tel:${person.phone?.replace(/\s+/g, '')}`} className="mt-auto px-4 py-2 rounded-xl bg-blue-50 text-blue-950 text-[10px] font-black hover:bg-blue-100 transition-colors flex items-center gap-2">
                                    <PhoneIcon className="w-3 h-3" />
                                    {person.phone}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <ChatbotButton />
        </div>
    );
}
