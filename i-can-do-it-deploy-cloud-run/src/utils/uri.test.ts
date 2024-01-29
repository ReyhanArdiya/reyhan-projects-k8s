import { extractPathFromDownloadURL } from "./uri";

test("extractPathFromDownloadURL extracts correct storage pathname", () => {
    const path1 =
        "http://localhost:9199/v0/b/i-can-do-it-45786.appspot.com/o/articles%2F5cLkm36sALibslFeV9fJN%2F6cUoDIW5oZKJhwSGCsFUQ_reyhan.jpg?alt=media&token=b1f73c27-b587-4d39-9513-9a4daaa851cd";
    const path2 =
        "http://localhost:9199/v0/b/i-can-do-it-45786.appspot.com/o/articles%2FW1kwMH8YWHt9valGJCGp%2FreZ4FjcygjHPlIxwyFKFL_reyhan.jpg?alt=media&token=4ed2e072-bf88-4dd3-b2ea-0c530b3c9271";

    expect(extractPathFromDownloadURL(path1)).toBe(
        "/articles%2F5cLkm36sALibslFeV9fJN%2F6cUoDIW5oZKJhwSGCsFUQ_reyhan.jpg"
    );

    expect(extractPathFromDownloadURL(path2)).toBe(
        "/articles%2FW1kwMH8YWHt9valGJCGp%2FreZ4FjcygjHPlIxwyFKFL_reyhan.jpg"
    );
});

