'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AGFashionHub() {
    const heroContentRef = useRef<HTMLDivElement>(null);
    const overviewRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const archRef = useRef<HTMLDivElement>(null);
    const manualRef = useRef<HTMLDivElement>(null);
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

            // Overview
            if (overviewRef.current) {
                gsap.fromTo(overviewRef.current.children, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: overviewRef.current, start: 'top 80%' },
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
            if (archRef.current) {
                gsap.fromTo(archRef.current, { opacity: 0, scale: 0.95 }, {
                    opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)',
                    scrollTrigger: { trigger: archRef.current, start: 'top 70%' },
                });
            }

            // Manual
            if (manualRef.current) {
                gsap.fromTo(manualRef.current.children, { opacity: 0, x: -30 }, {
                    opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: manualRef.current, start: 'top 75%' },
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
                        Headless Commerce • Tech Strategy
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1]">
                        AG Fashion Hub<br />
                        <span className="gradient-text">Headless Digital Catalog</span>
                    </h1>

                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                        Digitizing a high-touch ethnic wear business with a "Chat-to-Buy" WhatsApp commerce engine and zero transaction fees.
                    </p>

                    <div className="flex flex-wrap gap-6 justify-center pt-4">
                        {[
                            { label: 'Role', value: 'Lead Full-Stack Dev & Designer' },
                            { label: 'Client', value: 'AG Fashion Hub' },
                            { label: 'Stack', value: 'WordPress + GraphQL + Vanilla JS' },
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
                            src="/images/ag-fashion-hub/hero.jpg"
                            alt="AG Fashion Hub Landing Page"
                            width={1920}
                            height={1080}
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* CONTEXT & CHALLENGE */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5">
                <div ref={overviewRef} className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text">The Challenge</span>
                            <h2 className="text-3xl md:text-4xl font-bold">Bridging Tradition & Tech</h2>
                            <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                <p>
                                    AG Fashion Hub is a premium ethnic wear wholesaler. Their business relies on <strong className="text-white">high-touch negotiation</strong> and bulk orders, which standard e-commerce carts (Shopify/WooCommerce) kill.
                                </p>
                                <p>
                                    They needed a digital catalog that felt like a modern online store but funneled specific intent directly to a salesperson, avoiding complex payment gateways and rigid pricing structures.
                                </p>
                            </div>
                        </div>
                        <div className="p-1 rounded-2xl border-gradient">
                            <div className="p-8 bg-neutral-900 rounded-xl">
                                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-accent)' }}>Project Goals</h3>
                                <ul className="space-y-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                    {[
                                        { label: 'Digitize Inventory', desc: 'Move from disorganized phone gallery photos to a searchable web catalog.' },
                                        { label: 'Zero-Friction Inquiry', desc: 'Allow customers to ask "How much for this?" instantly.' },
                                        { label: 'Client Autonomy', desc: 'Empower non-tech staff to manage thousands of SKUs.' },
                                        { label: 'Performance', desc: 'Load heavy product galleries instantly on mobile data.' },
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

            {/* KEY FEATURES */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">The Solution</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Headless "Chat-to-Buy" Engine</h2>
                    </div>

                    <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="feature-card p-8 rounded-3xl bg-neutral-950 border border-white/10 hover:border-violet-500/50 transition-all duration-500 group">
                            <div className="h-12 w-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                💬
                            </div>
                            <h3 className="text-xl font-bold mb-3">WhatsApp Commerce</h3>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                                Bypassed traditional carts. Users click "Inquire" and get redirected to WhatsApp with a pre-filled message containing the <strong className="text-white">Design Code, Price, and URL</strong>.
                            </p>
                            <div className="p-4 rounded-lg bg-black/50 border border-white/5 text-xs font-mono text-green-400/80">
                                "Hi, I'd like to inquire about AG_D3_2025003 (Price: $69)..."
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="feature-card p-8 rounded-3xl bg-neutral-950 border border-white/10 hover:border-violet-500/50 transition-all duration-500 group">
                            <div className="h-12 w-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                ⚡
                            </div>
                            <h3 className="text-xl font-bold mb-3">Headless Performance</h3>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                                Decoupled the frontend (Vanilla JS) from WordPress. This allows <strong className="text-white">instant page transitions</strong> and filters without reloading, essentially acting as a Single Page App (SPA).
                            </p>
                            <div className="aspect-video rounded-lg bg-neutral-800 flex items-center justify-center border border-white/5 relative overflow-hidden">
                                <span className="text-xs text-neutral-500">[Placeholder: Performance Graph Highlighting 99/100 Mobile Score]</span>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="feature-card p-8 rounded-3xl bg-neutral-950 border border-white/10 hover:border-violet-500/50 transition-all duration-500 group">
                            <div className="h-12 w-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                🎛️
                            </div>
                            <h3 className="text-xl font-bold mb-3">Dynamic CMS</h3>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
                                Built a custom Pods-based CMS interface. Staff can add products, manage announcements (banners), and toggle "New Arrivals" without touching a line of code.
                            </p>
                            <div className="aspect-video rounded-lg bg-neutral-800 flex items-center justify-center border border-white/5 text-xs text-neutral-500">
                                [Placeholder: CMS Interface Screenshot]
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ARCHITECTURE DIAGRAM (Visualizing the Headless Setup) */}
            <section className="py-24 px-6 lg:px-12">
                <div ref={archRef} className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text">System Architecture</span>
                        <h2 className="text-3xl font-bold mt-2">How It Works</h2>
                    </div>

                    <div className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
                        <div className="grid md:grid-cols-3 gap-8 items-center text-center relative z-10">
                            {/* WP */}
                            <div className="space-y-4">
                                <div className="h-20 w-20 mx-auto rounded-2xl bg-[#0073AA] flex items-center justify-center text-4xl shadow-lg shadow-blue-500/20">
                                    W
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">WordPress + Pods</h3>
                                    <p className="text-xs text-neutral-400 mt-2">Content Management<br />Inventory & Assets</p>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="hidden md:flex flex-col items-center justify-center opacity-50 space-y-2">
                                <span className="text-xs font-mono uppercase tracking-widest">GraphQL JSON</span>
                                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                                <span className="text-2xl animate-pulse">→</span>
                            </div>

                            {/* Frontend */}
                            <div className="space-y-4">
                                <div className="h-20 w-20 mx-auto rounded-2xl bg-[#F7DF1E] flex items-center justify-center text-4xl text-black font-bold shadow-lg shadow-yellow-500/20">
                                    JS
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Vanilla JS Frontend</h3>
                                    <p className="text-xs text-neutral-400 mt-2">Client-side Rendering<br />Zero Dependencies</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-transparent blur-3xl -z-0"></div>
                    </div>
                </div>
            </section>

            {/* THE MANUAL */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 relative rounded-xl border border-white/10 bg-neutral-900 p-6 rotate-2 shadow-2xl">
                        <div className="absolute -top-4 -left-4 bg-emerald-500 text-black font-bold px-4 py-1 rounded-full text-xs shadow-lg uppercase tracking-wide">
                            Delivered Asset
                        </div>
                        <pre className="text-xs text-neutral-400 font-mono overflow-hidden opacity-70">
                            {`# AG Fashion Hub - User Manual
## Content Management System Guide

**Version:** 2.0
**Last Updated:** December 28, 2025

1. Introduction
2. Managing Dress Collections
3. Managing Dress Designs
   - Adding Images
   - Designing for WhatsApp
4. Common Errors & Troubleshooting

... (1,000+ lines of documentation)`}
                        </pre>
                    </div>

                    <div ref={manualRef} className="order-1 md:order-2 space-y-6">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text">Beyond Code</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Empowering the Client</h2>
                        <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            <p>
                                A great system is useless if the client can't run it. I didn't just hand over code; I delivered a <strong className="text-white">comprehensive Operations Manual</strong>.
                            </p>
                            <p>
                                This 1,000+ line document covers everything from image optimization (TinyPNG workflows) to troubleshooting specific CMS errors, ensuring the client is <strong className="text-white">100% autonomous</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* IMPACT METRICS */}
            <section className="py-24 px-6 lg:px-12">
                <div ref={metricsRef} className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold">Measurable Outcomes</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { val: '100%', label: 'Client Autonomy', desc: 'Zero dependency on devs for updates' },
                            { val: '0%', label: 'Transaction Fees', desc: 'Direct bank/cash model maintained' },
                            { val: '<1s', label: 'Load Time', desc: 'Static asset delivery' },
                            { val: '320+', label: 'SKUs Managed', desc: 'Seamlessly handled via CMS' },
                        ].map((item, i) => (
                            <div key={i} className="metric-item p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
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
                <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-6">Let's Build</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Need a Custom E-Commerce Solution?</h2>
                <p className="text-xl max-w-2xl mx-auto mb-12" style={{ color: 'var(--color-text-muted)' }}>
                    I build systems that fit your business model, not the other way around.
                </p>
                <Link
                    href="/work-with-me"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 glow"
                    style={{ background: 'var(--gradient-accent)' }}
                >
                    Discuss Your Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </section>
        </div>
    );
}
