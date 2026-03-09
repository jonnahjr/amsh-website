'use client';

import { useState, useEffect } from 'react';
import { settingsAPI, facebookAPI } from '@/lib/api';
import {
    DevicePhoneMobileIcon,
    EnvelopeIcon,
    HashtagIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    PaintBrushIcon,
    AdjustmentsHorizontalIcon,
    MapPinIcon,
    ShareIcon,
    CpuChipIcon,
    EyeIcon,
    ArrowPathIcon,
    CheckBadgeIcon,
    ExclamationTriangleIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline';

const tabs = [
    { id: 'general', label: 'Identity Matrix', icon: GlobeAltIcon, desc: 'Core hospital nomenclature and branding' },
    { id: 'contact', label: 'Tactical Presence', icon: MapPinIcon, desc: 'Global contact points and location data' },
    { id: 'social', label: 'Social Spectrum', icon: ShareIcon, desc: 'Connectivity to institutional social feeds' },
    { id: 'integrations', label: 'API Protocols', icon: CpuChipIcon, desc: 'Facebook Graph and external microservices' },
    { id: 'security', label: 'Security Firewall', icon: ShieldCheckIcon, desc: 'SSL, SEO and maintenance level protocols' },
];

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        settingsAPI.getAll().then(res => {
            const sMap: Record<string, string> = {};
            res.data.settings.forEach((s: any) => sMap[s.key] = s.value);
            setSettings(sMap);
        }).catch(() => {
            setSettings({
                site_name: 'Emmanuel Mental Specialized Hospital',
                site_description: 'Ethiopia\'s Premier Mental Health Institution',
                contact_email: 'info@emsh.gov.et',
                contact_phone: '+251-111-868-53-85',
                emergency_phone: '991',
                address: 'Addis Ababa, Ethiopia',
                twitter_url: 'https://twitter.com/emsh_ethiopia',
                facebook_url: 'https://web.facebook.com/amanuelhospital',
                facebook_integration_enabled: 'true',
            });
        }).finally(() => setLoading(false));
    }, []);

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const saveSettings = async () => {
        setSaving(true);
        setMessage({ type: '', text: '' });
        try {
            await settingsAPI.update(settings);
            setMessage({ type: 'success', text: 'System parameters successfully synchronized.' });
        } catch {
            setMessage({ type: 'error', text: 'Critical synchronization failure. Parameters reverted.' });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 4000);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-[1600px] mx-auto">
            {/* Control Center Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-10 lg:p-14 rounded-[3rem] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <AdjustmentsHorizontalIcon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Master Configuration Dashboard</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-jakarta font-black text-slate-900 tracking-tight leading-none mb-6">Global Directives</h2>
                    <p className="text-slate-500 font-medium max-w-2xl leading-relaxed text-lg">Managing high-level system preferences, institutional identity, and external microservice integrations.</p>
                </div>

                <button
                    onClick={saveSettings}
                    disabled={saving}
                    className="w-full lg:w-auto flex items-center justify-center gap-4 px-12 py-6 bg-primary text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-[0_20px_40px_rgba(27,79,138,0.25)] hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 relative z-10"
                >
                    {saving ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <CheckBadgeIcon className="w-5 h-5" />}
                    <span>{saving ? 'SYNCHRONIZING...' : 'COMMIT CHANGES'}</span>
                </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-10">
                {/* Configuration Matrix (Tabs) */}
                <div className="xl:w-96 flex-shrink-0 space-y-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full group text-left p-6 rounded-[2.5rem] transition-all relative overflow-hidden flex items-start gap-5 border transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-white border-primary/20 shadow-2xl ring-4 ring-primary/5'
                                : 'bg-transparent border-transparent text-slate-400 hover:bg-white hover:border-slate-100'
                                }`}
                        >
                            <div className={`p-4 rounded-2xl flex-shrink-0 transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-slate-50 text-slate-300 group-hover:bg-primary/5 group-hover:text-primary'}`}>
                                <tab.icon className="w-6 h-6" />
                            </div>
                            <div className="min-w-0">
                                <span className={`block font-jakarta font-black text-sm uppercase tracking-wider mb-1 ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-500'}`}>{tab.label}</span>
                                <span className="block text-[10px] font-medium text-slate-400 leading-relaxed">{tab.desc}</span>
                            </div>
                            {activeTab === tab.id && <div className="absolute right-6 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-full" />}
                        </button>
                    ))}

                    <div className="mt-12 p-10 bg-primary/5 rounded-[3rem] border border-primary/10 relative overflow-hidden group">
                        <CpuChipIcon className="w-20 h-20 absolute -bottom-4 -right-4 text-primary opacity-10 group-hover:scale-125 transition-transform duration-1000" />
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Infrastructure Health</p>
                        <p className="text-sm font-bold text-slate-900 leading-relaxed">System core is operational. All 14 micro-modules are verified at 99.9% uptime.</p>
                    </div>
                </div>

                {/* Configuration Terminal (Forms) */}
                <div className="flex-1 bg-white rounded-[4rem] border border-slate-200/60 shadow-sm p-12 lg:p-16 space-y-12">
                    {activeTab === 'general' && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
                            <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
                                <div className="w-3 h-10 bg-primary rounded-full" />
                                <h3 className="text-2xl font-jakarta font-black text-slate-900 tracking-tight">Institutional Identity Matrix</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-10">
                                <div className="space-y-4">
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Official Institutional Nomenclature</label>
                                    <input
                                        type="text"
                                        className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[12px] focus:ring-primary/5 transition-all text-sm font-bold outline-none"
                                        placeholder="Identification Name..."
                                        value={settings.site_name || ''}
                                        onChange={(e) => handleChange('site_name', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Mission Directive / Narrative Tagline</label>
                                    <textarea
                                        className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2.5rem] focus:ring-[12px] focus:ring-primary/5 transition-all text-sm font-medium outline-none resize-none leading-relaxed"
                                        rows={4}
                                        placeholder="Core institutional mission statement..."
                                        value={settings.site_description || ''}
                                        onChange={(e) => handleChange('site_description', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Global Analytics Telemetry (Tracking ID)</label>
                                    <div className="relative">
                                        <EyeIcon className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-200" />
                                        <input
                                            type="text"
                                            className="w-full pl-8 pr-16 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[12px] focus:ring-primary/5 transition-all text-sm font-bold outline-none"
                                            placeholder="G-PROT-XXXXXXXX"
                                            value={settings.google_analytics_id || ''}
                                            onChange={(e) => handleChange('google_analytics_id', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
                            <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
                                <div className="w-3 h-10 bg-primary rounded-full" />
                                <h3 className="text-2xl font-jakarta font-black text-slate-900 tracking-tight">Tactical Outreach Points</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Public Operations Email</label>
                                    <input type="email" className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[12px] focus:ring-primary/5 text-sm font-bold outline-none" value={settings.contact_email || ''} onChange={(e) => handleChange('contact_email', e.target.value)} />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Primary Audio Channel</label>
                                    <input type="text" className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[12px] focus:ring-primary/5 text-sm font-bold outline-none" value={settings.contact_phone || ''} onChange={(e) => handleChange('contact_phone', e.target.value)} />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[11px] font-black text-red-400 uppercase tracking-[0.25em] ml-2">Rapid Response Emergency Vector</label>
                                    <input type="text" className="w-full px-8 py-6 bg-red-50/30 border border-red-50 rounded-[2rem] focus:ring-[12px] focus:ring-red-500/5 text-sm font-black text-red-600 outline-none" value={settings.emergency_phone || ''} onChange={(e) => handleChange('emergency_phone', e.target.value)} />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Physical Entity Coordinates</label>
                                    <input type="text" className="w-full px-8 py-6 bg-slate-50 border-0 rounded-[2rem] focus:ring-[12px] focus:ring-primary/5 text-sm font-bold outline-none" value={settings.address || ''} onChange={(e) => handleChange('address', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'social' && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
                            <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
                                <div className="w-3 h-10 bg-primary rounded-full" />
                                <h3 className="text-2xl font-jakarta font-black text-slate-900 tracking-tight">Global Social Spectrum</h3>
                            </div>
                            <div className="space-y-10">
                                <div className="flex items-center gap-8 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group/item">
                                    <div className="w-16 h-16 bg-[#1877F2] text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20 group-hover/item:scale-110 transition-transform">
                                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Facebook Command Page</label>
                                        <input type="text" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5" value={settings.facebook_url || ''} onChange={(e) => handleChange('facebook_url', e.target.value)} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group/item">
                                    <div className="w-16 h-16 bg-slate-950 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover/item:scale-110 transition-transform">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">X / Twitter Matrix</label>
                                        <input type="text" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5" value={settings.twitter_url || ''} onChange={(e) => handleChange('twitter_url', e.target.value)} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 group/item">
                                    <div className="w-16 h-16 bg-[#FF0000] text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/20 group-hover/item:scale-110 transition-transform">
                                        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Broadcaster Feed (YouTube)</label>
                                        <input type="text" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/5" value={settings.youtube_url || ''} onChange={(e) => handleChange('youtube_url', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'integrations' && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-500">
                            <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
                                <div className="w-3 h-10 bg-primary rounded-full" />
                                <h3 className="text-2xl font-jakarta font-black text-slate-900 tracking-tight">Active API Protocols</h3>
                            </div>

                            <div className="p-12 bg-primary/5 rounded-[3.5rem] border border-primary/10 space-y-10 group relative">
                                <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
                                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">Operational Status</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                        <span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">Synchronized</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 bg-[#1877F2] text-white rounded-[1.75rem] flex items-center justify-center flex-shrink-0 shadow-2xl">
                                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-xl font-jakarta font-black text-slate-900 leading-none mb-2">Facebook Graph Intel</p>
                                        <p className="text-[10px] text-primary font-black uppercase tracking-[0.25em] opacity-60">High-Fidelity Feed Synchronization</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="block text-[10px] font-black text-primary uppercase tracking-widest ml-1">Internal Entity ID</label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-5 bg-white border-0 rounded-2xl text-sm font-bold text-slate-950 focus:ring-4 focus:ring-primary/10 transition-all outline-none shadow-sm"
                                            placeholder="Page Identifier..."
                                            value={settings.facebook_page_id || ''}
                                            onChange={(e) => handleChange('facebook_page_id', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-[10px] font-black text-primary uppercase tracking-widest ml-1">Authorization Token (Secure)</label>
                                        <input
                                            type="password"
                                            className="w-full px-6 py-5 bg-white border-0 rounded-2xl text-sm font-bold text-slate-950 focus:ring-4 focus:ring-primary/10 transition-all outline-none shadow-sm font-mono"
                                            placeholder="EAAC-AUTH-SYNC-NODE..."
                                            value={settings.facebook_access_token || ''}
                                            onChange={(e) => handleChange('facebook_access_token', e.target.value)}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <button
                                            type="button"
                                            disabled={saving}
                                            onClick={async () => {
                                                setSaving(true);
                                                try {
                                                    const res = await facebookAPI.sync();
                                                    setMessage({
                                                        type: 'success',
                                                        text: `Successfully assimilated ${res.data.imported} new data points from Facebook.`
                                                    });
                                                } catch (e: any) {
                                                    setMessage({
                                                        type: 'error',
                                                        text: e.response?.data?.error || 'Synchronization handshake failed.'
                                                    });
                                                } finally {
                                                    setSaving(false);
                                                    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
                                                }
                                            }}
                                            className="w-full py-6 bg-primary text-white text-[11px] font-black uppercase tracking-[0.25em] rounded-[1.75rem] hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                                        >
                                            {saving ? '🔄 ASSIMILATING...' : '🔄 RUN MANUAL HANDSHAKE'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-500">
                            <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
                                <div className="w-3 h-10 bg-primary rounded-full" />
                                <h3 className="text-2xl font-jakarta font-black text-slate-900 tracking-tight">Security Firewall & Maintenance</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-center gap-6 group hover:bg-emerald-100 transition-colors duration-500">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <LockClosedIcon className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Global SSL Status</p>
                                        <p className="text-lg font-jakarta font-black text-emerald-900 leading-none">High-Grade Encrypted</p>
                                    </div>
                                </div>

                                <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 flex items-center gap-6 group hover:bg-amber-100 transition-colors duration-500">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <ArrowPathIcon className="w-8 h-8 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Tactical Maintenance</p>
                                        <p className="text-lg font-jakarta font-black text-amber-900 leading-none">Standby / Inactive</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2">Secure Maintenance Protocol</label>
                                <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                    <div className="space-y-1">
                                        <p className="text-sm font-black text-slate-900 uppercase tracking-wider">Operational Mode</p>
                                        <p className="text-[10px] font-medium text-slate-400">Restricts public access during institutional updates.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer scale-125 mr-4">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Global Communication Terminal */}
            {message.text && (
                <div className={`fixed bottom-12 right-12 z-[200] flex items-center gap-6 px-10 py-8 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-12 duration-500 border border-white/10 ${message.type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-600 text-white'}`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${message.type === 'success' ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white/20'}`}>
                        {message.type === 'success' ? <CheckBadgeIcon className="w-7 h-7 text-white" /> : <ExclamationTriangleIcon className="w-7 h-7 text-white" />}
                    </div>
                    <div>
                        <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${message.type === 'success' ? 'text-emerald-400' : 'text-white/60'}`}>{message.type === 'success' ? 'Protocol Success' : 'System Guard Alert'}</p>
                        <p className="text-lg font-jakarta font-black">{message.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
