
export default function LightDesignSystem() {
    return (
        <div data-theme="light" className="min-h-screen relative" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            {/* Noise Overlay */}
            <div className="bg-noise absolute inset-0 pointer-events-none" />

            <div className="relative z-10 p-12 lg:p-24">
                <div className="max-w-4xl mx-auto space-y-20 stagger-children">

                    {/* Hero Section */}
                    <header className="space-y-6">
                        <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] gradient-text">
                            Light Theme
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.95]">
                            Clean <span className="gradient-text">Elegance</span>
                        </h1>
                        <p className="text-xl md:text-2xl leading-relaxed font-light max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
                            Bright, airy, and professional. The same design tokens
                            adapted for light mode viewing.
                        </p>
                    </header>

                    {/* Typography Section */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold tracking-tight">Typography</h2>
                            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-6xl font-black tracking-tighter">Heading 1</h1>
                            <h2 className="text-4xl font-bold tracking-tight">Heading 2</h2>
                            <h3 className="text-2xl font-semibold">Heading 3</h3>
                            <h4 className="text-lg font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Heading 4 / Label</h4>
                            <p className="text-lg leading-relaxed font-light max-w-prose" style={{ color: 'var(--color-text-muted)' }}>
                                Body text is intentionally lighter—both in weight and color.
                                This creates a clear hierarchy where headings command attention
                                and body text recedes for comfortable reading.
                            </p>
                            <p className="text-sm font-mono" style={{ color: 'var(--color-text-muted)' }}>
                                Monospace for code, data, or technical details.
                            </p>
                        </div>
                    </section>

                    {/* Interactive Elements */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold tracking-tight">Interactive Elements</h2>
                            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {/* Primary Button with Glow */}
                            <button className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 glow"
                                style={{ background: 'var(--gradient-accent)' }}>
                                Primary Action
                            </button>

                            {/* Secondary Button */}
                            <button className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                                style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
                                Secondary
                            </button>

                            {/* Ghost/Outline Button */}
                            <button className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                                style={{ backgroundColor: 'transparent', color: 'var(--color-accent)', border: '1px solid var(--color-accent)' }}>
                                Ghost Button
                            </button>
                        </div>
                    </section>

                    {/* Cards */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold tracking-tight">Cards</h2>
                            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Card with Gradient Border */}
                            <div className="border-gradient p-8 space-y-4">
                                <h3 className="text-xl font-bold">Gradient Border</h3>
                                <p className="font-light" style={{ color: 'var(--color-text-muted)' }}>
                                    A subtle gradient border that catches the eye without screaming for attention.
                                </p>
                            </div>

                            {/* Card with Shadow */}
                            <div className="p-8 rounded-xl space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                style={{ backgroundColor: 'var(--color-bg-elevated)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                                <h3 className="text-xl font-bold">Elevated Card</h3>
                                <p className="font-light" style={{ color: 'var(--color-text-muted)' }}>
                                    Hover to see the lift effect. Subtle depth that feels premium.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Weight Scale Demo */}
                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold tracking-tight">Weight Scale</h2>
                            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                        </div>

                        <div className="space-y-2 text-3xl">
                            <p className="font-thin">Thin (100)</p>
                            <p className="font-extralight">Extra Light (200)</p>
                            <p className="font-light">Light (300)</p>
                            <p className="font-normal">Regular (400)</p>
                            <p className="font-medium">Medium (500)</p>
                            <p className="font-semibold">Semibold (600)</p>
                            <p className="font-bold">Bold (700)</p>
                            <p className="font-extrabold">Extra Bold (800)</p>
                            <p className="font-black">Black (900)</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
