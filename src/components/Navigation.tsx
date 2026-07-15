
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsMenuOpen(false);
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMenuOpen]);

    const navLinks = [
        { href: '/experience', label: 'Experience' },
        { href: '/projects', label: 'Projects' },
        { href: '/playground', label: 'Playground' },
        { href: '/work-with-me', label: 'Work With Me' },
    ];

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 transition-all duration-300 ${isScrolled
                ? 'py-4 backdrop-blur-md border-b'
                : 'py-6 bg-transparent'
                }`}
            style={{
                backgroundColor: isScrolled ? 'rgba(9, 9, 11, 0.85)' : 'transparent',
                borderColor: isScrolled ? 'var(--color-border)' : 'transparent',
            }}
        >
            <div className="max-w-6xl mx-auto w-full flex items-center justify-between">

                {/* Name / Logo */}
                <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-80"
                >
                    Aakash Sanghvi
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Primary navigation">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? 'page' : undefined}
                            className={`text-sm font-medium transition-colors ${isActive(link.href)
                                ? 'text-white'
                                : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/aakashsanghvi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                        aria-label="LinkedIn Profile"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    type="button"
                    className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white transition-colors hover:bg-white/10"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                        )}
                    </svg>
                </button>

            </div>

            {/* Mobile Navigation */}
            <nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                aria-hidden={!isMenuOpen}
                className={`${isMenuOpen ? 'grid' : 'hidden'} md:hidden max-w-6xl mx-auto mt-4 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 p-2 shadow-2xl`}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={isActive(link.href) ? 'page' : undefined}
                        className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${isActive(link.href)
                            ? 'bg-white/10 text-white'
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}
                <a
                    href="https://www.linkedin.com/in/aakashsanghvi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                    <span aria-hidden="true" className="ml-auto">↗</span>
                </a>
            </nav>
        </header>
    );
}
