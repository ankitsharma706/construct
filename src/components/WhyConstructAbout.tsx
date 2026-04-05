import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const WhyConstructAbout = () => {
  const points = [
    'Integrated design-build model',
    'Single point of accountability',
    'Proven track record',
    'Strong project management systems',
    'On-time delivery commitment',
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-linen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Differentiation</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-10">
              Why <br /> <span className="italic">Construct?</span>
            </h3>
            <p className="text-espresso/60 font-light leading-relaxed mb-12 italic">
              "We eliminate complexity and deliver clarity at every stage."
            </p>
            
            <div className="space-y-6">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <CheckCircle2 className="text-gold" size={20} />
                  <span className="text-lg font-serif text-espresso">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-cream relative overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000" 
                alt="Construction Quality" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-espresso/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyConstructAbout;
