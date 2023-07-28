import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextApiRequest,
  context: { params: any }
) => {
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
