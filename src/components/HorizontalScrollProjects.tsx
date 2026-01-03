'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard, { Project } from './ProjectCard';
import Link from 'next/link';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProjectsProps {
    projects: Project[];
}

export default function HorizontalScrollProjects({ projects }: HorizontalScrollProjectsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const slider = sliderRef.current;
            const trigger = triggerRef.current;

            if (!slider || !trigger) return;

            // Calculate width for the storage movement
            // We want to scroll the total width of the slider minus the viewport width
            const totalWidth = slider.scrollWidth;
            const viewportWidth = window.innerWidth;

            // If total width is less than viewport (few projects), don't scroll horizontally
            if (totalWidth <= viewportWidth) return;

            // We want to move this amount (adding more padding at end for comfort):
            const xMovement = -(totalWidth - viewportWidth + 200);

            gsap.to(slider, {
                x: xMovement,
                ease: 'none',
                scrollTrigger: {
                    trigger: trigger,
                    pin: true,
                    scrub: 1,
                    start: 'top top',
                    end: () => `+=${totalWidth}`, // Use full totalWidth to ensure slower, complete scroll
                    invalidateOnRefresh: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [projects]);

    return (
        <section ref={sectionRef} className="relative">
            <div ref={triggerRef} className="h-screen flex flex-col justify-center overflow-hidden">

                <div className="container mx-auto px-6 lg:px-12 mb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <span className="text-xs font-medium uppercase tracking-[0.2em] gradient-text block mb-4">Proof of Work</span>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Selected Outcomes</h2>
                        </div>
                        <Link href="/projects" className="text-sm font-medium hover:underline" style={{ color: 'var(--color-accent)' }}>
                            View all projects →
                        </Link>
                    </div>
                </div>

                <div
                    ref={sliderRef}
                    className="flex gap-8 px-6 lg:px-12 w-max"
                >
                    {projects.map((project) => (
                        <div key={project.id || project.slug} className="w-[85vw] md:w-[70vw] lg:w-[55vw] flex-shrink-0">
                            <ProjectCard {...project} />
                        </div>
                    ))}

                    {/* Optional: Add a 'View All' card at the end? */}
                    <div className="w-[85vw] md:w-[30vw] flex-shrink-0 flex items-center justify-center border-l border-white/10">
                        <Link href="/projects" className="group flex flex-col items-center gap-4 text-center">
                            <span className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-white">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <span className="text-lg font-medium">View all archived projects</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
