import { MetadataRoute } from 'next';

const BASE_URL = 'https://aakashsanghvi.com';

// Static project slugs for sitemap generation
const projectSlugs = [
    'edustation',
    'eduabroad-expo',
    'homebudget-ai',
    'ucw-tutor-booking-ux-case-study',
    'ag-fashion-hub-headless-commerce',
    'express-entry-migration-nextjs',
];

export default function sitemap(): MetadataRoute.Sitemap {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/work-with-me`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    // Dynamic project pages
    const projectPages: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
        url: `${BASE_URL}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticPages, ...projectPages];
}
