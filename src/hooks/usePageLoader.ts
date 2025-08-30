import { useState, useEffect } from 'react';

interface UsePageLoaderOptions {
  initialDelay?: number;
  minLoadingTime?: number;
}

export const usePageLoader = (options: UsePageLoaderOptions = {}) => {
  const { initialDelay = 500, minLoadingTime = 1500 } = options;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    
    // Initial delay to show the loader
    const initialTimer = setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      // Ensure minimum loading time
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    }, initialDelay);

    return () => {
      clearTimeout(initialTimer);
    };
  }, [initialDelay, minLoadingTime]);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return {
    isLoading,
    showLoader,
    hideLoader
  };
};
