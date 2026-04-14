'use client';

import {
    BuildingOfficeIcon,
    DocumentMagnifyingGlassIcon,
    IdentificationIcon,
    UserGroupIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { resolveImageUrl } from '@/lib/api';
import { useState } from 'react';

interface SubmissionDetailsModalProps {
    submission: any;
    onClose: () => void;
    onStatusUpdate: (id: string, status: string) => void;
}

export default function SubmissionDetailsModal({ submission, onClose, onStatusUpdate }: SubmissionDetailsModalProps) {
    const data = JSON.parse(submission.data || '{}');
    const [viewingDocument, setViewingDocument] = useState<{title: string, filename: string} | null>(null);

    const attachments = data.attachments || [];

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
                            <BuildingOfficeIcon className="w-10 h-10" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl md:text-3xl font-jakarta font-black text-slate-900 leading-tight truncate">{data.institutionName || 'INDEPENDENT APPLICANT'}</h2>
                            <p className="text-[11px] font-black tracking-[0.2em] text-primary uppercase mt-2">{data.profession || 'Clinical Rotation'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm sm:col-span-2 text-center py-10">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Tactical Lead</p>
                            <h4 className="text-xl font-jakarta font-black text-slate-900">{data.contactPerson}</h4>
                            <p className="text-sm font-bold text-slate-500">{data.email}</p>
                        </div>
                        
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Student Deployment</p>
                            <div className="flex items-center gap-3">
                                <UserGroupIcon className="w-6 h-6 text-primary" />
                                <span className="text-xl font-black text-slate-900">{data.studentCount || '0'} Students</span>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Submission Timestamp</p>
                            <p className="text-sm font-bold text-slate-900">{new Date(submission.createdAt).toLocaleString()}</p>
                        </div>

                        {data.additionalNotes && (
                            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm sm:col-span-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Institutional Directive (Notes)</p>
                                <p className="text-sm font-medium text-slate-600 italic">"{data.additionalNotes}"</p>
                            </div>
                        )}

                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm sm:col-span-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Verification Artifacts (Attachments)</p>
                            {attachments.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {attachments.map((file: any, idx: number) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setViewingDocument({title: file.originalName, filename: file.filename})}
                                            className="flex items-center gap-4 p-4 bg-white hover:bg-primary/5 border border-slate-200 hover:border-primary/30 rounded-2xl transition-all group"
                                        >
                                            <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-primary/10 transition-colors">
                                                <IdentificationIcon className="w-6 h-6 text-slate-400 group-hover:text-primary" />
                                            </div>
                                            <div className="text-left overflow-hidden">
                                                <p className="text-[10px] font-black text-slate-900 uppercase truncate">{file.originalName}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Document Node</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-[2rem]">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No Electronic Artifacts Detected</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 relative z-10 pt-8 border-t border-slate-100">
                        <button onClick={() => { onStatusUpdate(submission.id, 'APPROVED'); onClose(); }} className="flex-1 py-5 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-100 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all shadow-sm hover:shadow-emerald-500/30 hover:-translate-y-1">Authorize Attachment</button>
                        <button onClick={() => { onStatusUpdate(submission.id, 'REJECTED'); onClose(); }} className="flex-1 py-5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-100 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all shadow-sm hover:shadow-red-500/30 hover:-translate-y-1">Decommission Request</button>
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
                                    <h3 className="font-black text-slate-900 text-lg leading-tight truncate max-w-[200px]">{viewingDocument.title}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Verified Secure View</p>
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
                            <iframe 
                                src={resolveImageUrl(viewingDocument.filename)} 
                                className="w-full h-full border-0 absolute inset-0" 
                                title={viewingDocument.title} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
