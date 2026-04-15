'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { researchAPI } from '@/lib/api';
import { 
    CloudArrowUpIcon, 
    CheckCircleIcon, 
    ChevronLeftIcon,
    UserIcon,
    BookOpenIcon,
    TagIcon,
    AcademicCapIcon,
    ShieldCheckIcon,
    ArrowPathIcon,
    IdentificationIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import EmergencyBanner from '@/components/ui/EmergencyBanner';

export default function PublishResearchPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionId, setSubmissionId] = useState('');

    const [formData, setFormData] = useState({
        authorName: '',
        authorEmail: '',
        authorPhone: '',
        institution: '',
        coAuthors: '',
        researchTitle: '',
        researchType: '',
        studyArea: '',
        studyLocation: '',
        journal: '',
        year: '',
        abstract: '',
        keywords: '',
        externalLink: '',
        agreement: false
    });

    const [files, setFiles] = useState<Record<string, File | null>>({
        manuscript: null,
        ethicalApproval: null,
        coverLetter: null
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFiles(prev => ({ ...prev, [field]: file }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
            return;
        }
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', formData.researchTitle);
            data.append('abstract', formData.abstract);
            data.append('investigatorName', formData.authorName);
            data.append('email', formData.authorEmail);
            data.append('phone', formData.authorPhone);
            data.append('institution', formData.institution);
            
            // Format Co-Authors as JSON Array
            const coAuthorsList = formData.coAuthors
                ? formData.coAuthors.split(',').map(name => ({ name: name.trim() })).filter(a => a.name)
                : [];
            data.append('coInvestigators', JSON.stringify(coAuthorsList));

            data.append('researchType', formData.researchType);
            data.append('studyArea', formData.studyArea);
            data.append('studyLocation', formData.studyLocation);
            data.append('year', formData.year);
            data.append('keywords', formData.keywords);
            data.append('doi', formData.externalLink); // Store link in DOI field

            // Always set journal so admin can route to Research tab (not Proposals)
            data.append('journal', formData.journal || 'AMSH Research Journal');
            
            // MANUSCRIPT category flags this as a publish-form submission
            data.append('category', 'MANUSCRIPT');
            
            if (files.manuscript) data.append('proposalPDF', files.manuscript);
            if (files.ethicalApproval) data.append('ethicalLetter', files.ethicalApproval);
            if (files.coverLetter) data.append('universityLetter', files.coverLetter);

            const res = await researchAPI.submit(data);
            setSubmissionId(res.data.research?.submissionId || 'AMSH-RES-SUBMITTED');
            setIsSubmitted(true);
        } catch (err: any) {
            console.error('Submit error:', err);
            alert('Submission failed: ' + (err?.response?.data?.error || 'Please try again.'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <EmergencyBanner />
            <Navbar />

            <div className="pt-32 pb-12 bg-blue-950 text-white">
                <div className="container-custom">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                            Research Archive Submission
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
                    
                    {/* Progress Bar - CPD Style */}
                    {!isSubmitted && (
                        <div className="mb-12 max-w-2xl mx-auto px-4">
                            <div className="relative flex justify-between items-center">
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
                                <div
                                    className="absolute top-1/2 left-0 h-0.5 bg-blue-950 -translate-y-1/2 transition-all duration-500"
                                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                                />
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="relative z-10 flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 ${currentStep >= step ? 'bg-blue-950 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                                            {currentStep > step ? <CheckCircleIcon className="w-4 h-4" /> : step}
                                        </div>
                                        <span className={`hidden sm:block text-[9px] font-black uppercase tracking-widest mt-2 ${currentStep >= step ? 'text-blue-950' : 'text-gray-400'}`}>
                                            {step === 1 ? 'Authors' : step === 2 ? 'Manuscript' : 'Finalize'}
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
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-blue-950 uppercase tracking-widest ml-1">Principal Investigator Name <span className="text-red-500">*</span></label>
                                                <div className="relative">
                                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input required name="authorName" value={formData.authorName} onChange={handleInputChange} placeholder="Dr. Abebe Bekele" className="w-full pl-11 pr-5 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-blue-950 uppercase tracking-widest ml-1">Contact Email <span className="text-red-500">*</span></label>
                                                <input required type="email" name="authorEmail" value={formData.authorEmail} onChange={handleInputChange} placeholder="author@institution.edu" className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                            </div>
                                            <div className="space-y-3 md:col-span-2">
                                                <label className="text-[10px] font-black text-blue-950 uppercase tracking-widest ml-1">Research Institution <span className="text-red-500">*</span></label>
                                                <input required name="institution" value={formData.institution} onChange={handleInputChange} placeholder="AMSH / Addis Ababa University" className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                            </div>
                                            <div className="space-y-3 md:col-span-2">
                                                <label className="text-[10px] font-black text-blue-950 uppercase tracking-widest ml-1">Co-Authors (Comma Separated)</label>
                                                <input name="coAuthors" value={formData.coAuthors} onChange={handleInputChange} placeholder="Author 1, Author 2, Author 3..." className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest ml-2">Include all contributors for archive indexing</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-blue-950 uppercase tracking-widest ml-1">Research Title <span className="text-red-500">*</span></label>
                                            <input required name="researchTitle" value={formData.researchTitle} onChange={handleInputChange} placeholder="Title of your publication..." className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-blue-950 uppercase tracking-widest ml-1">Abstract / Summary <span className="text-red-500">*</span></label>
                                                <textarea required name="abstract" value={formData.abstract} onChange={handleInputChange} placeholder="Provide a brief abstract..." className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl h-32 no-scrollbar" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-blue-950 uppercase tracking-widest ml-1">Keywords <span className="text-red-500">*</span></label>
                                                <textarea required name="keywords" value={formData.keywords} onChange={handleInputChange} placeholder="Mental Health, Clinical Study, Ethiopia..." className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl h-32 no-scrollbar" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-blue-950 uppercase tracking-widest">Research Type</label>
                                                <input required name="researchType" value={formData.researchType} onChange={handleInputChange} placeholder="Cross-sectional" className="w-full px-4 py-3 border-2 border-blue-950 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-blue-950 uppercase tracking-widest">Study Area</label>
                                                <input required name="studyArea" value={formData.studyArea} onChange={handleInputChange} placeholder="Psychiatry" className="w-full px-4 py-3 border-2 border-blue-950 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-blue-950 uppercase tracking-widest">Location</label>
                                                <input required name="studyLocation" value={formData.studyLocation} onChange={handleInputChange} placeholder="Addis Ababa" className="w-full px-4 py-3 border-2 border-blue-950 rounded-xl text-xs font-bold" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-blue-950 uppercase tracking-widest">Release Year</label>
                                                <input required name="year" value={formData.year} onChange={handleInputChange} placeholder="2024" className="w-full px-4 py-3 border-2 border-blue-950 rounded-xl text-xs font-bold" />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3 pt-6 border-t border-gray-100">
                                            <label className="text-[10px] font-black text-blue-950 uppercase tracking-widest ml-1">External DOI / Link (Optional)</label>
                                            <input name="externalLink" value={formData.externalLink} onChange={handleInputChange} placeholder="https://doi.org/10.xxxx/xxx or website URL" className="w-full px-6 py-4 border-2 border-blue-950/20 rounded-2xl font-bold text-sm bg-gray-50 focus:bg-white" />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <label className={`p-6 border-2 border-dashed rounded-[32px] flex flex-col items-center gap-3 cursor-pointer transition-all ${files.manuscript ? 'bg-emerald-50 border-emerald-300' : 'bg-gray-50 border-gray-200 hover:border-blue-400'}`}>
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${files.manuscript ? 'bg-emerald-500 text-white' : 'bg-white text-blue-950'}`}>
                                                    <CloudArrowUpIcon className="w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-center">{files.manuscript ? 'Manuscript Ready' : 'Manuscript PDF'}</span>
                                                <input type="file" className="hidden" onChange={(e) => handleFileChange('manuscript', e)} />
                                            </label>
                                            <label className={`p-6 border-2 border-dashed rounded-[32px] flex flex-col items-center gap-3 cursor-pointer transition-all ${files.ethicalApproval ? 'bg-emerald-50 border-emerald-300' : 'bg-gray-50 border-gray-200 hover:border-blue-400'}`}>
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${files.ethicalApproval ? 'bg-emerald-500 text-white' : 'bg-white text-blue-950'}`}>
                                                    <ShieldCheckIcon className="w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-center">{files.ethicalApproval ? 'Approval Loaded' : 'Ethical Letter (Optional)'}</span>
                                                <input type="file" className="hidden" onChange={(e) => handleFileChange('ethicalApproval', e)} />
                                            </label>
                                            <label className={`p-6 border-2 border-dashed rounded-[32px] flex flex-col items-center gap-3 cursor-pointer transition-all ${files.coverLetter ? 'bg-emerald-50 border-emerald-300' : 'bg-gray-50 border-gray-200 hover:border-blue-400'}`}>
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${files.coverLetter ? 'bg-emerald-500 text-white' : 'bg-white text-blue-950'}`}>
                                                    <IdentificationIcon className="w-6 h-6" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-center">{files.coverLetter ? 'Letter Attached' : 'Author ID/Docs (Optional)'}</span>
                                                <input type="file" className="hidden" onChange={(e) => handleFileChange('coverLetter', e)} />
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                        <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
                                            <h4 className="text-sm font-black text-blue-950 mb-6 flex items-center gap-2">
                                                <ArrowPathIcon className="w-5 h-5" /> Review Submission
                                            </h4>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center py-3 border-b border-blue-100/50">
                                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Lead Investigator</span>
                                                    <span className="text-sm font-black text-blue-950">{formData.authorName}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-3 border-b border-blue-100/50">
                                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Document Status</span>
                                                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase">All Files Attached</span>
                                                </div>
                                            </div>
                                        </div>

                                        <label className="flex items-start gap-4 p-5 bg-amber-50/50 rounded-2xl border border-amber-100 cursor-pointer group transition-colors">
                                            <input required type="checkbox" className="mt-1 w-5 h-5 rounded border-2 border-amber-300 text-blue-950 focus:ring-blue-950" />
                                            <span className="text-xs font-medium text-amber-900 leading-relaxed">
                                                I confirm that this is a finalized research product and that I hold the copyrights for institutional publication.
                                            </span>
                                        </label>
                                    </div>
                                )}

                                <div className="flex gap-4 pt-10 border-t border-gray-100">
                                    {currentStep > 1 && (
                                        <button type="button" onClick={() => setCurrentStep(prev => prev - 1)} className="px-10 py-4 bg-gray-100 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-200 hover:text-blue-950 transition-all">
                                            Previous
                                        </button>
                                    )}
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="flex-1 px-10 py-5 bg-blue-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Processing...' : currentStep < 3 ? 'Next Phase' : 'Apply for Publication'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-16 animate-in zoom-in-95 fade-in duration-700">
                                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 ring-8 ring-emerald-50">
                                    <CheckCircleIcon className="w-12 h-12" />
                                </div>
                                <h3 className="text-3xl font-black text-blue-950 mb-4">Research Submitted!</h3>
                                <p className="text-gray-500 font-medium max-w-md mx-auto mb-10 leading-relaxed">
                                    Your research manuscript has been successfully submitted to the Amanuel Mental Specialized Hospital repository for institutional review.
                                </p>
                                <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100 max-w-sm mx-auto mb-4">
                                    <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-2">Your Submission ID</p>
                                    <code className="text-xl font-black text-blue-950 tracking-tighter">{submissionId}</code>
                                </div>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-10">
                                    Save this ID to track your proposal status
                                </p>
                                <Link href="/research" className="inline-block px-12 py-5 bg-blue-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-105 transition-all">
                                    Return to Research
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
