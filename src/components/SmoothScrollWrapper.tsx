import { useEffect } from 'react';

const SmoothScrollWrapper = ({ children }) => {
  useEffect(() => {
    // Custom smooth scroll implementation for better control
    const smoothScrollTo = (targetPosition, duration = 1200) => {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smoother animation (ease-out-cubic)
        const ease = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Override default scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      const target = e.target;
      
      // Check if it's an anchor link
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const targetPosition = targetElement.offsetTop - 80; // Account for header
          smoothScrollTo(targetPosition, 1500); // Slow 1.5 second scroll
        }
      }
    };

    // Enhanced wheel scrolling for slower, smoother movement
    let isScrolling = false;
    const handleWheelScroll = (e) => {
      if (isScrolling) return;
      
      // For slower, more controlled scrolling
      if (Math.abs(e.deltaY) > 10) {
        e.preventDefault();
        isScrolling = true;
        
        const scrollAmount = e.deltaY * 0.8; // Reduce scroll speed
        const currentPosition = window.pageYOffset;
        const targetPosition = Math.max(0, 
          Math.min(
            document.documentElement.scrollHeight - window.innerHeight,
            currentPosition + scrollAmount
          )
        );
        
        smoothScrollTo(targetPosition, 600); // Smooth scroll to position
        
        setTimeout(() => {
          isScrolling = false;
        }, 100);
      }
    };

    // Add event listeners
    document.addEventListener('click', handleSmoothScroll);
    
    // Optional: Add wheel scrolling override (uncomment if you want even slower scrolling)
    // document.addEventListener('wheel', handleWheelScroll, { passive: false });

    // Smooth scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Cleanup
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      // document.removeEventListener('wheel', handleWheelScroll);
    };
  }, []);

  // Enhanced smooth scroll for programmatic scrolling
  useEffect(() => {
    // Create a global smooth scroll function
    window.smoothScrollTo = (target, offset = 80) => {
      let targetPosition = 0;
      
      if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) {
          targetPosition = element.offsetTop - offset;
        }
      } else if (typeof target === 'number') {
        targetPosition = target;
      }
      
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = Math.abs(distance) * 0.8; // Dynamic duration based on distance
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / Math.max(duration, 800), 1);
        
        // Smooth easing function
        const ease = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < Math.max(duration, 800)) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    return () => {
      delete window.smoothScrollTo;
    };
  }, []);

  return <div className="smooth-scroll-container">{children}</div>;
};

export default SmoothScrollWrapper;
