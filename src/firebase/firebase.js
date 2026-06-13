import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_fh-t5i9khmyLBGzSXPgRhojmpY903Ao",
  authDomain: "movie-website-3423f.firebaseapp.com",
  projectId: "movie-website-3423f",
  storageBucket:  "movie-website-3423f.firebasestorage.app",
  messagingSenderId:  "823969653326",
  appId:"1:823969653326:web:41e9510e397d67de58d91f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);