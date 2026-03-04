'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import {
    BuildingLibraryIcon,
    AcademicCapIcon,
    DocumentTextIcon,
    CloudArrowUpIcon,
    UserGroupIcon,
    CalendarDaysIcon,
    PhoneIcon,
    EnvelopeIcon,
    CheckBadgeIcon,
    BeakerIcon,
    InformationCircleIcon,
    BanknotesIcon,
    XMarkIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function ClinicalAttachmentPage() {
    const [category, setCategory] = useState<'GOVERNMENT' | 'PRIVATE' | 'SELF_SPONSORED' | null>(null);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<Record<string, 'idle' | 'uploading' | 'success'>>({
        officialLetter: 'idle',
        studentList: 'idle',
        paymentDoc: 'idle'
    });
    const [formData, setFormData] = useState({
        institutionName: '',
        departmentName: '',
        profession: '',
        studentCount: '',
        durationValue: '',
        startDate: '',
        endDate: '',
        contactPerson: '',
        phoneNumber: '',
        email: '',
        agreement: false,
    });

    const openApplyModal = (cat: 'GOVERNMENT' | 'PRIVATE' | 'SELF_SPONSORED') => {
        setCategory(cat);
        setIsApplyModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 2000);
    };

    const resetPortal = () => {
        setIsSubmitted(false);
        setIsApplyModalOpen(false);
        setCurrentStep(1);
        setFormData({
            institutionName: '',
            departmentName: '',
            profession: '',
            studentCount: '',
            durationValue: '',
            startDate: '',
            endDate: '',
            contactPerson: '',
            phoneNumber: '',
            email: '',
            agreement: false,
        });
        setUploadStatus({
            officialLetter: 'idle',
            studentList: 'idle',
            paymentDoc: 'idle'
        });
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
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
                <div className="container-custom relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-6 animate-fade-in">
                            Academic Integration
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter animate-fade-in-up">
                            Clinical Attachment & <br />
                            <span className="text-gray-400 italic">Internship Programs</span>
                        </h1>
                        <p className="text-xl text-blue-100/70 max-w-2xl mx-auto font-medium leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Preparing the next generation of mental health professionals through supervised
                            clinical exposure in Ethiopia's premier psychiatric teaching hospital.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="space-y-12">
                        {/* Government Institutions */}
                        <div className="bg-white rounded-[48px] p-12 lg:p-16 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 group flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="w-32 h-32 bg-blue-50 rounded-[32px] flex items-center justify-center text-blue-900 group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 shadow-inner">
                                <BuildingLibraryIcon className="w-16 h-16" />
                            </div>
                            <div className="flex-1 text-center lg:text-left relative z-10">
                                <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center justify-center lg:justify-start gap-2">
                                    <CheckBadgeIcon className="w-5 h-5" /> Free Program
                                </span>
                                <h2 className="text-4xl font-black text-blue-950 mb-4 tracking-tighter">Government Institutions</h2>
                                <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-2xl">
                                    Official partnership for public universities and government-run health colleges.
                                    Standardized rotation programs with full academic integration.
                                </p>
                            </div>
                            <div className="w-full lg:w-72 space-y-4 relative z-10">
                                <button
                                    onClick={() => openApplyModal('GOVERNMENT')}
                                    className="w-full py-6 bg-blue-950 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/20 hover:-translate-y-1"
                                >
                                    Apply as Government
                                </button>
                            </div>
                        </div>

                        {/* Private Colleges & Universities */}
                        <div className="bg-white rounded-[48px] p-12 lg:p-16 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 group flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="w-32 h-32 bg-cyan-50 rounded-[32px] flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 shadow-inner">
                                <AcademicCapIcon className="w-16 h-16" />
                            </div>
                            <div className="flex-1 text-center lg:text-left relative z-10">
                                <span className="text-amber-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center justify-center lg:justify-start gap-2">
                                    <BanknotesIcon className="w-5 h-5" /> Paid Program
                                </span>
                                <h2 className="text-4xl font-black text-blue-950 mb-4 tracking-tighter">Colleges & Universities</h2>
                                <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-2xl">
                                    Specialized training access for private higher education institutions.
                                    Enhanced support and dedicated coordination for your students.
                                </p>
                            </div>
                            <div className="w-full lg:w-72 space-y-4 relative z-10">
                                <button
                                    onClick={() => openApplyModal('PRIVATE')}
                                    className="w-full py-6 border-2 border-blue-950 text-blue-950 rounded-[24px] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-950 hover:text-white transition-all hover:-translate-y-1"
                                >
                                    Apply as Private
                                </button>
                            </div>
                        </div>

                        {/* Individual / Self-Sponsored Applicants */}
                        <div className="bg-white rounded-[48px] p-12 lg:p-16 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 group flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="w-32 h-32 bg-emerald-50 rounded-[32px] flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform flex-shrink-0 relative z-10 shadow-inner">
                                <UserGroupIcon className="w-16 h-16" />
                            </div>
                            <div className="flex-1 text-center lg:text-left relative z-10">
                                <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center justify-center lg:justify-start gap-2">
                                    <CheckBadgeIcon className="w-5 h-5" /> Independent Program
                                </span>
                                <h2 className="text-4xl font-black text-blue-950 mb-4 tracking-tighter">Individual / Self-Sponsored</h2>
                                <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-2xl">
                                    Direct application for professionals or students seeking unaffiliated clinical exposure.
                                    Perfect for international rotations and specialist internships.
                                </p>
                            </div>
                            <div className="w-full lg:w-72 space-y-4 relative z-10">
                                <button
                                    onClick={() => openApplyModal('SELF_SPONSORED')}
                                    className="w-full py-6 bg-emerald-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-900/20 hover:-translate-y-1"
                                >
                                    Apply for Self-Sponsor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Modal */}
            {isApplyModalOpen && (
                <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative min-h-screen">
                        <button
                            onClick={resetPortal}
                            className="absolute top-8 right-8 p-2 text-gray-400 hover:text-red-500 transition-colors z-[110]"
                        >
                            <XMarkIcon className="w-8 h-8" />
                        </button>

                        <div className="max-w-5xl mx-auto p-12 lg:p-16">
                            <div className="mb-12">
                                <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">Attachment Portal</span>
                                <h2 className="text-4xl font-black text-blue-950 mb-2">
                                    {category === 'SELF_SPONSORED' ? 'Individual Application' : 'Institutional Application'}
                                </h2>
                                <p className="text-gray-500 font-medium text-sm">Category: <span className="text-blue-900 font-black">
                                    {category === 'GOVERNMENT' && 'Government Institution'}
                                    {category === 'PRIVATE' && 'Private College/University'}
                                    {category === 'SELF_SPONSORED' && 'Self-Sponsored Applicant'}
                                </span></p>
                            </div>

                            {/* Step Progress Bar */}
                            <div className="mt-12 mb-16 relative">
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2" />
                                <div
                                    className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-500"
                                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                                />
                                <div className="relative flex justify-between">
                                    {[1, 2, 3, 4].map((step) => (
                                        <div key={step} className="flex flex-col items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm z-10 transition-all duration-500 ${currentStep >= step ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' : 'bg-white border-2 border-gray-100 text-gray-300'
                                                }`}>
                                                {currentStep > step ? <CheckBadgeIcon className="w-5 h-5" /> : step}
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest mt-4 transition-colors duration-500 ${currentStep >= step ? 'text-blue-900' : 'text-gray-300'
                                                }`}>
                                                {step === 1 ? 'Details' : step === 2 ? 'Documents' : step === 3 ? 'Review' : 'Success'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {category === 'PRIVATE' && (
                                <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4 items-center">
                                    <InformationCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                                    <p className="text-xs font-black text-blue-800 uppercase tracking-widest leading-loose">
                                        Private colleges are required to pay the standard attachment fee. Please upload payment confirmation below.
                                    </p>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {currentStep === 1 && (
                                <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center ml-1">
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">
                                                {category === 'SELF_SPONSORED' ? 'Full Legal Name' : 'University / College Name'}
                                            </label>
                                            <div className="group relative">
                                                <InformationCircleIcon className="w-4 h-4 text-gray-300 cursor-help" />
                                                <div className="absolute bottom-full mb-2 right-0 w-64 p-3 bg-blue-900 text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 font-medium">
                                                    Ensure name matches official legal documentation for certification.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <BuildingLibraryIcon className={`absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors ${formData.institutionName ? 'text-emerald-500' : 'text-gray-300 group-focus-within:text-blue-600'}`} />
                                            <input required name="institutionName" value={formData.institutionName} onChange={handleInputChange} type="text" placeholder={category === 'SELF_SPONSORED' ? "As on National ID / Passport" : "Full Institutional Legal Name"} className={`w-full pl-16 pr-12 py-6 bg-gray-50 border-0 rounded-[28px] focus:ring-2 transition-all font-bold text-base shadow-inner ${formData.institutionName ? 'focus:ring-emerald-500' : 'focus:ring-blue-600'}`} />
                                            {formData.institutionName && <CheckBadgeIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500 animate-in fade-in zoom-in duration-300" />}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center ml-1">
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Clinical Department</label>
                                            </div>
                                            <div className="relative group">
                                                <BeakerIcon className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${formData.departmentName ? 'text-emerald-500' : 'text-gray-300 group-focus-within:text-blue-600'}`} />
                                                <select required name="departmentName" value={formData.departmentName} onChange={handleInputChange} className={`w-full pl-16 pr-12 py-5 bg-gray-50 border-0 rounded-[24px] focus:ring-2 transition-all font-bold text-sm appearance-none cursor-pointer shadow-inner ${formData.departmentName ? 'focus:ring-emerald-500' : 'focus:ring-blue-600'}`}>
                                                    <option value="" disabled>Select Department</option>
                                                    {["Addiction Treatment Unit", "Adult Psychiatry", "Child & Adolescent Psychiatry", "Clinical Mental Health", "Clinical Psychology", "Community Mental Health", "Emergency Nursing", "Emergency Psychiatry", "General Medical Service", "General Nursing Service", "Internal Medicine", "Laboratory Services", "Neurology / EEG", "Obstetrics & Gynecology", "Pediatrics & Child Health", "Pharmacy Services", "Psychiatric Nursing", "Rehabilitation Services", "Research Services", "Surgical Nursing", "Surgical Service", "Training & Education"].map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                                </select>
                                                {formData.departmentName && <CheckBadgeIcon className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center ml-1">
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Profession Type</label>
                                            </div>
                                            <div className="relative group">
                                                <AcademicCapIcon className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${formData.profession ? 'text-emerald-500' : 'text-gray-300 group-focus-within:text-blue-600'}`} />
                                                <select required name="profession" value={formData.profession} onChange={handleInputChange} className={`w-full pl-16 pr-12 py-5 bg-gray-50 border-0 rounded-[24px] focus:ring-2 transition-all font-bold text-sm appearance-none cursor-pointer shadow-inner ${formData.profession ? 'focus:ring-emerald-500' : 'focus:ring-blue-600'}`}>
                                                    <option value="" disabled>Select Profession</option>
                                                    {["General Practitioner", "Health Officer Student", "Medical Intern", "Medical Student (Clinical)", "Medical Student (Pre-Clinical)", "Nursing Student (BSc)", "Nursing Student (Diploma)", "Occupational Therapy Student", "Pharmacy Student", "Psychiatry Resident", "Psychology Intern", "Resident Doctor", "Social Work Intern", "Specialized Clinician", "Other Healthcare Professional"].map(prof => <option key={prof} value={prof}>{prof}</option>)}
                                                </select>
                                                {formData.profession && <CheckBadgeIcon className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-4">
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Students</label>
                                            <div className="relative group">
                                                <UserGroupIcon className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${formData.studentCount ? 'text-emerald-500' : 'text-gray-300 group-focus-within:text-blue-600'}`} />
                                                <input required name="studentCount" value={formData.studentCount} onChange={handleInputChange} type="number" placeholder="Count" className={`w-full pl-16 pr-6 py-5 bg-gray-50 border-0 rounded-[24px] focus:ring-2 transition-all font-bold text-sm shadow-inner ${formData.studentCount ? 'focus:ring-emerald-500' : 'focus:ring-blue-600'}`} />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Duration</label>
                                            <div className="relative group">
                                                <CalendarDaysIcon className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${formData.durationValue ? 'text-emerald-500' : 'text-gray-300 group-focus-within:text-blue-600'}`} />
                                                <input required name="durationValue" value={formData.durationValue} onChange={handleInputChange} type="text" placeholder="Months" className={`w-full pl-16 pr-6 py-5 bg-gray-50 border-0 rounded-[24px] focus:ring-2 transition-all font-bold text-sm shadow-inner ${formData.durationValue ? 'focus:ring-emerald-500' : 'focus:ring-blue-600'}`} />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
                                            <div className="relative group">
                                                <CalendarDaysIcon className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${formData.startDate ? 'text-emerald-500' : 'text-gray-300 group-focus-within:text-blue-600'}`} />
                                                <input required name="startDate" value={formData.startDate} onChange={handleInputChange} type="date" className={`w-full pl-16 pr-6 py-5 bg-gray-50 border-0 rounded-[24px] focus:ring-2 transition-all font-bold text-sm shadow-inner ${formData.startDate ? 'focus:ring-emerald-500' : 'focus:ring-blue-600'}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                    <div className="space-y-2 text-center mb-12">
                                        <h3 className="text-3xl font-black text-blue-950 tracking-tighter">Documentation Verification</h3>
                                        <p className="text-gray-500 font-medium italic">Please provide clear scanned copies in PDF or Image format.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <label className={`relative p-10 rounded-[48px] border-2 border-dashed transition-all cursor-pointer group flex items-center gap-8 ${uploadStatus.officialLetter === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-blue-200 hover:shadow-2xl shadow-sm'
                                            }`}>
                                            <div className={`w-20 h-20 rounded-[32px] flex-shrink-0 flex items-center justify-center transition-all ${uploadStatus.officialLetter === 'success' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-white text-gray-300 group-hover:text-blue-600 shadow-inner'
                                                }`}>
                                                {uploadStatus.officialLetter === 'success' ? <CheckBadgeIcon className="w-10 h-10" /> : (uploadStatus.officialLetter === 'uploading' ? <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" /> : <CloudArrowUpIcon className="w-10 h-10" />)}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h4 className="text-lg font-black text-blue-950 uppercase tracking-widest mb-1">Official Letter</h4>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Formal request from your institution</p>
                                            </div>
                                            <input type="file" className="hidden" onChange={() => handleFileUpload('officialLetter')} />
                                            {uploadStatus.officialLetter === 'success' && <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-right-2">Verified</div>}
                                        </label>

                                        <label className={`relative p-10 rounded-[48px] border-2 border-dashed transition-all cursor-pointer group flex items-center gap-8 ${uploadStatus.studentList === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-blue-200 hover:shadow-2xl shadow-sm'
                                            }`}>
                                            <div className={`w-20 h-20 rounded-[32px] flex-shrink-0 flex items-center justify-center transition-all ${uploadStatus.studentList === 'success' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-white text-gray-300 group-hover:text-blue-600 shadow-inner'
                                                }`}>
                                                {uploadStatus.studentList === 'success' ? <CheckBadgeIcon className="w-10 h-10" /> : (uploadStatus.studentList === 'uploading' ? <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" /> : <CloudArrowUpIcon className="w-10 h-10" />)}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h4 className="text-lg font-black text-blue-950 uppercase tracking-widest mb-1">{category === 'SELF_SPONSORED' ? 'Identity Doc' : 'Student List'}</h4>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">{category === 'SELF_SPONSORED' ? 'Passport / National ID' : 'Official list in Excel/PDF'}</p>
                                            </div>
                                            <input type="file" className="hidden" onChange={() => handleFileUpload('studentList')} />
                                            {uploadStatus.studentList === 'success' && <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-right-2">Verified</div>}
                                        </label>

                                        {(category === 'PRIVATE' || category === 'SELF_SPONSORED') && (
                                            <label className={`relative p-10 rounded-[48px] border-2 border-dashed transition-all cursor-pointer group flex items-center gap-8 ${uploadStatus.paymentDoc === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-blue-200 hover:shadow-2xl shadow-sm'
                                                }`}>
                                                <div className={`w-20 h-20 rounded-[32px] flex-shrink-0 flex items-center justify-center transition-all ${uploadStatus.paymentDoc === 'success' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-white text-gray-300 group-hover:text-blue-600 shadow-inner'
                                                    }`}>
                                                    {uploadStatus.paymentDoc === 'success' ? <CheckBadgeIcon className="w-10 h-10" /> : (uploadStatus.paymentDoc === 'uploading' ? <div className="w-10 h-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" /> : <CloudArrowUpIcon className="w-10 h-10" />)}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <h4 className="text-lg font-black text-blue-950 uppercase tracking-widest mb-1">Payment Confirmation</h4>
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Official bank deposit slip</p>
                                                </div>
                                                <input type="file" className="hidden" onChange={() => handleFileUpload('paymentDoc')} />
                                                {uploadStatus.paymentDoc === 'success' && <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-right-2">Paid</div>}
                                            </label>
                                        )}
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                    <div className="bg-blue-50 rounded-[48px] p-12 border border-blue-100 shadow-inner relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -mr-16 -mt-16" />
                                        <h3 className="text-2xl font-black text-blue-950 mb-8 flex items-center gap-4 relative z-10">
                                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                                <InformationCircleIcon className="w-7 h-7" />
                                            </div>
                                            Application Intelligence Review
                                        </h3>
                                        <div className="space-y-8 relative z-10">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Institution / Name</p>
                                                    <p className="text-lg font-bold text-blue-950">{formData.institutionName || 'Not specified'}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Selected Department</p>
                                                    <p className="text-lg font-bold text-blue-950">{formData.departmentName || 'Not selected'}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Academic Profession</p>
                                                    <p className="text-lg font-bold text-blue-950">{formData.profession || 'Not selected'}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Volume & Duration</p>
                                                    <p className="text-lg font-bold text-blue-950">{formData.studentCount || '1'} Students • {formData.durationValue || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center ml-1">
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Liaison Officer / Contact Authority</label>
                                                <div className="group relative">
                                                    <InformationCircleIcon className="w-4 h-4 text-gray-300 cursor-help" />
                                                    <div className="absolute bottom-full mb-2 right-0 w-64 p-3 bg-blue-900 text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 font-medium">
                                                        Person responsible for institutional liaison and rotation coordination.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative group">
                                                <UserGroupIcon className={`absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors ${formData.contactPerson ? 'text-emerald-500' : 'text-gray-300 group-focus-within:text-blue-600'}`} />
                                                <input required name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} type="text" placeholder="Full Legal Name" className={`w-full pl-16 pr-12 py-6 bg-gray-50 border-0 rounded-[28px] focus:ring-2 transition-all font-bold text-base shadow-inner ${formData.contactPerson ? 'focus:ring-emerald-500' : 'focus:ring-blue-600'}`} />
                                                {formData.contactPerson && <CheckBadgeIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500" />}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center ml-1">
                                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Secure Mobile</label>
                                                </div>
                                                <div className="relative group">
                                                    <PhoneIcon className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${formData.phoneNumber ? 'text-emerald-500' : 'text-gray-300 group-focus-within:text-blue-600'}`} />
                                                    <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} type="tel" placeholder="+251 ..." className={`w-full pl-16 pr-12 py-5 bg-gray-50 border-0 rounded-[24px] focus:ring-2 transition-all font-bold text-sm shadow-inner ${formData.phoneNumber ? 'focus:ring-emerald-500' : 'focus:ring-blue-600'}`} />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center ml-1">
                                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Official Email</label>
                                                </div>
                                                <div className="relative group">
                                                    <EnvelopeIcon className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${formData.email ? 'text-emerald-500' : 'text-gray-300 group-focus-within:text-blue-600'}`} />
                                                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="official@edu.et" className={`w-full pl-16 pr-12 py-5 bg-gray-50 border-0 rounded-[24px] focus:ring-2 transition-all font-bold text-sm shadow-inner ${formData.email ? 'focus:ring-emerald-500' : 'focus:ring-blue-600'}`} />
                                                </div>
                                            </div>
                                        </div>

                                        <label className="flex items-center gap-6 p-8 bg-blue-50/50 rounded-[32px] border border-blue-100 cursor-pointer hover:bg-white hover:shadow-xl transition-all group">
                                            <div className="relative">
                                                <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleInputChange} className="w-8 h-8 rounded-xl text-blue-600 focus:ring-blue-500 border-gray-200 cursor-pointer" />
                                            </div>
                                            <span className="text-xs font-black text-blue-900 leading-relaxed uppercase tracking-[0.1em] group-hover:text-blue-600 transition-colors">
                                                I certify that all provided intelligence and documentation are authentic and I strictly adhere to the AMSH Clinical Rotation Policy.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {isSubmitted && (
                                <div className="fixed inset-0 z-[120] bg-white flex items-center justify-center p-8 animate-in fade-in duration-700">
                                    <div className="max-w-2xl w-full text-center space-y-8">
                                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                                            <CheckBadgeIcon className="w-12 h-12" />
                                        </div>
                                        <h2 className="text-5xl font-black text-blue-950 tracking-tighter">Application Received</h2>
                                        <p className="text-xl text-gray-500 font-medium leading-relaxed">
                                            Your clinical attachment request for <span className="text-blue-600 font-black">{formData.institutionName}</span> has been successfully logged.
                                        </p>
                                        <div className="bg-gray-50 rounded-[32px] p-8 border border-gray-100 text-left space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Reference ID</span>
                                                <span className="font-mono font-black text-blue-950">AMSH-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Status</span>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase">Under Review</span>
                                            </div>
                                            <div className="pt-4 border-t border-gray-200">
                                                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                                                    An official confirmation has been sent to <span className="font-bold text-gray-600">{formData.email}</span>. Please keep your reference ID for any future inquiries.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 pt-4">
                                            <button
                                                onClick={resetPortal}
                                                className="flex-1 py-5 bg-blue-950 text-white rounded-[28px] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/20"
                                            >
                                                Return to Home
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!isSubmitted && (
                                <div className="flex gap-4 pt-8">
                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(prev => prev - 1)}
                                            className="px-8 py-5 border-2 border-gray-100 text-gray-400 rounded-[28px] font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-50 transition-all"
                                        >
                                            Previous
                                        </button>
                                    )}
                                    {currentStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(prev => prev + 1)}
                                            className="flex-1 py-5 bg-blue-950 text-white rounded-[28px] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/20"
                                        >
                                            Next Step
                                        </button>
                                    ) : (
                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="flex-1 py-5 bg-blue-600 text-white rounded-[28px] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20"
                                        >
                                            {isSubmitting ? 'Finalizing...' : `Finalize ${category === 'SELF_SPONSORED' ? 'Personal' : 'Institutional'} Application`}
                                        </button>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}

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

            <Footer />
            <ChatbotButton />
        </div >
    );
}
