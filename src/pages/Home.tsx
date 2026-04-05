import { motion } from 'motion/react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FeaturedProject from '../components/FeaturedProject';
import Process from '../components/Process';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Leaf, Building2, TrendingUp } from 'lucide-react';
import { JOURNAL_POSTS } from '../constants';

export default function Home() {
  return (
    <div className="bg-cream">
      <Hero />
      
      {/* Services Section */}
      <Services />

      {/* Featured Project Section */}
      <FeaturedProject />

      {/* Process Section */}
      <Process />

      {/* Technology Section */}
      <section className="py-32 px-6 md:px-12 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <h2 className="text-gold text-xs uppercase tracking-[0.3em] font-bold">Innovation</h2>
                <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight text-balance">
                  Smart <br />
                  <span className="italic text-gold">Construction Tech</span>
                </h3>
              </div>
              <p className="text-lg text-espresso/60 leading-relaxed font-light">
                We leverage the latest in Building Information Modeling (BIM), AI-driven load analysis, and IoT-enabled site monitoring to deliver projects with 100% precision.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-4">
                  <Cpu className="text-gold" size={32} />
                  <h4 className="text-xl font-serif text-espresso">BIM Modeling</h4>
                  <p className="text-xs text-espresso/40 leading-relaxed font-light uppercase tracking-widest">3D Structural Simulation</p>
                </div>
                <div className="space-y-4">
                  <TrendingUp className="text-gold" size={32} />
                  <h4 className="text-xl font-serif text-espresso">AI Analysis</h4>
                  <p className="text-xs text-espresso/40 leading-relaxed font-light uppercase tracking-widest">Predictive Risk Modeling</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-square bg-linen relative overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
                alt="Construction Tech" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-espresso/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-32 px-6 md:px-12 bg-cream text-espresso overflow-hidden border-y border-espresso/5">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="flex justify-center"><Leaf className="text-gold" size={48} /></div>
          <div className="space-y-6">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] font-bold">Sustainability</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight text-balance max-w-4xl mx-auto">
              Engineering a <br />
              <span className="italic text-gold">Greener Future</span>
            </h3>
          </div>
          <p className="text-xl text-espresso/60 max-w-2xl mx-auto leading-relaxed font-light">
            Our commitment to environmental stewardship is integrated into every stage of construction, from low-emission materials to smart energy optimization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
            <div className="space-y-4">
              <div className="text-4xl font-serif text-gold">28%</div>
              <div className="text-xs uppercase tracking-widest text-espresso/40 font-bold">Energy Reduction</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-serif text-gold">100%</div>
              <div className="text-xs uppercase tracking-widest text-espresso/40 font-bold">Water Recycling</div>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-serif text-gold">LEED</div>
              <div className="text-xs uppercase tracking-widest text-espresso/40 font-bold">Platinum Standard</div>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Preview Section */}
      <section className="py-32 px-6 md:px-12 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-6">
              <h2 className="text-gold text-xs uppercase tracking-[0.3em] font-bold">Journal</h2>
              <h3 className="text-5xl md:text-7xl font-serif text-espresso leading-tight text-balance">
                Industry <br />
                <span className="italic text-gold">Insights</span>
              </h3>
            </div>
            <Link to="/journal" className="text-[10px] uppercase tracking-widest font-bold text-espresso border-b border-espresso/20 pb-1 hover:text-gold hover:border-gold transition-all inline-block">
              View All Articles
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {JOURNAL_POSTS.map((post, i) => (
              <Link key={post.id} to={`/journal/${post.id}`} className="group space-y-8">
                <div className="aspect-[16/9] overflow-hidden bg-linen relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-cream px-4 py-2 text-[10px] uppercase tracking-widest font-bold text-espresso">
                    {post.category}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-xs text-espresso/40 uppercase tracking-widest font-bold">{post.date}</div>
                  <h4 className="text-3xl font-serif text-espresso group-hover:text-gold transition-colors duration-700">{post.title}</h4>
                  <p className="text-sm text-espresso/60 leading-relaxed font-light">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-espresso text-cream overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            poster="https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover grayscale"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-city-skyline-with-skyscrapers-at-sunset-40012-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-6">
            <h2 className="text-gold text-xs uppercase tracking-[0.3em] font-bold">Start Your Project</h2>
            <h3 className="text-5xl md:text-8xl font-serif text-cream leading-tight text-balance max-w-4xl mx-auto">
              Let’s Build <br />
              <span className="italic text-gold">Something That Lasts</span>
            </h3>
          </div>
          <p className="text-xl text-cream/60 max-w-2xl mx-auto leading-relaxed font-light">
            Whether you are planning a corporate headquarters, infrastructure project, or industrial facility — our team is ready to deliver with precision.
          </p>
          <div className="flex justify-center pt-8">
            <Link 
              to="/contact" 
              className="bg-gold text-cream px-12 py-6 text-xs uppercase tracking-widest font-bold hover:bg-cream hover:text-espresso transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              Get in Touch <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
