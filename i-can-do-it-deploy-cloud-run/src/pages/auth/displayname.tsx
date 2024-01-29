import { useToast } from "@chakra-ui/react";
import { updateProfile } from "firebase/auth";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import DisplayNamePage from "../../components/pages/DisplayNamePage";
import useGetUser from "../../hooks/use-get-user";

const Page: NextPage = () => {
    const [displayName, setDisplayName] = useState("");
    const router = useRouter();
    const toast = useToast();
    const user = useGetUser();

    const saveDisplayName = async () => {
        try {
            user &&
                (await updateProfile(user, {
                    displayName,
                }));
            router.push("/");
        } catch (err) {
            toast({
                status: "error",
                isClosable: true,
                description: "Ada eror, silahkan coba lagi!",
            });
        }
    };

    return (
        <DisplayNamePage
            buttonLabel="Simpan Nama"
            displayName={displayName}
            onButtonClick={saveDisplayName}
            onDisplayNameInputChange={({ target: { value } }) =>
                setDisplayName(value)
            }
            placeholder={"Ketik namamu"}
        />
    );
};

export default Page;
