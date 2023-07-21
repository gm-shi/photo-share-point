import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response("", {
      status: 405,
    });
  }

  try {
    const { email, username, name, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma?.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return new Response("", {
      status: 400,
    });
  }
}
