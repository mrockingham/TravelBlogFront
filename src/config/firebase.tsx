import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAbkgF-dvEyM9nxLvYGzOyd7QGmlNnvREk',
  authDomain: 'blogreixne.firebaseapp.com',
  projectId: 'blogreixne',
  storageBucket: 'blogreixne.appspot.com',
  messagingSenderId: '223703188467',
  appId: '1:223703188467:web:49f31579b7a30e4a848886',
  measurementId: 'G-SGPJKSTTF8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.REACT_APP_BUCKET_URL);
const analytics = getAnalytics(app);

export default storage;
