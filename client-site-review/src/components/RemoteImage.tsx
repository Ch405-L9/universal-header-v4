import { ImgHTMLAttributes } from 'react';

interface RemoteImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function RemoteImage({ 
  src, 
  alt, 
  priority = false, 
  width, 
  height, 
  className = '', 
  ...props 
}: RemoteImageProps) {
  if (!src.startsWith('http://') && !src.startsWith('https://')) {
    throw new Error(`RemoteImage requires CDN URLs. Got: ${src}\nUse Cloudinary with f_auto,q_auto transforms.`);
  }

  // Enforce Cloudinary optimization
  if (src.includes('cloudinary.com') && !src.includes('f_auto')) {
    console.warn(`Cloudinary URL missing f_auto optimization: ${src}`);
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'auto' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      {...props}
    />
  );
}
