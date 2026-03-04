'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from './api';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAdmin: boolean;
    isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('emsh_token');
        if (token) {
            authAPI.me()
                .then((res) => setUser(res.data.user))
                .catch(() => {
                    localStorage.removeItem('emsh_token');
                    localStorage.removeItem('emsh_refresh_token');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const res = await authAPI.login(email, password);
        const { user, token, refreshToken } = res.data;
        localStorage.setItem('emsh_token', token);
        localStorage.setItem('emsh_refresh_token', refreshToken);
        setUser(user);
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (_) { }
        localStorage.removeItem('emsh_token');
        localStorage.removeItem('emsh_refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            isAdmin: ['ADMIN', 'SUPER_ADMIN', 'EDITOR'].includes(user?.role || ''),
            isSuperAdmin: user?.role === 'SUPER_ADMIN',
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
