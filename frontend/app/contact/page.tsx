'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { contactAPI } from '@/lib/api';
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    ClockIcon,
    PaperAirplaneIcon,
    CheckBadgeIcon,
    UserIcon,
    TagIcon,
    ChatBubbleLeftEllipsisIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await contactAPI.send(form);
            setSuccess(true);
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch {
            setError('Failed to send message. Please try again or call us directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCF9]">
            <EmergencyBanner />
            <Navbar />
            <main>
                {/* Hero */}
                <section className="relative bg-blue-950 pt-40 pb-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '48px 48px',
                        }} />
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-float pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-400/5 rounded-full blur-[80px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                    <div className="container-custom relative z-10 text-center">
                        <span className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 text-cyan-400 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 animate-fade-in-up">
                            📬 Contact Us
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-6 animate-fade-in-up tracking-tighter" style={{ animationDelay: '0.1s' }}>
                            <span className="text-gray-400 italic font-medium">Get In Touch</span><br />
                            With EMSH
                        </h1>

                        <p className="text-blue-100/70 text-lg md:text-xl max-w-3xl mx-auto animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                            We're here to help. Reach out for appointments, information, or any queries about our specialized mental health services.
                        </p>
                    </div>
                </section>

                <section className="py-24 bg-[#FDFCF9]">
                    <div className="container-custom">
                        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row-reverse gap-12">

                            {/* Right: Contact Form */}
                            <div className="lg:w-2/3">
                                <div className="bg-white rounded-[40px] shadow-xl shadow-blue-900/5 border border-gray-100 p-8 md:p-12 h-full relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-cyan-50/50 pointer-events-none"></div>
                                    <h2 className="text-3xl font-black text-blue-950 mb-2 relative z-10">Send a Message</h2>
                                    <p className="text-gray-500 mb-10 relative z-10 font-medium max-w-lg">
                                        Fill out the form below and our dedicated team will get back to you within 24 hours.
                                    </p>

                                    {success ? (
                                        <div className="text-center py-16 animate-scale-in relative z-10">
                                            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <CheckBadgeIcon className="w-12 h-12 text-emerald-600" />
                                            </div>
                                            <h3 className="text-3xl font-black text-blue-950 mb-4">Message Sent Successfully!</h3>
                                            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                                                Thank you for contacting EMSH. We've received your inquiry and will respond to <span className="font-bold text-gray-800">{form.email}</span> shortly.
                                            </p>
                                            <button onClick={() => setSuccess(false)} className="bg-blue-950 text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-colors shadow-xl shadow-blue-900/20">
                                                Send Another Message
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                                                    <div className="relative">
                                                        <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
                                                        <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address *</label>
                                                    <div className="relative">
                                                        <EnvelopeIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
                                                        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="example@domain.com" className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                                    <div className="relative">
                                                        <PhoneIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 pointer-events-none" />
                                                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+251 911 000 000" className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject *</label>
                                                    <div className="relative">
                                                        <TagIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 z-10 pointer-events-none" />
                                                        <select name="subject" value={form.subject} onChange={handleChange} required className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm appearance-none cursor-pointer">
                                                            <option value="" disabled>Subject</option>
                                                            <option>General Inquiry</option>
                                                            <option>Appointment Request</option>
                                                            <option>CPD Training</option>
                                                            <option>Research Collaboration</option>
                                                            <option>Career/Employment</option>
                                                            <option>Patient Feedback</option>
                                                            <option>Emergency</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                                                <div className="relative">
                                                    <ChatBubbleLeftEllipsisIcon className="absolute left-5 top-5 w-5 h-5 text-gray-300 pointer-events-none" />
                                                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="How can we help you?" className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-900 transition-all font-bold text-sm resize-none"></textarea>
                                                </div>
                                            </div>

                                            {error && (
                                                <div className="p-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center gap-3 text-sm">
                                                    <ExclamationTriangleIcon className="w-5 h-5" /> {error}
                                                </div>
                                            )}

                                            <button type="submit" disabled={loading} className="w-full bg-blue-950 text-white rounded-[24px] py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                                                {loading ? 'Processing...' : (
                                                    <>
                                                        <PaperAirplaneIcon className="w-5 h-5" />
                                                        Send Message
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>

                            {/* Left: Info & Map */}
                            <div className="lg:w-1/3 flex flex-col gap-8">

                                {/* Contact Info Card */}
                                <div className="bg-blue-950 text-white rounded-[40px] shadow-2xl overflow-hidden relative group">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[40px] -mr-24 -mt-24 pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
                                    <div className="p-8 relative z-10">
                                        <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Contact Details</h3>

                                        <div className="space-y-6">
                                            <div className="flex items-center gap-5 group/item">
                                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover/item:bg-cyan-500/20 group-hover/item:text-cyan-400 transition-colors flex-shrink-0">
                                                    <PhoneIcon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Main Line</p>
                                                    <a href="tel:+2511118685385" className="font-black text-sm hover:text-cyan-400 transition-colors">+251-111-868-53-85</a>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-5 group/item">
                                                <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center group-hover/item:bg-red-500/40 transition-colors flex-shrink-0 relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-red-500/20 animate-pulse pointer-events-none"></div>
                                                    <PhoneIcon className="w-5 h-5 relative z-10" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-red-300 font-bold uppercase tracking-widest mb-1">Emergency (24/7)</p>
                                                    <a href="tel:991" className="font-black text-sm hover:text-red-300 transition-colors text-red-400">991</a>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-5 group/item">
                                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover/item:bg-cyan-500/20 group-hover/item:text-cyan-400 transition-colors flex-shrink-0">
                                                    <EnvelopeIcon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Email Address</p>
                                                    <a href="mailto:info@emsh.gov.et" className="font-black text-sm hover:text-cyan-400 transition-colors">info@emsh.gov.et</a>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-5 group/item">
                                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover/item:bg-cyan-500/20 group-hover/item:text-cyan-400 transition-colors flex-shrink-0">
                                                    <MapPinIcon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Location</p>
                                                    <p className="font-black text-sm">Addis Ababa, Ethiopia</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-blue-900/50 p-8 border-t border-white/5 relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <ClockIcon className="w-5 h-5 text-cyan-400" />
                                            <h4 className="font-black text-xs uppercase tracking-widest text-white">Working Hours</h4>
                                        </div>
                                        <div className="space-y-3 text-[13px] font-medium text-blue-200">
                                            <div className="flex justify-between items-center">
                                                <span>Mon - Fri</span>
                                                <span className="text-white font-bold">2:30 AM - 10:00 AM</span>
                                            </div>
                                            <div className="flex justify-between items-center text-blue-400">
                                                <span>Sat - Sun</span>
                                                <span className="font-bold">Closed</span>
                                            </div>
                                            <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-1">
                                                <span>Emergency Services</span>
                                                <span className="text-emerald-400 font-black">24/7 Available</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Map Card */}
                                <div className="bg-white rounded-[40px] p-2 shadow-xl shadow-blue-900/5 border border-gray-100 group">
                                    <div className="relative h-64 w-full rounded-[32px] overflow-hidden">
                                        <iframe
                                            src="https://maps.google.com/maps?q=9.028561767590928,38.723235681663624&z=17&output=embed"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={true}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
                                        ></iframe>
                                        <div className="absolute inset-0 bg-blue-900/10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700 mix-blend-multiply"></div>
                                    </div>
                                    <div className="p-5 text-center">
                                        <a href="https://www.google.com/maps?q=9.028561767590928,38.723235681663624"
                                            target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-full gap-2 text-blue-950 font-black text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors py-2">
                                            <MapPinIcon className="w-4 h-4" /> Open in Google Maps
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <ChatbotButton />
        </div>
    );
}
