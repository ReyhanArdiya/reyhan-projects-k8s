import { cert, initializeApp, getApp } from "firebase-admin/app";

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

const getFirebaseAdmin = () => {
    try {
        return initializeApp({
            credential: cert(serviceAccount),
        });
    } catch (err) {
        return getApp();
    }
};

export const app = getFirebaseAdmin();
