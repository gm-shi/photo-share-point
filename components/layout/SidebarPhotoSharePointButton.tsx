"use client";
import { useLoginModel } from "@/app/hooks/useLoginModel";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { MdCameraRoll } from "react-icons/md";

export const SidebarPhotoSharePointButton: FC = () => {
  const router = useRouter();
  const loginModel = useLoginModel();

  const onClick = useCallback(() => {
    loginModel.onOpen();
  }, [loginModel]);
  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <MdCameraRoll size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block rounded-full p-4  bg-sky-500 hover:bg-opacity-90 transition cursor-pointer">
        <p
          className="
      hidden
      lg:block
      text-center
      font-semibold
      text-white
      text-[20px]
      "
        >
          SharePoint
        </p>
      </div>
    </div>
  );
};
