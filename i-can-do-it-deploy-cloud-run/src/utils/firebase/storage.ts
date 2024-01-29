import { nanoid } from "nanoid";

export const getUniqueStorageName = (fileName: string) => {
    return `${nanoid()}_${fileName}`;
};
