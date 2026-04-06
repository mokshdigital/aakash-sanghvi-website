/**
 * AG Fashion Hub - GraphQL Client
 * Handles all communication with WordPress GraphQL API
 * 
 * This client provides functions to:
 * - Fetch collections and designs
 * - Fetch blog posts and pages
 * - Handle errors and retries
 * - Build responsive images
 * 
 * @requires config.js
 * @version 1.0.0
 */

/**
 * GraphQL Client Class
 * Manages all GraphQL queries to WordPress
 */
class GraphQLClient {
  /**
   * Initialize the GraphQL client
   * @param {string} endpoint - GraphQL API endpoint URL
   */
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.cache = new Map(); // Simple in-memory cache
  }
  
  /**
   * Execute a GraphQL query
   * @param {string} query - GraphQL query string
   * @param {Object} variables - Query variables (optional)
   * @param {boolean} useCache - Whether to use cached results (default: false)
   * @returns {Promise<Object>} Query result data
   * @throws {Error} If query fails
   */
  async query(query, variables = {}, useCache = false) {
    // ============================================================
    // PORTFOLIO DEMO MODE: Return mock data instead of fetching
    // from the WordPress GraphQL endpoint.
    // ============================================================
    console.log('📦 [Demo Mode] Resolving query from mock data...');

    const q = query.toLowerCase();

    // --- Collections ---
    if (q.includes('getallcollections') || (q.includes('dresscollections') && !q.includes('dresscollection('))) {
      return { dresscollections: { nodes: MOCK_DATA.collections } };
    }

    if (q.includes('getcollectionbyslug') || q.includes('dresscollection(')) {
      const col = MOCK_DATA.collections.find(c => c.slug === variables.slug);
      return { dresscollection: col || null };
    }

    // --- Designs ---
    if (q.includes('getdesignbyslug') || q.includes('dressdesign(')) {
      const des = MOCK_DATA.designs.find(d => d.slug === variables.slug);
      return { dressdesign: des || null };
    }

    if (q.includes('getalldesigns') || q.includes('getdesignsbycollection') || q.includes('dressdesigns')) {
      const limit = variables.first || 100;
      return { dressdesigns: { nodes: MOCK_DATA.designs.slice(0, limit) } };
    }

    // --- Blog Posts ---
    if (q.includes('getblogpostbyslug') || q.includes('post(')) {
      const post = MOCK_DATA.blogPosts.find(p => p.slug === variables.slug);
      return { post: post || null };
    }

    if (q.includes('getblogposts') || q.includes('posts(')) {
      const first = variables.first || 9;
      let posts = MOCK_DATA.blogPosts;
      if (variables.categoryId) {
        posts = posts.filter(p =>
          p.categories.nodes.some(c => c.id === variables.categoryId || c.id === String(variables.categoryId))
        );
      }
      return {
        posts: {
          nodes: posts.slice(0, first),
          pageInfo: { hasNextPage: false, endCursor: null }
        }
      };
    }

    // --- Blog Categories ---
    if (q.includes('getblogcategories') || q.includes('categories')) {
      return { categories: { nodes: MOCK_DATA.blogCategories } };
    }

    // --- Announcements ---
    if (q.includes('announcements')) {
      return { announcements: { nodes: MOCK_DATA.announcements } };
    }

    // --- Static Pages ---
    if (q.includes('getpagebyslug') || q.includes('page(')) {
      const slug = variables.slug;
      return { page: MOCK_DATA.pages[slug] || null };
    }

    // Fallback: return empty object so nothing crashes
    console.warn('⚠️ [Demo Mode] Unmatched query, returning empty data');
    return {};
  }
  
  /**
   * Clear the query cache
   */
  clearCache() {
    this.cache.clear();
    console.log('🗑️ Cache cleared');
  }
}

// Initialize the global GraphQL client
const graphQLClient = new GraphQLClient(CONFIG.API.GRAPHQL_ENDPOINT);


/* ==================== COLLECTION QUERIES ==================== */

/**
 * Fetch all dress collections
 * @param {boolean} useCache - Use cached results if available
 * @returns {Promise<Array>} Array of collection objects
 */
async function getAllCollections(useCache = true) {
  const query = `
    query GetAllCollections {
      dresscollections {
        nodes {
          id
          slug
          title
          collectionname
          heroimage {
          node {
            sourceUrl
            altText
            mediaDetails {
              sizes {
                sourceUrl
                width
                height
                name
              }
            }
}

          }
          description
          metatitle
          metadescription
        }
      }
    }
  `;
  
  try {
    const data = await graphQLClient.query(query, {}, useCache);
    return data.dresscollections.nodes;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
}

/**
 * Fetch a single collection by slug
 * @param {string} slug - Collection slug
 * @returns {Promise<Object>} Collection object
 */
async function getCollectionBySlug(slug) {
  const query = `
    query GetCollectionBySlug($slug: ID!) {
      dresscollection(id: $slug, idType: SLUG) {
        id
        slug
        title
        collectionname
        heroimage {
        node{
            sourceUrl
            altText
            mediaDetails {
              sizes {
                sourceUrl
                width
                height
                name
              }
            }
          }
        }
        description
        metatitle
        metadescription
      }
    }
  `;
  
  try {
    const data = await graphQLClient.query(query, { slug });
    
    if (!data.dresscollection) {
      throw new Error(CONFIG.ERRORS.NOT_FOUND);
    }
    
    return data.dresscollection;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
}


/* ==================== DESIGN QUERIES ==================== */

/**
 * Fetch designs by collection slug
 * @param {string} collectionSlug - Collection slug to filter by
 * @returns {Promise<Array>} Array of design objects
 */
async function getDesignsByCollection(collectionSlug) {
  const query = `
    query GetDesignsByCollection($first: Int!) {
      dressdesigns(first: $first) {
        nodes {
          id
          slug
          title
          designcode
          designgallery {
            nodes{
              sourceUrl
              altText
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                  name
                }
              }
            }
          }
          description
          fabric
          color
          price
          size
          linkedcollection {
            node {
              ... on Dresscollection {
                slug
                collectionname
              }
            }
          }
          availability
          occasion
          tag
          careinstructions
        }
      }
    }
  `;
  
  try {
    // Fetch all designs (we'll filter client-side for now)
    const data = await graphQLClient.query(query, { first: 100 });
    
    // Filter by collection slug
    const designs = data.dressdesigns.nodes.filter(design => {
      return design.linkedcollection && design.linkedcollection.node.slug === collectionSlug;
    });
    
    return designs;
  } catch (error) {
    console.error('Error fetching designs:', error);
    throw error;
  }
}

/**
 * Fetch a single design by slug
 * @param {string} slug - Design slug
 * @returns {Promise<Object>} Design object
 */
async function getDesignBySlug(slug) {
  const query = `
    query GetDesignBySlug($slug: ID!) {
      dressdesign(id: $slug, idType: SLUG) {
        id
        slug
        title
        designcode
        designgallery {
            nodes{
              sourceUrl
              altText
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                  name
                }
              }
            }
        }
        description
        fabric
        color
        price
        size
        linkedcollection {
          node {
            ... on Dresscollection {
              slug
              collectionname
            }
          }
        }
        availability
        occasion
        tag
        careinstructions
      }
    }
  `;
  
  try {
    const data = await graphQLClient.query(query, { slug });
    
    if (!data.dressdesign) {
      throw new Error(CONFIG.ERRORS.NOT_FOUND);
    }
    
    return data.dressdesign;
  } catch (error) {
    console.error('Error fetching design:', error);
    throw error;
  }
}

/**
 * Fetch all designs (for homepage "New Arrivals" or similar)
 * @param {number} limit - Maximum number of designs to return
 * @returns {Promise<Array>} Array of design objects
 */
async function getAllDesigns(limit = 8) {
  const query = `
    query GetAllDesigns($first: Int!) {
      dressdesigns(first: $first) {
        nodes {
          id
          slug
          title
          designcode
          designgallery {
            nodes{
              sourceUrl
              altText
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                  name
                }
              }
            }
          }
          price
          availability
          showinnewarrival
          linkedcollection {
          node {
            ... on Dresscollection {
              slug
              collectionname
            }
          }
          }
        }
      }
    }
  `;
  
  try {
    const data = await graphQLClient.query(query, { first: limit });
    return data.dressdesigns.nodes;
  } catch (error) {
    console.error('Error fetching designs:', error);
    throw error;
  }
}


/* ==================== BLOG QUERIES ==================== */

/**
 * Fetch blog posts with pagination
 * @param {number} first - Number of posts to fetch
 * @param {string} after - Cursor for pagination (optional)
 * @param {number} categoryId - Filter by category ID (optional)
 * @returns {Promise<Object>} Object with posts array and pageInfo
 */
async function getBlogPosts(first = CONFIG.PAGINATION.BLOG_POSTS_PER_PAGE, after = null, categoryId = null) {
  const query = `
    query GetBlogPosts($first: Int!, $after: String, $categoryId: Int) {
      posts(first: $first, after: $after, where: { categoryId: $categoryId }) {
        nodes {
          id
          slug
          title
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                  name
                }
              }
            }
          }
          categories {
            nodes {
              name
              slug
              id
            }
          }
          tags {
            nodes {
              name
              slug
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;
  
  try {
    const data = await graphQLClient.query(query, { first, after, categoryId });
    return {
      posts: data.posts.nodes,
      pageInfo: data.posts.pageInfo
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

/**
 * Fetch a single blog post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object>} Post object
 */
async function getBlogPostBySlug(slug) {
  const query = `
    query GetBlogPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        slug
        title
        content
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              sizes {
                sourceUrl
                width
                height
                name
              }
            }
          }
        }
        categories {
          nodes {
            name
            slug
            id
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
  `;
  
  try {
    const data = await graphQLClient.query(query, { slug });
    
    if (!data.post) {
      throw new Error(CONFIG.ERRORS.NOT_FOUND);
    }
    
    return data.post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

/**
 * Fetch all blog categories
 * @returns {Promise<Array>} Array of category objects
 */
async function getBlogCategories() {
  const query = `
    query GetBlogCategories {
      categories {
        nodes {
          id
          name
          slug
          count
        }
      }
    }
  `;
  
  try {
    const data = await graphQLClient.query(query, {}, true); // Use cache
    return data.categories.nodes;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/* ==================== ANNOUNCEMENT QUERIES ==================== */

/**
 * Fetch active announcements
 * Returns only published announcements where isactive is true, sorted by priority
 * @returns {Promise<Array>} Array of announcement objects
 */
async function getActiveAnnouncements() {
  const query = `
    query GetActiveAnnouncements {
      announcements(where: {status: PUBLISH}, first: 10) {
        nodes {
          id
          title
          message
          isactive
          linkurl
          linktext
          backgroundcolor
          textcolor
          priority
        }
      }
    }
  `;
  
  try {
    const data = await graphQLClient.query(query, {}, true); // Use cache
    
    // Debug logging
    console.log('📢 Announcements data received:', data);
    
    if (!data || !data.announcements || !data.announcements.nodes) {
      console.warn('⚠️ No announcements data structure found');
      return [];
    }
    
    const announcements = data.announcements.nodes;
    console.log('📢 Total announcements fetched:', announcements.length);
    
    // Filter only active announcements (handle different boolean formats from Pods)
    const activeAnnouncements = announcements.filter(announcement => {
      const isActive = announcement.isactive;
      // Handle different boolean formats: true, 'true', 1, '1'
      const isActiveValue = isActive === true || 
                           isActive === 'true' || 
                           isActive === 1 || 
                           isActive === '1';
      
      console.log('📢 Announcement:', announcement.title, 'isactive:', isActive, '→', isActiveValue);
      return isActiveValue;
    });
    
    console.log('📢 Active announcements:', activeAnnouncements.length);
    
       // Sort by priority (highest first)
       const sortedAnnouncements = activeAnnouncements.sort((a, b) => {
        const priorityA = parseInt(a.priority) || 0;
        const priorityB = parseInt(b.priority) || 0;
        return priorityB - priorityA; // Descending order
      });
    
    console.log('📢 Sorted announcements:', sortedAnnouncements.map(a => ({ title: a.title, priority: a.priority })));
    
    return sortedAnnouncements;
  } catch (error) {
    console.error('❌ Error fetching announcements:', error);
    // Return empty array on error so site still works
    return [];
  }
}

/* ==================== PAGE QUERIES ==================== */

/**
 * Fetch page content by slug (for Size Guide, Privacy Policy, Terms)
 * @param {string} slug - Page slug
 * @returns {Promise<Object>} Page object
 */
async function getPageBySlug(slug) {
  const query = `
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        id
        title
        content
      }
    }
  `;
  
  try {
    const data = await graphQLClient.query(query, { slug }, true); // Use cache for static pages
    
    if (!data.page) {
      throw new Error(CONFIG.ERRORS.NOT_FOUND);
    }
    
    return data.page;
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
}


/* ==================== HELPER FUNCTIONS ==================== */

/**
 * Build srcset attribute from WordPress image sizes
 * @param {Object} mediaDetails - WordPress mediaDetails object
 * @returns {string} srcset string
 */
function buildSrcset(mediaDetails) {
  if (!mediaDetails || !mediaDetails.sizes || mediaDetails.sizes.length === 0) {
    return '';
  }
  
  return mediaDetails.sizes
    .map(size => `${size.sourceUrl} ${size.width}w`)
    .join(', ');
}

/**
 * Get responsive image HTML with srcset
 * @param {Object} imageData - WordPress image object
 * @param {string} alt - Alt text
 * @param {string} sizes - Sizes attribute
 * @param {string} className - CSS class name(s)
 * @param {boolean} lazy - Enable lazy loading
 * @returns {string} HTML img tag
 */
function getResponsiveImage(imageData, alt = '', sizes = '100vw', className = '', lazy = true) {
  if (!imageData || !imageData.sourceUrl) {
    return `<img src="${CONFIG.IMAGES.PLACEHOLDER}" alt="${alt}" class="${className}">`;
  }
  
  const srcset = buildSrcset(imageData.mediaDetails);
  const src = imageData.sourceUrl;
  const imgAlt = imageData.altText || alt;
  const loadingAttr = lazy ? 'loading="lazy"' : '';
  
  if (srcset) {
    return `
      <img
        src="${src}"
        srcset="${srcset}"
        sizes="${sizes}"
        alt="${imgAlt}"
        class="${className}"
        ${loadingAttr}
      >
    `.trim();
  }
  
  return `<img src="${src}" alt="${imgAlt}" class="${className}" ${loadingAttr}>`;
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string from WordPress
 * @param {string} format - Format style (short, long, relative)
 * @returns {string} Formatted date
 */
function formatDate(dateString, format = 'long') {
  const date = new Date(dateString);
  
  if (format === 'short') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  if (format === 'long') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  if (format === 'relative') {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }
  
  return date.toLocaleDateString();
}

/**
 * Strip HTML tags from content
 * @param {string} html - HTML content
 * @returns {string} Plain text
 */
function stripHTML(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
function truncateText(text, length, suffix = '...') {
  if (!text || text.length <= length) return text;
  return text.substring(0, length).trim() + suffix;
}

/**
 * Create URL-friendly slug from text
 * @param {string} text - Text to slugify
 * @returns {string} Slug
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}


/* ==================== ERROR HANDLING ==================== */

/**
 * Display error message to user
 * @param {string} message - Error message
 * @param {HTMLElement} container - Container element to show error in
 */
function displayError(message, container) {
  if (!container) return;
  
  container.innerHTML = `
    <div class="error-message" role="alert">
      <p>${message}</p>
      <button class="btn btn--secondary btn--small" onclick="window.location.reload()">
        Try Again
      </button>
    </div>
  `;
}

/**
 * Display loading state
 * @param {HTMLElement} container - Container element
 * @param {string} message - Loading message (optional)
 */
function displayLoading(container, message = 'Loading...') {
  if (!container) return;
  
  container.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>${message}</p>
    </div>
  `;
}

/**
 * Hide loading state and clear container
 * @param {HTMLElement} container - Container element
 */
function hideLoading(container) {
  if (!container) return;
  container.innerHTML = '';
}


// Log that GraphQL client is ready
console.log('✅ GraphQL Client initialized');