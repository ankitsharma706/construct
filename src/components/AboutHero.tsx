import React from 'react';
import { motion } from 'motion/react';
import { Download } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative pt-48 pb-32 px-6 md:px-12 bg-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linen -skew-x-12 transform translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-gold text-xs uppercase tracking-[0.4em] mb-8">About Construct</h1>
          <h2 className="text-6xl md:text-8xl font-serif text-espresso leading-tight mb-12">
            Building the Backbone of <br /> <span className="italic text-gold">Modern Cities</span>
          </h2>
          <p className="text-xl md:text-2xl font-light text-espresso/60 leading-relaxed mb-12 max-w-3xl">
            For over three decades, Construct has been at the forefront of civil engineering and infrastructure development — delivering projects that define skylines, enable mobility, and power economic growth.
          </p>
          
          <button className="flex items-center space-x-4 px-10 py-5 bg-espresso text-cream text-xs uppercase tracking-widest font-bold hover:bg-gold transition-all">
            <Download size={16} />
            <span>Download Corporate Profile</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
