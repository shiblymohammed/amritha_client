import React, { useState, useEffect, useMemo } from 'react';
import { menuData, getRandomFeaturedItems, type MenuItem } from '../components/Dining/Data/menuData';
import { useDailySpecials } from '../hooks/useDailySpecials';
import { Button } from '../components/ui/button';
import LazyImage from '../components/ui/LazyImage';
import LazyVideo from '../components/ui/LazyVideo';

const Dining: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [featuredDishes, setFeaturedDishes] = useState<MenuItem[]>([]);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const { dailySpecials, loading: dailySpecialsLoading } = useDailySpecials();

  // Update featured dishes every 10 minutes
  useEffect(() => {
    const updateFeaturedDishes = () => {
      setFeaturedDishes(getRandomFeaturedItems(6));
    };

    updateFeaturedDishes();
    const interval = setInterval(updateFeaturedDishes, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  // Set first collection to open by default but maintain toggle functionality
  useEffect(() => {
    if (menuData.length > 0 && !selectedCollection) {
      setSelectedCollection(menuData[0].collection);
      if (menuData[0].categories.length > 0) {
        setSelectedCategory(menuData[0].categories[0].category);
      }
    }
  }, [selectedCollection]);

  const currentCollection = useMemo(() => 
    menuData.find(collection => collection.collection === selectedCollection),
    [selectedCollection]
  );

  const currentCategory = useMemo(() => 
    currentCollection?.categories.find(category => category.category === selectedCategory),
    [currentCollection, selectedCategory]
  );

  const handleCollectionSelect = (collectionName: string) => {
    // Toggle the collection - if it's already selected, close it
    if (selectedCollection === collectionName) {
      setSelectedCollection('');
      setSelectedCategory('');
    } else {
      setSelectedCollection(collectionName);
      const collection = menuData.find(c => c.collection === collectionName);
      if (collection && collection.categories.length > 0) {
        setSelectedCategory(collection.categories[0].category);
      }
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  // Placeholder images for Featured Dishes (dummy images for now)
  const featuredPlaceholders = [
    '/images/Dining/niagrachicken.jpg',
    '/images/Dining/meenpollichathu.jpg',
    '/images/Dining/beefularthiyathu.jpg',
    '/images/Dining/chickenmushroom.jpg',
    '/images/Dining/prawnmango.jpg',
    '/images/Dining/niagrachicken.webp'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/images/Dining/hall.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content with CSS animations */}
        <div className="relative z-10 text-center text-white px-6 animate-fadeInUp">
          <p 
            className="font-poppins text-xs tracking-widest text-amber-400 uppercase mb-4 font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]"
          >
            Amritha Heritage
          </p>

          <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-white animate-float"
            >
              Culinary<br />
              <span className="italic bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h1>
          </div>

          <p 
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]"
          >
            Experience the rich flavors of Kerala and beyond in our elegant dining spaces
          </p>

          <button 
            className="btn btn-primary text-lg px-8 py-4 shadow-golden-glow hover:shadow-golden-glow-sm transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.7s_forwards]"
            onClick={() => setIsMenuExpanded(true)}
          >
            ✨ Explore Our Menu
          </button>
        </div>
      </section>

      {/* Daily Specials Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="space-y-8 flex flex-col items-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
              {/* Elegant Subtitle */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                  Chef's Selection
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
              </div>

              {/* Main Heading with floating animation */}
              <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                <h2 
                  className="text-h2 font-playfair text-foreground text-center relative animate-float"
                >
                  Today's Specials
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
                </h2>
              </div>

              {/* Description */}
              <p className="font-cormorant text-body text-foreground-subtle leading-relaxed text-center max-w-xl opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
                Chef's carefully curated dishes for today, featuring the finest ingredients and traditional cooking methods
              </p>

              {/* View Full Menu Button */}
              <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
                <Button 
                  onClick={() => setIsMenuExpanded(true)}
                  className="btn btn-primary text-lg px-8 py-4 shadow-golden-glow hover:shadow-golden-glow-sm transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  View Full Menu
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {dailySpecialsLoading ? (
              <div className="col-span-full text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading today's specials...</p>
              </div>
            ) : (
              dailySpecials.map((special, index) => (
                <div 
                  key={special.id} 
                  className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                  style={{ animationDelay: `${0.8 + index * 0.2}s` }}
                >
                  <div className="bg-gradient-to-br from-background to-background-secondary border border-soft rounded-2xl shadow-soft-sunlight-lg hover:shadow-golden-glow p-6 lg:p-8 flex flex-col items-center text-center transition-all duration-300 backdrop-blur-sm hover:scale-105 h-[500px] w-full">
                    <div className="w-56 h-56 rounded-full overflow-hidden -mt-16 border-4 border-accent/20 shadow-golden-glow flex-shrink-0">
                      <LazyImage 
                        src={special.image || featuredPlaceholders[index % featuredPlaceholders.length]} 
                        alt={special.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        quality={80}
                      />
                    </div>
                    <h3 className="font-playfair text-xl text-foreground mt-4 lg:mt-6 animate-text-shimmer flex-shrink-0">
                      {special.name}
                    </h3>
                    <p className="font-cormorant text-foreground-subtle my-3 lg:my-4 text-base leading-relaxed max-w-sm flex-grow overflow-hidden">
                      {special.description}
                    </p>
                    <span className="font-poppins font-semibold text-accent text-xl my-2 lg:my-3 flex-shrink-0">
                      ₹{special.price}
                    </span>
                    
                    <button
                      className="btn btn-primary text-sm px-6 py-2 shadow-soft-sunlight hover:shadow-golden-glow transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-600 flex-shrink-0"
                    >
                      <span className="animate-text-shimmer">
                        Add to Table
                      </span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="space-y-8 flex flex-col items-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
              {/* Elegant Subtitle */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                  Menu Highlights
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
              </div>

              {/* Main Heading with floating animation */}
              <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                <h2 
                  className="text-h2 font-playfair text-foreground text-center relative animate-float"
                >
                  Featured Dishes
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
                </h2>
              </div>

              {/* Description */}
              <p className="font-cormorant text-body text-foreground-subtle leading-relaxed text-center max-w-xl opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
                Handpicked favorites from our extensive menu, showcasing the best of our culinary heritage
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {featuredDishes.map((dish, index) => (
              <div 
                key={index} 
                className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${0.8 + index * 0.2}s` }}
              >
                <div className="bg-gradient-to-br from-background to-background-secondary border border-soft rounded-2xl shadow-soft-sunlight-lg hover:shadow-golden-glow p-6 lg:p-8 flex flex-col items-center text-center transition-all duration-300 backdrop-blur-sm hover:scale-105 h-[500px] w-full">
                  <div className="w-56 h-56 rounded-full overflow-hidden -mt-16 border-4 border-accent/20 shadow-golden-glow flex-shrink-0">
                    <LazyImage 
                      src={featuredPlaceholders[index % featuredPlaceholders.length]}
                      alt={dish.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      quality={80}
                    />
                  </div>
                  <h3 className="font-playfair text-xl text-foreground mt-4 lg:mt-6 animate-text-shimmer flex-shrink-0">
                    {dish.name}
                  </h3>
                  {dish.description && (
                    <p className="font-cormorant text-foreground-subtle my-3 lg:my-4 text-base leading-relaxed max-w-sm flex-grow overflow-hidden">
                      {dish.description}
                    </p>
                  )}
                  <span className="font-poppins font-semibold text-accent text-xl my-2 lg:my-3 flex-shrink-0">
                    {typeof dish.price === 'string' ? dish.price : `₹${dish.price}`}
                  </span>
                  
                  <button
                    className="btn btn-primary text-sm px-6 py-2 shadow-soft-sunlight hover:shadow-golden-glow transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-600 flex-shrink-0"
                  >
                    <span className="animate-text-shimmer">
                      Add to Table
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Introduction Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="space-y-8 flex flex-col items-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            {/* Elegant Subtitle */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
              <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                Culinary Heritage
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
            </div>

            {/* Main Heading with floating animation */}
            <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
              <h2 
                className="text-h2 font-playfair text-foreground text-center relative animate-float"
              >
                Our Menu
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
              </h2>
            </div>

            {/* Description */}
            <p className="font-cormorant text-body text-foreground-subtle leading-relaxed text-center max-w-xl opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
              Discover our carefully crafted menu featuring authentic Kerala cuisine, 
              continental delights, and international favorites. Each dish is prepared 
              with the finest ingredients and traditional cooking methods.
            </p>

            {/* Button */}
            <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
              <Button 
                onClick={() => setIsMenuExpanded(!isMenuExpanded)}
                className="btn btn-primary text-lg px-8 py-4 shadow-golden-glow hover:shadow-golden-glow-sm transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {isMenuExpanded ? 'Hide Menu' : 'View Full Menu'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Expandable Menu Section */}
      {isMenuExpanded && (
        <section className="py-20 bg-background-secondary relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A57156' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='10' cy='10' r='0.5'/%3E%3Ccircle cx='50' cy='10' r='0.5'/%3E%3Ccircle cx='10' cy='50' r='0.5'/%3E%3Ccircle cx='50' cy='50' r='0.5'/%3E%3Ccircle cx='30' cy='10' r='0.5'/%3E%3Ccircle cx='30' cy='50' r='0.5'/%3E%3Ccircle cx='10' cy='30' r='0.5'/%3E%3Ccircle cx='50' cy='30' r='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="glassmorphic rounded-3xl border border-soft shadow-soft-sunlight-lg p-8 relative overflow-hidden">
              {/* Inner Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 rounded-3xl" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23A57156' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px'
              }} />
              
              <div className="flex gap-8 relative z-10 h-[800px]">
                {/* Sidebar Navigation - Fixed */}
                <div className="w-96 flex-shrink-0">
                  <div className="space-y-4">
                      {menuData.map((collection, collectionIndex) => (
                        <div 
                          key={collection.collection} 
                          className={`card-interactive border border-interactive shadow-heritage hover-lift ${
                            collectionIndex % 2 === 0 ? 'hover-glow' : 'hover-bounce'
                          }`}
                          style={{
                            animationDelay: `${collectionIndex * 0.1}s`
                          }}
                        >
                          {/* Collection Card */}
                          <div className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-cinzel font-bold text-text-heading text-lg mb-2 tracking-wide">
                                  {collection.collection}
                                </div>
                                <div className="font-cormorant text-text-subtle text-base leading-relaxed">
                                  {collection.description}
                                </div>
                              </div>
                              <button
                                onClick={() => handleCollectionSelect(collection.collection)}
                                className="btn btn-ghost p-3 rounded-full border border-interactive bg-background-secondary hover:bg-background-tertiary transition-all duration-300 hover:shadow-golden-glow-sm"
                              >
                                <svg 
                                  className={`w-5 h-5 text-text-subtle transition-all duration-300 ${
                                    selectedCollection === collection.collection ? 'rotate-180 text-accent' : ''
                                  }`} 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          {/* Categories Dropdown */}
                          {selectedCollection === collection.collection && (
                            <div className="px-6 pb-6 animate-slide-down">
                              <div className="max-h-64 overflow-y-auto hide-scrollbar">
                                <div className="grid grid-cols-1 gap-3">
                                  {collection.categories.map((category, categoryIndex) => (
                                    <button
                                      key={category.category}
                                      onClick={() => handleCategorySelect(category.category)}
                                      className={`w-full text-left p-4 rounded-xl border text-base font-poppins font-semibold transition-all duration-300 hover-bounce ${
                                        selectedCategory === category.category
                                          ? 'bg-accent/20 text-accent border-accent/50 shadow-golden-glow-sm text-glow-gold'
                                          : 'bg-background-secondary text-foreground border-border hover:bg-background-tertiary hover:border-interactive hover:shadow-soft-sunlight'
                                      }`}
                                      style={{
                                        animationDelay: `${categoryIndex * 0.05}s`
                                      }}
                                    >
                                      {category.category}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Menu Content - Scrollable */}
                <div className="flex-1 overflow-y-auto hide-scrollbar">
                  {currentCategory && (
                    <div className="animate-fade-in-up">
                      <div className="mb-12">
                        <div className="space-y-6 mb-8">
                          {/* Elegant Subtitle */}
                          <div className="flex items-center justify-center gap-4">
                            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-gradient-flow" />
                            <span className="font-poppins text-sm tracking-widest text-accent uppercase font-semibold text-glow-gold">
                              {currentCollection?.collection}
                            </span>
                            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent via-accent to-transparent animate-gradient-flow" />
                          </div>

                          {/* Main Heading */}
                          <h2 className="text-h2 font-playfair text-text-heading text-center relative animate-float text-glow-primary">
                            {currentCategory.category}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-gradient-flow" />
                          </h2>
                        </div>
                        <div className="h-96 rounded-3xl overflow-hidden shadow-heritage-lg img-overlay hover-glow">
                          <LazyImage
                            src={currentCategory.image}
                            alt={currentCategory.category}
                            className="w-full h-full object-cover transition-all duration-700"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {currentCategory.items.map((item, index) => {
                          // If item has variants, create separate items for each variant
                          if (item.variants && item.variants.length > 0) {
                            return item.variants.map((variant, variantIndex) => (
                              <div 
                                key={`${index}-${variantIndex}`} 
                                className={`card-tilt hover-lift ${
                                  (index + variantIndex) % 3 === 0 ? 'hover-glow' : 
                                  (index + variantIndex) % 3 === 1 ? 'hover-bounce' : 'hover-pulse'
                                }`}
                                style={{
                                  animationDelay: `${(index + variantIndex) * 0.1}s`
                                }}
                              >
                                <div className="p-5">
                                  <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-playfair font-bold text-text-heading tracking-wide">
                                      {item.name} - {variant.name}
                                    </h3>
                                    <span className="font-poppins font-semibold text-accent text-xl ml-4 text-glow-gold">
                                      ₹{variant.price}
                                    </span>
                                  </div>
                                  
                                  {item.description && (
                                    <p className="text-text-subtle mb-4 leading-relaxed font-cormorant text-sm">
                                      {item.description}
                                    </p>
                                  )}
                                  
                                  <div className="flex justify-end">
                                    <Button className="btn btn-primary text-xs px-4 py-2 shadow-heritage hover:shadow-golden-glow transition-all duration-300 hover:scale-105">
                                      Add to Table
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ));
                          } else {
                            // Regular item without variants
                            return (
                              <div 
                                key={index} 
                                className={`card-tilt hover-lift ${
                                  index % 3 === 0 ? 'hover-glow' : 
                                  index % 3 === 1 ? 'hover-bounce' : 'hover-pulse'
                                }`}
                                style={{
                                  animationDelay: `${index * 0.1}s`
                                }}
                              >
                                <div className="p-5">
                                  <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-playfair font-bold text-text-heading tracking-wide">{item.name}</h3>
                                    <span className="font-poppins font-semibold text-accent text-xl ml-4 text-glow-gold">
                                      {typeof item.price === 'string' ? item.price : `₹${item.price}`}
                                    </span>
                                  </div>
                                  
                                  {item.description && (
                                    <p className="text-text-subtle mb-4 leading-relaxed font-cormorant text-sm">
                                      {item.description}
                                    </p>
                                  )}
                                  
                                  <div className="flex justify-end">
                                    <Button className="btn btn-primary text-xs px-4 py-2 shadow-heritage hover:shadow-golden-glow transition-all duration-300 hover:scale-105">
                                      Add to Table
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }).flat()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            {/* Elegant Subtitle */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
              <span className="font-poppins text-sm tracking-widest text-accent uppercase font-semibold">
                Guest Experiences
              </span>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent via-accent to-transparent" />
            </div>
            
            {/* Main Heading */}
            <h2 className="text-h1 font-playfair text-text-heading text-center relative mb-4">
              What Our Guests Say
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </h2>
            <p className="font-cormorant text-text-subtle text-lg leading-relaxed max-w-2xl mx-auto">
              Experiences that speak for themselves
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "London, UK",
                text: "The authentic Kerala flavors transported me back to my travels. The fish curry was absolutely divine!",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                location: "Mumbai, India",
                text: "Amritha's heritage dishes are unmatched. The traditional preparation methods make all the difference.",
                rating: 5
              },
              {
                name: "Emily Chen",
                location: "Singapore",
                text: "From appetizers to desserts, every dish was a masterpiece. The service was impeccable too.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="card-base hover-lift"
              >
                <div className="p-8">
                  {/* Star Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <div className="relative mb-6">
                    <p className="font-cormorant text-text-subtle leading-relaxed text-base text-center italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                  
                  {/* Author Info */}
                  <div className="border-t border-border pt-4 text-center">
                    <div className="font-cinzel font-bold text-text-heading text-lg mb-1">
                      {testimonial.name}
                    </div>
                    <div className="font-poppins text-text-subtle text-sm">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Video Sections */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          {/* First Video Section - Video on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Traditional Kerala Fish Curry</h2>
              <p className="text-lg text-foreground-subtle leading-relaxed">
                Watch our master chef prepare the authentic Kerala fish curry using traditional 
                methods passed down through generations. Learn the secrets of perfect spice 
                balance and coconut milk preparation.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-accent">₹600</span>
                <Button className="btn btn-primary px-6 py-3">
                  Order Now
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <LazyVideo
                src={["/videos/hero2.webm"]}
                className="w-full h-96 object-cover"
                poster="/images/Dining/menu/kerala-main-course.jpg"
              />
            </div>
          </div>

          {/* Second Video Section - Video on Left */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative rounded-2xl overflow-hidden order-2 lg:order-1">
              <LazyVideo
                src={["/videos/hero2.webm"]}
                className="w-full h-96 object-cover"
                poster="/images/Dining/menu/heritage-dishes.avif"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-foreground">Amritha Heritage Roast Chicken</h2>
              <p className="text-lg text-foreground-subtle leading-relaxed">
                Discover the secret behind our signature roast chicken, prepared with 
                a blend of aromatic spices and slow-cooked to perfection. A dish that 
                has been our pride for decades.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-accent">₹450</span>
                <Button className="btn btn-primary px-6 py-3">
                  Order Now
                </Button>
              </div>
            </div>
          </div>

          {/* Third Video Section - Video on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Kohinoor Special Prawns Biryani</h2>
              <p className="text-lg text-foreground-subtle leading-relaxed">
                Experience the art of biryani making with our special prawns biryani. 
                Watch as layers of fragrant rice and succulent prawns come together 
                in perfect harmony.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-accent">₹650</span>
                <Button className="btn btn-primary px-6 py-3">
                  Order Now
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <LazyVideo
                src={["/videos/hero2.webm"]}
                className="w-full h-96 object-cover"
                poster="/images/Dining/menu/regional.webp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Special Occasions Section */}
      <section className="py-20 bg-primary text-foreground-on-color">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Special Occasions</h2>
            <p className="text-xl text-foreground-on-color/80">Create unforgettable memories with our exclusive dining experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Candlelight Dinner",
                description: "Romantic dining experience with soft candlelight and intimate ambiance",
                image: "/images/Dining/varanda1.jpg",
                price: "From ₹2,500 per couple"
              },
              {
                title: "Private Dining Room",
                description: "Exclusive private dining for special celebrations and business meetings",
                image: "/images/Dining/hall2.jpg",
                price: "From ₹5,000 for 8 people"
              },
              {
                title: "Chef's Table Experience",
                description: "Interactive dining experience with our master chef preparing dishes live",
                image: "/images/Dining/kitcheninside.jpg",
                price: "From ₹3,500 per person"
              }
            ].map((occasion, index) => (
              <div key={index} className="bg-background-tertiary rounded-2xl overflow-hidden border-2 border-border hover:border-accent transition-colors duration-300">
                <div className="h-64 relative">
                  <LazyImage
                    src={occasion.image}
                    alt={occasion.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-foreground-on-color">{occasion.title}</h3>
                  <p className="text-foreground-on-color/80 mb-4 leading-relaxed">{occasion.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-semibold">{occasion.price}</span>
                    <Button className="btn btn-primary px-6 py-2">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dining;
