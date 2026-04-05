import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { 
  ChevronRight, Shield, ShieldCheck, 
  Lock, ArrowLeft, Loader2, Info
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Login() {
  const { login, user, isAdmin, loading: authLoading } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleLogin = async () => {
    setIsAuthenticating(true);
    setError(null);
    try {
      await login();
      // Navigation is handled by the component's effect or user can click continue
    } catch (err: any) {
      setError(err.message || 'Authentication sequence failed.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Redirect if already logged in and context resolved
  if (user && !authLoading) {
    if (isAdmin) {
      navigate(from, { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Architectural Patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
         <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #2C2420 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl w-full bg-linen border border-espresso/10 p-12 md:p-20 shadow-[0_100px_80px_-20px_rgba(44,36,32,0.1)] relative z-10"
      >
        <div className="space-y-16">
          {/* Header */}
          <div className="space-y-8">
            <Link to="/" className="inline-flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.4em] font-bold hover:text-espresso transition-all group">
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Exit to Terminal
            </Link>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold">
                <Shield size={20} />
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Secure Gateway</span>
              </div>
              <h1 className="text-6xl font-serif text-espresso leading-none">
                Vault <br />
                <span className="italic text-gold italic">Authentication</span>
              </h1>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-12">
            {!user ? (
               <div className="space-y-8">
                  <p className="text-xl text-espresso/60 font-light leading-relaxed">
                    Access to the CONSTRUCT control tower is restricted to authorized personnel. Please perform a biometric secure-handshake via Google Workspace.
                  </p>
                  
                  {error && (
                    <div className="p-6 bg-red-500/5 border border-red-500/10 flex items-start gap-4 text-red-500">
                       <Info size={18} className="shrink-0" />
                       <p className="text-xs uppercase tracking-widest font-bold leading-relaxed">{error}</p>
                    </div>
                  )}

                  <button 
                    disabled={isAuthenticating}
                    onClick={handleLogin}
                    className="w-full bg-espresso text-cream py-8 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold transition-all duration-700 flex items-center justify-center gap-4 shadow-xl disabled:opacity-50 group"
                  >
                    {isAuthenticating ? (
                       <Loader2 className="animate-spin" size={18} />
                    ) : (
                       <>Authenticate <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" /></>
                    )}
                  </button>
               </div>
            ) : !isAdmin ? (
               <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="p-8 bg-gold/5 border border-gold/10 flex items-center gap-6">
                    <div className="w-12 h-12 bg-gold flex items-center justify-center text-cream">
                       <Lock size={20} />
                    </div>
                    <div className="space-y-1">
                       <div className="text-[10px] uppercase tracking-widest font-black text-gold">Permission Denied</div>
                       <div className="text-espresso font-serif text-lg truncate max-w-[200px]">{user.email}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-espresso/60 font-light leading-relaxed">
                      Your identity <strong className="text-espresso">{user.email}</strong> is verified, but lacks **Master Clearance**.
                    </p>
                    <div className="p-6 bg-gold/5 border border-gold/20 text-[10px] uppercase tracking-widest leading-relaxed text-espresso/40">
                       <span className="text-gold font-bold">Fix:</span> Update the master email in <code className="text-gold">AuthContext.tsx</code> to your current address to unlock the Control Tower.
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/')}
                    className="w-full border border-espresso/20 text-espresso py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-espresso hover:text-cream transition-all duration-700"
                  >
                    Return to Public Deck
                  </button>
               </div>
            ) : (
               <div className="space-y-10 text-center animate-in zoom-in-95 duration-1000">
                  <div className="w-24 h-24 bg-gold/10 border-2 border-gold mx-auto flex items-center justify-center text-gold mb-8">
                     <ShieldCheck size={48} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif text-espresso">Clearance Granted</h2>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Redirecting to Control Tower</p>
                  </div>
                  <button 
                    onClick={() => navigate(from)}
                    className="bg-espresso text-cream px-12 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold transition-all duration-700 mx-auto block shadow-2xl"
                  >
                    Continue to Dashboard
                  </button>
               </div>
            )}
          </div>

          <div className="pt-12 border-t border-espresso/5 flex justify-between items-center text-[8px] uppercase tracking-[0.4em] font-black text-espresso/20">
             <span>Protocol v4.1</span>
             <span>Construct Intelligent Systems</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
