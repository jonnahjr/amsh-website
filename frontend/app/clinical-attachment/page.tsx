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
} from '@heroicons/react/24/outline';

export default function ClinicalAttachmentPage() {
    const [category, setCategory] = useState<'GOVERNMENT' | 'PRIVATE' | null>(null);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
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

    const openApplyModal = (cat: 'GOVERNMENT' | 'PRIVATE') => {
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
        alert('Clinical attachment application submitted! We will contact the institution shortly.');
        setIsApplyModalOpen(false);
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Government Institutions */}
                        <div className="bg-white rounded-[40px] p-10 lg:p-16 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                            <div className="w-20 h-20 bg-blue-50 rounded-[24px] flex items-center justify-center text-blue-900 mb-8 group-hover:scale-110 transition-transform">
                                <BuildingLibraryIcon className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black text-blue-950 mb-4">Government Institutions</h2>
                            <p className="text-emerald-600 font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                                <CheckBadgeIcon className="w-5 h-5" /> Free Clinical Attachment
                            </p>
                            <p className="text-gray-500 font-medium leading-relaxed mb-10">
                                Official partnership for public universities and government-run health colleges.
                                Requires structured institutional formal request.
                            </p>

                            <div className="space-y-4 mb-10">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Required Documents</h4>
                                <ul className="space-y-3">
                                    {[
                                        "Official government request letter",
                                        "Detailed training objectives",
                                        "Validated list of students",
                                        "Copy of institutional training permit"
                                    ].map((doc, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                                            {doc}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => openApplyModal('GOVERNMENT')}
                                className="w-full py-5 bg-blue-950 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/10"
                            >
                                Apply for Government Institution
                            </button>
                        </div>

                        {/* Private Colleges & Universities */}
                        <div className="bg-white rounded-[40px] p-10 lg:p-16 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                            <div className="w-20 h-20 bg-cyan-50 rounded-[24px] flex items-center justify-center text-cyan-600 mb-8 group-hover:scale-110 transition-transform">
                                <AcademicCapIcon className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black text-blue-950 mb-4">Colleges & Universities</h2>
                            <p className="text-amber-600 font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                                <BanknotesIcon className="w-5 h-5" /> Paid Clinical Attachment
                            </p>
                            <p className="text-gray-500 font-medium leading-relaxed mb-10">
                                Specialized training access for private higher education institutions.
                                Subject to availability and standard hospital training fees.
                            </p>

                            <div className="space-y-4 mb-10">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Required Documents</h4>
                                <ul className="space-y-3">
                                    {[
                                        "Official institutional request letter",
                                        "Complete student list with IDs",
                                        "Attachment application form",
                                        "Official payment confirmation"
                                    ].map((doc, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                            {doc}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => openApplyModal('PRIVATE')}
                                className="w-full py-5 border-2 border-blue-950 text-blue-950 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all"
                            >
                                Apply for Private College
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Modal */}
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
                                <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">Attachment Portal</span>
                                <h2 className="text-4xl font-black text-blue-950 mb-2">Institutional Application</h2>
                                <p className="text-gray-500 font-medium">Category: <span className="text-blue-900 font-black">{category === 'GOVERNMENT' ? 'Government Institution' : 'Private College/University'}</span></p>

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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">University / College Name</label>
                                        <input required name="institutionName" value={formData.institutionName} onChange={handleInputChange} type="text" placeholder="Official Name" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Clinical Department</label>
                                        <input required name="departmentName" value={formData.departmentName} onChange={handleInputChange} type="text" placeholder="e.g. Psychiatry, Nursing" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Profession Type</label>
                                        <input required name="profession" value={formData.profession} onChange={handleInputChange} type="text" placeholder="e.g. Clinical Nurse, Psychiatrist" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Number of Students</label>
                                        <div className="relative">
                                            <UserGroupIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                            <input required name="studentCount" value={formData.studentCount} onChange={handleInputChange} type="number" placeholder="Total Students" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Duration of Attachment</label>
                                        <input required name="durationValue" value={formData.durationValue} onChange={handleInputChange} type="text" placeholder="e.g. 2 Months" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Planned Start Date</label>
                                        <div className="relative">
                                            <CalendarDaysIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                            <input required name="startDate" value={formData.startDate} onChange={handleInputChange} type="date" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Contact Person</label>
                                        <input required name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                        <div className="relative">
                                            <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                            <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} type="tel" placeholder="+251 ..." className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>
                                    </div>
                                    <div className="col-span-full space-y-4">
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <div className="relative">
                                            <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                            <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="example@edu.et" className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <label className="p-6 bg-gray-50 border border-dashed border-gray-200 rounded-[32px] text-center group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                                        <DocumentTextIcon className="w-10 h-10 text-gray-300 mx-auto mb-3 group-hover:text-blue-900" />
                                        <h4 className="text-xs font-black text-gray-900 mb-1">Official Letter</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">PDF format</p>
                                        <input required type="file" className="hidden" />
                                    </label>
                                    <label className="p-6 bg-gray-50 border border-dashed border-gray-200 rounded-[32px] text-center group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                                        <UserGroupIcon className="w-10 h-10 text-gray-300 mx-auto mb-3 group-hover:text-blue-900" />
                                        <h4 className="text-xs font-black text-gray-900 mb-1">Student List</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Excel / PDF</p>
                                        <input required type="file" className="hidden" />
                                    </label>
                                    {category === 'PRIVATE' ? (
                                        <label className="p-6 bg-gray-50 border border-dashed border-gray-200 rounded-[32px] text-center group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                                            <BanknotesIcon className="w-10 h-10 text-gray-300 mx-auto mb-3 group-hover:text-blue-900" />
                                            <h4 className="text-xs font-black text-gray-900 mb-1">Payment Proof</h4>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Bank Slip / Transfer</p>
                                            <input required type="file" className="hidden" />
                                        </label>
                                    ) : (
                                        <label className="p-6 bg-gray-50 border border-dashed border-gray-200 rounded-[32px] text-center group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                                            <CloudArrowUpIcon className="w-10 h-10 text-gray-300 mx-auto mb-3 group-hover:text-blue-900" />
                                            <h4 className="text-xs font-black text-gray-900 mb-1">Other Attachment</h4>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Optional</p>
                                            <input type="file" className="hidden" />
                                        </label>
                                    )}
                                </div>

                                <div className="pt-6">
                                    <label className="flex items-start gap-4 cursor-pointer group">
                                        <div className="relative flex items-center mt-1">
                                            <input required name="agreement" checked={formData.agreement} onChange={handleInputChange} type="checkbox" className="w-6 h-6 border-2 border-gray-200 rounded-lg checked:bg-blue-900 transition-all appearance-none cursor-pointer" />
                                            {formData.agreement && <CheckBadgeIcon className="absolute inset-0 w-6 h-6 text-white p-1 pointer-events-none" />}
                                        </div>
                                        <span className="text-sm font-bold text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                                            We hereby confirm that the students listed will strictly follow the hospital's clinical
                                            protocols and ethical guidelines for neuropsychiatric care.
                                        </span>
                                    </label>
                                </div>

                                <button type="submit" className="w-full py-6 bg-blue-950 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/20 hover:-translate-y-1">
                                    Finalize institutional Application
                                </button>
                            </form>
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
        </div>
    );
}
