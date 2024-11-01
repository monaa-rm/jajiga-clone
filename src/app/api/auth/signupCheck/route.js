import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import connectDB from "../../../../../utils/connectDb";

export async function POST(req) {
  try {
    await connectDB();
    const { phone } = await req.json();
    if (!phone) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 422 }
      );
    }
    const existingUser = await User.findOne({ phone: phone });
    if (existingUser) {
      return NextResponse.json(
        {
          data: {
            mobileRegistered: true,
            fullname: `${existingUser.name} ${existingUser.lastName}` ,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { data: { mobileRegistered: false } },
        { status: 200 }
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
