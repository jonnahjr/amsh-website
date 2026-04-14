'use client';

import {
    AcademicCapIcon,
    BuildingOfficeIcon,
    DocumentMagnifyingGlassIcon,
    EnvelopeIcon,
    IdentificationIcon,
    PhoneIcon,
    UserIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { resolveImageUrl } from '@/lib/api';
import { useState } from 'react';

interface CPDDetailsModalProps {
    profile: any;
    onClose: () => void;
    onStatusUpdate: (id: string, status: string) => void;
}

export default function CPDDetailsModal({ profile, onClose, onStatusUpdate }: CPDDetailsModalProps) {
    const [viewingDocument, setViewingDocument] = useState<{title: string, type: string, filename?: string} | null>(null);

    const getDocFilename = (reg: any, docType: string) => {
        if (!reg?.certificate) return null;
        try {
            const certs = JSON.parse(reg.certificate);
            return certs[docType] || null;
        } catch (e) {
            return null;
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-white rounded-[3rem] w-full max-w-2xl p-8 md:p-14 shadow-2xl relative animate-in zoom-in-95 duration-500 overflow-y-auto max-h-[90vh]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 p-4 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-colors border border-slate-100 shadow-sm"
                    >
                        <XMarkIcon className="w-5 h-5 stroke-[3]" />
                    </button>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 relative z-10 w-full pr-16">
                        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary border border-primary/20 shadow-inner flex-shrink-0">
                            <UserIcon className="w-10 h-10" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl md:text-3xl font-jakarta font-black text-slate-900 leading-tight truncate">{profile.firstName} {profile.lastName}</h2>
                            <p className="text-[11px] font-black tracking-[0.2em] text-primary uppercase mt-2">{profile.profession}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm sm:col-span-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Applied Course Program</p>
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                                <div className="p-2 bg-primary/10 rounded-lg"><AcademicCapIcon className="w-5 h-5 text-primary" /></div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">{profile.course?.title || 'GENERAL PROTOCOL'}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Date: {new Date(profile.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Workplace Profile</p>
                            <p className="text-sm font-bold text-slate-900 flex items-center gap-3"><BuildingOfficeIcon className="w-5 h-5 text-primary" />{profile.workplace || 'N/A'}</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">License Number</p>
                            <p className="text-sm font-bold text-slate-900 flex items-center gap-3"><IdentificationIcon className="w-5 h-5 text-primary" />{profile.licenseNo || 'N/A'}</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Registration Category</p>
                            <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{profile.category || 'PERSONAL'}</p>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Contact Signal</p>
                            <div className="space-y-3">
                                <p className="text-[11px] font-bold text-slate-900 flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200"><PhoneIcon className="w-4 h-4 text-primary" />{profile.phone}</p>
                                <p className="text-[11px] font-bold text-slate-900 flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 truncate" title={profile.email}><EnvelopeIcon className="w-4 h-4 text-primary flex-shrink-0" /><span className="truncate">{profile.email}</span></p>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm sm:col-span-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Attached Documents</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <button onClick={() => setViewingDocument({title: 'Prof. License', type: 'Professional License Document', filename: getDocFilename(profile, 'licenseDoc')})} className="flex flex-col items-center justify-center p-4 bg-white hover:bg-primary/5 border border-slate-200 hover:border-primary/30 rounded-2xl transition-all group outline-none">
                                    <DocumentMagnifyingGlassIcon className={`w-8 h-8 ${getDocFilename(profile, 'licenseDoc') ? 'text-primary/80 group-hover:text-primary' : 'text-slate-300'} mb-2 transition-colors`} />
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center">Prof. License</span>
                                </button>
                                <button onClick={() => setViewingDocument({title: 'National ID', type: 'National ID / Passport Scan', filename: getDocFilename(profile, 'idDoc')})} className="flex flex-col items-center justify-center p-4 bg-white hover:bg-primary/5 border border-slate-200 hover:border-primary/30 rounded-2xl transition-all group outline-none">
                                    <IdentificationIcon className={`w-8 h-8 ${getDocFilename(profile, 'idDoc') ? 'text-primary/80 group-hover:text-primary' : 'text-slate-300'} mb-2 transition-colors`} />
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center">National ID</span>
                                </button>
                                <button onClick={() => setViewingDocument({title: 'Payment Slip', type: 'Official Payment Receipt', filename: getDocFilename(profile, 'paymentDoc')})} className="flex flex-col items-center justify-center p-4 bg-white hover:bg-primary/5 border border-slate-200 hover:border-primary/30 rounded-2xl transition-all group outline-none">
                                    <AcademicCapIcon className={`w-8 h-8 ${getDocFilename(profile, 'paymentDoc') ? 'text-primary/80 group-hover:text-primary' : 'text-slate-300'} mb-2 transition-colors`} />
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center">Payment Slip</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 relative z-10 pt-8 border-t border-slate-100">
                        <button onClick={() => { onStatusUpdate(profile.id, 'APPROVED'); onClose(); }} className="flex-1 py-5 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-100 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all shadow-sm hover:shadow-emerald-500/30 hover:-translate-y-1">Approve Application</button>
                        <button onClick={() => { onStatusUpdate(profile.id, 'REJECTED'); onClose(); }} className="flex-1 py-5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-100 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all shadow-sm hover:shadow-red-500/30 hover:-translate-y-1">Reject Protocol</button>
                    </div>
                </div>
            </div>

            {/* Document Viewer Modal Overlay */}
            {viewingDocument && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-slate-100 rounded-[2rem] w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-500 overflow-hidden border border-slate-700">
                        
                        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shadow-sm z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-xl text-primary"><DocumentMagnifyingGlassIcon className="w-6 h-6" /></div>
                                <div>
                                    <h3 className="font-black text-slate-900 text-lg leading-tight">{viewingDocument.title}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{viewingDocument.type} • Secured View</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setViewingDocument(null)}
                                className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-colors border border-slate-100 outline-none"
                            >
                                <XMarkIcon className="w-6 h-6 stroke-[3]" />
                            </button>
                        </div>
                        
                        <div className="flex-1 relative bg-slate-200/50">
                            {viewingDocument.filename ? (
                                <iframe 
                                    src={resolveImageUrl(viewingDocument.filename)} 
                                    className="w-full h-full border-0 absolute inset-0 bg-slate-200/50" 
                                    title={viewingDocument.title} 
                                />
                            ) : (
                                <div className="absolute inset-0 p-6 md:p-12 overflow-y-auto flex items-center justify-center">
                                    <div className="w-full max-w-[600px] bg-white aspect-[1/1.4] rounded-md shadow-2xl flex flex-col items-center p-12 md:p-20 relative">
                                        <div className="absolute top-0 left-0 w-full h-4 bg-primary rounded-t-md" />
                                        <AcademicCapIcon className="w-20 h-20 text-slate-200 mb-6" />
                                        <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-800 border-b-2 border-slate-200 pb-6 w-full text-center uppercase tracking-widest mb-12">
                                            {viewingDocument.type}
                                        </h1>
                                        <div className="w-full space-y-8">
                                            <div className="flex justify-between border-b border-slate-100 pb-3">
                                                <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Applicant Origin</span>
                                                <span className="text-sm font-black text-slate-900 uppercase">{profile.firstName} {profile.lastName}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-slate-100 pb-3">
                                                <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Reference Hash</span>
                                                <span className="text-sm font-black text-slate-900 font-mono tracking-widest">{profile.id.substring(0,10).toUpperCase()}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-slate-100 pb-3">
                                                <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Verification Status</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-xs font-black tracking-widest text-emerald-600 uppercase">Legacy Secured Form</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
