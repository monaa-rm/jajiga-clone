import WrapperSection from "@/components/layout/wrapper-section";
import TwoRowsSlider from "@/components/modules/two-rows-slider";
import { popularcities } from "../../../../utils/constants";
import connectDB from "../../../../utils/connectDb";
import Room from "../../../../models/Room";

const PopularCities = async () => {
  let result = [];
  try {
    // اتصال به دیتابیس
    await connectDB();

    // استفاده از aggregation برای گروه‌بندی براساس شهر
    result = await Room.aggregate([
      {
        $match: {
          "address.city.id": {
            $in: [
              8, 903, 127, 188, 864, 1056, 936, 943, 444,
               974, 1052, 966, 920,
              647, 1135, 12, 476, 1059, 1087, 571,
            ],
          },
        }, // شناسه‌های شهرهایی که می‌خواهید
      },
      {
        $group: {
          _id: "$address.city.id",
          count: { $sum: 1 },
        },
      },
    ]);
    
  } catch (error) {
    console.error("Error counting rooms:", error);
  }
  
  return (
    <WrapperSection title="مقاصد پرطرفدار">
      <TwoRowsSlider citiesCount={JSON.parse(JSON.stringify(result))} cities={popularcities} />
    </WrapperSection>
  );
};

export default PopularCities;
