import React from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, Building2, Award } from 'lucide-react';

const WhyUs = () => {
  const stats = [
    { icon: <Shield className="text-gold" size={32} />, label: 'ISO Certified', value: '9001:2015' },
    { icon: <Clock className="text-gold" size={32} />, label: 'On-Time Delivery', value: '99%' },
    { icon: <Building2 className="text-gold" size={32} />, label: 'Projects Completed', value: '280+' },
    { icon: <Award className="text-gold" size={32} />, label: 'Experience', value: '30 Years' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Our Standard</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-10">
              Precision at <br /> Every Stage
            </h3>
            <p className="text-espresso/60 font-light leading-relaxed mb-12 max-w-lg">
              We operate at a scale that demands absolute accuracy. Our reputation is built 
              on three decades of delivering complex infrastructure projects that stand 
              the test of time and environment.
            </p>
            <button className="px-10 py-5 bg-espresso text-cream text-xs uppercase tracking-widest hover:bg-gold transition-all">
              Download Corporate Profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-px bg-espresso/5 border border-espresso/5">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-cream p-12 flex flex-col items-center text-center group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>
                <div className="text-4xl font-serif text-espresso mb-2">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-espresso/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
