import { serverAuth } from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET() {
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
