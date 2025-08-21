/**
 * Fallback data constants extracted from existing components
 * This data will be used when the API is unavailable
 */

export const FALLBACK_BLOG_POSTS = [
  {
    id: 1,
    title: '10 Interior Design Trends That Will Define 2024',
    slug: '10-interior-design-trends-2024',
    excerpt: 'Discover the latest interior design trends that are shaping homes and commercial spaces this year. From sustainable materials to bold color palettes.',
    content: 'Full article content here...',
    category: 'trends',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    tags: ['Trends', 'Color', 'Materials', 'Modern'],
    featured: true
  },
  {
    id: 2,
    title: 'How to Choose the Perfect Color Palette for Your Living Room',
    slug: 'perfect-color-palette-living-room',
    excerpt: 'Creating a cohesive color scheme can transform your living space. Learn the principles of color theory and how to apply them in interior design.',
    content: 'Full article content here...',
    category: 'design-tips',
    author: 'Michael Chen',
    publishedAt: '2024-01-12',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80',
    tags: ['Color Theory', 'Living Room', 'Design Tips'],
    featured: false
  },
  {
    id: 3,
    title: 'Sustainable Design: Eco-Friendly Materials for Modern Homes',
    slug: 'sustainable-design-eco-friendly-materials',
    excerpt: 'Explore sustainable materials and practices that can make your home more environmentally friendly without compromising on style.',
    content: 'Full article content here...',
    category: 'trends',
    author: 'Emily Davis',
    publishedAt: '2024-01-10',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    tags: ['Sustainability', 'Materials', 'Eco-Friendly'],
    featured: false
  },
  {
    id: 4,
    title: 'Before & After: Complete Home Transformation in Beverly Hills',
    slug: 'before-after-beverly-hills-transformation',
    excerpt: 'Take a behind-the-scenes look at our complete renovation of a 1960s Beverly Hills home, transforming it into a modern masterpiece.',
    content: 'Full article content here...',
    category: 'projects',
    author: 'Design Team',
    publishedAt: '2024-01-08',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    tags: ['Before & After', 'Renovation', 'Modern', 'Luxury'],
    featured: true
  },
  {
    id: 5,
    title: 'Small Space Solutions: Maximizing Style in Tiny Apartments',
    slug: 'small-space-solutions-tiny-apartments',
    excerpt: 'Living in a small space doesn\'t mean compromising on style. Discover clever design tricks to make any space feel larger and more functional.',
    content: 'Full article content here...',
    category: 'design-tips',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-05',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80',
    tags: ['Small Space', 'Apartment', 'Storage', 'Minimalism'],
    featured: false
  },
  {
    id: 6,
    title: 'The Psychology of Interior Design: How Spaces Affect Our Mood',
    slug: 'psychology-interior-design-mood',
    excerpt: 'Understand how different design elements, colors, and layouts can influence our emotions and well-being in profound ways.',
    content: 'Full article content here...',
    category: 'inspiration',
    author: 'Dr. Lisa Wong',
    publishedAt: '2024-01-03',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    tags: ['Psychology', 'Wellness', 'Mood', 'Color'],
    featured: false
  },
  {
    id: 7,
    title: 'DIY Guide: Creating a Gallery Wall That Tells Your Story',
    slug: 'diy-gallery-wall-guide',
    excerpt: 'Learn how to create a stunning gallery wall that reflects your personality. Step-by-step tutorial with layout ideas and hanging tips.',
    content: 'Full article content here...',
    category: 'tutorials',
    author: 'Michael Chen',
    publishedAt: '2024-01-01',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    tags: ['DIY', 'Gallery Wall', 'Art', 'Tutorial'],
    featured: false
  },
  {
    id: 8,
    title: 'Biophilic Design: Bringing Nature Indoors for Better Living',
    slug: 'biophilic-design-nature-indoors',
    excerpt: 'Discover how incorporating natural elements into your interior design can improve air quality, reduce stress, and create a more harmonious living environment.',
    content: 'Full article content here...',
    category: 'trends',
    author: 'Emily Davis',
    publishedAt: '2023-12-28',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80',
    tags: ['Biophilic', 'Plants', 'Natural', 'Wellness'],
    featured: false
  }
]

export const FALLBACK_PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'Modern Luxury Home',
    category: 'residential',
    location: 'Beverly Hills, CA',
    year: '2023',
    description: 'A complete transformation of a 4,500 sq ft luxury home featuring contemporary design elements and smart home integration.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Modern', 'Luxury', 'Smart Home']
  },
  {
    id: 2,
    title: 'Downtown Office Space',
    category: 'commercial',
    location: 'Manhattan, NY',
    year: '2023',
    description: 'A creative workspace design for a tech startup, promoting collaboration and productivity.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Modern', 'Workspace', 'Collaborative']
  },
  {
    id: 3,
    title: 'Boutique Hotel Renovation',
    category: 'renovation',
    location: 'Charleston, SC',
    year: '2022',
    description: 'Historic hotel renovation preserving original character while adding contemporary amenities.',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Historic', 'Boutique', 'Hospitality']
  },
  {
    id: 4,
    title: 'Minimalist Apartment',
    category: 'residential',
    location: 'San Francisco, CA',
    year: '2023',
    description: 'Clean, minimalist design maximizing space and natural light in a compact urban apartment.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Minimalist', 'Urban', 'Compact']
  },
  {
    id: 5,
    title: 'Restaurant Interior',
    category: 'commercial',
    location: 'Chicago, IL',
    year: '2023',
    description: 'Warm, inviting restaurant design creating the perfect atmosphere for fine dining.',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Restaurant', 'Hospitality', 'Warm']
  },
  {
    id: 6,
    title: 'Home Staging Project',
    category: 'styling',
    location: 'Austin, TX',
    year: '2023',
    description: 'Professional home staging that resulted in a sale within 2 weeks of listing.',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Staging', 'Sale', 'Neutral']
  }
]

export const FALLBACK_STATS = [
  { icon: 'Users', label: 'Happy Clients', value: '500+' },
  { icon: 'Award', label: 'Projects Completed', value: '1000+' },
  { icon: 'Star', label: 'Years Experience', value: '15+' },
  { icon: 'Heart', label: 'Design Awards', value: '25+' },
]

export const FALLBACK_TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: 'The team transformed our space beyond our wildest dreams. Every detail was perfect!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Business Owner',
    content: 'Professional, creative, and delivered exactly what we envisioned for our office space.',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'Restaurant Owner',
    content: 'They created an atmosphere that our customers absolutely love. Highly recommended!',
    rating: 5,
  },
]

export const FALLBACK_CATEGORIES = {
  blog: [
    { id: 'all', name: 'All Posts' },
    { id: 'design-tips', name: 'Design Tips' },
    { id: 'trends', name: 'Trends' },
    { id: 'projects', name: 'Project Showcases' },
    { id: 'inspiration', name: 'Inspiration' },
    { id: 'tutorials', name: 'Tutorials' }
  ],
  portfolio: [
    { id: 'all', name: 'All Projects' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'renovation', name: 'Renovations' },
    { id: 'styling', name: 'Interior Styling' }
  ]
}

export const FALLBACK_SETTINGS = {
  companyName: 'Interior Design Studio',
  companyTagline: 'Transforming spaces, creating dreams',
  companyDescription: 'We are a full-service interior design company specializing in residential and commercial spaces.',
  
  contactInfo: {
    email: 'info@interiordesign.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Design Street',
      city: 'Design City',
      state: 'DS',
      zipCode: '12345',
      country: 'United States'
    },
    businessHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    }
  },

  socialMedia: {
    facebook: 'https://facebook.com/interiordesignstudio',
    instagram: 'https://instagram.com/interiordesignstudio',
    twitter: 'https://twitter.com/interiordesignstudio',
    linkedin: 'https://linkedin.com/company/interiordesignstudio',
    pinterest: 'https://pinterest.com/interiordesignstudio'
  },

  seo: {
    metaTitle: 'Professional Interior Design Services',
    metaDescription: 'Transform your space with our professional interior design services. Residential and commercial design solutions.',
    keywords: ['interior design', 'home design', 'commercial design', 'space planning']
  },

  features: {
    enableBlog: true,
    enablePortfolio: true,
    enableQuotes: true,
    enableNewsletterSignup: true,
    enableLiveChat: false,
    maintenanceMode: false
  },

  theme: {
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    accentColor: '#f59e0b',
    fontFamily: 'Inter, sans-serif'
  },

  homepage: {
    heroTitle: 'Transform Your Space',
    heroSubtitle: 'Professional interior design services that bring your vision to life',
    heroButtonText: 'Get Started',
    heroButtonLink: '/request-quote',
    featuredServices: [
      {
        title: 'Residential Design',
        description: 'Transform your home into a personalized sanctuary',
        icon: 'Home',
        link: '/services#residential'
      },
      {
        title: 'Commercial Design',
        description: 'Create inspiring workspaces that boost productivity',
        icon: 'Building',
        link: '/services#commercial'
      },
      {
        title: 'Interior Styling',
        description: 'Perfect the final touches for a polished look',
        icon: 'Palette',
        link: '/services#styling'
      }
    ],
    testimonialSection: {
      enabled: true,
      title: 'What Our Clients Say',
      subtitle: 'Discover why our clients love working with us'
    }
  }
}

export default {
  FALLBACK_BLOG_POSTS,
  FALLBACK_PORTFOLIO_ITEMS,
  FALLBACK_STATS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_CATEGORIES,
  FALLBACK_SETTINGS
}