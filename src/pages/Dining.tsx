import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuData, type MenuItem, type MenuCollection, type MenuCategory } from '../components/menuData';
import { useDailySpecials } from '../hooks/useDailySpecials';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
}

interface DailySpecial {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

// =================================================================
// == MODERN SVG ICONS (Single Color Heritage Style)
// =================================================================
const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
    <path d="M12 6v6l4 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SunIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" strokeWidth="1.5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const MoonIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChefHatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L9 9H2l5.5 4L5 20l7-5 7 5-2.5-7L22 9h-7l-3-7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LeafIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M6 3h12l-2 14H8L6 3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 3l2 14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MinusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 15M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5"/>
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5"/>
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5"/>
    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Dining = memo(() => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [currentSpecialIndex, setCurrentSpecialIndex] = useState(0);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [reservationForm, setReservationForm] = useState({
    fullName: '',
    time: '',
    phoneNumber: '',
    email: ''
  });

  // Use the custom hook to fetch daily specials from backend
  const { dailySpecials, loading: dailySpecialsLoading, error: dailySpecialsError } = useDailySpecials();

  // Memoized cart calculations
  const totalItems = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);
  const totalPrice = useMemo(() => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0), [cartItems]);

  // Memoized handlers for performance
  const addToCart = useCallback((item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.name);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        const price = typeof item.price === 'string' 
          ? parseFloat(item.price.split('/')[0].replace('₹', ''))
          : item.price;
        return [...prev, {
          id: item.name,
          name: item.name,
          price: price,
          quantity: 1,
          description: item.description
        }];
      }
    });
    setShowCart(true);
  }, []);

  const updateQuantity = useCallback((itemId: string, change: number) => {
    setCartItems(prev => {
      const newItems = prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      );
      return newItems.filter(item => item.quantity > 0);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setShowCart(false);
  }, []);

  const handleReservationSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation submitted:', { ...reservationForm, selectedDishes: cartItems });
    setShowReservationModal(false);
    setReservationForm({ fullName: '', time: '', phoneNumber: '', email: '' });
    setCartItems([]);
    setShowCart(false);
  }, [reservationForm, cartItems]);

  const handleSpecialSelect = useCallback((index: number) => {
    setCurrentSpecialIndex(index);
  }, []);

  const handlePreviousSpecial = useCallback(() => {
    setCurrentSpecialIndex(prev => prev > 0 ? prev - 1 : dailySpecials.length - 1);
  }, [dailySpecials.length]);

  const handleNextSpecial = useCallback(() => {
    setCurrentSpecialIndex(prev => prev < dailySpecials.length - 1 ? prev + 1 : 0);
  }, [dailySpecials.length]);

  const toggleMenuExpanded = useCallback(() => {
    setMenuExpanded(prev => !prev);
  }, []);

  // Today's specials slider functions
  const getCardPosition = useCallback((index: number) => {
    const diff = (index - currentSpecialIndex + dailySpecials.length) % dailySpecials.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right1';
    if (diff === dailySpecials.length - 1) return 'left1';
    if (diff === 2) return 'right2';
    if (diff === dailySpecials.length - 2) return 'left2';
    return 'hidden';
  }, [currentSpecialIndex, dailySpecials.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Modern Design */}
      <section className="relative h-[80vh] overflow-hidden flex items-center justify-center">
        {/* Background Image with Lazy Loading */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/images/Dining/SAJAN-9.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-6">
          <div className="animate-float" style={{ animationDelay: '0.1s' }}>
            <h1 className="font-cinzel text-6xl md:text-7xl lg:text-8xl mb-6 text-glow-gold">
              Dining at Amritha
            </h1>
          </div>
          <div className="animate-float" style={{ animationDelay: '0.2s' }}>
            <p className="font-cormorant text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90 leading-relaxed">
              Experience the perfect blend of traditional flavors and modern culinary artistry
            </p>
          </div>
          <div className="animate-float" style={{ animationDelay: '0.3s' }}>
            <button className="btn btn-primary px-8 py-4 text-lg font-semibold shadow-golden-glow hover:shadow-golden-glow-sm transform hover:scale-105 active:scale-95">
              ✨ View Our Menu
            </button>
          </div>
        </div>
      </section>

      {/* Intro Section - Kohinoor Restaurant */}
      <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-accent rounded-full animate-float" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-accent rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Main Heading */}
              <div>
                <div className="animate-float" style={{ animationDelay: '0.1s' }}>
                  <p className="font-poppins text-sm tracking-widest text-accent uppercase mb-4 font-medium">
                    Heritage Dining Experience
                  </p>
                </div>
                <div className="animate-float" style={{ animationDelay: '0.2s' }}>
                  <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 relative">
                    A Culinary Journey at The Kohinoor Restaurant
                    <div className="absolute -bottom-2 left-0 w-24 h-0.5 bg-gradient-to-r from-accent to-transparent shadow-golden-glow"></div>
                  </h2>
                </div>
              </div>
              
              {/* Description */}
              <div className="animate-float" style={{ animationDelay: '0.3s' }}>
                <p className="font-cormorant text-lg md:text-xl text-foreground-subtle leading-relaxed">
                  Once a culinary landmark in Thiruvananthapuram, the Kohinoor brand returns with heritage-style dining at Amritha Heritage. Enjoy authentic Kerala dishes, chef's specials, and seasonal menus served in our classic dining hall or open-air lawn.
                </p>
              </div>

              {/* Dining Hours */}
              <div className="animate-float" style={{ animationDelay: '0.4s' }}>
                <div className="bg-background-secondary rounded-2xl p-6 md:p-8 shadow-soft-sunlight border border-border glassmorphic">
                  <h3 className="font-playfair text-xl md:text-2xl text-foreground mb-6 flex items-center gap-3">
                    <ClockIcon />
                    <span className="text-glow-gold">Dining Hours</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { 
                        meal: 'Breakfast', 
                        time: '7:30 AM – 10:30 AM', 
                        icon: <SunIcon />
                      },
                      { 
                        meal: 'Lunch', 
                        time: '12:30 PM – 3:00 PM', 
                        icon: <StarIcon />
                      },
                      { 
                        meal: 'Dinner', 
                        time: '7:00 PM – 10:00 PM', 
                        icon: <MoonIcon />
                      }
                    ].map((schedule, index) => (
                      <div
                        key={schedule.meal}
                        className="flex items-center justify-between p-4 bg-background rounded-xl border border-border hover:border-accent/30 transition-all duration-300 hover-lift animate-float"
                        style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-accent/10 rounded-lg text-accent">
                            {schedule.icon}
                          </div>
                          <span className="font-poppins font-medium text-foreground text-base md:text-lg">
                            {schedule.meal}
                          </span>
                        </div>
                        <span className="font-poppins font-bold text-foreground text-sm md:text-lg text-accent">
                          {schedule.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Images */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Main Restaurant Image */}
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-background-secondary rounded-2xl overflow-hidden shadow-heritage-lg border border-border group hover-lift">
                <img
                  src="/images/Dining/SAJAN-4.webp"
                  alt="Kohinoor Restaurant Main Dining"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/images/Dining/SAJAN-9.webp";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Smaller Accent Image - Hidden on mobile */}
              <div className="hidden sm:block absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-48 h-[200px] md:w-64 md:h-[280px] lg:w-80 lg:h-[320px] bg-background-tertiary rounded-2xl overflow-hidden shadow-heritage-lg border border-border group hover-lift">
                <img
                  src="/images/Dining/kitcheninside.jpg"
                  alt="Kitchen"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/images/Dining/gallery/dish1.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full font-poppins font-semibold text-sm shadow-lg border-2 border-white/20 animate-float">
                <span className="flex items-center gap-2">
                  <StarIcon />
                  Heritage Brand
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 lg:mt-24">
            {[
              {
                icon: <ChefHatIcon />,
                title: "Authentic Kerala Cuisine",
                description: "Traditional recipes passed down through generations"
              },
              {
                icon: <LeafIcon />,
                title: "Fresh Seasonal Menus",
                description: "Chef's specials featuring the finest local ingredients"
              },
              {
                icon: <BuildingIcon />,
                title: "Heritage Ambiance",
                description: "Dine in our restored colonial-style dining spaces"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-background-secondary rounded-2xl shadow-heritage border border-border hover:shadow-heritage-lg transition-all duration-300 group hover-lift animate-float"
                style={{ animationDelay: `${0.8 + (index * 0.1)}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-playfair text-lg md:text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="font-cormorant text-foreground-subtle leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Specials Section */}
      <section className="bg-background-secondary py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-4">
              Today's Specials
            </h2>
            <p className="font-cormorant text-xl text-text-subtle max-w-2xl mx-auto">
              Discover our chef's daily curated selections, featuring the freshest ingredients and seasonal inspirations
            </p>
          </div>

          {/* Loading State */}
          {dailySpecialsLoading && (
            <div className="flex justify-center items-center h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-action-accent mx-auto mb-4"></div>
                <p className="font-cormorant text-lg text-text-subtle">Loading today's specials...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {dailySpecialsError && !dailySpecialsLoading && (
            <div className="flex justify-center items-center h-[400px]">
              <div className="text-center">
                <p className="font-cormorant text-lg text-text-subtle text-red-500 mb-4">
                  {dailySpecialsError}
                </p>
                <p className="font-cormorant text-base text-text-subtle">
                  Showing fallback menu items
                </p>
              </div>
            </div>
          )}

                     {/* Desktop Slider - Only show when there are daily specials */}
           {!dailySpecialsLoading && !dailySpecialsError && dailySpecials.length > 0 && (
             <div className="hidden md:flex justify-center items-center h-[600px] relative max-w-6xl mx-auto overflow-hidden">
               <div className="flex items-center justify-center relative w-full h-full">
                 {dailySpecials.map((dish, index) => {
                   const position = getCardPosition(index);
                   if (position === 'hidden') return null;

                   const getPositionStyles = () => {
                     switch (position) {
                       case 'left2': return 'translate-x-[-140%] scale-75 opacity-40 z-20';
                       case 'left1': return 'translate-x-[-70%] scale-85 opacity-70 z-30';
                       case 'center': return 'translate-x-0 scale-115 opacity-100 z-40';
                       case 'right1': return 'translate-x-[70%] scale-85 opacity-70 z-30';
                       case 'right2': return 'translate-x-[140%] scale-75 opacity-40 z-20';
                       default: return 'translate-x-0 scale-100 opacity-100 z-10';
                     }
                   };

                   return (
                     <div
                       key={dish.id}
                       className={`absolute w-[500px] cursor-pointer transition-all duration-800 ease-out ${getPositionStyles()}`}
                       onClick={() => setCurrentSpecialIndex(index)}
                     >
                       <div className="bg-background-tertiary rounded-3xl shadow-heritage-lg border border-border-soft p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                         <div className="w-64 h-64 rounded-full overflow-hidden -mt-24 border-8 border-background shadow-2xl">
                           <img 
                             src={dish.image} 
                             alt={dish.name} 
                             className="w-full h-full object-cover"
                             loading="lazy"
                           />
                         </div>
                         <h3 className="font-playfair text-2xl text-foreground mt-8">{dish.name}</h3>
                         <p className="font-cormorant text-foreground-subtle my-4 text-lg flex-grow leading-relaxed max-w-sm">{dish.description}</p>
                         <div className="flex items-center gap-4 mt-4">
                           <span className="font-poppins font-semibold text-accent text-2xl">₹{dish.price}</span>
                           <button
                             onClick={(e) => {
                               e.stopPropagation();
                               addToCart(dish as any);
                             }}
                             className="bg-accent hover:bg-accent-hover text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                           >
                             <PlusIcon />
                           </button>
                         </div>
                       </div>
                     </div>
                   );
                 })}
               </div>
             </div>
           )}

                                {/* Mobile Slider - Only show when there are daily specials */}
           {!dailySpecialsLoading && !dailySpecialsError && dailySpecials.length > 0 && (
             <div className="md:hidden relative h-[400px] overflow-hidden">
               <div className="relative h-full flex items-center justify-center">
                 {dailySpecials.map((dish, index) => {
                   const isCurrent = index === currentSpecialIndex;
                   if (!isCurrent) return null;
                   
                   return (
                     <div
                       key={dish.id}
                       className="absolute z-20 scale-100 opacity-100 transition-all duration-500 ease-out cursor-pointer hover:scale-102"
                     >
                       <div className="bg-background-tertiary rounded-2xl shadow-heritage-lg border border-border-soft p-6 flex flex-col items-center text-center w-72 h-80">
                         <div className="w-48 h-48 rounded-full overflow-hidden -mt-16 border-6 border-background shadow-xl">
                           <img 
                             src={dish.image} 
                             alt={dish.name} 
                             className="w-full h-full object-cover"
                             loading="lazy"
                           />
                         </div>
                         <h3 className="font-playfair text-xl text-foreground mt-6">{dish.name}</h3>
                         <p className="font-cormorant text-foreground-subtle my-4 text-sm flex-grow leading-relaxed line-clamp-3">{dish.description}</p>
                         <div className="flex items-center gap-3 mt-2">
                           <span className="font-poppins font-semibold text-accent text-lg">₹{dish.price}</span>
                           <button
                             onClick={() => addToCart(dish as any)}
                             className="bg-accent hover:bg-accent-hover text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                           >
                             <PlusIcon />
                           </button>
                         </div>
                       </div>
                     </div>
                   );
                 })}
               </div>
             
              {/* Mobile Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {dailySpecials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSpecialIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSpecialIndex 
                        ? 'bg-accent w-6' 
                        : 'bg-accent/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Full Menu Section */}
      {/*
        Menu Section with Expand/Shrink Functionality
        - Shrinks to 80vh with overflow-hidden/scroll by default
        - Expand/Shrink button toggles full height
      */}
      {(() => {
        // Use React useState for expand/collapse
        // (Assume React and useState are imported at the top of the file)
        // If not, add: import React, { useState } from 'react';
        const [menuExpanded, setMenuExpanded] = React.useState(false);

        return (
          <section className="py-24 bg-background relative">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-4">
                  Our Complete Menu
                </h2>
                <p className="font-cormorant text-xl text-text-subtle max-w-2xl mx-auto">
                  Explore our extensive collection of culinary delights, from traditional favorites to contemporary creations
                </p>
              </div>

              {/* Menu Card Container with shrink/expand logic */}
              <div
                className={`
                  bg-background-secondary rounded-3xl p-8 lg:p-12 pt-2 lg:pt-4 shadow-2xl border border-border-soft/30
                  transition-all duration-500
                  ${menuExpanded ? '' : 'max-h-[80vh] overflow-hidden relative'}
                `}
                style={{
                  // For smooth scroll on expand
                  overflowY: menuExpanded ? 'visible' : 'auto',
                }}
              >
                {menuData.map((collection, collectionIndex) => (
                  <div key={collection.collection} className="mb-20 last:mb-0">
                    {/* Collection Header - Sticky */}
                    <div className="sticky top-0 z-10 bg-background-secondary rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 mb-8 shadow-lg border border-border-soft/30 -mt-2 lg:-mt-4">
                      <div className="text-center">
                        <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl text-text-heading mb-2 sm:mb-3">
                          {collection.icon} {collection.collection}
                        </h3>
                        <p className="font-cormorant text-sm sm:text-base md:text-lg text-text-subtle max-w-3xl mx-auto">
                          {collection.description}
                        </p>
                      </div>
                    </div>

                    {/* Categories and Menu Items */}
                    {collection.categories.map((category, categoryIndex) => (
                      <div key={category.category} className="mb-16">
                        <div className="flex flex-row gap-4 md:gap-6 lg:gap-8">
                          {/* Category Image */}
                          <div className="w-1/3">
                            <div className="sticky top-40">
                              <div className="bg-background-tertiary rounded-xl overflow-hidden shadow-heritage-lg border border-border-soft">
                                <div className="aspect-square">
                                  <img
                                    src={category.image}
                                    alt={category.category}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-2 sm:p-3 md:p-4">
                                  <h4 className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl text-text-heading mb-1">
                                    {category.category}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="w-2/3">
                            <div className="grid gap-6">
                              {category.items.map((item, itemIndex) => {
                                                                                                  // If item has variants, show each variant individually
                                 if (item.variants && item.variants.length > 0) {
                                   return item.variants.map((variant, variantIndex) => (
                                     <div
                                       key={`${collectionIndex}-${categoryIndex}-${itemIndex}-${variantIndex}`}
                                       className="bg-background-tertiary rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-heritage-md border border-border-soft hover:shadow-heritage-lg transition-all duration-300 animate-fade-in-up"
                                       style={{ animationDelay: `${(itemIndex * 0.1) + (variantIndex * 0.05)}s` }}
                                     >
                                       <div className="flex justify-between items-start gap-4">
                                         <div className="flex-1">
                                           <div className="flex items-start justify-between mb-2">
                                             <h5 className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl text-foreground">
                                               {item.name} - {variant.name}
                                             </h5>
                                             <span className="font-poppins font-semibold text-accent text-sm sm:text-base md:text-lg">
                                               ₹{variant.price}
                                             </span>
                                           </div>
                                           {item.description && (
                                             <p className="font-cormorant text-foreground-subtle text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                                               {item.description}
                                             </p>
                                           )}
                                         </div>
                                         <button
                                           onClick={() => addToCart({
                                             ...item,
                                             name: `${item.name} - ${variant.name}`,
                                             price: variant.price
                                           })}
                                           className="bg-accent hover:bg-accent-hover text-white p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 transform hover:scale-110 flex-shrink-0"
                                         >
                                           <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                           </svg>
                                                                                  </button>
                                        </div>
                                      </div>
                                    ));
                                  }

                                                                                                  // Regular item without variants
                                 const price = typeof item.price === 'string'
                                   ? item.price
                                   : `₹${item.price}`;

                                 return (
                                   <div
                                     key={`${collectionIndex}-${categoryIndex}-${itemIndex}`}
                                     className="bg-background-tertiary rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-heritage-md border border-border-soft hover:shadow-heritage-lg transition-all duration-300 animate-fade-in-up"
                                     style={{ animationDelay: `${itemIndex * 0.1}s` }}
                                   >
                                     <div className="flex justify-between items-start gap-4">
                                       <div className="flex-1">
                                         <div className="flex items-start justify-between mb-2">
                                           <h5 className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl text-foreground">
                                             {item.name}
                                           </h5>
                                           <span className="font-poppins font-semibold text-accent text-sm sm:text-base md:text-lg">
                                             {price}
                                           </span>
                                         </div>
                                         {item.description && (
                                           <p className="font-cormorant text-foreground-subtle text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                                             {item.description}
                                           </p>
                                         )}
                                       </div>
                                       <button
                                         onClick={() => addToCart(item)}
                                         className="bg-accent hover:bg-accent-hover text-white p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 transform hover:scale-110 flex-shrink-0"
                                       >
                                         <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                         </svg>
                                                                                </button>
                                       </div>
                                     </div>
                                   );
                                 })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Expand/Shrink Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setMenuExpanded((prev) => !prev)}
                  className="group inline-flex items-center gap-2 font-poppins bg-action-accent hover:bg-action-accent-hover text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95"
                  aria-expanded={menuExpanded}
                >
                  {menuExpanded ? (
                    <>
                      <span>Shrink Menu</span>
                      <svg className="w-5 h-5 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 15l-7-7-7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Expand Menu</span>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9l7 7 7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Special Experiences Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-background-secondary relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-40 h-40 border border-action-accent rounded-full" />
          <div className="absolute bottom-10 left-10 w-32 h-32 border border-action-accent rounded-full" />
          <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-action-accent rounded-full" />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
                     {/* Section Header */}
           <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
             <p className="font-poppins text-sm tracking-widest text-accent uppercase mb-4 font-medium animate-float" style={{ animationDelay: '0.2s' }}>
               Curated Dining Experiences
             </p>
             <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 relative animate-float" style={{ animationDelay: '0.3s' }}>
               Special Experiences
               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
             </h2>
             <p className="font-cormorant text-lg md:text-xl text-foreground-subtle max-w-3xl mx-auto leading-relaxed animate-float" style={{ animationDelay: '0.4s' }}>
               Discover our exclusive dining experiences designed to create unforgettable moments and cater to your unique preferences
             </p>
           </div>

          {/* Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Candlelight Dinners",
                description: "Intimate dining experiences with soft candlelight, creating the perfect romantic atmosphere for special occasions and memorable evenings.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                gradient: "from-amber-500/20 to-orange-500/20",
                iconBg: "bg-amber-500/10",
                iconColor: "text-amber-600",
                hoverColor: "group-hover:text-amber-600"
              },
              {
                title: "Group Feasts on Request",
                description: "Customized dining experiences for large groups, featuring specially curated menus and dedicated service for celebrations and gatherings.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                gradient: "from-blue-500/20 to-indigo-500/20",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-600",
                hoverColor: "group-hover:text-blue-600"
              },
              {
                title: "Ayurvedic & Vegetarian Diets",
                description: "Specially crafted wellness menus featuring authentic Ayurvedic principles and fresh vegetarian cuisine for health-conscious diners.",
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
                  </svg>
                ),
                gradient: "from-green-500/20 to-emerald-500/20",
                iconBg: "bg-green-500/10",
                iconColor: "text-green-600",
                hoverColor: "group-hover:text-green-600"
              }
            ].map((experience, index) => (
              <div
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Card Container */}
                <div className="relative h-full bg-background rounded-3xl p-8 lg:p-10 shadow-heritage border border-border-soft hover:shadow-heritage-lg transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                  
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex justify-center mb-8 animate-float" style={{ animationDelay: `${0.8 + (index * 0.1)}s` }}>
                      <div className={`p-6 ${experience.iconBg} rounded-2xl ${experience.iconColor} group-hover:bg-white/90 transition-all duration-300 transform group-hover:scale-110`}>
                        {experience.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`font-playfair text-xl md:text-2xl text-foreground mb-6 text-center transition-colors duration-300 ${experience.hoverColor} animate-float`} style={{ animationDelay: `${1.0 + (index * 0.1)}s` }}>
                      {experience.title}
                    </h3>

                    {/* Description */}
                    <p className="font-cormorant text-foreground-subtle leading-relaxed text-center text-base md:text-lg animate-float" style={{ animationDelay: `${1.2 + (index * 0.1)}s` }}>
                      {experience.description}
                    </p>

                    {/* Decorative Element */}
                    <div className="mt-8 mx-auto h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent animate-fade-in-up" style={{ animationDelay: `${1.4 + (index * 0.1)}s` }} />

                    {/* Request Button */}
                    <div className="flex justify-center mt-8 animate-float" style={{ animationDelay: `${1.6 + (index * 0.1)}s` }}>
                      <button 
                        onClick={() => navigate('/contact')}
                        className="group/btn relative inline-flex items-center gap-2 font-poppins bg-transparent border-2 border-accent/30 text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10">Request Experience</span>
                        <svg 
                          className="relative z-10 w-4 h-4 transition-transform group-hover/btn:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))
          </div>

          {/* Call-to-Action */}
          <div className="text-center mt-16 lg:mt-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="bg-background rounded-2xl p-8 md:p-12 shadow-heritage border border-border-soft max-w-4xl mx-auto">
              <h3 className="font-playfair text-2xl md:text-3xl text-foreground mb-4">
                Ready to Create Your Special Experience?
              </h3>
              <p className="font-cormorant text-lg text-foreground-subtle mb-8 leading-relaxed">
                Contact our team to customize your perfect dining experience. Advanced booking recommended for all special experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group inline-flex items-center gap-3 font-poppins bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call to Reserve</span>
                </button>
                <button className="group inline-flex items-center gap-3 font-poppins bg-transparent border-2 border-border-soft text-foreground hover:bg-border-soft/50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Book Online</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-background-secondary py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-4">
              What Our Guests Say
            </h2>
            <p className="font-cormorant text-xl text-text-subtle max-w-2xl mx-auto">
              Discover why diners return time and again to experience our exceptional cuisine
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Food Critic",
                content: "The flavors at Amritha are simply extraordinary. Each dish tells a story of tradition and innovation.",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                role: "Regular Guest",
                content: "I've been coming here for years. The consistency in quality and the warm hospitality never disappoint.",
                rating: 5
              },
              {
                name: "Emily Chen",
                role: "Travel Blogger",
                content: "A culinary journey through Kerala's rich heritage. The seafood dishes are absolutely divine!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-background-tertiary rounded-2xl p-8 shadow-heritage-lg border border-border-soft animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-cormorant text-lg text-text-subtle mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div>
                  <cite className="font-poppins font-semibold text-foreground not-italic">
                    {testimonial.name}
                  </cite>
                  <p className="text-sm text-foreground-subtle">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-4">
              Culinary Gallery
            </h2>
            <p className="font-cormorant text-xl text-text-subtle max-w-2xl mx-auto">
              A visual feast of our most beautiful dishes and memorable moments
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(() => {
              const galleryItems = [
                { type: 'image', src: '/images/Dining/hall.jpg', alt: 'Dining Hall Main View' },
                { type: 'image', src: '/images/Dining/hall2.jpg', alt: 'Dining Hall Interior' },
                { type: 'image', src: '/images/Dining/hall3.jpg', alt: 'Heritage Dining Space' },
                { type: 'video', src: '/videos/dining-ambiance.mp4', alt: 'Dining Ambiance Video' },
                { type: 'image', src: '/images/Dining/hall4.jpg', alt: 'Colonial Style Seating' },
                { type: 'image', src: '/images/Dining/hall5.jpg', alt: 'Traditional Architecture' },
                { type: 'image', src: '/images/Dining/chickenmushroom.jpg', alt: 'Signature Dish' },
                { type: 'video', src: '/videos/chef-cooking.mp4', alt: 'Chef Cooking Video' },
                { type: 'image', src: '/images/Dining/SAJAN-4.webp', alt: 'Kohinoor Experience' },
                { type: 'image', src: '/images/Dining/SAJAN-9.webp', alt: 'Fine Dining Setup' }
              ];

              const [mutedStates, setMutedStates] = React.useState(
                galleryItems.reduce((acc, item, index) => {
                  if (item.type === 'video') acc[index] = true;
                  return acc;
                }, {} as Record<number, boolean>)
              );

              const toggleMute = (index: number) => {
                setMutedStates(prev => ({ ...prev, [index]: !prev[index] }));
              };

              return galleryItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-xl cursor-pointer group animate-fade-in-up ${
                    index === 0 ? 'col-span-2 row-span-2' : ''
                  } ${index === 3 ? 'md:col-span-2' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.type === 'image' ? (
                    <img 
                      src={item.src} 
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        console.warn(`Image failed to load: ${item.src}`);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={item.src}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        autoPlay
                        loop
                        muted={mutedStates[index]}
                        playsInline
                        onError={(e) => {
                          console.warn(`Video failed to load: ${item.src}`);
                          // Fallback to placeholder image
                          const fallbackImg = document.createElement('img');
                          fallbackImg.src = '/images/Dining/hall.jpg';
                          fallbackImg.className = 'w-full h-full object-cover';
                          fallbackImg.alt = 'Dining Hall Fallback';
                          e.currentTarget.parentNode?.replaceChild(fallbackImg, e.currentTarget);
                        }}
                      />
                      
                      {/* Video Controls Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            toggleMute(index);
                          }}
                          className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 transform hover:scale-110"
                        >
                          {mutedStates[index] ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Video Indicator */}
                      <div className="absolute top-3 left-3 bg-action-accent text-white px-2 py-1 rounded-full text-xs font-poppins font-medium">
                        VIDEO
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  
                  {/* Image/Video Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-poppins text-sm font-medium">
                      {item.alt}
                    </p>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Sticky Cart Navigation - ENHANCED */}
      <AnimatePresence>
        {showCart && cartItems.length > 0 && (
          <motion.div
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "110%", opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 p-2"
          >
            <div className="relative rounded-2xl border border-border-soft/20 overflow-hidden shadow-2xl">
              {/* Layer 1: Frosted Glass Background */}
              <div className="absolute inset-0 bg-background-secondary/80 backdrop-blur-xl" />
              
              {/* Layer 2: Aurora Glow Effect */}
              <div className="absolute inset-0 opacity-40 mix-blend-soft-light">
                  <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_#5E3A24_0%,_transparent_50%)] animate-aurora" />
              </div>

              {/* Layer 3: Subtle Background Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
              />
              
              {/* Layer 4: Content */}
              <div className="relative container mx-auto px-4 sm:px-6 py-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                  
                  {/* Left side - Cart summary */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="relative">
                      <div className="bg-gradient-to-br from-action-accent to-action-accent-hover text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L4.5 18M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-background-secondary animate-pulse">
                        {getTotalItems()}
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-poppins font-semibold text-text-heading text-lg leading-tight">Your Order</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-poppins text-text-subtle text-sm">
                          Total:
                        </span>
                        <motion.span 
                          key={getTotalPrice()}
                          initial={{ y: 5, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="font-poppins text-action-accent font-bold text-2xl"
                        >
                          ₹{getTotalPrice()}
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center - Item controls */}
                  <div className="flex-1 flex justify-center max-w-full lg:max-w-xl overflow-x-auto py-2">
                    <div className="flex items-center gap-3 px-2">
                      <AnimatePresence>
                        {cartItems.map(item => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="group relative flex-shrink-0"
                          >
                            <div className="bg-background/50 rounded-xl px-3 py-2 shadow-md border border-border-soft/30 hover:border-action-accent/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-40">
                              <span className="font-poppins font-medium text-text-heading text-sm truncate block w-full text-center" title={item.name}>
                                {item.name}
                              </span>
                              <div className="flex items-center justify-center gap-2 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-7 h-7 rounded-md bg-background-secondary hover:bg-red-500/20 text-text-subtle hover:text-red-400 transition-all duration-200 flex items-center justify-center transform group-hover:scale-110"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                </button>
                                <span className="font-poppins font-bold text-action-accent text-lg w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-7 h-7 rounded-md bg-background-secondary hover:bg-green-500/20 text-text-subtle hover:text-green-400 transition-all duration-200 flex items-center justify-center transform group-hover:scale-110"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Right side - Action buttons */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-center gap-3 flex-shrink-0"
                  >
                    <button
                      onClick={() => {
                        setCartItems([]);
                        setShowCart(false);
                      }}
                      className="px-5 py-3 rounded-xl bg-background-tertiary/50 border border-border-soft/30 text-text-subtle hover:text-red-400 hover:border-red-400/50 transition-all duration-300 font-poppins text-sm font-medium transform hover:scale-105"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setShowReservationModal(true)}
                      className="relative group px-6 py-3 bg-gradient-to-r from-action-accent to-action-accent-hover text-white font-poppins font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-150 group-hover:scale-100" />
                      <div className="relative flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span>Reserve Table</span>
                      </div>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reservation Modal */}
      <AnimatePresence>
        {showReservationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowReservationModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background-tertiary rounded-2xl p-8 max-w-md w-full shadow-2xl border border-border-soft"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-playfair text-2xl text-text-heading">Reserve Your Table</h3>
                <button
                  onClick={() => setShowReservationModal(false)}
                  className="text-text-subtle hover:text-text-heading transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div>
                  <label className="block font-poppins font-medium text-text-heading mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reservationForm.fullName}
                    onChange={(e) => setReservationForm(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border-soft bg-background focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block font-poppins font-medium text-text-heading mb-2">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={reservationForm.time}
                    onChange={(e) => setReservationForm(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border-soft bg-background focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block font-poppins font-medium text-text-heading mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={reservationForm.phoneNumber}
                    onChange={(e) => setReservationForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border-soft bg-background focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block font-poppins font-medium text-text-heading mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={reservationForm.email}
                    onChange={(e) => setReservationForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border-soft bg-background focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-action-accent hover:bg-action-accent-hover text-white font-poppins font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Book Table
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dining;