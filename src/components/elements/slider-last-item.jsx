"use client";
import {
  setSelectedAlLCities,
  setSelectedCities,
} from "@/store/slices/headerListSlice";
import { formatNumberToPersian } from "../../../utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaAngleLeft, FaArrowLeft, FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {
  costActive,
  propertiesActive,
  setCost,
  setProperties,
  setSendBounds,
} from "@/store/slices/filterSlice";
import { citiesList } from "../../../utils/cities";

const SliderLastItem = ({ item, excelent_num, title, q , i }) => {
  const [dragCtrl, setDragCtrl] = useState(false);
  const dispatch = useDispatch();
  const clickHandler = (e) => {
    if (dragCtrl) {
      return e.preventDefault();
    } else {
      if (q == "north") {
        citiesList.map((city) => {
          if (
            city.province_id == 24 ||
            city.province_id == 26 ||
            city.province_id == 27
          ) {
            dispatch(setSelectedCities(city));
            dispatch(setSendBounds(false));
          }
        });
      } else if (q == "south") {
        dispatch(setSelectedCities(1056));
        dispatch(setSelectedCities(1052));
        dispatch(setSelectedCities(1035));
        dispatch(setSelectedCities(272));
        dispatch(setSelectedCities(571));
        dispatch(setSendBounds(false));
      } else if (q == "teh") {
        citiesList.map((city) => {
          if (city.province_id == 8) {
            dispatch(setSelectedCities(city));
            dispatch(setSendBounds(false));
          }
        });
      } else if (q == "economic") {
        dispatch(setCost([0, 3000000]));
        dispatch(costActive(true));
      } else if (q == "luxury") {
        dispatch(setProperties("luxury"));
        dispatch(propertiesActive(true));
      } else if (q == "instant") {
        dispatch(setProperties("instant"));
        dispatch(propertiesActive(true));
      }
    }
  };
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
        onClick={(e) => clickHandler(e)}
        href={`/s`}
        className="w-full h-72 rounded-lg "
      >
        <div className="relative  w-full h-48  rounded-lg">
          <Image
            src={item.images[0]}
            alt="description of image"
            fill
            className="object-cover  rounded-lg -z-10 "
            sizes="256px"
          />
          <div
            dir="rtl"
            className=" flex flex-col items-center justify-center gap-3
           text-white absolute top-0 right-0 bottom-0 left-0 backdrop-blur-sm overflow-hidden rounded-lg "
          >
            <h2 className="">{title}</h2>
            <div className=" flex items-center gap-2 py-2 text-gray-800 px-3 rounded-full bg-yellow-500">
              <span className="text-sm">
                {formatNumberToPersian(excelent_num)} اقامتگاه
              </span>

              <FaAngleLeft className="text-xs" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SliderLastItem;
