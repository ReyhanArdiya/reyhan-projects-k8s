export const extractPathFromDownloadURL = (downloadURL: string) => {
    const matches = downloadURL.match(/\/(?<=o\/).*(?=\?)/gm);

    if (matches) {
        return matches[0];
    }
};
