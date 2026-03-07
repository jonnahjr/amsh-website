'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import {
    BeakerIcon,
    BookOpenIcon,
    AcademicCapIcon,
    CloudArrowUpIcon,
    ArrowDownTrayIcon,
    UserIcon,
    BuildingOfficeIcon,
    EnvelopeIcon,
    CheckBadgeIcon,
    ShieldCheckIcon,
    DocumentTextIcon,
    InformationCircleIcon,

} from '@heroicons/react/24/outline';

const PUBLISHED_RESEARCH = [
    {
        id: '1',
        title: 'Mental Health Stigma in Sub-Saharan Africa: A Systematic Review',
        authors: 'Zelalem G., et al.',
        year: '2023',
        journal: 'Ethiopian Medical Journal',
        pdfUrl: '/documents/sample-research.pdf',
    },
    {
        id: '2',
        title: 'Prevalence of Depression Among Postpartum Women in Addis Ababa',
        authors: 'Hana W., Bekele A.',
        year: '2024',
        journal: 'Journal of Psychiatry & Neuroscience',
        pdfUrl: '/documents/sample-research.pdf',
    },
    {
        id: '3',
        title: 'Assessment of Treatment Outcomes in Chronic Schizophrenia Patients',
        authors: 'Mulugeta T., Solomon D.',
        year: '2022',
        journal: 'African Journal of Psychiatry',
        pdfUrl: '/documents/sample-research.pdf',
    },
];

export default function ResearchPage() {

    const [formData, setFormData] = useState({
        fullName: '',
        institution: '',
        email: '',
        researchTitle: '',
        abstract: '',
        declaration: false,
    });

    const filteredResearch = PUBLISHED_RESEARCH;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        alert('Research manuscript submitted! Our institutional review board (IRB) will review your submission.');
    };

    return (
        <div className="min-h-screen bg-white">
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
                {/* Decorative Blue Orbs */}
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                <div className="container-custom relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-6 animate-fade-in">
                            Innovation & Science
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter animate-fade-in-up">
                            Advancing <span className="text-gray-400 italic">Psychiatric</span> <br />
                            Knowledge Excellence
                        </h1>
                        <p className="text-xl text-blue-100/70 max-w-2xl mx-auto font-medium leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            EMSH is a leading center for neuropsychiatric research, conducting high-impact
                            studies that shape mental health policy and clinical practice across Ethiopia.
                        </p>
                    </div>
                </div>
            </section>

            {/* Published Research Section */}
            <section className="py-24 bg-gray-50/50">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div>
                            <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-3 block">Research Database</span>
                            <h2 className="text-4xl font-black text-blue-950 tracking-tight">Published Research</h2>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResearch.map((paper) => (
                            <div key={paper.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-6 group hover:shadow-xl transition-all duration-500 text-center">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex flex-col items-center justify-center text-blue-900 group-hover:scale-110 transition-transform">
                                    <span className="text-lg font-black">{paper.year}</span>
                                    <span className="text-[10px] font-black uppercase opacity-60">Year</span>
                                </div>

                                <div className="flex-1 flex flex-col items-center">
                                    <h3 className="text-lg lg:text-xl font-black text-blue-950 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
                                        {paper.title}
                                    </h3>
                                    <div className="flex flex-col gap-3 text-sm font-bold text-gray-400 w-full">
                                        <div className="flex items-center justify-center gap-2">
                                            <UserIcon className="w-4 h-4 text-blue-900 flex-shrink-0" />
                                            <span>{paper.authors}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <BookOpenIcon className="w-4 h-4 text-blue-900 flex-shrink-0" />
                                            <span className="italic">{paper.journal}</span>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href={paper.pdfUrl}
                                    download={`${paper.title.substring(0, 20)}.pdf`}
                                    className="w-full justify-center px-8 py-4 bg-gray-50 text-blue-900 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-900 hover:text-white transition-all shadow-sm mt-auto"
                                >
                                    <ArrowDownTrayIcon className="w-4 h-4" />
                                    Download PDF
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Submit Research Form Section */}
            <section id="submit" className="py-24 border-t border-gray-100">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div>
                            <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-4 block">Author Portal</span>
                            <h2 className="text-4xl font-black text-blue-950 mb-8 tracking-tight">Submit Your Research</h2>
                            <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                We welcome submissions from independent researchers, academic institutions, and medical professionals.
                                EMSH provides a platform for disseminating high-quality neuropsychiatric findings to the broader clinical community.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
                                    <ShieldCheckIcon className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-black text-blue-950 mb-1">Institutional Review Board (IRB)</h4>
                                        <p className="text-sm text-gray-500 font-medium">All research submissions will undergo institutional review before publication to ensure ethical compliance and scientific rigor.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-cyan-50/50 rounded-3xl border border-cyan-100">
                                    <InformationCircleIcon className="w-8 h-8 text-cyan-600 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-black text-blue-950 mb-1">Published Guidelines</h4>
                                        <p className="text-sm text-gray-500 font-medium">Manuscripts must follow the hospital's standard formatting guidelines and include a detailed abstract and methodology section.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[40px] p-8 lg:p-12 border border-gray-100 shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" placeholder="Researcher Name" className="w-full pl-11 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Institution</label>
                                        <div className="relative">
                                            <BuildingOfficeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            <input required name="institution" value={formData.institution} onChange={handleInputChange} type="text" placeholder="University / Hospital" className="w-full pl-11 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div className="col-span-full space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <div className="relative">
                                            <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="example@research.et" className="w-full pl-11 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div className="col-span-full space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Research Title</label>
                                        <input required name="researchTitle" value={formData.researchTitle} onChange={handleInputChange} type="text" placeholder="The full title of your manuscript" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                    </div>
                                    <div className="col-span-full space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Abstract</label>
                                        <textarea required name="abstract" value={formData.abstract} onChange={handleInputChange} rows={5} placeholder="Brief summary of research findings (Max 300 words)" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="p-6 bg-gray-50 border border-dashed border-gray-200 rounded-3xl text-center group hover:bg-blue-50 transition-colors cursor-pointer">
                                        <DocumentTextIcon className="w-10 h-10 text-gray-300 mx-auto mb-3 group-hover:text-blue-900" />
                                        <h4 className="text-xs font-black text-blue-950 mb-1">Upload Manuscript</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">PDF format only</p>
                                        <input required type="file" className="hidden" />
                                    </label>
                                    <label className="p-6 bg-gray-50 border border-dashed border-gray-200 rounded-3xl text-center group hover:bg-blue-50 transition-colors cursor-pointer">
                                        <ShieldCheckIcon className="w-10 h-10 text-gray-300 mx-auto mb-3 group-hover:text-blue-900" />
                                        <h4 className="text-xs font-black text-blue-950 mb-1">Ethics Clearance</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Signed approval document</p>
                                        <input required type="file" className="hidden" />
                                    </label>
                                </div>

                                <div className="pt-4">
                                    <label className="flex items-start gap-4 cursor-pointer group">
                                        <div className="relative flex items-center mt-1">
                                            <input required name="declaration" checked={formData.declaration} onChange={handleInputChange} type="checkbox" className="w-6 h-6 border-2 border-gray-200 rounded-lg checked:bg-blue-900 transition-all appearance-none cursor-pointer" />
                                            {formData.declaration && <CheckBadgeIcon className="absolute inset-0 w-6 h-6 text-white p-1 pointer-events-none" />}
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                                            I hereby declare that this research is my original work, has not been published elsewhere,
                                            and follows all ethical guidelines for psychiatric studies involving human participants.
                                        </span>
                                    </label>
                                </div>

                                <button type="submit" className="w-full py-5 bg-blue-950 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-900 hover:-translate-y-1 transition-all shadow-xl shadow-blue-950/20">
                                    Submit Research Proposal
                                </button>
                                <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest italic">
                                    "All research submissions will undergo institutional review before publication."
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <ChatbotButton />
        </div>
    );
}
