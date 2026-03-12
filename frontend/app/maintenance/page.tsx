import React from 'react';

export default function MaintenancePage() {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-center items-center justify-center p-6 text-center font-jakarta">
            <div className="max-w-xl w-full space-y-12">
                <div className="relative inline-block mx-auto">
                    <div className="w-24 h-24 bg-primary/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto animate-pulse">
                        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase tracking-[0.2em]">Institutional Maintenance</h1>
                    <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                        Emmanuel Mental Specialized Hospital digital core is currently undergoing critical architectural synchronization.
                        Please return shortly as we recalibrate our primary communication channels.
                    </p>
                </div>

                <div className="pt-10 border-t border-white/5 grid grid-cols-2 gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <div>
                        <p className="mb-2 text-primary">Emergency Vector</p>
                        <p className="text-white text-lg">991</p>
                    </div>
                    <div>
                        <p className="mb-2 text-primary">Status Response</p>
                        <p className="text-white text-lg">Standby / 85%</p>
                    </div>
                </div>

                <p className="text-slate-600 text-[9px] uppercase tracking-[0.4em] pt-12">System ID: EMSH-CORE-52-DELTA</p>
            </div>
        </div>
    );
}
