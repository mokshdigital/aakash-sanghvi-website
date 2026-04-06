/**
 * AG Fashion Hub - Filtering System
 * Client-side filtering for design collections
 * 
 * Features:
 * - Multi-criteria filtering (price, color, occasion, availability)
 * - AND logic (all active filters must match)
 * - Instant filtering without page reload
 * - Maintains filter state in URL params
 * - No results messaging
 * 
 * @version 1.0.0
 */

/**
 * Design Filters Class
 * Handles all filtering logic for design collections
 */
class DesignFilters {
  /**
   * Initialize filters
   * @param {Array} designs - Array of design objects
   */
  constructor(designs = []) {
    // Data
    this.allDesigns = designs;
    this.filteredDesigns = designs;
    
    // Active filters
    this.activeFilters = {
      price: null,
      color: null,
      occasion: null,
      availability: null
    };
    
    // DOM elements
    this.priceFilter = document.getElementById('filter-price');
    this.colorFilter = document.getElementById('filter-color');
    this.occasionFilter = document.getElementById('filter-occasion');
    this.availabilityFilter = document.getElementById('filter-availability');
    this.clearBtn = document.getElementById('clear-filters');
    this.grid = document.getElementById('designs-grid');
    this.noResults = document.getElementById('no-results');
    
    // Check if filter elements exist
    if (!this.priceFilter || !this.grid) {
      console.warn('Filter elements not found on page');
      return;
    }
    
    // Initialize
    this.init();
  }
  
  /**
   * Initialize filters
   */
  init() {
    // Populate filter dropdowns with options from designs
    this.populateFilterOptions();
    
    // Set up event listeners
    this.priceFilter.addEventListener('change', () => this.handleFilterChange('price'));
    this.colorFilter.addEventListener('change', () => this.handleFilterChange('color'));
    this.occasionFilter.addEventListener('change', () => this.handleFilterChange('occasion'));
    this.availabilityFilter.addEventListener('change', () => this.handleFilterChange('availability'));
    
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => this.clearFilters());
    }
    
    // Load filters from URL if present
    this.loadFiltersFromURL();
    
    // Initial render
    this.renderDesigns();
    
    console.log('✅ Design filters initialized');
  }
  
  /**
   * Set designs data and repopulate filters
   * @param {Array} designs - Array of design objects
   */
  setDesigns(designs) {
    this.allDesigns = designs;
    this.filteredDesigns = designs;
    this.populateFilterOptions();
    this.applyFilters();
  }
  
  /**
   * Populate filter dropdowns with unique values from designs
   */
  populateFilterOptions() {
    // Extract unique colors
    const colors = [...new Set(
      this.allDesigns
        .map(d => d.color)
        .filter(Boolean)
    )].sort();
    
    // Clear and populate color filter
    this.colorFilter.innerHTML = '<option value="">All Colors</option>';
    colors.forEach(color => {
      const option = document.createElement('option');
      option.value = color;
      option.textContent = color;
      this.colorFilter.appendChild(option);
    });
    
    // Extract unique occasions
    const occasions = [...new Set(
      this.allDesigns
        .flatMap(d => d.occasion || [])
        .filter(Boolean)
    )].sort();
    
    // Clear and populate occasion filter
    this.occasionFilter.innerHTML = '<option value="">All Occasions</option>';
    occasions.forEach(occasion => {
      const option = document.createElement('option');
      option.value = occasion;
      option.textContent = occasion;
      this.occasionFilter.appendChild(option);
    });
  }
  
  /**
   * Handle filter change event
   * @param {string} filterType - Type of filter that changed
   */
  handleFilterChange(filterType) {
    const filterElement = document.getElementById(`filter-${filterType}`);
    const value = filterElement.value;
    
    this.activeFilters[filterType] = value || null;
    
    // Update URL
    this.updateURL();
    
    // Apply filters
    this.applyFilters();
  }
  
  /**
   * Apply all active filters to designs
   */
  applyFilters() {
    this.filteredDesigns = this.allDesigns.filter(design => {
      // Price filter
      if (this.activeFilters.price) {
        const price = parseFloat(design.price);
        
        if (this.activeFilters.price.includes('+')) {
          // "20000+" format
          const minPrice = parseFloat(this.activeFilters.price.replace('+', ''));
          if (price < minPrice) return false;
        } else {
          // "0-5000" format
          const [min, max] = this.activeFilters.price.split('-').map(Number);
          if (price < min || price > max) return false;
        }
      }
      
      // Color filter
      if (this.activeFilters.color) {
        if (design.color !== this.activeFilters.color) {
          return false;
        }
      }
      
      // Occasion filter
      if (this.activeFilters.occasion) {
        if (!design.occasion || !design.occasion.includes(this.activeFilters.occasion)) {
          return false;
        }
      }
      
      // Availability filter
      if (this.activeFilters.availability !== null) {
        const isAvailable = design.availability === true || design.availability === 'true' || design.availability === 1;
        const filterValue = this.activeFilters.availability === 'true';
        if (isAvailable !== filterValue) {
          return false;
        }
      }
      
      return true;
    });
    
    // Render filtered results
    this.renderDesigns();
    
    // Track filter usage
    if (typeof trackEvent === 'function') {
      trackEvent('filter_applied', {
        filter_type: Object.keys(this.activeFilters).filter(k => this.activeFilters[k]),
        results_count: this.filteredDesigns.length
      });
    }
  }
  
  /**
   * Clear all filters
   */
  clearFilters() {
    // Reset dropdowns
    this.priceFilter.value = '';
    this.colorFilter.value = '';
    this.occasionFilter.value = '';
    this.availabilityFilter.value = '';
    
    // Reset active filters
    this.activeFilters = {
      price: null,
      color: null,
      occasion: null,
      availability: null
    };
    
    // Update URL
    this.updateURL();
    
    // Show all designs
    this.filteredDesigns = this.allDesigns;
    this.renderDesigns();
  }
  
  /**
   * Render filtered designs to the grid
   */
  renderDesigns() {
    if (!this.grid) return;
    
    // Show/hide no results message
    if (this.filteredDesigns.length === 0) {
      this.grid.innerHTML = '';
      if (this.noResults) {
        this.noResults.style.display = 'block';
      }
      return;
    }
    
    if (this.noResults) {
      this.noResults.style.display = 'none';
    }
    
    // Render designs
    this.grid.innerHTML = this.filteredDesigns
      .map(design => this.createDesignCard(design))
      .join('');
    
    // Reinitialize lazy loading for new images
    if (window.lazyLoader) {
      window.lazyLoader.observe();
    }
  }
  
  /**
   * Create HTML for a design card
   * @param {Object} design - Design object
   * @returns {string} HTML string
   */
  createDesignCard(design) {
    const primaryImage = design.designgallery && design.designgallery.nodes[0] 
      ? design.designgallery.nodes[0] 
      : null;
    
    const imageSrc = primaryImage ? primaryImage.sourceUrl : CONFIG.IMAGES.PLACEHOLDER;
    const srcset = primaryImage && primaryImage.mediaDetails 
      ? buildSrcset(primaryImage.mediaDetails) 
      : '';
    
    const availabilityBadge = design.availability 
      ? '<span class="badge badge--success">In Stock</span>' 
      : '<span class="badge badge--danger">Out of Stock</span>';
    
    const shareUrl = CONFIG.getWhatsAppShareURL(design);
    
    return `
      <div class="design-card fade-in">
        <a href="product-detail.html?slug=${design.slug}" class="design-card__link">
          <div class="design-card__image">
            <img
              src="${imageSrc}"
              ${srcset ? `srcset="${srcset}"` : ''}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              alt="${design.designcode || 'Design'}"
              loading="lazy"
            >
          </div>
          <div class="design-card__content">
            <h3 class="design-card__code">${design.designcode || design.title}</h3>
            <p class="design-card__price">$${design.price}.00</p>
            <div class="design-card__actions">
              ${availabilityBadge}
              <a href="${shareUrl}" 
                 class="design-card__share"
                 target="_blank"
                 rel="noopener noreferrer"
                 onclick="event.stopPropagation();"
                 aria-label="Share ${design.designcode || design.title} on WhatsApp">
                <img src="assets/images/whatsapp.svg" alt="Share on WhatsApp" width="24" height="24">
              </a>
            </div>
          </div>
        </a>
      </div>
    `;
  }
  
  /**
   * Update URL with current filter state
   */
  updateURL() {
    const params = new URLSearchParams();
    
    Object.keys(this.activeFilters).forEach(key => {
      if (this.activeFilters[key]) {
        params.set(key, this.activeFilters[key]);
      }
    });
    
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newURL);
  }
  
  /**
   * Load filters from URL parameters
   */
  loadFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Set filter values from URL
    Object.keys(this.activeFilters).forEach(key => {
      const value = params.get(key);
      if (value) {
        this.activeFilters[key] = value;
        const filterElement = document.getElementById(`filter-${key}`);
        if (filterElement) {
          filterElement.value = value;
        }
      }
    });
    
    // Apply filters if any were loaded
    const hasFilters = Object.values(this.activeFilters).some(v => v !== null);
    if (hasFilters) {
      this.applyFilters();
    }
  }
  
  /**
   * Get current filter summary for display
   * @returns {string} Human-readable filter summary
   */
  getFilterSummary() {
    const active = [];
    
    if (this.activeFilters.price) {
      active.push(`Price: ${this.activeFilters.price}`);
    }
    if (this.activeFilters.color) {
      active.push(`Color: ${this.activeFilters.color}`);
    }
    if (this.activeFilters.occasion) {
      active.push(`Occasion: ${this.activeFilters.occasion}`);
    }
    if (this.activeFilters.availability !== null) {
      active.push(`Availability: ${this.activeFilters.availability === 'true' ? 'In Stock' : 'Out of Stock'}`);
    }
    
    return active.length > 0 
      ? `Filtered by: ${active.join(', ')}` 
      : 'No active filters';
  }
}

/**
 * Initialize filters when needed
 * Note: This is called from page-specific JS files
 */
function initFilters(designs) {
  if (!designs || designs.length === 0) {
    console.warn('No designs provided to initialize filters');
    return null;
  }
  
  const filters = new DesignFilters(designs);
  console.log('✅ Filters initialized with', designs.length, 'designs');
  return filters;
}