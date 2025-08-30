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
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
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
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content */}
          <div className="relative z-10 text-center text-white px-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-playfair text-6xl md:text-7xl lg:text-8xl mb-6"
            >
              Accommodation
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-cormorant text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Experience luxury and comfort in our heritage rooms, where every detail tells a story
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
            >
              View Our Rooms
            </motion.button>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-24 bg-background-secondary">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-6">
                Stay in Colonial Elegance
              </h2>
              <p className="font-cormorant text-xl text-text-subtle leading-relaxed">
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
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-4">
                Room Types
              </h2>
              <p className="font-cormorant text-xl text-text-subtle max-w-2xl mx-auto">
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
                  className="bg-background-tertiary rounded-2xl overflow-hidden shadow-heritage-lg border border-border-soft hover:shadow-heritage-xl transition-all duration-300 transform hover:-translate-y-2"
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
                    <div className="absolute top-4 right-4 bg-action-accent text-white px-3 py-1 rounded-full text-sm font-poppins font-semibold">
                      {room.price}
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="p-6">
                    <h3 className="font-playfair text-2xl text-text-heading mb-3">
                      {room.name}
                    </h3>
                    <p className="font-cormorant text-text-subtle mb-4 leading-relaxed">
                      {room.description}
                    </p>
                    
                    {/* Room Specs */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-text-subtle">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{room.size}</span>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {room.features.slice(0, 2).map((feature, idx) => (
                          <span 
                            key={idx}
                            className="bg-background-secondary text-text-subtle text-xs px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(room)}
                      className="w-full bg-action-accent hover:bg-action-accent-hover text-white font-poppins font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
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
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-4">
                What Our Guests Say
              </h2>
              <p className="font-cormorant text-xl text-text-subtle max-w-2xl mx-auto">
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
                  className="bg-background-tertiary rounded-2xl p-8 border border-border-soft hover:shadow-heritage-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="font-cormorant text-text-subtle italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-poppins font-semibold text-text-heading">{testimonial.name}</p>
                    <p className="font-cormorant text-sm text-text-subtle">{testimonial.room}</p>
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

        {/* Outro Section */}
        <section className="py-24 bg-background-secondary">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-6">
                Ready to Experience Heritage?
              </h2>
              <p className="font-cormorant text-xl text-text-subtle mb-8 leading-relaxed">
                Book your stay and immerse yourself in the colonial elegance of Amritha. 
                Our team is ready to make your experience unforgettable.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins font-semibold px-10 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
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

                <button className="w-full bg-action-accent hover:bg-action-accent-hover text-white font-poppins font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
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
