import {
    RulesTestContext,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { Firestore, getDoc } from "firebase/firestore";
import { Quizz, QuizzItem, QuizzOption, QuizzScore } from ".";
import { GameRecord } from "..";
import {
    cleanupFirebase,
    getFirebaseRulesTestEnv,
    mockDb,
} from "../../../utils/tests/firebase-test-utils";
import {
    deleteQuizz,
    getQuizz,
    getQuizzes,
    saveQuizz,
    saveQuizzGameRecord,
} from "./utils";

let rules: RulesTestEnvironment;
let user: RulesTestContext;
let db: Firestore;
let mockQuizz: Quizz;

beforeEach(async () => {
    rules = await getFirebaseRulesTestEnv();
    user = rules.authenticatedContext("test", {
        admin: true,
    });
    db = mockDb(user);
    mockQuizz = new Quizz(
        "Mock Quizz",
        "This is a mock Quizz",
        [
            new QuizzItem("q1", [
                new QuizzOption("A", false),
                new QuizzOption("B", false),
                new QuizzOption("C", false),
                new QuizzOption("D", true),
                new QuizzOption("E", false),
            ]),
        ],
        [new GameRecord("Test", "nothing", new QuizzScore(4, 5))],
        "https://picsum.photos/200/300"
    );
});

// afterEach(async () => await cleanupFirebase(rules));

test("saveQuizz saves a new quizz", async () => {
    const savedQuizzRef = await saveQuizz(db, mockQuizz);

    expect((await getDoc(savedQuizzRef)).exists()).toBe(true);
});

test("saveQuizz updates an quizz", async () => {
    const originalQuizzRef = await saveQuizz(db, mockQuizz);

    const newQuizz: Quizz = {
        ...mockQuizz,
        description: "Henlo!",
    };

    const newQuizzData = (
        await getDoc(await saveQuizz(db, newQuizz, originalQuizzRef.id))
    ).data() as Quizz;

    expect(newQuizzData.description).toBe(newQuizz.description);
});

test("getQuizz gets an quizz by its uid", async () => {
    const savedQuizzRef = await saveQuizz(db, mockQuizz);

    const fetchedQuizz = (await getQuizz(db, savedQuizzRef.id)).data();

    expect(fetchedQuizz).toEqual(mockQuizz);
});

test("getQuizzes returns a list of quizz", async () => {
    const quizzOne: Quizz = {
        ...mockQuizz,
        title: "QuizzOne",
    };
    const quizzTwo = {
        ...mockQuizz,
        title: "QuizzTwo",
    };
    const quizzThree = {
        ...mockQuizz,
        title: "QuizzThree",
    };

    await saveQuizz(db, quizzOne);
    await saveQuizz(db, quizzTwo);
    await saveQuizz(db, quizzThree);

    const quizzes = (await getQuizzes(db)).docs.reduce((map, quizz) => {
        map.set(quizz.data().title, true);

        return map;
    }, new Map());

    expect(quizzes.has(quizzOne.title)).toEqual(true);
    expect(quizzes.has(quizzTwo.title)).toEqual(true);
    expect(quizzes.has(quizzThree.title)).toEqual(true);
});

test("deleteQuizz deletes an quizz by its uid", async () => {
    const savedQuizzRef = await saveQuizz(db, mockQuizz);

    await deleteQuizz(db, savedQuizzRef.id);

    expect((await getDoc(savedQuizzRef)).exists()).toBe(false);
});

test("saveQuizzGameRecord adds a new gameRecord", async () => {
    const savedQuizzRef = await saveQuizz(db, mockQuizz);

    const newGameRecord: GameRecord<QuizzScore> = {
        name: "John doe",
        picUrl: "123",
        score: {
            correct: 4,
            total: 5,
        },
    };
    await saveQuizzGameRecord(db, savedQuizzRef.id, newGameRecord);

    const updatedQuizz = (await getDoc(savedQuizzRef)).data();

    expect(updatedQuizz?.gameRecords?.at(-1)).toEqual(newGameRecord);
});
