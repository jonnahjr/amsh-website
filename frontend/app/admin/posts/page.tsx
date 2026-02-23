'use client';

import { useState, useEffect } from 'react';
import { postsAPI } from '@/lib/api';
import Link from 'next/link';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    EyeIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';

export default function AdminPostsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await postsAPI.getAll({ page, limit: 10, search });
            setPosts(res.data.posts);
            setTotalPages(Math.ceil(res.data.total / 10));
        } catch {
            // Fallback for demo if API fails
            setPosts([
                { id: '1', title: 'Mental Wellness in Schools', author: { name: 'Dr. Abebe' }, status: 'PUBLISHED', type: 'BLOG', createdAt: new Date().toISOString() },
                { id: '2', title: 'New Emergency Ward Opening', author: { name: 'Admin' }, status: 'DRAFT', type: 'NEWS', createdAt: new Date().toISOString() },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page, search]);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await postsAPI.delete(id);
                fetchPosts();
            } catch {
                alert('Failed to delete post');
            }
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Posts & News</h2>
                    <p className="text-gray-500 text-sm">Manage all your blogs, announcements, and news updates here.</p>
                </div>
                <Link href="/admin/posts/new" className="btn-primary">
                    <PlusIcon className="w-5 h-5" />
                    <span>Create New Post</span>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="w-full pl-11 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-900 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <select className="flex-1 md:w-40 bg-gray-50 border-0 rounded-xl text-sm font-bold text-gray-600 px-4 py-2 focus:ring-2 focus:ring-blue-900">
                        <option value="">All Types</option>
                        <option value="NEWS">News</option>
                        <option value="BLOG">Blog</option>
                        <option value="EVENT">Events</option>
                        <option value="ANNOUNCEMENT">Announcements</option>
                    </select>
                    <select className="flex-1 md:w-40 bg-gray-50 border-0 rounded-xl text-sm font-bold text-gray-600 px-4 py-2 focus:ring-2 focus:ring-blue-900">
                        <option value="">All Status</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="DRAFT">Draft</option>
                        <option value="ARCHIVED">Archived</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title & Info</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Author</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-48" /></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-16" /></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-20" /></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24" /></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-32" /></td>
                                        <td className="px-6 py-4"><div className="h-8 bg-gray-100 rounded w-20 ml-auto" /></td>
                                    </tr>
                                ))
                            ) : posts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="text-4xl mb-4">📭</div>
                                        <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">No posts found</p>
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-1">{post.title}</div>
                                            <div className="text-[10px] text-gray-400 font-medium">Slug: {post.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${post.type === 'NEWS' ? 'bg-orange-100 text-orange-600' :
                                                    post.type === 'BLOG' ? 'bg-blue-100 text-blue-600' :
                                                        post.type === 'EVENT' ? 'bg-green-100 text-green-600' :
                                                            'bg-gray-100 text-gray-600'
                                                }`}>
                                                {post.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${post.status === 'PUBLISHED' ? 'bg-green-500' : 'bg-amber-500'}`} />
                                                <span className="text-xs font-bold text-gray-600">{post.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black">
                                                    {post.author?.name.charAt(0)}
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">{post.author?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-gray-400">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/news/${post.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm">
                                                    <EyeIcon className="w-4 h-4" />
                                                </Link>
                                                <Link href={`/admin/posts/edit/${post.id}`} className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-lg transition-all shadow-sm">
                                                    <PencilIcon className="w-4 h-4" />
                                                </Link>
                                                <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg transition-all shadow-sm">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Page {page} of {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
