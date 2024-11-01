import { redirect } from "next/dist/server/api-utils";
import User from "../../../../../models/User";
import connectDB from "../../../../../utils/connectDb";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";
import { hashPassword } from "../../../../../utils/auth";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "مشکلی  پیش آمده" }, { status: 500 });
  }
  const body = await req.json();
  const user = await User.findOne({ phone: body.phone });
  if (!user)
    return NextResponse.json({ error: "مشکلی  پیش آمده" }, { status: 404 });
  return NextResponse.json({ data: user }, { status: 200 });
}

export async function PATCH(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json({ error: "مشکلی  پیش آمده" }, { status: 500 });
  }
  try {
    const body = await req.json();
    const searchparams = req.nextUrl.searchParams.get("itemtype");
    const user = await User.findOne({ _id: body.userId });
    if (!user)
      return NextResponse.json({ error: "مشکلی  پیش آمده" }, { status: 404 });

    if (searchparams == "password") {
      if (body.password !== body.repeatPassword) {
        return NextResponse.json(
          { error: "رمز عبور و تکرار رمز عبور یکسان نیست" },
          { status: 500 }
        );
      }

      const hashedPassword = await hashPassword(body.password);

      user.password = hashedPassword;

      user.save();
      return NextResponse.json({ data: user }, { status: 200 });
    } else {
      user[searchparams] = body[searchparams];
      user.save();
      return NextResponse.json({ data: user }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "مشکلی  پیش آمده" }, { status: 500 });
  }
}
