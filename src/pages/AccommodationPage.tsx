import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, MapPin, Clock, Users, Wifi, Coffee, Car, Utensils, Dumbbell } from 'lucide-react';

interface RoomType {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  capacity: number;
  size: string;
  features: string[];
  amenities: string[];
}

const roomTypes: RoomType[] = [
  {
    id: 'heritage-premium',
    name: 'Heritage Premium Room',
    description: 'Spacious, garden-facing, with sit-out areas',
    image: '/images/Accommodation/room (1).webp',
    price: '₹8,500',
    capacity: 2,
    size: '450 sq ft',
    features: ['Garden View', 'Sit-out Area', 'Period Furniture', 'Natural Lighting'],
    amenities: ['King Bed', 'En-suite Bathroom', 'Air Conditioning', 'Free WiFi', 'Room Service']
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    description: 'Comfortable elegance with classic wooden decor',
    image: '/images/Accommodation/room (2).webp',
    price: '₹6,500',
    capacity: 2,
    size: '380 sq ft',
    features: ['Classic Wooden Decor', 'City View', 'Balcony', 'Traditional Artwork'],
    amenities: ['Queen Bed', 'En-suite Bathroom', 'Air Conditioning', 'Free WiFi', 'Mini Bar']
  },
  {
    id: 'executive',
    name: 'Executive Room',
    description: 'Extra space and style, perfect for long stays',
    image: '/images/Accommodation/room (3).webp',
    price: '₹10,500',
    capacity: 3,
    size: '550 sq ft',
    features: ['Extra Space', 'Work Area', 'Lounge Space', 'Premium Amenities'],
    amenities: ['King Bed + Sofa Bed', 'En-suite Bathroom', 'Air Conditioning', 'Free WiFi', 'Work Desk', 'Coffee Maker']
  },
  {
    id: 'accessible',
    name: 'Differently-Abled Room',
    description: 'Fully accessible, spacious, and dignified',
    image: '/images/Accommodation/room (4).webp',
    price: '₹7,500',
    capacity: 2,
    size: '500 sq ft',
    features: ['Wheelchair Accessible', 'Spacious Layout', 'Accessible Bathroom', 'Emergency Features'],
    amenities: ['King Bed', 'Accessible Bathroom', 'Air Conditioning', 'Free WiFi', 'Emergency Call Button', 'Grab Bars']
  }
];

const AccommodationPage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [showRoomDetails, setShowRoomDetails] = useState(false);

  const handleViewDetails = (room: RoomType) => {
    setSelectedRoom(room);
    setShowRoomDetails(true);
  };

  const handleCloseDetails = () => {
    setShowRoomDetails(false);
    setSelectedRoom(null);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden flex items-center justify-center">
          {/* Background Image from local Accommodation assets */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/images/Accommodation/room (1).webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />
          
          {/* Content styled like Home Hero */}
          <div className="relative z-10 text-center text-foreground-on-color px-6 animate-fadeInUp">
            <p 
              className="font-poppins text-xs tracking-widest text-accent-gold uppercase mb-4 font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]"
            >
              Amritha Heritage
            </p>

            <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
              <h1 
                className="font-cinzel text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight text-foreground-on-color animate-float"
              >
                Accommodation<br />
                <span className="italic bg-gradient-to-r from-accent-gold to-accent bg-clip-text text-transparent">
                  Rooms & Suites
                </span>
              </h1>
            </div>

            <p 
              className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-foreground-on-color/90 leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]"
            >
              Experience the timeless elegance of our heritage rooms, thoughtfully designed with period charm and modern comfort.
            </p>

            <button 
              className="btn btn-primary text-lg px-8 py-4 shadow-golden-glow hover:shadow-golden-glow-sm transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.7s_forwards]"
            >
              View Our Rooms
            </button>
          </div>
        </section>

        {/* Intro Section */}
        <section className="hidden py-24 bg-background-secondary">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto space-y-6"
            >
              {/* Subtitle */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                  Heritage Experience
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
              </div>

              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-2 relative animate-float">
                Stay in Colonial Elegance
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
              </h2>
              <p className="font-cormorant text-xl text-foreground-subtle leading-relaxed">
                Our rooms are more than just places to sleep — they are a journey into history. 
                Each room is uniquely designed with period furniture, natural lighting, and modern amenities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Room Types Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 space-y-6"
            >
              {/* Subtitle */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                  Heritage Experience
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
              </div>

              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-2 relative animate-float">
                Stay in Colonial Elegance
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
              </h2>
              <p className="font-cormorant text-xl text-foreground-subtle max-w-2xl mx-auto">
                Our rooms are more than just places to sleep — they are a journey into history. Each room is uniquely designed with period furniture, natural lighting, and modern amenities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roomTypes.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-base border border-border hover-lift hover-glow"
                >
                  {/* Room Image */}
                  <div className="relative h-80 md:h-96 overflow-hidden rounded-t-2xl img-overlay">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.className = 'w-full h-full bg-background-secondary flex items-center justify-center';
                        placeholder.innerHTML = `
                          <div class="text-center text-foreground-subtle">
                            <svg class="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                            </svg>
                            <p class="text-sm font-medium">${room.name}</p>
                          </div>
                        `;
                        target.parentNode?.appendChild(placeholder);
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-accent text-foreground-on-color px-3 py-1 rounded-full text-sm font-poppins font-semibold shadow-golden-glow-sm">
                      {room.price}
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="p-6">
                    <h3 className="font-playfair text-2xl text-text-heading mb-3">
                      {room.name}
                    </h3>
                    <p className="font-cormorant text-foreground-subtle mb-4 leading-relaxed">
                      {room.description}
                    </p>
                    
                    {/* Room Specs */}
                    <div className="flex items-center gap-6 mb-6 text-sm text-foreground-subtle">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>{room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{room.size}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleViewDetails(room)}
                        className="w-full btn btn-primary flex items-center justify-center gap-2"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => window.open(room.image, '_blank')}
                        className="w-full btn btn-secondary flex items-center justify-center gap-2"
                        title="Open 360° view"
                      >
                        View 360°
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-background-secondary">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 space-y-6"
            >
              {/* Subtitle */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                  Guest Voices
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
              </div>

              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-2 relative animate-float">
                What Our Guests Say
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
              </h2>
              <p className="font-cormorant text-xl text-foreground-subtle max-w-2xl mx-auto">
                Discover why travelers choose Amritha for their heritage experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Mitchell",
                  room: "Heritage Premium Room",
                  rating: 5,
                  text: "Absolutely stunning room with perfect blend of heritage and comfort. The attention to detail is remarkable!"
                },
                {
                  name: "Rajesh Kumar",
                  room: "Executive Room",
                  rating: 5,
                  text: "Perfect for business travel. Spacious, elegant, and all the modern amenities I needed."
                },
                {
                  name: "Emma Thompson",
                  room: "Deluxe Room",
                  rating: 5,
                  text: "The colonial charm is incredible. Felt like stepping back in time while enjoying modern luxury."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background rounded-2xl p-8 border border-border hover:shadow-soft-sunlight transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent" />
                    ))}
                  </div>
                  <p className="font-cormorant text-foreground-subtle italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-poppins font-semibold text-text-heading">{testimonial.name}</p>
                    <p className="font-cormorant text-sm text-foreground-subtle">{testimonial.room}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-2 md:px-4 lg:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12 space-y-6"
            >
              {/* Subtitle */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                  Visual Journey
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
              </div>

              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-2 relative animate-float">
                Accommodation Gallery
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
              </h2>
              <p className="font-cormorant text-xl text-foreground-subtle max-w-2xl mx-auto">
                Take a visual journey through our heritage rooms and discover the elegance that awaits you
              </p>
            </motion.div>

            {/* Uniform, full-screen-feel grid similar to Gallery page */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {[
                '/images/Accommodation/room (1).webp',
                '/images/Accommodation/room (2).webp',
                '/images/Accommodation/room (3).webp',
                '/images/Accommodation/room (4).webp',
                '/images/Accommodation/room (5).webp',
                '/images/Accommodation/room (6).webp',
                '/images/Accommodation/room (7).webp',
                '/images/Accommodation/room (8).webp',
                '/images/Accommodation/room (9).webp',
                '/images/Accommodation/room (10).webp',
              ].map((image, index) => (
                <div 
                  key={index} 
                  className="relative overflow-hidden cursor-pointer rounded-lg border border-border-soft animate-fade-in-up h-[90vh]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img 
                    src={image} 
                    alt={`Accommodation ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/Accommodation/room (1).webp'; }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <p className="text-foreground-on-color font-playfair text-xl">Room {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outro Section */}
        <section className="py-24 bg-background-secondary">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto space-y-6"
            >
              {/* Subtitle */}
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                  Plan Your Stay
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
              </div>

              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-2 relative animate-float">
                Ready to Experience Heritage?
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
              </h2>
              <p className="font-cormorant text-xl text-foreground-subtle mb-8 leading-relaxed">
                Book your stay and immerse yourself in the colonial elegance of Amritha. 
                Our team is ready to make your experience unforgettable.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary px-10 py-4 text-lg shadow-soft-sunlight hover:shadow-golden-glow"
              >
                Book Your Stay
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Room Details Modal */}
      <AnimatePresence>
        {showRoomDetails && selectedRoom && (
          <RoomDetailsModal 
            room={selectedRoom} 
            onClose={handleCloseDetails} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Room Details Modal Component
interface RoomDetailsModalProps {
  room: RoomType;
  onClose: () => void;
}

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ room, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Mock images for carousel (in real app, these would come from the room data)
  const roomImages = [
    room.image,
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % roomImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background-tertiary rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background-tertiary rounded-t-3xl p-6 border-b border-border-soft z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl text-text-heading mb-2">
                {room.name}
              </h2>
              <p className="font-cormorant text-lg text-text-subtle">
                {room.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-text-subtle hover:text-text-heading transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Carousel */}
          <div className="relative mb-8">
                         <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
               <img 
                 src={roomImages[currentImageIndex]} 
                 alt={`${room.name} - Image ${currentImageIndex + 1}`}
                 className="w-full h-full object-cover"
                 onError={(e) => {
                   const target = e.target as HTMLImageElement;
                   target.style.display = 'none';
                   const placeholder = document.createElement('div');
                   placeholder.className = 'w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center';
                   placeholder.innerHTML = `
                     <div class="text-center text-gray-500">
                       <svg class="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                         <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                       </svg>
                       <p class="text-sm font-medium">${room.name}</p>
                     </div>
                   `;
                   target.parentNode?.appendChild(placeholder);
                 }}
               />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Image Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {roomImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-action-accent' : 'bg-border-soft'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Room Description */}
              <div>
                <h3 className="font-playfair text-2xl text-text-heading mb-4">Room Description</h3>
                <p className="font-cormorant text-text-subtle leading-relaxed">
                  Experience the perfect blend of colonial heritage and modern comfort in our {room.name.toLowerCase()}. 
                  This thoughtfully designed space features {room.features.join(', ').toLowerCase()}, 
                  creating an atmosphere that transports you to a bygone era while providing all the conveniences of today.
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-playfair text-2xl text-text-heading mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {room.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-action-accent rounded-full"></div>
                      <span className="font-cormorant text-text-subtle">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-playfair text-2xl text-text-heading mb-4">Amenities & Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-background-secondary rounded-lg flex items-center justify-center">
                        <Wifi className="w-4 h-4 text-action-accent" />
                      </div>
                      <span className="font-cormorant text-text-subtle">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 360 View Placeholder */}
              <div>
                <h3 className="font-playfair text-2xl text-text-heading mb-4">360° Room View</h3>
                <div className="bg-background-secondary rounded-2xl p-6 border border-border-soft text-center">
                  <p className="font-cormorant text-foreground-subtle mb-4">Interactive 360° view coming soon.</p>
                  <button
                    onClick={() => window.open(room.image, '_blank')}
                    className="btn btn-secondary"
                  >
                    Open 360° Image
                  </button>
                </div>
              </div>

               {/* Testimonials */}
               <div>
                 <h3 className="font-playfair text-2xl text-text-heading mb-4">Guest Reviews</h3>
                 <div className="bg-background-secondary rounded-2xl p-6">
                   <div className="flex items-center gap-2 mb-3">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                     ))}
                   </div>
                   <p className="font-cormorant text-text-subtle italic mb-3">
                     "Absolutely stunning room with perfect blend of heritage and comfort. The attention to detail is remarkable!"
                   </p>
                   <p className="font-poppins text-sm text-text-subtle">- Sarah M., Heritage Premium Room</p>
                 </div>
               </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing & Booking */}
              <div className="bg-background-secondary rounded-2xl p-6 border border-border-soft">
                <h3 className="font-playfair text-2xl text-text-heading mb-4">Room Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-cormorant text-text-subtle">Price per night</span>
                    <span className="font-poppins font-semibold text-action-accent text-xl">{room.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-cormorant text-text-subtle">Room size</span>
                    <span className="font-poppins text-text-heading">{room.size}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-cormorant text-text-subtle">Capacity</span>
                    <span className="font-poppins text-text-heading">{room.capacity} guests</span>
                  </div>
                </div>

                <button className="w-full btn btn-primary py-4">
                  Book Now
                </button>
              </div>

              {/* Check-in/Check-out */}
              <div className="bg-background-secondary rounded-2xl p-6 border border-border-soft">
                <h3 className="font-playfair text-xl text-text-heading mb-4">Check-in & Check-out</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-action-accent" />
                    <div>
                      <p className="font-poppins font-medium text-text-heading">Check-in</p>
                      <p className="font-cormorant text-sm text-text-subtle">2:00 PM onwards</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-action-accent" />
                    <div>
                      <p className="font-poppins font-medium text-text-heading">Check-out</p>
                      <p className="font-cormorant text-sm text-text-subtle">11:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hotel Services */}
              <div className="bg-background-secondary rounded-2xl p-6 border border-border-soft">
                <h3 className="font-playfair text-xl text-text-heading mb-4">Hotel Services</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Coffee className="w-5 h-5 text-action-accent" />
                    <span className="font-cormorant text-text-subtle">24/7 Room Service</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-action-accent" />
                    <span className="font-cormorant text-text-subtle">Valet Parking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-action-accent" />
                    <span className="font-cormorant text-text-subtle">Restaurant</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Dumbbell className="w-5 h-5 text-action-accent" />
                    <span className="font-cormorant text-text-subtle">Fitness Center</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccommodationPage;
