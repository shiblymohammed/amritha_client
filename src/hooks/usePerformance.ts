import { useEffect, useRef } from 'react';
import { trackImagePerformance, trackVideoPerformance, monitorMemoryUsage } from '../utils/performance';

// Hook for tracking image loading performance
export const useImagePerformance = (src: string) => {
  const startTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    startTimeRef.current = performance.now();
  }, []);

  const onLoad = () => {
    if (startTimeRef.current) {
      trackImagePerformance(src, startTimeRef.current);
    }
  };

  return { onLoad };
};

// Hook for tracking video loading performance
export const useVideoPerformance = (src: string) => {
  const startTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    startTimeRef.current = performance.now();
  }, []);

  const onLoadStart = () => {
    startTimeRef.current = performance.now();
  };

  const onCanPlay = () => {
    if (startTimeRef.current) {
      trackVideoPerformance(src, startTimeRef.current);
    }
  };

  return { onLoadStart, onCanPlay };
};

// Hook for monitoring memory usage at intervals
export const useMemoryMonitoring = (interval: number = 30000) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      monitorMemoryUsage();
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval]);
};

// Hook for measuring component render time
export const useRenderPerformance = (componentName: string) => {
  const renderStartRef = useRef<number>(performance.now());

  useEffect(() => {
    renderStartRef.current = performance.now();
  });

  useEffect(() => {
    if (renderStartRef.current) {
      const renderTime = performance.now() - renderStartRef.current;
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
    }
  });
};

// Hook for intersection observer with performance tracking
export const useIntersectionObserver = (
  options?: IntersectionObserverInit
) => {
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Element entered viewport:', entry.target);
        }
      });
    }, options);

    observerRef.current.observe(elementRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options]);

  return elementRef;
};
