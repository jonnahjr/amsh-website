'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Square2StackIcon,
    DocumentTextIcon,
    PhotoIcon,
    UsersIcon,
    UserGroupIcon,
    BriefcaseIcon,
    LightBulbIcon,
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    ChartBarIcon,
    MegaphoneIcon,
    QuestionMarkCircleIcon,
    GlobeAltIcon,
    CircleStackIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
    {
        group: 'Overview', items: [
            { label: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
        ]
    },
    {
        group: 'Content', items: [
            { label: 'Pages & Builder', href: '/admin/pages', icon: GlobeAltIcon },
            { label: 'Posts & News', href: '/admin/posts', icon: DocumentTextIcon },
            { label: 'Media Library', icon: PhotoIcon, href: '/admin/media' },
            { label: 'Navigation', icon: Square2StackIcon, href: '/admin/navigation' },
        ]
    },
    {
        group: 'Management', items: [
            { label: 'Departments', icon: CircleStackIcon, href: '/admin/departments' },
            { label: 'Doctors', icon: UsersIcon, href: '/admin/doctors' },
            { label: 'Services', icon: BriefcaseIcon, href: '/admin/services' },
        ]
    },
    {
        group: 'Interactions', items: [
            { label: 'Appointments', icon: CalendarIcon, href: '/admin/appointments' },
            { label: 'Job Applications', icon: UserGroupIcon, href: '/admin/jobs' },
            { label: 'Research Submissions', icon: LightBulbIcon, href: '/admin/research' },
            { label: 'Contact Messages', icon: ChatBubbleLeftRightIcon, href: '/admin/messages' },
        ]
    },
    {
        group: 'System', items: [
            { label: 'Site Settings', icon: Cog6ToothIcon, href: '/admin/settings' },
            { label: 'Admin Users', icon: UsersIcon, href: '/admin/users', superAdminOnly: true },
            { label: 'Testimonials', icon: MegaphoneIcon, href: '/admin/testimonials' },
            { label: 'FAQs', icon: QuestionMarkCircleIcon, href: '/admin/faqs' },
        ]
    },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout, isSuperAdmin } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (!loading && !user && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [user, loading, router, pathname]);

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 font-medium">Authenticating...</p>
                </div>
            </div>
        );
    }

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

    return (
        <div className="min-h-screen bg-[#F3F6F9] flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 bg-white border-r border-gray-100 z-50 transition-all duration-300 overflow-hidden flex flex-col ${sidebarOpen ? 'w-72' : 'w-20'}`}>
                {/* Brand */}
                <div className="h-20 flex items-center px-6 border-b border-gray-50">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                            <img src="/images/logo.png" alt="AMSH Logo" className="w-full h-full object-contain" />
                        </div>
                        {sidebarOpen && (
                            <div>
                                <div className="font-black text-blue-900 text-sm leading-tight tracking-tight uppercase">AMSH</div>
                                <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest opacity-70">Admin Panel</div>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Menu */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                    {menuItems.map((group) => {
                        const visibleItems = group.items.filter(item => !item.superAdminOnly || isSuperAdmin);
                        if (visibleItems.length === 0) return null;

                        return (
                            <div key={group.group}>
                                {sidebarOpen && <h3 className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{group.group}</h3>}
                                <div className="space-y-1">
                                    {visibleItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.href)
                                                ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20'
                                                : 'text-gray-500 hover:bg-blue-50 hover:text-blue-900'
                                                }`}
                                            title={!sidebarOpen ? item.label : ''}
                                        >
                                            <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-blue-900'}`} />
                                            {sidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
                                            {sidebarOpen && isActive(item.href) && (
                                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" />
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-50">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors group"
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span className="font-bold text-sm">Logout Session</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'pl-72' : 'pl-20'}`}>
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
                        >
                            <Square2StackIcon className="w-5 h-5" />
                            {/* Using a simpler icon if needed or just Bars3 */}
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                        <div className="hidden md:block">
                            <h1 className="text-gray-900 font-black text-xl">
                                {menuItems.flatMap(g => g.items).find(i => isActive(i.href))?.label || 'Admin Dashboard'}
                            </h1>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                                CMS <span className="text-gray-200">/</span> {pathname.split('/').slice(2).join(' / ')}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold text-gray-500">System Live</span>
                        </div>

                        <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-black text-gray-900">{user.name}</div>
                                <div className="text-[10px] font-bold text-blue-900 uppercase tracking-widest">{user.role}</div>
                            </div>
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white font-black shadow-lg">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
