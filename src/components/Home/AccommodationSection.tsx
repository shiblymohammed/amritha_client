import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { rooms, facilities } from './AccommodationData';
import type { Room } from './AccommodationData';

// Reusable hook for detecting when an element is in view
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
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [options]);
    return [ref, isInView] as const;
};

// Reusable animated div for scroll-triggered animations
const AnimatedDiv = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string, delay?: number }) => {
    const [ref, isInView] = useInView({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-1000 ease-out`}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(48px)',
                transitionDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
};

// Component for the main section header
const SectionHeader = ({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) => (
    <AnimatedDiv className="text-center mb-16 md:mb-24">
        <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent" />
            <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-400% bg-clip-text text-transparent">{subtitle}</p>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent" />
        </div>
        <h2 className="text-h2 font-playfair text-foreground mb-6 relative animate-float">
            {title}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
        </h2>
        <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto leading-relaxed">
            {children}
        </p>
    </AnimatedDiv>
);

// A single slide component that contains both image and details
const RoomSlide = ({ room, isCurrent }: { room: Room; isCurrent: boolean; }) => {
    const navigate = useNavigate();
    return (
        <div className="flex-shrink-0 w-full lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
            {/* Image */}
            <div className="lg:col-span-8 xl:col-span-7 aspect-[16/10] card-base shadow-soft-sunlight-lg overflow-hidden">
                <img
                    src={room.images[0]}
                    alt={room.title}
                    width="1280"
                    height="800"
                    loading={isCurrent ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Details Card */}
            <div className="lg:col-span-6 xl:col-span-5 lg:-ml-32 xl:-ml-40 z-10 mt-4 lg:mt-0">
                <div className="card-base p-6 lg:p-8 shadow-soft-sunlight-lg transition-all duration-300 hover:shadow-golden-glow hover:-translate-y-1 glassmorphic">
                    <p className="font-poppins text-sm tracking-widest text-accent uppercase mb-3 animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-400% bg-clip-text text-transparent">{room.type}</p>
                    <h3 className="font-playfair text-2xl lg:text-4xl mb-3 leading-tight text-foreground animate-float">{room.title}</h3>
                    <p className="font-cormorant text-base lg:text-lg mb-6 text-foreground-subtle h-24">{room.description}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={() => navigate(`/booking?room=${room.id}`)} className="btn btn-primary w-full text-base py-3 transition-transform hover:scale-105 active:scale-95">Book Now</button>
                        <button onClick={() => navigate(`/accommodation-details/${room.id}`)} className="btn btn-ghost w-full text-base py-3 transition-transform hover:scale-105 active:scale-95">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// The main slider component
const RoomSlider = ({ rooms }: { rooms: Room[] }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const dragStartRef = useRef(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const paginate = useCallback((newIndex: number) => {
        if (newIndex < 0) newIndex = rooms.length - 1;
        else if (newIndex >= rooms.length) newIndex = 0;
        setCurrentIndex(newIndex);
    }, [rooms.length]);

    const handleDragStart = (clientX: number) => {
        dragStartRef.current = clientX;
        setIsDragging(true);
        document.body.style.userSelect = 'none';
    };

    const handleDragMove = (clientX: number) => {
        if (!isDragging) return;
        const drag = clientX - dragStartRef.current;
        setDragOffset(drag);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        document.body.style.userSelect = '';
        const swipeThreshold = containerRef.current ? containerRef.current.clientWidth / 4 : 50;
        if (Math.abs(dragOffset) > swipeThreshold) {
            paginate(dragOffset > 0 ? currentIndex - 1 : currentIndex + 1);
        }
        setDragOffset(0);
    };

    const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
    const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => { if (isDragging) handleDragEnd(); };
    const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    return (
        <div role="region" aria-roledescription="carousel" aria-label="Select a room">
            <div
                ref={containerRef}
                className="relative overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    ref={trackRef}
                    className="flex"
                    style={{
                        transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                        transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
                    }}
                >
                    {rooms.map((room, index) => (
                        <RoomSlide key={room.id} room={room} isCurrent={index === currentIndex} />
                    ))}
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
                <button onClick={() => paginate(currentIndex - 1)} aria-label="Previous room" className="btn btn-ghost p-3 rounded-full transition-transform hover:scale-110 active:scale-95">&#10094;</button>
                <div className="flex justify-center gap-3">
                    {rooms.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to room ${index + 1}`}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-accent scale-125 shadow-golden-glow' : 'bg-foreground-subtle/30 hover:bg-accent/50'}`}
                        />
                    ))}
                </div>
                <button onClick={() => paginate(currentIndex + 1)} aria-label="Next room" className="btn btn-ghost p-3 rounded-full transition-transform hover:scale-110 active:scale-95">&#10095;</button>
            </div>

            <AnimatedDiv className="text-center mt-12">
                <button onClick={() => navigate('/accommodation')} className="btn btn-primary group inline-flex items-center gap-3 text-lg px-10 py-4 shadow-soft-sunlight-lg transition-transform hover:-translate-y-1 active:scale-95 animate-float">
                    <span>Explore All Rooms</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
            </AnimatedDiv>
        </div>
    );
};

// Component for the facilities grid with animations restored
const FacilitiesGrid = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
      {facilities.map((facility, index) => (
        <AnimatedDiv
          key={facility.title}
          delay={index * 100}
          className="card-base group relative text-center p-4 transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="flex justify-center mb-4">
             {/* Floating animation restored */}
            <div className="relative p-3 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl shadow-soft-sunlight group-hover:shadow-golden-glow transition-all duration-300 animate-float">
               {/* Hover pulse animation restored */}
              <facility.icon className="w-7 h-7 text-accent group-hover:text-accent-gold transition-colors duration-300 group-hover:animate-pulse"/>
            </div>
          </div>
          {/* Shimmer effect restored */}
          <h4 className="text-sm md:text-base font-playfair text-foreground group-hover:text-accent transition-colors duration-300 animate-text-shimmer bg-gradient-to-r from-foreground via-accent to-foreground bg-400% bg-clip-text">
            {facility.title}
          </h4>
           {/* Breathing glow border on hover restored */}
          <div className="absolute inset-0 rounded-2xl border border-accent-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-golden-glow animate-scale-breath"></div>
        </AnimatedDiv>
      ))}
    </div>
);


const AccommodationSection: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-background">
            {/* Pure CSS Parallax background */}
            <div
                className="absolute inset-0 z-0 h-screen bg-cover bg-center bg-no-repeat bg-fixed"
                style={{ backgroundImage: "url(/images/Accommodation/room (1).webp)" }}
                aria-hidden="true"
            />
            <div className="absolute inset-0 z-0 bg-background/50 backdrop-blur-sm" aria-hidden="true" />
            
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32">
                <SectionHeader title="Stay in Colonial Elegance" subtitle="Heritage Stays">
                    Our rooms are more than places to sleep—they are a journey into history, uniquely designed with period furniture and modern amenities.
                </SectionHeader>
                <RoomSlider rooms={rooms} />
            </div>

            <div className="relative z-10 bg-background-secondary py-16 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6">
                    <SectionHeader title="Exceptional Facilities" subtitle="Premium Amenities">
                        Every amenity is thoughtfully designed to enhance your heritage experience with modern luxury and traditional charm.
                    </SectionHeader>
                    <FacilitiesGrid />
                </div>
            </div>
        </section>
    );
};

export default AccommodationSection;