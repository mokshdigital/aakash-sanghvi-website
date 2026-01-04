import { createClient } from '@/utils/supabase/server';
import ProjectCard, { Project } from '@/components/ProjectCard';
import ProjectsGrid from '@/components/ProjectsGrid';
import Link from 'next/link';

export const metadata = {
    title: 'Projects | Aakash Sanghvi',
    description: 'A collection of my work in Product Management, Design, and Engineering.',
};

export default async function ProjectsPage() {
    const supabase = await createClient();
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

    return (
        <div data-theme="dark" className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6 flex justify-between items-center backdrop-blur-md bg-black/50 border-b border-white/5">
                <Link href="/" className="text-xl font-bold tracking-tight">Aakash Sanghvi</Link>
                <Link href="/" className="text-sm font-medium hover:text-white/70 transition-colors">
                    ← Back to Home
                </Link>
            </nav>

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

            <footer className="py-12 px-6 lg:px-12 border-t text-center" style={{ borderColor: 'var(--color-border)' }}>
                <p className="text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                    © {new Date().getFullYear()} Aakash Sanghvi. Built with intention.
                </p>
            </footer>
        </div>
    );
}
