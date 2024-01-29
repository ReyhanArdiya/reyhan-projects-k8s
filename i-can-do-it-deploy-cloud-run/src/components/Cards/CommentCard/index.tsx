import { HStack, Icon, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import { Pencil, TrashSimple } from "phosphor-react";
import { MouseEventHandler, useState } from "react";
import ArticleComment from "../../../models/article-comment";
import {
    deleteArticleComment,
    saveArticleComment,
} from "../../../models/article-comment/utils";
import { auth, db } from "../../../utils/firebase/get-firebase-client";
import { IsAuthored } from "../../../utils/types";
import CommentModal from "../../Modals/CommentModal";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import UserAvatar from "../../UserAvatar";
import BaseCard from "../BaseCard";

export interface CommentCardProps extends IsAuthored {
    comment: string;
    commentId: string;
    articleId: string;
    timestamp: Dayjs;
    isSameAuthor: boolean;
}

const CommentCard = ({
    author,
    comment,
    timestamp,
    commentId,
    articleId,
    isSameAuthor,
}: CommentCardProps) => {
    // Update comment stuff
    const updateCommentModal = useDisclosure();
    const [commentBody, setCommentBody] = useState(comment);

    const cancelUpdateComment = () => {
        updateCommentModal.onClose();
        setCommentBody(comment);
    };

    const updateComment = async () => {
        try {
            const { displayName, photoURL, uid } = auth.currentUser!;
            updateCommentModal.onClose();
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
            cancelUpdateComment();
        }
    };

    // Delete com1ment stuff
    const deleteCommentConfirmationModal = useDisclosure();
    const deleteComment = async () => {
        deleteCommentConfirmationModal.onClose();
        try {
            await deleteArticleComment(db, articleId, commentId);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <BaseCard
            px="4"
            minW="280px"
            spacing="2.5"
        >
            <HStack
                w="full"
                spacing="3"
            >
                <UserAvatar
                    src={author.picUrl}
                    boxSize="7"
                />

                <VStack
                    align="left"
                    textAlign="left"
                    w="full"
                    spacing="0"
                >
                    <Text
                        as="h4"
                        textStyle="input"
                        fontSize="12px"
                        color="sienna.500"
                    >
                        {author.name}
                    </Text>
                    <Text
                        textStyle="small"
                        color="gray.600"
                    >
                        {timestamp.format("HH:mm DD MMMM YYYY")}
                    </Text>
                </VStack>

                <Spacer />

                {isSameAuthor && (
                    <HStack>
                        <Icon
                            as={TrashSimple}
                            onClick={deleteCommentConfirmationModal.onOpen}
                            boxSize="6"
                            cursor="pointer"
                        />
                        <ConfirmationModal
                            modalProps={{
                                isOpen: deleteCommentConfirmationModal.isOpen,
                                onClose: deleteCommentConfirmationModal.onClose,
                            }}
                            modalText="Apakah kamu ingin menghapus komentar ini?"
                            onCancelClick={deleteCommentConfirmationModal.onClose}
                            modalContentProps={{ bg: "sienna.300" }}
                            onConfirmClick={deleteComment}
                        />

                        <Icon
                            as={Pencil}
                            onClick={updateCommentModal.onOpen}
                            boxSize="6"
                            cursor="pointer"
                        />
                        <CommentModal
                            body={commentBody}
                            isOpen={updateCommentModal.isOpen}
                            onCancelClick={cancelUpdateComment}
                            onSaveClick={updateComment}
                            onUpdateBody={e => setCommentBody(e.target.value)}
                        />
                    </HStack>
                )}
            </HStack>

            <Text
                textStyle="input"
                textAlign="left"
                w="full"
            >
                {comment}
            </Text>
        </BaseCard>
    );
};

export default CommentCard;
