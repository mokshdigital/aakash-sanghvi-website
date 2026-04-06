/**
 * AG Fashion Hub - Announcement Bar
 * Displays dynamic announcements from WordPress Pods
 * 
 * Features:
 * - Fetches active announcements from WordPress
 * - Shows highest priority announcement
 * - Dismissible with localStorage
 * - Customizable colors per announcement
 * - Responsive design
 * 
 * @version 1.0.0
 */

/**
 * Announcement Bar Class
 */
class AnnouncementBar {
  constructor() {
    this.bar = null;
    this.currentAnnouncement = null;
    this.storageKey = 'ag_fashion_hub_dismissed_announcements';
    this.dismissedIds = this.getDismissedIds();
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }
  
  /**
   * Initialize announcement bar
   */
  async init() {
    try {
      console.log('📢 Initializing announcement bar...');
      
      // Check if getActiveAnnouncements function exists
      if (typeof getActiveAnnouncements !== 'function') {
        console.error('❌ getActiveAnnouncements function not found! Make sure graphql-client.js is loaded.');
        return;
      }
      
      // Fetch active announcements
      const announcements = await getActiveAnnouncements();
      
      console.log('📢 Announcements received in init:', announcements);
      
      if (!announcements || announcements.length === 0) {
        console.log('ℹ️ No active announcements to display');
        return; // No announcements to show
      }
      
      // Get the highest priority announcement (already sorted by getActiveAnnouncements)
      const announcement = announcements[0];
      console.log('📢 Displaying announcement:', announcement);
      
      // Portfolio mode: always show, never dismiss
      
      // Store current announcement
      this.currentAnnouncement = announcement;
      
      // Create and show banner
      this.createBar(announcement);
      this.showBar();
      
      console.log('✅ Announcement bar displayed successfully');
      
    } catch (error) {
      console.error('❌ Error initializing announcement bar:', error);
      // Fail silently - don't break the site if announcements fail
    }
  }
  
  /**
   * Get dismissed announcement IDs from localStorage
   * @returns {Array} Array of dismissed announcement IDs
   */
  getDismissedIds() {
    try {
      const dismissed = localStorage.getItem(this.storageKey);
      return dismissed ? JSON.parse(dismissed) : [];
    } catch (error) {
      console.warn('Unable to read dismissed announcements:', error);
      return [];
    }
  }
  
  /**
   * Check if an announcement was dismissed
   * @param {string} id - Announcement ID
   * @returns {boolean}
   */
  isDismissed(id) {
    return this.dismissedIds.includes(id);
  }
  
  /**
   * Mark announcement as dismissed
   * @param {string} id - Announcement ID
   */
  dismissAnnouncement(id) {
    try {
      if (!this.dismissedIds.includes(id)) {
        this.dismissedIds.push(id);
        localStorage.setItem(this.storageKey, JSON.stringify(this.dismissedIds));
      }
    } catch (error) {
      console.warn('Unable to save dismissed announcement:', error);
    }
  }
  
  /**
   * Create the announcement bar HTML
   * @param {Object} announcement - Announcement data
   */
  createBar(announcement) {
    // Create bar element
    this.bar = document.createElement('div');
    this.bar.id = 'announcement-bar';
    this.bar.className = 'announcement-bar';
    this.bar.setAttribute('role', 'banner');
    this.bar.setAttribute('aria-live', 'polite');
    
    // Set custom colors from announcement
    const bgColor = announcement.backgroundcolor || '#A12390';
    const textColor = announcement.textcolor || '#FFFFFF';
    
    this.bar.style.setProperty('background-color', bgColor, 'important'); // Force override
    this.bar.style.color = textColor;
    
    // Parse message (handle HTML from WYSIWYG)
    const message = this.parseMessage(announcement.message);
    
    // Build content (static - no marquee)
    let contentHTML = `
      <div class="announcement-bar__content">
        <div class="announcement-bar__message">
          ${message}
        </div>
    `;
    
    // Add link button if link exists
    if (announcement.linkurl && announcement.linkurl.trim() !== '') {
      const linkText = announcement.linktext || 'Learn More';
      contentHTML += `
        <a href="${announcement.linkurl}" 
           class="announcement-bar__link"
           style="color: ${textColor}; border-color: ${textColor};"
           ${announcement.linkurl.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
          ${linkText}
        </a>
      `;
    }
    
    contentHTML += `
      </div>
    `;
    
    this.bar.innerHTML = contentHTML;
    
    // Insert at the beginning of body (after opening body tag)
    document.body.insertBefore(this.bar, document.body.firstChild);
    
    // Add event listeners
    this.setupEventListeners(announcement.id);
  }
  
  /**
   * Parse message content (handle HTML)
   * @param {string} message - Raw message content
   * @returns {string} Parsed HTML
   */
  parseMessage(message) {
    if (!message) return '';
    
    // If message contains HTML tags, return as-is
    if (/<[a-z][\s\S]*>/i.test(message)) {
      return message;
    }
    
    // Otherwise, treat as plain text and preserve line breaks
    return message.replace(/\n/g, '<br>');
  }
  
  /**
   * Setup event listeners
   * @param {string} announcementId - Announcement ID for dismissal
   */
  setupEventListeners(announcementId) {
    const closeBtn = document.getElementById('announcement-bar-close');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.dismissAnnouncement(announcementId);
        this.hideBar();
      });
    }
  }
  
  /**
   * Show the bar with animation
   */
  showBar() {
    if (!this.bar) return;
    
    // Small delay to ensure smooth animation
    setTimeout(() => {
      this.bar.classList.add('announcement-bar--visible');
    }, 100);
    
    // Adjust body padding to prevent content jump
    this.adjustBodyPadding();
  }
  
  /**
   * Hide the bar with animation
   */
  hideBar() {
    if (!this.bar) return;
    
    this.bar.classList.remove('announcement-bar--visible');
    
    // Remove from DOM after animation
    setTimeout(() => {
      if (this.bar && this.bar.parentNode) {
        this.bar.parentNode.removeChild(this.bar);
        this.bar = null;
        this.restoreBodyPadding();
      }
    }, 300);
  }
  
  /**
   * Adjust body padding to prevent content jump
   */
  adjustBodyPadding() {
    if (!this.bar) return;
    
    const barHeight = this.bar.offsetHeight;
    document.body.style.paddingTop = `${barHeight}px`;
  }
  
  /**
   * Restore body padding
   */
  restoreBodyPadding() {
    document.body.style.paddingTop = '';
  }
  
  /**
   * Reset all dismissed announcements (for testing)
   */
  reset() {
    try {
      localStorage.removeItem(this.storageKey);
      this.dismissedIds = [];
      console.log('✅ Announcement dismissals reset');
    } catch (error) {
      console.warn('Unable to reset dismissals:', error);
    }
  }
}

// Initialize announcement bar - delay to ensure all scripts are loaded
function initAnnouncementBar() {
  // Wait for DOM and ensure graphql-client is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Small delay to ensure graphql-client.js has finished executing
      setTimeout(() => {
        if (typeof getActiveAnnouncements === 'function') {
          window.announcementBar = new AnnouncementBar();
        } else {
          console.warn('⚠️ getActiveAnnouncements not available, announcement bar will not load');
        }
      }, 100);
    });
  } else {
    // DOM already loaded, but wait a bit for scripts
    setTimeout(() => {
      if (typeof getActiveAnnouncements === 'function') {
        window.announcementBar = new AnnouncementBar();
      } else {
        console.warn('⚠️ getActiveAnnouncements not available, announcement bar will not load');
      }
    }, 100);
  }
}

// Start initialization
initAnnouncementBar();