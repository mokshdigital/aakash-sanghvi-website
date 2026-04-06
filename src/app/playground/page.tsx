'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// -------------------------------------------------------
// DATA — swap this out for PlaygroundData.ts later
// -------------------------------------------------------
const CATEGORIES = ['All', 'Web Apps', 'Automations & Scripts', 'Fun'] as const;
type Category = typeof CATEGORIES[number];

const DUMMY_PROJECTS: {
    id: string;
    title: string;
    date: string;
    category: Exclude<Category, 'All'>;
    tags: string[];
    til: string;
    linkText: string;
    linkHref: string;
    icon: string;
    mediaColor: string;
    image?: string;
}[] = [
    {
        id: 'baby-poop-tracker',
        title: 'Baby Poop Tracker',
        date: 'March 2026',
        category: 'Automations & Scripts',
        tags: ['Google Apps Script', 'Google Sheets', 'Google Drive'],
        til: 'When you have a newborn, tracking their schedule becomes a sleep-deprived blur. Existing apps were too bloated or required too many taps.\n\nI built a lightweight Google Apps Script wrapper connected to a Google Sheet — a 1-tap logging form from the phone homescreen, with Drive-based photo storage for context. No ads, no accounts, no friction.',
        linkText: 'View Script',
        linkHref: 'https://script.google.com/macros/s/AKfycbwS8yijgSpz-dpiwUBhFMnb_w2lfH8zibHSOAVlLIj9V8VBtmRffEZHeH3KTSgesFmD/exec',
        icon: '📊',
        mediaColor: 'from-amber-500/30 to-orange-500/10',
        image: '/images/playground/baby-poop-app.png',
    },
    {
        id: 'baby-shower-games',
        title: 'Live Baby Shower Games App',
        date: 'February 2026',
        category: 'Fun',
        tags: ['Next.js', 'React', 'Real-time State'],
        til: 'Traditional paper-based baby shower games felt outdated. I wanted 40+ guests to participate simultaneously on their own phones, with a live leaderboard projected on the TV.\n\nThe challenge was handling synchronized state across many clients without a heavy backend. I built a lightweight event-driven system that kept the party moving without a single reload.',
        linkText: 'View Live App',
        linkHref: 'https://khushbu-srimant.vercel.app/',
        icon: '🎮',
        mediaColor: 'from-violet-500/30 to-indigo-500/10',
        image: '/images/playground/baby-shower-games.png',
    },
    {
        id: 'french-learning-dashboard',
        title: 'French Learning Dashboard',
        date: 'January 2026',
        category: 'Web Apps',
        tags: ['Vanilla JS', 'Supabase', 'Google Gemini API', 'PWA'],
        til: 'I was learning French and found myself juggling notebooks, apps, and flashcards with no single place to tie it all together.\n\nI built a personal learning dashboard that uses AI to format handwritten notes from photos, generate verb conjugations, create quizzes, and act as a conversational tutor — all backed by Supabase for persistence. A 100+ verb database with AI-generated conjugation tables, topic-based vocabulary builder, and offline PWA support make it a daily driver.',
        linkText: 'View Live App',
        linkHref: 'http://frenchnotes.online/',
        icon: '🇫🇷',
        mediaColor: 'from-blue-500/30 to-indigo-500/10',
        image: '/images/playground/my-french-app.png',
    },
];

// -------------------------------------------------------
// PAGE COMPONENT
// -------------------------------------------------------
export default function PlaygroundPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('All');

    const filtered = DUMMY_PROJECTS.filter(
        (p) => activeCategory === 'All' || p.category === activeCategory
    );

    return (
        <div
            data-theme="dark"
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
        >
            <main className="flex-grow pt-24 md:pt-32 px-6 lg:px-12 pb-16 md:pb-24">
                <div className="max-w-6xl mx-auto space-y-16">

                    {/* ── HEADER ── */}
                    <div className="space-y-6">
                        <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] gradient-text">
                            The Lab
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                            Playground.
                        </h1>
                        <p
                            className="text-lg md:text-xl font-light max-w-2xl"
                            style={{ color: 'var(--color-text-muted)' }}
                        >
                            Continuous creation. An archive of smaller experiments, rapid
                            prototypes, and automation scripts — built with a bias for action.
                        </p>

                        {/* ── CATEGORY FILTERS ── */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            {CATEGORIES.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveCategory(tab)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                        activeCategory === tab
                                            ? 'bg-white text-black'
                                            : 'bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── FEED ── */}
                    <div className="space-y-0 divide-y" style={{ borderColor: 'var(--color-border)' }}>
                        {filtered.length === 0 && (
                            <p className="py-20 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                Nothing here yet.
                            </p>
                        )}

                        {filtered.map((project) => (
                            <article
                                key={project.id}
                                className="group grid md:grid-cols-[5fr_7fr] gap-8 lg:gap-16 py-16 items-start"
                            >
                                {/* ── LEFT: SCREENSHOT / MEDIA ── */}
                                <div
                                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden border flex flex-col items-center justify-center
                                    bg-gradient-to-br ${project.mediaColor}
                                    transition-transform duration-500 group-hover:-translate-y-1`}
                                    style={{ borderColor: 'var(--color-border)' }}
                                >
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover object-top"
                                        />
                                    ) : (
                                        <>
                                            <span className="text-7xl opacity-70 group-hover:scale-110 transition-transform duration-500 select-none">
                                                {project.icon}
                                            </span>
                                            <p
                                                className="absolute bottom-4 text-xs font-mono"
                                                style={{ color: 'var(--color-text-muted)' }}
                                            >
                                                Screenshot drops here
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* ── RIGHT: TEXT CONTENT ── */}
                                <div className="flex flex-col gap-5">
                                    {/* Date + Category */}
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="text-xs font-medium uppercase tracking-[0.15em]"
                                            style={{ color: 'var(--color-text-muted)' }}
                                        >
                                            {project.date}
                                        </span>
                                        <span
                                            className="w-1 h-1 rounded-full"
                                            style={{ backgroundColor: 'var(--color-text-muted)' }}
                                        />
                                        <span className="text-xs font-semibold uppercase tracking-[0.15em] gradient-text">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                                        {project.title}
                                    </h2>

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-md text-xs font-medium border"
                                                style={{
                                                    backgroundColor: 'var(--color-bg-elevated)',
                                                    borderColor: 'var(--color-border)',
                                                    color: 'var(--color-text-muted)',
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* TIL Description */}
                                    <div
                                        className="text-sm md:text-base font-light leading-relaxed space-y-3"
                                        style={{ color: 'var(--color-text-muted)' }}
                                    >
                                        {project.til.split('\n\n').map((para, i) => (
                                            <p key={i}>{para}</p>
                                        ))}
                                    </div>

                                    {/* CTA Link */}
                                    <div className="pt-2">
                                        <Link
                                            href={project.linkHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105 active:scale-95"
                                            style={{
                                                borderColor: 'var(--color-border)',
                                                backgroundColor: 'var(--color-bg-elevated)',
                                                color: 'var(--color-text)',
                                            }}
                                        >
                                            {project.linkText}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                </div>
            </main>

            {/* ── FOOTER (matches rest of site) ── */}
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
