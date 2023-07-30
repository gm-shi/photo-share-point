"use client";
import { useLoginModel } from "@/hooks/useLoginModel";
import { usePosts } from "@/hooks/usePosts";
import { useRegisterModel } from "@/hooks/useRegisterModel";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import axios from "axios";
import { FC, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./Button";
import { Avatar } from "./Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

export const Form: FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId);

  const [body, setBody] = useState("");

  const [isLoading, setIsloading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsloading(true);

      await axios.post("/api/posts", { body });
      toast.success("Posted");
      setBody("");
      mutatePosts();
    } catch (error) {
      toast.error("something went wrong!");
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }, [body, mutatePosts]);

  return (
    <>
      <div className="border-b-[1px] border-neutral-800 px-5 py-2">
        {currentUser ? (
          <div className="flex flex-rwo gap-4">
            <div>
              <Avatar userId={currentUser?.id} />
            </div>
            <div className="w-full">
              <textarea
                disabled={isLoading}
                onChange={(e) => setBody(e.target.value)}
                value={body}
                className=" disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
                placeholder={placeholder}
              ></textarea>
              <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition"></hr>
              <div className="mt-4 flex flex-row justify-end">
                <Button
                  disabled={isLoading}
                  onClick={onSubmit}
                  label={"Post"}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8">
            <h1 className="text-white text-2xl text-center mb-4 font-bold">
              Welcome to SharePoint
            </h1>
            <div className="flex flex-row items-center justify-center gap-4">
              <Button label="Login" onClick={loginModel.onOpen} />
              <Button
                label="Register"
                onClick={registerModel.onOpen}
                secondary
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
