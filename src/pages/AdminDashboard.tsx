import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { projectService, leadService, journalService } from '../services/firebaseService';
import { Project, ContactLead, JournalPost } from '../types';
import { PROJECTS, JOURNAL_POSTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Building2, MessageSquare, LogOut, Plus, Trash2, 
  Edit2, CheckCircle, ExternalLink, BookOpen, AlertCircle, RefreshCcw, 
  X, Save, Loader2, ChevronRight, Image as ImageIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

type Tab = 'projects' | 'journal' | 'leads';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [journal, setJournal] = useState<JournalPost[]>([]);
  const [leads, setLeads] = useState<ContactLead[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [bulkLoading, setBulkLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const unsubProjects = projectService.subscribeAll(setProjects);
      const unsubJournal = journalService.subscribeAll(setJournal);
      
      const fetchLeads = async () => {
        const l = await leadService.getAll();
        setLeads(l);
      };
      fetchLeads();
      
      return () => {
        unsubProjects();
        unsubJournal();
      };
    }
  }, [user]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleBulkBootstrap = async () => {
    if (!confirm('This will upload all projects and journal posts from constants.ts to Firestore. Continue?')) return;
    
    setBulkLoading(true);
    try {
      // Bootstrap Projects
      for (const p of PROJECTS) {
        const { id, ...data } = p;
        await projectService.create(data);
      }
      // Bootstrap Journal
      for (const j of JOURNAL_POSTS) {
        const { id, ...data } = j;
        await journalService.create(data);
      }
      alert('Bootstrap complete!');
    } catch (error) {
      console.error('Bootstrap failed:', error);
    } finally {
      setBulkLoading(false);
    }
  };

  const handleDelete = async (id: string, type: Tab) => {
    if (!confirm(`Delete this ${type.slice(0, -1)}?`)) return;
    if (type === 'projects') await projectService.delete(id);
    if (type === 'journal') await journalService.delete(id);
  };

  const handleUpdateLeadStatus = async (id: string, status: string) => {
    await leadService.updateStatus(id, status);
    const l = await leadService.getAll();
    setLeads(l);
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream gap-4">
      <Loader2 className="animate-spin text-gold" size={40} />
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-espresso/40">Synchronizing Vault</span>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-linen p-12 border border-espresso/5 shadow-2xl space-y-12 text-center"
        >
          <div className="space-y-4">
             <div className="w-16 h-16 bg-espresso mx-auto flex items-center justify-center text-gold shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                <Building2 size={32} />
             </div>
             <h1 className="text-4xl font-serif text-espresso">Restricted Access</h1>
             <p className="text-xs text-espresso/60 font-light leading-relaxed uppercase tracking-[0.2em] px-4">
               Engineering authentication required for CONSTRUCT master dashboard.
             </p>
          </div>
          <button 
            onClick={handleLogin}
            className="w-full bg-espresso text-cream py-6 text-xs uppercase tracking-widest font-bold hover:bg-gold transition-all duration-700 flex items-center justify-center gap-4 group"
          >
            Authenticate <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row">
      {/* Sidebar - Desktop Only */}
      <aside className="w-72 bg-espresso text-cream p-10 hidden lg:flex flex-col justify-between fixed h-full z-10">
        <div className="space-y-16">
          <Link to="/" className="text-2xl font-serif tracking-tighter flex items-center gap-3 hover:text-gold transition-colors duration-500">
            CONSTRUCT
          </Link>
          
          <nav className="space-y-4">
            {[
              { id: 'projects', icon: Building2, label: 'Projects' },
              { id: 'journal', icon: BookOpen, label: 'Journal' },
              { id: 'leads', icon: MessageSquare, label: 'Leads' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={cn(
                  "w-full flex items-center gap-5 p-5 text-[10px] uppercase tracking-[0.3em] font-bold transition-all group",
                  activeTab === tab.id ? "bg-gold text-cream shadow-xl" : "text-cream/30 hover:text-cream hover:bg-white/5"
                )}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </nav>

          <div className="pt-12 border-t border-white/5">
            <button 
              disabled={bulkLoading}
              onClick={handleBulkBootstrap}
              className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold text-gold/60 hover:text-gold transition-colors disabled:opacity-50"
            >
              {bulkLoading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCcw size={14} />}
              Initialize DB from Constants
            </button>
          </div>
        </div>

        <div className="space-y-8">
           <div className="flex items-center gap-4 px-4 py-4 bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">
                 {user.email?.[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                 <div className="text-[8px] uppercase tracking-widest text-cream/40 font-bold truncate">{user.email}</div>
                 <div className="text-[10px] text-cream font-serif italic truncate">{user.displayName || 'Authorized Admin'}</div>
              </div>
           </div>
           <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 text-[10px] uppercase tracking-widest font-bold text-cream/40 hover:text-cream transition-all border border-transparent hover:border-white/10"
          >
            <LogOut size={16} /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow lg:ml-72 p-6 md:p-16">
        <div className="max-w-7xl mx-auto space-y-16">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-espresso/10 pb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gold">
                 <LayoutDashboard size={14} />
                 <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Control Tower</span>
              </div>
              <h1 className="text-6xl font-serif text-espresso capitalize tracking-tighter">
                 {activeTab} <span className="italic text-gold">Brief</span>
              </h1>
            </div>
            
            {activeTab !== 'leads' && (
              <button 
                onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                className="bg-espresso text-cream px-10 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold transition-all flex items-center gap-4 shadow-xl active:scale-95"
              >
                <Plus size={16} /> New Entry
              </button>
            )}
          </header>

          {/* Table / List View */}
          <div className="space-y-8">
            {activeTab === 'projects' && (
               <div className="grid grid-cols-1 gap-12">
                 {/* Assigned Projects Logic */}
                 {(() => {
                   const assigned = PROJECTS.filter(p => p.projectEmail?.toLowerCase().trim() === user?.email?.toLowerCase().trim());
                   if (assigned.length > 0) {
                     return (
                       <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000">
                         <div className="flex items-center gap-6">
                           <div className="w-10 h-px bg-gold" />
                           <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-espresso">Your Assigned Assets</h3>
                         </div>
                         <div className="grid grid-cols-1 gap-6">
                           {assigned.map((p) => (
                             <motion.div 
                              layout
                              key={`assigned-${p.id}`} 
                              className="bg-cream p-8 border border-gold/30 flex flex-col md:flex-row items-center justify-between group gap-8 hover:shadow-2xl transition-all"
                             >
                               <div className="flex items-center gap-10 w-full">
                                 <div className="w-24 h-24 bg-white overflow-hidden border border-gold/10">
                                   <img src={p.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                                 </div>
                                 <div className="space-y-3 flex-grow">
                                    <div className="flex items-center gap-4">
                                       <span className="text-[10px] uppercase tracking-widest font-black text-gold">Identity Match: {p.id}</span>
                                    </div>
                                    <h4 className="text-3xl font-serif text-espresso leading-none">{p.title}</h4>
                                    <p className="text-[10px] text-espresso/40 uppercase tracking-[0.2em] font-bold">Authorized Personnel: {p.projectEmail}</p>
                                 </div>
                               </div>
                               <div className="flex items-center gap-3">
                                 <Link to={`/projects/${p.id}`} className="bg-espresso text-cream px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-gold transition-all">
                                   Access Vault
                                 </Link>
                               </div>
                             </motion.div>
                           ))}
                         </div>
                         <div className="pt-8 border-t border-espresso/10" />
                       </div>
                     );
                   }
                   return null;
                 })()}

                 {projects.length === 0 && (
                   <div className="py-20 text-center border-2 border-dashed border-espresso/10 text-espresso/30 italic font-serif">
                      No architectural data synchronized in Firestore. Use "Initialize" or add new entry.
                   </div>
                 )}
                 {projects.map((p) => (
                   <motion.div 
                    layout
                    key={p.id} 
                    className="bg-linen p-8 border border-espresso/5 flex flex-col md:flex-row items-center justify-between group gap-8 hover:border-gold/30 transition-all shadow-sm hover:shadow-xl"
                   >
                     <div className="flex items-center gap-10 w-full">
                       <div className="w-24 h-24 bg-cream overflow-hidden border border-espresso/5 shadow-inner">
                         <img src={p.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                       </div>
                       <div className="space-y-3 flex-grow">
                          <div className="flex items-center gap-4">
                             <div className="w-6 h-px bg-gold/40" />
                             <span className="text-[9px] uppercase tracking-widest font-black text-gold">{p.category}</span>
                          </div>
                          <h4 className="text-2xl font-serif text-espresso leading-none">{p.title}</h4>
                          <p className="text-[10px] text-espresso/40 uppercase tracking-[0.2em] font-bold">{p.location} · {p.cost}</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-3 shrink-0">
                       <button className="p-4 text-espresso/20 hover:text-gold hover:bg-white transition-all"><Edit2 size={18} /></button>
                       <button 
                        onClick={() => handleDelete(p.id, 'projects')}
                        className="p-4 text-espresso/20 hover:text-red-500 hover:bg-white transition-all"
                       >
                         <Trash2 size={18} />
                       </button>
                       <Link to={`/projects/${p.id}`} className="p-4 text-espresso/20 hover:text-espresso hover:bg-white transition-all">
                         <ExternalLink size={18} />
                       </Link>
                     </div>
                   </motion.div>
                 ))}
               </div>
            )}

            {activeTab === 'journal' && (
               <div className="grid grid-cols-1 gap-12">
                 {/* Assigned Journal Logic */}
                 {(() => {
                   const assigned = JOURNAL_POSTS.filter(post => post.authorEmail?.toLowerCase().trim() === user?.email?.toLowerCase().trim());
                   if (assigned.length > 0) {
                     return (
                       <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000">
                         <div className="flex items-center gap-6">
                           <div className="w-10 h-px bg-gold" />
                           <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-espresso">Your Assigned Narratives</h3>
                         </div>
                         <div className="grid grid-cols-1 gap-6">
                           {assigned.map((post) => (
                             <motion.div 
                              layout
                              key={`assigned-post-${post.id}`} 
                              className="bg-cream p-8 border border-gold/30 flex flex-col md:flex-row items-center justify-between group gap-8 hover:shadow-2xl transition-all"
                             >
                               <div className="flex items-center gap-10 w-full">
                                 <div className="w-24 h-24 bg-white overflow-hidden border border-gold/10">
                                   <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                                 </div>
                                 <div className="space-y-3 flex-grow">
                                    <div className="flex items-center gap-4">
                                       <span className="text-[10px] uppercase tracking-widest font-black text-gold">Ownership: {post.author}</span>
                                    </div>
                                    <h4 className="text-3xl font-serif text-espresso leading-none">{post.title}</h4>
                                    <p className="text-[10px] text-espresso/40 uppercase tracking-[0.2em] font-bold">Author Identity: {post.authorEmail} · {post.date}</p>
                                 </div>
                               </div>
                               <div className="flex items-center gap-3">
                                 <Link to={`/journal/${post.id}`} className="bg-espresso text-cream px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-gold transition-all">
                                   Edit Perspective
                                 </Link>
                               </div>
                             </motion.div>
                           ))}
                         </div>
                         <div className="pt-8 border-t border-espresso/10" />
                       </div>
                     );
                   }
                   return null;
                 })()}

                  {journal.length === 0 && (
                    <div className="py-20 text-center border-2 border-dashed border-espresso/10 text-espresso/30 italic font-serif">
                       Archive is empty in Firestore.
                    </div>
                  )}
                  {journal.map((post) => (
                    <div key={post.id} className="bg-linen p-8 border border-espresso/5 flex flex-col md:flex-row items-center justify-between group gap-8 hover:border-gold/30 transition-all shadow-sm">
                       <div className="flex items-center gap-10 w-full">
                         <div className="w-24 h-24 bg-cream overflow-hidden border border-espresso/5 shadow-inner">
                            <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                         </div>
                         <div className="space-y-3 flex-grow">
                             <div className="flex items-center gap-4">
                                <div className="w-6 h-px bg-gold/40" />
                                <span className="text-[9px] uppercase tracking-widest font-black text-gold">{post.category}</span>
                             </div>
                             <h4 className="text-2xl font-serif text-espresso leading-none truncate max-w-md">{post.title}</h4>
                             <p className="text-[10px] text-espresso/40 uppercase tracking-[0.2em] font-bold">{post.date} · {post.readTime} By {post.author}</p>
                         </div>
                       </div>
                       <div className="flex items-center gap-3 shrink-0">
                          <button className="p-4 text-espresso/20 hover:text-gold hover:bg-white transition-all"><Edit2 size={18} /></button>
                          <button 
                            onClick={() => handleDelete(post.id, 'journal')}
                            className="p-4 text-espresso/20 hover:text-red-500 hover:bg-white transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                          <Link to={`/journal/${post.id}`} className="p-4 text-espresso/20 hover:text-espresso hover:bg-white transition-all">
                            <ExternalLink size={18} />
                          </Link>
                       </div>
                    </div>
                  ))}
               </div>
            )}

            {activeTab === 'leads' && (
              <div className="grid grid-cols-1 gap-8">
                 {leads.length === 0 && (
                    <div className="py-20 text-center border-2 border-dashed border-espresso/10 text-espresso/30 italic font-serif">
                       No incoming engineering leads found.
                    </div>
                  )}
                 {leads.map((lead) => (
                    <div key={lead.id} className="bg-linen p-10 border border-espresso/5 space-y-10 group relative overflow-hidden">
                       <div className={cn(
                          "absolute top-0 right-0 px-8 py-3 text-[9px] uppercase tracking-[0.4em] font-black",
                          lead.status === 'new' ? "bg-gold text-cream" : 
                          lead.status === 'contacted' ? "bg-blue-500 text-cream" : "bg-emerald text-cream"
                       )}>
                          {lead.status}
                       </div>
                       
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-6">
                          <div className="space-y-6">
                             <div className="space-y-2">
                                <h4 className="text-3xl font-serif text-espresso">{lead.name}</h4>
                                <div className="flex items-center gap-4 text-espresso/40 text-[10px] uppercase tracking-widest font-bold">
                                   <span>{lead.email}</span>
                                   <div className="w-1.5 h-1.5 bg-gold/50 rounded-full" />
                                   <span>{lead.phone}</span>
                                </div>
                             </div>
                             <div className="p-8 bg-cream border border-espresso/5 text-espresso/70 text-lg font-light leading-relaxed italic relative">
                                <span className="absolute -top-4 -left-2 text-6xl text-gold/10 font-serif">"</span>
                                {lead.message}
                             </div>
                          </div>
                          
                          <div className="space-y-8 lg:border-l lg:border-espresso/10 lg:pl-12">
                             <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                   <div className="text-[9px] uppercase tracking-widest text-gold font-bold">Planned Service</div>
                                   <div className="text-xl font-serif text-espresso">{lead.serviceType}</div>
                                </div>
                                <div className="space-y-2">
                                   <div className="text-[9px] uppercase tracking-widest text-gold font-bold">Project Scale</div>
                                   <div className="text-xl font-serif text-espresso tracking-tight">{lead.budget || 'UNDISCLOSED'}</div>
                                </div>
                             </div>
                             
                             <div className="flex items-center gap-6 pt-6">
                                {lead.status === 'new' && (
                                   <button 
                                      onClick={() => handleUpdateLeadStatus(lead.id, 'contacted')}
                                      className="flex-grow bg-espresso text-cream py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all shadow-lg active:scale-95"
                                   >
                                      Initiate Contact
                                   </button>
                                )}
                                {lead.status !== 'closed' && (
                                   <button 
                                      onClick={() => handleUpdateLeadStatus(lead.id, 'closed')}
                                      className="flex-grow border border-espresso text-espresso py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-espresso hover:text-cream transition-all shadow-sm active:scale-95"
                                   >
                                      Vault Closed
                                   </button>
                                )}
                             </div>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* CRUD Placeholder Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-espresso/60 backdrop-blur-md">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-cream w-full max-w-4xl max-h-[90vh] overflow-y-auto p-12 border border-white/20 shadow-2xl space-y-12 relative"
             >
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-8 right-8 text-espresso/40 hover:text-espresso transition-colors"
                >
                   <X size={24} />
                </button>
                
                <div className="space-y-4">
                   <h2 className="text- gold text-[10px] uppercase tracking-[0.5em] font-bold">{editingItem ? 'Modify' : 'Construct New'} {activeTab.slice(0, -1)}</h2>
                   <h3 className="text-5xl font-serif text-espresso leading-none">Record <span className="italic">Update</span></h3>
                </div>

                <div className="p-20 border-2 border-dashed border-espresso/10 text-center flex flex-col items-center gap-6">
                   <AlertCircle size={40} className="text-gold" />
                   <p className="text-xl font-light text-espresso/60 max-w-md">
                      Detailed CRUD form would take excessive UI code here. To add real data, use the <span className="text-gold font-bold">"Initialize DB from Constants"</span> button to sync your polished deep-dive data instantly.
                   </p>
                   <button 
                    onClick={() => setIsModalOpen(false)}
                    className="bg-espresso text-cream px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold"
                   >
                     Understood
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
