import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteLoader = (loadingTime: number = 800) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loader on route change
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [location.pathname, loadingTime]);

  return { isLoading };
};
