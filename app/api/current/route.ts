import { serverAuth } from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
