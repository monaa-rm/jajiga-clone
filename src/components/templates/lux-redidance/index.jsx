import WrapperSection from "@/components/layout/wrapper-section";
import MainSlider from "@/components/modules/MainSlider";
import { excelentresidanceinfo } from "../../../../utils/constants";
import connectDB from "../../../../utils/connectDb";
import Room from "../../../../models/Room";
const LuxResidance = async () => {
  await connectDB();
  const totalItems = await Room.countDocuments({
    options: { $elemMatch: { name: "pool", hasIt: true } },
  });
  const data = await Room.find({
    options: { $elemMatch: { name: "pool", hasIt: true } },
  }).limit(9);

  return (
    <WrapperSection
      title={"ویلاهای لوکس و مجلل"}
      rounded={true}
      title_desc={"ویلا های لوکس و لاکچری برای مشکل پسند ها"}
    >
      <MainSlider
        items={JSON.parse(JSON.stringify(data))}
        excelent_num={totalItems}
        title={"ویلاهای لوکس و مجلل"}
        q={"luxury"}
      />
    </WrapperSection>
  );
};

export default LuxResidance;
