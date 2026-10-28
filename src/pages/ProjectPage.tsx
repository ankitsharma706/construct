import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import ModelViewer from '../components/ModelViewer';
import ProjectGallery from '../components/ProjectGallery';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ArrowRight, MapPin, Settings } from 'lucide-react';
import { SEOHead } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSenseSlot from '../components/AdSenseSlot';
import RelatedContent from '../components/RelatedContent';

export default function ProjectPage() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [project] = useState<Project | null>(PROJECTS.find(p => p.id === id) || null);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-6">
        <SEOHead
          title="Project Not Found | CONSTRUCT"
          description="The requested architectural or structural project is not found in the directory."
          noindex={true}
        />
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-4xl md:text-6xl font-serif text-espresso">Project Not Found</h1>
          <p className="text-espresso/60 text-sm">
            The project blueprint you requested has been moved or does not exist.
          </p>
          <div>
            <Link
              to="/projects"
              className="inline-block bg-espresso text-cream px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-colors"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-36 pb-32 overflow-x-hidden">
      <SEOHead
        title={`${project.title} | ${project.location}`}
        description={project.description}
        canonical={`/projects/${project.id}`}
        ogImage={project.images[0]}
        breadcrumbs={[
          { name: 'Projects', url: '/projects' },
          { name: project.title, url: `/projects/${project.id}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Breadcrumbs
          items={[
            { name: 'Projects', url: '/projects' },
            { name: project.title, url: `/projects/${project.id}` },
          ]}
        />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-12 mt-6">
          <div className="space-y-8 flex-1">
            <div className="flex items-center gap-6">
              <Link
                to="/projects"
                className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.4em] font-bold hover:text-espresso transition-all group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                <span>Back to Portfolio</span>
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 text-espresso text-[10px] uppercase tracking-[0.4em] font-black border border-espresso/20 px-4 py-2 hover:bg-espresso hover:text-cream transition-all group shadow-sm"
                >
                  <Settings size={14} className="group-hover:rotate-90 transition-transform duration-500" /> Control Tower
                </Link>
              )}
            </div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-8xl font-serif text-espresso leading-[0.9] tracking-tighter"
            >
              {project.title} <br />
              <span className="italic text-gold block mt-2 text-3xl md:text-5xl">{project.category}</span>
            </motion.h1>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 border-l md:border-l-0 md:border-r border-gold/20 pl-6 md:pl-0 md:pr-6 py-2">
            <div className="flex items-center gap-2 text-gold">
              <MapPin size={18} />
              <span className="text-xs uppercase tracking-[0.3em] font-bold">{project.location}</span>
            </div>
            <div className="text-4xl md:text-5xl font-serif text-espresso leading-none">{project.cost}</div>
          </div>
        </div>

        {/* Project Meta Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-espresso/10 mb-20">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold block mb-1">Client</span>
            <span className="font-serif text-lg text-espresso">{project.client || 'Confidential'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold block mb-1">Gross Area</span>
            <span className="font-serif text-lg text-espresso">{project.area || 'N/A'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold block mb-1">Completion</span>
            <span className="font-serif text-lg text-espresso">{project.year}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold block mb-1">Category</span>
            <span className="font-serif text-lg text-gold">{project.category}</span>
          </div>
        </div>

        {/* Hero Gallery */}
        <div className="mb-24">
          <ProjectGallery images={project.images} title={project.title} />
        </div>

        {/* Editorial Project Ad Slot */}
        <AdSenseSlot
          slot="project-detail-mid"
          label="Sponsored Structural Innovation"
          minHeight={250}
        />

        {/* Sections Content */}
        <div className="space-y-24 my-20">
          {project.sections?.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {section.type === 'narrative' && (
                <div className="max-w-4xl space-y-4">
                  {section.subtitle && (
                    <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold">
                      {section.subtitle}
                    </span>
                  )}
                  <h2 className="text-3xl md:text-5xl font-serif text-espresso leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-xl text-espresso/70 leading-relaxed font-light">
                    {section.description}
                  </p>
                </div>
              )}

              {section.type === 'drawings' && (
                <div className="space-y-6">
                  <div className="max-w-3xl space-y-2">
                    <h2 className="text-3xl font-serif text-espresso">{section.title}</h2>
                    {section.description && (
                      <p className="text-espresso/60 font-light">{section.description}</p>
                    )}
                  </div>
                  {section.images && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {section.images.map((img, i) => (
                        <div key={i} className="aspect-[4/3] bg-linen overflow-hidden shadow-lg border border-espresso/5">
                          <img src={img} alt={`${section.title} ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {section.type === 'gallery' && (
                <div className="space-y-6">
                  <div className="max-w-3xl space-y-2">
                    <h2 className="text-3xl font-serif text-espresso">{section.title}</h2>
                    {section.description && (
                      <p className="text-espresso/60 font-light">{section.description}</p>
                    )}
                  </div>
                  {section.images && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {section.images.map((img, i) => (
                        <div key={i} className="aspect-[16/9] bg-linen overflow-hidden shadow-lg border border-espresso/5">
                          <img src={img} alt={`${section.title} ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {section.type === 'model' && (
                <div className="space-y-8">
                  <div className="max-w-3xl space-y-2">
                    <h2 className="text-3xl font-serif text-espresso">{section.title}</h2>
                    {section.description && (
                      <p className="text-espresso/60 font-light">{section.description}</p>
                    )}
                  </div>
                  <div className="aspect-video bg-linen border border-espresso/10 relative shadow-2xl">
                    {project.modelUrl && <ModelViewer url={project.modelUrl} />}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Conclusion / Outcome */}
        <div className="my-24 py-20 border-t border-espresso/10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">
              Engineering Outcome
            </span>
            <p className="text-3xl md:text-5xl font-serif text-espresso leading-snug italic">
              &ldquo;{project.conclusion || project.outcome || "Engineering for enduring structural longevity."}&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
              <Link 
                to="/contact" 
                className="bg-espresso text-cream px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-colors flex items-center justify-center gap-3 shadow-xl"
              >
                <span>Initiate Project Scope</span>
                <ArrowRight size={14} />
              </Link>
              <Link 
                to="/projects" 
                className="bg-cream text-espresso border border-espresso/20 px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:border-gold hover:text-gold transition-colors"
              >
                Explore More Case Studies
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Related Case Studies */}
        <RelatedContent
          currentCategory={project.category}
          excludeId={project.id}
          type="projects"
          title="Related Civil & Structural Case Studies"
        />
      </div>
    </div>
  );
}
