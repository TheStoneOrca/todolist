import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

type SignInBody = {
  username: string;
  password: string;
};

export async function POST(Req: Request, Res: Response) {
  try {
    const req: SignInBody = await Req.json();

    const prisma = new PrismaClient();

    const user = await prisma.users.findUnique({
      where: { username: req.username },
    });

    if (user) {
      const checkPassword = await bcrypt.compare(req.password, user.password);

      if (checkPassword) {
        return { username: user.username, userid: user.userid } as any;
      }

      return NextResponse.json({
        status: 406,
        errmsg: "Invalid username or password!",
      });
    }

    return NextResponse.json({
      status: 406,
      errmsg: "Invalid username or password!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      errmsg: "Unexpected Server Issue! Please wait....",
    });
  }
}
