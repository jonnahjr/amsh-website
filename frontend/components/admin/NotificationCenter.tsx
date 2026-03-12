'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import { contactAPI, cpdAPI, formsAPI } from '@/lib/api';
import { 
    BellIcon, 
    ChatBubbleLeftEllipsisIcon, 
    AcademicCapIcon, 
    IdentificationIcon, 
    ClockIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Notification {
    id: string;
    title: string;
    description: string;
    type: 'MESSAGE' | 'CPD' | 'INTAKE';
    time: string;
    isRead: boolean;
    link: string;
}

export default function NotificationCenter() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        if (!user) return;
        try {
            const [contactRes, cpdRes, formsRes] = await Promise.all([
                contactAPI.getAll({ isRead: 'false' }).catch(() => ({ data: { messages: [] } })),
                cpdAPI.getAllRegistrations().catch(() => ({ data: { registrations: [] } })),
                formsAPI.getAllSubmissions().catch(() => ({ data: { submissions: [] } }))
            ]);

            const newNotifs: Notification[] = [];

            // Add unread messages
            contactRes.data.messages?.forEach((msg: any) => {
                newNotifs.push({
                    id: `msg-${msg.id}`,
                    title: 'New Message',
                    description: `From ${msg.name}: ${msg.subject}`,
                    type: 'MESSAGE',
                    time: msg.createdAt,
                    isRead: false,
                    link: '/admin/messages'
                });
            });

            // Add pending CPD registrations
            cpdRes.data.registrations?.slice(0, 10).forEach((reg: any) => {
                if (reg.status === 'PENDING' || !reg.status) {
                    newNotifs.push({
                        id: `cpd-${reg.id}`,
                        title: 'New CPD Registration',
                        description: `${reg.firstName} ${reg.lastName} registered for ${reg.course?.title || 'a course'}`,
                        type: 'CPD',
                        time: reg.createdAt,
                        isRead: false,
                        link: '/admin/cpd-applications'
                    });
                }
            });

            // Add pending form submissions (Intake)
            formsRes.data.submissions?.slice(0, 10).forEach((sub: any) => {
                if (sub.status === 'PENDING' || !sub.status) {
                    newNotifs.push({
                        id: `sub-${sub.id}`,
                        title: `New ${sub.form?.title || 'Form'} Submission`,
                        description: `A new application has been received via the ${sub.form?.title || 'portal'}.`,
                        type: 'INTAKE',
                        time: sub.createdAt,
                        isRead: false,
                        link: '/admin/clinical-attachments'
                    });
                }
            });

            // Sort by time
            newNotifs.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
            setNotifications(newNotifs);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
        return () => clearInterval(interval);
    }, [user]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const getIcon = (type: string) => {
        switch (type) {
            case 'MESSAGE': return <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-blue-500" />;
            case 'CPD': return <AcademicCapIcon className="w-5 h-5 text-emerald-500" />;
            case 'INTAKE': return <IdentificationIcon className="w-5 h-5 text-purple-500" />;
            default: return <BellIcon className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 transition-all relative group"
            >
                <BellIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-4 w-[380px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                        <div>
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Notification Matrix</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1.5">{unreadCount} actionable signals detected</p>
                        </div>
                        <button 
                            onClick={() => setNotifications(notifications.map(n => ({...n, isRead: true})))}
                            className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                        >
                            Deactivate Alerts
                        </button>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                        {notifications.length === 0 ? (
                            <div className="py-20 text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-inner">
                                    <CheckCircleIcon className="w-8 h-8" />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure State: No Hazards Detected</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {notifications.map((notif) => (
                                    <Link 
                                        key={notif.id} 
                                        href={notif.link}
                                        onClick={() => setIsOpen(false)}
                                        className="flex gap-4 p-5 hover:bg-slate-50 transition-colors group"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-all border border-slate-50 shadow-sm">
                                            {getIcon(notif.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black text-slate-900 leading-tight mb-1">{notif.title}</p>
                                            <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">{notif.description}</p>
                                            <div className="flex items-center gap-2 mt-2 text-[9px] font-black text-slate-300 uppercase tracking-tighter">
                                                <ClockIcon className="w-3 h-3" />
                                                {new Date(notif.time).toLocaleDateString()} at {new Date(notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                        {!notif.isRead && (
                                            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgba(27,79,138,0.5)]" />
                                        )}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link 
                        href="/admin/dashboard" 
                        onClick={() => setIsOpen(false)}
                        className="block py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                        Scan Complete Feed
                    </Link>
                </div>
            )}
        </div>
    );
}
