"use client";
import { FC } from "react";
import { HiPhoto } from "react-icons/hi2";
import React from "react";
import { useRouter } from "next/navigation";
export const SidebarLogo: FC = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="
        rounded-full
        h-14
        w-14
        p-4
        flex
        items-center 
        justify-center
        hover:bg-blue-200
        hover:bg-opacity-10
        cursor-pointer
        transition
        "
    >
      <HiPhoto size={28} color="white" />
    </div>
  );
};
