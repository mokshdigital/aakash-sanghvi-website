// JSON-LD Structured Data Components for SEO
// These generate schema.org markup for rich search results

const BASE_URL = 'https://aakashsanghvi.com';

// Person Schema - Represents Aakash Sanghvi
export function PersonSchema() {
    const personData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${BASE_URL}/#person`,
        name: 'Aakash Sanghvi',
        url: BASE_URL,
        image: `${BASE_URL}/aakash-profile.jpg`,
        jobTitle: 'Product Manager & UX Strategist',
        description: 'Building scalable digital products that people actually use. MBA-trained in business and marketing with deep UX, product strategy, and web systems expertise.',
        alumniOf: {
            '@type': 'EducationOrganization',
            name: 'MBA Program',
        },
        knowsAbout: [
            'Product Management',
            'UX Design',
            'User Research',
            'Full Stack Development',
            'Next.js',
            'React',
            'TypeScript',
            'Supabase',
            'Digital Product Strategy',
        ],
        sameAs: [
            'https://www.linkedin.com/in/aakashsanghvi/',
            'https://github.com/mokshdigital',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
        />
    );
}

// WebSite Schema - Represents the portfolio website
export function WebSiteSchema() {
    const websiteData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Aakash Sanghvi Portfolio',
        description: 'Portfolio of Aakash Sanghvi - Product Manager & UX Strategist',
        publisher: {
            '@id': `${BASE_URL}/#person`,
        },
        inLanguage: 'en-US',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
    );
}

// ProfilePage Schema - For the homepage
export function ProfilePageSchema() {
    const profilePageData = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': `${BASE_URL}/#profilepage`,
        url: BASE_URL,
        name: 'Aakash Sanghvi | Product Manager & UX Strategist',
        description: 'Portfolio and case studies of Aakash Sanghvi, showcasing work in Product Management, UX Design, and Full-Stack Development.',
        mainEntity: {
            '@id': `${BASE_URL}/#person`,
        },
        dateCreated: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageData) }}
        />
    );
}

// CollectionPage Schema - For the projects listing page
export function ProjectsCollectionSchema() {
    const collectionData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/projects#collection`,
        url: `${BASE_URL}/projects`,
        name: 'Projects | Aakash Sanghvi',
        description: 'A collection of case studies showcasing work in Product Management, UX Design, and Full-Stack Engineering.',
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    url: `${BASE_URL}/projects/edustation`,
                    name: 'EduStation',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    url: `${BASE_URL}/projects/eduabroad-expo`,
                    name: 'EduAbroad Expo',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    url: `${BASE_URL}/projects/homebudget-ai`,
                    name: 'HomeBudget AI',
                },
                {
                    '@type': 'ListItem',
                    position: 4,
                    url: `${BASE_URL}/projects/ucw-tutor-booking-ux-case-study`,
                    name: 'UCW Peer Tutoring',
                },
                {
                    '@type': 'ListItem',
                    position: 5,
                    url: `${BASE_URL}/projects/ag-fashion-hub-headless-commerce`,
                    name: 'AG Fashion Hub',
                },
                {
                    '@type': 'ListItem',
                    position: 6,
                    url: `${BASE_URL}/projects/express-entry-migration-nextjs`,
                    name: 'Express Entry Immigration',
                },
                {
                    '@type': 'ListItem',
                    position: 7,
                    url: `${BASE_URL}/projects/fieldops-os-enterprise-platform`,
                    name: 'FieldOps OS',
                },
            ],
        },
        author: {
            '@id': `${BASE_URL}/#person`,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionData) }}
        />
    );
}

// Creative Work Schema - For individual project/case study pages
interface CaseStudySchemaProps {
    title: string;
    slug: string;
    description: string;
    datePublished?: string;
    skills?: string[];
    image?: string;
}

export function CaseStudySchema({
    title,
    slug,
    description,
    datePublished = '2024-01-01',
    skills = [],
    image,
}: CaseStudySchemaProps) {
    const caseStudyData = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${BASE_URL}/projects/${slug}#casestudy`,
        url: `${BASE_URL}/projects/${slug}`,
        name: title,
        description: description,
        author: {
            '@id': `${BASE_URL}/#person`,
        },
        creator: {
            '@id': `${BASE_URL}/#person`,
        },
        datePublished: datePublished,
        dateModified: new Date().toISOString().split('T')[0],
        keywords: skills.join(', '),
        image: image ? `${BASE_URL}${image}` : `${BASE_URL}/aakash-profile.jpg`,
        inLanguage: 'en-US',
        isPartOf: {
            '@id': `${BASE_URL}/#website`,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyData) }}
        />
    );
}

// Contact Page Schema - For work-with-me page
export function ContactPageSchema() {
    const contactData = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${BASE_URL}/work-with-me#contact`,
        url: `${BASE_URL}/work-with-me`,
        name: 'Work With Me | Aakash Sanghvi',
        description: 'Book a call to discuss product strategy, UX design, or full-stack development for your next project.',
        mainEntity: {
            '@id': `${BASE_URL}/#person`,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(contactData) }}
        />
    );
}

// BreadcrumbList Schema - For navigation context
interface BreadcrumbItem {
    name: string;
    url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
    );
}
