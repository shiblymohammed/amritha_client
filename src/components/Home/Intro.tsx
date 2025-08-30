import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// =================================================================
// == DATA STRUCTURE
// =================================================================
interface TimelineEvent {
  period: string;
  title: string;
  description: string;
  image: string;
  year: string;
}

// =================================================================
// == HELPER COMPONENTS
// =================================================================

const ChapterCard: React.FC<{ 
  event: TimelineEvent; 
  index: number; 
  isReversed: boolean;
}> = ({ event, index, isReversed }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 lg:gap-12 items-center mb-16 lg:mb-20`}
    >
      {/* Image Section */}
      <motion.div 
        style={{ y: imageY }}
        className="w-full lg:w-1/2 relative"
      >
        <div className="relative overflow-hidden rounded-2xl shadow-heritage">
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          {/* Year badge */}
          <div className="absolute -top-3 -right-3 bg-action-primary text-background px-3 py-1 rounded-xl shadow-lg">
            <span className="font-poppins text-sm font-medium">{event.year}</span>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="space-y-3">
          <p className="font-poppins text-xs tracking-wider text-action-accent uppercase">
            {event.period}
          </p>
          <h3 className="font-playfair text-2xl lg:text-3xl text-text-heading leading-tight">
            {event.title}
          </h3>
          <p className="font-cormorant text-base text-text leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// =================================================================
// == MAIN COMPONENT
// =================================================================
const Intro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const timelineEvents: TimelineEvent[] = [
    {
      period: "Early 1900s",
      year: "1900s",
      title: "The Essenden Bungalow",
      description: "A magnificent colonial bungalow built in Travancore architectural style, home to Eunice Gomez and T. Shivaramasethu Pillai, surrounded by lush gardens and whispering palms.",
      image: "./images/Intro/intro2.jpg"
    },
    {
      period: "1970s",
      year: "1970s",
      title: "The Cinematic Golden Era",
      description: "Transformed into the heart of Malayalam cinema, the legendary Kohinoor Restaurant buzzed with creative energy, making 'Dining on the Lawn' the most coveted table in Kerala's film world.",
      image: "./images/Dining/varanda1.jpg"
    },
    {
      period: "2010s",
      year: "2010s",
      title: "Heritage Reborn",
      description: "Master craftsmen lovingly restored every detail, breathing new life into weathered walls while preserving the soul of a bygone era through meticulous restoration and architectural preservation.",
      image: "./images/Intro/intro4.jpg"
    },
    {
      period: "Present Day",
      year: "2024",
      title: "The Amritha Heritage",
      description: "Today stands as a living testament to timeless elegance - a boutique sanctuary where colonial charm meets contemporary comfort, continuing the legacy of the revived Kohinoor Restaurant.",
      image: "./images/Intro/intro5.webp"
    }
  ];

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);

  return (
    <section 
      ref={sectionRef}
      data-section="intro" 
      className="relative bg-background py-12 md:py-16 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')]" />
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          style={{ y: headerY }}
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block mb-4"
          >
            <p className="font-poppins text-xs tracking-wider text-action-accent uppercase">
              Our Legacy
            </p>
            <div className="w-12 h-px bg-action-accent mx-auto mt-2" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-playfair text-text-heading mb-6 leading-tight"
          >
            Chapters of Our
            <br />
            <span className="text-action-primary">Timeless Story</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base md:text-lg font-cormorant text-text-subtle max-w-2xl mx-auto leading-relaxed"
          >
            Journey through time as we unfold the remarkable transformation 
            from a colonial residence to Kerala's most cherished heritage destination.
          </motion.p>
        </motion.div>

        {/* Story Chapters */}
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <ChapterCard
              key={event.period}
              event={event}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;