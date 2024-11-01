import WrapperSection from "@/components/layout/wrapper-section";
import MainSlider from "@/components/modules/MainSlider";
import { excelentresidanceinfo } from "../../../../utils/constants";
import connectDB from "../../../../utils/connectDb";
import Room from "../../../../models/Room";
const SouthResidance = async () => {
  await connectDB();
  const data = await Room.find({
    "address.province.tel_prefix": { $in: ["076", "054", "061", "077"] },
  }).limit(9);
  const totalItems = await Room.countDocuments({
    "address.province.tel_prefix": { $in: ["076", "054", "061", "077"] },
  });

  return (
    <WrapperSection
      title={"اجاره سوئیت و اقامتگاه در جنوب"}
      title_desc={"اقامتگاه های کیش، قشم، بوشهر، بندر عباس و چابهار"}
    >
      <MainSlider
        items={JSON.parse(JSON.stringify(data))}
        excelent_num={totalItems}
        title={"اجاره سوئیت و اقامتگاه در جنوب"}
        q={"south"}
      />
    </WrapperSection>
  );
};

export default SouthResidance;
