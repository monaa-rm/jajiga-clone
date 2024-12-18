"use client";

import Endbutton from "@/components/elements/newroom/endbutton";
import NewroomRightSidebar from "@/components/modules/newroom-right-sidebar";
import NewroomMain from "@/components/modules/newroom/newroom-main";
import {
  setActive,
  setHiddenItems,
  setSideSetting,
} from "@/store/slices/newRoomSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
const itemsDetail = [
  { name: "address", title: "آدرس" },
  { name: "map", title: "نقشه" },
  { name: "images", title: "تصاویر اقامتگاه" },
  { name: "about", title: "درباره اقامتگاه" },
  { name: "area", title: "فضای اقامتگاه" },
  { name: "capacity", title: "ظرفیت اقامتگاه" },
  { name: "bedroom", title: "فضای خواب" },
  { name: "options", title: "امکانات" },
  { name: "checktime", title: "ساعت تحویل و تخلیه" },
  { name: "price", title: "اجاره بها" },
  { name: "rules", title: "مقررات اقامتگاه" },
];
const NewRoomPage = () => {
  const activeItem = useSelector((store) => store.newRoomSlice.activeItem);
  const sideSetting = useSelector((store) => store.newRoomSlice.sideSetting);
  const hiddenItems = useSelector((store) => store.newRoomSlice.hiddenItems);
  const filledItems = useSelector((store) => store.newRoomSlice.filledItems);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const showSearchProvinceList = useSelector(
    (store) => store.headerListSlice.showSearchProvinceList
  );
  const dispatch = useDispatch();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(setSideSetting(false));
      } else {
        dispatch(setSideSetting(true));
      }
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const currentDetail = itemsDetail[activeItem].name;
    if (filledItems[currentDetail] === false) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
  }, [activeItem, filledItems]);

  const handleButtonClick = (action) => {
    if (!isButtonClicked) {
      setIsButtonClicked(true);

      action();
      setTimeout(() => setIsButtonClicked(false), 500); // Adjust the timeout as needed
    }
  };

  const nextSidebarItem = () => {
    if (activeItem < 11) {
      if (activeItem > 3) {
        dispatch(setHiddenItems([0, 1, 2, 3]));
      } else {
        dispatch(setHiddenItems([7, 8, 9, 10]));
      }
      dispatch(setActive(+activeItem + 1));
    }
  };

  const prevSidebarItem = () => {
    if (activeItem > 0) {
      if (activeItem > 4) {
        dispatch(setHiddenItems([0, 1, 2, 3]));
      } else {
        dispatch(setHiddenItems([7, 8, 9, 10]));
      }
      dispatch(setActive(+activeItem - 1));
    }
  };

  return (
    <div className="w-full min-h-full">
      <div
        className={`w-full hidden md:flex h-28 md:h-full absolute z-0 md:static left-0 right-0 bottom-0 top-[64px]
           cursor-pointer md:cursor-default newroom_bg justify-start items-center px-4 lg:px-28 py-8`}
      >
        <div className={`flex justify-start items-center gap-1 text-gray-800 `}>
          <Link href={"/"}>جاجیگا</Link>
          <FaAngleLeft className="w-3 h-3" />
          <span className="text-lg font-bold">ثبت اقامتگاه</span>
        </div>
      </div>
      <div
        onClick={() => setShowItems(!showItems)}
        className={`w-full flex md:hidden h-[420px] absolute z-0 left-0 right-0 bottom-0 top-[64px]
           cursor-pointer newroom_bg justify-start items-center px-4 lg:px-28 py-8`}
      >
        <div
          className={`md:hidden transition-all duration-500 absolute ${
            showItems ? "rotate-180 top-[350px]" : "rotate-0 top-5"
          } left-5 w-8 h-8 rounded-full bg-[rgb(236,198,6)] flex justify-center items-center`}
        >
          <FaAngleDown className="text-gray-800" />
        </div>
        <div className={`flex justify-start items-center gap-1 text-gray-800 `}>
          <NewroomRightSidebar
            itemsDetail={itemsDetail}
            showItems={showItems}
            undermdsize={true}
          />
        </div>
      </div>
      <div
        className={`md:p-4 absolute lg:px-28 md:static left-0 right-0 bottom-0 ${
          showItems ? "top-[468px]" : "top-[140px]"
        } md:top-[176px] bg-white -mt-3 rounded-tr-2xl rounded-tl-2xl transition-all duration-500`}
      >
        <div className="w-full flex justify-between items-start gap-3 relative">
          <div className="sticky hidden md:flex top-[80px] w-1/3 lg:w-1/4">
            <NewroomRightSidebar itemsDetail={itemsDetail} />
          </div>
          <div
            className={`w-full md:w-2/3 lg:w-3/4 bg-white pb-[250px] rounded-tr-2xl rounded-tl-2xl`}
          >
            <NewroomMain />
          </div>
        </div>
      </div>
      {showSearchProvinceList ? null : (
        <div className="">
          <div
            className="z-[710] md:z-[1000] fixed bottomboxStyle left-1/2 -translate-x-1/2 text-sm
          flex justify-center items-center pb-4"
          >
            <div className="rounded-lg bg-black bg-opacity-60  p-3 w-[300px] sm:w-[400px] flex justify-between items-center ">
              <button
                onClick={() => {
                  handleButtonClick(prevSidebarItem);
                }}
                type="button"
                disabled={activeItem == 0}
                className={`w-24 h-8 rounded-lg flex justify-center items-center bg-zinc-100
           hover:bg-zinc-200 transition-all duration-300 disabled:text-[rgb(51,51,51)] disabled:bg-opacity-50 ${
             activeItem == 0 ? "cursor-not-allowed" : "cursor-pointer"
           }`}
              >
                قبلی
              </button>
              {activeItem != 10 ? (
                <button
                  onClick={() => handleButtonClick(nextSidebarItem)}
                  type="button"
                  disabled={nextDisabled}
                  className={`w-24 h-8 rounded-lg flex justify-center items-center
             bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 disabled:cursor-not-allowed 
             disabled:bg-opacity-50 disabled:text-[rgb(51,51,51)] cursor-pointer`}
                >
                  بعدی
                </button>
              ) : (
                <Endbutton />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewRoomPage;
