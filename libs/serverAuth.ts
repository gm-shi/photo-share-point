import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const serverAuth = async (req: NextApiRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) throw new Error("Not signed in");

  const currentUser = await prisma?.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  console.log(currentUser);

  if (!currentUser) throw new Error("Not signed in");

  return { currentUser };
};
