import React from 'react';
import { motion } from 'motion/react';

const ImpactSection = () => {
  const impacts = [
    { label: 'Total Infrastructure Delivered', value: '₹12,000+ Cr' },
    { label: 'Pan-India Presence', value: '18 Cities' },
    { label: 'Built Environment', value: '5M+ Sq.ft' },
    { label: 'Lives Impacted Daily', value: '120,000+' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-espresso text-cream overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 transform translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Scale & Impact</h2>
          <h3 className="text-5xl md:text-7xl font-serif leading-tight max-w-3xl">
            Impact at Scale
          </h3>
          <p className="text-linen/60 font-light mt-8 max-w-xl">
            We don’t just build structures — we influence economies, mobility, and urban growth. 
            Every project is designed to serve generations — not just timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-serif text-gold mb-4">{impact.value}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-linen/40 leading-relaxed">
                {impact.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
