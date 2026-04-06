/**
 * AG Fashion Hub - Cookie Consent
 * Handles cookie policy consent banner
 * 
 * Features:
 * - Shows banner on first visit
 * - Stores consent in localStorage
 * - Smooth slide-up animation
 * - Accessible (ARIA labels, keyboard navigation)
 * 
 * @version 1.0.0
 */

/**
 * Cookie Consent Class
 */
class CookieConsent {
  constructor() {
    this.storageKey = 'ag_fashion_hub_cookie_consent';
    this.consentGiven = this.hasConsent();
    this.banner = null;
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }
  
  /**
   * Initialize cookie consent banner
   */
  init() {
    // Don't show if consent already given
    if (this.consentGiven) {
      return;
    }
    
    // Create and show banner
    this.createBanner();
    this.showBanner();
  }
  
  /**
   * Check if user has already given consent
   * @returns {boolean}
   */
  hasConsent() {
    try {
      const consent = localStorage.getItem(this.storageKey);
      return consent === 'accepted';
    } catch (error) {
      console.warn('Unable to access localStorage:', error);
      return false;
    }
  }
  
  /**
   * Create the cookie consent banner HTML
   */
  createBanner() {
    // Create banner element
    this.banner = document.createElement('div');
    this.banner.id = 'cookie-consent-banner';
    this.banner.className = 'cookie-consent';
    this.banner.setAttribute('role', 'dialog');
    this.banner.setAttribute('aria-labelledby', 'cookie-consent-title');
    this.banner.setAttribute('aria-live', 'polite');
    
    // Banner content
    this.banner.innerHTML = `
      <div class="cookie-consent__content">
        <div class="cookie-consent__text">
          <h3 id="cookie-consent-title" class="cookie-consent__title">Cookie Policy</h3>
          <p class="cookie-consent__message">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
            By clicking "Accept", you consent to our use of cookies. 
            <a href="/privacy-policy.html" class="cookie-consent__link">Learn more</a>
          </p>
        </div>
        <div class="cookie-consent__actions">
          <button 
            class="btn btn--primary cookie-consent__accept" 
            id="cookie-consent-accept"
            aria-label="Accept cookies">
            Accept
          </button>
          <button 
            class="btn btn--secondary cookie-consent__decline" 
            id="cookie-consent-decline"
            aria-label="Decline cookies">
            Decline
          </button>
        </div>
      </div>
    `;
    
    // Append to body
    document.body.appendChild(this.banner);
    
    // Add event listeners
    this.setupEventListeners();
  }
  
  /**
   * Setup event listeners for accept/decline buttons
   */
  setupEventListeners() {
    const acceptBtn = document.getElementById('cookie-consent-accept');
    const declineBtn = document.getElementById('cookie-consent-decline');
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => this.accept());
    }
    
    if (declineBtn) {
      declineBtn.addEventListener('click', () => this.decline());
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.banner && this.banner.classList.contains('cookie-consent--visible')) {
        this.decline(); // Treat Escape as decline
      }
    });
  }
  
  /**
   * Show the banner with animation
   */
  showBanner() {
    if (!this.banner) return;
    
    // Small delay to ensure smooth animation
    setTimeout(() => {
      this.banner.classList.add('cookie-consent--visible');
    }, 100);
  }
  
  /**
   * Hide the banner with animation
   */
  hideBanner() {
    if (!this.banner) return;
    
    this.banner.classList.remove('cookie-consent--visible');
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (this.banner && this.banner.parentNode) {
        this.banner.parentNode.removeChild(this.banner);
        this.banner = null;
      }
    }, 300);
  }
  
  /**
   * Accept cookies
   */
  accept() {
    try {
      localStorage.setItem(this.storageKey, 'accepted');
      this.consentGiven = true;
      
      // Track analytics event if available
      if (typeof trackEvent === 'function') {
        trackEvent('cookie_consent', {
          action: 'accepted'
        });
      }
      
      console.log('✅ Cookie consent accepted');
      this.hideBanner();
    } catch (error) {
      console.warn('Unable to save consent to localStorage:', error);
      // Still hide banner even if storage fails
      this.hideBanner();
    }
  }
  
  /**
   * Decline cookies
   */
  decline() {
    try {
      localStorage.setItem(this.storageKey, 'declined');
      this.consentGiven = true;
      
      // Track analytics event if available
      if (typeof trackEvent === 'function') {
        trackEvent('cookie_consent', {
          action: 'declined'
        });
      }
      
      console.log('✅ Cookie consent declined');
      this.hideBanner();
    } catch (error) {
      console.warn('Unable to save consent to localStorage:', error);
      // Still hide banner even if storage fails
      this.hideBanner();
    }
  }
  
  /**
   * Reset consent (for testing purposes)
   */
  reset() {
    try {
      localStorage.removeItem(this.storageKey);
      this.consentGiven = false;
      console.log('✅ Cookie consent reset');
    } catch (error) {
      console.warn('Unable to reset consent:', error);
    }
  }
}

// Initialize cookie consent
const cookieConsent = new CookieConsent();

// Export for global access (useful for testing)
window.cookieConsent = cookieConsent;

