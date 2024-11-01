import PropertyBox from "@/components/elements/filter-boxs/property-box";
import { setShowProperty } from "@/store/slices/filterSlice";
import { useEffect, useState } from "react";
import {  TbHomeQuestion } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";




const PropertyFilterSection = () => {
  const propertyActive = useSelector(
    (store) => store.filterSlice.propertiesFilter.active
  );
  const properties = useSelector(
    (store) => store.filterSlice.propertiesFilter.properties
  );
  const showProperty = useSelector(
    (store) => store.filterSlice.showProperty
  );
  const dispatch = useDispatch();
  const asArray = Object.entries(properties);
  const selectedProperties =asArray.filter(([key, value]) => value === true);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#propertyFilter")) {
        dispatch(setShowProperty(false));
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showProperty]);
  useEffect(() => {
    if (showProperty) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showProperty]);
  return (
    <>
      <div
              onClick={() =>dispatch(setShowProperty(true))}

        className={` hidden lg:flex gap-2 justify-center items-center px-3 sm:px-3 md:px-2 lg:px-1 xl:px-3  py-2 rounded-full 
              border border-gray-200 bg-gray-50 font-[vazirRegular] transition-all
              ${
                propertyActive
                  ? "border-yellow-600 bg-yellow-50 hover:bg-yellow-100 "
                  : "border-gray-200 bg-gray-50 hover:bg-gray-200 sm:min-w-min hover:bg-opacity-50"
              }
               duration-300 cursor-pointer text-gray-700 text-xs hover:bg-gray-200 hover:bg-opacity-50 `}
      >
        <TbHomeQuestion className="w-4 h-4" />
        
        {propertyActive && selectedProperties.length ? (
          <div className=" text-center text-xs flex gap-1 items-center">
            {selectedProperties.length} ویژگی اقامتگاه
          </div>
        ) : (
          <span>ویژگی اقامتگاه</span>
        )}
      </div>


      <div
        id="propertyFilter"
        className={`absolute hidden lg:block ${
          showProperty
            ? "   lg:block top-96   md:top-12 pb-40 md:pb-0 bg-white"
            : " lg:hidden"
        } transition-all duration-500 right-0 left-0 md:right-24 md:left-auto w-full 
            md:w-[600px] bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl`}
      >
        <PropertyBox  selectedProperties={selectedProperties} />
      </div>
    </>
  );
};

export default PropertyFilterSection;
