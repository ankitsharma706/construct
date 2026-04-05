import React from 'react';
import { motion } from 'motion/react';

const Expertise = () => {
  const team = [
    { label: 'Engineers', value: '120+' },
    { label: 'Senior Architects', value: '45' },
    { label: 'Project Managers', value: '30' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-linen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">The Collective</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-10">
              The Minds <br /> Behind the Build
            </h3>
            <p className="text-espresso/60 font-light leading-relaxed mb-12 italic">
              "Decades of expertise. One unified vision."
            </p>
            <p className="text-espresso/60 font-light leading-relaxed mb-12">
              A multidisciplinary team of engineers, architects, and planners working in sync 
               to deliver landmark infrastructure projects.
            </p>
            
            <div className="flex space-x-12">
              {team.map((item, index) => (
                <div key={index}>
                  <div className="text-4xl font-serif text-espresso mb-2">{item.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-espresso/40">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-espresso overflow-hidden grayscale">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" alt="Team Member" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square bg-gold/20 flex items-center justify-center p-8">
                <p className="text-espresso font-serif italic text-center">"Precision is our primary language."</p>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-square bg-linen border border-espresso/10" />
              <div className="aspect-[3/4] bg-espresso overflow-hidden grayscale">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" alt="Team Member" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
