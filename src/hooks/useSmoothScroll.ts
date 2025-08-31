import { useCallback } from 'react';

interface ScrollOptions {
  offset?: number;
  duration?: number;
  easing?: 'linear' | 'easeInOut' | 'easeOut' | 'easeOutCubic' | 'easeInOutCubic';
}

export const useSmoothScroll = () => {
  const smoothScrollTo = useCallback((target, options = {}) => {
    const {
      offset = 80,
      duration = 1200,
      easing = 'easeOutCubic'
    } = options;

    let targetPosition = 0;
    
    // Handle different target types
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        targetPosition = element.offsetTop - offset;
      }
    } else if (typeof target === 'number') {
      targetPosition = target;
    } else if (target && target.offsetTop !== undefined) {
      targetPosition = target.offsetTop - offset;
    }

    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Easing functions
    const easingFunctions = {
      linear: (t) => t,
      easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      easeOut: (t) => t * (2 - t),
      easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
      easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    };

    const easingFunction = easingFunctions[easing] || easingFunctions.easeOutCubic;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const easedProgress = easingFunction(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  const scrollToTop = useCallback((options = {}) => {
    smoothScrollTo(0, { duration: 1000, ...options });
  }, [smoothScrollTo]);

  const scrollToBottom = useCallback((options = {}) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    smoothScrollTo(maxScroll, { duration: 1500, ...options });
  }, [smoothScrollTo]);

  const scrollToElement = useCallback((selector, options = {}) => {
    smoothScrollTo(selector, options);
  }, [smoothScrollTo]);

  return {
    smoothScrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToElement,
  };
};

export default useSmoothScroll;
