import { FC } from "react";
import { CommentItem } from "./CommnetItem";

interface CommentFeedProps {
  comments: Record<string, any>[];
}

export const CommentFeed: FC<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </>
  );
};
