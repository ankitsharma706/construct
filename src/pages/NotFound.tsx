import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Home, BookOpen, Layers } from 'lucide-react';
import { SEOHead } from '../lib/seo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream pt-40 pb-32 px-6 md:px-12 flex items-center justify-center">
      <SEOHead
        title="404 - Blueprint Not Found"
        description="The structural coordinate or requested document does not exist within the CONSTRUCT repository."
        noindex={true}
      />

      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-gold/10 text-gold text-xs uppercase tracking-widest font-bold">
          <Compass size={14} /> Elevation 404 · Unresolved Coordinate
        </div>

        <h1 className="text-6xl md:text-9xl font-serif text-espresso leading-none tracking-tighter">
          404
        </h1>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif text-espresso">
            Structural Blueprint Not Found
          </h2>
          <p className="text-espresso/60 font-light max-w-md mx-auto leading-relaxed text-sm md:text-base">
            The architectural blueprint or publication you requested has either moved, been archived, or never existed in our active directory.
          </p>
        </div>

        <div className="pt-6 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-espresso text-cream px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-colors"
          >
            <Home size={14} /> Return to Homepage
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 border border-espresso/20 text-espresso px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:border-gold hover:text-gold transition-colors"
          >
            <Layers size={14} /> View Projects
          </Link>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 border border-espresso/20 text-espresso px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:border-gold hover:text-gold transition-colors"
          >
            <BookOpen size={14} /> Read Journal
          </Link>
        </div>
      </div>
    </div>
  );
}

