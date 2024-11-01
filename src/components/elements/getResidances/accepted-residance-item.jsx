import Image from "next/image";
import { convertToJalali } from "../../../../utils/calendar-funcs";
import { PiCircleNotchThin, PiEyeThin, PiTrashLight } from "react-icons/pi";
import { MdOutlineDoneAll, MdOutlineEdit } from "react-icons/md";
import { IoPowerOutline } from "react-icons/io5";
import { TbDiscount } from "react-icons/tb";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { formatPersianDateRange } from "../../../../utils/filter-funcs";
import AcceptOrReject from "./acceptOrReject";
import { formatNumberToPersian } from "../../../../utils/constants";
import { IoMdClose } from "react-icons/io";
const AcceptedResidanceItem = ({ item }) => {
  const deleteHandler = async (id) => {
    const res = await fetch(`/api/residance/editResidance/${id}?`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status == 200) {
      setItemHidden(true);
      let likedResidances =
      JSON.parse(localStorage.getItem("likedResidances")) || [];
      likedResidances = likedResidances.filter(id => id !== item._id);
      localStorage.setItem('likedResidances', JSON.stringify(likedResidances));

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
              <MdOutlineDoneAll className="w-5 h-5" />
              <span className="text-sm ">تایید شده</span>
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
          className={`w-full p-3 bg-white rounded-tr-2xl rounded-tl-2xl  md:rounded-none md:bg-none flex flex-col gap-1 
         
      `}
        >
          {item?.reservedDays?.map((days, i) => (
            <div
              key={i}
              className={`py-0.5 px-2 rounded-full text-xs text-gray-700 font-[vazirRegular] ${
                days?.acceptMode == "accepted"
                  ? "bg-green-200"
                  : days.acceptMode == "rejected"
                  ? "bg-red-200"
                  : "bg-yellow-200"
              }`}
            >
              رزرو شده توسط{" "}
              {days?.reservedByUser.name + " " + days?.reservedByUser.lastName} برای
              تاریخ{" "}
              {formatPersianDateRange([
                days.reservedDays[0],
                days.reservedDays[days.reservedDays.length - 1],
              ])}{" "}
              برای {days.numberOfGuest} نفر
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcceptedResidanceItem;
