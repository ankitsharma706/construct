import React from 'react';
import { motion } from 'motion/react';

const Philosophy = () => {
  const principles = [
    { title: 'Precision', desc: 'Every detail engineered with accuracy' },
    { title: 'Integrity', desc: 'Transparent and accountable processes' },
    { title: 'Longevity', desc: 'Structures designed to last decades' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] bg-linen overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                alt="Philosophy Architecture" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-espresso/80 to-transparent">
                <div className="text-gold text-xs uppercase tracking-[0.3em] font-bold">Our Philosophy</div>
              </div>
            </motion.div>
          </div>

          <div>
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Our Philosophy</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-8">
              We don’t build for today. <br /> We build for the <span className="italic">future.</span>
            </h3>
            <p className="text-espresso/60 font-light leading-relaxed mb-12">
              We believe infrastructure is not just about construction — it is about creating systems that support life, business, and future generations.
            </p>

            <div className="space-y-12">
              {principles.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-2xl font-serif text-espresso mb-2">{point.title}</h4>
                  <p className="text-espresso/60 font-light leading-relaxed">{point.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
