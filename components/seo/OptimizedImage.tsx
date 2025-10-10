import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
    onError?.();
  };

  // Generate default blur placeholder if not provided
  const defaultBlurDataURL = blurDataURL ||
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

  if (error) {
    // Fallback placeholder for broken images
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-200 text-gray-500',
          className
        )}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      >
        <span className="text-sm">Изображение недоступно</span>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    priority,
    sizes,
    quality,
    placeholder,
    blurDataURL: defaultBlurDataURL,
    onLoad: handleLoad,
    onError: handleError,
    className: cn(
      'duration-700 ease-in-out',
      isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0',
      className
    ),
  };

  if (fill) {
    return (
      <div className="relative overflow-hidden">
        <Image {...imageProps} fill />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <Image {...imageProps} width={width} height={height} />
    </div>
  );
};

// Gallery component for multiple images
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  className?: string;
  itemClassName?: string;
  priority?: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className,
  itemClassName,
  priority = false,
}) => {
  return (
    <div className={cn('grid gap-4', className)}>
      {images.map((image, index) => (
        <OptimizedImage
          key={`${image.src}-${index}`}
          {...image}
          priority={priority && index === 0}
          className={itemClassName}
        />
      ))}
    </div>
  );
};

// Lazy loaded image wrapper
interface LazyImageProps extends Omit<OptimizedImageProps, 'priority'> {
  rootMargin?: string;
  threshold?: number;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  rootMargin = '50px',
  threshold = 0.1,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      {isVisible ? (
        <OptimizedImage {...props} />
      ) : (
        <div
          className={cn(
            'bg-gray-200 animate-pulse',
            props.className
          )}
          style={props.fill ? { position: 'absolute', inset: 0 } : { width: props.width, height: props.height }}
        />
      )}
      <div
        ref={(ref) => {
          if (!ref) return;

          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(ref);
              }
            },
            { rootMargin, threshold }
          );

          observer.observe(ref);
        }}
      />
    </div>
  );
};