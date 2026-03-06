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
} from '@heroicons/react/24/outline';

export default function AdminMediaPage() {
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const [copyStatus, setCopyStatus] = useState<string | null>(null);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const res = await mediaAPI.getAll({ search });
            setMedia(res.data.media || []);
        } catch {
            setMedia([
                { id: '1', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop', filename: 'hospital_front.jpg', type: 'IMAGE', size: 102400 },
                { id: '2', url: 'https://images.unsplash.com/photo-1584432810601-6a783c1e3fa6?w=400&h=300&fit=crop', filename: 'doctor_team.jpg', type: 'IMAGE', size: 204800 },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, [search]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            await mediaAPI.upload(file);
            fetchMedia();
        } catch {
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this file permanently?')) {
            try {
                await mediaAPI.delete(id);
                fetchMedia();
            } catch {
                alert('Delete failed');
            }
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopyStatus(url);
        setTimeout(() => setCopyStatus(null), 2000);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Media Library</h2>
                    <p className="text-gray-500 text-sm">Upload and manage images and documents for your website.</p>
                </div>
                <label className="btn-primary cursor-pointer">
                    {uploading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CloudArrowUpIcon className="w-5 h-5" />}
                    <span>{uploading ? 'Uploading...' : 'Upload New File'}</span>
                    <input type="file" className="hidden" onChange={handleUpload} multiple />
                </label>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search files..."
                        className="w-full pl-11 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-900"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 bg-blue-50 text-blue-900 rounded-lg"><Square2StackIcon className="w-5 h-5" /></button>
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                    </button>
                </div>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {loading ? (
                    [...Array(12)].map((_, i) => (
                        <div key={i} className="aspect-square bg-white rounded-2xl border border-gray-100 p-2 animate-pulse">
                            <div className="w-full h-full bg-gray-50 rounded-xl" />
                        </div>
                    ))
                ) : media.length === 0 ? (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-6xl mb-4 text-gray-200">📁</div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No files uploaded yet</p>
                    </div>
                ) : (
                    media.map((item) => (
                        <div key={item.id} className="group relative aspect-square bg-white rounded-2xl border border-gray-100 p-2 shadow-sm hover:shadow-md transition-all overflow-hidden">
                            {item.type === 'IMAGE' ? (
                                <img src={item.url} alt={item.filename} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <div className="w-full h-full bg-blue-50 flex flex-col items-center justify-center rounded-xl p-4 text-center">
                                    <span className="text-3xl mb-1">📄</span>
                                    <span className="text-[8px] font-black text-blue-900 uppercase tracking-tighter truncate w-full">{item.filename}</span>
                                </div>
                            )}

                            {/* Overlays */}
                            <div className="absolute inset-2 bg-blue-900/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                <button
                                    onClick={() => copyToClipboard(item.url)}
                                    className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-2 text-[10px] font-bold"
                                >
                                    {copyStatus === item.url ? 'Copied!' : <><LinkIcon className="w-4 h-4" /> URL</>}
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Label */}
                            <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-1 rounded-lg opacity-100 group-hover:opacity-0 transition-opacity">
                                <p className="text-[10px] font-bold text-gray-700 truncate">{item.filename}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
