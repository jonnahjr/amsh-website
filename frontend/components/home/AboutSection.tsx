'use client';

import Link from 'next/link';
import {
    AcademicCapIcon,
    BeakerIcon,
    HeartIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    GlobeAltIcon,
    SparklesIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function AboutSection() {
    return (
        <section className="relative py-24 bg-white overflow-hidden border-t border-gray-100">
            <div className="container-custom relative z-10">
                
                {/* Header Block: Refined Institutional Style */}
                <div className="flex flex-col items-center justify-center text-center mb-20 max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-900 text-[10px] font-bold uppercase tracking-[0.2em] rounded-md mb-6 border border-blue-100">
                        Official Institutional Welcome
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                        Welcome to Amanuel Mental <br />
                        <span className="text-blue-900">Specialized Hospital</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-blue-900 mt-10 rounded-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Visual Narrative Side: Professional & Grounded */}
                    <div className="relative">
                        <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-50 bg-gray-50 hover:border-blue-50 transition-colors duration-500">
                            <img
                                src="/uploads/_49A7644.JPG"
                                alt="Amanuel Mental Specialized Hospital Exterior"
                                className="w-full h-[550px] object-cover hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Stats Overlay: Clean Government Grid */}
                        <div className="absolute -bottom-10 right-0 md:right-10 bg-white p-8 rounded-[30px] shadow-2xl border border-gray-100 flex flex-col items-center min-w-[220px]">
                            <div className="flex flex-col items-center mb-6">
                                <span className="text-5xl font-black text-blue-950 tracking-tighter mb-1">80+</span>
                                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest text-center leading-tight">Years of <br />Institutional Legacy</span>
                            </div>
                            <div className="h-px w-full bg-gray-100 mb-6" />
                            <div className="flex items-center gap-4 text-left w-full">
                                <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                                    <ShieldCheckIcon className="w-6 h-6 text-blue-900" />
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black text-blue-950 uppercase tracking-widest">National Center</h4>
                                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Clinical Excellence</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Narrative Side: Authoritative & Clear */}
                    <div className="flex flex-col h-full pt-4">
                        <div className="space-y-8 flex-1">
                            <p className="text-2xl font-bold text-slate-800 leading-snug tracking-tight border-l-8 border-blue-900 pl-10 mb-12">
                                Emmanuel Mental Specialized Hospital stands as Ethiopia’s foremost and oldest specialized institution dedicated exclusively to mental health care.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                                        Since its establishment, the hospital has played a central role in transforming mental health care in Ethiopia. It has grown from a modest facility into a national center of excellence, delivering specialized psychiatric treatment and advancing clinical research.
                                    </p>
                                    <p className="text-[15px] text-slate-600 leading-relaxed font-medium pb-8 border-b border-gray-100">
                                        Our hospital is dedicated to addressing the full spectrum of mental health conditions, including common and severe psychiatric disorders, substance use disorders, and psychological conditions.
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                                        Patient care is guided by compassion, professionalism, and respect for human dignity. Our approach focuses on holistic care that supports emotional and functional recovery for families and communities.
                                    </p>
                                    <p className="text-[15px] text-slate-600 leading-relaxed font-medium pb-8 border-b border-gray-100">
                                        Beyond clinical services, the hospital serves as a national training and academic center, providing practical education for psychiatrists and psychiatric nurses.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
