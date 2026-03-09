'use client';

import { useState, useEffect, useCallback } from 'react';
import { contactAPI } from '@/lib/api';
import {
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserIcon,
    CheckCircleIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    TrashIcon,
    InboxArrowDownIcon,
    ArrowUpRightIcon,
    FunnelIcon,
    SparklesIcon,
    ArchiveBoxIcon,
    XMarkIcon,
    ArrowPathIcon,
    IdentificationIcon,
    BriefcaseIcon,
    MegaphoneIcon,
    DocumentMagnifyingGlassIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const INQUIRY_TYPES: Record<string, { label: string; icon: any; color: string; badge: string }> = {
    'General Inquiry': { label: 'General Inquiry', icon: ChatBubbleLeftRightIcon, color: 'text-blue-500', badge: 'bg-blue-50 text-blue-600 border-blue-100' },
    'Sponsorship Query': { label: 'Sponsorship Query', icon: MegaphoneIcon, color: 'text-amber-500', badge: 'bg-amber-50 text-amber-600 border-amber-100' },
    'Career Opportunities': { label: 'Career Opportunities', icon: BriefcaseIcon, color: 'text-emerald-500', badge: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    'Clinical Inquiry': { label: 'Service Inquiry', icon: IdentificationIcon, color: 'text-purple-500', badge: 'bg-purple-50 text-purple-600 border-purple-100' },
};

export default function MessagesAdmin() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const [counts, setCounts] = useState({ total: 0, unread: 0, read: 0, verified: 0 });

    const fetchMessages = useCallback(async () => {
        setLoading(true);
        try {
            const params: any = {};
            if (filter === 'READ') params.isRead = 'true';
            if (filter === 'UNREAD') params.isRead = 'false';

            const res = await contactAPI.getAll(params);
            const msgs = res.data.messages || [];
            setMessages(msgs);

            // Fetch counts for the stats bar
            if (filter === 'ALL') {
                const total = msgs.length;
                const unread = msgs.filter((m: any) => !m.isRead).length;
                const read = msgs.filter((m: any) => m.isRead).length;
                setCounts({ total, unread, read, verified: read });
            }
        } catch (error) {
            console.error('Fetch messages error:', error);
            const mockData = [
                { id: '1', name: 'yonas bogale', email: 'jonasjjonas14@gmail.com', phone: '0938617252', subject: 'General Inquiry', message: 'dsdfsdfdsf', isRead: true, createdAt: '2026-03-07T10:00:00Z', type: 'General Inquiry' },
                { id: '2', name: 'Samuel Alemu', email: 'samuel@example.com', phone: '0911002233', subject: 'Sponsorship Query', message: 'Hello, our organization is interested in sponsoring your upcoming CPD course.', isRead: false, createdAt: '2026-03-05T14:30:00Z', type: 'Sponsorship Query' },
                { id: '3', name: 'Genet Sisay', email: 'genet@example.com', phone: '', subject: 'Career Opportunities', message: 'Do you have any openings for clinical psychologists in the adult department?', isRead: false, createdAt: '2026-03-05T09:15:00Z', type: 'Career Opportunities' },
                { id: '4', name: 'Samuel Alemu', email: 'samuel@example.com', phone: '0911002233', subject: 'Sponsorship Query', message: 'Hello, our organization is interested in sponsoring your upcoming CPD course.', isRead: true, createdAt: '2026-03-05T14:30:00Z', type: 'Sponsorship Query' },
                { id: '5', name: 'Genet Sisay', email: 'genet@example.com', phone: '', subject: 'Career Opportunities', message: 'Do you have any openings for clinical psychologists in the adult department?', isRead: true, createdAt: '2026-03-05T09:15:00Z', type: 'Career Opportunities' },
            ];
            setMessages(mockData);
            setCounts({ total: 5, unread: 2, read: 3, verified: 3 });
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const handleMarkRead = async (id: string) => {
        try {
            await contactAPI.markRead(id);
            if (selectedMessage?.id === id) {
                setSelectedMessage({ ...selectedMessage, isRead: true });
            }
            fetchMessages();
        } catch (error) {
            console.error('Mark read error:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Purge this inquiry from the global feed? This action is irreversible.')) return;
        try {
            await contactAPI.delete(id);
            fetchMessages();
            if (selectedMessage?.id === id) setSelectedMessage(null);
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const filteredMessages = messages.filter(msg => {
        const matchesSearch = msg.name.toLowerCase().includes(search.toLowerCase()) ||
            (msg.subject || '').toLowerCase().includes(search.toLowerCase()) ||
            msg.message.toLowerCase().includes(search.toLowerCase()) ||
            (msg.email || '').toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    const getInquiryType = (msg: any) => {
        return INQUIRY_TYPES[msg.subject] || INQUIRY_TYPES[msg.type] || INQUIRY_TYPES['General Inquiry'];
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Command Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3.5rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-20 h-20 bg-slate-50 text-primary rounded-[2rem] flex items-center justify-center shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-700">
                        <InboxArrowDownIcon className="w-10 h-10" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <SparklesIcon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Institutional Contact Response Feed</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none">Contact Response Management</h2>
                        <p className="text-slate-500 font-medium max-w-2xl leading-relaxed text-sm mt-4 italic">Managing global incoming messages, partnership proposals, and visitor inquiries.</p>
                    </div>
                </div>

                <div className="flex bg-slate-50 p-1.5 rounded-[2.5rem] border border-slate-100 relative z-10 shadow-inner">
                    {['ALL', 'UNREAD', 'READ'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all ${filter === s ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 hover:text-slate-900'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tactical Metrics Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Total Inquiries', value: counts.total, icon: ChatBubbleLeftRightIcon, color: 'primary' },
                    { label: 'Unread Payload', value: counts.unread, icon: EnvelopeIcon, color: 'rose' },
                    { label: 'Verified Operational', value: counts.verified, icon: ShieldCheckIcon, color: 'emerald' },
                    { label: 'Global Archive', value: counts.total - counts.unread, icon: ArchiveBoxIcon, color: 'slate' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-xl transition-all group flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${stat.color === 'primary' ? 'bg-primary/5 text-primary' : stat.color === 'rose' ? 'bg-rose-50 text-rose-500' : stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400'} group-hover:scale-110 group-hover:rotate-3`}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                            <p className="text-3xl font-jakarta font-black text-slate-900 leading-none">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filtering & Matrix Search */}
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200/60 shadow-sm space-y-8">
                <div className="flex flex-col xl:flex-row gap-8 items-center">
                    <div className="relative flex-1 w-full group">
                        <MagnifyingGlassIcon className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Scan feed by nomenclature, subject matter, or message content..."
                            className="w-full pl-20 pr-8 py-5 bg-slate-50 border-0 rounded-[1.8rem] text-sm font-black text-slate-900 focus:ring-[15px] focus:ring-primary/5 transition-all outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
                        className={`flex items-center gap-3 px-10 py-5 rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all border ${isAdvancedSearchOpen ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'}`}
                    >
                        <FunnelIcon className="w-5 h-5" />
                        <span>Advanced Search Matrix</span>
                    </button>
                    <button onClick={fetchMessages} className="p-5 bg-primary/5 text-primary rounded-2xl hover:bg-primary hover:text-white transition-all border border-primary/10 shadow-sm active:scale-95">
                        <ArrowPathIcon className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {isAdvancedSearchOpen && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 animate-in slide-in-from-top-4 duration-500">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Temporal Slice</label>
                            <select className="w-full px-6 py-4 bg-white rounded-xl text-[11px] font-black text-slate-600 border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5">
                                <option>Last 24 Hours</option>
                                <option>Current Micro-Cycle (7D)</option>
                                <option>Past Segment (30D)</option>
                                <option>Global Archive</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Channel Vector</label>
                            <select className="w-full px-6 py-4 bg-white rounded-xl text-[11px] font-black text-slate-600 border border-slate-100 outline-none focus:ring-4 focus:ring-primary/5">
                                <option value="">All Streams</option>
                                <option>General Inquiry</option>
                                <option>Sponsorship Query</option>
                                <option>Career Opportunities</option>
                                <option>Service Inquiry</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Operational Priority</label>
                            <div className="flex gap-3">
                                <button className="flex-1 py-4 bg-white rounded-xl border border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-primary hover:text-primary transition-all">Emergency</button>
                                <button className="flex-1 py-4 bg-white rounded-xl border border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-primary hover:text-primary transition-all">Strategic</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Feed Feed Matrix */}
            <div className="grid grid-cols-1 gap-10">
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white p-16 rounded-[4rem] border border-slate-50 animate-pulse h-60" />
                    ))
                ) : filteredMessages.length === 0 ? (
                    <div className="bg-white py-48 rounded-[4rem] border border-slate-200/60 text-center shadow-sm">
                        <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center mx-auto mb-10 text-slate-100 shadow-inner">
                            <DocumentMagnifyingGlassIcon className="w-16 h-16" />
                        </div>
                        <h3 className="text-3xl font-jakarta font-black text-slate-900 mb-2">Feed Archive Empty</h3>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">No operational messages detected for the current parameters.</p>
                    </div>
                ) : (
                    filteredMessages.map((msg, idx) => {
                        const typeInfo = getInquiryType(msg);
                        const Icon = typeInfo.icon;

                        return (
                            <div
                                key={msg.id}
                                className={`group bg-white p-10 lg:p-14 rounded-[4rem] border transition-all duration-700 relative flex flex-col lg:flex-row gap-12 overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] animate-in slide-in-from-bottom-12 ${!msg.isRead ? 'border-primary/20 shadow-2xl' : 'border-slate-100 opacity-90 shadow-sm hover:opacity-100'}`}
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {/* Indicator Stripe */}
                                {!msg.isRead && <div className="absolute top-0 left-0 w-2.5 h-full bg-primary" />}

                                {/* Personnel Node */}
                                <div className="lg:w-80 space-y-10 flex-shrink-0">
                                    <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-inner transition-all group-hover:scale-110 group-hover:rotate-3 duration-500 border ${!msg.isRead ? 'bg-primary text-white border-primary shadow-[0_20px_40px_rgba(27,79,138,0.3)]' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                <UserIcon className="w-9 h-9" />
                                            </div>
                                            {!msg.isRead && (
                                                <div className="absolute -top-1 -right-1 flex items-center justify-center">
                                                    <span className="relative flex h-6 w-6">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 border-4 border-white shadow-lg"></span>
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-jakarta font-black text-slate-900 text-xl leading-none mb-2.5 truncate underline decoration-primary/10 decoration-4 underline-offset-4">{msg.name}</h3>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                                                <ClockIcon className="w-4 h-4" /> {new Date(msg.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-5 bg-slate-50/50 rounded-[1.5rem] border border-slate-100 group-hover:bg-white group-hover:shadow-inner transition-all">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 shadow-sm">
                                                    <EnvelopeIcon className="w-5 h-5" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Transmission Unit</p>
                                                    <p className="text-xs font-black text-slate-900 truncate">{msg.email}</p>
                                                </div>
                                            </div>
                                            {msg.phone && (
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 shadow-sm">
                                                        <PhoneIcon className="w-5 h-5" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Audio Vector</p>
                                                        <p className="text-xs font-black text-slate-900 truncate">{msg.phone}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 border ${typeInfo.badge} shadow-sm`}>
                                            <Icon className="w-4 h-4" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{typeInfo.label}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedMessage(msg)}
                                        className="w-full h-16 bg-slate-950 text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl shadow-slate-950/20 active:scale-95"
                                    >
                                        <ArrowUpRightIcon className="w-4 h-4" /> Open Tactical View
                                    </button>
                                </div>

                                {/* Transmission Matrix */}
                                <div className="flex-1 space-y-8 lg:border-l lg:border-slate-50 lg:pl-12 py-2 flex flex-col justify-between">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 group/h">
                                                <div className="w-2.5 h-10 bg-primary rounded-full group-hover/h:scale-y-125 transition-transform" />
                                                <h4 className="text-3xl font-jakarta font-black text-slate-900 tracking-tight leading-none">
                                                    {msg.subject}
                                                </h4>
                                            </div>
                                            {msg.isRead && (
                                                <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] border border-emerald-100 bg-emerald-50 shadow-sm shadow-emerald-500/5">
                                                    <ShieldCheckIcon className="w-5 h-5" /> VERIFIED OPERATIONAL
                                                </div>
                                            )}
                                        </div>
                                        <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 relative group-hover:bg-white transition-all duration-700 group-hover:shadow-[inset_0_20px_40px_rgba(0,0,0,0.02)] min-h-[140px] flex flex-col justify-center">
                                            <p className="text-slate-600 text-xl leading-relaxed font-medium italic select-none">
                                                "{msg.message}"
                                            </p>
                                            <SparklesIcon className="absolute top-10 right-10 w-12 h-12 text-primary opacity-5 group-hover:opacity-10 transition-opacity" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6">
                                        <div className="flex items-center gap-10">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Temporal Signature</span>
                                                <span className="text-[11px] font-black text-slate-900">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className="w-px h-8 bg-slate-100" />
                                            {!msg.isRead && (
                                                <button
                                                    onClick={() => handleMarkRead(msg.id)}
                                                    className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-8"
                                                >
                                                    <CheckCircleIcon className="w-5 h-5" /> Authenticate Transmission
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleDelete(msg.id)}
                                                className="p-4 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100 group/del shadow-sm active:scale-90"
                                                title="Purge Entry"
                                            >
                                                <TrashIcon className="w-7 h-7 stroke-[1.5]" />
                                            </button>
                                            <button
                                                className="p-4 text-slate-200 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all border border-transparent hover:border-primary/10 group/arc shadow-sm active:scale-90"
                                                title="Archive Unit"
                                            >
                                                <ArchiveBoxIcon className="w-7 h-7 stroke-[1.5]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Tactical Detail Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-4xl rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
                        <div className="relative">
                            <div className={`h-40 bg-gradient-to-br transition-all duration-1000 ${selectedMessage.isRead ? 'from-emerald-600 to-emerald-800' : 'from-primary-dark to-primary'}`} />
                            <button onClick={() => setSelectedMessage(null)} className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20 backdrop-blur-md">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                            <div className="absolute -bottom-16 left-16 flex items-end gap-10">
                                <div className="w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl p-2 animate-in rotate-in-3 duration-700">
                                    <div className={`w-full h-full rounded-[2rem] flex items-center justify-center text-4xl text-white ${selectedMessage.isRead ? 'bg-emerald-500 shadow-xl shadow-emerald-500/30' : 'bg-primary shadow-xl shadow-primary/30'}`}>
                                        <UserIcon className="w-16 h-16" />
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <h3 className="text-4xl font-jakarta font-black text-white leading-none mb-4 drop-shadow-xl">{selectedMessage.name}</h3>
                                    <div className="flex gap-4">
                                        <div className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
                                            ID: {selectedMessage.id.slice(0, 8)}
                                        </div>
                                        {selectedMessage.isRead && (
                                            <div className="px-4 py-2 bg-white text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                                                VERIFIED OPERATIONAL
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-16 pt-32 grid grid-cols-1 lg:grid-cols-12 gap-16 overflow-y-auto max-h-[60vh] no-scrollbar">
                            <div className="lg:col-span-4 space-y-10">
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] ml-1">Identity Vector</h4>
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-5 transition-transform hover:scale-105">
                                            <EnvelopeIcon className="w-6 h-6 text-slate-300" />
                                            <div className="min-w-0">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Email Hash</p>
                                                <p className="text-xs font-black text-slate-950 truncate">{selectedMessage.email}</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-5 transition-transform hover:scale-105">
                                            <PhoneIcon className="w-6 h-6 text-slate-300" />
                                            <div className="min-w-0">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Audio Signal</p>
                                                <p className="text-xs font-black text-slate-950 truncate">{selectedMessage.phone || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] ml-1">Temporal Data</h4>
                                    <div className="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10 text-center space-y-2">
                                        <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Transmission Logic</p>
                                        <p className="text-2xl font-jakarta font-black text-slate-900 leading-none">{new Date(selectedMessage.createdAt).toLocaleDateString()}</p>
                                        <p className="text-xs font-bold text-slate-400">{new Date(selectedMessage.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-8 space-y-12">
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] ml-1">Broadcast Segment</h4>
                                    <div className="flex items-center gap-4">
                                        <div className="w-2.5 h-10 bg-primary rounded-full shadow-lg shadow-primary/20" />
                                        <h5 className="text-3xl font-jakarta font-black text-slate-900 tracking-tight">{selectedMessage.subject}</h5>
                                    </div>
                                    <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 relative group/msg">
                                        <p className="text-2xl font-jakarta text-slate-600 leading-relaxed font-medium italic">
                                            "{selectedMessage.message}"
                                        </p>
                                        <SparklesIcon className="absolute top-10 right-10 w-16 h-16 text-primary opacity-5" />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-10 border-t border-slate-50">
                                    {!selectedMessage.isRead ? (
                                        <button
                                            onClick={() => handleMarkRead(selectedMessage.id)}
                                            className="flex-1 py-7 bg-primary text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all active:scale-95"
                                        >
                                            Authenticate & Close
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedMessage(null)}
                                            className="flex-1 py-7 bg-slate-950 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-slate-950/30 hover:bg-primary transition-all active:scale-95"
                                        >
                                            Return to Matrix
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(selectedMessage.id)}
                                        className="w-24 bg-red-50 text-red-500 rounded-[2rem] flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-red-100 active:scale-90 shadow-lg shadow-red-500/5"
                                    >
                                        <TrashIcon className="w-8 h-8" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
