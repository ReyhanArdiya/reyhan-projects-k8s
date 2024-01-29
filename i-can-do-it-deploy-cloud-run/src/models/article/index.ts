import { Author, HasAuthor } from "../types/author";
import { WasCreated } from "../types/time";

export interface AudibleText {
    text: string;
    audioSrc: string;
}

export interface ArticleBodyImg {
    src: string;
    alt: string;
    title: string;
}

export class Article implements HasAuthor, WasCreated {
    constructor(
        public title: string,
        public created: Date,
        public author: Author,
        public body: Array<AudibleText | ArticleBodyImg>,
        public headerVideoUrl?: string,
        public thumbnail?: string
    ) {}
}
