import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const AboutCTA = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-espresso text-cream overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 transform translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-gold text-xs uppercase tracking-[0.4em] mb-8">Let’s Build Something That Lasts</h2>
          <h3 className="text-5xl md:text-8xl font-serif leading-tight mb-12">
            Precision, Scale, and <br /> <span className="italic text-gold">Reliability.</span>
          </h3>
          <p className="text-xl md:text-2xl font-light text-linen/60 mb-16 max-w-2xl mx-auto">
            Partner with Construct to bring your vision to life with precision, scale, and reliability.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="w-full md:w-auto px-12 py-6 bg-gold text-espresso text-xs uppercase tracking-widest font-bold hover:bg-cream transition-all">
              Get in Touch
            </Link>
            <Link to="/projects" className="w-full md:w-auto px-12 py-6 border border-gold text-gold text-xs uppercase tracking-widest font-bold hover:bg-gold hover:text-espresso transition-all">
              View Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
