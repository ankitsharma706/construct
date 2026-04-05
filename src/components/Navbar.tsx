import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Journal', path: '/journal' },
];

export default function Navbar() {
  const { user, isAdmin, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6",
      scrolled ? "bg-cream/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif tracking-tighter text-espresso hover:text-gold transition-colors duration-500">
          CONSTRUCT
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={cn(
                "text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:text-gold",
                location.pathname === link.path ? "text-gold" : "text-espresso opacity-40 hover:opacity-100"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-8 border-l border-espresso/10 pl-8">
              {isAdmin && (
                <Link 
                  to="/admin"
                  className={cn(
                    "text-[10px] uppercase tracking-[0.3em] font-black transition-all text-gold hover:text-espresso",
                    location.pathname === '/admin' ? "underline underline-offset-8" : ""
                  )}
                >
                  Control Tower
                </Link>
              )}
            
            </div>
          ) : (
            <Link 
              to="/login"
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-espresso opacity-40 hover:opacity-100 transition-all"
            >
              Vault Access
            </Link>
          )}

          <Link 
            to="/contact" 
            className="bg-espresso text-cream px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold transition-all duration-500 shadow-2xl"
          >
            Start Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-espresso p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-cream border-t border-espresso/10 p-10 md:hidden shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-4xl font-serif text-espresso hover:text-gold transition-colors tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-8 border-t border-espresso/10 space-y-6">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="text-4xl font-serif text-gold block"
                      >
                        Control Tower
                      </Link>
                    )}
                    <button 
                      onClick={logout}
                      className="text-[10px] uppercase tracking-[0.4em] font-bold text-red-500 block"
                    >
                      Security Sign-Out
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-4xl font-serif text-espresso/40 hover:text-gold transition-colors block"
                  >
                    Vault Access
                  </Link>
                )}
              </div>

              <Link 
                to="/contact" 
                className="bg-espresso text-cream p-6 text-center text-[10px] uppercase tracking-[0.4em] font-bold shadow-xl mt-8"
              >
                Assemble Team
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
