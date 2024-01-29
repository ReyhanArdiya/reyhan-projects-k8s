export class GameRecord<T> {
    constructor(public name: string, public picUrl: string, public score: T) {}
}

export abstract class Game<TScore, TBody> {
    constructor(
        public title: string,
        public description: string,
        public body: TBody,
        public gameRecords?: GameRecord<TScore>[],
        public thumbnail?: string
    ) {}
}
