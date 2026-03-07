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
    AcademicCapIcon,
    BuildingLibraryIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface MenuItem {
    label: string;
    href?: string;
    icon: any;
    superAdminOnly?: boolean;
    roles?: string[];
    children?: { label: string; href: string; icon?: any }[];
}

interface MenuGroup {
    group: string;
    items: MenuItem[];
}

const menuItems: MenuGroup[] = [
    {
        group: 'Overview', items: [
            { label: 'Dashboard', href: '/admin/dashboard', icon: ChartBarIcon },
        ]
    },
    {
        group: 'Content', items: [
            { label: 'Pages & Builder', href: '/admin/pages', icon: GlobeAltIcon, roles: ['SUPER_ADMIN', 'ADMIN'] },
            { label: 'Posts & News', href: '/admin/posts', icon: DocumentTextIcon, roles: ['SUPER_ADMIN', 'ADMIN', 'NEWS_ADMIN', 'EDITOR'] },
            { label: 'Media Library', icon: PhotoIcon, href: '/admin/media', roles: ['SUPER_ADMIN', 'ADMIN', 'NEWS_ADMIN', 'EDITOR', 'CPD_ADMIN', 'RESEARCH_ADMIN', 'CONTENT_ADMIN'] },
            { label: 'Navigation', icon: Square2StackIcon, href: '/admin/navigation', roles: ['SUPER_ADMIN', 'ADMIN'] },
        ]
    },
    {
        group: 'Management', items: [
            {
                label: 'CPD Applications',
                icon: AcademicCapIcon,
                roles: ['SUPER_ADMIN', 'ADMIN', 'CPD_ADMIN'],
                children: [
                    { label: 'All Applications', href: '/admin/cpd-applications', icon: AcademicCapIcon },
                    { label: 'Gov. CPD', href: '/admin/cpd-applications/government', icon: BuildingLibraryIcon },
                    { label: 'Private CPD', href: '/admin/cpd-applications/private', icon: AcademicCapIcon },
                    { label: 'Independent CPD', href: '/admin/cpd-applications/personal', icon: UserGroupIcon },
                ]
            },
            {
                label: 'Clinical Attachments',
                icon: DocumentTextIcon,
                roles: ['SUPER_ADMIN', 'ADMIN', 'CLINICAL_ADMIN'],
                children: [
                    { label: 'Global View', href: '/admin/clinical-attachments', icon: GlobeAltIcon },
                    { label: 'Gov. Attachments', href: '/admin/clinical-attachments/government', icon: BuildingLibraryIcon },
                    { label: 'Private Attachments', href: '/admin/clinical-attachments/private', icon: AcademicCapIcon },
                    { label: 'Independent Attachments', href: '/admin/clinical-attachments/personal', icon: UserGroupIcon },
                ]
            },
            { label: 'Departments', icon: CircleStackIcon, href: '/admin/departments', roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_ADMIN'] },
            { label: 'Department Categories', icon: BriefcaseIcon, href: '/admin/department-categories', roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_ADMIN'] },
            { label: 'Service Categories', icon: BriefcaseIcon, href: '/admin/service-categories', roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_ADMIN'] },
            { label: 'Services', icon: BriefcaseIcon, href: '/admin/services', roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_ADMIN'] },
        ]
    },
    {
        group: 'Interactions', items: [
            { label: 'Appointments', icon: CalendarIcon, href: '/admin/appointments', roles: ['SUPER_ADMIN', 'ADMIN', 'CLINICAL_ADMIN', 'CONTACT_ADMIN'] },
            { label: 'Research Submissions', icon: LightBulbIcon, href: '/admin/research', roles: ['SUPER_ADMIN', 'ADMIN', 'RESEARCH_ADMIN'] },
            { label: 'Contact Messages', icon: ChatBubbleLeftRightIcon, href: '/admin/messages', roles: ['SUPER_ADMIN', 'ADMIN', 'CONTACT_ADMIN', 'CLINICAL_ADMIN'] },
        ]
    },
    {
        group: 'System', items: [
            { label: 'Site Settings', icon: Cog6ToothIcon, href: '/admin/settings', roles: ['SUPER_ADMIN', 'ADMIN'] },
            { label: 'Admin Users', icon: UsersIcon, href: '/admin/users', superAdminOnly: true },
            { label: 'Testimonials', icon: MegaphoneIcon, href: '/admin/testimonials', roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_ADMIN'] },
            { label: 'FAQs', icon: QuestionMarkCircleIcon, href: '/admin/faqs', roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_ADMIN'] },
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
            <div className="min-h-screen bg-[#FDFCF9] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 font-medium">Authenticating...</p>
                </div>
            </div>
        );
    }

    const isActive = (href?: string) => href ? (pathname === href || pathname.startsWith(href + '/')) : false;

    return (
        <div className="min-h-screen bg-[#FDFCF9] flex selection:bg-cyan-600 selection:text-white font-[Outfit,sans-serif]">
            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 bg-blue-950 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden flex flex-col shadow-[25px_0_60px_rgba(0,0,0,0.1)] ${sidebarOpen ? 'w-[320px]' : 'w-[100px]'}`}>
                {/* Brand - Modern Glass Header */}
                <div className="h-28 flex items-center px-8 border-b border-white/5 relative bg-gradient-to-b from-white/[0.03] to-transparent">
                    <Link href="/" className="flex items-center gap-5 group">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl shadow-cyan-500/10 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <img src="/images/logo.png" alt="EMSH Logo" className="w-full h-full object-cover rounded-full p-1" />
                        </div>
                        {sidebarOpen && (
                            <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                                <div className="font-black text-white text-xl leading-none tracking-tight uppercase">EMSH</div>
                                <div className="text-[10px] text-cyan-400/60 uppercase font-black tracking-[0.3em] mt-2 flex items-center gap-2">
                                    <span className="w-2 h-[1px] bg-cyan-400/30" />
                                    COMMAND
                                </div>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Menu */}
                <div className="flex-1 overflow-y-auto px-6 py-10 space-y-12 no-scrollbar scroll-smooth">
                    {menuItems.map((group) => {
                        const visibleItems = group.items.filter(item => {
                            if (item.superAdminOnly && !isSuperAdmin) return false;
                            if (item.roles && !item.roles.includes(user.role)) return false;
                            return true;
                        });
                        if (visibleItems.length === 0) return null;

                        return (
                            <div key={group.group} className="space-y-4">
                                {sidebarOpen && (
                                    <div className="flex items-center gap-3 px-4 mb-2">
                                        <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] whitespace-nowrap">{group.group}</h3>
                                        <div className="h-[1px] w-full bg-white/5" />
                                    </div>
                                )}
                                <div className="space-y-1.5">
                                    {visibleItems.map((item) => (
                                        <SidebarItem
                                            key={item.label}
                                            item={item}
                                            sidebarOpen={sidebarOpen}
                                            isActive={isActive}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Sidebar Footer - Premium User Info */}
                <div className="p-6 mt-auto">
                    <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4 shadow-inner">
                        <button
                            onClick={logout}
                            className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group ${!sidebarOpen && 'justify-center'}`}
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                            {sidebarOpen && <span className="font-black text-[10px] uppercase tracking-[0.15em]">Log Out</span>}
                        </button>

                        {sidebarOpen && (
                            <div className="pt-4 border-t border-white/5 flex items-center gap-4">
                                <div className="relative group/avatar">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-lg group-hover/avatar:rotate-6 transition-transform">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-blue-950 rounded-full" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-black text-white truncate uppercase tracking-tight">{user.name}</p>
                                    <p className="text-[9px] font-bold text-cyan-400 opacity-60 uppercase tracking-widest">{user.role}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${sidebarOpen ? 'pl-[320px]' : 'pl-[100px]'}`}>
                {/* Header - Transparent Glass */}
                <header className="h-28 bg-[#FDFCF9]/80 backdrop-blur-3xl border-b border-gray-200/50 flex items-center justify-between px-12 sticky top-0 z-40">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="w-14 h-14 flex items-center justify-center bg-white border border-gray-100 hover:border-cyan-100 hover:shadow-2xl hover:shadow-cyan-500/10 rounded-2xl text-gray-400 hover:text-cyan-600 transition-all duration-500 group"
                        >
                            <div className="relative w-6 h-5">
                                <span className={`absolute h-0.5 bg-current rounded-full transition-all duration-500 ${sidebarOpen ? 'w-6 top-0' : 'w-4 top-0'}`} />
                                <span className="absolute w-6 h-0.5 bg-current top-[9px] rounded-full transition-all duration-500" />
                                <span className={`absolute h-0.5 bg-current rounded-full transition-all duration-500 ${sidebarOpen ? 'w-4 bottom-0' : 'w-6 bottom-0'}`} />
                            </div>
                        </button>
                        <div className="hidden md:block">
                            <h1 className="text-blue-950 font-black text-2xl tracking-tighter">
                                {menuItems.flatMap(g => g.items).find(i => i.href && isActive(i.href))?.label || 'Admin Hub'}
                            </h1>
                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                                <span className="text-cyan-600/40">Core Console</span>
                                <span className="w-1 h-1 rounded-full bg-gray-200" />
                                {pathname.split('/').slice(2).join(' / ') || 'Overview'}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="hidden xl:flex items-center gap-5 px-6 py-3 bg-cyan-50/50 border border-cyan-100/30 rounded-2xl">
                            <div className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-600" />
                            </div>
                            <span className="text-[11px] font-black text-cyan-900 uppercase tracking-[0.2em]">Console Live</span>
                        </div>

                        <div className="flex items-center gap-6 border-l border-gray-200/50 pl-10">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-black text-blue-950 uppercase tracking-tight leading-none">{user.name}</div>
                                <div className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.2em] mt-1.5 opacity-80">{user.role}</div>
                            </div>
                            <div className="relative group cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-2xl shadow-cyan-600/20 ring-4 ring-white transition-transform duration-500 group-hover:scale-105">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content Container */}
                <div className="p-10 max-w-[1700px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

function SidebarItem({ item, sidebarOpen, isActive }: { item: MenuItem, sidebarOpen: boolean, isActive: (href?: string) => boolean }) {
    const hasChildren = item.children && item.children.length > 0;
    const [isOpen, setIsOpen] = useState(false);
    const isAnyChildActive = hasChildren && item.children?.some(child => isActive(child.href));
    const active = item.href ? isActive(item.href) : isAnyChildActive;

    useEffect(() => {
        if (isAnyChildActive) setIsOpen(true);
    }, [isAnyChildActive]);

    return (
        <div className="relative px-3">
            {item.href ? (
                <Link
                    href={item.href}
                    className={`flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${active
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-2xl shadow-cyan-600/30 translate-x-1'
                        : 'text-white/40 hover:text-white hover:bg-white/[0.04]'
                        }`}
                    title={!sidebarOpen ? item.label : ''}
                >
                    <item.icon className={`w-[22px] h-[22px] flex-shrink-0 transition-all duration-500 ${active ? 'text-white scale-110' : 'group-hover:scale-110 group-hover:text-cyan-400'}`} />
                    {sidebarOpen && <span className="font-black text-[12px] tracking-widest uppercase">{item.label}</span>}
                    {active && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white rounded-r-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                    )}
                </Link>
            ) : (
                <button
                    onClick={() => sidebarOpen && setIsOpen(!isOpen)}
                    className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-500 group relative ${active && !isOpen
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-2xl shadow-cyan-600/30 translate-x-1'
                        : 'text-white/40 hover:text-white hover:bg-white/[0.04]'
                        }`}
                >
                    <item.icon className={`w-[22px] h-[22px] flex-shrink-0 transition-all duration-500 ${active && !isOpen ? 'text-white scale-110' : 'group-hover:scale-110 group-hover:text-cyan-400'}`} />
                    {sidebarOpen && <span className="font-black text-[12px] tracking-widest uppercase">{item.label}</span>}
                    {sidebarOpen && (
                        <div className={`ml-auto transition-transform duration-500 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-white/20'}`}>
                            <ChevronDownIcon className="w-4 h-4" />
                        </div>
                    )}
                </button>
            )}

            {/* Submenu - Modern Floating Effect */}
            {hasChildren && sidebarOpen && isOpen && (
                <div className="mt-4 ml-10 pl-6 border-l border-white/10 space-y-3 animate-in fade-in slide-in-from-top-2 duration-500 py-1">
                    {item.children?.map((child) => (
                        <Link
                            key={child.label}
                            href={child.href}
                            className={`flex items-center gap-4 py-2 group/sub text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${isActive(child.href)
                                ? 'text-cyan-400 translate-x-1'
                                : 'text-white/30 hover:text-white/80'
                                }`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive(child.href) ? 'bg-cyan-400 scale-150 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-white/10 group-hover/sub:bg-white/40'}`} />
                            <span>{child.label}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
