'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import Link from 'next/link';
import {
    PhoneIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    BoltIcon,
    ShieldCheckIcon,
    ClockIcon,
    BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

const emergencyUnits = [
    {
        id: 1,
        name: 'Emergency Triage Room',
        description: 'The first point of contact for all incoming patients. Trained triage nurses and physicians rapidly assess the severity of conditions using internationally standardized triage protocols (ESI / Manchester Triage System) to ensure the most critical patients receive immediate attention.',
        zone: 'Entry',
        color: 'bg-blue-950',
        accent: 'text-cyan-400',
        badge: 'FIRST CONTACT',
        badgeColor: 'bg-cyan-400/10 text-cyan-400',
    },
    {
        id: 2,
        name: 'Emergency Psychiatry Room',
        description: 'A secure, therapeutically designed space dedicated to the immediate management of acute psychiatric crises, including psychosis, severe depression, suicidal ideation, and mania. Staffed by board-certified psychiatrists available around the clock.',
        zone: 'Acute',
        color: 'bg-indigo-950',
        accent: 'text-violet-400',
        badge: '24/7 PSYCHIATRIC',
        badgeColor: 'bg-violet-400/10 text-violet-400',
    },
    {
        id: 3,
        name: 'Emergency One Stop Room',
        description: 'An integrated multi-disciplinary emergency room where patients with concurrent medical and psychiatric conditions receive simultaneous care from an inter-professional team, reducing delays and improving clinical outcomes.',
        zone: 'Integrated',
        color: 'bg-teal-950',
        accent: 'text-teal-400',
        badge: 'INTEGRATED CARE',
        badgeColor: 'bg-teal-400/10 text-teal-400',
    },
    {
        id: 4,
        name: 'Emergency Procedure Room',
        description: 'A sterile, fully equipped clinical space for performing urgent medical procedures including airway management, wound care, venous access, lumbar puncture, and other bedside interventions required in acute emergency situations.',
        zone: 'Procedural',
        color: 'bg-blue-900',
        accent: 'text-blue-300',
        badge: 'PROCEDURES',
        badgeColor: 'bg-blue-300/10 text-blue-300',
    },
    {
        id: 5,
        name: 'Emergency Red Zone',
        description: 'Reserved for immediately life-threatening conditions requiring resuscitation (Priority 1). Equipped with advanced life support systems, defibrillators, mechanical ventilators, and continuous monitoring — managed by the senior emergency team.',
        zone: 'Critical',
        color: 'bg-red-950',
        accent: 'text-red-400',
        badge: 'PRIORITY 1 — CRITICAL',
        badgeColor: 'bg-red-400/10 text-red-400',
    },
    {
        id: 6,
        name: 'Emergency Orange Zone',
        description: 'Manages urgent but non-immediately-life-threatening conditions (Priority 2). Patients presenting with high-risk presentations requiring rapid assessment and intervention within 10–30 minutes are stabilized and treated in this zone.',
        zone: 'Urgent',
        color: 'bg-orange-950',
        accent: 'text-orange-400',
        badge: 'PRIORITY 2 — URGENT',
        badgeColor: 'bg-orange-400/10 text-orange-400',
    },
    {
        id: 7,
        name: 'Emergency Yellow & Green Zone',
        description: 'Two-tier zone for semi-urgent (Yellow, Priority 3) and non-urgent (Green, Priority 4–5) cases. Patients in these zones receive thorough clinical evaluation, appropriate investigations, and evidence-based management while awaiting turn.',
        zone: 'Semi-Urgent',
        color: 'bg-yellow-900',
        accent: 'text-yellow-300',
        badge: 'PRIORITY 3–5',
        badgeColor: 'bg-yellow-300/10 text-yellow-300',
    },
    {
        id: 8,
        name: 'Emergency Seclusion Room',
        description: 'A dedicated, de-escalation environment for patients in acute agitation, severe behavioral disturbances, or who pose a risk to themselves or others. Designed to strict international mental health safety standards.',
        zone: 'Safety',
        color: 'bg-slate-900',
        accent: 'text-slate-300',
        badge: 'BEHAVIORAL SAFETY',
        badgeColor: 'bg-slate-300/10 text-slate-300',
    },
    {
        id: 9,
        name: 'Emergency Pharmacy',
        description: 'An on-site, 24/7 pharmacy providing immediate dispensing of emergency medications, IV fluids, and psychiatric medications. Staffed by clinical pharmacists integrated into the emergency team.',
        zone: 'Support',
        color: 'bg-emerald-950',
        accent: 'text-emerald-400',
        badge: '24/7 DISPENSING',
        badgeColor: 'bg-emerald-400/10 text-emerald-400',
    },
    {
        id: 10,
        name: 'Emergency Laboratory',
        description: 'Rapid-turnaround diagnostic laboratory providing STAT results for CBC, biochemistry, toxicology, and blood gas analysis to inform immediate medical decision-making.',
        zone: 'Diagnostic',
        color: 'bg-cyan-950',
        accent: 'text-cyan-300',
        badge: 'RAPID DIAGNOSTICS',
        badgeColor: 'bg-cyan-300/10 text-cyan-300',
    },
    {
        id: 11,
        name: 'Emergency OR',
        description: 'A fully equipped emergency operative suite for urgent surgical procedures that cannot be deferred, including cranial, abdominal, or trauma interventions. ready for activation 24/7.',
        zone: 'Surgical',
        color: 'bg-purple-950',
        accent: 'text-purple-400',
        badge: 'EMERGENCY SURGERY',
        badgeColor: 'bg-purple-400/10 text-purple-400',
    },
    {
        id: 12,
        name: 'High Dependency Unit (HDU)',
        description: 'A step-down unit between the ICU and general ward for patients who require close monitoring and frequent clinical assessment but not full intensive care support.',
        zone: 'Critical',
        color: 'bg-blue-950',
        accent: 'text-blue-300',
        badge: 'HIGH DEPENDENCY',
        badgeColor: 'bg-blue-300/10 text-blue-300',
    },
    {
        id: 13,
        name: 'Adult ICU',
        description: 'The Intensive Care Unit provides the highest level of care for critically ill patients with multi-organ dysfunction, respiratory failure, or hemodynamic instability.',
        zone: 'Intensive',
        color: 'bg-gray-950',
        accent: 'text-red-400',
        badge: 'INTENSIVE CARE',
        badgeColor: 'bg-red-400/10 text-red-400',
    },
];

const stats = [
    { value: '24/7', label: 'Emergency Coverage', icon: '🕐' },
    { value: '13', label: 'Specialized Units', icon: '🏥' },
    { value: '<5 min', label: 'Triage Response', icon: '⚡' },
    { value: '100%', label: 'No Appointment Needed', icon: '✅' },
];

const capabilities = [
    'Advanced Cardiac Life Support (ACLS)',
    'Emergency Psychiatric Management',
    'Rapid Sequence Intubation (RSI)',
    'Toxicology & Overdose Management',
    'Neurological Emergency Care',
    'Trauma & Polytrauma Management',
    'Emergency Obstetric Care',
    'Pediatric Emergency Support',
];

export default function EmergencyServicesPage() {
    return (
        <>
            <EmergencyBanner />
            <Navbar />
            <main className="bg-white">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] bg-blue-950 flex items-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                    </div>
                    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />
                    <div className="container-custom relative z-10 py-24 -translate-y-10">
                        <div className="max-w-4xl">
                            <div className="animate-fade-in-up mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-semibold uppercase tracking-widest">
                                    🚑 Critical Care & Urgent Support
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                                Emergency <br />
                                <span className="text-gray-400 italic font-medium">Services (24/7)</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-blue-100/80 max-w-3xl mb-12 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                                Emmanuel Mental Specialized Hospital operates a fully integrated Emergency Department providing immediate, high-quality psychiatric, medical, and surgical emergency care — no appointment required.
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <a href="tel:+2511118685385" className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1 flex items-center gap-2">
                                    <PhoneIcon className="w-5 h-5" /> Emergency Hotline
                                </a>
                                <Link href="/contact" className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                    Contact Hospital
                                </Link>
                            </div>
                            <div className="mt-12 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                                <span className="text-blue-200 text-sm font-black uppercase tracking-widest">Active 24 Hours · 7 Days · 365 Days a Year</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="bg-white border-b border-gray-100">
                    <div className="container-custom">
                        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
                            {stats.map((s) => (
                                <div key={s.label} className="px-8 py-10 text-center group hover:bg-blue-950 transition-colors duration-300">
                                    <div className="text-3xl mb-2">{s.icon}</div>
                                    <div className="text-3xl md:text-4xl font-black text-blue-950 group-hover:text-white transition-colors mb-1">{s.value}</div>
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-200 transition-colors">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Overview Section */}
                <section className="py-28 bg-white">
                    <div className="container-custom">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900 mb-6 flex items-center gap-3">
                                    <span className="w-10 h-px bg-blue-900 inline-block" /> Department Overview
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tighter shadow-xs">
                                    Immediate Care for <br />
                                    <span className="text-blue-900">Critical Moments</span>
                                </h2>
                                <div className="space-y-5 text-gray-600 leading-relaxed font-medium">
                                    <p>
                                        Our Emergency Department serves as the primary safety net for patients presenting with life-threatening conditions — both medical and psychiatric. Operating to international Emergency Medicine standards, every patient receives rapid triage, evidence-based assessment, and expert clinical management.
                                    </p>
                                    <p>
                                        Emmanuel Mental Specialized Hospital provides this service without restriction — 24 hours a day, 7 days a week, 365 days a year. We are committed to preventing death and long-term disability through timely intervention.
                                    </p>
                                </div>
                                <div className="mt-10 grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Walk-in patients', sub: 'No referral needed' },
                                        { label: 'Ambulance transfers', sub: 'From regional hospitals' },
                                        { label: 'Psychiatric crises', sub: '24/7 specialist cover' },
                                        { label: 'Medical-surgical cases', sub: 'Integrated care team' },
                                    ].map(item => (
                                        <div key={item.label} className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl">
                                            <CheckCircleIcon className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-sm font-black text-blue-950">{item.label}</div>
                                                <div className="text-xs text-gray-500">{item.sub}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="w-full h-[520px] bg-gradient-to-br from-blue-950 to-blue-900 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center gap-4 border border-blue-800/30 shadow-2xl">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <BuildingOffice2Icon className="w-10 h-10 text-blue-300" />
                                    </div>
                                    <div className="text-center px-8">
                                        <p className="text-white font-black text-lg mb-2">Emergency Department</p>
                                        <p className="text-blue-300/60 text-sm">Photo — EMSH Emergency Entrance</p>
                                    </div>
                                    <span className="mt-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-blue-300 uppercase font-bold tracking-widest">Image Placeholder</span>
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-red-600 text-white rounded-3xl px-6 py-4 shadow-2xl shadow-red-600/30">
                                    <div className="text-2xl font-black">24/7</div>
                                    <div className="text-xs font-black uppercase tracking-widest opacity-80">Always Open</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Units Grid */}
                <section className="py-28 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-20">
                            <span className="section-badge mb-4">🏥 Our Facilities</span>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">Emergency Units</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                                Our Emergency Department comprises 13 specialized clinical units, each designed to deliver international-standard care for specific emergency presentations.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {emergencyUnits.map((unit) => (
                                <div key={unit.id} className={`group relative ${unit.color} rounded-[2.5rem] overflow-hidden flex flex-col border border-white/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
                                    <div className="relative h-52 flex items-center justify-center bg-white/5 border-b border-white/5">
                                        <div className="flex flex-col items-center gap-3 text-center px-6">
                                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                                <BuildingOffice2Icon className={`w-7 h-7 ${unit.accent}`} />
                                            </div>
                                            <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Unit Photo</span>
                                        </div>
                                        <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                                            <span className={`text-sm font-black ${unit.accent}`}>{unit.id.toString().padStart(2, '0')}</span>
                                        </div>
                                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${unit.badgeColor}`}>
                                            {unit.badge}
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <h3 className={`text-xl font-black text-white mb-4 leading-tight group-hover:${unit.accent} transition-colors`}>
                                            {unit.name}
                                        </h3>
                                        <p className="text-blue-100/60 text-sm leading-relaxed flex-1">
                                            {unit.description}
                                        </p>
                                        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-xs text-white/30 font-black uppercase tracking-widest">Zone: {unit.zone}</span>
                                            <div className={`w-2 h-2 rounded-full ${unit.accent.replace('text-', 'bg-')} opacity-60`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Capabilities */}
                <section className="py-28 bg-blue-950 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
                    <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="container-custom relative z-10">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-300/60 mb-6 flex items-center gap-3">
                                    <span className="w-10 h-px bg-blue-300/40" /> Clinical Capabilities
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8 tracking-tighter shadow-sm">
                                    Equipped to Handle <br />
                                    <span className="text-red-400">Any Emergency</span>
                                </h2>
                                <p className="text-blue-100/60 text-lg leading-relaxed mb-10 font-medium">
                                    Our emergency care team includes emergency physicians, psychiatrists, surgeons, intensivists, anesthesiologists, and specialized nurses delivering care across all emergency domains.
                                </p>
                                <a href="tel:+2511118685385" className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-500 transition-all shadow-2xl shadow-red-600/20 hover:-translate-y-1">
                                    <PhoneIcon className="w-5 h-5" /> Call Emergency Line
                                </a>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {capabilities.map((cap, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl px-6 py-5 hover:bg-white/10 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                            <BoltIcon className="w-4 h-4 text-red-400" />
                                        </div>
                                        <span className="text-sm font-bold text-blue-100">{cap}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="py-28 bg-white">
                    <div className="container-custom">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-1 bg-blue-950 rounded-[2.5rem] p-10 text-white border border-white/5 shadow-2xl">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                                    <ShieldCheckIcon className="w-7 h-7 text-cyan-400" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Our Vision</h3>
                                <p className="text-blue-100/60 leading-relaxed text-sm font-medium">
                                    To be an accessible, technology-supported, and highly skilled professional center providing high-quality emergency medical, neurological, psychiatric, surgical, and obstetric emergency care aligned with international standards.
                                </p>
                            </div>
                            <div className="lg:col-span-2 bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                                <div className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center mb-8">
                                    <ClockIcon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-6">Our Mission</h3>
                                <div className="space-y-4">
                                    {[
                                        'Provide immediate, life-saving emergency care without prior appointment or referral barriers.',
                                        'Become a center of excellence in emergency medicine with modern technology and trained professionals.',
                                        'Make diverse emergency services accessible through national and international collaborations.',
                                        'Strengthen specialty medical services through continuous professional development and research.',
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-blue-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircleIcon className="w-4 h-4 text-white" />
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Goal Banner */}
                <section className="py-20 bg-gray-50 border-t border-gray-100">
                    <div className="container-custom">
                        <div className="max-w-5xl mx-auto bg-blue-950 rounded-[3rem] p-16 text-center relative overflow-hidden border border-white/5 shadow-2xl">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
                            <div className="relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-300/50 mb-6 block">Core Objective</span>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight shadow-sm">Goal of the Emergency Department</h2>
                                <p className="text-xl md:text-2xl font-black text-red-400 mb-8 leading-relaxed italic max-w-3xl mx-auto">
                                    "To prevent death and long-term physical or mental complications resulting from emergency medical and psychiatric conditions."
                                </p>
                                <p className="text-blue-200/50 text-base max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
                                    By providing timely, high-quality emergency care, we strive to prevent complications entirely or minimize the impact of physical and mental trauma on patients and their families.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a href="tel:+2511118685385" className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-500 transition-all shadow-2xl hover:-translate-y-1">
                                        <PhoneIcon className="w-5 h-5" /> Emergency Hotline
                                    </a>
                                    <Link href="/services" className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                                        All Services <ArrowRightIcon className="w-5 h-5" />
                                    </Link>
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
