import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase/get-firebase-client";

const useGetUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(
        () =>
            onAuthStateChanged(auth, user => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(user);
                }
            }),
        []
    );

    return user;
};

export default useGetUser;
