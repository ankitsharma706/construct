import React, { useState } from 'react';
import { motion } from 'motion/react';
import { leadService } from '../services/firebaseService';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    serviceType: 'Commercial',
    budget: '₹50L – ₹5Cr',
    location: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await leadService.create(formData);
      setStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        companyName: '',
        serviceType: 'Commercial',
        budget: '₹50L – ₹5Cr',
        location: '',
        message: '' 
      });
    } catch (error) {
      console.error('Error submitting lead:', error);
      setStatus('error');
    }
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Full Name</label>
          <input 
            id="contact-name"
            required
            type="text" 
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-transparent border-b border-espresso/20 py-3 focus:border-gold outline-none transition-colors text-espresso placeholder:text-espresso/20" 
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Email Address</label>
          <input 
            id="contact-email"
            required
            type="email" 
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-transparent border-b border-espresso/20 py-3 focus:border-gold outline-none transition-colors text-espresso placeholder:text-espresso/20" 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label htmlFor="contact-phone" className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Phone Number</label>
          <input 
            id="contact-phone"
            required
            type="tel" 
            placeholder="+91 00000 00000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-transparent border-b border-espresso/20 py-3 focus:border-gold outline-none transition-colors text-espresso placeholder:text-espresso/20" 
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-company" className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Company Name</label>
          <input 
            id="contact-company"
            required
            type="text" 
            placeholder="Enter your company"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full bg-transparent border-b border-espresso/20 py-3 focus:border-gold outline-none transition-colors text-espresso placeholder:text-espresso/20" 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label htmlFor="contact-service" className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Project Type</label>
          <select 
            id="contact-service"
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            className="w-full bg-transparent border-b border-espresso/20 py-3 focus:border-gold outline-none transition-colors appearance-none text-espresso"
          >
            <option value="Commercial">Commercial Build</option>
            <option>Infrastructure</option>
            <option value="Industrial">Industrial Facility</option>
            <option value="Design">Architectural Design</option>
            <option value="Consulting">Engineering Consulting</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-budget" className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Project Budget</label>
          <select 
            id="contact-budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full bg-transparent border-b border-espresso/20 py-3 focus:border-gold outline-none transition-colors appearance-none text-espresso"
          >
            <option>₹10L – ₹50L</option>
            <option>₹50L – ₹5Cr</option>
            <option>₹5Cr – ₹100Cr</option>
            <option>₹100Cr+</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-location" className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Project Location</label>
        <input 
          id="contact-location"
          required
          type="text" 
          placeholder="e.g. Mumbai, Maharashtra"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full bg-transparent border-b border-espresso/20 py-3 focus:border-gold outline-none transition-colors text-espresso placeholder:text-espresso/20" 
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-[10px] uppercase tracking-widest text-espresso/40 font-bold">Message</label>
        <textarea 
          id="contact-message"
          required
          rows={4} 
          placeholder="Tell us about your project requirements..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-transparent border-b border-espresso/20 py-3 focus:border-gold outline-none transition-colors resize-none text-espresso placeholder:text-espresso/20"
        ></textarea>
      </div>
      
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 pt-8">
        <button 
          disabled={status === 'submitting'}
          className="px-12 py-6 bg-espresso text-cream text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all w-full md:w-auto disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending Inquiry...' : 'Submit Inquiry'}
        </button>
        
        {status === 'success' && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-emerald text-xs uppercase tracking-widest font-bold"
          >
            Thank you. We will contact you soon.
          </motion.span>
        )}
        
        {status === 'error' && (
          <span role="alert" aria-live="assertive" className="text-red-700 text-xs uppercase tracking-widest font-bold">
            Submission failed. Please try again.
          </span>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
