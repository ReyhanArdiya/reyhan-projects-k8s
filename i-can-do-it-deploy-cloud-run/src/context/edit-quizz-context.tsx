import clone from "just-clone";
import React, { ReactNode, useState } from "react";
import { GameRecord } from "../models/game";
import { Quizz, QuizzItem, QuizzOption, QuizzScore } from "../models/game/quizz";

export interface QuizzInfo {
    title?: string;
    description?: string;
    thumbnail?: File;
    gameRecords?: Quizz["gameRecords"];
}

export interface IEditQuizzContext extends Omit<Quizz, "gameRecords" | "thumbnail"> {
    thumbnail: File;
    gameRecords: Quizz["gameRecords"];
    infoChanged: (quizzInfo: QuizzInfo) => void;
    bodyReplaced: (newQuizzBody: Quizz["body"]) => void;
    correctAnswerChanged: (questionIndex: number, answerIndex: number) => void;
    // TODO do this after answer input onblur
    answerTextUpdated: (
        questionIndex: number,
        answerIndex: number,
        text: string
    ) => void;
    questionAdded: () => void;
    questionTextUpdated: (questionIndex: number, text: string) => void;
    questionDeleted: (questionIndex: number) => void;
}

const EditQuizzContext = React.createContext<IEditQuizzContext>({
    body: [
        {
            options: [{ isCorrect: false, text: "" }],
            question: "",
        },
    ],
    gameRecords: [new GameRecord<QuizzScore>("", "", new QuizzScore(0, 0))],
    description: "",
    title: "",
    // TODO fix File is not defined on server side
    // @ts-expect-error: File is not defined when rendering server side
    thumbnail: 123,
    bodyReplaced() {},
    infoChanged() {},
    correctAnswerChanged() {},
    answerTextUpdated() {},
    questionAdded() {},
    questionDeleted() {},
    questionTextUpdated() {},
});

export const EditQuizzContextProvider = ({ children }: { children: ReactNode }) => {
    const [info, setInfo] = useState<QuizzInfo>({
        description: "",
        thumbnail: new File([""], ""),
        title: "",
        gameRecords: [new GameRecord<QuizzScore>("", "", new QuizzScore(0, 0))],
    });
    const [body, setBody] = useState<Quizz["body"]>([
        {
            options: [{ isCorrect: false, text: "" }],
            question: "",
        },
    ]);

    const editBody = (cb: (newBody: Quizz["body"]) => void) => {
        setBody(prev => {
            const newBody = clone(prev);
            cb(newBody);
            return newBody;
        });
    };

    const value: IEditQuizzContext = {
        infoChanged(quizzInfo) {
            setInfo(prev => ({ ...prev, ...quizzInfo }));
        },
        description: info.description as string,
        title: info.title as string,
        thumbnail: info.thumbnail as File,
        gameRecords: info.gameRecords as GameRecord<QuizzScore>[],
        body,
        bodyReplaced(newQuizzBody) {
            setBody(newQuizzBody);
        },
        correctAnswerChanged(questionIndex, answerIndex) {
            editBody(newBody => {
                const { options } = newBody[questionIndex];

                // Search for old correct answer and set it to false
                options.some(option => {
                    if (option.isCorrect) {
                        option.isCorrect = false;
                        return true;
                    }
                });

                options[answerIndex].isCorrect = true;
            });
        },
        answerTextUpdated(questionIndex, answerIndex, text) {
            editBody(newBody => {
                const { options } = newBody[questionIndex];
                options[answerIndex].text = text;
            });
        },
        questionTextUpdated(questionIndex, text) {
            editBody(newBody => {
                if (text) {
                    return (newBody[questionIndex].question = text);
                }

                newBody[questionIndex].question = "Soal";
            });
        },
        questionDeleted(questionIndex) {
            editBody(newBody => {
                newBody.splice(questionIndex, 1);
            });
        },
        questionAdded() {
            editBody(newBody => {
                newBody.push(
                    new QuizzItem("Soal", [
                        new QuizzOption("Pilihan 1", true),
                        new QuizzOption("Pilihan 2", false),
                        new QuizzOption("Pilihan 3", false),
                        new QuizzOption("Pilihan 4", false),
                    ])
                );
            });
        },
    };

    return (
        <EditQuizzContext.Provider value={value}>
            {children}
        </EditQuizzContext.Provider>
    );
};

export default EditQuizzContext;
