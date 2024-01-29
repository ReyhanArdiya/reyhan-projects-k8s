import {
    RulesTestContext,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import dayjs from "dayjs";
import { Firestore, getDoc } from "firebase/firestore";
import {
    FirebaseStorage,
    getMetadata,
    getStorage,
    ref,
    uploadString,
} from "firebase/storage";
import { Article } from ".";
import getFirebaseClient from "../../utils/firebase/get-firebase-client";
import {
    cleanupFirebase,
    getFirebaseRulesTestEnv,
    mockDb,
} from "../../utils/tests/firebase-test-utils";
import {
    deleteArticle,
    getArticle,
    getArticles,
    saveArticle,
    saveArticleMedia,
} from "./utils";

let rules: RulesTestEnvironment;
let user: RulesTestContext;
let db: Firestore;
// let storage: FirebaseStorage;
let mockArticle: Article;

beforeEach(async () => {
    rules = await getFirebaseRulesTestEnv();
    user = rules.authenticatedContext("test", {
        admin: true,
    });
    db = mockDb(user);
    // storage = user.storage("i-can-do-it-45786.appspot.com");
    mockArticle = new Article(
        "Mock Article",
        new Date(),
        {
            name: "You",
            picUrl: "feijfe.png",
        },
        [
            {
                src: "efe",
                alt: "fkoef",
                title: "fkijifj",
            },
        ],
        "Meow!",
        "meowmere!"
    );
});

afterEach(async () => await cleanupFirebase(rules));

describe("Firestore operations", () => {
    test("saveArticle saves a new article if user is admin", async () => {
        const savedArticleRef = await saveArticle(db, mockArticle);

        expect((await getDoc(savedArticleRef)).exists()).toBe(true);
    });

    test("saveArticle updates an article if user is admin", async () => {
        const originalArticleRef = await saveArticle(db, mockArticle);

        const newArticle: Article = {
            ...mockArticle,
            author: { picUrl: "meow", name: "Updated" },
        };

        const newArticleData = (
            await getDoc(await saveArticle(db, newArticle, originalArticleRef.id))
        ).data() as Article;

        expect(newArticleData.author.name).toBe(newArticle.author.name);
    });

    test("getArticle gets an article by its uid", async () => {
        const savedArticleRef = await saveArticle(db, mockArticle);

        const fetchedArticle = (await getArticle(db, savedArticleRef.id)).data();

        expect(fetchedArticle).toEqual(mockArticle);
    });

    test("getArticles returns a list of article sorted by created", async () => {
        const now = dayjs();
        const articleOld: Article = {
            ...mockArticle,
            created: dayjs(now).subtract(1, "day").toDate(),
        };
        const articleNow = {
            ...mockArticle,
            created: now.toDate(),
        };
        const articleFuture = {
            ...mockArticle,
            created: dayjs(now).add(1, "day").toDate(),
        };

        await saveArticle(db, articleOld);
        await saveArticle(db, articleNow);
        await saveArticle(db, articleFuture);

        const newestToOldestArticles = (await getArticles(db)).docs;

        expect(newestToOldestArticles[0].data()).toEqual(articleFuture);
        expect(newestToOldestArticles[1].data()).toEqual(articleNow);
        expect(newestToOldestArticles[2].data()).toEqual(articleOld);
    });

    test("deleteArticle deletes an article by its uid if user is admin", async () => {
        const savedArticleRef = await saveArticle(db, mockArticle);

        await deleteArticle(db, savedArticleRef.id);

        expect((await getDoc(savedArticleRef)).exists()).toBe(false);
        // await expect(getDoc(savedArticleRef)).resolves.toBeTruthy();
    });
});

describe.skip("Media storage", () => {
    let mockFile: File;
    beforeEach(() => {
        mockFile = new File([""], "fake.jpg", {
            type: "image/jpg",
        });
    });

    test("saveArticleMedia saves a media to /articles/article_id folder", async () => {
        const ref = await saveArticleMedia(
            getStorage(getFirebaseClient()),
            "1",
            mockFile
        );

        // expect(ref.fullPath).toMatch(/^\/articles\/1/);
        // expect(await getMetadata(ref)).toBeTruthy();
    });
    test("saveArticleMedia replaces a media in /articles/article_id folder", async () => {
        await uploadString(ref(getStorage(getFirebaseClient()), "meow"), "hello");
    }, 99999);
    test("getArticleMediaUrl gets a media link from /articles/article_id folder", async () => {});
    test("deleteArticleMedia deletes a media in /articles/article_id folder", async () => {});
});
