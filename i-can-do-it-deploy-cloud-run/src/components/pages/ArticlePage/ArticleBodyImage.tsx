import { Image } from "@chakra-ui/react";
import { ArticleBodyImg } from "../../../models/article";

export interface ArticleBodyImageProps extends ArticleBodyImg {}

const ArticleBodyImage = ({ alt, src, title }: ArticleBodyImageProps) => {
    return (
        <Image
            boxSize="40"
            border="2px solid black"
            rounded="base"
            alt={alt}
            src={src}
            title={title}
            objectFit="cover"
            objectPosition="center"
        />
    );
};

export default ArticleBodyImage;
