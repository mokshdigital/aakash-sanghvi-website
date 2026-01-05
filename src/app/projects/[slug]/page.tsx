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
import { CaseStudySchema, BreadcrumbSchema } from '@/components/JsonLd';

// Function to generate static routes at build time
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Project metadata for JSON-LD schema
const PROJECT_SCHEMA_DATA: Record<string, {
    title: string;
    description: string;
    skills: string[];
    image?: string;
}> = {
    'edustation': {
        title: 'EduStation',
        description: 'A comprehensive B2B SaaS learning management system designed for educational institutions, featuring student progress tracking, course management, and multi-tenant architecture.',
        skills: ['Product Management', 'UX Design', 'SaaS Architecture', 'B2B', 'LMS'],
        image: '/images/edustation/dashboard.png',
    },
    'eduabroad-expo': {
        title: 'EduAbroad Expo',
        description: 'A multi-role mobile application built for international education fairs, connecting students with university representatives through an intelligent matching system.',
        skills: ['Mobile App Design', 'UX Research', 'Multi-role Systems', 'Event Technology'],
        image: '/images/espi-eduabroad-expo/login.png',
    },
    'homebudget-ai': {
        title: 'HomeBudget AI',
        description: 'A personal finance application with AI-powered receipt scanning, helping track expenses, manage budgets, and gain insights into spending habits.',
        skills: ['Full-Stack Development', 'AI Integration', 'FinTech', 'Next.js', 'Supabase'],
        image: '/images/myhomebudget_io/mobile_dashboard_hero.png',
    },
    'ucw-tutor-booking-ux-case-study': {
        title: 'UCW Peer Tutoring',
        description: 'A UX case study redesigning the university peer tutoring booking system, reducing booking flow time by 60% through improved information architecture.',
        skills: ['UX Research', 'Information Architecture', 'Prototyping', 'Usability Testing'],
        image: '/images/ucw/landing.png',
    },
    'ag-fashion-hub-headless-commerce': {
        title: 'AG Fashion Hub',
        description: 'A headless commerce solution with WhatsApp Business API integration, achieving 100% client autonomy through comprehensive documentation.',
        skills: ['Headless WordPress', 'GraphQL', 'WhatsApp API', 'Technical Documentation'],
        image: '/images/ag-fashion-hub/landing.png',
    },
    'express-entry-migration-nextjs': {
        title: 'Express Entry Immigration',
        description: 'A Next.js 14 migration project implementing ISR for 60-second global content revalidation, modernizing an immigration services website.',
        skills: ['Next.js 14', 'ISR', 'TypeScript', 'Headless WordPress', 'Performance Optimization'],
        image: '/images/eeis/landing.png',
    },
};

export async function generateStaticParams() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Fallback slugs if Supabase connection fails or keys are missing (build-time safety)
    const fallbackSlugs = [
        { slug: 'edustation' },
        { slug: 'eduabroad-expo' },
        { slug: 'homebudget-ai' },
        { slug: 'ucw-tutor-booking-ux-case-study' },
        { slug: 'ag-fashion-hub-headless-commerce' },
        { slug: 'express-entry-migration-nextjs' },
    ];

    if (!supabaseUrl || !supabaseKey) {
        console.warn('⚠️ Missing Supabase env vars. Using fallback slugs for static generation.');
        return fallbackSlugs;
    }

    // Create a direct client for static generation (no cookies needed)
    const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        // Fallback metadata if DB connection not possible
        const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return {
            title: `${title} | Aakash Sanghvi`,
            description: `Case study details for ${title}`,
        };
    }

    // Use direct client here as well to avoid cookie issues during static generation
    const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

    const { data: project } = await supabase
        .from('projects')
        .select('title, description')
        .eq('slug', slug)
        .single();

    if (!project) return { title: 'Project Not Found' };

    return {
        title: `${project.title} | Aakash Sanghvi`,
        description: project.description || `Case study for ${project.title}`,
        alternates: {
            canonical: `/projects/${slug}`,
        },
        openGraph: {
            title: `${project.title} | Aakash Sanghvi`,
            description: project.description || `Case study for ${project.title}`,
            url: `/projects/${slug}`,
        },
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // Get project schema data
    const projectData = PROJECT_SCHEMA_DATA[slug];

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
            {/* JSON-LD Structured Data for Case Study */}
            {projectData && (
                <>
                    <CaseStudySchema
                        title={projectData.title}
                        slug={slug}
                        description={projectData.description}
                        skills={projectData.skills}
                        image={projectData.image}
                    />
                    <BreadcrumbSchema
                        items={[
                            { name: 'Home', url: '/' },
                            { name: 'Projects', url: '/projects' },
                            { name: projectData.title, url: `/projects/${slug}` },
                        ]}
                    />
                </>
            )}

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

