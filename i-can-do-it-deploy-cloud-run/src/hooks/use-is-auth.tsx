import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase/get-firebase-client";

const useIsAuth = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(
        () =>
            onAuthStateChanged(auth, user => {
                if (user) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            }),
        []
    );

    return isAuth;
};

export default useIsAuth;
