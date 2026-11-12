import React from 'react';
import { motion } from 'motion/react';
import { FileCheck, Scale, AlertCircle, Building } from 'lucide-react';
import { SEOHead } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';

export default function TermsOfService() {
  return (
    <div className="bg-cream pt-36 pb-32 px-6 md:px-12">
      <SEOHead
        title="Terms of Service"
        description="Terms and conditions governing the use of CONSTRUCT Infrastructure website, technical whitepapers, architectural portfolios, and consultation services."
        canonical="/terms-of-service"
        breadcrumbs={[{ name: 'Terms of Service', url: '/terms-of-service' }]}
      />

      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ name: 'Terms of Service', url: '/terms-of-service' }]} />

        <div className="space-y-6 mb-16 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold text-[10px] uppercase tracking-widest font-bold">
            <Scale size={14} /> Legal Agreement
          </div>
          <h1 className="text-4xl md:text-7xl font-serif text-espresso leading-tight">
            Terms of Service
          </h1>
          <p className="text-xs uppercase tracking-widest text-espresso/40">
            Last Updated: October 2026 · Standard Commercial Revision 2.4
          </p>
        </div>

        <div className="space-y-12 text-espresso/80 font-light leading-relaxed text-base md:text-lg">
          {/* Section 1 */}
          <section className="space-y-4 border-b border-espresso/10 pb-8">
            <h2 className="text-2xl font-serif text-espresso">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or utilizing the web services, architectural portfolios, and technical documents hosted at maxcnfront.vercel.app (&ldquo;the Site&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4 border-b border-espresso/10 pb-8">
            <h2 className="text-2xl font-serif text-espresso">2. Engineering & Architectural Disclaimers</h2>
            <div className="bg-linen p-6 border-l-4 border-gold text-espresso/80 space-y-2">
              <p className="font-medium text-espresso flex items-center gap-2">
                <AlertCircle size={18} className="text-gold" />
                Informational & Educational Resource Only
              </p>
              <p className="text-sm">
                The blueprints, technical diagrams, finite-element analysis descriptions, and structural case studies published on this site are presented solely for conceptual, portfolio, and educational demonstrations. They do not constitute certified construction engineering advice or stamped structural blueprints for external execution.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4 border-b border-espresso/10 pb-8">
            <h2 className="text-2xl font-serif text-espresso">3. Intellectual Property Rights</h2>
            <p>
              All content on this website—including but not limited to 3D models, architectural renderings, CAD schematics, technical journal articles, structural calculations, logos, trademarks, and code—is the proprietary intellectual property of CONSTRUCT Infrastructure and protected by international copyright laws. Unauthorized reproduction, scraping, redistribution, or commercial reuse without explicit written consent is strictly prohibited.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4 border-b border-espresso/10 pb-8">
            <h2 className="text-2xl font-serif text-espresso">4. User Inquiries & Lead Submissions</h2>
            <p>
              When submitting requests for proposals or project inquiries via our contact interfaces, you agree to supply authentic, verified corporate credentials. We reserve the right to decline project inquiries that contain fraudulent contact details, malicious payloads, or automated bot submissions.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4 border-b border-espresso/10 pb-8">
            <h2 className="text-2xl font-serif text-espresso">5. Limitation of Liability</h2>
            <p>
              In no event shall CONSTRUCT Infrastructure, its directors, engineers, or affiliates be liable for any indirect, incidental, consequential, special, or punitive damages arising out of your access to or inability to use this site, any third-party links, or advertisements displayed via Google AdSense networks.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-espresso">6. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of India. Any legal dispute or proceeding relating to the website shall be instituted exclusively in the competent courts located in Mumbai, Maharashtra, India.
            </p>
            <div className="bg-espresso text-cream p-6 mt-6 space-y-1 text-sm">
              <p className="font-bold text-gold uppercase tracking-wider">Corporate Legal Directorate</p>
              <p>CONSTRUCT Infrastructure Private Limited</p>
              <p>Email: <a href="mailto:projects@construct.com" className="underline hover:text-gold">projects@construct.com</a></p>
              <p>Registered Office: Bandra Kurla Complex, Mumbai, Maharashtra 400051, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

