'use client';

import { useState } from 'react';
import Link from 'next/link';
import { newsletterAPI } from '@/lib/api';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        setError('');
        try {
            await newsletterAPI.subscribe(email, name);
            setSuccess(true);
            setEmail('');
            setName('');
        } catch {
            setError('Failed to subscribe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section bg-[#FFF9F0] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-[0.05]">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/10 border border-blue-900/20 text-blue-900 rounded-full text-sm font-semibold mb-6">
                        ✉️ Newsletter
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-blue-950 mb-4">
                        Stay Updated with EMSH
                    </h2>
                    <p className="text-blue-900/70 text-lg mb-10">
                        Subscribe to our newsletter to receive the latest news, research updates,
                        CPD announcements, and health information from EMSH.
                    </p>

                    {success ? (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 shadow-sm">
                            <div className="text-4xl mb-3">✅</div>
                            <h3 className="font-bold text-xl mb-2">Successfully Subscribed!</h3>
                            <p className="text-emerald-700">Thank you for subscribing to the EMSH newsletter. You'll receive our latest updates soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name (optional)"
                                    className="flex-1 px-5 py-4 bg-white border border-gray-200 rounded-2xl text-blue-950 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email Address"
                                    required
                                    className="flex-1 px-5 py-4 bg-white border border-gray-200 rounded-2xl text-blue-950 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-900 text-white hover:bg-blue-800 transition-colors font-bold rounded-2xl text-base py-4 w-full sm:w-auto sm:mx-auto px-12 disabled:opacity-50 shadow-md hover:-translate-y-1"
                            >
                                {loading ? 'Subscribing...' : '📧 Subscribe Now'}
                            </button>

                            <p className="text-blue-900/50 text-xs font-medium">
                                We respect your privacy. Unsubscribe anytime. No spam.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
