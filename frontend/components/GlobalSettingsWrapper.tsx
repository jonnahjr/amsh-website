'use client';

import React from 'react';
import { useSettings } from '@/lib/settings-context';
import MaintenancePage from '@/app/maintenance/page';
import { usePathname } from 'next/navigation';

export function GlobalSettingsWrapper({ children }: { children: React.ReactNode }) {
    const { settings, loading } = useSettings();
    const pathname = usePathname();

    // Skip maintenance check for admin pages
    const isAdmin = pathname?.startsWith('/admin');

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-center font-jakarta">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] animate-pulse">Initializing System Core...</p>
                </div>
            </div>
        );
    }

    if (settings.maintenance_mode === 'true' && !isAdmin) {
        return <MaintenancePage />;
    }

    return <>{children}</>;
}
