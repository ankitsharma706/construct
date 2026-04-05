import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../constants';

export default function Process() {
  return (
    <section className="py-32 px-6 md:px-12 bg-espresso text-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-6">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] font-bold">Our Process</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-cream leading-tight text-balance">
              Precision <br />
              <span className="italic text-gold">at Every Stage</span>
            </h3>
          </div>
          <p className="text-cream/60 max-w-md text-lg leading-relaxed font-light">
            We follow a rigorous, engineering-led process to ensure every project is delivered with the highest standards of safety and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="space-y-8 p-12 border border-cream/10 hover:border-gold transition-all duration-700 relative group"
            >
              <div className="text-6xl font-serif text-gold/10 group-hover:text-gold transition-colors duration-700">{step.number}</div>
              <div className="space-y-4">
                <h4 className="text-2xl font-serif text-cream group-hover:text-gold transition-colors duration-700">{step.title}</h4>
                <p className="text-sm text-cream/40 leading-relaxed font-light">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
