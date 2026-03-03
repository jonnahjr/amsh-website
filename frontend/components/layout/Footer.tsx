import Link from 'next/link';

interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

const footerLinks: Record<string, FooterLink[]> = {
    'Quick Links': [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Departments', href: '/departments' },
        { label: 'News', href: '/news' },
        { label: 'Research', href: '/research' },
        { label: 'CPD Training', href: '/cpd' },
        { label: 'Clinical Attachment', href: '/clinical-attachment' },
        { label: 'Contact Us', href: '/contact' },
    ],
    'Resources': [
        { label: 'Guidelines & Manuals', href: '/resources/guidelines' },
        { label: 'Publications', href: '/research' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Newsletter', href: '/#newsletter' },
        { label: 'Patient Services', href: '/services' },
        { label: 'MOH Ethiopia', href: 'https://www.moh.gov.et', external: true },
    ],
    'External Links': [
        { label: 'Ministry of Health', href: 'https://www.moh.gov.et', external: true },
        { label: 'WHO Ethiopia', href: 'https://www.afro.who.int/countries/ethiopia', external: true },
        { label: 'Ethiopian Public Health Institute', href: 'https://www.ephi.gov.et', external: true },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">

            {/* Main Footer */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-4 mb-6 group">
                            <div className="relative w-28 h-28 flex items-center justify-center p-0 transition-all duration-500 group-hover:scale-110 overflow-hidden rounded-full border-4 border-blue-600/30 shadow-2xl shadow-blue-500/20 group-hover:border-cyan-400/40">
                                <video
                                    src="/images/PixVerse_V5.6_Image_Text_360P_Create_a_premium.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover p-0"
                                />
                            </div>
                            <div>
                                <div className="font-black text-white text-2xl tracking-tighter uppercase">AMSH</div>
                                <div className="text-xs text-blue-400 font-bold uppercase tracking-widest leading-tight">Amanuel Mental Specialized Hospital</div>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                            Specialized public mental health institution established in 1930.
                            Providing comprehensive, compassionate psychiatric care for over 90 years.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <span className="text-blue-400 mt-0.5">📍</span>
                                <div>
                                    <p className="text-white text-sm font-semibold">Address</p>
                                    <p className="text-gray-400 text-sm">Addis Ababa, Ethiopia</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-blue-400">📞</span>
                                <div>
                                    <p className="text-white text-sm font-semibold">Main Line</p>
                                    <a href="tel:+2511118685385" className="text-gray-400 text-sm hover:text-blue-400 transition-colors">
                                        +251-111-868-53-85
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-blue-400">✉️</span>
                                <div>
                                    <p className="text-white text-sm font-semibold">Email</p>
                                    <a href="mailto:info@amsh.gov.et" className="text-gray-400 text-sm hover:text-blue-400 transition-colors">
                                        info@amsh.gov.et
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-blue-400">🕐</span>
                                <div>
                                    <p className="text-white text-sm font-semibold">Working Hours</p>
                                    <p className="text-gray-400 text-sm">Mon - Fri: 2:30 AM - 10:00 AM</p>
                                    <p className="text-green-400 text-xs">Emergency: 24/7</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-6">
                            <a href="https://facebook.com/amsh.gov.et" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-colors text-sm">
                                f
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-gray-700 hover:bg-sky-500 flex items-center justify-center transition-colors text-sm">
                                𝕏
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-gray-700 hover:bg-red-600 flex items-center justify-center transition-colors text-sm">
                                ▶
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="text-white font-bold text-base mb-5 pb-2 border-b border-gray-700">
                                {title}
                            </h3>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        {link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 text-sm hover:text-blue-400 transition-colors flex items-center gap-1.5"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0" />
                                                {link.label} ↗
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-gray-400 text-sm hover:text-blue-400 transition-colors flex items-center gap-1.5"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0" />
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Amanuel Mental Specialized Hospital. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-gray-500 text-sm">Yonas Bogale | AMSH IT Department</span>
                        <span className="text-gray-600 mx-2">|</span>
                        <Link href="/privacy" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Privacy Policy</Link>
                        <span className="text-gray-600 mx-2">|</span>
                        <Link href="/admin" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
