import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Building2 } from 'lucide-react';
import { PROJECTS, JOURNAL_POSTS } from '../constants';

interface RelatedContentProps {
  currentCategory?: string;
  excludeId?: string;
  type: 'journal' | 'projects' | 'mixed';
  title?: string;
}

export default function RelatedContent({
  currentCategory,
  excludeId,
  type,
  title = 'Related Architectural & Engineering Research',
}: RelatedContentProps) {
  const relatedJournal = JOURNAL_POSTS.filter(
    (post) => post.id !== excludeId && (!currentCategory || post.category === currentCategory)
  ).slice(0, 3);

  const relatedProjects = PROJECTS.filter(
    (proj) => proj.id !== excludeId && (!currentCategory || proj.category === currentCategory)
  ).slice(0, 3);

  return (
    <section className="my-20 border-t border-espresso/10 pt-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-gold">Internal Research Network</h3>
          <h4 className="text-2xl md:text-3xl font-serif text-espresso mt-1">{title}</h4>
        </div>
        <Link
          to={type === 'projects' ? '/projects' : '/journal'}
          className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gold hover:text-espresso transition-colors"
        >
          <span>Explore All Archive</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(type === 'journal' || type === 'mixed' ? relatedJournal : []).map((post) => (
          <Link
            key={post.id}
            to={`/journal/${post.id}`}
            className="group block bg-linen/60 p-6 border border-espresso/5 hover:border-gold transition-all duration-300"
          >
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-gold font-bold mb-3">
              <BookOpen size={12} />
              <span>{post.category}</span>
            </div>
            <h5 className="font-serif text-lg text-espresso group-hover:text-gold transition-colors line-clamp-2 mb-2">
              {post.title}
            </h5>
            <p className="text-xs text-espresso/60 line-clamp-2 mb-4 font-light leading-relaxed">
              {post.excerpt}
            </p>
            <div className="text-[9px] uppercase tracking-widest font-bold text-espresso/40 flex items-center gap-1 group-hover:text-gold transition-colors">
              <span>Read Technical Report</span>
              <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}

        {(type === 'projects' || (type === 'mixed' && relatedJournal.length === 0) ? relatedProjects : []).map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="group block bg-linen/60 p-6 border border-espresso/5 hover:border-gold transition-all duration-300"
          >
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-gold font-bold mb-3">
              <Building2 size={12} />
              <span>{project.category}</span>
            </div>
            <h5 className="font-serif text-lg text-espresso group-hover:text-gold transition-colors line-clamp-2 mb-2">
              {project.title}
            </h5>
            <p className="text-xs text-espresso/60 line-clamp-2 mb-4 font-light leading-relaxed">
              {project.description}
            </p>
            <div className="text-[9px] uppercase tracking-widest font-bold text-espresso/40 flex items-center gap-1 group-hover:text-gold transition-colors">
              <span>View Case Study</span>
              <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

