import { NextResponse } from "next/server";
import Room from "../../../../../../models/Room";
import User from "../../../../../../models/User";
import { authOptions } from "../../../auth/[...nextauth]/route";
import connectDB from "../../../../../../utils/connectDb";
import { getServerSession } from "next-auth";

export async function PATCH(req, { params }) {
  const { resId } = params;
  try {
    await connectDB();

    const body = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "کاربر وجود ندارد" }, { status: 403 });
    }

    const user = await User.findOne({ phone: session.user.phone });
    if (!session) {
      return NextResponse.json({ error: "کاربر وجود ندارد" }, { status: 403 });
    }

    const room = await Room.findOne({ _id: resId }).select({
      discount: 1,
      instanceReserve: 1,
    });
    if (!room) {
      return NextResponse.json(
        { error: "اقامتگاه وجود ندارد" },
        { status: 404 }
      );
    }

    const { searchParams } = req.nextUrl;
    const whatToChange = searchParams.get("whatToChange");
    if (whatToChange == "discount") {
      room.discount = body.discount;
      await room.save();

      return NextResponse.json({ data: "ok" }, { status: 200 });
    }
    if (whatToChange == "instanceReserve") {
      room.instanceReserve = body.instanceReserve;
      await room.save();

      return NextResponse.json({ data: body.instanceReserve }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { resId } = params;
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

    const room = await Room.findOne({ _id: resId, userId: user._id }).select({
      discount: 1,
      instanceReserve: 1,
    });
    if (!room) {
      return NextResponse.json(
        { error: "اقامتگاه وجود ندارد" },
        { status: 404 }
      );
    }

    for (const day of room.reservedDays) {
      await Notif.create({
        type: "answer-rejected",
        text: `درخواست رزرو شما برای ${room?.type_residance.title} در ${
          room?.address.city.name
        } در تاریخ ${day.reservedDays[0]} تا ${
          day.reservedDays[day.reservedDays.length - 1]
        } توسط ${session.user.name} رد شد`,
        resId: null,
        senderId: room.userId,
        recieverId: day.reservedBy,
      });
    }
    await Room.deleteOne({ _id: resId });
    await User.updateOne(
      { _id: user._id },
      { $pull: { liked_residances: resId } }
    );
    return NextResponse.json({ data: "پاک شد" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}
