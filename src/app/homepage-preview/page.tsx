import Link from 'next/link';

export const metadata = {
    title: 'Homepage Preview | Aakash Sanghvi',
    robots: { index: false, follow: false },
};

export default function HomepagePreview() {
    return (
        <div
            data-theme="dark"
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
        >
            {/* ── PREVIEW BANNER ── */}
            <div className="fixed top-0 inset-x-0 z-[100] flex items-center justify-between px-6 lg:px-12 py-3 text-xs font-mono font-bold text-black bg-yellow-400">
                <span>⚠ PREVIEW ONLY — Proposed "FieldOps OS" homepage section. Not live.</span>
                <Link href="/" className="underline hover:no-underline">← Back to real homepage</Link>
            </div>

            <main className="flex-grow pt-12">

                {/* ── CONTEXT LABEL ── */}
                <div
                    className="py-6 px-6 lg:px-12 border-b text-center"
                    style={{ borderColor: 'var(--color-border)' }}
                >
                    <p className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        This section would sit between "Product Mindset" and "Selected Works" on the real homepage.
                    </p>
                </div>

                {/* ===================================================
                    PROPOSED "FIELDSOPS OS" HERO OVERRIDE SECTION
                =================================================== */}
                <section
                    className="py-24 lg:py-32 px-6 lg:px-12 border-b overflow-hidden relative"
                    style={{ borderColor: 'var(--color-border)' }}
                >
                    {/* Ambient glow */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(99,102,241,0.08), transparent)',
                        }}
                    />

                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                            {/* ── LEFT: TEXT ── */}
                            <div className="space-y-8">
                                {/* Label */}
                                <div
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white/5 font-semibold text-sm uppercase tracking-wide"
                                    style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-accent)' }}
                                >
                                    <span
                                        className="w-2 h-2 rounded-full animate-pulse"
                                        style={{ backgroundColor: 'var(--color-accent)' }}
                                    />
                                    Flagship Project
                                </div>

                                {/* Headline */}
                                <div className="space-y-4">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block">
                                        Enterprise SaaS · AI-Powered · Field Operations
                                    </span>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]">
                                        FieldOps OS
                                    </h2>
                                    <p
                                        className="text-lg md:text-xl font-light leading-relaxed max-w-xl"
                                        style={{ color: 'var(--color-text-muted)' }}
                                    >
                                        A custom enterprise operating system built from scratch for the specialty construction industry — replacing an entire fragmented toolstack with a single, unified platform.
                                    </p>
                                </div>

                                {/* Stats */}
                                <div
                                    className="grid grid-cols-3 gap-6 pt-8 border-t"
                                    style={{ borderColor: 'var(--color-border)' }}
                                >
                                    {[
                                        { val: '20+', label: 'Platform Modules' },
                                        { val: '6+', label: 'User Roles' },
                                        { val: 'AI', label: 'Work Order Engine' },
                                    ].map((stat) => (
                                        <div key={stat.label}>
                                            <div className="text-3xl font-black gradient-text mb-1">{stat.val}</div>
                                            <div
                                                className="text-xs font-bold uppercase tracking-wider"
                                                style={{ color: 'var(--color-text-muted)' }}
                                            >
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div>
                                    <Link
                                        href="/projects/fieldops-os-enterprise-platform"
                                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 glow"
                                        style={{ background: 'var(--gradient-accent)' }}
                                    >
                                        Read the Case Study
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* ── RIGHT: FLOATING DEVICE MOCKUPS ── */}
                            <div
                                className="relative h-[360px] md:h-[440px] lg:h-[520px]"
                                style={{ perspective: '1200px' }}
                            >
                                {/* Desktop Frame */}
                                <div
                                    className="absolute right-0 w-[90%] md:w-[85%] aspect-video rounded-xl border overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-neutral-900"
                                    style={{
                                        top: '5%',
                                        borderColor: 'var(--color-border)',
                                        transform: 'rotateY(-12deg) rotateX(4deg) scale(0.94)',
                                        transformStyle: 'preserve-3d',
                                        zIndex: 10,
                                    }}
                                >
                                    {/* Browser chrome */}
                                    <div
                                        className="h-7 flex items-center px-3 gap-1.5 border-b"
                                        style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-red-500/40" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/40" />
                                        <div
                                            className="ml-3 flex-1 h-3.5 rounded-full border text-[8px] font-mono flex items-center justify-center"
                                            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                                        >
                                            fieldops-os.com/dashboard
                                        </div>
                                    </div>
                                    {/* Screen */}
                                    <div className="flex-1 h-full flex items-center justify-center relative bg-neutral-950">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                                        <span
                                            className="text-xs font-mono border px-4 py-2 rounded-lg bg-black/70 backdrop-blur-md z-10 shadow-xl"
                                            style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}
                                        >
                                            [ Drop Desktop Screenshot Here ]
                                        </span>
                                    </div>
                                </div>

                                {/* Mobile Frame */}
                                <div
                                    className="absolute overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.7)] bg-neutral-900"
                                    style={{
                                        bottom: '4%',
                                        left: '0%',
                                        width: '28%',
                                        maxWidth: '155px',
                                        aspectRatio: '9 / 19.5',
                                        borderRadius: '2rem',
                                        border: '4px solid #333',
                                        transform: 'rotateY(16deg) rotateX(-5deg) translateY(-5%) scale(1.06)',
                                        transformStyle: 'preserve-3d',
                                        zIndex: 20,
                                    }}
                                >
                                    {/* Notch */}
                                    <div className="absolute top-0 inset-x-0 flex justify-center z-10">
                                        <div className="w-2/5 h-5 rounded-b-xl" style={{ backgroundColor: '#333' }} />
                                    </div>
                                    {/* Screen */}
                                    <div className="w-full h-full flex items-center justify-center relative bg-neutral-950">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/15 to-transparent" />
                                        <span
                                            className="text-center text-[9px] font-mono border px-2 py-1.5 rounded-md bg-black/70 backdrop-blur-md z-10 shadow-xl"
                                            style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}
                                        >
                                            [ Mobile<br />Image ]
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ── PREVIEW ACTIONS ── */}
                <div className="py-16 px-6 lg:px-12 text-center">
                    <div className="max-w-6xl mx-auto flex justify-center gap-6 flex-wrap">
                        <Link
                            href="/projects/fieldops-os-enterprise-platform"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                            style={{ background: 'var(--gradient-accent)', color: 'white' }}
                        >
                            Preview full Case Study →
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition-all duration-200 hover:bg-white/5"
                            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                        >
                            ← Return to real homepage
                        </Link>
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
