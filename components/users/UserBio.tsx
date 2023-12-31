import { useUser } from "@/hooks/useUser";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { format } from "date-fns";
import { FC, useMemo } from "react";
import { Button } from "../Button";
import { BiCalendar } from "react-icons/bi";
import { useEditModel } from "@/hooks/useEditModel";
import { useFollow } from "@/hooks/useFollow";

interface UserBioProps {
  userId: string;
}
export const UserBio: FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: userData } = useUser(userId);

  const editModel = useEditModel();

  const { isFollowing, toggleFollow, isLoading } = useFollow(userId);

  const createdAt = useMemo(
    () => format(new Date(userData?.createdAt), "MMM yyyy"),
    [userData?.createdAt]
  );
  return (
    <div className=" border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userData.id ? (
          <Button secondary label="Edit" onClick={editModel.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? "Unfollow" : "Follow"}
            secondary={!isFollowing}
            outline={isFollowing}
            disabled={isLoading}
          />
        )}
      </div>

      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{userData?.name}</p>
          <p className="text-md text-neutral-500">{userData?.userName}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{userData?.bio}</p>
        </div>
        <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
          <BiCalendar size={24} />
          <p>Joined {createdAt}</p>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{userData?.followingIds?.length}</p>
            <p className=" text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{userData?.followerCount || 0}</p>
            <p className=" text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
