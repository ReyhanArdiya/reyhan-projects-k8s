import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

const useFetch = <T extends () => Promise<any>>(dataFetcher: T) => {
    const [data, setData] = useState<Awaited<ReturnType<T>>>();
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setError(null);
        setIsLoading(true);

        try {
            setData(await dataFetcher());
        } catch (err) {
            setError(err as Error);
        }

        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toast = useToast();

    useEffect(() => {
        error &&
            toast({
                status: "error",
                title: error?.name,
                description: error?.message,
                duration: 5_000,
                isClosable: true,
            });
    }, [error, toast]);

    return {
        fetchData,
        data,
        error,
        isLoading,
    };
};

export default useFetch;
