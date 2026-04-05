import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JOURNAL_POSTS } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { journalService } from '../services/firebaseService';

const categories = ['All', 'Engineering', 'Material Science', 'Infrastructure', 'Sustainability', 'Technology', 'Innovation'];

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts] = useState(JOURNAL_POSTS);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter(post => post.category === activeCategory || (activeCategory === 'Engineering' && post.id.includes('structural')));
  }, [activeCategory, posts]);

  const featuredPost = posts[0];

  return (
    <div className="bg-cream pt-48 pb-48 px-6 md:px-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-16">
          <div className="space-y-12">
            <h2 className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold">The Construct Journal</h2>
            <h3 className="text-6xl md:text-[10rem] font-serif text-espresso leading-[0.8] tracking-tighter text-balance">
              Deep <br />
              <span className="italic text-gold block mt-6">Narratives</span>
            </h3>
          </div>
          <p className="text-espresso/40 max-w-sm text-lg leading-relaxed font-light border-l border-gold/20 pl-8">
            An archival collection of engineering journeys, material breakthroughs, and theoretical frameworks for the future build environment.
          </p>
        </div>

        {/* Featured Stack */}
        <div className="mb-48">
          <div className="flex items-center gap-4 mb-16">
            <Zap size={20} className="text-gold" />
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-espresso">Featured Journey</h4>
          </div>
          <Link to={`/journal/${featuredPost.id}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 relative">
              <div className="aspect-[16/10] overflow-hidden bg-linen shadow-2xl relative z-10">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
              </div>
              {/* Decorative background stack */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-espresso/5 -z-10 translate-x-4 translate-y-4" />
              <div className="absolute -bottom-12 -right-12 w-full h-full bg-gold/5 -z-20 translate-x-8 translate-y-8" />
            </div>
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-6 text-[10px] text-gold uppercase tracking-[0.4em] font-bold">
                  <span>{featuredPost.category}</span>
                  <div className="w-8 h-px bg-gold/30" />
                  <span className="text-espresso/40">{featuredPost.readTime}</span>
                </div>
                <h4 className="text-5xl md:text-7xl font-serif text-espresso group-hover:text-gold transition-colors duration-700 leading-[1.1]">
                  {featuredPost.title}
                </h4>
                <p className="text-2xl text-espresso/60 leading-relaxed font-light italic">
                  "{featuredPost.excerpt}"
                </p>
              </div>
              <div className="flex items-center gap-6">
                 <div className="bg-espresso text-cream px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-bold group-hover:bg-gold transition-colors duration-500">
                    Open Case Study
                 </div>
                 <div className="text-espresso/40 text-[10px] uppercase tracking-[0.3em] font-bold">By {featuredPost.author}</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 mb-24 pb-8 border-b border-espresso/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-[10px] uppercase tracking-[0.4em] font-bold transition-all relative py-2",
                activeCategory === cat ? "text-espresso" : "text-espresso/30 hover:text-espresso"
              )}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div layoutId="activeCat" className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Organized Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
          <AnimatePresence mode="popLayout">
            {filteredPosts.slice(activeCategory === 'All' ? 1 : 0).map((post, i) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/journal/${post.id}`} className="group block space-y-12">
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden bg-linen shadow-lg group-hover:shadow-2xl transition-all duration-1000">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      />
                    </div>
                    <div className="absolute -bottom-8 -right-8 bg-cream p-6 shadow-xl border border-espresso/5 max-w-[200px] hidden lg:block">
                       <div className="text-[8px] uppercase tracking-[0.3em] font-bold text-gold mb-2 flex items-center gap-2">
                          <Layers size={10} /> Series Alpha
                       </div>
                       <p className="text-[10px] text-espresso/60 leading-tight">Exploring the core journey of {post.category.toLowerCase()} transformation.</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 text-[10px] text-espresso/30 uppercase tracking-[0.4em] font-bold">
                      <span>{post.date}</span>
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="text-4xl font-serif text-espresso group-hover:text-gold transition-colors duration-700 leading-tight">{post.title}</h4>
                    <p className="text-xl text-espresso/50 leading-relaxed font-light line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 pt-4">
                       <BookOpen size={16} className="text-gold" />
                       <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-espresso group-hover:pl-2 transition-all">Begin Reading</span>
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
