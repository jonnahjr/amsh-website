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
                <section className="relative min-h-screen bg-blue-950 flex items-center overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '48px 48px',
                        }} />
                    </div>

                    {/* Decorative Blue Orbs */}
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                    {/* Content */}
                    <div className="container-custom relative z-10 py-24">
                        <div className="max-w-4xl">
                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                Specialized <br />
                                <span className="text-gray-400 italic font-medium">Mental Health Hospital</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-2xl text-blue-100/80 max-w-3xl mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Serving Ethiopia since 1930 as the only public specialized mental health hospital, AMSH has touched millions of lives with compassionate, expert psychiatric care.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <Link href="/contact" className="px-12 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                    📞 Contact Our Hospital
                                </Link>
                                <Link href="/services" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    Our Services
                                </Link>
                            </div>

                            {/* Accent Tag */}
                            <div className="mt-12 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                                <span className="text-blue-200 text-sm font-black uppercase tracking-widest">90+ Years of Dedicated Mental Health Services</span>
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
                            {/* English Section */}
                            <div className="text-gray-600 text-base leading-relaxed mb-12">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-900">English</span>
                                    <span className="flex-1 h-px bg-blue-100" />
                                </div>
                                <p className="font-bold text-xl text-gray-900 leading-snug pb-5 mb-5 border-b border-gray-100">
                                    Amanuel Mental Specialized Hospital stands as Ethiopia's foremost and oldest specialized institution dedicated exclusively to mental health care. With a proud legacy spanning decades, the hospital has become the cornerstone of psychiatric services in the nation, providing comprehensive, compassionate, and evidence-based care to individuals from all regions of the country.
                                </p>
                                <p className="pb-5 mb-5 border-b border-gray-100">
                                    Since its establishment, the hospital has played a central role in transforming mental health care in Ethiopia. It has grown from a modest facility into a national center of excellence, delivering specialized psychiatric treatment, advancing clinical research, and training generations of mental health professionals who serve across the healthcare system.
                                </p>
                                <p className="pb-5 mb-5 border-b border-gray-100">
                                    Our hospital is dedicated to addressing the full spectrum of mental health conditions, including common and severe psychiatric disorders, substance use disorders, and psychological conditions affecting children, adolescents, adults, and the elderly. We provide integrated services that include prevention, early diagnosis, treatment, rehabilitation, and long-term follow-up care, ensuring continuity and quality in every stage of recovery.
                                </p>
                                <p className="pb-5 mb-5 border-b border-gray-100">
                                    At Amanuel Mental Specialized Hospital, patient care is guided by compassion, professionalism, and respect for human dignity. We understand that mental health challenges affect not only individuals but also families and communities. Therefore, our approach focuses on holistic care that supports emotional, psychological, social, and functional recovery.
                                </p>
                                <p className="pb-5 mb-5 border-b border-gray-100">
                                    Beyond clinical services, the hospital serves as a national training and academic center. It provides practical education and clinical training for psychiatrists, medical doctors, mental health nurses, psychologists, and other health professionals. Through these efforts, the hospital contributes significantly to strengthening Ethiopia's mental health workforce and healthcare capacity.
                                </p>
                                <p className="pb-5 mb-5 border-b border-gray-100">
                                    The hospital is also actively engaged in research and innovation, working to improve treatment methods, enhance service delivery, and support evidence-based mental health policies. By integrating modern medical technologies, digital health systems, and telepsychiatry services, we are expanding access to mental health care, especially for underserved and remote communities.
                                </p>
                                <p>
                                    Our commitment extends beyond the hospital walls. We work closely with government institutions, partners, and communities to promote mental health awareness, reduce stigma, and improve access to quality mental health services nationwide.
                                </p>
                            </div>

                            {/* Amharic Section */}
                            <div className="text-gray-500 text-base leading-relaxed bg-blue-50/40 rounded-2xl p-8 border border-blue-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">አማርኛ</span>
                                    <span className="flex-1 h-px bg-blue-200" />
                                </div>
                                <p className="font-bold text-xl text-blue-900 leading-snug pb-5 mb-5 border-b border-blue-100">
                                    አማኑኤል የአእምሮ ስፔሻላይዝድ ሆስፒታል ለአእምሮ ጤና እንክብካቤ ብቻ ሙሉ ለሙሉ የተሰጠ የኢትዮጵያ ቀዳሚ እና ጥንቱ ስፔሻላይዝድ ተቋም ነው። ለዘመናት በዘለቀ ኩሩ ታሪክ ሆስፒታሉ የሀገሪቱ የሥነ-አዕምሮ አገልግሎቶች ዋነኛ ምሰሶ ሆኗል፤ ከሀገሪቱ ሁሉም ክልሎች ለሚመጡ ሰዎች ሁሉን አቀፍ፣ ሩህሩህ እና በማስረጃ ላይ የተመሠረተ እንክብካቤ ያቀርባል።
                                </p>
                                <p className="pb-5 mb-5 border-b border-blue-100">
                                    ከተመሠረተበት ጊዜ አንስቶ ሆስፒታሉ በኢትዮጵያ የአእምሮ ጤና እንክብካቤን በመቀየር ማዕከላዊ ሚና ተጫውቷል። ከትንሽ ተቋም ወደ ሀገራዊ የምርጥነት ማዕከልነት አድጓል፤ ስፔሻላይዝድ የሥነ-አዕምሮ ሕክምና ሲያቀርብ፣ ክሊኒካዊ ምርምርን ሲያሳድግ እና በጤና ስርዓቱ ውስጥ የሚያገለግሉ ትውልዶችን የአዕምሮ ጤና ሙያተኞች ሲያሠለጥን ቆይቷል።
                                </p>
                                <p className="pb-5 mb-5 border-b border-blue-100">
                                    ሆስፒታላችን የተለመዱ እና ከባድ የሥነ-አዕምሮ ችግሮችን፣ የሱስ ችግሮችን እና ህፃናትን፣ ወጣቶችን፣ አዋቂዎችን እና ሽማግሌዎችን የሚጎዱ ሥነ-ልቦናዊ ሁኔታዎችን ጨምሮ ሙሉ ስፔክትረምን ለመፍታት ተሰጥቷል። መከላከልን፣ ቀደምት ምርመራን፣ ሕክምናን፣ ማገገምን እና የረዥም ጊዜ ክትትልን ጨምሮ የተቀናጁ አገልግሎቶችን እናቀርባለን።
                                </p>
                                <p className="pb-5 mb-5 border-b border-blue-100">
                                    በአማኑኤል የአእምሮ ስፔሻላይዝድ ሆስፒታል፣ የታካሚ እንክብካቤ በርህሩህነት፣ ሙያዊነት እና ለሰው ክብር ባለ አክብሮት ይመራል። የአዕምሮ ጤና ችግሮች ለግለሰቦች ብቻ ሳይሆን ለቤተሰቦችም እና ለማህበረሰቦችም ተፅዕኖ እንደሚያሳድሩ እንረዳለን። ስለሆነም አካሄዳችን ስሜታዊ፣ ሥነ-ልቦናዊ፣ ማህበራዊ እና ተግባራዊ ማገገምን የሚደግፍ ሁሉን አቀፍ እንክብካቤ ላይ ያተኩራል።
                                </p>
                                <p className="pb-5 mb-5 border-b border-blue-100">
                                    ከክሊኒካዊ አገልግሎቶች ባሻገር ሆስፒታሉ ሀገራዊ ሥልጠና እና አካዳሚያዊ ማዕከል ሆኖ ያገለግላል። ለሥነ-አዕምሮ ሐኪሞች፣ ሕክምና ዶክተሮች፣ የአዕምሮ ጤና ነርሶች፣ ሥነ-ልቦናዊ ባለሙያዎች እና ሌሎች የጤና ሙያተኞች ተግባራዊ ትምህርት እና ክሊኒካዊ ሥልጠና ይሰጣል።
                                </p>
                                <p className="pb-5 mb-5 border-b border-blue-100">
                                    ሆስፒታሉ በምርምር እና ፈጠራ ላይ ንቁ ተሳትፎ ያደርጋል፤ የሕክምና ዘዴዎችን ለማሻሻል፣ አገልግሎት አቅርቦትን ለማሳደግ እና በማስረጃ ላይ የተመሠረቱ የአዕምሮ ጤና ፖሊሲዎችን ለመደገፍ ይሰራል። ዘመናዊ የሕክምና ቴክኖሎጂዎችን፣ ዲጂታል የጤና ስርዓቶችን እና የቴሌሳይካትሪ አገልግሎቶችን በማዋሃድ ወደ አእምሮ ጤና እንክብካቤ ተደራሽነትን እያሰፋን ነን።
                                </p>
                                <p>
                                    ቁርጠኝነታችን ከሆስፒታሉ ቅጥር ጊቢ ባሻገር ይዘልቃል። የአዕምሮ ጤና ግንዛቤን ለማሳደግ፣ የማህበራዊ መድልዎን ለመቀነስ እና ሀገር አቀፍ የጥራት የአዕምሮ ጤና አገልግሎቶች ተደራሽነትን ለማሻሻል ከመንግሥት ተቋማት፣ አጋሮች እና ማህበረሰቦች ጋር ጠበቅ ብለን እንሰራለን።
                                </p>
                            </div>

                            {/* Closing statement - full width */}
                            <p className="font-black text-blue-900 pt-10 mt-4 border-t border-gray-100 text-3xl tracking-tighter text-center">
                                Today, Amanuel Mental Specialized Hospital continues to lead with a clear purpose: to restore hope, improve lives, and build a healthier future through excellence in mental health care, education, and research.
                            </p>
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
                                <h3 className="text-2xl font-black text-gray-900 mb-1 uppercase tracking-tight">Our Mission</h3>
                                <p className="text-sm text-blue-400 font-bold mb-6">ተልዕኳችን</p>
                                <div className="space-y-6 text-gray-600 leading-relaxed">
                                    <div>
                                        <p className="font-bold text-lg text-blue-900 mb-2">
                                            At Amanuel Mental Specialized Hospital, our mission is to deliver comprehensive, accessible, and patient-centered mental health services through compassionate care, clinical excellence, and evidence-based treatment.
                                        </p>
                                        <p className="text-sm text-gray-400 italic">
                                            በአማኑኤል የአእምሮ ስፔሻላይዝድ ሆስፒታል፣ ተልዕኳችን ሁሉን አቀፍ፣ ተደራሽ እና በሽተኛ-ተኮር የአእምሮ ጤና አገልግሎቶችን በሩህሩህ እንክብካቤ፣ በክሊኒካዊ ብቃት እና በማስረጃ ላይ በተመሠረተ ሕክምና ማቅረብ ነው።
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-2">
                                            We are committed to improving the mental health and well-being of individuals, families, and communities by providing high-quality psychiatric services across prevention, diagnosis, treatment, and rehabilitation.
                                        </p>
                                        <p className="text-sm text-gray-400 italic">
                                            ሁሉን አቀፍ የሥነ አዕምሮ አገልግሎቶችን በመከላከል፣ ምርመራ፣ ሕክምና እና ማገገሚያ ዘርፎች ለግለሰቦች፣ ቤተሰቦች እና ማህበረሰቦች ሥነ-አዕምሮ ጤና እና ደህንነት ለማሻሻል ቁርጠኞች ነን።
                                        </p>
                                    </div>
                                    <div className="border-t border-gray-100 pt-6">
                                        <p className="text-sm mb-2">
                                            In addition to clinical care, we strive to advance mental health knowledge through research, professional training, and continuous innovation, contributing to the development of mental health services both nationally and internationally.
                                        </p>
                                        <p className="text-sm text-gray-400 italic">
                                            ከክሊኒካዊ እንክብካቤ ባሻገር፣ በምርምር፣ ሙያዊ ሥልጠና እና ቀጣይ ፈጠራ የአእምሮ ጤና እውቀትን ለማሳደግ ጥረት እናደርጋለን።
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Vision */}
                            <div className="card p-10 border-t-8 border-cyan-500">
                                <div className="text-5xl mb-6">🔭</div>
                                <h3 className="text-2xl font-black text-gray-900 mb-1 uppercase tracking-tight">Our Vision</h3>
                                <p className="text-sm text-cyan-500 font-bold mb-6">ራዕያችን</p>
                                <div className="space-y-6 text-gray-600 leading-relaxed">
                                    <div>
                                        <p className="font-bold text-lg text-cyan-700 mb-2">
                                            Our vision is to become the leading center of excellence in mental health care, research, and professional education in Africa.
                                        </p>
                                        <p className="text-sm text-gray-400 italic">
                                            ራዕያችን በአፍሪካ ውስጥ ግንባር ቀደም የአእምሮ ጤና እንክብካቤ፣ ምርምር እና ሙያዊ ትምህርት ማዕከል ለመሆን ነው።
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-2">
                                            We aspire to be globally recognized for our innovation, clinical quality, and leadership in mental health services, setting standards in psychiatric treatment, digital mental health, telepsychiatry, and community-based care.
                                        </p>
                                        <p className="text-sm text-gray-400 italic">
                                            ዓለም አቀፍ ዕውቅና ያለን በፈጠራ፣ ክሊኒካዊ ጥራት እና በአእምሮ ጤና አገልግሎቶች አመራር ለመሆን ምኞት አለን።
                                        </p>
                                    </div>
                                    <div className="border-t border-gray-100 pt-6">
                                        <p className="text-sm mb-2">
                                            We envision a future where mental health care is accessible, stigma-free, and integrated into the overall healthcare system, ensuring every individual has the opportunity to live a healthy, productive, and fulfilling life.
                                        </p>
                                        <p className="text-sm text-gray-400 italic">
                                            የአእምሮ ጤና እንክብካቤ ተደራሽ፣ መድልዎ-ያለሽ እና ሁሉን አቀፍ ሆኖ ለእያንዳንዱ ሰው ጤናማ፣ ምርታማ እና ፍሬያማ ህይወት የሚኖርበትን ወደፊት እናወጣለን።
                                        </p>
                                    </div>
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
                            ```
                        </div>
                    </div>
                </section>

                {/* Org Structure */}
                <section id="structure" className="section bg-gray-50 relative overflow-hidden">
                    <div className="container-custom relative z-10">
                        <div className="text-center mb-16">
                            <span className="section-badge text-blue-900 border-yellow-400 bg-yellow-50">
                                🗂️ Organizational Structure
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-4 tracking-tighter">
                                Hospital <span className="text-blue-600 italic">Hierarchy</span>
                            </h2>
                        </div>

                        <div className="max-w-[1440px] mx-auto pb-20 px-4">
                            {/* LEVEL 1: TOP EXECUTIVE (Blue) */}
                            <div className="flex justify-center mb-12 relative">
                                {/* DG Node */}
                                <div className="relative z-30 group">
                                    <div className="bg-blue-950 text-white p-10 rounded-2xl border-4 border-yellow-400 text-center shadow-[0_0_30px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-all duration-500 relative">
                                        <div className="text-3xl mb-2">🏛️</div>
                                        <div className="text-4xl font-black mb-1">ዋና ዳይሬክተር</div>
                                        <div className="text-blue-100 text-lg font-bold tracking-[0.2em] uppercase opacity-80">Director General</div>

                                        {/* Line down to first split */}
                                        <div className="absolute top-full left-1/2 w-1 h-12 -translate-x-1/2 animate-line-flow-v z-10 flex flex-col items-center">
                                            <div className="w-full h-full" />
                                            {/* Arrowhead */}
                                            <svg viewBox="0 0 20 10" className="w-4 h-2 fill-yellow-400 -mt-1"><polygon points="0,0 20,0 10,10" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CORE BRANCHES LAYER 2 (Elite Tier - 5 columns) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative pt-8">
                                {/* Horizontal Yellow Line for desktop - CONNECTS ALL 5 BRANCHES */}
                                <div className="hidden lg:block absolute top-0 left-[10%] right-[10%] h-1 animate-line-flow-h line-glow" />

                                {/* Connection Dots at Junctions (10%, 30%, 50%, 70%, 90%) */}
                                <div className="hidden lg:block absolute top-0 left-[10%] w-2 h-2 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-[2px] z-30 shadow-[0_0_8px_white]" />
                                <div className="hidden lg:block absolute top-0 left-[30%] w-2 h-2 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-[2px] z-30 shadow-[0_0_8px_white]" />
                                <div className="hidden lg:block absolute top-0 left-[50%] w-2 h-2 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-[2px] z-30 shadow-[0_0_8px_white]" />
                                <div className="hidden lg:block absolute top-0 left-[70%] w-2 h-2 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-[2px] z-30 shadow-[0_0_8px_white]" />
                                <div className="hidden lg:block absolute top-0 left-[90%] w-2 h-2 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-[2px] z-30 shadow-[0_0_8px_white]" />

                                {/* 1. DG OFFICE */}
                                <div className="space-y-6 relative">
                                    <div className="hidden lg:block absolute -top-8 left-1/2 w-1 h-8 -translate-x-1/2 animate-line-flow-v" />
                                    <div className="bg-blue-950 p-4 rounded-lg shadow-md border-2 border-blue-600 text-center mb-4 relative z-20 group">
                                        <div className="text-white font-black text-lg leading-tight">ዋና ዳይሬክተር ጽ/ቤት ኃላፊ</div>
                                        <div className="text-blue-100 text-[13px] uppercase font-bold tracking-tighter mt-1">Office Head</div>
                                        <div className="absolute top-full left-1/2 w-1 h-4 -translate-x-1/2 animate-line-flow-v flex flex-col items-center">
                                            <div className="w-full h-full" />
                                            <svg viewBox="0 0 20 10" className="w-3 h-1.5 fill-yellow-400 -mt-0.5"><polygon points="0,0 20,0 10,10" /></svg>
                                        </div>
                                    </div>
                                    <div className="space-y-3 relative flex flex-col items-center">
                                        {[
                                            { en: 'Legal', am: 'የሕግ ጉዳዮች' },
                                            { en: 'Ethics', am: 'ሥነ-ምግባር' },
                                            { en: 'Social', am: 'ማህበራዊ' },
                                            { en: 'PR', am: 'ኮሙኒኬሽን' },
                                            { en: 'Audit', am: 'ኦዲት' }
                                        ].map(item => (
                                            <div key={item.en} className="relative w-full">
                                                <div className="bg-[#266BB3] py-3 px-1 rounded shadow-sm border border-[#1F568C] text-center flex flex-col items-center justify-center min-h-[64px] group hover:bg-[#327EC2] transition-all hover:-translate-y-0.5 text-base font-black leading-tight break-words text-white">
                                                    <div>{item.am}</div>
                                                    <div className="text-blue-100/70 text-[13px] uppercase tracking-tighter mt-0.5">{item.en}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. MEDICAL & EDUCATION */}
                                <div className="space-y-6 relative">
                                    <div className="hidden lg:block absolute -top-8 left-1/2 w-1 h-8 -translate-x-1/2 animate-line-flow-v" />
                                    <div className="bg-blue-950 p-4 rounded-lg shadow-md border-2 border-blue-600 text-center mb-4 relative z-20">
                                        <div className="text-white font-black text-lg leading-tight">የሕክምና አገልግሎት፣ ትምህርት ጥራት ምክትል</div>
                                        <div className="text-blue-100 text-[13px] uppercase font-bold tracking-tighter mt-1">Med/Edu Deputy</div>
                                        <div className="absolute top-full left-1/2 w-1 h-4 -translate-x-1/2 animate-line-flow-v flex flex-col items-center">
                                            <div className="w-full h-full" />
                                            <svg viewBox="0 0 20 10" className="w-3 h-1.5 fill-yellow-400 -mt-0.5"><polygon points="0,0 20,0 10,10" /></svg>
                                        </div>
                                    </div>
                                    <div className="space-y-3 relative flex flex-col items-center">
                                        {[
                                            { en: 'Health Info', am: 'የጤና መረጃ' },
                                            { en: 'Med Quality', am: 'የሕክምና ጥራት' },
                                            { en: 'Edu Quality', am: 'ትምህርት ጥራት' }
                                        ].map(item => (
                                            <div key={item.en} className="relative w-full z-10 hover:scale-[1.02] transition-transform">
                                                <div className="bg-[#266BB3] w-full py-3 px-1 rounded shadow-sm border border-[#1F568C] text-center flex flex-col items-center justify-center min-h-[64px] text-base font-black leading-tight break-words text-white">
                                                    <div>{item.am}</div>
                                                    <div className="text-blue-100/70 text-[13px] uppercase tracking-tighter mt-0.5">{item.en}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. ADMIN & DEV */}
                                <div className="space-y-6 relative">
                                    <div className="hidden lg:block absolute -top-8 left-1/2 w-1 h-8 -translate-x-1/2 animate-line-flow-v" />
                                    <div className="bg-blue-950 p-4 rounded-lg shadow-md border-2 border-blue-600 text-center mb-4 relative z-20">
                                        <div className="text-white font-black text-lg leading-tight">የአስተዳደር ልማት ዋና ሥራ አስፈፃሚ</div>
                                        <div className="text-blue-100 text-[13px] uppercase font-bold tracking-tighter mt-1">Admin & Development</div>
                                        <div className="absolute top-full left-1/2 w-1 h-4 -translate-x-1/2 animate-line-flow-v flex flex-col items-center">
                                            <div className="w-full h-full" />
                                            <svg viewBox="0 0 20 10" className="w-3 h-1.5 fill-yellow-400 -mt-0.5"><polygon points="0,0 20,0 10,10" /></svg>
                                        </div>
                                    </div>
                                    <div className="space-y-3 relative flex flex-col items-center">
                                        {[
                                            { en: 'Strategy', am: 'ስትራቴጂክ' },
                                            { en: 'HR', am: 'የሰው ሀብት' },
                                            { en: 'ICT', am: 'አይሲቲ' },
                                            { en: 'Finance', am: 'ፋይናንስ' },
                                            { en: 'Procurement', am: 'ግዥ' }
                                        ].map(item => (
                                            <div key={item.en} className="relative flex items-center w-full">
                                                <div className="bg-[#266BB3] w-full py-3 px-1 rounded shadow-sm border border-[#1F568C] text-center flex flex-col items-center justify-center min-h-[64px] text-base font-black leading-tight break-words text-white">
                                                    <div>{item.am}</div>
                                                    <div className="text-blue-100/70 text-[13px] uppercase tracking-tighter mt-0.5">{item.en}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 4. RESEARCH & TRAINING */}
                                <div className="space-y-6 relative">
                                    <div className="hidden lg:block absolute -top-8 left-1/2 w-1 h-8 -translate-x-1/2 animate-line-flow-v" />
                                    <div className="bg-blue-950 p-4 rounded-lg border-2 border-blue-600 text-center shadow-md mb-4 relative z-20 group">
                                        <div className="text-white font-black text-lg leading-tight">የምርምር፣ ትምህርትና ሥልጠና ምክትል</div>
                                        <div className="text-blue-100 text-[13px] uppercase font-bold tracking-tighter mt-1">Research & Training</div>
                                        <div className="absolute top-full left-1/2 w-1 h-4 -translate-x-1/2 animate-line-flow-v flex flex-col items-center">
                                            <div className="w-full h-full" />
                                            <svg viewBox="0 0 20 10" className="w-3 h-1.5 fill-yellow-400 -mt-0.5"><polygon points="0,0 20,0 10,10" /></svg>
                                        </div>
                                    </div>
                                    <div className="space-y-3 relative flex flex-col items-center">
                                        {[
                                            { en: 'Research', am: 'የምርምር' },
                                            { en: 'Education', am: 'ትምህርት' },
                                            { en: 'Training', am: 'ሥልጠና' }
                                        ].map(item => (
                                            <div key={item.en} className="relative w-full">
                                                <div className="bg-[#266BB3] py-3 px-1 rounded-lg border border-[#1F568C] shadow-sm text-center flex flex-col items-center justify-center min-h-[64px] text-base font-black leading-tight break-words text-white">
                                                    <div>{item.am}</div>
                                                    <div className="text-blue-100/60 text-[13px] uppercase tracking-tighter mt-0.5">{item.en}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 5. MEDICAL SERVICES - MOVED UP TO LAYER 2 */}
                                <div className="space-y-6 relative">
                                    {/* Vertical Connect to Horizontal */}
                                    <div className="hidden lg:block absolute -top-8 left-1/2 w-1 h-8 -translate-x-1/2 animate-line-flow-v" />

                                    <div className="bg-blue-950 p-4 rounded-lg border-2 border-blue-600 text-center shadow-md mb-4 relative z-20 group hover:scale-[1.02] transition-transform">
                                        <div className="text-white font-black text-lg leading-tight">የሕክምና አገልግሎት ምክትል ዋና ዳይሬክተር</div>
                                        <div className="text-blue-100 text-[13px] uppercase font-bold tracking-tighter mt-1 opacity-70">Medical Services Deputy</div>
                                        {/* Connector down to sub-units */}
                                        <div className="absolute top-full left-1/2 w-1 h-4 -translate-x-1/2 animate-line-flow-v flex flex-col items-center">
                                            <div className="w-full h-full" />
                                            <svg viewBox="0 0 20 10" className="w-3 h-1.5 fill-yellow-400 -mt-0.5"><polygon points="0,0 20,0 10,10" /></svg>
                                        </div>
                                    </div>

                                    <div className="space-y-3 relative flex flex-col items-center">
                                        {[
                                            { en: 'Laboratory', am: 'ላቦራቶሪ' },
                                            { en: 'Nursing', am: 'ነርሲንግ' },
                                            { en: 'Pharmacy', am: 'ፋርማሲ' },
                                            { en: 'Bio-Med', am: 'ባዮ-ሜዲካል' },
                                            { en: 'Psychiatric', am: 'የስነ-አእምሮ' },
                                            { en: 'Records', am: 'የታካሚ መረጃ' },
                                            { en: 'Community', am: 'የማህበረሰብ' },
                                            { en: 'Emergency', am: 'ድንገተኛ' },
                                            { en: 'Inpatient', am: 'የተኛ ታካሚ' },
                                            { en: 'Referrals', am: 'ሪፈራል' }
                                        ].map(item => (
                                            <div key={item.en} className="relative w-full">
                                                <div className="bg-[#266BB3] py-3 px-1 rounded shadow-sm border border-[#1F568C] text-center flex flex-col items-center justify-center min-h-[64px] hover:bg-[#327EC2] transition-all z-10 text-base font-black leading-tight break-words text-white">
                                                    <div>{item.am}</div>
                                                    <div className="text-blue-100/60 text-[13px] uppercase tracking-tighter mt-0.5">{item.en}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
