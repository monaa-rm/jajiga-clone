import { NextResponse } from "next/server";
import Room from "../../../../../models/Room";
import connectDB from "../../../../../utils/connectDb";

export async function POST(req) {
  try {
    await connectDB();
    const discountCity = await req.json();
    if (discountCity == "all") {
      const totalItems = await Room.countDocuments({
        discount: { $ne: 0 },
      });
      const data = await Room.find({
        discount: { $ne: 0 },
      }).limit(9);
      return NextResponse.json({ data, totalItems }, { status: 200 });
    } else {
      const totalItems = await Room.countDocuments({
        discount: { $ne: 0 },
        "address.city.id": Number(discountCity),
      });
      const data = await Room.find({
        discount: { $ne: 0 },
        "address.city.id": Number(discountCity),
      }).limit(9);
      return NextResponse.json({ data, totalItems }, { status: 200 });
    }
  } catch (error) {
    console.log("مشکلی در سرور پیش آمده است");
  }
}
