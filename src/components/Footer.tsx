import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Linkedin, Twitter, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../lib/seo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-cream pt-24 pb-12 px-6 md:px-12 border-t border-cream/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2 space-y-8">
            <Link to="/" className="text-3xl md:text-4xl font-serif tracking-tighter flex items-center gap-3 hover:text-gold transition-colors">
              CONSTRUCT
            </Link>
            <p className="text-cream/70 max-w-md text-base leading-relaxed font-light">
              We engineer enduring civil infrastructure, seismic-resilient commercial headquarters, and intelligent architectural systems across global metropolitan centers.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com/construct_infra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CONSTRUCT on Instagram"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://linkedin.com/company/construct-engineering"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with CONSTRUCT on LinkedIn"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://twitter.com/construct_eng"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CONSTRUCT on Twitter"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-all"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-gold font-bold">Architecture & Firm</h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link to="/projects" className="text-cream/70 hover:text-gold transition-colors flex items-center gap-2">
                  Projects Archive <ArrowUpRight size={12} />
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream/70 hover:text-gold transition-colors flex items-center gap-2">
                  About Our Practice <ArrowUpRight size={12} />
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-cream/70 hover:text-gold transition-colors flex items-center gap-2">
                  Engineering Services <ArrowUpRight size={12} />
                </Link>
              </li>
              <li>
                <Link to="/journal" className="text-cream/70 hover:text-gold transition-colors flex items-center gap-2">
                  Technical Journal <ArrowUpRight size={12} />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream/70 hover:text-gold transition-colors flex items-center gap-2">
                  Contact Directorate <ArrowUpRight size={12} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-gold font-bold">Inquiries & Headquarters</h4>
            <ul className="space-y-3 text-sm text-cream/70 font-light">
              <li className="leading-relaxed">Bandra Kurla Complex, Mumbai, Maharashtra 400051, India</li>
              <li>
                <a href="tel:+919876543210" className="hover:text-gold transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:projects@construct.com" className="hover:text-gold transition-colors underline underline-offset-4">
                  projects@construct.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-cream/40 uppercase tracking-widest">
            © {currentYear} CONSTRUCT INFRASTRUCTURE & STRUCTURAL ENGINEERING. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap gap-8 text-[11px] text-cream/50 uppercase tracking-widest">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link to="/services" className="hover:text-gold transition-colors">
              Services
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
