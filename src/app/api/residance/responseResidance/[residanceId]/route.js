import { NextResponse } from "next/server";
import connectDB from "../../../../../../utils/connectDb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "../../../../../../models/User";
import Room from "../../../../../../models/Room";
import Notif from "../../../../../../models/Notif";

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
  const body = await req.json();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "چنین کاربری وجود ندارد" },
      { status: 404 }
    );
  }
  const user = await User.findOne({ _id: body.reservedBy });
  if (!user) {
    return NextResponse.json(
      { error: "چنین کاربری وجود ندارد" },
      { status: 404 }
    );
  }
  const room = await Room.findOneAndUpdate(
    {
      _id: residanceId,
      reservedDays: {
        $elemMatch: {
          reservedBy: body.reservedBy,
          "reservedDays.0": body.firstReservedDate,
          // $expr: {
          //   $eq: [
          //     { $arrayElemAt: ["$reservedDays.reservedDays", -1] }, // دسترسی به آخرین عنصر reservedDays
          //     body.lastReservedDate,
          //   ],
          // },
          acceptMode: "pending",
        },
      },
    },
    {
      $set: { "reservedDays.$.acceptMode": body.statusres }, // به‌روزرسانی acceptMode
    },
    {
      new: true,
    }
  );

  if (!room) {
    return NextResponse.json(
      { error: "چنین اقامتگاهی با این شرایط وجود ندارد" },
      { status: 404 }
    );
  }
  body.statusres == "accepted"
    ? await Notif.create({
        type: "answer-accepted",
        text: `درخواست رزرو شما برای ${room?.type_residance.title} در ${room?.address.city.name} در تاریخ ${body.firstReservedDate} تا ${body.lastReservedDate} توسط ${session.user.name} پذیرفته شد`,
        resId: residanceId,
        senderId: room.userId,
        recieverId: body.reservedBy,
      })
    : await Notif.create({
        type: "answer-rejected",
        text: `درخواست رزرو شما برای ${room?.type_residance.title} در ${room?.address.city.name} در تاریخ ${body.firstReservedDate} تا ${body.lastReservedDate} توسط ${session.user.name} رد شد`,
        resId: residanceId,
        senderId: room.userId,
        recieverId: body.reservedBy,
      });
  if (body.statusres === "accepted") {
    const docsToUpdate = await Room.findOne({ _id: residanceId });

    // از یک آرایه برای ذخیره روزهای به‌روز‌شده استفاده کنید
    const updatedReservedDays = [];
    // یک لوپ async/await با for...of اضافه کنید
    for (const day of docsToUpdate.reservedDays) {
      if (
        day.acceptMode === "pending" &&
        (day.reservedDays.includes(body.firstReservedDate) ||
          day.reservedDays.includes(body.lastReservedDate) ||
          (day.reservedDays.includes(body.firstReservedDate) &&
            day.reservedDays.includes(body.lastReservedDate)) ||
   
          (body.allReserveDays.includes(day.reservedDays[0]) &&
            body.allReserveDays.includes(
              day.reservedDays[day.reservedDays.length - 1]
            ))) &&

        day.reservedDays[0] !== body.lastReservedDate &&
        day.reservedDays[day.reservedDays.length - 1] !== body.firstReservedDate
      ) {
        await Notif.create({
          type: "answer-rejected",
          text: `درخواست رزرو شما برای ${room?.type_residance.title} در ${
            room?.address.city.name
          } در تاریخ ${day.reservedDays[0]} تا ${
            day.reservedDays[day.reservedDays.length - 1]
          } توسط ${session.user.name} رد شد`,
          resId: residanceId,
          senderId: room.userId,
          recieverId: body.reservedBy,
        });
        updatedReservedDays.push({
          ...day,
          acceptMode: "rejected",
        });
      } else {
        updatedReservedDays.push(day);
      }
    }

    await Room.updateOne(
      { _id: residanceId },
      { $set: { reservedDays: updatedReservedDays } }
    );
  }
  return  NextResponse.json(
    { message: `درخواست رزرو با موفقیت به ${body.status} تغییر یافت` },
    { status: 200 }
  );
}
