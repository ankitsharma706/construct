import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ClipboardCheck, Eye, Award } from 'lucide-react';

const QualitySafety = () => {
  const points = [
    { icon: <Award size={20} />, text: 'ISO 9001:2015 Certified' },
    { icon: <ClipboardCheck size={20} />, text: 'Multi-level inspection systems' },
    { icon: <Eye size={20} />, text: 'On-site safety monitoring' },
    { icon: <ShieldCheck size={20} />, text: 'Compliance with national standards' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Quality & Safety</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-8">
              Zero <br /> <span className="italic">Compromise.</span>
            </h3>
            <p className="text-espresso/60 font-light leading-relaxed mb-12 italic">
              "Zero compromise on quality and safety."
            </p>
            <p className="text-espresso/60 font-light leading-relaxed mb-12">
              We follow strict quality assurance protocols at every stage of construction. Safety is not a checklist — it is a culture embedded in every project.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    {point.icon}
                  </div>
                  <span className="text-sm font-light text-espresso/80">{point.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square bg-linen relative overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000" 
                alt="Safety on Site" 
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

export default QualitySafety;
