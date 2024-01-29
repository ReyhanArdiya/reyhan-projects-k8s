import {
    collection,
    deleteDoc,
    doc,
    DocumentReference,
    Firestore,
    FirestoreDataConverter,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    QuerySnapshot,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ArticleComment from ".";

export const articleCommentConverter: FirestoreDataConverter<ArticleComment> = {
    fromFirestore(snapshot) {
        const data = snapshot.data();

        return new ArticleComment(
            data.author,
            data.body,
            (data.created as Timestamp).toDate()
        );
    },
    toFirestore(articleComment) {
        return {
            ...articleComment,
        };
    },
};

export const getArticleCommentsCollection = (db: Firestore, articleId: string) => {
    return collection(db, `articles/${articleId}/comments`).withConverter(
        articleCommentConverter
    );
};

interface ISaveArticleComment {
    (db: Firestore, articleId: string, data: ArticleComment): Promise<
        DocumentReference<ArticleComment>
    >;
    (
        db: Firestore,
        articleId: string,
        data: ArticleComment,
        commentId: string
    ): Promise<DocumentReference<ArticleComment>>;
}

export const saveArticleComment: ISaveArticleComment = async (
    db,
    articleId,
    data,
    commentId?
) => {
    const colRef = getArticleCommentsCollection(db, articleId);

    const articleCommentRef =
        typeof commentId === "string" ? doc(colRef, commentId) : doc(colRef);

    await setDoc(articleCommentRef, data);

    return articleCommentRef;
};

export const getArticleComments = async (
    db: Firestore,
    articleId: string
): Promise<QuerySnapshot<ArticleComment>> => {
    const colRef = getArticleCommentsCollection(db, articleId);

    return await getDocs(query(colRef, orderBy("created", "desc")));
};

export const useSnapArticleComments = async (
    db: Firestore,
    articleId: string,
    observer: (articleComments: QuerySnapshot<ArticleComment>) => void
) => {
    useEffect(() => {
        onSnapshot(
            query(
                getArticleCommentsCollection(db, articleId),
                orderBy("created", "desc")
            ),
            observer
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articleId]);
};

export const deleteArticleComment = async (
    db: Firestore,
    articleId: string,
    commentId: string
) => {
    const colRef = getArticleCommentsCollection(db, articleId);

    return await deleteDoc(doc(colRef, commentId));
};
