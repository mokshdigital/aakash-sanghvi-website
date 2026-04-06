/**
 * AG Fashion Hub - Modal System
 * Handles modal open/close and tab switching
 * 
 * @version 1.0.0
 */

/**
 * Modal Class
 */
class Modal {
  constructor() {
    this.modals = document.querySelectorAll('.modal');
    this.init();
  }
  
  /**
   * Initialize modals
   */
  init() {
    // Set up modal triggers (data-modal attribute)
    this.setupTriggers();
    
    // Set up close buttons
    this.setupCloseButtons();
    
    // Set up overlay clicks
    this.setupOverlayClicks();
    
    // Set up ESC key
    this.setupEscapeKey();
    
    // Set up tab switching
    this.setupTabs();
    
    console.log('✅ Modal system initialized');
  }
  
  /**
   * Set up modal trigger buttons
   */
  setupTriggers() {
    const triggers = document.querySelectorAll('[data-modal]');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.getAttribute('data-modal');
        this.open(modalId);
      });
    });
  }
  
  /**
   * Set up close buttons
   */
  setupCloseButtons() {
    const closeButtons = document.querySelectorAll('[data-close-modal]');
    
    closeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = button.closest('.modal');
        if (modal) {
          this.close(modal.id);
        }
      });
    });
  }
  
  /**
   * Set up overlay clicks to close modal
   */
  setupOverlayClicks() {
    this.modals.forEach(modal => {
      const overlay = modal.querySelector('.modal__overlay');
      if (overlay) {
        overlay.addEventListener('click', () => {
          this.close(modal.id);
        });
      }
    });
  }
  
  /**
   * Set up ESC key to close modal
   */
  setupEscapeKey() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.modals.forEach(modal => {
          if (modal.classList.contains('modal--open')) {
            this.close(modal.id);
          }
        });
      }
    });
  }
  
  /**
   * Set up tab switching functionality
   */
  setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetTab = button.getAttribute('data-tab');
        const tabContainer = button.closest('.modal__body');
        
        if (!tabContainer) return;
        
        // Remove active class from all tabs in this container
        const allButtons = tabContainer.querySelectorAll('.tab-btn');
        allButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        
        // Add active class to clicked tab
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        
        // Hide all tab panes in this container
        const allPanes = tabContainer.querySelectorAll('.tab-pane');
        allPanes.forEach(pane => {
          pane.classList.remove('active');
          pane.setAttribute('hidden', '');
        });
        
        // Show target tab pane
        const targetPane = tabContainer.querySelector(`#tab-${targetTab}`);
        if (targetPane) {
          targetPane.classList.add('active');
          targetPane.removeAttribute('hidden');
        }
        
        console.log('✅ Switched to tab:', targetTab);
      });
    });
    
    console.log('✅ Tab switching initialized for', tabButtons.length, 'tabs');
  }
  
  /**
   * Open a modal
   * @param {string} modalId - Modal ID
   */
  open(modalId) {
    const modal = document.getElementById(modalId);
    
    if (!modal) {
      console.error('Modal not found:', modalId);
      return;
    }
    
    // Add open class
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Track analytics
    if (typeof trackEvent === 'function') {
      trackEvent('modal_opened', {
        modal_id: modalId
      });
    }
    
    console.log('✅ Modal opened:', modalId);
  }
  
  /**
   * Close a modal
   * @param {string} modalId - Modal ID
   */
  close(modalId) {
    const modal = document.getElementById(modalId);
    
    if (!modal) return;
    
    // Remove open class
    modal.classList.remove('modal--open');
    modal.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    console.log('✅ Modal closed:', modalId);
  }
}

// Initialize modal system when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.modal = new Modal();
  });
} else {
  window.modal = new Modal();
}
