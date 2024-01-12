import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD4Yb2A9TUXo_M9SaYDWuwPj94IhE027as',
  authDomain: 'amado-theme.firebaseapp.com',
  projectId: 'amado-theme',
  storageBucket: 'amado-theme.appspot.com',
  messagingSenderId: '4528328338',
  appId: '1:4528328338:web:2f66b0c3125c5078ea604b',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
