import { serverAuth } from "@/libs/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  if (req.method !== "GET") {
    return new Response("", {
      status: 405,
    });
  }

  try {
    const { currentUser } = await serverAuth();

    return NextResponse.json(currentUser);
  } catch (error) {
    console.error(error);
    return new Response("", {
      status: 400,
    });
  }
}
