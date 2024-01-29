import { Auth } from "firebase-admin/auth";
import { getIdTokenResult, User } from "firebase/auth";
import { isClient } from "../client-or-server";

// There is a validation error no KID when validating mock google account using
// emulator suite, this will only validate accounts from the real firebase
export const checkIsAuth = async (auth: Auth, idToken?: string) => {
    return isClient()
        ? !!idToken
        : idToken
        ? await auth.verifyIdToken(idToken)
        : false;
};

export const checkIsClientUserAdmin = async (user: User) => {
    const idToken = await getIdTokenResult(user);

    return !!idToken.claims.admin;
};
