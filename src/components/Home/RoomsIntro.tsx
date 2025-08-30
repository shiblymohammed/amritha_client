import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, Bed, Star, Users } from 'lucide-react';

const RoomsIntro: React.FC = () => {
  return (
    <div className="relative">
      {/* Fixed Background Image (100vh) */}
      <div 
        className="fixed inset-0 w-full h-screen bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url(/images/Accommodation/room (5).webp)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Section (60vh) - Transparent */}
      <section className="relative h-[60vh] flex items-center justify-center z-10">
        <div className="text-center text-text-on-color px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <Sparkles className="w-16 h-16 text-action-accent mx-auto" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-cinzel text-lg uppercase tracking-widest text-action-accent mb-4"
          >
            Luxury Experience
          </motion.h3>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-playfair text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
          >
            Stay in Colonial Elegance
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-cormorant text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Our rooms are more than just places to sleep —they are a journey into history. Each room is uniquely designed with period furniture, natural lighting, and modern amenities
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-action-accent text-text-on-color font-poppins font-semibold rounded-full shadow-heritage hover:shadow-heritage-lg transition-all duration-300 group"
          >
            <span className="flex items-center gap-2 justify-center">
              Book Your Stay
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </div>
      </section>

      {/* Spacer to push content below */}
      <div className="h-screen bg-transparent"></div>
    </div>
  );
};

export default RoomsIntro;
