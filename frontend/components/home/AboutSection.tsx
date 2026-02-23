'use client';

import Link from 'next/link';
import {
    AcademicCapIcon,
    BeakerIcon,
    HeartIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    GlobeAltIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

export default function AboutSection() {
    return (
        <section className="relative py-24 md:py-32 bg-[#F8FAFB] overflow-hidden w-full">
            {/* Corner Decorative Elements - "fit the side top left and right" */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-900/5 rounded-br-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/5 rounded-bl-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/5 rounded-tr-full -translate-x-1/2 translate-y-1/2 blur-2xl pointer-events-none" />

            <div className="px-6 md:px-12 lg:px-24 relative z-10 w-full">
                {/* Header - Wide and Prominent */}
                <div className="flex flex-col items-center justify-center text-center mb-24 max-w-6xl mx-auto">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-blue-950 text-white text-[10px] font-black uppercase tracking-[0.5em] rounded-full mb-8 shadow-2xl shadow-blue-900/30">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        Ethopia's Foremost Mental Health Center
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black text-blue-950 tracking-tighter leading-[0.85] mb-12 text-center">
                        Welcome to <span className="text-blue-900">Amanuel Mental</span> <br />
                        <span className="text-gray-300 italic tracking-[-0.05em]">Specialized Hospital</span>
                    </h2>
                </div>

                {/* Content Hub - Wide "Side to Side" Layout */}
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center items-start">

                        {/* Section 1: Legacy & Transformation */}
                        <div className="space-y-10 group">
                            <div className="flex flex-col items-center space-y-6 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full">
                                <div className="w-20 h-20 bg-blue-900/10 rounded-3xl flex items-center justify-center text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-all duration-500">
                                    <ShieldCheckIcon className="w-10 h-10" />
                                </div>
                                <div className="space-y-6">
                                    <p className="font-bold text-gray-800 leading-relaxed text-center">
                                        Amanuel Mental Specialized Hospital stands as Ethiopia’s foremost and oldest specialized institution dedicated exclusively to mental health care. With a proud legacy spanning decades, the hospital has become the cornerstone of psychiatric services in the nation, providing comprehensive, compassionate, and evidence-based care.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed text-sm text-center">
                                        Since its establishment, the hospital has played a central role in transforming mental health care in Ethiopia. It has grown from a modest facility into a national center of excellence, delivering specialized psychiatric treatment and advancing clinical research.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Clinical Excellence & Compassion */}
                        <div className="space-y-10 group">
                            <div className="flex flex-col items-center space-y-6 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full">
                                <div className="w-20 h-20 bg-pink-50 rounded-3xl flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500">
                                    <HeartIcon className="w-10 h-10" />
                                </div>
                                <div className="space-y-6">
                                    <p className="font-bold text-gray-800 leading-relaxed text-center">
                                        Our hospital is dedicated to addressing the full spectrum of mental health conditions, including common and severe psychiatric disorders, substance use disorders, and psychological conditions affecting children, adolescents, adults, and the elderly.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed text-sm text-center">
                                        Patient care is guided by compassion, professionalism, and respect for human dignity. We understand that mental health challenges affect families and communities. Therefore, our approach focuses on holistic care that supports emotional and functional recovery.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Training & Innovation */}
                        <div className="space-y-10 group">
                            <div className="flex flex-col items-center space-y-6 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full">
                                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                    <AcademicCapIcon className="w-10 h-10" />
                                </div>
                                <div className="space-y-6">
                                    <p className="font-bold text-gray-800 leading-relaxed text-center">
                                        Beyond clinical services, the hospital serves as a national training and academic center. It provides practical education and clinical training for psychiatrists, medical doctors, mental health nurses, psychologists, and other health professionals.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed text-sm text-center">
                                        The hospital is also actively engaged in research and innovation, working to improve treatment methods and support evidence-based policies. By integrating modern medical technologies, we are expanding access to mental health care for everyone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Wide Integration Bar - Final Commitment */}
                    <div className="mt-20 bg-blue-900 rounded-[4rem] p-12 md:p-20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 opacity-5 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700 group-hover:opacity-10" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center">
                            <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10">
                                <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed italic text-center">
                                    "Our commitment extends beyond the hospital walls. We work closely with government institutions, partners, and communities to promote mental health awareness and reduce stigma nationwide."
                                </p>
                            </div>
                            <div className="space-y-8 flex flex-col items-center">
                                <h3 className="text-white text-3xl md:text-5xl font-black tracking-tight leading-tight text-center">
                                    Restoring Hope, <br />
                                    <span className="text-cyan-400 italic">Improving Lives.</span>
                                </h3>
                                <div className="flex flex-wrap gap-6 justify-center">
                                    <Link href="/about" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all shadow-2xl">
                                        Read Our Story
                                    </Link>
                                    <Link href="/appointment" className="px-10 py-5 bg-white/10 border border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all backdrop-blur-md">
                                        Get Involved
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
