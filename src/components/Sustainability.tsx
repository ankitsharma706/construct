import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Recycle, Zap, Droplets } from 'lucide-react';

const Sustainability = () => {
  const points = [
    { icon: <Recycle size={20} />, text: '32% reduction in material waste' },
    { icon: <Award size={20} />, text: 'LEED & IGBC aligned construction' },
    { icon: <Zap size={20} />, text: 'Energy-efficient building systems' },
    { icon: <Droplets size={20} />, text: 'Water recycling infrastructure' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald/5 rounded-full blur-3xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] bg-linen overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1518005020251-58296b8a76ff?auto=format&fit=crop&q=80&w=1000" 
                alt="Sustainable Architecture" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-espresso/80 to-transparent">
                <div className="text-emerald text-xs uppercase tracking-[0.3em] font-bold">Green Initiative</div>
              </div>
            </motion.div>
          </div>

          <div>
            <h2 className="text-emerald text-xs uppercase tracking-[0.3em] mb-6">Responsibility</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-8">
              Building for <br /> <span className="italic">Tomorrow</span>
            </h3>
            <p className="text-espresso/60 font-light leading-relaxed mb-12">
              Sustainability is not an add-on — it is embedded in every decision we make. 
              Our responsibility extends beyond construction — to the planet.
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

const Award = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

export default Sustainability;
