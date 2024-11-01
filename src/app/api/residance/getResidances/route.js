import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import Room from "../../../../../models/Room";
import connectDB from "../../../../../utils/connectDb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import jalaali from "jalaali-js";
import moment from "moment-jalaali";
export async function GET(req) {
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

    const { searchParams } = req.nextUrl;
    const activeItem = searchParams.get("activeItem");
    let data = [];
    if (activeItem == "all") {
      data = await Room.find({ userId: user._id });
    }
    if (activeItem == "pending") {

      try {
      

        const rooms = await Room.find({ userId: user._id });
        function normalizeDate(date) {
          const normalizedDate = new Date(date);
          normalizedDate.setHours(0, 0, 0, 0); // تنظیم ساعت، دقیقه، ثانیه و میلی‌ثانیه به 0
          return normalizedDate;
        }

        const convertedRooms = await Promise.all(
          rooms.map(async (room) => {
            room.reservedDays = await Promise.all(
              room.reservedDays.map(async (reservedDay) => {
                const gregorianDays = reservedDay.reservedDays.map((day) => {
                  const [year, month, dayOfMonth] = day.split("/").map(Number);
                  const { gy, gm, gd } = jalaali.toGregorian(
                    year,
                    month,
                    dayOfMonth
                  );
                  return new Date(Date.UTC(gy, gm - 1, gd, 0, 0, 0)); // ماه از 0 شروع می‌شود
                });

                // حذف کل آرایه اگر اولین تاریخ آن قبل از امروز باشد
                if (
                  normalizeDate(gregorianDays[0]) < normalizeDate(new Date())
                ) {
                  return null; // علامت‌گذاری برای حذف
                }

                // دریافت اطلاعات کاربر با استفاده از reservedBy
                const user = await User.findById(reservedDay.reservedBy);
                if (!user) {
                  return null; // اگر کاربر پیدا نشود، این رزرو را نیز نادیده بگیرید
                }

                return {
                  ...reservedDay,
                  reservedDaysConverted: gregorianDays,
                  reservedByUser: {
                    name: user.name,
                    lastName: user.lastName,
                    phone: user.phone,
                    // سایر اطلاعات مورد نیاز از کاربر
                  },
                };
              })
            );

            // حذف آرایه‌های ناخواسته
            room.reservedDays = room.reservedDays.filter(
              (reservedDay) => reservedDay !== null
            );

            return room;
          })
        );
        const filteredRooms = convertedRooms.filter(
          (room) => room.reservedDays.length > 0
        );
        // فیلتر و مرتب‌سازی تاریخ‌ها
        data = filteredRooms
          .map((room) => {
            room.reservedDays = room.reservedDays
              .filter((reservedDay) => reservedDay.acceptMode === "pending")
              .map((reservedDay) => ({
                ...reservedDay,
                nearestDate: reservedDay.reservedDaysConverted.find(
                  (date) => date >= new Date()
                ),
              }))
              .filter((reservedDay) => reservedDay.nearestDate) // حذف مواردی که nearestDate برابر با null است
              .sort((a, b) => a.nearestDate - b.nearestDate);

            return room;
          })
          .filter((room) => room.reservedDays.length > 0);

        return NextResponse.json({ data }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
      }

    }
    if (activeItem == "accepted") {

      try {
      

        const rooms = await Room.find({ userId: user._id });
        function normalizeDate(date) {
          const normalizedDate = new Date(date);
          normalizedDate.setHours(0, 0, 0, 0); // تنظیم ساعت، دقیقه، ثانیه و میلی‌ثانیه به 0
          return normalizedDate;
        }

        const convertedRooms = await Promise.all(
          rooms.map(async (room) => {
            room.reservedDays = await Promise.all(
              room.reservedDays.map(async (reservedDay) => {
                const gregorianDays = reservedDay.reservedDays.map((day) => {
                  const [year, month, dayOfMonth] = day.split("/").map(Number);
                  const { gy, gm, gd } = jalaali.toGregorian(
                    year,
                    month,
                    dayOfMonth
                  );
                  return new Date(Date.UTC(gy, gm - 1, gd, 0, 0, 0)); // ماه از 0 شروع می‌شود
                });

                // حذف کل آرایه اگر اولین تاریخ آن قبل از امروز باشد
                if (
                  normalizeDate(gregorianDays[0]) < normalizeDate(new Date())
                ) {
                  return null; // علامت‌گذاری برای حذف
                }

                // دریافت اطلاعات کاربر با استفاده از reservedBy
                const user = await User.findById(reservedDay.reservedBy);
                if (!user) {
                  return null; // اگر کاربر پیدا نشود، این رزرو را نیز نادیده بگیرید
                }

                return {
                  ...reservedDay,
                  reservedDaysConverted: gregorianDays,
                  reservedByUser: {
                    name: user.name,
                    lastName: user.lastName,
                    phone: user.phone,
                    // سایر اطلاعات مورد نیاز از کاربر
                  },
                };
              })
            );

            // حذف آرایه‌های ناخواسته
            room.reservedDays = room.reservedDays.filter(
              (reservedDay) => reservedDay !== null
            );

            return room;
          })
        );
        const filteredRooms = convertedRooms.filter(
          (room) => room.reservedDays.length > 0
        );
        // فیلتر و مرتب‌سازی تاریخ‌ها
        data = filteredRooms
          .map((room) => {
            room.reservedDays = room.reservedDays
              .filter((reservedDay) => reservedDay.acceptMode === "accepted")
              .map((reservedDay) => ({
                ...reservedDay,
                nearestDate: reservedDay.reservedDaysConverted.find(
                  (date) => date >= new Date()
                ),
              }))
              .filter((reservedDay) => reservedDay.nearestDate) // حذف مواردی که nearestDate برابر با null است
              .sort((a, b) => a.nearestDate - b.nearestDate);

            return room;
          })
          .filter((room) => room.reservedDays.length > 0);

        return NextResponse.json({ data }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
      }

    }
    if (activeItem == "rejected") {

      try {
      

        const rooms = await Room.find({ userId: user._id });
        function normalizeDate(date) {
          const normalizedDate = new Date(date);
          normalizedDate.setHours(0, 0, 0, 0); // تنظیم ساعت، دقیقه، ثانیه و میلی‌ثانیه به 0
          return normalizedDate;
        }

        const convertedRooms = await Promise.all(
          rooms.map(async (room) => {
            room.reservedDays = await Promise.all(
              room.reservedDays.map(async (reservedDay) => {
                const gregorianDays = reservedDay.reservedDays.map((day) => {
                  const [year, month, dayOfMonth] = day.split("/").map(Number);
                  const { gy, gm, gd } = jalaali.toGregorian(
                    year,
                    month,
                    dayOfMonth
                  );
                  return new Date(Date.UTC(gy, gm - 1, gd, 0, 0, 0)); // ماه از 0 شروع می‌شود
                });

                // حذف کل آرایه اگر اولین تاریخ آن قبل از امروز باشد
                if (
                  normalizeDate(gregorianDays[0]) < normalizeDate(new Date())
                ) {
                  return null; // علامت‌گذاری برای حذف
                }

                // دریافت اطلاعات کاربر با استفاده از reservedBy
                const user = await User.findById(reservedDay.reservedBy);
                if (!user) {
                  return null; // اگر کاربر پیدا نشود، این رزرو را نیز نادیده بگیرید
                }

                return {
                  ...reservedDay,
                  reservedDaysConverted: gregorianDays,
                  reservedByUser: {
                    name: user.name,
                    lastName: user.lastName,
                    phone: user.phone,
                    // سایر اطلاعات مورد نیاز از کاربر
                  },
                };
              })
            );

            // حذف آرایه‌های ناخواسته
            room.reservedDays = room.reservedDays.filter(
              (reservedDay) => reservedDay !== null
            );

            return room;
          })
        );
        const filteredRooms = convertedRooms.filter(
          (room) => room.reservedDays.length > 0
        );
        // فیلتر و مرتب‌سازی تاریخ‌ها
        data = filteredRooms
          .map((room) => {
            room.reservedDays = room.reservedDays
              .filter((reservedDay) => reservedDay.acceptMode === "rejected")
              .map((reservedDay) => ({
                ...reservedDay,
                nearestDate: reservedDay.reservedDaysConverted.find(
                  (date) => date >= new Date()
                ),
              }))
              .filter((reservedDay) => reservedDay.nearestDate) // حذف مواردی که nearestDate برابر با null است
              .sort((a, b) => a.nearestDate - b.nearestDate);

            return room;
          })
          .filter((room) => room.reservedDays.length > 0);

        return NextResponse.json({ data }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
      }

    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}
