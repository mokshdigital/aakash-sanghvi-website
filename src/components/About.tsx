'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const fadeUps = gsap.utils.toArray('.fade-up');

            fadeUps.forEach((el: any) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });

            // SVG Path Drawing
            gsap.to(".draw-path", {
                strokeDashoffset: 0,
                scrollTrigger: {
                    trigger: ".draw-path",
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="min-h-screen flex items-center py-24 relative overflow-hidden" ref={sectionRef}>
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                <div className="relative order-2 md:order-1">
                    <svg viewBox="0 0 400 300" className="w-full h-auto opacity-50" fill="none" stroke="currentColor">
                        {/* Decorative abstract lines */}
                        <path className="draw-path text-primary" strokeWidth="2" d="M20,150 Q100,280 200,150 T380,150" />
                        <path className="draw-path text-secondary" strokeWidth="2" d="M20,170 Q100,40 200,170 T380,170" />
                    </svg>
                </div>

                <div className="order-1 md:order-2 space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold fade-up">About Me</h2>
                    <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                        <p className="fade-up">
                            Hey! I&apos;m a web developer who&apos;s all about building cool stuff with <span
                                className="text-primary font-semibold">AI-assisted coding</span>. I&apos;m constantly learning,
                            experimenting, and creating projects that push boundaries.
                        </p>
                        <p className="fade-up">
                            Think of me as someone who&apos;s always leveling up their skills and shipping real projects that
                            actually work. I specialize in modern web technologies and use AI tools to build efficient,
                            scalable, and beautiful web applications faster.
                        </p>
                        <p className="fade-up">
                            The future of web dev is AI-powered, and I&apos;m here for it. Always learning, always building,
                            always shipping.
                        </p>
                    </div>
                    <div className="fade-up pt-4">
                        <Link href="/work-with-me"
                            className="text-white border-b border-primary pb-1 hover:text-primary transition-colors inline-flex items-center gap-2 group">
                            Start a Project
                            <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
