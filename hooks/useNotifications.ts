"use client";
import { fetcher } from "@/libs/fetcher";
import useSWR from "swr";

export const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : undefined;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
