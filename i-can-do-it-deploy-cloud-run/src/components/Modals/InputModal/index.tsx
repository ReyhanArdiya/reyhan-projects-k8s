import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    VStack,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import FormControl, { FormControlProps } from "../../FormControl";

export interface InputModalProps
    extends Pick<ModalProps, "isOpen">,
        FormControlProps {
    onSaveClick: MouseEventHandler;
    onCancelClick: () => void;
    title: string;
}

const InputModal = ({
    onCancelClick,
    onSaveClick,
    isOpen,
    title,
    ...formControlProps
}: InputModalProps) => {
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
                    {title}
                </ModalHeader>

                <ModalBody
                    p="0"
                    w="full"
                >
                    <FormControl {...formControlProps} />
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

export default InputModal;
