import React from 'react';
import Link from 'next/link';

export default function WorkWithMePage() {
    return (
        <div data-theme="dark" className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>

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
                        <a href="mailto:hello@aakashsanghvi.com" className="text-2xl font-light hover:text-white/80 transition-colors">
                            hello@aakashsanghvi.com
                        </a>
                    </div>

                </div>
            </main>

            <footer className="py-12 px-6 lg:px-12 border-t text-center" style={{ borderColor: 'var(--color-border)' }}>
                <p className="text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                    © {new Date().getFullYear()} Aakash Sanghvi. Built with intention.
                </p>
            </footer>
        </div>
    );
}
