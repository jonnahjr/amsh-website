'use client';

import {
    HeartIcon,
    AcademicCapIcon,
    ScaleIcon,
    LightBulbIcon,
    UserGroupIcon,
    BeakerIcon
} from '@heroicons/react/24/outline';

const values = [
    {
        icon: 'logo',
        iconComp: <HeartIcon className="w-8 h-8" />,
        title: "Compassion",
        description: "We treat every patient with empathy, kindness, and understanding. We recognize the emotional and psychological challenges our patients face and provide care in a supportive and healing environment.",
    },
    {
        icon: '🏆',
        iconComp: <AcademicCapIcon className="w-8 h-8" />,
        title: "Excellence",
        description: "We are committed to the highest standards of clinical care, professional practice, and service delivery. We continuously improve our systems, skills, and services to ensure the best possible outcomes.",
    },
    {
        icon: '⚖️',
        iconComp: <ScaleIcon className="w-8 h-8" />,
        title: "Integrity",
        description: "We uphold honesty, transparency, and ethical principles in all our actions. We maintain patient confidentiality, professional accountability, and trust.",
    },
    {
        icon: '💡',
        iconComp: <LightBulbIcon className="w-8 h-8" />,
        title: "Innovation",
        description: "We embrace modern technologies, research, and new approaches to improve mental health care, including telepsychiatry, digital health systems, and evidence-based treatment models.",
    },
    {
        icon: '🤝',
        iconComp: <UserGroupIcon className="w-8 h-8" />,
        title: "Respect for Human Dignity",
        description: "We respect the rights, values, and individuality of every person. We promote equality, inclusiveness, and non-discrimination in all our services.",
    },
    {
        icon: '🔬',
        iconComp: <BeakerIcon className="w-8 h-8" />,
        title: "Commitment to Evidence-Based Practice",
        description: "We deliver care based on scientific research, clinical expertise, and best international standards to ensure safe, effective, and reliable treatment.",
    }
];

export default function CoreValuesSection() {
    return (
        <section className="relative py-24 md:py-32 bg-white overflow-hidden">
            {/* Background Texture & Decor */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-blue-50/50 -skew-y-3 origin-top-left pointer-events-none" />

            <div className="container-custom relative z-10 w-full">
                <div className="text-center max-w-4xl mx-auto mb-20 px-4 -mt-12 -translate-y-4">
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-blue-900 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-8 shadow-xl">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Our Foundation
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-blue-950 tracking-tighter leading-[0.85] mb-8">
                        The Core Values <br />
                        <span className="text-gray-400 italic font-medium">That Guide Our Mission</span>
                    </h2>
                </div>

                {/* Values Grid - "make the box color dark blue" */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {values.map((val, i) => (
                        <div
                            key={i}
                            className="group relative p-12 bg-blue-950 rounded-[4rem] text-white shadow-3xl hover:-translate-y-3 transition-all duration-700 overflow-hidden"
                        >
                            {/* Animated background glow */}
                            <div className="absolute -inset-10 bg-gradient-to-br from-blue-600/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700" />

                            <div className="relative z-10">
                                {/* Icon Header */}
                                <div className="flex items-center justify-between mb-10">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center text-cyan-400 border border-white/10 group-hover:bg-blue-50 group-hover:text-blue-950 transition-all duration-500 shadow-xl">
                                        <div className="group-hover:scale-110 transition-transform">
                                            {val.iconComp}
                                        </div>
                                    </div>
                                    {val.icon === 'logo' ? (
                                        <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 opacity-30 group-hover:opacity-100 transition-all duration-500 relative shadow-2xl">
                                            <video
                                                src="/images/PixVerse_V5.6_Image_Text_360P_Create_a_premium.mp4"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <span className="text-5xl opacity-10 filter grayscale brightness-200 transition-opacity group-hover:opacity-30">{val.icon}</span>
                                    )}
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-6 leading-tight group-hover:text-cyan-400 transition-colors">
                                    {val.title}
                                </h3>
                                <p className="text-blue-100/70 text-base leading-relaxed font-medium">
                                    {val.description}
                                </p>
                            </div>

                            {/* Decorative Edge Glow */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-tl-[100px] -mr-16 -mb-16 group-hover:bg-blue-50/20 transition-all duration-700" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
