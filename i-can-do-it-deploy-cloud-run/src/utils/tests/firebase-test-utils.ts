import {
    initializeTestEnvironment,
    RulesTestContext,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { Firestore } from "firebase/firestore";

export const getFirebaseRulesTestEnv = async () =>
    await initializeTestEnvironment({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECTID,
        hub: {
            host: "localhost",
            port: 4400,
        },
    });

export const cleanupFirebase = async (rule: RulesTestEnvironment) => {
    await rule.clearFirestore();
    await rule.clearStorage();
    await rule.cleanup();
};

/**
 * Used to fix type error when using rule's firestore with v9 SDK
 */
export const mockDb = (rules: RulesTestContext): Firestore => ({
    ...rules.firestore(),
    type: "firestore",
    toJSON() {
        return { ...this };
    },
});
