import { serverAuth } from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const { currentUser } = await serverAuth();

    const { name, username, bio, profileImage, coverImage } = await req.json();

    if (!name || !username) {
      throw new Error("Missing fields");
    }
    const updateUser = await prisma?.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    console.error(error);
    return new Response("", {
      status: 400,
    });
  }
};
