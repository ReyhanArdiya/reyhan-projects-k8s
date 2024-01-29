import {
    deleteObject,
    FirebaseStorage,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";

export const getPicStorageRef = (storage: FirebaseStorage, userId: string) => {
    return ref(storage, `profile_pictures/${userId}`);
};

export const saveProfilePicture = async (
    storage: FirebaseStorage,
    userId: string,
    image: File
) => await uploadBytes(getPicStorageRef(storage, userId), image);

export const deleteProfilePicture = async (
    storage: FirebaseStorage,
    userId: string
) => await deleteObject(getPicStorageRef(storage, userId));

export const getProfilePictureUrl = async (
    storage: FirebaseStorage,
    userId: string
) => await getDownloadURL(getPicStorageRef(storage, userId));
