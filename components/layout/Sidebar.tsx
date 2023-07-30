"use client";
import { FC } from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { SidebarLogo } from "./SidebarLogo";
import React from "react";
import { SidebarIcon } from "./SidebarIcon";
import { SidebarPhotoSharePointButton } from "./SidebarPhotoSharePointButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

export const Sidebar: FC = () => {
  const { data: currentUser } = useCurrentUser();

  const icons = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {icons.map((icon) => {
            return (
              <SidebarIcon
                icon={icon.icon}
                label={icon.label}
                href={icon.href}
                key={icon.href}
                auth={icon.auth}
              />
            );
          })}
          {currentUser && (
            <SidebarIcon
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarPhotoSharePointButton />
        </div>
      </div>
    </div>
  );
};
