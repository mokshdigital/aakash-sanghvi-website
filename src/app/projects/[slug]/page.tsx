import React from 'react';
import { notFound } from 'next/navigation';
import EduStation from '@/components/case-studies/EduStation';
import EduAbroad from '@/components/case-studies/EduAbroad';
import HomeBudget from '@/components/case-studies/HomeBudget';
import UCWPeerTutoring from '@/components/case-studies/UCWPeerTutoring';
import AGFashionHub from '@/components/case-studies/AGFashionHub';
import EEIS from '@/components/case-studies/EEIS';
import FieldOpsPlatform from '@/components/case-studies/FieldOpsPlatform';
import { CaseStudySchema, BreadcrumbSchema } from '@/components/JsonLd';

// Function to generate static routes at build time
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Project metadata for JSON-LD schema
const PROJECT_SCHEMA_DATA: Record<string, {
    title: string;
    description: string;
    skills: string[];
    image?: string;
    datePublished?: string;
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
    'fieldops-os-enterprise-platform': {
        title: 'FieldOps OS',
        description: 'A confidential enterprise field operations platform built from scratch as sole developer and product owner. Replaced fragmented spreadsheet workflows with a unified SaaS covering work orders, dispatch, timesheets, billing, RBAC, realtime sync, and AI-powered work order generation and natural language reporting.',
        skills: ['Enterprise SaaS', 'Next.js 15', 'Supabase', 'PostgreSQL', 'AI Integration', 'RBAC', 'Realtime Sync', 'Field Service Management', 'AI Report Generation', 'Multimodal AI'],
        image: '/images/field-os/desktop-hero.png',
        datePublished: '2025-01-01',
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
        { slug: 'fieldops-os-enterprise-platform' },
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

    // Hardcoded fallbacks for key projects when Supabase is unreachable
    const METADATA_FALLBACKS: Record<string, { title: string; description: string }> = {
        'fieldops-os-enterprise-platform': {
            title: 'FieldOps OS | Aakash Sanghvi',
            description: 'A confidential enterprise field operations platform built from scratch — covering work orders, dispatch, timesheets, billing, RBAC, realtime sync, and AI-powered tools for the specialty construction industry.',
        },
        'edustation': {
            title: 'EduStation | Aakash Sanghvi',
            description: 'A comprehensive B2B SaaS LMS designed for educational institutions with student progress tracking and multi-tenant architecture.',
        },
        'homebudget-ai': {
            title: 'HomeBudget AI | Aakash Sanghvi',
            description: 'A personal finance application with AI-powered receipt scanning to track expenses, manage budgets, and gain spending insights.',
        },
    };

    if (!supabaseUrl || !supabaseKey) {
        const fallback = METADATA_FALLBACKS[slug];
        if (fallback) return fallback;
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

    const metaTitle = `${project.title} | Aakash Sanghvi`;
    const metaDesc = project.description || `Case study for ${project.title}`;

    return {
        title: metaTitle,
        description: metaDesc,
        alternates: {
            canonical: `/projects/${slug}`,
        },
        openGraph: {
            title: metaTitle,
            description: metaDesc,
            url: `/projects/${slug}`,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: metaDesc,
            creator: '@aakashsanghvi',
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
            case 'fieldops-os-enterprise-platform':
                return <FieldOpsPlatform />;
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
                        datePublished={(projectData as typeof projectData & { datePublished?: string }).datePublished}
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

            <main className="flex-grow">
                {renderCaseStudy()}
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
