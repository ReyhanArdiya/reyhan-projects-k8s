import { FirebaseStorage, ref } from "firebase/storage";

export const getGamesStorageFolderRef = (storage: FirebaseStorage) =>
    ref(storage, "/games");
