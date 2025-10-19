import React, { useState } from 'react';
import { cn } from '@/utils/cn';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  webpSrc?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
  webpSrc,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (imageError) {
    return (
      <div className={cn('bg-gray-200 flex items-center justify-center text-gray-500', className)}>
        <span>Image not available</span>
      </div>
    );
  }

  return (
    <picture className="block">
      {webpSrc && <source srcSet={webpSrc} sizes={sizes} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onError={handleImageError}
        onLoad={handleImageLoad}
        className={cn(
          'transition-opacity duration-300',
          imageLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </picture>
  );
};

export default ResponsiveImage;
