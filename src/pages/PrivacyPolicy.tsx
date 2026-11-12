import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../lib/seo';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PrivacyPolicy() {
  return (
    <div className="bg-cream pt-36 pb-32 px-6 md:px-12">
      <SEOHead
        title="Privacy Policy"
        description="Comprehensive Privacy Policy for CONSTRUCT Infrastructure, detailing data protection practices, Google AdSense compliance, cookie usage, and user rights."
        canonical="/privacy-policy"
        breadcrumbs={[{ name: 'Privacy Policy', url: '/privacy-policy' }]}
      />

      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy-policy' }]} />

        <div className="space-y-6 mb-16 mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold text-[10px] uppercase tracking-widest font-bold">
            <Shield size={14} /> Legal & Compliance
          </div>
          <h1 className="text-4xl md:text-7xl font-serif text-espresso leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs uppercase tracking-widest text-espresso/40">
            Last Updated & Verified: October 2026 · Effective Date: January 1, 2024
          </p>
        </div>

        <div className="space-y-12 text-espresso/80 font-light leading-relaxed text-base md:text-lg">
          {/* Section 1 */}
          <section className="space-y-4 border-b border-espresso/10 pb-8">
            <h2 className="text-2xl font-serif text-espresso">1. Introduction & Scope</h2>
            <p>
              CONSTRUCT Infrastructure (&ldquo;CONSTRUCT&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is dedicated to protecting your privacy and ensuring the transparency of our data handling practices. This Privacy Policy governs the manner in which CONSTRUCT collects, uses, maintains, and discloses information gathered from visitors and clients utilizing our website (maxcnfront.vercel.app) and related engineering consultation services.
            </p>
          </section>

          {/* Section 2: AdSense Disclosures */}
          <section className="space-y-4 border-b border-espresso/10 pb-8 bg-linen/50 p-6 md:p-8 border border-espresso/5">
            <div className="flex items-center gap-3 text-gold">
              <Eye size={20} />
              <h2 className="text-2xl font-serif text-espresso">2. Google AdSense & Third-Party Advertising Disclosures</h2>
            </div>
            <p>
              We partner with Google AdSense and third-party advertising networks to serve advertisements when you visit our website. To comply strictly with Google AdSense Publisher Policies, we disclose the following operational parameters:
            </p>
            <ul className="space-y-3 pl-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-1" />
                <span>
                  <strong>Third-Party Vendors & Cookies:</strong> Third-party vendors, including Google, utilize cookies (such as the DoubleClick cookie) to serve ads based on your prior visits to this website or other websites across the Internet.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-1" />
                <span>
                  <strong>Google DART Cookies:</strong> Google&rsquo;s use of advertising cookies enables it and its partners to serve targeted advertisements to our users based on their navigation patterns across our architectural case studies, technical whitepapers, and external web properties.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-1" />
                <span>
                  <strong>User Opt-Out Mechanisms:</strong> Users may opt out of personalized advertising by visiting the official Google Ads Settings portal at{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold underline underline-offset-4 hover:text-espresso"
                  >
                    Google Ads Settings
                  </a>
                  . Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting{' '}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold underline underline-offset-4 hover:text-espresso"
                  >
                    AboutAds.info Choices
                  </a>
                  .
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3: Data Collection */}
          <section className="space-y-4 border-b border-espresso/10 pb-8">
            <h2 className="text-2xl font-serif text-espresso">3. Information We Collect</h2>
            <p>
              We collect information in two primary categories:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-linen p-6 border border-espresso/5">
                <h3 className="font-serif text-lg text-espresso mb-2">Direct Inquiries</h3>
                <p className="text-sm text-espresso/70">
                  When you submit our engineering inquiry or contact form, we collect your full name, corporate email address, telephone number, project budget tier, and architectural scope descriptions.
                </p>
              </div>
              <div className="bg-linen p-6 border border-espresso/5">
                <h3 className="font-serif text-lg text-espresso mb-2">Automated Telemetry</h3>
                <p className="text-sm text-espresso/70">
                  Standard browser log data including your IP address, browser user-agent, operating system, referring URL, time-stamp, and interaction metrics to ensure optimal infrastructure performance.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: GDPR & CCPA */}
          <section className="space-y-4 border-b border-espresso/10 pb-8">
            <h2 className="text-2xl font-serif text-espresso">4. Rights Under GDPR & CCPA/CPRA</h2>
            <p>
              Regardless of your geographic location, CONSTRUCT respects your fundamental data privacy rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-espresso/80">
              <li><strong>Right to Access:</strong> You may request copies of personal records held by our engineering offices.</li>
              <li><strong>Right to Rectification:</strong> You may request correction of inaccurate corporate or contact records.</li>
              <li><strong>Right to Erasure:</strong> You may request permanent deletion of your inquiry data at any time.</li>
              <li><strong>Non-Discrimination:</strong> We do not sell personal data, and exercising your rights will never diminish service quality.</li>
            </ul>
          </section>

          {/* Section 5: Contact Point */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif text-espresso">5. Compliance Officer Contact</h2>
            <p>
              For privacy inquiries, cookie consent adjustments, or data removal requests, contact our legal and privacy administration:
            </p>
            <div className="bg-espresso text-cream p-6 mt-4 space-y-2 text-sm">
              <p className="font-bold text-gold uppercase tracking-wider">CONSTRUCT Compliance Desk</p>
              <p>Email: <a href="mailto:projects@construct.com" className="underline hover:text-gold">projects@construct.com</a></p>
              <p>Address: Bandra Kurla Complex, Mumbai, Maharashtra 400051, India</p>
              <p>Phone: +91 98765 43210</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

