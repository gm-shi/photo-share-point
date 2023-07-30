import { serverAuth } from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    const { postId } = await req.json();
    const { currentUser } = await serverAuth();

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid Id");
    }

    const post = await prisma?.post.findUnique({ where: { id: postId } });

    if (!postId) {
      throw new Error("Invalid ID");
    }

    let updatedLikedIds = [...(post?.likedIds || [])];

    if (req.method === "POST") updatedLikedIds.push(currentUser.id);
    if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== currentUser.id
      );
    }

    const updatedPost = await prisma?.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    console.log(error);
    return new Response("", { status: 400 });
  }
};

export { handler as POST, handler as DELETE };
