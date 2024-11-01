import CostBox from "@/components/elements/filter-boxs/cost-box";
import { setEnabled, setShowCost } from "@/store/slices/filterSlice";
import { useEffect, useState } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const CostFilterSection = () => {
  const costActive = useSelector(
    (store) => store.filterSlice.costFilter.active
  );
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const enabled = useSelector((store) => store.filterSlice.enabled);

  const costValues = useSelector((store) => store.filterSlice.costFilter.cost);
  const showCost = useSelector((store) => store.filterSlice.showCost);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#costFilter")) {
        dispatch(setShowCost(false));
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showCost]);
  useEffect(() => {
    if (showCost) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showCost]);
  return (
    <>
      <div
        onClick={() => {
          !enabled && window.innerWidth < 766 && dispatch(setEnabled(true));
          dispatch(setShowCost(true));
        }}
        className={`hidden  sm:flex  w-full md:w-auto gap-1 justify-center items-center px-3 sm:px-3 md:px-2 lg:px-3 xl:px-1 
           py-2 rounded-full 
              border font-[vazirRegular] transition-all
              ${
                costActive
                  ? "border-yellow-600 bg-yellow-50 hover:bg-yellow-100 "
                  : "border-gray-200 bg-gray-50 hover:bg-gray-200 sm:min-w-min hover:bg-opacity-50"
              }
               duration-300 cursor-pointer text-gray-700 text-xs  `}
      >
        <RiMoneyDollarCircleLine className="w-4 h-4" />
        {costActive && (costValues[0] != 0 || costValues[1] != 25000000) ? (
          <div className=" text-center text-xs flex gap-1 items-center">
            {costValues[0] == 0 ? null : `از  ${formatNumber(costValues[0])}`}
            {costValues[1] == 25000000
              ? null
              : `تا  ${formatNumber(costValues[1])}`}
          </div>
        ) : (
          <span>محدوده اجاره بها</span>
        )}
      </div>

      <div
        id="costFilter"
        className={`absolute hidden sm:block ${
          showCost
            ? "  md:block top-[20rem] costBottom md:h-auto   md:top-12 pb-40 md:pb-0 bg-white"
            : " top-[70rem]  md:hidden"
        } transition-all duration-500 right-0 left-0 md:right-64 md:left-auto w-full 
            md:w-[500px] bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl`}
      >
        <CostBox />
      </div>
    </>
  );
};

export default CostFilterSection;
