import {
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalContent,
    ModalContentProps,
    ModalHeader,
    ModalOverlay,
    ModalProps,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export interface ConfirmationModalProps {
    modalText: string;
    onConfirmClick: MouseEventHandler;
    onCancelClick: MouseEventHandler;
    modalProps: Omit<ModalProps, "children">;
    modalContentProps?: ModalContentProps;
}

const ConfirmationModal = ({
    modalText,
    onCancelClick,
    onConfirmClick,
    modalProps,
    modalContentProps,
}: ConfirmationModalProps) => {
    return (
        <Modal
            size="sm"
            {...modalProps}
        >
            <ModalOverlay />
            <ModalContent
                border="2px solid black"
                px="12"
                py="4"
                spacing="4"
                alignContent="center"
                justifyContent="center"
                textAlign="center"
                rounded="base"
                bg="yellow.300"
                {...modalContentProps}
            >
                <ModalHeader
                    textStyle="h3"
                    as="h3"
                >
                    {modalText}
                </ModalHeader>

                <ModalBody>
                    <ButtonGroup
                        justifyContent="space-between"
                        spacing="12"
                    >
                        <Button
                            colorScheme="blue"
                            onClick={onCancelClick}
                            w="100px"
                        >
                            Tidak
                        </Button>
                        <Button
                            colorScheme="sienna"
                            onClick={onConfirmClick}
                            w="100px"
                        >
                            Iya
                        </Button>
                    </ButtonGroup>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmationModal;
