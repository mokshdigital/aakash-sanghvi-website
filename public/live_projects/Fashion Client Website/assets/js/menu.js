/**
 * AG Fashion Hub - Mobile Menu
 * Handles hamburger menu toggle and mobile navigation
 * 
 * Features:
 * - Smooth open/close animations
 * - Prevents body scroll when open
 * - Closes on link click
 * - Closes on outside click
 * - Keyboard accessible (ESC to close)
 * 
 * @version 1.0.0
 */

/**
 * Mobile Menu Controller
 */
class MobileMenu {
  /**
   * Initialize mobile menu
   */
  constructor() {
    // Get DOM elements
    this.hamburger = document.querySelector('.hamburger');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.menuLinks = document.querySelectorAll('.mobile-menu a');
    this.body = document.body;
    
    // State
    this.isOpen = false;
    
    // Check if elements exist
    if (!this.hamburger || !this.mobileMenu) {
      console.warn('Mobile menu elements not found');
      return;
    }
    
    // Initialize
    this.init();
  }
  
  /**
   * Initialize event listeners
   */
  init() {
    // Hamburger click
    this.hamburger.addEventListener('click', () => this.toggle());
    
    // Close on link click
    this.menuLinks.forEach(link => {
      link.addEventListener('click', () => this.close());
    });
    
    // Close on outside click
    this.mobileMenu.addEventListener('click', (e) => {
      if (e.target === this.mobileMenu) {
        this.close();
      }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Close on window resize to desktop size
    window.addEventListener('resize', () => {
      if (window.innerWidth >= CONFIG.BREAKPOINTS.MD && this.isOpen) {
        this.close();
      }
    });
    
    console.log('✅ Mobile menu initialized');
  }
  
  /**
   * Toggle menu open/closed
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  /**
   * Open menu
   */
  open() {
    this.isOpen = true;
    this.mobileMenu.classList.add('active');
    this.hamburger.setAttribute('aria-expanded', 'true');
    this.body.style.overflow = 'hidden'; // Prevent body scroll
    
    // Focus first link for accessibility
    setTimeout(() => {
      const firstLink = this.mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }, 300);
  }
  
  /**
   * Close menu
   */
  close() {
    this.isOpen = false;
    this.mobileMenu.classList.remove('active');
    this.hamburger.setAttribute('aria-expanded', 'false');
    this.body.style.overflow = ''; // Restore body scroll
  }
}

/**
 * Initialize menu when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.mobileMenu = new MobileMenu();
  });
} else {
  window.mobileMenu = new MobileMenu();
}