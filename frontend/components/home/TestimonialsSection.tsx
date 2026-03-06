'use client';

import { useState, useEffect, useRef } from 'react';
import { testimonialsAPI } from '@/lib/api';

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);

    useEffect(() => {
        testimonialsAPI.getAll()
            .then(res => {
                const data = res.data.testimonials || [];
                // Triple the items to ensure enough width for a seamless marquee
                setTestimonials([...data, ...data, ...data]);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const animate = (time: number) => {
        if (lastTimeRef.current !== null && scrollRef.current && !isPaused) {
            const deltaTime = time - lastTimeRef.current;
            // Speed control: 0.05 pixels per millisecond
            const speed = 0.05;
            scrollRef.current.scrollLeft += speed * deltaTime;

            // Seamless loop logic: if we scrolled past one full set of testimonials, reset
            const singleSetWidth = scrollRef.current.scrollWidth / 3;
            if (scrollRef.current.scrollLeft >= singleSetWidth * 2) {
                scrollRef.current.scrollLeft -= singleSetWidth;
            }
        }
        lastTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPaused, testimonials.length]);

    if (!loading && testimonials.length === 0) return null;

    return (
        <section className="section bg-white overflow-hidden py-24">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-900 mb-4 block animate-fade-in">
                        ✦ Patient Voices ✦
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6 leading-tight">
                        Real Stories of Recovery
                    </h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed opacity-80">
                        Join hundreds of individuals who have transformed their lives through the specialized psychiatric care and supportive community at EMSH.
                    </p>
                </div>
            </div>

            {/* Continuous Slider Container */}
            <div
                className="relative cursor-grab active:cursor-grabbing group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Gradient Masks for a Premium Look */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto no-scrollbar py-8 px-4"
                    style={{ scrollBehavior: 'auto' }}
                >
                    {testimonials.map((t, idx) => (
                        <div
                            key={`${t.id}-${idx}`}
                            className="flex-shrink-0 w-[400px] bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col group/card relative overflow-hidden"
                        >
                            {/* Decorative Quote Mark */}
                            <div className="absolute top-6 right-8 text-7xl font-serif text-blue-900/5 group-hover/card:text-blue-900/10 transition-colors">"</div>

                            {/* Star Rating */}
                            <div className="flex items-center gap-1 mb-8">
                                {[...Array(5)].map((_, si) => (
                                    <svg
                                        key={si}
                                        className={`w-4 h-4 ${si < (t.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-600 text-lg leading-[1.8] italic mb-10 flex-1 font-serif line-clamp-4 relative z-10">
                                "{t.content}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-5 pt-8 border-t border-gray-50 mt-auto">
                                <div className="relative">
                                    {t.image ? (
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            className="w-16 h-16 rounded-[1.5rem] object-cover border-2 border-white shadow-md group-hover/card:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center font-black text-white text-xl shadow-lg border-2 border-white">
                                            {t.name.charAt(0)}
                                        </div>
                                    )}
                                    {/* Success Badge */}
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-black text-gray-900 uppercase tracking-tighter text-lg leading-none mb-1 group-hover/card:text-blue-900 transition-colors">
                                        {t.name}
                                    </div>
                                    <div className="text-[10px] font-black text-blue-900/40 uppercase tracking-[0.2em]">
                                        {t.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Responsive Styles Injection */}
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
