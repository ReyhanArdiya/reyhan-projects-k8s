import { useToast } from "@chakra-ui/react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import DisplayNamePage from "../../../components/pages/DisplayNamePage";
import QuizzContext from "../../../context/quizz-context";

const Page: NextPage = () => {
    const router = useRouter();
    let { playerNameChanged, playerName } = useContext(QuizzContext);
    const { quizzId } = router.query;
    const toast = useToast();

    const startGame = async () => {
        playerNameChanged(playerName.trim());
        if (!playerName.trim().length) {
            toast({
                status: "error",
                isClosable: true,
                description: "Nama tidak boleh kosong!",
            });
        } else router.push(`/quizzes/${quizzId}`);
    };

    return (
        <DisplayNamePage
            buttonLabel="Mulai Bermain"
            displayName={playerName}
            onButtonClick={startGame}
            onDisplayNameInputChange={({ target: { value } }) =>
                playerNameChanged(value)
            }
            placeholder={"Ketik namamu"}
        />
    );
};

export default Page;
