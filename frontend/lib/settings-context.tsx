'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsAPI } from './api';

interface SettingsContextType {
    settings: Record<string, string>;
    loading: boolean;
    getSetting: (key: string, defaultValue?: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await settingsAPI.getAll();
                setSettings(res.data.settings || {});
            } catch (error) {
                console.error('Failed to fetch global settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const getSetting = (key: string, defaultValue: string = '') => {
        return settings[key] || defaultValue;
    };

    return (
        <SettingsContext.Provider value={{ settings, loading, getSetting }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
