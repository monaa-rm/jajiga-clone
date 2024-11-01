import WrapperSection from "@/components/layout/wrapper-section";
import MainSlider from "@/components/modules/MainSlider";
import { excelentresidanceinfo } from "../../../../utils/constants";
import connectDB from "../../../../utils/connectDb";
import Room from "../../../../models/Room";
const EconomicResidance = async () => {
  await connectDB();

  const data = await Room.aggregate([
    {
      $addFields: {
        minPrice: {
          $min: ["$price.holidays", "$price.notHolidays"],
        },
      },
    },
    {
      $match: {
        minPrice: { $lt: 3000000 }, // فیلتر کردن اقامتگاه‌ها با قیمت کمتر از سه میلیون تومان
      },
    },
    {
      $sort: { minPrice: 1 },
    },
    {
      $limit: 9,
    },
  ]);

  // تعداد کل اقامتگاه‌ها با قیمت کمتر از سه میلیون تومان
  const totalItems = await Room.countDocuments({
    $or: [
      { "price.holidays": { $lt: 3000000 } },
      { "price.notHolidays": { $lt: 3000000 } },
    ],
  });

  return (
    <WrapperSection
      title={"اقامتگاه های اقتصادی"}
      title_desc={" اقامتگاه های با کیفیت و نرخ مناسب"}
    >
      <MainSlider
        items={JSON.parse(JSON.stringify(data))}
        excelent_num={totalItems}
        title={"اقامتگاه های اقتصادی"}
        q={"economic"}
      />
    </WrapperSection>
  );
};

export default EconomicResidance;
