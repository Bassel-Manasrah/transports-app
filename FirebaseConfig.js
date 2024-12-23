import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgyq8kGlbp7rBFMIz0M-4ACnSSTOKVI7M",
  authDomain: "transporterapp-93dfc.firebaseapp.com",
  databaseURL: "https://transporterapp-93dfc-default-rtdb.firebaseio.com",
  projectId: "transporterapp-93dfc",
  storageBucket: "transporterapp-93dfc.appspot.com",
  messagingSenderId: "1007536389694",
  appId: "1:1007536389694:web:c81768d7c70ef26aef5b6f",
  measurementId: "G-WL4NVJS6PH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
