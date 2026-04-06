/**
 * AG Fashion Hub - Main JavaScript
 * Page-specific initialization functions
 * 
 * This file contains initialization functions for each page type:
 * - Home page
 * - Collections listing
 * - Single collection with filters
 * - Product detail
 * - Blog listing
 * - Single blog post
 * - Static pages
 * 
 * @requires config.js, graphql-client.js
 * @version 1.0.0
 */

/* ==================== UTILITY FUNCTIONS ==================== */

/**
 * Show loading state in a container
 * @param {string} containerId - Container element ID
 * @param {string} message - Loading message
 */
function showLoading(containerId, message = 'Loading...') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = `
    <div class="loading-state" style="text-align: center; padding: 3rem;">
      <div class="spinner" style="margin: 0 auto 1rem;"></div>
      <p style="color: var(--color-text);">${message}</p>
    </div>
  `;
}

/**
 * Show error message in a container
 * @param {string} containerId - Container element ID
 * @param {string} message - Error message
 */
function showError(containerId, message) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = `
    <div class="error-state" style="text-align: center; padding: 3rem; background: #FFF3F3; border-radius: 8px;">
      <p style="color: #F44336; font-size: 1.125rem; margin-bottom: 1rem;">${message}</p>
      <button class="btn btn--secondary" onclick="window.location.reload()">
        Try Again
      </button>
    </div>
  `;
}

/**
 * Get URL parameter value
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null
 */
function getURLParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Update page meta tags
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {string} image - OG image URL
 */
function updateMetaTags(title, description, image = null) {
  // Update title
  document.title = `${title} | ${CONFIG.SITE.NAME}`;
  
  // Update meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = description || CONFIG.SEO.DEFAULT_DESCRIPTION;
  
  // Update OG tags
  updateOGTag('og:title', title);
  updateOGTag('og:description', description || CONFIG.SEO.DEFAULT_DESCRIPTION);
  if (image) {
    updateOGTag('og:image', image);
  }
}

/**
 * Update or create an Open Graph meta tag
 * @param {string} property - OG property name
 * @param {string} content - Content value
 */
function updateOGTag(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.content = content;
}


/* ==================== HOME PAGE ==================== */

/**
 * Initialize home page
 * - Carousel with collections
 * - Featured designs (New Arrivals)
 * - Blog highlights
 */
async function initHomePage() {
  console.log('🏠 Initializing home page...');
  
  try {
    // Load collections for carousel
    await loadCollectionsCarousel();
    
    // Load featured designs
    await loadFeaturedDesigns();
    
    // Load blog highlights
    await loadBlogHighlights();
    
    // Track page view
    trackPageView('Home', '/');
    
    console.log('✅ Home page initialized');
    
  } catch (error) {
    console.error('Error initializing home page:', error);
    CONFIG.logError('Home Page Init', error);
  }
}


/**
 * Load collections as flip boxes (replaces carousel)
 */
async function loadCollectionsCarousel() {
  // NEW: Target flip grid instead of carousel
  const flipGrid = document.getElementById('collections-flip-grid');
  
  // FALLBACK: If flip grid doesn't exist, try carousel (backward compatibility)
  const carouselTrack = document.querySelector('#collections-carousel .carousel__track');
  const container = flipGrid || carouselTrack;
  
  if (!container) {
    console.warn('Neither flip grid nor carousel container found');
    return;
  }
  
  try {
    // Show loading state
    container.innerHTML = '<p style="text-align: center; padding: 2rem;">Loading collections...</p>';
    
    // Fetch collections from WordPress
    const collections = await getAllCollections();
    
    if (!collections || collections.length === 0) {
      container.innerHTML = '<p style="text-align: center; padding: 2rem;">No collections available.</p>';
      return;
    }
    
    // ========== NEW: RENDER FLIP BOXES ==========
    if (flipGrid) {
      flipGrid.innerHTML = collections.map(collection => {
        // Get collection data
        const collectionName = collection.collectionname || collection.title;
        const collectionSlug = collection.slug;
        const description = stripHTML(collection.description || '').substring(0, 120);
        const imageUrl = collection.heroimage.node?.sourceUrl || 'assets/images/placeholder.jpg';
        
        // Count designs in this collection (if available)
        const designCount = collection.designs?.length || 0;
        const designText = designCount === 1 ? '1 Design' : `${designCount} Designs`;
        
        return `
          <a href="collection-single.html?slug=${collectionSlug}" class="flip-card" data-collection="${collectionSlug}">
            <div class="flip-card-inner">
              
              <!-- Front Side -->
              <div class="flip-card-front" style="background-image: url('${imageUrl}');">
                <h3 class="flip-card-title">${collectionName}</h3>
              </div>
              
              <!-- Back Side -->
              <div class="flip-card-back">
                <h3>${collectionName}</h3>
                <p class="flip-card-description">${description}${description.length >= 120 ? '...' : ''}</p>
                ${designCount > 0 ? `<p class="flip-card-count">${designText}</p>` : ''}
                <span class="flip-card-button">
                  View Collection
                </span>
              </div>
              
            </div>
          </a>
        `;
      }).join('');
      
      // Add tap/click functionality for mobile
      initFlipCardInteraction();
      
      console.log('✅ Flip boxes rendered:', collections.length, 'collections');
    }
    
  
    
  } catch (error) {
    console.error('Error loading collections:', error);
    container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #F44336;">Unable to load collections. Please try again later.</p>';
  }
}

/**
 * Initialize collection card slide-up reveal interaction
 */
function initFlipCardInteraction() {
  const flipCards = document.querySelectorAll('.flip-card');
  
  flipCards.forEach(card => {
    // Handle mobile tap/click
    card.addEventListener('click', function(e) {
      const isMobile = window.innerWidth < 1024;
      
      if (isMobile) {
        // Toggle reveal on mobile
        if (!this.classList.contains('revealed')) {
          e.preventDefault();
          // Close other cards first
          document.querySelectorAll('.flip-card.revealed').forEach(c => {
            if (c !== this) {
              c.classList.remove('revealed');
            }
          });
          this.classList.add('revealed');
        } else {
          // If already revealed, allow navigation
          this.classList.remove('revealed');
          // Allow default link behavior on second tap
        }
      }
      // On desktop, hover handles it, so allow normal link behavior
    });
  });
  
  // Close cards when clicking outside (mobile only) - single listener for all cards
  if (window.innerWidth < 1024) {
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.flip-card')) {
        document.querySelectorAll('.flip-card.revealed').forEach(card => {
          card.classList.remove('revealed');
        });
      }
    });
  }
  
  console.log('✅ Slide-up card interaction initialized');
}

/**
 * Load featured designs (New Arrivals)
 */
async function loadFeaturedDesigns() {
  const grid = document.getElementById('new-arrivals-grid');
  if (!grid) return;
  
  try {
    showLoading('new-arrivals-grid', 'Loading new arrivals...');
    
    const allDesigns = await getAllDesigns(50); // Get 50 designs to filter from
    
    if (!allDesigns || allDesigns.length === 0) {
      grid.innerHTML = '<p>No designs available.</p>';
      return;
    }
      // PRIMARY: Try to get designs marked for New Arrivals
    let featuredDesigns = allDesigns.filter(design => 
      design.showinnewarrival === true || 
      design.showinnewarrival === 'true' || 
      design.showinnewarrival === 1
    );
    
    // FALLBACK: If no designs are marked, use the 8 most recent
    if (featuredDesigns.length === 0) {
      console.log('ℹ️ No designs marked for New Arrivals, showing latest 8');
      featuredDesigns = allDesigns.slice(0, 8);
    } else {
      console.log('✅ Found', featuredDesigns.length, 'designs marked for New Arrivals');
      // Limit to 8 even if more are marked
      featuredDesigns = featuredDesigns.slice(0, 8);
    }

    // Render design cards
   // ... inside loadFeaturedDesigns ...
grid.innerHTML = featuredDesigns.map(design => {
  const primaryImage = design.designgallery && design.designgallery.nodes[0] // <-- FIX #1: Use snake_case and access "nodes"
    ? design.designgallery.nodes[0] 
    : null;
  // ...
  

const availabilityBadge = design.availability 
      ? '<span class="badge badge--success">In Stock</span>' 
      : '<span class="badge badge--danger">Out of Stock</span>';

  const shareUrl = CONFIG.getWhatsAppShareURL(design);

  return `
    <div class="design-card fade-in">
      <a href="product-detail.html?slug=${design.slug}" class="design-card__link">
        <div class="design-card__image">
          ${getResponsiveImage(
            primaryImage,
            design.designcode || design.title,
            '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
            ''
          )}
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
}).join('');
    
  } catch (error) {
    console.error('Error loading featured designs:', error);
    grid.innerHTML = '<p>Unable to load designs.</p>';
  }
}

/**
 * Load blog highlights
 */
async function loadBlogHighlights() {
  const grid = document.getElementById('blog-highlights-grid');
  if (!grid) return;
  
  try {
    showLoading('blog-highlights-grid', 'Loading blog posts...');
    
    const result = await getBlogPosts(3); // Get 3 latest posts
    const posts = result.posts;
    
    if (!posts || posts.length === 0) {
      grid.innerHTML = '<p>No blog posts available.</p>';
      return;
    }
    
    // Render blog cards
    grid.innerHTML = posts.map(post => {
      const featuredImage = post.featuredImage?.node;
      const excerpt = stripHTML(post.excerpt || '').substring(0, 150);
      
      return `
        <a href="blog-single.html?slug=${post.slug}" class="blog-card">
          <div class="blog-card__image">
            ${getResponsiveImage(
              featuredImage,
              post.title,
              '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
              ''
            )}
          </div>
          <div class="blog-card__content">
            <div class="blog-card__meta">
              <span class="blog-card__date">${formatDate(post.date, 'short')}</span>
            </div>
            <h3 class="blog-card__title">${post.title}</h3>
            <p class="blog-card__excerpt">${excerpt}...</p>
          </div>
        </a>
      `;
    }).join('');
    
  } catch (error) {
    console.error('Error loading blog highlights:', error);
    grid.innerHTML = '<p>Unable to load blog posts.</p>';
  }
}


/* ==================== COLLECTIONS PAGE ==================== */

/**
 * Initialize collections listing page
 */
async function initCollectionsPage() {
  console.log('📂 Initializing collections page...');
  
  const grid = document.getElementById('collections-grid');
  if (!grid) {
    console.warn('Collections grid not found');
    return;
  }
  
  try {
    showLoading('collections-grid', 'Loading collections...');
    
    const collections = await getAllCollections();
    
    if (!collections || collections.length === 0) {
      showError('collections-grid', 'No collections available at the moment.');
      return;
    }
    
    // Render collection cards
    grid.innerHTML = collections.map(collection => `
      <a href="collection-single.html?slug=${collection.slug}" class="collection-card fade-in">
        <div class="collection-card__image">
          ${getResponsiveImage(
            collection.heroimage.node,
            collection.collectionname || collection.title,
            '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
            ''
          )}
        </div>
        <div class="collection-card__content">
          <h3 class="collection-card__title">${collection.collectionname || collection.title}</h3>
          <p class="collection-card__description">${stripHTML(collection.description || '').substring(0, 120)}...</p>
        </div>
      </a>
    `).join('');
    
    // Track page view
    trackPageView('Collections', '/collections');
    
    console.log('✅ Collections page initialized with', collections.length, 'collections');
    
  } catch (error) {
    console.error('Error initializing collections page:', error);
    showError('collections-grid', CONFIG.ERRORS.GENERIC);
    CONFIG.logError('Collections Page Init', error);
  }
}


/* ==================== SINGLE COLLECTION PAGE ==================== */

/**
 * Initialize single collection page with filters
 */
async function initCollectionSinglePage() {
  console.log('👗 Initializing single collection page...');
  
  // Get collection slug from URL
  const slug = getURLParam('slug');
  
  if (!slug) {
    showError('designs-grid', 'Collection not specified. Please select a collection.');
    return;
  }
  
  try {
    // Show loading
    showLoading('designs-grid', 'Loading collection...');
    
    // Fetch collection data
    const collection = await getCollectionBySlug(slug);
    
    if (!collection) {
      showError('designs-grid', 'Collection not found.');
      return;
    }
    
    // Update page title and meta
    const collectionTitle = collection.collectionname || collection.title;
    updateMetaTags(
      collectionTitle,
      collection.metadescription || stripHTML(collection.description || '').substring(0, 160),
      collection.heroimage.node?.sourceUrl
    );
    
    // Update page content
    const titleElement = document.getElementById('collection-title');
    const descElement = document.getElementById('collection-description');
    
    if (titleElement) {
      titleElement.textContent = collectionTitle;
    }
    
    if (descElement && collection.description) {
      descElement.innerHTML = collection.description;
    }
    
    // Update breadcrumbs
    updateBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Collections', url: '/collections.html' },
      { name: collectionTitle, url: '' }
    ]);
    
    // Fetch designs for this collection
    const designs = await getDesignsByCollection(slug);
    
    if (!designs || designs.length === 0) {
      showError('designs-grid', 'No designs available in this collection yet.');
      return;
    }
    
    // Initialize filters with designs
    if (typeof initFilters === 'function') {
      window.designFilters = initFilters(designs);
    } else {
      // Fallback: render without filters
      renderDesignsGrid(designs);
    }
    
    // Track collection view
    trackCollectionView(collection);
    
    console.log('✅ Collection page initialized:', collectionTitle);
    
  } catch (error) {
    console.error('Error initializing collection page:', error);
    showError('designs-grid', CONFIG.ERRORS.GENERIC);
    CONFIG.logError('Collection Single Page Init', error);
  }
}

/**
 * Render designs to grid (fallback if filters not available)
 * @param {Array} designs - Array of design objects
 */
function renderDesignsGrid(designs) {
  const grid = document.getElementById('designs-grid');
  if (!grid) return;
  
  grid.innerHTML = designs.map(design => {
    const primaryImage = design.designgallery && design.designgallery.nodes[0] 
      ? design.designgallery.nodes[0] 
      : null;
    
    const availabilityBadge = design.availability 
      ? '<span class="badge badge--success">In Stock</span>' 
      : '<span class="badge badge--danger">Out of Stock</span>';
    
    const shareUrl = CONFIG.getWhatsAppShareURL(design);
    
    return `
      <div class="design-card fade-in">
        <a href="product-detail.html?slug=${design.slug}" class="design-card__link">
          <div class="design-card__image">
            ${getResponsiveImage(
              primaryImage,
              design.designcode || design.title,
              '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
              ''
            )}
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
  }).join('');
}


/* ==================== PRODUCT DETAIL PAGE ==================== */

/**
 * Initialize product detail page
 */
async function initProductDetailPage() {
  console.log('🛍️ Initializing product detail page...');
  
  // Get design slug from URL
  const slug = getURLParam('slug');
  
  if (!slug) {
    showError('product-title', 'Product not specified.');
    return;
  }
  
  try {
    // Fetch design data
    const design = await getDesignBySlug(slug);
    
    if (!design) {
      showError('product-title', 'Product not found.');
      return;
    }
    
    // Update page meta
    updateMetaTags(
      design.designcode || design.title,
      stripHTML(design.description || '').substring(0, 160),
      design.designgallery && design.designgallery.nodes[0] ? design.designgallery.nodes[0].sourceUrl : null
    );
    
    // Update breadcrumbs
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Collections', url: '/collections.html' }
    ];
    
    if (design.linkedcollection && design.linkedcollection.node) {
      breadcrumbs.push({
        name: design.linkedcollection.node.collectionname,
        url: `/collection-single.html?slug=${design.linkedcollection.node.slug}`
      });
    }
    
    breadcrumbs.push({ name: design.designcode || design.title, url: '' });
    updateBreadcrumbs(breadcrumbs);
    
    // Populate product details
    populateProductDetails(design);
    
    // Initialize gallery and lightbox
    initializeProductGallery(design);
    
    // Load related designs
    if (design.linkedcollection) {
      loadRelatedDesigns(design.linkedcollection.node.slug, design.slug);
    }
    
    // Track product view
    trackDesignView(design);
    
    console.log('✅ Product detail page initialized:', design.designcode);
    
  } catch (error) {
    console.error('Error initializing product detail page:', error);
    showError('product-title', CONFIG.ERRORS.GENERIC);
    CONFIG.logError('Product Detail Page Init', error);
  }
}

/**
 * Populate product details
 * @param {Object} design - Design object
 */
function populateProductDetails(design) {
  // Title
  const titleEl = document.getElementById('product-title');
  if (titleEl) {
    titleEl.textContent = design.designcode || design.title;
  }
  
  // Price
  const priceEl = document.getElementById('product-price');
  if (priceEl) {
    priceEl.textContent = `$${design.price}.00`;
  }
  
  // Design code
  const codeEl = document.getElementById('design-code');
  if (codeEl) {
    codeEl.textContent = design.designcode || design.title;
  }
  
  // Color
  const colorEl = document.getElementById('product-color');
  if (colorEl) {
    colorEl.textContent = design.color || 'N/A';
  }
  
  // Fabric
  const fabricEl = document.getElementById('product-fabric');
  if (fabricEl) {
    fabricEl.textContent = design.fabric || 'N/A';
  }
  
  // Availability
  const availabilityEl = document.getElementById('product-availability');
  if (availabilityEl) {
    if (design.availability) {
      availabilityEl.innerHTML = '<span class="badge badge--success">In Stock</span>';
    } else {
      availabilityEl.innerHTML = '<span class="badge badge--danger">Out of Stock</span>';
    }
  }
  
  // Sizes
  const sizeBadgesEl = document.getElementById('size-badges');
  if (sizeBadgesEl && design.size) {
    const sizes = Array.isArray(design.size) ? design.size : [design.size];
    sizeBadgesEl.innerHTML = sizes.map(size => 
      `<span class="size-badge">${size}</span>`
    ).join('');
  }
  
  // Description
  const descEl = document.getElementById('product-description');
  if (descEl && design.description) {
    descEl.innerHTML = design.description;
  }
  
  // Care Instructions
  const careEl = document.getElementById('care-instructions');
  const careContainer = document.getElementById('product-care');
  if (careEl) {
    if (design.careinstructions) {
      careEl.innerHTML = design.careinstructions;
      // Show the care instructions section if it has content
      if (careContainer) {
        careContainer.style.display = 'block';
      }
    } else {
      // Hide the care instructions section if no data
      if (careContainer) {
        careContainer.style.display = 'none';
      }
    }
  }
  
  // Update WhatsApp link with design code
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"][data-location="product_detail"]');
  whatsappLinks.forEach(link => {
    link.href = CONFIG.getWhatsAppURL(null, design.designcode);
    link.setAttribute('data-design-code', design.designcode);
  });
  
  // Update WhatsApp share button
  const shareBtn = document.getElementById('whatsapp-share-btn');
  if (shareBtn) {
    shareBtn.href = CONFIG.getWhatsAppShareURL(design);
    shareBtn.setAttribute('data-design-code', design.designcode);
  }
}

/**
 * Initialize product gallery
 * @param {Object} design - Design object
 */
function initializeProductGallery(design) {
  const mainImage = document.getElementById('main-image');
  const thumbnailsContainer = document.getElementById('thumbnails');
  const zoomBtn = document.querySelector('.gallery__zoom');
  
  if (!design.designgallery || design.designgallery.length === 0) {
    if (mainImage) {
      mainImage.src = CONFIG.IMAGES.PLACEHOLDER;
    }
    return;
  }
  
  const images = design.designgallery.nodes;
  
  // Set main image
  if (mainImage) {
    mainImage.src = images[0].sourceUrl;
    mainImage.alt = design.designcode || design.title;
    mainImage.setAttribute('data-index', '0');
  }
  
  // Render thumbnails
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = images.map((img, index) => `
      <img
        src="${img.sourceUrl}"
        alt="${design.designcode} - Image ${index + 1}"
        class="${index === 0 ? 'active' : ''}"
        data-index="${index}"
        onclick="switchMainImage(${index})"
      >
    `).join('');
  }
  
  // Set up lightbox
  if (zoomBtn && window.lightbox) {
    zoomBtn.addEventListener('click', () => {
      const imageUrls = images.map(img => img.sourceUrl);
      const currentIndex = parseInt(mainImage.getAttribute('data-index')) || 0;
      window.lightbox.open(imageUrls, currentIndex);
    });
  }
  
  // Make main image clickable to open lightbox
  if (mainImage && window.lightbox) {
    mainImage.style.cursor = 'zoom-in';
    mainImage.addEventListener('click', () => {
      const imageUrls = images.map(img => img.sourceUrl);
      const currentIndex = parseInt(mainImage.getAttribute('data-index')) || 0;
      window.lightbox.open(imageUrls, currentIndex);
    });
  }
}

/**
 * Switch main product image
 * @param {number} index - Image index
 */
function switchMainImage(index) {
  const mainImage = document.getElementById('main-image');
  const thumbnails = document.querySelectorAll('#thumbnails img');
  
  if (!mainImage) return;
  
  // Update main image
  const selectedThumbnail = thumbnails[index];
  if (selectedThumbnail) {
    mainImage.src = selectedThumbnail.src;
    mainImage.setAttribute('data-index', index);
  }
  
  // Update active thumbnail
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  if (selectedThumbnail) {
    selectedThumbnail.classList.add('active');
  }
}

/**
 * Load related designs
 * @param {string} collectionSlug - Collection slug
 * @param {string} currentSlug - Current design slug (to exclude)
 */
async function loadRelatedDesigns(collectionSlug, currentSlug) {
  const grid = document.getElementById('related-designs-grid');
  if (!grid) return;
  
  try {
    const designs = await getDesignsByCollection(collectionSlug);
    
    // Filter out current design and limit to 4
    const relatedDesigns = designs
      .filter(d => d.slug !== currentSlug)
      .slice(0, CONFIG.PAGINATION.RELATED_DESIGNS_COUNT);
    
    if (relatedDesigns.length === 0) {
      grid.parentElement.style.display = 'none';
      return;
    }
    
    grid.innerHTML = relatedDesigns.map(design => {
      const primaryImage = design.designgallery && design.designgallery.nodes[0] 
        ? design.designgallery.nodes[0] 
        : null;
      
      const shareUrl = CONFIG.getWhatsAppShareURL(design);
      
      return `
        <div class="design-card">
          <a href="product-detail.html?slug=${design.slug}" class="design-card__link">
            <div class="design-card__image">
              ${getResponsiveImage(
                primaryImage,
                design.designcode || design.title,
                '(max-width: 768px) 50vw, 25vw',
                ''
              )}
            </div>
            <div class="design-card__content">
              <h3 class="design-card__code">${design.designcode || design.title}</h3>
              <p class="design-card__price">$${design.price}.00</p>
              <div class="design-card__actions">
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
    }).join('');
    
  } catch (error) {
    console.error('Error loading related designs:', error);
    if (grid.parentElement) {
      grid.parentElement.style.display = 'none';
    }
  }
}


/* ==================== BLOG PAGES ==================== */

/**
 * Initialize blog listing page
 */
async function initBlogsPage() {
  console.log('📝 Initializing blog page...');
  
  const grid = document.getElementById('blog-grid');
  if (!grid) {
    console.warn('Blog grid not found');
    return;
  }
  
  try {
    showLoading('blog-grid', 'Loading blog posts...');
    
    // Get category filter from URL if present
    const categoryId = getURLParam('category');
    
    // Fetch blog posts
    const result = await getBlogPosts(
      CONFIG.PAGINATION.BLOG_POSTS_PER_PAGE,
      null,
      categoryId ? parseInt(categoryId) : null
    );
    
    const posts = result.posts;
    
    if (!posts || posts.length === 0) {
      showError('blog-grid', 'No blog posts available at the moment.');
      return;
    }
    
    // Render blog cards
    renderBlogCards(posts);
    
    // Load categories for sidebar
    await loadBlogCategories();
    
    // Set up pagination if needed
    if (result.pageInfo.hasNextPage) {
      setupPagination(result.pageInfo);
    }
    
    // Track page view
    trackPageView('Blog', '/blog');
    
    console.log('✅ Blog page initialized with', posts.length, 'posts');
    
  } catch (error) {
    console.error('Error initializing blog page:', error);
    showError('blog-grid', CONFIG.ERRORS.GENERIC);
    CONFIG.logError('Blog Page Init', error);
  }
}

/**
 * Render blog cards
 * @param {Array} posts - Array of blog post objects
 */
function renderBlogCards(posts) {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;
  
  grid.innerHTML = posts.map(post => {
    const featuredImage = post.featuredImage?.node;
    const excerpt = stripHTML(post.excerpt || '').substring(0, 150);
    
    return `
      <a href="blog-single.html?slug=${post.slug}" class="blog-card fade-in">
        <div class="blog-card__image">
          ${getResponsiveImage(
            featuredImage,
            post.title,
            '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
            ''
          )}
        </div>
        <div class="blog-card__content">
          <div class="blog-card__meta">
            <span class="blog-card__date">${formatDate(post.date, 'short')}</span>
          </div>
          <h3 class="blog-card__title">${post.title}</h3>
          <p class="blog-card__excerpt">${excerpt}...</p>
        </div>
      </a>
    `;
  }).join('');
}

/**
 * Load blog categories for sidebar
 */
async function loadBlogCategories() {
  const categoryList = document.getElementById('category-list');
  if (!categoryList) return;
  
  try {
    const categories = await getBlogCategories();
    
    if (!categories || categories.length === 0) return;
    
    categoryList.innerHTML = categories.map(category => `
      <li>
        <a href="blogs.html?category=${category.id}">
          ${category.name}
          <span class="category-count">(${category.count})</span>
        </a>
      </li>
    `).join('');
    
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

/**
 * Set up pagination
 * @param {Object} pageInfo - Page info from GraphQL
 */
function setupPagination(pageInfo) {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;
  
  // Simple "Load More" button for now
  if (pageInfo.hasNextPage) {
    paginationContainer.innerHTML = `
      <button class="btn btn--secondary" onclick="loadMorePosts('${pageInfo.endCursor}')">
        Load More Posts
      </button>
    `;
  }
}

/**
 * Load more blog posts
 * @param {string} cursor - Pagination cursor
 */
async function loadMorePosts(cursor) {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;
  
  try {
    const categoryId = getURLParam('category');
    const result = await getBlogPosts(
      CONFIG.PAGINATION.BLOG_POSTS_PER_PAGE,
      cursor,
      categoryId ? parseInt(categoryId) : null
    );
    
    const posts = result.posts;
    
    // Append new posts
    const newCardsHTML = posts.map(post => {
      const featuredImage = post.featuredImage?.node;
      const excerpt = stripHTML(post.excerpt || '').substring(0, 150);
      
      return `
        <a href="blog-single.html?slug=${post.slug}" class="blog-card fade-in">
          <div class="blog-card__image">
            ${getResponsiveImage(
              featuredImage,
              post.title,
              '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
              ''
            )}
          </div>
          <div class="blog-card__content">
            <div class="blog-card__meta">
              <span class="blog-card__date">${formatDate(post.date, 'short')}</span>
            </div>
            <h3 class="blog-card__title">${post.title}</h3>
            <p class="blog-card__excerpt">${excerpt}...</p>
          </div>
        </a>
      `;
    }).join('');
    
    grid.insertAdjacentHTML('beforeend', newCardsHTML);
    
    // Update pagination
    if (result.pageInfo.hasNextPage) {
      setupPagination(result.pageInfo);
    } else {
      const paginationContainer = document.getElementById('pagination');
      if (paginationContainer) {
        paginationContainer.innerHTML = '';
      }
    }
    
  } catch (error) {
    console.error('Error loading more posts:', error);
  }
}

/**
 * Initialize single blog post page
 */
async function initBlogSinglePage() {
  console.log('📄 Initializing single blog post page...');
  
  // Get post slug from URL
  const slug = getURLParam('slug');
  
  if (!slug) {
    showError('article-title', 'Blog post not specified.');
    return;
  }
  
  try {
    // Fetch blog post
    const post = await getBlogPostBySlug(slug);
    
    if (!post) {
      showError('article-title', 'Blog post not found.');
      return;
    }
    
    // Update page meta
    updateMetaTags(
      post.title,
      stripHTML(post.excerpt || '').substring(0, 160),
      post.featuredImage?.node.sourceUrl
    );
    
    // Update breadcrumbs
    updateBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blogs.html' },
      { name: post.title, url: '' }
    ]);
    
    // Populate post content
    populateBlogPost(post);
    
    // Track page view
    trackPageView(post.title, `/blog/${post.slug}`);
    
    console.log('✅ Blog post page initialized:', post.title);
    
  } catch (error) {
    console.error('Error initializing blog post page:', error);
    showError('article-title', CONFIG.ERRORS.GENERIC);
    CONFIG.logError('Blog Single Page Init', error);
  }
}

/**
 * Populate blog post content
 * @param {Object} post - Blog post object
 */
function populateBlogPost(post) {
  // Featured image
  const imageEl = document.querySelector('#featured-image');
  if (imageEl && post.featuredImage?.node) {
    imageEl.src = post.featuredImage.node.sourceUrl;
    imageEl.alt = post.title;
  }
  
  // Date
  const dateEl = document.getElementById('article-date');
  if (dateEl) {
    dateEl.textContent = formatDate(post.date, 'long');
    dateEl.setAttribute('datetime', post.date);
  }
  
  // Categories
  const categoriesEl = document.getElementById('article-categories');
  if (categoriesEl && post.categories?.nodes) {
    categoriesEl.innerHTML = post.categories.nodes.map(cat => 
      `<a href="blogs.html?category=${cat.id}">${cat.name}</a>`
    ).join('');
  }
  
  // Title
  const titleEl = document.getElementById('article-title');
  if (titleEl) {
    titleEl.textContent = post.title;
  }
  
  // Content
  const contentEl = document.getElementById('article-content');
  if (contentEl && post.content) {
    contentEl.innerHTML = post.content;
  }
  
  // Tags
  const tagsEl = document.getElementById('article-tags');
  if (tagsEl && post.tags?.nodes && post.tags.nodes.length > 0) {
    tagsEl.innerHTML = '<strong>Tags:</strong> ' + post.tags.nodes.map(tag => 
      `<a href="blogs.html?tag=${tag.slug}">${tag.name}</a>`
    ).join(', ');
  }
  
  // Social share links
  setupSocialShare(post);
}

/**
 * Set up social share buttons
 * @param {Object} post - Blog post object
 */
function setupSocialShare(post) {
  const currentURL = window.location.href;
  const shareText = encodeURIComponent(post.title);
  
  // WhatsApp share
  const whatsappBtn = document.getElementById('share-whatsapp');
  if (whatsappBtn) {
    whatsappBtn.href = `https://wa.me/?text=${shareText}%20${encodeURIComponent(currentURL)}`;
  }
  
  // Facebook share
  const facebookBtn = document.getElementById('share-facebook');
  if (facebookBtn) {
    facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`;
  }
}


/* ==================== STATIC PAGES ==================== */

/**
 * Initialize static page (Privacy Policy, Terms & Conditions)
 * @param {string} pageSlug - Page slug
 */
async function initStaticPage(pageSlug) {
  console.log('📋 Initializing static page:', pageSlug);
  
  const contentContainer = document.querySelector('.static-page .container');
  if (!contentContainer) {
    console.warn('Static page container not found');
    return;
  }
  
  try {
    const page = await getPageBySlug(pageSlug);
    
    if (!page) {
      contentContainer.innerHTML = '<p>Page not found.</p>';
      return;
    }
    
    // Update page title
    updateMetaTags(page.title, '');
    
    // Update content
    contentContainer.innerHTML = `
      <h1>${page.title}</h1>
      ${page.content}
    `;
    
    // Track page view
    trackPageView(page.title, `/${pageSlug}`);
    
    console.log('✅ Static page initialized:', page.title);
    
  } catch (error) {
    console.error('Error initializing static page:', error);
    contentContainer.innerHTML = '<p>Unable to load page content.</p>';
    CONFIG.logError('Static Page Init', error);
  }
}


/* ==================== BREADCRUMBS ==================== */

/**
 * Update breadcrumbs navigation
 * @param {Array} breadcrumbs - Array of {name, url} objects
 */
function updateBreadcrumbs(breadcrumbs) {
  const breadcrumbList = document.getElementById('breadcrumb-list');
  if (!breadcrumbList) return;
  
  breadcrumbList.innerHTML = breadcrumbs.map((crumb, index) => `
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      ${crumb.url ? 
        `<a itemprop="item" href="${crumb.url}"><span itemprop="name">${crumb.name}</span></a>` :
        `<span itemprop="name">${crumb.name}</span>`
      }
      <meta itemprop="position" content="${index + 1}" />
    </li>
  `).join('');
}


/* ==================== EXPORTS ==================== */

// Make functions available globally
window.initHomePage = initHomePage;
window.initCollectionsPage = initCollectionsPage;
window.initCollectionSinglePage = initCollectionSinglePage;
window.initProductDetailPage = initProductDetailPage;
window.initBlogsPage = initBlogsPage;
window.initBlogSinglePage = initBlogSinglePage;
window.initStaticPage = initStaticPage;
window.switchMainImage = switchMainImage;
window.loadMorePosts = loadMorePosts;

console.log('✅ Main.js loaded - page initialization functions ready');
console.log('✅ Main.js loaded - page initialization functions ready');