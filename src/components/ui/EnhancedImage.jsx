import React, { useState, useEffect } from 'react';
import { getImageUrl, getOptimizedImageUrl, handleImageError, getImageStorageType } from '../../lib/imageUtils';

/**
 * Enhanced Image component that handles both local and GCS images
 * with loading states, error handling, and optimization
 */
const EnhancedImage = ({
  src,
  alt = '',
  className = '',
  size = 'medium',
  fallbackSrc = '/assets/placeholder.jpg',
  showLoader = true,
  showStorageType = false,
  lazy = true,
  onClick,
  style = {},
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (src) {
      const optimizedUrl = size === 'original' 
        ? getImageUrl(src) 
        : getOptimizedImageUrl(src, size);
      setImageSrc(optimizedUrl);
      setIsLoading(true);
      setHasError(false);
    } else {
      setImageSrc(fallbackSrc);
      setIsLoading(false);
      setHasError(true);
    }
  }, [src, size, fallbackSrc]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (event) => {
    setIsLoading(false);
    setHasError(true);
    handleImageError(event, fallbackSrc);
  };

  const storageType = getImageStorageType(src);

  return (
    <div className={`relative inline-block ${className}`} style={style}>
      {/* Loading Spinner */}
      {showLoader && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Image */}
      <img
        src={imageSrc}
        alt={alt}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        {...props}
      />

      {/* Storage Type Indicator (for debugging) */}
      {showStorageType && !isLoading && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {storageType.toUpperCase()}
        </div>
      )}

      {/* Error State */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded text-gray-500 text-sm">
          Failed to load image
        </div>
      )}
    </div>
  );
};

/**
 * Image Gallery component for multiple images
 */
export const ImageGallery = ({ 
  images = [], 
  className = '',
  imageClassName = '',
  size = 'medium',
  columns = 3,
  showStorageType = false,
  onImageClick
}) => {
  if (!images || images.length === 0) {
    return (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        No images available
      </div>
    );
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid gap-4 ${gridCols[columns] || gridCols[3]} ${className}`}>
      {images.map((image, index) => (
        <div key={index} className="aspect-w-4 aspect-h-3">
          <EnhancedImage
            src={image}
            alt={`Image ${index + 1}`}
            className={`w-full h-full object-cover rounded-lg ${imageClassName}`}
            size={size}
            showStorageType={showStorageType}
            onClick={() => onImageClick && onImageClick(image, index)}
          />
        </div>
      ))}
    </div>
  );
};

/**
 * Hero Image component with advanced features
 */
export const HeroImage = ({
  src,
  alt = 'Hero Image',
  className = '',
  overlayClassName = '',
  children,
  showStorageType = false
}) => {
  return (
    <div className={`relative ${className}`}>
      <EnhancedImage
        src={src}
        alt={alt}
        size="large"
        className="w-full h-full object-cover"
        showStorageType={showStorageType}
      />
      
      {/* Overlay */}
      {(children || overlayClassName) && (
        <div className={`absolute inset-0 ${overlayClassName}`}>
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * Avatar component for profile pictures
 */
export const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'medium',
  className = '',
  showOnlineStatus = false,
  isOnline = false
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <EnhancedImage
        src={src}
        alt={alt}
        size="thumbnail"
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-200`}
        fallbackSrc="/assets/default-avatar.jpg"
      />
      
      {showOnlineStatus && (
        <div className={`absolute -bottom-0 -right-0 w-3 h-3 rounded-full border-2 border-white ${
          isOnline ? 'bg-green-400' : 'bg-gray-400'
        }`} />
      )}
    </div>
  );
};

export default EnhancedImage;