import { useState, useRef, useEffect } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  placeholderClassName?: string;
  wrapperClassName?: string;
}

const LazyVideo = ({ src, className, placeholderClassName, wrapperClassName, ...props }: LazyVideoProps) => {
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoSrc(src);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
      }
    );

    const currentRef = videoRef.current;
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
      {!videoSrc && (
        <div
          className={`absolute inset-0 bg-background-secondary animate-pulse ${placeholderClassName || ''}`}
        />
      )}
      <video
        {...props}
        ref={videoRef}
        src={videoSrc}
        className={className}
      />
    </div>
  );
};

export default LazyVideo;
