import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import EduStation from '@/components/case-studies/EduStation';
import EduAbroad from '@/components/case-studies/EduAbroad';
import HomeBudget from '@/components/case-studies/HomeBudget';
import UCWPeerTutoring from '@/components/case-studies/UCWPeerTutoring';
import AGFashionHub from '@/components/case-studies/AGFashionHub';
import EEIS from '@/components/case-studies/EEIS';

// Function to generate static routes at build time
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function generateStaticParams() {
    // Create a direct client for static generation (no cookies needed)
    const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: projects } = await supabase.from('projects').select('slug');

    // Ensure we strictly return objects with string slugs
    return (projects || [])
        .filter((project) => project.slug && typeof project.slug === 'string')
        .map((project) => ({
            slug: project.slug,
        }));
}

// Function to set page metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // Use direct client here as well to avoid cookie issues during static generation
    const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: project } = await supabase
        .from('projects')
        .select('title, description')
        .eq('slug', slug)
        .single();

    if (!project) return { title: 'Project Not Found' };

    return {
        title: `${project.title} | Aakash Sanghvi`,
        description: project.description || `Case study for ${project.title}`,
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // This is the "Hybrid Router" Logic
    const renderCaseStudy = () => {
        switch (slug) {
            case 'edustation':
                return <EduStation />;
            case 'eduabroad-expo':
                return <EduAbroad />;
            case 'homebudget-ai':
                return <HomeBudget />;
            case 'ucw-tutor-booking-ux-case-study':
                return <UCWPeerTutoring />;
            case 'ag-fashion-hub-headless-commerce':
                return <AGFashionHub />;
            case 'express-entry-migration-nextjs':
                return <EEIS />;
            default:
                return notFound();
        }
    };

    return (
        <div data-theme="dark" className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6 flex justify-between items-center backdrop-blur-md bg-black/50 border-b border-white/5">
                <Link href="/" className="text-xl font-bold tracking-tight">Aakash Sanghvi</Link>
                <div className="flex gap-6">
                    <Link href="/projects" className="text-sm font-medium hover:text-white/70 transition-colors">
                        All Projects
                    </Link>
                    <Link href="/" className="text-sm font-medium hover:text-white/70 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </nav>

            <main className="flex-grow">
                {renderCaseStudy()}
            </main>

            <footer className="py-12 px-6 lg:px-12 border-t text-center" style={{ borderColor: 'var(--color-border)' }}>
                <p className="text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>
                    © {new Date().getFullYear()} Aakash Sanghvi. Built with intention.
                </p>
            </footer>
        </div>
    );
}
