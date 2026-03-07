'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

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
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

            <div className="max-w-md w-full relative z-10">
                <div className="glass backdrop-blur-3xl rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10">
                    <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-8 text-center text-white border-b border-white/5">
                        <Link href="/" className="inline-flex items-center gap-4 mb-6 group">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl p-1 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform border border-white/20">
                                <img src="/images/logo.png" alt="EMSH Logo" className="w-full h-full object-contain brightness-110" />
                            </div>
                            <div className="text-left">
                                <div className="font-black text-2xl leading-tight text-white tracking-tight">EMSH</div>
                                <div className="text-[10px] text-blue-300 uppercase tracking-widest font-black opacity-80">Admin Portal</div>
                            </div>
                        </Link>
                        <h1 className="text-2xl font-black tracking-tight">Welcome Back</h1>
                        <p className="text-blue-200/60 text-xs font-bold uppercase tracking-widest mt-2">Staff Authentication</p>
                    </div>

                    <div className="p-10">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-2xl text-sm mb-6 flex items-center gap-3 backdrop-blur-md">
                                <span className="text-lg">⚠️</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-blue-300 uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
                                <div className="relative group">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors">📧</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-14 pr-6 py-4 glass-input text-white placeholder-white/20"
                                        placeholder="staff@EMSH.gov.et"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-blue-300 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
                                <div className="relative group">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors">🔒</span>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-14 pr-6 py-4 glass-input text-white placeholder-white/20"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input type="checkbox" className="peer sr-only" />
                                        <div className="w-5 h-5 border border-white/20 rounded-md bg-white/5 transition-all peer-checked:bg-blue-600 peer-checked:border-blue-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform">✓</div>
                                    </div>
                                    <span className="text-white/50 group-hover:text-white transition-colors">Remember device</span>
                                </label>
                                <Link href="#" className="text-cyan-400 font-black uppercase tracking-widest hover:text-cyan-300 transition-colors">Forgot?</Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-[1.25rem] font-black uppercase tracking-[0.2em] text-sm shadow-[0_15px_30px_rgba(37,99,235,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    'Secure Login'
                                )}
                            </button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-white/5 text-center">
                            <p className="text-white/30 text-[10px] leading-relaxed uppercase tracking-widest font-bold">
                                Restricted Portal <br /> Authorized Personnel Only
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-gray-500 text-sm hover:text-white transition-colors">
                        ← Back to Public Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
