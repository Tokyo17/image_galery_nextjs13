
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "image-76cf3.firebaseapp.com",
  projectId: "image-76cf3",
  storageBucket: "image-76cf3.appspot.com",
  messagingSenderId: "63034161453",
  appId: "1:63034161453:web:cb84ed1dc4ef474bd5fba4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)