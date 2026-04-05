import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { projectService } from '../services/firebaseService';
import { Project } from '../types';
import { PROJECTS } from '../constants';
import { Search, Filter, ArrowRight } from 'lucide-react';

const ProjectGrid = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      // Try to fetch from Firestore
      const data = await projectService.getAll();
      // Combine with constants and remove duplicates by ID
      const combined = [...data];
      PROJECTS.forEach(p => {
        if (!combined.find(item => item.id === p.id)) {
          combined.push(p);
        }
      });
      setProjects(combined);
      setFilteredProjects(combined);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let result = projects;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProjects(result);
  }, [activeCategory, searchQuery, projects]);

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  if (loading) return <div className="py-20 text-center font-serif text-2xl">Loading Portfolio...</div>;

  return (
    <section className="py-24 px-6 md:px-12 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Our Portfolio</h2>
          <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-8">
            Impressions <br /> <span className="italic">That Endure.</span>
          </h3>
          <p className="text-lg font-light text-espresso/60 max-w-2xl leading-relaxed">
            We have delivered large-scale infrastructure and commercial projects across India — each engineered for durability, efficiency, and long-term value.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 pb-8 border-b border-espresso/10">
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest transition-all rounded-full border ${
                  activeCategory === cat 
                    ? 'bg-espresso text-cream border-espresso' 
                    : 'bg-transparent text-espresso/40 border-espresso/10 hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso/20" size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-linen/50 border border-espresso/5 rounded-full text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <Link to={`/project/${project.id}`} className="block space-y-8">
                  <div className="aspect-[4/5] bg-linen overflow-hidden relative">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="px-8 py-4 bg-cream text-espresso text-[10px] uppercase tracking-widest font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        View Details
                      </div>
                    </div>
                    <div className="absolute top-6 left-6 px-4 py-1 bg-cream/90 backdrop-blur-sm text-espresso text-[10px] uppercase tracking-widest font-bold">
                      {project.category}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-2xl font-serif text-espresso leading-tight group-hover:text-gold transition-colors">
                        {project.title}
                      </h4>
                      <div className="text-gold font-serif">{project.cost}</div>
                    </div>
                    <div className="flex items-center justify-between text-xs font-light text-espresso/40 uppercase tracking-widest">
                      <span>{project.location}</span>
                      {project.area && <span>{project.area}</span>}
                    </div>
                    <div className="pt-4 border-t border-espresso/5 flex items-center justify-between group-hover:text-gold transition-colors">
                      <span className="text-[10px] uppercase tracking-widest font-bold">Case Study</span>
                      <ArrowRight size={16} className="transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-40 text-center">
            <h4 className="text-2xl font-serif text-espresso/40 mb-4">No projects found matching your criteria.</h4>
            <button onClick={() => {setActiveCategory('All'); setSearchQuery('');}} className="text-gold uppercase tracking-widest text-xs font-bold border-b border-gold pb-1">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;
