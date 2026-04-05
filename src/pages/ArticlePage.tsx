import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { JOURNAL_POSTS } from '../constants';
import { JournalPost } from '../types';
import { ArrowLeft, ArrowRight, Clock, User, Share2 } from 'lucide-react';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<JournalPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<JournalPost[]>([]);

  useEffect(() => {
    const currentPost = JOURNAL_POSTS.find(p => p.id === id);
    if (currentPost) {
      setPost(currentPost);
      setRelatedPosts(JOURNAL_POSTS.filter(p => p.id !== id && p.category === currentPost.category).slice(0, 3));
    }
  }, [id]);

  if (!post) return <div className="pt-40 text-center font-serif text-2xl">Article Not Found</div>;

  return (
    <main className="pt-32 bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/journal" className="inline-flex items-center space-x-2 text-gold text-xs uppercase tracking-widest font-bold mb-12 hover:text-espresso transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Journal</span>
          </Link>
          
          <div className="flex items-center space-x-4 mb-8">
            <span className="px-4 py-1 bg-gold/10 text-gold text-[10px] uppercase tracking-widest font-bold rounded-full">
              {post.category}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-espresso/40">{post.date}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-espresso leading-tight mb-12">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-8 border-y border-espresso/10 mb-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <User size={16} className="text-gold" />
                <span className="text-xs uppercase tracking-widest font-bold text-espresso">Construct Editorial</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-gold" />
                <span className="text-xs uppercase tracking-widest font-bold text-espresso">6 Min Read</span>
              </div>
            </div>
            <button className="text-espresso/40 hover:text-gold transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="aspect-[21/9] w-full overflow-hidden mb-20"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12 mb-20">
            {post.content?.map((paragraph, i) => (
              <p key={i} className="text-xl font-light text-espresso/80 leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-gold">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Insights Section */}
          {post.insights && (
            <div className="bg-linen p-12 mb-20 border-l-4 border-gold">
              <h3 className="text-2xl font-serif text-espresso mb-8">Key Insights</h3>
              <ul className="space-y-6">
                {post.insights.map((insight, i) => (
                  <li key={i} className="flex items-start space-x-4">
                    <span className="text-gold font-serif text-xl">0{i + 1}.</span>
                    <p className="text-espresso/80 font-light leading-relaxed">{insight}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Conclusion */}
          {post.conclusion && (
            <div className="mb-32">
              <h3 className="text-3xl font-serif text-espresso mb-8 italic">Conclusion</h3>
              <p className="text-xl font-light text-espresso/80 leading-relaxed">
                {post.conclusion}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-32 bg-linen">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h3 className="text-gold text-xs uppercase tracking-widest mb-4">Read More</h3>
                <h4 className="text-4xl font-serif text-espresso">Related Perspectives</h4>
              </div>
              <Link to="/journal" className="text-xs uppercase tracking-widest font-bold border-b border-gold pb-1 hover:text-gold transition-colors">
                View All Journal
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {relatedPosts.map(related => (
                <Link key={related.id} to={`/journal/${related.id}`} className="group space-y-6">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={related.image} 
                      alt={related.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10px] uppercase tracking-widest text-espresso/40">{related.date}</div>
                    <h5 className="text-xl font-serif text-espresso group-hover:text-gold transition-colors leading-tight">
                      {related.title}
                    </h5>
                    <ArrowRight size={16} className="text-gold opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-32 px-6 md:px-12 bg-espresso text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-cream mb-12 italic">Let's Build Together</h2>
          <p className="text-cream/60 font-light mb-12 text-lg">
            Have a project that requires engineering precision and architectural excellence?
          </p>
          <Link to="/contact" className="px-12 py-6 bg-gold text-espresso text-xs uppercase tracking-[0.2em] font-bold hover:bg-cream transition-all">
            Start a Conversation
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default ArticlePage;
