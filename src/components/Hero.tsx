import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden">
      {/* Left Content */}
      <div className="w-full md:w-1/2 px-6 md:px-20 flex flex-col justify-center py-32 md:py-0 z-10 bg-cream">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1 bg-gold"
            />
            <h1 className="text-6xl md:text-8xl font-serif text-espresso leading-[0.95] tracking-tighter text-balance">
              Infrastructure <br />
              <span className="italic text-gold">That Endures</span>
            </h1>
          </div>

          <p className="text-xl text-espresso/60 max-w-lg leading-relaxed font-light">
            We engineer large-scale commercial and civic infrastructure with architectural precision and a commitment to durability.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <Link 
              to="/projects" 
              className="bg-espresso text-cream px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-gold transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              View Portfolio <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              to="/about" 
              className="border border-espresso/10 px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-espresso hover:text-cream transition-all duration-500 flex items-center justify-center"
            >
              Our Philosophy
            </Link>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-espresso/5">
            <div className="space-y-1">
              <div className="text-2xl font-serif text-espresso">280+</div>
              <div className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Projects</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-serif text-espresso">30Y</div>
              <div className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Experience</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-serif text-espresso">₹12K Cr+</div>
              <div className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Valuation</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Visual */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern Infrastructure" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-espresso/10 mix-blend-multiply" />
        </motion.div>

        {/* Floating Project Card */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-12 right-12 md:left-auto md:right-12 md:w-80 bg-cream p-8 shadow-2xl border border-espresso/5"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="text-[10px] uppercase tracking-widest text-gold font-bold">Featured Project</div>
              <TrendingUp size={16} className="text-gold" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-espresso">Apex Corporate Tower</h3>
              <p className="text-xs text-espresso/40 uppercase tracking-widest">Mumbai · Commercial</p>
            </div>
            <Link to="/projects/apex-corporate-tower" className="text-[10px] uppercase tracking-widest font-bold text-espresso border-b border-espresso/20 pb-1 hover:text-gold hover:border-gold transition-all inline-block">
              Explore Case Study
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
