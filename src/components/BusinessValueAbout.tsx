import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Maximize, ShieldCheck, BarChart3 } from 'lucide-react';

const BusinessValueAbout = () => {
  const values = [
    { icon: <TrendingUp size={24} />, title: 'Optimized construction costs', desc: 'Efficiency-first design philosophy.' },
    { icon: <Maximize size={24} />, title: 'Efficient space utilization', desc: 'Maximizing every square foot.' },
    { icon: <ShieldCheck size={24} />, title: 'Durable infrastructure', desc: 'Adaptable to evolving needs.' },
    { icon: <BarChart3 size={24} />, title: 'High return on investment', desc: 'Quality that drives value.' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-espresso text-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24">
          <div className="max-w-2xl">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Business Value</h2>
            <h3 className="text-5xl md:text-7xl font-serif leading-tight">
              Value We <br /> <span className="italic">Deliver.</span>
            </h3>
          </div>
          <p className="text-linen/60 max-w-sm font-light mt-8 lg:mt-0 italic">
            "We build assets that continue to deliver value long after completion."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {values.map((val, index) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="text-gold mb-8 group-hover:translate-x-2 transition-transform duration-500">
                {val.icon}
              </div>
              <h4 className="text-xl font-serif mb-4 text-gold">{val.title}</h4>
              <p className="text-linen/40 font-light text-sm leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessValueAbout;
