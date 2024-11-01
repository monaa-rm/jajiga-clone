import WrapperSection from "@/components/layout/wrapper-section";
import FastSearchSlider from "@/components/modules/fast-search-sliders";
import connectDB from "../../../../utils/connectDb";
import Room from "../../../../models/Room";

const FastSearchs = async () => {
  let result = [];
  try {
    // اتصال به دیتابیس
    await connectDB();

    // استفاده از aggregation برای شمارش اقامتگاه‌ها بر اساس نوع
    result = await Room.aggregate([
      {
        $match: {
          "type_residance.name": { $in: ["cottage", "ruralhome"] },
        },
      },
      {
        $group: {
          _id: "$type_residance.name",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // حذف فیلد _id
          name: "$_id", // اختصاص دادن مقدار _id (که نوع اقامت است) به فیلد name
          count: 1, // فیلد count را حفظ کنید
        },
      },
    ]);

    const petFriendlyCount =
      (await Room.countDocuments({
        "rules.pet": true,
      })) ?? 0;
    result.push({ name: "pet", count: petFriendlyCount });

    const disabledPeopleCount =
      (await Room.countDocuments({
        disabledPeople: true,
      })) ?? 0;
    result.push({ name: "disabled", count: disabledPeopleCount });

    const seaCount =
      (await Room.countDocuments({
        "region.name": "beach",
      })) ?? 0;
    result.push({ name: "villa_sea", count: seaCount });
    const scenicCount =
      (await Room.countDocuments({
        "region.name": { $in: ["beach", "ruralhome"] },
      })) ?? 0;
    result.push({ name: "scenic", count: scenicCount });
    const countWithPool = await Room.countDocuments({
      "options": {
        $elemMatch: {
          name: "pool",
          hasIt: true
        }
      }
    }) ?? 0;
    result.push({ name: "pool", count: countWithPool });

  } catch (error) {
    console.error("Error counting rooms:", error);
  }

  return (
    <WrapperSection title="جستجوی سریع">
      <FastSearchSlider ItemsCount={JSON.parse(JSON.stringify(result))} />
    </WrapperSection>
  );
};

export default FastSearchs;
