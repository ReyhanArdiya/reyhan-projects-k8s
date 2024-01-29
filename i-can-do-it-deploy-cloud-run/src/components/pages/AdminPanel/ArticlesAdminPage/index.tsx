import { Button, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { FirebaseError } from "firebase/app";
import { getBlob, getDownloadURL, getStorage, ref } from "firebase/storage";
import { nanoid } from "nanoid";
import { ArrowLeft, Plus } from "phosphor-react";
import { MouseEventHandler, useState } from "react";
import { Article, ArticleBodyImg, AudibleText } from "../../../../models/article";
import {
    deleteArticle,
    saveArticle,
    saveArticleMedia,
} from "../../../../models/article/utils";
import { catchErrorWithToast } from "../../../../utils/errors";
import getFirebaseClient, {
    app,
    db,
} from "../../../../utils/firebase/get-firebase-client";
import { WithId } from "../../../../utils/types";
import { extractPathFromDownloadURL } from "../../../../utils/uri";
import ResourceThumbnailCard from "../../../Cards/ResourceThumbnailCard";
import CircularIcon from "../../../CircularIcon";
import List from "../../../List";
import EditArticleModal, {
    EditArticleModalProps,
} from "../../../Modals/EditArticleModal";
import {
    ImageInput,
    ParagraphInput,
} from "../../../Modals/EditArticleModal/article-data-reducer";
import LoadingModal from "../../../Modals/LoadingModal";

export interface ArticlesAdminPageProps {
    onGoBackButtonClick: MouseEventHandler;
    articles: WithId<Article>[];
}

const ArticlesAdminPage = ({
    onGoBackButtonClick,
    articles,
}: ArticlesAdminPageProps) => {
    const [initialData, setInitialData] =
        useState<WithId<EditArticleModalProps["initialData"]>>();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const spinnerDisclosure = useDisclosure();

    const toast = useToast();

    const openCreateArticleModal = () => {
        onOpen();
        setInitialData({
            author: {
                name: "",
            },
            body: [],
            created: new Date(),
            id: nanoid(),
            title: "",
            headerVideo: new File([], ""),
            thumbnail: new File([], ""),
        });
    };

    const deleteArticleHandler = async () => {
        try {
            spinnerDisclosure.onOpen();
            initialData && (await deleteArticle(db, initialData.id));
            onClose();
        } catch (err) {
            if (err instanceof FirebaseError) {
                toast({
                    status: "error",
                    isClosable: true,
                    description: err.message,
                });
            }
        }
        spinnerDisclosure.onClose();
    };

    const saveArticleHandler: EditArticleModalProps["onSaveClick"] =
        async articleData => {
            if (initialData) {
                spinnerDisclosure.onOpen();
                const storage = getStorage(getFirebaseClient());

                const saveAudio = async (audioFile: File) => {
                    try {
                        const { ref } = await saveArticleMedia(
                            storage,
                            initialData.id,
                            audioFile
                        );

                        return await getDownloadURL(ref);
                    } catch (err) {
                        if (err instanceof FirebaseError) {
                            toast({
                                status: "error",
                                isClosable: true,
                                description: err.message,
                            });
                        }

                        return "";
                    }
                };

                const articleBody: Article["body"] = [];
                for (const bodyData of articleData.body) {
                    if ("text" in bodyData) {
                        const audibleText: AudibleText = {
                            text: bodyData.text,
                            audioSrc: await saveAudio(bodyData.audioFile),
                        };

                        articleBody.push(audibleText);
                    } else {
                        const savedVideo = await saveArticleMedia(
                            storage,
                            initialData.id,
                            bodyData.imageFile
                        );

                        const articleBodyImg: ArticleBodyImg = {
                            alt: bodyData.imageFile?.name || "",
                            title: bodyData.imageFile?.name || "",
                            src: await getDownloadURL(savedVideo.ref),
                        };

                        articleBody.push(articleBodyImg);
                    }
                }

                try {
                    const savedHeaderVideo = await saveArticleMedia(
                        storage,
                        initialData.id,
                        articleData.headerVideo
                    );
                    const savedHeaderVideoUrl = await getDownloadURL(
                        savedHeaderVideo.ref
                    );

                    const savedThumbnail = await saveArticleMedia(
                        storage,
                        initialData.id,
                        articleData.thumbnail
                    );
                    const savedThumbnailUrl = await getDownloadURL(
                        savedThumbnail.ref
                    );

                    const article = new Article(
                        articleData.title,
                        articleData.created,
                        { name: articleData.author.name, picUrl: "123" },
                        articleBody,
                        savedHeaderVideoUrl,
                        savedThumbnailUrl
                    );

                    await saveArticle(db, article, initialData.id);
                    onClose();
                } catch (err) {
                    if (err instanceof FirebaseError) {
                        toast({
                            status: "error",
                            isClosable: true,
                            description: err.message,
                        });
                    }
                }
            }

            spinnerDisclosure.onClose();
        };

    const articleCards = articles.map(article => {
        const body: Array<ParagraphInput | ImageInput> = article.body.map(data => {
            if ("text" in data) {
                return {
                    text: data.text,
                    id: nanoid(),
                } as ParagraphInput;
            }

            return {
                id: nanoid(),
            } as ImageInput;
        });

        const editArticle = catchErrorWithToast(toast, async () => {
            try {
                spinnerDisclosure.onOpen();

                const storage = getStorage(app);
                const headerVideoRef = ref(
                    storage,
                    decodeURIComponent(
                        extractPathFromDownloadURL(article.headerVideoUrl!) as string
                    )
                );
                const thumbnailRef = ref(
                    storage,
                    decodeURIComponent(
                        extractPathFromDownloadURL(article.thumbnail!) as string
                    )
                );

                let headerVideoBlob = new Blob([""]);
                let thumbnailBlob = new Blob([""]);
                await catchErrorWithToast(toast, async () => {
                    headerVideoBlob = await getBlob(headerVideoRef);
                    thumbnailBlob = await getBlob(thumbnailRef);
                })();

                setInitialData({
                    author: { name: article.author.name },
                    body,
                    title: article.title,
                    id: article.id,
                    created: article.created,
                    headerVideo: new File([headerVideoBlob], headerVideoRef.name),
                    thumbnail: new File([thumbnailBlob], thumbnailRef.name),
                });

                onOpen();
            } catch (error) {
                spinnerDisclosure.onClose();
                throw error;
            }
            spinnerDisclosure.onClose();
        });

        return (
            <ResourceThumbnailCard
                key={article.id}
                buttonLabel="Edit"
                imageProps={{ src: article.thumbnail, alt: article.title }}
                title={article.title}
                date={dayjs(article.created)}
                author={article.author}
                onButtonClick={editArticle}
            />
        );
    });

    return (
        <>
            <VStack
                maxW="full"
                spacing="6"
                w="full"
            >
                <Button
                    leftIcon={
                        <CircularIcon
                            icon={() => (
                                <Plus
                                    weight="bold"
                                    fill="black"
                                />
                            )}
                        />
                    }
                    onClick={openCreateArticleModal}
                >
                    Artikel Baru
                </Button>

                <List
                    listTitle="List Artikel"
                    cards={articleCards}
                    stackProps={{
                        justify: {
                            base: "start",
                            lg: articleCards.length > 3 ? "start" : "center",
                        },
                        w: "full",
                    }}
                />

                <Button
                    bg="sienna.500"
                    leftIcon={
                        <CircularIcon
                            icon={() => (
                                <ArrowLeft
                                    weight="bold"
                                    fill="black"
                                />
                            )}
                        />
                    }
                    onClick={onGoBackButtonClick}
                >
                    Kembali
                </Button>
            </VStack>

            {initialData && isOpen && (
                <EditArticleModal
                    isOpen={isOpen}
                    initialData={initialData}
                    onCancelClick={onClose}
                    onDeleteIconClick={deleteArticleHandler}
                    onSaveClick={saveArticleHandler}
                />
            )}

            {<LoadingModal {...spinnerDisclosure} />}
        </>
    );
};

export default ArticlesAdminPage;
