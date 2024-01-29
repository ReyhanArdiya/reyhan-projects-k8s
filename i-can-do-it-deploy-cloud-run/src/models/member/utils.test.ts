import {
    RulesTestEnvironment,
    RulesTestContext,
} from "@firebase/rules-unit-testing";
import { doc, Firestore, setDoc, writeBatch } from "firebase/firestore";
import { Member } from ".";
import {
    cleanupFirebase,
    getFirebaseRulesTestEnv,
    mockDb,
} from "../../utils/tests/firebase-test-utils";
import { getMembers, getMembersCollection } from "./utils";

let rules: RulesTestEnvironment;
let user: RulesTestContext;
let db: Firestore;
let mockMember: Member;

beforeEach(async () => {
    rules = await getFirebaseRulesTestEnv();
    user = rules.authenticatedContext("test", {
        admin: true,
    });
    db = mockDb(user);
    mockMember = new Member("John Doe", "https://picsum.photos/300/200", "Quote", {
        instagram: "abc",
        email: "abc",
    });
});

afterEach(async () => await cleanupFirebase(rules));

test("getMembers returns a list of members sorted asc by their name", async () => {
    const amy = { ...mockMember };
    amy.name = "amy";
    const beth = { ...mockMember };
    beth.name = "beth";
    const charlie = { ...mockMember };
    charlie.name = "charlie";

    await rules.withSecurityRulesDisabled(async ctx => {
        const db = ctx.firestore();
        const batch = writeBatch(db);
        batch
            // @ts-ignore
            .set(doc(getMembersCollection(db)), amy)
            // @ts-ignore
            .set(doc(getMembersCollection(db)), beth)
            // @ts-ignore
            .set(doc(getMembersCollection(db)), charlie);
        await batch.commit();
    });

    const members = await getMembers(db);

    expect(members.docs[0].data().name).toBe(amy.name);
    expect(members.docs[1].data().name).toBe(beth.name);
    expect(members.docs[2].data().name).toBe(charlie.name);
});
