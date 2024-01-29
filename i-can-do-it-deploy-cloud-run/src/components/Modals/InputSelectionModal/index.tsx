import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    VStack,
} from "@chakra-ui/react";

export interface InputSelectionModalProps extends ModalProps {
    title: string;
}

const InputSelectionModal = ({
    title,
    children,
    ...modalProps
}: InputSelectionModalProps) => {
    return (
        <Modal
            isCentered
            {...modalProps}
        >
            <ModalOverlay />
            <VStack
                as={ModalContent}
                bg="sienna.300"
                border="2px solid black"
                p="3"
                px="12"
                py="4"
                rounded="base"
                spacing="4"
                w="280px"
            >
                <ModalHeader
                    p="0"
                    textStyle="h3"
                    as="h3"
                >
                    {title}
                </ModalHeader>
                <ModalCloseButton top="0" />
                <ModalBody
                    p="0"
                    w="full"
                >
                    <VStack
                        spacing="2"
                        w="full"
                    >
                        {children}
                    </VStack>
                </ModalBody>
            </VStack>
        </Modal>
    );
};

export default InputSelectionModal;
