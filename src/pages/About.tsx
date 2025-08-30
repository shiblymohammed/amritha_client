import { useEffect, useState } from 'react';

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  // Sample image URLs - replace with your actual images
  const roomImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
  const historyImage = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
  const sustainabilityImage = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";

  return (
    <div className="w-full">
      {/* Clean Parallax Hero Image */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={roomImage}
          alt="Resort view"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            transform: `translateY(-${parallaxOffset}px)`,
            willChange: 'transform'
          }}
        />
      </div>

      {/* Main Story Section with Title */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-20">
        <div className="text-center mb-16">
          <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium animate-fade-in-up">
            About Amritha Heritage
          </p>
          <h2 className="text-h2 font-playfair text-text-heading mb-6 relative animate-fade-in-up">
            Thycaud, Thiruvananthapuram
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h3 className="text-h3 font-playfair text-text-heading mb-6">
              From Essenden Bungalow to Heritage Hotel
            </h3>
            <p className="text-body font-cormorant text-text-DEFAULT leading-relaxed mb-6">
              History comes to life in Thiruvananthapuram as another relic of the past undergoes a fabulous makeover, 
              resurrecting the city's glorious past. Amritha Heritage was once known as Essenden Bungalow, the home 
              of Portuguese citizen Eunice Gomez and her husband T. Shivaramasethu Pillai.
            </p>
            <p className="text-body font-cormorant text-text-subtle leading-relaxed mb-6">
              Built in the early 1900s, this five-room structure became part of the Amritha Hotel in the 1950s and has now been 
              converted into a heritage hotel embellished with regal style and colonial opulence. The bungalow incorporates 
              elements of colonial architecture unique to Thiruvithamkoor (Travancore), distinct from the rest of the country.
            </p>
            <p className="text-body font-cormorant text-text-subtle leading-relaxed mb-8">
              Standing in the middle of a large property with gardens, old trees and plants, Amritha Heritage is a landmark 
              in the history and architectural culture of Thiruvananthapuram, offering visitors a nostalgic journey through time.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="text-center">
                <div className="text-h2 font-playfair text-action-accent mb-2">1900s</div>
                <div className="text-sm font-poppins text-text-subtle uppercase tracking-wider">Built Era</div>
              </div>
              <div className="text-center">
                <div className="text-h2 font-playfair text-action-accent mb-2">1950s</div>
                <div className="text-sm font-poppins text-text-subtle uppercase tracking-wider">Joined Amritha</div>
              </div>
              <div className="text-center">
                <div className="text-h2 font-playfair text-action-accent mb-2">5</div>
                <div className="text-sm font-poppins text-text-subtle uppercase tracking-wider">Heritage Rooms</div>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in-up">
            <img
              src={historyImage}
              alt="Resort history"
              className="w-full h-96 object-cover rounded-lg shadow-heritage-lg"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-action-accent rounded-lg -z-10 opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="bg-background-secondary py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">
              Our Heritage
            </p>
            <h2 className="text-h2 font-playfair text-text-heading mb-6">
              The Architecture & Character
            </h2>
            <p className="text-body font-cormorant text-text-subtle max-w-3xl mx-auto">
              Unique colonial architecture of Thiruvithamkoor blended with modern comfort
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group bg-background p-8 rounded-xl shadow-heritage hover:shadow-heritage-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-action-accent transition-colors duration-300">
                <svg className="w-10 h-10 text-action-accent group-hover:text-text-on-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-h4 font-playfair text-text-heading mb-4">Central Hall Design</h3>
              <p className="font-cormorant text-text-DEFAULT leading-relaxed">
                Rooms are ingeniously arranged around a central hall that serves as the dining area, enhanced with indoor courtyards.
              </p>
            </div>
            
            <div className="text-center group bg-background p-8 rounded-xl shadow-heritage hover:shadow-heritage-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-action-accent transition-colors duration-300">
                <svg className="w-10 h-10 text-action-accent group-hover:text-text-on-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 2.5L12 1l1.5 1.5L12 4l-1.5-1.5z" />
                </svg>
              </div>
              <h3 className="text-h4 font-playfair text-text-heading mb-4">Heritage Furniture</h3>
              <p className="font-cormorant text-text-DEFAULT leading-relaxed">
                Each of the five rooms is uniquely styled and furnished with heritage furniture that seamlessly blends with history.
              </p>
            </div>
            
            <div className="text-center group bg-background p-8 rounded-xl shadow-heritage hover:shadow-heritage-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-action-accent transition-colors duration-300">
                <svg className="w-10 h-10 text-action-accent group-hover:text-text-on-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-h4 font-playfair text-text-heading mb-4">Private Verandas</h3>
              <p className="font-cormorant text-text-DEFAULT leading-relaxed">
                Bedrooms offer privacy with individual verandas, reflecting the colonial architecture of Travancore era.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kohinoor Restaurant & Film Heritage Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
              <img
                src={sustainabilityImage}
                alt="Kohinoor Restaurant heritage"
                className="w-full h-96 object-cover rounded-lg shadow-heritage-lg"
              />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-background-tertiary rounded-lg -z-10"></div>
            </div>
            <div className="order-1 md:order-2">
              <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">
                Culinary Heritage
              </p>
              <h2 className="text-h2 font-playfair text-text-heading mb-6">
                Kohinoor Restaurant Returns
              </h2>
              <p className="text-body font-cormorant text-text-DEFAULT leading-relaxed mb-6">
                Amritha was a virtual home for the Malayalam film world in the 1970s, and the Kohinoor Restaurant 
                was a star attraction for all. The old flavours are brought back to life as Kohinoor reopens with 
                a menu that blends European and Indian cuisines.
              </p>
              <p className="text-body font-cormorant text-text-subtle leading-relaxed mb-8">
                Amritha Heritage brings back 'dining on the lawn', the first ever experience in the city. 
                It's a perfect spot to relax over a meal or as an arena for banquets, continuing the legacy 
                of memorable dining experiences.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-action-accent rounded-full mr-4"></div>
                  <span className="font-cormorant text-text-DEFAULT">Malayalam film industry heritage from 1970s</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-action-accent rounded-full mr-4"></div>
                  <span className="font-cormorant text-text-DEFAULT">European and Indian cuisine blend</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-action-accent rounded-full mr-4"></div>
                  <span className="font-cormorant text-text-DEFAULT">First 'dining on the lawn' experience in the city</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-background-tertiary py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">
              The Experience
            </p>
            <h2 className="text-h2 font-playfair text-text-heading mb-6">
              A Glimpse of Capital's Past Splendour
            </h2>
            <p className="text-body font-cormorant text-text-subtle max-w-3xl mx-auto">
              Whether you are a visitor to Thiruvananthapuram or a long-time resident, these rooms give you a glimpse of the capital city's past splendour
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center bg-background p-8 rounded-xl shadow-heritage">
              <div className="w-32 h-32 rounded-full bg-background-secondary mx-auto mb-6 shadow-heritage border-4 border-action-accent flex items-center justify-center">
                <svg className="w-16 h-16 text-action-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 2.5L12 1l1.5 1.5L12 4l-1.5-1.5z" />
                </svg>
              </div>
              <h3 className="text-h4 font-playfair text-text-heading mb-2">Restored Glory</h3>
              <p className="font-poppins text-action-accent text-sm uppercase tracking-wider mb-4">Heritage Preservation</p>
              <p className="font-cormorant text-text-DEFAULT">
                Restored to its glory with needed modifications, the enchanting building now welcomes patrons who appreciate a touch of class.
              </p>
            </div>
            
            <div className="text-center bg-background p-8 rounded-xl shadow-heritage">
              <div className="w-32 h-32 rounded-full bg-background-secondary mx-auto mb-6 shadow-heritage border-4 border-action-accent flex items-center justify-center">
                <svg className="w-16 h-16 text-action-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-h4 font-playfair text-text-heading mb-2">Timeless Value</h3>
              <p className="font-poppins text-action-accent text-sm uppercase tracking-wider mb-4">Architectural Landmark</p>
              <p className="font-cormorant text-text-DEFAULT">
                A landmark representing the timeless value of Thiruvananthapuram, adding to the memory and experience of its bygone glory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <div className="mb-16">
            <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">
              Heritage Features
            </p>
            <h2 className="text-h2 font-playfair text-text-heading mb-6">
              What Makes Us Special
            </h2>
            <p className="text-body font-cormorant text-text-subtle max-w-3xl mx-auto">
              Unique elements that define the Amritha Heritage experience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-background-secondary rounded-lg shadow-heritage hover:shadow-heritage-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">🏛</div>
              <h3 className="font-playfair text-h4 text-text-heading mb-2">Colonial Architecture</h3>
              <p className="font-poppins text-sm text-text-subtle">Travancore Style Heritage</p>
            </div>
            <div className="text-center p-6 bg-background-secondary rounded-lg shadow-heritage hover:shadow-heritage-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="font-playfair text-h4 text-text-heading mb-2">Film Heritage</h3>
              <p className="font-poppins text-sm text-text-subtle">Malayalam Cinema Legacy</p>
            </div>
            <div className="text-center p-6 bg-background-secondary rounded-lg shadow-heritage hover:shadow-heritage-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="font-playfair text-h4 text-text-heading mb-2">Garden Setting</h3>
              <p className="font-poppins text-sm text-text-subtle">Old Trees & Lush Gardens</p>
            </div>
            <div className="text-center p-6 bg-background-secondary rounded-lg shadow-heritage hover:shadow-heritage-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">🍽</div>
              <h3 className="font-playfair text-h4 text-text-heading mb-2">Dining on Lawn</h3>
              <p className="font-poppins text-sm text-text-subtle">City's First Outdoor Dining</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-action-primary text-text-on-color">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-h2 font-playfair mb-6 text-text-on-color">
            Experience Thiruvananthapuram's Heritage
          </h2>
          <p className="text-body font-cormorant mb-8 opacity-90">
            Step into history and experience the nostalgic journey through time at Amritha Heritage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-text-on-color text-action-primary px-8 py-3 rounded-lg font-poppins font-medium hover:bg-background-secondary hover:text-action-primary-hover transition-all duration-300 shadow-heritage hover:shadow-heritage-lg">
              Book Heritage Room
            </button>
            <button className="border-2 border-text-on-color text-text-on-color px-8 py-3 rounded-lg font-poppins font-medium hover:bg-text-on-color hover:text-action-primary transition-all duration-300">
              Visit Kohinoor Restaurant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;