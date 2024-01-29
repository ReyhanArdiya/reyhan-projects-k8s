import { Stack, Text, TextProps, useDisclosure } from "@chakra-ui/react";
import { Play } from "phosphor-react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import CircularIcon from "../CircularIcon";

export interface AudibleTextProps extends TextProps {
    audioUrl: string;
    onAudioPlay: (newAudioEl: HTMLAudioElement) => void;
}

const SpeakerIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            opacity="0.2"
            d="M6.43832 12.9507L6.4214 12.9375H6.39995H2.79995C2.6574 12.9375 2.52068 12.8809 2.41988 12.7801C2.31908 12.6793 2.26245 12.5425 2.26245 12.4V7.59999C2.26245 7.45743 2.31908 7.32072 2.41988 7.21992C2.52068 7.11912 2.6574 7.06249 2.79995 7.06249H6.39995H6.4214L6.43832 7.04932L11.7375 2.92778V17.0722L6.43832 12.9507Z"
            fill="black"
            stroke="#111111"
            strokeWidth="0.125"
        />
        <path
            d="M6.39995 13H2.79995C2.64082 13 2.48821 12.9368 2.37569 12.8243C2.26317 12.7117 2.19995 12.5591 2.19995 12.4V7.59999C2.19995 7.44086 2.26317 7.28825 2.37569 7.17572C2.48821 7.0632 2.64082 6.99999 2.79995 6.99999H6.39995L11.8 2.79999V17.2L6.39995 13Z"
            stroke="#111111"
            strokeWidth="2"
            stroke-linecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M14.7998 8.19995V11.8"
            stroke="black"
            strokeWidth="2"
            stroke-linecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const AudibleText = forwardRef<HTMLAudioElement, AudibleTextProps>(
    ({ audioUrl, onAudioPlay, ...textProps }, ref) => {
        const [isPlaying, setIsPlaying] = useState(false);
        const { isOpen, onClose, onOpen } = useDisclosure();
        const { current: audio } = useRef(new Audio(audioUrl));

        useImperativeHandle(ref, () => audio);

        useEffect(() => {
            const pausePlaying = () => {
                setIsPlaying(false);
            };

            audio.addEventListener("pause", pausePlaying);
            audio.addEventListener("ended", pausePlaying);

            return () => {
                audio.removeEventListener("pause", pausePlaying);
                audio.removeEventListener("ended", pausePlaying);
            };
        }, [audio]);

        const toggleAudio = () => {
            if (audio.paused) {
                audio.currentTime = 0;
                audio.play();
                onAudioPlay(audio);
            } else {
                audio.pause();
            }
            setIsPlaying(!audio.paused);
        };

        return (
            <Stack
                w="full"
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                spacing={2.5}
                direction={{ base: "column", lg: "row" }}
            >
                <Text
                    {...textProps}
                    cursor="pointer"
                    onClick={toggleAudio}
                />
                {(isOpen || isPlaying) && (
                    <CircularIcon
                        bg={isPlaying ? "green.200" : "white"}
                        icon={isPlaying ? Play : SpeakerIcon}
                        size="2em"
                        alignSelf="center"
                        cursor="pointer"
                        onClick={toggleAudio}
                    />
                )}
            </Stack>
        );
    }
);
AudibleText.displayName = "AudibleText";

export default AudibleText;
