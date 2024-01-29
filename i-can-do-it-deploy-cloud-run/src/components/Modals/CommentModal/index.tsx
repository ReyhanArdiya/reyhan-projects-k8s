import {
    Button,
    ButtonGroup,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { ChangeEventHandler, MouseEventHandler } from "react";
import ArticleComment from "../../../models/article-comment";

export interface CommentModalProps
    extends Pick<ArticleComment, "body">,
        Pick<ModalProps, "isOpen"> {
    onUpdateBody: ChangeEventHandler<HTMLTextAreaElement>;
    onSaveClick: MouseEventHandler;
    onCancelClick: () => void;
}

const CommentModal = ({
    body,
    onUpdateBody,
    onCancelClick,
    onSaveClick,
    isOpen,
}: CommentModalProps) => {
    return (
        <Modal
            isCentered
            isOpen={isOpen}
            onClose={onCancelClick}
        >
            <ModalOverlay />
            <VStack
                as={ModalContent}
                rounded="base"
                border="2px solid black"
                bg="yellow.300"
                spacing="2"
                p="3"
                w="280px"
            >
                <ModalHeader
                    p="0"
                    textStyle="h3"
                    as="h3"
                >
                    Edit Komentar
                </ModalHeader>

                <ModalBody
                    p="0"
                    w="full"
                >
                    <Textarea
                        minH="135px"
                        border="none"
                        value={body}
                        onChange={onUpdateBody}
                        bg="white"
                        rounded="base"
                        w="full"
                        textStyle="input"
                        p="2"
                        sx={{
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        }}
                    />
                </ModalBody>
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
                        onClick={onSaveClick}
                    >
                        Simpan
                    </Button>
                </HStack>
            </VStack>
        </Modal>
    );
};

export default CommentModal;
