'use client';

import { useState, useEffect } from 'react';
import { testimonialsAPI } from '@/lib/api';

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);

    const defaults = [
        { id: '1', name: 'Dawit Bekele', role: 'Patient Family Member', content: 'AMSH provided exceptional care for my family member during a crisis. The staff were professional, compassionate, and thorough. We are eternally grateful for their support.', rating: 5 },
        { id: '2', name: 'Dr. Almaz Tesfaye', role: 'Healthcare Professional', content: 'The CPD programs at AMSH are world-class. I have enhanced my psychiatric skills significantly and apply new knowledge every day in my practice.', rating: 5 },
        { id: '3', name: 'Hana Girma', role: 'Research Collaborator', content: 'Collaborating with AMSH on mental health research has been a deeply rewarding experience. Their commitment to advancing knowledge in psychiatry is truly inspiring.', rating: 5 },
    ];

    useEffect(() => {
        testimonialsAPI.getAll()
            .then(res => { if (res.data.testimonials?.length) setTestimonials(res.data.testimonials); })
            .catch(() => { });
    }, []);

    const items = testimonials.length > 0 ? testimonials : defaults;

    return (
        <section className="section bg-white">
            <div className="container-custom">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <span className="section-badge">💬 Testimonials</span>
                    <h2 className="section-title">What People Say About AMSH</h2>
                    <p className="section-subtitle">Hear from patients, families, and healthcare professionals who have experienced our care.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {items.slice(0, 3).map((t, i) => (
                        <div
                            key={t.id}
                            className={`card p-6 ${i === 1 ? 'bg-gradient-to-br from-blue-900 to-blue-700 text-white border-0' : ''}`}
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, si) => (
                                    <span key={si} className={`text-lg ${si < t.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                                ))}
                            </div>
                            <p className={`text-sm leading-relaxed mb-6 italic ${i === 1 ? 'text-blue-100' : 'text-gray-600'}`}>
                                "{t.content}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${i === 1 ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-900'
                                    }`}>
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <div className={`font-bold text-sm ${i === 1 ? 'text-white' : 'text-gray-900'}`}>{t.name}</div>
                                    <div className={`text-xs ${i === 1 ? 'text-blue-200' : 'text-gray-400'}`}>{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Government Trust Bar */}
                <div className="border-t border-gray-100 pt-10">
                    <p className="text-center text-gray-400 text-sm mb-6 font-medium">Affiliated with & Recognized by</p>
                    <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                        {['Ministry of Health Ethiopia', 'WHO', 'Ethiopian Medical Association', 'East Africa Health Network', 'African Psychiatric Association'].map((org) => (
                            <span key={org} className="text-gray-500 font-semibold text-sm">{org}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
