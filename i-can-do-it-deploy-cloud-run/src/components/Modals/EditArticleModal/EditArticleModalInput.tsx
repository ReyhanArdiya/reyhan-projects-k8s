import { HStack, VStack } from "@chakra-ui/react";
import { Trash } from "phosphor-react";
import { ChangeEventHandler, MouseEventHandler } from "react";
import FormControl from "../../FormControl";

export interface EditArticleModalParagraphInputProps {
    text: string;
    onDeleteIconClick: MouseEventHandler;
    onTextChange: ChangeEventHandler<HTMLInputElement>;
    onAudioChange: ChangeEventHandler<HTMLInputElement>;
}

export const EditArticleModalParagraphInput = ({
    onDeleteIconClick,
    text,
    onTextChange,
    onAudioChange,
}: EditArticleModalParagraphInputProps) => {
    return (
        <HStack
            w="full"
            bg="sienna.300"
            border="2px solid black"
            rounded="base"
            p="2"
        >
            <VStack w="full">
                <FormControl
                    formLabelProps={{ children: "Text" }}
                    inputProps={{
                        placeholder: "Text",
                        value: text,
                        onChange: onTextChange,
                    }}
                />
                <FormControl
                    formLabelProps={{ children: "Audio" }}
                    inputProps={{
                        type: "file",
                        onChange: onAudioChange,
                    }}
                />
            </VStack>

            <Trash
                onClick={onDeleteIconClick}
                size="2em"
                cursor="pointer"
            />
        </HStack>
    );
};

export interface EditArticleModalImageInputProps {
    onDeleteIconClick: MouseEventHandler;
    onImageChange: ChangeEventHandler<HTMLInputElement>;
}

export const EditArticleModalImageInput = ({
    onDeleteIconClick,
    onImageChange,
}: EditArticleModalImageInputProps) => {
    return (
        <HStack
            w="full"
            bg="sienna.300"
            border="2px solid black"
            rounded="base"
            p="2"
        >
            <VStack w="full">
                <FormControl
                    formLabelProps={{ children: "Image" }}
                    inputProps={{
                        placeholder: "Image",
                        onChange: onImageChange,
                        type: "file",
                    }}
                />
            </VStack>

            <Trash
                onClick={onDeleteIconClick}
                size="2em"
                cursor="pointer"
            />
        </HStack>
    );
};
