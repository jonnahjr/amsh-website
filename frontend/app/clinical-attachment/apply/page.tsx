'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { formsAPI } from '@/lib/api';
import {
    UserIcon,
    IdentificationIcon,
    ShieldCheckIcon,
    CheckBadgeIcon,
    BuildingOfficeIcon,
    InformationCircleIcon,
    CloudArrowUpIcon,
    UserGroupIcon,
    CalendarDaysIcon,
    ChevronLeftIcon,
} from '@heroicons/react/24/outline';

function ApplyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryQuery = searchParams.get('category');
    
    type Category = 'GOVERNMENT' | 'PRIVATE' | 'SELF_SPONSORED';
    const [category, setCategory] = useState<Category>('GOVERNMENT');

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
        educationLevel: '',
        agreement: false,
    });

    useEffect(() => {
        if (categoryQuery && ['GOVERNMENT', 'PRIVATE', 'SELF_SPONSORED'].includes(categoryQuery)) {
            setCategory(categoryQuery as Category);
        } else {
            router.push('/clinical-attachment');
        }
    }, [categoryQuery, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const checked = target.checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileUpload = (docId: keyof typeof uploadStatus) => {
        setUploadStatus(prev => ({ ...prev, [docId]: 'uploading' }));
        setTimeout(() => {
            setUploadStatus(prev => ({ ...prev, [docId]: 'success' }));
        }, 1500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (currentStep === 1) {
            setCurrentStep(2);
            return;
        }

        if (currentStep === 2) {
            const requiredDocs = ['officialLetter', 'studentList'];
            if (category !== 'GOVERNMENT') requiredDocs.push('paymentDoc');
            
            const missing = requiredDocs.find(doc => uploadStatus[doc] !== 'success');
            if (missing) {
                alert('Please upload all required documents before proceeding.');
                return;
            }
            setCurrentStep(3);
            return;
        }

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

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <EmergencyBanner />
            <Navbar />

            {/* Header Area - CPD Style */}
            <div className="pt-32 pb-12 bg-blue-950 text-white">
                <div className="container-custom">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                            Apply for {
                                category === 'GOVERNMENT' ? 'Public Institutional' :
                                category === 'PRIVATE' ? 'Private Institutional' : 'Individual'
                            } Attachment
                        </h1>
                        <p className="text-blue-200/60 font-medium text-lg">
                            Please provide your professional details. Your license will be verified by the institutional review board.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <main className="py-16">
                <div className="container-custom max-w-4xl">

                    {/* Step Progress Bar */}
                    {!isSubmitted && (
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
                    )}

                    <div className="form-card-bg rounded-[40px] shadow-xl shadow-blue-900/5 border border-gray-200 p-8 md:p-12 lg:p-16">
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
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="md:col-span-2 space-y-4">
                                                <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">
                                                    {category === 'SELF_SPONSORED' ? 'Full Legal Name' : 'University / College Name'} <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <BuildingOfficeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                                    <input
                                                        required
                                                        name="institutionName"
                                                        value={formData.institutionName}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        placeholder={category === 'SELF_SPONSORED' ? "As on National ID / Passport" : "Enter institutional legal name"}
                                                        className="w-full pl-12 pr-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Clinical Department <span className="text-red-500">*</span></label>
                                                <select
                                                    required
                                                    name="departmentName"
                                                    value={formData.departmentName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm"
                                                >
                                                    <option value="" disabled>Select Department</option>
                                                    {["Addiction Treatment Unit", "Adult Psychiatry", "Child & Adolescent Psychiatry", "Clinical Mental Health", "Clinical Psychology", "Community Mental Health", "Emergency Nursing", "Emergency Psychiatry", "General Medical Service", "General Nursing Service", "Internal Medicine", "Laboratory Services", "Neurology / EEG", "Obstetrics & Gynecology", "Pediatrics & Child Health", "Pharmacy Services", "Psychiatric Nursing", "Rehabilitation Services", "Research Services", "Surgical Nursing", "Surgical Service", "Training & Education"].map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                                </select>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Profession Type <span className="text-red-500">*</span></label>
                                                <select
                                                    required
                                                    name="profession"
                                                    value={formData.profession}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm"
                                                >
                                                    <option value="" disabled>Select Profession</option>
                                                    {["General Practitioner", "Health Officer Student", "Medical Intern", "Medical Student (Clinical)", "Medical Student (Pre-Clinical)", "Nursing Student (BSc)", "Nursing Student (Diploma)", "Occupational Therapy Student", "Pharmacy Student", "Psychiatry Resident", "Psychology Intern", "Resident Doctor", "Social Work Intern", "Specialized Clinician", "Other Healthcare Professional"].map(prof => <option key={prof} value={prof}>{prof}</option>)}
                                                </select>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">No. of students <span className="text-red-500">*</span></label>
                                                <input
                                                    required
                                                    name="studentCount"
                                                    value={formData.studentCount}
                                                    onChange={handleInputChange}
                                                    type="number"
                                                    placeholder="Count"
                                                    className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm"
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Duration <span className="text-red-500">*</span></label>
                                                <input
                                                    required
                                                    name="durationValue"
                                                    value={formData.durationValue}
                                                    onChange={handleInputChange}
                                                    type="text"
                                                    placeholder="e.g. 2 Months"
                                                    className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm"
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Preferred Start <span className="text-red-500">*</span></label>
                                                <input
                                                    required
                                                    name="startDate"
                                                    value={formData.startDate}
                                                    onChange={handleInputChange}
                                                    type="date"
                                                    className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm"
                                                />
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Education Level <span className="text-red-500">*</span></label>
                                                <select
                                                    required
                                                    name="educationLevel"
                                                    value={formData.educationLevel}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm"
                                                >
                                                    <option value="">Select Level</option>
                                                    <option>Diploma</option>
                                                    <option>BSc Degree</option>
                                                    <option>MSc Degree</option>
                                                    <option>MD / Specialist</option>
                                                    <option>PhD</option>
                                                    <option>Other</option>
                                                </select>
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
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Contact Person Name <span className="text-red-500">*</span></label>
                                                    <input required name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} type="text" placeholder="Tigist Alemu" className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Phone Number <span className="text-red-500">*</span></label>
                                                    <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} type="tel" placeholder="+251 911 445 566" className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                </div>
                                                <div className="md:col-span-2 space-y-4">
                                                    <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Official Email <span className="text-red-500">*</span></label>
                                                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="tigist@gmail.com" className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                </div>
                                            </div>

                                            <label className="flex items-start gap-4 cursor-pointer group p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100">
                                                <div className="relative flex items-center mt-1">
                                                    <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleInputChange} className="w-6 h-6 border-2 border-gray-300 rounded-lg checked:bg-blue-900 transition-all appearance-none cursor-pointer" />
                                                    {formData.agreement && <CheckBadgeIcon className="absolute inset-0 w-6 h-6 text-white p-1 pointer-events-none" />}
                                                </div>
                                                <span className="text-xs text-gray-600 font-medium leading-relaxed">
                                                    I certify that all provided information is accurate and I agree to comply with EMSH's clinical rotation policies and safety guidelines.
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-4 pt-10 border-t border-gray-100">
                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(prev => prev - 1)}
                                            className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                                        >
                                            Previous
                                        </button>
                                    )}
                                    {currentStep < 3 ? (
                                        <button
                                            type="submit"
                                            className="flex-1 bg-blue-950 text-white hover:bg-blue-800 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 hover:-translate-y-1"
                                        >
                                            Next Step
                                        </button>
                                    ) : (
                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="flex-1 bg-blue-950 text-white hover:bg-blue-800 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 hover:-translate-y-1 disabled:opacity-50"
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
                                    Your request for <span className="text-blue-900 font-bold">{formData.institutionName}</span> has been submitted. We will review and contact you shortly.
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
                                <Link href="/clinical-attachment" className="inline-block bg-blue-950 text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-colors">
                                    Return to Portal
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
            <ChatbotButton />
        </div>
    );
}

export default function ClinicalApplyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApplyContent />
        </Suspense>
    );
}
