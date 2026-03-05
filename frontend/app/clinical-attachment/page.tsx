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
import { formsAPI } from '@/lib/api';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await formsAPI.submit('clinical-attachment-form', {
                ...formData,
                category,
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileUpload = (docId: keyof typeof uploadStatus) => {
        setUploadStatus(prev => ({ ...prev, [docId]: 'uploading' }));
        setTimeout(() => {
            setUploadStatus(prev => ({ ...prev, [docId]: 'success' }));
        }, 1500);
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
                        Join Ethiopia's premier psychiatric teaching hospital. We offer specialized clinical exposure for government and private institutions as well as self-sponsored professionals.
                    </p>
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
                                <button
                                    onClick={() => openApplyModal('GOVERNMENT')}
                                    className="btn-primary w-full justify-center text-[10px] font-black uppercase tracking-[0.2em] py-4 mt-auto"
                                >
                                    Institutional Apply
                                </button>
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
                                <button
                                    onClick={() => openApplyModal('PRIVATE')}
                                    className="btn-secondary w-full justify-center text-[10px] font-black uppercase tracking-[0.2em] py-4 mt-auto"
                                >
                                    Institutional Apply
                                </button>
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
                                <ul className="space-y-4 mb-10 flex-1">
                                    {[
                                        "Specialist mentorship",
                                        "Custom objectives",
                                        "Hospital liaison",
                                        "Student support",
                                        "Observerships",
                                        "Networking events"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => openApplyModal('SELF_SPONSORED')}
                                    className="btn-accent w-full justify-center text-[10px] font-black uppercase tracking-[0.2em] py-4 mt-auto"
                                >
                                    Personal Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Modal */}
            {isApplyModalOpen && (
                <div className="fixed inset-0 z-[100] bg-gray-50 overflow-y-auto animate-in fade-in duration-300">
                    <div className="relative min-h-screen py-12 md:py-20">
                        <button
                            onClick={resetPortal}
                            className="absolute top-6 right-6 p-3 bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all z-[110] shadow-sm"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <div className="container-custom max-w-4xl">
                            {/* Header */}
                            <div className="text-center mb-10">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 text-blue-900 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                    📋 Attachment Application
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                                    {category === 'SELF_SPONSORED' ? 'Individual Application' : 'Institutional Application'}
                                </h2>
                                <p className="text-gray-500 font-medium text-sm">
                                    For <span className="text-blue-900 font-bold">
                                        {category === 'GOVERNMENT' && 'Government Institution'}
                                        {category === 'PRIVATE' && 'Private College/University'}
                                        {category === 'SELF_SPONSORED' && 'Self-Sponsored Applicant'}
                                    </span>
                                </p>
                            </div>

                            {/* Step Progress Bar - Simplified */}
                            <div className="mb-12 max-w-2xl mx-auto px-4">
                                <div className="relative flex justify-between items-center">
                                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
                                    <div
                                        className="absolute top-1/2 left-0 h-0.5 bg-blue-900 -translate-y-1/2 transition-all duration-500"
                                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                                    />
                                    {[1, 2, 3, 4].map((step) => (
                                        <div key={step} className="relative z-10 flex flex-col items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 ${currentStep >= step ? 'bg-blue-900 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-400'
                                                }`}>
                                                {currentStep > step ? <CheckBadgeIcon className="w-4 h-4" /> : step}
                                            </div>
                                            <span className={`hidden sm:block text-[10px] font-bold uppercase tracking-wider mt-2 transition-colors duration-500 ${currentStep >= step ? 'text-blue-900' : 'text-gray-400'
                                                }`}>
                                                {step === 1 ? 'Details' : step === 2 ? 'Documents' : step === 3 ? 'Review' : 'Status'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="container-custom max-w-4xl">
                            <div className="card p-8 md:p-12 relative">
                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-10">
                                        {currentStep === 1 && (
                                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                {category === 'PRIVATE' && (
                                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex gap-3 items-center">
                                                        <InformationCircleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                                                        <p className="text-xs font-semibold text-yellow-800">
                                                            Institutional fee applies for private colleges. Please ensure payment documentation is ready for step 2.
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="grid grid-cols-1 gap-6">
                                                    <div>
                                                        <label className="form-label">
                                                            {category === 'SELF_SPONSORED' ? 'Full Legal Name *' : 'University / College Name *'}
                                                        </label>
                                                        <input
                                                            required
                                                            name="institutionName"
                                                            value={formData.institutionName}
                                                            onChange={handleInputChange}
                                                            type="text"
                                                            placeholder={category === 'SELF_SPONSORED' ? "As on National ID / Passport" : "Enter institutional legal name"}
                                                            className="form-input"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="form-label">Clinical Department *</label>
                                                            <select
                                                                required
                                                                name="departmentName"
                                                                value={formData.departmentName}
                                                                onChange={handleInputChange}
                                                                className="form-select"
                                                            >
                                                                <option value="" disabled>Select Department</option>
                                                                {["Addiction Treatment Unit", "Adult Psychiatry", "Child & Adolescent Psychiatry", "Clinical Mental Health", "Clinical Psychology", "Community Mental Health", "Emergency Nursing", "Emergency Psychiatry", "General Medical Service", "General Nursing Service", "Internal Medicine", "Laboratory Services", "Neurology / EEG", "Obstetrics & Gynecology", "Pediatrics & Child Health", "Pharmacy Services", "Psychiatric Nursing", "Rehabilitation Services", "Research Services", "Surgical Nursing", "Surgical Service", "Training & Education"].map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="form-label">Profession Type *</label>
                                                            <select
                                                                required
                                                                name="profession"
                                                                value={formData.profession}
                                                                onChange={handleInputChange}
                                                                className="form-select"
                                                            >
                                                                <option value="" disabled>Select Profession</option>
                                                                {["General Practitioner", "Health Officer Student", "Medical Intern", "Medical Student (Clinical)", "Medical Student (Pre-Clinical)", "Nursing Student (BSc)", "Nursing Student (Diploma)", "Occupational Therapy Student", "Pharmacy Student", "Psychiatry Resident", "Psychology Intern", "Resident Doctor", "Social Work Intern", "Specialized Clinician", "Other Healthcare Professional"].map(prof => <option key={prof} value={prof}>{prof}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        <div>
                                                            <label className="form-label">No. of students *</label>
                                                            <input
                                                                required
                                                                name="studentCount"
                                                                value={formData.studentCount}
                                                                onChange={handleInputChange}
                                                                type="number"
                                                                placeholder="Count"
                                                                className="form-input"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="form-label">Duration *</label>
                                                            <input
                                                                required
                                                                name="durationValue"
                                                                value={formData.durationValue}
                                                                onChange={handleInputChange}
                                                                type="text"
                                                                placeholder="e.g. 2 Months"
                                                                className="form-input"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="form-label">Preferred Start *</label>
                                                            <input
                                                                required
                                                                name="startDate"
                                                                value={formData.startDate}
                                                                onChange={handleInputChange}
                                                                type="date"
                                                                className="form-input"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {currentStep === 2 && (
                                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                                                <div className="mb-4">
                                                    <h3 className="text-2xl font-black text-gray-900">Document Upload</h3>
                                                    <p className="text-gray-500 text-sm">Please provide clear scans of the required files (PDF/JPG).</p>
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 text-left">
                                                    {[
                                                        { id: 'officialLetter', label: 'Official Request Letter', desc: 'Formal letter with seal' },
                                                        { id: 'studentList', label: category === 'SELF_SPONSORED' ? 'National ID / Passport' : 'Complete Student List', desc: 'Required for verification' },
                                                        ...(category !== 'GOVERNMENT' ? [{ id: 'paymentDoc', label: 'Payment Slip', desc: 'Bank deposit confirmation' }] : [])
                                                    ].map((doc) => (
                                                        <label
                                                            key={doc.id}
                                                            className={`flex items-center gap-5 p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${uploadStatus[doc.id] === 'success' ? 'bg-emerald-50 border-emerald-300' : 'bg-gray-50 border-gray-200 hover:border-blue-400 hover:bg-white'
                                                                }`}
                                                        >
                                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${uploadStatus[doc.id] === 'success' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-400'}`}>
                                                                {uploadStatus[doc.id] === 'success' ? <CheckBadgeIcon className="w-6 h-6" /> : <CloudArrowUpIcon className="w-6 h-6" />}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-bold text-gray-900 text-sm">{doc.label}</p>
                                                                <p className="text-xs text-gray-400 font-medium">{doc.desc}</p>
                                                            </div>
                                                            <input type="file" className="hidden" onChange={() => handleFileUpload(doc.id as any)} />
                                                            {uploadStatus[doc.id] === 'success' && <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">Uploaded</span>}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {currentStep === 3 && (
                                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                                                    <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                                                        <InformationCircleIcon className="w-5 h-5" /> Review Application
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                                                        <div className="flex justify-between py-2 border-b border-blue-100/50">
                                                            <span className="text-gray-500">Target:</span>
                                                            <span className="font-bold text-gray-900">{formData.institutionName}</span>
                                                        </div>
                                                        <div className="flex justify-between py-2 border-b border-blue-100/50">
                                                            <span className="text-gray-500">Department:</span>
                                                            <span className="font-bold text-gray-900">{formData.departmentName}</span>
                                                        </div>
                                                        <div className="flex justify-between py-2 border-b border-blue-100/50">
                                                            <span className="text-gray-500">Profession:</span>
                                                            <span className="font-bold text-gray-900">{formData.profession}</span>
                                                        </div>
                                                        <div className="flex justify-between py-2 border-b border-blue-100/50">
                                                            <span className="text-gray-500">Start Date:</span>
                                                            <span className="font-bold text-gray-900">{formData.startDate}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="form-label">Contact Person Name *</label>
                                                        <input required name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} type="text" placeholder="Full name for liaison" className="form-input" />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label className="form-label">Phone Number *</label>
                                                            <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} type="tel" placeholder="+251 ..." className="form-input" />
                                                        </div>
                                                        <div>
                                                            <label className="form-label">Official Email *</label>
                                                            <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="contact@email.com" className="form-input" />
                                                        </div>
                                                    </div>

                                                    <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
                                                        <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleInputChange} className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-900 focus:ring-blue-900" />
                                                        <span className="text-xs text-gray-600 font-medium leading-relaxed">
                                                            I certify that all provided information is accurate and I agree to comply with EMSH's clinical rotation policies and safety guidelines.
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex gap-4 pt-10 mt-10 border-t border-gray-100">
                                            {currentStep > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setCurrentStep(prev => prev - 1)}
                                                    className="btn-secondary px-8 text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    Previous
                                                </button>
                                            )}
                                            {currentStep < 3 ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setCurrentStep(prev => prev + 1)}
                                                    className="btn-primary flex-1 justify-center py-4 text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    Next Step
                                                </button>
                                            ) : (
                                                <button
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    className="btn-primary flex-1 justify-center py-4 disabled:opacity-50 text-[10px] font-black uppercase tracking-widest"
                                                >
                                                    {isSubmitting ? '⏳ Finalizing...' : '📤 Submit Application'}
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                ) : (
                                    <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckBadgeIcon className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-3xl font-black text-gray-900 mb-4">Application Received!</h3>
                                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                            Your request for <span className="text-blue-900 font-bold">{formData.institutionName}</span> has been submitted. We will review and contact you within 48 hours.
                                        </p>
                                        <div className="bg-blue-50 rounded-2xl p-6 text-left max-w-sm mx-auto mb-8">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Ref ID</span>
                                                <span className="font-mono text-xs font-bold bg-white px-2 py-1 rounded border border-blue-100 uppercase">EMSH-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                                            </div>
                                            <p className="text-[10px] text-blue-800 leading-relaxed">
                                                A confirmation has been sent to <strong>{formData.email}</strong>. Please keep your Reference ID.
                                            </p>
                                        </div>
                                        <button onClick={resetPortal} className="btn-primary">
                                            Return to Portal
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
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
