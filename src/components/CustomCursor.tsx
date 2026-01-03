'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only run on client and if device has fine pointer (desktop)
        if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

        const dot = dotRef.current;
        const outline = outlineRef.current;

        if (!dot || !outline) return;

        // Initial Hide
        gsap.set(dot, { xPercent: -50, yPercent: -50 });
        gsap.set(outline, { xPercent: -50, yPercent: -50 });

        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Dot follows instantly
            gsap.to(dot, { x: clientX, y: clientY, duration: 0 });

            // Outline follows with delay
            gsap.to(outline, { x: clientX, y: clientY, duration: 0.15, ease: 'power2.out' });
        };

        const onHoverEnter = () => {
            gsap.to(outline, { scale: 1.5, duration: 0.2 });
        };

        const onHoverLeave = () => {
            gsap.to(outline, { scale: 1, duration: 0.2 });
        };

        window.addEventListener('mousemove', onMouseMove);

        // Add hover listeners to clickable elements
        // We use a MutationObserver or delegation to handle dynamic elements
        const addHoverListeners = () => {
            const clickables = document.querySelectorAll('a, button, .hover-magnet, .card-item');
            clickables.forEach((el) => {
                el.addEventListener('mouseenter', onHoverEnter);
                el.addEventListener('mouseleave', onHoverLeave);
            });
        };

        addHoverListeners();
        // Re-add on DOM changes (simple approach for now, could be optimized)
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
            // Cleanup listeners...
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            />
            <div
                ref={outlineRef}
                className="fixed top-0 left-0 w-10 h-10 border border-white/50 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block transition-transform"
            />
        </>
    );
}
