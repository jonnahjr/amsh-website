'use client';

import { researchAPI, resolveImageUrl } from '@/lib/api';
import { exportToCSV } from '@/lib/export';
import {
    ArrowDownTrayIcon,
    ArrowTopRightOnSquareIcon,
    BeakerIcon,
    BookOpenIcon,
    CheckCircleIcon,
    ClockIcon,
    DocumentMagnifyingGlassIcon,
    DocumentTextIcon,
    FolderIcon,
    GlobeAsiaAustraliaIcon as GlobalIcon,
    InboxIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    TagIcon,
    TrashIcon,
    UserIcon,
    XCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const getSafeDocUrl = (url: string | null) => {
    return resolveImageUrl(url);
};

export default function ResearchAdmin() {
    const [research, setResearch] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'PROPOSALS' | 'RESEARCH' | 'REPOSITORY'>('PROPOSALS');
    const [proposalSubTab, setProposalSubTab] = useState<'ALL' | 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED'>('ALL');
    const [researchSubTab, setResearchSubTab] = useState<'ALL' | 'UNDER_REVIEW' | 'PUBLISHED' | 'REJECTED'>('ALL');
    const [search, setSearch] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [viewingDoc, setViewingDoc] = useState<{ title: string; url: string } | null>(null);

    const fetchResearch = async () => {
        setLoading(true);
        try {
            const res = await researchAPI.getAdminAll();
            setResearch(res.data.research || []);
        } catch (error) {
            console.error('Fetch research error:', error);
            setResearch([
                { id: '1', title: 'Prevalence of mental distress and associated factors among caregivers of patients with severe mental illness in the outpatient unit of Amanuel Hospital, Addis Ababa, Ethiopia, 2013', abstract: 'Cross-sectional study evaluating mental health challenges for caregivers of patients with chronic mental health conditions.', investigatorName: 'Mezinew Sintayehu', coInvestigators: '["Mezinew S.", "Haregwoin M.", "Zegeye Y.", "Tewodros A.", "Maereg F."]', institution: 'Amanuel Hospital', email: 'research@amsh.gov.et', journal: 'Amanuel Hospital Research Journal', year: '2015', status: 'PUBLISHED', publishedAt: '2015-10-08T00:00:00.000Z', createdAt: '2015-10-08T00:00:00.000Z' },
                { id: '2', title: 'Depression and associated factors among primary caregivers of children and adolescents with mental illness in Addis Ababa, Ethiopia', abstract: 'Evaluating depression prevalence among primary caregivers of pediatric psychiatric patients.', investigatorName: 'Woredaw Minichil', coInvestigators: '["Woredaw M.", "Wondale G.", "Habtamu D.", "Sofia S."]', institution: 'Amanuel Hospital', email: 'research@amsh.gov.et', journal: 'BMC Psychiatry', year: '2019', status: 'PUBLISHED', publishedAt: '2019-08-13T00:00:00.000Z', createdAt: '2019-08-13T00:00:00.000Z' },
                { id: '3', title: 'Magnitude of Substance Induced Psychosis among Adolescents in Amanuel Mental Specialized Hospital Addis Ababa Ethiopia', abstract: 'An investigation into the prevalence of psychosis caused by substance abuse in the adolescent population.', investigatorName: 'Abdisa Boka', coInvestigators: '["Abdisa B.", "Mergitu A.", "Asnake F."]', institution: 'Addis Ababa University', email: 'research@amsh.gov.et', journal: 'Journal of Health & Medical Sciences', year: '2022', status: 'PENDING', createdAt: '2022-01-01T00:00:00.000Z' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await researchAPI.updateStatus(id, status);
            fetchResearch();
        } catch (error) {
            console.error('Update status error:', error);
            alert('Status update failed.');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title', editingItem.title || '');
            data.append('abstract', editingItem.abstract || '');
            data.append('coInvestigators', editingItem.coInvestigators || '');
            data.append('journal', editingItem.journal || '');
            data.append('year', editingItem.year || '');
            data.append('investigatorName', editingItem.investigatorName || '');
            data.append('institution', editingItem.institution || '');
            data.append('department', editingItem.department || '');
            data.append('position', editingItem.position || '');
            data.append('email', editingItem.email || '');
            data.append('phone', editingItem.phone || '');
            
            if (editingItem.newProposalFile) {
                data.append('proposalPDF', editingItem.newProposalFile);
            }
            if (editingItem.newEthicalFile) {
                data.append('ethicalLetter', editingItem.newEthicalFile);
            }
            
            data.append('status', editingItem.status || 'PENDING');
            data.append('reviewerComments', editingItem.reviewerComments || '');
            data.append('researchType', editingItem.researchType || 'Clinical');
            data.append('studyArea', editingItem.studyArea || 'Psychiatry');
            data.append('studyLocation', editingItem.studyLocation || '');
            data.append('dataCollectionMethod', editingItem.dataCollectionMethod || '');
            data.append('participantType', editingItem.participantType || '');
            data.append('patientsInvolved', String(editingItem.patientsInvolved || false));
            data.append('isStudent', String(editingItem.isStudent || false));
            data.append('supervisorName', editingItem.supervisorName || '');
            
            // New Extended Fields
            data.append('keywords', Array.isArray(editingItem.keywords) ? JSON.stringify(editingItem.keywords) : (editingItem.keywords || ''));
            data.append('sampleSize', editingItem.sampleSize || '');
            data.append('correspondingAuthorName', editingItem.correspondingAuthorName || '');
            data.append('correspondingAuthorEmail', editingItem.correspondingAuthorEmail || '');
            data.append('ethicsApproved', String(editingItem.ethicsApproved || false));
            data.append('ethicsCommittee', editingItem.ethicsCommittee || '');
            data.append('ethicsApprovalNumber', editingItem.ethicsApprovalNumber || '');
            data.append('fundingSource', editingItem.fundingSource || '');
            data.append('doi', editingItem.doi || '');
            data.append('volume', editingItem.volume || '');
            data.append('issue', editingItem.issue || '');
            data.append('findingsSummary', editingItem.findingsSummary || '');

            await researchAPI.update(editingItem.id, data);
            setIsEditModalOpen(false);
            fetchResearch();
        } catch (error: any) {
            console.error('Update error:', error);
            const detail = error.response?.data?.detail || '';
            alert(`Failed to update research details. ${detail ? 'Server says: ' + detail : ''}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this entry? This action is permanent.')) return;
        try {
            await researchAPI.delete(id);
            fetchResearch();
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete entry.');
        }
    };

    useEffect(() => {
        fetchResearch();
    }, []);

    // Search filter
    const searchLower = search.toLowerCase();
    const matchesSearch = (r: any) =>
        r.title?.toLowerCase().includes(searchLower) ||
        r.investigatorName?.toLowerCase().includes(searchLower) ||
        r.submissionId?.toLowerCase().includes(searchLower);

    // PROPOSALS = submitted via apply/protocol form (no journal, not MANUSCRIPT category)
    // RESEARCH  = submitted via publish form (has journal OR category is MANUSCRIPT)
    const isManuscript = (r: any) => !!r.journal || r.category === 'MANUSCRIPT';

    const allProposals = research.filter(r =>
        ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'].includes(r.status) &&
        !isManuscript(r) &&
        matchesSearch(r)
    );
    const allResearchSubmissions = research.filter(r =>
        isManuscript(r) && matchesSearch(r)
    );
    const researchSubmissions = researchSubTab === 'ALL'
        ? allResearchSubmissions.filter(r => r.status === 'PENDING')
        : researchSubTab === 'PUBLISHED'
        ? allResearchSubmissions.filter(r => r.status === 'PUBLISHED')
        : allResearchSubmissions.filter(r => r.status === researchSubTab);
    const researchCounts = {
        ALL: allResearchSubmissions.filter(r => r.status === 'PENDING').length,
        UNDER_REVIEW: allResearchSubmissions.filter(r => r.status === 'UNDER_REVIEW').length,
        PUBLISHED: allResearchSubmissions.filter(r => r.status === 'PUBLISHED').length,
        REJECTED: allResearchSubmissions.filter(r => r.status === 'REJECTED').length,
    };

    // Sub-filtered by proposalSubTab
    // 'ALL' key = New Applicants = PENDING only (fresh submissions not yet reviewed)
    const proposals = proposalSubTab === 'ALL'
        ? allProposals.filter(r => r.status === 'PENDING')
        : allProposals.filter(r => r.status === proposalSubTab);
    const proposalCounts = {
        ALL: allProposals.filter(r => r.status === 'PENDING').length,
        PENDING: allProposals.filter(r => r.status === 'PENDING').length,
        UNDER_REVIEW: allProposals.filter(r => r.status === 'UNDER_REVIEW').length,
        APPROVED: allProposals.filter(r => r.status === 'APPROVED').length,
        REJECTED: allProposals.filter(r => r.status === 'REJECTED').length,
    };
    const repository = research.filter(r => r.status === 'PUBLISHED' && (
        r.title.toLowerCase().includes(search.toLowerCase()) || 
        r.coInvestigators?.toLowerCase().includes(search.toLowerCase()) ||
        r.submissionId?.toLowerCase().includes(search.toLowerCase())
    ));

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto font-inter">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <BeakerIcon className="w-8 h-8 text-primary" />
                        Research Management
                    </h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 ml-11">Institutional Intelligence Control</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => exportToCSV(research, 'AMSH_Research_Database')}
                        className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
                    >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Tabs & Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-4">
                <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200/60 shadow-inner">
                    <button
                        onClick={() => setActiveTab('PROPOSALS')}
                        className={`flex items-center gap-3 px-6 py-3.5 rounded-[1.1rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'PROPOSALS' ? 'bg-white text-blue-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <DocumentTextIcon className="w-4 h-4" />
                        Proposals ({proposals.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('RESEARCH')}
                        className={`flex items-center gap-3 px-6 py-3.5 rounded-[1.1rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'RESEARCH' ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <InboxIcon className="w-4 h-4" />
                        Research ({researchSubmissions.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('REPOSITORY')}
                        className={`flex items-center gap-3 px-6 py-3.5 rounded-[1.1rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'REPOSITORY' ? 'bg-white text-primary shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <FolderIcon className="w-4 h-4" />
                        Repository ({repository.length})
                    </button>
                </div>

                <div className="relative group min-w-[400px]">
                    <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Scan publications..."
                        className="w-full pl-14 pr-6 py-3.5 bg-white border border-slate-200/60 rounded-2xl shadow-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none font-semibold text-sm text-slate-600 placeholder:text-slate-300"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid Area */}
            <div className="px-4">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => <div key={i} className="bg-white h-64 rounded-3xl animate-pulse border border-slate-100" />)}
                    </div>
                ) : activeTab === 'PROPOSALS' ? (
                    <div className="space-y-6">
                        {/* Proposal Sub-Tabs */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {([
                                { key: 'ALL', label: 'New Applicants', color: 'slate' },
                                { key: 'PENDING', label: 'Pending', color: 'amber' },
                                { key: 'UNDER_REVIEW', label: 'Under Review', color: 'blue' },
                                { key: 'APPROVED', label: 'Approved', color: 'emerald' },
                                { key: 'REJECTED', label: 'Declined', color: 'red' },
                            ] as const).map(({ key, label, color }) => (
                                <button
                                    key={key}
                                    onClick={() => setProposalSubTab(key)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                        proposalSubTab === key
                                            ? color === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm'
                                            : color === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                                            : color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                                            : color === 'red' ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                                            : 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                            : 'bg-white text-slate-400 border-slate-200 hover:text-slate-700 hover:border-slate-300'
                                    }`}
                                >
                                    {label}
                                    <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-black ${
                                        proposalSubTab === key ? 'bg-white/30' : 'bg-slate-100'
                                    }`}>
                                        {proposalCounts[key]}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Proposals Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {proposals.length === 0 ? (
                                <div className="col-span-full"><EmptyState label={`No ${proposalSubTab === 'ALL' ? '' : proposalSubTab.replace('_', ' ').toLowerCase() + ' '}proposals`} icon={DocumentTextIcon} /></div>
                            ) : (
                                proposals.map(item => (
                                    <SubmissionCard 
                                        key={item.id} 
                                        item={item} 
                                        onUpdate={() => { setEditingItem(item); setIsEditModalOpen(true); }}
                                        onStatusUpdate={handleStatusUpdate}
                                        onDelete={handleDelete}
                                        isProposalTab={true}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                ) : activeTab === 'RESEARCH' ? (
                    <div className="space-y-6">
                        {/* Research Sub-Tabs */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {([
                                { key: 'ALL', label: 'New Applicants', color: 'slate' },
                                { key: 'UNDER_REVIEW', label: 'Under Review', color: 'blue' },
                                { key: 'PUBLISHED', label: 'Published', color: 'emerald' },
                                { key: 'REJECTED', label: 'Rejected', color: 'red' },
                            ] as const).map(({ key, label, color }) => (
                                <button
                                    key={key}
                                    onClick={() => setResearchSubTab(key)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                        researchSubTab === key
                                            ? color === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                                            : color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                                            : color === 'red' ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                                            : 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                            : 'bg-white text-slate-400 border-slate-200 hover:text-slate-700 hover:border-slate-300'
                                    }`}
                                >
                                    {label}
                                    <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-black ${
                                        researchSubTab === key ? 'bg-white/30' : 'bg-slate-100'
                                    }`}>
                                        {researchCounts[key]}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Research Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {researchSubmissions.length === 0 ? (
                                <div className="col-span-full"><EmptyState label={`No ${researchSubTab === 'ALL' ? 'new' : researchSubTab.toLowerCase().replace('_', ' ')} research submissions`} icon={InboxIcon} /></div>
                            ) : (
                                researchSubmissions.map(item => (
                                    <SubmissionCard
                                        key={item.id}
                                        item={item}
                                        onUpdate={() => { setEditingItem(item); setIsEditModalOpen(true); }}
                                        onStatusUpdate={handleStatusUpdate}
                                        onDelete={handleDelete}
                                        isProposalTab={false}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {repository.length === 0 ? (
                            <div className="col-span-full"><EmptyState label="Repository is empty" icon={FolderIcon} /></div>
                        ) : (
                            repository.map(item => (
                                <RepositoryCard 
                                    key={item.id} 
                                    item={item} 
                                    onEdit={() => { setEditingItem(item); setIsEditModalOpen(true); }}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingItem && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
                        <div className="p-10 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Redesign Finding</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Refine and structure data for publication</p>
                            </div>
                            <button onClick={() => setIsEditModalOpen(false)} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
                                <XCircleIcon className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdate} className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar">
                            <div className="grid grid-cols-1 gap-10">
                                {/* Section 1: Core Publication Data */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                            <DocumentTextIcon className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Publication Core</h4>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Publication Title</label>
                                        <input 
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                            value={editingItem.title}
                                            onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Abstract / Summary</label>
                                        <textarea 
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none h-32 no-scrollbar"
                                            value={editingItem.abstract}
                                            onChange={e => setEditingItem({...editingItem, abstract: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Keywords (Comma Separated)</label>
                                        <input 
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                            value={Array.isArray(editingItem.keywords) ? editingItem.keywords.join(', ') : (editingItem.keywords || '')}
                                            onChange={e => setEditingItem({...editingItem, keywords: e.target.value})}
                                            placeholder="Mental Distress, Psychiatry, Ethiopia..."
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Study Findings / Outcome</label>
                                        <textarea 
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none h-32 no-scrollbar"
                                            value={editingItem.findingsSummary || ''}
                                            onChange={e => setEditingItem({...editingItem, findingsSummary: e.target.value})}
                                            placeholder="Summarize the core findings and clinical relevance..."
                                        />
                                    </div>
                                </div>

                                {/* Section 2: Investigator Context */}
                                <div className="space-y-6 pt-6 border-t border-slate-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                            <UserIcon className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Principal Investigator Context</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Principal Investigator Name</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-blue-900 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.investigatorName || ''} onChange={e => setEditingItem({...editingItem, investigatorName: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.email || ''} onChange={e => setEditingItem({...editingItem, email: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Corresponding Author Name</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-teal-200 bg-teal-50/30 rounded-xl text-xs font-black text-teal-900 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.correspondingAuthorName || ''} onChange={e => setEditingItem({...editingItem, correspondingAuthorName: e.target.value})} placeholder="If different from PI" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Corresponding Email</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-teal-200 bg-teal-50/30 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.correspondingAuthorEmail || ''} onChange={e => setEditingItem({...editingItem, correspondingAuthorEmail: e.target.value})} placeholder="contact@example.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.phone || ''} onChange={e => setEditingItem({...editingItem, phone: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Institution</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.institution || ''} onChange={e => setEditingItem({...editingItem, institution: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.department || ''} onChange={e => setEditingItem({...editingItem, department: e.target.value})} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Position</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.position || ''} onChange={e => setEditingItem({...editingItem, position: e.target.value})} />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Research Parameters */}
                                <div className="space-y-6 pt-6 border-t border-slate-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                                            <TagIcon className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Study Parameters</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Research Type</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.researchType || ''} onChange={e => setEditingItem({...editingItem, researchType: e.target.value})} placeholder="Survey" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Study Area</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.studyArea || ''} onChange={e => setEditingItem({...editingItem, studyArea: e.target.value})} placeholder="Psychiatry" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.studyLocation || ''} onChange={e => setEditingItem({...editingItem, studyLocation: e.target.value})} placeholder="EMSH" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Funding Source</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.fundingSource || ''} onChange={e => setEditingItem({...editingItem, fundingSource: e.target.value})} placeholder="AMSH / Grant..." />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3.5: Participant Context */}
                                <div className="space-y-6 pt-6 border-t border-slate-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                                            <BeakerIcon className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Participant Context</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Patients Involved</label>
                                            <select className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.patientsInvolved ? 'YES' : 'NO'} onChange={e => setEditingItem({...editingItem, patientsInvolved: e.target.value === 'YES'})}>
                                                <option value="YES">YES</option>
                                                <option value="NO">NO</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Sample Size (N)</label>
                                            <input type="number" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.sampleSize || ''} onChange={e => setEditingItem({...editingItem, sampleSize: e.target.value})} placeholder="Number of participants" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Participant Type</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.participantType || ''} onChange={e => setEditingItem({...editingItem, participantType: e.target.value})} placeholder="N/A" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Protocol Date</label>
                                            <input className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold" value={new Date(editingItem.createdAt).toLocaleDateString()} readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6 pt-6 border-t border-slate-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                            <GlobalIcon className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Public Indexing</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Journal Name</label>
                                            <input 
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                                value={editingItem.journal || ''}
                                                onChange={e => setEditingItem({...editingItem, journal: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Release Year</label>
                                            <input 
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                                value={editingItem.year || ''}
                                                onChange={e => setEditingItem({...editingItem, year: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Volume & Issue</label>
                                            <div className="flex gap-2">
                                              <input 
                                                  className="w-1/2 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                                  placeholder="Volume (e.g. 10)"
                                                  value={editingItem.volume || ''}
                                                  onChange={e => setEditingItem({...editingItem, volume: e.target.value})}
                                              />
                                              <input 
                                                  className="w-1/2 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                                  placeholder="Issue (e.g. 2)"
                                                  value={editingItem.issue || ''}
                                                  onChange={e => setEditingItem({...editingItem, issue: e.target.value})}
                                              />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">DOI (Digital Object Identifier)</label>
                                            <input 
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                                value={editingItem.doi || ''}
                                                onChange={e => setEditingItem({...editingItem, doi: e.target.value})}
                                                placeholder="10.1000/xyz123"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Document Management Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Document Management</label>
                                        <span className="px-2 py-0.5 text-[8px] font-black bg-amber-50 text-amber-500 border border-amber-100 rounded-full uppercase tracking-widest">PDF Only</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Proposal Document */}
                                        <div className="rounded-2xl border border-slate-200 overflow-hidden">
                                            <div className="px-5 py-3 bg-slate-800 flex items-center gap-2">
                                                <DocumentTextIcon className="w-4 h-4 text-primary flex-shrink-0" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Proposal Document</span>
                                            </div>

                                            {/* Original file */}
                                            <div className="p-4 bg-slate-50 border-b border-slate-200">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Original Submission</p>
                                                {editingItem.proposal ? (
                                                    <button type="button" onClick={() => setViewingDoc({ title: 'Proposal Document', url: getSafeDocUrl(editingItem.proposal) })} className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-primary hover:shadow-sm transition-all group/link text-left">
                                                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <DocumentMagnifyingGlassIcon className="w-4 h-4 text-red-500" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-[10px] font-black text-slate-700 truncate group-hover/link:text-primary transition-colors">proposal.pdf</p>
                                                            <p className="text-[8px] text-slate-400 font-bold">Click to view inline</p>
                                                        </div>
                                                        <DocumentMagnifyingGlassIcon className="w-4 h-4 text-slate-300 group-hover/link:text-primary transition-colors flex-shrink-0" />
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-dashed border-slate-200">
                                                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <DocumentTextIcon className="w-4 h-4 text-slate-300" />
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 font-bold italic">No original file uploaded</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Published version */}
                                            <div className="p-4 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Published Version</p>
                                                    {editingItem.publishedProposal && (
                                                        <a href={getSafeDocUrl(editingItem.publishedProposal)} target="_blank" className="text-[8px] font-black text-emerald-500 hover:text-emerald-700 uppercase tracking-widest">View Current</a>
                                                    )}
                                                </div>
                                                <label className="flex items-center gap-3 cursor-pointer group/toggle">
                                                    <div className="relative">
                                                        <input 
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={!!editingItem.replaceProposal}
                                                            onChange={e => setEditingItem({...editingItem, replaceProposal: e.target.checked, newProposalFile: undefined})}
                                                        />
                                                        <div className="w-10 h-5 bg-slate-200 rounded-full peer-checked:bg-primary transition-colors"></div>
                                                        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover/toggle:text-slate-700 transition-colors">
                                                        {editingItem.replaceProposal ? 'Upload New Published File' : 'Use Original File'}
                                                    </span>
                                                </label>
                                                {editingItem.replaceProposal && (
                                                    <input 
                                                        type="file"
                                                        accept=".pdf"
                                                        className="w-full text-xs font-bold text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-primary file:text-white hover:file:bg-primary-dark transition-all"
                                                        onChange={e => setEditingItem({...editingItem, newProposalFile: e.target.files?.[0]})}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        {/* Ethical Letter */}
                                        <div className="rounded-2xl border border-slate-200 overflow-hidden">
                                            <div className="px-5 py-3 bg-slate-800 flex items-center gap-2">
                                                <CheckCircleIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Ethical Approval Letter</span>
                                            </div>

                                            {/* Original file */}
                                            <div className="p-4 bg-slate-50 border-b border-slate-200">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Original Submission</p>
                                                {editingItem.ethicalLetter ? (
                                                    <button type="button" onClick={() => setViewingDoc({ title: 'Ethical Approval Letter', url: getSafeDocUrl(editingItem.ethicalLetter) })} className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-sm transition-all group/link text-left">
                                                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <DocumentMagnifyingGlassIcon className="w-4 h-4 text-emerald-500" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-[10px] font-black text-slate-700 truncate group-hover/link:text-emerald-600 transition-colors">ethical-letter.pdf</p>
                                                            <p className="text-[8px] text-slate-400 font-bold">Click to view inline</p>
                                                        </div>
                                                        <DocumentMagnifyingGlassIcon className="w-4 h-4 text-slate-300 group-hover/link:text-emerald-500 transition-colors flex-shrink-0" />
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-dashed border-slate-200">
                                                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <CheckCircleIcon className="w-4 h-4 text-slate-300" />
                                                        </div>
                                                        <p className="text-[10px] text-slate-400 font-bold italic">No ethical letter uploaded</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Published version */}
                                            <div className="p-4 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Published Version</p>
                                                    {editingItem.publishedEthical && (
                                                        <a href={editingItem.publishedEthical} target="_blank" className="text-[8px] font-black text-emerald-500 hover:text-emerald-700 uppercase tracking-widest">View Current</a>
                                                    )}
                                                </div>
                                                <label className="flex items-center gap-3 cursor-pointer group/toggle">
                                                    <div className="relative">
                                                        <input 
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={!!editingItem.replaceEthical}
                                                            onChange={e => setEditingItem({...editingItem, replaceEthical: e.target.checked, newEthicalFile: undefined})}
                                                        />
                                                        <div className="w-10 h-5 bg-slate-200 rounded-full peer-checked:bg-emerald-500 transition-colors"></div>
                                                        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover/toggle:text-slate-700 transition-colors">
                                                        {editingItem.replaceEthical ? 'Upload New Published File' : 'Use Original File'}
                                                    </span>
                                                </label>
                                                {editingItem.replaceEthical && (
                                                    <input 
                                                        type="file"
                                                        accept=".pdf"
                                                        className="w-full text-xs font-bold text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 transition-all"
                                                        onChange={e => setEditingItem({...editingItem, newEthicalFile: e.target.files?.[0]})}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Ethics Metadata</label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-2xl">
                                            <div>
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Approve Status</label>
                                                <select className="w-full px-4 py-2 mt-1 bg-white border border-slate-200 rounded-xl text-xs font-bold" value={editingItem.ethicsApproved ? 'TRUE' : 'FALSE'} onChange={e => setEditingItem({...editingItem, ethicsApproved: e.target.value === 'TRUE'})}>
                                                    <option value="TRUE">Approved</option>
                                                    <option value="FALSE">Not Approved / Unknown</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Committee Name</label>
                                                <input className="w-full px-4 py-2 mt-1 bg-white border border-slate-200 rounded-xl text-xs font-bold" value={editingItem.ethicsCommittee || ''} onChange={e => setEditingItem({...editingItem, ethicsCommittee: e.target.value})} placeholder="IRB Committee" />
                                            </div>
                                            <div>
                                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Approval Number</label>
                                                <input className="w-full px-4 py-2 mt-1 bg-white border border-slate-200 rounded-xl text-xs font-bold" value={editingItem.ethicsApprovalNumber || ''} onChange={e => setEditingItem({...editingItem, ethicsApprovalNumber: e.target.value})} placeholder="ETH-12345" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Status (Workflow Control)</label>
                                            <select className="w-full px-6 py-4 bg-blue-50/50 border border-blue-200 rounded-2xl font-black text-blue-900 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none" value={editingItem.status || 'PENDING'} onChange={e => setEditingItem({...editingItem, status: e.target.value})}>
                                                <option value="PENDING">PENDING</option>
                                                <option value="UNDER_REVIEW">UNDER REVIEW</option>
                                                <option value="APPROVED">APPROVED</option>
                                                <option value="REJECTED">REJECTED</option>
                                                <option value="PUBLISHED">PUBLISHED</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Created / Updated Metadata</label>
                                            <div className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-400 text-xs">
                                                Created: {new Date(editingItem.createdAt).toLocaleDateString()}<br/>
                                                Updated: {new Date(editingItem.updatedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Reviewer Feedback & Comments</label>
                                    <textarea 
                                        className="w-full px-6 py-4 bg-blue-50/30 border border-blue-100 rounded-2xl font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none h-32 no-scrollbar placeholder:text-slate-300"
                                        value={editingItem.reviewerComments || ''}
                                        onChange={e => setEditingItem({...editingItem, reviewerComments: e.target.value})}
                                        placeholder="Add IRB committee notes or reasons for rejection/revision..."
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Institutional Tracking ID</label>
                                    <input 
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs text-slate-400 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                        value={editingItem.submissionId || 'NOT_ASSIGNED'}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Citations / Authors (JSON Array)</label>
                                    <input 
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs text-slate-700 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                        value={editingItem.coInvestigators || '[]'}
                                        onChange={e => setEditingItem({...editingItem, coInvestigators: e.target.value})}
                                        placeholder='["Author 1", "Author 2"]'
                                    />
                                </div>
                            </div>
                            
                            <div className="pt-4 flex items-center gap-4">
                                <button type="submit" className="flex-1 py-5 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                                    Commit Changes & Structure
                                </button>
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-10 py-5 bg-white border border-slate-200 text-slate-400 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:text-slate-900 transition-all">
                                    Discard
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Inline PDF Viewer Overlay */}
            {viewingDoc && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2rem] w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/20 rounded-xl text-primary">
                                    <DocumentMagnifyingGlassIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-white text-sm tracking-tight">{viewingDoc.title}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Institutional Document Viewer • Secured</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <a href={viewingDoc.url} target="_blank" className="px-4 py-2 bg-primary/20 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                                    Open in Tab
                                </a>
                                <button onClick={() => setViewingDoc(null)} className="p-2 bg-slate-800 hover:bg-red-500 text-slate-400 hover:text-white rounded-xl transition-colors">
                                    <XMarkIcon className="w-5 h-5 stroke-[2.5]" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-200">
                            <iframe
                                src={viewingDoc.url}
                                className="w-full h-full border-0"
                                title={viewingDoc.title}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function SubmissionCard({ item, onUpdate, onStatusUpdate, onDelete, isProposalTab }: { item: any; onUpdate: () => void; onStatusUpdate: (id: string, status: string) => void; onDelete: (id: string) => void; isProposalTab?: boolean }) {
    const statusStyles: any = {
        PENDING: 'bg-amber-50 text-amber-600 border-amber-100',
        UNDER_REVIEW: 'bg-blue-50 text-blue-600 border-blue-100',
        APPROVED: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        REJECTED: 'bg-red-50 text-red-600 border-red-100',
        PUBLISHED: 'bg-primary/10 text-primary border-primary/20'
    };

    return (
        <div className="bg-white p-7 rounded-[3rem] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group animate-in slide-in-from-bottom-8 h-full flex flex-col">
            <div className="absolute top-0 right-0 w-full h-32 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10 flex flex-col flex-1 gap-6">
                {/* Header Icon + ID */}
                <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-sm">
                        {isProposalTab ? <DocumentTextIcon className="w-8 h-8" /> : <BeakerIcon className="w-8 h-8" />}
                    </div>
                    <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest font-mono">
                        ID: {item.submissionId || item.id}
                    </span>
                </div>

                {/* Title Section */}
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border shadow-sm ${statusStyles[item.status] || 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                            {item.status?.replace('_', ' ') || 'PENDING'}
                        </div>
                        <div className="text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-40">
                            {isProposalTab ? 'PROTOCOL' : 'MANUSCRIPT'}
                        </div>
                    </div>
                    <h3 className="font-jakarta font-black text-slate-900 text-lg tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-4">
                        {item.title}
                    </h3>
                </div>

                {/* Meta Grid - Stacked Vertically for Portrait feel */}
                <div className="space-y-3 pt-5 border-t border-slate-100 mt-auto">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
                            <UserIcon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Investigator</p>
                            <p className="text-[10px] font-bold text-slate-900 truncate">{item.investigatorName || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
                            <TagIcon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Research Method</p>
                            <p className="text-[10px] font-bold text-slate-700 truncate">{item.researchType || 'Clinical'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
                            <ClockIcon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Timeline</p>
                            <p className="text-[10px] font-bold text-slate-700 truncate">{new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Action Column */}
                <div className="flex flex-col gap-3 pt-6 border-t border-slate-100 mt-4">
                    <div className="flex items-center gap-2">
                        {item.proposal ? (
                            <a href={getSafeDocUrl(item.proposal)} target="_blank" className="flex-1 py-3.5 text-center bg-slate-950 text-white rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-lg flex items-center justify-center gap-2">
                                <BookOpenIcon className="w-4 h-4" /> Open File
                            </a>
                        ) : (
                            <div className="flex-1 py-3.5 text-center bg-slate-100 text-slate-400 rounded-xl text-[8px] font-black uppercase tracking-widest italic">No File</div>
                        )}
                        {!isProposalTab && (
                            <button onClick={onUpdate} className="p-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all shadow-sm" title="Edit Metadata">
                                <PencilSquareIcon className="w-4 h-4" />
                            </button>
                        )}
                        <button onClick={() => onDelete(item.id)} className="p-3.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all border border-red-100 shadow-sm" title="Delete">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {isProposalTab ? (
                            <>
                                <button onClick={() => onStatusUpdate(item.id, 'APPROVED')} className="w-full py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm group-hover:shadow-emerald-500/20">Approve Protocol</button>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => onStatusUpdate(item.id, 'REJECTED')} className="py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all">Decline</button>
                                    <button onClick={() => onStatusUpdate(item.id, 'UNDER_REVIEW')} className="py-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all">Review</button>
                                </div>
                            </>
                        ) : item.status === 'PUBLISHED' ? (
                            <button 
                                onClick={() => onStatusUpdate(item.id, 'UNDER_REVIEW')} 
                                className="w-full py-4 bg-slate-100 text-slate-600 hover:bg-slate-950 hover:text-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                            >
                                Unpublish Manuscript
                            </button>
                        ) : (
                            <>
                                <button onClick={() => onStatusUpdate(item.id, 'PUBLISHED')} className="w-full py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm group-hover:shadow-emerald-500/20">Publish Manusc.</button>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => onStatusUpdate(item.id, 'REJECTED')} className="py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all">Reject</button>
                                    <button onClick={() => onStatusUpdate(item.id, 'UNDER_REVIEW')} className="py-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all">Review</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RepositoryCard({ item, onEdit, onDelete }: { item: any, onEdit: () => void, onDelete: (id: string) => void }) {
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 group relative flex flex-col justify-between">
            <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex flex-col items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="text-xs font-black">{item.year || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={onEdit} className="p-2 text-slate-300 hover:text-primary transition-colors"><PencilSquareIcon className="w-4 h-4" /></button>
                        <button onClick={() => onDelete(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                    </div>
                </div>
                <h4 className="font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-3">{item.title}</h4>
                <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 font-bold overflow-hidden text-ellipsis whitespace-nowrap italic">{item.authors || 'No authors specified'}</p>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{item.journal || 'Research Archive'}</p>
                </div>
            </div>
            
            <div className="mt-6 flex flex-col gap-2">
                {item.proposal ? (
                    <a href={getSafeDocUrl(item.proposal)} target="_blank" className="flex items-center justify-center gap-3 w-full py-3 bg-slate-50 text-slate-500 hover:bg-primary hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-slate-100">
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        Access Publication
                    </a>
                ) : (
                    <div className="flex items-center justify-center gap-3 w-full py-3 bg-slate-50 text-slate-300 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100 border-dashed italic">NO PDF ATTACHED</div>
                )}
            </div>
        </div>
    );
}

function InfoBit({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
    return (
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white rounded flex-shrink-0">
                <Icon className="w-3 h-3 text-primary" />
            </div>
            <div className="min-w-0">
                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                <p className="text-[9px] font-bold text-slate-700 truncate">{value || 'N/A'}</p>
            </div>
        </div>
    );
}

function EmptyState({ label, icon: Icon }: { label: string; icon: any }) {
    return (
        <div className="py-20 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200 text-center">
            <Icon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        </div>
    );
}
