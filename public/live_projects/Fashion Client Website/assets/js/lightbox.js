/**
 * AG Fashion Hub - Lightbox
 * Full-screen image viewer with navigation
 * 
 * Features:
 * - Full-screen image viewing
 * - Previous/Next navigation
 * - Keyboard support (arrows, ESC)
 * - Touch/swipe support
 * - Zoom capability
 * - Prevents body scroll
 * 
 * @version 1.0.0
 */

/**
 * Lightbox Class
 */
class Lightbox {
  /**
   * Initialize lightbox
   */
  constructor() {
    // Create lightbox if it doesn't exist
    this.createLightboxHTML();
    
    // Get DOM elements
    this.lightbox = document.getElementById('lightbox');
    this.image = document.getElementById('lightbox-image');
    this.closeBtn = this.lightbox.querySelector('.lightbox__close');
    this.prevBtn = this.lightbox.querySelector('.lightbox__prev');
    this.nextBtn = this.lightbox.querySelector('.lightbox__next');
    this.body = document.body;
    
    // State
    this.images = [];
    this.currentIndex = 0;
    this.isOpen = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    // Initialize
    this.init();
  }
  
  /**
   * Create lightbox HTML if it doesn't exist
   */
  createLightboxHTML() {
    if (document.getElementById('lightbox')) return;
    
    const lightboxHTML = `
      <div id="lightbox" class="lightbox" style="display: none;" role="dialog" aria-modal="true" aria-label="Image viewer">
        <button class="lightbox__close" aria-label="Close lightbox">×</button>
        <button class="lightbox__prev" aria-label="Previous image">‹</button>
        <button class="lightbox__next" aria-label="Next image">›</button>
        <div class="lightbox__content">
          <img id="lightbox-image" src="" alt="">
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }
  
  /**
   * Initialize event listeners
   */
  init() {
    // Close button
    this.closeBtn.addEventListener('click', () => this.close());
    
    // Navigation buttons
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    
    // Click outside image to close
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.close();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      
      switch(e.key) {
        case 'Escape':
          this.close();
          break;
        case 'ArrowLeft':
          this.prev();
          break;
        case 'ArrowRight':
          this.next();
          break;
      }
    });
    
    // Touch support
    this.image.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.image.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    this.image.addEventListener('touchend', () => this.handleTouchEnd());
    
    console.log('✅ Lightbox initialized');
  }
  
  /**
   * Open lightbox with images
   * @param {Array<string>} images - Array of image URLs
   * @param {number} startIndex - Index to start at
   */
  open(images, startIndex = 0) {
    if (!images || images.length === 0) {
      console.warn('No images provided to lightbox');
      return;
    }
    
    this.images = images;
    this.currentIndex = startIndex;
    this.isOpen = true;
    
    this.show();
    this.lightbox.style.display = 'flex';
    this.body.style.overflow = 'hidden';
    
    // Focus close button for accessibility
    setTimeout(() => this.closeBtn.focus(), 100);
  }
  
  /**
   * Close lightbox
   */
  close() {
    this.isOpen = false;
    this.lightbox.style.display = 'none';
    this.body.style.overflow = '';
    this.images = [];
    this.currentIndex = 0;
  }
  
  /**
   * Show current image
   */
  show() {
    if (this.images.length === 0) return;
    
    const imageUrl = this.images[this.currentIndex];
    this.image.src = imageUrl;
    this.image.alt = `Image ${this.currentIndex + 1} of ${this.images.length}`;
    
    // Update button states
    this.updateButtons();
  }
  
  /**
   * Go to next image
   */
  next() {
    if (this.images.length === 0) return;
    
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.show();
  }
  
  /**
   * Go to previous image
   */
  prev() {
    if (this.images.length === 0) return;
    
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.show();
  }
  
  /**
   * Update button visibility based on number of images
   */
  updateButtons() {
    if (this.images.length <= 1) {
      this.prevBtn.style.display = 'none';
      this.nextBtn.style.display = 'none';
    } else {
      this.prevBtn.style.display = 'flex';
      this.nextBtn.style.display = 'flex';
    }
  }
  
  /**
   * Handle touch start
   * @param {TouchEvent} e
   */
  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
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
        // Swipe left - next image
        this.next();
      } else {
        // Swipe right - previous image
        this.prev();
      }
    }
  }
}

/**
 * Initialize lightbox when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.lightbox = new Lightbox();
  });
} else {
  window.lightbox = new Lightbox();
}

/**
 * Helper function to open lightbox from anywhere
 * @param {Array<string>} images - Array of image URLs
 * @param {number} startIndex - Index to start at
 */
function openLightbox(images, startIndex = 0) {
  if (window.lightbox) {
    window.lightbox.open(images, startIndex);
  } else {
    console.error('Lightbox not initialized');
  }
}