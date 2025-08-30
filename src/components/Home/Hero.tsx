import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// =================================================================
// == HELPER COMPONENTS & ICONS
// =================================================================

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ItineraryModal: React.FC<ItineraryModalProps> = ({ isOpen, onClose }) => {
  const [interests, setInterests] = useState("");
  const [days, setDays] = useState(3);
  const [itinerary, setItinerary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!interests || days < 1) {
      setError(
        "Please tell us your interests and the number of days for your stay."
      );
      return;
    }
    setError("");
    setIsLoading(true);
    setItinerary("");

    const prompt = `You are an expert concierge for "Amritha Heritage", a luxury heritage resort in Thiruvananthapuram, Kerala, known for its colonial elegance, history, and fine dining at the Kohinoor Restaurant. A guest is staying for ${days} day(s) and is interested in: "${interests}". 
    
    Create a personalized, day-by-day itinerary for them. The tone should be welcoming and luxurious. 
    
    - Include activities both within the resort (like dining at Kohinoor, relaxing by the pool, heritage tours of the property) and nearby attractions relevant to their interests.
    - Structure the response clearly with headings for each day (e.g., "Day 1: Arrival and Relaxation").
    - Use Markdown for formatting (bolding, lists).
    - Keep descriptions concise but evocative.`;

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "AIzaSyD8L1n1vFjWAqZ-nfowjXtrqbSggOFmR0o"; // API key is handled by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        setItinerary(text);
      } else {
        throw new Error("Invalid response structure from API.");
      }
    } catch (err) {
      console.error("Error generating itinerary:", err);
      setError(
        "We're sorry, but we couldn't generate your itinerary at this time. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background-secondary rounded-2xl shadow-heritage-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-border-soft flex justify-between items-center">
          <h3 className="font-playfair text-h3-sm text-text-heading">
            Personalize Your Stay
          </h3>
          <button
            onClick={onClose}
            className="text-text-subtle hover:text-text-heading text-3xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {!itinerary && (
            <>
              <div className="mb-4">
                <label className="font-poppins text-sm font-medium text-text-heading block mb-2">
                  What are your interests?
                </label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g., history, relaxation, local food"
                  className="w-full p-3 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-action-accent focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label className="font-poppins text-sm font-medium text-text-heading block mb-2">
                  How many days are you staying?
                </label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value, 10))}
                  min="1"
                  className="w-full p-3 bg-background border border-border-interactive rounded-lg focus:ring-2 focus:ring-action-accent focus:outline-none"
                />
              </div>
              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-action-primary text-text-on-color font-poppins font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:bg-action-primary-hover disabled:bg-gray-400"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  "✨ Generate Itinerary"
                )}
              </button>
            </>
          )}
          {itinerary && (
            <div
              className="prose max-w-none font-cormorant text-text"
              dangerouslySetInnerHTML={{
                __html: itinerary.replace(/\n/g, "<br />"),
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const [isContentVisible, setContentVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 500);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.oncanplaythrough = () => {
        videoElement
          .play()
          .catch((error) => console.error("Video autoplay prevented:", error));
      };
    }
    return () => clearTimeout(timer);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <>
      <ItineraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* ======================= HERO SECTION ======================= */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translate3d(0, ${parallaxOffset}px, 0)`,
            willChange: 'transform',
            backfaceVisibility: 'hidden'
          }}
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
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-6">
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-poppins text-xs tracking-[0.2em] text-white uppercase mb-4 font-medium"
          >
            Amritha Heritage
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-white"
          >
            Heritage Reborn,<br />
            <span className="italic">Luxury Renewed</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white"
          >
            Experience the timeless elegance of colonial Travancore in the heart of Thiruvananthapuram
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins font-semibold px-6 py-3 rounded-xl text-base transition-all duration-300 transform hover:scale-105"
          >
            ✨ Plan Your Stay
          </motion.button>
        </div>
      </section>
    </>
  );
};

export default Hero;
