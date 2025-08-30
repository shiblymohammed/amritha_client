import React from 'react';
import { motion } from 'framer-motion';

interface LoaderSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoaderSpinner: React.FC<LoaderSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const logoSize = {
    sm: 40,
    md: 60,
    lg: 80
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer spinning ring */}
        <motion.div
          className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner pulsing ring */}
        <motion.div
          className={`absolute inset-2 border-2 border-gray-100 border-r-blue-400 rounded-full`}
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Amritha Logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0.7 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            width={logoSize[size]}
            height={logoSize[size]}
            viewBox="0 0 100 100"
            className="text-blue-600"
          >
            {/* Amritha Logo Design */}
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            
            {/* Letter 'A' stylized */}
            <motion.path
              d="M30 80 L50 20 L70 80 M35 65 L65 65"
              stroke="url(#logoGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            
            {/* Decorative elements */}
            <motion.circle
              cx="50"
              cy="15"
              r="3"
              fill="url(#logoGradient)"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.circle
              cx="25"
              cy="85"
              r="2"
              fill="url(#logoGradient)"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
            
            <motion.circle
              cx="75"
              cy="85"
              r="2"
              fill="url(#logoGradient)"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default LoaderSpinner;
