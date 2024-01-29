import {
    collection,
    Firestore,
    FirestoreDataConverter,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    QuerySnapshot,
} from "firebase/firestore";
import { useEffect } from "react";
import { Member } from ".";

export const membersConverter: FirestoreDataConverter<Member> = {
    fromFirestore(snapshot) {
        const data = snapshot.data();

        return new Member(data.name, data.picUrl, data.quote, data.socials);
    },
    toFirestore(modelObject) {
        return { ...modelObject };
    },
};

export const getMembersCollection = (db: Firestore) => {
    const colRef = collection(db, "/members").withConverter(membersConverter);

    return colRef;
};

export const getMembers = (db: Firestore) => {
    return getDocs(query(getMembersCollection(db), orderBy("name")));
};

export const useSnapMembers = async (
    db: Firestore,
    observer: (quizzes: QuerySnapshot<Member>) => void
) => {
    useEffect(() => {
        onSnapshot(query(getMembersCollection(db), orderBy("name")), observer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
