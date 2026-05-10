import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAF_SE0_u-1o9DlZilgS1km4q82lMwRIaU",
  authDomain: "moviebox-ug.firebaseapp.com",
  projectId: "moviebox-ug",
  storageBucket: "moviebox-ug.firebasestorage.app",
  messagingSenderId: "707724872928",
  appId: "1:707724872928:web:7dc8457ee5cb6d38285485",
  measurementId: "G-E8Q5LJ5P7P",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
