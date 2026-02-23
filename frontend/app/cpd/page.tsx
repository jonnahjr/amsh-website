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
    MagnifyingGlassIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function CPDPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cpdAPI.getAll().then(res => {
            setCourses(res.data.courses || []);
        }).catch(() => {
            setCourses([
                { id: '1', title: 'Advanced Psychopharmacology', category: 'Medical', date: '2024-06-10', cost: '1,500 ETB', duration: '2 Days', type: 'IN_PERSON' },
                { id: '2', title: 'Introduction to Cognitive Behavioral Therapy', category: 'Psychology', date: '2024-05-25', cost: 'Free', duration: '3 Hours', type: 'ONLINE' },
                { id: '3', title: 'Mental Health Nursing Standards', category: 'Nursing', date: '2024-07-05', cost: '500 ETB', duration: '1 Day', type: 'HYBRID' }
            ]);
        }).finally(() => setLoading(false));
    }, []);

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-gray-50 pb-24">
                {/* Hero */}
                <section className="bg-blue-900 py-24 text-white relative overflow-hidden">
                    <div className="container-custom relative z-10">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-6">
                                Professional Excellence
                            </span>
                            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
                                Elevating Mental Health<br />
                                <span className="text-cyan-300">Professionalism</span>
                            </h1>
                            <p className="text-blue-100 text-xl font-medium leading-relaxed max-w-2xl">
                                Pursue excellence with our Continuing Professional Development (CPD) programs,
                                designed specifically for the next generation of mental health champions.
                            </p>
                        </div>
                    </div>
                    {/* Background Decoration */}
                    <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-white text-blue-900/5 select-none pointer-events-none translate-x-1/3 -translate-y-1/2">
                        <AcademicCapIcon className="w-full h-full" />
                    </div>
                </section>

                {/* Stats / Info */}
                <div className="container-custom -mt-12 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <UserGroupIcon className="w-8 h-8" />, title: 'Expert Instructors', label: 'Top Psychiatrists' },
                            { icon: <AcademicCapIcon className="w-8 h-8" />, title: 'Certified Credits', label: 'MOH Approved' },
                            { icon: <VideoCameraIcon className="w-8 h-8" />, title: 'Flexible Learning', label: 'Online & In-person' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 flex items-center gap-6 border border-gray-50">
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center">{item.icon}</div>
                                <div>
                                    <h4 className="font-black text-gray-900">{item.title}</h4>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Catalog */}
                <section className="section">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <div>
                                <h2 className="text-4xl font-black text-gray-900 mb-2">CPD Catalog</h2>
                                <p className="text-gray-500">Upcoming sessions and self-paced programs.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="relative w-full md:w-64">
                                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="text" placeholder="Search courses..." className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-900" />
                                </div>
                                <select className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-600 focus:ring-2 focus:ring-blue-900 md:w-48">
                                    <option>All Categories</option>
                                    <option>Medical</option>
                                    <option>Nursing</option>
                                    <option>Clinical Psychology</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {loading ? (
                                [...Array(3)].map((_, i) => <div key={i} className="h-[400px] bg-white rounded-[40px] animate-pulse" />)
                            ) : courses.map((course) => (
                                <div key={course.id} className="group bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all p-8 flex flex-col">
                                    <div className="mb-6 flex justify-between items-start">
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${course.type === 'ONLINE' ? 'bg-emerald-50 text-emerald-600' :
                                            course.type === 'HYBRID' ? 'bg-purple-50 text-purple-600' :
                                                'bg-blue-50 text-blue-600'
                                            }`}>
                                            {course.type.replace('_', ' ')}
                                        </span>
                                        <span className="text-gray-400 font-bold text-xs">{course.duration}</span>
                                    </div>

                                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-900 transition-colors leading-tight min-h-[64px]">
                                        {course.title}
                                    </h3>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                            <CalendarDaysIcon className="w-5 h-5 text-blue-900" />
                                            <span>{new Date(course.date).toLocaleDateString(undefined, {
                                                month: 'long', day: 'numeric', year: 'numeric'
                                            })}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                            <AcademicCapIcon className="w-5 h-5 text-blue-900" />
                                            <span className="font-bold text-blue-950 uppercase tracking-tighter text-xs">{course.category}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                            <span className="w-5 text-center font-black text-blue-900">💵</span>
                                            <span>Course fee: <span className="font-black text-gray-900">{course.cost}</span></span>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <button className="text-blue-900 font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
                                            Full Details <ArrowRightIcon className="w-4 h-4" />
                                        </button>
                                        <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 transition-colors shadow-lg shadow-gray-900/20">
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Accreditation Support */}
                <section className="container-custom">
                    <div className="bg-blue-950 rounded-[40px] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-3xl font-black mb-4">Accreditation Support</h2>
                            <p className="text-blue-200">Are you an institution or individual seeking AMSH accreditation for your training program? Our CPD committee handles all validation and accreditation requests for national mental health standards.</p>
                        </div>
                        <button className="bg-white text-blue-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-50 transition-all whitespace-nowrap shadow-2xl">
                            Inquire About Accreditation
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
