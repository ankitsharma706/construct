import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Phone, Mail, Instagram, Linkedin, Twitter } from 'lucide-react';
import { leadService } from '../services/firebaseService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    serviceType: 'Commercial',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await leadService.create(formData);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        budget: '',
        serviceType: 'Commercial',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-gold text-xs uppercase tracking-[0.3em] font-bold">Contact Us</h2>
              <h3 className="text-5xl md:text-8xl font-serif text-espresso leading-tight text-balance">
                Start Your <br />
                <span className="italic text-gold">Project</span>
              </h3>
            </div>
            <p className="text-xl text-espresso/60 leading-relaxed font-light">
              We are ready to discuss your vision and how we can bring it to life with precision and excellence.
            </p>

            <div className="space-y-8 pt-12 border-t border-espresso/5">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-linen rounded-full flex items-center justify-center text-gold"><MapPin size={20} /></div>
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-espresso">Main Office</h4>
                  <p className="text-sm text-espresso/60 leading-relaxed font-light">Bandra Kurla Complex, Mumbai, India</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-linen rounded-full flex items-center justify-center text-gold"><Phone size={20} /></div>
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-espresso">Phone</h4>
                  <p className="text-sm text-espresso/60 leading-relaxed font-light">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-linen rounded-full flex items-center justify-center text-gold"><Mail size={20} /></div>
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-espresso">Email</h4>
                  <p className="text-sm text-espresso/60 leading-relaxed font-light">projects@construct.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 pt-12">
              <a href="#" className="w-10 h-10 rounded-full border border-espresso/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-cream transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-espresso/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-cream transition-all"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-espresso/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-cream transition-all"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-linen p-12 md:p-20 border border-espresso/5">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-20"
              >
                <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto"><ArrowRight size={32} /></div>
                <div className="space-y-4">
                  <h4 className="text-4xl font-serif text-espresso">Message Received</h4>
                  <p className="text-lg text-espresso/60 leading-relaxed font-light">Our team will review your inquiry and get back to you within 24 hours.</p>
                </div>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-xs uppercase tracking-widest font-bold text-gold border-b border-gold pb-1"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-espresso/10 py-4 text-espresso focus:border-gold outline-none transition-all font-light"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border-b border-espresso/10 py-4 text-espresso focus:border-gold outline-none transition-all font-light"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-transparent border-b border-espresso/10 py-4 text-espresso focus:border-gold outline-none transition-all font-light"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40">Expected Budget</label>
                    <input 
                      type="text" 
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full bg-transparent border-b border-espresso/10 py-4 text-espresso focus:border-gold outline-none transition-all font-light"
                      placeholder="₹10 Cr+"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40">Service Type</label>
                  <select 
                    value={formData.serviceType}
                    onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                    className="w-full bg-transparent border-b border-espresso/10 py-4 text-espresso focus:border-gold outline-none transition-all font-light appearance-none"
                  >
                    <option value="Commercial">Commercial Build</option>
                    <option value="Infrastructure">Infrastructure Project</option>
                    <option value="Industrial">Industrial Facility</option>
                    <option value="Design">Architectural Design</option>
                    <option value="Consulting">Engineering Consulting</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-espresso/40">Project Details</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-transparent border-b border-espresso/10 py-4 text-espresso focus:border-gold outline-none transition-all font-light resize-none"
                    placeholder="Tell us about your project vision..."
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-espresso text-cream py-6 text-xs uppercase tracking-widest font-bold hover:bg-gold transition-all duration-500 flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
