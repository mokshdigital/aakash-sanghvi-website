'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Marquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Clone content to ensure seamless loop if needed, 
            // but simpler is to just use a really long text string or duplicate in render.
            // The original script used xPercent: -100 on .marquee-content

            gsap.to(".marquee-content", {
                xPercent: -100,
                repeat: -1,
                duration: 20,
                ease: "linear"
            });
        }, marqueeRef);

        return () => ctx.revert();
    }, []);

    const text = "AI-POWERED • WEB DEVELOPMENT • INNOVATION • PERFORMANCE • DESIGN • ";

    return (
        <div className="py-12 bg-slate-900 border-y border-white/5 overflow-hidden" ref={marqueeRef}>
            <div className="flex whitespace-nowrap">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="marquee-content text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-800 px-4 select-none"
                    >
                        {text}
                    </div>
                ))}
            </div>
        </div>
    );
}
