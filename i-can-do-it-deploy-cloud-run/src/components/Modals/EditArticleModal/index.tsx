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
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { Article, ImageSquare, Plus, TrashSimple } from "phosphor-react";
import { ChangeEventHandler, MouseEventHandler, useReducer } from "react";
import CircularIcon from "../../CircularIcon";
import FormControl from "../../FormControl";
import InputSelectionModal from "../InputSelectionModal";
import articleDataReducer, {
    ArticleDataAction,
    EditArticleModalData,
    ImageInput,
    ParagraphInput,
} from "./article-data-reducer";
import {
    EditArticleModalImageInput,
    EditArticleModalParagraphInput,
} from "./EditArticleModalInput";

export interface EditArticleModalProps extends Pick<ModalProps, "isOpen"> {
    onSaveClick: (data: EditArticleModalData) => void;
    onCancelClick: () => void;
    onDeleteIconClick: MouseEventHandler;
    initialData: EditArticleModalData;
}

const EditArticleModal = ({
    onCancelClick,
    onSaveClick,
    onDeleteIconClick,
    isOpen,
    initialData,
}: EditArticleModalProps) => {
    const [articleData, dispatchArticleData] = useReducer<
        (
            state: EditArticleModalData,
            action: ArticleDataAction
        ) => EditArticleModalData
    >(articleDataReducer, initialData);

    const bodyInputs = articleData.body.map((data, i) => {
        const isParagraphInput = "text" in data;

        const deleteInput = () =>
            dispatchArticleData({
                type: isParagraphInput
                    ? "PARAGRAPH_INPUT_DELETED"
                    : "IMAGE_INPUT_DELETED",
                payload: data.id,
            });

        if (isParagraphInput) {
            const updateParagraphText: ChangeEventHandler<HTMLInputElement> = ({
                target: { value },
            }) => {
                dispatchArticleData({
                    type: "PARAGRAPH_INPUT_UPDATED",
                    payload: {
                        text: value,
                        id: data.id,
                    },
                });
            };

            const updateParagraphAudio: ChangeEventHandler<HTMLInputElement> = ({
                target: { files },
            }) => {
                dispatchArticleData({
                    type: "PARAGRAPH_INPUT_UPDATED",
                    payload: {
                        audioFile: files![0],
                        id: data.id,
                    },
                });
            };

            return (
                <EditArticleModalParagraphInput
                    key={i}
                    onDeleteIconClick={deleteInput}
                    text={data.text}
                    onTextChange={updateParagraphText}
                    onAudioChange={updateParagraphAudio}
                />
            );
        } else {
            const updateImageInput: ChangeEventHandler<HTMLInputElement> = ({
                target: { files },
            }) => {
                dispatchArticleData({
                    type: "IMAGE_INPUT_UPDATED",
                    payload: {
                        id: data.id,
                        imageFile: files![0],
                    },
                });
            };

            return (
                <EditArticleModalImageInput
                    key={i}
                    onDeleteIconClick={deleteInput}
                    onImageChange={updateImageInput}
                />
            );
        }
    });

    // Input selection modal logic
    const inputSelectionDisclosure = useDisclosure();

    const addParagraphInput = () => {
        dispatchArticleData({
            type: "PARAGRAPH_INPUT_ADDED",
            payload: new ParagraphInput(nanoid(), "", new File([""], "")),
        });
        inputSelectionDisclosure.onClose();
    };
    const addImageInput = () => {
        dispatchArticleData({
            type: "IMAGE_INPUT_ADDED",
            payload: new ImageInput(nanoid(), new File([""], "")),
        });
        inputSelectionDisclosure.onClose();
    };

    const submit = () => onSaveClick(articleData);

    return (
        <>
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
                            Edit Artikel
                        </Text>

                        <HStack spacing="0">
                            <TrashSimple
                                weight="fill"
                                onClick={onDeleteIconClick}
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
                                value: articleData.title,

                                onChange({ target: { value } }) {
                                    dispatchArticleData({
                                        type: "TITLE_CHANGED",
                                        payload: value,
                                    });
                                },
                            }}
                        />
                        <FormControl
                            formLabelProps={{ children: "Penulis" }}
                            inputProps={{
                                placeholder: "Penulis",
                                value: articleData.author.name,

                                onChange({ target: { value } }) {
                                    dispatchArticleData({
                                        type: "AUTHOR_CHANGED",
                                        payload: value,
                                    });
                                },
                            }}
                        />
                        <FormControl
                            formLabelProps={{ children: "Dibuat" }}
                            inputProps={{
                                value: dayjs(articleData.created).format(
                                    "YYYY-MM-DD"
                                ),
                                type: "date",
                                onChange({ target: { value } }) {
                                    dispatchArticleData({
                                        type: "CREATED_CHANGED",
                                        payload: new Date(value),
                                    });
                                },
                            }}
                        />
                        <FormControl
                            formLabelProps={{ children: "Video Utama" }}
                            inputProps={{
                                type: "file",
                                onChange: ({ target: { files } }) => {
                                    dispatchArticleData({
                                        type: "VIDEO_CHANGED",
                                        payload: files![0],
                                    });
                                },
                            }}
                        />
                        <FormControl
                            formLabelProps={{ children: "Thumbnail" }}
                            inputProps={{
                                type: "file",
                                onChange: ({ target: { files } }) => {
                                    dispatchArticleData({
                                        type: "THUMBNAIL_CHANGED",
                                        payload: files![0],
                                    });
                                },
                            }}
                        />

                        {bodyInputs}

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
                            onClick={inputSelectionDisclosure.onOpen}
                        >
                            Tambah Input
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
                            onClick={submit}
                        >
                            Simpan
                        </Button>
                    </HStack>
                </VStack>
            </Modal>

            <InputSelectionModal
                title="Pilih Input"
                isOpen={inputSelectionDisclosure.isOpen}
                onClose={inputSelectionDisclosure.onClose}
            >
                <Button
                    leftIcon={<Article weight="fill" />}
                    w="full"
                    onClick={addParagraphInput}
                >
                    Paragraf
                </Button>
                <Button
                    leftIcon={<ImageSquare weight="fill" />}
                    w="full"
                    onClick={addImageInput}
                >
                    Gambar
                </Button>{" "}
            </InputSelectionModal>
        </>
    );
};

export default EditArticleModal;
