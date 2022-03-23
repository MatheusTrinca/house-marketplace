import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAc0TwLyxq3DL-Guu3v2zwTJSbvISHV65U',
  authDomain: 'house-marketplace-app-e0ed8.firebaseapp.com',
  projectId: 'house-marketplace-app-e0ed8',
  storageBucket: 'house-marketplace-app-e0ed8.appspot.com',
  messagingSenderId: '518529742834',
  appId: '1:518529742834:web:1450ecb52908dfd0f15d6b',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
