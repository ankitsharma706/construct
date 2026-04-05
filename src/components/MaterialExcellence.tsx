import React from 'react';
import { motion } from 'motion/react';

const MaterialExcellence = () => {
  const materials = [
    { title: 'High-grade reinforced concrete', desc: 'Superior compressive strength for mega-structures.' },
    { title: 'Fire-resistant materials', desc: 'Advanced safety coatings and structural integrity.' },
    { title: 'Seismic-compliant structures', desc: 'Designed to withstand high-intensity tremors.' },
    { title: 'Premium interior finishes', desc: 'Architectural grade aesthetics and durability.' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-linen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-espresso/10 p-1 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=600" alt="Concrete Texture" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square bg-espresso/10 p-1 flex items-center justify-center mt-12">
                <img src="https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&q=80&w=600" alt="Steel Structure" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Quality</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-10">
              Material <br /> Excellence
            </h3>
            <p className="text-espresso/60 font-light leading-relaxed mb-12 italic">
              "Quality you can measure. Strength you can trust."
            </p>
            
            <div className="space-y-10">
              {materials.map((mat, index) => (
                <motion.div
                  key={mat.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-serif text-espresso mb-2">{mat.title}</h4>
                  <p className="text-xs font-light text-espresso/40 leading-relaxed">{mat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialExcellence;
