import React, { useState, useEffect, useRef } from 'react';

// =================================================================
// == SVG ICONS
// =================================================================
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);

// =================================================================
// == GEMINI API HELPER COMPONENT
// =================================================================
const MenuHighlight = () => {
    const [highlight, setHighlight] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHighlight = async () => {
            setIsLoading(true);
            const prompt = "You are the head chef at Kohinoor, a fine dining restaurant in a luxury heritage resort in Kerala. Write a single, tantalizing sentence describing tonight's must-try signature dish. Be evocative and use sensory details. For example: 'Tonight, I recommend the Meen Pollichathu, where pearl spot fish is steamed in banana leaves with a secret masala, creating an aroma of coastal tradition.'";

            try {
                let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
                const payload = { contents: chatHistory };
                const apiKey = ""; // API key is handled by the environment
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error("API request failed");

                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

                if (text) {
                    setHighlight(text.trim());
                } else {
                    setHighlight("Discover a taste of heritage, crafted with passion.");
                }
            } catch (error) {
                console.error("Error fetching menu highlight:", error);
                setHighlight("Discover a taste of heritage, crafted with passion.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchHighlight();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-text-on-color/50 rounded-full animate-spin"></div>
                <p className="font-cormorant text-sm text-text-on-color/70 italic">Asking the chef...</p>
            </div>
        );
    }

    return (
        <p className="font-cormorant text-sm text-text-on-color/70 italic mt-2 max-w-xs text-center lg:text-left">
            "{highlight}"
        </p>
    );
};


// =================================================================
// == MAIN COMPONENT
// =================================================================
const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Effect to handle scroll-based style changes for the navbar.
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolled(currentScrollY > 50);

      // Auto-hide logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setIsNavVisible(false);
      } else {
        // Scrolling up
        setIsNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Effect to prevent body scroll when the full-screen menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navBackground = hasScrolled ? 'bg-background-secondary/95 backdrop-blur-sm shadow-heritage-lg' : 'bg-transparent';
  const hamburgerColor = hasScrolled && !isMenuOpen ? 'bg-text-heading' : 'bg-text-on-color';
  const logoSrc = hasScrolled ? '/logoBlack.png' : '/logoWhite.png';

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Heritage Rooms", href: "accommodations" },
    { name: "Kohinoor Dining", href: "dining", hasHighlight: true },
    { name: "About Us", href: "about" },
    { name: "Contact", href: "contact" },
    { name: "Events", href: "contact" },
    { name: "Explore Our Gallery", href: "gallery" },
    { name: "Nearby Locations", href: "destinations" },


  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${navBackground} ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20 md:h-24">
            
            <button
              onClick={toggleMenu}
              className={`relative z-50 w-8 h-8 flex flex-col justify-center items-center transition-transform duration-300 ease-out group ${isMenuOpen ? 'transform rotate-180' : ''}`}
              aria-label="Toggle menu"
            >
              <span className={`block absolute h-0.5 w-full transition-all duration-300 ease-out ${isMenuOpen ? 'bg-text-on-color rotate-45' : hamburgerColor + ' -translate-y-1.5'}`}></span>
              <span className={`block absolute h-0.5 w-full transition-all duration-300 ease-out ${isMenuOpen ? 'bg-text-on-color -rotate-45' : hamburgerColor + ' translate-y-1.5'}`}></span>
            </button>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <a href="/" aria-label="Go to Homepage">
                <img 
                  src={logoSrc} 
                  alt="Amritha Heritage Logo" 
                  className="h-8 md:h-10 transition-all duration-300"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x50/3A4A3E/FBF9F6?text=Amritha+Heritage&font=cinzel'; }}
                />
              </a>
            </div>

            <a 
                href="booking"
                className={`font-poppins text-sm font-medium px-6 py-2.5 rounded-lg transition-all duration-300 ease-out whitespace-nowrap hidden sm:block
                ${hasScrolled 
                    ? 'bg-action-primary text-text-on-color hover:bg-action-primary-hover shadow-md' 
                    : 'bg-transparent border-2 border-text-on-color/70 text-text-on-color hover:bg-text-on-color hover:text-text-heading'
                }`}
            >
              Book Now
            </a>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 w-full h-full bg-menu-overlay bg-[url('https://www.transparenttextures.com/patterns/damask.png')] bg-repeat transition-transform duration-700 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container mx-auto px-6 lg:px-8 h-full grid grid-cols-1 lg:grid-cols-2 items-center">
          
          <nav className="flex flex-col items-center lg:items-start">
            {navLinks.map((link, index) => (
              <div key={link.name} className="flex flex-col items-center lg:items-start my-2">
                <a
                  href={link.href}
                  className={`font-playfair text-4xl md:text-6xl text-text-on-color transition-all duration-500 ease-out hover:text-white hover:tracking-widest ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${150 * (index + 1)}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
                {link.hasHighlight && isMenuOpen && (
                    <div className={`transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${150 * (index + 2)}ms` }}>
                        <MenuHighlight />
                    </div>
                )}
              </div>
            ))}
          </nav>

          <div className={`hidden lg:flex flex-col items-start text-left transition-opacity duration-500 ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <h3 className="font-playfair text-h3 text-text-on-color/90 mb-4">About Amritha</h3>
            <p className="font-cormorant text-text-on-color/70 leading-relaxed max-w-md mb-8">
              Once known as Essenden Bungalow, our heritage landmark offers a nostalgic journey through Thiruvananthapuram's glorious past, blending colonial elegance with modern luxury.
            </p>
            <div className="w-24 h-px bg-text-on-color/20 mb-6"></div>
            <div className="flex justify-center space-x-6 text-text-on-color/70">
              <a href="#" className="hover:text-white transition-colors"><InstagramIcon /></a>
              <a href="#" className="hover:text-white transition-colors"><FacebookIcon /></a>
              <a href="#" className="hover:text-white transition-colors"><TwitterIcon /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
