import WrapperSection from "@/components/layout/wrapper-section";
import MainSlider from "@/components/modules/MainSlider";
import { excelentresidanceinfo } from "../../../../utils/constants";
import connectDB from "../../../../utils/connectDb";
import Room from "../../../../models/Room";
const TehranResidance = async () => {
  await connectDB();
  const totalItems = await Room.countDocuments({
    "address.province.tel_prefix": { $in: ["021"] },
  });
  const data = await Room.find({
    "address.province.tel_prefix": { $in: ["021"] },
  }).limit(9);

  return (
    <WrapperSection
      title={"اجاره ویلا در تهران"}
      title_desc={"بهترین ویلاهای کردان،دماوند،شهریار و سایر نقاط تهران"}
    >
      <MainSlider
        items={JSON.parse(JSON.stringify(data))}
        excelent_num={totalItems}
        title={"اجاره ویلا در تهران"}
        q={"teh"}
      />
    </WrapperSection>
  );
};

export default TehranResidance;
