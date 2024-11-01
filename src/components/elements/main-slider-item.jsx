"use client";
import { formatNumberToPersian } from "../../../utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { MdOutlineElectricBolt } from "react-icons/md";

const MainSliderItem = ({ item, discount }) => {
  const [dragCtrl, setDragCtrl] = useState(false);
  return (
    <div className="p-2 relative">
      <Link
        draggable={false}
        onMouseMove={(e) => {
          e.preventDefault();
          setDragCtrl(true);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          setDragCtrl(false);
        }}
        onClick={(e) => {
          if (dragCtrl) {
            e.preventDefault();
          }
        }}
        href={`/room/${item._id}`}
        className="w-full h-72 rounded-lg "
      >
        {item.instanceReserve === true ? (
          <div
            className={`absolute right-4 top-4 py-[6px] px-3 text-gray-800 flex gap-1 items-center justify-center rounded-full border-yellow-200 bg-yellow-500 `}
          >
            <span className="text-xs">رزرو فوری</span>
            <MdOutlineElectricBolt className="text-xs" />
          </div>
        ) : null}
        <div className="relative  w-full h-48  rounded-lg">
          <Image
            src={item.images[0]}
            alt="description of image"
            fill
            className="object-cover  rounded-lg -z-10 "
            sizes="256px"
          />
          {item.discount === 0 ? (
            <div
              dir="rtl"
              className="text-xs flex gap-1 bg-gray-800 bg-opacity-30
           text-white absolute bottom-1.5 right-0 px-3 py-1 rounded-tl-lg rounded-bl-lg"
            >
              از{" "}
              <span className="text-sm ">
                {item.price.holidays < item.price.notHolidays
                  ? formatNumberToPersian(item.price.holidays)
                  : formatNumberToPersian(item.price.notHolidays)}
              </span>{" "}
              تومان
            </div>
          ) : (
            <div
              dir="rtl"
              className=" bg-gray-800 bg-opacity-40
            text-white absolute bottom-1.5 right-0 px-3 py-1 rounded-tl-lg rounded-bl-lg"
            >
              <div className="flex gap-2 items-center justify-start">
                <div className="text-sm text-gray-300 relative">
                  {item.price.holidays < item.price.notHolidays
                    ? formatNumberToPersian(item.price.holidays)
                    : formatNumberToPersian(item.price.notHolidays)}

                  <div className="transition-all border-gray-300 w-12 -rotate-12 border-t absolute top-2 left-0 right-0 " />
                </div>
                <div
                  dir="rtl"
                  className="bg-red-600 rounded-full px-2 text-xs py-[1px]"
                >
                  {item.discount}%{" "}
                </div>
              </div>
              <div className="flex gap-1 text-xs items-center">
                از
                <span className=" text-xs flex gap-1">
                  {item.price.holidays < item.price.notHolidays
                    ? formatNumberToPersian(
                        item.price.holidays -
                          (item.price.holidays * item.discount) / 100
                      )
                    : formatNumberToPersian(
                        item.price.notHolidays -
                          (item.price.notHolidays * item.discount) / 100
                      )}
                </span>
                تومان
              </div>
            </div>
          )}
        </div>
        <div dir="rtl" className="py-2 flex flex-col gap-2">
          <h2
            className={`${
              discount ? "text-white" : "text-gray-800"
            } line-clamp-1`}
          >
           اجاره {item.type_residance.title} در {item.address.city.name}
          </h2>
          <span
            className={`text-xs ${
              discount ? "text-gray-300" : "text-gray-600"
            } flex gap-1`}
          >
            {item.room} خوابه. {item.area} متر. تا {item.maxCapacity} مهمان{" "}
            <FaStar className="text-yellow-500" /> {4.5} ({58} نظر)
          </span>
        </div>
      </Link>
    </div>
  );
};

export default MainSliderItem;
