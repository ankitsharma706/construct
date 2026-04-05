import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { PROJECTS, JOURNAL_POSTS } from '../src/constants';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env from the root
dotenv.config({ path: resolve(__dirname, '../.env') });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log('🚀 Starting Firebase Seeding...');

  try {
    // Seed Projects
    console.log('--- Seeding Projects ---');
    for (const project of PROJECTS) {
      const { id, ...data } = project;
      await addDoc(collection(db, 'projects'), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`✅ Added Project: ${project.title}`);
    }

    // Seed Journal
    console.log('--- Seeding Journal ---');
    for (const post of JOURNAL_POSTS) {
      const { id, ...data } = post;
      await addDoc(collection(db, 'journal'), {
        ...data,
        createdAt: serverTimestamp()
      });
      console.log(`✅ Added Journal Post: ${post.title}`);
    }

    console.log('✨ Seeding Completed Successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Seeding Failed:', error);
    if (error.code) console.error('Error Code:', error.code);
    if (error.message) console.error('Error Message:', error.message);
    process.exit(1);
  }
}

console.log('Project ID:', firebaseConfig.projectId);
seed();
