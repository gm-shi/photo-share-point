import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const existingUser = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followercount = await prisma?.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });
    return NextResponse.json({ ...existingUser, followercount });
  } catch (error) {
    console.error(error);
    return new Response("", {
      status: 400,
    });
  }
};
