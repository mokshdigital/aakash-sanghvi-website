'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EEIS() {
    const heroContentRef = useRef<HTMLDivElement>(null);
    const contextRef = useRef<HTMLDivElement>(null);
    const techStackRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const architectureRef = useRef<HTMLDivElement>(null);
    const securityRef = useRef<HTMLDivElement>(null);
    const metricsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero
            if (heroContentRef.current) {
                gsap.fromTo(heroContentRef.current.children, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2
                });
            }

            // Context
            if (contextRef.current) {
                gsap.fromTo(contextRef.current.children, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: contextRef.current, start: 'top 80%' },
                });
            }

            // Tech Stack
            if (techStackRef.current) {
                const badges = techStackRef.current.querySelectorAll('.tech-badge');
                gsap.fromTo(badges, { opacity: 0, scale: 0.8 }, {
                    opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(2)',
                    scrollTrigger: { trigger: techStackRef.current, start: 'top 85%' },
                });
            }

            // Features
            if (featuresRef.current) {
                const cards = featuresRef.current.querySelectorAll('.feature-card');
                gsap.fromTo(cards, { opacity: 0, y: 40 }, {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: featuresRef.current, start: 'top 75%' },
                });
            }

            // Architecture
            if (architectureRef.current) {
                gsap.fromTo(architectureRef.current, { opacity: 0, scale: 0.95 }, {
                    opacity: 1, scale: 1, duration: 0.8, ease: 'power4.out',
                    scrollTrigger: { trigger: architectureRef.current, start: 'top 70%' },
                });
            }

            // Security
            if (securityRef.current) {
                gsap.fromTo(securityRef.current.children, { opacity: 0, x: -30 }, {
                    opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: securityRef.current, start: 'top 75%' },
                });
            }

            // Metrics
            if (metricsRef.current) {
                const items = metricsRef.current.querySelectorAll('.metric-item');
                gsap.fromTo(items, { opacity: 0, scale: 0.8 }, {
                    opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)',
                    scrollTrigger: { trigger: metricsRef.current, start: 'top 85%' },
                });
            }

            // CTA
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

                <div ref={heroContentRef} className="relative z-10 max-w-5xl mx-auto space-y-8">
                    <div
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white/5 font-semibold text-sm uppercase tracking-wide"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-accent)' }}
                    >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
                        Next.js 14 • Headless WordPress
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1]">
                        Express Entry
                        <span className="gradient-text block">Immigration Services</span>
                    </h1>

                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                        Modernizing a traditional consultancy with a high-performance Next.js architecture, banking-grade security, and 60s global data revalidation.
                    </p>

                    <div className="flex flex-wrap gap-6 justify-center pt-4">
                        {[
                            { label: 'Role', value: 'Lead Full-Stack Developer' },
                            { label: 'Architecture', value: 'Headless (WP + Next.js)' },
                            { label: 'Status', value: 'Production Ready' },
                        ].map((meta, i) => (
                            <div key={i} className="text-center">
                                <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>{meta.label}</div>
                                <div className="text-sm font-semibold">{meta.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Image */}
                <div className="mt-16 w-full max-w-6xl mx-auto">
                    <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-500">
                        <Image
                            src="/images/eeis/hero.jpg"
                            alt="EEIS Landing Page Hero"
                            width={1920}
                            height={1080}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* CONTEXT */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5">
                <div ref={contextRef} className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text">The Challenge</span>
                            <h2 className="text-3xl md:text-4xl font-bold">Monolithic to Modern</h2>
                            <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                <p>
                                    Express Entry Immigration Services (EEIS) relied on a legacy, slow-loading monolithic site that was hard to secure and harder to update.
                                </p>
                                <p>
                                    They needed the <strong>speed and SEO</strong> of a modern web app but insisted on keeping the <strong>familiar WordPress dashboard</strong> for their content team.
                                </p>
                            </div>
                        </div>
                        <div className="p-1 rounded-2xl border-gradient">
                            <div className="p-8 bg-neutral-900 rounded-xl">
                                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-accent)' }}>Project Mandates</h3>
                                <ul className="space-y-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                    {[
                                        { label: 'Next.js 14 Migration', desc: 'Move to App Router and Server Components.' },
                                        { label: 'Hybrid Rendering', desc: 'Implement ISR for near-instant page loads.' },
                                        { label: 'Security Audit', desc: 'Pass a rigorous external code review.' },
                                        { label: 'Content Compatibility', desc: 'Maintain all WYSIWYG formatting from WP.' },
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4">
                                            <span className="text-xl h-8 w-8 flex items-center justify-center rounded-full bg-white/5 text-emerald-400 shrink-0">✓</span>
                                            <div>
                                                <strong className="text-white block">{item.label}</strong>
                                                {item.desc}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECH STACK */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-6">Built With</span>
                    <div ref={techStackRef} className="flex flex-wrap gap-4 justify-center">
                        {[
                            'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Headless WordPress',
                            'GraphQL', 'Framer Motion', 'Zod', 'React Hook Form', 'Shadcn UI'
                        ].map((tech, i) => (
                            <span key={i} className="tech-badge px-6 py-3 rounded-full bg-neutral-950 border border-white/10 text-sm font-medium hover:border-violet-500/50 transition-colors">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* TECHNICAL DEEP DIVE */}
            <section className="py-32 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto space-y-32">

                    {/* Feature 1: ISR */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>01</div>
                            <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>Performance Strategy</span>
                            <h3 className="text-3xl font-bold">Hybrid Rendering (ISR)</h3>
                            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                Bridging the gap between Static and Dynamic. We configured <strong>Incremental Static Regeneration</strong> with a 60-second revalidation window.
                            </p>
                            <ul className="space-y-3 pt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400">✓</span> Pages served instantly from edge cache
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400">✓</span> Background updates when WP content changes
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-emerald-400">✓</span> Zero database hits for end users
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-2xl bg-neutral-900 border border-white/10 p-2 overflow-hidden shadow-2xl">
                            <div className="aspect-video bg-neutral-950 relative flex items-center justify-center">
                                <span className="text-neutral-600 text-sm font-mono">[Placeholder: ISR Diagram vs Server Side Rendering]</span>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Sanitization */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="md:order-2 space-y-6">
                            <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>02</div>
                            <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>Content Pipeline</span>
                            <h3 className="text-3xl font-bold">The Sanitization Bridge</h3>
                            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                Direct HTML injection from WP is risky. I built a custom pipeline that parses WordPress WYSIWYG content, preserving safe formatting (bold, colors, headers) while stripping malicious scripts.
                            </p>
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-200">
                                🔒 Blocked: &lt;script&gt;, onclick, iframe<br />
                                ✅ Allowed: &lt;b&gt;, &lt;span style="color:..."&gt;
                            </div>
                        </div>
                        <div className="md:order-1 rounded-2xl bg-neutral-900 border border-white/10 p-2 overflow-hidden shadow-2xl">
                            <div className="aspect-video bg-neutral-950 relative flex items-center justify-center">
                                <span className="text-neutral-600 text-sm font-mono">[Placeholder: Before/After Sanitization Code Snippet]</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* VISUAL ARCHITECTURE */}
            <section className="py-24 px-6 lg:px-12 bg-white/5 border-y border-white/5">
                <div ref={architectureRef} className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text">System Architecture</span>
                        <h2 className="text-3xl font-bold mt-2">Headless Data Flow</h2>
                    </div>

                    <div className="relative p-8 md:p-12 rounded-3xl bg-neutral-950 border border-white/10 text-center">
                        <div className="grid md:grid-cols-5 gap-4 items-center relative z-10">
                            {/* Node 1 */}
                            <div className="md:col-span-1 p-4 rounded-xl bg-blue-900/20 border border-blue-500/30">
                                <div className="font-bold text-blue-400">WordPress</div>
                                <div className="text-xs text-neutral-500 mt-1">Content Source</div>
                            </div>

                            {/* Arrow */}
                            <div className="md:col-span-1 text-2xl font-mono text-neutral-600">→</div>

                            {/* Node 2 */}
                            <div className="md:col-span-1 p-4 rounded-xl bg-purple-900/20 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                <div className="font-bold text-purple-400">Next.js API</div>
                                <div className="text-xs text-neutral-500 mt-1">Sanitization & Type Check</div>
                            </div>

                            {/* Arrow */}
                            <div className="md:col-span-1 text-2xl font-mono text-neutral-600">→</div>

                            {/* Node 3 */}
                            <div className="md:col-span-1 p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30">
                                <div className="font-bold text-emerald-400">Vercel Edge</div>
                                <div className="text-xs text-neutral-500 mt-1">Global Delivery (ISR)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CODE QUALITY & SECURITY */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div ref={securityRef} className="space-y-6">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text">Quality Assurance</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Audit-Ready Codebase</h2>
                        <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            <p>
                                This wasn't a solo hackathon project. It underwent a rigorous code review process simulating enterprise environments.
                            </p>
                            <p>
                                We utilized <strong>Zod</strong> for runtime validation of all CMS data (ensuring no crashing if a field is missing) and strict TypeScript rules to catch errors at build time.
                            </p>
                        </div>
                    </div>
                    <div className="relative p-6 rounded-xl bg-[#1E1E1E] border border-white/10 font-mono text-xs md:text-sm leading-loose shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-8 bg-[#2D2D2D] flex items-center px-4 gap-2 rounded-t-xl border-b border-black">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mt-6 text-green-400">
                            ✔ Security Scan Passed<br />
                            ✔ 0 Critical Vulnerabilities<br />
                            ✔ Types Strict Mode: Enabled<br />
                            ✔ Build Size: 84kb (First Load JS)
                        </div>
                        <div className="mt-4 text-neutral-500">
                            $ npx audit-ci --high<br />
                            &gt; No active vulnerabilities found.
                        </div>
                    </div>
                </div>
            </section>

            {/* IMPACT METRICS */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div ref={metricsRef} className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold">Measurable Results</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { val: '60s', label: 'Freshness', desc: 'Global content update time via ISR' },
                            { val: '100%', label: 'Type Safety', desc: 'End-to-end strict TypeScript coverage' },
                            { val: 'A+', label: 'Security', desc: 'Zero critical issues in final audit' },
                            { val: '99/100', label: 'SEO Score', desc: 'Perfect semantic HTML structure' },
                        ].map((item, i) => (
                            <div key={i} className="metric-item p-6 rounded-2xl bg-neutral-950 border border-white/10 text-center">
                                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{item.val}</div>
                                <div className="text-sm font-bold uppercase tracking-wider mb-2">{item.label}</div>
                                <div className="text-xs text-neutral-500">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaRef} className="py-32 px-6 lg:px-12 text-center border-t border-white/5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-6">Scale With Confidence</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Modernize Your Stack?</h2>
                <p className="text-xl max-w-2xl mx-auto mb-12" style={{ color: 'var(--color-text-muted)' }}>
                    I build enterprise-grade applications that are fast, secure, and maintainable.
                </p>
                <Link
                    href="/work-with-me"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 glow"
                    style={{ background: 'var(--gradient-accent)' }}
                >
                    Book a Consultation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </section>
        </div>
    );
}
