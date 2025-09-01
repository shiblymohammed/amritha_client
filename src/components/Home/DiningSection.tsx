import React, { useState, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../ui/LazyImage';

// =================================================================
// == SVG ICONS
// =================================================================
const ArrowRightIcon = memo(() => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
));

ArrowRightIcon.displayName = 'ArrowRightIcon';

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

// Remove the local LazyImage - using the optimized one from ui folder

// Optimized SectionHeader component with memo and proper animations
const SectionHeader = memo<{ subtitle: string; title: string; description: string; }>(({ subtitle, title, description }) => (
     <div className="text-center mb-16">
     <div className="flex items-center justify-center gap-3 mb-6">
      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent" />
      <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer">
        {subtitle}
      </p>
      <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent" />
    </div>
             <h2 className="text-h2 font-playfair text-foreground mb-6 relative inline-block animate-float">
           {title}
           <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
         </h2>
         <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto leading-relaxed mt-8">
       {description}
     </p>
  </div>
));

SectionHeader.displayName = 'SectionHeader';

// Optimized Dish Card Component
interface DishCardProps {
  dish: Dish;
  onClick: () => void;
  onOrderNow: (dish: Dish) => void;
  className?: string;
  isCenter?: boolean;
  isMobile?: boolean;
}

const DishCard = memo<DishCardProps>(({ dish, onClick, onOrderNow, className = '', isCenter = false, isMobile = false }) => {
  const handleOrderClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onOrderNow(dish);
  }, [dish, onOrderNow]);

  const cardSize = isMobile ? 'w-80 h-96' : 'w-full h-auto';
  const imageSize = isMobile ? 'w-48 h-48' : 'w-56 h-56';
  const imageMargin = isMobile ? '-mt-8' : '-mt-16';
  const textSize = isMobile ? 'text-lg' : 'text-xl';
  const priceSize = isMobile ? 'text-base' : 'text-xl';
  const buttonSize = isMobile ? 'text-xs px-4 py-2' : 'text-sm px-6 py-2';

  return (
    <div 
      className={`${className} ${isCenter ? 'hover:scale-[1.12]' : 'hover:scale-105'} transition-transform duration-300`}
      onClick={onClick}
    >
      <div className={`bg-gradient-to-br from-background via-background-secondary to-background-tertiary border border-border/20 rounded-2xl shadow-soft-sunlight-lg hover:shadow-golden-glow p-6 lg:p-8 flex flex-col items-center text-center transition-all duration-300 backdrop-blur-sm ${cardSize}`}>
                 <div className={`${imageSize} rounded-full overflow-hidden ${imageMargin} border-4 border-accent-gold/20 shadow-golden-glow`}>
                    <LazyImage 
            src={dish.image} 
            alt={dish.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            quality={80}
          />
        </div>
                 <h3 className={`font-playfair ${textSize} text-foreground mt-4 lg:mt-6 animate-text-shimmer`}>
           {dish.name}
         </h3>
                 <p className={`font-cormorant text-foreground-subtle my-3 lg:my-4 ${isMobile ? 'text-xs' : 'text-base'} flex-grow leading-relaxed ${isMobile ? 'line-clamp-2' : 'max-w-sm'}`}>
          {dish.description}
        </p>
                 <span className={`font-poppins font-semibold text-accent ${priceSize} my-2 lg:my-3`}>
           {dish.price}
         </span>
        
        <button
          onClick={handleOrderClick}
          className={`btn btn-primary ${buttonSize} shadow-soft-sunlight hover:shadow-golden-glow transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent`}
        >
          <span className="animate-text-shimmer">
            Order Now
          </span>
        </button>
      </div>
    </div>
  );
});

DishCard.displayName = 'DishCard';

// =================================================================
// == MAIN COMPONENT
// =================================================================
const DiningSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Memoized signature dishes data
  const signatureDishes = useMemo<Dish[]>(() => [
    { id: 1, name: "Chicken Mushroom Varutharathathu", description: "A classic Keralan curry with toasted coconut.", price: "₹420", image: "/images/Dining/chickenmushroom.jpg" },
    { id: 2, name: "Niagara Chicken", description: "A fiery and tangy dry chicken preparation.", price: "₹380", image: "/images/Dining/niagrachicken.jpg" },
    { id: 3, name: "Beef Ularthiyathu", description: "Slow-roasted beef with fried coconut slivers.", price: "₹450", image: "/images/Dining/beefularthiyathu.jpg" },
    { id: 4, name: "Meen Pollichathu", description: "Spiced fish wrapped in banana leaf and pan-fried.", price: "₹520", image: "/images/Dining/meenpollichathu.jpg" },
    { id: 5, name: "Prawn Mango Curry", description: "A coastal curry balancing sweet and tangy flavors.", price: "₹480", image: "/images/Dining/prawnmango.jpg" },
  ], []);

  // Memoized card position calculator
  const getCardPosition = useCallback((index: number) => {
    const offset = index - currentIndex;
    const total = signatureDishes.length;
    const normalizedOffset = ((offset % total) + total) % total;
    
    if (normalizedOffset === 0) return 'center';
    if (normalizedOffset === 1) return 'right1';
    if (normalizedOffset === 2) return 'right2';
    if (normalizedOffset === total - 1) return 'left1';
    if (normalizedOffset === total - 2) return 'left2';
    return 'hidden';
  }, [currentIndex, signatureDishes.length]);

  // Optimized order handler
  const handleOrderNow = useCallback((dish: Dish) => {
    navigate('/dining', { 
      state: { 
        preSelectedDish: dish,
        fromSection: 'signature-dishes'
      } 
    });
  }, [navigate]);

  // Optimized navigation handler for dots
  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleViewMenu = useCallback(() => {
    navigate('/dining');
  }, [navigate]);

  return (
    <div className="bg-gradient-to-br from-background via-background-secondary to-background-tertiary relative overflow-hidden">
             {/* Optimized Background Elements - Removed heavy animations */}
       <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-accent-gold/3" />
       <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/2" />

      {/* ======================= HERO SECTION ======================= */}
      <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
        {/* Optimized Background Image with proper srcset */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/images/Dining/SAJAN-9.webp)' }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />
        
        {/* Content */}
                 <div className="relative z-10 text-center text-foreground-on-color px-6">
          <p className="font-poppins text-xs tracking-widest text-accent-gold uppercase mb-4 font-medium animate-text-shimmer">
            Kohinoor Restaurant
          </p>
                   <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground-on-color animate-float">
           <span className="bg-gradient-to-r from-foreground-on-color to-accent-gold bg-clip-text text-transparent">Heritage</span> Dining
         </h1>
          <p className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-foreground-on-color/90 leading-relaxed">
            Experience the finest blend of traditional Kerala cuisine and colonial elegance in our historic dining spaces
          </p>
                     <button
             onClick={handleViewMenu}
             className="btn btn-primary text-lg px-8 py-4 shadow-golden-glow hover:shadow-golden-glow-sm hover:scale-105 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
           >
            View Our Menu
          </button>
        </div>
      </section>
      
      {/* ======================= SIGNATURE DISHES SLIDER ======================= */}
      <div className="bg-gradient-to-tr from-background-secondary via-background to-background-tertiary py-24 md:py-32 overflow-hidden relative">
                 {/* Optimized Gradient Background - Removed heavy animations */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-accent-gold/2" />

        <div className="container mx-auto px-6 lg:px-8 pt-16">
          <SectionHeader 
            subtitle="A Taste of Heritage"
            title="A Culinary Journey at The Kohinoor Restaurant"
            description="Once a culinary landmark in Thiruvananthapuram, the Kohinoor brand returns with heritage-style dining at Amritha Heritage. Enjoy authentic Kerala dishes, chef's specials, and seasonal menus served in our classic dining hall or open-air lawn"
          />
          
          {/* Desktop Slider */}
          <div className="hidden md:flex justify-center items-center h-[600px] relative max-w-7xl mx-auto overflow-hidden mt-24">
            <div className="flex items-center justify-center relative w-full h-full">
              {signatureDishes.map((dish, index) => {
                const position = getCardPosition(index);
                if (position === 'hidden') return null;

                const transforms = {
                  center: 'translate-x-0 scale-110 z-40 opacity-100',
                  left1: '-translate-x-[65%] scale-90 z-30 opacity-80',
                  left2: '-translate-x-[120%] scale-80 z-20 opacity-60',
                  right1: 'translate-x-[65%] scale-90 z-30 opacity-80',
                  right2: 'translate-x-[120%] scale-80 z-20 opacity-60',
                };

                return (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    onClick={() => setCurrentIndex(index)}
                    onOrderNow={handleOrderNow}
                    className={`absolute w-[450px] cursor-pointer transition-all duration-300 ease-out ${transforms[position as keyof typeof transforms]}`}
                    isCenter={position === 'center'}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden relative h-[650px] overflow-hidden mt-20">
            <div className="relative h-full flex items-center justify-center">
              {signatureDishes.map((dish, index) => {
                const isCurrent = index === currentIndex;
                const isNext = index === (currentIndex + 1) % signatureDishes.length;
                const isPrev = index === (currentIndex - 1 + signatureDishes.length) % signatureDishes.length;
                
                if (!isCurrent && !isNext && !isPrev) return null;
                
                const transforms = {
                  current: 'z-20 scale-100 opacity-100',
                  next: 'z-10 scale-90 opacity-60 -translate-x-6',
                  prev: 'z-10 scale-90 opacity-60 translate-x-6',
                };
                
                const transform = isCurrent ? transforms.current : isNext ? transforms.next : transforms.prev;
                
                return (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    onClick={() => setCurrentIndex(index)}
                    onOrderNow={handleOrderNow}
                    className={`absolute transition-all duration-500 ease-out cursor-pointer ${transform}`}
                    isMobile
                  />
                );
              })}
            </div>
            
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
              {signatureDishes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                                     className={`rounded-full transition-all duration-300 ${
                     index === currentIndex 
                       ? 'w-6 h-2 bg-accent shadow-golden-glow-sm' 
                       : 'w-2 h-2 bg-accent/30 hover:bg-accent/50'
                   }`}
                  aria-label={`Go to dish ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-16 relative z-10">
                         <button 
               onClick={handleViewMenu}
               className="btn btn-primary group inline-flex items-center gap-3 text-lg px-10 py-4 shadow-soft-sunlight-lg hover:shadow-golden-glow animate-float hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent active:scale-95 transition-all duration-300"
             >
              <span className="animate-text-shimmer">
                Explore The Full Menu
              </span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(DiningSection);
