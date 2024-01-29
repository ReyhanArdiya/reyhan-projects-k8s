import {
    collection,
    deleteDoc,
    doc,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    FirestoreDataConverter,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    QuerySnapshot,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import { FirebaseStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect } from "react";

import { Article } from ".";
import { getUniqueStorageName } from "../../utils/firebase/storage";

export const articleConverter: FirestoreDataConverter<Article> = {
    fromFirestore(snapshot) {
        const data = snapshot.data();

        return new Article(
            data.title,
            (data.created as Timestamp).toDate(),
            data.author,
            data.body,
            data.headerVideoUrl,
            data.thumbnail
        );
    },
    toFirestore(modelObject) {
        return {
            ...modelObject,
            headerVideoUrl: modelObject.headerVideoUrl || null,
            thumbnail: modelObject.thumbnail || null,
        } as Article;
    },
};

export const getArticleCollection = (db: Firestore) => {
    const colRef = collection(db, "/articles").withConverter(articleConverter);

    return colRef;
};

interface ISaveArticle {
    (db: Firestore, data: Article): Promise<DocumentReference<Article>>;
    (db: Firestore, data: Article, uid?: string): Promise<
        DocumentReference<Article>
    >;
}

export const saveArticle: ISaveArticle = async (db, data, uid?) => {
    const colRef = getArticleCollection(db);

    const articleRef =
        typeof uid === "string" && uid ? doc(colRef, uid) : doc(colRef);

    await setDoc(articleRef, data);

    return articleRef;
};

// CMT You can you saveArticle for updating too
// export const updateArticle = async (db: Firestore, uid: string, data: Article) => {
//     const articleRef = doc(getArticleCollection(db), uid);

//     await setDoc(articleRef, data);

//     return articleRef;
// };

export const getArticle = async (
    db: Firestore,
    uid: string
): Promise<DocumentSnapshot<Article>> => {
    return await getDoc(doc(getArticleCollection(db), uid));
};

export const getArticles = async (
    db: Firestore
): Promise<QuerySnapshot<Article>> => {
    const colRef = getArticleCollection(db);

    return await getDocs(query(colRef, orderBy("created", "desc")));
};

export const useSnapArticles = async (
    db: Firestore,
    observer: (articles: QuerySnapshot<Article>) => void
) => {
    useEffect(() => {
        onSnapshot(
            query(getArticleCollection(db), orderBy("created", "desc")),
            observer
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export const deleteArticle = async (db: Firestore, uid: string) => {
    const colRef = getArticleCollection(db);

    await deleteDoc(doc(colRef, uid));
};

export const getArticleFolderRef = (storage: FirebaseStorage, articleId: string) => {
    return ref(storage, `/articles/${articleId}`);
};

export const saveArticleMedia = async (
    storage: FirebaseStorage,
    articleId: string,
    data: File,
    name = data ? getUniqueStorageName(data.name) : ""
) => {
    const mediaRef = ref(getArticleFolderRef(storage, articleId), name);

    return await uploadBytes(mediaRef, data);
};
