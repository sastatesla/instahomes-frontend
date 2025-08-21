/**
 * Image handling utilities for both local and GCS storage
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const BASE_URL = API_BASE_URL.replace('/api', '');

/**
 * Get the full URL for an image, handling both local and GCS storage
 * @param {string|Object} imageInput - Image URL string or image object
 * @param {Object} options - Options for image processing
 * @returns {string} Full image URL
 */
export const getImageUrl = (imageInput, options = {}) => {
  if (!imageInput) return null;

  const { 
    fallback = '/assets/placeholder.jpg',
    width = null,
    height = null,
    quality = 85,
    format = null 
  } = options;

  try {
    // Handle string URLs
    if (typeof imageInput === 'string') {
      return processImageUrl(imageInput, { width, height, quality, format });
    }

    // Handle image objects (from API responses)
    if (typeof imageInput === 'object' && imageInput.url) {
      return processImageUrl(imageInput.url, { width, height, quality, format });
    }

    // Handle legacy image objects with path property
    if (typeof imageInput === 'object' && imageInput.path) {
      const url = imageInput.path.startsWith('http') 
        ? imageInput.path 
        : `${BASE_URL}/${imageInput.path}`;
      return processImageUrl(url, { width, height, quality, format });
    }

    return fallback;
  } catch (error) {
    console.warn('Error processing image URL:', error);
    return fallback;
  }
};

/**
 * Process image URL with transformations
 * @param {string} url - Original image URL
 * @param {Object} options - Transformation options
 * @returns {string} Processed image URL
 */
const processImageUrl = (url, options = {}) => {
  if (!url) return null;

  // If it's already a full URL (GCS or external), return as-is
  if (url.startsWith('http')) {
    // For GCS URLs, we could add transformation parameters if needed
    if (url.includes('storage.googleapis.com')) {
      return addGCSTransformations(url, options);
    }
    return url;
  }

  // For local URLs, ensure they have the correct base URL
  if (url.startsWith('/')) {
    return `${BASE_URL}${url}`;
  }

  return `${BASE_URL}/${url}`;
};

/**
 * Add transformations to GCS URLs (if supported by your GCS setup)
 * @param {string} url - GCS URL
 * @param {Object} options - Transformation options
 * @returns {string} Transformed GCS URL
 */
const addGCSTransformations = (url, options = {}) => {
  // Note: Basic GCS doesn't support URL-based transformations
  // You would need Cloud CDN + Image API or a service like Cloudinary
  // For now, return the original URL
  return url;
};

/**
 * Get optimized image URL for different use cases
 * @param {string|Object} imageInput - Image input
 * @param {string} size - Size preset (thumbnail, small, medium, large, original)
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (imageInput, size = 'medium') => {
  const sizePresets = {
    thumbnail: { width: 150, height: 150, quality: 80 },
    small: { width: 300, height: 300, quality: 85 },
    medium: { width: 600, height: 400, quality: 85 },
    large: { width: 1200, height: 800, quality: 90 },
    original: {}
  };

  const preset = sizePresets[size] || sizePresets.medium;
  return getImageUrl(imageInput, preset);
};

/**
 * Get responsive image srcSet for different screen sizes
 * @param {string|Object} imageInput - Image input
 * @returns {string} srcSet string for responsive images
 */
export const getResponsiveImageSrcSet = (imageInput) => {
  if (!imageInput) return '';

  const baseUrl = getImageUrl(imageInput);
  if (!baseUrl) return '';

  // For now, return the same URL for all sizes
  // In a production setup with image transformation service, you would generate different sizes
  return `${baseUrl} 1x, ${baseUrl} 2x`;
};

/**
 * Check if an image URL is from GCS
 * @param {string} url - Image URL
 * @returns {boolean} True if GCS URL
 */
export const isGCSUrl = (url) => {
  return typeof url === 'string' && url.includes('storage.googleapis.com');
};

/**
 * Check if an image URL is local
 * @param {string} url - Image URL
 * @returns {boolean} True if local URL
 */
export const isLocalUrl = (url) => {
  return typeof url === 'string' && !url.startsWith('http');
};

/**
 * Extract filename from image URL
 * @param {string|Object} imageInput - Image input
 * @returns {string} Filename
 */
export const getImageFilename = (imageInput) => {
  try {
    if (typeof imageInput === 'object' && imageInput.filename) {
      return imageInput.filename;
    }

    if (typeof imageInput === 'object' && imageInput.originalName) {
      return imageInput.originalName;
    }

    if (typeof imageInput === 'string') {
      return imageInput.split('/').pop();
    }

    return 'unknown';
  } catch (error) {
    return 'unknown';
  }
};

/**
 * Get image storage type
 * @param {string|Object} imageInput - Image input
 * @returns {string} Storage type ('gcs', 'local', 'unknown')
 */
export const getImageStorageType = (imageInput) => {
  try {
    if (typeof imageInput === 'object' && imageInput.storage) {
      return imageInput.storage;
    }

    if (typeof imageInput === 'string') {
      return isGCSUrl(imageInput) ? 'gcs' : 'local';
    }

    return 'unknown';
  } catch (error) {
    return 'unknown';
  }
};

/**
 * Handle image loading errors with fallback
 * @param {Event} event - Image error event
 * @param {string} fallbackUrl - Fallback image URL
 */
export const handleImageError = (event, fallbackUrl = '/assets/placeholder.jpg') => {
  if (event.target.src !== fallbackUrl) {
    event.target.src = fallbackUrl;
  }
};

/**
 * Preload important images
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    if (url) {
      const img = new Image();
      img.src = getImageUrl(url);
    }
  });
};

export default {
  getImageUrl,
  getOptimizedImageUrl,
  getResponsiveImageSrcSet,
  isGCSUrl,
  isLocalUrl,
  getImageFilename,
  getImageStorageType,
  handleImageError,
  preloadImages
};