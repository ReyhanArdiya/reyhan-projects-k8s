import { Avatar, AvatarProps } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

export interface UserAvatarProps extends AvatarProps {
    href?: string;
}

const UserAvatar = (props: UserAvatarProps) => {
    const Wrapper = props.href
        ? ({ children }: { children: ReactNode }) => (
              <Link href={props.href!}>{children}</Link>
          )
        : ({ children }: { children: ReactNode }) => <>{children}</>;

    return (
        <Wrapper>
            <Avatar
                borderWidth="2px"
                borderStyle="solid"
                borderColor="sienna.500"
                boxSize="9"
                cursor="pointer"
                {...props}
            />
        </Wrapper>
    );
};

export default UserAvatar;
