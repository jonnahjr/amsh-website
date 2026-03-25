'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { departmentsAPI } from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import {
    ChevronRightIcon,
    PhoneIcon,
    CheckCircleIcon,
    BuildingOfficeIcon,
    StarIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    ClockIcon,
    LightBulbIcon,
} from '@heroicons/react/24/outline';

const DEPT_MISSIONS: Record<string, { vision: string; mission: string[]; goal: string; about: string }> = {
    'psychiatry': {
        vision: 'To be Ethiopia\'s leading center of excellence in comprehensive psychiatric and mental health care.',
        mission: ['Deliver evidence-based inpatient and outpatient psychiatric treatment.', 'Provide specialized care for addiction, child, geriatric, and forensic psychiatry.', 'Advance clinical excellence through continuous learning and research.'],
        goal: 'Achieve optimal psychiatric outcomes for every patient through compassionate, specialized care.',
        about: 'The Department of Psychiatry at Emmanuel Mental Specialized Hospital is the clinical core of the institution, delivering the full spectrum of mental health services. Our multidisciplinary team of psychiatrists, clinical psychologists, and specialized nurses provides evidence-based care across outpatient, inpatient, and specialized clinics including addiction, ECT, clozapine treatment, and forensic services.',
    },
    'internal-medicine': {
        vision: 'To provide the highest standard of internal medicine care, integrating physical and mental health.',
        mission: ['Provide expert medical care for complex adult conditions.', 'Manage chronic diseases with patient-centered protocols.', 'Coordinate referral and specialist internal medicine consultations.'],
        goal: 'Deliver comprehensive, high-quality adult medical care that supports overall patient wellness.',
        about: 'The Department of Internal Medicine at EMSH supports the holistic health of patients by addressing medical comorbidities alongside mental health. Our internists manage a range of complex conditions including hypertension, diabetes, and other chronic diseases, ensuring that physical health does not become a barrier to psychiatric recovery.',
    },
    'neurology': {
        vision: 'To lead neurological care in Ethiopia through advanced diagnostics and specialized treatment.',
        mission: ['Diagnose and treat epilepsy, stroke, and neurodegenerative conditions.', 'Provide EEG and neurophysiology services.', 'Collaborate closely with psychiatry for complex neuropsychiatric presentations.'],
        goal: 'Ensure accurate neurological diagnosis and effective treatment for every patient.',
        about: 'The Neurology Department provides specialized diagnostic and therapeutic services for disorders of the nervous system. Our team uses advanced equipment including EEG and neurophysiology testing to accurately diagnose epilepsy, neuropathies, and other conditions commonly presenting alongside psychiatric disorders.',
    },
    'emergency-dept': {
        vision: 'To be the most responsive and effective emergency psychiatric and medical unit in Ethiopia.',
        mission: ['Provide immediate triage and intervention for psychiatric crises.', 'Deliver 24/7 emergency medical and procedure services.', 'Ensure rapid access to emergency pharmacy and laboratory support.'],
        goal: 'Minimize risk and maximize outcomes through rapid, expert emergency response.',
        about: 'The Emergency Department at EMSH operates around the clock to manage acute psychiatric crises, medical emergencies, and urgent procedures. Our trained emergency team works in an integrated manner with all departments to ensure every patient receives timely, appropriate care regardless of the nature or time of the emergency.',
    },
    'infection-prevention-control': {
        vision: 'A safe healthcare environment with zero or minimal healthcare-associated infections (HAIs), protecting patients, healthcare workers, and visitors through high-quality infection prevention practices.',
        mission: ['Ensure continuous surveillance, prevention, and control of infections.', 'Reduce infection risks through evidence-based standard precautions and surveillance.', 'Promote safe, clean, and hygienic hospital environments.', 'Build staff capacity and ensure compliance with global IPC standards.', 'Early detection and management of infectious disease outbreaks.'],
        goal: 'Achieve zero preventable healthcare-associated infections and ensure a 100% safe hospital environment for all.',
        about: 'The Infection Prevention and Control (IPC) unit at AMSH is dedicated to creating a safer clinical world. We monitor healthcare-associated infections, manage antimicrobial resistance, and implement strict protocols for hand hygiene, PPE use, and equipment sterilization to maintain the highest clinical standards.',
    },
    'health-literacy': {
        vision: 'An empowered, health-literate population capable of making informed decisions about their conditions, treatments, and preventive measures.',
        mission: ['Improve patients’ understanding of health information and clinical services.', 'Enhance communication between healthcare providers and patients using visual aids and local languages.', 'Promote self-care, medication adherence, and disease prevention.', 'Train healthcare workers in effective, patient-centered communication.'],
        goal: 'Empower every patient with the knowledge to actively participate in their own recovery and long-term health.',
        about: 'Our Health Literacy team bridges the communication gap in mental healthcare. We develop accessible educational materials, provide clear explanations of diagnoses, and foster patient-centered communication to help the community make informed health decisions and achieve better outcomes.',
    },
    'community-outreach': {
        vision: 'To achieve a mentally healthy community with equitable, stigma-free, and community-based mental health services integrated into primary healthcare.',
        mission: ['Extend mental health services beyond hospital settings via mobile clinics and community screening.', 'Promote early identification and treatment of mental health conditions.', 'Reduce stigma and discrimination through education and awareness campaigns.', 'Strengthen community support systems and home-visit continuity of care.', 'Integrate mental health into primary healthcare through task-shifting and training.'],
        goal: 'Bring psychiatric excellence to underserved populations and eliminate the stigma associated with mental health.',
        about: 'The Community Outreach unit at AMSH extends specialized psychiatric care beyond the hospital walls. We provide mobile clinics, conduct early screenings, and offer psychosocial rehabilitation to ensure that vulnerable and rural populations can access quality mental healthcare without discrimination.',
    },
    'phem': {
        vision: 'To become a highly responsive, well-coordinated, and resilient unit capable of effectively managing all public health emergencies, contributing to a safe and healthy population.',
        mission: ['Rapidly detect, assess, and respond to public health emergencies to reduce illness and social disruption.', 'Implement early warning systems and conduct hazard mapping for priority diseases.', 'Activate rapid response mechanisms during outbreaks and coordinate hospital-wide case management.', 'Engage in risk communication to address misinformation and promote preventive behaviors.', 'Ensure availability of emergency supplies and evaluate response performance.'],
        goal: 'Minimize risk and maximize outcomes through proactive emergency preparedness and coordinated institutional response.',
        about: 'The Public Health Emergency Management (PHEM) unit is the hospital\'s emergency resilience hub. We monitor priority diseases, maintain stockpiles of essential supplies, and coordinate rapid responses to outbreaks to protect both the hospital and the general community from health threats.',
    },
};

const DEFAULT_CONTENT = {
    vision: 'To deliver specialized, evidence-based clinical services that set the standard for healthcare excellence in Ethiopia.',
    mission: ['Provide high-quality, patient-centered care.', 'Promote continuous professional development and innovation.', 'Collaborate across disciplines for holistic patient outcomes.'],
    goal: 'Achieve the highest clinical and service quality standards for every patient we serve.',
    about: 'This department is committed to delivering specialized care as part of Emmanuel Mental Specialized Hospital\'s comprehensive healthcare system. Our dedicated team of clinical professionals work collaboratively to ensure every patient receives dignified, effective, and evidence-based treatment.',
};

export default function DepartmentDetailPage() {
    const { slug } = useParams();
    const [dept, setDept] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        departmentsAPI.getBySlug(slug as string).then(res => {
            setDept(res.data.department);
        }).catch(() => {
            setDept({
                name: 'Clinical Department',
                description: 'Specialized medical services for patient excellence.',
                services: [],
            });
        }).finally(() => setLoading(false));
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-blue-950 flex flex-col items-center justify-center text-white">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-black uppercase tracking-widest text-sm opacity-50">Loading...</p>
        </div>
    );

    if (!dept) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl font-black text-gray-400 uppercase tracking-widest">Department Not Found</p>
        </div>
    );

    const content = DEPT_MISSIONS[slug as string] || DEFAULT_CONTENT;

    // Use DB fields if available, otherwise fallback to static content
    const visionText = dept.vision || content.vision;
    const missionPoints = dept.mission ? dept.mission.split('\n') : content.mission;
    const goalText = dept.goal || content.goal;
    const aboutText = dept.description || content.about;

    const galleryImages = dept.gallery ? dept.gallery.split(';').filter(Boolean) : [];

    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-blue-50/30">
                {/* Hero */}
                <section className="relative min-h-screen bg-blue-950 flex items-center overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                    </div>

                    {/* Decorative Blue Orbs */}
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                    {dept.image && (
                        <>
                            <img src={dept.image} alt={dept.name} className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105" crossOrigin="anonymous" />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/70 to-blue-950/20" />
                        </>
                    )}

                    <div className="container-custom relative z-10 py-32">
                        <div className="max-w-4xl">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6 tracking-tighter">
                                {dept.name}
                            </h1>
                            <p className="text-xl text-blue-100/60 max-w-2xl mb-10 leading-relaxed font-medium">{dept.description}</p>
                        </div>
                    </div>
                </section>

                {/* Content removed per user request */}

                <div className="container-custom py-20 max-w-5xl space-y-32">

                    {/* ABOUT SECTION */}
                    <section id="about" className="space-y-16 animate-fade-in">
                        {/* Picture holder + text */}
                        <div className="max-w-4xl">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-1 bg-blue-900" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900">Department Overview</h2>
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
                                    Clinical Excellence <br /><span className="text-blue-900">Redefined.</span>
                                </h3>
                                <div className="text-gray-600 text-lg leading-relaxed space-y-5 font-medium">
                                    {aboutText.split('\n').map((p: string, i: number) => <p key={i}>{p}</p>)}
                                </div>
                            </div>
                                {/* Image holder removed per user request */}
                        </div>
                        {/* Clinical stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: ShieldCheckIcon, label: 'Clinical Standards', value: 'WHO Guidelines' },
                                { icon: UserGroupIcon, label: 'Team', value: 'Multidisciplinary' },
                                { icon: ClockIcon, label: 'Availability', value: '24/7 + OPD' },
                                { icon: StarIcon, label: 'Accreditation', value: 'MOH Certified' },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-3 p-6 bg-white rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-blue-900" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-blue-400">{item.label}</p>
                                        <p className="font-black text-blue-950 mt-0.5 text-sm">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* MISSION / VISION SECTION */}
                    <section id="vision" className="space-y-12 animate-fade-in pt-16 border-t border-gray-50">
                        {/* Vision */}
                        <div className="bg-blue-950 rounded-[56px] p-12 lg:p-20 text-white relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 60%)' }} />
                            <div className="relative z-10">
                                <div className="w-16 h-1 bg-cyan-400 mb-8" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-4">Our Vision</p>
                                <h2 className="text-3xl lg:text-5xl font-black leading-tight tracking-tighter mb-6">{visionText}</h2>
                            </div>
                        </div>

                        {/* Mission */}
                        <div className="bg-blue-900 rounded-[56px] p-12 lg:p-20 relative overflow-hidden group">
                            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 0%, transparent 50%)' }} />
                            <div className="relative z-10">
                                <div className="w-16 h-1 bg-cyan-400 mb-8" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-4">Our Mission</p>
                                <h2 className="text-3xl font-black text-white mb-10 tracking-tighter">What We Stand For</h2>
                                <ul className="space-y-6">
                                    {missionPoints.map((m: string, i: number) => (
                                        <li key={i} className="flex items-start gap-5">
                                            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircleIcon className="w-5 h-5 text-blue-950" />
                                            </div>
                                            <p className="text-blue-100 text-lg font-medium leading-relaxed">{m}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Goal */}
                        <div className="bg-gray-900 rounded-[56px] p-12 lg:p-20 text-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, #1e40af 0%, transparent 70%)' }} />
                            <div className="relative z-10">
                                <LightBulbIcon className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-6">Strategic Goal</p>
                                <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed italic max-w-3xl mx-auto">"{goalText}"</p>
                            </div>
                        </div>
                    </section>

                    {/* SERVICES SECTION */}
                    <section id="services" className="animate-fade-in pt-16 border-t border-gray-50">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-1 bg-blue-900" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900">Services Offered</h2>
                            <span className="text-[9px] font-black text-gray-300 uppercase">{dept.services?.length || 0} total</span>
                        </div>
                        {dept.services && dept.services.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {dept.services.map((svc: any) => (
                                    <Link
                                        key={svc.id || svc.slug}
                                        href={`/services/${svc.slug}`}
                                        className="group rounded-[28px] overflow-hidden border border-gray-100 hover:border-blue-900 bg-white shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 flex flex-col"
                                    >
                                        {/* Content removed per user request */}
                                        {/* Content */}
                                        <div className="bg-blue-950 flex-1 flex flex-col px-5 pb-5 pt-7 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400 opacity-[0.02] rounded-full -mr-12 -mt-12 blur-xl" />

                                            <h4 className="font-black text-white group-hover:text-cyan-400 transition-colors text-sm leading-tight mb-2">{svc.name}</h4>
                                            {svc.description && (
                                                <p className="text-[11px] text-blue-100/40 line-clamp-2 flex-1 leading-relaxed">{svc.description}</p>
                                            )}
                                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest group-hover:text-cyan-400/50 transition-colors">Learn More</span>
                                                <ChevronRightIcon className="w-4 h-4 text-white/20 group-hover:text-cyan-400 transition-colors" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-[48px]">
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No services listed yet.</p>
                            </div>
                        )}
                    </section>

                    {/* Gallery removed per user request */}


                </div>
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
