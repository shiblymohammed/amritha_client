import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../LazyImage';

// =================================================================
// == SVG ICONS
// =================================================================
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);



// =================================================================
// == DATA STRUCTURES
// =================================================================
interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}





const SectionHeader: React.FC<{ subtitle: string; title: string; description: string; }> = ({ subtitle, title, description }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <motion.div
      className="text-center mb-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.p
        variants={itemVariants}
        className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium"
      >
        {subtitle}
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-h2 font-playfair text-text-heading mb-6 relative inline-block"
      >
        {title}
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></span>
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed mt-8"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

// =================================================================
// == MAIN COMPONENT
// =================================================================
const DiningSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const signatureDishes: Dish[] = [
    { id: 1, name: "Chicken Mushroom Varutharathathu", description: "A classic Keralan curry with toasted coconut.", price: "₹420", image: "/images/Dining/chickenmushroom.jpg" },
    { id: 2, name: "Niagara Chicken", description: "A fiery and tangy dry chicken preparation.", price: "₹380", image: "/images/Dining/niagrachicken.jpg" },
    { id: 3, name: "Beef Ularthiyathu", description: "Slow-roasted beef with fried coconut slivers.", price: "₹450", image: "/images/Dining/beefularthiyathu.jpg" },
    { id: 4, name: "Meen Pollichathu", description: "Spiced fish wrapped in banana leaf and pan-fried.", price: "₹520", image: "/images/Dining/meenpollichathu.jpg" },
    { id: 5, name: "Prawn Mango Curry", description: "A coastal curry balancing sweet and tangy flavors.", price: "₹480", image: "/images/Dining/prawnmango.jpg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % signatureDishes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [signatureDishes.length]);

  const getCardPosition = (index: number) => {
    const offset = index - currentIndex;
    const total = signatureDishes.length;
    
    // Handle circular navigation
    const normalizedOffset = ((offset % total) + total) % total;
    
    if (normalizedOffset === 0) return 'center';
    if (normalizedOffset === 1) return 'right1';
    if (normalizedOffset === 2) return 'right2';
    if (normalizedOffset === total - 1) return 'left1';
    if (normalizedOffset === total - 2) return 'left2';
    return 'hidden';
  };

  // Function to handle Order Now button click
  const handleOrderNow = (dish: Dish) => {
    // Navigate to dining page with dish pre-selected
    navigate('/dining', { 
      state: { 
        preSelectedDish: dish,
        fromSection: 'signature-dishes'
      } 
    });
  };

  return (
    <div className="bg-background">
      {/* ======================= HERO SECTION ======================= */}
      <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/images/Dining/SAJAN-9.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
          >
            Dining
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white"
          >
            Experience the finest blend of traditional Kerala cuisine and colonial elegance in our historic dining spaces
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins font-semibold px-6 py-3 rounded-xl text-base transition-all duration-300 transform hover:scale-105"
          >
            View Our Menu
          </motion.button>
        </div>
      </section>

             {/* ======================= SIGNATURE DISHES SLIDER ======================= */}
       <div className="bg-background-secondary py-24 md:py-32 overflow-hidden">
         <div className="container mx-auto px-6 lg:px-8 pt-16">
          <SectionHeader 
            subtitle="A Taste of Heritage"
            title="A Culinary Journey at The Kohinoor Restaurant"
            description="Once a culinary landmark in Thiruvananthapuram, the Kohinoor brand returns with heritage-style dining at Amritha Heritage. Enjoy authentic Kerala dishes, chef’s specials, and seasonal menus served in our classic dining hall or open-air lawn"
          />
          
                                           {/* Desktop Center-Focused Slider - Smaller */}
            <div className="hidden md:flex justify-center items-center h-[500px] relative max-w-6xl mx-auto overflow-hidden mt-24">
            <motion.div
              className="flex items-center justify-center relative w-full h-full cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -150, right: 150 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100) {
                  setCurrentIndex((prev) => (prev + 1) % signatureDishes.length);
                } else if (info.offset.x > 100) {
                  setCurrentIndex((prev) => (prev - 1 + signatureDishes.length) % signatureDishes.length);
                }
              }}
            >
              <AnimatePresence>
                {signatureDishes.map((dish, index) => {
                  const position = getCardPosition(index);
                  if (position === 'hidden') return null;

                  const variants = {
                    hidden: { x: 0, scale: 0.8, opacity: 0, zIndex: 1 },
                    left2: { x: '-120%', scale: 0.75, opacity: 0.4, zIndex: 2 },
                    left1: { x: '-60%', scale: 0.85, opacity: 0.7, zIndex: 3 },
                    center: { x: 0, scale: 1.1, opacity: 1, zIndex: 4 },
                    right1: { x: '60%', scale: 0.85, opacity: 0.7, zIndex: 3 },
                    right2: { x: '120%', scale: 0.75, opacity: 0.4, zIndex: 2 },
                  };

                  return (
                    <motion.div
                      key={dish.id}
                      variants={variants}
                      initial="hidden"
                      animate={position}
                      exit="hidden"
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute w-[400px] cursor-pointer"
                      onClick={() => setCurrentIndex(index)}
                      whileHover={{ scale: position === 'center' ? 1.12 : 1.03, y: -4, boxShadow: '0 0 20px 0 rgba(212, 162, 118, 0.5)' }}
                    >
                                             <div className="bg-background-tertiary rounded-2xl shadow-heritage-lg border border-border-soft p-6 flex flex-col items-center text-center">
                         <div className="w-48 h-48 rounded-full overflow-hidden -mt-12 border-6 border-background shadow-xl">
                           <LazyImage src={dish.image} alt={dish.name} className="w-full h-full object-cover" placeholderClassName="rounded-full" />
                         </div>
                        <h3 className="font-playfair text-xl text-text-heading mt-6">{dish.name}</h3>
                        <p className="font-cormorant text-text-subtle my-4 text-base flex-grow leading-relaxed max-w-sm">{dish.description}</p>
                        <span className="font-poppins font-semibold text-action-accent text-xl my-3">{dish.price}</span>
                        
                        {/* Order Now Button */}
                        <motion.button
                          onClick={() => handleOrderNow(dish)}
                          whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 20px 0 rgba(212, 162, 118, 0.5)' }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-3 bg-action-accent hover:bg-action-accent-hover text-text-on-color font-poppins font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg text-sm"
                        >
                          Order Now
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

                                           {/* Mobile Swipeable Slider - Smaller */}
            <div className="md:hidden relative h-[550px] overflow-hidden mt-20">
            {/* Mobile Card Stack with Preview */}
            <div className="relative h-full flex items-center justify-center">
              {signatureDishes.map((dish, index) => {
                const isCurrent = index === currentIndex;
                const isNext = index === (currentIndex + 1) % signatureDishes.length;
                const isPrev = index === (currentIndex - 1 + signatureDishes.length) % signatureDishes.length;
                
                if (!isCurrent && !isNext && !isPrev) return null;
                
                const getCardStyle = () => {
                  if (isCurrent) return 'z-20 scale-100 opacity-100';
                  if (isNext) return 'z-10 scale-90 opacity-60 -translate-x-6';
                  if (isPrev) return 'z-10 scale-90 opacity-60 translate-x-6';
                  return 'z-0 scale-75 opacity-0';
                };
                
                return (
                  <motion.div
                    key={dish.id}
                    className={`absolute ${getCardStyle()} transition-all duration-500 ease-out cursor-pointer`}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: isCurrent ? 1.02 : 0.95, y: -4, boxShadow: '0 0 20px 0 rgba(212, 162, 118, 0.5)' }}
                  >
                                         <div className="bg-background-tertiary rounded-2xl shadow-heritage-lg border border-border-soft p-5 flex flex-col items-center text-center w-90 h-90">
                                               <div className="w-60 h-60 rounded-full overflow-hidden -mt-6 border-2 border-background shadow-lg">
                         <LazyImage src={dish.image} alt={dish.name} className="w-full h-full object-cover" placeholderClassName="rounded-full" />
                       </div>
                      <h3 className="font-playfair text-lg text-text-heading mt-4">{dish.name}</h3>
                      <p className="font-cormorant text-text-subtle my-3 text-xs flex-grow leading-relaxed line-clamp-2">{dish.description}</p>
                      <span className="font-poppins font-semibold text-action-accent text-base my-2">{dish.price}</span>
                      
                      {/* Order Now Button for Mobile */}
                      <motion.button
                        onClick={() => handleOrderNow(dish)}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px 0 rgba(212, 162, 118, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 bg-action-accent hover:bg-action-accent-hover text-text-on-color font-poppins font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md text-xs"
                      >
                        Order Now
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Mobile Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {signatureDishes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-action-accent w-6' 
                      : 'bg-action-accent/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <motion.a
              href="dining"
              className="inline-flex items-center gap-3 font-poppins bg-action-primary text-text-on-color px-8 py-4 rounded-lg text-base font-medium transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 20px 0 rgba(44, 62, 80, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Explore The Full Menu <ArrowRightIcon />
            </motion.a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DiningSection;

// Add CSS for line-clamp utility
const styles = `
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
