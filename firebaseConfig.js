import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBfPNCafR-_F7TwgHK9cnUSilFgpx5Q3MY",
  authDomain: "capstone-project-atlp.firebaseapp.com",
  projectId: "capstone-project-atlp",
  storageBucket: "capstone-project-atlp.appspot.com",
  messagingSenderId: "1001315819339",
  appId: "1:1001315819339:web:124c64acd9a6799d3ed2ce",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

