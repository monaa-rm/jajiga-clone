"use client"
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { formatNumberToPersian } from "../../../../utils/constants";
import Link from "next/link";

const SearchmapResidanceBox = ({ data }) => {
  return (
    <Link href={`/room/${data._id}`}
      dir="rtl"
      className=" cursor-pointer w-full h-[110] font-[vazirRegular] overflow-hidden  flex justify-start items-center gap-1"
    >
      <div className="w-[100px] h-[100px] relative rounded-2xl">
        <Image
          src={data.images[0]}
          alt="image"
          fill
          className="object-cover  rounded-xl"
        />
      </div>
      <div className=" flex flex-col gap-2 justify-between items-start">
        <h3 className="text-gray-700 text-start line-clamp-1 w-full font-bold">
          اجاره {data.type_residance.title} در {data.address.city.name}
        </h3>
        <div className="flex justify-start gap-0 items-center text-start text-gray-600  text-sm">
          <span className="flex">{data.room} خوابه.</span>
          <span className="flex">{data.area} متر. </span>
          <span className="flex">تا {data.max_capacity} مهمان</span>
          <div className="flex gap-[1px]">
            <FaStar className="w-3 h-3 text-yellow-500" />
            {data.rating}.({data.rating_number.length} نظر)
          </div>
        </div>
        <span className="text-sm text-gray-600 text-start">
          هر شب از {data.price.holidays > data.price.notHolidays ? formatNumberToPersian(data.price.notHolidays) : formatNumberToPersian(data.price.holidays)}{" "}
          تومان
        </span>
      </div>
    </Link>
  );
};

export default SearchmapResidanceBox;
