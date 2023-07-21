"use client";

import { Header } from "@/components/Header";
import { UserBio } from "@/components/users/UserBio";
import { UserHero } from "@/components/users/UserHero";
import { useUser } from "@/hooks/useUser";
import { ClipLoader } from "react-spinners";

const UserView = ({ params }: { params: { userId: string } }) => {
  const { data: fetchedUser, isLoading } = useUser(params.userId);

  console.log({ fetchedUser });

  return isLoading || !fetchedUser ? (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ) : (
    <>
      <Header label={fetchedUser?.name} showBackArrow />
      <UserHero userId={params.userId} />
      <UserBio userId={params.userId} />
    </>
  );
};

export default UserView;
