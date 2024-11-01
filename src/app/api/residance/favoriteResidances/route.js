import { NextResponse } from "next/server";
import connectDB from "../../../../../utils/connectDb";
import Room from "../../../../../models/Room";

export async function POST(req) {
  const { ids } = await req.json();

  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده" },
      { status: 500 }
    );
  }

  if (!ids || ids.length === 0) {
    return NextResponse.json(
      { error: "شناسه‌ها یافت نشدند" },
      { status: 400 }
    );
  }

  try {
    // پیدا کردن اقامتگاه‌هایی که شناسه‌های آن‌ها در ids است
    const rooms = await Room.find({ _id: { $in: ids } }).populate({
      path: "userId",
      select: "-password", // حذف فیلد password
    }).sort({_id : -1});
    return NextResponse.json({ rooms }, { status: 200 });
  } catch (error) { 
    return NextResponse.json(
      { error: "مشکلی در بازیابی اقامتگاه‌ها پیش آمد" },
      { status: 500 }
    );
  }
}
