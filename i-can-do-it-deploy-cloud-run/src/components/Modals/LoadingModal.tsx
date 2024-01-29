import {
    Modal,
    ModalContent,
    ModalOverlay,
    ModalProps,
    Spinner,
} from "@chakra-ui/react";

export interface LoadingModalProps extends Pick<ModalProps, "isOpen" | "onClose"> {}

const LoadingModal = (props: LoadingModalProps) => {
    return (
        <Modal
            {...props}
            isCentered
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent
                m="0"
                boxSize="max"
                shadow="none"
                bg="none"
                alignItems="center"
                justifyItems="center"
            >
                <Spinner
                    m="0"
                    size="xl"
                    color="blue.500"
                    emptyColor="yellow.300"
                />
            </ModalContent>
        </Modal>
    );
};

export default LoadingModal;
