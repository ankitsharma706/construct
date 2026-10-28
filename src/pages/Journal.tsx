import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JOURNAL_POSTS } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { SEOHead } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSenseSlot from '../components/AdSenseSlot';

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts] = useState(JOURNAL_POSTS);

  // Derive dynamic categories from available posts to prevent empty screens
  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(posts.map((post) => post.category)));
    return ['All', ...rawCategories];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  const featuredPost = posts[0];

  return (
    <div className="bg-cream pt-36 pb-48 px-6 md:px-12 overflow-x-hidden">
      <SEOHead
        title="Engineering Journal & Architectural Research"
        description="Explorations in high-performance geopolymer concrete, base isolation seismic engineering, digital twin FEA neural nets, and responsive building envelopes."
        canonical="/journal"
        breadcrumbs={[{ name: 'Journal', url: '/journal' }]}
      />

      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ name: 'Journal', url: '/journal' }]} />

        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-16 mt-6">
          <div className="space-y-6">
            <h2 className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold">
              The Construct Journal
            </h2>
            <h1 className="text-6xl md:text-9xl font-serif text-espresso leading-[0.85] tracking-tighter text-balance">
              Deep <br />
              <span className="italic text-gold block mt-4">Narratives</span>
            </h1>
          </div>
          <p className="text-espresso/60 max-w-sm text-lg leading-relaxed font-light border-l border-gold/20 pl-8">
            An archival collection of engineering journeys, material breakthroughs, and theoretical frameworks for the resilient built environment.
          </p>
        </div>

        {/* Featured Stack */}
        {featuredPost && (
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-8">
              <Zap size={18} className="text-gold" />
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-espresso">
                Featured Engineering Journey
              </h3>
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
              </div>
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-6 text-[10px] text-gold uppercase tracking-[0.4em] font-bold">
                    <span>{featuredPost.category}</span>
                    <div className="w-8 h-px bg-gold/30" />
                    <span className="text-espresso/40">{featuredPost.readTime}</span>
                  </div>
                  <h4 className="text-4xl md:text-6xl font-serif text-espresso group-hover:text-gold transition-colors duration-700 leading-tight">
                    {featuredPost.title}
                  </h4>
                  <p className="text-xl text-espresso/60 leading-relaxed font-light italic">
                    &ldquo;{featuredPost.excerpt}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-espresso text-cream px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold group-hover:bg-gold transition-colors duration-500 shadow-xl">
                    Open Technical Analysis
                  </div>
                  <div className="text-espresso/40 text-[10px] uppercase tracking-[0.3em] font-bold">By {featuredPost.author}</div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* AdSense In-Feed Editorial Slot */}
        <AdSenseSlot
          slot="journal-feed-ad"
          label="Sponsored Architecture & Materials Research"
          minHeight={250}
        />

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 mb-20 pb-6 border-b border-espresso/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-[10px] uppercase tracking-[0.4em] font-bold transition-all relative py-2",
                activeCategory === cat ? "text-espresso" : "text-espresso/40 hover:text-espresso"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <Link to={`/journal/${post.id}`} className="group block space-y-8">
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden bg-linen shadow-lg group-hover:shadow-2xl transition-all duration-700">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-cream p-4 shadow-xl border border-espresso/5 max-w-[180px] hidden lg:block">
                      <div className="text-[8px] uppercase tracking-[0.3em] font-bold text-gold mb-1 flex items-center gap-1">
                        <Layers size={10} /> Research Series
                      </div>
                      <p className="text-[10px] text-espresso/60 leading-tight">Technical evaluation of {post.category.toLowerCase()} systems.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-[10px] text-espresso/40 uppercase tracking-[0.3em] font-bold">
                      <span>{post.date}</span>
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="text-3xl font-serif text-espresso group-hover:text-gold transition-colors duration-500 leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-base text-espresso/60 leading-relaxed font-light line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <BookOpen size={16} className="text-gold" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-espresso group-hover:text-gold group-hover:translate-x-1 transition-all">
                        Begin Reading
                      </span>
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
