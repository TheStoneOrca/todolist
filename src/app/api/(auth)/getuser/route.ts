import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(Req: Request, Res: Response) {
  try {
    const req = await Req.json();

    const user = jwt.verify(req.jwtSecret, process.env.JWT_SECRET as any);

    return NextResponse.json({ status: 200, userObject: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      errmsg: "Unexpected Server Issue! Please wait....",
    });
  }
}
