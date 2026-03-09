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
    Bars3CenterLeftIcon,
    BellIcon,
    MagnifyingGlassIcon,
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
        group: 'Analytics', items: [
            { label: 'Overview', href: '/admin/dashboard', icon: ChartBarIcon },
        ]
    },
    {
        group: 'Digital Assets', items: [
            { label: 'Site Pages', href: '/admin/pages', icon: GlobeAltIcon, roles: ['SUPER_ADMIN', 'ADMIN'] },
            { label: 'News & Media', href: '/admin/posts', icon: MegaphoneIcon, roles: ['SUPER_ADMIN', 'ADMIN', 'NEWS_ADMIN', 'EDITOR'] },
            { label: 'File Manager', icon: PhotoIcon, href: '/admin/media', roles: ['SUPER_ADMIN', 'ADMIN', 'NEWS_ADMIN', 'EDITOR', 'CPD_ADMIN', 'RESEARCH_ADMIN', 'CONTENT_ADMIN'] },
            { label: 'Navigation', icon: Square2StackIcon, href: '/admin/navigation', roles: ['SUPER_ADMIN', 'ADMIN'] },
        ]
    },
    {
        group: 'Institutional', items: [
            {
                label: 'Professional CPD',
                icon: AcademicCapIcon,
                roles: ['SUPER_ADMIN', 'ADMIN', 'CPD_ADMIN'],
                children: [
                    { label: 'All Applications', href: '/admin/cpd-applications', icon: AcademicCapIcon },
                    { label: 'Government', href: '/admin/cpd-applications/government', icon: BuildingLibraryIcon },
                    { label: 'Private Sector', href: '/admin/cpd-applications/private', icon: AcademicCapIcon },
                    { label: 'Independent', href: '/admin/cpd-applications/personal', icon: UserGroupIcon },
                ]
            },
            {
                label: 'Clinical Intake',
                icon: DocumentTextIcon,
                roles: ['SUPER_ADMIN', 'ADMIN', 'CLINICAL_ADMIN'],
                children: [
                    { label: 'Global View', href: '/admin/clinical-attachments', icon: GlobeAltIcon },
                    { label: 'Government', href: '/admin/clinical-attachments/government', icon: BuildingLibraryIcon },
                    { label: 'Private Sector', href: '/admin/clinical-attachments/private', icon: AcademicCapIcon },
                    { label: 'Medical Students', href: '/admin/clinical-attachments/personal', icon: UserGroupIcon },
                ]
            },
            { label: 'Departments', icon: CircleStackIcon, href: '/admin/departments', roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_ADMIN'] },
            { label: 'Services', icon: BriefcaseIcon, href: '/admin/services', roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_ADMIN'] },
        ]
    },
    {
        group: 'Communication', items: [
            { label: 'Research Lab', icon: LightBulbIcon, href: '/admin/research', roles: ['SUPER_ADMIN', 'ADMIN', 'RESEARCH_ADMIN'] },
            { label: 'Newsletter', icon: MegaphoneIcon, href: '/admin/newsletter', roles: ['SUPER_ADMIN', 'ADMIN'] },
            { label: 'Contact Response Manager', icon: ChatBubbleLeftRightIcon, href: '/admin/messages', roles: ['SUPER_ADMIN', 'ADMIN', 'CONTACT_ADMIN', 'CLINICAL_ADMIN'] },
        ]
    },
    {
        group: 'Governance', items: [
            { label: 'Config Engine', icon: Cog6ToothIcon, href: '/admin/settings', roles: ['SUPER_ADMIN', 'ADMIN'] },
            { label: 'Access Control', icon: UsersIcon, href: '/admin/users', superAdminOnly: true },
            { label: 'Feedback', icon: ChatBubbleLeftRightIcon, href: '/admin/testimonials', roles: ['SUPER_ADMIN', 'ADMIN', 'CONTENT_ADMIN'] },
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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-[5px] border-primary/10 border-t-primary rounded-full animate-spin" />
                    <div className="text-center">
                        <p className="text-primary font-bold text-lg">Initializing Console</p>
                        <p className="text-slate-400 text-sm">Authenticating secure session...</p>
                    </div>
                </div>
            </div>
        );
    }

    const isActive = (href?: string) => href ? (pathname === href || pathname.startsWith(href + '/')) : false;

    return (
        <div className="min-h-screen bg-[#F8FAFB] flex font-inter text-slate-700">
            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Premium Sidebar */}
            <aside className={`fixed inset-y-0 left-0 bg-primary-dark z-50 transition-all duration-500 ease-in-out flex flex-col shadow-2xl ${sidebarOpen ? 'w-[280px]' : 'w-[88px]'}`}>
                {/* Branding */}
                <div className="h-24 flex items-center px-6 border-b border-white/5 shrink-0">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                            <img src="/images/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                        </div>
                        {sidebarOpen && (
                            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                                <span className="block font-jakarta font-black text-white text-xl tracking-tight leading-none">EMSH</span>
                                <span className="block text-[9px] text-accent font-black tracking-[0.3em] mt-1.5 opacity-80 uppercase text-nowrap">Admin Command</span>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-8 no-scrollbar">
                    {menuItems.map((group) => {
                        const visibleItems = group.items.filter(item => {
                            if (item.superAdminOnly && !isSuperAdmin) return false;
                            if (item.roles && !item.roles.includes(user.role)) return false;
                            return true;
                        });
                        if (visibleItems.length === 0) return null;

                        return (
                            <div key={group.group}>
                                {sidebarOpen && (
                                    <h3 className="px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.25em] mb-4">{group.group}</h3>
                                )}
                                <div className="space-y-1">
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
                </nav>

                {/* Sidebar User Profile */}
                <div className="p-4 mt-auto border-t border-white/5">
                    <div className={`flex items-center gap-4 bg-white/[0.03] p-3 rounded-2xl border border-white/5 ${!sidebarOpen && 'justify-center'}`}>
                        <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-black text-sm">
                                {user.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-primary-dark rounded-full" />
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1 min-w-0 pr-2">
                                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                                <p className="text-[10px] text-white/40 font-medium truncate uppercase tracking-widest">{user.role}</p>
                            </div>
                        )}
                        <button
                            onClick={logout}
                            className={`p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors ${!sidebarOpen && 'w-full flex justify-center'}`}
                            title="Sign Out"
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 flex flex-col transition-all duration-500 min-w-0 ${sidebarOpen ? 'pl-[280px]' : 'pl-[88px]'}`}>
                {/* Modern Fixed Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40 px-8 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                        >
                            <Bars3CenterLeftIcon className={`w-6 h-6 transition-transform duration-300 ${!sidebarOpen && 'rotate-180'}`} />
                        </button>

                        <div className="h-6 w-px bg-slate-200 hidden md:block" />

                        <div className="hidden md:block">
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                                <Link href="/admin/dashboard" className="hover:text-primary">Console</Link>
                                <span>/</span>
                                <span className="text-slate-900 font-semibold">{menuItems.flatMap(g => g.items).find(i => i.href && isActive(i.href))?.label || 'Active Session'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 group">
                            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 group-focus-within:text-primary" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-400 w-48 font-medium"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-2.5 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 transition-all relative">
                                <BellIcon className="w-6 h-6" />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full ring-2 ring-white" />
                            </button>
                            <div className="h-8 w-px bg-slate-200 mx-2" />
                            <Link href="/admin/settings" className="flex items-center gap-3 pl-2 group">
                                <div className="text-right hidden xl:block">
                                    <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
                                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">Super Admin</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                                    <img src={`https://ui-avatars.com/api/?name=${user.name}&background=1B4F8A&color=fff`} alt="Avatar" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Viewport Content */}
                <div className="p-8 max-w-[1600px] mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
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

    const activeStyles = "bg-accent text-white shadow-lg shadow-accent/20";
    const inactiveStyles = "text-white/40 hover:text-white hover:bg-white/5";

    return (
        <div className="relative">
            {item.href ? (
                <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${active ? activeStyles : inactiveStyles}`}
                >
                    <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                    {sidebarOpen && <span className="text-[13px] font-bold tracking-wide">{item.label}</span>}
                    {!sidebarOpen && active && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-accent rounded-l-full shadow-[0_0_10px_rgb(0,180,216)]" />
                    )}
                </Link>
            ) : (
                <>
                    <button
                        onClick={() => sidebarOpen && setIsOpen(!isOpen)}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${active && !isOpen ? activeStyles : inactiveStyles}`}
                    >
                        <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-300 ${active && !isOpen ? 'scale-110' : 'group-hover:scale-110'}`} />
                        {sidebarOpen && <span className="text-[13px] font-bold tracking-wide">{item.label}</span>}
                        {sidebarOpen && (
                            <ChevronDownIcon className={`w-3.5 h-3.5 ml-auto transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : 'opacity-40'}`} />
                        )}
                    </button>

                    {hasChildren && sidebarOpen && isOpen && (
                        <div className="mt-1 ml-6 pl-5 border-l border-white/10 space-y-1 py-1 animate-in fade-in slide-in-from-top-1">
                            {item.children?.map((child) => (
                                <Link
                                    key={child.label}
                                    href={child.href}
                                    className={`flex items-center gap-3 py-2 px-3 rounded-lg text-[12px] font-semibold transition-all duration-300 ${isActive(child.href)
                                        ? 'text-accent bg-accent/10 whitespace-nowrap'
                                        : 'text-white/30 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${isActive(child.href) ? 'bg-accent shadow-[0_0_8px_rgba(0,180,216,0.6)]' : 'bg-white/10'}`} />
                                    <span>{child.label}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
