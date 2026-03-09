'use client';

import { useState, useEffect } from 'react';
import { newsletterAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';
import {
    EnvelopeIcon,
    UserGroupIcon,
    PaperAirplaneIcon,
    TrashIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export default function NewsletterAdminPage() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [broadcastLoading, setBroadcastLoading] = useState(false);
    const [showBroadcastModal, setShowBroadcastModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Broadcast form
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            const res = await newsletterAPI.getSubscribers();
            setSubscribers(res.data.subscribers || []);
        } catch (error) {
            toast.error('Failed to fetch subscribers');
        } finally {
            setLoading(false);
        }
    };

    const handleBroadcast = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject || !content) return toast.error('Please fill all fields');

        try {
            setBroadcastLoading(true);
            await newsletterAPI.broadcast({ subject, content });
            toast.success('Newsletter broadcasted successfully!');
            setShowBroadcastModal(false);
            setSubject('');
            setContent('');
        } catch (error: any) {
            const errorMsg = error.response?.data?.details
                ? `${error.response.data.error}: ${error.response.data.details}`
                : (error.response?.data?.error || 'Failed to broadcast newsletter');
            toast.error(errorMsg);
        } finally {
            setBroadcastLoading(false);
        }
    };

    const filteredSubscribers = subscribers.filter(s =>
        (s.email?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Communication Command</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">Newsletter Subscribers</h2>
                    <p className="text-slate-500 mt-4 font-medium max-w-xl">
                        Manage your institutional audience and broadcast official updates directly to their verified communication nodes.
                    </p>
                </div>
                <button
                    onClick={() => setShowBroadcastModal(true)}
                    className="group relative flex items-center gap-3 px-8 py-4 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-950 transition-all duration-300 shadow-xl shadow-blue-900/20 active:scale-95 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/10 to-blue-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <PaperAirplaneIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Broadcast Update
                </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                            <UserGroupIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Audience</p>
                            <h4 className="text-2xl font-black text-slate-900">{subscribers.length}</h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                            <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Verified Nodes</p>
                            <h4 className="text-2xl font-black text-slate-900">{subscribers.filter(s => s.isActive).length}</h4>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl">
                            📧
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Growth Rate</p>
                            <h4 className="text-2xl font-black text-slate-900">+12%</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Table Area */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                {/* Table Actions */}
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search subscribers by name or email node..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-600/20 transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-slate-600">
                            <FunnelIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Subscribers Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Node</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Identity</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Subscription Date</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-8 py-6 h-20 bg-slate-50/20"></td>
                                    </tr>
                                ))
                            ) : filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-sm">
                                        No matching subscribers found in the database.
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((s) => (
                                    <tr key={s.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-blue-100/50 flex items-center justify-center">
                                                    <EnvelopeIcon className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span className="text-sm font-black text-slate-900 tracking-tight">{s.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-bold text-slate-600">
                                            {s.name || 'Anonymous User'}
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${s.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                                }`}>
                                                {s.isActive ? 'Active Node' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                                                <ClockIcon className="w-4 h-4" />
                                                {format(new Date(s.subscribedAt), 'MMM dd, yyyy')}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Broadcast Modal */}
            {showBroadcastModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-950/40 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-blue-900 text-white">
                            <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Newsletter Command</span>
                                </div>
                                <h3 className="text-3xl font-black tracking-tight">Broadcast Update</h3>
                            </div>
                            <button
                                onClick={() => setShowBroadcastModal(false)}
                                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                            >
                                <TrashIcon className="w-6 h-6 rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleBroadcast} className="p-10 space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Broadcast Subject</label>
                                <input
                                    type="text"
                                    placeholder="Enter update subject..."
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-600/20 transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Message Content</label>
                                <textarea
                                    placeholder="Draft your official communication here..."
                                    rows={8}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full px-6 py-5 bg-slate-50 border-none rounded-3xl text-sm font-medium focus:ring-2 focus:ring-blue-600/20 transition-all resize-none"
                                    required
                                />
                                <div className="flex items-center gap-2 p-4 bg-amber-50 rounded-2xl mt-4">
                                    <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />
                                    <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                                        NOTE: This transmission will be broadcasted to {subscribers.length} verified contact nodes. Ensure narrative accuracy before initiating the downlink.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowBroadcastModal(false)}
                                    className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={broadcastLoading}
                                    className="flex-[2] relative flex items-center justify-center gap-3 py-5 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-950 transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                                >
                                    {broadcastLoading ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            <span>Transmitting...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <PaperAirplaneIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                            Initiate Broadcast
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
