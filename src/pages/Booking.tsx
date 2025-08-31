import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

// =================================================================
// == 1. TYPE DEFINITIONS
// =================================================================
interface Room {
    id: number;
    name: string;
    description: string;
    amenities: string[];
    capacity: number;
    price: number;
    image: string;
}

interface BookingDetails {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
}

interface GuestInfo {
    name: string;
    email: string;
    phone: string;
    requests: string;
}

interface PriceSummary {
    nights: number;
    roomTotal: number;
    taxes: number;
    total: number;
}

interface Errors {
    room?: string;
    checkIn?: string;
    checkOut?: string;
    name?: string;
    email?: string;
    phone?: string;
}

// =================================================================
// == 2. SVG ICONS (Self-contained for portability)
// =================================================================
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-text-subtle absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-text-subtle absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

// =================================================================
// == 3. DUMMY DATA (Simulating API response for rooms)
// =================================================================
const roomsData: Room[] = [
    { id: 1, name: "Heritage Premium Room", description: "Spacious, garden-facing, with sit-out areas. Colonial Style Heritage Rooms with complimentary breakfast and modern amenities.", amenities: ["King Bed", "Garden View", "Wi-Fi", "Air Conditioned", "Room Service", "Mini Bar", "Flat-screen TV"], capacity: 2, price: 8500, image: "/images/Accommodation/room (1).webp" },
    { id: 2, name: "Deluxe Room", description: "Comfortable elegance with classic wooden decor. Spacious 650 sq ft room with colonial heritage charm.", amenities: ["Queen Bed", "Veranda", "Wi-Fi", "Air Conditioned", "Room Service", "Mini Bar", "Flat-screen TV"], capacity: 3, price: 10000, image: "/images/Accommodation/room (4).webp" },
    { id: 3, name: "Differently Abled Room", description: "Fully accessible, spacious, and dignified. Specially designed for comfort and accessibility.", amenities: ["Queen Bed", "Wheelchair Accessible", "Roll-in Shower", "Enhanced Space", "Safety Features"], capacity: 2, price: 9500, image: "/images/Accommodation/room (7).webp" },
    { id: 4, name: "Executive Room", description: "Extra space and style, perfect for long stays. Premium accommodation with enhanced amenities and comfort.", amenities: ["King Bed", "Living Area", "Executive Lounge", "Air Conditioned", "Room Service", "Mini Bar", "Flat-screen TV"], capacity: 4, price: 12500, image: "/images/Accommodation/room (4).webp" },
];

const whyBookWithUs = [
    { title: "Best Rate Guarantee", description: "We guarantee the lowest price when you book directly with us." },
    { title: "Exclusive Offers", description: "Access special packages and deals only available on our website." },
    { title: "Direct Support", description: "Our dedicated concierge team is available 24/7 for any assistance." },
];

// =================================================================
// == 4. HELPER COMPONENTS
// =================================================================
const RoomCard: React.FC<{ room: Room; onAdd: (roomId: number) => void; onRemove: (roomId: number) => void; quantity: number; isPreSelected?: boolean; }> = ({ room, onAdd, onRemove, quantity, isPreSelected = false }) => (
    <motion.div
        className={`card-interactive border-2 overflow-hidden flex flex-col hover-3d ${
            isPreSelected ? 'border-action-accent bg-action-accent/5' : 'border-border-soft'
        }`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
        {isPreSelected && (
            <div className="bg-action-accent text-white text-xs font-poppins font-medium px-3 py-1 text-center">
                Pre-selected from Accommodation
            </div>
        )}
        <div className="relative h-64 overflow-hidden group">
            <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="font-playfair text-h3-sm text-text-heading">{room.name}</h3>
            <p className="font-cormorant text-text-subtle mt-2 mb-4 flex-grow">{room.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                                 {room.amenities.map((amenity) => <span key={amenity} className="text-xs bg-background-tertiary text-text px-3 py-1 rounded-full font-poppins hover-lift cursor-default">{amenity}</span>)}
            </div>
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-border-soft">
                <div>
                    <p className="font-poppins font-semibold text-action-accent text-xl">₹{room.price.toLocaleString()}</p>
                    <p className="text-xs text-text-subtle">per night</p>
                </div>
                <div className="flex items-center gap-2">
                                         <button onClick={() => onRemove(room.id)} className="w-8 h-8 bg-background-tertiary rounded-full flex items-center justify-center text-text-heading hover:bg-border-soft transition-colors disabled:opacity-50 hover-bounce" disabled={quantity === 0}><MinusIcon /></button>
                     <span className="w-10 text-center font-poppins font-medium text-lg animate-scale-breath">{quantity}</span>
                     <button onClick={() => onAdd(room.id)} className="w-8 h-8 bg-action-primary text-text-on-color rounded-full flex items-center justify-center hover:bg-action-primary-hover transition-colors hover-bounce"><PlusIcon /></button>
                </div>
            </div>
        </div>
    </motion.div>
);

const ConfirmationModal: React.FC<{ bookingDetails: GuestInfo & BookingDetails & PriceSummary; onClose: () => void; }> = ({ bookingDetails, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="card-tilt w-full max-w-lg p-8 text-center"
        >
            <h2 className="font-playfair text-h2 text-action-accent mb-4">Booking Confirmed!</h2>
            <p className="font-cormorant text-body text-text mb-6">Thank you, {bookingDetails.name}. Your heritage stay is confirmed. A confirmation email has been sent to {bookingDetails.email}.</p>
            <div className="text-left bg-background p-4 rounded-lg border border-border-soft mb-6 space-y-1">
                <p><strong>Check-in:</strong> {new Date(bookingDetails.checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p><strong>Check-out:</strong> {new Date(bookingDetails.checkOut).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p><strong>Total Paid:</strong> ₹{bookingDetails.total.toLocaleString()}</p>
            </div>
            <button onClick={onClose} className="w-full bg-action-primary text-text-on-color font-poppins font-medium py-3 rounded-lg hover:bg-action-primary-hover transition-colors">Close</button>
        </motion.div>
    </div>
);

// =================================================================
// == 5. MAIN BOOKING PAGE COMPONENT
// =================================================================
export default function BookingPage() {
    const [selectedRooms, setSelectedRooms] = useState<Record<number, number>>({});
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({ checkIn: '', checkOut: '', adults: 2, children: 0 });
    const [guestInfo, setGuestInfo] = useState<GuestInfo>({ name: '', email: '', phone: '', requests: '' });
    const [priceSummary, setPriceSummary] = useState<PriceSummary>({ nights: 0, roomTotal: 0, taxes: 0, total: 0 });
    const [errors, setErrors] = useState<Errors>({});
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchParams] = useSearchParams();

    // Handle URL parameters for pre-selecting rooms
    useEffect(() => {
        const roomParam = searchParams.get('room');
        if (roomParam) {
            const roomId = parseInt(roomParam);
            if (roomId && roomId >= 1 && roomId <= roomsData.length) {
                setSelectedRooms({ [roomId]: 1 });
            }
        }
    }, [searchParams]);

    useEffect(() => {
        const { checkIn, checkOut } = bookingDetails;
        if (checkIn && checkOut && new Date(checkOut) > new Date(checkIn) && Object.keys(selectedRooms).length > 0) {
            const date1 = new Date(checkIn);
            const date2 = new Date(checkOut);
            const timeDiff = date2.getTime() - date1.getTime();
            const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
            
            const roomTotal = Object.entries(selectedRooms).reduce((total, [roomId, quantity]) => {
                const room = roomsData.find(r => r.id === parseInt(roomId));
                return total + (room ? room.price * quantity : 0);
            }, 0) * nights;

            const taxes = roomTotal * 0.18;
            const total = roomTotal + taxes;
            setPriceSummary({ nights, roomTotal, taxes, total });
        } else {
            setPriceSummary({ nights: 0, roomTotal: 0, taxes: 0, total: 0 });
        }
    }, [bookingDetails, selectedRooms]);

    const handleAddRoom = (roomId: number) => setSelectedRooms(prev => ({ ...prev, [roomId]: (prev[roomId] || 0) + 1 }));
    const handleRemoveRoom = (roomId: number) => {
        setSelectedRooms(prev => {
            const newRooms = { ...prev };
            if (newRooms[roomId] > 1) newRooms[roomId]--;
            else delete newRooms[roomId];
            return newRooms;
        });
    };
    
    const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setBookingDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleGuestInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setGuestInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const validateForm = () => {
        const newErrors: Errors = {};
        if (Object.keys(selectedRooms).length === 0) newErrors.room = 'Please select at least one room.';
        if (!bookingDetails.checkIn) newErrors.checkIn = 'Check-in date is required.';
        if (!bookingDetails.checkOut) newErrors.checkOut = 'Check-out date is required.';
        if (new Date(bookingDetails.checkOut) <= new Date(bookingDetails.checkIn)) newErrors.checkOut = 'Check-out must be after check-in.';
        if (!guestInfo.name.trim()) newErrors.name = 'Full name is required.';
        if (!guestInfo.email || !/\S+@\S+\.\S+/.test(guestInfo.email)) newErrors.email = 'A valid email is required.';
        if (!guestInfo.phone.trim()) newErrors.phone = 'Phone number is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            document.getElementById('booking-summary')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setIsSubmitting(true);

        const bookingData = {
            full_name: guestInfo.name,
            email: guestInfo.email,
            phone: guestInfo.phone,
            special_requests: guestInfo.requests,
            check_in: bookingDetails.checkIn,
            check_out: bookingDetails.checkOut,
            adults: bookingDetails.adults,
            children: bookingDetails.children,
            selected_rooms: selectedRooms,
            total_price: priceSummary.total,
            nights: priceSummary.nights,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/room-bookings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Booking failed. Please try again later.');
            }

            setIsConfirmed(true);

        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-background font-cormorant text-text">
            <AnimatePresence>
                {isConfirmed && <ConfirmationModal bookingDetails={{...guestInfo, ...bookingDetails, ...priceSummary}} onClose={() => setIsConfirmed(false)} />}
            </AnimatePresence>
            
            <main>
                <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
                    {/* Background Image */}
                    <div 
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1600&h=900&fit=crop)',
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
                            className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
                        >
                            Booking
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white"
                        >
                            Select your preferred suite and embark on a journey through time and luxury.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins font-semibold px-6 py-3 rounded-xl text-base transition-all duration-300 transform hover:scale-105"
                        >
                            Book Now
                        </motion.button>
                    </div>
                </section>

                <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Pre-selection Success Message */}
                    {searchParams.get('room') && (
                        <div className="lg:col-span-3 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-action-accent/10 border border-action-accent/20 rounded-xl p-4 text-center"
                            >
                                <p className="font-poppins text-action-accent font-medium">
                                    ✅ Room pre-selected! The room from the accommodation section has been automatically added to your booking.
                                </p>
                            </motion.div>
                        </div>
                    )}

                    {/* Left Column: Room Selection */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="font-playfair text-h2 text-text-heading">Choose Your Suite(s)</h2>
                        {roomsData.map(room => (
                            <RoomCard 
                                key={room.id} 
                                room={room} 
                                onAdd={handleAddRoom} 
                                onRemove={handleRemoveRoom} 
                                quantity={selectedRooms[room.id] || 0}
                                isPreSelected={searchParams.get('room') === room.id.toString()}
                            />
                        ))}
                    </div>

                    {/* Right Column: Booking Summary & Form */}
                                         <div className="lg:col-span-1 sticky top-24">
                         <div id="booking-summary" className="card-base hover-glow p-6 border border-border-soft">
                            <h3 className="font-playfair text-h3-sm text-text-heading border-b border-border-soft pb-4 mb-4">Your Reservation</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div><label className="font-poppins text-xs font-medium text-text-heading block mb-1">Check-in</label><div className="relative"><input type="date" name="checkIn" value={bookingDetails.checkIn} onChange={handleBookingChange} className="w-full p-2 pl-10 bg-background border border-border-interactive rounded-lg"/><CalendarIcon /></div>{errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}</div>
                                    <div><label className="font-poppins text-xs font-medium text-text-heading block mb-1">Check-out</label><div className="relative"><input type="date" name="checkOut" value={bookingDetails.checkOut} onChange={handleBookingChange} className="w-full p-2 pl-10 bg-background border border-border-interactive rounded-lg"/><CalendarIcon /></div>{errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}</div>
                                    <div><label className="font-poppins text-xs font-medium text-text-heading block mb-1">Adults</label><div className="relative"><select name="adults" value={bookingDetails.adults} onChange={handleBookingChange} className="w-full p-2 pl-10 bg-background border border-border-interactive rounded-lg appearance-none"><option>1</option><option>2</option><option>3</option><option>4</option></select><UserIcon /></div></div>
                                    <div><label className="font-poppins text-xs font-medium text-text-heading block mb-1">Children</label><div className="relative"><select name="children" value={bookingDetails.children} onChange={handleBookingChange} className="w-full p-2 pl-10 bg-background border border-border-interactive rounded-lg appearance-none"><option>0</option><option>1</option><option>2</option></select><UserIcon /></div></div>
                                </div>
                                
                                <AnimatePresence>
                                {Object.keys(selectedRooms).length > 0 && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2 pt-4 border-t border-border-soft overflow-hidden">
                                        {Object.entries(selectedRooms).map(([roomId, quantity]) => {
                                            const room = roomsData.find(r => r.id === parseInt(roomId));
                                            return room ? <div key={roomId} className="flex justify-between text-sm"><span className="text-text-subtle">{quantity} x {room.name}</span><span>₹{(room.price * quantity).toLocaleString()}</span></div> : null;
                                        })}
                                        <div className="flex justify-between text-sm"><span className="text-text-subtle">Subtotal ({priceSummary.nights} nights)</span><span>₹{priceSummary.roomTotal.toLocaleString()}</span></div>
                                        <div className="flex justify-between text-sm"><span className="text-text-subtle">Taxes & Fees (18%)</span><span>₹{priceSummary.taxes.toLocaleString()}</span></div>
                                        <div className="flex justify-between font-bold text-lg pt-2 border-t border-border-soft"><span className="text-text-heading">Total</span><span>₹{priceSummary.total.toLocaleString()}</span></div>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                                {errors.room && <p className="text-red-500 text-xs mt-2 text-center">{errors.room}</p>}
                                
                                <div className="pt-4 border-t border-border-soft">
                                    <h4 className="font-playfair text-lg text-text-heading mb-4">Guest Information</h4>
                                    <div className="space-y-4">
                                        <input type="text" name="name" placeholder="Full Name" value={guestInfo.name} onChange={handleGuestInfoChange} className="w-full p-3 bg-background border border-border-interactive rounded-lg"/>{errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        <input type="email" name="email" placeholder="Email Address" value={guestInfo.email} onChange={handleGuestInfoChange} className="w-full p-3 bg-background border border-border-interactive rounded-lg"/>{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        <input type="tel" name="phone" placeholder="Phone Number" value={guestInfo.phone} onChange={handleGuestInfoChange} className="w-full p-3 bg-background border border-border-interactive rounded-lg"/>{errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                        <textarea name="requests" placeholder="Special Requests (optional)" value={guestInfo.requests} onChange={handleGuestInfoChange} className="w-full p-3 bg-background border border-border-interactive rounded-lg h-24 resize-none"></textarea>
                                    </div>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full mt-4 bg-action-accent hover:bg-action-accent-hover text-text-on-color font-poppins font-semibold py-3 rounded-lg transition-colors relative overflow-hidden disabled:opacity-70 hover-lift"
                                >
                                    <span className="relative z-10">
                                        {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                                    </span>
                                    {!isSubmitting && <span className="absolute inset-0 bg-white/10 animate-shimmer" style={{ backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.2) 50%, transparent 80%)'}}></span>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <section className="py-16 md:py-24 px-6 md:px-12 border-t border-border-soft">
                    <div className="container mx-auto">
                        <h2 className="font-playfair text-h2 text-text-heading text-center mb-12">Why Book With Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {whyBookWithUs.map((item, index) => (
                                                                 <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.1 }} className="hover-tilt-right">
                                     <div className="bg-action-primary/10 p-4 inline-block rounded-full mb-4 hover-pulse"><CheckCircleIcon /></div>
                                     <h3 className="font-playfair text-h4 text-text-heading">{item.title}</h3>
                                     <p className="font-cormorant text-text-subtle mt-2">{item.description}</p>
                                 </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
