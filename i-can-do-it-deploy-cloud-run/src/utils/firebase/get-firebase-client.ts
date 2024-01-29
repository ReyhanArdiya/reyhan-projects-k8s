import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import setupLocalEmulator from "./setup-local-emulator";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APPID,
};

// Initialize Firebase
const getFirebaseClient = () => {
    try {
        return getApp();
    } catch (err) {
        return initializeApp(firebaseConfig);
    }
};

export const app = getFirebaseClient();

if (typeof window !== "undefined") {
    setupLocalEmulator(app);
}

export const db = getFirestore(app);
export const auth = getAuth(app);

export default getFirebaseClient;
