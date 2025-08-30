import React from 'react';

interface ImagePlaceholderProps {
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  text?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  alt, 
  className = "", 
  width = 400, 
  height = 300, 
  text 
}) => {
  return (
    <div 
      className={`bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="text-center text-gray-500">
        <svg 
          className="w-16 h-16 mx-auto mb-2" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
            clipRule="evenodd" 
          />
        </svg>
        <p className="text-sm font-medium">{text || alt}</p>
      </div>
    </div>
  );
};

export default ImagePlaceholder;
