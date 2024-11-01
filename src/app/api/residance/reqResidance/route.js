import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import Room from "../../../../../models/Room";
import connectDB from "../../../../../utils/connectDb";
import Notif from "../../../../../models/Notif";
import { formatPersianDateRange } from "../../../../../utils/filter-funcs";

export async function PATCH(req) {
  try {
    await connectDB();

    const body = await req.json();
    const reservedBy = await User.findOne({ _id: body.reservedBy });
    if (!reservedBy) {
      return NextResponse.json(
        { error: "چنین کاربری وجود ندارد" },
        { status: 404 }
      );
    }
    const goalRoom = await Room.findOne({ _id: body.residanceId });
    if (!goalRoom) {
      return NextResponse.json(
        { error: "چنین اقامتگاهی وجود ندارد" },
        { status: 404 }
      );
    }
    if (goalRoom.instanceReserve == true && goalRoom.isAvalable == true) {
      goalRoom.reservedDays = [
        ...goalRoom.reservedDays,
        {
          reservedBy: body.reservedBy,
          reservedDays: body.reservedDays,
          numberOfGuest: body.numberOfGuest,
          totalCost: body.totalCost,
          acceptMode: "accepted",
        },
      ];
      goalRoom.isAvalable = false;
      goalRoom.pending = false;
      goalRoom.save();
      await Notif.create({
        visibility: "request-accepted",
        text: `درخواست رزرو ${goalRoom?.type_residance.title} در ${
          goalRoom?.address.city.name
        } توسط ${reservedBy.name} ${
          reservedBy.lastName
        } برای تاریخ ${formatPersianDateRange(body.reservedDays)}  برای ${
          body.numberOfGuest
        } نفر ثبت شد.`,
        resId: goalRoom._id,
        senderId: reservedBy._id,
        recieverId: goalRoom.userId,
      });
      return NextResponse.json({ data: "ok instant" }, { status: 200 });
    } else {
      goalRoom.reservedDays = [
        ...goalRoom.reservedDays,
        {
          reservedBy: body.reservedBy,
          reservedDays: body.reservedDays,
          numberOfGuest: body.numberOfGuest,
          acceptMode: "pending",
        },
      ];
      goalRoom.isAvalable = true;
      goalRoom.pending = true;
      goalRoom.save();

      await Notif.create({
        type: "request-pending",
        text: `درخواست رزرو ${goalRoom?.type_residance.title} در ${
          goalRoom?.address.city.name
        } توسط ${reservedBy.name} ${
          reservedBy.lastName
        } برای تاریخ ${formatPersianDateRange(body.reservedDays)}  برای ${
          body.numberOfGuest
        } نفر.`,
        resId: goalRoom?._id,
        senderId: reservedBy?._id,
        recieverId: goalRoom?.userId,
      });
      return NextResponse.json({ data: "ok pending" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}
