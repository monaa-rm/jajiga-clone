import WrapperSection from "@/components/layout/wrapper-section";
import MainSlider from "@/components/modules/MainSlider";
import { excelentresidanceinfo } from "../../../../utils/constants";
import Room from "../../../../models/Room";
import connectDB from "../../../../utils/connectDb";
const ExcellentResidance = async () => {
  await connectDB();
  const totalItems = await Room.countDocuments({ likeNumber: { $gt: 0 } });
  let data = [];
  try {
    data = await Room.find({ likeNumber: { $gt: 0 } })
      .sort({ likeNumber: -1 }) // مرتب‌سازی بر اساس likeNumber به ترتیب نزولی
      .limit(9); // محدود کردن به 9 اقامتگاه
  } catch (error) {
    console.error("Error fetching top liked rooms:", error);
  }

  return (
    <WrapperSection
      title={"اقامتگاه های ممتاز"}
      title_desc={"گلچینی از اقامتگاه های با کیفیت با میزبان های مهمان نواز"}
    >
      <MainSlider
        items={JSON.parse(JSON.stringify(data))}
        excelent_num={totalItems}
        title={"اقامتگاه های ممتاز"}
        q={"plus"}
      />
    </WrapperSection>
  );
};

export default ExcellentResidance;
