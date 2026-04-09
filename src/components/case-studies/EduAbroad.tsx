'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EduAbroad() {
    const heroContentRef = useRef<HTMLDivElement>(null);
    const challengeCardsRef = useRef<HTMLDivElement>(null);
    const workflowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const techCardsRef = useRef<HTMLDivElement>(null);
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

            // --- CHALLENGE CARDS ---
            if (challengeCardsRef.current) {
                const cards = challengeCardsRef.current.querySelectorAll('.challenge-card');
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 40, scale: 0.95 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: challengeCardsRef.current, start: 'top 80%' },
                    }
                );
            }

            // --- WORKFLOWS ---
            workflowRefs.current.forEach((section, index) => {
                if (!section) return;
                const textCol = section.querySelector('.workflow-text');
                const imageCol = section.querySelector('.workflow-image');
                const direction = index % 2 === 0 ? -50 : 50;

                if (textCol) {
                    gsap.fromTo(textCol, { opacity: 0, x: direction }, {
                        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
                        scrollTrigger: { trigger: section, start: 'top 75%' },
                    });
                }
                if (imageCol) {
                    gsap.fromTo(imageCol, { opacity: 0, x: -direction }, {
                        opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
                        scrollTrigger: { trigger: section, start: 'top 75%' },
                    });
                }
            });

            // --- TECH CARDS ---
            if (techCardsRef.current) {
                const cards = techCardsRef.current.querySelectorAll('.tech-card');
                gsap.fromTo(cards, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
                    scrollTrigger: { trigger: techCardsRef.current, start: 'top 80%' },
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
            <section className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-12 pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div ref={heroContentRef} className="space-y-6 relative z-10">
                        <div
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white/5 font-semibold text-sm uppercase tracking-wide"
                            style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-accent)' }}
                        >
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
                            Rapid Prototyping • Event Tech
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                            EduAbroad<br />
                            <span className="gradient-text">Expo Manager</span>
                        </h1>

                        <p className="text-xl font-light max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
                            A real-time event management system built in just <strong className="text-white">10 days</strong>.
                            Handled 2,000+ students and 50+ universities across 4 cities with zero downtime.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            {[
                                { label: 'Role', value: 'Lead Developer' },
                                { label: 'Speed', value: '10 Days Sprint' },
                                { label: 'Stack', value: 'No-Code (Adalo)' },
                            ].map((meta, i) => (
                                <div key={i} className="px-5 py-3 rounded-xl border border-white/10 bg-white/5">
                                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>{meta.label}</div>
                                    <div className="text-sm font-semibold">{meta.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group flex justify-center">
                        <div className="relative w-[280px] md:w-[320px] transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="/images/espi-eduabroad-expo/Home.png"
                                alt="EduAbroad Expo App - Login Screen with OTP verification"
                                width={1250}
                                height={2500}
                                className="w-full h-auto drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CHALLENGE */}
            <section className="py-24 px-6 lg:px-12 border-y border-white/5 bg-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">The Challenge</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Built Under Pressure</h2>
                    </div>

                    <div ref={challengeCardsRef} className="grid md:grid-cols-3 gap-8">
                        {[
                            { value: '10 Days', color: 'gradient-text', desc: 'To conceive, build, and deploy a robust multi-user system before the expo doors opened.' },
                            { value: '2,000+', color: 'text-white', desc: 'Active students verifying identities and booking sessions in real-time.' },
                            { value: 'Real-Time', color: 'gradient-text', desc: 'Instant data for management to track walk-ins and lead distribution.' },
                        ].map((card, i) => (
                            <div key={i} className="challenge-card p-8 rounded-2xl bg-neutral-900/50 border border-white/5 text-center hover:-translate-y-2 hover:border-white/20 transition-all duration-300">
                                <div className={`text-4xl md:text-5xl font-black mb-4 ${card.color}`}>{card.value}</div>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CORE WORKFLOWS */}
            <div className="max-w-6xl mx-auto px-6 lg:px-12 py-32 space-y-32">
                <div className="text-center mb-20">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Core Workflows</span>
                    <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
                </div>

                {/* Workflow 01 */}
                <div ref={(el) => { workflowRefs.current[0] = el; }} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="workflow-text space-y-6">
                        <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>01</div>
                        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>Student Experience</span>
                        <h3 className="text-3xl font-bold">Seamless Digital Onboarding</h3>
                        <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            <p>We replaced paper forms with <strong className="text-white">WhatsApp OTP verification</strong>. Students could instantly view matched universities, book IELTS demos, and take scholarship tests, all from their phones.</p>
                        </div>
                        <ul className="space-y-3 pt-4">
                            {['WhatsApp OTP Verification', 'Automated Scholarship Scoring', 'Instant Slot Booking'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                    <span style={{ color: 'var(--color-accent)' }}>→</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="workflow-image grid grid-cols-2 gap-4">
                        <div className="w-full">
                            <Image
                                src="/images/espi-eduabroad-expo/StudentDashboard.png"
                                alt="Student Dashboard showing matched universities"
                                width={1250}
                                height={2500}
                                className="w-full h-auto drop-shadow-xl"
                            />
                        </div>
                        <div className="w-full mt-8">
                            <Image
                                src="/images/espi-eduabroad-expo/Student_Test1.png"
                                alt="Scholarship Test Interface"
                                width={1250}
                                height={2500}
                                className="w-full h-auto drop-shadow-xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Workflow 02 */}
                <div ref={(el) => { workflowRefs.current[1] = el; }} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="workflow-image md:order-1 grid grid-cols-2 gap-4">
                        <div className="w-full">
                            <Image
                                src="/images/espi-eduabroad-expo/Counsellor_Home.png"
                                alt="Counsellor Dashboard with student triage counters"
                                width={1250}
                                height={2500}
                                className="w-full h-auto drop-shadow-xl"
                            />
                        </div>
                        <div className="w-full mt-8">
                            <Image
                                src="/images/espi-eduabroad-expo/Counsellor_SelectRep.png"
                                alt="Assigning student to university representative"
                                width={1250}
                                height={2500}
                                className="w-full h-auto drop-shadow-xl"
                            />
                        </div>
                    </div>
                    <div className="workflow-text md:order-2 space-y-6">
                        <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>02</div>
                        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>Triage System</span>
                        <h3 className="text-3xl font-bold">Smart Lead Matchmaking</h3>
                        <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            <p>Counselors acted as the intake layer, enriching student profiles and <strong className="text-white">"triaging"</strong> them to the correct university representatives based on eligibility. This ensured high-quality, pre-qualified leads.</p>
                        </div>
                    </div>
                </div>

                {/* Workflow 03 */}
                <div ref={(el) => { workflowRefs.current[2] = el; }} className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="workflow-text space-y-6">
                        <div className="text-8xl font-black opacity-10 leading-none -mb-8 select-none" style={{ color: 'var(--color-accent)' }}>03</div>
                        <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--color-accent)' }}>Rep CRM</span>
                        <h3 className="text-3xl font-bold">Pocket CRM for Universities</h3>
                        <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            <p>University reps ditched notepads for a <strong className="text-white">dedicated tablet interface</strong>. They could see their specific leads, view academic history, and log interaction remarks instantly—eliminating post-event data entry.</p>
                        </div>
                    </div>
                    <div className="workflow-image grid grid-cols-2 gap-4">
                        <div className="w-full">
                            <Image
                                src="/images/espi-eduabroad-expo/UniRep_Home.png"
                                alt="University Rep Dashboard with lead counters"
                                width={1250}
                                height={2500}
                                className="w-full h-auto drop-shadow-xl"
                            />
                        </div>
                        <div className="w-full mt-8">
                            <Image
                                src="/images/espi-eduabroad-expo/UniRep_AddRemark.png"
                                alt="Adding meeting remarks for a student"
                                width={1250}
                                height={2500}
                                className="w-full h-auto drop-shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* APP SHOWCASE GALLERY */}
            <section className="py-24 border-y border-white/5 bg-white/5 overflow-visible">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-3">Complete App Experience</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Every Screen, Every Role</h2>
                        <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                            A unified platform serving students, counsellors, and university representatives—all in real-time.
                        </p>
                    </div>
                </div>

                {/* Student Screens */}
                <div className="mb-12">
                    <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm">🎓</span>
                            Student Journey
                        </h3>
                    </div>
                    <div
                        className="flex justify-center gap-6 pb-4 px-6 lg:px-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                        style={{
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255,255,255,0.2) transparent',
                        }}
                    >
                        {[
                            { src: '/images/espi-eduabroad-expo/Student_BookCounsellor.png', title: 'Book Counsellor', desc: 'Schedule one-on-one sessions' },
                            { src: '/images/espi-eduabroad-expo/Student_IELTSdemo.png', title: 'IELTS Demo', desc: 'Book speaking practice slots' },
                            { src: '/images/espi-eduabroad-expo/Student_MeetUniRep.png', title: 'Meet University Rep', desc: 'Direct booking with representatives' },
                            { src: '/images/espi-eduabroad-expo/Student_Test2.png', title: 'Scholarship Test', desc: 'Automated scoring for waivers' },
                        ].map((item, i) => (
                            <div key={i} className="flex-shrink-0 w-[200px] md:w-[240px] snap-center group">
                                <div className="relative transition-transform duration-300 hover:-translate-y-2">
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        width={1250}
                                        height={2500}
                                        className="w-full h-auto drop-shadow-xl"
                                        style={{ maxHeight: '70vh' }}
                                    />
                                </div>
                                <div className="mt-3 text-center">
                                    <h4 className="text-sm font-bold">{item.title}</h4>
                                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Counsellor Screens */}
                <div className="mb-12">
                    <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-sm">👨‍💼</span>
                            Counsellor Tools
                        </h3>
                    </div>
                    <div
                        className="flex justify-center gap-6 pb-4 px-6 lg:px-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                        style={{
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255,255,255,0.2) transparent',
                        }}
                    >
                        {[
                            { src: '/images/espi-eduabroad-expo/Counsellor_AssignStudentList.png', title: 'Student Queue', desc: 'View students awaiting triage' },
                            { src: '/images/espi-eduabroad-expo/Counsellor_OnboardStudent.png', title: 'Onboard Student', desc: 'Capture academic profile' },
                            { src: '/images/espi-eduabroad-expo/Counsellor_StudentDetails.png', title: 'Student Profile', desc: 'Complete student overview' },
                        ].map((item, i) => (
                            <div key={i} className="flex-shrink-0 w-[200px] md:w-[240px] snap-center group">
                                <div className="relative transition-transform duration-300 hover:-translate-y-2">
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        width={1250}
                                        height={2500}
                                        className="w-full h-auto drop-shadow-xl"
                                        style={{ maxHeight: '70vh' }}
                                    />
                                </div>
                                <div className="mt-3 text-center">
                                    <h4 className="text-sm font-bold">{item.title}</h4>
                                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* UniRep Screens */}
                <div>
                    <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-sm">🏛️</span>
                            University Rep CRM
                        </h3>
                    </div>
                    <div
                        className="flex justify-center gap-6 pb-4 px-6 lg:px-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                        style={{
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255,255,255,0.2) transparent',
                        }}
                    >
                        {[
                            { src: '/images/espi-eduabroad-expo/UniRep_StudentList.png', title: 'Lead Pipeline', desc: 'View all assigned students' },
                            { src: '/images/espi-eduabroad-expo/UniRep_StudentRemarks.png', title: 'Student Remarks', desc: 'Full interaction history' },
                        ].map((item, i) => (
                            <div key={i} className="flex-shrink-0 w-[200px] md:w-[240px] snap-center group">
                                <div className="relative transition-transform duration-300 hover:-translate-y-2">
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        width={1250}
                                        height={2500}
                                        className="w-full h-auto drop-shadow-xl"
                                        style={{ maxHeight: '70vh' }}
                                    />
                                </div>
                                <div className="mt-3 text-center">
                                    <h4 className="text-sm font-bold">{item.title}</h4>
                                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Hint */}
                <div className="hidden md:flex items-center justify-center gap-2 mt-8 text-gray-500 text-sm">
                    <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <span>Scroll each row to explore</span>
                </div>
            </section>

            {/* TECHNICAL */}
            <section className="py-24 px-6 lg:px-12 bg-neutral-900/30">
                <div ref={techCardsRef} className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-6">Under The Hood</span>
                        <h2 className="text-3xl md:text-4xl font-bold">Technical Implementation</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { title: 'Adalo No-Code & Database', desc: 'Leveraged Adalo\'s relational database to handle complex many-to-many relationships (Students ↔ Universities ↔ Counselors). This allowed for rapid iteration without writing boilerplate backend code.' },
                            { title: 'Automated Scholarship Engine', desc: 'Custom logic automatically calculated waivers based on test scores (1-30 scale), instantly reflecting the award on the student\'s dashboard.' },
                        ].map((tech, i) => (
                            <div key={i} className="tech-card p-8 rounded-2xl bg-neutral-950 border border-white/10 hover:border-white/20 transition-colors duration-300">
                                <h3 className="text-xl font-bold mb-4">{tech.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaRef} className="py-32 px-6 lg:px-12 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block mb-6">Next Steps</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Need Something Built Fast?</h2>
                <p className="text-xl max-w-2xl mx-auto mb-12" style={{ color: 'var(--color-text-muted)' }}>
                    I specialize in rapid prototyping and delivering production-ready systems under tight deadlines.
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
