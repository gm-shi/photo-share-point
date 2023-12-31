import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@/libs/prismadb";

export const serverAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) throw new Error("Not signed in");

  const currentUser = await prisma?.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) throw new Error("Not signed in");

  return { currentUser };
};
