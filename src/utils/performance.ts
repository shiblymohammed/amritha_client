// Web Vitals tracking
export const initWebVitals = () => {
  if (typeof window === 'undefined') return;

  const sendToAnalytics = (metric: any) => {
    // Send to your analytics service (Google Analytics, etc.)
    console.log('Web Vital:', metric);
    
    // Example: Send to Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', metric.name, {
        custom_parameter_1: metric.value,
        custom_parameter_2: metric.id,
        custom_parameter_3: metric.name
      });
    }
  };

  // Try to load web-vitals dynamically to prevent build issues
  try {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(sendToAnalytics);
      onFID(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
    }).catch(() => {
      console.warn('Web Vitals not available');
    });
  } catch (error) {
    console.warn('Web Vitals failed to load:', error);
  }
};

// Performance observer for custom metrics
export const observeResourceTiming = () => {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        
        // Log slow resources (> 2 seconds)
        if (resourceEntry.duration > 2000) {
          console.warn('Slow resource detected:', {
            name: resourceEntry.name,
            duration: resourceEntry.duration,
            size: resourceEntry.transferSize,
            type: resourceEntry.initiatorType
          });
        }
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
};

// Image performance tracking
export const trackImagePerformance = (src: string, startTime: number) => {
  const loadTime = performance.now() - startTime;
  
  if (loadTime > 1000) {
    console.warn('Slow image load:', {
      src,
      loadTime: `${loadTime.toFixed(2)}ms`
    });
  }
};

// Video performance tracking
export const trackVideoPerformance = (src: string, startTime: number) => {
  const loadTime = performance.now() - startTime;
  
  if (loadTime > 3000) {
    console.warn('Slow video load:', {
      src,
      loadTime: `${loadTime.toFixed(2)}ms`
    });
  }
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if (!('memory' in performance)) return;

  const memory = (performance as any).memory;
  
  const memoryInfo = {
    usedJSHeapSize: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
    totalJSHeapSize: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
    jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
  };

  console.log('Memory usage:', memoryInfo);
  
  // Warn if memory usage is high (>50MB)
  if (memory.usedJSHeapSize > 50 * 1048576) {
    console.warn('High memory usage detected');
  }
};

// Prefetch critical resources
export const prefetchCriticalResources = () => {
  const criticalResources = [
    '/images/home.webp',
    '/images/home2.webp',
    // Add other critical assets
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = resource;
    document.head.appendChild(link);
  });
};

// Intersection Observer for lazy loading
export const createLazyObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    return null;
  }

  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  });
};

// Performance utility functions
export const measureFunction = <T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T => {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    console.log(`${name} took ${(end - start).toFixed(2)}ms`);
    return result;
  }) as T;
};

// Debounce utility for scroll events
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};

// Throttle utility for frequent events
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
};
