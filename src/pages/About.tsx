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
    <div className="w-full bg-background">
      {/* Enhanced Parallax Hero with Overlay */}
      <div className="relative h-[70vh] overflow-hidden img-overlay">
        <img
          src={roomImage}
          alt="Resort view"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            transform: `translateY(-${parallaxOffset}px)`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40 animate-gradient-flow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-fade-in-up">
            <p className="font-poppins text-sm tracking-widest text-accent-gold uppercase mb-4 font-medium animate-text-shimmer bg-gradient-to-r from-accent-gold via-white to-accent-gold bg-400% bg-clip-text text-transparent">Heritage Story</p>
            <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-foreground-on-color mb-6 animate-float">
              <span className="bg-gradient-to-r from-foreground-on-color to-accent-gold bg-clip-text text-transparent">About Amritha Heritage</span>
            </h1>
            <p className="font-cormorant text-lg md:text-xl text-foreground-on-color/90 max-w-2xl mx-auto leading-relaxed">From Essenden Bungalow to a timeless heritage experience</p>
          </div>
        </div>
      </div>

      {/* Enhanced Main Story Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-16 pb-20 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        </div>

        <div className="text-center mb-16 relative z-10 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent animate-gradient-flow"></div>
            <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-400% bg-clip-text text-transparent">
              About Amritha Heritage
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent animate-gradient-flow"></div>
          </div>
          <h2 className="text-h2 font-playfair text-foreground mb-6 relative animate-float">
            Thycaud, Thiruvananthapuram
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow"></span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-fade-in-up">
            <h3 className="text-h3 font-playfair text-foreground mb-6 animate-text-shimmer bg-gradient-to-r from-foreground via-accent to-foreground bg-400% bg-clip-text">
              From Essenden Bungalow to Heritage Hotel
            </h3>
            <p className="text-body font-cormorant text-foreground leading-relaxed mb-6 animate-fade-in">
              History comes to life in Thiruvananthapuram as another relic of the past undergoes a fabulous makeover, 
              resurrecting the city's glorious past. Amritha Heritage was once known as Essenden Bungalow, the home 
              of Portuguese citizen Eunice Gomez and her husband T. Shivaramasethu Pillai.
            </p>
            <p className="text-body font-cormorant text-foreground-subtle leading-relaxed mb-6 animate-fade-in">
              Built in the early 1900s, this five-room structure became part of the Amritha Hotel in the 1950s and has now been 
              converted into a heritage hotel embellished with regal style and colonial opulence. The bungalow incorporates 
              elements of colonial architecture unique to Thiruvithamkoor (Travancore), distinct from the rest of the country.
            </p>
            <p className="text-body font-cormorant text-foreground-subtle leading-relaxed mb-8 animate-fade-in">
              Standing in the middle of a large property with gardens, old trees and plants, Amritha Heritage is a landmark 
              in the history and architectural culture of Thiruvananthapuram, offering visitors a nostalgic journey through time.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 animate-fade-in-up">
              <div className="text-center card-base p-6 hover:shadow-golden-glow-sm animate-float">
                <div className="text-h2 font-playfair text-accent mb-2 animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-400% bg-clip-text text-transparent">1900s</div>
                <div className="text-sm font-poppins text-foreground-subtle uppercase tracking-wider">Built Era</div>
              </div>
              <div className="text-center card-base p-6 hover:shadow-golden-glow-sm animate-float">
                <div className="text-h2 font-playfair text-accent mb-2 animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-400% bg-clip-text text-transparent">1950s</div>
                <div className="text-sm font-poppins text-foreground-subtle uppercase tracking-wider">Joined Amritha</div>
              </div>
              <div className="text-center card-base p-6 hover:shadow-golden-glow-sm animate-float">
                <div className="text-h2 font-playfair text-accent mb-2 animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-400% bg-clip-text text-transparent">5</div>
                <div className="text-sm font-poppins text-foreground-subtle uppercase tracking-wider">Heritage Rooms</div>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in-up">
            <div className="card-base overflow-hidden img-overlay hover:shadow-golden-glow-sm group">
              <img
                src={historyImage}
                alt="Resort history"
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-gold rounded-lg -z-10 opacity-20 animate-float shadow-golden-glow-sm"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Architecture Section */}
      <section className="bg-background-secondary py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 heritage-pattern opacity-5"></div>
        
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent animate-gradient-flow"></div>
              <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-400% bg-clip-text text-transparent">
                Our Heritage
              </p>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent animate-gradient-flow"></div>
            </div>
            <h2 className="text-h2 font-playfair text-foreground mb-6 animate-float">
              The Architecture & Character
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow"></span>
            </h2>
            <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto animate-fade-in">
              Unique colonial architecture of Thiruvithamkoor blended with modern comfort
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-base text-center group p-8 hover:shadow-golden-glow-sm transition-all duration-300 hover:-translate-y-2 animate-fade-in-up">
              <div className="w-20 h-20 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors duration-300 shadow-soft-sunlight group-hover:shadow-golden-glow animate-float">
                <svg className="w-10 h-10 text-accent group-hover:text-foreground-on-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-h4 font-playfair text-foreground mb-4 group-hover:text-accent transition-colors duration-300">Central Hall Design</h3>
              <p className="font-cormorant text-foreground-subtle leading-relaxed">
                Rooms are ingeniously arranged around a central hall that serves as the dining area, enhanced with indoor courtyards.
              </p>
            </div>
            
            <div className="card-base text-center group p-8 hover:shadow-golden-glow-sm transition-all duration-300 hover:-translate-y-2 animate-fade-in-up">
              <div className="w-20 h-20 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors duration-300 shadow-soft-sunlight group-hover:shadow-golden-glow animate-float">
                <svg className="w-10 h-10 text-accent group-hover:text-foreground-on-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 2.5L12 1l1.5 1.5L12 4l-1.5-1.5z" />
                </svg>
              </div>
              <h3 className="text-h4 font-playfair text-foreground mb-4 group-hover:text-accent transition-colors duration-300">Heritage Furniture</h3>
              <p className="font-cormorant text-foreground-subtle leading-relaxed">
                Each of the five rooms is uniquely styled and furnished with heritage furniture that seamlessly blends with history.
              </p>
            </div>
            
            <div className="card-base text-center group p-8 hover:shadow-golden-glow-sm transition-all duration-300 hover:-translate-y-2 animate-fade-in-up">
              <div className="w-20 h-20 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors duration-300 shadow-soft-sunlight group-hover:shadow-golden-glow animate-float">
                <svg className="w-10 h-10 text-accent group-hover:text-foreground-on-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-h4 font-playfair text-foreground mb-4 group-hover:text-accent transition-colors duration-300">Private Verandas</h3>
              <p className="font-cormorant text-foreground-subtle leading-relaxed">
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
            <div className="order-1 md:order-2 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent animate-gradient-flow"></div>
                <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-400% bg-clip-text text-transparent">
                  Culinary Heritage
                </p>
              </div>
              <h2 className="text-h2 font-playfair text-foreground mb-6 animate-float">
                Kohinoor Restaurant Returns
                <span className="absolute -bottom-2 left-0 w-24 h-0.5 bg-gradient-to-r from-accent-gold to-transparent shadow-golden-glow"></span>
              </h2>
              <p className="text-body font-cormorant text-foreground leading-relaxed mb-6 animate-fade-in">
                Amritha was a virtual home for the Malayalam film world in the 1970s, and the Kohinoor Restaurant 
                was a star attraction for all. The old flavours are brought back to life as Kohinoor reopens with 
                a menu that blends European and Indian cuisines.
              </p>
              <p className="text-body font-cormorant text-foreground-subtle leading-relaxed mb-8 animate-fade-in">
                Amritha Heritage brings back 'dining on the lawn', the first ever experience in the city. 
                It's a perfect spot to relax over a meal or as an arena for banquets, continuing the legacy 
                of memorable dining experiences.
              </p>
              <div className="space-y-4 animate-fade-in-up">
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-accent-gold rounded-full mr-4 shadow-golden-glow-sm group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="font-cormorant text-foreground group-hover:text-accent transition-colors duration-300">Malayalam film industry heritage from 1970s</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-accent-gold rounded-full mr-4 shadow-golden-glow-sm group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="font-cormorant text-foreground group-hover:text-accent transition-colors duration-300">European and Indian cuisine blend</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-accent-gold rounded-full mr-4 shadow-golden-glow-sm group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="font-cormorant text-foreground group-hover:text-accent transition-colors duration-300">First 'dining on the lawn' experience in the city</span>
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
            <div className="card-base text-center p-6 hover:shadow-golden-glow-sm transition-all duration-300 hover:-translate-y-2 animate-fade-in-up group">
              <div className="text-4xl mb-4 animate-float group-hover:scale-110 transition-transform duration-300">🏛</div>
              <h3 className="font-playfair text-h4 text-foreground mb-2 group-hover:text-accent transition-colors duration-300">Colonial Architecture</h3>
              <p className="font-poppins text-sm text-foreground-subtle">Travancore Style Heritage</p>
            </div>
            <div className="card-base text-center p-6 hover:shadow-golden-glow-sm transition-all duration-300 hover:-translate-y-2 animate-fade-in-up group">
              <div className="text-4xl mb-4 animate-float group-hover:scale-110 transition-transform duration-300">🎭</div>
              <h3 className="font-playfair text-h4 text-foreground mb-2 group-hover:text-accent transition-colors duration-300">Film Heritage</h3>
              <p className="font-poppins text-sm text-foreground-subtle">Malayalam Cinema Legacy</p>
            </div>
            <div className="card-base text-center p-6 hover:shadow-golden-glow-sm transition-all duration-300 hover:-translate-y-2 animate-fade-in-up group">
              <div className="text-4xl mb-4 animate-float group-hover:scale-110 transition-transform duration-300">🌿</div>
              <h3 className="font-playfair text-h4 text-foreground mb-2 group-hover:text-accent transition-colors duration-300">Garden Setting</h3>
              <p className="font-poppins text-sm text-foreground-subtle">Old Trees & Lush Gardens</p>
            </div>
            <div className="card-base text-center p-6 hover:shadow-golden-glow-sm transition-all duration-300 hover:-translate-y-2 animate-fade-in-up group">
              <div className="text-4xl mb-4 animate-float group-hover:scale-110 transition-transform duration-300">🍽</div>
              <h3 className="font-playfair text-h4 text-foreground mb-2 group-hover:text-accent transition-colors duration-300">Dining on Lawn</h3>
              <p className="font-poppins text-sm text-foreground-subtle">City's First Outdoor Dining</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-foreground-on-color relative overflow-hidden">
        {/* Golden Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent-gold/20 to-transparent animate-gradient-flow"></div>
        
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-h2 font-playfair mb-6 text-foreground-on-color animate-text-shimmer bg-gradient-to-r from-foreground-on-color via-accent-gold to-foreground-on-color bg-400% bg-clip-text">
            Experience Thiruvananthapuram's Heritage
          </h2>
          <p className="text-body font-cormorant mb-8 text-foreground-on-color/90 animate-fade-in">
            Step into history and experience the nostalgic journey through time at Amritha Heritage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <button className="btn btn-secondary group text-lg px-8 py-4 shadow-golden-glow hover:shadow-golden-glow-sm transform hover:-translate-y-1 animate-float">
              <span className="flex items-center gap-2">
                🏛️ Book Heritage Room
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </span>
            </button>
            <button className="btn btn-ghost border-2 border-foreground-on-color text-foreground-on-color hover:bg-foreground-on-color hover:text-primary px-8 py-4 text-lg shadow-soft-sunlight hover:shadow-golden-glow-sm animate-float">
              🍽️ Visit Kohinoor Restaurant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;