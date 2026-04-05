import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Project, ContactLead } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const PROJECTS_COLLECTION = 'projects';
const LEADS_COLLECTION = 'leads';
const JOURNAL_COLLECTION = 'journal';

export const projectService = {
  async getAll() {
    try {
      const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, PROJECTS_COLLECTION);
      return [];
    }
  },

  subscribeAll(callback: (projects: Project[]) => void) {
    const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      callback(projects);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, PROJECTS_COLLECTION);
    });
  },

  async getById(id: string) {
    try {
      const docRef = doc(db, PROJECTS_COLLECTION, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Project;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${PROJECTS_COLLECTION}/${id}`);
      return null;
    }
  },

  async create(project: Omit<Project, 'id'>) {
    try {
      return await addDoc(collection(db, PROJECTS_COLLECTION), {
        ...project,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, PROJECTS_COLLECTION);
    }
  },

  async update(id: string, project: Partial<Project>) {
    try {
      const docRef = doc(db, PROJECTS_COLLECTION, id);
      return await updateDoc(docRef, {
        ...project,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${PROJECTS_COLLECTION}/${id}`);
    }
  },

  async delete(id: string) {
    try {
      const docRef = doc(db, PROJECTS_COLLECTION, id);
      return await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${PROJECTS_COLLECTION}/${id}`);
    }
  }
};

export const journalService = {
  async getAll() {
    try {
      const q = query(collection(db, JOURNAL_COLLECTION), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, JOURNAL_COLLECTION);
      return [];
    }
  },

  subscribeAll(callback: (posts: any[]) => void) {
    const q = query(collection(db, JOURNAL_COLLECTION), orderBy('date', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      callback(posts);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, JOURNAL_COLLECTION);
    });
  },

  async create(post: any) {
    try {
      return await addDoc(collection(db, JOURNAL_COLLECTION), {
        ...post,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, JOURNAL_COLLECTION);
    }
  },

  async update(id: string, post: any) {
    try {
       const docRef = doc(db, JOURNAL_COLLECTION, id);
       return await updateDoc(docRef, post);
    } catch (error) {
       handleFirestoreError(error, OperationType.UPDATE, `${JOURNAL_COLLECTION}/${id}`);
    }
  },

  async delete(id: string) {
    try {
      const docRef = doc(db, JOURNAL_COLLECTION, id);
      return await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${JOURNAL_COLLECTION}/${id}`);
    }
  }
};

export const leadService = {
  async create(lead: Omit<ContactLead, 'id' | 'status' | 'createdAt'>) {
    try {
      return await addDoc(collection(db, LEADS_COLLECTION), {
        ...lead,
        status: 'new',
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, LEADS_COLLECTION);
    }
  },

  async getAll() {
    try {
      const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactLead));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, LEADS_COLLECTION);
      return [];
    }
  },

  async updateStatus(id: string, status: string) {
    try {
      const docRef = doc(db, LEADS_COLLECTION, id);
      return await updateDoc(docRef, { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${LEADS_COLLECTION}/${id}`);
    }
  }
};
