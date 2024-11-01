import CalendarFilterBox from "@/components/elements/filter-boxs/calendar-filter-box";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { formatPersianDateRange } from "../../../../../utils/filter-funcs";
import { setEnabled, setShowCalendar } from "@/store/slices/filterSlice";

const CalendarFilterSection = () => {
  const calendarActive = useSelector(
    (store) => store.filterSlice.calendarFilter.active
  );
  const enabled = useSelector((store) => store.filterSlice.enabled);

  const values = useSelector((store) => store.filterSlice.calendarFilter.date);
  const showCalendar = useSelector((store) => store.filterSlice.showCalendar);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#calendarFilter")) {
        dispatch(setShowCalendar(false));
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showCalendar]);
  useEffect(() => {
    if (showCalendar) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showCalendar]);
  return (
    <>
      <div
        onClick={() => {
          !enabled && window.innerWidth < 766 && dispatch(setEnabled(true));
          dispatch(setShowCalendar(true));
        }}
        className={`relative flex w-full md:w-auto gap-1 justify-center items-center px-2 
        sm:px-3 md:px-2 lg:px-1 xl:px-3 py-2 rounded-full border ${
          calendarActive
            ? "border-yellow-600 px-1 md:px-2 lg:px-1 xl:px-3 bg-yellow-50 hover:bg-yellow-100 "
            : "border-gray-200 bg-gray-50 hover:bg-gray-200  hover:bg-opacity-50"
        }
               font-[vazirRegular] transition-all
               duration-300 cursor-pointer text-gray-700  `}
      >
        <CiCalendar className="w-4 h-4" />
        {values.length == 2 && calendarActive ? (
          <span className="text-[10px] sm:text-xs">
            {formatPersianDateRange(values)}
          </span>
        ) : (
          <span className="text-xs">تاریخ سفر</span>
        )}
      </div>

      <div
        id="calendarFilter"
        className={`absolute ${
          showCalendar
            ? "md:block top-[4rem]   md:top-12 pb-40 md:pb-0 bg-white"
            : " top-[60rem] md:hidden"
        } transition-all duration-500 calendarbottom md:h-auto right-0 left-0 md:right-6 md:left-auto w-full 
            md:w-[700px] bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl`}
      >
        <CalendarFilterBox />
      </div>
    </>
  );
};

export default CalendarFilterSection;
