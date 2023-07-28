import { useCallback, useMemo, useState } from "react";
import { useLoginModel } from "./useLoginModel";
import { useUser } from "./useUser";
import { useCurrentUser } from "./userCurrentUser";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);
  const [isLoading, setIsLoading] = useState(false);

  const loginModel = useLoginModel();

  const isFollowing = useMemo(
    () => (currentUser.followingIds || []).includes(userId),
    [currentUser.followingIds, userId]
  );

  const toggleFollow = useCallback(async () => {
    setIsLoading(true);
    if (!currentUser) return loginModel.onOpen();

    try {
      isFollowing
        ? await axios.delete("/api/follow", { data: { userId } })
        : await axios.post("/api/follow", { userId });

      mutateCurrentUser();
      mutateFetchedUser();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [
    currentUser,
    isFollowing,
    loginModel,
    mutateCurrentUser,
    mutateFetchedUser,
    userId,
  ]);

  return { isFollowing, toggleFollow, isLoading };
};
