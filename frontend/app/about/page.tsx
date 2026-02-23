import ChatbotButton from '@/components/chatbot/ChatbotButton';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Us | Amanuel Mental Specialized Hospital',
    description: 'Learn about AMSH – Ethiopia\'s only public specialized mental health hospital, established in 1930. Our history, mission, vision, leadership and organizational structure.',
};

const leadership = [
    { name: 'Dr. [Director General]', title: 'Director General', dept: 'Hospital Administration', icon: '👨‍💼' },
    { name: 'Dr. [Medical Director]', title: 'Medical Director', dept: 'Clinical Services', icon: '🩺' },
    { name: 'Dr. [Research Director]', title: 'Research Director', dept: 'Research & Training', icon: '🔬' },
    { name: '[Nursing Director]', title: 'Nursing Director', dept: 'Nursing Services', icon: '👩‍⚕️' },
    { name: '[Finance Director]', title: 'Finance Director', dept: 'Finance & Administration', icon: '💼' },
    { name: '[IT Director]', title: 'IT Director', dept: 'Information Technology', icon: '💻' },
];

const timeline = [
    { year: '1930 E.C.', title: 'Hospital Established', desc: 'Founded during the Italian period as a mental health facility serving Addis Ababa.' },
    { year: '1950s', title: 'Government Takeover', desc: 'Transitioned to Ethiopian government management under Ministry of Health.' },
    { year: '1970s', title: 'Expansion of Services', desc: 'Expanded inpatient capacity and added new clinical departments.' },
    { year: '1990s', title: 'Training Center', desc: 'Established as a training center for mental health professionals across Ethiopia.' },
    { year: '2000s', title: 'Research Programs', desc: 'Launched formal research programs advancing mental health knowledge in Africa.' },
    { year: '2020s', title: 'Digital Transformation', desc: 'Modernizing services with digital health systems and telemedicine capabilities.' },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main>
                {/* Hero */}
                <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-24 text-white">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-cyan-300 text-sm font-semibold mb-6">
                                🏛️ About AMSH
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                                Ethiopia's Premier<br />
                                <span className="text-cyan-300">Mental Health Hospital</span>
                            </h1>
                            <p className="text-blue-200 text-xl leading-relaxed">
                                Serving Ethiopia since 1930 as the only public specialized mental health hospital,
                                AMSH has touched millions of lives with compassionate, expert psychiatric care.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-8">
                                <Link href="/appointment" className="btn-accent">Book Appointment</Link>
                                <Link href="/contact" className="border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Welcome Introduction */}
                <section className="section bg-white">
                    <div className="container-custom">
                        <div className="max-w-7xl mx-auto text-center">
                            <span className="section-badge text-blue-600">👋 Welcome to AMSH</span>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-10 leading-tight text-center">
                                Welcome to <span className="text-blue-900 italic">Amanuel Mental</span><br />
                                Specialized Hospital
                            </h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-center">
                                <p className="font-bold text-xl text-gray-900 leading-snug">
                                    Amanuel Mental Specialized Hospital stands as Ethiopia’s foremost and oldest specialized institution dedicated exclusively to mental health care. With a proud legacy spanning decades, the hospital has become the cornerstone of psychiatric services in the nation, providing comprehensive, compassionate, and evidence-based care to individuals from all regions of the country.
                                </p>
                                <p>
                                    Since its establishment, the hospital has played a central role in transforming mental health care in Ethiopia. It has grown from a modest facility into a national center of excellence, delivering specialized psychiatric treatment, advancing clinical research, and training generations of mental health professionals who serve across the healthcare system.
                                </p>
                                <p>
                                    Our hospital is dedicated to addressing the full spectrum of mental health conditions, including common and severe psychiatric disorders, substance use disorders, and psychological conditions affecting children, adolescents, adults, and the elderly. We provide integrated services that include prevention, early diagnosis, treatment, rehabilitation, and long-term follow-up care, ensuring continuity and quality in every stage of recovery.
                                </p>
                                <p>
                                    At Amanuel Mental Specialized Hospital, patient care is guided by compassion, professionalism, and respect for human dignity. We understand that mental health challenges affect not only individuals but also families and communities. Therefore, our approach focuses on holistic care that supports emotional, psychological, social, and functional recovery.
                                </p>
                                <p>
                                    Beyond clinical services, the hospital serves as a national training and academic center. It provides practical education and clinical training for psychiatrists, medical doctors, mental health nurses, psychologists, and other health professionals. Through these efforts, the hospital contributes significantly to strengthening Ethiopia’s mental health workforce and healthcare capacity.
                                </p>
                                <p>
                                    The hospital is also actively engaged in research and innovation, working to improve treatment methods, enhance service delivery, and support evidence-based mental health policies. By integrating modern medical technologies, digital health systems, and telepsychiatry services, we are expanding access to mental health care, especially for underserved and remote communities.
                                </p>
                                <p>
                                    Our commitment extends beyond the hospital walls. We work closely with government institutions, partners, and communities to promote mental health awareness, reduce stigma, and improve access to quality mental health services nationwide.
                                </p>
                                <p className="font-black text-blue-900 pt-10 border-t border-gray-100 text-3xl tracking-tighter">
                                    Today, Amanuel Mental Specialized Hospital continues to lead with a clear purpose: to restore hope, improve lives, and build a healthier future through excellence in mental health care, education, and research.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="section bg-gray-50">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Mission */}
                            <div className="card p-10 border-t-8 border-blue-900">
                                <div className="text-5xl mb-6">🎯</div>
                                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Mission</h3>
                                <div className="space-y-6 text-gray-600 leading-relaxed">
                                    <p className="font-bold text-lg text-blue-900">
                                        At Amanuel Mental Specialized Hospital, our mission is to deliver comprehensive, accessible, and patient-centered mental health services through compassionate care, clinical excellence, and evidence-based treatment.
                                    </p>
                                    <p>
                                        We are committed to improving the mental health and well-being of individuals, families, and communities by providing high-quality psychiatric services across prevention, diagnosis, treatment, and rehabilitation. Our approach integrates modern medical science, ethical practice, and respect for every individual’s dignity.
                                    </p>
                                    <p className="text-sm border-t border-gray-100 pt-6">
                                        In addition to clinical care, we strive to advance mental health knowledge through research, professional training, and continuous innovation, contributing to the development of mental health services both nationally and internationally.
                                    </p>
                                </div>
                            </div>

                            {/* Vision */}
                            <div className="card p-10 border-t-8 border-cyan-500">
                                <div className="text-5xl mb-6">🔭</div>
                                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Vision</h3>
                                <div className="space-y-6 text-gray-600 leading-relaxed">
                                    <p className="font-bold text-lg text-cyan-700">
                                        Our vision is to become the leading center of excellence in mental health care, research, and professional education in Africa.
                                    </p>
                                    <p>
                                        We aspire to be globally recognized for our innovation, clinical quality, and leadership in mental health services, setting standards in psychiatric treatment, digital mental health, telepsychiatry, and community-based care.
                                    </p>
                                    <p className="text-sm border-t border-gray-100 pt-6">
                                        We envision a future where mental health care is accessible, stigma-free, and integrated into the overall healthcare system, ensuring every individual has the opportunity to live a healthy, productive, and fulfilling life.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="section bg-gray-50 relative">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <span className="section-badge">💎 Our Core Values</span>
                            <h2 className="section-title">Guided by Excellence & Compassion</h2>
                            <p className="section-subtitle max-w-2xl mx-auto">
                                Our values define who we are and guide every service we provide to our community.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Compassion',
                                    icon: '❤️',
                                    desc: 'We treat every patient with empathy, kindness, and understanding. We recognize the emotional and psychological challenges our patients face and provide care in a supportive and healing environment.'
                                },
                                {
                                    title: 'Excellence',
                                    icon: '🏆',
                                    desc: 'We are committed to the highest standards of clinical care, professional practice, and service delivery. We continuously improve our systems, skills, and services to ensure the best possible outcomes.'
                                },
                                {
                                    title: 'Integrity',
                                    icon: '⚖️',
                                    desc: 'We uphold honesty, transparency, and ethical principles in all our actions. We maintain patient confidentiality, professional accountability, and trust.'
                                },
                                {
                                    title: 'Innovation',
                                    icon: '💡',
                                    desc: 'We embrace modern technologies, research, and new approaches to improve mental health care, including telepsychiatry, digital health systems, and evidence-based treatment models.'
                                },
                                {
                                    title: 'Respect for Human Dignity',
                                    icon: '🤝',
                                    desc: 'We respect the rights, values, and individuality of every person. We promote equality, inclusiveness, and non-discrimination in all our services.'
                                },
                                {
                                    title: 'Commitment to Evidence-Based Practice',
                                    icon: '🔬',
                                    desc: 'We deliver care based on scientific research, clinical expertise, and best international standards to ensure safe, effective, and reliable treatment.'
                                }
                            ].map((value) => (
                                <div key={value.title} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 group">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-black text-blue-900 mb-4 uppercase tracking-tight">{value.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Commitment & Promise */}
                <section className="section bg-white overflow-hidden relative">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="bg-blue-950 p-10 md:p-14 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border border-blue-900/50">
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-900/20 rounded-full -mr-40 -mt-40 blur-3xl"></div>
                                    <div className="relative z-10">
                                        <div className="text-6xl mb-8">❤️</div>
                                        <h2 className="text-3xl md:text-4xl font-black mb-10 uppercase tracking-tighter">Our Commitment</h2>
                                        <ul className="space-y-5">
                                            {[
                                                'Providing safe and quality mental health services',
                                                'Advancing psychiatric research and innovation',
                                                'Training future mental health professionals',
                                                'Supporting community mental health programs',
                                                'Promoting mental health awareness and education'
                                            ].map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-5 text-blue-100/90 group">
                                                    <span className="w-7 h-7 rounded-full bg-cyan-400 flex items-center justify-center text-blue-950 text-xs mt-0.5 shadow-lg shadow-cyan-400/20">
                                                        ✓
                                                    </span>
                                                    <span className="font-bold text-lg leading-tight">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="order-1 lg:order-2">
                                <span className="section-badge text-blue-600">🌍 Our Eternal Promise</span>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-8 leading-tight">
                                    A Promise to<br />
                                    <span className="gradient-text">Our Community</span>
                                </h2>
                                <p className="text-2xl text-gray-500 italic leading-relaxed mb-8 border-l-4 border-blue-100 pl-8">
                                    "We promise to serve with compassion, professionalism, and dedication, ensuring that mental health care is accessible, respectful, and transformative for all."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-0.5 bg-blue-900"></div>
                                    <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-900">The AMSH Pledge</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* History Timeline */}
                <section id="history" className="section bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-14">
                            <span className="section-badge">📖 Our History</span>
                            <h2 className="section-title">A Legacy of Mental Health Care</h2>
                            <p className="section-subtitle">Over 90 years of dedication to mental health in Ethiopia and beyond.</p>
                        </div>
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200 hidden md:block" />

                            <div className="space-y-8">
                                {timeline.map((item, i) => (
                                    <div key={i} className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                        <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                            <div className="card p-6 inline-block text-left md:max-w-sm">
                                                <span className="text-blue-900 font-black text-sm">{item.year}</span>
                                                <h3 className="font-bold text-gray-900 text-lg mt-1 mb-2">{item.title}</h3>
                                                <p className="text-gray-500 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                        {/* Dot */}
                                        <div className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-full bg-blue-900 border-4 border-white shadow-lg items-center justify-center text-white text-sm font-bold z-10">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1 hidden md:block" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leadership */}
                <section id="leadership" className="section bg-white">
                    <div className="container-custom">
                        <div className="text-center mb-14">
                            <span className="section-badge">👥 Leadership</span>
                            <h2 className="section-title">Hospital Leadership Team</h2>
                            <p className="section-subtitle">Experienced professionals guiding AMSH toward excellence in mental health care.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {leadership.map((person) => (
                                <div key={person.name} className="card p-6 text-center">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-4xl mx-auto mb-4">
                                        {person.icon}
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg">{person.name}</h3>
                                    <p className="text-blue-900 font-semibold text-sm mt-1">{person.title}</p>
                                    <p className="text-gray-400 text-xs mt-1">{person.dept}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Org Structure */}
                <section id="structure" className="section bg-blue-950 text-white">
                    <div className="container-custom">
                        <div className="text-center mb-10">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-cyan-300 rounded-full text-sm font-semibold mb-4">
                                🗂️ Organizational Structure
                            </span>
                            <h2 className="text-3xl font-black text-white">How We're Organized</h2>
                        </div>
                        <div className="max-w-2xl mx-auto">
                            {/* Simple org chart */}
                            <div className="bg-white/10 rounded-2xl p-6 text-center mb-4">
                                <div className="font-bold text-cyan-300">Director General</div>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-0.5 h-8 bg-white/30" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {['Medical Director', 'Finance Director', 'Admin Director'].map(role => (
                                    <div key={role} className="bg-white/10 rounded-xl p-4 text-center text-sm font-semibold text-blue-100">{role}</div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-16 mt-1">
                                {[null, null, null].map((_, i) => <div key={i} className="w-0.5 h-6 bg-white/30" />)}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {['Clinical Depts', 'Accounts', 'HR & IT'].map(dept => (
                                    <div key={dept} className="bg-white/5 rounded-xl p-3 text-center text-xs text-blue-200 border border-white/10">{dept}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
