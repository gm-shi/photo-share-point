"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useNotifications } from "@/hooks/useNotifications";
import { FC, useEffect } from "react";
import { BiPhotoAlbum } from "react-icons/bi";

interface NotificationsFeedProps {}
export const NotificationsFeed: FC<NotificationsFeedProps> = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  return fetchedNotifications.length ? (
    <div className="flex flex-col">
      {fetchedNotifications.map((n: Record<string, any>) => (
        <div
          key={n.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] w-full border-neutral-800"
        >
          <BiPhotoAlbum color="white" size={32} />
          <p className="text-white">{n.content}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className=" text-neutral-600 text-center p-6 text-xl">
      No notifications
    </div>
  );
};
