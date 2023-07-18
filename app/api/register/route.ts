import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcryptjs");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, username, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    console.log({ email, username, name, hashedPassword });

    const user = await prisma?.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
};

export { handler as GET, handler as POST };
