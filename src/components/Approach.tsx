import React from 'react';
import { motion } from 'motion/react';

const Approach = () => {
  const steps = [
    { title: 'Understanding the Vision', desc: 'We begin by deeply analyzing client goals, site conditions, and constraints.' },
    { title: 'Design & Engineering', desc: 'Our experts develop detailed architectural and structural plans.' },
    { title: 'Execution Excellence', desc: 'We ensure strict adherence to timelines, safety, and quality benchmarks.' },
    { title: 'Delivery & Support', desc: 'We deliver fully operational infrastructure with ongoing support.' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-linen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24">
          <div className="max-w-2xl">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Our Approach</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight">
              From Concept to <br /> <span className="italic">Completion.</span>
            </h3>
          </div>
          <p className="text-espresso/60 max-w-sm font-light mt-8 lg:mt-0 italic">
            "From concept to completion — one accountable partner."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="text-gold text-4xl font-serif mb-8 group-hover:translate-x-2 transition-transform duration-500">
                0{index + 1}
              </div>
              <h4 className="text-xl font-serif mb-4 text-espresso">{step.title}</h4>
              <p className="text-espresso/60 font-light text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
