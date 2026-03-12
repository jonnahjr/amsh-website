'use client';

import { useState, useEffect } from 'react';
import { mediaAPI } from '@/lib/api';
import {
    CloudArrowUpIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    LinkIcon,
    Square2StackIcon,
    XMarkIcon,
    PhotoIcon,
    DocumentIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

export default function AdminMediaPage() {
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [copyStatus, setCopyStatus] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const res = await mediaAPI.getAll({ search });
            setMedia(res.data.media || []);
        } catch (error) {
            console.error('Core synchronisation failed:', error);
            setMedia([]); // Don't show confusing dummy data
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => fetchMedia(), 300);
        return () => clearTimeout(timer);
    }, [search]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        try {
            for (let i = 0; i < files.length; i++) {
                await mediaAPI.upload(files[i]);
            }
            fetchMedia();
        } catch {
            alert('Upload sequence failed. Please verify asset integrity.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Initiate permanent deletion of this asset?')) {
            try {
                await mediaAPI.delete(id);
                fetchMedia();
            } catch {
                alert('Termination failed. Asset is locked or unavailable.');
            }
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopyStatus(url);
        setTimeout(() => setCopyStatus(null), 2000);
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Asset Command Center */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <PhotoIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Centralized Media Repository</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none mb-6">Asset Intelligence</h2>
                    <p className="text-slate-500 font-medium max-w-2xl leading-relaxed text-lg">Managing global media assets, institutional photography, and clinical documentation for cross-platform synchronization.</p>
                </div>

                <div className="flex flex-col gap-4 w-full lg:w-auto min-w-[320px]">
                    <div 
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const files = e.dataTransfer.files;
                            if (files.length > 0) {
                                const event = { 
                                    target: { files } 
                                } as unknown as React.ChangeEvent<HTMLInputElement>;
                                handleUpload(event);
                            }
                        }}
                        className={`relative group/drop cursor-pointer border-2 border-dashed rounded-[2rem] p-8 transition-all duration-300 flex flex-col items-center justify-center gap-3 ${uploading ? 'bg-primary/5 border-primary/30 pointer-events-none' : 'bg-slate-50 border-slate-200 hover:border-primary/50 hover:bg-primary/[0.02]'}`}
                    >
                        <input 
                            type="file" 
                            id="manual-upload"
                            className="hidden" 
                            onChange={handleUpload} 
                            multiple 
                            disabled={uploading}
                        />
                        <label htmlFor="manual-upload" className="absolute inset-0 cursor-pointer" />
                        
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 scale-90 group-hover/drop:scale-100 ${uploading ? 'bg-primary text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
                            {uploading ? <ArrowPathIcon className="w-6 h-6 animate-spin" /> : <CloudArrowUpIcon className="w-7 h-7" />}
                        </div>
                        
                        <div className="text-center">
                            <p className={`text-[11px] font-black uppercase tracking-[0.15em] mb-1 ${uploading ? 'text-primary' : 'text-slate-900'}`}>
                                {uploading ? 'Synching Data...' : 'Manual Ingest'}
                            </p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                                {uploading ? 'Encryption in Progress' : 'Drag & Drop or Click'}
                            </p>
                        </div>

                        {uploading && (
                            <div className="absolute inset-x-8 bottom-4 h-1 bg-primary/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary animate-[upload-progress_2s_ease-in-out_infinite]" />
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={() => fetchMedia()}
                        className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                    >
                        <ArrowPathIcon className="w-3 h-3" /> System Refresh
                    </button>
                </div>
            </div>

            {/* Tactical Search & View Filters */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="relative flex-1 group">
                    <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Scan repository by nomenclature, extension, or clinical tag..."
                        className="w-full pl-16 pr-8 py-5 bg-white border border-slate-200/60 rounded-[2rem] shadow-sm focus:ring-[10px] focus:ring-primary/5 focus:border-primary/20 transition-all font-medium text-slate-700 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center p-2 bg-white border border-slate-200/60 rounded-[2rem] shadow-sm gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-4 rounded-2xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg' : 'text-slate-300 hover:bg-slate-50'}`}
                    >
                        <Square2StackIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-4 rounded-2xl transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-lg' : 'text-slate-300 hover:bg-slate-50'}`}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                    </button>
                </div>
            </div>

            {/* Asset Display Matrix */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {loading ? (
                        [...Array(10)].map((_, i) => (
                            <div key={i} className="aspect-square bg-white rounded-[3rem] border border-slate-50 p-4 animate-pulse">
                                <div className="w-full h-full bg-slate-50 rounded-[2rem]" />
                            </div>
                        ))
                    ) : media.length === 0 ? (
                        <div className="col-span-full py-40 text-center bg-white rounded-[4rem] border border-slate-200/60 shadow-sm">
                            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-slate-200">
                                <PhotoIcon className="w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-jakarta font-black text-slate-900 mb-2">Repository Empty</h3>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">No operational assets detected in the current query.</p>
                        </div>
                    ) : (
                        media.map((item) => (
                            <div key={item.id} className="group relative aspect-square bg-white rounded-[3rem] border border-slate-200/60 p-3 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all overflow-hidden hover:-translate-y-1">
                                {item.type === 'IMAGE' ? (
                                    <img src={item.url} alt={item.filename} className="w-full h-full object-cover rounded-[2.5rem] group-hover:scale-110 transition-transform duration-1000" crossOrigin="anonymous" />
                                ) : (
                                    <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center rounded-[2.5rem] p-8 text-center border border-slate-100 group-hover:bg-primary/5 transition-colors">
                                        <DocumentIcon className="w-16 h-16 text-slate-200 mb-3 group-hover:text-primary transition-colors" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate w-full group-hover:text-primary">{item.filename.split('.').pop()}</span>
                                    </div>
                                )}

                                {/* Tactical Overlay */}
                                <div className="absolute inset-5 bg-slate-950/80 backdrop-blur-md rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 scale-95 group-hover:scale-100">
                                    <button
                                        onClick={() => copyToClipboard(item.url)}
                                        className="w-12 h-12 bg-white/10 hover:bg-primary text-white rounded-2xl transition-all flex items-center justify-center border border-white/10 shadow-xl"
                                        title="Copy Absolute URL"
                                    >
                                        {copyStatus === item.url ? <CheckCircleIcon className="w-6 h-6 text-emerald-400" /> : <LinkIcon className="w-5 h-5" />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="w-12 h-12 bg-white/10 hover:bg-red-600 text-white rounded-2xl transition-all flex items-center justify-center border border-white/10 shadow-xl"
                                        title="Terminate Asset"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                    <div className="absolute bottom-6 left-0 right-0 px-6 text-center">
                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{formatSize(item.size || 0)}</p>
                                    </div>
                                </div>

                                {/* Identity Label */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 transition-all group-hover:opacity-0 group-hover:translate-y-4">
                                    <p className="text-[10px] font-black text-slate-900 truncate tracking-tight">{item.filename}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] border border-slate-200/60 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Preview</th>
                                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Identification</th>
                                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Scale</th>
                                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Metadata</th>
                                <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {media.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-10 py-6">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
                                            {item.type === 'IMAGE' ? (
                                                <img src={item.url} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center"><DocumentIcon className="w-8 h-8 text-slate-200" /></div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <p className="text-sm font-black text-slate-900 mb-1">{item.filename}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.type}</p>
                                    </td>
                                    <td className="px-10 py-6">
                                        <span className="text-sm font-black text-slate-700">{formatSize(item.size || 0)}</span>
                                    </td>
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <ArrowPathIcon className="w-3 h-3" />
                                            {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                            <button
                                                onClick={() => copyToClipboard(item.url)}
                                                className="p-4 bg-white text-slate-400 hover:text-primary rounded-2xl shadow-sm border border-slate-100 transition-all"
                                                title="Copy URL"
                                            >
                                                {copyStatus === item.url ? <CheckCircleIcon className="w-5 h-5 text-emerald-500" /> : <LinkIcon className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-4 bg-white text-slate-400 hover:text-red-500 rounded-2xl shadow-sm border border-slate-100 transition-all"
                                                title="Delete Asset"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Notification Hud */}
            {copyStatus && (
                <div className="fixed bottom-10 right-10 z-[200] flex items-center gap-4 px-8 py-6 rounded-3xl bg-slate-900 shadow-[0_30px_60px_rgba(0,0,0,0.3)] text-white animate-in slide-in-from-bottom-10 duration-500 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircleIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Memory Transfer</p>
                        <p className="text-[15px] font-jakarta font-black text-white">Asset URL optimized & copied.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
