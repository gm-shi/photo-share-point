"use client";

import { usePost } from "./usePost";
import { useCurrentUser } from "./useCurrentUser";
import { usePosts } from "./usePosts";
import { useLoginModel } from "./useLoginModel";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useLike = ({
  postId,
  userId,
}: {
  postId: string;
  userId?: string;
}) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);

  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModel = useLoginModel();

  const hasLiked = useMemo(
    () => fetchedPost?.likedIds?.includes(currentUser?.id),
    [currentUser?.id, fetchedPost?.likedIds]
  );

  const toggleLike = useCallback(async () => {
    if (!currentUser) return loginModel.onOpen();
    try {
      hasLiked
        ? await axios.delete("/api/like", { data: { postId } })
        : await axios.post("/api/like", { postId });
      mutateFetchedPost();
      mutateFetchedPosts();
      toast.success(`${hasLiked ? "unliked" : "liked"}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    hasLiked,
    loginModel,
    mutateFetchedPost,
    mutateFetchedPosts,
    postId,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};
