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
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
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
        {/* Enhanced Hero Section */}
        <section className="relative h-[70vh] overflow-hidden flex items-center justify-center img-overlay">
          {/* Background Image */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
          
          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40 animate-gradient-flow" />
          
          {/* Content */}
          <div className="relative z-10 text-center text-foreground-on-color px-6 animate-fade-in-up">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-poppins text-sm tracking-widest text-accent-gold uppercase mb-4 font-medium animate-text-shimmer bg-gradient-to-r from-accent-gold via-white to-accent-gold bg-400% bg-clip-text text-transparent"
            >
              Heritage Stays
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-cinzel text-4xl md:text-5xl lg:text-6xl mb-6 animate-float"
            >
              <span className="bg-gradient-to-r from-foreground-on-color to-accent-gold bg-clip-text text-transparent">Accommodation</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-foreground-on-color/90 leading-relaxed"
            >
              Experience luxury and comfort in our heritage rooms, where every detail tells a story
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="btn btn-primary text-lg px-8 py-4 shadow-golden-glow hover:shadow-golden-glow-sm transform hover:scale-105 hover:-translate-y-1 animate-float"
            >
              ✨ View Our Rooms
            </motion.button>
          </div>
        </section>

        {/* Enhanced Intro Section */}
        <section className="py-24 bg-background-secondary relative overflow-hidden">
          {/* Heritage Pattern Overlay */}
          <div className="absolute inset-0 heritage-pattern opacity-5"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto animate-fade-in-up"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent animate-gradient-flow"></div>
                <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-400% bg-clip-text text-transparent">Colonial Heritage</p>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent animate-gradient-flow"></div>
              </div>
              <h2 className="font-playfair text-h2 text-foreground mb-6 animate-float">
                Stay in Colonial Elegance
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow"></span>
              </h2>
              <p className="font-cormorant text-body text-foreground-subtle leading-relaxed animate-fade-in">
                Our rooms are more than just places to sleep — they are a journey into history. 
                Each room is uniquely designed with period furniture, natural lighting, and modern amenities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Room Types Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          </div>

          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 animate-fade-in-up"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent animate-gradient-flow"></div>
                <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-400% bg-clip-text text-transparent">Heritage Rooms</p>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent animate-gradient-flow"></div>
              </div>
              <h2 className="font-playfair text-h2 text-foreground mb-6 animate-float">
                Room Types
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow"></span>
              </h2>
              <p className="font-cormorant text-body text-foreground-subtle max-w-2xl mx-auto animate-fade-in">
                Choose from our carefully curated selection of rooms, each offering a unique blend of heritage and comfort
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roomTypes.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-base group overflow-hidden img-overlay hover:shadow-golden-glow-sm transition-all duration-500 transform hover:-translate-y-4 animate-fade-in-up"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Room Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
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
                    <div className="absolute top-4 right-4 glassmorphic text-foreground-on-color px-3 py-1 rounded-full text-sm font-poppins font-semibold shadow-golden-glow-sm animate-float">
                      {room.price}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Room Details */}
                  <div className="p-6">
                    <h3 className="font-playfair text-h3-sm text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                      {room.name}
                    </h3>
                    <p className="font-cormorant text-foreground-subtle mb-4 leading-relaxed">
                      {room.description}
                    </p>
                    
                    {/* Room Specs */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-foreground-subtle">
                      <div className="flex items-center gap-1 group/spec hover:text-accent transition-colors duration-300">
                        <Users className="w-4 h-4 text-accent" />
                        <span>{room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1 group/spec hover:text-accent transition-colors duration-300">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>{room.size}</span>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {room.features.slice(0, 2).map((feature, idx) => (
                          <span 
                            key={idx}
                            className="bg-background-secondary text-foreground-subtle text-xs px-2 py-1 rounded-full shadow-soft-sunlight hover:bg-accent hover:text-foreground-on-color transition-all duration-300 animate-float"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <motion.button
                      onClick={() => handleViewDetails(room)}
                      className="btn btn-primary w-full py-3 text-base font-semibold shadow-soft-sunlight-lg hover:shadow-golden-glow transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2 animate-float"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🏛️ View Details
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section className="py-24 bg-background-secondary relative overflow-hidden">
          {/* Heritage Pattern */}
          <div className="absolute inset-0 heritage-pattern opacity-5"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 animate-fade-in-up"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent animate-gradient-flow"></div>
                <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-400% bg-clip-text text-transparent">Guest Reviews</p>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent animate-gradient-flow"></div>
              </div>
              <h2 className="font-playfair text-h2 text-foreground mb-6 animate-float">
                What Our Guests Say
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow"></span>
              </h2>
              <p className="font-cormorant text-body text-foreground-subtle max-w-2xl mx-auto animate-fade-in">
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
                  className="card-base p-8 hover:shadow-golden-glow-sm transition-all duration-300 hover:-translate-y-2 animate-fade-in-up group"
                >
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="font-cormorant text-foreground-subtle italic mb-6 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-poppins font-semibold text-foreground group-hover:text-accent transition-colors duration-300">{testimonial.name}</p>
                    <p className="font-cormorant text-sm text-foreground-subtle">{testimonial.room}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-4">
                Accommodation Gallery
              </h2>
              <p className="font-cormorant text-xl text-text-subtle max-w-2xl mx-auto">
                Take a visual journey through our heritage rooms and discover the elegance that awaits you
              </p>
            </motion.div>

            {/* Bent Grid Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop'
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                    index === 1 || index === 3 || index === 5 ? 'md:row-span-2' : ''
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Accommodation ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                          <p class="text-sm font-medium">Gallery Image</p>
                        </div>
                      `;
                      target.parentNode?.appendChild(placeholder);
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="font-poppins font-medium">View</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary to-accent text-foreground-on-color relative overflow-hidden">
          {/* Golden Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-accent-gold/20 to-transparent animate-gradient-flow"></div>
          
          <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto animate-fade-in-up"
            >
              <h2 className="font-playfair text-h2 text-foreground-on-color mb-6 animate-text-shimmer bg-gradient-to-r from-foreground-on-color via-accent-gold to-foreground-on-color bg-400% bg-clip-text">
                Ready to Experience Heritage?
              </h2>
              <p className="font-cormorant text-body text-foreground-on-color/90 mb-8 leading-relaxed animate-fade-in">
                Book your stay and immerse yourself in the colonial elegance of Amritha. 
                Our team is ready to make your experience unforgettable.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary text-lg px-10 py-4 shadow-golden-glow hover:shadow-golden-glow-sm transform hover:-translate-y-1 animate-float"
              >
                🏛️ Book Your Stay
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
        className="glassmorphic rounded-3xl shadow-soft-sunlight-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 glassmorphic rounded-t-3xl p-6 border-b border-border z-10">
          <div className="flex justify-between items-start">
            <div className="animate-fade-in-up">
              <h2 className="font-playfair text-h2 text-foreground mb-2 animate-text-shimmer bg-gradient-to-r from-foreground via-accent to-foreground bg-400% bg-clip-text">
                {room.name}
              </h2>
              <p className="font-cormorant text-lg text-foreground-subtle">
                {room.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-foreground-subtle hover:text-accent transition-colors p-2 hover:bg-accent/10 rounded-lg animate-float"
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

                             {/* Room Video */}
               <div>
                 <h3 className="font-playfair text-2xl text-text-heading mb-4">Room Tour</h3>
                 <div className="bg-background-secondary rounded-2xl p-6">
                   <div className="aspect-video bg-black rounded-xl overflow-hidden">
                     <div className="w-full h-full flex items-center justify-center">
                       <div className="text-center text-white">
                         <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                         </svg>
                         <p className="text-lg font-medium">Room Tour Video</p>
                         <p className="text-sm text-gray-400">Experience the room in motion</p>
                       </div>
                     </div>
                   </div>
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
              <div className="card-base p-6 hover:shadow-golden-glow-sm animate-fade-in-up">
                <h3 className="font-playfair text-h3-sm text-foreground mb-4 animate-text-shimmer bg-gradient-to-r from-foreground via-accent to-foreground bg-400% bg-clip-text">Room Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center group hover:bg-accent/5 -mx-2 px-2 py-1 rounded transition-colors duration-300">
                    <span className="font-cormorant text-foreground-subtle">Price per night</span>
                    <span className="font-poppins font-semibold text-accent text-xl group-hover:text-accent-gold transition-colors duration-300">{room.price}</span>
                  </div>
                  <div className="flex justify-between items-center group hover:bg-accent/5 -mx-2 px-2 py-1 rounded transition-colors duration-300">
                    <span className="font-cormorant text-foreground-subtle">Room size</span>
                    <span className="font-poppins text-foreground group-hover:text-accent transition-colors duration-300">{room.size}</span>
                  </div>
                  <div className="flex justify-between items-center group hover:bg-accent/5 -mx-2 px-2 py-1 rounded transition-colors duration-300">
                    <span className="font-cormorant text-foreground-subtle">Capacity</span>
                    <span className="font-poppins text-foreground group-hover:text-accent transition-colors duration-300">{room.capacity} guests</span>
                  </div>
                </div>

                <motion.button 
                  className="btn btn-primary w-full py-4 text-lg font-semibold shadow-soft-sunlight-lg hover:shadow-golden-glow animate-float"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✨ Book Now
                </motion.button>
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
