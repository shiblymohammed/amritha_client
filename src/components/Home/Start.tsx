import React, { useRef, useEffect, useState } from 'react';

// A lightweight, reusable hook for detecting when an element is in the viewport.
const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isInView] as const;
};

// Reusable animated div component
interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  initialClass: string;
  transitionClass?: string;
  delay?: string;
}

const AnimatedDiv: React.FC<AnimatedDivProps> = ({ children, className = '', initialClass, transitionClass = 'duration-700', delay }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const delayStyle = delay ? { transitionDelay: delay } : {};
  
  return (
    <div
      ref={ref}
      style={delayStyle}
      className={`${className} transition-all ${transitionClass} ${isInView ? 'opacity-100 translate-x-0 translate-y-0' : initialClass}`}
    >
      {children}
    </div>
  );
};

const TextContent = () => (
  <AnimatedDiv 
    initialClass="opacity-0 -translate-x-8"
    className="space-y-8 flex flex-col items-center"
  >
    {/* Elegant Subtitle */}
    <div className="flex items-center justify-center gap-3">
      <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
      <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
        Heritage Experience
      </span>
      <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
    </div>

    {/* Main Heading with shimmer restored */}
    <h2 
      id="welcome-heading" 
      className="text-h2 font-playfair text-foreground text-center relative animate-text-shimmer bg-gradient-to-r from-foreground via-accent to-foreground bg-400% bg-clip-text text-transparent"
    >
      Welcome to Amritha Heritage
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
    </h2>

    {/* Description */}
    <p className="font-cormorant text-body text-foreground-subtle leading-relaxed text-center max-w-xl">
      A century-old colonial bungalow transformed into a boutique hotel in the heart of Thycaud, Thiruvananthapuram. A space where timeless architecture, lush courtyards, and refined hospitality come together for an unforgettable stay.
    </p>
    
    {/* Call-to-Action Button with animations restored and enhanced */}
    <div className="flex justify-center">
      <button className="btn btn-primary animate-float text-base px-8 py-3 shadow-soft-sunlight transition-all duration-300 hover:shadow-golden-glow hover:scale-105 hover:animate-pulse">
        Discover Our Story
      </button>
    </div>
  </AnimatedDiv>
);

const ImageGallery = () => (
  <AnimatedDiv
    initialClass="opacity-0 translate-x-8"
    delay="200ms"
    className="relative"
  >
    {/* Main Heritage Image */}
    <div className="group card-base w-full max-w-2xl h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden transition-transform duration-300 hover:scale-105 hover:-translate-y-1">
      <img
        src="/images/home.webp"
        alt="The stately facade of Amritha Heritage bungalow"
        loading="lazy"
        width="800"
        height="1200"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
    
    {/* Floating Heritage Detail Image */}
    <div className="group hidden sm:block absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 lg:-bottom-12 lg:-left-12 w-48 h-auto sm:w-64 lg:w-80 card-base overflow-hidden animate-float shadow-golden-glow-sm transition-transform duration-300 hover:scale-105 hover:rotate-2 hover:-translate-y-2">
      <img
        src="/images/home2.webp"
        alt="A detailed view of a lush courtyard at Amritha Heritage"
        loading="lazy"
        width="400"
        height="600"
        className="aspect-[2/3] w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>

    {/* Decorative Golden Accent */}
    <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-accent-gold rounded-full opacity-30 animate-float" />
  </AnimatedDiv>
);

const StartSection: React.FC = () => {
  return (
    <section 
      aria-labelledby="welcome-heading"
      className="min-h-screen bg-background flex items-center relative overflow-hidden py-20"
    >
      {/* Decorative Background Elements with glow restored */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-20 left-20 w-32 h-32 border border-accent rounded-full animate-float shadow-golden-glow-sm" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent-gold rounded-full animate-float [animation-delay:-2s]" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-primary rounded-full animate-float [animation-delay:-4s]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <TextContent />
          <ImageGallery />
        </div>
      </div>
    </section>
  );
};

export default StartSection;