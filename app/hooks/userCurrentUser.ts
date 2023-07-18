import { fetcher } from "@/app/libs/fetcher";
import useSWR from "swr";

export const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
