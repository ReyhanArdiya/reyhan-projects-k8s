import { Button, HStack, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Books, GameController } from "phosphor-react";
import { forwardRef } from "react";
import useDevicesBreakpoints from "../../hooks/use-devices-breakpoints";

import ICanDoItLogo from "../ICanDoItLogo";
import UserAvatar from "../UserAvatar";

export interface NavbarProps {
    logoHref: string;
    articleIconHref: string;
    gameIconHref: string;
    userAvatarHref: string;
    userAvatarPicSrc: string;
    scrolled?: boolean;
    bg: string;
    isAuth: boolean;
}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
    (
        {
            bg,
            userAvatarHref,
            articleIconHref,
            gameIconHref,
            logoHref,
            userAvatarPicSrc,
            scrolled,
            isAuth,
        },
        ref
    ) => {
        const router = useRouter();
        const goToAuth = () => router.push("/auth");
        const { isDesktop } = useDevicesBreakpoints();
        const scrolledStyle = scrolled
            ? {
                  backdropFilter: "auto",
                  backdropBlur: "sm",
                  background: "rgba(255, 255, 255, 0.25)",
              }
            : {};

        return (
            <HStack
                as="nav"
                w="full"
                px="3"
                py="2"
                spacing="0"
                justifyContent="space-between"
                pos="sticky"
                top="0"
                ref={ref}
                bg={bg}
                zIndex="overlay"
                {...scrolledStyle}
            >
                <NextLink
                    passHref
                    href={logoHref}
                >
                    <Link>
                        <ICanDoItLogo noText />
                    </Link>
                </NextLink>

                <HStack spacing="14">
                    <NextLink
                        href={articleIconHref}
                        passHref
                    >
                        <Link>
                            <HStack spacing={1}>
                                <Books size="32" />
                                {isDesktop && <Text>Baca Artikel</Text>}
                            </HStack>
                        </Link>
                    </NextLink>

                    <NextLink
                        href={gameIconHref}
                        passHref
                    >
                        <Link>
                            <HStack spacing={1}>
                                <GameController size="32" />
                                {isDesktop && <Text>Main Game</Text>}
                            </HStack>
                        </Link>
                    </NextLink>
                </HStack>

                <UserAvatar
                        href={isAuth? userAvatarHref : "/auth"}
                        src={userAvatarPicSrc}
                    />
            </HStack>
        );
    }
);

Navbar.displayName = "Navbar";

export default Navbar;
