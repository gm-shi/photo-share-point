import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (req: NextRequest, context: { params: any }) => {
  try {
    const postId = context?.params?.postId;
    if (!postId || typeof postId !== "string") {
      return new Error("Invalid Id");
    }

    const post = await prisma?.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return new Response("", {
      status: 400,
    });
  }
};
