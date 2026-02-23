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
        <section className="section bg-gray-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 text-cyan-300 rounded-full text-sm font-semibold mb-6">
                        ✉️ Newsletter
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                        Stay Updated with AMSH
                    </h2>
                    <p className="text-gray-400 text-lg mb-10">
                        Subscribe to our newsletter to receive the latest news, research updates,
                        CPD announcements, and health information from AMSH.
                    </p>

                    {success ? (
                        <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-2xl p-6">
                            <div className="text-4xl mb-3">✅</div>
                            <h3 className="font-bold text-xl mb-2">Successfully Subscribed!</h3>
                            <p className="text-emerald-200">Thank you for subscribing to the AMSH newsletter. You'll receive our latest updates soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name (optional)"
                                    className="flex-1 px-5 py-4 glass-input text-white placeholder-gray-400"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email Address"
                                    required
                                    className="flex-1 px-5 py-4 glass-input text-white placeholder-gray-400"
                                />
                            </div>

                            {error && <p className="text-red-400 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-accent text-base py-4 w-full sm:w-auto sm:mx-auto px-12 disabled:opacity-50"
                            >
                                {loading ? 'Subscribing...' : '📧 Subscribe Now'}
                            </button>

                            <p className="text-gray-500 text-xs">
                                We respect your privacy. Unsubscribe anytime. No spam.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
