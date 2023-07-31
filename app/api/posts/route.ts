import { serverAuth } from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    let posts;

    if (userId && typeof userId === "string") {
      posts = await prisma?.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma?.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return new Response("", {
      status: 400,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { currentUser } = await serverAuth();

    const { body } = await req.json();

    const post = await prisma?.post.create({
      data: {
        content: body,
        userId: currentUser.id,
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
