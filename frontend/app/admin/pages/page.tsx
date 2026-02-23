'use client';

import { useState, useEffect } from 'react';
import { pagesAPI } from '@/lib/api';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    GlobeAltIcon,
    MagnifyingGlassIcon,
    ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AdminPages() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        setLoading(true);
        try {
            const res = await pagesAPI.getAll({ status: 'ALL' });
            setPages(res.data.pages);
        } catch (error) {
            console.error('Failed to fetch pages', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this page?')) return;
        try {
            await pagesAPI.delete(id);
            setPages(pages.filter(p => p.id !== id));
        } catch (error) {
            alert('Failed to delete page');
        }
    };

    const filteredPages = pages.filter(page =>
        page.title.toLowerCase().includes(search.toLowerCase()) ||
        page.slug.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Pages & Builder</h2>
                    <p className="text-gray-500 mt-1 font-medium">Manage your website's static content and custom pages.</p>
                </div>
                <Link
                    href="/admin/pages/new"
                    className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-xl hover:shadow-blue-900/20 transition-all active:scale-95"
                >
                    <PlusIcon className="w-5 h-5 stroke-[3]" />
                    Create New Page
                </Link>
            </div>

            {/* Stats & Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Pages</div>
                    <div className="text-4xl font-black text-blue-900">{pages.length}</div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 md:col-span-2 flex items-center">
                    <div className="relative w-full">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title or slug..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Page Identity</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">URL Slug</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-8 py-6"><div className="h-5 bg-gray-100 w-48 rounded" /></td>
                                        <td className="px-8 py-6"><div className="h-5 bg-gray-100 w-32 rounded" /></td>
                                        <td className="px-8 py-6"><div className="h-5 bg-gray-100 w-24 rounded" /></td>
                                        <td className="px-8 py-6"><div className="h-8 bg-gray-100 w-24 rounded ml-auto" /></td>
                                    </tr>
                                ))
                            ) : filteredPages.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="text-5xl mb-4">📄</div>
                                        <div className="text-gray-500 font-bold">No pages found. Start by creating one!</div>
                                    </td>
                                </tr>
                            ) : (
                                filteredPages.map((page) => (
                                    <tr key={page.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900">
                                                    <GlobeAltIcon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="font-black text-gray-900 leading-none mb-1">{page.title}</div>
                                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Last updated: {new Date(page.updatedAt).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <code className="bg-gray-100 text-blue-900 px-3 py-1.5 rounded-lg text-xs font-black tracking-tight">/{page.slug}</code>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${page.status === 'PUBLISHED'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {page.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                <Link
                                                    href={`/${page.slug}`}
                                                    target="_blank"
                                                    className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                                    title="View Live"
                                                >
                                                    <ArrowTopRightOnSquareIcon className="w-5 h-5 flex-shrink-0" />
                                                </Link>
                                                <Link
                                                    href={`/admin/pages/edit/${page.id}`}
                                                    className="p-2.5 text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                                                    title="Edit Page"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5 flex-shrink-0" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(page.id)}
                                                    className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                                    title="Delete Page"
                                                >
                                                    <TrashIcon className="w-5 h-5 flex-shrink-0" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
