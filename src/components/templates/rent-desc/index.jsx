"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const RentDesc = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="p-3 xl:px-28 flex flex-col items-center gap-4">
      <h1 className="text-center text-gray-800 text-lg">
        اجاره ویلا،آنلاین و مطمئن در جاجیگا
      </h1>
      <p className="font-[vazirregular] text-sm text-gray-800 text-justify">
        سفر تو خون ما ایرانیهاست و معمولا بهترین خاطرات عمرمون در سفرهامون رقم
        می خوره، به خصوص اگر سفری خانوادگی یا در جمع دوستان بهتر از جان باشه.
        اجاره ویلا در شمال باشه یا اجاره سوئیت در کیش یا سوئیت در اصفهان و
        شیراز، اجاره ویلا استخردار یا کلبه جنگلی یا ویلا ساحلی، اجاره ویلا ارزان
        قیمت یا اجاره ویلا لوکس و لاکچری، هر نوع اقامتگاهی رو که اراده کنید
        {showMore
          ? `
        در هر محدوده قیمتی، می تونید اون رو در سایت جاجیگا بیابید، نظرات مهمانهای قبلی رو مطالعه
          کنید و در نهایت اقامتگاه مطلوبتون رو بصورت آنلاین نزد یکی از صدها میزبان خوش ذوق و با
          انصاف جاجیگا رزرو کنید و مطمئن باشید که تمام تیم جاجیگا رو تا پایان سفر در کنارتون خواهید
          داشت :)`
          : `...`}
      </p>
      {showMore ? null : (
        <button
          className="text-gray-800 flex items-center gap-2 mt-3 w-fit"
          onClick={() => setShowMore(true)}
        >
          <span className="text-sm">مشاهده بیشتر </span>
          <IoIosArrowDown />
        </button>
      )}
    </div>
  );
};

export default RentDesc;
