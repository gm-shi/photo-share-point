"use client";

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

export const Avatar: FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();
  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${userId}`);
    },
    [router, userId]
  );
  return (
    <div
      className={`${hasBorder && "border-4 border-black"} ${
        isLarge ? "h-32 w-32" : "h-12 w-12"
      } rounded-full hover:opacity-80 transition cursor-pointer relative`}
    >
      <Image
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
        blurDataURL="/images/placeholder.png"
        placeholder="blur"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};
