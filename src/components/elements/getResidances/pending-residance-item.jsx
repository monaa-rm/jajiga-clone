import Image from "next/image";
import { convertToJalali } from "../../../../utils/calendar-funcs";
import { PiCircleNotchThin, PiEyeThin, PiTrashLight } from "react-icons/pi";
import { MdOutlineEdit } from "react-icons/md";
import { IoPowerOutline } from "react-icons/io5";
import { TbDiscount } from "react-icons/tb";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { formatPersianDateRange } from "../../../../utils/filter-funcs";
import AcceptOrReject from "./acceptOrReject";
const PendingResidanceItem = ({ item, setActiveItem, setIsSearching }) => {
  const [openReq, setOpenReq] = useState(false);
  const deleteHandler = async (id) => {
    const res = await fetch(`/api/residance/editResidance/${id}?`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status == 200) {
      setItemHidden(true);
      let likedResidances =
        JSON.parse(localStorage.getItem("likedResidances")) || [];
      likedResidances = likedResidances.filter((id) => id !== item._id);
      localStorage.setItem("likedResidances", JSON.stringify(likedResidances));
    }
  };
  return (
    <div className={`w-full flex justify-center pt-8 `}>
      <div className="w-full   shadow-md  rounded-2xl relative overflow-hidden  pb-3">
        <div className="w-full h-48 relative rounded-tr-2xl rounded-tl-2xl ">
          <Image
            src={item.images[0]}
            fill
            alt="image"
            className="object-cover rounded-tr-2xl rounded-tl-2xl "
          />
          {item.pending ? (
            <div
              className={`absolute top-5 right-0 bg-white bg-opacity-60 px-2 py-1 rounded-tl-full rounded-bl-full text-gray-700 flex items-center justify-normal gap-2 `}
            >
              <PiCircleNotchThin className="w-5 h-5" />
              <span className="text-sm ">در انتظار بررسی</span>
            </div>
          ) : null}
          <div className="absolute font-[vazirRegular] bottom-0 w-full text-white py-1 px-3 bg-black bg-opacity-60 rounded-tr-2xl rounded-tl-2xl">
            {item.type_residance.title} در {item.address.city.name}
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-2 pt-3 px-3 ">
          <Link
            href={`/room/${item._id}`}
            className="flex outline-none w-32  justify-center items-center px-3 py-1 gap-1 text-gray-600 font-[vazirRegular]  rounded-lg bg-gray-200 hover:bg-gray-300 transition-all duration-300"
          >
            <PiEyeThin className="w-4 h-4" />
            <span className="text-sm">مشاهده</span>
          </Link>
          <button
            onClick={() => deleteHandler(item._id)}
            type="button"
            className="flex outline-none w-32  justify-center items-center px-3 py-1 rounded-lg gap-1 text-gray-600 font-[vazirRegular]  bg-gray-200 hover:bg-gray-300 transition-all duration-300"
          >
            <PiTrashLight className="w-4 h-4" />
            <span className="text-sm">حذف</span>
          </button>
        </div>
        <div
          className={` flex flex-col gap-3  py-2 px-3 overflow-hidden transition-all duration-300 pb-3  ${
            openReq ? " h-auto" : " h-10"
          }`}
        >
          <div
            onClick={() => setOpenReq(!openReq)}
            className={`flex justify-between items-center cursor-pointer gap-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 py-1 px-2`}
          >
            <span className=" text-gray-700">درخواست ها</span>
            <FaChevronDown
              className={`w-5 h-5 text-gray-700 ${
                openReq ? "rotate-180" : "rotate-0"
              } transition-all duration-300 `}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p
              className="text-xs text-justify text-gray-400 font-[vazirRegular] px-1 py-0.5 bg-yellow-50 rounded-lg "
              dir="rtl"
            >
              در صورت تداخل تاریخ ها،اگر درخواست رزرو یک نفر را قبول کنید به
              صورت خودکار سایر درخواست هایی که با این تاریخ تداخل داشتند رد
              میشوند.{" "}
            </p>
            {item && openReq
              ? item?.reservedDays.map((reserve, i) => (
                  <AcceptOrReject
                    key={i}
                    reserve={reserve}
                    setActiveItem={setActiveItem}
                    setIsSearching={setIsSearching}
                    id={item._id}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingResidanceItem;
