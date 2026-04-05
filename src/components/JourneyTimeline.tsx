import React from 'react';
import { motion } from 'motion/react';

const JourneyTimeline = () => {
  const milestones = [
    { year: '2004', title: 'Company Founded', desc: 'The beginning of our engineering journey.' },
    { year: '2010', title: 'Expanded to 5 cities', desc: 'Establishing a multi-regional presence.' },
    { year: '2015', title: 'Delivered 100+ projects', desc: 'A century of successful project handovers.' },
    { year: '2020', title: 'Large-scale Infrastructure', desc: 'Entering the domain of mega-projects.' },
    { year: '2024', title: '₹12,000+ Cr Milestone', desc: 'Total infrastructure value completed.' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Our Journey</h2>
          <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight">
            Consistent <br /> <span className="italic">Growth & Trust.</span>
          </h3>
          <p className="text-espresso/60 font-light mt-8 italic">"Our journey reflects consistent growth and trust."</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-espresso/10 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="w-4 h-4 rounded-full bg-gold mb-8 mx-auto lg:mx-0 group-hover:scale-150 transition-transform duration-500" />
                <div className="text-3xl font-serif text-gold mb-2">{milestone.year}</div>
                <h4 className="text-xl font-serif text-espresso mb-4">{milestone.title}</h4>
                <p className="text-xs font-light text-espresso/60 leading-relaxed">{milestone.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
