"use client"
import { useEffect, useState } from "react";
import CalendarFilterSection from "./filter/calendar-filter-section";
import GuestNumberFilterSection from "./filter/guest-number-filter-section";
import CostFilterSection from "./filter/cost-filter-section";
import BedRoomFilterSection from "./filter/bed-room-filter-section";
import PropertyFilterSection from "./filter/property-filter-section";
import TypeFilterSection from "./filter/type-filter-section";
import RegionFilterSection from "./filter/region-filter-section";
import OtherFilterSection from "./filter/other-filters-section";
import { useDispatch, useSelector } from "react-redux";
import { setEnabled } from "@/store/slices/filterSlice";

const SearchPageFilter = () => {
  const enabled =  useSelector((store) => store.filterSlice.enabled);
const dispatch = useDispatch();
  return (
    <div className="h-14 z-[500] fixed top-16 left-0 right-0 bg-[rgb(243,243,243)] shadow-md border-t border-gray-200 ">
      <div className="flex justify-between items-center gap-3 w-full h-full px-1 sm:px-4 ">
        <div className="  w-full text-sm h-full  flex  gap-1 md:gap-2 lg:gap-1 xl:gap-1   justify-start md:justify-start items-center">
          <CalendarFilterSection />
          <GuestNumberFilterSection />
          <CostFilterSection />
          <BedRoomFilterSection />
          <PropertyFilterSection />
          <TypeFilterSection />
          <RegionFilterSection />
          <OtherFilterSection />
        </div>
        <div className="  h-12 hidden md:flex w-[9rem] min-w-[9rem] justify-end gap-1 items-center ">
          <span className="text-sm text-gray-800">نمایش نقشه</span>
          <div
            dir="ltr"
            className="relative flex flex-col items-center justify-center min-h-[40px] overflow-hidden"
          >
            <div className="flex ">
              <label className="inline-flex relative items-center mr-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={enabled}
                  readOnly
                />
                <div
                  onClick={() => {
                    dispatch(setEnabled(!enabled));
                  }}
                  className="w-[52px] h-7 bg-gray-200 rounded-full peer  peer-focus:ring-blue-500
                    peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border
                     after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-yellow-600"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPageFilter;
