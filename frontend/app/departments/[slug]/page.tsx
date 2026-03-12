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
            <main className="bg-white">
                {/* Hero */}
                <section className="relative min-h-[70vh] bg-blue-950 flex items-end overflow-hidden">
                    {dept.image ? (
                        <>
                            <img src={dept.image} alt={dept.name} className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105" crossOrigin="anonymous" />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/70 to-blue-950/20" />
                        </>
                    ) : (
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%, #1e3a8a 0%, transparent 60%)' }} />
                        </div>
                    )}

                    <div className="container-custom relative z-10 pb-20 pt-40">
                        <div className="max-w-4xl">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6 tracking-tighter">
                                {dept.name}
                            </h1>
                            <p className="text-xl text-blue-100/60 max-w-2xl mb-10 leading-relaxed font-medium">{dept.description}</p>
                        </div>
                    </div>
                </section>

                {/* Head of Department — Premium Card */}
                {dept.headName && (
                    <div className="bg-white border-b border-gray-100">
                        <div className="container-custom py-10">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-gradient-to-r from-blue-50 to-white rounded-3xl p-6 border border-blue-100 shadow-sm">
                                {/* Photo */}
                                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-blue-100 border-4 border-white shadow-xl">
                                    {dept.headImage ? (
                                        <img src={dept.headImage} alt={dept.headName} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
                                            <UserGroupIcon className="w-10 h-10 text-white/40" />
                                        </div>
                                    )}
                                </div>
                                {/* Info */}
                                <div className="flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-1">Department Head</p>
                                    <h2 className="font-black text-gray-900 text-2xl leading-tight">{dept.headName}</h2>
                                    <p className="text-sm font-bold text-blue-900 mt-1">{dept.headTitle || 'Clinical Director'}</p>
                                    {dept.headProfession && (
                                        <p className="text-xs text-gray-500 font-medium mt-1 italic">{dept.headProfession}</p>
                                    )}
                                </div>
                                {/* Decoration */}
                                <div className="hidden lg:flex flex-col items-end gap-2">
                                    <div className="px-4 py-2 bg-blue-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg">
                                        {dept.name}
                                    </div>
                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Emmanuel Mental Specialized Hospital</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="container-custom py-20 max-w-5xl space-y-32">

                    {/* ABOUT SECTION */}
                    <section id="about" className="space-y-16 animate-fade-in">
                        {/* Picture holder + text */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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
                            {/* Picture holder — uses dept image or gradient placeholder */}
                            <div className="space-y-4">
                                <div className="w-full aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl relative group">
                                    {dept.image ? (
                                        <img src={dept.image} alt={dept.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" crossOrigin="anonymous" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-950 to-blue-800 flex flex-col items-center justify-center">
                                            <div className="text-8xl mb-4 opacity-30">{dept.icon || '🏥'}</div>
                                            <p className="text-white/30 font-black text-[10px] uppercase tracking-widest">Department Photo</p>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent pointer-events-none" />
                                    {dept.headName && (
                                        <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-white/20 overflow-hidden flex-shrink-0 flex items-center justify-center border-2 border-white/30">
                                                {dept.headImage
                                                    ? <img src={dept.headImage} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                                    : <UserGroupIcon className="w-7 h-7 text-white/60" />}
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-widest text-white/50">Department Head</p>
                                                <p className="font-black text-white text-sm">{dept.headName}</p>
                                                {dept.headProfession && (
                                                    <p className="text-[10px] text-white/60 font-medium italic">{dept.headProfession}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Gallery strip — image holders */}
                                <div className="grid grid-cols-3 gap-3">
                                    {galleryImages.slice(0, 3).map((url: string, i: number) => (
                                        <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-md">
                                            <img src={url} alt={`${dept.name} ${i + 1}`} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                        </div>
                                    ))}
                                    {galleryImages.length === 0 && [0, 1, 2].map(i => (
                                        <div key={i} className="aspect-square rounded-2xl bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center">
                                            <span className="text-2xl opacity-20">{dept.icon || '🏥'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Clinical stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: ShieldCheckIcon, label: 'Clinical Standards', value: 'WHO Guidelines' },
                                { icon: UserGroupIcon, label: 'Team', value: 'Multidisciplinary' },
                                { icon: ClockIcon, label: 'Availability', value: '24/7 + OPD' },
                                { icon: StarIcon, label: 'Accreditation', value: 'MOH Certified' },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-3 p-6 bg-gray-50 rounded-3xl">
                                    <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-blue-900" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                                        <p className="font-black text-gray-900 mt-0.5 text-sm">{item.value}</p>
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
                        <div className="bg-gray-50 rounded-[56px] p-12 lg:p-20">
                            <div className="w-16 h-1 bg-blue-900 mb-8" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900 mb-4">Our Mission</p>
                            <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tighter">What We Stand For</h2>
                            <ul className="space-y-6">
                                {missionPoints.map((m: string, i: number) => (
                                    <li key={i} className="flex items-start gap-5">
                                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircleIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <p className="text-gray-700 text-lg font-medium leading-relaxed">{m}</p>
                                    </li>
                                ))}
                            </ul>
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
                                        {/* Image / icon placeholder */}
                                        <div className="relative h-36 bg-blue-50 flex items-center justify-center overflow-hidden border-b border-gray-100">
                                            {svc.image ? (
                                                <img src={svc.image} alt={svc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" crossOrigin="anonymous" />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 flex flex-col items-center justify-center">
                                                    <span className="text-[40px] opacity-[0.1] text-blue-900 group-hover:scale-110 transition-transform duration-500 leading-none select-none">
                                                        {svc.icon || '🏥'}
                                                    </span>
                                                    <p className="text-[8px] font-black uppercase tracking-widest text-blue-900/10 mt-1">Service Photo</p>
                                                </div>
                                            )}

                                            {/* Icon badge - floats between image and content */}
                                            <div className="absolute -bottom-5 left-5 w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-lg shadow-md z-10 group-hover:-translate-y-1 transition-transform duration-300">
                                                {svc.icon || '💉'}
                                            </div>

                                            {/* Hover arrow top-right */}
                                            <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/80 backdrop-blur-md border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-1 shadow-sm">
                                                <ChevronRightIcon className="w-3 h-3 text-gray-700" />
                                            </div>
                                        </div>
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

                    {/* GALLERY SECTION */}
                    <section id="gallery" className="animate-fade-in pt-16 border-t border-gray-50">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-1 bg-blue-900" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900">Department Gallery</h2>
                        </div>
                        {galleryImages.length > 0 ? (
                            <div className={`grid gap-6 ${galleryImages.length === 1 ? 'grid-cols-1' : galleryImages.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
                                {galleryImages.map((url: string, i: number) => (
                                    <div key={i} className={`rounded-[40px] overflow-hidden shadow-xl group ${i === 0 && galleryImages.length >= 3 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                                        <img src={url} alt={`${dept.name} photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" crossOrigin="anonymous" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-gray-50 rounded-[48px]">
                                <div className="text-6xl mb-4 opacity-30">{dept.icon || '🏥'}</div>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Photography coming soon.</p>
                            </div>
                        )}
                    </section>


                </div>
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
