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
                            <h2 className="text-4xl font-black text-blue-950 mb-8 tracking-tight">About Our CPD Program</h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
                                <p>
                                    Emmanuel Mental Specialized Hospital (EMSH) has been at the forefront of mental health care in Ethiopia for over 80 years.
                                    Our CPD program was established to sustain clinical excellence and ensure that all health professionals meet
                                    the highest global standards of psychiatric care.
                                </p>
                                <p>
                                    Positioned as the <strong>National Center of Excellence</strong>, we serve as the primary hub for specialized
                                    mental health training, providing practitioners with the tools they need to navigate the complexities of modern psychiatry.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <h4 className="font-black text-blue-900 mb-3 flex items-center gap-2">
                                        <ShieldCheckIcon className="w-5 h-5" /> Mission
                                    </h4>
                                    <p className="text-sm text-gray-500">To provide high-quality, evidence-based continuing professional development for mental health professionals to improve service delivery and patient outcomes.</p>
                                </div>
                                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                    <h4 className="font-black text-blue-900 mb-3 flex items-center gap-2">
                                        <EyeIcon className="w-5 h-5" /> Vision
                                    </h4>
                                    <p className="text-sm text-gray-500">To be the premier national center of excellence for mental health professional training and accreditation across East Africa.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 rounded-[40px] p-10 lg:p-16 border border-blue-100">
                            <h3 className="text-2xl font-black text-blue-950 mb-8 italic">Program Objectives</h3>
                            <ul className="space-y-6">
                                {[
                                    "Enhancing clinical skills and updated theoretical knowledge.",
                                    "Ensuring compliance with national accreditation standards set by the MOH.",
                                    "Promoting research-driven practice in psychiatric interventions.",
                                    "Fostering a network of highly skilled mental health champions."
                                ].map((obj, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-blue-900 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">
                                            {i + 1}
                                        </div>
                                        <p className="font-bold text-gray-700">{obj}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 pt-8 border-t border-blue-100/50">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-inner">
                                        <CheckBadgeIcon className="w-8 h-8 text-cyan-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 text-sm">Accreditation Standards</h4>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">MOH Accredited Provider</p>
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



            <Footer />
            <ChatbotButton />
        </div>
    );
}
