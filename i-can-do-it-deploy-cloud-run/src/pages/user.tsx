import { Skeleton, useBoolean, useToast } from "@chakra-ui/react";
import { onIdTokenChanged, User } from "firebase/auth";
import { GetServerSideProps, type NextPage } from "next";
import { useEffect, useState } from "react";
import UserProfilePage from "../components/pages/UserProfilePage";
import { catchErrorWithToast } from "../utils/errors";
import { checkIsClientUserAdmin } from "../utils/firebase/auth";
import { auth } from "../utils/firebase/get-firebase-client";
import { redirectIfNotAuth } from "../utils/redirect";

export const getServerSideProps: GetServerSideProps = redirectIfNotAuth("/auth");

const Page: NextPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, { on: itsAdmin }] = useBoolean(false);
    const toast = useToast();
    useEffect(
        () =>
            onIdTokenChanged(auth, async user => {
                await catchErrorWithToast(toast, async () => {
                    if (user) {
                        setUser(user);
                        (await checkIsClientUserAdmin(user)) && itsAdmin();
                    }
                })();
            }),
        [itsAdmin, toast]
    );

    return user ? (
        <UserProfilePage
            userAvatarSrc={user.photoURL || ""}
            username={user.displayName || "Anon"}
            isAdmin={isAdmin}
        />
    ) : (
        <Skeleton
            w="full"
            flexGrow="1"
        />
    );
};

export default Page;
