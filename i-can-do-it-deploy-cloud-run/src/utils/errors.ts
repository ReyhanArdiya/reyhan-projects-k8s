import { useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";

export const catchErrorWithToast =
    <T extends () => Promise<Awaited<ReturnType<T>>>>(
        toast: ReturnType<typeof useToast>,
        cb: T
    ) =>
    async () => {
        try {
            return await cb();
        } catch (err) {
            if (err instanceof FirebaseError) {
                toast({
                    status: "error",
                    isClosable: true,
                    description: err.message,
                });
            }
        }
    };
