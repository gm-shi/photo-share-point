import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (req: NextRequest, context: { params: any }) => {
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

    const followerCount = await prisma?.user.count({
      where: {
        followingIds: {
          has: context?.params?.userId,
        },
      },
    });

    return NextResponse.json({ ...existingUser, followerCount });
  } catch (error) {
    console.error(error);
    return new Response("", {
      status: 400,
    });
  }
};
