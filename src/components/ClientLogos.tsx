import React from 'react';
import { motion } from 'motion/react';

const ClientLogos = () => {
  const clients = [
    'L&T', 'Tata Projects', 'Reliance Infrastructure', 'Adani Group', 'Government of India', 'NHAI', 'DLF', 'Godrej Properties'
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-cream border-y border-linen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-espresso/40 text-[10px] uppercase tracking-[0.4em] mb-4">Trusted by Industry Leaders</h2>
          <p className="text-espresso/60 font-light max-w-2xl mx-auto italic">
            "Trusted by institutions that define the nation’s infrastructure."
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center text-xl md:text-2xl font-serif text-espresso tracking-widest"
            >
              {client}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
