import React from 'react';
import { motion } from 'motion/react';

const CTA = () => {
  return (
    <section className="py-40 px-6 md:px-12 bg-cream text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="text-[20vw] font-serif font-bold text-espresso whitespace-nowrap">
          CONSTRUCT CONSTRUCT CONSTRUCT
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-8xl font-serif text-espresso leading-tight mb-12">
            Infrastructure That Lasts <span className="italic text-gold">Generations</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <button className="w-full md:w-auto px-12 py-6 bg-espresso text-cream text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all">
              View Portfolio
            </button>
            <button className="w-full md:w-auto px-12 py-6 border border-espresso text-espresso text-xs uppercase tracking-[0.2em] font-bold hover:bg-espresso hover:text-cream transition-all">
              Get in Touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
