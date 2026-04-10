import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ContactPageSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Work With Me',
    description: 'Ready to build something great? Book a call with Aakash Sanghvi to discuss product strategy, UX design, or full-stack development for your next project.',
    openGraph: {
        title: 'Work With Aakash Sanghvi',
        description: 'Book a call to discuss product strategy, UX design, or full-stack development for your next project.',
        url: '/work-with-me',
    },
    twitter: {
        title: 'Work With Aakash Sanghvi',
        description: 'Book a call to discuss product strategy, UX design, or full-stack development.',
    },
    alternates: {
        canonical: '/work-with-me',
    },
};

export default function WorkWithMePage() {
    return (
        <div data-theme="dark" className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            {/* JSON-LD Structured Data for Contact Page */}
            <ContactPageSchema />

            {/* Navigation (Simplified for now, matching style) */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6 flex justify-between items-center backdrop-blur-md bg-black/50 border-b border-white/5">
                <Link href="/" className="text-xl font-bold tracking-tight">Aakash Sanghvi</Link>
                <Link href="/" className="text-sm font-medium hover:text-white/70 transition-colors">
                    ← Back to Home
                </Link>
            </nav>

            <main className="flex-grow pt-32 px-6 lg:px-12 pb-24">
                <div className="max-w-4xl mx-auto space-y-16">

                    {/* Header */}
                    <div className="text-center space-y-6">
                        <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] gradient-text">
                            Availability for Q1 2026
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                            Let's build something <br />
                            <span className="gradient-text">people actually want.</span>
                        </h1>
                        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
                            Whether you need a full product strategy, a design system overhaul, or just a second pair of eyes on your roadmap — I'm ready to help.
                        </p>
                    </div>

                    {/* Calendar Container */}
                    <div className="w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-white/10 relative">
                        {/* Loading State Skeleton (simple background) */}
                        <div className="absolute inset-0 bg-white z-0 flex items-center justify-center text-black/20">
                            Loading Calendar...
                        </div>

                        {/* Google Calendar Inline Embed */}
                        <iframe
                            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1j1OpwxGCVAuNV4lJDe8qItvOir5jXT6V25QDQfjtpIMwNzJh2Z2h0yEUUKU8WUbMpg6Fq-qpl?gv=true"
                            style={{ border: 0, position: 'relative', zIndex: 10 }}
                            width="100%"
                            height="700"
                            frameBorder="0"
                            title="Book a call with Aakash Sanghvi"
                        ></iframe>
                    </div>

                    {/* Contact Info Fallback */}
                    <div className="text-center space-y-4 pt-8 border-t border-white/10">
                        <p className="text-sm font-medium uppercase tracking-widest text-white/40">Or email me directly</p>
                        <a href="mailto:connect@aakashsanghvi.com" className="text-2xl font-light hover:text-white/80 transition-colors">
                            connect@aakashsanghvi.com
                        </a>
                    </div>

                </div>
            </main>

            <footer className="py-12 px-6 lg:px-12 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                        © {new Date().getFullYear()} Aakash Sanghvi. Built with intention.
                    </p>
                    <a
                        href="https://www.linkedin.com/in/aakashsanghvi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        aria-label="Connect on LinkedIn"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span>Connect on LinkedIn</span>
                    </a>
                </div>
            </footer>
        </div>
    );
}
