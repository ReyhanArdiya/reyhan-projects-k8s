import { GetServerSideProps } from "next";
import { CookieKeys } from "./cookies";
import { getAuth } from "firebase-admin/auth";
import { app } from "./firebase/get-firebase-admin";
import { checkIsAuth } from "./firebase/auth";

export const redirectIfNotAuth: (
    destination: string
) => GetServerSideProps = destination => {
    const getServerSideProps: GetServerSideProps = async ({ req }) => {
        const goToPage = { props: {} };
        const redirect = {
            props: {},
            redirect: {
                destination,
            },
        };
        try {
            const auth = getAuth(app);
            const firebaseToken = req.cookies[CookieKeys.FIREBASE_TOKEN];
            const isAuth = await checkIsAuth(auth, firebaseToken);

            return isAuth ? goToPage : redirect;
        } catch (error) {
            console.error(error);

            return redirect;
        }
    };

    return getServerSideProps;
};

export const redirectIfAuth: (
    destination: string
) => GetServerSideProps = destination => {
    const getServerSideProps: GetServerSideProps = async ({ req }) => {
        const goToPage = { props: {} };
        const redirect = {
            props: {},
            redirect: {
                destination,
            },
        };
        try {
            const auth = getAuth(app);
            const firebaseToken = req.cookies[CookieKeys.FIREBASE_TOKEN];
            const isAuth = await checkIsAuth(auth, firebaseToken);

            return isAuth ? redirect : goToPage;
        } catch (error) {
            console.error(error);

            return redirect;
        }
    };

    return getServerSideProps;
};

export const redirectIfFirstTimeVisit: (
    destination: string
) => GetServerSideProps = destination => {
    const getSSP: GetServerSideProps = async ({ req }) => {
        const visited = req.cookies[CookieKeys.VISITED];

        const redirect = {
            props: [],
            redirect: {
                destination,
            },
        };

        if (visited === "true") {
            //@ts-ignore
            delete redirect.redirect;
        }

        return redirect;
    };

    return getSSP;
};

export const redirectIfNotAdmin: (
    destination: string
) => GetServerSideProps = destination => {
    const getServerSideProps: GetServerSideProps = async ({ req }) => {
        const goToPage = { props: {} };
        const redirect = {
            props: {},
            redirect: {
                destination,
            },
        };
        try {
            const auth = getAuth(app);
            const firebaseToken = req.cookies[CookieKeys.FIREBASE_TOKEN] as string;
            const idToken = await auth.verifyIdToken(firebaseToken);
            const isAdmin = !!idToken.admin;

            return isAdmin ? goToPage : redirect;
        } catch (error) {
            console.error(error);

            return redirect;
        }
    };

    return getServerSideProps;
};
