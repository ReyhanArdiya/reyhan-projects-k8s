import {
    RulesTestContext,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import dayjs from "dayjs";
import { Firestore, getDoc } from "firebase/firestore";
import ArticleComment from ".";
import {
    cleanupFirebase,
    getFirebaseRulesTestEnv,
    mockDb,
} from "../../utils/tests/firebase-test-utils";
import {
    deleteArticleComment,
    getArticleComments,
    getArticleCommentsCollection,
    saveArticleComment,
} from "./utils";

let rules: RulesTestEnvironment;
let user: RulesTestContext;
let db: Firestore;
// let storage: FirebaseStorage;
let mockArticleComment: ArticleComment;

beforeEach(async () => {
    rules = await getFirebaseRulesTestEnv();
    user = rules.authenticatedContext("test", {
        admin: true,
    });
    db = mockDb(user);
    // storage = user.storage("i-can-do-it-45786.appspot.com");
    mockArticleComment = new ArticleComment(
        {
            name: "John Doe",
            picUrl: "123",
            uid: "test",
        },
        "Lorem ipsum dolor sit amet,fjioejfioejfiojioaf ewiofjiwo jfiowejf opweweiofwejfio wjfoiwe fjoiwf jiowjfo iwej Lorem ipsum dolor sit amet,fjioejfioejfiojioaf ewiofjiwo jfiowejf opweweiofwejfio wjfoiwe fjoiwf jiowjfo iwej",
        new Date()
    );
});

afterEach(async () => await cleanupFirebase(rules));

test("getArticleCommentsCollection returns a colRef pointing to /articles/:articleId/comments", async () => {
    expect(getArticleCommentsCollection(db, "123").path).toBe(
        "articles/123/comments"
    );
});

test("saveArticleComment saves an article comment", async () => {
    const savedArticleCommentRef = await saveArticleComment(
        db,
        "123",
        mockArticleComment
    );

    expect((await getDoc(savedArticleCommentRef)).exists()).toBe(true);
});

test("saveArticleComment updates an article comment", async () => {
    const oriArtCmtRef = await saveArticleComment(db, "123", mockArticleComment);

    const newArtCmt: ArticleComment = {
        ...mockArticleComment,
        author: { picUrl: "meow", name: "Updated", uid: "test" },
    };

    const newArtCmtData = (
        await getDoc(await saveArticleComment(db, "123", newArtCmt, oriArtCmtRef.id))
    ).data() as ArticleComment;

    expect(newArtCmtData.author.name).toBe(newArtCmt.author.name);
});

test("getArticleComments lists an article's comments sorted by created", async () => {
    const now = dayjs();
    const commentOld: ArticleComment = {
        ...mockArticleComment,
        created: dayjs(now).subtract(1, "day").toDate(),
    };
    const commentNow = {
        ...mockArticleComment,
        created: now.toDate(),
    };
    const commentFuture = {
        ...mockArticleComment,
        created: dayjs(now).add(1, "day").toDate(),
    };

    await saveArticleComment(db, "123", commentOld);
    await saveArticleComment(db, "123", commentNow);
    await saveArticleComment(db, "123", commentFuture);

    const newestToOldestArticleComments = (await getArticleComments(db, "123")).docs;

    expect(newestToOldestArticleComments[0].data()).toEqual(commentFuture);
    expect(newestToOldestArticleComments[1].data()).toEqual(commentNow);
    expect(newestToOldestArticleComments[2].data()).toEqual(commentOld);
});

test("deleteArticleComment deletes an article comment", async () => {
    const commentRef = await saveArticleComment(db, "123", mockArticleComment);

    await deleteArticleComment(db, "123", commentRef.id);

    expect((await getDoc(commentRef)).exists()).toBe(false);
});
