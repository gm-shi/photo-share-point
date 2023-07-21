import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (
  request: NextApiRequest,
  context: { params: any }
) => {
  try {
    if (
      !context?.params?.userId ||
      typeof context?.params?.userId !== "string"
    ) {
      throw new Error("Invalid ID");
    }
    const existingUser = await prisma?.user.findUnique({
      where: {
        id: context?.params?.userId,
      },
    });

    const followercount = await prisma?.user.count({
      where: {
        followingIds: {
          has: context?.params?.userId,
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
