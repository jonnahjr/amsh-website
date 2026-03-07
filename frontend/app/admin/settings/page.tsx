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
} from '@heroicons/react/24/outline';

const tabs = [
    { id: 'general', label: 'General', icon: GlobeAltIcon },
    { id: 'contact', label: 'Contact & Location', icon: EnvelopeIcon },
    { id: 'social', label: 'Social Media', icon: HashtagIcon },
    { id: 'integrations', label: 'Integrations', icon: PaintBrushIcon },
    { id: 'appearance', label: 'Appearance', icon: PaintBrushIcon },
    { id: 'security', label: 'Security & SEO', icon: ShieldCheckIcon },
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
            // Demo defaults
            setSettings({
                site_name: 'Emmanuel Mental Specialized Hospital',
                site_description: 'Ethiopia\'s Premier Mental Health Institution',
                contact_email: 'info@emsh.gov.et',
                contact_phone: '+251-111-868-53-85',
                emergency_phone: '991',
                address: 'Addis Ababa, Ethiopia',
                twitter_url: 'https://twitter.com/emsh_ethiopia',
                facebook_url: 'https://web.facebook.com/p/Amanuel-mental-specialized-hospital-100064026784319/?_rdc=1&_rdr#',
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
            setMessage({ type: 'success', text: 'Settings updated successfully!' });
        } catch {
            setMessage({ type: 'error', text: 'Failed to update settings' });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-gray-900">Site Settings</h2>
                    <p className="text-gray-500 text-sm">Control the overall behavior and text of your hospital website.</p>
                </div>
                <button
                    onClick={saveSettings}
                    disabled={saving}
                    className="btn-primary"
                >
                    {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '💾'}
                    <span>{saving ? 'Saving...' : 'Save Settings'}</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="md:w-64 flex-shrink-0 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${activeTab === tab.id
                                ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20'
                                : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <tab.icon className="w-5 h-5 flex-shrink-0" />
                            <span className="font-bold text-sm">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Settings Form */}
                <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm border-b border-gray-50 pb-4">General Website Info</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Hospital Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={settings.site_name || ''}
                                        onChange={(e) => handleChange('site_name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Site Description/Tagline</label>
                                    <textarea
                                        className="form-input"
                                        rows={3}
                                        value={settings.site_description || ''}
                                        onChange={(e) => handleChange('site_description', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Google Analytics ID</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="G-XXXXXXXXXX"
                                        value={settings.google_analytics_id || ''}
                                        onChange={(e) => handleChange('google_analytics_id', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="space-y-6">
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm border-b border-gray-50 pb-4">Contact Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Public Email</label>
                                    <input type="email" className="form-input" value={settings.contact_email || ''} onChange={(e) => handleChange('contact_email', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Main Phone</label>
                                    <input type="text" className="form-input" value={settings.contact_phone || ''} onChange={(e) => handleChange('contact_phone', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Emergency Hub</label>
                                    <input type="text" className="form-input font-black text-red-600 border-red-100" value={settings.emergency_phone || ''} onChange={(e) => handleChange('emergency_phone', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Address</label>
                                    <input type="text" className="form-input" value={settings.address || ''} onChange={(e) => handleChange('address', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'social' && (
                        <div className="space-y-6">
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm border-b border-gray-50 pb-4">Social Presence</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Facebook Page URL</label>
                                    <input type="text" className="form-input" placeholder="https://..." value={settings.facebook_url || ''} onChange={(e) => handleChange('facebook_url', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Twitter / X URL</label>
                                    <input type="text" className="form-input" placeholder="https://..." value={settings.twitter_url || ''} onChange={(e) => handleChange('twitter_url', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">YouTube Channel</label>
                                    <input type="text" className="form-input" placeholder="https://..." value={settings.youtube_url || ''} onChange={(e) => handleChange('youtube_url', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'integrations' && (
                        <div className="space-y-6">
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm border-b border-gray-50 pb-4">API Integrations</h3>

                            <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#1877F2] text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-blue-900 uppercase tracking-widest">Facebook Graph API</p>
                                            <p className="text-[10px] text-blue-600/60 font-medium">Automatic News Feed Synchronization</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={settings.facebook_integration_enabled === 'true'}
                                            onChange={(e) => handleChange('facebook_integration_enabled', e.target.checked ? 'true' : 'false')}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                                    </label>
                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            disabled={saving}
                                            onClick={async () => {
                                                setSaving(true);
                                                try {
                                                    const res = await facebookAPI.sync();
                                                    setMessage({
                                                        type: 'success',
                                                        text: `Successfully imported ${res.data.imported} new reports from Facebook!`
                                                    });
                                                } catch (e: any) {
                                                    setMessage({
                                                        type: 'error',
                                                        text: e.response?.data?.error || 'Failed to sync with Facebook'
                                                    });
                                                } finally {
                                                    setSaving(false);
                                                    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
                                                }
                                            }}
                                            className="w-full py-3 bg-blue-900/5 text-blue-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-900 hover:text-white transition-all border border-blue-900/20 disabled:opacity-50"
                                        >
                                            {saving ? '🔄 Syncing...' : '🔄 Run Manual Sync Now'}
                                        </button>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-blue-900/40 uppercase tracking-widest mb-1.5 ml-1">Facebook Page ID</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-white border border-blue-100 rounded-xl text-sm font-bold text-blue-950 focus:ring-2 focus:ring-blue-900 transition-all outline-none shadow-inner"
                                            placeholder="e.g. 1029384756..."
                                            value={settings.facebook_page_id || ''}
                                            onChange={(e) => handleChange('facebook_page_id', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-blue-900/40 uppercase tracking-widest mb-1.5 ml-1">Page Access Token</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 bg-white border border-blue-100 rounded-xl text-sm font-bold text-blue-950 focus:ring-2 focus:ring-blue-900 transition-all outline-none shadow-inner"
                                            placeholder="EAAC..."
                                            value={settings.facebook_access_token || ''}
                                            onChange={(e) => handleChange('facebook_access_token', e.target.value)}
                                        />
                                        <p className="text-[10px] text-blue-400 mt-2 flex items-center gap-1 leading-relaxed">
                                            <span>💡</span> Use a long-lived Page Access Token from Facebook Developers Portal for stable synchronization.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-200 opacity-50 grayscale select-none">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Upcoming Integrations</p>
                                <div className="flex gap-4">
                                    {['Google Maps', 'WhatsApp Business', 'Instagram Feed'].map(tool => (
                                        <span key={tool} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-500">{tool}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm border-b border-gray-50 pb-4">System Security</h3>
                            <div className="p-4 bg-blue-50 rounded-2xl flex items-center gap-4">
                                <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
                                <div>
                                    <p className="text-sm font-bold text-blue-900">SSL Certificate is Active</p>
                                    <p className="text-xs text-blue-400">All data transmissions are encrypted via HTTPS.</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Maintenance Mode</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                                    <span className="ml-3 text-sm font-bold text-gray-500 uppercase tracking-widest">Disabled</span>
                                </label>
                            </div>
                        </div>
                    )}
                    {activeTab === 'appearance' && (
                        <div className="space-y-6 text-center py-12">
                            <div className="text-4xl mb-4">🎨</div>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Appearance Module coming soon</p>
                            <p className="text-xs text-gray-300">Theme customization and color management assets.</p>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm border-b border-gray-50 pb-4">System Security</h3>
                            <div className="p-4 bg-blue-50 rounded-2xl flex items-center gap-4">
                                <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
                                <div>
                                    <p className="text-sm font-bold text-blue-900">SSL Certificate is Active</p>
                                    <p className="text-xs text-blue-400">All data transmissions are encrypted via HTTPS.</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Maintenance Mode</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                                    <span className="ml-3 text-sm font-bold text-gray-500 uppercase tracking-widest">Disabled</span>
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {message.text && (
                <div className={`fixed bottom-8 right-8 px-6 py-4 rounded-2xl shadow-2xl animate-fade-in-up flex items-center gap-3 text-white font-bold ${message.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
                    }`}>
                    <span>{message.type === 'success' ? '✅' : '⚠️'}</span>
                    {message.text}
                </div>
            )}
        </div>
    );
}
