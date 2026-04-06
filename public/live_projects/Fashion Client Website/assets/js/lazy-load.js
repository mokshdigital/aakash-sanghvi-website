/**
 * AG Fashion Hub - Lazy Loading
 * Lazy load images using Intersection Observer API
 * 
 * Features:
 * - Only loads images when they enter viewport
 * - Smooth fade-in effect
 * - Fallback for browsers without IntersectionObserver
 * - Handles responsive srcset
 * - Re-observes dynamically added images
 * 
 * @version 1.0.0
 */

/**
 * Lazy Loader Class
 */
class LazyLoader {
  /**
   * Initialize lazy loader
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.options = {
      rootMargin: options.rootMargin || CONFIG.IMAGES.LAZY_THRESHOLD,
      threshold: options.threshold || 0,
      selector: options.selector || 'img[loading="lazy"]',
      fadeIn: options.fadeIn !== undefined ? options.fadeIn : true
    };
    
    // Check if IntersectionObserver is supported
    this.isSupported = 'IntersectionObserver' in window;
    
    if (!this.isSupported) {
      console.warn('IntersectionObserver not supported, loading all images immediately');
      this.loadAllImages();
      return;
    }
    
    // Create observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold
      }
    );
    
    // Initialize
    this.init();
  }
  
  /**
   * Initialize lazy loading
   */
  init() {
    this.observe();
    console.log('✅ Lazy loading initialized');
  }
  
  /**
   * Observe all lazy-loadable images
   */
  observe() {
    const images = document.querySelectorAll(this.options.selector);
    
    images.forEach(img => {
      // Skip if already loaded
      if (img.classList.contains('lazy-loaded')) {
        return;
      }
      
      this.observer.observe(img);
    });
    
    if (images.length > 0) {
      console.log(`🔍 Observing ${images.length} lazy-loadable image(s)`);
    }
  }
  
  /**
   * Handle intersection observer callback
   * @param {Array} entries - Intersection observer entries
   */
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }
  
  /**
   * Load a single image
   * @param {HTMLImageElement} img - Image element to load
   */
  loadImage(img) {
    // Get data attributes or actual src/srcset
    const src = img.dataset.src || img.src;
    const srcset = img.dataset.srcset || img.srcset;
    
    // Create new image to preload
    const imageLoader = new Image();
    
    // Set up load handler
    imageLoader.onload = () => {
      // Set actual src and srcset
      if (srcset) {
        img.srcset = srcset;
      }
      img.src = src;
      
      // Add loaded class
      img.classList.add('lazy-loaded');
      
      // Add fade-in effect
      if (this.options.fadeIn) {
        img.classList.add('fade-in');
      }
      
      // Remove lazy loading attribute
      img.removeAttribute('loading');
    };
    
    // Set up error handler
    imageLoader.onerror = () => {
      console.error('Failed to load image:', src);
      img.src = CONFIG.IMAGES.PLACEHOLDER;
      img.classList.add('lazy-error');
    };
    
    // Start loading
    if (srcset) {
      imageLoader.srcset = srcset;
    }
    imageLoader.src = src;
  }
  
  /**
   * Load all images immediately (fallback for unsupported browsers)
   */
  loadAllImages() {
    const images = document.querySelectorAll(this.options.selector);
    
    images.forEach(img => {
      const src = img.dataset.src || img.src;
      const srcset = img.dataset.srcset || img.srcset;
      
      if (srcset) {
        img.srcset = srcset;
      }
      img.src = src;
      img.removeAttribute('loading');
    });
  }
  
  /**
   * Disconnect observer and clean up
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

/**
 * Initialize lazy loader when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (CONFIG.IMAGES.LAZY_LOAD) {
      window.lazyLoader = new LazyLoader();
    }
  });
} else {
  if (CONFIG.IMAGES.LAZY_LOAD) {
    window.lazyLoader = new LazyLoader();
  }
}