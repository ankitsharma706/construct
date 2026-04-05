import React from 'react';
import { motion } from 'motion/react';

const AboutStats = () => {
  const stats = [
    { label: 'Years Experience', value: '30+' },
    { label: 'Projects Delivered', value: '280+' },
    { label: 'Infrastructure Value', value: '₹12,000+ Cr' },
    { label: 'Cities Across India', value: '18' },
    { label: 'Engineers & Experts', value: '120+' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-espresso text-cream overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 transform translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">At a Glance</h2>
          <h3 className="text-5xl md:text-7xl font-serif leading-tight max-w-3xl">
            Numbers that reflect trust, scale, and consistency.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-serif text-gold mb-4">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-linen/40 leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
