import React, { useEffect, useRef, useState, useCallback, memo } from "react";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  // Optimized scroll handler with requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    // Throttled scroll listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Reduced parallax effect for better performance
  const parallaxOffset = scrollY * 0.3;

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Optimized Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero2.jpg"
        style={{
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
        }}
      >
        <source src="/videos/hero2.webm" type="video/webm" />
        <source src="/videos/hero2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />

      {/* Content with CSS animations */}
      <div className="relative z-10 text-center text-foreground-on-color px-6 animate-fadeInUp">
        <p 
          className="font-poppins text-xs tracking-widest text-accent-gold uppercase mb-4 font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]"
        >
          Amritha Heritage
        </p>

        <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
          <h1 
            className="font-cinzel text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-foreground-on-color animate-float"
          >
            Heritage Reborn,<br />
            <span className="italic bg-gradient-to-r from-accent-gold to-accent bg-clip-text text-transparent">
              Luxury Renewed
            </span>
          </h1>
        </div>

        <p 
          className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-foreground-on-color/90 leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]"
        >
          Experience the timeless elegance of colonial Travancore in the heart of Thiruvananthapuram.
        </p>

        <button 
          className="btn btn-primary text-lg px-8 py-4 shadow-golden-glow hover:shadow-golden-glow-sm transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.7s_forwards]"
        >
          ✨ Explore Heritage
        </button>
      </div>
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Hero);