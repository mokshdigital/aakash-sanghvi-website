/**
 * AG Fashion Hub - Mock Data
 * Hardcoded data replacing WordPress GraphQL API responses
 *
 * This file provides all the data that was previously fetched from the
 * WordPress CMS, allowing the site to run as a fully self-contained
 * portfolio demo with no external dependencies.
 *
 * @version 1.0.0
 */

const MOCK_DATA = {

  /* ==================== COLLECTIONS ==================== */

  collections: [
    {
      id: 'col-1',
      slug: 'bridal-collection',
      title: 'Bridal Collection',
      collectionname: 'Bridal Collection',
      heroimage: {
        node: {
          sourceUrl: 'assets/images/collections/bridal.jpg',
          altText: 'Bridal Collection - AG Fashion Hub',
          mediaDetails: { sizes: [] }
        }
      },
      description: '<p>Exquisite bridal wear crafted with intricate embroidery, luxurious fabrics, and timeless designs. Our bridal collection features lehengas, sarees, and gowns perfect for your special day.</p>',
      metatitle: 'Bridal Collection | AG Fashion Hub',
      metadescription: 'Discover stunning bridal lehengas, sarees, and gowns with intricate embroidery and luxurious fabrics.'
    },
    {
      id: 'col-2',
      slug: 'indo-western',
      title: 'Indo-Western',
      collectionname: 'Indo-Western',
      heroimage: {
        node: {
          sourceUrl: 'assets/images/collections/indo-western.png',
          altText: 'Indo-Western Collection - AG Fashion Hub',
          mediaDetails: { sizes: [] }
        }
      },
      description: '<p>A fusion of traditional Indian elegance and modern Western silhouettes. Perfect for cocktail parties, receptions, and contemporary celebrations.</p>',
      metatitle: 'Indo-Western Collection | AG Fashion Hub',
      metadescription: 'Explore our Indo-Western fusion wear blending traditional Indian elegance with modern silhouettes.'
    },
    {
      id: 'col-3',
      slug: 'casual-wear',
      title: 'Casual Wear',
      collectionname: 'Casual Wear',
      heroimage: {
        node: {
          sourceUrl: 'assets/images/collections/casualwear.png',
          altText: 'Casual Wear Collection - AG Fashion Hub',
          mediaDetails: { sizes: [] }
        }
      },
      description: '<p>Comfortable yet stylish everyday ethnic wear. Our casual collection includes cotton kurtis, light suits, and easy-to-wear pieces for daily elegance.</p>',
      metatitle: 'Casual Wear Collection | AG Fashion Hub',
      metadescription: 'Shop comfortable and stylish everyday ethnic wear including cotton kurtis and light suits.'
    },
    {
      id: 'col-4',
      slug: 'summer-wear',
      title: 'Summer Wear',
      collectionname: 'Summer Wear',
      heroimage: {
        node: {
          sourceUrl: 'assets/images/collections/summerwear.png',
          altText: 'Summer Wear Collection - AG Fashion Hub',
          mediaDetails: { sizes: [] }
        }
      },
      description: '<p>Breathable, lightweight fabrics in vibrant colours designed for warm weather. Stay cool and fashionable with our curated summer ethnic wear.</p>',
      metatitle: 'Summer Wear Collection | AG Fashion Hub',
      metadescription: 'Lightweight and breathable summer ethnic wear in vibrant colours and comfortable fabrics.'
    },
    {
      id: 'col-5',
      slug: 'winter-wear',
      title: 'Winter Wear',
      collectionname: 'Winter Wear',
      heroimage: {
        node: {
          sourceUrl: 'assets/images/collections/winterwear.png',
          altText: 'Winter Wear Collection - AG Fashion Hub',
          mediaDetails: { sizes: [] }
        }
      },
      description: '<p>Warm and luxurious ethnic wear for the colder months. Rich fabrics, deep tones, and layered designs to keep you stylish through winter.</p>',
      metatitle: 'Winter Wear Collection | AG Fashion Hub',
      metadescription: 'Luxurious winter ethnic wear featuring rich fabrics, deep tones, and warm layered designs.'
    }
  ],

  /* ==================== DESIGNS ==================== */

  designs: [
    {
      id: 'des-1',
      slug: 'ag-bridal-001',
      title: 'AG-BRIDAL-001',
      designcode: 'AG-BRIDAL-001',
      designgallery: {
        nodes: [
          { sourceUrl: 'assets/images/products/sample-1.jpg', altText: 'AG-BRIDAL-001 Front View', mediaDetails: { sizes: [] } },
          { sourceUrl: 'assets/images/products/sample-2.jpg', altText: 'AG-BRIDAL-001 Detail View', mediaDetails: { sizes: [] } }
        ]
      },
      description: '<p>A stunning bridal lehenga featuring intricate zardozi embroidery on rich velvet fabric. Hand-embellished with sequins and beadwork, this piece is designed to make every bride feel like royalty on her special day.</p>',
      fabric: 'Velvet, Net',
      color: 'Red',
      price: 1200,
      size: 'S, M, L, XL',
      linkedcollection: { node: { slug: 'bridal-collection', collectionname: 'Bridal Collection' } },
      availability: true,
      occasion: 'Wedding',
      tag: 'Bestseller',
      careinstructions: '<p>Dry clean only. Store in a garment bag away from direct sunlight. Handle embroidery with care.</p>',
      showinnewarrival: true
    },
    {
      id: 'des-2',
      slug: 'ag-bridal-002',
      title: 'AG-BRIDAL-002',
      designcode: 'AG-BRIDAL-002',
      designgallery: {
        nodes: [
          { sourceUrl: 'assets/images/products/sample-3.jpg', altText: 'AG-BRIDAL-002 Front View', mediaDetails: { sizes: [] } },
          { sourceUrl: 'assets/images/products/sample-4.jpg', altText: 'AG-BRIDAL-002 Detail View', mediaDetails: { sizes: [] } }
        ]
      },
      description: '<p>An elegant bridal saree with heavy border work in gold thread. The pallu features a stunning peacock motif, making this a timeless choice for wedding ceremonies.</p>',
      fabric: 'Silk, Georgette',
      color: 'Maroon',
      price: 950,
      size: 'Free Size',
      linkedcollection: { node: { slug: 'bridal-collection', collectionname: 'Bridal Collection' } },
      availability: true,
      occasion: 'Wedding',
      tag: 'Premium',
      careinstructions: '<p>Dry clean recommended. Store flat or draped. Avoid contact with perfumes and chemicals.</p>',
      showinnewarrival: true
    },
    {
      id: 'des-3',
      slug: 'ag-indo-001',
      title: 'AG-INDO-001',
      designcode: 'AG-INDO-001',
      designgallery: {
        nodes: [
          { sourceUrl: 'assets/images/products/sample-5.jpg', altText: 'AG-INDO-001 Front View', mediaDetails: { sizes: [] } },
          { sourceUrl: 'assets/images/products/sample-1.jpg', altText: 'AG-INDO-001 Side View', mediaDetails: { sizes: [] } }
        ]
      },
      description: '<p>A contemporary Indo-Western gown with a fitted bodice and flared skirt. Features delicate thread work and a modern neckline, perfect for cocktail events and receptions.</p>',
      fabric: 'Georgette, Crepe',
      color: 'Navy Blue',
      price: 680,
      size: 'S, M, L',
      linkedcollection: { node: { slug: 'indo-western', collectionname: 'Indo-Western' } },
      availability: true,
      occasion: 'Party',
      tag: 'Trending',
      careinstructions: '<p>Dry clean only. Iron on low heat on reverse side. Store on a padded hanger.</p>',
      showinnewarrival: true
    },
    {
      id: 'des-4',
      slug: 'ag-indo-002',
      title: 'AG-INDO-002',
      designcode: 'AG-INDO-002',
      designgallery: {
        nodes: [
          { sourceUrl: 'assets/images/products/suit-1.png', altText: 'AG-INDO-002 Front View', mediaDetails: { sizes: [] } },
          { sourceUrl: 'assets/images/products/suit-3.png', altText: 'AG-INDO-002 Back View', mediaDetails: { sizes: [] } }
        ]
      },
      description: '<p>An asymmetric kurta dress with palazzo pants. The fusion design features traditional block prints on a Western silhouette, bridging heritage with modern style.</p>',
      fabric: 'Cotton Silk',
      color: 'Teal',
      price: 450,
      size: 'S, M, L, XL',
      linkedcollection: { node: { slug: 'indo-western', collectionname: 'Indo-Western' } },
      availability: true,
      occasion: 'Casual, Party',
      tag: 'New',
      careinstructions: '<p>Machine wash cold with similar colours. Hang dry. Iron on medium heat.</p>',
      showinnewarrival: true
    },
    {
      id: 'des-5',
      slug: 'ag-casual-001',
      title: 'AG-CASUAL-001',
      designcode: 'AG-CASUAL-001',
      designgallery: {
        nodes: [
          { sourceUrl: 'assets/images/products/cotton-kurti-1.png', altText: 'AG-CASUAL-001 Front View', mediaDetails: { sizes: [] } },
          { sourceUrl: 'assets/images/products/new-arrival-1.png', altText: 'AG-CASUAL-001 Detail View', mediaDetails: { sizes: [] } }
        ]
      },
      description: '<p>A breezy cotton kurti with chikankari embroidery. Lightweight and comfortable, this everyday piece brings effortless elegance to your daily wardrobe.</p>',
      fabric: 'Cotton',
      color: 'White',
      price: 180,
      size: 'S, M, L, XL, XXL',
      linkedcollection: { node: { slug: 'casual-wear', collectionname: 'Casual Wear' } },
      availability: true,
      occasion: 'Casual',
      tag: 'Everyday',
      careinstructions: '<p>Machine wash cold. Tumble dry low. Iron on medium heat.</p>',
      showinnewarrival: true
    },
    {
      id: 'des-6',
      slug: 'ag-casual-002',
      title: 'AG-CASUAL-002',
      designcode: 'AG-CASUAL-002',
      designgallery: {
        nodes: [
          { sourceUrl: 'assets/images/products/new-arrival-2.png', altText: 'AG-CASUAL-002 Front View', mediaDetails: { sizes: [] } },
          { sourceUrl: 'assets/images/products/suit-4.png', altText: 'AG-CASUAL-002 Side View', mediaDetails: { sizes: [] } }
        ]
      },
      description: '<p>A printed straight-cut suit set with matching dupatta. The vibrant floral print on soft fabric makes it ideal for office wear and casual outings.</p>',
      fabric: 'Rayon',
      color: 'Pink',
      price: 220,
      size: 'M, L, XL',
      linkedcollection: { node: { slug: 'casual-wear', collectionname: 'Casual Wear' } },
      availability: false,
      occasion: 'Casual, Office',
      tag: 'Popular',
      careinstructions: '<p>Hand wash or gentle machine wash. Do not bleach. Line dry in shade.</p>',
      showinnewarrival: false
    },
    {
      id: 'des-7',
      slug: 'ag-summer-001',
      title: 'AG-SUMMER-001',
      designcode: 'AG-SUMMER-001',
      designgallery: {
        nodes: [
          { sourceUrl: 'assets/images/products/sample-2.jpg', altText: 'AG-SUMMER-001 Front View', mediaDetails: { sizes: [] } },
          { sourceUrl: 'assets/images/products/sample-3.jpg', altText: 'AG-SUMMER-001 Detail View', mediaDetails: { sizes: [] } }
        ]
      },
      description: '<p>A lightweight linen saree with minimalist handloom border. Perfect for summer brunches, temple visits, and garden parties.</p>',
      fabric: 'Linen',
      color: 'Yellow',
      price: 320,
      size: 'Free Size',
      linkedcollection: { node: { slug: 'summer-wear', collectionname: 'Summer Wear' } },
      availability: true,
      occasion: 'Casual, Festive',
      tag: 'Seasonal',
      careinstructions: '<p>Hand wash in cold water. Do not wring. Dry flat in shade. Iron while slightly damp.</p>',
      showinnewarrival: true
    },
    {
      id: 'des-8',
      slug: 'ag-summer-002',
      title: 'AG-SUMMER-002',
      designcode: 'AG-SUMMER-002',
      designgallery: {
        nodes: [
          { sourceUrl: 'assets/images/products/sample-4.jpg', altText: 'AG-SUMMER-002 Front View', mediaDetails: { sizes: [] } },
          { sourceUrl: 'assets/images/products/sample-5.jpg', altText: 'AG-SUMMER-002 Detail View', mediaDetails: { sizes: [] } }
        ]
      },
      description: '<p>A cool mul cotton anarkali with mirror work accents. The breathable fabric and relaxed fit make it your go-to summer festive outfit.</p>',
      fabric: 'Mul Cotton',
      color: 'Green',
      price: 280,
      size: 'S, M, L, XL',
      linkedcollection: { node: { slug: 'summer-wear', collectionname: 'Summer Wear' } },
      availability: true,
      occasion: 'Festive, Casual',
      tag: 'Comfortable',
      careinstructions: '<p>Gentle machine wash. Do not bleach. Hang dry in shade.</p>',
      showinnewarrival: true
    },
    {
      id: 'des-9',
      slug: 'ag-winter-001',
      title: 'AG-WINTER-001',
      designcode: 'AG-WINTER-001',
      designgallery: {
        nodes: [
          { sourceUrl: 'assets/images/products/suit-1.png', altText: 'AG-WINTER-001 Front View', mediaDetails: { sizes: [] } },
          { sourceUrl: 'assets/images/products/suit-3.png', altText: 'AG-WINTER-001 Detail View', mediaDetails: { sizes: [] } }
        ]
      },
      description: '<p>A warm pashmina shawl suit with kashmiri embroidery. The rich fabric and deep burgundy tone make this perfect for winter weddings and formal events.</p>',
      fabric: 'Pashmina, Wool Blend',
      color: 'Burgundy',
      price: 750,
      size: 'M, L, XL',
      linkedcollection: { node: { slug: 'winter-wear', collectionname: 'Winter Wear' } },
      availability: true,
      occasion: 'Wedding, Festive',
      tag: 'Luxury',
      careinstructions: '<p>Dry clean only. Store folded with cedar sachets. Avoid hanging to prevent stretching.</p>',
      showinnewarrival: false
    },
    {
      id: 'des-10',
      slug: 'ag-winter-002',
      title: 'AG-WINTER-002',
      designcode: 'AG-WINTER-002',
      designgallery: {
        nodes: [
          { sourceUrl: 'assets/images/products/suit-4.png', altText: 'AG-WINTER-002 Front View', mediaDetails: { sizes: [] } },
          { sourceUrl: 'assets/images/products/cotton-kurti-1.png', altText: 'AG-WINTER-002 Fabric Detail', mediaDetails: { sizes: [] } }
        ]
      },
      description: '<p>A velvet kurta set with gold zari work and a matching stole. Designed for festive gatherings and winter celebrations with a regal touch.</p>',
      fabric: 'Velvet',
      color: 'Emerald Green',
      price: 580,
      size: 'S, M, L',
      linkedcollection: { node: { slug: 'winter-wear', collectionname: 'Winter Wear' } },
      availability: true,
      occasion: 'Festive, Party',
      tag: 'Festive',
      careinstructions: '<p>Dry clean recommended. Store on padded hanger. Steam to remove wrinkles.</p>',
      showinnewarrival: true
    }
  ],

  /* ==================== BLOG POSTS ==================== */

  blogPosts: [
    {
      id: 'post-1',
      slug: 'how-to-style-ethnic-wear-for-weddings',
      title: 'How to Style Ethnic Wear for Weddings',
      excerpt: '<p>Discover the art of styling Indian ethnic wear for wedding celebrations. From choosing the right lehenga to accessorizing your saree, this guide covers everything you need to look stunning.</p>',
      content: '<h2>The Complete Wedding Styling Guide</h2><p>Wedding season calls for a wardrobe that blends tradition with personal style. Whether you\'re the bride, a bridesmaid, or a guest, choosing the right ethnic wear can transform your look.</p><h3>Choosing the Right Outfit</h3><p>Start by considering the wedding\'s theme and venue. An outdoor garden wedding pairs beautifully with lighter fabrics like georgette and chiffon, while an indoor ballroom celebration calls for heavier silks and velvets.</p><h3>Accessorizing Your Look</h3><p>The right accessories can elevate any outfit. Traditional kundan or polki jewellery complements bridal lehengas, while minimalist gold pieces work well with sarees. Don\'t forget a matching clutch and comfortable yet elegant footwear.</p><h3>Hair and Makeup</h3><p>Your hairstyle should complement your outfit\'s neckline and jewellery. A low bun works beautifully with heavy necklaces, while loose curls pair well with statement earrings.</p><p>Remember, confidence is your best accessory. Wear what makes you feel beautiful and comfortable!</p>',
      date: '2025-10-15T10:00:00',
      featuredImage: {
        node: {
          sourceUrl: 'assets/images/blogs/blog-1.jpg',
          altText: 'Wedding Ethnic Wear Styling Guide',
          mediaDetails: { sizes: [] }
        }
      },
      categories: { nodes: [{ name: 'Style Guide', slug: 'style-guide', id: 'cat-1' }] },
      tags: { nodes: [{ name: 'Wedding', slug: 'wedding' }, { name: 'Styling Tips', slug: 'styling-tips' }] }
    },
    {
      id: 'post-2',
      slug: 'top-fabric-choices-for-every-season',
      title: 'Top Fabric Choices for Every Season',
      excerpt: '<p>Learn which fabrics work best for each season. From breathable cotton for summer to luxurious velvet for winter, make informed choices for year-round comfort and style.</p>',
      content: '<h2>A Seasonal Fabric Guide</h2><p>Choosing the right fabric is just as important as choosing the right design. The fabric determines how comfortable you\'ll feel and how well the outfit drapes.</p><h3>Summer Fabrics</h3><p>Cotton, linen, and mul cotton are your best friends during hot months. They allow air circulation and absorb moisture, keeping you cool and comfortable. Look for hand-block printed cotton kurtis and linen sarees.</p><h3>Monsoon Picks</h3><p>Synthetic blends and georgette dry quickly and resist moisture. Avoid heavy silk and velvet during the rainy season as they take long to dry and can develop a musty smell.</p><h3>Autumn Transition</h3><p>Crepe and chanderi silk offer the perfect balance — not too heavy, not too light. These fabrics carry beautiful prints and drape well for festive occasions.</p><h3>Winter Warmth</h3><p>Velvet, pashmina, and wool blends provide warmth without sacrificing elegance. Layer with embroidered shawls and stoles for added comfort.</p>',
      date: '2025-09-20T10:00:00',
      featuredImage: {
        node: {
          sourceUrl: 'assets/images/blogs/blog-2.png',
          altText: 'Seasonal Fabric Guide',
          mediaDetails: { sizes: [] }
        }
      },
      categories: { nodes: [{ name: 'Fashion Tips', slug: 'fashion-tips', id: 'cat-2' }] },
      tags: { nodes: [{ name: 'Fabrics', slug: 'fabrics' }, { name: 'Seasonal', slug: 'seasonal' }] }
    },
    {
      id: 'post-3',
      slug: 'caring-for-your-ethnic-wardrobe',
      title: 'Caring for Your Ethnic Wardrobe',
      excerpt: '<p>Protect your investment with proper garment care. Learn essential tips for washing, storing, and maintaining your precious ethnic wear collection for years to come.</p>',
      content: '<h2>Garment Care Essentials</h2><p>Your ethnic wardrobe is an investment. With proper care, these pieces can last a lifetime and even become treasured family heirlooms.</p><h3>Washing Guidelines</h3><p>Always check the care label first. Most heavily embellished pieces require dry cleaning. For lighter cotton pieces, hand wash in cold water with a mild detergent. Never wring delicate fabrics — gently squeeze out water and lay flat to dry.</p><h3>Storage Tips</h3><p>Store silk and velvet pieces in breathable cotton garment bags, never in plastic. Use acid-free tissue paper between folds to prevent creasing. Add silica gel packets to prevent moisture damage, and cedar sachets to deter moths.</p><h3>Stain Removal</h3><p>Act quickly on stains. Blot — never rub. For oil-based stains on silk, sprinkle talcum powder and let it absorb overnight. For most stains on delicate fabrics, consult a professional cleaner.</p><h3>Embroidery Care</h3><p>Turn embroidered garments inside out before any cleaning. Store them flat rather than hanging to prevent the weight of embellishments from stretching the fabric.</p>',
      date: '2025-08-05T10:00:00',
      featuredImage: {
        node: {
          sourceUrl: 'assets/images/blogs/blog-3.png',
          altText: 'Ethnic Wardrobe Care Guide',
          mediaDetails: { sizes: [] }
        }
      },
      categories: { nodes: [{ name: 'Care Guide', slug: 'care-guide', id: 'cat-3' }] },
      tags: { nodes: [{ name: 'Garment Care', slug: 'garment-care' }, { name: 'Tips', slug: 'tips' }] }
    },
    {
      id: 'post-4',
      slug: 'trending-colours-this-festive-season',
      title: 'Trending Colours This Festive Season',
      excerpt: '<p>Stay ahead of the fashion curve with this season\'s hottest colour trends in ethnic wear. From classic reds to unexpected pastels, find your perfect festive palette.</p>',
      content: '<h2>Festive Colour Trends</h2><p>Every festive season brings a fresh palette of colours to the fashion world. This year\'s trends blend traditional favourites with surprising new choices.</p><h3>Classic Reds & Maroons</h3><p>Timeless and always in demand, deep reds and maroons remain the go-to for wedding and festive wear. This season, look for wine tones and berry shades for a modern twist on the classic.</p><h3>Emerald Greens</h3><p>Green is having a major moment. From deep emerald to sage green, this colour family works beautifully across all occasions — from casual gatherings to formal celebrations.</p><h3>Pastel Power</h3><p>Soft pastels are no longer reserved for daytime events. Dusty rose, powder blue, and mint green in luxurious fabrics like silk and organza create a sophisticated evening look.</p><h3>Metallic Accents</h3><p>Gold, silver, and copper accents in embroidery and fabric weaves add a celebratory sparkle. Look for sarees and lehengas with metallic thread work.</p>',
      date: '2025-07-12T10:00:00',
      featuredImage: {
        node: {
          sourceUrl: 'assets/images/blogs/blog-4.png',
          altText: 'Festive Colour Trends',
          mediaDetails: { sizes: [] }
        }
      },
      categories: { nodes: [{ name: 'Fashion Tips', slug: 'fashion-tips', id: 'cat-2' }] },
      tags: { nodes: [{ name: 'Trends', slug: 'trends' }, { name: 'Festive', slug: 'festive' }] }
    }
  ],

  /* ==================== BLOG CATEGORIES ==================== */

  blogCategories: [
    { id: 'cat-1', name: 'Style Guide', slug: 'style-guide', count: 1 },
    { id: 'cat-2', name: 'Fashion Tips', slug: 'fashion-tips', count: 2 },
    { id: 'cat-3', name: 'Care Guide', slug: 'care-guide', count: 1 }
  ],

  /* ==================== ANNOUNCEMENTS ==================== */

  announcements: [
    {
      id: 'ann-1',
      title: 'Portfolio Demo',
      message: 'You are viewing a portfolio demo.',
      isactive: true,
      linkurl: 'https://aakashsanghvi.com',
      linktext: 'Back to aakashsanghvi.com',
      backgroundcolor: '#1a1a2e',
      textcolor: '#ffffff',
      priority: 10
    }
  ],

  /* ==================== STATIC PAGES ==================== */

  pages: {
    'privacy-policy': {
      id: 'page-1',
      title: 'Privacy Policy',
      content: '<h2>Privacy Policy</h2><p><strong>Last Updated:</strong> January 1, 2025</p><h3>Information We Collect</h3><p>AG Fashion Hub respects your privacy. We collect only the information necessary to process your inquiries, including your name, contact information, and product preferences shared via WhatsApp or email.</p><h3>How We Use Your Information</h3><p>Your information is used solely to respond to your design inquiries, provide product information, and improve our services. We do not sell, trade, or share your personal information with third parties.</p><h3>Cookies</h3><p>Our website uses cookies to enhance your browsing experience and provide analytics that help us improve our site. You may disable cookies in your browser settings.</p><h3>Contact Us</h3><p>If you have questions about this privacy policy, please contact us at contact@amitojenterprisesltd.ca.</p>'
    },
    'terms-conditions': {
      id: 'page-2',
      title: 'Terms & Conditions',
      content: '<h2>Terms &amp; Conditions</h2><p><strong>Last Updated:</strong> January 1, 2025</p><h3>General Terms</h3><p>By accessing and using the AG Fashion Hub website, you agree to comply with these terms and conditions. All content, designs, and images on this site are the property of AG Fashion Hub.</p><h3>Product Information</h3><p>We strive to display our designs as accurately as possible. However, due to variations in screen settings, actual colours may vary slightly from what appears on your device.</p><h3>Pricing</h3><p>All prices displayed are in Canadian Dollars (CAD) and are subject to change without notice. Final pricing will be confirmed during your WhatsApp consultation.</p><h3>Intellectual Property</h3><p>All designs, images, and content on this website are protected by copyright. Unauthorized reproduction or distribution is prohibited.</p>'
    },
    'exchange-refund-policy': {
      id: 'page-3',
      title: 'Exchange & Refund Policy',
      content: '<h2>Exchange &amp; Refund Policy</h2><p><strong>Last Updated:</strong> January 1, 2025</p><h3>Custom Orders</h3><p>As most of our pieces are custom-made or made-to-order, we have specific policies regarding exchanges and refunds. Please review them carefully before placing your order.</p><h3>Exchanges</h3><p>We accept exchanges within 7 days of delivery for items in their original, unworn condition with all tags attached. Custom-made pieces are not eligible for exchange unless there is a manufacturing defect.</p><h3>Refunds</h3><p>Refund requests are evaluated on a case-by-case basis. If approved, refunds will be processed within 10 business days to the original payment method.</p><h3>Defective Items</h3><p>If you receive an item with a manufacturing defect, please contact us immediately via WhatsApp with photos. We will arrange for a replacement or full refund at no additional cost.</p><h3>Contact</h3><p>For all exchange and refund inquiries, please reach out via WhatsApp at +1 (604) 750-0648.</p>'
    }
  }

};

// Make available globally
window.MOCK_DATA = MOCK_DATA;

console.log('✅ Mock data loaded — site running in portfolio demo mode');
