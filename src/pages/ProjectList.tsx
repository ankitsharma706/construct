import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

import { projectService } from '../services/firebaseService';
import { useAuth } from '../context/AuthContext';
import { Plus, Settings } from 'lucide-react';

const categories = ['All', 'Commercial', 'Infrastructure', 'Industrial', 'Urban Development', 'Civic Infrastructure'];

export default function ProjectList() {
  const { isAdmin } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects] = useState<Project[]>(PROJECTS);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="bg-cream pt-48 pb-48 px-6 md:px-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-16">
          <div className="space-y-12">
            <h2 className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold">Portfolio</h2>
            <h3 className="text-6xl md:text-[12rem] font-serif text-espresso leading-[0.8] tracking-tighter text-balance">
              Landmark <br />
              <span className="italic text-gold block mt-6">Execution</span>
            </h3>
          </div>
          <div className="flex flex-col gap-8 flex-wrap items-start md:items-end border-l border-gold/20 pl-8 py-4">
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-[10px] uppercase tracking-[0.3em] font-bold transition-all border-b-2 pb-2",
                    activeCategory === cat ? "text-gold border-gold" : "text-espresso/20 border-transparent hover:text-espresso"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {isAdmin && (
              <div className="flex gap-12 mt-8 py-8 border-t border-gold/10 w-full md:w-auto animate-in fade-in slide-in-from-right-4 duration-1000">
                <Link to="/admin" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-espresso hover:text-gold transition-all group">
                   <Plus size={16} className="group-hover:rotate-180 transition-transform duration-700" /> Add Construction
                </Link>
                <Link to="/admin" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-gold hover:text-espresso transition-all group">
                   <Settings size={16} className="group-hover:rotate-90 transition-transform duration-500" /> Control Tower
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/projects/${project.id}`} className="group block space-y-10 group relative">
                  <div className="aspect-[3/4] overflow-hidden bg-linen relative shadow-xl group-hover:shadow-2xl transition-all duration-1000">
                    <img 
                      src={project.images[0]} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute top-8 left-8 bg-gold text-cream px-6 py-3 text-[8px] uppercase tracking-[0.4em] font-bold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700">
                      Case Study No. {i + 1}
                    </div>
                    <div className="absolute inset-0 bg-espresso/40 flex flex-col justify-end p-12 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="flex items-center gap-6 text-cream">
                        <div className="text-[10px] uppercase tracking-[0.5em] font-bold">Deep Analysis</div>
                        <div className="flex-1 h-px bg-cream/30" />
                        <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-700" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-px bg-gold/40" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gold">{project.category}</span>
                    </div>
                    <h4 className="text-4xl md:text-5xl font-serif text-espresso leading-tight group-hover:text-gold transition-colors duration-700">{project.title}</h4>
                    <div className="flex justify-between items-center py-6 border-t border-espresso/10">
                      <div className="flex items-center gap-2 text-espresso/40">
                         <MapPin size={14} className="text-gold" />
                         <span className="text-[9px] uppercase tracking-[0.3em] font-bold">{project.location}</span>
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-espresso italic">{project.cost}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
