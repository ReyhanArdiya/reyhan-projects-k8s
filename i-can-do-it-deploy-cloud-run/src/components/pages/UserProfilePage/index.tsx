import {
    Button,
    HStack,
    Text,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import {
    AuthErrorCodes,
    deleteUser,
    EmailAuthProvider,
    GoogleAuthProvider,
    reauthenticateWithCredential,
    reauthenticateWithPopup,
    signOut,
    updateCurrentUser,
    updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";
import { Door, Pen, Trash } from "phosphor-react";
import { useState } from "react";
import useGetUser from "../../../hooks/use-get-user";
import { destoryFirebaseTokenCookie } from "../../../utils/cookies";
import { auth } from "../../../utils/firebase/get-firebase-client";
import ConfirmationModal, {
    ConfirmationModalProps,
} from "../../Modals/ConfirmationModal";
import InputModal from "../../Modals/InputModal";
import UserAvatar from "../../UserAvatar";

export interface UserProfilePageProps {
    userAvatarSrc: string;
    username: string;
    isAdmin?: boolean;
}

const UserProfilePage = ({
    userAvatarSrc,
    username,
    isAdmin = false,
}: UserProfilePageProps) => {
    const toast = useToast();
    const router = useRouter();
    const goHome = () => router.push("/");
    const goToAdminPanel = () => router.push("/admin/panel");
    const user = useGetUser();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [confirmationModalProps, setConfirmationModalProps] = useState<
        Omit<ConfirmationModalProps, "modalProps">
    >({
        modalText: "Apakah kamu ingin keluar dari akun ini?",
        onCancelClick() {
            onClose();
        },
        async onConfirmClick() {
            destoryFirebaseTokenCookie();
            await signOut(auth);
        },
    });

    const onExitHandler = () => {
        onOpen();
        setConfirmationModalProps({
            modalText: "Apakah kamu ingin keluar dari akun ini?",
            onCancelClick() {
                onClose();
            },
            async onConfirmClick() {
                await signOut(auth);
                goHome();
            },
        });
    };

    // Deletion logic
    const passwordModalDisclosure = useDisclosure();
    const [password, setPassword] = useState("");

    const deleteCurrentUser = async () => {
        try {
            await deleteUser(user!);
            goHome();
        } catch (err) {
            toast({
                status: "error",
                isClosable: true,
                description: "Ada kesalahan terjadi, silahkan coba lagi nanti!",
            });
        }
    };

    const reuathEmailPw = async () => {
        try {
            await reauthenticateWithCredential(
                user!,
                EmailAuthProvider.credential(auth.currentUser!.email!, password)
            );
            await deleteCurrentUser();
        } catch (err) {
            if (
                err instanceof FirebaseError &&
                err.code === AuthErrorCodes.INVALID_PASSWORD
            ) {
                toast({
                    status: "info",
                    isClosable: true,
                    description: "Password yang Anda masukkan salah",
                });
            }
        }
    };

    const onDeleteHandler = () => {
        onOpen();
        setConfirmationModalProps({
            modalText:
                "Jika kamu menghapus akun ini, kamu tidak bisa mendapatkannya kembali; apakah kamu ingin melanjuti?",
            onCancelClick() {
                onClose();
            },
            async onConfirmClick() {
                try {
                    await deleteCurrentUser();
                } catch (err) {
                    console.error(err);

                    if (
                        err instanceof FirebaseError &&
                        err.code === AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN
                    ) {
                        if (
                            user?.providerData.some(
                                data => data.providerId === "google.com"
                            )
                        ) {
                            try {
                                await reauthenticateWithPopup(
                                    user,
                                    new GoogleAuthProvider()
                                );
                                await deleteCurrentUser();
                            } catch (err) {
                                toast({
                                    status: "error",
                                    isClosable: true,
                                    description:
                                        "Ada kesalahan terjadi, silahkan coba lagi nanti!",
                                });
                            }
                        } else {
                            passwordModalDisclosure.onOpen();
                        }
                    }
                }
            },
            modalContentProps: {
                bg: "sienna.300",
            },
        });
    };

    // Displayname logic
    const displaynameModalDisclosure = useDisclosure();
    const [displayName, setDisplayName] = useState(username);

    const cancelEditDisplayname = () => {
        setDisplayName(username);
        displaynameModalDisclosure.onClose();
    };
    const updateDisplayname = async () => {
        if (!displayName.trim().length) {
            toast({
                status: "error",
                isClosable: true,
                description: "Nama tidak boleh kosong!",
            });
        } else if (user) {
            await updateProfile(user, {
                displayName: displayName.trim(),
            });
            await updateCurrentUser(auth, user);
            displaynameModalDisclosure.onClose();
        }
    };

    return (
        <VStack
            w="full"
            maxW="60"
            spacing="5"
        >
            <VStack spacing="1">
                <UserAvatar
                    src={userAvatarSrc}
                    boxSize="8rem"
                    borderWidth="6px"
                />
                <Text
                    as="h1"
                    textStyle="h1"
                    textAlign="center"
                >
                    {username}
                </Text>
                <Button
                    leftIcon={<Pen weight="fill" />}
                    onClick={displaynameModalDisclosure.onOpen}
                >
                    Edit Nama
                </Button>
                <InputModal
                    title="Edit Nama"
                    isOpen={displaynameModalDisclosure.isOpen}
                    onCancelClick={cancelEditDisplayname}
                    onSaveClick={updateDisplayname}
                    inputProps={{
                        value: displayName,
                        onChange({ target: { value } }) {
                            setDisplayName(value);
                        },
                    }}
                />
            </VStack>
            {isAdmin && (
                <Button
                    w="full"
                    onClick={goToAdminPanel}
                >
                    Panel Admin
                </Button>
            )}
            <HStack
                w="full"
                justify="space-between"
                spacing="4"
            >
                <Button
                    bg="blue.500"
                    leftIcon={<Door weight="fill" />}
                    onClick={onExitHandler}
                >
                    Keluar
                </Button>
                <Button
                    bg="sienna.500"
                    leftIcon={<Trash weight="fill" />}
                    onClick={onDeleteHandler}
                >
                    Hapus
                </Button>
            </HStack>

            <ConfirmationModal
                {...confirmationModalProps}
                modalProps={{
                    isOpen,
                    onClose,
                }}
            />
            <InputModal
                title="Masukkan Password"
                isOpen={passwordModalDisclosure.isOpen}
                onCancelClick={passwordModalDisclosure.onClose}
                onSaveClick={reuathEmailPw}
                inputProps={{
                    value: password,
                    onChange({ target: { value } }) {
                        setPassword(value);
                    },
                    type: "password",
                }}
            />
        </VStack>
    );
};

export default UserProfilePage;
