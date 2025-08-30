import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LazyImage from '../LazyImage';

// =================================================================
// == SVG ICONS
// =================================================================

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

// =================================================================
// == DATA STRUCTURES
// =================================================================
interface Destination {
  id: number;
  title: string;
  description: string;
  image: string;
  distance: string;
  category: string;
}

// =================================================================
// == GEMINI API MODAL COMPONENT
// =================================================================
interface ConciergeModalProps {
  destination: Destination | null;
  onClose: () => void;
}

const ConciergeModal = ({ destination, onClose }: ConciergeModalProps) => {
    const [itinerary, setItinerary] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const generateItinerary = async () => {
            if (!destination) return;
            setIsLoading(true);
            setError('');

            const prompt = `You are the heritage concierge for Amritha Heritage, a luxury resort in Thiruvananthapuram. A guest is interested in visiting "${destination.title}". 
            
            Create a brief, elegant half-day itinerary (around 100-120 words) centered on this destination. 
            
            - Suggest one or two other nearby points of interest that complement the main destination.
            - Recommend an ideal time to visit and a brief suggestion on what to wear for comfort and respect (e.g., "light cottons," "modest attire for temples").
            - The tone should be helpful, luxurious, and knowledgeable. Format the output as simple paragraphs with Markdown for bolding.`;

            try {
                const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
                const apiKey = ""; // Handled by environment
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error(`API Error: ${response.status}`);
                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

                if (text) {
                    setItinerary(text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>'));
                } else {
                    throw new Error("Invalid API response.");
                }
            } catch (err) {
                console.error("Itinerary generation failed:", err);
                setError("Our concierge is currently attending to other guests. Please try again shortly.");
            } finally {
                setIsLoading(false);
            }
        };
        generateItinerary();
    }, [destination]);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-background-secondary rounded-2xl shadow-heritage-lg w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-border-soft">
                    <p className="font-poppins text-sm text-action-accent uppercase">Heritage Concierge</p>
                    <h3 className="font-playfair text-h3-sm text-text-heading">A Day Trip to {destination?.title}</h3>
                </div>
                <div className="p-8 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex items-center gap-4"><div className="w-6 h-6 border-2 border-t-transparent border-action-primary rounded-full animate-spin"></div><p>Planning your journey...</p></div>
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : (
                        <div className="prose max-w-none font-cormorant text-text" dangerouslySetInnerHTML={{ __html: itinerary }}></div>
                    )}
                </div>
            </div>
        </div>
    );
};


// =================================================================
// == MAIN COMPONENT
// =================================================================
const DestinationSection: React.FC = () => {
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileIndex, setMobileIndex] = useState(0);

    const destinations: Destination[] = [
        { id: 1, title: "Shri Padmanabhaswami Temple", description: "A stunning example of Dravidian architecture, this temple is a spiritual heart of the city, dedicated to Vishnu.", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=800&fit=crop&q=80", distance: "5 km", category: "Heritage" },
        { id: 2, title: "Kovalam Beach", description: "Famous for its three crescent-shaped beaches, offering a serene escape with golden sands and calm waters.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80", distance: "16 km", category: "Beach" },
        { id: 3, title: "Veli Tourist Village", description: "A picturesque spot where the Veli Lake meets the Arabian Sea, offering boating, gardens, and a floating bridge.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80", distance: "8 km", category: "Adventure" },
    ];

    const mobileDestination = destinations[mobileIndex];

    const handleConciergeClick = (destination: Destination) => {
        setSelectedDestination(destination);
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && <ConciergeModal destination={selectedDestination} onClose={() => setIsModalOpen(false)} />}
            <section className="bg-background py-24 md:py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-[0.03]"></div>
                
                <div className="container mx-auto px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16 md:mb-24"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">Explore Our Surroundings</p>
                        <h2 className="text-h2 font-playfair text-text-heading mb-6 relative inline-block">
                        Find Us in the Heart of Thiruvananthapuram
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></span>
                        </h2>
                        <p className="text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed mt-8">
                             Nestled in Thycaud, Amritha Heritage is just minutes from key cultural and historical landmarks
                        </p>
                    </motion.div>

                    {/* --- DESKTOP DESTINATIONS GRID --- */}
                    <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {destinations.map((destination, index) => (
                            <motion.div
                                key={destination.id}
                                className="group relative overflow-hidden rounded-2xl bg-background-secondary shadow-heritage border border-border-soft flex flex-col"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <div className="h-64 overflow-hidden">
                                    <LazyImage src={destination.image} alt={destination.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="font-poppins text-sm text-action-accent uppercase">{destination.category}</span>
                                    <h3 className="font-playfair text-h3-sm text-text-heading mt-2">{destination.title}</h3>
                                    <p className="font-cormorant text-text-subtle my-4 flex-grow">{destination.description}</p>
                                    <motion.button
                                      onClick={() => handleConciergeClick(destination)}
                                      className="font-poppins text-sm font-medium text-action-primary hover:text-action-primary-hover transition-colors duration-300 group/btn inline-flex items-center self-start"
                                      whileHover={{ scale: 1.05 }}
                                    >
                                        ✨ Ask Our Concierge <ArrowRightIcon />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* --- MOBILE STORY SLIDER --- */}
                    <div className="lg:hidden relative h-[80vh] cursor-grab active:cursor-grabbing">
                        <AnimatePresence>
                            <motion.div
                                key={mobileIndex}
                                className="absolute inset-0 w-full h-full"
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '-100%', opacity: 0 }}
                                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.4}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -100) setMobileIndex(p => (p + 1) % destinations.length);
                                    if (info.offset.x > 100) setMobileIndex(p => (p - 1 + destinations.length) % destinations.length);
                                }}
                            >
                                <LazyImage src={mobileDestination.image} alt={mobileDestination.title} className="w-full h-full object-cover rounded-2xl shadow-heritage-lg" placeholderClassName="rounded-2xl" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl"></div>
                                <div className="absolute bottom-0 left-0 p-8 text-text-on-color">
                                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-poppins text-sm text-action-accent uppercase">{mobileDestination.category}</motion.p>
                                    <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-playfair text-h3 text-white mt-2">{mobileDestination.title}</motion.h3>
                                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-cormorant text-white/80 mt-4">{mobileDestination.description}</motion.p>
                                    <motion.button 
                                        onClick={() => handleConciergeClick(mobileDestination)} 
                                        className="font-poppins text-sm font-medium bg-white/20 text-white px-4 py-2 rounded-lg mt-6 hover:bg-white/30 transition-colors"
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                                    >
                                        Ask Concierge
                                    </motion.button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                            {destinations.map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === mobileIndex ? 'bg-white' : 'bg-white/30'}`}></div>
                            ))}
                        </div>
                    </div>

                    {/* Explore All Destinations Button */}
                    <motion.div
                        className="text-center mt-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <motion.button
                            onClick={() => window.open('/destinations', '_self')}
                            className="group inline-flex items-center gap-3 font-poppins bg-action-accent hover:bg-action-accent-hover text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
                            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 20px 0 rgba(212, 162, 118, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Explore All Destinations</span>
                            <motion.div
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            >
                                <ArrowRightIcon />
                            </motion.div>
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default DestinationSection;
