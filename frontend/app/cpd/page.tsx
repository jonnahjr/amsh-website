'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { cpdAPI } from '@/lib/api';
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
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { CPD_COURSES } from './data';

export default function CPDPage() {

    return (
        <div className="min-h-screen bg-[#FDFCF9]">
            <EmergencyBanner />
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-blue-950">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }} />
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-6 animate-fade-in">
                            Professional Excellence
                        </span>
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
                                    <Link
                                        href={`/cpd/${course.id}/apply`}
                                        className="bg-blue-950 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-xl shadow-blue-900/10 inline-block"
                                    >
                                        Apply Now
                                    </Link>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                role: "CPD, Clinical Training and Research Director",
                                name: "Mr. Zegeye Yohannis",
                                phone: "+251 91 330 7290",
                                tel: "+251913307290",
                                icon: <UserIcon className="w-8 h-8" />
                            },
                            {
                                role: "CPD Desk Head",
                                name: "Mrs. Azmera Hadush",
                                phone: "+251 91 216 0130",
                                tel: "+251912160130",
                                icon: <AcademicCapIcon className="w-8 h-8" />
                            },
                            {
                                role: "CPD Officer",
                                name: "Mrs. Zebiba Nassir",
                                phone: "+251 93 208 2657",
                                tel: "+251932082657",
                                icon: <UserGroupIcon className="w-8 h-8" />
                            },
                        ].map((person, i) => (
                            <div key={i} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 group hover:bg-blue-900 hover:text-white transition-all duration-500">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-900 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                    {person.icon}
                                </div>
                                <h4 className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">{person.role}</h4>
                                <h3 className="text-xl font-black mb-6 leading-tight">{person.name}</h3>
                                <div className="space-y-3 pt-6 border-t border-gray-200 group-hover:border-white/20">
                                    <a href={`tel:${person.tel}`} className="flex items-center gap-3 text-sm font-bold hover:underline">
                                        <PhoneIcon className="w-4 h-4 opacity-40" />
                                        <span className="opacity-80">{person.phone}</span>
                                    </a>
                                </div>
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
