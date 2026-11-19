import { FirebaseError } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { appCheck, db } from '../firebase';
import { ContactLead, JournalPost, Project } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string): Error {
  const code = error instanceof FirebaseError ? error.code : 'unknown';
  console.error('Firestore operation failed', { operationType, path, code });
  return new Error(`Firestore ${operationType} failed (${code}).`);
}

function mapProject(snapshot: DocumentSnapshot<DocumentData>): Project {
  const data = snapshot.data();
  if (
    typeof data.title !== 'string' ||
    typeof data.location !== 'string' ||
    typeof data.cost !== 'string' ||
    typeof data.category !== 'string' ||
    typeof data.description !== 'string' ||
    !Array.isArray(data.images)
  ) {
    throw new Error(`Invalid project document: ${snapshot.id}`);
  }
  return { ...data, id: snapshot.id } as Project;
}

function mapJournalPost(snapshot: DocumentSnapshot<DocumentData>): JournalPost {
  const data = snapshot.data();
  const validSections = Array.isArray(data.sections) && data.sections.every(
    (section: unknown) =>
      typeof section === 'object' &&
      section !== null &&
      'title' in section &&
      typeof section.title === 'string' &&
      'content' in section &&
      typeof section.content === 'string',
  );
  if (
    typeof data.title !== 'string' ||
    typeof data.category !== 'string' ||
    typeof data.excerpt !== 'string' ||
    typeof data.date !== 'string' ||
    typeof data.author !== 'string' ||
    typeof data.image !== 'string' ||
    typeof data.readTime !== 'string' ||
    !validSections
  ) {
    throw new Error(`Invalid journal document: ${snapshot.id}`);
  }
  return { ...data, id: snapshot.id } as JournalPost;
}

const PROJECTS_COLLECTION = 'projects';
const LEADS_COLLECTION = 'leads';
const JOURNAL_COLLECTION = 'journal';

export const projectService = {
  async getAll(): Promise<Project[]> {
    try {
      const q = query(
        collection(db, PROJECTS_COLLECTION),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(mapProject);
    } catch (error) {
      throw handleFirestoreError(error, OperationType.LIST, PROJECTS_COLLECTION);
    }
  },

  async getAllForAdmin(): Promise<Project[]> {
    try {
      const snapshot = await getDocs(query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc')));
      return snapshot.docs.map(mapProject);
    } catch (error) {
      throw handleFirestoreError(error, OperationType.LIST, PROJECTS_COLLECTION);
    }
  },

  subscribeAll(callback: (projects: Project[]) => void, onError?: (error: Error) => void) {
    const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(mapProject));
    }, (error) => {
      const safeError = handleFirestoreError(error, OperationType.LIST, PROJECTS_COLLECTION);
      if (onError) onError(safeError);
    });
  },

  subscribePublished(callback: (projects: Project[]) => void, onError?: (error: Error) => void) {
    const q = query(
      collection(db, PROJECTS_COLLECTION),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
    );
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(mapProject));
    }, (error) => {
      const safeError = handleFirestoreError(error, OperationType.LIST, PROJECTS_COLLECTION);
      if (onError) onError(safeError);
    });
  },

  async getById(id: string): Promise<Project | null> {
    try {
      const snapshot = await getDoc(doc(db, PROJECTS_COLLECTION, id));
      return snapshot.exists() ? mapProject(snapshot) : null;
    } catch (error) {
      throw handleFirestoreError(error, OperationType.GET, `${PROJECTS_COLLECTION}/${id}`);
    }
  },

  async create(project: Omit<Project, 'id'>) {
    try {
      return await addDoc(collection(db, PROJECTS_COLLECTION), {
        ...project,
        published: project.published ?? true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw handleFirestoreError(error, OperationType.CREATE, PROJECTS_COLLECTION);
    }
  },

  async bootstrap(id: string, project: Omit<Project, 'id'>) {
    try {
      const matches = await getDocs(query(collection(db, PROJECTS_COLLECTION), where('title', '==', project.title)));
      const existing = matches.docs.find((document) => document.id === id) || matches.docs[0];
      await setDoc(existing?.ref || doc(db, PROJECTS_COLLECTION, id), {
        ...project,
        published: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      throw handleFirestoreError(error, OperationType.CREATE, `${PROJECTS_COLLECTION}/${id}`);
    }
  },

  async update(id: string, project: Partial<Omit<Project, 'id' | 'createdAt'>>) {
    try {
      await updateDoc(doc(db, PROJECTS_COLLECTION, id), {
        ...project,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw handleFirestoreError(error, OperationType.UPDATE, `${PROJECTS_COLLECTION}/${id}`);
    }
  },

  async delete(id: string) {
    try {
      await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
    } catch (error) {
      throw handleFirestoreError(error, OperationType.DELETE, `${PROJECTS_COLLECTION}/${id}`);
    }
  },
};

export const journalService = {
  async getAll(): Promise<JournalPost[]> {
    try {
      const q = query(
        collection(db, JOURNAL_COLLECTION),
        where('published', '==', true),
        orderBy('date', 'desc'),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(mapJournalPost);
    } catch (error) {
      throw handleFirestoreError(error, OperationType.LIST, JOURNAL_COLLECTION);
    }
  },

  async getAllForAdmin(): Promise<JournalPost[]> {
    try {
      const snapshot = await getDocs(query(collection(db, JOURNAL_COLLECTION), orderBy('date', 'desc')));
      return snapshot.docs.map(mapJournalPost);
    } catch (error) {
      throw handleFirestoreError(error, OperationType.LIST, JOURNAL_COLLECTION);
    }
  },

  subscribeAll(callback: (posts: JournalPost[]) => void, onError?: (error: Error) => void) {
    const q = query(collection(db, JOURNAL_COLLECTION), orderBy('date', 'desc'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(mapJournalPost));
    }, (error) => {
      const safeError = handleFirestoreError(error, OperationType.LIST, JOURNAL_COLLECTION);
      if (onError) onError(safeError);
    });
  },

  async getById(id: string): Promise<JournalPost | null> {
    try {
      const snapshot = await getDoc(doc(db, JOURNAL_COLLECTION, id));
      return snapshot.exists() ? mapJournalPost(snapshot) : null;
    } catch (error) {
      throw handleFirestoreError(error, OperationType.GET, `${JOURNAL_COLLECTION}/${id}`);
    }
  },

  async create(post: Omit<JournalPost, 'id'>) {
    try {
      return await addDoc(collection(db, JOURNAL_COLLECTION), {
        ...post,
        published: post.published ?? true,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      throw handleFirestoreError(error, OperationType.CREATE, JOURNAL_COLLECTION);
    }
  },

  async bootstrap(id: string, post: Omit<JournalPost, 'id'>) {
    try {
      const matches = await getDocs(query(collection(db, JOURNAL_COLLECTION), where('title', '==', post.title)));
      const existing = matches.docs.find((document) => document.id === id) || matches.docs[0];
      await setDoc(existing?.ref || doc(db, JOURNAL_COLLECTION, id), {
        ...post,
        published: true,
        createdAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      throw handleFirestoreError(error, OperationType.CREATE, `${JOURNAL_COLLECTION}/${id}`);
    }
  },

  async update(id: string, post: Partial<Omit<JournalPost, 'id' | 'createdAt'>>) {
    try {
      await updateDoc(doc(db, JOURNAL_COLLECTION, id), post);
    } catch (error) {
      throw handleFirestoreError(error, OperationType.UPDATE, `${JOURNAL_COLLECTION}/${id}`);
    }
  },

  async delete(id: string) {
    try {
      await deleteDoc(doc(db, JOURNAL_COLLECTION, id));
    } catch (error) {
      throw handleFirestoreError(error, OperationType.DELETE, `${JOURNAL_COLLECTION}/${id}`);
    }
  },
};

export const leadService = {
  async create(lead: Omit<ContactLead, 'id' | 'status' | 'createdAt'>) {
    if (!appCheck) {
      throw new Error('Secure form submissions are unavailable until Firebase App Check is configured.');
    }
    try {
      return await addDoc(collection(db, LEADS_COLLECTION), {
        ...lead,
        status: 'new',
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      throw handleFirestoreError(error, OperationType.CREATE, LEADS_COLLECTION);
    }
  },

  async getAll(): Promise<ContactLead[]> {
    try {
      const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((document) => ({ id: document.id, ...document.data() } as ContactLead));
    } catch (error) {
      throw handleFirestoreError(error, OperationType.LIST, LEADS_COLLECTION);
    }
  },

  async updateStatus(id: string, status: ContactLead['status']) {
    try {
      await updateDoc(doc(db, LEADS_COLLECTION, id), { status });
    } catch (error) {
      throw handleFirestoreError(error, OperationType.UPDATE, `${LEADS_COLLECTION}/${id}`);
    }
  },
};
