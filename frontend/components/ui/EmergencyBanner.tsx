'use client';

import { useSettings } from '@/lib/settings-context';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function EmergencyBanner() {
    const { getSetting } = useSettings();
    const [isVisible, setIsVisible] = useState(false);

    const isEnabled = getSetting('site_alert_enabled', 'false') === 'true';
    const alertText = getSetting('site_alert_text', '');

    useEffect(() => {
        if (isEnabled && alertText) {
            setIsVisible(true);
        }
    }, [isEnabled, alertText]);

    if (!isVisible || !isEnabled || !alertText) return null;

    return (
        <div className="bg-red-600 text-white py-3 px-4 relative overflow-hidden animate-in slide-in-from-top duration-500 z-[100]">
            <div className="container-custom flex items-center justify-center gap-4 text-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center animate-pulse">
                        <ExclamationTriangleIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 hidden sm:inline">Priority Alert Protocol:</span>
                </div>
                <p className="font-bold text-sm sm:text-base tracking-tight leading-tight max-w-4xl">
                    {alertText}
                </p>
                <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors ml-2"
                >
                    <XMarkIcon className="w-5 h-5 text-white" />
                </button>
            </div>
            {/* Background pattern for urgency */}
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
            </div>
        </div>
    );
}
