import React from 'react';

interface SectionSeparatorProps {
  className?: string;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ className }) => (
  <div className={`w-full h-24 ${className || ''}`}>
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
      <path
        d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
        className="fill-current text-background-secondary"
      />
    </svg>
  </div>
);

export default SectionSeparator;
