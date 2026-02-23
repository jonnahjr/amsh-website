'use client';

import Link from 'next/link';

interface PlaceholderProps {
    title: string;
    description: string;
    icon?: string;
}

export default function Placeholder({ title, description, icon = '🛠️' }: PlaceholderProps) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-8">
            <div className="max-w-md w-full text-center space-y-6 bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 animate-fade-in">
                <div className="text-7xl mb-6">{icon}</div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h2>
                <p className="text-gray-500 font-medium leading-relaxed">
                    {description} This module is currently under development to provide the best possible management experience.
                </p>
                <div className="pt-4 px-4 flex flex-col gap-3">
                    <Link
                        href="/admin/dashboard"
                        className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-blue-900/20 transition-all active:scale-95"
                    >
                        Return to Dashboard
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="text-blue-900 font-black text-sm uppercase tracking-widest hover:underline"
                    >
                        ← Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
