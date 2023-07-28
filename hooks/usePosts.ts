"use client";
import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

export const usePosts = (userId?: string) => {
  const url = `/api/posts${userId ? `?userId=${userId}` : ""}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
