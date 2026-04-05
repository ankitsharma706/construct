import React from 'react';
import { motion } from 'motion/react';

const CompanyOverview = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-linen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Who We Are</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-10">
              Engineering <br /> Excellence. <br /> <span className="italic">Delivered at Scale.</span>
            </h3>
            <p className="text-espresso/60 font-light leading-relaxed mb-8 italic">
              "Engineering excellence. Delivered at scale."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-xl font-serif text-espresso/80 leading-relaxed">
              Construct is a multi-disciplinary civil construction company specializing in large-scale infrastructure, commercial developments, and industrial projects.
            </p>
            <p className="text-espresso/60 font-light leading-relaxed">
              We operate as a fully integrated design-build partner — combining architecture, engineering, and execution under one unified system.
            </p>
            <p className="text-espresso/60 font-light leading-relaxed">
              From metro rail networks to corporate headquarters, our work reflects precision, scale, and long-term durability.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
