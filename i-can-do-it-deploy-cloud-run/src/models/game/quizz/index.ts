import { Game } from "..";

export class QuizzScore {
    constructor(public correct: number, public total: number) {}
}

export class QuizzOption {
    constructor(public text: string, public isCorrect: boolean) {}
}

export class QuizzItem {
    constructor(public question: string, public options: QuizzOption[]) {}
}

export class Quizz extends Game<QuizzScore, QuizzItem[]> {}
