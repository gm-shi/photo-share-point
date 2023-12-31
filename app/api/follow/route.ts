import { serverAuth } from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

const handler = async (req: NextRequest) => {
  try {
    const { userId } = await req.json();

    const { currentUser } = await serverAuth();

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const user = await prisma?.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      try {
        await prisma?.notification.create({
          data: {
            content: "Someone followed you",
            userId: userId,
          },
        });

        await prisma?.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    const updatedUser = await prisma?.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error);
    return new Response("", { status: 400 });
  }
};

export { handler as POST, handler as DELETE };
