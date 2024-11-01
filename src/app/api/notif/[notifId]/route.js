import { NextResponse } from "next/server";
import connectDB from "../../../../../utils/connectDb";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "../../../../../models/User";
import Notif from "../../../../../models/Notif";
import { getServerSession } from "next-auth";

export async function PATCH(req, { params }) {
  const { notifId } = params;
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "کاربر وجود ندارد" }, { status: 403 });
    }
    const user = await User.findOne({ phone: session.user.phone });
    if (!user) {
      return NextResponse.json({ error: "کاربر وجود ندارد" }, { status: 403 });
    }
    const body = await req.json();
    const notif = await Notif.findOne({ _id: notifId });
    notif.visibility = true;
    notif.save();
    return NextResponse.json({ data: "okkk" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}
