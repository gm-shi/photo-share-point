"use client";
import { Header } from "@/components/Header";
import { FollowBar } from "@/components/layout/FollowBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { LoginModel } from "@/components/models/LoginModel";
import { RegisterModel } from "@/components/models/RegisterModel";

import { FC } from "react";
import { Toaster } from "react-hot-toast";

const Home: FC = () => {
  return (
    <div>
      <Toaster />
      <RegisterModel />
      <LoginModel />
      <div className="h-screen bg-black">
        <div className="container h-full mx-auto xl:px-32 max-w-6xl ">
          <div className="grid grid-cols-4 h-full">
            <Sidebar />
            <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
              <Header label={"Home"} />
            </div>
            <FollowBar />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
