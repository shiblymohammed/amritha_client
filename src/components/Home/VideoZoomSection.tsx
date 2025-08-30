import React, { useEffect, useRef, useState } from 'react';

const VideoZoomSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through this section
      const scrollTop = -rect.top;
      const scrollRange = sectionHeight - windowHeight;
      
      let progress = 0;
      
      if (scrollTop > 0 && scrollTop < scrollRange) {
        progress = scrollTop / scrollRange;
      } else if (scrollTop >= scrollRange) {
        progress = 1;
      }
      
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate image scale and position based on scroll progress
  const getImageStyle = () => {
    // Start small (20% of screen) and gradually scale to full screen
    // Phase 1: 0-0.7 - Image scales from small to full screen
    // Phase 2: 0.7-1.0 - Image stays full screen (hold phase)
    
    let scale, borderRadius;
    
    if (scrollProgress <= 0.7) {
      // Scaling phase: starts at 20% and scales to 100%
      const phaseProgress = scrollProgress / 0.7;
      scale = 0.2 + (phaseProgress * 0.8); // 0.2 to 1.0
      borderRadius = 24 - (phaseProgress * 24); // 24px to 0px
    } else {
      // Hold at full screen phase
      scale = 1;
      borderRadius = 0;
    }

    return {
      transform: `scale(${scale})`,
      borderRadius: `${borderRadius}px`,
    };
  };

  return (
    <div
      ref={sectionRef}
      className="relative h-[300vh] bg-primary-bg" // 3x viewport height for scroll effect
      data-section="video-zoom"
    >
      {/* Sticky container for video */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Video container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            background: scrollProgress > 0.8 ? 'transparent' : 'transparent',
          }}
        >
          <video
            className="w-full h-full object-cover transition-all duration-100 ease-out"
            style={getImageStyle()}
            src="/videos/hero2.mp4"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/hero2.mp4" type="video/mp4" />
            {/* Fallback content if video is not supported */}
          </video>

          {/* Optional overlay for better text readability during transition */}
          <div 
            className="absolute inset-0 bg-black transition-opacity duration-300"
            style={{
              opacity: scrollProgress < 0.2 ? 0.2 : 0,
            }}
          />

          {/* Optional content overlay */}
          {scrollProgress < 0.6 && (
            <div 
              className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300"
              style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
            >
              <div className="text-center text-white">
                <h3 className="text-2xl md:text-4xl font-light mb-4 tracking-wide">
                  Discover Niraya
                </h3>
                <p className="text-lg md:text-xl font-light opacity-80">
                  Experience luxury like never before
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Debug info (remove in production) */}
      <div className="fixed top-20 right-4 bg-black/50 text-white p-2 rounded text-sm z-50">
        Progress: {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  );
};

export default VideoZoomSection;