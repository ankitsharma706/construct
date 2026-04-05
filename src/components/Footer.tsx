import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream pt-32 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="md:col-span-2 space-y-8">
            <Link to="/" className="text-4xl font-serif tracking-tighter flex items-center gap-3">
              CONSTRUCT
            </Link>
            <p className="text-cream/60 max-w-md text-lg leading-relaxed font-light">
              We engineer infrastructure that endures. From landmark bridges to smart cities, we build the future with precision and architectural excellence.
            </p>
            <div className="flex gap-6 pt-4">
              <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-all"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-all"><Twitter size={18} /></a>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-widest text-gold font-bold">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/projects" className="text-cream/60 hover:text-gold transition-colors flex items-center gap-2">Projects <ArrowUpRight size={12} /></Link></li>
              <li><Link to="/about" className="text-cream/60 hover:text-gold transition-colors flex items-center gap-2">About <ArrowUpRight size={12} /></Link></li>
              <li><Link to="/services" className="text-cream/60 hover:text-gold transition-colors flex items-center gap-2">Services <ArrowUpRight size={12} /></Link></li>
              <li><Link to="/journal" className="text-cream/60 hover:text-gold transition-colors flex items-center gap-2">Journal <ArrowUpRight size={12} /></Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs uppercase tracking-widest text-gold font-bold">Inquiries</h4>
            <ul className="space-y-4">
              <li className="text-cream/60">Bandra Kurla Complex, Mumbai, India</li>
              <li className="text-cream/60">+91 98765 43210</li>
              <li className="text-cream/60">projects@construct.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-cream/40 uppercase tracking-widest">© 2024 CONSTRUCT INFRASTRUCTURE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-xs text-cream/40 uppercase tracking-widest">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
