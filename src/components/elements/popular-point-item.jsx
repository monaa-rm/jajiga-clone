"use client";
import { setSendBounds } from "@/store/slices/filterSlice";
import { setSelectedCities } from "@/store/slices/headerListSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

const PopularPointItem = ({ city, citiesCount }) => {
  const [dragCtrl, setDragCtrl] = useState(false);
  const dispatch = useDispatch();
  const cityFound = citiesCount.find((item) => item._id == city.id);
  const cityCount = cityFound?.count ?? 0;
  return (
    <div className="p-0.5 sm:p-1 ">
      <Link
        href={`/s`}
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
          dispatch(setSelectedCities(city));
          dispatch(setSendBounds(false));
        }}
        className=" flex items-center gap-1 lg:gap-2 w-full"
        dir="rtl"
      >
        <div className="w-16 h-16 lg:w-36 lg:h-36 relative rounded-2xl">
          <Image
            src={city.image}
            alt={city.name}
            fill
            sizes="256px"
            className="object-cover rounded-2xl"
          />
        </div>
        <div>
          <span className="text-xs text-nowrap hidden sm:block text-gray-700">
            اجاره سوئیت در
          </span>
          <h4 className="text-gray-800">{city.name}</h4>
          <span className="text-xs text-gray-700">{cityCount} اقامتگاه</span>
        </div>
      </Link>
    </div>
  );
};

export default PopularPointItem;
