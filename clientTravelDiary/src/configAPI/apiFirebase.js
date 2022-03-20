import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBhQELNg5SVlg7t0sGNnS_LjDlBKBPXtOE",
    authDomain: "travel-diary-37f31.firebaseapp.com",
    projectId: "travel-diary-37f31",
    storageBucket: "travel-diary-37f31.appspot.com",
    messagingSenderId: "143052099215",
    appId: "1:143052099215:web:f1bc003d4a226d47a76afa",
    measurementId: "G-ZYRP5KWTJN"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app)