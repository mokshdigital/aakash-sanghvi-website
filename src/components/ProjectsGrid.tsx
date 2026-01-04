'use client';

import React, { useState, useMemo } from 'react';
import ProjectCard, { Project } from '@/components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsGridProps {
    initialProjects: Project[];
}

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedTag, setSelectedTag] = useState<string>('All');

    // 1. Extract unique categories from projects
    const categories = useMemo(() => {
        const uniqueCats = new Set(initialProjects.map(p => p.category).filter(Boolean));
        return ['All', ...Array.from(uniqueCats)];
    }, [initialProjects]);

    // 2. Filter projects based on Category FIRST
    const categoryFilteredProjects = useMemo(() => {
        if (selectedCategory === 'All') return initialProjects;
        return initialProjects.filter(p => p.category === selectedCategory);
    }, [initialProjects, selectedCategory]);

    // 3. Extract tags available within the CURRENT category selection
    const availableTags = useMemo(() => {
        const tags = new Set<string>();
        categoryFilteredProjects.forEach(p => {
            if (p.tags) p.tags.forEach(t => tags.add(t));
        });
        return ['All', ...Array.from(tags).sort()];
    }, [categoryFilteredProjects]);

    // 4. Final Filter: Category + Tag
    const finalProjects = useMemo(() => {
        if (selectedTag === 'All') return categoryFilteredProjects;
        return categoryFilteredProjects.filter(p => p.tags && p.tags.includes(selectedTag));
    }, [categoryFilteredProjects, selectedTag]);

    // Reset tag when category changes to avoid dead states
    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        setSelectedTag('All');
    };

    return (
        <div className="space-y-12">

            {/* --- FILTER CONTROLS --- */}
            <div className="space-y-6">

                {/* TIER 1: CATEGORIES (Tabs Style) */}
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat as string)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-white text-black scale-105 shadow-xl'
                                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* TIER 2: TAGS (Pills Style) - Only show if tags exist */}
                {availableTags.length > 2 && ( // > 2 because 'All' is always there
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap justify-center gap-2"
                    >
                        {availableTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${selectedTag === tag
                                        ? 'border-accent bg-accent/10 text-accent'
                                        : 'border-white/10 text-neutral-500 hover:border-white/30 hover:text-neutral-300'
                                    }`}
                                style={selectedTag === tag ? { borderColor: 'var(--color-accent)', color: 'var(--color-accent)' } : {}}
                            >
                                {tag}
                            </button>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* --- GRID --- */}
            <motion.div
                layout
                className="grid gap-12"
            >
                <AnimatePresence mode='popLayout'>
                    {finalProjects.length > 0 ? (
                        finalProjects.map((project: Project) => (
                            <motion.div
                                key={project.id || project.slug}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectCard {...project} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl"
                        >
                            <p>No projects match this specific criteria.</p>
                            <button
                                onClick={() => { setSelectedCategory('All'); setSelectedTag('All'); }}
                                className="mt-4 text-sm underline hover:text-white"
                            >
                                Clear filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
