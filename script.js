// Smooth scroll to section on home page
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Password validation for projects page
function checkPassword(event) {
    event.preventDefault();
    
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    const passwordForm = document.getElementById('passwordForm');
    const projectsContent = document.getElementById('projectsContent');
    
    const correctPassword = 'portfolio2024';
    
    if (passwordInput.value === correctPassword) {
        // Hide password form and show projects
        passwordForm.style.display = 'none';
        projectsContent.style.display = 'block';
        errorMessage.textContent = '';
        
        // Smooth scroll to projects content
        projectsContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        // Show error message
        errorMessage.textContent = 'Incorrect password. Please try again.';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Add active state to navigation chips on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Only run on home page
    if (document.querySelector('.hero')) {
        const sections = document.querySelectorAll('.resume-section');
        const chips = document.querySelectorAll('.chip');
        
        function updateActiveChip() {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const scrollPosition = window.pageYOffset + 150;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            // Map chip text to section IDs
            const chipToSection = {
                'about': 'about',
                'skills': 'skills',
                'experience': 'experience',
                'journey': 'journey'
            };
            
            chips.forEach(chip => {
                chip.classList.remove('active');
                const chipText = chip.textContent.toLowerCase();
                const mappedSection = chipToSection[chipText];
                if (mappedSection === currentSection) {
                    chip.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveChip);
        updateActiveChip();
    }
});

