import React from 'react';
import { motion } from 'motion/react';

const TeamExpertise = () => {
  const roles = [
    'Civil Engineers',
    'Structural Experts',
    'Architects',
    'Project Managers',
    'Safety Specialists',
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-espresso/5 p-1 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" alt="Expert" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square bg-espresso/5 p-1 flex items-center justify-center mt-12">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" alt="Expert" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Our People</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-10">
              Expertise that <br /> <span className="italic text-gold">Transforms Vision.</span>
            </h3>
            <p className="text-espresso/60 font-light leading-relaxed mb-12 italic">
              "Expertise that transforms vision into reality."
            </p>
            <p className="text-espresso/60 font-light leading-relaxed mb-12">
              Behind every project is a team of experienced professionals working in coordination. Our team brings together decades of industry experience to deliver complex projects with confidence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role, index) => (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <span className="text-lg font-serif text-espresso">{role}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamExpertise;
