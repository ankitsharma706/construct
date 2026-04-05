import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, TrendingUp } from 'lucide-react';

export default function FeaturedProject() {
  const project = PROJECTS[0];

  return (
    <section className="py-32 px-6 md:px-12 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-6">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] font-bold">Flagship Project</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight text-balance">
              Engineering <br />
              <span className="italic text-gold">Excellence</span>
            </h3>
          </div>
          <Link to="/projects" className="text-[10px] uppercase tracking-widest font-bold text-espresso border-b border-espresso/20 pb-1 hover:text-gold hover:border-gold transition-all inline-block">
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative group"
          >
            <div className="aspect-[16/10] overflow-hidden bg-linen relative">
              <img 
                src={project.images[0]} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-espresso/10 group-hover:bg-transparent transition-all duration-1000" />
            </div>
            
            {/* Overlay Info */}
            <div className="absolute -bottom-10 -right-10 hidden md:block bg-gold p-12 text-cream shadow-2xl space-y-6 max-w-sm">
              <div className="flex justify-between items-start">
                <TrendingUp size={24} />
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-60">Valuation</div>
              </div>
              <div className="text-4xl font-serif font-bold">{project.cost}</div>
              <p className="text-sm font-light opacity-80 leading-relaxed">
                A landmark corporate workspace designed for scalability and modern business operations.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gold">
                <MapPin size={16} />
                <span className="text-xs uppercase tracking-widest font-bold">{project.location}</span>
              </div>
              <h4 className="text-4xl md:text-5xl font-serif text-espresso leading-tight">{project.title}</h4>
              <p className="text-lg text-espresso/60 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-espresso/5">
              <div className="space-y-1">
                <div className="text-2xl font-serif text-espresso">{project.area}</div>
                <div className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Total Area</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-serif text-espresso">{project.year}</div>
                <div className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Completion</div>
              </div>
            </div>

            <Link 
              to={`/projects/${project.id}`} 
              className="bg-espresso text-cream px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-gold transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              Explore Case Study <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
