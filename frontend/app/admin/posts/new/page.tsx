'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { postsAPI, mediaAPI, categoriesAPI } from '@/lib/api';
import Link from 'next/link';
import {
    ArrowLeftIcon,
    CloudArrowUpIcon,
    XMarkIcon,
    CheckIcon,
    EyeIcon,
    PhotoIcon,
    TagIcon,
    Cog6ToothIcon,
    DocumentTextIcon,
    GlobeAltIcon,
    SparklesIcon,
    CalendarDaysIcon,
    ArrowPathIcon,
    DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const ToolbarBtn = ({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className="px-3 py-2 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all flex items-center justify-center min-w-[32px]"
    >
        {children}
    </button>
);

export default function PostEditorPage() {
    const params = useParams();
    const id = params?.id as string | undefined;
    const router = useRouter();
    const isEdit = !!id;
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [form, setForm] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        type: 'NEWS',
        status: 'DRAFT',
        featuredImage: '',
        categoryId: '',
        tags: '',
        metaTitle: '',
        metaDescription: '',
        publishedAt: '',
        isFeatured: false,
    });
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
    const [dragOver, setDragOver] = useState(false);
    const [gallery, setGallery] = useState<string[]>([]);
    const [uploadingGallery, setUploadingGallery] = useState(false);

    useEffect(() => {
        categoriesAPI.getAll().then(res => {
            setCategories(res.data.categories || []);
        }).catch(() => { });

        if (isEdit && id) {
            setLoading(true);
            postsAPI.getById(id).then(res => {
                const post = res.data.post;
                if (post) {
                    setForm({
                        title: post.title || '',
                        slug: post.slug || '',
                        content: post.content || '',
                        excerpt: post.excerpt || '',
                        type: post.type || 'NEWS',
                        status: post.status || 'DRAFT',
                        featuredImage: post.featuredImage || '',
                        categoryId: post.categoryId || '',
                        tags: post.tags || '',
                        metaTitle: post.metaTitle || '',
                        metaDescription: post.metaDesc || '',
                        publishedAt: post.publishedAt ? post.publishedAt.split('T')[0] : '',
                        isFeatured: post.isFeatured || false,
                    });
                    if (post.gallery) {
                        try { setGallery(JSON.parse(post.gallery)); } catch { setGallery([]); }
                    }
                }
            }).catch(() => setError('Failed to load post details'))
                .finally(() => setLoading(false));
        }
    }, [id, isEdit]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        setForm(prev => ({ ...prev, title, slug }));
    };

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        try {
            const res = await mediaAPI.upload(file, 'posts');
            setForm(prev => ({ ...prev, featuredImage: res.data.media.url }));
        } catch {
            setError('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleGalleryUpload = async (files: FileList) => {
        setUploadingGallery(true);
        try {
            const uploads = await Promise.all(
                Array.from(files).map(f => mediaAPI.upload(f, 'posts').then(r => r.data.media.url))
            );
            setGallery(prev => [...prev, ...uploads]);
        } catch {
            setError('Failed to upload gallery images');
        } finally {
            setUploadingGallery(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    };

    const insertFormatting = (tag: string, wrap = true) => {
        const ta = contentRef.current;
        if (!ta) return;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const selected = ta.value.substring(start, end);
        let newText = '';
        if (tag === 'link') {
            const url = prompt('Enter URL:');
            if (!url) return;
            newText = `[${selected || 'Link Text'}](${url})`;
        } else if (tag === 'img') {
            const url = prompt('Enter image URL:');
            if (!url) return;
            newText = `![${selected || 'Image'}](${url})`;
        } else if (wrap) {
            newText = `${tag}${selected || 'text'}${tag}`;
        } else {
            newText = `${tag}${selected || 'text'}`;
        }
        const value = ta.value.substring(0, start) + newText + ta.value.substring(end);
        setForm(prev => ({ ...prev, content: value }));
        setTimeout(() => {
            ta.focus();
            ta.setSelectionRange(start + newText.length, start + newText.length);
        }, 0);
    };

    const handleSubmit = async (statusOverride?: string) => {
        setLoading(true);
        setError('');
        try {
            const payload = {
                ...form,
                status: statusOverride || form.status,
                gallery: JSON.stringify(gallery),
            };
            if (isEdit && id) {
                await postsAPI.update(id, payload);
            } else {
                await postsAPI.create(payload);
            }
            setSuccess(statusOverride === 'PUBLISHED' ? 'Broadcast Live!' : 'Archive Saved.');
            setTimeout(() => router.push('/admin/posts'), 1200);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Protocol failure. Data not synchronized.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEdit) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <div className="w-16 h-16 border-[5px] border-slate-100 border-t-primary rounded-full animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] animate-pulse">Retrieving Asset Metadata...</p>
        </div>
    );

    const tabs = [
        { key: 'content', label: 'Drafting', icon: DocumentTextIcon },
        { key: 'seo', label: 'Visibility', icon: GlobeAltIcon },
        { key: 'settings', label: 'Meta', icon: Cog6ToothIcon },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-[1400px] mx-auto">
            {/* Header / Command Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="flex items-center gap-6 relative z-10">
                    <Link href="/admin/posts" className="p-4 bg-slate-50 hover:bg-white hover:shadow-lg rounded-2xl transition-all text-slate-400 group border border-slate-100">
                        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${form.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                {form.status}
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Broadcast Editor</span>
                        </div>
                        <h2 className="text-3xl font-jakarta font-black text-slate-900 tracking-tight leading-none">{isEdit ? 'Modify Publication' : 'Initialize Release'}</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <button
                        onClick={() => handleSubmit('DRAFT')}
                        disabled={loading}
                        className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        Save Stage
                    </button>
                    <button
                        onClick={() => handleSubmit('PUBLISHED')}
                        disabled={loading}
                        className="px-10 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-[0_15px_30px_rgba(27,79,138,0.2)] hover:-translate-y-1 active:translate-y-0 flex items-center gap-3 group"
                    >
                        {loading ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : <CheckIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                        {form.status === 'PUBLISHED' ? 'Update Release' : 'Live Sync'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: Primary Workspace */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Identification Section */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden">
                        <input
                            type="text"
                            value={form.title}
                            onChange={handleTitleChange}
                            placeholder="Release Title Header..."
                            className="w-full text-4xl font-jakarta font-black text-slate-900 placeholder-slate-200 border-0 focus:ring-0 p-0 mb-6 bg-transparent"
                        />
                        <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <GlobeAltIcon className="w-4 h-4 text-primary" />
                            <span className="opacity-50">emsh.gov.et/release/</span>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                                className="bg-transparent border-0 p-0 text-primary focus:ring-0 w-full text-[11px] font-black uppercase tracking-widest"
                            />
                        </div>
                    </div>

                    {/* Editor Interface */}
                    <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col min-h-[700px]">
                        <div className="flex bg-slate-50/50 p-2 border-b border-slate-100">
                            {tabs.map(tab => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setActiveTab(tab.key as any)}
                                        className={`flex-1 flex items-center justify-center gap-3 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-2xl ${activeTab === tab.key
                                            ? 'bg-white text-primary shadow-sm border border-slate-200/60'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="p-10 flex-1 flex flex-col">
                            {activeTab === 'content' && (
                                <div className="space-y-6 flex-1 flex flex-col animate-in fade-in duration-500">
                                    {/* Toolbar */}
                                    <div className="flex items-center gap-1 flex-wrap bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                        <ToolbarBtn onClick={() => insertFormatting('**')} title="Bold">B</ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('*')} title="Italic">I</ToolbarBtn>
                                        <div className="w-px h-6 bg-slate-200 mx-2" />
                                        <ToolbarBtn onClick={() => insertFormatting('# ', false)} title="Header 1">H1</ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('## ', false)} title="Header 2">H2</ToolbarBtn>
                                        <div className="w-px h-6 bg-slate-200 mx-2" />
                                        <ToolbarBtn onClick={() => insertFormatting('- ', false)} title="List">•</ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('link')} title="Links">🔗</ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('img')} title="Assets">🖼</ToolbarBtn>
                                    </div>
                                    <textarea
                                        ref={contentRef}
                                        value={form.content}
                                        onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                                        placeholder="Compose the narrative within this encrypted terminal. Markdown integration supported."
                                        className="flex-1 w-full p-8 bg-slate-50/30 border border-slate-100 rounded-3xl text-slate-700 focus:bg-white focus:ring-[6px] focus:ring-primary/5 focus:border-primary/20 transition-all font-inter text-[15px] leading-relaxed resize-none outline-none"
                                    />
                                    <div className="flex items-center justify-between px-2">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{form.content.split(' ').length} WORDS · {form.content.length} SIGNS</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex -space-x-3">
                                                {gallery.slice(0, 4).map((img, i) => (
                                                    <img key={i} src={img} className="w-8 h-8 rounded-xl border-2 border-white object-cover shadow-sm ring-1 ring-slate-100" />
                                                ))}
                                                {gallery.length > 4 && (
                                                    <div className="w-8 h-8 rounded-xl border-2 border-white bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-400 shadow-sm ring-1 ring-slate-100">
                                                        +{gallery.length - 4}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Pool</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'seo' && (
                                <div className="space-y-8 animate-in fade-in duration-500">
                                    <div className="space-y-3">
                                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Executive Summary</label>
                                        <textarea
                                            value={form.excerpt}
                                            onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                                            placeholder="A condensed variant of the narrative for index cards..."
                                            rows={4}
                                            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl text-slate-700 focus:bg-white focus:ring-[6px] focus:ring-primary/5 focus:border-primary/20 transition-all resize-none outline-none font-medium"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Meta Signature</label>
                                            <input
                                                type="text"
                                                value={form.metaTitle}
                                                onChange={(e) => setForm(prev => ({ ...prev, metaTitle: e.target.value }))}
                                                placeholder="Global search identifier..."
                                                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl text-slate-700 focus:bg-white transition-all outline-none font-medium"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Discovery Tags</label>
                                            <div className="relative group">
                                                <TagIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    value={form.tags}
                                                    onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                                                    placeholder="Keywords for crawler indexing..."
                                                    className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-100 rounded-3xl text-slate-700 focus:bg-white transition-all outline-none font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 bg-slate-900 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                            <DocumentMagnifyingGlassIcon className="w-32 h-32 text-primary" />
                                        </div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-4">Indexing Preview</p>
                                        <p className="text-xl font-jakarta font-bold text-white mb-2 truncate">{form.metaTitle || form.title || 'Untitled Release'}</p>
                                        <p className="text-xs text-primary font-bold mb-4">https://emsh.gov.et/release/{form.slug || '...'}</p>
                                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 max-w-xl">{form.metaDescription || form.excerpt || 'No summary provided for metadata harvesting.'}</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="space-y-10 animate-in fade-in duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Deployment Schedule</label>
                                            <div className="relative group">
                                                <CalendarDaysIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="date"
                                                    value={form.publishedAt}
                                                    onChange={(e) => setForm(prev => ({ ...prev, publishedAt: e.target.value }))}
                                                    className="w-full pl-16 pr-6 py-6 bg-slate-50 border border-slate-100 rounded-3xl text-slate-700 focus:bg-white transition-all outline-none font-black uppercase tracking-widest text-[12px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10 flex flex-col justify-center">
                                            <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                                <SparklesIcon className="w-4 h-4" /> Operational Note
                                            </h4>
                                            <p className="text-[13px] text-slate-500 leading-relaxed">Gallery assets are now prioritized within the primary drafting workspace for instantaneous visual verification.</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.25em] flex items-center gap-3">
                                                <PhotoIcon className="w-5 h-5 text-primary" /> Integrated Gallery Hub
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                            {gallery.map((url, i) => (
                                                <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all hover:shadow-xl">
                                                    <img src={url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" crossOrigin="anonymous" />
                                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => setGallery(g => g.filter((_, j) => j !== i))}
                                                            className="p-3 bg-red-600/90 text-white rounded-xl hover:bg-red-500 transition-colors shadow-lg"
                                                        >
                                                            <XMarkIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                            {gallery.length < 10 && (
                                                <label className={`flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-3xl transition-all cursor-pointer ${uploadingGallery ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary hover:bg-primary/5'}`}>
                                                    {uploadingGallery ? (
                                                        <ArrowPathIcon className="w-8 h-8 text-primary animate-spin" />
                                                    ) : (
                                                        <>
                                                            <CloudArrowUpIcon className="w-8 h-8 text-slate-200 group-hover:text-primary transition-colors" />
                                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-4">Add Frame</span>
                                                        </>
                                                    )}
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Parameter Matrix */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Primary Status Card */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm space-y-8">
                        <div>
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Configuration State
                            </h3>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Release Classification</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
                                    className="w-full bg-slate-50 border-0 rounded-2xl text-[13px] font-bold text-slate-700 px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all"
                                >
                                    <option value="NEWS">📰 News Broadcast</option>
                                    <option value="BLOG">✍️ Editorial Blog</option>
                                    <option value="EVENT">📅 Scheduled Event</option>
                                    <option value="ANNOUNCEMENT">📢 System Announcement</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl cursor-pointer group hover:bg-white hover:shadow-lg transition-all">
                                <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Priority Home Placement</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.isFeatured}
                                        onChange={(e) => setForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </div>
                            </label>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Operational Status</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['DRAFT', 'PUBLISHED', 'ARCHIVED'].map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setForm(prev => ({ ...prev, status: s }))}
                                        className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border-2 ${form.status === s
                                            ? s === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                : s === 'DRAFT' ? 'bg-amber-50 text-amber-600 border-amber-200'
                                                    : 'bg-slate-50 text-slate-600 border-slate-200'
                                            : 'bg-transparent text-slate-300 border-transparent hover:border-slate-100 hover:text-slate-400'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Entity Category</label>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 no-scrollbar">
                                <label className="flex items-center gap-3 p-4 hover:bg-slate-50 rounded-2xl cursor-pointer group transition-all">
                                    <div className={`w-4 h-4 rounded-full border-2 transition-all ${form.categoryId === '' ? 'border-primary bg-primary' : 'border-slate-200 group-hover:border-primary'}`} />
                                    <input type="radio" className="hidden" name="cat" checked={form.categoryId === ''} onChange={() => setForm(prev => ({ ...prev, categoryId: '' }))} />
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Uncategorized</span>
                                </label>
                                {categories.map(cat => (
                                    <label key={cat.id} className="flex items-center gap-3 p-4 hover:bg-slate-50 rounded-2xl cursor-pointer group transition-all">
                                        <div className={`w-4 h-4 rounded-full border-2 transition-all ${form.categoryId === cat.id ? 'border-primary bg-primary' : 'border-slate-200 group-hover:border-primary'}`} />
                                        <input type="radio" className="hidden" name="cat" checked={form.categoryId === cat.id} onChange={() => setForm(prev => ({ ...prev, categoryId: cat.id }))} />
                                        <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Asset Master Image */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm space-y-6">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2">
                            Master Release Image
                        </h3>

                        <div
                            className={`relative group rounded-[2rem] overflow-hidden transition-all aspect-video ${dragOver ? 'ring-4 ring-primary/20 scale-[0.98]' : ''}`}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                        >
                            {form.featuredImage ? (
                                <>
                                    <img src={form.featuredImage} alt="Master" className="w-full h-full object-cover" crossOrigin="anonymous" />
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                                        <label className="px-8 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-white active:scale-95 transition-all">
                                            Replace
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, featuredImage: '' }))}
                                            className="px-8 py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-all"
                                        >
                                            Purge
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center h-full border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                                    {uploading ? (
                                        <ArrowPathIcon className="w-10 h-10 text-primary animate-spin" />
                                    ) : (
                                        <>
                                            <CloudArrowUpIcon className="w-12 h-12 text-slate-200 group-hover:text-primary transition-colors" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Drop Master Media</span>
                                        </>
                                    )}
                                    <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} accept="image/*" />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Communication Feedbacks */}
            {error && (
                <div className="fixed bottom-10 right-10 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-10 flex items-center gap-4 z-50 border border-white/10">
                    <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">⚠️</div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-red-400">System Alert</p>
                        <p className="text-sm font-bold">{error}</p>
                    </div>
                    <button onClick={() => setError('')} className="ml-4 text-slate-500 hover:text-white transition-colors">✕</button>
                </div>
            )}
            {success && (
                <div className="fixed bottom-10 right-10 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-10 flex items-center gap-4 z-50 border border-white/10">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <CheckIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Synchronization Success</p>
                        <p className="text-sm font-bold">{success}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
