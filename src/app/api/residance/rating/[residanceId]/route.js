import { NextResponse } from "next/server";
import connectDB from "../../../../../../utils/connectDb";
import { getServerSession } from "next-auth";
import User from "../../../../../../models/User";
import Room from "../../../../../../models/Room";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req, { params }) {
  const { residanceId } = params;
  const body = await req.json();
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده" },
      { status: 500 }
    );
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "چنین کاربری وجود ندارد" },
      { status: 404 }
    );
  }
  const user = await User.findOne({ phone: session.user.phone });
  if (!user) {
    return NextResponse.json(
      { error: "چنین کاربری وجود ندارد" },
      { status: 404 }
    );
  }
  const room = await Room.findOne({ _id: residanceId }).select({
    rating: 1,
    rating_number: 1,
  });
  if (!room) {
    return NextResponse.json(
      { error: "چنین اقامتگاهی وجود ندارد" },
      { status: 404 }
    );
  }
  if (!room.rating_number) {
    room.rating_number = [];
  }
  const existingRating = room.rating_number?.find(
    (rate) => rate.userId.toString() === body.userId
  );

  if (existingRating) {
    // ویرایش امتیاز قبلی
 
    if (body.rateNumber == 0) {
      room.rating_number = room.rating_number.filter(
        (item) => item.userId !== existingRating.userId
      );
    } else {
      existingRating.rateNumber = Number(body.rateNumber);
    }
    let sumRate = 0;
    room?.rating_number?.map((item) => (sumRate = sumRate + item?.rateNumber));
    const newRating = sumRate / room?.rating_number.length || 0;
    room.rating = newRating;
  } else {
    // اضافه کردن امتیاز جدید
    const newRating =
      (Number(room.rating) * room.rating_number.length +
        Number(body.rateNumber)) /
        (room.rating_number.length + 1) ?? 0;
    room.rating = newRating;
    room.rating_number.push({
      userId: body.userId,
      rateNumber: Number(body.rateNumber),
    });
  }
  //update
  try {
    room.save();
    return NextResponse.json({ data: "okkk" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در ذخیره اطلاعات کاربر پیش آمده" },
      { status: 500 }
    );
  }
}
