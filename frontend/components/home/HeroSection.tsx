'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const heroSlides = [
    {
        id: 1,
        badge: '',
        title: 'Comprehensive Mental Health Care You Can Trust',
        subtitle: 'Serving Ethiopia since 1930 E.C. with expert psychiatric care, research, and professional development. Your mental health is our priority.',
        primaryCTA: { label: 'Our Services', href: '/services' },
        bg: 'bg-blue-950',
        accent: '80+ Years of Dedicated Mental Health Services',
    },
    {
        id: 2,
        badge: '',
        title: 'Advanced Treatment for Mind & Mental Wellness',
        subtitle: 'From child psychiatry to addiction treatment, our specialized departments offer evidence-based care with compassion and expertise.',
        primaryCTA: { label: '🏥 View Services', href: '/services' },
        secondaryCTA: { label: 'Our Departments', href: '/departments' },
        bg: 'bg-blue-950',
        accent: 'Over 80 Years of Excellence in Mental Health',
    },
    {
        id: 3,
        badge: '',
        title: 'Advancing Mental Health Knowledge Across Africa',
        subtitle: 'Join our CPD programs, research initiatives, and professional networks to enhance your expertise and contribute to mental health advancement.',
        primaryCTA: { label: '📚 CPD Courses', href: '/cpd' },
        secondaryCTA: { label: 'Research Center', href: '/research' },
        bg: 'bg-blue-950',
        accent: 'Recognized Research Center in East Africa',
    },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);


    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    const slide = heroSlides[current];

    return (
        <section
            className={`relative min-h-screen ${slide.bg} transition-all duration-1000 flex items-center overflow-hidden`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '48px 48px',
                }} />
            </div>

            {/* Decorative Blue Orbs */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

            {/* Content */}
            <div className="container-custom relative z-10 py-24 -translate-y-10">
                <div className="max-w-4xl">
                    {/* Badge */}
                    {slide.badge && (
                        <div key={`badge-${current}`} className="animate-fade-in-up mb-8">
                            <span className="motto-premium-lg px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl inline-block">
                                {slide.badge}
                            </span>
                        </div>
                    )}

                    {/* Title */}
                    <h1
                        key={`title-${current}`}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tighter"
                        style={{ animationDelay: '0.1s' }}
                    >
                        {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p
                        key={`sub-${current}`}
                        className="text-lg md:text-2xl text-blue-100/80 max-w-3xl mb-12 leading-relaxed animate-fade-in-up font-medium"
                        style={{ animationDelay: '0.2s' }}
                    >
                        {slide.subtitle}
                    </p>

                    <div
                        key={`cta-${current}`}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        {slide.primaryCTA && (
                            <Link href={slide.primaryCTA.href} className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-1">
                                {slide.primaryCTA.label}
                            </Link>
                        )}
                        {slide.secondaryCTA && (
                            <Link href={slide.secondaryCTA.href} className="inline-flex items-center gap-2 text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300">
                                {slide.secondaryCTA.label}
                            </Link>
                        )}
                    </div>



                    {/* Accent Tag */}
                    <div
                        key={`accent-${current}`}
                        className="mt-12 flex items-center gap-4 animate-fade-in-up"
                        style={{ animationDelay: '0.5s' }}
                    >
                        <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                        <span className="text-blue-200 text-sm font-black uppercase tracking-widest">{slide.accent}</span>
                    </div>
                </div>
            </div>

            {/* Slide Controls */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setCurrent(i); setIsAutoPlaying(false); }}
                        className={`w-3 rounded-full transition-all duration-300 ${i === current ? 'h-12 bg-white' : 'h-3 bg-white/20 hover:bg-white/50'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Prev/Next */}
            <button
                onClick={() => { setCurrent((current - 1 + heroSlides.length) % heroSlides.length); setIsAutoPlaying(false); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all backdrop-blur-md hidden xl:flex border border-white/10"
                aria-label="Previous slide"
            >
                <ChevronLeftIcon className="w-8 h-8" />
            </button>
            <button
                onClick={() => { setCurrent((current + 1) % heroSlides.length); setIsAutoPlaying(false); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all backdrop-blur-md hidden xl:flex border border-white/10"
                aria-label="Next slide"
            >
                <ChevronRightIcon className="w-8 h-8" />
            </button>
        </section>
    );
}
