'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Bars3Icon,
    XMarkIcon,
    PhoneIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const navLinks = [
    { label: 'Home', href: '/' },
    {
        label: 'About',
        href: '/about',
        children: [
            { label: 'History & Mission', href: '/about' },
            { label: 'Leadership', href: '/about#leadership' },
            { label: 'Organizational Structure', href: '/about#structure' },
        ],
    },
    {
        label: 'Services',
        href: '/services',
        children: [
            { label: 'All Services', href: '/services' },
            { label: 'Clinical Mental Health Services', href: '/services/clinical-mental-health' },
            { label: 'Psychological Services', href: '/services/psychological-services' },
            { label: 'Addiction & Substance Abuse', href: '/services/addiction-substance-abuse' },
            { label: 'Child & Adolescent Mental Health', href: '/services/child-adolescent' },
            { label: 'Rehabilitation Services', href: '/services/rehabilitation' },
            { label: 'Telepsychiatry Services', href: '/services/telepsychiatry' },
            { label: 'Pharmacy Services', href: '/services/pharmacy' },
            { label: 'Laboratory Services', href: '/services/laboratory' },
            { label: 'Training & Education', href: '/services/training-education' },
            { label: 'Research Services', href: '/services/research' },
            { label: 'Community Mental Health', href: '/services/community-mental-health' },
            { label: 'Forensic Psychiatry Services', href: '/services/forensic-psychiatry' },
            { label: 'Referral Services', href: '/services/referral-services' },
            { label: 'Counseling Services', href: '/services/counseling-services' },
            { label: 'Promotion & Prevention', href: '/services/promotion-prevention' },
        ],
    },
    {
        label: 'Departments',
        href: '/departments',
        children: [
            { label: 'All Departments', href: '/departments' },
            { label: 'Clinical Mental Health', href: '/departments/clinical-mental-health' },
            { label: 'Psychological Services', href: '/departments/psychological-services' },
            { label: 'Addiction & Substance Abuse', href: '/departments/addiction-substance-abuse' },
            { label: 'Child & Adolescent', href: '/departments/child-adolescent' },
            { label: 'Rehabilitation Services', href: '/departments/rehabilitation' },
            { label: 'Telepsychiatry Services', href: '/departments/telepsychiatry' },
            { label: 'Pharmacy Services', href: '/departments/pharmacy' },
            { label: 'Laboratory Services', href: '/departments/laboratory' },
            { label: 'Training & Education', href: '/departments/training-education' },
            { label: 'Research Services', href: '/departments/research' },
            { label: 'Community Mental Health', href: '/departments/community-mental-health' },
            { label: 'Forensic Psychiatry', href: '/departments/forensic-psychiatry' },
            { label: 'Referral Services', href: '/departments/referral-services' },
            { label: 'Counseling Services', href: '/departments/counseling-services' },
            { label: 'Promotion & Prevention', href: '/departments/promotion-prevention' },
        ],
    },
    { label: 'Research', href: '/research' },
    { label: 'CPD Training', href: '/cpd' },
    { label: 'Clinical Attachment', href: '/clinical-attachment' },
    {
        label: 'News',
        href: '/news',
        children: [
            { label: 'News & Articles', href: '/news' },
            { label: 'Announcements', href: '/news?type=ANNOUNCEMENT' },
            { label: 'Events', href: '/news?type=EVENT' },
        ],
    },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [pathname]);

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

    return (
        <>
            {/* TOP BAR */}
            <div className="bg-blue-900 text-white text-sm py-2 hidden md:block">
                <div className="container-custom flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <a href="tel:+2511118685385" className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
                            <PhoneIcon className="w-3.5 h-3.5" />
                            <span>+251-111-868-53-85</span>
                        </a>
                        <span className="text-blue-300">|</span>
                        <a href="mailto:info@amsh.gov.et" className="hover:text-cyan-300 transition-colors">
                            info@amsh.gov.et
                        </a>
                        <span className="text-blue-300">|</span>
                        <span className="text-blue-200">Mon - Fri: 2:30 AM - 10:00 AM</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-blue-300 hover:text-white transition-colors text-xs">
                            Admin Portal
                        </Link>
                    </div>
                </div>
            </div>

            {/* MAIN NAVBAR */}
            <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
                ? 'glass-nav py-2'
                : 'bg-white/90 backdrop-blur-md py-4'
                }`}>
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">

                        {/* LOGO - DYNAMIC FLOATING EFFECT */}
                        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group relative z-[60] -ml-32">
                            <div className={`relative overflow-hidden transition-all duration-700 ease-in-out flex items-center justify-center p-0 rounded-full shadow-2xl border-4 ring-4 ring-white -ml-12
                                ${scrolled
                                    ? 'w-12 h-12 border-cyan-400/30 shadow-cyan-400/10'
                                    : 'w-32 h-32 -mb-20 border-cyan-400/60 shadow-cyan-400/40 scale-125 translate-y-6'}`}
                            >
                                <video
                                    src="/images/PixVerse_V5.6_Image_Text_360P_Create_a_premium.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover p-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent pointer-events-none" />
                            </div>
                            {/* Text beside the logo */}
                            <div className="flex flex-col">
                                <div className={`font-black text-blue-900 leading-none uppercase tracking-tight transition-all duration-500 ${scrolled ? 'text-2xl' : 'text-3xl'}`}>AMSH</div>
                                <div className={`text-gray-600 font-extrabold leading-tight transition-all duration-500 ${scrolled ? 'text-sm' : 'text-base'}`}>አማኑኤል የአእምሮ ስፔሻላይዝድ ሆስፒታል</div>
                                <div className={`text-gray-400 font-bold leading-tight transition-all duration-500 ${scrolled ? 'text-xs' : 'text-sm'}`}>Amanuel Mental Specialized Hospital</div>
                            </div>
                        </Link>

                        {/* DESKTOP NAVIGATION */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <div
                                    key={link.href}
                                    className="relative group"
                                    onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive(link.href) && link.href !== '/'
                                            ? 'text-blue-900 bg-blue-50'
                                            : isActive(link.href) && link.href === '/'
                                                ? 'text-blue-900 bg-blue-50'
                                                : 'text-gray-700 hover:text-blue-900 hover:bg-blue-50'
                                            }`}
                                    >
                                        {link.label}
                                        {link.children && (
                                            <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                                        )}
                                    </Link>

                                    {/* DROPDOWN */}
                                    {link.children && activeDropdown === link.label && (
                                        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 animate-fade-in z-50">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:text-blue-900 hover:bg-blue-50 transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900/40" />
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* DESKTOP ACTIONS */}
                        <div className="hidden lg:flex items-center gap-3">
                            <button className="p-2 rounded-lg text-gray-500 hover:text-blue-900 hover:bg-blue-50 transition-colors">
                                <MagnifyingGlassIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {isOpen && (
                    <div className="lg:hidden border-t border-gray-100 animate-fade-in">
                        <div className="container-custom py-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">

                            {navLinks.map((link) => (
                                <div key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive(link.href) ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                    {link.children && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-blue-900 rounded-lg hover:bg-blue-50 transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
