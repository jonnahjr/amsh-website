'use client';

import { researchAPI, resolveImageUrl } from '@/lib/api';
import {
    ArrowDownTrayIcon,
    ArrowLeftIcon,
    BeakerIcon,
    BookOpenIcon,
    CalendarIcon,
    CheckBadgeIcon,
    DocumentTextIcon,
    GlobeAltIcon,
    IdentificationIcon,
    MapPinIcon,
    ShareIcon,
    TagIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ResearchDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [paper, setPaper] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                // If it's one of our fallback IDs, we can provide the mock data
                if (id === 'p1' || id === 'p2' || id === 'p3') {
                    const fallbacks: any = {
                        p1: {
                            id: 'p1',
                            title: "Magnitude of Substance Induced Psychosis among Adolescents in Amanuel Mental Specialized Hospital Addis Ababa Ethiopia",
                            year: "2022",
                            publishedAt: "2022-05-12",
                            publicationDate: "May 12, 2022",
                            volume: "12",
                            issue: "2",
                            investigatorName: "Abdisa Boka",
                            coInvestigators: JSON.stringify([{ name: "Mergitu Alemu" }, { name: "Asnake Fantu" }]),
                            authors: "Abdisa Boka, Mergitu Alemu, Asnake Fantu",
                            journal: "BMC Psychiatry",
                            researchType: "Cross-sectional",
                            studyArea: "Psychiatry",
                            studyLocation: "AMSH, Addis Ababa",
                            doi: "10.1186/s12888-022-03912-x",
                            abstract: "A cross-sectional study conducted at AMSH to determine the magnitude and factors associated with substance-induced psychosis among adolescents. Finding high prevalence rates requiring immediate intervention.",
                            findingsSummary: "The study revealed a high prevalence of substance-induced psychosis (15.4%) among adolescent outpatients. Key risk factors include early onset of drug use and lack of family support.",
                            clinicalRelevance: "Requires immediate intervention and policy focus on adolescent substance abuse within specialized mental health frameworks.",
                            keywords: "Psychosis, Adolescents, Mental Health",
                        },
                        p2: {
                            id: 'p2',
                            title: "Depression and associated factors among primary caregivers of children and adolescents with mental illness in Addis Ababa, Ethiopia",
                            year: "2019",
                            publishedAt: "2019-11-20",
                            volume: "7",
                            issue: "4",
                            investigatorName: "Habtamu Derajaw",
                            coInvestigators: JSON.stringify([{ name: "Mensur Nesru" }]),
                            journal: "Journal of Affective Disorders",
                            researchType: "Analytical Survey",
                            studyArea: "Clinical Psychology",
                            studyLocation: "AMSH, Pediatrics Unit",
                            doi: "10.1016/j.jad.2019.08.012",
                            abstract: "Investigating the burden of mental illness on primary caregivers, focusing on depression levels and support systems available within the institutional framework.",
                            findingsSummary: "Over 40% of primary caregivers met criteria for moderate-to-severe depression. Findings emphasize the 'shadow burden' on families and the need for caregiver-focused interventions.",
                            keywords: "Depression, Caregivers, Pediatrics",
                        },
                        p3: {
                            id: 'p3',
                            title: "Prevalence of mental distress and associated factors among caregivers of patients with severe mental illness in the outpatient unit of Amanuel Hospital, Addis Ababa, Ethiopia: A cross-section",
                            year: "2015",
                            publishedAt: "2015-10-08",
                            volume: "14",
                            issue: "1",
                            investigatorName: "Mezinew Sintayehu",
                            coInvestigators: JSON.stringify([{ name: "Haregwoin Mulat" }, { name: "Zegeye Yohannis" }]),
                            journal: "EMSH Repository",
                            researchType: "Cross-sectional",
                            studyArea: "Psychiatry",
                            studyLocation: "Amanuel Hospital, Addis Ababa",
                            doi: "10.1186/s40985-015-0004-9",
                            abstract: "This study assessed the prevalence of mental distress and associated factors among caregivers of patients with severe mental illness attending the outpatient unit of Amanuel Hospital in Addis Ababa, Ethiopia. Using a cross-sectional design, data were collected through structured interviews. The findings highlight a significant burden of mental distress among caregivers and emphasize the need for targeted psychosocial interventions and support systems.",
                            findingsSummary: "Significant burden of mental distress among caregivers and emphasize the need for targeted psychosocial interventions and support systems.",
                            keywords: "CBT, Anxiety, Mental Health",
                        }
                    };
                    setPaper(fallbacks[id as string]);
                    setLoading(false);
                    return;
                }

                const res = await researchAPI.getById(id as string);
                setPaper(res.data.research);
            } catch (err) {
                console.error('Failed to fetch research details:', err);
                toast.error('Could not load publication details');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const parseKeywords = (keywords: any) => {
        if (!keywords) return [];
        if (Array.isArray(keywords)) return keywords;
        if (typeof keywords === 'string') {
            try {
                const parsed = JSON.parse(keywords);
                if (Array.isArray(parsed)) return parsed;
            } catch (e) {
                return keywords.split(',').map(k => k.trim()).filter(Boolean);
            }
        }
        return [];
    };

    const getAuthors = (p: any) => {
        const authors = [p.investigatorName];
        if (p.coInvestigators) {
            try {
                const co = JSON.parse(p.coInvestigators);
                if (Array.isArray(co)) {
                    co.forEach((c: any) => {
                        if (typeof c === 'string') authors.push(c);
                        else if (c.name) authors.push(c.name);
                    });
                }
            } catch (e) {
                // If not JSON, it might be a string like "Author A, Author B"
                if (typeof p.coInvestigators === 'string') {
                    p.coInvestigators.split(',').forEach((a: string) => authors.push(a.trim()));
                }
            }
        }
        return authors.filter(Boolean).join(', ');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="font-black text-blue-900 uppercase tracking-widest text-xs">Accessing Repository...</p>
                </div>
            </div>
        );
    }

    if (!paper) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="text-center">
                    <IdentificationIcon className="w-20 h-20 text-gray-200 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-blue-950 mb-4">Publication Not Found</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">The requested research document could not be located in the institutional repository.</p>
                    <Link href="/research" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-950 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Archive
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCF9] font-sans selection:bg-blue-950 selection:text-white">
            <main className="pb-32">
                {/* Hero Header */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-blue-950">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                    </div>
                    {/* Decorative Blurs */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

                    <div className="container-custom relative z-10">
                        <Link href="/research" className="inline-flex items-center gap-3 text-blue-300 hover:text-white transition-colors mb-12 group">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                                <ArrowLeftIcon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">Repository Archive</span>
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            <div className="lg:col-span-8">
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <span className="px-5 py-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                                        {paper.researchType || 'Institutional Research'}
                                    </span>
                                    <span className="px-5 py-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                                        Published
                                    </span>
                                    {paper.doi && (
                                        <span className="px-5 py-2 bg-white/5 border border-white/10 text-white/50 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                                            DOI: {paper.doi}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-10">
                                    {paper.title}
                                </h1>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-10 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Principal Investigator</p>
                                        <p className="text-lg font-bold text-white">{paper.investigatorName}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Publication Date</p>
                                        <p className="text-lg font-bold text-white">{new Date(paper.publishedAt || paper.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Institutional Journal</p>
                                        <p className="text-lg font-bold text-white uppercase">{paper.journal || 'EMSH Repository'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 flex flex-col justify-end">
                                <div className="bg-white rounded-[45px] p-10 shadow-2xl space-y-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[80px] -mr-4 -mt-4 group-hover:scale-110 transition-transform duration-700" />
                                    
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-blue-950 text-white rounded-[22px] flex items-center justify-center mb-8 shadow-xl">
                                            <DocumentTextIcon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-black text-blue-950 mb-3 tracking-tighter uppercase">Document Access</h3>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-10">
                                            Access the complete manuscript including methodology, data analysis, and detailed clinical outcomes.
                                        </p>
                                        
                                        <div className="space-y-4">
                                            <a 
                                                href={resolveImageUrl(paper.publishedProposal || paper.proposal || '/documents/institutional-repository-sample.pdf')} 
                                                target="_blank"
                                                className="w-full py-6 bg-blue-950 text-white rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-blue-900 transition-all shadow-xl flex items-center justify-center gap-3 group/btn active:scale-95"
                                            >
                                                <ArrowDownTrayIcon className="w-5 h-5 group-hover/btn:translate-y-1 transition-transform" />
                                                Download PDF
                                            </a>
                                            <button 
                                                onClick={() => {
                                                    navigator.share?.({ title: paper.title, url: window.location.href });
                                                }}
                                                className="w-full py-6 bg-gray-50 text-blue-950 border-2 border-gray-100 rounded-[24px] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:border-blue-950 transition-all flex items-center justify-center gap-3 active:scale-95"
                                            >
                                                <ShareIcon className="w-5 h-5" />
                                                Share Insight
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Sections */}
                <section className="py-24 container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-24">
                            {/* Abstract */}
                            <div className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-950 flex items-center justify-center">
                                        <BookOpenIcon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-black text-blue-950 tracking-tight">Abstract / Summary</h2>
                                </div>
                                <div className="p-12 bg-white rounded-[45px] border-2 border-gray-50 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-full blur-3xl -mr-16 -mt-16" />
                                    <p className="text-xl text-gray-700 leading-[1.8] font-medium italic">
                                        "{paper.abstract}"
                                    </p>
                                </div>
                            </div>

                            {/* Key Findings */}
                            {paper.findingsSummary && (
                                <div className="space-y-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                            <CheckBadgeIcon className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-3xl font-black text-blue-950 tracking-tight">Key Findings & Clinical Relevance</h2>
                                    </div>
                                    <div className="p-12 bg-emerald-50/30 border-2 border-emerald-100 rounded-[45px] relative overflow-hidden">
                                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-100/50 rounded-full blur-3xl animate-pulse" />
                                        <div className="space-y-6">
                                            <p className="text-lg text-emerald-950 leading-[1.8] font-bold">
                                                {paper.findingsSummary}
                                            </p>
                                            {paper.clinicalRelevance && (
                                                <div className="pt-6 border-t border-emerald-100">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">Clinical Relevance</p>
                                                    <p className="text-sm text-emerald-900/80 font-medium italic leading-relaxed">
                                                        {paper.clinicalRelevance}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Authors Detail */}
                            <div className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                        <UserGroupIcon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-black text-blue-950 tracking-tight">Authors & Contributors</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {getAuthors(paper).split(',').map((name, i) => (
                                        <div key={i} className="flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-3xl hover:border-blue-200 transition-all shadow-sm group">
                                            <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-blue-950 group-hover:bg-blue-950 group-hover:text-white transition-all">
                                                <UserIcon className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-black text-blue-950 tracking-tight leading-none mb-1">{name.trim()}</p>
                                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{i === 0 ? 'Lead Investigator' : 'Co-Author'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-12">
                            {/* Study Information */}
                            <div className="bg-white rounded-[45px] p-10 border-2 border-gray-50 shadow-sm space-y-10">
                                <h3 className="text-2xl font-black text-blue-950 uppercase tracking-tighter">Study Information</h3>
                                <div className="space-y-8">
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                            <BeakerIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Research Type</p>
                                            <p className="text-sm font-black text-blue-950 uppercase tracking-tight">{paper.researchType || 'Cross-sectional'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                            <TagIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Study Area</p>
                                            <p className="text-sm font-black text-blue-950 uppercase tracking-tight">{paper.studyArea || 'Psychiatry'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                            <MapPinIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                                            <p className="text-sm font-black text-blue-950 uppercase tracking-tight">{paper.studyLocation || 'Amanuel Hospital'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                            <CalendarIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Publication Year</p>
                                            <p className="text-sm font-black text-blue-950 uppercase tracking-tight">{paper.year || '2015'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Publication Details */}
                            <div className="bg-blue-950 rounded-[45px] p-10 text-white space-y-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[80px]" />
                                <h3 className="text-2xl font-black uppercase tracking-tighter relative z-10">Journal Integrity</h3>
                                <div className="space-y-8 relative z-10">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Journal Name</p>
                                        <p className="text-lg font-bold text-white uppercase">{paper.journal || 'EMSH Repository'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Submission ID</p>
                                        <p className="text-lg font-mono font-black text-blue-200">{paper.submissionId || 'AMSH-RES-V14-I1'}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Volume</p>
                                            <p className="text-lg font-black text-white">{paper.volume || '14'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Issue</p>
                                            <p className="text-lg font-black text-white">{paper.issue || '1'}</p>
                                        </div>
                                    </div>
                                    {paper.doi && (
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">DOI</p>
                                            <a href={`https://doi.org/${paper.doi}`} target="_blank" className="text-sm font-bold text-blue-300 hover:text-white transition-colors break-all underline decoration-blue-500/50 underline-offset-4">
                                                {paper.doi}
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Verified Institutional Data</span>
                                    <GlobeAltIcon className="w-5 h-5 text-blue-400" />
                                </div>
                            </div>

                            {/* Keywords */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-4">Research Keywords</h3>
                                <div className="flex flex-wrap gap-3">
                                    {parseKeywords(paper.keywords).map((k: string) => (
                                        <div key={k} className="px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-xs font-black text-blue-950 uppercase tracking-widest hover:border-blue-900 transition-all cursor-default">
                                            {k}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

