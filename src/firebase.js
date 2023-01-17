
import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore} from "firebase/firestore";




const firebaseConfig = {  
    apiKey: "AIzaSyA1kKZnhPKhKVul2_ot2NCXnKCFGysYFOw",
    authDomain: "burble-afc82.firebaseapp.com",
    projectId: "burble-afc82",
    storageBucket: "burble-afc82.appspot.com",
    messagingSenderId: "905639871608",
    appId: "1:905639871608:web:cd9ada33ca6a2ff92f598d",
    measurementId: "G-2HFGR3W05K"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
