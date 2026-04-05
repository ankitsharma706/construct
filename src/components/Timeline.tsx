import React from 'react';
import { motion } from 'motion/react';

const Timeline = () => {
  const steps = [
    { title: 'Concept', desc: 'Initial vision and feasibility studies.' },
    { title: 'Planning', desc: 'Strategic master planning and logistics.' },
    { title: 'Design', desc: 'Architectural sensitivity meets engineering.' },
    { title: 'Approval', desc: 'Regulatory compliance and permits.' },
    { title: 'Execution', desc: 'Rigorous construction management.' },
    { title: 'Delivery', desc: 'Handover and lifecycle support.' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Lifecycle</h2>
          <h3 className="text-5xl md:text-7xl font-serif text-espresso">From Vision to Reality</h3>
          <p className="text-espresso/60 font-light mt-8 italic">"Precision at every step."</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-espresso/10 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="w-4 h-4 rounded-full bg-gold mb-8 mx-auto lg:mx-0 group-hover:scale-150 transition-transform duration-500" />
                <h4 className="text-xl font-serif text-espresso mb-4">{step.title}</h4>
                <p className="text-xs font-light text-espresso/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
