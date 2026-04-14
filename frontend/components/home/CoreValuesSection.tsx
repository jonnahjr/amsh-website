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
        icon: <HeartIcon className="w-8 h-8" />,
        title: "Compassion",
        description: "We treat every patient with empathy, kindness, and understanding. We recognize the emotional and psychological challenges our patients face and provide care in a supportive and healing environment.",
    },
    {
        icon: <AcademicCapIcon className="w-8 h-8" />,
        title: "Excellence",
        description: "We are committed to the highest standards of clinical care, professional practice, and service delivery. We continuously improve our systems, skills, and services to ensure the best possible outcomes.",
    },
    {
        icon: <ScaleIcon className="w-8 h-8" />,
        title: "Integrity",
        description: "We uphold honesty, transparency, and ethical principles in all our actions. We maintain patient confidentiality, professional accountability, and trust.",
    },
    {
        icon: <LightBulbIcon className="w-8 h-8" />,
        title: "Innovation",
        description: "We embrace modern technologies, research, and new approaches to improve mental health care, including telepsychiatry, digital health systems, and evidence-based treatment models.",
    },
    {
        icon: <UserGroupIcon className="w-8 h-8" />,
        title: "Respect for Human Dignity",
        description: "We respect the rights, values, and individuality of every person. We promote equality, inclusiveness, and non-discrimination in all our services.",
    },
    {
        icon: <BeakerIcon className="w-8 h-8" />,
        title: "Evidence-Based Practice",
        description: "We deliver care based on scientific research, clinical expertise, and best international standards to ensure safe, effective, and reliable treatment.",
    }
];

export default function CoreValuesSection() {
    return (
        <section className="relative py-24 bg-[#F5F1E6] border-t border-gray-100">
            <div className="container-custom">
                <div className="max-w-4xl mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-900 text-[10px] font-bold uppercase tracking-[0.2em] rounded-md mb-6 border border-blue-100">
                        Institutional Values
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                        The Foundational Pillars <br />
                        <span className="text-blue-900 font-medium italic opacity-70 underline decoration-blue-200 decoration-4 underline-offset-8">Of Clinical Governance</span>
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl leading-relaxed font-normal">
                        Guided by high-authority standards and clinical ethics, our mission remains focused on delivering excellence in specialized mental health care and psychiatric research.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {values.map((val, i) => (
                        <div key={i} className="group relative flex flex-col items-start h-full">
                            {/* Static Institutional Border & Background */}
                            <div className="w-16 h-16 bg-blue-50 text-blue-950 rounded-2xl flex items-center justify-center mb-8 border border-blue-100 group-hover:bg-blue-900 group-hover:text-white transition-all duration-500">
                                {val.icon}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase group-hover:text-blue-900 transition-colors">
                                    {val.title}
                                </h3>
                                <div className="h-1 w-12 bg-blue-900 mb-6 rounded-full group-hover:w-20 transition-all duration-500" />
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    {val.description}
                                </p>
                            </div>

                            {/* Minimal Bottom Ornament */}
                            <div className="mt-8 pt-8 border-t border-gray-50 flex items-center gap-3 w-full">
                                <span className="text-[10px] font-black text-blue-900/30 uppercase tracking-[0.2em]">Pillar {i + 1}</span>
                                <div className="h-[2px] flex-1 bg-gray-50" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
