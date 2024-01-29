import clone from "just-clone";
import { Article } from "../../../models/article";

abstract class BaseInput {
    constructor(public id: string | number) {}
}

export class ParagraphInput extends BaseInput {
    constructor(id: string | number, public text: string, public audioFile: File) {
        super(id);
    }
}

export class ImageInput extends BaseInput {
    constructor(id: string | number, public imageFile: File) {
        super(id);
    }
}

export interface EditArticleModalData
    extends Omit<Article, "body" | "author" | "headerVideoUrl" | "thumbnail"> {
    body: Array<ParagraphInput | ImageInput>;
    author: { name: string };
    headerVideo: File;
    thumbnail: File;
}

export type ArticleDataAction =
    | {
          type: "TITLE_CHANGED";
          payload: string;
      }
    | {
          type: "AUTHOR_CHANGED";
          // TODO add way to update profile pic later
          payload: EditArticleModalData["author"]["name"];
      }
    | {
          type: "CREATED_CHANGED";
          payload: EditArticleModalData["created"];
      }
    | {
          type: "VIDEO_CHANGED";
          payload: EditArticleModalData["headerVideo"];
      }
    | {
          type: "THUMBNAIL_CHANGED";
          payload: EditArticleModalData["thumbnail"];
      }
    | {
          type: "PARAGRAPH_INPUT_ADDED";
          payload: ParagraphInput;
      }
    | {
          type: "PARAGRAPH_INPUT_DELETED";
          payload: string | number;
      }
    | {
          type: "PARAGRAPH_INPUT_UPDATED";
          payload: {
              id: string | number;
          } & Partial<ParagraphInput> &
              Pick<ParagraphInput, "id">;
      }
    | {
          type: "IMAGE_INPUT_ADDED";
          payload: ImageInput;
      }
    | {
          type: "IMAGE_INPUT_DELETED";
          payload: string | number;
      }
    | {
          type: "IMAGE_INPUT_UPDATED";
          payload: {
              id: string | number;
          } & Partial<ImageInput> &
              Pick<ImageInput, "id">;
      };

const articleDataReducer = (
    state: EditArticleModalData,
    action?: ArticleDataAction
) => {
    const newState = clone(state);

    if (action) {
        switch (action.type) {
            case "TITLE_CHANGED":
                newState.title = action.payload;
                break;

            case "AUTHOR_CHANGED":
                newState.author.name = action.payload;
                break;

            case "CREATED_CHANGED":
                newState.created = action.payload;
                break;

            case "VIDEO_CHANGED":
                newState.headerVideo = action.payload;
                break;

            case "THUMBNAIL_CHANGED":
                newState.thumbnail = action.payload;
                break;

            case "PARAGRAPH_INPUT_ADDED":
            case "IMAGE_INPUT_ADDED":
                newState.body.push(action.payload);
                break;

            case "PARAGRAPH_INPUT_DELETED":
            case "IMAGE_INPUT_DELETED":
                const indexToDelete = newState.body.findIndex(
                    data => data.id === action.payload
                );
                newState.body.splice(indexToDelete, 1);
                break;

            case "PARAGRAPH_INPUT_UPDATED":
            case "IMAGE_INPUT_UPDATED":
                const inputToUpdate = newState.body.find(
                    input => input.id === action.payload.id
                );

                if (inputToUpdate) {
                    for (const [key, val] of Object.entries(action.payload)) {
                        if (key !== "id") {
                            // @ts-expect-error
                            inputToUpdate[key] = val;
                        }
                    }
                }

                break;
        }
    }

    return newState;
};

/*
Input added
Create object to store data based on body
Create an input
Send all of the data on submit handler, not change state onCHange
*/

export default articleDataReducer;
