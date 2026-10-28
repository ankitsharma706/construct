import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Building2, Compass, Layers, CheckCircle, ArrowRight, 
  HardHat, ShieldAlert, Cpu, Award, HelpCircle
} from 'lucide-react';
import { SERVICES, PROCESS_STEPS } from '../constants';
import { SEOHead, FAQItem } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';

const SERVICE_FAQS: FAQItem[] = [
  {
    question: 'What civil engineering and architectural standards does CONSTRUCT adhere to?',
    answer: 'We design and construct under internationally recognized codes including IS 456, IS 1893 (Seismic Design), ASCE 7-22, Eurocode 2 & 8, and British Standards (BS EN 1990-1999), incorporating ISO 19650 for BIM lifecycle data.',
  },
  {
    question: 'How does CONSTRUCT optimize structural steel and concrete consumption?',
    answer: 'Through advanced Finite Element Analysis (FEA), algorithmic generative topology optimization, and high-performance LC3/geopolymer cements, we typically decrease embodied carbon by 25-35% and total material tonnage by 18-22%.',
  },
  {
    question: 'Can CONSTRUCT handle turnkey high-density commercial developments?',
    answer: 'Yes, our multidisciplinary team provides turnkey Design-Build management from geotechnical foundation drilling and outrigger core engineering to unitized responsive façade assembly and MEPF commissioning.',
  },
  {
    question: 'What is the standard engagement timeline for structural peer review?',
    answer: 'Comprehensive third-party structural peer reviews, seismic vulnerability audits, and foundation re-evaluations are delivered within 3 to 6 weeks depending on gross floor area and complexity.',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-cream pt-36 pb-32 px-6 md:px-12">
      <SEOHead
        title="Structural Engineering & Architectural Services"
        description="Comprehensive architectural engineering, seismic retrofit, geotechnical analysis, and turnkey infrastructure project management by CONSTRUCT."
        canonical="/services"
        breadcrumbs={[{ name: 'Services', url: '/services' }]}
        faqs={SERVICE_FAQS}
      />

      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ name: 'Services', url: '/services' }]} />

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 mt-8 items-end">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold">
              Engineering Disciplines
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-espresso leading-tight tracking-tight">
              Engineering <br />
              <span className="italic text-gold">Without Compromise</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg text-espresso/70 leading-relaxed font-light">
              We translate bold architectural concepts into enduring structural systems. Our multidisciplinary engineering practices guarantee safety, financial discipline, and structural longevity.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="group bg-linen p-8 border border-espresso/5 hover:border-gold transition-all duration-500 relative flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-serif text-gold/30 group-hover:text-gold transition-colors">
                    {service.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gold bg-gold/10 px-3 py-1">
                    {service.price}
                  </span>
                </div>
                <h2 className="text-2xl font-serif text-espresso group-hover:text-gold transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-espresso/70 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-espresso/10 flex items-center justify-between">
                <Link
                  to="/contact"
                  className="text-[10px] uppercase tracking-widest font-bold text-espresso group-hover:text-gold flex items-center gap-2 transition-colors"
                >
                  <span>Request Engineering Scope</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Process Workflow */}
        <section className="bg-espresso text-cream p-12 md:p-20 mb-32 relative overflow-hidden">
          <div className="max-w-4xl space-y-6 mb-16">
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold">
              Engineering Protocol
            </span>
            <h2 className="text-4xl md:text-6xl font-serif">
              The 4-Phase Delivery Framework
            </h2>
            <p className="text-cream/70 font-light leading-relaxed">
              Every project undergoes algorithmic validation, peer calculations, and on-site oversight from conceptual sketch to occupancy handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="border-t border-cream/20 pt-6 space-y-3">
                <span className="text-2xl font-serif text-gold">{step.number}</span>
                <h3 className="font-serif text-xl">{step.title}</h3>
                <p className="text-xs text-cream/60 leading-relaxed font-light">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial FAQ Section for Rich Schema */}
        <section className="mb-24">
          <div className="max-w-3xl space-y-4 mb-12">
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold">
              Knowledge Base
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-espresso">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {SERVICE_FAQS.map((faq, idx) => (
              <div key={idx} className="bg-linen/80 p-8 border border-espresso/5 space-y-3">
                <h3 className="text-lg font-serif text-espresso flex items-start gap-3">
                  <HelpCircle size={20} className="text-gold flex-shrink-0 mt-1" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-espresso/70 font-light leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-linen p-12 md:p-16 text-center border border-espresso/5 space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif text-espresso">
            Ready to Begin Your Technical Feasibility Assessment?
          </h2>
          <p className="text-espresso/60 max-w-xl mx-auto font-light text-sm md:text-base">
            Consult directly with our licensed structural directors to calibrate structural budgets and constructability matrices.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-block bg-espresso text-cream px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold transition-colors shadow-xl"
            >
              Start Project Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

