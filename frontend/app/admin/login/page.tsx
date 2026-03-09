'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import {
    EnvelopeIcon,
    LockClosedIcon,
    ArrowRightIcon,
    ShieldCheckIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials. Please verify and retry.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary-dark flex items-center justify-center p-6 relative overflow-hidden font-inter">
            {/* Architectural Background */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 opacity-50" />

            <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-700">
                <div className="bg-white/10 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_32px_120px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10">
                    {/* Header Section */}
                    <div className="p-10 text-center pb-6">
                        <Link href="/" className="inline-flex items-center gap-4 mb-8 group">
                            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-2xl transition-transform group-hover:rotate-6">
                                <img src="/images/logo.png" alt="Logo" className="w-11 h-11 object-contain" />
                            </div>
                            <div className="text-left">
                                <h1 className="font-jakarta font-black text-2xl text-white tracking-tight leading-none">EMSH</h1>
                                <p className="text-[10px] text-accent font-black uppercase tracking-[0.3em] mt-2 opacity-80 whitespace-nowrap">Command Portal</p>
                            </div>
                        </Link>
                        <h2 className="text-2xl font-jakarta font-bold text-white tracking-tight mb-2">Secure Authentication</h2>
                        <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Authorized Personnel Access Only</p>
                    </div>

                    <div className="p-10 pt-0">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-5 py-4 rounded-2xl text-sm mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <ShieldCheckIcon className="w-5 h-5 text-red-400" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">System Identifier</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors">
                                        <EnvelopeIcon className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all font-medium"
                                        placeholder="staff@emsh.gov.et"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Access Protocol</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors">
                                        <LockClosedIcon className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all font-medium"
                                        placeholder="••••••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-[11px] px-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="peer sr-only" />
                                    <div className="w-4 h-4 border border-white/20 rounded bg-white/5 peer-checked:bg-accent peer-checked:border-accent transition-all flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-white/40 group-hover:text-white transition-colors font-bold uppercase tracking-widest">Persist Session</span>
                                </label>
                                <Link href="#" className="text-accent font-black uppercase tracking-widest hover:text-white transition-colors">Recovery</Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-accent text-white rounded-2xl font-black uppercase tracking-[0.25em] text-xs shadow-[0_20px_40px_rgba(0,180,216,0.3)] hover:shadow-[0_25px_50px_rgba(0,180,216,0.4)] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 flex items-center justify-center gap-3 group/btn"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        <span>Synchronizing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Secure Entrance</span>
                                        <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="px-10 py-8 bg-black/20 border-t border-white/5 text-center">
                        <p className="text-white/20 text-[10px] leading-relaxed uppercase tracking-[0.2em] font-bold">
                            End-to-End Encrypted Tunnel <br />
                            <span className="text-accent/30 font-black">Level 4 Clearance Required</span>
                        </p>
                    </div>
                </div>

                <Link href="/" className="flex items-center justify-center gap-2 mt-10 text-white/30 hover:text-white transition-colors group">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest leading-none">External Website</span>
                </Link>
            </div>
        </div>
    );
}

