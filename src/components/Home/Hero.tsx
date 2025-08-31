// @/components/Home/Hero.tsx
import React, { useEffect, useRef } from "react";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Optimized scroll effect: No state updates, no re-renders.
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (videoRef.current) {
        const scrollY = window.scrollY;
        videoRef.current.style.transform = `translate3d(0, ${scrollY * 0.4}px, 0)`;
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section
        aria-labelledby="hero-title"
        className="relative h-screen overflow-hidden flex items-center justify-center"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop&q=10"
        >
          <source src="/videos/hero2.webm" type="video/webm" />
          <source src="/videos/hero2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40"
          aria-hidden="true"
        />

        {/* Content with all animations restored via CSS */}
        <div className="relative z-10 text-center text-foreground-on-color px-6">
          <p
            className="font-poppins text-xs tracking-widest text-accent-gold uppercase mb-4 font-medium animate-fade-in-up animate-text-shimmer bg-gradient-to-r from-accent-gold via-white to-accent-gold bg-400% bg-clip-text text-transparent"
            style={{ animationDelay: "100ms" }}
          >
            Amritha Heritage
          </p>

          <h1
            id="hero-title"
            className="font-cinzel text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-foreground-on-color animate-fade-in-up animate-float" // <-- Floating animation restored
            style={{ animationDelay: "250ms" }}
          >
            Heritage Reborn,<br />
            <span className="italic bg-gradient-to-r from-accent-gold to-accent bg-clip-text text-transparent">
              Luxury Renewed
            </span>
          </h1>

          <p
            className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-foreground-on-color/90 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            Experience the timeless elegance of colonial Travancore in the heart of Thiruvananthapuram.
          </p>

          <button
            className="btn btn-primary text-lg px-8 py-4 shadow-golden-glow hover:shadow-golden-glow-sm transform active:scale-95 hover:scale-105 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" // <-- Enhanced hover/tap effects
            style={{ animationDelay: "550ms" }}
          >
            ✨ Explore Heritage
          </button>
        </div>
      </section>
  );
};

export default Hero;