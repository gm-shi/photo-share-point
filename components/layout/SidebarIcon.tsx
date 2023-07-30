"use client";
import { useLoginModel } from "@/hooks/useLoginModel";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import React, { FC, useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarIconProp {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

export const SidebarIcon: FC<SidebarIconProp> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const loginModel = useLoginModel();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();
    if (auth && !currentUser) loginModel.onOpen();
    else if (href) router.push(href);
  }, [auth, currentUser, href, loginModel, onClick, router]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div
        className="relative rounded-full h-14 w-14 
      flex items-center justify-center p-4 
       hover:bg-slate-300 hover:bg-opacity-10 
       cursor-pointer lg:hidden"
      >
        <Icon size={28} color="white" />
        {alert && (
          <BsDot className=" text-sky-500 absolute -top-4 left-0" size={70} />
        )}
      </div>
      <div
        className="
      relative hidden lg:flex items-row gap-4 p-4 rounded-full
       hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer"
      >
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert && (
          <BsDot className=" text-sky-500 absolute -top-4 left-0" size={70} />
        )}
      </div>
    </div>
  );
};
