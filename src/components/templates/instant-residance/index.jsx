import WrapperSection from "@/components/layout/wrapper-section";
import MainSlider from "@/components/modules/MainSlider";
import { excelentresidanceinfo } from "../../../../utils/constants";
import connectDB from "../../../../utils/connectDb";
import Room from "../../../../models/Room";
const InstantResidance = async () => {
  await connectDB();
  const totalItems = await Room.countDocuments({ instanceReserve: true });
  const data = await Room.find({ instanceReserve: true }).limit(9);
  return (
    <WrapperSection
      title={"اقامتگاه های رزرو فوری"}
      title_desc={"رزرو فوری بدون نیاز به تایید میزبان"}
    >
      <MainSlider
        items={JSON.parse(JSON.stringify(data))}
        excelent_num={totalItems}
        title={"اقامتگاه های رزرو فوری"}
        q={"instant"}
      />
    </WrapperSection>
  );
};

export default InstantResidance;
