import { createClient } from '@/utils/supabase/server';
import { Project } from '@/components/ProjectCard';
import HorizontalScrollProjects from '@/components/HorizontalScrollProjects';
import Image from 'next/image';
import Link from 'next/link';

const FALLBACK_PROJECTS = [
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

            {/* ========== HERO SECTION ========== */}
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
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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


            {/* ========== PRODUCT MINDSET SNAPSHOT ========== */}
            <section className="py-24 px-6 lg:px-12 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <div className="max-w-6xl mx-auto">

                    <div className="mb-16 max-w-2xl">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] gradient-text block mb-4">How I Think</span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Product Mindset</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Business */}
                        <div className="space-y-4 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                            style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-xl font-bold">Business</h3>
                            <ul className="space-y-2 text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                                <li>Market clarity</li>
                                <li>Positioning and pricing logic</li>
                                <li>Go-to-market thinking</li>
                            </ul>
                        </div>

                        {/* Product */}
                        <div className="space-y-4 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                            style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-xl font-bold">Product</h3>
                            <ul className="space-y-2 text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                                <li>Discovery and framing</li>
                                <li>Roadmaps and prioritization</li>
                                <li>Metrics and trade-offs</li>
                            </ul>
                        </div>

                        {/* UX */}
                        <div className="space-y-4 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                            style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-xl font-bold">UX</h3>
                            <ul className="space-y-2 text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                                <li>Research-driven decisions</li>
                                <li>Flows and usability</li>
                                <li>Design systems thinking</li>
                            </ul>
                        </div>

                        {/* Technology */}
                        <div className="space-y-4 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
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
            <footer className="py-12 px-6 lg:px-12 border-t text-center" style={{ borderColor: 'var(--color-border)' }}>
                <p className="text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                    © {new Date().getFullYear()} Aakash Sanghvi. Built with intention.
                </p>
            </footer>

        </div>
    );
}
