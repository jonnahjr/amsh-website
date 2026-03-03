'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import {
    AcademicCapIcon,
    VideoCameraIcon,
    UserGroupIcon,
    CalendarDaysIcon,
    MagnifyingGlassIcon,
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

const CPD_COURSES = [
    {
        id: '1',
        title: 'Fundamental Psychiatric Nursing',
        description: 'Comprehensive training on basic psychiatric nursing care, patient assessment, and evidence-based interventions in mental health settings.',
        duration: '5 Days',
        startDate: '2024-05-15',
        endDate: '2024-05-20',
        credits: '15 CME Hours',
        targetProfessionals: 'Nurses, Health Officers',
        mode: 'Onsite',
        fee: '2,500 ETB',
    },
    {
        id: '2',
        title: 'Advanced Psychopharmacology',
        description: 'In-depth study of neurobiology and the latest pharmacological treatments for complex mental health disorders. Focus on recent drug approvals.',
        duration: '3 Days',
        startDate: '2024-06-10',
        endDate: '2024-06-13',
        credits: '10 CME Hours',
        targetProfessionals: 'Psychiatrists, Medical Doctors',
        mode: 'Hybrid',
        fee: '3,500 ETB',
    },
    {
        id: '3',
        title: 'CBT for Anxiety Disorders',
        description: 'Practical clinical skills for implementing Cognitive Behavioral Therapy techniques specifically tailored for anxiety and stress-related conditions.',
        duration: '4 Weeks',
        startDate: '2024-07-01',
        endDate: '2024-07-28',
        credits: '20 CME Hours',
        targetProfessionals: 'Psychologists, Counselors',
        mode: 'Online',
        fee: '3,000 ETB',
    },
    {
        id: '4',
        title: 'mhGAP Training of Trainers',
        description: 'Master the Mental Health Gap Action Program (mhGAP) to scale up care for mental, neurological, and substance use disorders in primary health care.',
        duration: '5 Days',
        startDate: '2024-08-05',
        endDate: '2024-08-10',
        credits: '15 CME Hours',
        targetProfessionals: 'Senior Health Professionals',
        mode: 'Onsite',
        fee: 'Free (MOH Sponsored)',
    },
    {
        id: '5',
        title: 'Child & Adolescent Psychiatry',
        description: 'A specialized course focusing on developmental disorders, adolescent depression, and early intervention strategies for young patients.',
        duration: '3 Days',
        startDate: '2024-09-12',
        endDate: '2024-09-15',
        credits: '12 CME Hours',
        targetProfessionals: 'Psychiatrists, Pediatricians',
        mode: 'Hybrid',
        fee: '4,000 ETB',
    },
    {
        id: '6',
        title: 'Emergency Psychiatry & De-escalation',
        description: 'Essential de-escalation techniques, risk assessment, and legal protocols for managing acute psychiatric emergencies in clinical settings.',
        duration: '2 Days',
        startDate: '2024-10-20',
        endDate: '2024-10-22',
        credits: '8 CME Hours',
        targetProfessionals: 'All Clinical Staff',
        mode: 'Onsite',
        fee: '1,500 ETB',
    },
];

export default function CPDPage() {
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        professionTitle: '',
        licenseNumber: '',
        placeOfWork: '',
        yearsOfExperience: '',
        region: '',
        agreement: false,
    });

    const openApplyModal = (course: any) => {
        setSelectedCourse(course);
        setIsApplyModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const checked = target.checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Application submitted successfully! Our team will review your credentials.');
        setIsApplyModalOpen(false);
    };

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
                                    Amanuel Mental Specialized Hospital (AMSH) has been at the forefront of mental health care in Ethiopia for over 80 years.
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
                                        <MagnifyingGlassIcon className="w-5 h-5" /> Vision
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
                        <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 text-sm font-bold text-gray-500">
                            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                            <span>Filter by Professional Specialty</span>
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
                                    <button
                                        onClick={() => openApplyModal(course)}
                                        className="bg-blue-950 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-xl shadow-blue-900/10"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Modal */}
            {isApplyModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={() => setIsApplyModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl animate-scale-in">
                        <button
                            onClick={() => setIsApplyModalOpen(false)}
                            className="absolute top-8 right-8 p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <XMarkIcon className="w-8 h-8" />
                        </button>

                        <div className="p-12 lg:p-16">
                            <div className="mb-12">
                                <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">Institutional Form</span>
                                <h2 className="text-4xl font-black text-blue-950 mb-2">CPD Application</h2>
                                <p className="text-gray-500 font-medium">Applying for: <span className="text-blue-900 font-black">{selectedCourse?.title}</span></p>

                                <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4 items-center">
                                    <ShieldCheckIcon className="w-6 h-6 text-amber-600 flex-shrink-0" />
                                    <p className="text-xs font-black text-amber-800 uppercase tracking-widest leading-loose">
                                        This program is available only for licensed health professionals.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                            <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="As per your license" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-black">+251</span>
                                            <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="911 000 000" className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@health.gov.et" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Profession Title</label>
                                        <select required name="professionTitle" value={formData.professionTitle} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm">
                                            <option value="">Select Profession</option>
                                            <option>Psychiatrist</option>
                                            <option>Mental Health Nurse</option>
                                            <option>Clinical Psychologist</option>
                                            <option>Health Officer</option>
                                            <option>Other Licensed Professional</option>
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">License Number</label>
                                        <div className="relative">
                                            <IdentificationIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                            <input required type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} placeholder="MOH/RN/..." className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Place of Work</label>
                                        <div className="relative">
                                            <BuildingOfficeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                            <input required type="text" name="placeOfWork" value={formData.placeOfWork} onChange={handleInputChange} placeholder="Hospital / Clinical Name" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Years of Experience</label>
                                        <input required type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} placeholder="Number of years" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Region</label>
                                        <input required type="text" name="region" value={formData.region} onChange={handleInputChange} placeholder="Current City / Region" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <label className="p-8 bg-blue-50/50 border border-dashed border-blue-200 rounded-[32px] text-center group hover:bg-blue-50 transition-colors cursor-pointer">
                                        <DocumentArrowUpIcon className="w-12 h-12 text-blue-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                        <h4 className="text-sm font-black text-blue-950 mb-1">Upload License (PDF)</h4>
                                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Valid certification only</p>
                                        <input required type="file" className="hidden" />
                                    </label>
                                    <label className="p-8 bg-blue-50/50 border border-dashed border-blue-200 rounded-[32px] text-center group hover:bg-blue-50 transition-colors cursor-pointer">
                                        <IdentificationIcon className="w-12 h-12 text-blue-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                        <h4 className="text-sm font-black text-blue-950 mb-1">Upload ID</h4>
                                        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Kebele / Passport / Hospital ID</p>
                                        <input required type="file" className="hidden" />
                                    </label>
                                </div>

                                <div className="pt-6">
                                    <label className="flex items-start gap-4 cursor-pointer group">
                                        <div className="relative flex items-center mt-1">
                                            <input required type="checkbox" name="agreement" checked={formData.agreement} onChange={handleInputChange} className="w-6 h-6 border-2 border-gray-200 rounded-lg checked:bg-blue-900 transition-all appearance-none cursor-pointer" />
                                            {formData.agreement && <CheckBadgeIcon className="absolute inset-0 w-6 h-6 text-white p-1 pointer-events-none" />}
                                        </div>
                                        <span className="text-sm font-bold text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                                            I hereby declare that I am a licensed health professional and that the information provided is accurate.
                                            I agree to abide by the hospital's CPD standards and academic integrity policies.
                                        </span>
                                    </label>
                                </div>

                                <button type="submit" className="w-full py-6 bg-blue-950 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/20 hover:-translate-y-1">
                                    Submit Application for Review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
            <ChatbotButton />
        </div>
    );
}
