import React from 'react';
import { motion } from 'motion/react';

const GlobalStandards = () => {
  const standards = [
    { title: 'ISO 9001:2015', desc: 'Quality Management Systems' },
    { title: 'ISO 14001', desc: 'Environmental Management' },
    { title: 'OSHA Compliance', desc: 'Occupational Safety & Health' },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-cream border-t border-linen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-md text-center md:text-left">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-4">Compliance</h2>
            <h3 className="text-3xl font-serif text-espresso mb-4">Built to Global Standards</h3>
            <p className="text-espresso/60 font-light text-sm italic">"Global quality. Local execution."</p>
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            {standards.map((std, index) => (
              <motion.div
                key={std.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-xl font-serif text-espresso mb-2 tracking-widest">{std.title}</div>
                <div className="text-[10px] uppercase tracking-widest text-espresso/40">{std.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalStandards;
