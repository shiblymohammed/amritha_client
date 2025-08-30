import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const StartSection: React.FC = () => {
  return (
    <section className="h-screen bg-background flex items-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-action-accent rounded-full" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-action-accent rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-action-accent rounded-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Subtitle with Sparkles Icon */}

            
            {/* Main Heading */}
            <h2 className="text-h2 font-playfair text-text-heading mb-6 relative text-center">
              Welcome to Amritha Heritage
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
            </h2>

            
            {/* Description */}
            <p className="font-cormorant text-xl text-text-subtle leading-relaxed text-center">
              A century-old colonial-style bungalow transformed into a boutique hotel in the heart of Thycaud, Thiruvananthapuram. A space where timeless architecture, lush courtyards, and refined hospitality come together for an unforgettable stay.
            </p>
            
            {/* Signature */}

          </motion.div>
          
          {/* Right Column - Image Placeholders */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Larger Background Placeholder */}
            <motion.div
              className="w-full max-w-2xl h-[400px] sm:h-[500px] lg:h-[600px] bg-background-secondary rounded-2xl flex items-center justify-center text-text-subtle font-poppins text-lg shadow-heritage border border-border-soft overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/home.webp"
                alt="Start"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Smaller Foreground Placeholder - Hidden on mobile, scaled down on tablet */}
            <motion.div
              className="hidden sm:block absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 lg:-bottom-12 lg:-left-12 w-48 h-[300px] sm:w-64 sm:h-[400px] lg:w-80 lg:h-[500px] bg-background-tertiary rounded-2xl flex items-center justify-center text-text-subtle font-poppins text-lg shadow-heritage-lg border border-border-soft overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/home2.webp"
                alt="Start"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
          
        </div>
      </div>

      {/* Hero Section with Parallax Background */}
      
    </section>
  );
};

export default StartSection;
