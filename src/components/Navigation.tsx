
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/projects', label: 'Projects' },
        { href: '/work-with-me', label: 'Work With Me' },
    ];

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
                    className="text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-80"
                >
                    Aakash Sanghvi
                </Link>

                {/* Navigation Links */}
                <nav className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${pathname === link.href
                                ? 'text-white'
                                : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

            </div>
        </header>
    );
}
