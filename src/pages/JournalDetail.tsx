import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { JOURNAL_POSTS } from '../constants';
import { JournalPost } from '../types';
import { journalService } from '../services/firebaseService';
import { 
  ArrowLeft, Calendar, User, Clock, Share2, ArrowRight, 
  Quote, Info, Zap, Loader2 
} from 'lucide-react';

export default function JournalDetail() {
  const { id } = useParams();
  const [post] = useState<JournalPost | null>(JOURNAL_POSTS.find(p => p.id === id) || null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-serif text-espresso">Article Not Found</h1>
          <Link to="/journal" className="text-gold uppercase tracking-widest font-bold border-b border-gold pb-1">Back to Journal Archive</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-40 pb-32 overflow-x-hidden relative">
      {/* Immersive Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gold z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-end">
          <div className="lg:col-span-8 space-y-12">
            <Link to="/journal" className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.4em] font-bold hover:text-espresso transition-all group">
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Journal Archive
            </Link>
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-8 text-[10px] uppercase tracking-[0.4em] font-bold text-espresso/40">
                <span className="text-gold bg-gold/5 px-4 py-2 border border-gold/10">{post.category}</span>
                <span className="flex items-center gap-2"><Calendar size={14} className="text-gold/40" /> {post.date}</span>
                <span className="flex items-center gap-2"><Clock size={14} className="text-gold/40" /> {post.readTime}</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-serif text-espresso leading-[0.85] tracking-tighter text-balance uppercase">
                {post.title}
              </h1>
            </div>
          </div>
          <div className="lg:col-span-4 pb-4">
             <div className="flex items-center gap-6 p-8 border border-espresso/10 bg-linen/50 backdrop-blur-sm">
                <div className="w-16 h-16 bg-espresso rounded-full flex items-center justify-center text-gold font-serif text-2xl italic shadow-xl">
                  {post.author?.[0]}
                </div>
                <div>
                   <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-1">Author</div>
                   <div className="text-xl font-serif text-espresso leading-none">{post.author}</div>
                   <div className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold mt-2">Principal Engineer</div>
                </div>
             </div>
          </div>
        </div>

        {/* Hero Visual Layer */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-[21/9] overflow-hidden bg-linen relative mb-40 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] group"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
        </motion.div>

        {/* Content & Journey Ecosystem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-32">
            {post.sections?.map((section, i) => (
              <motion.section 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative"
              >
                {/* Section Decoration */}
                <div className="absolute -left-12 top-0 text-[8rem] font-serif text-gold/5 pointer-events-none select-none italic group-hover:text-gold/10 transition-colors">
                  0{i + 1}
                </div>

                <div className="space-y-10 pl-4 border-l border-gold/10 group-hover:border-gold/30 transition-colors">
                   <h2 className="text-4xl md:text-5xl font-serif text-espresso leading-tight">{section.title}</h2>
                   <div className="relative">
                      <p className="text-2xl text-espresso/70 leading-[1.6] font-light first-letter:text-6xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left text-justify md:text-left">
                        {section.content}
                      </p>
                   </div>

                   {section.image && (
                     <div className="mt-16 relative">
                        <div className="aspect-video overflow-hidden border border-espresso/5 bg-linen group-hover:shadow-2xl transition-all duration-1000">
                           <img src={section.image} alt={section.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                        </div>
                     </div>
                   )}
                </div>
              </motion.section>
            ))}

            {/* Archive Highlights */}
            {post.insights && (
              <div className="bg-espresso p-16 md:p-24 text-cream relative overflow-hidden group">
                 <h3 className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-16 underline underline-offset-8">Critical Engineering Outcomes</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   {post.insights.map((insight, i) => (
                     <div key={i} className="flex items-start gap-8">
                       <div className="w-10 h-10 bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20 italic font-serif text-xs">
                          {i + 1}
                       </div>
                       <p className="text-xl font-light text-cream/70 leading-relaxed">
                         {insight}
                       </p>
                     </div>
                   ))}
                 </div>
              </div>
            )}

            {/* Gallery */}
            {post.gallery && (
               <div className="space-y-12">
                  <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold flex items-center gap-4">
                    <Share2 size={16} /> Technical Visual Journey
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {post.gallery.map((img, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square overflow-hidden bg-linen shadow-lg"
                      >
                        <img src={img} alt={`Journey ${i}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </motion.div>
                    ))}
                  </div>
               </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-20">
            {post.technicalBrief && (
              <div className="space-y-12">
                 <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold">Technical Brief</h4>
                 <div className="space-y-6">
                    {post.technicalBrief.map((item, i) => (
                      <div key={i} className="flex justify-between items-end pb-4 border-b border-espresso/5 group cursor-not-allowed">
                         <span className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold group-hover:text-gold transition-colors">{item.label}</span>
                         <span className="text-sm font-serif text-espresso italic">{item.value}</span>
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
