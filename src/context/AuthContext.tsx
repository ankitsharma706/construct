import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const MASTER_EMAILS = [
  'ankitkumar999090@gmail.com',
  'ankitsharma18.net@gmail.com',
  'admin@construct.ai'
];

const checkIsAdmin = (user: User | null, role?: string) => {
  if (!user || !user.email) return false;
  const email = user.email.toLowerCase().trim();
  const isMaster = MASTER_EMAILS.map(e => e.toLowerCase().trim()).includes(email);
  return isMaster || role === 'admin';
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser && currentUser.email) {
        const normalizedEmail = currentUser.email.toLowerCase().trim();
        const isMaster = MASTER_EMAILS.some(e => e.toLowerCase().trim() === normalizedEmail);
        
        if (isMaster) {
          console.log(`[Auth] Master Identity Verified: ${normalizedEmail}`);
          setIsAdmin(true);
        } else {
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            setIsAdmin(userDoc.exists() && userDoc.data().role === 'admin');
          } catch (error) {
            console.warn("Firestore role bank unreachable:", error);
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
