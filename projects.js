document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('projects-grid');

    // Ensure Supabase is ready
    if (typeof supabase === 'undefined') {
        // If config.js handles loading, we wait. If not, this might hang if not careful.
        // Assuming config.js is loaded and does init.
        await new Promise(resolve => {
            if (typeof supabase !== 'undefined') resolve();
            window.addEventListener('supabase-ready', resolve);
            // Fallback check
            setTimeout(() => { if (typeof supabase !== 'undefined') resolve(); }, 1000);
        });
    }

    // Fetch Data
    try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .eq('is_visible', true)
            .order('created_at', { ascending: false }); // Default sort

        if (error) throw error;

        if (!projects || projects.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-slate-500 text-lg">Work in progress. Projects coming soon.</p>
                </div>
            `;
            return;
        }

        renderProjects(projects);

    } catch (err) {
        console.error('Error fetching projects:', err);
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-red-400">Unable to load projects at the moment.</p>
            </div>
        `;
    }
});

function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = "group card-item bg-slate-800/50 rounded-2xl border border-white/5 hover:border-primary/50 transition-all relative overflow-hidden flex flex-col h-full fade-up";

        // Tags generation
        const tagsHtml = (project.tags || []).map(tag =>
            `<span class="text-xs font-mono px-2 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-white/5">${tag}</span>`
        ).join('');

        card.innerHTML = `
            <div class="card-glow"></div>
            
            <!-- Thumbnail -->
            <div class="relative h-64 overflow-hidden bg-slate-900 border-b border-white/5">
                <img src="${project.thumbnail_url || 'https://placehold.co/600x400/1e293b/FFF?text=No+Image'}" 
                     alt="${project.title}" 
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            </div>

            <!-- Content -->
            <div class="p-8 relative z-10 flex flex-col flex-grow">
                <div class="flex gap-2 flex-wrap mb-4">
                    ${tagsHtml}
                </div>
                
                <h3 class="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                    ${project.title}
                </h3>
                
                <p class="text-slate-400 mb-6 flex-grow">
                    ${project.description}
                </p>

                <a href="${project.detail_url}" class="inline-flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider hover:gap-4 transition-all">
                    View Case Study <span class="text-primary">→</span>
                </a>
            </div>
        `;

        grid.appendChild(card);
    });

    // Re-init GSAP animations for new elements
    // We can use the logic from script.js, but since script.js runs on load, 
    // we might need to manually trigger animations for these new nodes.
    const newCards = grid.querySelectorAll('.card-item');

    // Add 3D Tilt listeners (reusing logic from script.js would be ideal, but duplicating for simplicity here)
    newCards.forEach(card => {
        const glow = card.querySelector('.card-glow');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (glow) gsap.to(glow, { x: x, y: y, duration: 0.1 });

            const xCenter = rect.width / 2;
            const yCenter = rect.height / 2;
            const rotateX = ((y - yCenter) / yCenter) * -5;
            const rotateY = ((x - xCenter) / xCenter) * 5;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5 });
        });
    });

    // Animate Entrance
    gsap.from(newCards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });
}
