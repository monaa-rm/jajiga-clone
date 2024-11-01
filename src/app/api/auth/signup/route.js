import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import { hashPassword } from "../../../../../utils/auth";

export async function POST(req) {
  try {
    const { phone, name, lastName, password } = await req.json();
    if (!phone || !name || !lastName || !password) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 422 }
      );
    }
    const existingUser = await User.findOne({ phone: phone });
    if (!existingUser) {
      const hashedPassword = await hashPassword(password);
      const newUser = await User.create({
        phone,
        name,
        lastName,
        password: hashedPassword,
      });
      return NextResponse.json(
        { message: "حساب کاربری ایجاد شد" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "شماره همراه وجود دارد" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.log("sign up", error);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
