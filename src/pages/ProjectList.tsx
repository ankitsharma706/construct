import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Plus, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { SEOHead } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSenseSlot from '../components/AdSenseSlot';

export default function ProjectList() {
  const { isAdmin } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects] = useState<Project[]>(PROJECTS);

  // Dynamically derive categories from actual projects to prevent zero-content empty views
  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...rawCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="bg-cream pt-36 pb-48 px-6 md:px-12 overflow-x-hidden">
      <SEOHead
        title="Infrastructure & Architectural Projects Portfolio"
        description="Explore CONSTRUCT's completed landmark commercial towers, technology campuses, deep foundations, and industrial facilities."
        canonical="/projects"
        breadcrumbs={[{ name: 'Projects', url: '/projects' }]}
      />

      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ name: 'Projects Portfolio', url: '/projects' }]} />

        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-16 mt-6">
          <div className="space-y-6">
            <h2 className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold">
              Engineering Portfolio
            </h2>
            <h1 className="text-6xl md:text-9xl font-serif text-espresso leading-[0.85] tracking-tighter text-balance">
              Landmark <br />
              <span className="italic text-gold block mt-4">Execution</span>
            </h1>
          </div>

          <div className="flex flex-col gap-8 flex-wrap items-start md:items-end border-l border-gold/20 pl-8 py-4">
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-[10px] uppercase tracking-[0.3em] font-bold transition-all border-b-2 pb-2",
                    activeCategory === cat
                      ? "text-gold border-gold"
                      : "text-espresso/30 border-transparent hover:text-espresso"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {isAdmin && (
              <div className="flex gap-8 mt-4 py-4 border-t border-gold/10 w-full md:w-auto">
                <Link
                  to="/admin"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-espresso hover:text-gold transition-colors"
                >
                  <Plus size={14} /> Add Construction
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gold hover:text-espresso transition-colors"
                >
                  <Settings size={14} /> Control Tower
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Editorial Ad Slot */}
        <AdSenseSlot
          slot="projects-directory-top"
          label="Sponsored Civil Infrastructure Solutions"
          minHeight={250}
        />

        {/* Dynamic Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-linen p-12 text-center border border-espresso/10 space-y-4 my-12">
            <p className="text-espresso/60 text-sm">No construction projects currently cataloged in this classification.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="text-xs uppercase tracking-widest font-bold text-gold border-b border-gold pb-1"
            >
              Reset to All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  <Link to={`/projects/${project.id}`} className="group block space-y-8">
                    <div className="aspect-[3/4] overflow-hidden bg-linen relative shadow-xl group-hover:shadow-2xl transition-all duration-700">
                      <img 
                        src={project.images[0]} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute top-6 left-6 bg-gold text-cream px-4 py-2 text-[8px] uppercase tracking-[0.3em] font-bold">
                        Case Study 0{i + 1}
                      </div>
                      <div className="absolute inset-0 bg-espresso/40 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex items-center gap-4 text-cream">
                          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">View Technical Case</span>
                          <div className="flex-1 h-px bg-cream/30" />
                          <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-px bg-gold/40" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gold">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-3xl font-serif text-espresso leading-snug group-hover:text-gold transition-colors duration-500">
                        {project.title}
                      </h3>
                      <div className="flex justify-between items-center py-4 border-t border-espresso/10 text-xs">
                        <div className="flex items-center gap-2 text-espresso/50">
                          <MapPin size={14} className="text-gold" />
                          <span className="text-[9px] uppercase tracking-[0.3em] font-bold">{project.location}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-espresso italic">{project.cost}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
