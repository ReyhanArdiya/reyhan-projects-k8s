import nookies from "nookies";

export enum CookieKeys {
    FIREBASE_TOKEN = "firebase_token",
    VISITED = "visited",
}

export const hasVisitedPage = () => {
    nookies.set(null, CookieKeys.VISITED, "true");
};

export const destoryFirebaseTokenCookie = () => {
    nookies.destroy(null, CookieKeys.FIREBASE_TOKEN);
};
