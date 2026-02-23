import Link from 'next/link';

const departments = [
    { name: 'Adult Psychiatry', slug: 'adult-psychiatry', icon: '🧠', color: 'bg-blue-100 text-blue-700', borderColor: 'border-blue-200', desc: 'Comprehensive psychiatric care for adults' },
    { name: 'Child & Adolescent Psychiatry', slug: 'child-psychiatry', icon: '👶', color: 'bg-purple-100 text-purple-700', borderColor: 'border-purple-200', desc: 'Specialized care for young patients' },
    { name: 'Addiction Treatment Unit', slug: 'addiction-treatment', icon: '💊', color: 'bg-teal-100 text-teal-700', borderColor: 'border-teal-200', desc: 'Recovery and rehabilitation programs' },
    { name: 'Emergency Psychiatry', slug: 'emergency', icon: '🚨', color: 'bg-red-100 text-red-700', borderColor: 'border-red-200', desc: '24/7 crisis intervention services' },
    { name: 'Clinical Psychology', slug: 'psychology', icon: '🔬', color: 'bg-green-100 text-green-700', borderColor: 'border-green-200', desc: 'Assessment, therapy and counseling' },
    { name: 'Neurology / EEG', slug: 'neurology', icon: '⚡', color: 'bg-yellow-100 text-yellow-700', borderColor: 'border-yellow-200', desc: 'Neurological diagnostics and EEG' },
];

export default function DepartmentsSection() {
    return (
        <section className="section" style={{ background: 'linear-gradient(135deg, #0d3564 0%, #1B4F8A 50%, #00B4D8 100%)' }}>
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-cyan-300 rounded-full text-sm font-semibold mb-4">
                        🏛️ Our Departments
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                        Specialized Departments for Every Need
                    </h2>
                    <p className="text-blue-200 text-lg">
                        Each department is staffed by expert specialists dedicated to providing the best mental health care.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.map((dept) => (
                        <Link
                            key={dept.slug}
                            href={`/departments/${dept.slug}`}
                            className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${dept.color} text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                                {dept.icon}
                            </div>
                            <h3 className="font-bold text-white text-lg mb-2">{dept.name}</h3>
                            <p className="text-blue-200 text-sm">{dept.desc}</p>
                            <div className="mt-4 text-cyan-300 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
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
