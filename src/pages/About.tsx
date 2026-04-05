import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ShieldCheck, Award, Globe, Building2 } from 'lucide-react';

export default function About() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  
  // Scoped Scroll Progress for Hero
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Hero Parallax Transformations
  const yImage = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(heroProgress, [0, 1], ["0%", "-100%"]);
  const opacityHero = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const scaleHero = useTransform(heroProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="bg-cream pt-40 pb-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Cinematic Header */}
        <motion.div 
          style={{ y: yText, opacity: opacityHero }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32 items-end relative z-20"
        >
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-gold text-xs uppercase tracking-[0.5em] font-bold">The Construct Narrative</h2>
            <h1 className="text-5xl md:text-9xl font-serif text-espresso leading-tight tracking-tighter">
              Engineering <br />
              <span className="italic text-gold underline underline-offset-[20px] decoration-1">Legacy</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-xl text-espresso/60 leading-relaxed font-light italic">
              "Founded on the absolute principles of precision, durability, and architectural excellence for over three decades."
            </p>
          </div>
        </motion.div>

        {/* Hero Parallax Visual */}
        <motion.div 
          ref={heroRef}
          className="aspect-[21/9] md:aspect-[2.4/1] overflow-hidden bg-linen relative mb-40 shadow-2xl relative"
        >
          <motion.img 
            style={{ y: yImage, scale: scaleHero }}
            src="https://png.pngtree.com/thumb_back/fw800/background/20240801/pngtree-golden-hour-skyline-cityscape-with-sunset-and-clouds-image_16123499.jpg" 
            alt="Construction Site" 
            className="absolute inset-0 w-full h-[140%] object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-espresso/30 mix-blend-multiply" />
        </motion.div>

        {/* Scalability Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-40 text-center">
          {[
            { number: "30+", label: "Years of Engineering" },
            { number: "250+", label: "Landmark Briefs" },
            { number: "15M+", label: "Sq.ft Constructed" },
            { number: "12", label: "Global Operations" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-4xl md:text-7xl font-serif text-gold tracking-tight">{stat.number}</h3>
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-espresso/40">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision/Mission Reveal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-40"
        >
          <div className="space-y-10 p-16 bg-linen border border-espresso/5 shadow-xl hover:shadow-2xl transition-all duration-700">
            <h3 className="text-4xl font-serif text-espresso leading-none">The Vision</h3>
            <p className="text-xl text-espresso/60 leading-relaxed font-light text-justify md:text-left">
              To define the global architecture of tomorrow, orchestrating infrastructure that serves the present while immortalizing the legacy of the the future.
            </p>
          </div>
          <div className="space-y-10 p-16 bg-espresso text-cream border border-espresso/5 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 -translate-y-32 translate-x-32 rounded-full" />
            <h3 className="text-4xl font-serif text-gold leading-none">The Mission</h3>
            <p className="text-xl text-cream/60 leading-relaxed font-light text-justify md:text-left">
              Executing complex, high-fidelity construction cycles with binary precision, absolute safety, and a relentless commitment to sustainable urban metabolism.
            </p>
          </div>
        </motion.div>

        {/* Execution Protocol - Parallax List */}
        <div className="mb-56 space-y-32">
          <div className="text-center space-y-8">
            <h2 className="text-gold text-xs uppercase tracking-[0.6em] font-bold">Proprietary Execution Protocol</h2>
            <h3 className="text-4xl md:text-8xl font-serif text-espresso leading-none tracking-tighter uppercase">
              The <span className="italic text-gold italic">Construct</span> Lifecycle
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { title: "Archetype Visioning", icon: "01", desc: "Feasibility modeling and architectural DNA visioning." },
              { title: "Structural Engineering", icon: "02", desc: "BIM orchestration and structural stress simulation." },
              { title: "Binary Precision", icon: "03", desc: "Site management through IoT and real-time lidar telemetry." },
              { title: "Architectural Handover", icon: "04", desc: "Final quality audit and lifetime archival handover." }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="space-y-8 p-12 bg-white/40 border border-espresso/5 hover:border-gold transition-all group duration-700 backdrop-blur-sm"
              >
                <div className="text-gold text-7xl font-serif opacity-20 group-hover:opacity-100 transition-opacity italic">{step.icon}</div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-serif text-espresso leading-none">{step.title}</h4>
                  <p className="text-xs text-espresso/40 leading-relaxed font-bold uppercase tracking-widest">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Values - Interactive Cards */}
        <div className="mb-56 space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
               <h2 className="text-gold text-xs uppercase tracking-[0.4em] font-black underline underline-offset-8">Core Pillars</h2>
               <h3 className="text-4xl md:text-7xl font-serif text-espresso leading-none uppercase">The Structural Core</h3>
            </div>
            <p className="max-w-md text-espresso/40 text-[10px] uppercase tracking-[0.4em] font-black text-right">Absolute. Enduring. Construct.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <ShieldCheck size={32} />, title: "Absolute Safety", delay: 0 },
              { icon: <Award size={32} />, title: "Engineering Precision", delay: 0.1 },
              { icon: <Globe size={32} />, title: "Continental Reach", delay: 0.2 }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: value.delay }}
                className="space-y-8 p-16 bg-espresso text-cream shadow-2xl relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 -translate-y-16 translate-x-16 rounded-full group-hover:scale-150 transition-transform duration-1000" />
                <div className="w-20 h-20 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-espresso transition-all duration-700">
                  {value.icon}
                </div>
                <h4 className="text-3xl font-serif text-gold leading-none tracking-tight">{value.title}</h4>
                <p className="text-cream/40 text-sm font-light leading-relaxed">
                  Engineered to meet the highest global standards of structural integrity and operational safety across every project sector.
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership - Team Reveal */}
        <div className="mb-56 space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-4">
               <h2 className="text-gold text-xs uppercase tracking-[0.4em] font-black">Leadership</h2>
               <h3 className="text-4xl md:text-8xl font-serif text-espresso leading-none tracking-tighter uppercase">The Human <br /><span className="italic text-gold">Architecture</span></h3>
            </div>
            <p className="max-w-sm text-espresso/60 text-lg font-light leading-relaxed italic border-l-2 border-gold pl-8">
              A diverse phalanx of structural architects and project engineers dedicated to the the mastery of large-scale construction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[1, 2, 3, 4].map((i) => {
               const photoId = ['1507003211169-0a1dd7228f2d', '1500648767791-00dcc994a43e', '1494790108377-be9c29b29330', '1573496359142-b8d87734a5a2'];
               const names = ["Arthur Vance", "Elena Rossi", "Marcus Chen", "Sofia Thorne"];
               const titles = ["Chief Architect", "Structural Lead", "Project Director", "Systems Engineer"];
               return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                  className="space-y-8 group"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-linen relative shadow-xl">
                    <img 
                      src={`https://images.unsplash.com/photo-${photoId[i-1]}?auto=format&fit=crop&q=80&w=1000`} 
                      alt="Personnel" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-espresso/10 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-3xl font-serif text-espresso leading-none tracking-tight">{names[i-1]}</h4>
                    <p className="text-[10px] uppercase tracking-[0.5em] font-black text-gold border-t border-espresso/5 pt-4 inline-block">{titles[i-1]}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Global Presence - Sticky Scroll Story Narrative */}
        {(() => {
          const globalRef = useRef(null);
          const { scrollYProgress: localProgress } = useScroll({
            target: globalRef,
            offset: ["start end", "end start"]
          });
          const scaleBg = useTransform(localProgress, [0, 0.5, 1], [1, 1.25, 1.5]);
          const opacityText = useTransform(localProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

          return (
            <div ref={globalRef} className="h-[200vh] relative -mx-6 md:-mx-12 mb-40">
              <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
                <motion.div style={{ scale: scaleBg }} className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400" 
                    className="w-full h-full object-cover brightness-25"
                  />
                  <div className="absolute inset-0 bg-espresso/60 mix-blend-multiply" />
                </motion.div>
                
                <motion.div style={{ opacity: opacityText }} className="relative z-10 text-center space-y-16 px-12">
                  <h3 className="text-6xl md:text-[12rem] font-serif tracking-tighter leading-none text-cream uppercase">
                    Continental <br /> <span className="italic text-gold opacity-80 decoration-1 underline underline-offset-[30px]">Blueprint</span>
                  </h3>
                  <p className="text-cream/50 max-w-3xl mx-auto text-xl md:text-2xl font-light leading-relaxed uppercase tracking-[0.1em]">
                    Synchronized engineering across 12 megacities. Delivering structural certainty on a global axis.
                  </p>
                </motion.div>

                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
                   <div className="text-[10px] uppercase tracking-[0.8em] font-black text-gold/40">Archival Narrative</div>
                   <div className="w-px h-32 bg-gold/10 relative overflow-hidden">
                      <motion.div 
                        style={{ scaleY: localProgress }}
                        className="absolute top-0 left-0 w-full h-full bg-gold origin-top"
                      />
                   </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Call to Action - Final Terminal */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center space-y-16 py-32 border-t border-espresso/10"
        >
           <div className="space-y-6">
              <h2 className="text-gold text-[10px] uppercase tracking-[0.6em] font-black">Authorized Personnel Only</h2>
              <h3 className="text-4xl md:text-[10rem] font-serif text-espresso leading-none italic uppercase tracking-tighter">
                Scale the <br /> <span className="not-italic text-gold underline underline-offset-[20px] decoration-1">Future</span>
              </h3>
           </div>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#2C2420', color: '#FDFCFB' }}
            whileTap={{ scale: 0.95 }}
            className="px-24 py-12 border-2 border-gold text-gold text-[12px] uppercase tracking-[0.6em] font-black hover:bg-espresso hover:text-cream transition-all duration-700 shadow-[0_30px_60px_-15px_rgba(212,175,55,0.3)] bg-transparent"
          >
            Initiate Project Protocol
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
