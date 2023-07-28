"use client";
import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

export const usePost = (postId?: string) => {
  const url = postId ? `/api/posts/${postId}` : undefined;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
