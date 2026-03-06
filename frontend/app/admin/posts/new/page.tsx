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
} from '@heroicons/react/24/outline';

// Simple toolbar button
const ToolbarBtn = ({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className="px-2 py-1 text-xs font-bold text-gray-600 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
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
            setSuccess(statusOverride === 'PUBLISHED' ? 'Post published successfully!' : 'Post saved!');
            setTimeout(() => router.push('/admin/posts'), 1200);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save post');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEdit) return (
        <div className="flex items-center justify-center h-96">
            <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const tabs = [
        { key: 'content', label: 'Content', icon: DocumentTextIcon },
        { key: 'seo', label: 'SEO & Meta', icon: GlobeAltIcon },
        { key: 'settings', label: 'Settings', icon: Cog6ToothIcon },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-20">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts" className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900">{isEdit ? 'Edit Post' : 'Create New Post'}</h2>
                        <p className="text-gray-400 text-sm">{isEdit ? `Editing: ${form.title}` : 'Draft a new article for your audience'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Status badge */}
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${form.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                        form.status === 'DRAFT' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-500'
                        }`}>
                        {form.status}
                    </span>
                    {form.slug && (
                        <Link href={`/news/${form.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all">
                            <EyeIcon className="w-5 h-5" />
                        </Link>
                    )}
                    <button
                        type="button"
                        onClick={() => handleSubmit('DRAFT')}
                        disabled={loading}
                        className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        Save Draft
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSubmit('PUBLISHED')}
                        disabled={loading}
                        className="px-5 py-2.5 bg-blue-900 text-white rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckIcon className="w-4 h-4" />}
                        {form.status === 'PUBLISHED' ? 'Update' : 'Publish'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <input
                            type="text"
                            value={form.title}
                            onChange={handleTitleChange}
                            placeholder="Post title..."
                            className="w-full text-3xl font-black text-gray-900 placeholder-gray-200 border-0 focus:ring-0 pb-2 border-b border-gray-100 focus:border-blue-900 transition-all mb-4"
                        />
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-50 px-3 py-2 rounded-lg">
                            <span className="text-gray-300">emsh.gov.et/news/</span>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                                className="bg-transparent border-0 p-0 text-blue-900 focus:ring-0 w-full text-xs"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="flex border-b border-gray-100">
                            {tabs.map(tab => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setActiveTab(tab.key as any)}
                                        className={`flex items-center gap-2 px-6 py-4 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === tab.key
                                            ? 'text-blue-900 border-b-2 border-blue-900 -mb-px'
                                            : 'text-gray-400 hover:text-gray-700'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="p-8">
                            {/* Content Tab */}
                            {activeTab === 'content' && (
                                <div className="space-y-4">
                                    {/* Toolbar */}
                                    <div className="flex items-center gap-1 flex-wrap border border-gray-100 rounded-xl p-2 bg-gray-50">
                                        <ToolbarBtn onClick={() => insertFormatting('**')} title="Bold"><strong>B</strong></ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('*')} title="Italic"><em>I</em></ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('~~')} title="Strikethrough"><s>S</s></ToolbarBtn>
                                        <div className="w-px h-5 bg-gray-200 mx-1" />
                                        <ToolbarBtn onClick={() => insertFormatting('# ', false)} title="Heading 1">H1</ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('## ', false)} title="Heading 2">H2</ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('### ', false)} title="Heading 3">H3</ToolbarBtn>
                                        <div className="w-px h-5 bg-gray-200 mx-1" />
                                        <ToolbarBtn onClick={() => insertFormatting('- ', false)} title="Bullet List">• List</ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('1. ', false)} title="Numbered List">1. List</ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('> ', false)} title="Blockquote">" Quote</ToolbarBtn>
                                        <div className="w-px h-5 bg-gray-200 mx-1" />
                                        <ToolbarBtn onClick={() => insertFormatting('link')} title="Insert Link">🔗 Link</ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('img')} title="Insert Image">🖼 Image</ToolbarBtn>
                                        <ToolbarBtn onClick={() => insertFormatting('`')} title="Code">{`</>`}</ToolbarBtn>
                                    </div>
                                    <textarea
                                        ref={contentRef}
                                        value={form.content}
                                        onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                                        placeholder="Start writing your news article here... You can use Markdown formatting."
                                        rows={22}
                                        className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-900 transition-all font-mono text-sm leading-relaxed resize-none"
                                    />
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-gray-400">{form.content.length} characters · Supports Markdown formatting</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex -space-x-2">
                                                {gallery.slice(0, 3).map((img, i) => (
                                                    <img key={i} src={img} className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-sm" crossOrigin="anonymous" />
                                                ))}
                                                {gallery.length > 3 && (
                                                    <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-black text-gray-400 shadow-sm">
                                                        +{gallery.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{gallery.length} Images in Gallery</p>
                                        </div>
                                    </div>

                                    {/* Gallery Section - More prominent */}
                                    <div className="pt-6 border-t border-gray-50 mt-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                                <PhotoIcon className="w-4 h-4 text-blue-900" />
                                                Photo Gallery
                                            </h3>
                                            <span className="text-[10px] font-medium text-gray-400">Add up to 4-6 supplementary images</span>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {gallery.map((url, i) => (
                                                <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                                    <img src={url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" crossOrigin="anonymous" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => setGallery(g => g.filter((_, j) => j !== i))}
                                                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors shadow-lg"
                                                        >
                                                            <XMarkIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                            {gallery.length < 8 && (
                                                <label className={`flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-2xl transition-all cursor-pointer ${uploadingGallery ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-blue-900 hover:bg-blue-50'}`}>
                                                    {uploadingGallery ? (
                                                        <span className="w-6 h-6 border-3 border-blue-900 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            <div className="w-10 h-10 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center group-hover:text-blue-900 group-hover:bg-blue-100 transition-colors">
                                                                <CloudArrowUpIcon className="w-5 h-5" />
                                                            </div>
                                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2 text-center px-2">Add Photos</span>
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

                            {/* SEO Tab */}
                            {activeTab === 'seo' && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Excerpt / Summary</label>
                                        <textarea
                                            value={form.excerpt}
                                            onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                                            placeholder="Brief description shown in news listing cards..."
                                            rows={3}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-900 transition-all resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Meta Title (SEO)</label>
                                        <input
                                            type="text"
                                            value={form.metaTitle}
                                            onChange={(e) => setForm(prev => ({ ...prev, metaTitle: e.target.value }))}
                                            placeholder="SEO title (defaults to post title if empty)..."
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-900 transition-all"
                                        />
                                        <p className="text-xs text-gray-300 mt-1">{form.metaTitle.length}/60 characters recommended</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Meta Description (SEO)</label>
                                        <textarea
                                            value={form.metaDescription}
                                            onChange={(e) => setForm(prev => ({ ...prev, metaDescription: e.target.value }))}
                                            placeholder="Description for search engines..."
                                            rows={3}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-900 transition-all resize-none"
                                        />
                                        <p className="text-xs text-gray-300 mt-1">{form.metaDescription.length}/160 characters recommended</p>
                                    </div>
                                    {/* SEO Preview */}
                                    {(form.title || form.excerpt) && (
                                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-3">Search Preview</p>
                                            <p className="text-blue-700 text-sm font-medium truncate">{form.metaTitle || form.title}</p>
                                            <p className="text-xs text-green-700 truncate">https://emsh.gov.et/news/{form.slug}</p>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{form.metaDescription || form.excerpt}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Settings Tab */}
                            {activeTab === 'settings' && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tags (comma separated)</label>
                                        <div className="relative">
                                            <TagIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            <input
                                                type="text"
                                                value={form.tags}
                                                onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                                                placeholder="mental health, psychiatry, wellness..."
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-900 transition-all"
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {form.tags.split(',').filter(t => t.trim()).map((tag, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider rounded-full">
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Scheduled Publish Date</label>
                                        <input
                                            type="date"
                                            value={form.publishedAt}
                                            onChange={(e) => setForm(prev => ({ ...prev, publishedAt: e.target.value }))}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-900 transition-all"
                                        />
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                        <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">Editor Tip</p>
                                        <p className="text-xs text-blue-700 leading-relaxed">
                                            The photo gallery has been moved to the primary <strong>Content</strong> tab for easier access while writing.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Publish Settings */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
                        <h3 className="font-black text-gray-900 text-xs uppercase tracking-widest border-b border-gray-50 pb-4">Publish Settings</h3>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Post Type</label>
                            <select
                                value={form.type}
                                onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
                                className="w-full bg-gray-50 border-gray-100 rounded-xl text-sm font-bold text-gray-700 px-4 py-2.5"
                            >
                                <option value="NEWS">📰 News Article</option>
                                <option value="BLOG">✍️ Blog Post</option>
                                <option value="EVENT">📅 Hospital Event</option>
                                <option value="ANNOUNCEMENT">📢 Announcement</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-3">Home Page Visibility</label>
                            <label className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer hover:bg-white transition-all">
                                <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Feature on Home</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.isFeatured}
                                        onChange={(e) => setForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                                </div>
                            </label>
                            <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">Featured posts will appear in the special news section on the hospital home page.</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Status</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['DRAFT', 'PUBLISHED', 'ARCHIVED'].map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setForm(prev => ({ ...prev, status: s }))}
                                        className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${form.status === s
                                            ? s === 'PUBLISHED' ? 'bg-green-100 text-green-700 border-2 border-green-200'
                                                : s === 'DRAFT' ? 'bg-amber-100 text-amber-700 border-2 border-amber-200'
                                                    : 'bg-gray-200 text-gray-600 border-2 border-gray-300'
                                            : 'bg-gray-50 text-gray-400 border-2 border-transparent hover:border-gray-200'
                                            }`}
                                    >
                                        {s === 'PUBLISHED' ? '✅' : s === 'DRAFT' ? '✏️' : '📦'} {s.charAt(0) + s.slice(1).toLowerCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Category</label>
                            <div className="space-y-1 max-h-44 overflow-y-auto">
                                <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        name="cat"
                                        checked={form.categoryId === ''}
                                        onChange={() => setForm(prev => ({ ...prev, categoryId: '' }))}
                                        className="text-blue-900"
                                    />
                                    <span className="text-sm font-medium text-gray-400">No Category</span>
                                </label>
                                {categories.map(cat => (
                                    <label key={cat.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                        <input
                                            type="radio"
                                            name="cat"
                                            checked={form.categoryId === cat.id}
                                            onChange={() => setForm(prev => ({ ...prev, categoryId: cat.id }))}
                                            className="text-blue-900"
                                        />
                                        <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="font-black text-gray-900 text-xs uppercase tracking-widest border-b border-gray-50 pb-4">Featured Image</h3>

                        <div
                            className={`relative group rounded-2xl transition-all ${dragOver ? 'ring-2 ring-blue-900 bg-blue-50' : ''}`}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                        >
                            {form.featuredImage ? (
                                <div className="relative rounded-2xl overflow-hidden aspect-video border border-gray-100">
                                    <img src={form.featuredImage} alt="Featured" className="w-full h-full object-cover" crossOrigin="anonymous" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <label className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-bold cursor-pointer hover:bg-gray-50">
                                            Replace
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, featuredImage: '' }))}
                                            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-900 hover:bg-blue-50 transition-all cursor-pointer">
                                    {uploading ? (
                                        <span className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <CloudArrowUpIcon className="w-10 h-10 text-gray-200 mb-2" />
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Click or Drop Image</span>
                                            <span className="text-[10px] text-gray-300 mt-1">JPG, PNG, WEBP supported</span>
                                        </>
                                    )}
                                    <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} accept="image/*" />
                                </label>
                            )}
                        </div>

                        {/* Or paste URL */}
                        <div>
                            <label className="block text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Or paste image URL</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                value={form.featuredImage?.startsWith('http') ? form.featuredImage : ''}
                                onChange={(e) => setForm(prev => ({ ...prev, featuredImage: e.target.value }))}
                                className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-100 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-blue-950 p-6 rounded-3xl space-y-3">
                        <h3 className="font-black text-white text-xs uppercase tracking-widest mb-4">Quick Actions</h3>
                        <button
                            type="button"
                            onClick={() => handleSubmit('PUBLISHED')}
                            disabled={loading || !form.title}
                            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-40"
                        >
                            🚀 Publish Now
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSubmit('DRAFT')}
                            disabled={loading}
                            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white/80 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                            💾 Save as Draft
                        </button>
                        {isEdit && (
                            <button
                                type="button"
                                onClick={() => handleSubmit('ARCHIVED')}
                                disabled={loading}
                                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white/40 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                            >
                                📦 Archive Post
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Toast notifications */}
            {error && (
                <div className="fixed bottom-8 right-8 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl animate-fade-in-up flex items-center gap-3 z-50">
                    <span>⚠️</span>
                    <span className="font-bold text-sm">{error}</span>
                    <button onClick={() => setError('')} className="ml-2 hover:opacity-70">✕</button>
                </div>
            )}
            {success && (
                <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl animate-fade-in-up flex items-center gap-3 z-50">
                    <CheckIcon className="w-5 h-5" />
                    <span className="font-bold text-sm">{success}</span>
                </div>
            )}
        </div>
    );
}
