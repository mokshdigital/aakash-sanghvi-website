'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EduStation() {
    const heroYearRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const narrativeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const metricsRef = useRef<HTMLDivElement>(null);
    const techCardsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // --- HERO ANIMATIONS ---
            // Staggered fade-in for hero content
            if (heroContentRef.current) {
                gsap.fromTo(
                    heroContentRef.current.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
                );
            }

            // Parallax on hero year
            if (heroYearRef.current) {
                gsap.to(heroYearRef.current, {
                    scrollTrigger: {
                        trigger: heroYearRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    },
                    y: -150,
                    opacity: 0,
                });
            }

            // --- TIMELINE ANIMATIONS ---
            if (timelineRef.current) {
                const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
                gsap.fromTo(
                    timelineItems,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.12,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }

            // --- NARRATIVE SECTIONS ---
            narrativeRefs.current.forEach((section, index) => {
                if (!section) return;
                const textCol = section.querySelector('.narrative-text');
                const imageCol = section.querySelector('.narrative-image');
                const quote = section.querySelector('.narrative-quote');

                const direction = index % 2 === 0 ? -50 : 50; // Alternate left/right

                if (textCol) {
                    gsap.fromTo(
                        textCol,
                        { opacity: 0, x: direction },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.8,
                            ease: 'power2.out',
                            scrollTrigger: { trigger: section, start: 'top 75%' },
                        }
                    );
                }
                if (imageCol) {
                    gsap.fromTo(
                        imageCol,
                        { opacity: 0, x: -direction },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.8,
                            ease: 'power2.out',
                            scrollTrigger: { trigger: section, start: 'top 75%' },
                        }
                    );
                }
                if (quote) {
                    gsap.fromTo(
                        quote,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            delay: 0.3,
                            ease: 'power2.out',
                            scrollTrigger: { trigger: quote, start: 'top 85%' },
                        }
                    );
                }
            });

            // --- METRICS COUNTER ---
            if (metricsRef.current) {
                const metricCards = metricsRef.current.querySelectorAll('.metric-card');
                gsap.fromTo(
                    metricCards,
                    { opacity: 0, y: 30, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: metricsRef.current, start: 'top 80%' },
                    }
                );
            }

            // --- TECH CARDS ---
            if (techCardsRef.current) {
                const cards = techCardsRef.current.querySelectorAll('.tech-card');
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: techCardsRef.current, start: 'top 80%' },
                    }
                );
            }

            // --- CTA ---
            if (ctaRef.current) {
                gsap.fromTo(
                    ctaRef.current.children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
                    }
                );
            }
        });

        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    return (
        <div className="text-left">
            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 lg:px-12 pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

                {/* Background Year Parallax */}
                <div
                    ref={heroYearRef}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15vw] md:text-[200px] font-black leading-none opacity-5 pointer-events-none select-none"
                    style={{ color: 'var(--color-text)' }}
                >
                    2020
                </div>

                <div ref={heroContentRef} className="relative z-10 max-w-4xl mx-auto space-y-8">
                    <div
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white/5 font-semibold text-sm uppercase tracking-wide"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-accent)' }}
                    >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
                        Crisis Response Strategy • EdTech SaaS
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1]">
                        EduStation: Scaling from Zero to<br />
                        <span className="gradient-text">Market Dominance in 60 Days</span>
                    </h1>

                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                        Orchestrated the digital transformation of a $10M physical coaching business into a scalable B2B SaaS ecosystem during the global lockdown.
                    </p>
                </div>
            </section>

            {/* STRATEGIC TIMELINE */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5 bg-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] block mb-3 gradient-text">Executive Timeline</span>
                        <h2 className="text-3xl md:text-4xl font-bold">From Crisis Management to Expansion</h2>
                    </div>

                    <div ref={timelineRef} className="relative md:flex justify-between items-start gap-8 space-y-12 md:space-y-0">
                        {/* Connecting Line */}
                        <div
                            className="hidden md:block absolute top-[24px] left-0 w-full h-[2px] z-0"
                            style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.1), var(--color-accent), rgba(255,255,255,0.1))' }}
                        />

                        {[
                            { step: '1', date: 'Mar 2020', title: 'Strategic Pivot', desc: 'Identified pure-digital opportunity amidst total physical shutdown.' },
                            { step: '2', date: 'May 2020', title: 'Rapid Deployment', desc: 'Delivered functional MVP in 60 days to retain 100% of student base.' },
                            { step: '3', date: 'Oct 2020', title: 'Product Market Fit', desc: 'Scaled to 1,000+ users; validated modular curriculum architecture.' },
                            { step: '4', date: 'Dec 2020', title: 'Enterprise Scaling', desc: 'Launched White-label B2B model, onboarding 20+ regional partners.' },
                        ].map((item, i) => (
                            <div key={i} className="timeline-item relative z-10 flex flex-col md:items-center md:text-center md:flex-1 pl-12 md:pl-0">
                                <div
                                    className="absolute left-0 md:static w-12 h-12 rounded-full bg-neutral-900 border-2 md:mx-auto mb-6 flex items-center justify-center font-bold text-sm text-gray-500 transition-all duration-300 transform hover:scale-110 hover:border-white/50"
                                    style={{ borderColor: 'var(--color-border)' }}
                                >
                                    {item.step}
                                </div>
                                <span className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-accent)' }}>{item.date}</span>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm leading-relaxed md:max-w-[200px]" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NARRATIVE */}
            <div className="max-w-6xl mx-auto px-6 lg:px-12 py-32 space-y-32">
                <div className="text-center mb-20">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">The Strategy</span>
                    <h2 className="text-3xl md:text-4xl font-bold">Turning Disruption into Competitive Advantage</h2>
                </div>

                {/* Narrative 01 */}
                <div ref={(el) => { narrativeRefs.current[0] = el; }} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="narrative-text space-y-6">
                        <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>01</div>
                        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>The Challenge</span>
                        <h3 className="text-3xl font-bold">Overcoming The Physical Ceiling</h3>
                        <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            <p>When the pandemic hit, ESPI's entire revenue model—dependent on physical classroom density—collapsed overnight. The challenge wasn't just technical; it was existential.</p>
                            <p>As Product Lead, I convinced stakeholders to abandon the "wait and see" approach. We redefined the company not as a coaching institute, but as a <strong className="text-white">content-first technology platform</strong>.</p>
                        </div>
                    </div>
                    <div className="narrative-image p-1 rounded-2xl border-gradient group">
                        <div className="aspect-[16/10] bg-neutral-900 rounded-xl overflow-hidden relative">
                            <Image
                                src="/images/edustation/StudentDashboard_ProgressReport.png"
                                alt="EduStation Student Progress Dashboard showing analytics and performance tracking"
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-xs font-bold uppercase tracking-widest text-white/80">Student Progress Dashboard</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Narrative 02 */}
                <div ref={(el) => { narrativeRefs.current[1] = el; }} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="narrative-image md:order-1 p-1 rounded-2xl border-gradient group">
                        <div className="aspect-[16/10] bg-neutral-900 rounded-xl overflow-hidden relative">
                            <Image
                                src="/images/edustation/SystemDashboard_CourseCurriculum.png"
                                alt="EduStation Course Curriculum Builder showing modular content architecture"
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-xs font-bold uppercase tracking-widest text-white/80">Modular Curriculum Builder</span>
                            </div>
                        </div>
                    </div>
                    <div className="narrative-text md:order-2 space-y-6">
                        <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>02</div>
                        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>The Execution</span>
                        <h3 className="text-3xl font-bold">Agile War Room Deployment</h3>
                        <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            <p>We didn't have the luxury of a 12-month roadmap. I stood up a cross-functional "War Room" team, focusing on the critical path: Content Delivery and Assessment integrity.</p>
                            <p>By decoupling the content engine from the user interface, we built a modular system that allowed us to launch a stripped-down but stable MVP in just <strong className="text-white">60 days</strong>, securing our existing student retention.</p>
                        </div>
                    </div>
                </div>

                {/* Narrative 03 */}
                <div ref={(el) => { narrativeRefs.current[2] = el; }} className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="narrative-text space-y-6">
                        <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>03</div>
                        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>The Scale</span>
                        <h3 className="text-3xl font-bold">Unlocking The B2B Flywheel</h3>
                        <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            <p>Stability was just step one. I recognized that smaller competitors were struggling with the same tech debt. We pivoted the platform to support <strong className="text-white">Multi-Tenancy</strong>.</p>
                            <p>We effectively became the "Shopify for Coaching Institutes," allowing us to onboard <strong className="text-white">20+ regional partners</strong> onto our infrastructure. This transformed a localized crisis into a borderless revenue stream.</p>
                        </div>
                    </div>
                    <div className="narrative-image space-y-6">
                        <div className="p-1 rounded-2xl border-gradient group">
                            <div className="aspect-[16/10] bg-neutral-900 rounded-xl overflow-hidden relative">
                                <Image
                                    src="/images/edustation/SystemDashboard_NewPackage.png"
                                    alt="EduStation B2B Package Configuration for multi-tenant deployment"
                                    fill
                                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-xs font-bold uppercase tracking-widest text-white/80">B2B Package Configuration</span>
                                </div>
                            </div>
                        </div>
                        {/* Blockquote OUTSIDE the image container */}
                        <blockquote className="narrative-quote p-6 border-l-4 bg-white/5 rounded-r-xl text-xl italic font-medium" style={{ borderColor: 'var(--color-accent)' }}>
                            "We didn't just survive the pandemic; we used it as a catalyst to build a borderless, scalable EdTech ecosystem."
                        </blockquote>
                    </div>
                </div>
            </div>

            {/* PRODUCT SHOWCASE */}
            <section className="py-24 border-y border-white/5 bg-white/5 overflow-visible">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Platform Overview</span>
                        <h2 className="text-3xl md:text-4xl font-bold">The Complete Learning Ecosystem</h2>
                        <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                            A unified platform serving students, tutors, and administrators with purpose-built interfaces.
                        </p>
                    </div>
                </div>

                {/* Horizontal Scroll Gallery - Full width container */}
                <div
                    className="flex gap-6 pb-6 px-6 lg:px-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                    style={{
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(255,255,255,0.2) transparent',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {[
                        {
                            src: '/images/edustation/StudentDashboard_paint.png',
                            title: 'Student Dashboard',
                            desc: 'Personalized learning interface with visual progress tracking',
                        },
                        {
                            src: '/images/edustation/StudentWritingTask.png',
                            title: 'Writing Assessment',
                            desc: 'Interactive task interface with real-time feedback',
                        },
                        {
                            src: '/images/edustation/SystemDashboard_CourseList.png',
                            title: 'Course Management',
                            desc: 'Comprehensive course catalog with status tracking',
                        },
                        {
                            src: '/images/edustation/SystemDashboard_AgentList2.png',
                            title: 'Tutor Network',
                            desc: 'Agent management for distributed teaching staff',
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center group"
                        >
                            <div className="p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500">
                                <div className="bg-neutral-950 rounded-xl overflow-hidden">
                                    {/* Browser Chrome Effect */}
                                    <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/80 border-b border-white/5">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="bg-neutral-800 rounded-md px-3 py-1 text-xs text-gray-500 text-center truncate">
                                                edustation.app/{item.title.toLowerCase().replace(' ', '-')}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Screenshot */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={item.src}
                                            alt={item.title}
                                            fill
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 45vw"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Caption */}
                            <div className="mt-4 px-2">
                                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll Hint */}
                <div className="hidden md:flex items-center justify-center gap-2 mt-6 text-gray-500 text-sm">
                    <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span>Scroll to explore</span>
                </div>
            </section>

            {/* IMPACT METRICS */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5">
                <div ref={metricsRef} className="max-w-6xl mx-auto text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-6">Business Outcomes</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-16">Measurable Impact</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '5,000+', label: 'Paid Users Acquired' },
                            { value: '20+', label: 'B2B Partners Onboarded' },
                            { value: '60 Days', label: 'Concept to Revenue' },
                            { value: '100%', label: 'Retention of Core Base' },
                        ].map((stat, i) => (
                            <div key={i} className="metric-card p-8 rounded-2xl bg-neutral-900/50 border border-white/5 hover:-translate-y-2 hover:border-white/20 transition-all duration-300">
                                <div className="text-4xl md:text-5xl font-black mb-2 gradient-text">{stat.value}</div>
                                <div className="text-sm font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SYSTEM ARCHITECTURE */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div ref={techCardsRef} className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-6">System Design</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Scalable Architecture</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: '🏗️', title: 'Tenant Isolation', desc: 'Engineered a multi-tenant DB schema ensuring strict data sovereignty for B2B partners while maintaining a shared codebase for rapid feature deployment.' },
                            { icon: '🧩', title: 'Headless CMS Strategy', desc: 'Decoupled content management from delivery, enabling non-technical staff to update curriculum modules without engineering downtime.' },
                            { icon: '🧠', title: 'Adaptive Learning Engine', desc: 'Implemented an assessment logic layer that dynamically adjusted difficulty based on user performance heuristics.' },
                        ].map((tech, i) => (
                            <div key={i} className="tech-card group p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500">
                                <div className="bg-neutral-950 h-full rounded-xl p-8 pt-12 relative overflow-hidden">
                                    <div className="text-4xl mb-6 bg-neutral-900 w-16 h-16 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/30 group-hover:scale-110 transition-all duration-300">
                                        {tech.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{tech.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{tech.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaRef} className="py-32 px-6 lg:px-12 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-6">Next Steps</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Scale Your Product?</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                    I bring this same level of strategic clarity and execution speed to every product I lead.
                </p>
                <Link
                    href="/work-with-me"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 glow hover:shadow-lg"
                    style={{ background: 'var(--gradient-accent)' }}
                >
                    Start a conversation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </section>
        </div>
    );
}
