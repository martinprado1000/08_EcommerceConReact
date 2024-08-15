// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB5rg4k2qFQRjFCvaJdUKcTfGBlaNY28Yw",
//   authDomain: "ecommerce-mprado.firebaseapp.com",
//   projectId: "ecommerce-mprado",
//   storageBucket: "ecommerce-mprado.appspot.com",
//   messagingSenderId: "1050388722697",
//   appId: "1:1050388722697:web:fe1a13a0d5f00ba153f4d8"
// };
const URL_BACK = import.meta.env.VITE_URL_BACK;
const APIKEY = import.meta.env.VITE_APIKEY;
const AUTODOMAIN = import.meta.env.VITE_AUTODOMAIN;
const PROJECTID = import.meta.env.VITE_PROJECTID;
const STORAGEBUCKET = import.meta.env.VITE_STORAGEBUCKET;
const MESSAGINGSENDERID = import.meta.env.VITE_MESSAGINGSENDERID;
const APPID = import.meta.env.VITE_APPID;

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTODOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID
};

//const app = initializeApp(firebaseConfig);      // Inicializamos Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]; // verificación que asegura que Firebase solo se inicialice una vez,
export const dbFirestore = getFirestore(app)      // Inicializamos firestore






