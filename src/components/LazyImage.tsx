import { useState, useRef, useEffect } from 'react';

interface LazyImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  placeholderClassName?: string;
  wrapperClassName?: string;
}

const LazyImage = ({ src, alt, className, placeholderClassName, wrapperClassName, ...props }: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Load images a bit earlier
      }
    );

    const currentRef = imageRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [src]);

  return (
    <div className={`relative ${wrapperClassName || ''}`}>
      {isLoading && (
        <div
          className={`absolute inset-0 bg-background-secondary animate-pulse ${placeholderClassName || ''}`}
        />
      )}
      <img
        {...props}
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className={`${className || ''} transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};

export default LazyImage;
