"use client";

import SearchResidanceBox from "@/components/elements/search-residance-box";
import { useEffect, useState } from "react";
import { BsSortDown } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { sorts } from "../../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSortTitle } from "@/store/slices/filterSlice";

const SearchPageResidance = ({
  liked_items,
  searchedData,
  minPrice,
  totalRooms,
}) => {
  const sortTitle = useSelector((store) => store.filterSlice.sortTitle);
  const dispatch = useDispatch();
 
  const [showSortBox, setShowSortBox] = useState(false);
  useEffect(() => {
    if (showSortBox && window.innerWidth < 768) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showSortBox]);

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#sortBox")) {
        setShowSortBox(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showSortBox]);
  return (
    <div className=" w-full p-4 bg-zinc-100 md:bg-white" dir="rtl">
      <div
        className={`${
          showSortBox
            ? "fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60"
            : "bg-none bg-opacity-0 top-full right-auto left-auto "
        } transition-all z-[2000] duration-500 md:hidden`}
      ></div>
      <div className="flex justify-start items-center gap-3 text-gray-800 py-5 ">
        <h1>اجاره ویلا</h1>
        <IoShareSocialOutline className="w-6 h-6 " />
      </div>
      {searchedData?.length ? (
        <>
          {" "}
          <div className=" flex justify-between items-center gap-3 text-gray-800 py-5 ">
            <span className="text-gray-700">
              {totalRooms} اقامتگاه از {minPrice}{" "}
              <span className="text-sm">تومان</span>
            </span>
            <div className="relative">
              <div>
                <div
                  onClick={() => setShowSortBox(true)}
                  className=" text-gray-800  bg-white cursor-pointer px-2 py-1 border border-gray-200
             rounded-lg flex justify-center items-center gap-2"
                >
                  <BsSortDown className="w-4 h-4" />
                  <span className="text-sm">{sortTitle.title}</span>
                </div>
              </div>

              <div
                id="sortBox"
                className={` ${
                  showSortBox
                    ? " sortTop  pb-10 md:pb-0 md:top-[102%] left-0 right-0 md:right-auto"
                    : "top-full md:top-auto md:hidden  left-0 right-0 md:right-auto"
                } fixed md:absolute  h-[250px] bg-white font-[vazirRegular] w-full  md:w-44 z-[2001] border border-gray-200 
                    rounded-lg shadow-lg transition-all duration-500`}
              >
                {sorts.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      dispatch(setSortTitle(item));
                      setShowSortBox(false);
                    }}
                    className={`flex justify-start items-center gap-3 border-b px-2 py-3`}
                  >
                    <div
                      className={`w-5 h-5 cursor-pointer rounded-full border border-r-gray-200 hover:border-gray-400
               transition-all duration-300 flex justify-center items-center `}
                    >
                      {item.link == sortTitle.link ? (
                        <div className="w-3 h-3 rounded-full bg-gray-950"></div>
                      ) : null}
                    </div>
                    <span className="cursor-pointer text-gray-700">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SearchResidanceBox
            liked_items={liked_items}
            searchedData={searchedData}
          />
        </>
      ) : (
        <div className="px-4 font-[vazirRegular]  flex flex-col gap-3 justify-start items-start text-gray-700">
          <h1 className="font-bold text-xl">نتیجه ای یافت نشد</h1>
          <span className="text-sm ">
            بهتر است جستجوی خود را تغییر دهید.برای مثال:
          </span>
          <ul className="list-disc text-sm list-inside">
            <li>فیلتر هایی را حذف کنید</li>
            <li>مکان دیگری را جستجو کنید</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPageResidance;
