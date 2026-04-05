import React from 'react';
import { motion } from 'motion/react';
import { Building, Train, Factory, Laptop, Landmark } from 'lucide-react';

const Industries = () => {
  const industries = [
    { icon: <Building size={24} />, title: 'Commercial Office Spaces' },
    { icon: <Train size={24} />, title: 'Metro & Rail Infrastructure' },
    { icon: <Factory size={24} />, title: 'Industrial & Manufacturing' },
    { icon: <Laptop size={24} />, title: 'IT & Tech Campuses' },
    { icon: <Landmark size={24} />, title: 'Government Projects' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-linen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Sectors</h2>
          <h3 className="text-5xl md:text-7xl font-serif text-espresso">Industries We Serve</h3>
          <p className="text-espresso/60 font-light mt-8 italic">"Built across sectors that power the economy."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-espresso/10 border border-espresso/10">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-linen p-12 flex flex-col items-center text-center group hover:bg-espresso transition-colors duration-500"
            >
              <div className="text-gold mb-8 group-hover:scale-110 transition-transform duration-500">
                {industry.icon}
              </div>
              <h4 className="text-sm font-serif text-espresso group-hover:text-cream transition-colors leading-relaxed">
                {industry.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
