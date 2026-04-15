'use client';

import Image from 'next/image';

const partners = [
    { name: "Addis Ababa University & Tikur Anbessa Hospital", type: "Academic & Clinical Partner", image: "/partners/aau.png" },
    { name: "St. Paul's Hospital", type: "Clinical Partner", image: "/partners/st-pauls.png" },
    { name: "Wudassie Diagnostic", type: "Clinical Partner", image: "/partners/wudassie-removebg-preview.png" },
    { name: "Mekedonia Home", type: "Community Partner", image: "/partners/mekedonya-removebg-preview.png" },
    { name: "Menelik II Referral Hospital", type: "Clinical Partner", image: "/partners/menelik.png" },
    { name: "Ministry of Health", type: "Government Partner", image: "/partners/moh.png" },
    { name: "PDC", type: "Partner", image: "/partners/PDC-logo.webp" },
    { name: "Ethiopian Red Cross Society", type: "Community Partner", image: "/partners/key_meskel-removebg-preview.png" },
];

export default function PartnersSection() {
    return (
        <section className="relative py-12 bg-[#F5F1E6] border-t border-gray-100 overflow-hidden">
            <div className="container-custom relative z-10 mb-8">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-900 text-[10px] font-bold uppercase tracking-[0.2em] rounded-md mb-6 border border-blue-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        Our Network
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-4 uppercase tracking-tight">
                        Collaborating for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Excellence</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl text-sm font-medium leading-relaxed">
                        We work closely with leading healthcare institutions, universities, and international organizations to deliver world-class mental health care.
                    </p>
                </div>
            </div>

            <div className="relative group overflow-hidden">
                {/* Shadow markers to indicate more content */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F1E6] via-[#F5F1E6]/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F1E6] via-[#F5F1E6]/80 to-transparent z-10 pointer-events-none"></div>

                {/* Sliding Container */}
                <div className="flex w-max">
                    <div className="flex animate-marquee">
                        {/* First Half */}
                        <div className="flex gap-6 pr-6">
                            {[...partners, ...partners].map((partner, i) => (
                                <div
                                    key={`partner-1-${i}`}
                                    className="group relative w-32 h-20 flex items-center justify-center shrink-0 hover:scale-110 transition-all duration-300 mx-6 mix-blend-multiply opacity-80 hover:opacity-100"
                                >
                                    <Image src={partner.image} alt={partner.name} fill className="object-contain" />
                                </div>
                            ))}
                        </div>
                        {/* Second Half (duplicate for seamless loop) */}
                        <div className="flex gap-6 pr-6">
                            {[...partners, ...partners].map((partner, i) => (
                                <div
                                    key={`partner-2-${i}`}
                                    className="group relative w-32 h-20 flex items-center justify-center shrink-0 hover:scale-110 transition-all duration-300 mx-6 mix-blend-multiply opacity-80 hover:opacity-100"
                                >
                                    <Image src={partner.image} alt={partner.name} fill className="object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
