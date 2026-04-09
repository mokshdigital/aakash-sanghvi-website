'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FieldOpsPlatform() {
    const heroContentRef = useRef<HTMLDivElement>(null);
    const contextRef = useRef<HTMLDivElement>(null);
    const platformRef = useRef<HTMLDivElement>(null);
    const deepDiveRef = useRef<HTMLDivElement>(null);
    const aiRef = useRef<HTMLDivElement>(null);
    const outcomesRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (heroContentRef.current) {
                gsap.fromTo(heroContentRef.current.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
                );
            }
            [contextRef, platformRef, deepDiveRef, aiRef, outcomesRef].forEach(ref => {
                if (ref.current) {
                    gsap.fromTo(ref.current.children,
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                          scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
                    );
                }
            });
            if (ctaRef.current) {
                gsap.fromTo(ctaRef.current.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                      scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' } }
                );
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="text-left">

            {/* ── HERO ── */}
            <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 lg:px-12 pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

                <div ref={heroContentRef} className="relative z-10 max-w-5xl mx-auto space-y-8">
                    <div
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white/5 font-semibold text-sm uppercase tracking-wide"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-accent)' }}
                    >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
                        Enterprise SaaS · Field Operations · AI-Powered
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1]">
                        Building a Custom OS<br />
                        <span className="gradient-text">for Field Services</span>
                    </h1>

                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                        A specialty construction company running on spreadsheets needed a single source of truth. I embedded on-site as the sole developer and product owner to build their entire operational stack.
                    </p>

                    <div className="flex flex-wrap gap-6 justify-center pt-4">
                        {[
                            { label: 'Role', value: 'Developer & Product Owner' },
                            { label: 'Type', value: 'Solo Build, Full Stack' },
                            { label: 'Duration', value: '2025 – 2026' },
                            { label: 'Industry', value: 'Specialty Construction' },
                        ].map((meta, i) => (
                            <div key={i} className="text-center">
                                <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>{meta.label}</div>
                                <div className="text-sm font-semibold">{meta.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 01: CONTEXT & PROBLEM ── */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5">
                <div ref={contextRef} className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        <div className="space-y-6">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text">01 — Context</span>
                            <h2 className="text-3xl md:text-4xl font-bold">The Problem</h2>
                            <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                <p>
                                    A growing multi-office field services company with dozens of technicians and hundreds of active work orders — held together by <strong className="text-white">fragile spreadsheets and tribal knowledge</strong>.
                                </p>
                                <p>
                                    Work orders in one system, scheduling in another, timesheets on paper. No visibility between them. Dispatchers double-booked. Invoices took weeks.
                                </p>
                            </div>
                        </div>

                        <div className="p-1 rounded-2xl border-gradient">
                            <div className="p-8 bg-neutral-900 rounded-xl">
                                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-accent)' }}>My Approach</h3>
                                <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                                    I didn't build from a spec document. I went on-site, sat with dispatchers, and watched technicians working in the field. Every feature came from a real conversation.
                                </p>
                                <ul className="space-y-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                    {[
                                        { icon: '✓', label: 'Direct Observation', desc: 'Watched real users interact with existing tools' },
                                        { icon: '✓', label: 'Daily Shipping', desc: 'Decision at 10am, shipped by 3pm' },
                                        { icon: '✓', label: 'Zero Filter', desc: 'No PMs or Jira between me and the users' },
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4">
                                            <span className="text-emerald-400 h-8 w-8 flex items-center justify-center rounded-full bg-white/5 shrink-0">{item.icon}</span>
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

                    {/* Problem cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                        {[
                            { icon: '📋', title: 'Fragmented Tools', desc: 'Work orders, scheduling, timesheets, and invoicing all siloed with zero connection between them.' },
                            { icon: '🔀', title: 'Scheduling Conflicts', desc: 'Dispatchers had no real-time visibility into tech availability. Double-bookings were common.' },
                            { icon: '⏳', title: 'Delayed Invoicing', desc: 'Weeks between job completion and invoice prep due to missing information and back-and-forth.' },
                            { icon: '👥', title: 'Multiple User Types', desc: 'Admins, dispatchers, field techs, and clients each with entirely different needs and zero unified system.' },
                        ].map((card, i) => (
                            <div key={i} className="feature-card p-8 rounded-3xl bg-neutral-950 border border-white/10 hover:border-violet-500/50 transition-all duration-500 group">
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                                <h4 className="font-bold text-white mb-2">{card.title}</h4>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 02: THE PLATFORM ── */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div ref={platformRef} className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">02 — The Platform</span>
                        <h2 className="text-3xl md:text-4xl font-bold">What I Built</h2>
                        <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                            A complete operations platform covering the full job lifecycle — from work order creation to invoicing — with strict role-specific experiences for every user type.
                        </p>
                    </div>

                    {/* Screenshot placeholder */}
                    <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-500 mb-16">
                        <div className="aspect-video w-full bg-neutral-950 relative">
                            <Image
                                src="/images/field-os/work-order-detail.png"
                                alt="Work Order Detail Page"
                                fill
                                className="object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: '📝', title: 'Work Order Lifecycle', desc: '9-status pipeline from creation to invoicing. Status-based UI locking controls what each role can do at each stage.' },
                            { icon: '📅', title: 'Calendar & Dispatch', desc: 'Week/month/day views with drag-and-drop. Tech load boards with overload warnings. Print-ready dispatch sheets.' },
                            { icon: '⏱️', title: 'Timesheets & Approvals', desc: 'Per-job time logging, two-tier approval workflow, automated daily email reports for missing entries.' },
                            { icon: '💰', title: 'Billing & Invoicing', desc: 'Billing classification, invoice file management, PO tracking, and charge types — bridging field work to accounting.' },
                            { icon: '🔐', title: 'RBAC & Permissions', desc: 'Granular role-based access mapped to the actual org hierarchy. Job status transition gates. Per-resource limits.' },
                            { icon: '🌐', title: 'Client Portal', desc: 'External-facing portal for project managers. File access and status visibility scoped to their assigned jobs only.' },
                        ].map((f, i) => (
                            <div key={i} className="flex gap-4 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="text-2xl shrink-0 mt-1">{f.icon}</div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">{f.title}</h4>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 03: DEEP DIVE ── */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5">
                <div ref={deepDiveRef} className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">03 — Deep Dive</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Two Products, One Codebase</h2>
                        <p className="text-lg max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
                            The office team needs a dense desktop ops platform. Field technicians need a phone-first tool they can use on a ladder in direct sunlight. Same data, completely different experience.
                        </p>
                    </div>

                    {/* Split screenshot */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-500">
                            <div className="aspect-video w-full bg-neutral-950 relative">
                                <Image
                                    src="/images/field-os/desktop-hero.png"
                                    alt="Desktop Dispatch Board"
                                    fill
                                    className="object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
                            </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-500">
                            <div className="aspect-video w-full bg-neutral-950 relative">
                                <Image
                                    src="/images/field-os/mobile-hero.jpeg"
                                    alt="Mobile Tech Dashboard"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold">The Tech Dashboard</h3>
                            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                A mobile-first product built specifically for non-technical field workers. Designed from direct on-site observation — watching technicians with gloves on, in sunlight, between tasks.
                            </p>
                            <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                {['Large tap targets, minimal text input', 'Quick-select time logging (0.5, 1, 2h)', 'Task completion with photo uploads', 'Material tracking & reimbursement requests'].map(item => (
                                    <li key={item} className="flex gap-3">
                                        <span className="text-emerald-400 shrink-0">→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold">Realtime Sync</h3>
                            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                When dispatch updates a work order, reassigns a tech, or adds a task — the field tech sees it instantly without refreshing. No polling, no manual refresh.
                            </p>
                            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                Implemented via Supabase realtime subscriptions across tasks, assignments, comments, and day notes — keeping the office and field in perfect sync.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 04: AI TOOLS ── */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div ref={aiRef} className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">04 — Intelligence</span>
                        <h2 className="text-3xl md:text-4xl font-bold">AI-Powered Features</h2>
                        <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                            Two custom AI engines designed to save hours of manual work — with human-in-the-loop safety so the AI assists but never acts alone.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {/* NLP Reports */}
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-6">
                                <h3 className="text-2xl md:text-3xl font-bold">Natural Language Reports</h3>
                                <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                    Ask a question in plain English — <em>"Show me all active jobs with more than 20 logged hours"</em> — and receive a fully composed dashboard with charts and data tables. No SQL knowledge required.
                                </p>
                                <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                    {[
                                        { label: 'The Engine', desc: 'Gemini reads a pruned schema → generates secure SQL + UI layout JSON → user confirms before execution' },
                                        { label: '5 Widget Types', desc: 'Metric cards, bar/line/pie charts, and data tables composed dynamically per query' },
                                        { label: 'Safety Layers', desc: 'Prompt guardrails → regex validation → Postgres function gating → read-only execution' },
                                    ].map(item => (
                                        <li key={item.label} className="flex gap-3">
                                            <span className="text-emerald-400 shrink-0 font-bold">◆</span>
                                            <div><strong className="text-white">{item.label}:</strong> {item.desc}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-500">
                                <div className="aspect-[4/3] w-full bg-neutral-950 relative">
                                    <Image
                                        src="/images/field-os/ai-report.png"
                                        alt="AI Report Generator"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* AI WO Creator */}
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-500">
                                <div className="aspect-[4/3] w-full bg-neutral-950 relative">
                                    <Image
                                        src="/images/field-os/ai-wo-generator.png"
                                        alt="AI Work Order Generator"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 to-transparent pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-2xl md:text-3xl font-bold">Multimodal WO Creator</h3>
                                <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                    Paste an email, upload a PDF, or record audio — the AI extracts structured field data, fuzzy-matches clients and staff against the live database, then generates the complete work order in a single confirmed transaction.
                                </p>
                                <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                    {[
                                        { label: 'Multimodal Input', desc: 'Text paste, file upload, or voice recording — all analyzed together' },
                                        { label: 'Smart Matching', desc: 'Fuzzy-matches extracted names against live database records' },
                                        { label: 'Full Injection', desc: 'Creates WO + tasks + checklists + tags + assignments + PDF in one transaction' },
                                    ].map(item => (
                                        <li key={item.label} className="flex gap-3">
                                            <span className="text-emerald-400 shrink-0 font-bold">◆</span>
                                            <div><strong className="text-white">{item.label}:</strong> {item.desc}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 05: OUTCOMES ── */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5">
                <div ref={outcomesRef} className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">05 — Scale</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Impact & Outcomes</h2>
                    </div>

                    {/* Metric blocks */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {[
                            { val: '20+', label: 'Modules Built' },
                            { val: '6+', label: 'User Roles' },
                            { val: '30+', label: 'Dev Iterations' },
                            { val: '1', label: 'Developer' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="metric-item p-8 rounded-2xl text-center border border-white/10"
                                style={{ backgroundColor: 'var(--color-bg-elevated)' }}
                            >
                                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{item.val}</div>
                                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Hard problems */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {[
                            { title: 'Status-Based UI Locking', desc: 'A ternary permission chain that controls what\'s editable at each WO status. Different statuses unlock/lock different UI surfaces for different roles.' },
                            { title: 'Multi-Office Filtering', desc: 'A single global selector that filters every module (WOs, calendar, billing, timesheets, people) without acting as a hard permission boundary.' },
                            { title: 'Realtime Collaboration', desc: 'Supabase realtime subscriptions across tasks, assignments, comments, and day notes. Office updates appear on field tech phones instantly.' },
                            { title: 'Designing for the Field', desc: 'Building for non-technical users — field techs on their phones in the sun, office staff in spreadsheets, clients who just need their files.' },
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                <h4 className="font-bold text-white mb-3">{item.title}</h4>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tech stack */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Supabase Realtime', 'Supabase RLS', 'Google Gemini AI', 'Vercel', 'Resend', 'React Email', 'Recharts', 'jsPDF', 'Web Speech API'].map(tech => (
                                <span
                                    key={tech}
                                    className="px-4 py-1.5 rounded-full text-sm font-medium border border-white/5"
                                    style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section ref={ctaRef} className="py-32 px-6 lg:px-12 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Need an architect for<br />
                        <span className="gradient-text">your next platform?</span>
                    </h2>
                    <p className="text-lg font-light" style={{ color: 'var(--color-text-muted)' }}>
                        Whether you need a full enterprise platform from scratch or AI features integrated into an existing stack — let's talk.
                    </p>
                    <div>
                        <Link
                            href="/work-with-me"
                            className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-lg font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 glow"
                            style={{ background: 'var(--gradient-accent)' }}
                        >
                            Start a conversation
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
