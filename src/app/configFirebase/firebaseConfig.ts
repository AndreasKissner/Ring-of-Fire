import { initializeApp } from '@angular/fire/app';

export const firebaseConfig = {
  projectId: 'ring-of-fire-e5b2a',
  appId: '1:150255254290:web:9c10175f3655fc28bd51cb',
  storageBucket: 'ring-of-fire-e5b2a.firebasestorage.app',
  apiKey: 'AIzaSyA9d4PYOtu_1ZSsakQ3lFntL1FZ7Tw-SoM',
  authDomain: 'ring-of-fire-e5b2a.firebaseapp.com',
  messagingSenderId: '150255254290',
  projectNumber: '150255254290',
  version: '2',
};

export const firebaseAppFactory = () => initializeApp(firebaseConfig);
