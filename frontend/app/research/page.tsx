
'use client';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { researchAPI, settingsAPI, resolveImageUrl } from '@/lib/api';
import {
    ArrowDownTrayIcon,
    ArrowPathIcon,
    ArrowRightIcon,
    BookOpenIcon,
    CheckBadgeIcon,
    IdentificationIcon,
    EnvelopeIcon,
    InformationCircleIcon,
    MagnifyingGlassIcon,
    PhoneIcon,
    ShieldCheckIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const getSafeDocUrl = (url: string | null) => {
    return resolveImageUrl(url);
};

export default function ResearchPage() {
    const [staff, setStaff] = useState<any[]>([]);
    const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
    const [trackingId, setTrackingId] = useState('');
    const [trackingData, setTrackingData] = useState<any>(null);
    const [isTracking, setIsTracking] = useState(false);
    const [publishedList, setPublishedList] = useState<any[]>([]);

    const parseKeywords = (keywords: any) => {
        if (!keywords) return ["Research", "Institutional"];
        if (Array.isArray(keywords)) return keywords;
        if (typeof keywords === 'string') {
            try {
                const parsed = JSON.parse(keywords);
                if (Array.isArray(parsed)) return parsed;
            } catch (e) {}
            return keywords.split(',').map(k => k.trim()).filter(Boolean);
        }
        return ["Research", "Institutional"];
    };

    const getSafeAbstract = (abstract: string | null) => {
        if (!abstract) return 'Institutional research summary pending final review.';
        try {
            const parsed = JSON.parse(abstract);
            if (typeof parsed === 'object' && parsed.text) return parsed.text;
            if (typeof parsed === 'string') return parsed;
        } catch (e) {}
        return abstract;
    };

    useEffect(() => {
        settingsAPI.getAll().then(res => {
            if (res.data.settings?.staff_directory) {
                try {
                    let rawDir = res.data.settings.staff_directory;
                    // Robust JSON handling: clear potential trailing commas or minor syntax issues
                    // Also replace single quotes with double quotes if they were accidentally used
                    if (typeof rawDir === 'string') {
                        rawDir = rawDir.trim();
                        if (rawDir.startsWith("'") || rawDir.includes("':")) {
                            rawDir = rawDir.replace(/'/g, '"');
                        }
                        // Remove trailing commas before closing braces/brackets
                        rawDir = rawDir.replace(/,(\s*[\]}])/g, '$1');
                    }
                    const dir = JSON.parse(rawDir);
                    setStaff(Array.isArray(dir) ? dir : []);
                } catch (e) {
                    console.error('Failed to parse staff directory:', e);
                    setStaff([]); // Fallback to empty array to allow component to use default Team constant
                }
            }
        }).catch(err => console.error('Failed to load staff settings:', err));

        researchAPI.getPublished().then(res => {
            if (res.data.research) {
                setPublishedList(res.data.research);
            }
        }).catch(err => console.error('Failed to load published research:', err));
    }, []);

    const researchTeam = [
        { id: 'zegeye', name: "Mr. Zegeye Yohannis", role: "CPD, Clinical Training and Research Director", phone: "+251 91 330 7290", image: "/assets/research/mr_zegeye_yohannis_headshot_1775135176650.png" },
        { id: 'habtamu', name: "Mr. Habtamu Derajaw", role: "Research & Clinical Training Desk Head", phone: "", image: "/assets/research/mr_habtamu_derajaw_headshot_1775135205786.png" },
        { id: 'azmera', name: "Mrs. Azmera Hadush", role: "CPD Desk Head", phone: "+251 91 216 0130", image: "" },
        { id: 'zebiba', name: "Mrs. Zebiba Nassir", role: "CPD Officer", phone: "+251 93 208 2657", image: "" },
        { id: 'mensur', name: "Mr. Mensur Nesru", role: "Research Officer", phone: "", image: "/assets/research/mr_mensur_nesru_headshot_1775135244113.png" }
    ];

    const handleTrack = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!trackingId) return;
        // Strip accidental 'ID: ' prefix (user may copy-paste from card label)
        const cleanId = trackingId.replace(/^id[:\s]+/i, '').trim();
        setIsTracking(true);
        try {
            const res = await researchAPI.track(encodeURIComponent(cleanId));
            setTrackingData(res.data.research);
        } catch (err) {
            console.error('Tracking error:', err);
            alert('Submission ID not found. Please enter only the ID, e.g. AMSH-RES-2026-0008');
            setTrackingData(null);
        } finally {
            setIsTracking(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCF9] font-sans selection:bg-blue-950 selection:text-white">
            <EmergencyBanner />
            <Navbar />



            <main>
                {/* Hero Section */}
                <section className="relative min-h-screen overflow-hidden bg-blue-950 flex items-center">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                    </div>

                    {/* Decorative Blue Orbs */}
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                    <div className="container-custom relative z-10 py-32">
                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter animate-fade-in-up">
                                Institutional <br />
                                <span className="text-blue-400 italic">Research</span> Portal
                            </h1>
                            <p className="text-xl text-blue-100/70 max-w-2xl font-medium leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                AMSH provides a centralized gateway for neuropsychiatric, medical, and clinical research discovery — serving the global health community with rigorous institutional research standards, evidence-based practice, and scholarly integrity.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Research Desk & Portal Selection Section */}
                <section id="portal" className="py-16 bg-gray-50/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent" />

                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mb-16">
                            <div className="lg:col-span-7">
                                <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-3 block">Institutional Support</span>
                                <h2 className="text-4xl font-black text-blue-950 mb-4 tracking-tight">The Research Desk</h2>
                                <p className="text-lg text-gray-500 leading-relaxed font-medium mb-8">
                                    Providing comprehensive support for research activities, ensuring scientific excellence and ethical integrity within mental health services. Our dedicated framework is designed to accelerate psychiatric discovery and address critical global mental health priorities through rigorous clinical oversight.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        { title: "Ethical Approval", desc: "Facilitates ethical approval for undergraduate and postgraduate research, including PhD studies.", tag: "Protocol: Graduate Support" },
                                        { title: "Clinical Trials", desc: "Supports review and ethical approval for clinical trials and related psychiatric research projects.", tag: "Registry: Clinical Registry" },
                                    ].map((item, i) => (
                                        <div key={i} className="content-box-premium group p-8 rounded-[40px] flex flex-col bg-white hover:-translate-y-2 transition-all border border-gray-50 shadow-xl hover:shadow-2xl">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-950 group-hover:text-white transition-all shadow-inner">
                                                    <ShieldCheckIcon className="w-8 h-8" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{item.tag}</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-blue-950 mb-4 transition-colors leading-tight">{item.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">{item.desc}</p>
                                            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between group/btn">
                                                <span className="text-[10px] font-black text-blue-950 uppercase tracking-[0.2em]">Learn More</span>
                                                <ArrowRightIcon className="w-4 h-4 text-blue-200 group-hover/btn:translate-x-2 transition-transform" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-5 bg-blue-950 rounded-[60px] p-16 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(30,58,138,0.3)] group">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full -mr-48 -mt-48 blur-[100px] pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full -ml-40 -mb-40 blur-[100px] pointer-events-none" />

                                <div className="relative z-10">
                                    <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-3 block">Institutional Hub</span>
                                    <h3 className="text-3xl font-black mb-8">A Hub for Scientific Discovery</h3>
                                    <p className="text-blue-100/80 mb-10 leading-relaxed font-medium">
                                        We provide a structured environment for researchers to explore the complexities of the human mind while adhering to the highest international standards of medical ethics.
                                    </p>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-8 bg-white/5 rounded-[35px] border border-white/10 backdrop-blur-xl group hover:bg-white/10 transition-all text-center">
                                            <div className="text-4xl font-black text-cyan-400 mb-2 tracking-tighter">80+</div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/60">Active Studies</div>
                                        </div>
                                        <div className="p-8 bg-white/5 rounded-[35px] border border-white/10 backdrop-blur-xl group hover:bg-white/10 transition-all text-center">
                                            <div className="text-4xl font-black text-white mb-2 tracking-tighter">50+</div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/60">Partner Institutions</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NEW MANAGEMENT HUB LAYOUT - Frameless & Integrated */}
                        <div className="pt-32 pb-10 border-t border-gray-100/50 mt-10">
                            <div className="text-center mb-16 max-w-4xl mx-auto">
                                <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-4 block">Institutional Research Administration</span>
                                <h2 className="text-4xl font-black text-blue-950 mb-6 tracking-tight">Protocol & Research Management</h2>
                                <p className="text-lg text-gray-500 leading-relaxed font-medium mb-12 max-w-2xl mx-auto">
                                    Facilitating operational excellence through streamlined clinical submission protocols and institutional tracking.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pb-16">
                                {/* Proposal Link Card - HIGH VIBE */}
                                <Link
                                    href="/research/apply"
                                    className="group relative bg-blue-950 rounded-[45px] overflow-hidden p-10 flex flex-col transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(30,58,138,0.7)] border border-white/5 hover:border-blue-500/30 hover:-translate-y-3"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[80px] translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000 -z-10" />

                                    <div className="flex flex-wrap gap-2.5 mb-8">
                                        <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-blue-400 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm group-hover:bg-blue-500/20 group-hover:text-white transition-colors backdrop-blur-md">Digital Submission</span>
                                        <span className="px-4 py-1.5 bg-white/5 border border-cyan-500/20 text-cyan-400 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm group-hover:bg-cyan-500/20 group-hover:text-white transition-colors backdrop-blur-md">Ethics Review</span>
                                    </div>

                                    <h3 className="text-3xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors leading-tight tracking-tight uppercase">
                                        Standardized Protocol
                                    </h3>
                                    <p className="text-blue-100/60 text-sm leading-relaxed mb-10 italic font-medium">
                                        "Comprehensive digital submission framework ensuring scientific excellence and clinical compliance for all research protocols."
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-10 p-6 bg-white/5 rounded-[32px] border border-white/10 group-hover:bg-white/10 group-hover:border-blue-500/20 transition-all duration-500 backdrop-blur-md">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Review Cycle</span>
                                            <span className="text-[11px] font-black text-cyan-400">Accredited IRB</span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Target</span>
                                            <span className="text-[11px] font-black text-white">All Investigators</span>
                                        </div>
                                        <div className="flex flex-col gap-1.5 col-span-2 pt-4 border-t border-white/10">
                                            <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Verification: Live Institutional Synchronization</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-center">
                                        <div className="relative overflow-hidden bg-white text-blue-950 px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-cyan-400 hover:text-white transition-all duration-500 shadow-3xl group-hover:scale-[1.03] active:scale-95 inline-flex items-center gap-3 justify-center w-full">
                                            Submit Proposal
                                            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>

                                {/* Publish Link Card - HIGH VIBE */}
                                <Link
                                    href="/research/publish"
                                    className="group relative bg-blue-950 rounded-[45px] overflow-hidden p-10 flex flex-col transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(16,185,129,0.3)] border border-white/5 hover:border-emerald-500/30 hover:-translate-y-3"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[80px] translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-400/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000 -z-10" />

                                    <div className="flex flex-wrap gap-2.5 mb-8">
                                        <span className="px-4 py-1.5 bg-white/5 border border-emerald-500/20 text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm group-hover:bg-emerald-500/20 group-hover:text-white transition-colors backdrop-blur-md">Manuscript Archive</span>
                                        <span className="px-4 py-1.5 bg-white/5 border border-cyan-500/20 text-cyan-400 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm group-hover:bg-cyan-500/20 group-hover:text-white transition-colors backdrop-blur-md">Peer-Reviewed</span>
                                    </div>

                                    <h3 className="text-3xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors leading-tight tracking-tight uppercase">
                                        Institutional Archiving
                                    </h3>
                                    <p className="text-blue-100/60 text-sm leading-relaxed mb-10 italic font-medium">
                                        "Secure institutional registry for finalized manuscripts, ensuring global visibility and scholarly preservation for psychiatric discoveries."
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-10 p-6 bg-white/5 rounded-[32px] border border-white/10 group-hover:bg-white/10 group-hover:border-emerald-500/20 transition-all duration-500 backdrop-blur-md">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Entry Type</span>
                                            <span className="text-[11px] font-black text-emerald-400">Peer-Reviewed</span>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Target</span>
                                            <span className="text-[11px] font-black text-white">Published Faculty</span>
                                        </div>
                                        <div className="flex flex-col gap-1.5 col-span-2 pt-4 border-t border-white/10">
                                            <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Archiving: Permanent Scholarly Registry</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-center">
                                        <div className="relative overflow-hidden bg-white text-blue-950 px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all duration-500 shadow-3xl group-hover:scale-[1.03] active:scale-95 inline-flex items-center gap-3 justify-center w-full">
                                            Submit Research
                                            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Tracker UI */}
                            <div className="max-w-3xl mx-auto pb-16 relative z-10 px-4 md:px-0">
                                <div className="bg-white rounded-[32px] p-10 md:p-12 border-2 border-gray-100 shadow-[0_30px_60px_-15px_rgba(30,58,138,0.05)] hover:border-blue-200 transition-all flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-3 block">Digital Tracking Unit</span>
                                    <h3 className="text-3xl font-black text-blue-950 mb-4 tracking-tighter">
                                        Monitor Your Submitted Proposal
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-10 font-medium max-w-lg mx-auto">
                                        Track your clinical protocol status and institutional review cycle progress in real-time.
                                    </p>
                                    <form onSubmit={handleTrack} className="flex w-full max-w-lg relative group/input">
                                        <input
                                            type="text"
                                            placeholder="AMSH-RES-202X-XXXX"
                                            value={trackingId}
                                            onChange={e => setTrackingId(e.target.value)}
                                            className="w-full pl-8 pr-36 py-5 border-2 border-gray-200 rounded-[28px] font-black text-sm text-blue-950 bg-white hover:border-blue-300 focus:border-blue-950 transition-all outline-none shadow-sm placeholder:text-gray-300"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isTracking || !trackingId.trim()}
                                            className="absolute right-2 top-2 bottom-2 px-8 bg-blue-950 text-white rounded-[20px] font-black uppercase tracking-widest text-[10px] hover:bg-blue-900 active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isTracking ? (
                                                <span className="flex items-center gap-2"><ArrowPathIcon className="w-4 h-4 animate-spin" /> Scanning...</span>
                                            ) : 'Analyze'}
                                        </button>
                                    </form>

                                    {/* Tracking Result */}
                                    {trackingData && (
                                        <div className="w-full max-w-lg mt-6 text-left border-2 border-blue-100 rounded-[24px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div className="bg-blue-950 px-6 py-4 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1">Tracking Result</p>
                                                    <p className="text-white font-mono text-xs font-black">{trackingData.submissionId}</p>
                                                </div>
                                                <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${trackingData.status === 'APPROVED' ? 'bg-emerald-500 text-white border-emerald-400' :
                                                        trackingData.status === 'UNDER_REVIEW' ? 'bg-blue-500 text-white border-blue-400' :
                                                            trackingData.status === 'REJECTED' ? 'bg-red-500 text-white border-red-400' :
                                                                trackingData.status === 'PUBLISHED' ? 'bg-purple-500 text-white border-purple-400' :
                                                                    'bg-amber-400 text-amber-900 border-amber-300'
                                                    }`}>
                                                    {trackingData.status?.replace('_', ' ') || 'Pending Review'}
                                                </div>
                                            </div>
                                            <div className="p-6 bg-white space-y-4">
                                                <h4 className="font-black text-blue-950 text-sm leading-snug line-clamp-2">{trackingData.title}</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Principal Investigator</p>
                                                        <p className="text-xs font-bold text-slate-700 mt-0.5">{trackingData.investigatorName || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Submitted On</p>
                                                        <p className="text-xs font-bold text-slate-700 mt-0.5">{new Date(trackingData.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Research Type</p>
                                                        <p className="text-xs font-bold text-slate-700 mt-0.5">{trackingData.researchType || 'Clinical Protocol'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Institution</p>
                                                        <p className="text-xs font-bold text-slate-700 mt-0.5">{trackingData.institution || 'AMSH'}</p>
                                                    </div>
                                                </div>
                                                {trackingData.reviewerComments && (
                                                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                                        <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1">IRB Committee Feedback</p>
                                                        <p className="text-xs text-slate-600 font-medium">{trackingData.reviewerComments}</p>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => { setTrackingData(null); setTrackingId(''); }}
                                                    className="w-full py-3 bg-slate-50 text-slate-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all mt-2"
                                                >
                                                    Clear Result
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Published Research Archive */}
                <section className="py-16 bg-gray-50/50">
                    <div className="container-custom">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 animate-fade-in-up">
                            <div className="relative">
                                <div className="mb-8">
                                    <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-3 block">Institutional Repository</span>
                                </div>
                                <h2 className="text-4xl font-black text-blue-950 tracking-tight">
                                    Research Archive
                                </h2>
                            </div>
                            <div className="hidden lg:block h-px flex-1 max-w-sm mb-6 mx-16" />
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-black text-blue-950 uppercase tracking-widest mb-3">Academic Directory</span>
                                <div className="flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-2xl border border-blue-100">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                    <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Active: {publishedList.length || 3} Volumes</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {publishedList.length === 0 ? (
                                // FALLBACK PAPERS PROVIDED BY USER
                                [
                                    {
                                        id: 'p1',
                                        title: "Magnitude of Substance Induced Psychosis among Adolescents in Amanuel Mental Specialized Hospital Addis Ababa Ethiopia",
                                        year: "2022",
                                        publicationDate: "May 12, 2022",
                                        volume: "12",
                                        issue: "2",
                                        authors: "Abdisa Boka, Mergitu Alemu, Asnake Fantu",
                                        journal: "BMC Psychiatry",
                                        researchType: "Cross-sectional",
                                        studyArea: "Psychiatry",
                                        studyLocation: "AMSH, Addis Ababa",
                                        doi: "10.1186/s12888-022-03912-x",
                                        abstract: "A cross-sectional study conducted at AMSH to determine the magnitude and factors associated with substance-induced psychosis among adolescents. Finding high prevalence rates requiring immediate intervention.",
                                        findingsSummary: "The study revealed a high prevalence of substance-induced psychosis (15.4%) among adolescent outpatients. Key risk factors include early onset of drug use and lack of family support.",
                                        clinicalRelevance: "Requires immediate intervention and policy focus on adolescent substance abuse within specialized mental health frameworks.",
                                        keywords: ["Psychosis", "Adolescents", "Mental Health"],
                                        fileSize: "2.3MB"
                                    },
                                    {
                                        id: 'p2',
                                        title: "Depression and associated factors among primary caregivers of children and adolescents with mental illness in Addis Ababa, Ethiopia",
                                        year: "2019",
                                        publicationDate: "November 20, 2019",
                                        volume: "7",
                                        issue: "4",
                                        authors: "Habtamu Derajaw, Mensur Nesru",
                                        journal: "Journal of Affective Disorders",
                                        researchType: "Analytical Survey",
                                        studyArea: "Clinical Psychology",
                                        studyLocation: "AMSH, Pediatrics Unit",
                                        doi: "10.1016/j.jad.2019.08.012",
                                        abstract: "Investigating the burden of mental illness on primary caregivers, focusing on depression levels and support systems available within the institutional framework.",
                                        findingsSummary: "Over 40% of primary caregivers met criteria for moderate-to-severe depression. Findings emphasize the 'shadow burden' on families.",
                                        clinicalRelevance: "Demands the need for caregiver-focused interventions and integrated family support in pediatric psychiatry.",
                                        keywords: ["Depression", "Caregivers", "Pediatrics"],
                                        fileSize: "1.8MB"
                                    },
                                    {
                                        id: 'p3',
                                        title: "Prevalence of mental distress and associated factors among caregivers of patients with severe mental illness in the outpatient unit of Amanuel Hospital",
                                        year: "2015",
                                        publicationDate: "October 8, 2015",
                                        volume: "14",
                                        issue: "1",
                                        authors: "Mezinew Sintayehu, Haregwoin Mulat, Zegeye Yohannis",
                                        journal: "EMSH Repository",
                                        researchType: "Cross-sectional",
                                        studyArea: "Psychiatry",
                                        studyLocation: "Amanuel Hospital, Addis Ababa",
                                        doi: "10.1186/s40985-015-0004-9",
                                        abstract: "This study assessed the prevalence of mental distress and associated factors among caregivers of patients with severe mental illness attending the outpatient unit of Amanuel Hospital in Addis Ababa, Ethiopia.",
                                        findingsSummary: "Significant burden of mental distress among caregivers and emphasize the need for targeted psychosocial interventions.",
                                        clinicalRelevance: "Highlights the necessity of psychosocial support systems for caregivers to improve overall patient outcome.",
                                        keywords: ["CBT", "Anxiety", "Mental Health"],
                                        fileSize: "3.1MB"
                                    }
                                ].map((paper) => (
                                    <div key={paper.id} className="group relative bg-blue-950 rounded-[32px] overflow-hidden hover:-translate-y-2 transition-all duration-700 shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(30,58,138,0.5)] border border-white/5 p-8 min-h-[450px] flex flex-col">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[60px] translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000 -z-10" />

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex flex-col">
                                                    <span className="text-cyan-400 text-[9px] font-black uppercase tracking-[0.3em] mb-1">[{paper.year}]</span>
                                                    <span className="text-white/40 text-[9px] font-black uppercase tracking-widest leading-none">Vol. {paper.volume}, Issue {paper.issue}</span>
                                                </div>
                                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-xl backdrop-blur-xl">
                                                    <BookOpenIcon className="w-5 h-5" />
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-black text-white mb-6 group-hover:text-cyan-400 transition-colors leading-tight tracking-tight line-clamp-3 uppercase">
                                                {paper.title}
                                            </h3>

                                            <div className="space-y-4 mb-8 flex-1">
                                                {/* Study Information (Compact Point 3) */}
                                                <div className="flex flex-wrap gap-x-4 gap-y-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-[7px] font-black uppercase text-cyan-400/60 tracking-widest">Type</span>
                                                        <span className="text-[9px] font-black text-white">{paper.researchType}</span>
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-[7px] font-black uppercase text-cyan-400/60 tracking-widest">Location</span>
                                                        <span className="text-[9px] font-black text-white">{paper.studyLocation?.split(',')[0]}</span>
                                                    </div>
                                                </div>

                                                {/* Authors (Compact Point 2) */}
                                                <div className="flex flex-col gap-1 border-l-2 border-cyan-500/50 pl-4">
                                                    <span className="text-[11px] font-bold text-white leading-tight line-clamp-1">{paper.authors}</span>
                                                    <p className="text-[7px] font-black uppercase text-white/30 tracking-widest">AMSH Faculty</p>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <p className="text-xs text-blue-100/60 font-medium leading-relaxed line-clamp-2 italic border-l border-white/10 pl-3">
                                                        "{getSafeAbstract(paper.abstract)}"
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {paper.keywords?.slice(0, 3).map(tag => (
                                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-white/40 uppercase tracking-widest group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Document Access (Point 6) */}
                                            <div className="pt-6 border-t border-white/5 mt-auto flex flex-col gap-2.5">
                                                <Link 
                                                    href={`/research/${paper.id}`}
                                                    className="w-full py-3.5 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-white hover:text-blue-950 transition-all flex items-center justify-center gap-2 backdrop-blur-md active:scale-95"
                                                >
                                                    View Publication
                                                </Link>
                                                <button 
                                                    className="w-full py-3.5 bg-white text-blue-950 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-cyan-400 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden active:scale-95"
                                                    onClick={() => window.open('/documents/institutional-repository-sample.pdf', '_blank')}
                                                >
                                                    Download Manuscript
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                publishedList.map((paper: any) => (
                                <div key={paper.id} className="group relative bg-blue-950 rounded-[32px] overflow-hidden hover:-translate-y-2 transition-all duration-700 shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(30,58,138,0.5)] border border-white/5 p-8 min-h-[450px] flex flex-col">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[60px] translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000 -z-10" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex flex-col">
                                                <span className="text-cyan-400 text-[9px] font-black uppercase tracking-[0.3em] mb-1">[{paper.year || '2024'}]</span>
                                                <span className="text-white/40 text-[9px] font-black uppercase tracking-widest leading-none">Vol. {paper.volume || '14'}, Issue {paper.issue || '1'}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-xl backdrop-blur-xl">
                                                <BookOpenIcon className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-black text-white mb-6 group-hover:text-cyan-400 transition-colors leading-tight tracking-tight line-clamp-3 uppercase">
                                            {paper.title}
                                        </h3>

                                        <div className="space-y-4 mb-8 flex-1">
                                            {/* Study Information (Compact Point 3) */}
                                            <div className="flex flex-wrap gap-x-4 gap-y-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[7px] font-black uppercase text-cyan-400/60 tracking-widest">Type</span>
                                                    <span className="text-[9px] font-black text-white">{paper.researchType || 'Cross-sectional'}</span>
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[7px] font-black uppercase text-cyan-400/60 tracking-widest">Location</span>
                                                    <span className="text-[9px] font-black text-white">{paper.studyLocation?.split(',')[0] || 'EMSH'}</span>
                                                </div>
                                            </div>

                                            {/* Authors / Contributors (Compact Point 2) */}
                                            <div className="flex flex-col gap-1 border-l-2 border-cyan-500/50 pl-4">
                                                <span className="text-[11px] font-bold text-white leading-tight line-clamp-1">
                                                    {paper.investigatorName}
                                                    {paper.coInvestigators && paper.coInvestigators !== '[]' && (() => {
                                                        try {
                                                            const co = JSON.parse(paper.coInvestigators);
                                                            if (Array.isArray(co) && co.length > 0) {
                                                                return `, ${co.map((c: any) => c.name).join(', ')}`;
                                                            }
                                                        } catch (e) {
                                                            return `, ${paper.coInvestigators}`;
                                                        }
                                                        return '';
                                                    })()}
                                                </span>
                                                <p className="text-[7px] font-black uppercase text-white/30 tracking-widest">AMSH Faculty Researcher</p>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <p className="text-xs text-blue-100/60 font-medium leading-relaxed italic border-l border-white/10 pl-3 line-clamp-2">
                                                    "{getSafeAbstract(paper.abstract)}"
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {parseKeywords(paper.keywords).slice(0, 3).map((tag: any) => (
                                                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-white/40 uppercase tracking-widest group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Document Access (Point 6) */}
                                        <div className="pt-6 border-t border-white/5 mt-auto flex flex-col gap-2.5">
                                            <Link 
                                                href={`/research/${paper.id}`}
                                                className="w-full py-3.5 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-white hover:text-blue-950 transition-all flex items-center justify-center gap-2 backdrop-blur-md active:scale-95"
                                            >
                                                View Publication
                                            </Link>
                                            <a 
                                                href={getSafeDocUrl(paper.publishedProposal || paper.proposal)}
                                                className="w-full py-3.5 bg-white text-blue-950 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-cyan-400 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden active:scale-95"
                                                target="_blank"
                                            >
                                                Download Manuscript
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* Directorate Leadership (CPD STYLE - MOVED TO BOTTOM) */}
                <section className="py-12 bg-white">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-4 block">Directorate Leadership</span>
                            <h2 className="text-4xl font-black text-blue-950 tracking-tight">Governance, Leadership & Outreach</h2>
                            <p className="text-gray-500 font-medium text-sm mt-3 leading-relaxed">Direct support available from the Institutional Research Desk.</p>
                        </div>

                        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 lg:gap-8 overflow-x-auto pb-4">
                            {(staff.length > 0 ? staff.filter(s => {
                                if (Array.isArray(s.pages)) return s.pages.includes('research');
                                // Fallback for legacy compatibility
                                return s.name?.toLowerCase().includes('zegeye') ||
                                       s.name?.toLowerCase().includes('habtamu') ||
                                       s.name?.toLowerCase().includes('mensur');
                            }) : researchTeam).map((person, i) => (
                                <div key={i} className="content-box-premium group flex flex-col items-center text-center min-w-[200px] max-w-[240px] p-6 rounded-[32px]">
                                    <div className="relative mb-4">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-50 border-4 border-white shadow-md group-hover:scale-105 transition-all duration-500">
                                            <img
                                                src={resolveImageUrl(person.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name.replace(/^(Mr\.|Mrs\.|Dr\.)\s+/i, ''))}&background=eff6ff&color=1e3a8a&size=256&font-size=0.33`)}
                                                alt={person.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-7 h-7 flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                                <path fill="#0095F6" d="M12,1 L14.46,2.82 L17.5,2.47 L18.72,5.28 L21.53,6.5 L21.18,9.54 L23,12 L21.18,14.46 L21.53,17.5 L18.72,18.72 L17.5,21.53 L14.46,21.18 L12,23 L9.54,21.18 L6.5,21.53 L5.28,18.72 L2.47,17.5 L2.82,14.46 L1,12 L2.82,9.54 L2.47,6.5 L5.28,5.28 L6.5,2.47 L9.54,2.82 Z" />
                                                <path d="M7 12.5L10.5 15.5L17 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-black text-blue-950 mb-1 group-hover:text-blue-700 transition-colors uppercase tracking-tight">{person.name}</h3>
                                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-tight mb-4 max-w-[200px] h-8 line-clamp-2">{person.role}</p>
                                    <div className="mt-auto space-y-2 w-full">
                                        {person.phone && person.showPhone !== false && (
                                            <a href={`tel:${person.phone?.replace(/\s+/g, '')}`} className="px-4 py-2 rounded-xl bg-blue-50 text-blue-950 text-[10px] font-black hover:bg-blue-950 hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
                                                <PhoneIcon className="w-3 h-3 opacity-40 group-hover/btn:opacity-100 group-hover/btn:animate-wiggle" />
                                                {person.phone}
                                            </a>
                                        )}
                                        {person.email && person.showEmail !== false && (
                                            <a href={`mailto:${person.email}`} className="px-4 py-2 rounded-xl bg-blue-50 text-blue-950 text-[10px] font-black hover:bg-blue-950 hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
                                                <EnvelopeIcon className="w-3 h-3 opacity-40 group-hover/btn:opacity-100" />
                                                Email
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
            <ChatbotButton />

            {/* Tracking Modal */}
            {isTrackingModalOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-2xl animate-in fade-in duration-500">
                    <div className="bg-white rounded-[60px] w-full max-w-3xl overflow-hidden shadow-3xl flex flex-col animate-in zoom-in-95 duration-500">
                        <div className="p-14 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <div className="w-20 h-20 bg-blue-950 rounded-[35px] flex items-center justify-center text-white shadow-2xl">
                                    <IdentificationIcon className="w-10 h-10" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-3xl font-black text-blue-950 tracking-tighter leading-none">Track Status</h3>
                                    <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] mt-3">Protocol Analytics Engine</p>
                                </div>
                            </div>
                            <button onClick={() => { setIsTrackingModalOpen(false); setTrackingData(null); setTrackingId(''); }} className="w-14 h-14 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-xl hover:rotate-90">
                                <XMarkIcon className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="p-14 space-y-12 overflow-y-auto max-h-[70vh] no-scrollbar">
                            {!trackingData ? (
                                <form onSubmit={handleTrack} className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[12px] font-black text-blue-950 uppercase tracking-[0.3em] ml-2">Submission Passport ID</label>
                                        <div className="relative group">
                                            <MagnifyingGlassIcon className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-300 group-focus-within:text-blue-950 transition-colors" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="AMSH-RES-2024-XXXX"
                                                className="w-full pl-20 pr-8 py-8 border-4 border-gray-50 rounded-[40px] focus:border-blue-950 transition-all font-black text-2xl bg-gray-50/50 shadow-inner"
                                                value={trackingId}
                                                onChange={e => setTrackingId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isTracking}
                                        className="w-full py-8 bg-blue-950 text-white rounded-[3rem] font-black uppercase tracking-[0.4em] text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-3xl shadow-blue-900/40 disabled:opacity-50"
                                    >
                                        {isTracking ? 'Accessing Files...' : 'Initiate Status Analysis'}
                                    </button>
                                </form>
                            ) : (
                                <div className="space-y-14 animate-in slide-in-from-bottom-10 duration-700">
                                    <div className="p-14 bg-blue-50/70 rounded-[55px] border-4 border-blue-100 text-center space-y-3 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl" />
                                        <p className="text-[12px] font-black text-blue-400 uppercase tracking-widest leading-none">Current Review Phase</p>
                                        <h3 className="text-5xl font-black text-blue-950 tracking-tighter leading-none">{trackingData.status.replace('_', ' ')}</h3>
                                    </div>

                                    {/* Timeline */}
                                    <div className="space-y-12 px-8">
                                        {[
                                            { label: 'Submitted', date: new Date(trackingData.createdAt).toLocaleDateString(), completed: true },
                                            { label: 'IRB Review', date: trackingData.status === 'PENDING' ? 'In Review Queue' : 'Phase Active', completed: trackingData.status !== 'PENDING' },
                                            { label: 'Portal Decision', date: ['APPROVED', 'REJECTED', 'PUBLISHED'].includes(trackingData.status) ? 'Finalized' : 'Processing', completed: ['APPROVED', 'REJECTED', 'PUBLISHED'].includes(trackingData.status) }
                                        ].map((step, i) => (
                                            <div key={i} className="flex gap-8 items-start relative">
                                                {i < 2 && <div className={`absolute left-7 top-14 w-0.5 h-16 ${step.completed ? 'bg-blue-950' : 'bg-gray-100'}`} />}
                                                <div className={`w-14 h-14 rounded-[22px] flex-shrink-0 flex items-center justify-center border-4 transition-all duration-700 ${step.completed ? 'bg-blue-950 border-blue-950 text-white shadow-2xl shadow-blue-900/30' : 'bg-white border-gray-100 text-gray-200'}`}>
                                                    {step.completed ? <CheckBadgeIcon className="w-7 h-7" /> : <span className="text-xs font-black">{i + 1}</span>}
                                                </div>
                                                <div className="flex-1 pt-2">
                                                    <h4 className={`text-2xl font-black tracking-tighter leading-none ${step.completed ? 'text-blue-950' : 'text-gray-300'}`}>{step.label}</h4>
                                                    <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest mt-2 opacity-60">{step.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {trackingData.reviewerComments && (
                                        <div className="p-12 bg-amber-50 rounded-[55px] border-4 border-amber-100 space-y-5 shadow-inner">
                                            <div className="flex items-center gap-4 text-amber-900">
                                                <InformationCircleIcon className="w-6 h-6 opacity-40" />
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Review Desk Feedback</span>
                                            </div>
                                            <p className="text-xl font-bold text-amber-900 leading-relaxed border-l-8 border-amber-200 pl-8">
                                                "{trackingData.reviewerComments}"
                                            </p>
                                        </div>
                                    )}

                                    <button onClick={() => setTrackingData(null)} className="w-full py-8 border-4 border-gray-50 text-gray-400 hover:text-blue-950 hover:border-blue-950 rounded-[3rem] font-black uppercase tracking-widest text-[11px] transition-all shadow-sm">
                                        Back to Identity Entry
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
