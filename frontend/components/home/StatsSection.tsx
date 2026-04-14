'use client';

export default function StatsSection() {
    const stats = [
        { value: '80+', label: 'Years of Service', icon: '🏆', description: 'Since 1930 E.C.' },
        { value: '239+', label: 'Hospital Beds', icon: '🛏️', description: 'Inpatient capacity' },
        { value: '300+', label: 'Clinical Staff', icon: '🩺', description: 'Total healthcare professionals' },
        { value: '17+', label: 'Psychiatrists', icon: '🧠', description: 'Expert specialist doctors' },
        { value: '40+', label: 'General Practitioners', icon: '👨‍⚕️', description: 'Expert GPs' },
        { value: '50+', label: 'Psychiatric Nurses', icon: '👩‍⚕️', description: 'Dedicated care staff' },
        { value: '10+', label: 'Internal Specialists', icon: '🏥', description: 'Internal Medicine Experts' },
        { value: '5+', label: 'Neurologists', icon: '⚡', description: 'Brain & Nervous System' },
        { value: '10,000+', label: 'Annual Patients', icon: '💙', description: 'Lives touched annually' },
        { value: '24/7', label: 'Emergency Care', icon: '🚨', description: 'Always available' },
        { value: '500+', label: 'Ongoing Research', icon: '📄', description: 'Published works' },
    ];

    return (
        <section className="relative z-20 overflow-hidden py-0 bg-white -mt-12 sm:-mt-16">
            <div className="relative group overflow-hidden">
                {/* Shadow markers to indicate more content */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none"></div>

                {/* Sliding Container */}
                <div className="flex hover:[animation-play-state:paused] w-max">
                    {/* First set */}
                    <div className="flex animate-marquee gap-6 pr-6">
                        {stats.map((stat, i) => (
                            <div
                                key={`stat-1-${i}`}
                                className="content-box-premium group flex items-center gap-4 rounded-2xl p-4 min-w-[260px] cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:bg-white hover:border-blue-100 transition-all duration-300"
                            >
                                <div className="w-10 h-10 bg-white/50 group-hover:bg-blue-50 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl shrink-0 border border-white/40 group-hover:border-blue-200 shadow-inner group-hover:shadow-md outline outline-2 outline-transparent group-hover:outline-blue-100 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                                    {stat.icon}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-black text-blue-950 shrink-0 group-hover:text-blue-600 transition-colors duration-300">{stat.value}</span>
                                        <span className="text-[10px] font-black text-blue-900/60 uppercase tracking-wider truncate group-hover:text-blue-900 transition-colors duration-300">{stat.label}</span>
                                    </div>
                                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] leading-none mt-1 truncate group-hover:text-gray-600 transition-colors duration-300">
                                        {stat.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Second set (duplicate for seamless loop) */}
                    <div className="flex animate-marquee gap-6 pr-6">
                        {stats.map((stat, i) => (
                            <div
                                key={`stat-2-${i}`}
                                className="content-box-premium group flex items-center gap-4 rounded-2xl p-4 min-w-[260px] cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:bg-white hover:border-blue-100 transition-all duration-300"
                            >
                                <div className="w-10 h-10 bg-white/50 group-hover:bg-blue-50 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl shrink-0 border border-white/40 group-hover:border-blue-200 shadow-inner group-hover:shadow-md outline outline-2 outline-transparent group-hover:outline-blue-100 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                                    {stat.icon}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-black text-blue-950 shrink-0 group-hover:text-blue-600 transition-colors duration-300">{stat.value}</span>
                                        <span className="text-[10px] font-black text-blue-900/60 uppercase tracking-wider truncate group-hover:text-blue-900 transition-colors duration-300">{stat.label}</span>
                                    </div>
                                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] leading-none mt-1 truncate group-hover:text-gray-600 transition-colors duration-300">
                                        {stat.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
