import RegionBox from "@/components/elements/filter-boxs/region-box";
import { setShowRegion } from "@/store/slices/filterSlice";
import { useEffect, useState } from "react";

import { TbMapStar } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const RegionFilterSection = () => {
  const regionActive = useSelector(
    (store) => store.filterSlice.regionFilter.active
  );
  const showRegion = useSelector((store) => store.filterSlice.showRegion);
  const regions = useSelector((store) => store.filterSlice.regionFilter.region);
  const asArray = Object.entries(regions);
  const selectedRegions = asArray.filter(([key, value]) => value === true);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#regionFilter")) {
        dispatch(setShowRegion(false));
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showRegion]);
  useEffect(() => {
    if (showRegion) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showRegion]);
  return (
    <>
      <div
        onClick={() => dispatch(setShowRegion(true))}
        className={` hidden xl:flex gap-1 justify-center items-center px-3  sm:px-3 md:px-2 lg:px-1 xl:px-3  py-2 rounded-full 
              border font-[vazirRegular] transition-all
              ${
                regionActive
                  ? "border-yellow-600 bg-yellow-50 hover:bg-yellow-100 "
                  : "border-gray-200 bg-gray-50 hover:bg-gray-200 sm:min-w-min hover:bg-opacity-50"
              }
               duration-300 cursor-pointer text-gray-700 text-xs  `}
      >
        <TbMapStar className="w-4 h-4" />
        {regionActive && selectedRegions.length ? (
          <div className=" text-center text-xs flex gap-1 items-center">
            {selectedRegions.length} منطقه اقامتگاه
          </div>
        ) : (
          <span>منطقه اقامتگاه</span>
        )}
      </div>

      <div
        id="regionFilter"
        className={`absolute hidden lg:block ${
          showRegion
            ? "   lg:block top-96   md:top-12 pb-40 md:pb-0 bg-white"
            : " lg:hidden"
        } transition-all duration-500 right-0 left-0 md:right-[22rem] md:left-auto w-full 
            md:w-[600px] bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl`}
      >
        <RegionBox selectedRegions={selectedRegions} />
      </div>
    </>
  );
};

export default RegionFilterSection;
