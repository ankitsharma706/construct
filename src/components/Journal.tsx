import React from 'react';
import { motion } from 'motion/react';
import { JOURNAL_POSTS } from '../constants';

const Journal = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-linen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Insights</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso">Notes from the Site</h3>
          </div>
          <button className="text-xs uppercase tracking-widest font-bold border-b border-espresso pb-2 hover:text-gold hover:border-gold transition-all">
            View All Articles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {JOURNAL_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="text-gold text-[10px] uppercase tracking-widest mb-4">{post.category}</div>
              <h4 className="text-2xl font-serif text-espresso mb-6 group-hover:text-gold transition-colors leading-snug">
                {post.title}
              </h4>
              <p className="text-espresso/60 font-light text-sm leading-relaxed mb-8">
                {post.excerpt}
              </p>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-espresso/40">
                <span>{post.date}</span>
                <span className="group-hover:translate-x-2 transition-transform duration-500">Read More →</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;
