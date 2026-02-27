'use client';

export default function StatsSection() {
    const stats = [
        { value: '90+', label: 'Years of Service', icon: '🏆', description: 'Since 1930 E.C.' },
        { value: '300+', label: 'Hospital Beds', icon: '🛏️', description: 'Inpatient capacity' },
        { value: '50+', label: 'Expert Doctors', icon: '👨‍⚕️', description: 'Psychiatrists' },
        { value: '10,000+', label: 'Annual Patients', icon: '💙', description: 'Lives touched' },
        { value: '24/7', label: 'Emergency Care', icon: '🚨', description: 'Always open' },
        { value: '100+', label: 'Research Papers', icon: '📄', description: 'Published works' },
    ];

    return (
        <section className="relative z-20 overflow-hidden py-16 bg-white">
            <div className="relative group overflow-hidden">
                {/* Shadow markers to indicate more content */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none"></div>

                {/* Sliding Container */}
                <div className="flex hover:[animation-play-state:paused] w-max">
                    {/* First set */}
                    <div className="flex animate-[scroll_30s_linear_infinite] gap-6 pr-6">
                        {stats.map((stat, i) => (
                            <div
                                key={`stat-1-${i}`}
                                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 min-w-[260px] shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                                    {stat.icon}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-black text-blue-900 shrink-0">{stat.value}</span>
                                        <span className="text-xs font-bold text-gray-800 truncate">{stat.label}</span>
                                    </div>
                                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1 truncate">
                                        {stat.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Second set (duplicate for seamless loop) */}
                    <div className="flex animate-[scroll_30s_linear_infinite] gap-6 pr-6">
                        {stats.map((stat, i) => (
                            <div
                                key={`stat-2-${i}`}
                                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 min-w-[260px] shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                                    {stat.icon}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-black text-blue-900 shrink-0">{stat.value}</span>
                                        <span className="text-xs font-bold text-gray-800 truncate">{stat.label}</span>
                                    </div>
                                    <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1 truncate">
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
