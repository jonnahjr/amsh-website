'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { servicesAPI, departmentsAPI } from '@/lib/api';
import { usePathname } from 'next/navigation';
import {
    Bars3Icon,
    XMarkIcon,
    PhoneIcon,
    ChevronDownIcon,
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
            { label: 'Psychiatry Services', href: '/services/psychiatry-services' },
            { label: 'Emergency Services (24/7)', href: '/services/emergency-services' },
            { label: 'Internal Medicine', href: '/services/internal-medicine' },
            { label: 'Neurology Services', href: '/services/neurology-services' },
            { label: 'Laboratory & Radiology', href: '/services/laboratory-services' },
            { label: 'Pharmacy Services', href: '/services/outpatient-pharmacy' },
            { label: 'Clinical Psychology', href: '/services/clinical-psychology' },
            { label: 'MCH & Family Planning', href: '/services/mch-services' },
        ],
    },
    {
        label: 'Departments',
        href: '/departments',
        children: [
            { label: 'All Departments', href: '/departments' },
            { label: 'Adult Psychiatry', href: '/departments/adult-psychiatry' },
            { label: 'Child & Adolescent', href: '/departments/child-psychiatry' },
            { label: 'Emergency Psychiatry', href: '/departments/emergency' },
            { label: 'Addiction Treatment', href: '/departments/addiction-treatment' },
            { label: 'Clinical Psychology', href: '/departments/psychology' },
            { label: 'Forensic Psychiatry', href: '/departments/forensic-psychiatry' },
            { label: 'Rehabilitation Services', href: '/departments/rehabilitation' },
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
    const [links, setLinks] = useState(navLinks);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        Promise.all([
            servicesAPI.getAll().catch(() => ({ data: [] })),
            departmentsAPI.getAll().catch(() => ({ data: [] }))
        ]).then(([servicesRes, departmentsRes]) => {
            const services = Array.isArray(servicesRes.data) ? servicesRes.data : Array.isArray(servicesRes.data?.services) ? servicesRes.data.services : [];
            const departments = Array.isArray(departmentsRes.data) ? departmentsRes.data : Array.isArray(departmentsRes.data?.departments) ? departmentsRes.data.departments : [];

            if (services.length > 0 || departments.length > 0) {
                setLinks(prev => prev.map(link => {
                    if (link.label === 'Services' && services.length > 0) {
                        return {
                            ...link,
                            children: [
                                { label: 'All Services', href: '/services' },
                                ...services.slice(0, 6).map((s: any) => ({ label: s.name, href: `/services/${s.slug}` }))
                            ]
                        };
                    }
                    if (link.label === 'Departments' && departments.length > 0) {
                        return {
                            ...link,
                            children: [
                                { label: 'All Departments', href: '/departments' },
                                ...departments.slice(0, 6).map((d: any) => ({ label: d.name, href: `/departments/${d.slug}` }))
                            ]
                        };
                    }
                    return link;
                }));
            }
        });
    }, []);

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveDropdown(label);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 200);
    };

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
                        <a href="mailto:info@emsh.gov.et" className="hover:text-cyan-300 transition-colors">
                            info@emsh.gov.et
                        </a>
                        <span className="text-blue-300">|</span>
                        <span className="text-blue-200">Mon - Fri: 2:30 AM - 10:00 AM</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="text-blue-300 hover:text-white transition-colors text-xs">
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
                        <Link href="/" className="flex items-center gap-4 flex-shrink-0 group relative z-[60] -ml-16 lg:-ml-24">
                            <div className={`relative overflow-hidden transition-all duration-700 ease-in-out flex items-center justify-center rounded-full border-[4px] border-white bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)]
                                ${scrolled
                                    ? 'w-14 h-14'
                                    : 'w-28 h-28 -mb-14 scale-100 translate-y-2'}`}
                            >
                                <video
                                    src="/images/PixVerse_V5.6_Image_Text_360P_Create_a_premium.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover rounded-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
                            </div>
                            {/* Text beside the logo */}
                            <div className="flex flex-col">
                                <div className={`font-black text-blue-900 leading-none uppercase tracking-tight transition-all duration-500 ${scrolled ? 'text-xl' : 'text-2xl'}`}>EMSH</div>
                                <div className={`text-gray-600 font-extrabold leading-tight transition-all duration-500 ${scrolled ? 'text-[11px]' : 'text-xs'}`}>አማኑኤል የአእምሮ ስፔሻላይዝድ ሆስፒታል</div>
                                <div className={`text-gray-400 font-bold leading-tight transition-all duration-500 ${scrolled ? 'text-[10px]' : 'text-[11px]'}`}>Emmanuel Mental Specialized Hospital</div>
                                <div className="motto-premium text-[10px] mt-0.5 animate-pulse-slow">ለአዕምሮ ጤና እንተጋለን!</div>
                            </div>
                        </Link>



                        <div className="flex-1" />

                        {/* DESKTOP NAVIGATION */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {links.map((link) => (
                                <div
                                    key={link.href}
                                    className="relative group"
                                    onMouseEnter={() => link.children && handleMouseEnter(link.label)}
                                    onMouseLeave={() => link.children && handleMouseLeave()}
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

                            {links.map((link) => (
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
