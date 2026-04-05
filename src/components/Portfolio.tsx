import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projectService } from '../services/firebaseService';
import { Project } from '../types';
import { PROJECTS } from '../constants';

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = projectService.subscribeAll((data) => {
      if (data.length > 0) {
        setProjects(data);
      } else {
        setProjects(PROJECTS.slice(0, 5));
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const project = projects[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  if (loading) return <div className="py-20 text-center">Loading Portfolio...</div>;
  if (projects.length === 0) return null;

  return (
    <section className="py-32 px-6 md:px-12 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-5xl md:text-7xl font-serif text-espresso">
            Impressions <br /> <span className="italic text-gold">That Endure</span>
          </h2>
          
          <div className="flex items-center space-x-8">
            <div className="text-xs uppercase tracking-[0.3em] text-espresso/40">
              <span className="text-espresso font-bold">0{currentIndex + 1}</span> / 0{projects.length}
            </div>
            <div className="flex space-x-2">
              <button onClick={prev} className="p-4 border border-espresso/10 hover:bg-espresso hover:text-cream transition-all">
                <ChevronLeft size={20} />
              </button>
              <button onClick={next} className="p-4 border border-espresso/10 hover:bg-espresso hover:text-cream transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-3/5 aspect-[4/3] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.8 }}
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>

          <div className="w-full lg:w-2/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-gold text-xs uppercase tracking-[0.3em] mb-6">{project.location}</div>
                <h3 className="text-4xl font-serif text-espresso mb-8 leading-tight">{project.title}</h3>
                <p className="text-espresso/60 font-light leading-relaxed mb-10">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-10 border-t border-linen pt-10">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-espresso/40 mb-2">Investment</div>
                    <div className="text-lg font-serif text-espresso">{project.cost}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-espresso/40 mb-2">Category</div>
                    <div className="text-xs font-light text-espresso/70 leading-relaxed uppercase tracking-widest">
                      {project.category}
                    </div>
                  </div>
                </div>

                <Link to={`/project/${project.id}`} className="mt-12 group flex items-center space-x-4 text-xs uppercase tracking-[0.2em] font-bold text-espresso">
                  <span>View Project Details</span>
                  <div className="w-12 h-px bg-espresso group-hover:w-20 transition-all duration-500" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
