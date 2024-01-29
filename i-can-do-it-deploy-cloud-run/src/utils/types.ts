export interface IsAuthored {
    author: {
        name: string;
        picUrl: string;
    };
}

export type WithId<T> = T & { id: string };
