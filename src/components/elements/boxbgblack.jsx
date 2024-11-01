"use client";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Searchbox from "../header/searchbox";
import SearchCityListBox from "../header/searchCityListBox";

const Boxbgblack = () => {
  const showBox = useSelector((store) => store.headerListSlice.showSearchBox);
  const showSearchProvinceList = useSelector(
    (store) => store.headerListSlice.showSearchProvinceList
  );
  return (
    <div
      className={` z-[700] absolute top-0 left-0 right-0    
        ${
        showBox && !showSearchProvinceList && "bottom-full"
      } ${
        showBox || showSearchProvinceList ? "bottom-0" : "bottom-full"
      } transition-all duration-700   bg-black bg-opacity-60 `}
    >
      {showBox ? (
        <div className={`flex md:hidden w-full  `}>
          <Searchbox />
        </div>
      ) : null}
      <SearchCityListBox />
    </div>
  );
};

export default Boxbgblack;
