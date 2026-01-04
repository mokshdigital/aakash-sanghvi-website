import Link from 'next/link';
import React from 'react';

// Define the interface for the project data structure from Supabase
export interface Project {
    id?: string;
    title: string;
    description?: string; // Kept for type compatibility, though primarily using metricDescription
    metric_value: string;
    metric_description: string;
    role: string;
    slug: string;
    skills?: string[];
    tech_stack?: string[];
}

interface ProjectCardProps extends Omit<Project, 'id' | 'description'> {
    description?: string;
}

export default function ProjectCard({
    title,
    metric_value,
    metric_description,
    role,
    slug,
    skills = [],
}: ProjectCardProps) {

    return (
        <div className="border-gradient p-6 md:p-10 lg:p-16 group hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-8">
                <div className="space-y-2">
                    <span className="text-4xl md:text-6xl lg:text-7xl font-black gradient-text">{metric_value}</span>
                    <p className="text-xl md:text-2xl font-light" style={{ color: 'var(--color-text-muted)' }}>
                        {metric_description}
                    </p>
                </div>

                <div className="pt-6 border-t space-y-3" style={{ borderColor: 'var(--color-border)' }}>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full">
                        <span className="inline-block px-2 py-1 rounded text-white font-bold text-xs uppercase tracking-wider shrink-0" style={{ backgroundColor: 'var(--color-accent)' }}>
                            {role}
                        </span>
                        {skills && skills.length > 0 && (
                            <span className="text-xs font-medium uppercase tracking-wider opacity-60 hidden sm:inline" style={{ color: 'var(--color-text-muted)' }}>
                                <span className="mr-2">•</span>
                                {skills.slice(0, 3).join(' • ')}
                            </span>
                        )}
                    </div>
                </div>

                <Link href={`/projects/${slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: 'var(--color-accent)' }}>
                    View case study
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
