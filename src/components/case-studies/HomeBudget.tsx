'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeBudget() {
    const heroContentRef = useRef<HTMLDivElement>(null);
    const overviewCardsRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const techStackRef = useRef<HTMLDivElement>(null);
    const challengesRef = useRef<HTMLDivElement>(null);
    const metricsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // --- HERO ---
            if (heroContentRef.current) {
                gsap.fromTo(
                    heroContentRef.current.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
                );
            }

            // --- OVERVIEW CARDS ---
            if (overviewCardsRef.current) {
                const cards = overviewCardsRef.current.querySelectorAll('.overview-card');
                gsap.fromTo(cards, { opacity: 0, y: 40, scale: 0.95 }, {
                    opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)',
                    scrollTrigger: { trigger: overviewCardsRef.current, start: 'top 80%' },
                });
            }

            // --- TIMELINE ---
            if (timelineRef.current) {
                const items = timelineRef.current.querySelectorAll('.timeline-item');
                gsap.fromTo(items, { opacity: 0, x: -30 }, {
                    opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
                    scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' },
                });
            }

            // --- FEATURES ---
            if (featuresRef.current) {
                const cards = featuresRef.current.querySelectorAll('.feature-card');
                gsap.fromTo(cards, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' },
                });
            }

            // --- TECH STACK ---
            if (techStackRef.current) {
                const badges = techStackRef.current.querySelectorAll('.tech-badge');
                gsap.fromTo(badges, { opacity: 0, scale: 0.8 }, {
                    opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(2)',
                    scrollTrigger: { trigger: techStackRef.current, start: 'top 85%' },
                });
            }

            // --- CHALLENGES ---
            if (challengesRef.current) {
                const cards = challengesRef.current.querySelectorAll('.challenge-card');
                gsap.fromTo(cards, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: challengesRef.current, start: 'top 80%' },
                });
            }

            // --- METRICS ---
            if (metricsRef.current) {
                const items = metricsRef.current.querySelectorAll('.metric-item');
                gsap.fromTo(items, { opacity: 0, y: 20 }, {
                    opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: metricsRef.current, start: 'top 85%' },
                });
            }

            // --- CTA ---
            if (ctaRef.current) {
                gsap.fromTo(ctaRef.current.children, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="text-left">
            {/* HERO */}
            <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 lg:px-12 pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

                <div ref={heroContentRef} className="relative z-10 max-w-4xl mx-auto space-y-8">
                    <div
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white/5 font-semibold text-sm uppercase tracking-wide"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-accent)' }}
                    >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
                        Personal Project • FinTech
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1]">
                        HomeBudget<span className="gradient-text">AI</span>
                    </h1>

                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                        A modern personal finance application that helps track expenses, manage budgets, and gain insights into spending habits — built for my own daily use.
                    </p>

                    <div className="flex flex-wrap gap-6 justify-center pt-4">
                        {[
                            { label: 'Role', value: 'UX Designer & Developer' },
                            { label: 'Timeline', value: '4 Weeks' },
                            { label: 'Platform', value: 'Web Application' },
                        ].map((meta, i) => (
                            <div key={i} className="text-center">
                                <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>{meta.label}</div>
                                <div className="text-sm font-semibold">{meta.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Image Placeholder */}
                <div className="mt-16 w-full max-w-5xl mx-auto">
                    <div className="aspect-video bg-neutral-900 rounded-2xl border border-white/10 flex items-center justify-center text-gray-600 shadow-2xl hover:-translate-y-2 transition-transform duration-500">
                        <div className="text-center p-8">
                            <span className="block text-5xl mb-4">📊</span>
                            <span className="text-sm uppercase tracking-widest">Dashboard Screenshot</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE STORY */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text">The Story Behind</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Why I Built This</h2>
                        <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            <p>Like many people, I found myself constantly wondering where my money was going each month. Spreadsheets were tedious, existing apps were either too simple or too complex.</p>
                            <p>So I decided to build exactly what I needed — a <strong className="text-white">clean, intuitive budget tracker</strong> that would give me complete visibility into my home expenses, income, and savings at a glance.</p>
                        </div>
                    </div>
                    <div className="p-1 rounded-2xl border-gradient">
                        <blockquote className="p-8 bg-neutral-900 rounded-xl text-xl italic font-medium leading-relaxed">
                            "I wanted to build something I would actually use every day — not just another portfolio project that sits in a GitHub repo collecting dust."
                            <footer className="mt-6 text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>— My guiding principle</footer>
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* OVERVIEW */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Project Overview</span>
                        <h2 className="text-3xl md:text-4xl font-bold">The Challenge & Solution</h2>
                    </div>

                    <div ref={overviewCardsRef} className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: '🎯', title: 'The Problem', desc: 'Existing budget apps were either too simple (just expense tracking) or too complex (full accounting suites). I needed something in between.' },
                            { icon: '💡', title: 'The Solution', desc: 'A modern web app with separate tracking for expenses, income, and savings. Quick data entry forms with inline creation of categories.' },
                            { icon: '🚀', title: 'The Impact', desc: 'I now have complete visibility into my finances. Data entry takes seconds, and the app has become part of my daily routine.' },
                        ].map((card, i) => (
                            <div key={i} className="overview-card p-8 rounded-2xl bg-neutral-900/50 border border-white/5 hover:-translate-y-2 hover:border-white/20 transition-all duration-300">
                                <div className="text-4xl mb-6 bg-neutral-800 w-14 h-14 rounded-xl flex items-center justify-center">{card.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DESIGN PROCESS TIMELINE */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Design Process</span>
                        <h2 className="text-3xl md:text-4xl font-bold">From Concept to Reality</h2>
                    </div>

                    <div ref={timelineRef} className="relative pl-8 border-l-2" style={{ borderColor: 'var(--color-accent)' }}>
                        {[
                            { title: 'Research & Discovery', desc: 'Analyzed pain points with existing budget apps. Identified core use cases: quick expense logging, income tracking, savings goals, and spending insights.' },
                            { title: 'Information Architecture', desc: 'Designed a clear navigation structure: Dashboard for overview, separate sections for Expenses/Income/Savings, and Settings for customization.' },
                            { title: 'Visual Design', desc: 'Created a dark theme UI with vibrant accent colors for data visualization. Used color strategically: green for income, red for expenses, purple for savings.' },
                            { title: 'Development & Iteration', desc: 'Built with Next.js and Supabase. Continuously refined the UX based on daily usage — adding quick-add features, improving date filtering, simplifying forms.' },
                        ].map((item, i) => (
                            <div key={i} className="timeline-item relative mb-10 last:mb-0">
                                <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full border-3 border-white/20 bg-neutral-950 hover:scale-125 transition-transform" style={{ borderColor: 'var(--color-accent)' }} />
                                <div className="ml-6 p-6 rounded-xl bg-neutral-950 border border-white/10 hover:border-white/20 transition-colors">
                                    <h3 className="text-lg font-bold mb-2">{i + 1}. {item.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* KEY FEATURES */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Key Features</span>
                        <h2 className="text-3xl md:text-4xl font-bold">What Makes It Special</h2>
                    </div>

                    <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { num: '01', title: 'Intuitive Dashboard', desc: 'A single view showing total income, spending, and savings with category-based breakdowns.' },
                            { num: '02', title: 'Quick Data Entry', desc: 'Add expenses in seconds. Create categories and vendors on-the-fly without leaving the form.' },
                            { num: '03', title: 'Comprehensive Tracking', desc: 'Separate sections for expenses, income, and savings with full CRUD operations.' },
                            { num: '04', title: 'Flexible Settings', desc: 'Fully customizable categories, payment methods, vendors, and income sources.' },
                        ].map((feature, i) => (
                            <div key={i} className="feature-card group p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500">
                                <div className="bg-neutral-950 h-full rounded-xl p-6">
                                    <div className="text-3xl font-black gradient-text mb-4">{feature.num}</div>
                                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TECH STACK */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5">
                <div ref={techStackRef} className="max-w-4xl mx-auto text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Tech Stack</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Built With Modern Tools</h2>

                    <div className="flex flex-wrap gap-4 justify-center">
                        {[
                            '⚛️ Next.js 15', '📘 TypeScript', '🎨 Tailwind CSS', '🗄️ Supabase',
                            '🔐 Supabase Auth', '🎭 Framer Motion', '🧩 shadcn/ui', '▲ Vercel'
                        ].map((tech, i) => (
                            <span key={i} className="tech-badge px-5 py-3 rounded-full bg-neutral-900 border border-white/10 text-sm font-medium hover:-translate-y-1 hover:border-white/30 transition-all duration-300">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CHALLENGES & SOLUTIONS */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Challenges & Solutions</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Problems I Solved</h2>
                    </div>

                    <div ref={challengesRef} className="grid md:grid-cols-2 gap-8">
                        {[
                            { challenge: 'Date Filtering Accuracy', problem: 'Transactions weren\'t appearing in "This Month" filter due to timezone issues.', solution: 'Implemented local timezone-aware date parsing by constructing Date objects with explicit year, month, day values.' },
                            { challenge: 'Quick Category Creation', problem: 'Users needed to create new categories while adding an expense, but had to navigate away.', solution: 'Added "Add New" buttons inline with each dropdown, opening a quick modal to create new items without leaving context.' },
                            { challenge: 'Database Schema Mismatch', problem: 'Supabase uses snake_case columns while frontend uses camelCase, causing data mapping issues.', solution: 'Created bidirectional utility functions to automatically convert between snake_case and camelCase.' },
                            { challenge: 'Real-time Auth State', problem: 'Managing authentication state across server components, client components, and API routes in Next.js 15.', solution: 'Implemented separate Supabase client factories for browser, server, and middleware contexts using @supabase/ssr.' },
                        ].map((item, i) => (
                            <div key={i} className="challenge-card p-6 rounded-2xl bg-neutral-950 border border-white/10 hover:border-white/20 transition-colors">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-rose-500/10 text-rose-400">Challenge</span>
                                <h3 className="text-lg font-bold mb-2">{item.challenge}</h3>
                                <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>{item.problem}</p>
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-emerald-500/10 text-emerald-400">Solution</span>
                                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.solution}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* METRICS */}
            <section className="py-24 px-6 lg:px-12">
                <div ref={metricsRef} className="max-w-4xl mx-auto text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Results</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-16">By the Numbers</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '100%', label: 'Self-Built' },
                            { value: '4', label: 'Weeks' },
                            { value: '10+', label: 'Features' },
                            { value: 'Daily', label: 'Usage' },
                        ].map((stat, i) => (
                            <div key={i} className="metric-item">
                                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{stat.value}</div>
                                <div className="text-sm font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaRef} className="py-32 px-6 lg:px-12 text-center border-t border-white/5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-6">Get In Touch</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Interested in Working Together?</h2>
                <p className="text-xl max-w-2xl mx-auto mb-12" style={{ color: 'var(--color-text-muted)' }}>
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        href="/work-with-me"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 glow"
                        style={{ background: 'var(--gradient-accent)' }}
                    >
                        Let's Talk
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                    >
                        View Live Demo
                    </a>
                </div>
            </section>
        </div>
    );
}
