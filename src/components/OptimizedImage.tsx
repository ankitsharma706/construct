import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  priority?: boolean;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  aspectRatio = '16/9',
  priority = false,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate responsive Unsplash or Cloudinary srcset if applicable
  const getResponsiveSrcSet = (originalUrl: string): string | undefined => {
    if (originalUrl.includes('images.unsplash.com')) {
      const baseUrl = originalUrl.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&q=80&w=480 480w,
              ${baseUrl}?auto=format&fit=crop&q=80&w=800 800w,
              ${baseUrl}?auto=format&fit=crop&q=80&w=1200 1200w,
              ${baseUrl}?auto=format&fit=crop&q=80&w=1600 1600w`;
    }
    return undefined;
  };

  const srcSet = getResponsiveSrcSet(src);

  return (
    <div
      className={`relative overflow-hidden bg-linen/50 ${className}`}
      style={{
        aspectRatio: aspectRatio,
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto',
      }}
    >
      <img
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-espresso/5 animate-pulse"
        />
      )}
    </div>
  );
}

