import React, { useState, useEffect } from 'react';
import useSmoothScroll from '../hooks/useSmoothScroll';

const FloatingNavigation = ({ sections = [] }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToElement, scrollToTop } = useSmoothScroll();

  // Default sections for the home page
  const defaultSections = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'about-section', label: 'About', icon: '📖' },
    { id: 'accommodation-section', label: 'Rooms', icon: '🏨' },
    { id: 'dining-section', label: 'Dining', icon: '🍽️' },
    { id: 'events-section', label: 'Events', icon: '🎉' },
    { id: 'destinations-section', label: 'Places', icon: '🗺️' },
    { id: 'contact-section', label: 'Contact', icon: '📞' },
  ];

  const navigationSections = sections.length > 0 ? sections : defaultSections;

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Show/hide floating nav based on scroll
      setIsVisible(window.scrollY > 300);
      
      // Find active section
      for (const section of navigationSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationSections]);

  const handleNavClick = (sectionId) => {
    if (sectionId === 'hero') {
      scrollToTop({ duration: 1200, easing: 'easeOutCubic' });
    } else {
      scrollToElement(`#${sectionId}`, { 
        duration: 1200, 
        easing: 'easeOutCubic',
        offset: 80 
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-2 shadow-2xl">
        <div className="flex flex-col space-y-1">
          {navigationSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={`group relative p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                activeSection === section.id
                  ? 'bg-accent-gold text-white shadow-golden-glow'
                  : 'text-gray-600 hover:bg-white/20 hover:text-gray-800'
              }`}
              title={section.label}
            >
              <span className="text-lg">{section.icon}</span>
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {section.label}
              </div>
            </button>
          ))}
        </div>
        
        {/* Scroll to top button */}
        <div className="border-t border-white/20 mt-2 pt-2">
          <button
            onClick={() => scrollToTop({ duration: 1000 })}
            className="w-full p-2 rounded-xl text-gray-600 hover:bg-white/20 hover:text-gray-800 transition-all duration-300 hover:scale-110"
            title="Back to Top"
          >
            <span className="text-lg">⬆️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingNavigation;
