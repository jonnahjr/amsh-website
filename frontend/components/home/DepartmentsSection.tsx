import Link from 'next/link';

const departments = [
    { name: 'Clinical Mental Health', slug: 'clinical-mental-health', icon: '🏥', color: 'bg-blue-100 text-blue-700', borderColor: 'border-blue-200', desc: 'Outpatient (OPD), Inpatient, and Emergency Services' },
    { name: 'Psychological Services', slug: 'psychological-services', icon: '🧠', color: 'bg-purple-100 text-purple-700', borderColor: 'border-purple-200', desc: 'Assessment, Therapies, and Counseling' },
    { name: 'Addiction & Substance Abuse', slug: 'addiction-substance-abuse', icon: '💊', color: 'bg-teal-100 text-teal-700', borderColor: 'border-teal-200', desc: 'Detox, Rehabilitation, and Counseling' },
    { name: 'Child & Adolescent', slug: 'child-adolescent', icon: '👶', color: 'bg-pink-100 text-pink-700', borderColor: 'border-pink-200', desc: 'Autism, ADHD, and Behavioral Disorders' },
    { name: 'Rehabilitation Services', slug: 'rehabilitation', icon: '🔄', color: 'bg-green-100 text-green-700', borderColor: 'border-green-200', desc: 'Occupational Therapy and Social Skills' },
    { name: 'Telepsychiatry Services', slug: 'telepsychiatry', icon: '💻', color: 'bg-indigo-100 text-indigo-700', borderColor: 'border-indigo-200', desc: 'Remote Psychiatric Consultation' },
    { name: 'Pharmacy Services', slug: 'pharmacy', icon: '⚕️', color: 'bg-yellow-100 text-yellow-700', borderColor: 'border-yellow-200', desc: 'Psychiatric medications and prescribing' },
    { name: 'Laboratory Services', slug: 'laboratory', icon: '🔬', color: 'bg-red-100 text-red-700', borderColor: 'border-red-200', desc: 'Blood Tests, Drug Screening' },
    { name: 'Training & Education', slug: 'training-education', icon: '📚', color: 'bg-sky-100 text-sky-700', borderColor: 'border-sky-200', desc: 'Psychiatry and Psychology Training' },
    { name: 'Research Services', slug: 'research', icon: '📊', color: 'bg-amber-100 text-amber-700', borderColor: 'border-amber-200', desc: 'Clinical and Public Health Research' },
    { name: 'Community Mental Health', slug: 'community-mental-health', icon: '🤝', color: 'bg-orange-100 text-orange-700', borderColor: 'border-orange-200', desc: 'Outreach and Awareness Programs' },
    { name: 'Forensic Psychiatry', slug: 'forensic-psychiatry', icon: '⚖️', color: 'bg-slate-100 text-slate-700', borderColor: 'border-slate-200', desc: 'Legal and Court-ordered Evaluations' },
    { name: 'Referral Services', slug: 'referral-services', icon: '🏥', color: 'bg-lime-100 text-lime-700', borderColor: 'border-lime-200', desc: 'National Psychiatric Referral Center' },
    { name: 'Counseling Services', slug: 'counseling-services', icon: '🗣️', color: 'bg-rose-100 text-rose-700', borderColor: 'border-rose-200', desc: 'Depression, Anxiety, and Trauma Counseling' },
    { name: 'Promotion & Prevention', slug: 'promotion-prevention', icon: '🛡️', color: 'bg-cyan-100 text-cyan-700', borderColor: 'border-cyan-200', desc: 'Mental Health Education and Campaigns' },
];

export default function DepartmentsSection() {
    return (
        <section className="section bg-[#FFF9F0]">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/10 border border-blue-900/20 text-blue-900 rounded-full text-sm font-semibold mb-4">
                        🏛️ Our Departments
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-blue-950 mb-4">
                        Specialized Departments for Every Need
                    </h2>
                    <p className="text-blue-900/70 text-lg">
                        Each department is staffed by expert specialists dedicated to providing the best mental health care.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.slice(0, 3).map((dept) => (
                        <Link
                            key={dept.slug}
                            href={`/departments/${dept.slug}`}
                            className="group relative bg-blue-950 rounded-2xl p-6 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden shadow-3xl flex flex-col items-center text-center"
                        >
                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${dept.color} text-2xl mb-4 group-hover:scale-110 transition-transform duration-500`}>
                                {dept.icon}
                            </div>
                            <h3 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-400 transition-colors duration-500">{dept.name}</h3>
                            <p className="text-blue-200 text-sm mb-4">{dept.desc}</p>
                            <div className="mt-auto text-cyan-300 text-sm font-semibold flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                                View Department →
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/departments" className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                        View All Departments →
                    </Link>
                </div>
            </div>
        </section>
    );
}
