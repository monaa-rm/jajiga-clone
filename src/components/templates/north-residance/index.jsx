import WrapperSection from "@/components/layout/wrapper-section"
import MainSlider from "@/components/modules/MainSlider"
import { excelentresidanceinfo } from "../../../../utils/constants"
import connectDB from "../../../../utils/connectDb"
import Room from "../../../../models/Room"
const NorthResidance = async () => {
await connectDB();
const totalItems = await Room.countDocuments({"address.province.tel_prefix": { $in: ["013", "011", "017"] }});
const data = await Room.find({
  "address.province.tel_prefix": { $in: ["013", "011", "017"] }
}).limit(9);

  return (
<WrapperSection title={"اجاره ویلا شمال"} title_desc={"بهترین ویلاهای گیلان،مازندران و گلستان"}>
    <MainSlider  items={JSON.parse(JSON.stringify(data))} excelent_num={totalItems}  title={"اجاره ویلا شمال"} q={"north"} />
</WrapperSection>
    
  )
}

export default NorthResidance
