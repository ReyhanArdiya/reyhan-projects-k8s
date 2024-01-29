import { As, Circle, Icon, IconProps, type SquareProps } from "@chakra-ui/react";

export interface CircularIconProps extends SquareProps {
    icon?: As<any>;
}

const CircularIcon = ({ icon, ...props }: CircularIconProps) => (
    <Circle
        bg="white"
        {...props}
    >
        <Icon
            as={icon}
            fontSize="1em"
        />
    </Circle>
);

export default CircularIcon;
