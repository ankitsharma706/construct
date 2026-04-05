import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

const Presence = () => {
  const cities = [
    'Mumbai', 'Bangalore', 'Hyderabad', 'Delhi NCR', 'Chennai'
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-linen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 transform translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24">
          <div className="max-w-2xl">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Our Presence</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight">
              Geographic <br /> <span className="italic">Scale.</span>
            </h3>
          </div>
          <p className="text-espresso/60 max-w-sm font-light mt-8 lg:mt-0 italic">
            "Our expanding footprint reflects our capability to deliver at scale across diverse environments."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {cities.map((city, index) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                <MapPin size={32} />
              </div>
              <h4 className="text-2xl font-serif text-espresso mb-2">{city}</h4>
              <p className="text-[10px] uppercase tracking-widest text-espresso/40">Regional Hub</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Presence;
