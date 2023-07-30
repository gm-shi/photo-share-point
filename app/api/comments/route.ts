import { serverAuth } from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const postId = req.nextUrl.searchParams.get("postId");

    const { currentUser } = await serverAuth();
    const { body } = await req.json();
    if (!postId) {
      throw new Error("Invalid Id");
    }

    const comment = await prisma?.comment.create({
      data: {
        postId,
        content: body,
        userId: currentUser.id,
      },
    });

    try {
      const post = await prisma?.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (post?.userId) {
        await prisma?.notification.create({
          data: {
            content: "Someone replied to your post!",
            userId: post.userId,
          },
        });

        await prisma?.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return new Response("", {
      status: 400,
    });
  }
};
