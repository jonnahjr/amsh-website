'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { departmentsAPI } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import {
    UsersIcon,
    AcademicCapIcon,
    CircleStackIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';

export default function DepartmentDetailPage() {
    const { slug } = useParams();
    const [dept, setDept] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        departmentsAPI.getBySlug(slug as string).then(res => {
            setDept(res.data.department);
        }).catch(() => {
            // Mock data for demo
            setDept({
                name: 'Adult Psychiatry Department',
                description: 'The core psychiatric service unit for adult patients at AMSH.',
                content: 'The Adult Psychiatry Department at Amanuel Mental Specialized Hospital is dedicated to the assessment, diagnosis, and treatment of mental health disorders in adults. Our team of expert psychiatrists, psychiatric nurses, and clinical psychologists work together to provide evidence-based care including pharmacological and psychosocial interventions.',
                head: { name: 'Dr. Zelalem G.', title: 'Head of Department', image: null },
                services: [
                    { name: 'Acute Care', slug: 'emergency-service' },
                    { name: 'General Outpatient', slug: 'outpatient' },
                    { name: 'Geriatric Psychiatry', slug: 'geriatric' }
                ],
                doctors: [
                    { name: 'Dr. Abebe B.', specialization: 'Senior Psychiatrist' },
                    { name: 'Dr. Hanna W.', specialization: 'Clinical Psychologist' }
                ]
            });
        }).finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading department...</div>;

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">
                {/* Breadcrumb Header */}
                <div className="bg-blue-900 py-8 text-white px-4">
                    <div className="container-custom flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60">
                        <Link href="/">Home</Link> <ChevronRightIcon className="w-3 h-3" />
                        <Link href="/departments">Departments</Link> <ChevronRightIcon className="w-3 h-3" />
                        <span className="text-white opacity-100">{dept.name}</span>
                    </div>
                </div>

                {/* Hero */}
                <div className="relative overflow-hidden bg-white border-b border-gray-100">
                    <div className="container-custom py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-900 border border-blue-100 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                                Medical Department
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                                {dept.name}
                            </h1>
                            <p className="text-gray-500 text-lg leading-relaxed mb-8">
                                {dept.description}
                            </p>
                            <div className="flex gap-4">
                                <Link href="/appointment" className="btn-primary">📅 Book Appointment</Link>
                                <Link href="/contact" className="btn-secondary">Contact Dept</Link>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="w-full aspect-square md:aspect-[4/3] bg-gradient-to-br from-blue-900 to-blue-700 rounded-[60px] flex items-center justify-center text-white text-9xl shadow-2xl overflow-hidden">
                                {dept.name.toLowerCase().includes('child') ? '👶' : '🧠'}
                                {/* Decorative pattern */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                                    backgroundSize: '32px 32px',
                                }} />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-50 max-w-[280px] hidden md:block">
                                <p className="text-gray-400 font-black text-[10px] uppercase tracking-widest mb-3">Department Head</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center text-lg font-black">{dept.head?.name.charAt(4)}</div>
                                    <div>
                                        <p className="font-black text-gray-900 leading-tight">{dept.head?.name}</p>
                                        <p className="text-xs text-blue-900 font-bold">{dept.head?.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <section className="section">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                            {/* Left: About & Services */}
                            <div className="lg:col-span-2 space-y-16">
                                <div className="prose-amsh max-w-none">
                                    <h2 className="text-3xl font-black text-gray-900 mb-6">About the Department</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">{dept.content}</p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-4 flex items-center gap-3">
                                        <CircleStackIcon className="w-8 h-8 text-blue-900" />
                                        Departmental Services
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {dept.services?.map((s: any) => (
                                            <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-blue-900 hover:border-blue-900 transition-all">
                                                <span className="font-black text-gray-700 group-hover:text-white uppercase tracking-widest text-sm">{s.name}</span>
                                                <ChevronRightIcon className="w-5 h-5 text-blue-900 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Doctors List */}
                            <div className="space-y-10">
                                <div className="card p-8 border-0 bg-gray-50">
                                    <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                        <UsersIcon className="w-6 h-6 text-blue-900" />
                                        Our Doctors
                                    </h3>
                                    <div className="space-y-6">
                                        {dept.doctors?.map((doc: any, i: number) => (
                                            <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
                                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-black">
                                                    {doc.name.charAt(4)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">{doc.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{doc.specialization}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full mt-8 py-3 bg-blue-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-800 transition-colors">
                                        View All Staff
                                    </button>
                                </div>

                                <div className="card p-8 bg-gradient-to-br from-blue-900 to-blue-800 text-white border-0">
                                    <AcademicCapIcon className="w-12 h-12 mb-4 opacity-50" />
                                    <h4 className="text-xl font-black mb-2">Training & CPD</h4>
                                    <p className="text-blue-200 text-sm mb-6">Learn about professional development opportunities within this department.</p>
                                    <Link href="/cpd" className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group">
                                        Explore CPD Programs <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
