"use client";
import { SessionProvider } from "next-auth/react";

export const ProvidersWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
