import { createClient } from '@/utils/supabase/server';
import HorizontalScrollProjects from '@/components/HorizontalScrollProjects';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

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
            {/* Hero Section */}
            <header className="px-6 lg:px-12 py-12 lg:py-24 max-w-[1600px] mx-auto min-h-[90vh] flex flex-col justify-center">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                    {/* Left Column: Text & CTA */}
                    <div className="flex-1 space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] font-serif-merriweather">
                                Systems <br />
                                <span style={{ color: 'var(--color-text-muted)' }}>Thinker.</span>
                            </h1>
                            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] font-serif-merriweather">
                                Detail <br />
                                <span style={{ color: 'var(--color-accent)' }}>Obsessed.</span>
                            </h1>
                        </div>

                        <p className="text-lg lg:text-xl max-w-xl leading-relaxed opacity-80 font-light">
                            I bridge the gap between <span className="text-white font-medium">complex logic</span> and <span className="text-white font-medium">human intuition</span>.
                            Currently building scalable digital products that users actually love to use.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                href="/projects"
                                className="inline-flex items-center px-8 py-4 bg-white text-black rounded-full font-medium transition-transform hover:scale-105"
                            >
                                View Selected Work
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </Link>
                            <Link
                                href="/work-with-me"
                                className="inline-flex items-center px-8 py-4 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Visuals */}
                    <div className="flex-1 w-full lg:max-w-xl relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                        {/* Profile Image */}
                        <div className="relative aspect-[4/5] w-full max-w-md mx-auto grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
                            <Image
                                src="/aakash-profile.jpg"
                                alt="Aakash Sanghvi"
                                fill
                                className="object-cover rounded-sm"
                                priority
                            />
                            {/* Overlay Texture */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                            <div className="absolute bottom-6 left-6 text-white p-4">
                                <p className="text-xs uppercase tracking-widest mb-1 opacity-70">Based in Vancouver, BC</p>
                                <p className="font-serif-merriweather italic text-lg">Product Manager & UX Strategist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Selected Work Section */}
            <section id="work" className="py-24 lg:py-32 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <div className="px-6 lg:px-12 max-w-[1600px] mx-auto mb-16 flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Selected Case Studies</h2>
                        <p className="opacity-60 max-w-md">Deep dives into complex problems I've solved through design and engineering.</p>
                    </div>
                    <Link href="/projects" className="hidden lg:inline-flex items-center text-sm font-medium hover:text-white/70 transition-colors">
                        View All Projects →
                    </Link>
                </div>

                {/* Horizontal Scroll Component */}
                <HorizontalScrollProjects projects={projects} />

                <div className="px-6 lg:px-12 mt-12 lg:hidden">
                    <Link href="/projects" className="inline-flex items-center text-sm font-medium hover:text-white/70 transition-colors">
                        View All Projects →
                    </Link>
                </div>
            </section>
        </div>
    );
}
