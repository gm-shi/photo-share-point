"use client";
import { useLoginModel } from "@/app/hooks/useLoginModel";
import { FC, useCallback, useState } from "react";
import { Input } from "../Input";
import { Model } from "../Model";
import { useRegisterModel } from "@/app/hooks/useRegisterModel";

export const LoginModel: FC = () => {
  const loginModel = useLoginModel();
  const registerModel = useRegisterModel();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (!isLoading) {
      loginModel.onClose();
      registerModel.onOpen();
    }
  }, [isLoading, loginModel, registerModel]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      loginModel.onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModel]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        palceholder="Email"
        onChange={(event) => setEmail(event.target.value)}
        disabled={isLoading}
        value={email}
      />
      <Input
        palceholder="Password"
        onChange={(event) => setPassword(event.target.value)}
        disabled={isLoading}
        value={password}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First using SharePoint?
        <span
          onClick={onToggle}
          className=" text-white cursor-pointer hover:underline"
        >
          {" "}
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={loginModel.isOpen}
      title={"Login"}
      actionLabel={"Sign in"}
      onClose={loginModel.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
