'use client';

import { useState, useEffect } from 'react';
import { faqAPI } from '@/lib/api';
import {
    QuestionMarkCircleIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
    XMarkIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    MagnifyingGlassIcon,
    SparklesIcon,
    ArrowPathIcon,
    DocumentTextIcon,
    BoltIcon,
    ShieldCheckIcon,
    ArchiveBoxIcon,
} from '@heroicons/react/24/outline';

export default function FaqsAdmin() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const [search, setSearch] = useState('');

    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: 'General',
        isActive: true,
        order: 0
    });

    const fetchFaqs = async () => {
        setLoading(true);
        try {
            const res = await faqAPI.getAll();
            setFaqs(res.data.faqs || []);
        } catch (error) {
            console.error('Fetch FAQs error:', error);
            setFaqs([
                { id: '1', question: 'What are your visiting hours?', answer: 'Our visiting hours are from 10:00 AM to 8:00 PM daily.', category: 'Institutional', isActive: true, order: 1 },
                { id: '2', question: 'How can I book an appointment?', answer: 'You can book an appointment through our website or by calling our reception.', category: 'Clinical Operations', isActive: true, order: 2 },
                { id: '3', question: 'Where is the main entrance located?', answer: 'The main entrance is located on Block A, facing the main parking lot.', category: 'Institutional', isActive: true, order: 3 },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleOpenModal = (item: any = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                question: item.question,
                answer: item.answer,
                category: item.category,
                isActive: item.isActive,
                order: item.order
            });
        } else {
            setEditingItem(null);
            setFormData({
                question: '',
                answer: '',
                category: 'General',
                isActive: true,
                order: faqs.length + 1
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await faqAPI.update(editingItem.id, formData);
            } else {
                await faqAPI.create(formData);
            }
            setIsModalOpen(false);
            fetchFaqs();
        } catch (error) {
            alert('Operation failed. Please verify API protocols.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Initiate permanent deletion of this informational node?')) return;
        try {
            await faqAPI.delete(id);
            fetchFaqs();
        } catch (error) {
            alert('Termination failed. Node is locked or unreachable.');
        }
    };

    const toggleStatus = async (item: any) => {
        try {
            await faqAPI.update(item.id, { ...item, isActive: !item.isActive });
            fetchFaqs();
        } catch (error) {
            alert('Status synchronization failure.');
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredFaqs = faqs.filter(f =>
        f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.answer.toLowerCase().includes(search.toLowerCase()) ||
        f.category.toLowerCase().includes(search.toLowerCase())
    );

    const categories = Array.from(new Set(filteredFaqs.map(f => f.category)));

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* FAQ Command Center */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <QuestionMarkCircleIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Knowledge Base Matrix</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none mb-6">Static Data Hub</h2>
                    <p className="text-slate-500 font-medium max-w-2xl leading-relaxed text-lg">Maintaining institutional FAQ nodes, public informational directives, and operational answers for visitor guidance.</p>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="w-full lg:w-auto flex items-center justify-center gap-4 px-12 py-6 bg-primary text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-[0_20px_40px_rgba(27,79,138,0.25)] hover:-translate-y-1 active:translate-y-0 relative z-10"
                >
                    <PlusIcon className="w-5 h-5 stroke-[2.5]" />
                    <span>Deploy New Node</span>
                </button>
            </div>

            {/* Tactical Search Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm flex items-center gap-6 group hover:border-primary/20 transition-all">
                    <div className="w-16 h-16 bg-primary/5 text-primary rounded-[1.5rem] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                        <BoltIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Nodes</p>
                        <p className="text-3xl font-jakarta font-black text-slate-900 leading-none">{faqs.length}</p>
                    </div>
                </div>

                <div className="lg:col-span-3 h-full">
                    <div className="relative h-full group">
                        <MagnifyingGlassIcon className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors duration-300" />
                        <input
                            type="text"
                            placeholder="Scan knowledge base by question keyword, category, or response snippet..."
                            className="w-full h-full pl-20 pr-10 py-8 bg-white border border-slate-200/60 rounded-[2.5rem] shadow-sm focus:ring-[15px] focus:ring-primary/5 focus:border-primary/20 transition-all font-medium text-slate-700 outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button onClick={fetchFaqs} className="absolute right-8 top-1/2 -translate-y-1/2 p-4 text-slate-300 hover:text-primary transition-colors">
                            <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* FAQ Matrix Hierarchy */}
            <div className="space-y-12">
                {loading && faqs.length === 0 ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-slate-50 animate-pulse h-40" />
                    ))
                ) : filteredFaqs.length === 0 ? (
                    <div className="bg-white py-40 rounded-[4rem] border border-slate-200/60 text-center shadow-sm">
                        <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center mx-auto mb-10 text-slate-100 shadow-inner">
                            <QuestionMarkCircleIcon className="w-16 h-16" />
                        </div>
                        <h3 className="text-3xl font-jakarta font-black text-slate-900 mb-2">Informational Null</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">No knowledge nodes detected for current parameters.</p>
                    </div>
                ) : (
                    categories.map(cat => (
                        <div key={cat} className="space-y-6">
                            <div className="flex items-center gap-6 px-4">
                                <div className="h-px bg-slate-200 flex-1" />
                                <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.4em] flex items-center gap-4">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(27,79,138,0.5)]" />
                                    {cat}
                                </h3>
                                <div className="h-px bg-slate-200 flex-1" />
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {filteredFaqs.filter(f => f.category === cat).sort((a, b) => a.order - b.order).map((item) => (
                                    <div
                                        key={item.id}
                                        className={`group bg-white border rounded-[3rem] transition-all duration-500 overflow-hidden ${expandedIds.includes(item.id) ? 'border-primary/20 shadow-2xl ring-8 ring-primary/[0.02]' : 'border-slate-100 shadow-sm hover:border-slate-200'}`}
                                    >
                                        <div className="p-8 lg:p-10 flex items-center justify-between gap-10">
                                            <button
                                                onClick={() => toggleExpand(item.id)}
                                                className="flex-1 flex items-center gap-8 text-left group/btn"
                                            >
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 border ${expandedIds.includes(item.id) ? 'bg-primary text-white border-primary shadow-xl rotate-6' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>
                                                    <QuestionMarkCircleIcon className="w-8 h-8" />
                                                </div>
                                                <div className="min-w-0">
                                                    <span className={`block font-jakarta font-black text-xl lg:text-2xl leading-tight mb-2 tracking-tight transition-colors ${!item.isActive ? 'text-slate-300' : 'text-slate-900 group-hover/btn:text-primary'}`}>
                                                        {item.question}
                                                    </span>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-lg">INDEX NO: {item.order}</span>
                                                        {!item.isActive && (
                                                            <span className="text-[9px] font-black bg-slate-50 text-slate-400 px-3 py-1 rounded-lg uppercase tracking-widest flex items-center gap-2">
                                                                <XCircleIcon className="w-3.5 h-3.5" /> DRAFT_PROTOCOL
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>

                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleOpenModal(item)}
                                                    className="p-5 text-slate-300 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all border border-transparent hover:border-primary/10 shadow-sm hover:shadow-xl"
                                                    title="Modify Node"
                                                >
                                                    <PencilSquareIcon className="w-6 h-6 border-slate-100" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100 shadow-sm hover:shadow-xl"
                                                    title="Purge Node"
                                                >
                                                    <TrashIcon className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={() => toggleExpand(item.id)}
                                                    className={`p-5 rounded-2xl transition-all ${expandedIds.includes(item.id) ? 'bg-slate-900 text-white' : 'text-slate-300'}`}
                                                >
                                                    {expandedIds.includes(item.id) ? <XMarkIcon className="w-6 h-6" /> : <ChevronDownIcon className="w-6 h-6" />}
                                                </button>
                                            </div>
                                        </div>

                                        {expandedIds.includes(item.id) && (
                                            <div className="px-10 pb-10 pt-4 border-t border-slate-50 bg-slate-50/20 animate-in slide-in-from-top-4 duration-500">
                                                <div className="mt-4 p-12 bg-white rounded-[2.5rem] border border-slate-100 shadow-inner relative group/ans overflow-hidden">
                                                    <p className="text-slate-600 text-xl leading-relaxed font-medium italic select-none relative z-10">
                                                        "{item.answer}"
                                                    </p>
                                                    <SparklesIcon className="absolute top-10 right-10 w-20 h-20 text-primary opacity-5 group-hover/ans:opacity-10 transition-opacity" />
                                                </div>
                                                <div className="flex items-center gap-6 mt-8 ml-4">
                                                    <button
                                                        onClick={() => toggleStatus(item)}
                                                        className={`text-[10px] font-black uppercase tracking-[0.25em] flex items-center gap-3 px-6 py-2.5 rounded-xl border transition-all ${item.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}
                                                    >
                                                        {item.isActive ? <><ShieldCheckIcon className="w-5 h-5" /> Operational Profile</> : <><ArchiveBoxIcon className="w-5 h-5 text-amber-500" /> Draft Synchronized</>}
                                                    </button>
                                                    <div className="px-6 py-2.5 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-200">
                                                        Protocol Secured
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Entity Terminal (Modal) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white rounded-[4rem] w-full max-w-2xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
                        <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/80">
                            <div>
                                <h3 className="text-2xl font-jakarta font-black text-slate-900 tracking-tight uppercase">
                                    {editingItem ? 'Modify Node Spec' : 'Initialize Knowledge Node'}
                                </h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                    Configuring strategic informational parameters
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white hover:bg-slate-50 rounded-full transition-all text-slate-400 border border-slate-200 shadow-sm group">
                                <XMarkIcon className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-12 space-y-10">
                            <div className="space-y-4">
                                <label className="text-[11px] font-black text-primary uppercase tracking-[0.3em] ml-2">Question Directive</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] text-sm font-black text-slate-900 focus:ring-[15px] focus:ring-primary/5 transition-all outline-none"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    placeholder="Enter institutional question..."
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[11px] font-black text-primary uppercase tracking-[0.3em] ml-2">Knowledge Payload (Answer)</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2.5rem] text-sm font-medium text-slate-700 focus:ring-[15px] focus:ring-primary/5 transition-all resize-none italic leading-relaxed"
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    placeholder="Provide detailed institutional response..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-primary uppercase tracking-[0.3em] ml-2">Channel Category</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-8 py-5 bg-slate-50 border-0 rounded-[1.8rem] text-sm font-black text-slate-900 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g. Institutional"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-primary uppercase tracking-[0.3em] ml-2">Matrix Index</label>
                                    <input
                                        type="number"
                                        className="w-full px-8 py-5 bg-slate-50 border-0 rounded-[1.8rem] text-sm font-black text-slate-900 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row items-center gap-8 pt-8 border-t border-slate-50">
                                <label className="flex items-center gap-4 cursor-pointer group px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-xl">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        <div className="w-14 h-7 bg-slate-200 rounded-full peer peer-checked:bg-primary transition-all shadow-inner" />
                                        <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-7 shadow-lg" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">Public Access Authorized</span>
                                </label>

                                <button
                                    type="submit"
                                    className="w-full lg:flex-1 h-20 bg-primary text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(27,79,138,0.3)] hover:bg-primary-dark transition-all active:scale-95"
                                >
                                    {editingItem ? 'Commit Synchronized Node' : 'Deploy Knowledge Node'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
