"use client";
import { useRegisterModel } from "@/hooks/useRegisterModel";
import { FC, useCallback, useState } from "react";
import { Input } from "../Input";
import { Model } from "../Model";
import { useLoginModel } from "@/hooks/useLoginModel";

export const RegisterModel: FC = () => {
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (!isLoading) {
      registerModel.onClose();
      loginModel.onOpen();
    }
  }, [isLoading, loginModel, registerModel]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      registerModel.onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModel]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        palceholder="Email"
        onChange={(event) => setEmail(event.target.value)}
        disabled={isLoading}
        value={email}
      />
      <Input
        palceholder="Name"
        onChange={(event) => setName(event.target.value)}
        disabled={isLoading}
        value={name}
      />
      <Input
        palceholder="Username"
        onChange={(event) => setUsername(event.target.value)}
        disabled={isLoading}
        value={username}
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
        Already have an account?
        <span
          onClick={onToggle}
          className=" text-white cursor-pointer hover:underline"
        >
          {" "}
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={registerModel.isOpen}
      title={"Create an account"}
      actionLabel={"Register"}
      onClose={registerModel.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
