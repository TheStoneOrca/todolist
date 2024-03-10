import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

type SignupBody = {
  username: string;
  password: string;
};

export async function POST(Req: Request, Res: Response) {
  try {
    const req: SignupBody = await Req.json();

    const prisma = new PrismaClient();

    const checkUsername = await prisma.users.findFirst({
      where: { username: req.username },
    });

    if (checkUsername) {
      return NextResponse.json({
        status: 406,
        errmsg: "User already registered!",
      });
    } else {
      await prisma.users.create({
        data: {
          username: req.username,
          password: await bcrypt.hash(req.password, 10),
          role: "member",
        },
      });

      return NextResponse.json({ status: 200 });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      errmsg: "Unexpected Server Issue! Please Wait...",
    });
  }
}
