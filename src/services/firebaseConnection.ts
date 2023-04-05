// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAs5nWLh04d3k1tO7RQVfajOg3NikE1FpI',
  authDomain: 'tarefator2.firebaseapp.com',
  projectId: 'tarefator2',
  storageBucket: 'tarefator2.appspot.com',
  messagingSenderId: '469554649353',
  appId: '1:469554649353:web:35a29d48e5d1002aae9bd8',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
