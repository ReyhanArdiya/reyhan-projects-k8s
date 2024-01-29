import { Button, Text, useDisclosure, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ChatTeardrop, Plus } from "phosphor-react";
import { MouseEventHandler, useState } from "react";
import useIsAuth from "../../../hooks/use-is-auth";
import ArticleComment from "../../../models/article-comment";
import { saveArticleComment } from "../../../models/article-comment/utils";
import { auth, db } from "../../../utils/firebase/get-firebase-client";
import CommentCard from "../../Cards/CommentCard";
import CircularIcon from "../../CircularIcon";
import CommentModal from "../../Modals/CommentModal";

export interface ArticlePageCommentsProps {
    articleId: string;
    comments: (ArticleComment & { id: string })[];
    onMoreCommentsButtonClick: MouseEventHandler;
    currentUserId: string;
}

const ArticlePageComments = ({
    articleId,
    comments,
    onMoreCommentsButtonClick,
    currentUserId,
}: ArticlePageCommentsProps) => {
    // Modals
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [commentBody, setCommentBody] = useState("");

    const createComment = async () => {
        try {
            const { displayName, photoURL, uid } = auth.currentUser!;
            await saveArticleComment(
                db,
                articleId,
                new ArticleComment(
                    {
                        name: displayName!,
                        picUrl: photoURL!,
                        uid,
                    },
                    commentBody
                )
            );
        } catch (err) {
            console.error(err);
        }
        onClose();
    };

    const commentCards = comments.map((comment, i) => {
        const isSameAuthor = currentUserId === comment.author.uid;

        return (
            <CommentCard
                isSameAuthor={isSameAuthor}
                articleId={articleId}
                key={i}
                commentId={comment.id}
                author={comment.author}
                timestamp={dayjs(comment.created)}
                comment={comment.body}
            />
        );
    });
    const isAuth = useIsAuth();
    const router = useRouter();

    const commentButton = isAuth ? (
        <Button
            leftIcon={
                <CircularIcon
                    p="1"
                    icon={() => (
                        <ChatTeardrop
                            weight="fill"
                            color="black"
                        />
                    )}
                />
            }
            onClick={onOpen}
        >
            Buat Komentar
        </Button>
    ) : (
        <Button onClick={() => router.push("/auth")}>
            Anda harus masuk ke akun untuk bisa membuat komentar!
        </Button>
    );

    return (
        <VStack
            w="full"
            bg="sienna.100"
            spacing="3"
            py="4"
        >
            <Text
                as="h2"
                textStyle="h2"
            >
                Kolom Komentar
            </Text>

            {commentButton}
            <CommentModal
                body={commentBody}
                isOpen={isOpen}
                onCancelClick={onClose}
                onSaveClick={createComment}
                onUpdateBody={e => setCommentBody(e.target.value)}
            />

            <VStack spacing="inherit">{commentCards}</VStack>

            {/* <Button
                leftIcon={
                    <CircularIcon
                        p="1"
                        icon={() => (
                            <Plus
                                weight="fill"
                                color="black"
                            />
                        )}
                    />
                }
                onClick={onMoreCommentsButtonClick}
            >
                Lihat Komentar Lain
            </Button> */}
        </VStack>
    );
};

export default ArticlePageComments;
