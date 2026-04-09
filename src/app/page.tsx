import { createClient } from '@/utils/supabase/server';
import HorizontalScrollProjects from '@/components/HorizontalScrollProjects';
import Image from 'next/image';
import Link from 'next/link';
import { ProfilePageSchema } from '@/components/JsonLd';

export const dynamic = 'force-dynamic';

const FALLBACK_PROJECTS = [
    {
        title: 'FieldOps OS',
        slug: 'fieldops-os-enterprise-platform',
        metric_value: '20+',
        metric_description: 'Custom Platform Modules',
        role: 'Solo Developer & Product Owner',
        display_order: 1,
        skills: ['Enterprise SaaS', 'Supabase', 'Next.js', 'AI Generators', 'Role-Based Access']
    },
    {
        title: 'UCW Peer Tutoring Service',
        slug: 'ucw-tutor-booking-ux-case-study',
        metric_value: '60% Faster',
        metric_description: 'Booking Flow Time Reduced',
        role: 'Lead UX & Product Designer',
        display_order: 1,
        skills: ['UX Research', 'Information Architecture', 'Prototyping', 'Usability Testing', 'Stakeholder Management']
    },
    {
        title: 'AG Fashion Hub',
        slug: 'ag-fashion-hub-headless-commerce',
        metric_value: '100%',
        metric_description: 'Client Autonomy via Digital Manual',
        role: 'Lead Full-Stack Developer & Designer',
        display_order: 2,
        skills: ['Headless WordPress', 'GraphQL', 'Vanilla JS', 'WhatsApp Business API', 'Technical Documentation']
    },
    {
        title: 'Express Entry Immigration',
        slug: 'express-entry-migration-nextjs',
        metric_value: '60s',
        metric_description: 'Global Content Revalidation',
        role: 'Lead Full-Stack Developer',
        display_order: 3,
        skills: ['Next.js 14', 'Headless WordPress', 'ISR', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    }
];

export default async function HomePage() {
    let projects = [];

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.warn('⚠️ Missing Supabase env vars on HomePage. Using fallback data.');
        projects = FALLBACK_PROJECTS;
    } else {
        try {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('featured', true)
                .order('display_order', { ascending: true });

            if (error || !data) throw error;
            projects = data;
        } catch (e) {
            console.error('⚠️ Supabase fetch failed on HomePage. Using fallback data.', e);
            projects = FALLBACK_PROJECTS;
        }
    }

    return (
        <div data-theme="dark" className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            {/* JSON-LD Structured Data for Homepage */}
            <ProfilePageSchema />

            {/* ========== HERO SECTION (Restored) ========== */}
            <section className="min-h-screen flex items-center px-6 lg:px-12 pt-32 pb-24 relative">
                <div className="bg-noise absolute inset-0 pointer-events-none" />

                <div className="max-w-6xl mx-auto w-full relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Text Content */}
                        <div className="space-y-8 stagger-children">
                            <div className="space-y-6">
                                <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] gradient-text">
                                    Product Manager & UX Strategist
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95]">
                                    Building products<br />
                                    <span className="gradient-text">people actually use.</span>
                                </h1>
                            </div>

                            <p className="text-lg md:text-xl font-light" style={{ color: 'var(--color-text-muted)' }}>
                                MBA-logic. UX-driven. AI speed.
                            </p>

                            <div>
                                <Link href="/work-with-me"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 glow"
                                    style={{ background: 'var(--gradient-accent)' }}>
                                    Start a conversation
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Photo */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 glow"
                                    style={{ borderColor: 'var(--color-border)' }}>
                                    <Image
                                        src="/aakash-profile.jpg"
                                        alt="Aakash Sanghvi"
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                        priority
                                    />
                                </div>
                                {/* Subtle accent ring */}
                                <div className="absolute -inset-2 rounded-full opacity-20"
                                    style={{ background: 'var(--gradient-accent)', filter: 'blur(20px)', zIndex: -1 }} />
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* ========== PRODUCT MINDSET SNAPSHOT (Restored) ========== */}
            <section className="py-24 px-6 lg:px-12 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <div className="max-w-6xl mx-auto">

                    <div className="mb-16 max-w-2xl">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] gradient-text block mb-4">How I Think</span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Product Mindset</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Business */}
                        <div className="h-full space-y-4 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                            style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-xl font-bold">Business</h3>
                            <ul className="space-y-2 text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                                <li>Market clarity</li>
                                <li>Positioning and pricing logic</li>
                                <li>Go-to-market thinking</li>
                            </ul>
                        </div>

                        {/* Product */}
                        <div className="h-full space-y-4 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                            style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-xl font-bold">Product</h3>
                            <ul className="space-y-2 text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                                <li>Discovery and framing</li>
                                <li>Roadmaps and prioritization</li>
                                <li>Metrics and trade-offs</li>
                            </ul>
                        </div>

                        {/* UX */}
                        <div className="h-full space-y-4 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                            style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-xl font-bold">UX</h3>
                            <ul className="space-y-2 text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                                <li>Research-driven decisions</li>
                                <li>Flows and usability</li>
                                <li>Design systems thinking</li>
                            </ul>
                        </div>

                        {/* Technology */}
                        <div className="h-full space-y-4 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                            style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-xl font-bold">Technology</h3>
                            <ul className="space-y-2 text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                                <li>Feasibility awareness</li>
                                <li>Architecture-level understanding</li>
                                <li>AI as a force multiplier</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>


            {/* ========== CROWN JEWEL: FIELDOPS OS ========== */}
            <section
                className="py-24 lg:py-32 px-6 lg:px-12 border-t overflow-hidden relative"
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

                        {/* Text Content */}
                        <div className="space-y-8">
                            <div
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white/5 font-semibold text-sm uppercase tracking-wide"
                                style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--color-accent)' }}
                            >
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
                                Flagship Project
                            </div>

                            <div className="space-y-4">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] gradient-text block">
                                    Enterprise SaaS · AI-Powered · Field Operations
                                </span>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05]">
                                    FieldOps OS
                                </h2>
                                <p className="text-lg md:text-xl font-light leading-relaxed max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                                    A custom enterprise operating system built from scratch for the specialty construction industry — replacing an entire fragmented toolstack with a single, unified platform.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                {[
                                    { val: '20+', label: 'Platform Modules' },
                                    { val: '6+', label: 'User Roles' },
                                    { val: 'AI', label: 'Work Order Engine' },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div className="text-3xl font-black gradient-text mb-1">{stat.val}</div>
                                        <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

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

                        {/* Floating Device Mockups */}
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
                                <div className="h-7 flex items-center px-3 gap-1.5 border-b" style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}>
                                    <div className="w-2 h-2 rounded-full bg-red-500/40" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/40" />
                                    <div className="ml-3 flex-1 h-3.5 rounded-full border text-[8px] font-mono flex items-center justify-center" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                                        fieldops-os.com/dashboard
                                    </div>
                                </div>
                                <div className="flex-1 h-full relative bg-neutral-950 overflow-hidden">
                                    <Image
                                        src="/images/field-os/desktop-hero.png"
                                        alt="FieldOps OS Dashboard"
                                        fill
                                        className="object-cover object-top"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
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
                                <div className="absolute top-0 inset-x-0 flex justify-center z-10">
                                    <div className="w-2/5 h-5 rounded-b-xl" style={{ backgroundColor: '#333' }} />
                                </div>
                                <div className="w-full h-full relative bg-neutral-950 overflow-hidden">
                                    <Image
                                        src="/images/field-os/mobile-hero.jpeg"
                                        alt="FieldOps OS Mobile"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/15 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* ========== SELECTED OUTCOMES (HORIZONTAL SCROLL) ========== */}
            <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                {projects && projects.length > 0 ? (
                    <HorizontalScrollProjects projects={projects} />
                ) : (
                    <div className="py-32 text-center text-gray-500">
                        Loading works...
                    </div>
                )}
            </div>

            {/* ========== CTA SECTION ========== */}
            <section className="py-32 px-6 lg:px-12 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <div className="max-w-4xl mx-auto text-center space-y-10">

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Ready to build something<br />
                        <span className="gradient-text">that matters?</span>
                    </h2>

                    <div>
                        <Link href="/work-with-me"
                            className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-lg font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 glow"
                            style={{ background: 'var(--gradient-accent)' }}>
                            Start a conversation
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </section>


            {/* ========== FOOTER ========== */}
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
