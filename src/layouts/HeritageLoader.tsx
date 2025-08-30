import React, { useEffect, useState } from "react";

interface ElegantHeritageLoaderProps {
  isLoading: boolean;
  logoSrc: string;
  text?: string;
  minDisplayTime?: number;
}

const ElegantHeritageLoader: React.FC<ElegantHeritageLoaderProps> = ({
  isLoading,
  logoSrc,
  text = "Welcome to Heritage",
  minDisplayTime = 800
}) => {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      setShowLoader(true);
    } else {
      timer = setTimeout(() => {
        setShowLoader(false);
      }, minDisplayTime);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, minDisplayTime]);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      
      {/* Logo with enhanced fading animation */}
      <img
        src={logoSrc}
        alt={text}
        className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
        style={{
          animation: 'logoFade 4s ease-in-out infinite'
        }}
      />

      {/* Loading text with animated dots */}
      <div className="mt-8 flex items-center space-x-1">
        <span className="text-lg sm:text-xl font-light tracking-wider text-gray-700">
          Loading
        </span>
        <div className="flex space-x-1">
          <span 
            className="text-lg sm:text-xl font-light text-gray-700"
            style={{ animation: 'dotFade 1.5s ease-in-out infinite 0s' }}
          >
            .
          </span>
          <span 
            className="text-lg sm:text-xl font-light text-gray-700"
            style={{ animation: 'dotFade 1.5s ease-in-out infinite 0.5s' }}
          >
            .
          </span>
          <span 
            className="text-lg sm:text-xl font-light text-gray-700"
            style={{ animation: 'dotFade 1.5s ease-in-out infinite 1s' }}
          >
            .
          </span>
        </div>
      </div>

      <style>{`
        @keyframes logoFade {
          0% { opacity: 0.2; }
          25% { opacity: 0.4; }
          50% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0.2; }
        }

        @keyframes dotFade {
          0%, 60%, 100% { opacity: 0.3; }
          30% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ElegantHeritageLoader;