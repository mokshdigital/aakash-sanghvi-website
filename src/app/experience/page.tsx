import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Experience',
    description: 'A recruiter-friendly overview of Aakash Sanghvi\'s product leadership, UX, and full-stack delivery experience.',
    alternates: {
        canonical: '/experience',
    },
    openGraph: {
        title: 'Experience | Aakash Sanghvi',
        description: 'Product leadership, UX strategy, and hands-on delivery across enterprise SaaS, AI-enabled products, and client systems.',
        url: '/experience',
    },
};

const experience = [
    {
        period: '2025 – 2026',
        title: 'FieldOps OS',
        role: 'Developer & Product Owner',
        context: 'Embedded solo build · Enterprise field operations',
        description: 'Turned fragmented spreadsheet workflows into one operational platform spanning work orders, dispatch, timesheets, billing, permissions, realtime sync, and AI-assisted tools.',
        href: '/projects/fieldops-os-enterprise-platform',
    },
    {
        period: 'Spring – Summer 2023',
        title: 'UCW Peer Tutoring',
        role: 'Lead UX & Product Designer',
        context: 'Higher-education UX case study · Moodle',
        description: 'Researched and redesigned a confusing tutoring journey into a guided four-step booking flow, reducing completion time by 60%.',
        href: '/projects/ucw-tutor-booking-ux-case-study',
    },
    {
        period: '2020',
        title: 'EduStation',
        role: 'Product Strategy & Transformation',
        context: 'B2B EdTech SaaS · Crisis-response delivery',
        description: 'Helped transform a physical coaching business into a digital learning platform, delivering an MVP in 60 days and scaling the model to more than 1,000 users and 20 regional partners.',
        href: '/projects/edustation',
    },
    {
        period: 'Current',
        title: 'Independent Product Building',
        role: 'Product, UX & Full-Stack Delivery',
        context: 'Client and independent products',
        description: 'Builds and ships web products that connect business needs, user experience, modern software delivery, and practical AI use.',
        href: '/projects',
    },
];

const projectContext = [
    { title: 'FieldOps OS', role: 'Developer & Product Owner', setting: 'Embedded solo enterprise build', timing: '2025 – 2026', href: '/projects/fieldops-os-enterprise-platform' },
    { title: 'UCW Peer Tutoring', role: 'Lead UX & Product Designer', setting: 'Higher-education UX case study', timing: 'Spring – Summer 2023', href: '/projects/ucw-tutor-booking-ux-case-study' },
    { title: 'EduStation', role: 'Product Strategy & Transformation', setting: 'B2B EdTech platform', timing: '2020', href: '/projects/edustation' },
    { title: 'EduAbroad Expo', role: 'Lead Developer', setting: 'Multi-role event platform', timing: '10-day sprint', href: '/projects/eduabroad-expo' },
    { title: 'HomeBudget AI', role: 'UX Designer & Developer', setting: 'Independent FinTech product', timing: '4 weeks', href: '/projects/homebudget-ai' },
    { title: 'AG Fashion Hub', role: 'Lead Full-Stack Developer & Designer', setting: 'Client commerce system', timing: 'Client delivery', href: '/projects/ag-fashion-hub-headless-commerce' },
    { title: 'Express Entry Immigration', role: 'Lead Full-Stack Developer', setting: 'Production-ready client platform', timing: 'Modernization project', href: '/projects/express-entry-migration-nextjs' },
];

const capabilities = [
    {
        title: 'Product Direction',
        items: ['Problem framing and discovery', 'Roadmaps and prioritization', 'Business and product trade-offs'],
    },
    {
        title: 'Research & UX',
        items: ['User and workflow research', 'Information architecture', 'Prototyping and usability testing'],
    },
    {
        title: 'Technical Delivery',
        items: ['Full-stack product development', 'AI-enabled workflows', 'Production handover and documentation'],
    },
];

export default function ExperiencePage() {
    return (
        <div data-theme="dark" className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            <main>
                <section className="px-6 pb-20 pt-36 lg:px-12 lg:pb-28 lg:pt-44">
                    <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_0.72fr] lg:items-center">
                        <div className="space-y-8">
                            <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] gradient-text">
                                For recruiters and hiring teams
                            </span>
                            <div className="space-y-6">
                                <h1 className="text-4xl font-black leading-[1.02] tracking-tighter md:text-6xl lg:text-7xl">
                                    Product judgment.<br />
                                    <span className="gradient-text">Hands-on delivery.</span>
                                </h1>
                                <p className="max-w-2xl text-lg font-light leading-relaxed md:text-xl" style={{ color: 'var(--color-text-muted)' }}>
                                    I connect product management, UX research, and full-stack execution to take ambiguous business problems from discovery to working software.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <Link
                                    href="/projects"
                                    className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white transition-transform hover:scale-[1.02]"
                                    style={{ background: 'var(--gradient-accent)' }}
                                >
                                    Review selected work
                                    <span aria-hidden="true">→</span>
                                </Link>
                                <a
                                    href="https://www.linkedin.com/in/aakashsanghvi/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/5"
                                >
                                    Full history on LinkedIn
                                    <span aria-hidden="true">↗</span>
                                </a>
                                <a
                                    href="mailto:connect@aakashsanghvi.com?subject=Request%20for%20Aakash%20Sanghvi%27s%20resume"
                                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 font-semibold text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                                >
                                    Request current résumé
                                </a>
                            </div>
                        </div>

                        <div className="mx-auto w-full max-w-sm">
                            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
                                <Image
                                    src="/aakash-profile.jpg"
                                    alt="Aakash Sanghvi"
                                    width={400}
                                    height={400}
                                    priority
                                    className="aspect-square w-full rounded-[1.4rem] object-cover"
                                />
                            </div>
                            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="text-xs uppercase tracking-wider text-zinc-500">Based in</div>
                                    <div className="mt-1 font-semibold">Vancouver, Canada</div>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="text-xs uppercase tracking-wider text-zinc-500">Business lens</div>
                                    <div className="mt-1 font-semibold">MBA-trained</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-y px-6 py-20 lg:px-12 lg:py-24" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 max-w-2xl space-y-4">
                            <span className="text-xs font-medium uppercase tracking-[0.2em] gradient-text">What I can own</span>
                            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">From decision to delivery</h2>
                            <p className="text-lg font-light" style={{ color: 'var(--color-text-muted)' }}>
                                Best suited to roles where product thinking must connect directly to customers, operations, and what actually gets shipped.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {capabilities.map((capability) => (
                                <article key={capability.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                                    <h3 className="text-xl font-bold">{capability.title}</h3>
                                    <ul className="mt-5 space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                        {capability.items.map((item) => (
                                            <li key={item} className="flex gap-3">
                                                <span aria-hidden="true" style={{ color: 'var(--color-accent)' }}>•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-6 py-20 lg:px-12 lg:py-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-14 max-w-2xl space-y-4">
                            <span className="text-xs font-medium uppercase tracking-[0.2em] gradient-text">Experience snapshot</span>
                            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Selected career and project milestones</h2>
                            <p className="text-lg font-light" style={{ color: 'var(--color-text-muted)' }}>
                                A concise view for initial screening. LinkedIn provides the complete chronology, and the detailed case studies show the work behind each claim.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {experience.map((item) => (
                                <article key={item.title} className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:grid-cols-[180px_1fr_auto] md:items-start md:p-8">
                                    <div className="text-sm font-semibold gradient-text">{item.period}</div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{item.title}</h3>
                                        <p className="mt-1 text-sm font-semibold text-zinc-300">{item.role}</p>
                                        <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{item.context}</p>
                                        <p className="mt-4 max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.description}</p>
                                    </div>
                                    <Link href={item.href} className="text-sm font-semibold transition-opacity hover:opacity-75" style={{ color: 'var(--color-accent)' }}>
                                        View evidence →
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-y px-6 py-20 lg:px-12 lg:py-24" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 max-w-3xl space-y-4">
                            <span className="text-xs font-medium uppercase tracking-[0.2em] gradient-text">Project context</span>
                            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">What I did on each case study</h2>
                            <p className="text-lg font-light" style={{ color: 'var(--color-text-muted)' }}>
                                Role, setting, and timing are separated so hiring teams can distinguish client work, independent products, research, and embedded delivery.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {projectContext.map((project) => (
                                <Link
                                    key={project.title}
                                    href={project.href}
                                    className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:-translate-y-0.5 hover:border-white/25"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold">{project.title}</h3>
                                            <p className="mt-1 text-sm font-medium text-zinc-300">{project.role}</p>
                                        </div>
                                        <span aria-hidden="true" className="text-zinc-500 transition-transform group-hover:translate-x-1">→</span>
                                    </div>
                                    <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-wider text-zinc-500">
                                        <span className="rounded-full border border-white/10 px-3 py-1.5">{project.setting}</span>
                                        <span className="rounded-full border border-white/10 px-3 py-1.5">{project.timing}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 text-center lg:px-12 lg:py-32">
                    <div className="mx-auto max-w-3xl space-y-7">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] gradient-text">Opportunity fit</span>
                        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Product leadership with enough technical depth to ship.</h2>
                        <p className="text-lg font-light" style={{ color: 'var(--color-text-muted)' }}>
                            Relevant conversations include product management, product operations, UX and product strategy, and hands-on AI-enabled product building.
                        </p>
                        <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
                            <a
                                href="mailto:connect@aakashsanghvi.com?subject=Recruiting%20conversation%20with%20Aakash%20Sanghvi"
                                className="inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold text-white transition-transform hover:scale-[1.02]"
                                style={{ background: 'var(--gradient-accent)' }}
                            >
                                Start a recruiting conversation
                            </a>
                            <a
                                href="https://github.com/mokshdigital"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 font-semibold text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                            >
                                View GitHub
                                <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t px-6 py-10 lg:px-12" style={{ borderColor: 'var(--color-border)' }}>
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm md:flex-row">
                    <p style={{ color: 'var(--color-text-muted)' }}>© {new Date().getFullYear()} Aakash Sanghvi. Built with intention.</p>
                    <div className="flex items-center gap-5 text-zinc-400">
                        <a className="transition-colors hover:text-white" href="mailto:connect@aakashsanghvi.com">Email</a>
                        <a className="transition-colors hover:text-white" href="https://www.linkedin.com/in/aakashsanghvi/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a className="transition-colors hover:text-white" href="https://github.com/mokshdigital" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
