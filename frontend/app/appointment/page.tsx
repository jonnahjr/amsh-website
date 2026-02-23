'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import { appointmentsAPI } from '@/lib/api';

const departments = [
    'Adult Psychiatry', 'Child & Adolescent Psychiatry', 'Addiction Treatment',
    'Emergency Psychiatry', 'Clinical Psychology', 'Neurology / EEG',
    'Outpatient', 'Inpatient',
];

const timeSlots = [
    '2:30 AM', '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM',
    '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM',
    '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
];

export default function AppointmentPage() {
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        department: '', doctor: '', date: '', time: '', reason: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await appointmentsAPI.book(form);
            setSuccess(true);
        } catch {
            setError('Failed to book appointment. Please try again or call +251-111-868-53-85.');
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
                <section className="bg-gradient-to-br from-blue-950 to-teal-900 py-20 text-white">
                    <div className="container-custom text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-cyan-300 rounded-full text-sm font-semibold mb-6">
                            📅 Book Appointment
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black mb-4">Book an Appointment</h1>
                        <p className="text-blue-200 text-lg max-w-xl mx-auto">
                            Schedule your visit with our expert psychiatric team. Fill in the form below and we'll confirm your appointment via email.
                        </p>
                    </div>
                </section>

                <section className="section bg-gray-50">
                    <div className="container-custom max-w-4xl">
                        {success ? (
                            <div className="card p-12 text-center">
                                <div className="text-7xl mb-6">🎉</div>
                                <h2 className="text-3xl font-black text-gray-900 mb-4">Appointment Booked!</h2>
                                <p className="text-gray-500 text-lg mb-2">
                                    Thank you, <strong>{form.firstName}</strong>! Your appointment request has been submitted.
                                </p>
                                <p className="text-gray-400 mb-8">
                                    We will confirm your appointment and send details to <strong>{form.email}</strong> within 24 hours.
                                </p>
                                <div className="bg-blue-50 rounded-2xl p-6 text-left max-w-sm mx-auto mb-8">
                                    <h3 className="font-bold text-blue-900 mb-3">Appointment Summary</h3>
                                    <div className="space-y-1.5 text-sm">
                                        <div className="flex justify-between"><span className="text-gray-500">Department:</span><span className="font-semibold">{form.department}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Date:</span><span className="font-semibold">{form.date}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Time:</span><span className="font-semibold">{form.time}</span></div>
                                    </div>
                                </div>
                                <button onClick={() => setSuccess(false)} className="btn-primary">Book Another Appointment</button>
                            </div>
                        ) : (
                            <div className="card p-8">
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Patient Appointment Form</h2>
                                <p className="text-gray-500 mb-8">Please fill out all required fields. We will contact you to confirm.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Personal Info */}
                                    <fieldset>
                                        <legend className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100 w-full">👤 Personal Information</legend>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="form-label">First Name *</label>
                                                <input name="firstName" value={form.firstName} onChange={handleChange} required className="form-input" placeholder="First name" />
                                            </div>
                                            <div>
                                                <label className="form-label">Last Name *</label>
                                                <input name="lastName" value={form.lastName} onChange={handleChange} required className="form-input" placeholder="Last name" />
                                            </div>
                                            <div>
                                                <label className="form-label">Email Address *</label>
                                                <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-input" placeholder="your@email.com" />
                                            </div>
                                            <div>
                                                <label className="form-label">Phone Number *</label>
                                                <input name="phone" value={form.phone} onChange={handleChange} required className="form-input" placeholder="+251 9XX XXX XXX" />
                                            </div>
                                        </div>
                                    </fieldset>

                                    {/* Appointment Details */}
                                    <fieldset>
                                        <legend className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100 w-full">🏥 Appointment Details</legend>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="form-label">Department *</label>
                                                <select name="department" value={form.department} onChange={handleChange} required className="form-select">
                                                    <option value="">Select department</option>
                                                    {departments.map(d => <option key={d}>{d}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="form-label">Preferred Doctor (optional)</label>
                                                <input name="doctor" value={form.doctor} onChange={handleChange} className="form-input" placeholder="Doctor name (if any)" />
                                            </div>
                                            <div>
                                                <label className="form-label">Preferred Date *</label>
                                                <input name="date" type="date" value={form.date} onChange={handleChange} required className="form-input"
                                                    min={new Date().toISOString().split('T')[0]} />
                                            </div>
                                            <div>
                                                <label className="form-label">Preferred Time *</label>
                                                <select name="time" value={form.time} onChange={handleChange} required className="form-select">
                                                    <option value="">Select time</option>
                                                    {timeSlots.map(t => <option key={t}>{t}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label className="form-label">Reason for Visit</label>
                                            <textarea name="reason" value={form.reason} onChange={handleChange} rows={4} className="form-input resize-none"
                                                placeholder="Please briefly describe your symptoms or reason for the appointment..." />
                                        </div>
                                    </fieldset>

                                    {/* Disclaimer */}
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                        <p className="text-yellow-800 text-sm">
                                            ⚠️ <strong>Note:</strong> This form is for appointment requests only. For emergencies, please call <strong>991</strong> immediately or come directly to our Emergency Department.
                                        </p>
                                    </div>

                                    {error && <p className="form-error">{error}</p>}

                                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50">
                                        {loading ? '⏳ Booking...' : '📅 Book Appointment'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
            <ChatbotButton />
        </>
    );
}
