import { Box, ChakraProvider, VStack } from "@chakra-ui/react";
import { onAuthStateChanged, onIdTokenChanged, User } from "firebase/auth";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import HelpMenu from "../components/HelpMenu";
import Navbar from "../components/Navbar";
import useIsScrolled from "../hooks/use-is-scrolled";
import theme from "../theme";
import { auth } from "../utils/firebase/get-firebase-client";
import "../styles.css";
import { QuizzContextProvider } from "../context/quizz-context";
import nookies from "nookies";
import { CookieKeys, hasVisitedPage } from "../utils/cookies";
import Head from "next/head";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const { pathname } = router;
    const inAppRoutes = pathname !== "/intro" && pathname !== "/auth";

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => onAuthStateChanged(auth, user => setUser(user)), []);
    useEffect(
        () =>
            onIdTokenChanged(auth, async user => {
                if (user) {
                    nookies.set(
                        null,
                        CookieKeys.FIREBASE_TOKEN,
                        await user.getIdToken()
                    );
                } else {
                    nookies.destroy(null, CookieKeys.FIREBASE_TOKEN);
                }
            }),
        []
    );

    useEffect(() => {
        hasVisitedPage();
    }, []);

    let bg: string;
    if (
        [
            "/quizzes/[quizzId]/playername",
            "/user",
            "/auth/displayname",
            "/admin/panel",
            "/admin/panel/articles",
            "/admin/panel/games",
            "/admin/panel/games/quizzes",
        ].includes(pathname)
    ) {
        bg = "blue.100";
    } else if (["/quizzes/[quizzId]"].includes(pathname)) {
        bg = "sienna.100";
    } else {
        bg = "yellow.100";
    }

    // Navbar change style based on scroll
    const navbarRef = useRef<HTMLDivElement>(null);
    const { isScrolled } = useIsScrolled(
        navbarRef as MutableRefObject<HTMLDivElement>
    );

    return (
        <>
            <Head>
                <title>I Can Do It</title>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link
                    rel="manifest"
                    href="/site.webmanifest"
                />
            </Head>

            <ChakraProvider theme={theme}>
                <QuizzContextProvider>
                    <VStack
                        bg={bg}
                        spacing="6"
                        justify="space-between"
                        w="full"
                        minH="100vh"
                    >
                        {inAppRoutes && (
                            <Navbar
                                isAuth={!!user}
                                scrolled={isScrolled}
                                ref={navbarRef}
                                articleIconHref="/#articles"
                                gameIconHref="/#games"
                                logoHref="/"
                                userAvatarHref="/user"
                                userAvatarPicSrc={user?.photoURL || ""}
                                bg={bg}
                            />
                        )}

                        <Box
                            pos="fixed"
                            bottom="4"
                            left="4"
                        >
                            <HelpMenu
                                onTextClick={() =>
                                    router.push("mailto:mreyhanapwsw@gmail")
                                }
                            />
                        </Box>

                        <Component {...pageProps} />

                        {inAppRoutes && (
                            <Footer
                                iconLink="/"
                                emailLink="mailto:mreyhanapwsw@gmail.com"
                                whatsappLink="wa.me:085161112684"
                                bg={bg}
                            />
                        )}
                    </VStack>
                </QuizzContextProvider>
            </ChakraProvider>
        </>
    );
};

export default MyApp;
