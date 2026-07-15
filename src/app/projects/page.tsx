import { createClient } from '@/utils/supabase/server';
import ProjectsGrid from '@/components/ProjectsGrid';
import type { Metadata } from 'next';
import { ProjectsCollectionSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'A collection of case studies showcasing my work in Product Management, UX Design, and Full-Stack Engineering. From fintech apps to education platforms.',
    openGraph: {
        title: 'Projects | Aakash Sanghvi',
        description: 'Case studies showcasing Product Management, UX Design, and Full-Stack Engineering work.',
        url: '/projects',
    },
    twitter: {
        title: 'Projects | Aakash Sanghvi',
        description: 'Case studies in Product Management, UX Design, and Engineering.',
    },
    alternates: {
        canonical: '/projects',
    },
};

export default async function ProjectsPage() {
    const supabase = await createClient();
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

    return (
        <div data-theme="dark" className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            {/* JSON-LD Structured Data for Projects Collection */}
            <ProjectsCollectionSchema />

            <main className="flex-grow pt-24 md:pt-32 px-6 lg:px-12 pb-16 md:pb-24">
                <div className="max-w-6xl mx-auto space-y-16">

                    {/* Header */}
                    <div className="space-y-6">
                        <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] gradient-text">
                            Portfolio
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                            All Projects
                        </h1>
                        <p className="text-lg md:text-xl font-light max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
                            A complete archive of products shipped, systems designed, and lessons learned.
                        </p>
                    </div>

                    {/* Projects Grid with Filters */}
                    {projects && projects.length > 0 ? (
                        <ProjectsGrid initialProjects={projects} />
                    ) : (
                        <div className="py-20 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl">
                            <p>Loading projects...</p>
                        </div>
                    )}

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
