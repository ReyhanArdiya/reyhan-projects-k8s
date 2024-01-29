import { Skeleton } from "@chakra-ui/react";

export interface LoadingProps {}

const Loading = ({}: LoadingProps) => {
    return (
        <Skeleton
            startColor="blue.100"
            endColor="sienna.100"
            w="full"
            h="100vh"
        />
    );
};

export default Loading;
