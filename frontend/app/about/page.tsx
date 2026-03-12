import ChatbotButton from '@/components/chatbot/ChatbotButton';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
    AcademicCapIcon,
    BeakerIcon,
    UserGroupIcon,
    ShieldCheckIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'About Us | Emmanuel Mental Specialized Hospital',
    description: 'Learn about EMSH – Ethiopia\'s only public specialized mental health hospital, established in 1930 E.C. Our history, mission, vision, leadership and organizational structure.',
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
    { year: '1930 E.C. (1938)', title: 'Hospital Established', desc: 'Founded during the Italian invasion as a psychiatric facility for Ethiopian citizens.' },
    { year: '1940s E.C. (1950s)', title: 'Ministry Governance', desc: 'Officially transitioned to the Ministry of Health management by government decree.' },
    { year: '1985 (G.C.)', title: 'Global Recognition', desc: 'WHO Director Prof. Mahler visit catalyzed the development of local mental health capacity.' },
    { year: '1987 (G.C.)', title: 'Local Leadership', desc: 'Ethiopian specialists began leading the institution, launching broader training programs.' },
    { year: '2022 (G.C.)', title: 'Modern Expansion', desc: 'Design of new standardized psychiatric building completed to expand inpatient capacity.' },
    { year: '2023 (G.C.)', title: 'Digital Transformation', desc: 'Successful transition to paperless electronic medical records (EMR) for all departments.' },
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
                                Serving Ethiopia since 1930 E.C. as the only public specialized mental health hospital, EMSH has touched millions of lives with compassionate, expert psychiatric care.
                            </p>

                            {/* CTA buttons removed as requested */}
                            {/* Accent Tag */}
                            <div className="mt-12 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                                <span className="text-blue-200 text-sm font-black uppercase tracking-widest">80+ Years of Dedicated Mental Health Services</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Welcome Introduction (History & Legacy) */}
                <section className="section bg-white">
                    <div className="container-custom">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <span className="section-badge text-blue-600">📖 Our Legacy & History</span>
                                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4 mb-4 leading-tight">
                                    History of <span className="text-blue-900 italic">Emmanuel Mental</span><br />
                                    Specialized Hospital
                                </h2>
                                <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">አማኑኤል የአዕምሮ ስፔሻላይዝድ ሆስፒታል አመሰራረት እና የአእምሮ ሕክምና በኢትዮጵያ</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                {/* Amharic Section - Comprehensive History */}
                                <div className="text-gray-600 text-base leading-relaxed bg-slate-50 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm overflow-y-auto max-h-[1000px] no-scrollbar">

                                    <div className="space-y-8 Amharic-text-flow">
                                        <div className="border-l-4 border-blue-900 pl-6 pb-2">
                                            <p className="font-bold text-2xl text-blue-950 mb-4 leading-normal">
                                                ቅዱስ አማኑኤል የአዕምሮ ስፔሻላይዝድ ሆስፒታል በ1930 ዓ.ም በጣሊያን ወረራ ጊዜ የተመሰረተ ሲሆን በሃገራችን ካሉ ጥቂት አንጋፋ የህክምና ተቋማት መካከል ግንባር ቀደም እና በሚሰጠው አገልግሎት ብቸኛ በመሆን የሚታወቅ ተቋም ነው፡፡
                                            </p>
                                        </div>

                                        <p>
                                            የፋሺስት ጦር በ1928 ዓ.ም አዲስ አበባን ከተቆጣጠረ በኃላ ከተማዋን ለአገዛዝ በሚመቸው መልኩ በከፋፈለበት ወቅት አማኑኤል ሆስፒታል ዳግማዊ ምኒልክ፤ ፓስተር፤ የካቲት 12 እና ዘውዲቱ ሆስፒታሎች መካከል አንዱ ሆኖ ተካተተ፡፡ ሆስፒታሉ ከሌሎቹ በተለየ መልኩ በወቅቱ በነበረው የመደብ ልዩነት ምክንያት ለጥቁር ኢትዮጵያውያን አገልግሎት እንዲሰጥ ተደረገ፡፡
                                        </p>

                                        <p>
                                            በ1933 ዓ/ም የጣሊያን ጦር ተሸንፎ ሲወጣ በተለይም የየካቲት 12 ቀን የግራዚያኒን የግድያ ሙከራ ተከትሎ በዜጎቻችን ላይ የደረሰው ጭፍጨፋ በብዙዎች ላይ ስር የሰደደ የአዕምሮ ጉዳት አድርሶ ስለነበር ሆስፒታሉን የአዕምሮ ችግር ተጠቂዎች ማገገሚያ ቦታ እንዲሆን ተወሰነ፡፡
                                        </p>

                                        <p>
                                            ከተቋቋመ 85 ዓመታትን ያስቆጠረው ይህ ተቋም ‹‹ተክለ ሃይማኖትና አካባቢው ሆስፒታል›› ተብሎ ይጠራ የነበረ ሲሆን በኃላም ከአማኑኤል ቤተ-ክርስቲያን በመነሳት የአሁኑን ስያሜ አገኘ፡፡ እስከ 1960ዎቹ ድረስ ከህንድ፤ ከአርጀንቲና፤ ከእንግሊዝና ከዩጎዝላቪያ የመጡ ባለሙያዎች በሆስፒታሉ ትልቅ አሻራቸውን አኑረዋል፡፡ በዚህም የአብዮቱን መምጣት ተከትሎ የኩባ፤ የራሺያ፤ የቡልጋሪያ፤ ሃንጋሪና ሌሎችም ዶክተሮች በስፋት ይመጡ ስለነበር ተቋሙ የአዕምሮ ህክምና ባለሞያዎችን በስፋት ማግኘት ጀመረ፡፡
                                        </p>

                                        <p>
                                            በ1970ዎቹ መጀመሪያ የቀድሞ የዩጎዝላቪያ ተወላጅ የሆኑት ዶ/ር ማሪንኮ ፓቪቼቪች (Dr. Marinko Pavicevic) ለረዥም ጊዜ ሆስፒታሉን በዳይሬክተርነትና ሃኪም በመሆን አገልግለዋል፡፡ በኚህ የህክምና ዘመን የኤሌክትሪክ ንዝረት ህክምና ECT (Electro-Convulsive Therapy) እና የአንጎል ኤሌክትሪክ እንቅስቃሴ መዝጋቢ መሣሪያ EEG (Electro-Encephalo Graph) በሥራ ላይ ዋሉ፡፡
                                        </p>

                                        <p>
                                            ከዶ/ር ፓቪቼቪች ህልፈት ተከትሎ ዶ/ር ካራጆቫ (Dr. Karajova)፣ ዶ/ር ሉኪች (Dr. Lukich)፣ ዶ/ር አሴኖቭ (Dr. Acinov) እና ዶ/ር ኢቫኖቫ (Dr. Evanova) ከቡልጋሪያ፤ ዶ/ር ኦብሮሶቭ (Dr. Obrosove) እና ዶ/ር ኢና (Dr. Ena) ከሶቪየት ህብረት፤ እንዲሁም ዶ/ር ሱክ (Dr. Suk)፣ ዶ/ር ኩ (Dr. Ku)፣ ዶ/ር ሊ (Dr. Lee) ከደቡብ ኮርያ ሆስፒታሉን አገልግለዋል፡፡
                                        </p>

                                        <p>
                                            በ1985 የዓለም የጤና ድርጅት ዋና ዳይሬክተር ፕሮፌሰር መሃለር (Prof. Mehaler) እና ምክትላቸው ፕሮፌሰር አደዌ ኤላምቦ ተቋሙን በጎበኙ ጊዜ በሙያ የሰለጠነ የሰው ኃይል አለመኖሩን በመገንዘባቸው ድጋፍ እንዲደረግ ወሰኑ፡፡ በዚህም ተቋሙ ቀስ በቀስ በኢትዮጵያውያን ባለሙያዎች መተካት ጀመረ፡፡
                                        </p>

                                        <p>
                                            በሃገራችን የመጀመሪያው የሳይካትሪስት በሆኑት በዶ/ር ፍቅረ ወርቅነህ የሚመራ የአዕምሮ ጤና ክብካቤ የድርጊት ግብረ-ሃይል (Mental Health Action Group) ተቋቋመ፡፡ ይህም በሃገሪቱ የመጀመሪያውን ዘመናዊ የአእምሮ ህክምና ትምህርት ለማስጀመር መንገድ ከፋች ሆኗል፡፡ ለዚህም መሳካት ፕሮፌሰር ሮበርት ጊል (Prof. Robert Giel) ትልቅ ስራ ሰርተዋል፡፡
                                        </p>

                                        <div className="bg-blue-900 text-white p-8 rounded-4xl shadow-2xl shadow-blue-950/30">
                                            <h4 className="font-black text-lg mb-4 uppercase tracking-[0.2em] border-b border-white/20 pb-2">የለውጥ ጉዞና ዲጂታል ትራንስፎርሜሽን</h4>
                                            <p className="text-sm leading-relaxed mb-4">
                                                በአሁኑ ጊዜ በመንግስት ከፍተኛ ትኩረት ተሰጥቶት ተጨማሪ የህንፃ ግንባታ ዲዛይን ስራ ተጠናቆ በግንባታ ሂደት ላይ ይገኛል፡፡ ሆስፒታሉ ከግንቦት 2015 ዓ.ም ጀምሮ ወደ ወረቀት አልባ የኤሌክትሮኒክ የህክምና ምዝገባ፤ መረጃ አያያዝና አገልግሎት አሰጣጥ ስርዓት ተሸጋግሯል፡፡
                                            </p>
                                            <p className="font-bold text-accent italic">"ማህበረሰብን ማስቀደም ዋነኛ እሴታችን ነው፡፡"</p>
                                        </div>
                                    </div>
                                </div>

                                {/* English Section - Detail Summary */}
                                <div className="text-gray-600 text-base leading-relaxed bg-white p-8 md:p-12 rounded-[3.5rem] border border-blue-100 shadow-2xl shadow-blue-900/5 overflow-y-auto max-h-[1000px] no-scrollbar">

                                    <div className="space-y-6">
                                        <div className="border-l-4 border-blue-900 pl-6 pb-2">
                                            <p className="font-bold text-2xl text-gray-900 mb-4 leading-normal">
                                                Established in 1930 E.C. (1938 G.C.) during the Italian occupation, Emmanuel Mental Specialized Hospital (EMSH) is Ethiopia's pioneer public institution for psychiatric care.
                                            </p>
                                        </div>
                                        <p>
                                            Originally designated for general health services, its mission shifted post-1941 to rehabilitate citizens suffering from severe psychological trauma following the Graziani massacre and the five-year occupation.
                                        </p>
                                        <p>
                                            The 1970s marked a clinical revolution under Dr. Marinko Pavicevic, who introduced Electro-Convulsive Therapy (ECT) and EEG diagnostics. This era was followed by significant contributions from international specialists spanning Eastern Europe, the Soviet Union, and South Korea (Drs. Suk, Ku, and Lee).
                                        </p>
                                        <p>
                                            A critical turning point occurred in 1985 with a high-level WHO mission led by Prof. Mehaler, which catalyzed the development of local expertise. This period marked the rise of Ethiopian leadership under pioneers like Dr. Fikre Workeneh, Ethiopia's first psychiatrist, and the establishment of the Mental Health Action Group.
                                        </p>
                                        <p>
                                            Today, EMSH is a leader in digital healthcare. Since May 2023, the hospital has operated as a fully paperless facility, utilizing advanced Electronic Medical Records (EMR) to ensure efficient, secure, and equitable patient care.
                                        </p>
                                        <div className="mt-8 border-t border-gray-100 pt-8">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-950 font-black">85+</div>
                                                <span className="text-sm font-black text-blue-900 uppercase">Years of Clinical Legacy</span>
                                            </div>
                                            <p className="text-sm text-gray-400">Continuing a tradition of excellence with community outreach programs integrated with 17 health centers nationwide.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="section bg-gray-50">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Mission */}
                            <div className="card p-12 border-t-8 border-blue-900 bg-white shadow-2xl">
                                <div className="text-6xl mb-8">🎯</div>
                                <h3 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">Mission</h3>
                                <p className="text-sm text-blue-400 font-bold mb-8 uppercase tracking-widest">ተልዕኮ</p>
                                <div className="space-y-8">
                                    <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                                        <p className="font-bold text-xl text-blue-950 mb-4 leading-tight">
                                            Mitigating damages and death due to mental illness through providing standardized and quality disease prevention, treatment, and mental rehabilitation health services and enhancing capacity building supports via researches and trainings.
                                        </p>
                                        <div className="w-10 h-0.5 bg-blue-200 mb-4"></div>
                                        <p className="text-base text-gray-600 italic font-medium">
                                            ጥራቱን የጠበቀ የበሽታ መከላከል፤ ማከም እና የተሀድሶ ጤና አገልግሎትን በመስጠት በጥናትና በምርምር የታገዘ የአቅም ግንባታ ስራ በመስራት ከአዕምሮ ህመም የተነሳ የሚመጣ ጉዳት እና ሞትን መቀነስ፡፡
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Vision */}
                            <div className="card p-12 border-t-8 border-cyan-500 bg-white shadow-2xl">
                                <div className="text-6xl mb-8">🔭</div>
                                <h3 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">Vision</h3>
                                <p className="text-sm text-cyan-500 font-bold mb-8 uppercase tracking-widest">ራዕይ</p>
                                <div className="space-y-8">
                                    <div className="p-6 bg-cyan-50/50 rounded-2xl border border-cyan-100">
                                        <p className="font-bold text-xl text-cyan-900 mb-4 leading-tight">
                                            To be a center of excellence through bringing specialty services on mental health, and multifaceted health services relying on researches and trainings thematically on mental health in Africa by 2030.
                                        </p>
                                        <div className="w-10 h-0.5 bg-cyan-200 mb-4"></div>
                                        <p className="text-base text-gray-600 italic font-medium">
                                            በ2022 ዓ.ም በአፍሪካ ሁሉን አቀፍ የጤና አገልግሎት የሚሰጥ፤ በአዕምሮ ጤና ህክምና እንዲሁም በአእምሮ ጤና ምርምርና ስልጠና የልህቀት ማዕከል ሆኖ ማየት፡፡
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="section bg-white relative">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <span className="section-badge">💎 Core Values & Beliefs</span>
                            <h2 className="section-title">እሴቶች እና እምነቶች</h2>
                            <p className="section-subtitle max-w-2xl mx-auto">
                                Our institutional values guide every interaction and clinical decision we make.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Community First',
                                    am: 'ማህበረሰብን ማስቀደም',
                                    desc: 'Giving priority for three things: community, community, and community. Assuring clients’ satisfaction through standardized health services.',
                                    icon: 'logo'
                                },
                                {
                                    title: 'Collaboration',
                                    am: 'ትብብር',
                                    desc: 'Working jointly with partners and stakeholders and pursuing our common goals with a spirit of mutual support.',
                                    icon: '🤝'
                                },
                                {
                                    title: 'Commitments',
                                    am: 'ቁርጠኝነት',
                                    desc: 'We strive for pursuing our goals with patience and full ardor despite the challenges and troubles we may face.',
                                    icon: '💪'
                                },
                                {
                                    title: 'Stand for Change',
                                    am: 'ለውጥ',
                                    desc: 'We are ready for adopting change and creating or innovating new working methods to improve serve delivery.',
                                    icon: '💡'
                                },
                                {
                                    title: 'Trust',
                                    am: 'እምነት',
                                    desc: 'Assuring the existence of high level of honesty and mutual trust within our institution.',
                                    icon: '⚖️'
                                },
                                {
                                    title: 'Professional Efficiency',
                                    am: 'የሙያ ብቃት',
                                    desc: 'Assuring wellness of professional ethics and competency on job through continuous professional development.',
                                    icon: '🏆'
                                }
                            ].map((value) => (
                                <div key={value.title} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 group">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-gray-100 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300 relative overflow-hidden mb-8">
                                        {value.icon === 'logo' ? (
                                            <video
                                                src="/images/PixVerse_V5.6_Image_Text_360P_Create_a_premium.mp4"
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            value.icon
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-black text-blue-900 mb-1 uppercase tracking-tight">{value.title}</h3>
                                    <p className="text-cyan-500 font-bold mb-4 text-sm">{value.am}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Grid (Comprehensive List) */}
                <section id="services-list" className="section bg-blue-950 text-white overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '64px 64px' }} />
                    </div>
                    
                    <div className="container-custom relative z-10">
                        <div className="text-center mb-20">
                            <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em] mb-4 block">Our Operations</span>
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Broad Range of <span className="text-blue-400 italic">Specialty Services</span></h2>
                            <p className="text-blue-100/60 max-w-3xl mx-auto font-medium text-lg">
                                Providing comprehensive psychiatric, neurological, and emergency care to our community since 1938.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="space-y-6">
                                <h4 className="text-cyan-400 font-black uppercase tracking-[0.2em] text-xs pb-4 border-b border-white/10">Clinical Services</h4>
                                <ul className="space-y-4 text-sm font-bold text-blue-100/80">
                                    <li>Emergency Psychiatry</li>
                                    <li>Outpatient & Inpatient Psychiatry</li>
                                    <li>Substance / Addiction OPD</li>
                                    <li>Child & Neuro Psychiatry</li>
                                    <li>Child Psychiatry</li>
                                    <li>Forensic Psychiatry</li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-cyan-400 font-black uppercase tracking-[0.2em] text-xs pb-4 border-b border-white/10">Diagnostic & Specialized</h4>
                                <ul className="space-y-4 text-sm font-bold text-blue-100/80">
                                    <li>EEG (Electro-Encephalography)</li>
                                    <li>ECT (Electro-Convulsive Therapy)</li>
                                    <li>Psychotherapy & Psychosocial Support</li>
                                    <li>Radiology (X-Ray)</li>
                                    <li>Laboratory (Emergency & Central)</li>
                                    <li>ICU & Surgery (OR)</li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-cyan-400 font-black uppercase tracking-[0.2em] text-xs pb-4 border-b border-white/10">Pharmacy Services</h4>
                                <ul className="space-y-4 text-sm font-bold text-blue-100/80">
                                    <li>Emergency & Outpatient Pharmacy</li>
                                    <li>Inpatient Pharmacy</li>
                                    <li>Community Pharmacy</li>
                                    <li>Clinical Pharmacy & DIS</li>
                                    <li>Medication Formulation</li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-cyan-400 font-black uppercase tracking-[0.2em] text-xs pb-4 border-b border-white/10">Support & Outreach</h4>
                                <ul className="space-y-4 text-sm font-bold text-blue-100/80">
                                    <li>Rehabilitation Services</li>
                                    <li>Social Services</li>
                                    <li>Family Planning & VCT</li>
                                    <li>General Medical OPD</li>
                                    <li>Community Outreach (17 Health Centers)</li>
                                </ul>
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
                            <p className="section-subtitle">Over 80 years of dedication to mental health in Ethiopia and beyond.</p>
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
                            <p className="section-subtitle">Experienced professionals guiding EMSH toward excellence in mental health care.</p>
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
                                            { en: 'CPD Desk', am: 'ቀጣይ የሙያ ማበልፀጊያ' },
                                            { en: 'Research Desk', am: 'የምርምር ዴስክ' },
                                            { en: 'Clinical Training', am: 'ክሊኒካዊ ሥልጠና' },
                                            { en: 'Nursing Specialization', am: 'የነርሲንግ ስፔሻላይዜሽን' }
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
