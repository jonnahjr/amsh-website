'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { cpdAPI } from '@/lib/api';
import { CPD_COURSES } from '../../data';
import {
    UserIcon,
    IdentificationIcon,
    ShieldCheckIcon,
    CheckBadgeIcon,
    ChevronLeftIcon,
    BuildingOfficeIcon,
    InformationCircleIcon,
    CloudArrowUpIcon,
} from '@heroicons/react/24/outline';

export default function CPDApplyPage() {
    const { id } = useParams();
    const router = useRouter();
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Status tracking for document uploads 
    const [uploadStatus, setUploadStatus] = useState<Record<string, 'idle' | 'uploading' | 'success'>>({
        licenseDoc: 'idle',
        idDoc: 'idle'
    });

    useEffect(() => {
        if (id) {
            const course = CPD_COURSES.find(c => c.id === id);
            if (course) {
                setSelectedCourse(course);
            } else {
                router.push('/cpd');
            }
        }
    }, [id, router]);

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        professionTitle: '',
        licenseNumber: '',
        placeOfWork: '',
        yearsOfExperience: '',
        region: '',
        category: 'PERSONAL',
        agreement: false,
    });

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
        if (!selectedCourse) return;

        setIsSubmitting(true);
        try {
            const payload = {
                firstName: formData.fullName.split(' ')[0],
                lastName: formData.fullName.split(' ').slice(1).join(' ') || ' ',
                email: formData.email,
                phone: formData.phoneNumber,
                profession: formData.professionTitle,
                workplace: formData.placeOfWork,
                licenseNo: formData.licenseNumber,
                category: formData.category,
            };

            await cpdAPI.register(selectedCourse.id, payload);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit application. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!selectedCourse) return null;

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <EmergencyBanner />
            <Navbar />

            {/* Header Area */}
            <div className="pt-32 pb-12 bg-blue-950 text-white">
                <div className="container-custom">
                    <Link href="/cpd" className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm font-bold mb-8">
                        <ChevronLeftIcon className="w-4 h-4" /> Back to Courses
                    </Link>

                    <div className="max-w-4xl">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                            Application Form
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                            Apply for {selectedCourse.title}
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

                    <div className="bg-white rounded-[40px] shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-12 lg:p-16">

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-10">
                                {currentStep === 1 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                                        <div className="mb-8 p-6 bg-cyan-50/50 rounded-3xl border border-cyan-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                                                <ShieldCheckIcon className="w-8 h-8 text-cyan-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-blue-950 text-lg mb-1">MOH Accredited Program</h3>
                                                <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                                    By submitting this form, you confirm that you hold a valid professional license recognized by the Ethiopian Ministry of Health.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                                                <div className="relative">
                                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="As per your license" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number *</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-black">+251</span>
                                                    <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="911 000 000" className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                </div>
                                            </div>
                                            <div className="space-y-4 md:col-span-2">
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address *</label>
                                                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="example@health.gov.et" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Profession Title *</label>
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
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">License Number *</label>
                                                <div className="relative">
                                                    <IdentificationIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                                    <input required type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} placeholder="MOH/RN/..." className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Place of Work *</label>
                                                <div className="relative">
                                                    <BuildingOfficeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                                    <input required type="text" name="placeOfWork" value={formData.placeOfWork} onChange={handleInputChange} placeholder="Hospital / Clinical Name" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Years of Experience *</label>
                                                <input required type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} placeholder="Number of years" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Region *</label>
                                                <input required type="text" name="region" value={formData.region} onChange={handleInputChange} placeholder="Current City / Region" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Registration Type *</label>
                                                <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm">
                                                    <option value="GOVERNMENT">Public Institution (Government)</option>
                                                    <option value="PRIVATE">Private College / Hospital</option>
                                                    <option value="PERSONAL">Independent / Personal</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                                        <div className="mb-8">
                                            <h3 className="text-2xl font-black text-gray-900">Document Upload</h3>
                                            <p className="text-gray-500 text-sm">Please provide clear scans of the required files (PDF/JPG).</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 text-left">
                                            {[
                                                { id: 'licenseDoc', label: 'Professional License', desc: 'Valid certification only' },
                                                { id: 'idDoc', label: 'National ID / Passport', desc: 'Or Hospital/Kebele ID' },
                                            ].map((doc) => (
                                                <label
                                                    key={doc.id}
                                                    className={`flex items-center gap-5 p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${uploadStatus[doc.id as keyof typeof uploadStatus] === 'success' ? 'bg-emerald-50 border-emerald-300' : 'bg-gray-50 border-gray-200 hover:border-blue-400 hover:bg-white'
                                                        }`}
                                                >
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${uploadStatus[doc.id as keyof typeof uploadStatus] === 'success' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-400'}`}>
                                                        {uploadStatus[doc.id as keyof typeof uploadStatus] === 'success' ? <CheckBadgeIcon className="w-6 h-6" /> : <CloudArrowUpIcon className="w-6 h-6" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-bold text-gray-900 text-sm">{doc.label}</p>
                                                        <p className="text-xs text-gray-400 font-medium">{doc.desc}</p>
                                                    </div>
                                                    <input type="file" className="hidden" onChange={() => handleFileUpload(doc.id as any)} />
                                                    {uploadStatus[doc.id as keyof typeof uploadStatus] === 'success' && <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">Uploaded</span>}
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
                                                    <span className="text-gray-500">Full Name:</span>
                                                    <span className="font-bold text-gray-900">{formData.fullName}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-blue-100/50">
                                                    <span className="text-gray-500">Profession:</span>
                                                    <span className="font-bold text-gray-900">{formData.professionTitle}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-blue-100/50">
                                                    <span className="text-gray-500">License Number:</span>
                                                    <span className="font-bold text-gray-900">{formData.licenseNumber}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-blue-100/50">
                                                    <span className="text-gray-500">Workplace:</span>
                                                    <span className="font-bold text-gray-900">{formData.placeOfWork}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <label className="flex items-start gap-4 cursor-pointer group p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100">
                                                <div className="relative flex items-center mt-1">
                                                    <input required type="checkbox" name="agreement" checked={formData.agreement} onChange={handleInputChange} className="w-6 h-6 border-2 border-gray-300 rounded-lg checked:bg-blue-900 transition-all appearance-none cursor-pointer" />
                                                    {formData.agreement && <CheckBadgeIcon className="absolute inset-0 w-6 h-6 text-white p-1 pointer-events-none" />}
                                                </div>
                                                <span className="text-xs text-gray-600 font-medium leading-relaxed group-hover:text-gray-800 transition-colors">
                                                    I hereby declare that I am a licensed health professional and that the information provided is accurate.
                                                    I agree to abide by the hospital's CPD standards and academic integrity policies.
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
                                            className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer"
                                        >
                                            Previous
                                        </button>
                                    )}
                                    {currentStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(prev => prev + 1)}
                                            className="flex-1 bg-blue-950 text-white hover:bg-blue-800 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 hover:-translate-y-1 cursor-pointer"
                                        >
                                            Next Step
                                        </button>
                                    ) : (
                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="flex-1 bg-blue-950 text-white hover:bg-blue-800 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
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
                                    Your request for <span className="text-blue-900 font-bold">{selectedCourse.title}</span> has been submitted. We will review and contact you shortly.
                                </p>
                                <div className="bg-blue-50 rounded-2xl p-6 text-left max-w-sm mx-auto mb-8">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Ref ID</span>
                                        <span className="font-mono text-xs font-bold bg-white px-2 py-1 rounded border border-blue-100 uppercase">CPD-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                                    </div>
                                    <p className="text-[10px] text-blue-800 leading-relaxed">
                                        A confirmation has been sent to <strong>{formData.email}</strong>. Please keep your Reference ID.
                                    </p>
                                </div>
                                <Link href="/cpd" className="inline-block bg-blue-950 text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-colors">
                                    Return to Courses
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
