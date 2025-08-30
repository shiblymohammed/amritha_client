import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useViewportScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// =================================================================
// == ICONS (No changes)
// =================================================================
const WifiIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>
  </svg>
);
const SpaIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/>
  </svg>
);
const PoolIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
  </svg>
);
const ServiceIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 2-5 10-5-10h10Z"/>
  </svg>
);
const RestaurantIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"/>
  </svg>
);
const GymIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7.01 10.99h10c0-2.76-2.24-5-5-5s-5 2.24-5 5z"/><path d="M12 2v3"/><path d="M8 22h8"/><path d="M12 19v3"/><path d="M7 22a5 5 0 0 1-5-5c0-2.76 2.24-5 5-5v10z"/><path d="M17 12a5 5 0 0 1 5 5c0 2.76-2.24 5-5 5v-10z"/>
  </svg>
);
const TransportIcon = ({ className = "w-8 h-8 text-action-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="2"/><path d="M12 1v6m6 6h6m-6 6v6m-6-6H1"/><circle cx="12" cy="12" r="10"/>
  </svg>
);


// =================================================================
// == DATA STRUCTURES
// =================================================================
interface Room {
  id: number;
  type: string;
  title: string;
  description: string;
  images: string[];
  features: string[];
  size: string;
}

interface Facility {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  highlight: string;
}

// =================================================================
// == PARALLAX BACKGROUND COMPONENT
// =================================================================
const ParallaxBgImage: React.FC = () => {
  const { scrollY } = useViewportScroll();
  // Parallax: move background slower than scroll
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  // Fallback for SSR: useState for initial y
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => setIsClient(true), []);
  
  return (
    <motion.div
      className="absolute inset-0 w-full h-full z-0"
      style={{
        y: isClient ? y : 0,
        backgroundImage: "url(/images/Accommodation/room (1).webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      {/* Fallback img for SEO and visibility */}
      <img
        src="/images/Accommodation/room (1).webp"
        alt="Accommodation Room"
        className="w-full h-full object-cover opacity-0 pointer-events-none select-none"
        loading="eager"
        aria-hidden="true"
        draggable={false}
      />
    </motion.div>
  );
};

// =================================================================
// == MAIN COMPONENT
// =================================================================
const AccommodationSection: React.FC = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  
  // Updated room data with working image paths
  const rooms: Room[] = [
    {
      id: 1,
      type: "Heritage Premium Room",
      title: "The Premium Heritage",
      description: "Spacious, garden-facing rooms with private sit-out areas offering a serene escape into colonial charm and modern luxury.",
      size: "450 sq ft",
      features: ["Colonial Style", "Complimentary Breakfast", "Air Conditioned", "Room Service", "Free Wi-Fi", "Mini Bar"],
      images: ["/images/Accommodation/room (2).webp"],
    },
    {
      id: 2,
      type: "Deluxe Room",
      title: "The Deluxe Retreat",
      description: "Experience comfortable elegance with classic wooden decor, offering a perfect blend of timeless style and contemporary amenities.",
      size: "650 sq ft",
      features: ["Classic Wooden Decor", "Complimentary Breakfast", "Air Conditioned", "Room Service", "Free Wi-Fi", "Mini Bar"],
      images: ["/images/Accommodation/room (3).webp"],
    },
    {
      id: 3,
      type: "Executive Room",
      title: "The Executive Suite",
      description: "Generous space and refined style, perfectly suited for discerning travelers and those planning an extended, comfortable stay.",
      size: "650 sq ft",
      features: ["Extra Space & Style", "Complimentary Breakfast", "Air Conditioned", "Room Service", "Free Wi-Fi", "Mini Bar"],
      images: ["/images/Accommodation/room (4).webp"],
    },
    {
      id: 4,
      type: "Differently Abled Room",
      title: "The Accessible Room",
      description: "A fully accessible, spacious room designed with roll-in showers, enhanced space, and comprehensive safety features.",
      size: "500 sq ft",
      features: ["Wheelchair Accessible", "Roll-in Shower", "Enhanced Space", "Safety Features"],
      images: ["/images/Accommodation/room (5).webp"],
    }
  ];

  const facilities: Facility[] = [
    { icon: WifiIcon, title: "Air-conditioned", description: "Climate-controlled comfort.", highlight: "Climate Control" },
    { icon: SpaIcon, title: "Complimentary Breakfast", description: "Delicious morning spread.", highlight: "Complimentary" },
    { icon: PoolIcon, title: "Free Wi-Fi", description: "High-speed internet access.", highlight: "Free Access" },
    { icon: ServiceIcon, title: "Mini Bar", description: "In-room refreshments.", highlight: "In-Room" },
    { icon: RestaurantIcon, title: "Flat-screen TV", description: "Modern entertainment.", highlight: "Modern Tech" },
    { icon: GymIcon, title: "Room Service", description: "24/7 convenience.", highlight: "24/7" },
    { icon: TransportIcon, title: "Heritage Design", description: "Authentic colonial charm.", highlight: "Heritage" }
  ];
  
  const handleCheckAvailability = (roomId: number) => navigate(`/booking?room=${roomId}`);
  const handleViewDetails = (roomId: number) => navigate(`/accommodation-details/${roomId}`);

  const sliderVariants = {
    enter: (direction: number) => ({ 
      x: direction > 0 ? '100%' : '-100%', 
      opacity: 0,
      scale: 0.98,
      filter: 'blur(2px)'
    }),
    center: { 
      zIndex: 1, 
      x: 0, 
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({ 
      zIndex: 0, 
      x: direction < 0 ? '100%' : '-100%', 
      opacity: 0,
      scale: 0.98,
      filter: 'blur(2px)'
    }),
  };

  const paginate = (newDirection: number) => {
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = rooms.length - 1;
    else if (newIndex >= rooms.length) newIndex = 0;
    setCurrentIndex([newIndex, newDirection]);
  };
  
  const dragX = useMotionValue(0);
  const imageX = useTransform(dragX, [-200, 0, 200], [-25, 0, 25]);
  const swipeThreshold = 50;

  useEffect(() => {
    const headerObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.unobserve(entry.target);
        }
    }, { threshold: 0.2 });
    if (headerRef.current) headerObserver.observe(headerRef.current);
    return () => headerObserver.disconnect();
  }, []);

  // Debug: Log current image path when it changes
  useEffect(() => {
    console.log('Current room image path:', rooms[currentIndex]?.images[0]);
  }, [currentIndex, rooms]);

  return (
    <section className="bg-background overflow-x-hidden">
      
      {/* ======================= HERO SECTION ======================= */}
      {/* Parallax Hero Section for Accommodation */}



      {/* ======================= MAIN CONTENT & SLIDER SECTION ======================= */}
      <div className="relative container mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32">
        <div ref={headerRef} className={`text-center mb-16 md:mb-24 transition-all duration-1000 ease-out ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="font-poppins text-sm tracking-widest text-action-accent uppercase mb-4 font-medium">Heritage Stays</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair text-text-heading mb-6 relative">
            Stay in Colonial Elegance
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
            </h2>
            <p className="text-base md:text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed">
              Our rooms are more than places to sleep—they are a journey into history, uniquely designed with period furniture and modern amenities.
          </p>
        </div>

        {/* --- Slider and Card Container --- */}
        <div className="relative lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
            {/* --- ENHANCED SLIDER (Desktop only) --- */}
            <div className="hidden lg:block lg:col-span-8 xl:col-span-7">
                <div className="relative aspect-[16/10] rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            className="absolute inset-0 w-full h-full"
                            custom={direction}
                            variants={sliderVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ 
                                x: { type: "spring", stiffness: 300, damping: 35, mass: 0.9 }, 
                                opacity: { duration: 0.3, ease: "easeInOut" },
                                scale: { duration: 0.3, ease: "easeOut" },
                                filter: { duration: 0.2, ease: "easeInOut" }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.05}
                            dragTransition={{ bounceStiffness: 800, bounceDamping: 25 }}
                            onDragEnd={(_, { offset, velocity }) => {
                                const swipe = Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 400;
                                if (swipe) {
                                    paginate(offset.x > 0 ? -1 : 1);
                                }
                            }}
                            style={{ x: dragX }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            {/* Background image container to prevent grey flash */}
                            <div 
                                className="absolute inset-0 w-full h-full bg-cover bg-center"
                                style={{ 
                                    backgroundImage: `url(${rooms[currentIndex].images[0]})`,
                                    zIndex: 0
                                }}
                            />
                            
                            <motion.div 
                                className="absolute inset-0 w-full h-full bg-cover bg-center"
                                style={{ 
                                    backgroundImage: `url(${rooms[currentIndex].images[0]})`,
                                    x: imageX,
                                    zIndex: 1
                                }}
                                initial={{ scale: 1.05 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                {/* Enhanced fallback image with loading states */}
                                <img 
                                    src={rooms[currentIndex].images[0]} 
                                    alt={rooms[currentIndex].title}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                    onLoad={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                    }}
                                    onError={(e) => {
                                        console.error('Image failed to load:', rooms[currentIndex].images[0]);
                                        e.currentTarget.style.display = 'none';
                                    }}
                                    style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
                                />
                            </motion.div>
                            
                            {/* Image overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                        </motion.div>
                        
                        {/* Next slide preview (subtle) */}
                        <motion.div 
                            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20"
                            style={{ 
                                backgroundImage: `url(${rooms[(currentIndex + 1) % rooms.length].images[0]})`,
                                backgroundPosition: 'left center',
                                transform: 'translateX(85%)',
                                zIndex: 0
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.15 }}
                            transition={{ duration: 0.5 }}
                        />
                    </AnimatePresence>
                    
                    {/* Enhanced Navigation Buttons */}
                    <motion.button 
                        onClick={() => paginate(-1)} 
                        className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        &#10094;
                    </motion.button>
                    <motion.button 
                        onClick={() => paginate(1)} 
                        className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        &#10095;
                    </motion.button>
                    
                    {/* Slide Counter */}
                    <div className="absolute bottom-4 right-4 z-20 bg-black/30 backdrop-blur-md rounded-full px-3 py-1 text-white text-sm font-medium">
                        {currentIndex + 1} / {rooms.length}
                                    </div>
                            </div>
                          </div>
                         
            {/* --- ENHANCED OVERLAPPING CARD (Desktop only) --- */}
            <div className="hidden lg:block lg:col-span-6 xl:col-span-5 mt-8 lg:mt-0 lg:-ml-32 xl:-ml-40 z-10">
                <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                    transition={{ 
                        duration: 0.5, 
                        delay: 0.2, 
                        ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                    className="bg-background-tertiary/90 backdrop-blur-xl border border-border-soft/50 p-6 md:p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500"
                    whileHover={{ 
                        y: -5, 
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
                    }}
                >
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="font-poppins text-xs md:text-sm tracking-widest text-action-accent uppercase mb-3"
                    >
                        {rooms[currentIndex].type}
                    </motion.p>
                    <motion.h3 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="font-playfair text-3xl md:text-4xl mb-3 leading-tight text-text-heading"
                    >
                        {rooms[currentIndex].title}
                    </motion.h3>
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="font-cormorant text-base md:text-lg mb-6 text-text-subtle h-24"
                    >
                        {rooms[currentIndex].description}
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <motion.button 
                            onClick={() => handleCheckAvailability(rooms[currentIndex].id)}
                            className="font-poppins bg-action-accent hover:bg-action-accent-hover text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 w-full"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Book Now
                        </motion.button>
                        <motion.button 
                            onClick={() => handleViewDetails(rooms[currentIndex].id)}
                            className="font-poppins bg-transparent border-2 border-border-soft text-text-heading hover:bg-border-soft/50 px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 w-full"
                            whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(0,0,0,0.05)' }}
                            whileTap={{ scale: 0.98 }}
                            >
                              View Details
                        </motion.button>
                    </motion.div>
                </motion.div>
                                  </div>
                          </div>
                        
        {/* --- MOBILE SLIDER --- */}
        <div className="lg:hidden relative h-[600px] overflow-hidden mt-12">
            <div className="relative h-full">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        className="absolute inset-0 w-full h-full"
                        custom={direction}
                        variants={sliderVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ 
                            x: { type: "spring", stiffness: 300, damping: 35, mass: 0.9 }, 
                            opacity: { duration: 0.3, ease: "easeInOut" },
                            scale: { duration: 0.3, ease: "easeOut" }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.05}
                        onDragEnd={(_, { offset, velocity }) => {
                            const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 400;
                            if (swipe) {
                                paginate(offset.x > 0 ? -1 : 1);
                            }
                        }}
                    >
                        <div className="bg-background-tertiary rounded-2xl shadow-heritage-lg border border-border-soft mx-4 h-full flex flex-col">
                            {/* Image Section */}
                            <div className="h-[400px] w-full rounded-t-2xl overflow-hidden">
                                <img 
                                    src={rooms[currentIndex].images[0]} 
                                    alt={rooms[currentIndex].title} 
                                    className="w-full h-full object-cover"
                                />
                      </div>

                            {/* Details Section */}
                            <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                                    <p className="font-poppins text-xs tracking-widest text-action-accent uppercase mb-2">
                                        {rooms[currentIndex].type}
                                    </p>
                                    <h3 className="font-playfair text-xl text-text-heading mb-3">
                                        {rooms[currentIndex].title}
                          </h3>
                                    <p className="font-cormorant text-text-subtle text-sm leading-relaxed mb-4">
                                        {rooms[currentIndex].description}
                          </p>
                        </div>

                                <div className="space-y-3">
                                    <motion.button 
                                        onClick={() => handleCheckAvailability(rooms[currentIndex].id)}
                                        className="w-full font-poppins bg-action-accent hover:bg-action-accent-hover text-white px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Book Now
                                    </motion.button>
                                    <motion.button 
                                        onClick={() => handleViewDetails(rooms[currentIndex].id)}
                                        className="w-full font-poppins bg-transparent border-2 border-border-soft text-text-heading hover:bg-border-soft/50 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                            >
                              View Details
                                    </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                </AnimatePresence>
                
                {/* Navigation Buttons for Mobile */}
                <motion.button 
                    onClick={() => paginate(-1)}
                    className="absolute top-1/2 left-2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full text-gray-800 hover:bg-white/30 transition-all duration-300 border border-white/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    &#10094;
                </motion.button>
                <motion.button 
                    onClick={() => paginate(1)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full text-gray-800 hover:bg-white/30 transition-all duration-300 border border-white/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    &#10095;
                </motion.button>
              </div>
              </div>

        {/* --- Enhanced Indicator Dots --- */}
        <div className="flex justify-center gap-3 mt-8">
            {rooms.map((_, index) => (
                <motion.button
                    key={index}
                    onClick={() => setCurrentIndex([index, index > currentIndex ? 1 : -1])}
                    className={`relative rounded-full transition-all duration-300 ${
                        currentIndex === index 
                            ? 'bg-action-accent shadow-lg' 
                            : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Go to slide ${index + 1}`}
                >
                    <motion.div
                        className={`w-3 h-3 rounded-full ${
                            currentIndex === index ? 'bg-white' : 'bg-transparent'
                        }`}
                        initial={false}
                        animate={{
                            scale: currentIndex === index ? [1, 1.2, 1] : 1,
                            transition: { duration: 0.3 }
                        }}
                    />
                    {currentIndex === index && (
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-action-accent"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        />
                    )}
                </motion.button>
            ))}
      </div>

        {/* Explore All Rooms Button */}
        <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
            <motion.button
                onClick={() => navigate('/accommodation')}
                className="group inline-flex items-center gap-3 font-poppins bg-action-accent hover:bg-action-accent-hover text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                <span>Explore All Rooms</span>
                <motion.div
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    whileHover={{ x: 4 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </motion.div>
            </motion.button>
        </motion.div>
        </div>

      {/* ======================= FACILITIES SECTION ======================= */}
      <div className="bg-background-secondary py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 md:mb-20">
            <p className="font-poppins text-sm tracking-widest text-action-accent uppercase mb-4 font-medium">
              Premium Amenities
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair text-text-heading mb-6 relative">
              Exceptional Facilities
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
            </h2>
            <p className="text-base md:text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed">
              Every amenity is thoughtfully designed to enhance your heritage experience with modern luxury and traditional charm.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {facilities.map((facility, index) => (
              <div key={index} className="group relative text-center p-4 bg-background rounded-2xl shadow-heritage hover:shadow-heritage-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-4">
                  <div className="relative p-3 bg-gradient-to-br from-action-accent/10 to-action-primary/10 rounded-xl">
                    <facility.icon className="w-7 h-7 text-action-accent"/>
                   </div>
                 </div>
                <h4 className="text-sm md:text-base font-playfair text-text-heading group-hover:text-action-accent transition-colors duration-300">
                       {facility.title}
                     </h4>
                 <div className="absolute inset-0 rounded-2xl border border-action-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;
