/**
 * Data transformation utilities for converting between API and frontend data formats
 */

/**
 * Transform blog data from API response to frontend format
 * @param {Object} apiResponse - Response from blog API
 * @returns {Array} Transformed blog posts array
 */
export const transformBlogData = (apiResponse) => {
  // Handle both paginated and direct array responses
  const blogs = apiResponse?.data?.blogs || apiResponse?.data || apiResponse || []
  
  return blogs.map(blog => ({
    id: blog._id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    category: blog.category,
    author: blog.author,
    publishedAt: blog.publishedAt || blog.createdAt,
    readTime: blog.readTime,
    image: blog.image?.url || blog.image,
    tags: blog.tags || [],
    featured: blog.featured || false,
    published: blog.published,
    views: blog.views || 0,
    likes: blog.likes || 0
  }))
}

/**
 * Transform single blog post from API response
 * @param {Object} apiResponse - Response from single blog API
 * @returns {Object} Transformed blog post
 */
export const transformSingleBlog = (apiResponse) => {
  const blog = apiResponse?.data || apiResponse
  
  if (!blog) return null
  
  return {
    id: blog._id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    category: blog.category,
    author: blog.author,
    publishedAt: blog.publishedAt || blog.createdAt,
    readTime: blog.readTime,
    image: blog.image?.url || blog.image,
    tags: blog.tags || [],
    featured: blog.featured || false,
    published: blog.published,
    views: blog.views || 0,
    likes: blog.likes || 0
  }
}

/**
 * Transform portfolio data from API response to frontend format
 * @param {Object} apiResponse - Response from portfolio API
 * @returns {Array} Transformed portfolio items array
 */
export const transformPortfolioData = (apiResponse) => {
  // Handle both paginated and direct array responses
  const portfolioItems = apiResponse?.data?.portfolio || apiResponse?.data || apiResponse || []
  
  return portfolioItems.map(item => ({
    id: item._id,
    title: item.title,
    slug: item.slug,
    category: item.category,
    style: item.style,
    location: item.location,
    year: item.completionDate ? new Date(item.completionDate).getFullYear().toString() : new Date(item.createdAt).getFullYear().toString(),
    description: item.description,
    images: item.images?.map(img => img.url || img) || [],
    tags: item.tags || [],
    featured: item.featured || false,
    published: item.published,
    highlights: item.highlights || [],
    challenges: item.challenges || [],
    solutions: item.solutions || [],
    materials: item.materials || [],
    colors: item.colors || [],
    rooms: item.rooms || [],
    client: item.client,
    projectDuration: item.projectDuration,
    budget: item.budget,
    views: item.views || 0,
    likes: item.likes || 0
  }))
}

/**
 * Transform single portfolio item from API response
 * @param {Object} apiResponse - Response from single portfolio API
 * @returns {Object} Transformed portfolio item
 */
export const transformSinglePortfolio = (apiResponse) => {
  const item = apiResponse?.data || apiResponse
  
  if (!item) return null
  
  return {
    id: item._id,
    title: item.title,
    slug: item.slug,
    category: item.category,
    style: item.style,
    location: item.location,
    year: item.completionDate ? new Date(item.completionDate).getFullYear().toString() : new Date(item.createdAt).getFullYear().toString(),
    description: item.description,
    images: item.images?.map(img => img.url || img) || [],
    tags: item.tags || [],
    featured: item.featured || false,
    published: item.published,
    highlights: item.highlights || [],
    challenges: item.challenges || [],
    solutions: item.solutions || [],
    materials: item.materials || [],
    colors: item.colors || [],
    rooms: item.rooms || [],
    client: item.client,
    projectDuration: item.projectDuration,
    budget: item.budget,
    views: item.views || 0,
    likes: item.likes || 0
  }
}

/**
 * Transform stats data from various API endpoints
 * @param {Object} apiResponse - Response from stats API
 * @returns {Array} Transformed stats array for home page
 */
export const transformStatsData = (apiResponse) => {
  const data = apiResponse?.data || apiResponse || {}
  
  // Create stats array from API data or use fallback structure
  return [
    {
      icon: 'Users',
      label: 'Happy Clients',
      value: data.totalClients || '500+'
    },
    {
      icon: 'Award', 
      label: 'Projects Completed',
      value: data.totalProjects || data.portfolio?.total || '1000+'
    },
    {
      icon: 'Star',
      label: 'Years Experience', 
      value: data.yearsExperience || '15+'
    },
    {
      icon: 'Heart',
      label: 'Design Awards',
      value: data.awards || '25+'
    }
  ]
}

/**
 * Transform contact data for testimonials
 * @param {Object} apiResponse - Response from contacts API
 * @returns {Array} Transformed testimonials array
 */
export const transformTestimonialsData = (apiResponse) => {
  const contacts = apiResponse?.data?.contacts || apiResponse?.data || apiResponse || []
  
  // Filter contacts that have testimonial data
  return contacts
    .filter(contact => contact.testimonial && contact.rating >= 4)
    .map(contact => ({
      name: contact.name,
      role: contact.title || contact.company || 'Client',
      content: contact.testimonial,
      rating: contact.rating || 5
    }))
    .slice(0, 6) // Limit to 6 testimonials
}

/**
 * Get API base URL for image paths
 * @param {string} imagePath - Relative image path from API
 * @returns {string} Full URL for image
 */
export const getImageUrl = (imagePath) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const BASE_URL = API_BASE_URL.replace('/api', '')
  
  if (!imagePath) return null
  if (imagePath.startsWith('http')) return imagePath
  if (imagePath.startsWith('/uploads')) return `${BASE_URL}${imagePath}`
  
  return imagePath
}

/**
 * Normalize data structure for consistent handling
 * @param {*} data - Raw data from API or fallback
 * @param {string} type - Data type ('blog', 'portfolio', 'stats', etc.)
 * @returns {*} Normalized data
 */
export const normalizeData = (data, type) => {
  if (!data) return null
  
  switch (type) {
    case 'blog':
      return Array.isArray(data) ? transformBlogData(data) : transformSingleBlog(data)
    case 'portfolio':
      return Array.isArray(data) ? transformPortfolioData(data) : transformSinglePortfolio(data)
    case 'stats':
      return transformStatsData(data)
    case 'testimonials':
      return transformTestimonialsData(data)
    default:
      return data
  }
}

/**
 * Error handling utility for API responses
 * @param {Error} error - Error object from API call
 * @returns {Object} Standardized error information
 */
export const handleApiError = (error) => {
  console.error('API Error:', error)
  
  return {
    message: error.message || 'An error occurred',
    status: error.status || 0,
    isNetworkError: error.status === 0 || !navigator.onLine,
    isServerError: error.status >= 500,
    isClientError: error.status >= 400 && error.status < 500
  }
}

/**
 * Check if data appears to be from API (has MongoDB ObjectId format)
 * @param {*} data - Data to check
 * @returns {boolean} Whether data appears to be from API
 */
export const isApiData = (data) => {
  if (!data) return false
  if (Array.isArray(data) && data.length > 0) {
    return typeof data[0].id === 'string' && data[0].id.length === 24
  }
  if (typeof data === 'object') {
    return typeof data.id === 'string' && data.id.length === 24
  }
  return false
}

export default {
  transformBlogData,
  transformSingleBlog,
  transformPortfolioData,
  transformSinglePortfolio,
  transformStatsData,
  transformTestimonialsData,
  getImageUrl,
  normalizeData,
  handleApiError,
  isApiData
}