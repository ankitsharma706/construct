import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Database, Activity, Radio, Plane } from 'lucide-react';

const TechStack = () => {
  const techs = [
    { icon: <Database size={24} />, title: 'BIM', desc: 'Building Information Modeling' },
    { icon: <Activity size={24} />, title: 'Digital Twin', desc: 'Real-time structural simulation' },
    { icon: <Cpu size={24} />, title: 'AI Analysis', desc: 'Predictive structural integrity' },
    { icon: <Radio size={24} />, title: 'Smart IoT', desc: 'Real-time site monitoring' },
    { icon: <Plane size={24} />, title: 'Drone Mapping', desc: 'Precision aerial surveying' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-linen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20">
          <div className="max-w-2xl">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Innovation</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight">
              Engineering <br /> Intelligence
            </h3>
          </div>
          <div className="mt-8 lg:mt-0 max-w-sm">
            <p className="text-espresso/60 font-light mb-6 italic">
              "We build with data, not guesswork."
            </p>
            <p className="text-espresso/60 font-light leading-relaxed">
              Our construction process is powered by advanced technologies that ensure 
              precision, efficiency, and sustainability at every stage.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {techs.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-cream p-10 border border-espresso/5 hover:border-gold transition-colors group"
            >
              <div className="text-gold mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {tech.icon}
              </div>
              <h4 className="text-xl font-serif text-espresso mb-2">{tech.title}</h4>
              <p className="text-[10px] uppercase tracking-widest text-espresso/40">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
