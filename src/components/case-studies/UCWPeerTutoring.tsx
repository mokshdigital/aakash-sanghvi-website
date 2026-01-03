'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function UCWPeerTutoring() {
    const heroContentRef = useRef<HTMLDivElement>(null);
    const painPointsRef = useRef<HTMLDivElement>(null);
    const researchRef = useRef<HTMLDivElement>(null);
    const solutionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const constraintsRef = useRef<HTMLDivElement>(null);
    const testingRef = useRef<HTMLDivElement>(null);
    const impactRef = useRef<HTMLDivElement>(null);
    const toolsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero
            if (heroContentRef.current) {
                gsap.fromTo(heroContentRef.current.children, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2
                });
            }

            // Pain Points
            if (painPointsRef.current) {
                const cards = painPointsRef.current.querySelectorAll('.pain-card');
                gsap.fromTo(cards, { opacity: 0, y: 40, scale: 0.95 }, {
                    opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)',
                    scrollTrigger: { trigger: painPointsRef.current, start: 'top 80%' },
                });
            }

            // Research
            if (researchRef.current) {
                gsap.fromTo(researchRef.current.children, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: researchRef.current, start: 'top 80%' },
                });
            }

            // Solutions
            solutionRefs.current.forEach((section, index) => {
                if (!section) return;
                const direction = index % 2 === 0 ? -50 : 50;
                gsap.fromTo(section, { opacity: 0, x: direction }, {
                    opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
                    scrollTrigger: { trigger: section, start: 'top 75%' },
                });
            });

            // Constraints
            if (constraintsRef.current) {
                gsap.fromTo(constraintsRef.current.children, { opacity: 0, y: 20 }, {
                    opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
                    scrollTrigger: { trigger: constraintsRef.current, start: 'top 85%' },
                });
            }

            // Testing
            if (testingRef.current) {
                const items = testingRef.current.querySelectorAll('.test-item');
                gsap.fromTo(items, { opacity: 0, x: -20 }, {
                    opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: testingRef.current, start: 'top 80%' },
                });
            }

            // Impact
            if (impactRef.current) {
                const items = impactRef.current.querySelectorAll('.impact-item');
                gsap.fromTo(items, { opacity: 0, y: 20 }, {
                    opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: impactRef.current, start: 'top 85%' },
                });
            }

            // Tools
            if (toolsRef.current) {
                const badges = toolsRef.current.querySelectorAll('.tool-badge');
                gsap.fromTo(badges, { opacity: 0, scale: 0.8 }, {
                    opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(2)',
                    scrollTrigger: { trigger: toolsRef.current, start: 'top 85%' },
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

                <div ref={heroContentRef} className="relative z-10 max-w-4xl mx-auto space-y-8">
                    <div
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white/5 font-semibold text-sm uppercase tracking-wide"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-accent)' }}
                    >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
                        UX Case Study • Higher Education
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1]">
                        UCW Peer Tutoring<br />
                        <span className="gradient-text">Booking Flow Redesign</span>
                    </h1>

                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                        End-to-end UX redesign of a peer tutoring platform for University Canada West — transforming a confusing experience into a guided 4-step flow within Moodle constraints.
                    </p>

                    <div className="flex flex-wrap gap-6 justify-center pt-4">
                        {[
                            { label: 'Role', value: 'Lead UX & Product Designer' },
                            { label: 'Timeline', value: 'Spring–Summer 2023' },
                            { label: 'Platform', value: 'Moodle LMS' },
                        ].map((meta, i) => (
                            <div key={i} className="text-center">
                                <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>{meta.label}</div>
                                <div className="text-sm font-semibold">{meta.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Image */}
                <div className="mt-16 w-full max-w-5xl mx-auto">
                    <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-500">
                        <Image
                            src="/images/ucw/Home_HiFi.png"
                            alt="UCW Peer Tutoring Landing Page"
                            width={2880}
                            height={1600}
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* CONTEXT & CHALLENGE */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                        <div className="space-y-6">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text">The Context</span>
                            <h2 className="text-3xl md:text-4xl font-bold">A Valuable Service, Poorly Delivered</h2>
                            <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                <p>UCW's Peer Tutoring Service is a <strong className="text-white">free academic support program</strong> allowing students to book 1-on-1 sessions with trained peer tutors.</p>
                                <p>Despite its value, student adoption was suffering due to a cluttered landing page and confusing booking flow inside Moodle.</p>
                            </div>
                        </div>
                        <div className="p-1 rounded-2xl border-gradient">
                            <div className="p-8 bg-neutral-900 rounded-xl">
                                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-accent)' }}>My Role</h3>
                                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                    I owned this project end-to-end, reporting directly to the Learning Commons department manager and coordinating with one project coordinator.
                                </p>
                                <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                    {['UX research & student interviews', 'Problem definition & strategy', 'Personas & journey mapping', 'Information architecture', 'Wireframes → Hi-Fi prototypes', 'Usability testing', 'Stakeholder reviews', 'Final handoff within Moodle'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span style={{ color: 'var(--color-accent)' }}>✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Pain Points */}
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Key Pain Points</span>
                        <h2 className="text-2xl md:text-3xl font-bold">What Was Broken</h2>
                    </div>

                    <div ref={painPointsRef} className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: '📜', title: 'Endless Scrolling', desc: 'Extremely long lists of tutors with no clear hierarchy' },
                            { icon: '❓', title: 'No Guided Flow', desc: 'Students didn\'t know "what comes next" after landing' },
                            { icon: '🔀', title: 'Poor Mapping', desc: 'Confusing subject → tutor relationship' },
                            { icon: '😰', title: 'Confirmation Anxiety', desc: 'No clarity on what happens after booking' },
                        ].map((pain, i) => (
                            <div key={i} className="pain-card p-6 rounded-2xl bg-neutral-900/50 border border-white/5 text-center hover:-translate-y-2 hover:border-rose-500/30 transition-all duration-300">
                                <div className="text-3xl mb-4">{pain.icon}</div>
                                <h3 className="text-sm font-bold mb-2">{pain.title}</h3>
                                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{pain.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RESEARCH & DISCOVERY */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div ref={researchRef} className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Research & Discovery</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Understanding the Users</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="p-8 rounded-2xl bg-neutral-950 border border-white/10">
                            <h3 className="text-lg font-bold mb-4">User Interviews</h3>
                            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                Conducted interviews with Term 1–3 MBA students who had previously used the service. Explored:
                            </p>
                            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                {['How they discovered the service', 'Their booking experience', 'Frustrations and confusion points', 'Expectations from tutors', 'Language & cultural comfort'].map((item, i) => (
                                    <li key={i}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-8 rounded-2xl bg-neutral-950 border border-white/10">
                            <h3 className="text-lg font-bold mb-4">Research Themes</h3>
                            <div className="space-y-4">
                                {[
                                    { theme: 'Tutor Trust', insight: 'Language, background, approachability matter' },
                                    { theme: 'Course Clarity', insight: 'Assignments, expectations, validation needs' },
                                    { theme: 'Service Awareness', insight: 'What peer tutoring can and cannot help with' },
                                    { theme: 'Booking Anxiety', insight: '"What happens after I click book?"' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <span className="text-lg" style={{ color: 'var(--color-accent)' }}>•</span>
                                        <div>
                                            <span className="font-semibold text-sm">{item.theme}:</span>
                                            <span className="text-sm ml-1" style={{ color: 'var(--color-text-muted)' }}>{item.insight}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Persona */}
                    <div className="p-8 rounded-2xl border-gradient">
                        <div className="bg-neutral-900 rounded-xl p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-4xl flex-shrink-0">
                                    👩‍🎓
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>Primary Persona</span>
                                    <h3 className="text-2xl font-bold mt-1 mb-3">Marina Canlas</h3>
                                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                        International MBA student new to Canada, balancing academics, work, and personal stress.
                                    </p>
                                    <blockquote className="text-lg italic border-l-4 pl-4" style={{ borderColor: 'var(--color-accent)' }}>
                                        "I want to book help quickly, without guessing where to click next."
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HMW */}
                    <div className="mt-12 text-center">
                        <span className="text-xs font-bold uppercase tracking-wider block mb-4" style={{ color: 'var(--color-accent)' }}>How Might We</span>
                        <p className="text-xl md:text-2xl font-medium italic max-w-2xl mx-auto">
                            "How might we make the peer tutoring service more transparent and accessible so students can use it efficiently and confidently?"
                        </p>
                    </div>
                </div>
            </section>

            {/* SOLUTION */}
            <div className="max-w-6xl mx-auto px-6 lg:px-12 py-32 space-y-32">
                <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">The Solution</span>
                    <h2 className="text-3xl md:text-4xl font-bold">Designing Within Constraints</h2>
                </div>

                {/* Solution 1: Booking Flow */}
                <div ref={(el) => { solutionRefs.current[0] = el; }} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>01</div>
                        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>Re-Architected Booking Flow</span>
                        <h3 className="text-3xl font-bold">From Chaos to Clarity</h3>
                        <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            <p>Instead of a single overwhelming page, the experience was broken into <strong className="text-white">4 clear steps</strong>:</p>
                        </div>
                        <ol className="space-y-3 pt-2">
                            {['Choose a Study Area', 'Choose a Subject', 'Choose a Tutor', 'Book the Session (via Calendly)'].map((step, i) => (
                                <li key={i} className="flex items-center gap-4">
                                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--gradient-accent)' }}>{i + 1}</span>
                                    <span className="text-sm font-medium">{step}</span>
                                </li>
                            ))}
                        </ol>
                        <p className="text-sm pt-4" style={{ color: 'var(--color-text-muted)' }}>
                            Each step includes a visible progress indicator, clear back navigation, and a single primary action.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 overflow-hidden">
                        <Image
                            src="/images/ucw/BookASession_Subject.png"
                            alt="Subject Selection Step"
                            width={1611}
                            height={1000}
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                {/* Solution 2: Landing Page */}
                <div ref={(el) => { solutionRefs.current[1] = el; }} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="md:order-2 space-y-6">
                        <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>02</div>
                        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>Redesigned Landing Page</span>
                        <h3 className="text-3xl font-bold">Clear Value Proposition</h3>
                        <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            {[
                                'Clear explanation of what peer tutoring is',
                                'Visual sections answering "Can this help me?"',
                                'Social proof (student testimonials & metrics)',
                                'Consistent "Book a Session" CTAs',
                                'Reduced scrolling and better content grouping'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span style={{ color: 'var(--color-accent)' }}>→</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:order-1 rounded-2xl border border-white/10 overflow-hidden">
                        <Image
                            src="/images/ucw/Home_BookASessionNow.png"
                            alt="Landing Page CTA"
                            width={1628}
                            height={1000}
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                {/* Solution 3: Tutor Discovery */}
                <div ref={(el) => { solutionRefs.current[2] = el; }} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>03</div>
                        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>Tutor Discovery</span>
                        <h3 className="text-3xl font-bold">Building Trust & Familiarity</h3>
                        <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            {[
                                'Grid layout instead of long vertical list',
                                'Tutor cards with photos, experience, languages',
                                '"Read more" modal for deeper trust-building',
                                'Clear "Book Now" CTA per tutor'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span style={{ color: 'var(--color-accent)' }}>→</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-white/10 overflow-hidden">
                            <Image
                                src="/images/ucw/KnowYourTutors.png"
                                alt="Tutor Grid"
                                width={3401}
                                height={2000}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Solution 4: Success Page */}
                <div ref={(el) => { solutionRefs.current[3] = el; }} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="md:order-2 space-y-6">
                        <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>04</div>
                        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>New: Success Page</span>
                        <h3 className="text-3xl font-bold">Eliminating Booking Anxiety</h3>
                        <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            <p>One of the biggest gaps discovered: <strong className="text-white">students weren't sure if booking actually worked.</strong></p>
                        </div>
                        <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            {[
                                'Confirms booking success',
                                'Explains next steps clearly',
                                'Sets expectations (email, meeting link, no-show policy)',
                                'Provides direct support contact'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className="text-emerald-400">✓</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:order-1 rounded-2xl border border-white/10 overflow-hidden">
                        <Image
                            src="/images/ucw/SuccessPage.png"
                            alt="Success Confirmation Page"
                            width={1696}
                            height={1000}
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            {/* CONSTRAINTS */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5 bg-white/5">
                <div ref={constraintsRef} className="max-w-4xl mx-auto text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Real-World Constraints</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Designing Within Moodle</h2>
                    <p className="text-lg mb-12 max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                        This project lived inside Moodle, which imposed significant limitations. Instead of fighting constraints, I designed within them.
                    </p>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: '🚫', label: 'Limited Frontend Flexibility' },
                            { icon: '⚙️', label: 'No Custom Backend Logic' },
                            { icon: '🧩', label: 'Restricted Components' },
                            { icon: '🔍', label: 'No Advanced Filtering' },
                        ].map((constraint, i) => (
                            <div key={i} className="p-6 rounded-xl bg-neutral-900/50 border border-white/10">
                                <div className="text-2xl mb-3">{constraint.icon}</div>
                                <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{constraint.label}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-sm mt-8 italic" style={{ color: 'var(--color-text-muted)' }}>
                        My approach: Prioritize <strong className="text-white">clarity, hierarchy, and guided flow</strong> over technical complexity.
                    </p>
                </div>
            </section>

            {/* TESTING */}
            <section className="py-24 px-6 lg:px-12">
                <div ref={testingRef} className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Testing & Iteration</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Validating with Real Users</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-lg font-bold mb-6">Testing Focus</h3>
                            <ul className="space-y-4">
                                {['Speed to complete booking', 'Navigation clarity', 'Confidence after booking'].map((item, i) => (
                                    <li key={i} className="test-item flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-6">Key Changes After Testing</h3>
                            <ul className="space-y-4">
                                {[
                                    'Replaced "Book a Slot" with "Book a Session"',
                                    'Added progress indicators across steps',
                                    'Simplified tutor card layouts',
                                    'Reduced clutter on "Become a Tutor" page'
                                ].map((item, i) => (
                                    <li key={i} className="test-item flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                        <span className="text-emerald-400">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* IMPACT */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div ref={impactRef} className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Impact & Outcomes</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Measurable Results</h2>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid md:grid-cols-4 gap-6 mb-16">
                        {[
                            { value: '60%', label: 'Faster Booking Flow', desc: 'Time to complete reduced from ~5 min to ~2 min' },
                            { value: '40%', label: 'Drop-off Reduction', desc: 'Fewer students abandoning mid-flow' },
                            { value: '4', label: 'Clear Steps', desc: 'Vs. one overwhelming scroll page' },
                            { value: '100%', label: 'Confirmation Clarity', desc: 'New success page eliminated anxiety' },
                        ].map((metric, i) => (
                            <div key={i} className="impact-item p-6 rounded-2xl bg-neutral-950 border border-white/10 text-center hover:-translate-y-2 hover:border-white/20 transition-all duration-300">
                                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{metric.value}</div>
                                <h3 className="text-sm font-bold mb-2">{metric.label}</h3>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{metric.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Qualitative Outcomes */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-2xl bg-neutral-950 border border-white/10">
                            <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--color-accent)' }}>For Students</h3>
                            <ul className="space-y-3">
                                {[
                                    'Intuitive guided booking experience',
                                    'Clear understanding of tutor backgrounds',
                                    'Confidence in booking confirmation',
                                    'Easy access to support when needed'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                        <span className="text-emerald-400">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-8 rounded-2xl bg-neutral-950 border border-white/10">
                            <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--color-accent)' }}>For Learning Commons</h3>
                            <ul className="space-y-3">
                                {[
                                    'Scalable template for future services',
                                    'Reduced support tickets about booking',
                                    'Better tutor utilization visibility',
                                    'Reusable UX framework for other LMS tools'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                        <span className="text-emerald-400">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <p className="text-lg mt-12 text-center max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                        Most importantly, the Learning Commons team received a <strong className="text-white">repeatable UX framework</strong> they could extend beyond this project.
                    </p>
                </div>
            </section>

            {/* TOOLS */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5">
                <div ref={toolsRef} className="max-w-4xl mx-auto text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Tools & Methods</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">How I Worked</h2>

                    <div className="flex flex-wrap gap-4 justify-center">
                        {[
                            '🔍 UX Research', '👥 User Interviews', '🧠 Personas', '🗺️ Journey Mapping',
                            '📐 Information Architecture', '✏️ Wireframing', '🎨 Hi-Fi Prototyping',
                            '🧪 Usability Testing', '🤝 Stakeholder Reviews', '📦 LMS-Constrained Design'
                        ].map((tool, i) => (
                            <span key={i} className="tool-badge px-5 py-3 rounded-full bg-neutral-900 border border-white/10 text-sm font-medium hover:-translate-y-1 hover:border-white/30 transition-all duration-300">
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaRef} className="py-32 px-6 lg:px-12 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-6">Get In Touch</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Want to Improve Your Product's UX?</h2>
                <p className="text-xl max-w-2xl mx-auto mb-12" style={{ color: 'var(--color-text-muted)' }}>
                    I bring this same research-driven, constraint-aware approach to every product I work on.
                </p>
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
            </section>
        </div>
    );
}
