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

  // Set default collection when component mounts
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
    setSelectedCollection(collectionName);
    const collection = menuData.find(c => c.collection === collectionName);
    if (collection && collection.categories.length > 0) {
      setSelectedCategory(collection.categories[0].category);
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="space-y-8 flex flex-col items-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
              {/* Elegant Subtitle */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-600" />
                <span className="font-poppins text-sm tracking-widest text-amber-600 uppercase font-medium">
                  Chef's Selection
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-600" />
              </div>

              {/* Main Heading with floating animation */}
              <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                <h2 
                  className="text-h2 font-playfair text-foreground text-center relative animate-float"
                >
                  Today's Specials
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
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
                                  <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200/20 rounded-2xl shadow-soft-sunlight-lg hover:shadow-golden-glow p-6 lg:p-8 flex flex-col items-center text-center transition-all duration-300 backdrop-blur-sm hover:scale-105 h-[500px] w-full">
                  <div className="w-56 h-56 rounded-full overflow-hidden -mt-16 border-4 border-amber-600/20 shadow-golden-glow flex-shrink-0">
                    <LazyImage 
                      src={special.image} 
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="space-y-8 flex flex-col items-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
              {/* Elegant Subtitle */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-600" />
                <span className="font-poppins text-sm tracking-widest text-amber-600 uppercase font-medium">
                  Menu Highlights
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-600" />
              </div>

              {/* Main Heading with floating animation */}
              <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                <h2 
                  className="text-h2 font-playfair text-foreground text-center relative animate-float"
                >
                  Featured Dishes
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
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
                <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200/20 rounded-2xl shadow-soft-sunlight-lg hover:shadow-golden-glow p-6 lg:p-8 flex flex-col items-center text-center transition-all duration-300 backdrop-blur-sm hover:scale-105 h-[500px] w-full">
                  <div className="w-56 h-56 rounded-full overflow-hidden -mt-16 border-4 border-amber-600/20 shadow-golden-glow flex-shrink-0">
                    <LazyImage 
                      src="/images/Dining/menu/default-dish.jpg"
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="space-y-8 flex flex-col items-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            {/* Elegant Subtitle */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-600" />
              <span className="font-poppins text-sm tracking-widest text-amber-600 uppercase font-medium">
                Culinary Heritage
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-600" />
            </div>

            {/* Main Heading with floating animation */}
            <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
              <h2 
                className="text-h2 font-playfair text-foreground text-center relative animate-float"
              >
                Our Menu
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-8">
              {/* Sidebar Navigation */}
              <div className="w-80 flex-shrink-0">
                <div className="sticky top-8">
                  <div className="space-y-4 mb-8">
                    {/* Elegant Subtitle */}
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-amber-600" />
                      <span className="font-poppins text-xs tracking-widest text-amber-600 uppercase font-medium">
                        Menu Navigation
                      </span>
                      <div className="w-6 h-0.5 bg-gradient-to-l from-transparent to-amber-600" />
                    </div>

                    {/* Main Heading */}
                    <h3 className="text-h3 font-playfair text-foreground text-center relative animate-float">
                      Menu Collections
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {menuData.map((collection) => (
                      <div key={collection.collection} className="mb-4">
                        <button
                          onClick={() => handleCollectionSelect(collection.collection)}
                          className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-2 ${
                            selectedCollection === collection.collection
                              ? 'bg-amber-600 text-white border-amber-800'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{collection.icon}</span>
                            <div>
                              <div className="font-bold">{collection.collection}</div>
                              <div className="text-sm opacity-75">{collection.description}</div>
                            </div>
                          </div>
                        </button>
                        
                        {selectedCollection === collection.collection && (
                          <div className="mt-2 ml-4 space-y-1">
                            {collection.categories.map((category) => (
                              <button
                                key={category.category}
                                onClick={() => handleCategorySelect(category.category)}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-200 border-2 ${
                                  selectedCategory === category.category
                                    ? 'bg-amber-100 text-amber-800 border-amber-600'
                                    : 'text-gray-600 hover:bg-gray-50 border-gray-200'
                                }`}
                              >
                                {category.category}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Menu Content */}
              <div className="flex-1">
                {currentCategory && (
                  <div>
                    <div className="mb-8">
                      <div className="space-y-4 mb-8">
                        {/* Elegant Subtitle */}
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-600" />
                          <span className="font-poppins text-sm tracking-widest text-amber-600 uppercase font-medium">
                            {currentCollection?.collection}
                          </span>
                          <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-600" />
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-h2 font-playfair text-foreground text-center relative animate-float">
                          {currentCategory.category}
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
                        </h2>
                      </div>
                      <div className="h-80 rounded-2xl overflow-hidden">
                        <LazyImage
                          src={currentCategory.image}
                          alt={currentCategory.category}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {currentCategory.items.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 border-2 border-gray-800 hover:shadow-lg transition-shadow duration-300">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                            <span className="text-2xl font-bold text-amber-600 ml-4">
                              {typeof item.price === 'string' ? item.price : `₹${item.price}`}
                            </span>
                          </div>
                          
                          {item.description && (
                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                          
                          {item.variants && (
                            <div className="space-y-2">
                              {item.variants.map((variant, variantIndex) => (
                                <div key={variantIndex} className="flex justify-between items-center text-sm">
                                  <span className="text-gray-700">{variant.name}</span>
                                  <span className="font-semibold text-amber-600">₹{variant.price}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="mt-4 flex justify-end">
                            <Button className="bg-transparent hover:bg-green-800 text-gray-900 hover:text-white px-3 py-1 rounded-lg border-2 border-gray-800 hover:border-green-800 font-semibold text-sm transition-colors duration-300">
                              Add to Table
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-xl text-gray-600">Experiences that speak for themselves</p>
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
              <div key={index} className="bg-white rounded-2xl p-8 border-2 border-gray-800">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Video Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* First Video Section - Video on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Traditional Kerala Fish Curry</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Watch our master chef prepare the authentic Kerala fish curry using traditional 
                methods passed down through generations. Learn the secrets of perfect spice 
                balance and coconut milk preparation.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-amber-600">₹600</span>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 border-2 border-amber-800">
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
              <h2 className="text-4xl font-bold text-gray-900">Amritha Heritage Roast Chicken</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Discover the secret behind our signature roast chicken, prepared with 
                a blend of aromatic spices and slow-cooked to perfection. A dish that 
                has been our pride for decades.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-amber-600">₹450</span>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 border-2 border-amber-800">
                  Order Now
                </Button>
              </div>
            </div>
          </div>

          {/* Third Video Section - Video on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Kohinoor Special Prawns Biryani</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Experience the art of biryani making with our special prawns biryani. 
                Watch as layers of fragrant rice and succulent prawns come together 
                in perfect harmony.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-amber-600">₹650</span>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 border-2 border-amber-800">
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
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Special Occasions</h2>
            <p className="text-xl text-gray-300">Create unforgettable memories with our exclusive dining experiences</p>
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
              <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden border-2 border-gray-600 hover:border-amber-400 transition-colors duration-300">
                <div className="h-64 relative">
                  <LazyImage
                    src={occasion.image}
                    alt={occasion.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{occasion.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{occasion.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-semibold">{occasion.price}</span>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 border-2 border-amber-800">
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
