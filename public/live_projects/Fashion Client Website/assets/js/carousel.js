/**
 * AG Fashion Hub - Carousel
 * Infinite loop carousel with autoplay and touch support
 * 
 * Features:
 * - Infinite loop (seamless)
 * - Autoplay with pause on hover
 * - Touch/swipe support
 * - Responsive (shows different number of items based on screen size)
 * - Previous/Next buttons
 * - Keyboard navigation
 * 
 * @version 1.0.0
 */

/**
 * Carousel Class
 */
class Carousel {
  /**
   * Initialize carousel
   * @param {HTMLElement} element - Carousel container element
   * @param {Object} options - Configuration options
   */
  constructor(element, options = {}) {
    this.carousel = element;
    this.track = element.querySelector('.carousel__track');
    this.prevBtn = element.querySelector('.carousel__btn--prev');
    this.nextBtn = element.querySelector('.carousel__btn--next');
    
    // Check if elements exist
    if (!this.track) {
      console.warn('Carousel track not found');
      return;
    }
    
    // Configuration
    this.options = {
      autoplay: options.autoplay !== undefined ? options.autoplay : CONFIG.CAROUSEL.AUTOPLAY,
      autoplaySpeed: options.autoplaySpeed || CONFIG.CAROUSEL.AUTOPLAY_SPEED,
      transitionSpeed: options.transitionSpeed || CONFIG.CAROUSEL.TRANSITION_SPEED,
      itemsToShow: this.getItemsToShow(),
      ...options
    };
    
    // State
    this.currentIndex = 0;
    this.items = [];
    this.autoplayInterval = null;
    this.isTransitioning = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    // Initialize
    this.init();
  }
  
  /**
   * Get number of items to show based on screen size
   * @returns {number}
   */
  getItemsToShow() {
    if (window.innerWidth >= CONFIG.BREAKPOINTS.LG) {
      return CONFIG.CAROUSEL.ITEMS_TO_SHOW_DESKTOP;
    } else if (window.innerWidth >= CONFIG.BREAKPOINTS.MD) {
      return CONFIG.CAROUSEL.ITEMS_TO_SHOW_TABLET;
    }
    return CONFIG.CAROUSEL.ITEMS_TO_SHOW_MOBILE;
  }
  
  /**
   * Initialize carousel
   */
  init() {
    // Get original items
    this.items = Array.from(this.track.children);
    
    if (this.items.length === 0) {
      console.warn('No carousel items found');
      return;
    }

    this.clonesToAdde = this.options.itemsToShow;
    this.cloneItems();
    
    this.currentIndex = this.clonesToAdde;
    this.updatePosition(false); // Jump to start without animation

    this.initEventListeners();
    
    // --- NEW: Add transitionend listener ---
    this.track.addEventListener('transitionend', () => {
      this.isTransitioning = false;

      // Check for jump at the end
      if (this.currentIndex === this.clonesToAdde + this.items.length) { 
        this.currentIndex = this.clonesToAdde; 
        this.updatePosition(false); 
      }
      
      // Check for jump at the start
      if (this.currentIndex < this.clonesToAdde) {
        this.currentIndex = this.clonesToAdde + this.items.length - 1; 
        this.updatePosition(false); 
      }
    });
    // --- END NEW ---
    
    if (this.options.autoplay) {
      this.startAutoplay();
    }
    
    window.addEventListener('resize', () => this.handleResize());
    
    console.log('✅ Carousel initialized');
  }
  
  /**
   * Clone items for infinite loop effect
   */
  cloneItems() {
    const clonesToAdd = this.clonesToAdde;
    const originalItems = [...this.items]; // Make a copy

    // Prepend clones of the *last* items
    for (let i = 0; i < clonesToAdd; i++) {
        const itemIndex = (originalItems.length - (clonesToAdd - i)) % originalItems.length;
        const clone = originalItems[itemIndex].cloneNode(true);
        clone.classList.add('carousel__item--clone');
        this.track.prepend(clone);
    }

    // Append clones of the *first* items
    for (let i = 0; i < clonesToAdd; i++) {
      const itemIndex = i % originalItems.length;
      const clone = originalItems[itemIndex].cloneNode(true);
      clone.classList.add('carousel__item--clone');
      this.track.appendChild(clone);
    }
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Previous button
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    
    // Next button
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
    
    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
    this.carousel.addEventListener('mouseleave', () => {
      if (this.options.autoplay) this.startAutoplay();
    });
    
    // Touch support
    this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    this.track.addEventListener('touchend', () => this.handleTouchEnd());
    
    // Keyboard navigation
    this.carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }
  
  /**
   * Update carousel position
   * @param {boolean} animate - Whether to animate the transition
   */
  updatePosition(animate = true) {
    
    const itemWidth = this.track.children[0].offsetWidth;
    const gap = 20; // Should match CSS gap
    const offset = this.currentIndex * (itemWidth + gap);

    console.log(`CAROUSEL DEBUG: updatePosition. Index: ${this.currentIndex}, Offset: -${offset}px, Animate: ${animate}`);
    
    if (animate) {
      this.track.style.transition = `transform ${this.options.transitionSpeed}ms ease-in-out`;
    } else {
      this.track.style.transition = 'none';
    }
    
    this.track.style.transform = `translateX(-${offset}px)`;
  }
  
  /**
   * Go to next slide
   */
  next() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentIndex++;
    this.updatePosition();
    
    // The transitionend listener will handle the jump
  }
  
  /**
   * Go to previous slide
   */
 prev() {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.currentIndex--;
    this.updatePosition();
    
    // The transitionend listener will handle the jump
  }
  
  /**
   * Start autoplay
   */
  startAutoplay() {
    this.stopAutoplay(); // Clear any existing interval
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, this.options.autoplaySpeed);
  }
  
  /**
   * Stop autoplay
   */
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  /**
   * Handle touch start
   * @param {TouchEvent} e
   */
  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.stopAutoplay();
  }
  
  /**
   * Handle touch move
   * @param {TouchEvent} e
   */
  handleTouchMove(e) {
    this.touchEndX = e.touches[0].clientX;
  }
  
  /**
   * Handle touch end
   */
  handleTouchEnd() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - go to next
        this.next();
      } else {
        // Swipe right - go to prev
        this.prev();
      }
    }
    
    // Restart autoplay
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }
  
  /**
   * Handle window resize
   */
  handleResize() {
    const newItemsToShow = this.getItemsToShow();
    
    if (newItemsToShow !== this.options.itemsToShow) {
      this.options.itemsToShow = newItemsToShow;
      this.updatePosition(false);
    }
  }
  
  /**
   * Destroy carousel and clean up
   */
  destroy() {
    this.stopAutoplay();
    // Remove cloned items
    const clones = this.track.querySelectorAll('.carousel__item--clone');
    clones.forEach(clone => clone.remove());
  }
}
window.Carousel = Carousel;
/**
 * Initialize all carousels on the page
 */
function initCarousels() {
  const carousels = document.querySelectorAll('.carousel');
  const instances = [];
  
  carousels.forEach(carouselEl => {
    const carousel = new Carousel(carouselEl);
    instances.push(carousel);
  });
  
  if (instances.length > 0) {
    console.log(`✅ Initialized ${instances.length} carousel(s)`);
  }
  
  return instances;
}

/**
 * Initialize when DOM is ready
 */
/*
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.carousels = initCarousels();
  });
} else {
  window.carousels = initCarousels();
}
  */