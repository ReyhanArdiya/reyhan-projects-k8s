import articleDataReducer, {
    EditArticleModalData,
    ImageInput,
    ParagraphInput,
} from "./article-data-reducer";

let initialState: EditArticleModalData;
beforeEach(() => {
    initialState = {
        author: {
            name: "user_test",
        },
        body: [],
        title: "Test",
        created: new Date(),
        headerVideo: new File([""], ""),
        thumbnail: new File([""], ""),
    };
});

test("articleDataReducer returns a new state", () => {
    expect(articleDataReducer(initialState)).not.toBe(initialState);
});

test("TITLE_CHANGED changes the states title", () => {
    const newState = articleDataReducer(initialState, {
        type: "TITLE_CHANGED",
        payload: "Title Changed",
    });

    expect(newState.title).not.toBe(initialState.title);
});

test("AUTHOR_CHANGED changes the states author", () => {
    const newState = articleDataReducer(initialState, {
        type: "AUTHOR_CHANGED",
        payload: "New Author Name",
    });

    expect(newState.author.name).not.toBe(initialState.author.name);
});

test("CREATED_CHANGED changes the states created", () => {
    const newState = articleDataReducer(initialState, {
        type: "CREATED_CHANGED",
        payload: new Date(),
    });

    expect(newState.created).not.toBe(initialState.created);
});

test("VIDEO_CHANGED changes the states headerVideo", () => {
    const newState = articleDataReducer(initialState, {
        type: "VIDEO_CHANGED",
        payload: new File([""], "updated.jpg"),
    });

    expect(newState.headerVideo).not.toBe(initialState.headerVideo);
});

test("THUMBNAIL_CHANGED changes the states thumbnail", () => {
    const newState = articleDataReducer(initialState, {
        type: "THUMBNAIL_CHANGED",
        payload: new File([""], "updated.jpg"),
    });

    expect(newState.thumbnail).not.toBe(initialState.thumbnail);
});

test("PARAGRAPH_INPUT_ADDED adds a new ParagraphInput object", () => {
    const paragraphInput: ParagraphInput = new ParagraphInput(
        12345,
        "Believe me",
        new File(["Meow"], "Meow.mp4")
    );

    const newState = articleDataReducer(initialState, {
        type: "PARAGRAPH_INPUT_ADDED",
        payload: paragraphInput,
    });

    expect(newState.body).toContainEqual(paragraphInput);
});

test("IMAGE_INPUT_ADDED adds a new ImageInput object", () => {
    const imageInput: ImageInput = new ImageInput(
        12345,
        new File(["Meow"], "Meow.jpg")
    );

    const newState = articleDataReducer(initialState, {
        type: "IMAGE_INPUT_ADDED",
        payload: imageInput,
    });

    expect(newState.body).toContainEqual(imageInput);
});

test("PARAGRAPH_INPUT_DELETED deletes the correct ParagraphInput object", () => {
    const paragraphInput1: ParagraphInput = new ParagraphInput(
        1,
        "Believe me",
        new File(["Meow"], "Meow.mp4")
    );
    const paragraphInput2: ParagraphInput = new ParagraphInput(
        2,
        "Believe me",
        new File(["Meow"], "Meow.mp4")
    );
    const paragraphInput3: ParagraphInput = new ParagraphInput(
        3,
        "Believe me",
        new File(["Meow"], "Meow.mp4")
    );

    const newState1 = articleDataReducer(initialState, {
        type: "PARAGRAPH_INPUT_ADDED",
        payload: paragraphInput1,
    });

    const newState2 = articleDataReducer(newState1, {
        type: "PARAGRAPH_INPUT_ADDED",
        payload: paragraphInput2,
    });

    const newState3 = articleDataReducer(newState2, {
        type: "PARAGRAPH_INPUT_ADDED",
        payload: paragraphInput3,
    });

    expect(newState3.body).toEqual(
        expect.arrayContaining([paragraphInput1, paragraphInput2, paragraphInput3])
    );

    const finalState = articleDataReducer(newState3, {
        type: "PARAGRAPH_INPUT_DELETED",
        payload: paragraphInput2.id,
    });

    expect(finalState.body).not.toContainEqual(paragraphInput2);
});

test("IMAGE_INPUT_DELETED deletes the correct ImageInput object", () => {
    const imageInput: ImageInput = new ImageInput(
        12345,
        new File(["Meow"], "Meow.jpg")
    );

    const newState = articleDataReducer(initialState, {
        type: "IMAGE_INPUT_ADDED",
        payload: imageInput,
    });

    expect(newState.body).toContainEqual(imageInput);
    expect(
        articleDataReducer(newState, {
            type: "IMAGE_INPUT_DELETED",
            payload: imageInput.id,
        }).body
    ).not.toContainEqual(imageInput);
});

test("PARAGRAPH_INPUT_UPDATED updates the correct ParagraphInput object", () => {
    const paragraphInput: ParagraphInput = new ParagraphInput(
        12345,
        "Believe me",
        new File(["Meow"], "Meow.mp4")
    );

    const newState = articleDataReducer(initialState, {
        type: "PARAGRAPH_INPUT_ADDED",
        payload: paragraphInput,
    });

    const updatedInput: ParagraphInput = new ParagraphInput(
        12345,
        "Fuck u",
        new File(["Meow"], "Meow.mp4")
    );

    const updatedState = articleDataReducer(newState, {
        type: "PARAGRAPH_INPUT_UPDATED",
        payload: updatedInput,
    });

    expect(updatedState.body).not.toContainEqual(paragraphInput);
    expect(updatedState.body).toContainEqual(updatedInput);
});

test("IMAGE_INPUT_UPDATED updates the correct ImageInput object", () => {
    const imageInput: ImageInput = new ImageInput(
        12345,
        new File(["Meow"], "Meow.jpg")
    );

    const newState = articleDataReducer(initialState, {
        type: "IMAGE_INPUT_ADDED",
        payload: imageInput,
    });

    const updatedInput: ImageInput = new ImageInput(
        12345,
        new File(["be"], "bu.jpg")
    );

    const updatedState = articleDataReducer(newState, {
        type: "IMAGE_INPUT_UPDATED",
        payload: updatedInput,
    });

    expect((updatedState.body[0] as ImageInput).imageFile.name).not.toBe(
        imageInput.imageFile.name
    );
    expect((updatedState.body[0] as ImageInput).imageFile.name).toBe(
        updatedInput.imageFile.name
    );
});
