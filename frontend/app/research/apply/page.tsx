'use client';

import { useState } from 'react';
import { researchAPI } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import {
    ChevronLeftIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    DocumentTextIcon,
    UsersIcon,
    BuildingOfficeIcon,
    IdentificationIcon,
    CheckBadgeIcon,
    CalendarIcon,
    MapPinIcon,
    TagIcon,
} from '@heroicons/react/24/outline';

export default function ApplyProposalPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [lastSubmissionId, setLastSubmissionId] = useState('');

    const [formData, setFormData] = useState({
        investigatorName: '',
        email: '',
        phone: '',
        institution: '',
        department: '',
        position: '',
        researchTitle: '',
        abstract: '',
        researchType: '',
        studyArea: '',
        studyLocation: '',
        startDate: '',
        endDate: '',
        keywords: '',
        customStudyArea: '',
        customResearchType: '',
        patientsInvolved: false,
        participantType: '',
        dataCollectionMethod: '',
        customParticipantType: '',
        customDataCollectionMethod: '',
        isStudent: false,
        supervisorName: '',
        supervisorEmail: '',
        supervisorInstitution: '',
        coInvestigators: [] as { name: string, institution: string }[],
        proposalPDF: null as File | null,
        ethicalLetter: null as File | null,
        universityLetter: null as File | null,
        coInvestigatorFile: null as File | null,
        declaration: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({
                ...prev,
                [fieldName]: e.target.files![0]
            }));
        }
    };

    const addCoInvestigator = () => {
        setFormData(prev => ({
            ...prev,
            coInvestigators: [...prev.coInvestigators, { name: '', institution: '' }]
        }));
    };

    const removeCoInvestigator = (index: number) => {
        setFormData(prev => ({
            ...prev,
            coInvestigators: prev.coInvestigators.filter((_, i) => i !== index)
        }));
    };

    const updateCoInvestigator = (index: number, field: 'name' | 'institution', value: string) => {
        const newCo = [...formData.coInvestigators];
        newCo[index][field] = value;
        setFormData(prev => ({ ...prev, coInvestigators: newCo }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < 5) {
            setCurrentStep(prev => prev + 1);
            return;
        }

        setIsSubmitting(true);
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'coInvestigators') {
                    data.append(key, JSON.stringify(value));
                } else if (key === 'studyArea' && value === 'Other') {
                    data.append(key, formData.customStudyArea || 'Other');
                } else if (key === 'researchType' && value === 'Other') {
                    data.append(key, formData.customResearchType || 'Other');
                } else if (key === 'participantType' && value === 'Other') {
                    data.append(key, formData.customParticipantType || 'Other');
                } else if (key === 'dataCollectionMethod' && value === 'Other') {
                    data.append(key, formData.customDataCollectionMethod || 'Other');
                } else if (key === 'researchTitle') {
                    data.append('title', String(value));
                } else if (value !== null && typeof value !== 'object' && key !== 'proposalPDF' && key !== 'ethicalLetter' && key !== 'universityLetter' && key !== 'coInvestigatorFile') {
                    data.append(key, String(value));
                }
            });

            if (formData.proposalPDF) data.append('proposalPDF', formData.proposalPDF);
            if (formData.ethicalLetter) data.append('ethicalLetter', formData.ethicalLetter);
            if (formData.universityLetter) data.append('universityLetter', formData.universityLetter);
            if (formData.coInvestigatorFile) data.append('coInvestigatorFile', formData.coInvestigatorFile);

            const response = await researchAPI.submit(data);
            setLastSubmissionId(response.data.research.submissionId);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to submit. Please check your data and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [
        { id: 1, name: 'Investigator' },
        { id: 2, name: 'Metadata' },
        { id: 3, name: 'Data detail' },
        { id: 4, name: 'Co-Investigators' },
        { id: 5, name: 'Documents' }
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <EmergencyBanner />
            <Navbar />

            {/* Header Area */}
            <div className="pt-32 pb-12 bg-blue-950 text-white">
                <div className="container-custom">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
                            Research Proposal Application
                        </h1>
                        <p className="text-blue-200/60 font-medium text-lg">
                            Please provide your professional details. Your license will be verified by the institutional review board.
                        </p>
                    </div>
                </div>
            </div>

            <main className="py-16">
                <div className="container-custom max-w-4xl">
                    {/* Stepper Progress Bar - OUTSIDE BOX */}
                    {!isSubmitted && (
                        <div className="mb-12 px-4">
                            <div className="max-w-3xl mx-auto relative px-4">
                                <div className="flex justify-between items-center relative z-10">
                                    {steps.map((step) => (
                                        <div key={step.id} className="flex flex-col items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-with-all duration-500 ${currentStep >= step.id ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                                                {currentStep > step.id ? <CheckCircleIcon className="w-4 h-4 text-white" /> : step.id}
                                            </div>
                                            <span className={`mt-3 text-[10px] font-black uppercase tracking-wider transition-colors duration-500 ${currentStep >= step.id ? 'text-blue-900' : 'text-gray-400 opacity-60'}`}>
                                                {step.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute top-4 left-8 right-8 h-[2px] bg-gray-200 -z-0 rounded-full">
                                    <div 
                                        className="h-full bg-blue-900 transition-all duration-1000 ease-in-out rounded-full" 
                                        style={{ width: `${(currentStep - 1) * 25}%` }} 
                                    />
                                </div>
                            </div>

                            {/* Researcher Status OUTSIDE BOX - Compact Version */}
                            {currentStep === 1 && !isSubmitted && (
                                <div className="mt-8 text-center space-y-4 animate-in slide-in-from-top-4 duration-700">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-blue-950 uppercase tracking-tighter leading-none">Principal Investigator</h3>
                                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] leading-none opacity-60">Define Researcher Status</p>
                                    </div>
                                    
                                    <div className="flex gap-3 justify-center max-w-sm mx-auto">
                                        <label className={`flex-1 p-3 px-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-center gap-3 ${formData.isStudent ? 'bg-blue-950 border-blue-950 text-white shadow-xl shadow-blue-900/10' : 'bg-white border-gray-100 text-blue-950 hover:border-blue-200'}`}>
                                            <input type="radio" className="sr-only" checked={formData.isStudent} onChange={() => setFormData({...formData, isStudent: true})} />
                                            <div className={`w-4 h-4 rounded-full border-[2.5px] flex items-center justify-center transition-all ${formData.isStudent ? 'border-blue-400 bg-blue-950' : 'border-gray-200 bg-white'}`}>
                                                {formData.isStudent && <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Student</span>
                                        </label>
                                        <label className={`flex-1 p-3 px-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-center gap-3 ${!formData.isStudent ? 'bg-blue-950 border-blue-950 text-white shadow-xl shadow-blue-900/10' : 'bg-white border-gray-100 text-blue-950 hover:border-blue-200'}`}>
                                            <input type="radio" className="sr-only" checked={!formData.isStudent} onChange={() => setFormData({...formData, isStudent: false})} />
                                            <div className={`w-4 h-4 rounded-full border-[2.5px] flex items-center justify-center transition-all ${!formData.isStudent ? 'border-blue-400 bg-blue-950' : 'border-gray-200 bg-white'}`}>
                                                {formData.isStudent === false && <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Professional</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="form-card-bg rounded-[40px] shadow-xl shadow-blue-900/5 border border-gray-200 p-8 md:p-12 lg:p-16">
                        {isSubmitted ? (
                            <div className="p-8 text-center animate-in zoom-in-95 duration-500">
                                <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-50/50">
                                    <CheckCircleIcon className="w-12 h-12 text-emerald-500" />
                                </div>
                                <h3 className="text-3xl font-black text-blue-950 mb-3 tracking-tighter leading-none">Submission Success!</h3>
                                <div className="inline-flex flex-col items-center gap-1 py-4 px-8 bg-blue-50 border-2 border-blue-950/10 rounded-[25px] mb-6">
                                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest italic font-mono">Tracking ID</p>
                                    <p className="text-2xl font-black text-blue-950 font-mono tracking-tighter uppercase">{lastSubmissionId || 'GEN-2024-XXXX'}</p>
                                </div>
                                <p className="text-gray-500 font-medium text-base max-w-sm mx-auto mb-8 leading-relaxed">
                                    Use the ID above to monitor review status.
                                </p>
                                <Link href="/research" className="inline-block px-10 py-4 bg-blue-950 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-blue-950/20">
                                    Back to Hub
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <form onSubmit={handleSubmit} className="space-y-10">
                                        {/* PHASE 1: INVESTIGATOR */}
                                        {currentStep === 1 && (
                                            <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Full Name <span className="text-red-500 font-bold">*</span></label>
                                                        <input required name="investigatorName" value={formData.investigatorName} onChange={handleInputChange} className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl font-black text-sm bg-white focus:ring-2 focus:ring-blue-900 transition-all shadow-sm" placeholder="e.g., Dr. Mulugeta Tadesse" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Official Email <span className="text-red-500 font-bold">*</span></label>
                                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl font-black text-sm bg-white focus:ring-2 focus:ring-blue-900 transition-all shadow-sm" placeholder="mulugeta@institution.edu" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Phone Number <span className="text-red-500 font-bold">*</span></label>
                                                        <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl font-black text-sm bg-white focus:ring-2 focus:ring-blue-900 transition-all shadow-sm" placeholder="+251 9XX XXX XXX" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Primary Institution <span className="text-red-500 font-bold">*</span></label>
                                                        <input required name="institution" value={formData.institution} onChange={handleInputChange} className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl font-black text-sm bg-white focus:ring-2 focus:ring-blue-900 transition-all shadow-sm" placeholder="e.g., Addis Ababa University / AMSH" />
                                                    </div>
                                                </div>

                                                {formData.isStudent && (
                                                    <div className="p-8 bg-amber-50/50 rounded-[35px] border border-amber-100/50 space-y-6 animate-in zoom-in-95 duration-500">
                                                        <div className="flex items-center gap-3 text-amber-900 border-b border-amber-100/50 pb-4">
                                                            <ShieldCheckIcon className="w-5 h-5 opacity-40" />
                                                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] font-bold">Academic Supervisor</h4>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black text-amber-900 uppercase tracking-widest ml-1">Supervisor Full Name *</label>
                                                                <input required name="supervisorName" value={formData.supervisorName} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border-2 border-amber-200 rounded-2xl font-black text-sm focus:border-amber-500 hover:border-amber-300 transition-all shadow-sm text-blue-950" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black text-amber-900 uppercase tracking-widest ml-1">Official Email *</label>
                                                                <input required type="email" name="supervisorEmail" value={formData.supervisorEmail} onChange={handleInputChange} className="w-full px-6 py-4 bg-white border-2 border-amber-200 rounded-2xl font-black text-sm focus:border-amber-500 hover:border-amber-300 transition-all shadow-sm text-blue-950" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* PHASE 2: METADATA */}
                                        {currentStep === 2 && (
                                            <div className="space-y-12 animate-in slide-in-from-right-10 duration-500">
                                                <div className="space-y-4 text-center mb-16">
                                                    <h3 className="text-4xl font-black text-blue-950 uppercase tracking-tighter leading-none">Research Metadata</h3>
                                                    <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] opacity-60">Core Protocol Identification</p>
                                                </div>
                                                <div className="space-y-8">
                                                    <div className="space-y-2">
                                                        <label className="text-[11px] font-black text-blue-950 uppercase tracking-widest ml-1">Title of Research <span className="text-red-500 font-bold">*</span></label>
                                                        <textarea 
                                                            required 
                                                            name="researchTitle" 
                                                            value={formData.researchTitle} 
                                                            onChange={handleInputChange} 
                                                            rows={2} 
                                                            className="w-full px-8 py-5 border-2 border-blue-950 rounded-[25px] font-black text-lg text-blue-950 bg-white focus:ring-2 focus:ring-blue-900 transition-all shadow-sm placeholder:text-gray-300" 
                                                            placeholder="Enter Full Research Title" 
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <div className="space-y-2">
                                                            <label className="text-[11px] font-black text-blue-950 uppercase tracking-widest ml-1">Research Type <span className="text-red-500 font-bold">*</span></label>
                                                            <div className="relative group">
                                                                <select required name="researchType" value={formData.researchType} onChange={handleInputChange} className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl font-black text-sm bg-white text-blue-950 appearance-none shadow-sm pr-12 focus:border-blue-950 hover:border-blue-200 transition-all">
                                                                    <option value="" disabled>Select Research Methodology</option>
                                                                    <option value="Clinical Trial">Clinical Trial</option>
                                                                    <option value="Randomized Controlled Trial">Randomized Controlled Trial (RCT)</option>
                                                                    <option value="Observational Study">Observational Study</option>
                                                                    <option value="Cross-sectional Study">Cross-sectional Study</option>
                                                                    <option value="Cohort Study">Cohort Study</option>
                                                                    <option value="Case-Control Study">Case-Control Study</option>
                                                                    <option value="Experimental/Lab Study">Experimental / Lab Study</option>
                                                                    <option value="Qualitative Research">Qualitative Research</option>
                                                                    <option value="Mixed-Methods Research">Mixed-Methods Research</option>
                                                                    <option value="Systematic Review">Systematic Review</option>
                                                                    <option value="Meta-Analysis">Meta-Analysis</option>
                                                                    <option value="Case Report">Case Report</option>
                                                                    <option value="Other">Other (Specify)</option>
                                                                </select>
                                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 font-black text-[10px]">▼</div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[11px] font-black text-blue-950 uppercase tracking-widest ml-1">Study Area <span className="text-red-500 font-bold">*</span></label>
                                                            <div className="relative group">
                                                                <select required name="studyArea" value={formData.studyArea} onChange={handleInputChange} className="w-full px-6 py-4 border-2 border-blue-950 rounded-2xl font-black text-sm bg-white text-blue-950 appearance-none shadow-sm pr-12 focus:ring-2 focus:ring-blue-900 transition-all">
                                                                    <option value="" disabled>Select Core Discipline</option>
                                                                    <option value="General Psychiatry">General Psychiatry</option>
                                                                    <option value="Clinical Psychology">Clinical Psychology</option>
                                                                    <option value="Child and Adolescent Psychiatry">Child & Adolescent Psychiatry</option>
                                                                    <option value="Addiction and Substance Abuse">Addiction & Substance Abuse</option>
                                                                    <option value="Geriatric Psychiatry">Geriatric Psychiatry</option>
                                                                    <option value="Forensic Psychiatry">Forensic Psychiatry</option>
                                                                    <option value="Neuroscience">Neuroscience & Neurology</option>
                                                                    <option value="Psychopharmacology">Psychopharmacology</option>
                                                                    <option value="Public Health and Epidemiology">Public Health & Epidemiology</option>
                                                                    <option value="Nursing Research">Nursing Research</option>
                                                                    <option value="Other">Other (Specify)</option>
                                                                </select>
                                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 font-black text-[10px]">▼</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {(formData.researchType === 'Other' || formData.studyArea === 'Other') && (
                                                        <div className="p-10 bg-blue-950 rounded-[40px] shadow-xl space-y-6 animate-in slide-in-from-top-4 duration-500">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                {formData.researchType === 'Other' && (
                                                                    <div className="space-y-3">
                                                                        <label className="text-[9px] font-black text-blue-200/50 uppercase tracking-widest ml-1">Specify Research Type <span className="text-red-500 font-bold">*</span></label>
                                                                        <input required value={formData.customResearchType} onChange={e => setFormData({...formData, customResearchType: e.target.value})} className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-black text-xs focus:border-blue-400 outline-none" />
                                                                    </div>
                                                                )}
                                                                {formData.studyArea === 'Other' && (
                                                                    <div className="space-y-3">
                                                                        <label className="text-[9px] font-black text-blue-200/50 uppercase tracking-widest ml-1">Specify Study Area <span className="text-red-500 font-bold">*</span></label>
                                                                        <input required value={formData.customStudyArea} onChange={e => setFormData({...formData, customStudyArea: e.target.value})} className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-black text-xs focus:border-blue-400 outline-none" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                                        <div className="lg:col-span-12 space-y-2">
                                                            <label className="text-[11px] font-black text-blue-950 uppercase tracking-widest ml-1">Study Location <span className="text-red-500 font-bold">*</span></label>
                                                            <div className="relative">
                                                                <MapPinIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-950/50" />
                                                                <input required name="studyLocation" value={formData.studyLocation} onChange={handleInputChange} className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl font-black text-sm bg-white text-blue-950 focus:border-blue-950 hover:border-blue-200 shadow-sm transition-all" placeholder="e.g., AMSH / Addis Ababa Outpatient" />
                                                            </div>
                                                        </div>
                                                        <div className="lg:col-span-6 space-y-2">
                                                            <label className="text-[11px] font-black text-blue-950 uppercase tracking-widest ml-1">Start Date <span className="text-red-500 font-bold">*</span></label>
                                                            <input required type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl font-black text-sm bg-white text-blue-950 hover:border-blue-200 shadow-sm transition-all" />
                                                        </div>
                                                        <div className="lg:col-span-6 space-y-2">
                                                            <label className="text-[11px] font-black text-blue-950 uppercase tracking-widest ml-1">End Date <span className="text-red-500 font-bold">*</span></label>
                                                            <input required type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl font-black text-sm bg-white text-blue-950 hover:border-blue-200 shadow-sm transition-all" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* PHASE 3: DATA DETAIL */}
                                        {currentStep === 3 && (
                                            <div className="space-y-12 animate-in slide-in-from-right-10 duration-500">
                                                <div className="space-y-4 text-center mb-16">
                                                    <h3 className="text-4xl font-black text-blue-950 uppercase tracking-tighter leading-none">Data Collection Details</h3>
                                                    <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] opacity-60">Methodology & Compliance</p>
                                                </div>
                                                <div className="p-10 bg-blue-950 text-white rounded-[45px] shadow-2xl space-y-6 relative overflow-hidden group">
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000" />
                                                    <label className="flex items-center justify-between cursor-pointer relative z-10">
                                                        <div className="space-y-2">
                                                            <h4 className="text-2xl font-black tracking-tighter leading-none">Involve Human Patients?</h4>
                                                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] opacity-80">Requires strict ethical compliance letter</p>
                                                        </div>
                                                        <div className="relative">
                                                            <input type="checkbox" className="sr-only" checked={formData.patientsInvolved} onChange={handleInputChange} name="patientsInvolved" />
                                                            <div className={`w-16 h-8 rounded-full border-2 transition-all duration-300 ${formData.patientsInvolved ? 'bg-blue-600 border-blue-400' : 'bg-blue-900 border-blue-800'}`}>
                                                                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-xl transition-all duration-500 ${formData.patientsInvolved ? 'left-9' : 'left-1'}`} />
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-2">
                                                        <label className="text-[11px] font-black text-blue-950 uppercase tracking-widest ml-1">Participant Population <span className="text-red-500 font-bold">*</span></label>
                                                        <select required name="participantType" value={formData.participantType} onChange={handleInputChange} className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl font-black text-sm bg-white text-blue-950 appearance-none shadow-sm focus:border-blue-950 hover:border-blue-200 transition-all pr-12">
                                                            <option value="" disabled>Select Target Population</option>
                                                            <option value="Outpatients">Outpatients</option>
                                                            <option value="Inpatients">Inpatients</option>
                                                            <option value="Clinical Staff">Clinical Staff</option>
                                                            <option value="General Public">General Public / Community</option>
                                                            <option value="Caregivers">Caregivers / Relatives</option>
                                                            <option value="Students / Trainees">Students / Trainees</option>
                                                            <option value="Management">Management / Administration</option>
                                                            <option value="Vulnerable Populations">Vulnerable Populations (Minors, etc.)</option>
                                                            <option value="Medical Records">Medical Records / Archival Data</option>
                                                            <option value="Other">Other (Specify)</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[11px] font-black text-blue-950 uppercase tracking-widest ml-1">Collection Methodology <span className="text-red-500 font-bold">*</span></label>
                                                        <select required name="dataCollectionMethod" value={formData.dataCollectionMethod} onChange={handleInputChange} className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl font-black text-sm bg-white text-blue-950 appearance-none shadow-sm focus:border-blue-950 hover:border-blue-200 transition-all pr-12">
                                                            <option value="" disabled>Select Data Approach</option>
                                                            <option value="Structured Questionnaire">Structured Questionnaire</option>
                                                            <option value="Semi-Structured Interview">Semi-Structured Interview</option>
                                                            <option value="Focus Group">Focus Group Discussion</option>
                                                            <option value="Clinical Assessment">Clinical Assessment / Psychometric Tools</option>
                                                            <option value="Chart Review">Chart Review / Retrospective Extraction</option>
                                                            <option value="Biological Sampling">Biological Sampling (Blood, Saliva, etc.)</option>
                                                            <option value="Neurological Imaging">Neurological Imaging (EEG, MRI, etc.)</option>
                                                            <option value="Randomized Intervention">Randomized Intervention</option>
                                                            <option value="Ethnographic Observation">Ethnographic Observation</option>
                                                            <option value="Other">Other (Specify)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* PHASE 4: CO-INVESTIGATORS */}
                                        {currentStep === 4 && (
                                            <div className="space-y-12 animate-in slide-in-from-right-10 duration-500">
                                                <div className="space-y-4 text-center mb-16">
                                                    <h3 className="text-4xl font-black text-blue-950 uppercase tracking-tighter leading-none">Co-Investigators</h3>
                                                    <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] opacity-60">Team Personnel Listing</p>
                                                </div>
                                                <div className="flex items-center justify-between bg-blue-50/50 p-8 rounded-[40px] border border-blue-100">
                                                    <div className="flex-1">
                                                        <h3 className="text-2xl font-black text-blue-950 uppercase tracking-tighter">Research Team</h3>
                                                        <p className="text-[9px] font-black text-blue-400/60 uppercase tracking-[0.3em] mt-2">Personnel Roster</p>
                                                    </div>
                                                    <button type="button" onClick={addCoInvestigator} className="px-8 py-3 bg-blue-950 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                                                        + Add Member
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 gap-6">
                                                    {formData.coInvestigators.map((co, idx) => (
                                                        <div key={idx} className="p-8 bg-white border-2 border-gray-100 rounded-[35px] relative group/item flex flex-col md:flex-row gap-8 hover:border-blue-200 transition-all">
                                                            <div className="flex-1 space-y-3">
                                                                <label className="text-[11px] font-black text-blue-950 uppercase tracking-widest">Researcher Name <span className="text-red-500 font-bold">*</span></label>
                                                                <input required value={co.name} onChange={e => updateCoInvestigator(idx, 'name', e.target.value)} className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl font-black text-sm text-blue-950 focus:border-blue-950 hover:border-blue-200 outline-none transition-all shadow-sm" />
                                                            </div>
                                                            <div className="flex-1 space-y-3">
                                                                <label className="text-[11px] font-black text-blue-950 uppercase tracking-widest">Affiliation <span className="text-red-500 font-bold">*</span></label>
                                                                <input required value={co.institution} onChange={e => updateCoInvestigator(idx, 'institution', e.target.value)} className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl font-black text-sm text-blue-950 focus:border-blue-950 hover:border-blue-200 outline-none transition-all shadow-sm" />
                                                            </div>
                                                            <button type="button" onClick={() => removeCoInvestigator(idx)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold opacity-0 group-hover/item:opacity-100 transition-all shadow-xl">×</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* PHASE 5: DOCUMENTS */}
                                        {currentStep === 5 && (
                                            <div className="space-y-10 animate-in slide-in-from-right-10 duration-500">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                    {[
                                                        { label: 'Full Research Proposal', field: 'proposalPDF', max: '15MB', icon: DocumentTextIcon },
                                                        { label: 'Ethical Approval Letter', field: 'ethicalLetter', max: '5MB', icon: ShieldCheckIcon },
                                                        { label: 'University Supporting Letter', field: 'universityLetter', max: '5MB', icon: BuildingOfficeIcon },
                                                        { label: 'Additional Credentials', field: 'coInvestigatorFile', max: '5MB', icon: IdentificationIcon, optional: true }
                                                    ].map((doc) => (
                                                        <label key={doc.field} className={`p-8 border-2 rounded-[40px] flex flex-col items-center text-center cursor-pointer group transition-all ${formData[doc.field as keyof typeof formData] ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-100' : 'bg-gray-50 border-dashed border-gray-200 hover:border-blue-950 hover:bg-white'}`}>
                                                            <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center mb-6 transition-all duration-700 ${formData[doc.field as keyof typeof formData] ? 'bg-emerald-500 text-white rotate-12' : 'bg-white text-gray-200 group-hover:text-blue-950 shadow-md'}`}>
                                                                <doc.icon className="w-8 h-8" />
                                                            </div>
                                                            <h4 className="text-[11px] font-black text-blue-950 uppercase tracking-widest mb-1 leading-none">{doc.label}</h4>
                                                            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest opacity-60">Max {doc.max} {doc.optional ? '• Optional' : ''}</p>
                                                            {formData[doc.field as keyof typeof formData] && <p className="mt-4 text-[9px] font-black text-emerald-600 bg-white px-4 py-1.5 rounded-full border-2 border-emerald-200 tracking-widest uppercase shadow-sm">Uploaded</p>}
                                                            <input required={!doc.optional} type="file" accept=".pdf" className="hidden" onChange={e => handleFileChange(e, doc.field)} />
                                                        </label>
                                                    ))}
                                                </div>

                                                <div className="pt-8 border-t-2 border-gray-100 border-dashed">
                                                    <label className="flex items-start gap-6 cursor-pointer p-8 bg-blue-950 text-white rounded-[40px] shadow-3xl relative overflow-hidden group">
                                                        <div className="absolute inset-0 bg-blue-900 translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />
                                                        <div className="relative z-10 flex items-center mt-1">
                                                            <input required type="checkbox" className="w-8 h-8 border-4 border-white/20 rounded-[14px] checked:bg-blue-600 appearance-none cursor-pointer shadow-lg" checked={formData.declaration} onChange={handleInputChange} name="declaration" />
                                                            {formData.declaration && <CheckBadgeIcon className="absolute inset-0 w-8 h-8 text-white p-2 pointer-events-none" />}
                                                        </div>
                                                        <div className="relative z-10">
                                                            <h4 className="text-lg font-black leading-none">Ethical Declaration</h4>
                                                            <span className="block text-[11px] font-bold text-blue-200/70 leading-relaxed group-hover:text-white transition-all">
                                                                I confirm that the protocol follows AMSH IRB guidelines and accept full ethical responsibility.
                                                            </span>
                                                        </div>
                                                    </label>
                                                </div>

                                                <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-blue-950 text-white rounded-[3rem] font-black uppercase tracking-[0.5em] text-[11px] hover:scale-[1.02] active:scale-95 transition-all shadow-3xl shadow-blue-900/40 disabled:opacity-50">
                                                    {isSubmitting ? 'Validating...' : 'Submit Proposal Application'}
                                                </button>
                                            </div>
                                        )}

                                        {/* Navigation Control Center - SLIGHTLY SMALLER */}
                                        <div className="flex items-center justify-between pt-12 border-t border-gray-100">
                                            {currentStep > 1 && (
                                                <button 
                                                    type="button" 
                                                    onClick={() => setCurrentStep(prev => prev - 1)} 
                                                    className="px-10 py-5 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-gray-200 hover:text-blue-950 transition-all flex items-center gap-3 group"
                                                >
                                                    <ChevronLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                                    Previous Phase
                                                </button>
                                            )}
                                            {currentStep < 5 && (
                                                <button 
                                                    type="submit" 
                                                    className="ml-auto px-12 py-5 bg-blue-950 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/20 flex items-center gap-3 group"
                                                >
                                                    Step {currentStep + 1}: {steps[currentStep].name}
                                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function ArrowRightIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
    );
}
