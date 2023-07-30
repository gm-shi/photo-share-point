import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import { Avatar } from "../Avatar";

interface CommentItemProps {
  comment: Record<string, any>;
}

export const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  const router = useRouter();
  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/users/${comment.user.id}`);
    },
    [comment.user.id, router]
  );

  const createdAt = useMemo(() => {
    return formatDistanceToNow(new Date(comment?.createdAt));
  }, [comment?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={comment.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {comment.user.name}
            </p>
            <span className=" text-neutral-500 cursor-pointer hover:underline md:block">
              @{comment.user.username}
            </span>
            <span className=" text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{comment.content}</div>
        </div>
      </div>
    </div>
  );
};
