import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Recycle, Zap, Droplets } from 'lucide-react';

const SustainabilityCommitment = () => {
  const points = [
    { icon: <Zap size={20} />, text: 'Energy-efficient designs' },
    { icon: <Recycle size={20} />, text: 'Sustainable materials' },
    { icon: <Leaf size={20} />, text: 'Waste reduction strategies' },
    { icon: <Droplets size={20} />, text: 'Water management systems' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-linen overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald/5 rounded-full blur-3xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] bg-cream overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1449156001935-d2863fb72610?auto=format&fit=crop&q=80&w=1000" 
                alt="Sustainable Infrastructure" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-espresso/80 to-transparent">
                <div className="text-emerald text-xs uppercase tracking-[0.3em] font-bold">Sustainability</div>
              </div>
            </motion.div>
          </div>

          <div>
            <h2 className="text-emerald text-xs uppercase tracking-[0.3em] mb-6">Commitment</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-8">
              Responsible <br /> <span className="italic">Construction.</span>
            </h3>
            <p className="text-espresso/60 font-light leading-relaxed mb-12 italic">
              "Responsible construction for a sustainable future."
            </p>
            <p className="text-espresso/60 font-light leading-relaxed mb-12">
              We integrate environmentally responsible practices into every project. Our goal is to build infrastructure that supports both growth and sustainability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center text-emerald">
                    {point.icon}
                  </div>
                  <span className="text-sm font-light text-espresso/80">{point.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityCommitment;
