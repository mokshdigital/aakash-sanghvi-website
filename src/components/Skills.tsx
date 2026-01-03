'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Skills() {
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

            // Card 3D Tilt Logic handled by card component or global listeners
            // For simplicity, we can just rely on the CSS hover effects + global listener in CustomCursor? 
            // Or re-implement here to be safe. 
            // The Layout (CustomCursor) handles the global listeners for .card-item if implemented correctly.
            // But let's add the specific mousemove listener for the card-glow here since CustomCursor mainly handles cursor.

            const cards = document.querySelectorAll('.card-item');
            cards.forEach((card) => {
                const glow = card.querySelector('.card-glow') as HTMLElement;
                const htmlCard = card as HTMLElement;

                const onMove = (e: MouseEvent) => {
                    const rect = htmlCard.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    if (glow) {
                        gsap.to(glow, { x, y, duration: 0.1 });
                    }

                    const xCenter = rect.width / 2;
                    const yCenter = rect.height / 2;
                    const rotateX = ((y - yCenter) / yCenter) * -5;
                    const rotateY = ((x - xCenter) / xCenter) * 5;

                    gsap.to(htmlCard, {
                        rotationX: rotateX,
                        rotationY: rotateY,
                        transformPerspective: 1000,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                };
                const onLeave = () => {
                    gsap.to(htmlCard, { rotationX: 0, rotationY: 0, duration: 0.5 });
                };

                htmlCard.addEventListener('mousemove', onMove);
                htmlCard.addEventListener('mouseleave', onLeave);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const skills = [
        {
            icon: "💻",
            title: "Frontend Development",
            desc: "Vanilla JavaScript, HTML5, CSS3. Mastery of the fundamentals to build rock-solid interfaces.",
            color: "primary"
        },
        {
            icon: "⚡",
            title: "Modern Frameworks",
            desc: "Next.js & React. Building full-stack applications with the latest and greatest tooling.",
            color: "secondary"
        },
        {
            icon: "🤖",
            title: "AI-Assisted Dev",
            desc: "Expertise in AI workflows. Using LLMs to code faster, smarter, and bug-free.",
            color: "purple-500"
        },
        {
            icon: "🚀",
            title: "Deployment",
            desc: "Vercel, Netlify, Supabase. Shipping live projects that scale and perform.",
            color: "pink-500"
        }
    ];

    return (
        <section id="skills" className="py-24 bg-dark/50 relative" ref={sectionRef}>
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center fade-up">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Tech Stack</span> & Skills
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="card-item bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors relative overflow-hidden group fade-up"
                        >
                            <div className="card-glow"></div>
                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform bg-${skill.color === 'primary' ? 'primary' : skill.color === 'secondary' ? 'secondary' : skill.color}/20 text-white`}>
                                    {skill.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
                                <p className="text-slate-400">{skill.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
