import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const users = await prisma?.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return new Response("", {
      status: 400,
    });
  }
};
