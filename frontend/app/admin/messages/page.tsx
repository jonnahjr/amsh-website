'use client';

import { useState, useEffect } from 'react';
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
} from '@heroicons/react/24/outline';

export default function MessagesAdmin() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const params: any = {};
            if (filter === 'READ') params.isRead = 'true';
            if (filter === 'UNREAD') params.isRead = 'false';
            const res = await contactAPI.getAll(params);
            setMessages(res.data.messages || []);
        } catch (error) {
            console.error('Fetch messages error:', error);
            // Fallback for UI testing
            setMessages([
                { id: '1', name: 'Jonas Kassahun', email: 'jonas@example.com', phone: '+251911223344', subject: 'Partnership Inquiry', message: 'I would like to discuss a potential partnership between our clinic and EMSH...', isRead: false, createdAt: new Date().toISOString() },
                { id: '2', name: 'Almaz Tadesse', email: 'almaz@example.com', phone: '+251922334455', subject: 'Appointment Question', message: 'Hello, I have a question about the child psychiatry department availability...', isRead: true, createdAt: new Date().toISOString() },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkRead = async (id: string) => {
        try {
            await contactAPI.markRead(id);
            fetchMessages();
        } catch (error) {
            console.error('Mark read error:', error);
            alert('Failed to update message.');
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [filter]);

    const filteredMessages = messages.filter(msg => {
        const matchesSearch = msg.name.toLowerCase().includes(search.toLowerCase()) ||
            msg.subject.toLowerCase().includes(search.toLowerCase()) ||
            msg.message.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Contact Inquiries</h2>
                    <p className="text-gray-500 text-sm">View and respond to messages from the website contact form.</p>
                </div>
                <div className="flex items-center gap-2 p-1 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    {['ALL', 'UNREAD', 'READ'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${filter === s ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, subject or message content..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-900 transition-all font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-pulse flex gap-6">
                            <div className="w-12 h-12 bg-gray-100 rounded-2xl" />
                            <div className="flex-1 space-y-3">
                                <div className="h-5 bg-gray-100 rounded w-1/4" />
                                <div className="h-4 bg-gray-100 rounded w-1/2" />
                            </div>
                        </div>
                    ))
                ) : filteredMessages.length === 0 ? (
                    <div className="bg-white py-24 rounded-[2rem] border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ChatBubbleLeftRightIcon className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No messages found</p>
                    </div>
                ) : (
                    filteredMessages.map((msg) => (
                        <div key={msg.id} className={`bg-white p-6 rounded-[2rem] border transition-all group ${!msg.isRead ? 'border-l-4 border-l-blue-900 border-blue-50 shadow-md' : 'border-gray-100 opacity-80 hover:opacity-100 shadow-sm'}`}>
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Side Info */}
                                <div className="lg:w-64 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${!msg.isRead ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            <UserIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-gray-900 truncate">{msg.name}</h3>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                                <ClockIcon className="w-3 h-3" /> {new Date(msg.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-xs font-bold text-blue-900 hover:underline">
                                            <EnvelopeIcon className="w-4 h-4" /> {msg.email}
                                        </a>
                                        {msg.phone && (
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                                <PhoneIcon className="w-4 h-4" /> {msg.phone}
                                            </div>
                                        )}
                                    </div>
                                    {!msg.isRead && (
                                        <button
                                            onClick={() => handleMarkRead(msg.id)}
                                            className="w-full py-2 bg-blue-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors"
                                        >
                                            <CheckCircleIcon className="w-4 h-4" /> Mark as Read
                                        </button>
                                    )}
                                </div>

                                {/* Main Message */}
                                <div className="flex-1 space-y-3 lg:border-l lg:border-gray-50 lg:pl-6">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">
                                            <span className="text-blue-900 mr-2">Subject:</span> {msg.subject}
                                        </h4>
                                        {msg.isRead && (
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                                READ
                                            </span>
                                        )}
                                    </div>
                                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                        <p className="text-gray-700 text-sm leading-relaxed font-medium italic">
                                            "{msg.message}"
                                        </p>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="lg:w-12 flex lg:flex-col items-center justify-center gap-2 border-t lg:border-t-0 lg:border-l border-gray-50 pt-4 lg:pt-0">
                                    <button className="p-3 text-red-100 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all">
                                        <TrashIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

