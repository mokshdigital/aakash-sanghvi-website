/**
 * AG Fashion Hub - Analytics
 * Google Analytics 4 event tracking
 * 
 * Features:
 * - Track WhatsApp clicks with context
 * - Track page views
 * - Track design/product views
 * - Track collection views
 * - Track filter usage
 * - Fail gracefully if GA not loaded
 * - No tracking in development
 * 
 * @version 1.0.0
 */

/**
 * Check if analytics is enabled and available
 * @returns {boolean}
 */
function isAnalyticsAvailable() {
  // Don't track in development
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1') {
    return false;
  }
  
  // Check if analytics is enabled in config
  if (!CONFIG.ANALYTICS.ENABLED) {
    return false;
  }
  
  // Check if gtag function exists
  if (typeof gtag === 'undefined') {
    console.warn('Google Analytics not loaded');
    return false;
  }
  
  return true;
}

/**
 * Track a generic event
 * @param {string} eventName - Event name
 * @param {Object} eventParams - Event parameters
 */
function trackEvent(eventName, eventParams = {}) {
  if (!isAnalyticsAvailable()) {
    console.log('[Analytics - Dev]', eventName, eventParams);
    return;
  }
  
  try {
    gtag('event', eventName, eventParams);
    console.log('📊 Event tracked:', eventName, eventParams);
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

/**
 * Track page view
 * @param {string} pageTitle - Page title
 * @param {string} pagePath - Page path
 */
function trackPageView(pageTitle, pagePath) {
  if (!isAnalyticsAvailable()) {
    console.log('[Analytics - Dev] Page view:', pageTitle, pagePath);
    return;
  }
  
  try {
    gtag('event', 'page_view', {
      page_title: pageTitle,
      page_path: pagePath,
      page_location: window.location.href
    });
    console.log('📊 Page view tracked:', pageTitle);
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

/**
 * Track WhatsApp click
 * @param {string} location - Where the click occurred (e.g., 'header', 'product_detail', 'footer')
 * @param {string} designcode - Design code if applicable
 */
function trackWhatsAppClick(location, designcode = null) {
  const params = {
    event_category: 'engagement',
    event_label: location,
    click_location: location
  };
  
  if (designcode) {
    params.design_code = designcode;
  }
  
  trackEvent('whatsapp_click', params);
}

/**
 * Track design/product view
 * @param {Object} design - Design object
 */
function trackDesignView(design) {
  if (!design) return;
  
  const params = {
    event_category: 'product',
    design_code: design.designcode || design.title,
    design_price: design.price,
    collection_name: design.linkedCollection ? design.linkedCollection.collectionname : 'Unknown',
    availability: design.availability ? 'in_stock' : 'out_of_stock'
  };
  
  trackEvent('view_item', params);
}

/**
 * Track collection view
 * @param {Object} collection - Collection object
 */
function trackCollectionView(collection) {
  if (!collection) return;
  
  const params = {
    event_category: 'engagement',
    collection_name: collection.collectionname || collection.title,
    collection_slug: collection.slug
  };
  
  trackEvent('view_collection', params);
}

/**
 * Track filter usage
 * @param {Object} filters - Active filters object
 * @param {number} resultsCount - Number of results after filtering
 */
function trackFilterUsage(filters, resultsCount) {
  const activeFilters = Object.keys(filters).filter(key => filters[key]);
  
  if (activeFilters.length === 0) return;
  
  const params = {
    event_category: 'engagement',
    filter_types: activeFilters.join(','),
    results_count: resultsCount
  };
  
  // Add individual filter values
  activeFilters.forEach(filterType => {
    params[`filter_${filterType}`] = filters[filterType];
  });
  
  trackEvent('filter_applied', params);
}

/**
 * Track search (if search feature is implemented)
 * @param {string} searchTerm - Search query
 * @param {number} resultsCount - Number of results
 */
function trackSearch(searchTerm, resultsCount) {
  const params = {
    event_category: 'engagement',
    search_term: searchTerm,
    results_count: resultsCount
  };
  
  trackEvent('search', params);
}

/**
 * Track outbound link click
 * @param {string} url - Destination URL
 * @param {string} linkText - Link text/label
 */
function trackOutboundLink(url, linkText = '') {
  const params = {
    event_category: 'engagement',
    event_label: linkText,
    outbound_url: url
  };
  
  trackEvent('click', params);
}

/**
 * Track social media click
 * @param {string} platform - Social media platform (instagram, facebook, etc.)
 * @param {string} location - Where the click occurred
 */
function trackSocialClick(platform, location) {
  const params = {
    event_category: 'engagement',
    event_label: platform,
    click_location: location,
    social_platform: platform
  };
  
  trackEvent('social_click', params);
}

/**
 * Track error
 * @param {string} errorMessage - Error message
 * @param {string} errorContext - Where the error occurred
 * @param {boolean} fatal - Whether error is fatal
 */
function trackError(errorMessage, errorContext, fatal = false) {
  if (!isAnalyticsAvailable()) {
    console.error('[Error]', errorContext, errorMessage);
    return;
  }
  
  try {
    gtag('event', 'exception', {
      description: `${errorContext}: ${errorMessage}`,
      fatal: fatal
    });
  } catch (error) {
    console.error('Failed to track error:', error);
  }
}

/**
 * Initialize analytics tracking
 */
function initAnalytics() {
  // Track page view on initial load
  trackPageView(document.title, window.location.pathname);
  
  // Set up WhatsApp click tracking
  initWhatsAppTracking();
  
  // Set up social media click tracking
  initSocialTracking();
  
  // Set up outbound link tracking
  initOutboundLinkTracking();
  
  console.log('✅ Analytics tracking initialized');
}

/**
 * Initialize WhatsApp click tracking
 */
function initWhatsAppTracking() {
  // Track all WhatsApp links
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href*="wa.me"], a[href*="whatsapp"], .btn--whatsapp');
    
    if (target) {
      const location = target.getAttribute('data-location') || 
                      target.getAttribute('data-event-location') ||
                      'unknown';
      const designcode = target.getAttribute('data-design-code') || null;
      
      trackWhatsAppClick(location, designcode);
    }
  });
}

/**
 * Initialize social media click tracking
 */
function initSocialTracking() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href*="instagram.com"], a[href*="facebook.com"], a[href*="pinterest.com"], a[href*="tiktok.com"], a[href*="snapchat"]');
    
    if (target) {
      const href = target.href;
      let platform = 'unknown';
      
      if (href.includes('instagram')) platform = 'instagram';
      else if (href.includes('facebook')) platform = 'facebook';
      else if (href.includes('pinterest')) platform = 'pinterest';
      else if (href.includes('tiktok')) platform = 'tiktok';
      else if (href.includes('snapchat')) platform = 'snapchat';
      
      const location = target.closest('.footer') ? 'footer' : 
                      target.closest('.header') ? 'header' : 
                      'content';
      
      trackSocialClick(platform, location);
    }
  });
}

/**
 * Initialize outbound link tracking
 */
function initOutboundLinkTracking() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href^="http"]');
    
    if (target) {
      const href = target.href;
      const currentDomain = window.location.hostname;
      const linkDomain = new URL(href).hostname;
      
      // Check if it's an outbound link
      if (linkDomain !== currentDomain && 
          !href.includes('wa.me') && 
          !href.includes('instagram') && 
          !href.includes('facebook') &&
          !href.includes('tiktok') &&
          !href.includes('snapchat')) {
        
        const linkText = target.textContent.trim() || target.getAttribute('aria-label') || 'Unknown';
        trackOutboundLink(href, linkText);
      }
    }
  });
}

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initAnalytics();
  });
} else {
  initAnalytics();
}

/**
 * Track page unload (user leaving)
 */
window.addEventListener('beforeunload', () => {
  // Track time on page
  if (window.pageLoadTime) {
    const timeOnPage = Math.round((Date.now() - window.pageLoadTime) / 1000);
    trackEvent('time_on_page', {
      event_category: 'engagement',
      page_path: window.location.pathname,
      time_seconds: timeOnPage
    });
  }
});

// Set page load time
window.pageLoadTime = Date.now();