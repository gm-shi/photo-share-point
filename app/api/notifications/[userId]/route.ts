import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (req: NextRequest, context: { params: any }) => {
  try {
    const userId = context?.params?.userId;

    if (!userId) throw new Error("Invalid Id");

    const notifications = await prisma?.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma?.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.log(error);
    return new Response("", { status: 400 });
  }
};
