import { NextResponse } from "next/server";
import connectDB from "../../../../../utils/connectDb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "../../../../../models/User";
import Room from "../../../../../models/Room";

export async function PATCH(req, { params }) {
  const { residanceId } = params;

  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده" },
      { status: 500 }
    );
  }
  let data;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {data : "not-logged" },
      { status: 200 }
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
    likeNumber: 1,
  });
  if (!room) {
    return NextResponse.json(
      { error: "چنین اقامتگاهی وجود ندارد" },
      { status: 404 }
    );
  }

  const isFavorite = user.liked_residances.includes(residanceId);
  if (!isFavorite) {
    // Add the residanceId to the liked_residances array
    user.liked_residances.push(residanceId);
    data = true;
    room.likeNumber = room.likeNumber + 1;
  } else {
    const favIndex = user.liked_residances.indexOf(residanceId);

    // Remove the residanceId from the liked_residances array
    user.liked_residances.splice(favIndex, 1);
    if (room.likeNumber > 0 || room.likeNumber == 0) {
      room.likeNumber = room.likeNumber - 1;
    }
    data = false;
  }

  try {
    await user.save();
    await room.save();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در ذخیره اطلاعات کاربر پیش آمده" },
      { status: 500 }
    );
  }
}
