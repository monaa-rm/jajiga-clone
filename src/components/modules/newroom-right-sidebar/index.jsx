"use client";

import {
  setActive,
  setHiddenItems,
  setSideSetting,
} from "@/store/slices/newRoomSlice";
import { useEffect, useState } from "react";
import { PiHourglassLowFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

const NewroomRightSidebar = ({ itemsDetail, showItems, undermdsize }) => {
  const active = useSelector((store) => store.newRoomSlice.activeItem);
  const sideSetting = useSelector((store) => store.newRoomSlice.sideSetting);
  const hiddenItems = useSelector((store) => store.newRoomSlice.hiddenItems);
  const filledItems = useSelector((store) => store.newRoomSlice.filledItems);
  const [canChange, setCanChange] = useState(false);

  const dispatch = useDispatch();
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(setSideSetting(false));
      } else {
        dispatch(setSideSetting(true));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const sidebarHandler = (i) => {
    const itemsCanSelect = itemsDetail[i].name;
    if(filledItems[itemsCanSelect] == true) {
      dispatch(setActive(i));
      if (i > 3) {
        dispatch(setHiddenItems([0, 1, 2, 3]));
      } else {
        dispatch(setHiddenItems([7, 8, 9, 10]));
      }
    }
 
  };

  return (
    <div
      className={`w-full h-[420px] overflow-hidden  shadow-sm md:shadow-zinc-400 rounded-2xl border-none
         md:border md:border-gray-200 pt-0 pb-2  md:py-2 px-4 `}
    >
      <ul className="flex flex-col h-full justify-start items-stretch pr-5">
        {itemsDetail.map((item, i) => (
          <li
            onClick={() => sidebarHandler(i)}
            key={i}
            className={`${hiddenItems.includes(i) ? "hidden" : null} ${
              itemsDetail.length - 1 == i ? "pt-4 pb-0" : "py-4"
            }  
              ${undermdsize && !showItems && active > i ? "hidden " : null}
          border-r-2   cursor-pointer  border-gray-800 pr-6  relative`}
          >
            <div
              className={` absolute -right-[17px] w-8 h-8 rounded-full flex justify-center items-center ${
                active == i
                  ? "bg-gray-800 "
                  : "border-2 border-gray-800 bg-white bg-none"
              }`}
            >
              {active == i ? (
                <PiHourglassLowFill className="text-white w-6 h-6" />
              ) : (
                <span className="text-gray-800">{i + 1}</span>
              )}
            </div>
            <span className={`font-[vazirRegular] text-sm text-gray-700`}>
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewroomRightSidebar;
