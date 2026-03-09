'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { pagesAPI } from '@/lib/api';
import {
    DocumentArrowUpIcon,
    XMarkIcon,
    EyeIcon,
    ArrowLeftIcon,
    CloudArrowUpIcon,
    IdentificationIcon,
    SparklesIcon,
    CommandLineIcon,
    PuzzlePieceIcon,
    ViewColumnsIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function NewPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        status: 'DRAFT',
        metaTitle: '',
        metaDesc: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await pagesAPI.create(formData);
            router.push('/admin/pages');
        } catch (error) {
            alert('Deployment failed. Signature conflict or node refusal.');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        setFormData({ ...formData, title, slug });
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Deployment Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    <Link
                        href="/admin/pages"
                        className="w-16 h-16 bg-slate-50 text-slate-400 hover:text-primary rounded-2xl flex items-center justify-center transition-all border border-slate-100 group/back shadow-inner"
                    >
                        <ArrowLeftIcon className="w-6 h-6 group-hover/back:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <PuzzlePieceIcon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Institutional Content Architect</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none">Architect New Node</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <button
                        onClick={() => router.push('/admin/pages')}
                        className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 rounded-[1.5rem] transition-all"
                    >
                        Abort Operation
                    </button>
                    <button
                        form="page-form"
                        disabled={loading}
                        className="flex items-center gap-4 px-12 py-5 bg-primary text-white rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-[0_20px_40px_rgba(27,79,138,0.25)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"
                    >
                        {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CloudArrowUpIcon className="w-5 h-5" />}
                        <span>{loading ? 'DEPLOYING...' : 'COMMIT TO PRODUCTION'}</span>
                    </button>
                </div>
            </div>

            <form id="page-form" onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Visual Editor Workspace */}
                <div className="xl:col-span-2 space-y-10">
                    <div className="bg-white p-10 lg:p-14 rounded-[4rem] border border-slate-200/60 shadow-sm space-y-12">
                        <div className="space-y-4">
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 font-jakarta">Node Designation (Title)</label>
                            <input
                                type="text"
                                required
                                placeholder="Core institutional nomenclature..."
                                className="w-full text-5xl font-jakarta font-black border-none focus:ring-0 placeholder:text-slate-100 p-0 mb-4"
                                value={formData.title}
                                onChange={(e) => generateSlug(e.target.value)}
                            />
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 group">
                                <CommandLineIcon className="w-5 h-5 text-slate-300" />
                                <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">Protocol URL:</span>
                                <span className="text-sm font-bold text-primary tracking-tight">https://emsh.gov.et/</span>
                                <input
                                    type="text"
                                    required
                                    className="bg-transparent border-none p-0 text-sm font-bold text-primary outline-none focus:ring-0 flex-1"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-8 bg-accent rounded-full" />
                                    <h3 className="text-xl font-jakarta font-black text-slate-900 uppercase tracking-widest text-sm">Content Matrix</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button type="button" className="p-3 text-slate-300 hover:text-primary transition-colors hover:bg-slate-50 rounded-xl">
                                        <ViewColumnsIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <textarea
                                required
                                placeholder="Initialize node content here... Support for Markdown and HTML standard architectures."
                                className="w-full min-h-[600px] text-lg font-medium text-slate-600 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 p-10 focus:ring-[15px] focus:ring-primary/5 transition-all outline-none resize-none leading-relaxed italic"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Tactical Parameters (Sidebar) */}
                <div className="space-y-10">
                    {/* Status Console */}
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-200/60 shadow-sm space-y-8">
                        <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                            <div className="p-2 bg-slate-50 rounded-xl">
                                <SparklesIcon className="w-5 h-5 text-slate-400" />
                            </div>
                            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">Deployment State</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {['DRAFT', 'PUBLISHED'].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, status: s })}
                                    className={`py-6 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest border transition-all ${formData.status === s ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-white'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SEO Intelligence */}
                    <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl space-y-8 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] pointer-events-none" />
                        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                            <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                                <EyeIcon className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">SEO Metadata Protocol</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Crawler Title Signature</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                                    placeholder="Institutional Portal | Section Name"
                                    value={formData.metaTitle}
                                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Meta Descriptions Vector</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-medium text-white/70 outline-none focus:ring-4 focus:ring-primary/20 transition-all resize-none"
                                    rows={4}
                                    placeholder="Brief narrative summary for global indexing engines..."
                                    value={formData.metaDesc}
                                    onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure Logic */}
                    <div className="bg-primary/5 p-10 rounded-[3rem] border border-primary/10 relative overflow-hidden">
                        <CommandLineIcon className="absolute -bottom-6 -right-6 w-32 h-32 text-primary opacity-5" />
                        <div className="relative z-10 space-y-4">
                            <h5 className="text-[11px] font-black text-primary uppercase tracking-widest">Architect Notes</h5>
                            <p className="text-xs font-bold text-slate-500 leading-relaxed italic opacity-80">
                                "Nodes deployed to production are globally indexed within 240ms. Ensure all institutional signatures are verified before committing."
                            </p>
                            <div className="pt-4 flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Backend Ready for Sync</span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
