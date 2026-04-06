/**
 * AG Fashion Hub - Configuration
 * Central configuration file for all site settings and constants
 * 
 * This file contains:
 * - API endpoints
 * - Site URLs and contact information
 * - Feature flags and settings
 * - Constants used throughout the application
 * 
 * @version 1.0.0
 */

/**
 * Main configuration object
 * All site-wide settings are stored here
 */
const CONFIG = {
  
  /**
   * API Configuration
   */
  API: {
    // WordPress GraphQL endpoint
    GRAPHQL_ENDPOINT: 'https://cms.amitojenterprisesltd.ca/graphql',
    
    // Request timeout in milliseconds
    TIMEOUT: 30000,
    
    // Number of retries for failed requests
    MAX_RETRIES: 3,
    
    // Delay between retries in milliseconds
    RETRY_DELAY: 1000
  },
  
  /**
   * Site URLs and Domain Information
   */
  SITE: {
    // Main website URL
    URL: 'https://amitojenterprisesltd.ca',
    
    // WordPress admin URL
    CMS_URL: 'https://cms.amitojenterprisesltd.ca',
    
    // Site name
    NAME: 'AG Fashion Hub',
    
    // Site description
    DESCRIPTION: 'Premium Indian Ethnic Wear - Dresses, Sarees, Lehengas'
  },
  
  /**
   * Contact Information
   */
  CONTACT: {
    // WhatsApp number (international format without + or spaces)
    WHATSAPP_NUMBER: '16047223293',
    
    // Default WhatsApp message
    WHATSAPP_MESSAGE: "Hi, I'd like to inquire about your designs",
    
    // Contact email (if needed in future)
    EMAIL: 'contact@amitojenterprisesltd.ca',
    
    // Business hours (for display purposes)
    HOURS: 'Mon-Sat: 10:00 AM - 7:00 PM PST'
  },
  
  /**
   * Social Media Links
   */
  SOCIAL: {
    // Instagram profile URL
    INSTAGRAM: '#',

    // Facebook page URL
    FACEBOOK: '#',
    
    // Pinterest (optional)
    PINTEREST: '',
    
    // YouTube (optional)
    YOUTUBE: ''
  },
  
  /**
   * Analytics Configuration
   */
  ANALYTICS: {
    // Google Tag Manager ID
    GTM_ID: 'GTM-KTC48LH2', // UPDATE THIS WHEN YOU GET IT
    
    // Google Analytics 4 Measurement ID
    GA4_ID: 'G-XXXXXXXXXX', // UPDATE THIS WHEN YOU GET IT
    
    // Disabled for portfolio demo mode
    ENABLED: false
  },
  
  /**
   * Pagination Settings
   */
  PAGINATION: {
    // Number of items per page for blog posts
    BLOG_POSTS_PER_PAGE: 9,
    
    // Number of items per page for collections
    COLLECTIONS_PER_PAGE: 12,
    
    // Number of items per page for designs
    DESIGNS_PER_PAGE: 16,
    
    // Number of related designs to show
    RELATED_DESIGNS_COUNT: 4
  },
  
  /**
   * Carousel Settings
   */
  CAROUSEL: {
    // Auto-scroll enabled
    AUTOPLAY: true,
    
    // Auto-scroll speed in milliseconds
    AUTOPLAY_SPEED: 3000,
    
    // Number of items visible at once (desktop)
    ITEMS_TO_SHOW_DESKTOP: 3,
    
    // Number of items visible at once (tablet)
    ITEMS_TO_SHOW_TABLET: 2,
    
    // Number of items visible at once (mobile)
    ITEMS_TO_SHOW_MOBILE: 1,
    
    // Transition speed in milliseconds
    TRANSITION_SPEED: 500
  },
  
  /**
   * Image Settings
   */
  IMAGES: {
    // Placeholder image for missing images
    PLACEHOLDER: 'assets/images/placeholder.jpg',
    
    // Default Open Graph image
    OG_DEFAULT: 'assets/images/og-default.jpg',
    
    // Lazy loading enabled
    LAZY_LOAD: true,
    
    // Lazy loading threshold (distance from viewport)
    LAZY_THRESHOLD: '200px',
    
    // Image quality for WordPress thumbnails
    THUMBNAIL_QUALITY: 'medium_large' // Options: thumbnail, medium, medium_large, large, full
  },
  
  /**
   * SEO Settings
   */
  SEO: {
    // Default meta description
    DEFAULT_DESCRIPTION: 'Discover our exquisite collection of Indian ethnic wear including dresses, sarees, and lehengas. Premium quality traditional and contemporary designs.',
    
    // Default meta keywords
    DEFAULT_KEYWORDS: 'indian ethnic wear, dresses, sarees, lehengas, wedding wear, festive wear, traditional clothing',
    
    // Twitter handle (without @)
    TWITTER_HANDLE: 'agfashionhub', // UPDATE THIS
    
    // Organization schema type
    SCHEMA_TYPE: 'Organization'
  },
  
  /**
   * Feature Flags
   * Enable/disable features for testing or gradual rollout
   */
  FEATURES: {
    // Show filters on collection pages
    ENABLE_FILTERS: true,
    
    // Show size guide modal
    ENABLE_SIZE_GUIDE: true,
    
    // Enable Instagram widget
    ENABLE_INSTAGRAM_FEED: true,
    
    // Enable blog functionality
    ENABLE_BLOG: true,
    
    // Show "New Arrivals" section on homepage
    ENABLE_NEW_ARRIVALS: true,
    
    // Enable search functionality (future feature)
    ENABLE_SEARCH: false,
    
    // Enable wishlist (future feature)
    ENABLE_WISHLIST: false
  },
  
  /**
   * UI Settings
   */
  UI: {
    // Show loading spinners
    SHOW_LOADING: true,
    
    // Loading spinner delay (ms) - prevents flash for fast loads
    LOADING_DELAY: 300,
    
    // Toast notification duration (ms)
    TOAST_DURATION: 3000,
    
    // Smooth scroll enabled
    SMOOTH_SCROLL: true,
    
    // Animation duration for page transitions
    ANIMATION_DURATION: 300
  },
  
  /**
   * Cache Settings (for future implementation)
   */
  CACHE: {
    // Enable client-side caching
    ENABLED: false,
    
    // Cache duration in milliseconds (5 minutes)
    DURATION: 5 * 60 * 1000,
    
    // Maximum cache size (number of items)
    MAX_SIZE: 50
  },
  
  /**
   * Error Messages
   * User-friendly error messages for different scenarios
   */
  ERRORS: {
    NETWORK: 'Unable to connect to the server. Please check your internet connection and try again.',
    NOT_FOUND: 'The requested content could not be found.',
    SERVER: 'Something went wrong on our end. Please try again later.',
    TIMEOUT: 'Request timed out. Please check your connection and try again.',
    GENERIC: 'An unexpected error occurred. Please try again.',
    NO_RESULTS: 'No results found matching your criteria.'
  },
  
  /**
   * Breakpoints (must match CSS breakpoints)
   * Used for JavaScript responsive behavior
   */
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536
  }
  
};

/**
 * Helper function to generate WhatsApp URL
 * @param {string} message - Custom message (optional)
 * @param {string} designcode - Design code to include in message (optional)
 * @returns {string} Complete WhatsApp URL
 */
CONFIG.getWhatsAppURL = function(message = null, designcode = null) {
  let text = message || this.CONTACT.WHATSAPP_MESSAGE;
  
  if (designcode) {
    text += ` (Design: ${designcode})`;
  }
  
  // Encode message for URL
  const encodedText = encodeURIComponent(text);
  
  return `https://wa.me/${this.CONTACT.WHATSAPP_NUMBER}?text=${encodedText}`;
};

/**
 * Generate WhatsApp inquiry URL for product/design
 * @param {Object} design - Design object with product details
 * @returns {string} Complete WhatsApp inquiry URL
 */
CONFIG.getWhatsAppShareURL = function(design) {
  if (!design) return CONFIG.getWhatsAppURL();
  
  const productUrl = `${window.location.origin}/product-detail.html?slug=${design.slug}`;
  const designCode = design.designcode || design.title || '';
  const price = design.price ? `$${design.price}.00` : '';
  
  // Build inquiry message
  let inquiryMessage = `Hi, I'd like to inquire about ${designCode}`;
  
  if (price) {
    inquiryMessage += ` (Price: ${price})`;
  }
  
  inquiryMessage += `\n\n${productUrl}`;
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(inquiryMessage);
  
  // Send to business WhatsApp number (same as enquiry button)
  return `https://wa.me/${this.CONTACT.WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

/**
 * Helper function to check if current screen size matches breakpoint
 * @param {string} breakpoint - Breakpoint name (SM, MD, LG, XL, XXL)
 * @returns {boolean} True if screen width is >= breakpoint
 */
CONFIG.isBreakpoint = function(breakpoint) {
  return window.innerWidth >= this.BREAKPOINTS[breakpoint];
};

/**
 * Helper function to get current breakpoint
 * @returns {string} Current breakpoint name
 */
CONFIG.getCurrentBreakpoint = function() {
  const width = window.innerWidth;
  
  if (width >= this.BREAKPOINTS.XXL) return 'XXL';
  if (width >= this.BREAKPOINTS.XL) return 'XL';
  if (width >= this.BREAKPOINTS.LG) return 'LG';
  if (width >= this.BREAKPOINTS.MD) return 'MD';
  if (width >= this.BREAKPOINTS.SM) return 'SM';
  return 'XS';
};

/**
 * Helper function to log errors (with analytics integration point)
 * @param {string} context - Where the error occurred
 * @param {Error} error - The error object
 */
CONFIG.logError = function(context, error) {
  console.error(`[${context}]`, error);
  
  // Future: Send to analytics if enabled
  if (this.ANALYTICS.ENABLED && typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      description: `${context}: ${error.message}`,
      fatal: false
    });
  }
};

/**
 * Freeze the config object to prevent accidental modifications
 * Note: Helper functions can still be called
 */
Object.freeze(CONFIG.API);
Object.freeze(CONFIG.SITE);
Object.freeze(CONFIG.CONTACT);
Object.freeze(CONFIG.SOCIAL);
Object.freeze(CONFIG.ANALYTICS);
Object.freeze(CONFIG.PAGINATION);
Object.freeze(CONFIG.CAROUSEL);
Object.freeze(CONFIG.IMAGES);
Object.freeze(CONFIG.SEO);
Object.freeze(CONFIG.FEATURES);
Object.freeze(CONFIG.UI);
Object.freeze(CONFIG.CACHE);
Object.freeze(CONFIG.ERRORS);
Object.freeze(CONFIG.BREAKPOINTS);

// Log configuration loaded (only in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('✅ Configuration loaded:', CONFIG);
}

/**
 * Export for use in other modules
 * Works with both ES6 modules and traditional scripts
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}