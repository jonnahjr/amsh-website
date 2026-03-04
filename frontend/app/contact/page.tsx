'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { contactAPI } from '@/lib/api';

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
        <>
            <EmergencyBanner />
            <Navbar />
            <main>
                {/* Hero */}
                <section className="relative bg-blue-950 py-24 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '48px 48px',
                        }} />
                    </div>

                    {/* Decorative Blue Orbs */}
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


                        <p className="text-blue-100/70 text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in-up font-medium" style={{ animationDelay: '0.2s' }}>
                            We're here to help. Reach out for appointments, information, or any queries about our specialized mental health services.
                        </p>
                    </div>
                </section>

                <section className="section bg-gray-50">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                            {/* Contact Info */}
                            <div className="space-y-6">
                                <div className="card p-6 bg-blue-900 text-white border-0">
                                    <h2 className="font-black text-xl mb-6">Contact Information</h2>
                                    {[
                                        { icon: '📞', label: 'Main Line', value: '+251-111-868-53-85', href: 'tel:+2511118685385' },
                                        { icon: '🚨', label: 'Emergency', value: '991 (24/7)', href: 'tel:991', highlight: true },
                                        { icon: '✉️', label: 'Email', value: 'info@emsh.gov.et', href: 'mailto:info@emsh.gov.et' },
                                        { icon: '📍', label: 'Address', value: 'Addis Ababa, Ethiopia' },
                                        { icon: '🌐', label: 'Website', value: 'www.emsh.gov.et', href: 'https://www.emsh.gov.et' },
                                    ].map((item) => (
                                        <div key={item.label} className={`flex items-start gap-4 mb-5 ${item.highlight ? 'bg-red-600/30 -mx-2 px-2 py-2 rounded-xl' : ''}`}>
                                            <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                            <div>
                                                <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider">{item.label}</p>
                                                {item.href ? (
                                                    <a href={item.href} className="text-white font-bold hover:text-cyan-300 transition-colors">{item.value}</a>
                                                ) : (
                                                    <p className="text-white font-bold">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Working Hours */}
                                <div className="card p-6">
                                    <h3 className="font-bold text-gray-900 mb-4">🕐 Working Hours</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Monday - Friday</span>
                                            <span className="font-semibold text-gray-900">2:30 AM - 10:00 AM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Saturday</span>
                                            <span className="font-semibold text-gray-400">Closed</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Sunday</span>
                                            <span className="font-semibold text-gray-400">Closed</span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between">
                                            <span className="text-gray-600">Emergency</span>
                                            <span className="font-bold text-red-600">24/7 Available</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card overflow-hidden shadow-xl border-0">
                                    <div className="relative h-72 w-full">
                                        <iframe
                                            src="https://maps.google.com/maps?q=9.028561767590928,38.723235681663624&z=17&output=embed"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={true}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                                        ></iframe>
                                    </div>
                                    <div className="p-5 bg-white border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex items-start gap-3">
                                            <span className="text-2xl mt-0.5">📍</span>
                                            <div>
                                                <p className="text-gray-900 font-bold text-sm leading-tight">Emmanuel Mental Hospital, 2PHF+H5M</p>
                                                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Addis Ababa, Ethiopia</p>
                                            </div>
                                        </div>
                                        <a href="https://www.google.com/maps?q=9.028561767590928,38.723235681663624"
                                            target="_blank" rel="noopener noreferrer"
                                            className="px-6 py-3 bg-blue-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-lg hover:-translate-y-1">
                                            View on Google Maps
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-2">
                                <div className="card p-8">
                                    <h2 className="text-2xl font-black text-gray-900 mb-2">Send Us a Message</h2>
                                    <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

                                    {success ? (
                                        <div className="text-center py-12">
                                            <div className="text-6xl mb-4">✅</div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-2">Message Sent!</h3>
                                            <p className="text-gray-500">Thank you for contacting EMSH. We'll respond within 24 hours.</p>
                                            <button onClick={() => setSuccess(false)} className="mt-6 btn-primary">Send Another Message</button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="form-label">Full Name *</label>
                                                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className="form-input" />
                                                </div>
                                                <div>
                                                    <label className="form-label">Email Address *</label>
                                                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="form-input" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="form-label">Phone Number</label>
                                                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+251 9XX XXX XXX" className="form-input" />
                                                </div>
                                                <div>
                                                    <label className="form-label">Subject *</label>
                                                    <select name="subject" value={form.subject} onChange={handleChange} required className="form-select">
                                                        <option value="">Select a subject</option>
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
                                            <div>
                                                <label className="form-label">Message *</label>
                                                <textarea name="message" value={form.message} onChange={handleChange} required rows={6} placeholder="Please write your message here..." className="form-input resize-none" />
                                            </div>
                                            {error && <p className="form-error">{error}</p>}
                                            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50">
                                                {loading ? '⏳ Sending...' : '📤 Send Message'}
                                            </button>
                                        </form>
                                    )}
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
