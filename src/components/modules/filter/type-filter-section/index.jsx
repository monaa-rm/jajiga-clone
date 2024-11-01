import TypeBox from "@/components/elements/filter-boxs/type-box";
import { setShowType } from "@/store/slices/filterSlice";
import { useEffect, useState } from "react";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const TypeFilterSection = () => {
  const typeActive = useSelector(
    (store) => store.filterSlice.typeFilter.active
  );
  const allTypes = useSelector((store) => store.filterSlice.typeFilter.type);
  const showType = useSelector((store) => store.filterSlice.showType);
  const dispatch = useDispatch();
  const asArray = Object.entries(allTypes);
  const selectedTypes = asArray.filter(([key, value]) => value === true);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#typeFilter")) {
        dispatch(setShowType(false));
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showType]);
  useEffect(() => {
    if (showType) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showType]);
  return (
    <>
      <div
        onClick={() => dispatch(setShowType(true))}
        className={` hidden lg:flex gap-1 justify-center items-center px-3 sm:px-3 md:px-2 lg:px-1 xl:px-3  py-2 rounded-full 
              border font-[vazirRegular] transition-all
                ${
                  typeActive
                    ? "border-yellow-600 bg-yellow-50 hover:bg-yellow-100 "
                    : "border-gray-200 bg-gray-50 hover:bg-gray-200 sm:min-w-min hover:bg-opacity-50"
                }
               duration-300 cursor-pointer text-gray-700 text-xs  `}
      >
        <MdOutlineMapsHomeWork className="w-4 h-4" />
        {typeActive && selectedTypes.length ? (
          <div className=" text-center text-xs flex gap-1 items-center">
            {selectedTypes.length} نوع اقامتگاه
          </div>
        ) : (
          <span>نوع اقامتگاه</span>
        )}
      </div>

      <div
        id="typeFilter"
        className={`absolute hidden lg:block ${
          showType
            ? "   lg:block top-96   md:top-12 pb-40 md:pb-0 bg-white"
            : " lg:hidden"
        } transition-all duration-500 right-0 left-0 md:right-28 md:left-auto w-full 
            md:w-[700px] bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl`}
      >
        <TypeBox selectedTypes={selectedTypes} />
      </div>
    </>
  );
};

export default TypeFilterSection;
