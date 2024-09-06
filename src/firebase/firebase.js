import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD2Uj1OuFeTtmlpu_FIfhg_0RLknMRPA60",
    authDomain: "reactscheduler-bddce.firebaseapp.com",
    projectId: "reactscheduler-bddce",
    storageBucket: "reactscheduler-bddce.appspot.com",
    messagingSenderId: "358582189571",
    appId: "1:358582189571:web:397d30f428bd98efd91836",
    measurementId: "G-RFDFGM1V82"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);