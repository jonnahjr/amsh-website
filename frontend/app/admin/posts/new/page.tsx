'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { postsAPI, mediaAPI } from '@/lib/api';
import Link from 'next/link';
import {
    ArrowLeftIcon,
    CloudArrowUpIcon,
    XMarkIcon,
    CheckIcon,
} from '@heroicons/react/24/outline';

export default function PostEditorPage() {
    const { id } = useParams();
    const router = useRouter();
    const isEdit = !!id;

    const [form, setForm] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        type: 'BLOG',
        status: 'DRAFT',
        featuredImage: '',
        categories: [] as string[],
    });

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            setLoading(true);
            // Fetch post by ID - need to add getById to API
            postsAPI.getAll({ id }).then(res => {
                const post = res.data.posts[0];
                if (post) setForm({
                    title: post.title,
                    slug: post.slug,
                    content: post.content,
                    excerpt: post.excerpt || '',
                    type: post.type,
                    status: post.status,
                    featuredImage: post.featuredImage || '',
                    categories: post.categories?.map((c: any) => c.id) || [],
                });
            }).finally(() => setLoading(false));
        }
    }, [id]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        setForm(prev => ({ ...prev, title, slug }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const res = await mediaAPI.upload(file, 'posts');
            setForm(prev => ({ ...prev, featuredImage: res.data.url }));
        } catch {
            setError('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEdit) {
                await postsAPI.update(id as string, form);
            } else {
                await postsAPI.create(form);
            }
            router.push('/admin/posts');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to save post');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEdit) return <div className="p-8 text-center">Loading post details...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts" className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900">{isEdit ? 'Edit Post' : 'Create New Post'}</h2>
                        <p className="text-gray-500 text-sm">{isEdit ? 'Modify your existing content' : 'Draft a new story for your audience'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push('/admin/posts')}
                        className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2.5 bg-blue-900 text-white rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckIcon className="w-4 h-4" />}
                        {isEdit ? 'Save Changes' : 'Publish Post'}
                    </button>
                </div>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Post Title</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={handleTitleChange}
                                placeholder="Enter a compelling title..."
                                className="w-full text-2xl font-black text-gray-900 placeholder-gray-200 border-0 border-b border-gray-100 focus:ring-0 focus:border-blue-900 pb-4 transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Slug (URL)</label>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-50 px-3 py-2 rounded-lg">
                                <span>amsh.gov.et/news/</span>
                                <input
                                    type="text"
                                    value={form.slug}
                                    onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                                    className="bg-transparent border-0 p-0 text-blue-900 focus:ring-0 w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Content</label>
                            <textarea
                                value={form.content}
                                onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                                placeholder="Start writing your content here..."
                                rows={15}
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-900 transition-all min-h-[400px]"
                                required
                            />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Excerpt (Brief Summary)</label>
                        <textarea
                            value={form.excerpt}
                            onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                            placeholder="What is this post about?"
                            rows={3}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-900 transition-all resize-none"
                        />
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest border-b border-gray-50 pb-4">Publish Settings</h3>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Post Type</label>
                            <select
                                value={form.type}
                                onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
                                className="w-full bg-gray-50 border-gray-100 rounded-xl text-sm font-bold text-gray-700 px-4 py-2.5"
                            >
                                <option value="BLOG">Blog Post</option>
                                <option value="NEWS">News Article</option>
                                <option value="EVENT">Hospital Event</option>
                                <option value="ANNOUNCEMENT">Public Announcement</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2">Status</label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                                className="w-full bg-gray-50 border-gray-100 rounded-xl text-sm font-bold text-gray-700 px-4 py-2.5"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                                <option value="ARCHIVED">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest border-b border-gray-50 pb-4">Featured Image</h3>

                        <div className="relative group">
                            {form.featuredImage ? (
                                <div className="relative rounded-2xl overflow-hidden aspect-video border border-gray-100">
                                    <img src={form.featuredImage} alt="Featured" className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => setForm(prev => ({ ...prev, featuredImage: '' }))}
                                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-900 hover:bg-blue-50 transition-all cursor-pointer">
                                    {uploading ? (
                                        <span className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <CloudArrowUpIcon className="w-8 h-8 text-gray-300 mb-2" />
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Click to Upload</span>
                                        </>
                                    )}
                                    <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest border-b border-gray-50 pb-4 mb-4">Categories</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {['General news', 'Health Tips', 'Research Updates', 'Events', 'Professional Development'].map(cat => (
                                <label key={cat} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900" />
                                    <span className="text-sm font-medium text-gray-600">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </form>

            {error && (
                <div className="fixed bottom-8 right-8 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl animate-fade-in-up flex items-center gap-3">
                    <span>⚠️</span>
                    <span className="font-bold">{error}</span>
                    <button onClick={() => setError('')} className="ml-4 hover:opacity-70">✕</button>
                </div>
            )}
        </div>
    );
}
