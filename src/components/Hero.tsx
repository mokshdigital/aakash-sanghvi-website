'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import HeroCanvas from './HeroCanvas';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const titleLine1Ref = useRef<HTMLSpanElement>(null);
    const titleLine2Ref = useRef<HTMLSpanElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Text Reveal
            tl.from([titleLine1Ref.current, titleLine2Ref.current], {
                y: "100%",
                duration: 1,
                stagger: 0.2,
                ease: "power4.out",
                delay: 0.2
            })
                .from(subRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5")
                .from(ctaRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5");

            // Mouse Parallax Logic
            const onMouseMove = (e: MouseEvent) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;

                gsap.to('.mouse-parallax', {
                    x: (i, target) => x * 50 * parseFloat(target.dataset.speed || '1'),
                    y: (i, target) => y * 50 * parseFloat(target.dataset.speed || '1'),
                    duration: 1,
                    ease: 'power2.out'
                });
            };

            window.addEventListener('mousemove', onMouseMove);
            return () => window.removeEventListener('mousemove', onMouseMove);

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <header ref={heroRef} className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden" id="hero">
            <HeroCanvas />

            {/* Mouse Parallax Orbs */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] mouse-parallax pointer-events-none"
                data-speed="0.05"
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[80px] mouse-parallax pointer-events-none"
                data-speed="0.08"
            />

            <div className="text-center px-4 relative z-10 flex flex-col items-center">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-none">
                    <div className="reveal-mask block">
                        <span ref={titleLine1Ref} className="reveal-text block">CREATIVE</span>
                    </div>
                    <div className="reveal-mask block">
                        <span ref={titleLine2Ref} className="reveal-text text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary block">
                            DEVELOPER
                        </span>
                    </div>
                </h1>

                <p ref={subRef} className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10">
                    Building modern web experiences with <span className="text-white font-semibold">AI-assisted coding</span> ✨
                </p>

                <div ref={ctaRef} className="flex justify-center gap-4">
                    <Link
                        href="/projects"
                        className="group relative px-8 py-3 bg-white text-black font-semibold rounded-full overflow-hidden hover-magnet inline-block"
                    >
                        <span className="relative z-10 transition-colors group-hover:text-white">View Projects</span>
                        <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                    </Link>
                    <Link
                        href="#about"
                        className="px-8 py-3 border border-white/20 rounded-full hover:bg-white/10 transition-all hover-magnet"
                    >
                        More About Me
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-scroll animate-bounce opacity-50">
                <span className="text-xs uppercase tracking-widest text-slate-500">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
            </div>
        </header>
    );
}
