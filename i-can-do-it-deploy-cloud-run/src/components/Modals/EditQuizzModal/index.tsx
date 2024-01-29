import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { getDownloadURL, getStorage } from "firebase/storage";
import { Plus, TrashSimple } from "phosphor-react";
import { ChangeEventHandler, useContext, useEffect } from "react";
import EditQuizzContext, {
    EditQuizzContextProvider,
} from "../../../context/edit-quizz-context";
import { Quizz } from "../../../models/game/quizz";
import {
    deleteQuizz,
    getQuizz,
    saveQuizz,
    saveQuizzMedia,
} from "../../../models/game/quizz/utils";
import { catchErrorWithToast } from "../../../utils/errors";
import { app, db } from "../../../utils/firebase/get-firebase-client";
import CircularIcon from "../../CircularIcon";
import FormControl from "../../FormControl";
import QuestionMenu from "./QuestionMenu";

export interface EditQuizzModalProps extends Pick<ModalProps, "isOpen"> {
    onCancelClick: () => void;
    quizzId: string;
}

const EditQuizzModalNoCtx = ({
    isOpen,
    onCancelClick,
    quizzId,
}: EditQuizzModalProps) => {
    const editQuizzCtx = useContext(EditQuizzContext);
    const toast = useToast();

    const questionMenus = editQuizzCtx.body.map((_question, i) => (
        <QuestionMenu
            key={i}
            questionIndex={i}
        />
    ));

    const changeTitle: ChangeEventHandler<HTMLInputElement> = ({
        target: { value },
    }) => {
        editQuizzCtx.infoChanged({
            title: value,
        });
    };
    const changeDescription: ChangeEventHandler<HTMLInputElement> = ({
        target: { value },
    }) => {
        editQuizzCtx.infoChanged({
            description: value,
        });
    };
    const changeThumbnail: ChangeEventHandler<HTMLInputElement> = ({
        target: { files },
    }) => {
        editQuizzCtx.infoChanged({
            thumbnail: files![0],
        });
    };
    const deleteThisQuizz = catchErrorWithToast(toast, async () => {
        await deleteQuizz(db, quizzId);
        onCancelClick()

    });
    const saveQuizzData = catchErrorWithToast(toast, async () => {
        const { title, body, description, thumbnail, gameRecords } = editQuizzCtx;

        const storage = getStorage(app);
        const savedThumbnailRef = await saveQuizzMedia(storage, quizzId, thumbnail);
        const savedThumbnailUrl = await getDownloadURL(savedThumbnailRef.ref);
        const newQuizz = new Quizz(title, description, body, gameRecords, savedThumbnailUrl);

        await saveQuizz(
            db,
            newQuizz,
            quizzId
        );
        onCancelClick()
    });

    useEffect(() => {
        const fetchQuizzData = catchErrorWithToast(toast, async () => {
            const quizzData = (await getQuizz(db, quizzId)).data();

            if (quizzData) {
                const { body, description, title, gameRecords } = quizzData;
                // console.log(quizzData)

                editQuizzCtx.infoChanged({
                    title,
                    description,
                    // TODO do the blob shit
                    // thumbnail,
                    thumbnail: new File([""], ""),
                    gameRecords,
                });
                editQuizzCtx.bodyReplaced(body);
            }
        });

        fetchQuizzData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizzId, toast]);

    return (
        <Modal
            isCentered
            isOpen={isOpen}
            onClose={onCancelClick}
            size={{
                base: "full",
                md: "2xl",
                lg: "3xl",
            }}
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <VStack
                as={ModalContent}
                bg="blue.300"
                border="2px solid black"
                p="3"
                rounded="base"
                spacing="2"
                color="black"
            >
                <HStack
                    as={ModalHeader}
                    p="0"
                    w="full"
                    justify="space-between"
                >
                    <Text
                        textStyle="h3"
                        as="h3"
                    >
                        Edit Quizz
                    </Text>

                    <HStack spacing="0">
                        <TrashSimple
                            weight="fill"
                            onClick={deleteThisQuizz}
                            cursor="pointer"
                        />
                        <ModalCloseButton
                            top="0"
                            pos="static"
                        />
                    </HStack>
                </HStack>

                <VStack
                    sx={{
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                    as={ModalBody}
                    p="0"
                    w="full"
                    spacing="inherit"
                >
                    <FormControl
                        formLabelProps={{ children: "Judul" }}
                        inputProps={{
                            placeholder: "Judul",
                            value: editQuizzCtx.title,
                            onChange: changeTitle,
                        }}
                    />
                    <FormControl
                        formLabelProps={{ children: "Deskripsi" }}
                        inputProps={{
                            placeholder: "Deskripsi",
                            value: editQuizzCtx.description,
                            onChange: changeDescription,
                        }}
                    />
                    <FormControl
                        formLabelProps={{ children: "Thumbnail" }}
                        inputProps={{
                            type: "file",
                            onChange: changeThumbnail,
                        }}
                    />

                    {questionMenus}

                    <Button
                        leftIcon={
                            <CircularIcon
                                icon={() => (
                                    <Plus
                                        weight="bold"
                                        fill="black"
                                    />
                                )}
                            />
                        }
                        w="full"
                        onClick={editQuizzCtx.questionAdded}
                    >
                        Tambah Pertanyaan
                    </Button>
                </VStack>

                <HStack
                    p="0"
                    as={ModalFooter}
                    spacing="2"
                    justify="end"
                    w="full"
                >
                    <Button
                        w="83px"
                        bg="sienna.500"
                        onClick={onCancelClick}
                    >
                        Batalkan
                    </Button>
                    <Button
                        w="83px"
                        bg="yellow.500"
                        onClick={saveQuizzData}
                    >
                        Simpan
                    </Button>
                </HStack>
            </VStack>
        </Modal>
    );
};

const EditQuizzModal = (props: EditQuizzModalProps) => (
    <EditQuizzContextProvider>
        <EditQuizzModalNoCtx {...props} />
    </EditQuizzContextProvider>
);

export default EditQuizzModal;
