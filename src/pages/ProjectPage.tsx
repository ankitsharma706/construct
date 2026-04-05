import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import ModelViewer from '../components/ModelViewer';
import ProjectGallery from '../components/ProjectGallery';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ArrowRight, MapPin, Loader2, Settings } from 'lucide-react';
import { projectService } from '../services/firebaseService';

export default function ProjectPage() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [project] = useState<Project | null>(PROJECTS.find(p => p.id === id) || null);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-serif text-espresso">Project Not Found</h1>
          <Link to="/projects" className="text-gold uppercase tracking-widest font-bold border-b border-gold pb-1">Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-32 pb-32 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="space-y-12 flex-1">
            <div className="flex items-center gap-8">
              <Link to="/projects" className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.4em] font-bold hover:text-espresso transition-all group">
                <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Portfolio
              </Link>
              {isAdmin && (
                <Link to="/admin" className="flex items-center gap-2 text-espresso text-[10px] uppercase tracking-[0.4em] font-black border border-espresso/20 px-6 py-3 hover:bg-espresso hover:text-cream transition-all group animate-in fade-in slide-in-from-right-4 duration-1000 shadow-xl">
                  <Settings size={14} className="group-hover:rotate-90 transition-transform duration-500" /> Control Tower
                </Link>
              )}
            </div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-[10rem] font-serif text-espresso leading-[0.85] tracking-tighter"
            >
              {project.title} <br />
              <span className="italic text-gold block mt-4">{project.category}</span>
            </motion.h1>
          </div>
          <div className="flex flex-col items-start md:items-end gap-6 border-l md:border-l-0 md:border-r border-gold/20 pl-8 md:pl-0 md:pr-8 py-4">
            <div className="flex items-center gap-3 text-gold">
              <MapPin size={18} />
              <span className="text-xs uppercase tracking-[0.3em] font-bold">{project.location}</span>
            </div>
            <div className="text-6xl font-serif text-espresso leading-none">{project.cost}</div>
          </div>
        </div>

        {/* Featured Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-40"
        >
          <ProjectGallery images={project.images} title={project.title} />
        </motion.div>

        {/* Project Meta Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-40 py-20 border-y border-espresso/10">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Client</div>
            <div className="text-2xl font-serif text-espresso leading-tight">{project.client || "Institutional Alpha"}</div>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Volume</div>
            <div className="text-2xl font-serif text-espresso leading-tight">{project.area}</div>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Timeline</div>
            <div className="text-2xl font-serif text-espresso leading-tight">{project.year}</div>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Scale</div>
            <div className="text-2xl font-serif text-espresso leading-tight">{project.cost}</div>
          </div>
        </div>

        {/* Dynamic Content Sections */}
        <div className="space-y-40">
          {project.sections?.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              {section.type === 'narrative' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
                  <div className="lg:col-span-4">
                    <h2 className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-8">{section.title}</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-espresso leading-tight italic">{section.subtitle || "The Critical Vision"}</h3>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-2xl md:text-3xl text-espresso/80 leading-relaxed font-light first-letter:text-7xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left">
                      {section.description}
                    </p>
                  </div>
                </div>
              )}

              {section.type === 'gallery' && (
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row justify-between items-baseline gap-8 mb-12">
                    <div className="space-y-4">
                      <h2 className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">{section.title}</h2>
                      <h3 className="text-4xl md:text-7xl font-serif text-espresso tracking-tighter">{section.subtitle}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {section.images?.map((img, i) => (
                      <div key={i} className={`aspect-[4/5] overflow-hidden bg-linen border border-espresso/5 relative group ${i === 1 ? 'md:-translate-y-12' : ''}`}>
                        <img 
                          src={img} 
                          alt={`${section.title} ${i}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-espresso/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-cream text-[10px] uppercase tracking-[0.4em] font-bold border border-cream/30 px-6 py-3">View Detail</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.type === 'drawings' && (
                <div className="bg-espresso -mx-6 md:-mx-12 px-6 md:px-12 py-32 text-cream overflow-hidden">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
                      <div className="space-y-8">
                        <h2 className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">{section.title}</h2>
                        <h3 className="text-5xl md:text-8xl font-serif leading-none tracking-tighter italic">Technical <span className="text-gold not-italic">Clarity</span></h3>
                      </div>
                      <p className="text-cream/50 max-w-md text-lg leading-relaxed font-light">
                        Precise engineering schema that dictates performance and reliability.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                       {section.images?.map((img, i) => (
                         <div key={i} className="aspect-[16/9] bg-white/5 border border-white/10 p-4 md:p-8 hover:border-gold/30 transition-colors duration-1000">
                           <img 
                            src={img} 
                            alt={`Blueprint ${i}`} 
                            className="w-full h-full object-contain transition-opacity duration-1000"
                           />
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              )}

              {section.type === 'before-after' && (
                <div className="space-y-12">
                   <h2 className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">{section.title}</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.images?.slice(0, 2).map((img, i) => (
                        <div key={i} className="relative group overflow-hidden bg-linen">
                           <img src={img} alt="Comparison" className="w-full h-full object-cover transition-all duration-1000" />
                           <div className="absolute top-8 left-8 bg-espresso px-4 py-2 text-[8px] uppercase tracking-[0.3em] font-bold text-cream">
                              {i === 0 ? 'Foundation Phase' : 'Current Status'}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {section.type === 'metrics' && (
                <div className="py-24 border-y border-espresso/10">
                   <h2 className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-12">{section.title}</h2>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      {section.images?.map((img, i) => (
                        <div key={i} className="space-y-8">
                           <div className="aspect-square overflow-hidden bg-linen border border-espresso/5">
                              <img src={img} alt="Metric Visual" className="w-full h-full object-cover" />
                           </div>
                           <p className="text-xl text-espresso/80 font-light leading-relaxed italic">"{section.description}"</p>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {section.type === 'model' && (
                <div className="space-y-12">
                  <div className="max-w-3xl">
                    <h2 className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6">{section.title}</h2>
                    <p className="text-xl text-espresso/60 leading-relaxed font-light mb-12">{section.description}</p>
                  </div>
                  <div className="aspect-video bg-linen border border-espresso/10 relative shadow-2xl">
                    {project.modelUrl && <ModelViewer url={project.modelUrl} />}
                    <div className="absolute bottom-8 right-8 flex items-center gap-4">
                       <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-espresso/40">3D Interaction Active</span>
                       <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Conclusion / Outcome */}
        <div className="my-40 py-40 border-t border-espresso/10 text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="max-w-4xl mx-auto space-y-16"
            >
               <h2 className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold">Conclusion</h2>
               <p className="text-4xl md:text-7xl font-serif text-espresso leading-tight italic">
                 "{project.conclusion || project.outcome || "Engineering for the ages."}"
               </p>
               <div className="flex flex-col md:flex-row justify-center gap-8 pt-12">
                  <Link 
                    to="/contact" 
                    className="bg-espresso text-cream px-16 py-8 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold transition-all duration-700 flex items-center justify-center gap-4 group"
                  >
                    Initiate Discussion <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link 
                    to="/projects" 
                    className="bg-cream text-espresso border border-espresso px-16 py-8 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-espresso hover:text-cream transition-all duration-700"
                  >
                    Explore More
                  </Link>
               </div>
            </motion.div>
        </div>

        {/* Footer Related */}
        <div className="pb-32 text-balance">
          <div className="flex justify-between items-end mb-20">
            <h3 className="text-5xl font-serif text-espresso">Next <span className="italic text-gold">Briefs</span></h3>
            <Link to="/projects" className="text-gold uppercase tracking-widest font-bold text-[10px] border-b-2 border-gold/30 pb-2 hover:border-gold transition-all">View All Work</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PROJECTS.filter(p => p.id !== project.id).slice(0, 3).map((p) => (
              <Link key={p.id} to={`/projects/${p.id}`} className="group space-y-8">
                <div className="aspect-[4/3] overflow-hidden bg-linen relative">
                  <img 
                    src={p.images?.[0]} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute bottom-0 left-0 bg-gold text-cream text-[8px] uppercase tracking-widest font-bold px-4 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    Case Study
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-black text-gold/60">{p.category}</div>
                  <h4 className="text-3xl font-serif text-espresso group-hover:pl-4 transition-all duration-500">{p.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
