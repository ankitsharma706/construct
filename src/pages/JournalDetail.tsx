import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { JOURNAL_POSTS } from '../constants';
import { JournalPost } from '../types';
import { 
  ArrowLeft, Calendar, User, Clock, Share2, 
  Quote, Info, Zap 
} from 'lucide-react';
import { SEOHead } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';
import AdSenseSlot from '../components/AdSenseSlot';
import RelatedContent from '../components/RelatedContent';

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
      <div className="min-h-screen flex items-center justify-center bg-cream px-6">
        <SEOHead
          title="Article Not Found | CONSTRUCT Journal"
          description="The requested research paper was not found in the CONSTRUCT archives."
          noindex={true}
        />
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-4xl md:text-6xl font-serif text-espresso">Article Not Found</h1>
          <p className="text-espresso/60 text-sm">
            The engineering document you are looking for does not exist or has been relocated.
          </p>
          <div>
            <Link
              to="/journal"
              className="inline-block bg-espresso text-cream px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-colors"
            >
              Back to Journal Archive
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream pt-36 pb-32 overflow-x-hidden relative">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`/journal/${post.id}`}
        ogType="article"
        ogImage={post.image}
        publishedTime={post.date}
        author={post.author}
        keywords={[post.category, 'structural engineering', 'architecture', 'materials']}
        breadcrumbs={[
          { name: 'Journal', url: '/journal' },
          { name: post.title, url: `/journal/${post.id}` },
        ]}
      />

      {/* Immersive Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Breadcrumbs
          items={[
            { name: 'Journal', url: '/journal' },
            { name: post.title, url: `/journal/${post.id}` },
          ]}
        />

        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 mt-6 items-end">
          <div className="lg:col-span-8 space-y-8">
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.4em] font-bold hover:text-espresso transition-all group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
              <span>Journal Archive</span>
            </Link>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-espresso/50">
                <span className="text-gold bg-gold/10 px-3 py-1">{post.category}</span>
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-gold" /> {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-gold" /> {post.readTime}
                </span>
              </div>
              <h1 className="text-5xl md:text-8xl font-serif text-espresso leading-[0.9] tracking-tighter text-balance">
                {post.title}
              </h1>
            </div>
          </div>
          <div className="lg:col-span-4 pb-2">
            <div className="flex items-center gap-6 p-6 border border-espresso/10 bg-linen/50 backdrop-blur-sm">
              <div className="w-14 h-14 bg-espresso text-gold rounded-full flex items-center justify-center font-serif text-xl italic shadow-md">
                {post.author?.[0]}
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-gold">Lead Author</div>
                <div className="text-lg font-serif text-espresso">{post.author}</div>
                <div className="text-[10px] uppercase tracking-widest text-espresso/50 font-bold">Structural Research Fellow</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Layer */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="aspect-[21/9] overflow-hidden bg-linen relative mb-24 shadow-2xl group"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 to-transparent" />
        </motion.div>

        {/* Content & Journey Ecosystem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            {post.sections?.map((section, i) => (
              <div key={i} className="group relative">
                <div className="space-y-8 pl-6 border-l-2 border-gold/20 group-hover:border-gold transition-colors">
                  <h2 className="text-3xl md:text-5xl font-serif text-espresso leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-xl text-espresso/70 leading-[1.7] font-light first-letter:text-6xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left">
                    {section.content}
                  </p>

                  {section.image && (
                    <div className="mt-12">
                      <div className="aspect-video overflow-hidden border border-espresso/5 bg-linen shadow-lg group-hover:shadow-2xl transition-all duration-700">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Inject ad between editorial sections compliant with policy */}
                {i === 0 && (
                  <AdSenseSlot
                    slot="article-mid-content"
                    label="Sponsored Research Insight"
                    minHeight={250}
                  />
                )}
              </div>
            ))}

            {/* Archive Highlights / Engineering Outcomes */}
            {post.insights && (
              <div className="bg-espresso p-12 md:p-16 text-cream relative overflow-hidden">
                <h3 className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-10 underline underline-offset-8">
                  Critical Engineering Outcomes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {post.insights.map((insight, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20 font-serif text-xs text-gold">
                        0{i + 1}
                      </div>
                      <p className="text-base font-light text-cream/80 leading-relaxed">
                        {insight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {post.gallery && (
              <div className="space-y-8">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold flex items-center gap-2">
                  <Share2 size={16} /> Technical Visual Documentation
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {post.gallery.map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden bg-linen shadow-md">
                      <img
                        src={img}
                        alt={`Technical documentation ${i + 1}`}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 h-fit space-y-12">
            {post.technicalBrief && (
              <div className="bg-linen p-8 border border-espresso/5 space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">
                  Technical Specifications
                </h3>
                <div className="space-y-4">
                  {post.technicalBrief.map((item, i) => (
                    <div key={i} className="flex justify-between items-baseline pb-3 border-b border-espresso/10">
                      <span className="text-[10px] uppercase tracking-widest text-espresso/50 font-bold">
                        {item.label}
                      </span>
                      <span className="text-sm font-serif text-espresso italic">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar Ad Unit (Only on Editorial Content) */}
            <AdSenseSlot
              slot="sidebar-editorial-unit"
              label="Sponsored Technical Partner"
              format="rectangle"
              minHeight={250}
            />

            <div className="bg-espresso text-cream p-8 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-gold font-bold">
                Consult With Author
              </h4>
              <p className="text-xs text-cream/70 leading-relaxed font-light">
                Discuss structural peer reviews or bespoke material formulations with our engineering division.
              </p>
              <Link
                to="/contact"
                className="inline-block w-full text-center bg-gold text-espresso py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-cream transition-colors"
              >
                Inquire With Directorate
              </Link>
            </div>
          </div>
        </div>

        {/* Contextual Internal Linking */}
        <RelatedContent
          currentCategory={post.category}
          excludeId={post.id}
          type="journal"
          title="Related Technical Case Studies"
        />
      </div>
    </div>
  );
}
