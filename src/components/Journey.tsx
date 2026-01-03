'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Journey() {
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
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" className="py-24 relative" ref={sectionRef}>
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center fade-up">My Journey</h2>

                <div className="max-w-3xl mx-auto space-y-12">

                    {/* Item 1 */}
                    <div className="relative pl-8 border-l border-white/10 pb-12 fade-up">
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-dark"></div>
                        <span className="text-sm text-primary font-mono mb-2 block">Currently</span>
                        <h3 className="text-2xl font-bold mb-2">Freelance Web Developer</h3>
                        <p className="text-slate-400">
                            Building and deploying live projects using modern tech stacks. Focused on delivering
                            high-quality, performant web applications for clients.
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="relative pl-8 border-l border-white/10 pb-12 fade-up">
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-dark"></div>
                        <span className="text-sm text-secondary font-mono mb-2 block">Continuous</span>
                        <h3 className="text-2xl font-bold mb-2">Learning & Evolving</h3>
                        <p className="text-slate-400">
                            Mastering new frameworks and AI tools. Every project is an opportunity to learn something new
                            and improve my craft.
                        </p>
                    </div>

                    {/* Item 3 */}
                    <div className="relative pl-8 border-l border-white/10 fade-up">
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-white ring-4 ring-dark"></div>
                        <span className="text-sm text-slate-500 font-mono mb-2 block">The Beginning</span>
                        <h3 className="text-2xl font-bold mb-2">Discovery</h3>
                        <p className="text-slate-400">
                            Discovered the power of AI-assisted coding. Realized it&apos;s not about replacing skills, but
                            amplifying them to build bigger and better things.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
