import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export default function Services() {
  return (
    <section className="py-32 px-6 md:px-12 bg-linen relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-6">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] font-bold">Our Expertise</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight text-balance">
              Building the Backbone <br />
              <span className="italic text-gold">of Modern Cities</span>
            </h3>
          </div>
          <p className="text-espresso/60 max-w-md text-lg leading-relaxed font-light">
            Each project is a testament to our engineering precision and architectural vision, from complex design to large-scale execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group bg-cream p-12 border border-espresso/5 hover:border-gold transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 -skew-x-12 transform translate-x-1/2 -translate-y-1/2 group-hover:bg-gold/10 transition-all" />
              
              <div className="space-y-8 relative z-10">
                <div className="text-4xl font-serif text-gold/20 group-hover:text-gold transition-colors duration-700">{service.number}</div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-serif text-espresso group-hover:text-gold transition-colors duration-700">{service.title}</h4>
                  <p className="text-sm text-espresso/60 leading-relaxed font-light">{service.description}</p>
                </div>
                <div className="pt-6 border-t border-espresso/5 flex justify-between items-center">
                  <div className="text-[10px] uppercase tracking-widest text-gold font-bold">{service.price}</div>
                  <ArrowUpRight size={16} className="text-espresso/20 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
