import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { holidays } from "../../../../../utils/holidays";
import { BsTrash3 } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import {
  calendarActive,
  setCalendarFilterValues,
  setShowCalendar,
} from "@/store/slices/filterSlice";

const CalendarFilterBox = () => {
  const [singleValue, setSingleValue] = useState(null);
  const [numberOfMonths, setNumberOfMonths] = useState(1);
  const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  const values = useSelector((store) => store.filterSlice.calendarFilter.date);
  const dispatch = useDispatch();
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate()
  );
  const HolidayDays = holidays.map((day) => day.date);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        // 1024px is usually the breakpoint for "lg"
        setNumberOfMonths(1);
      } else {
        setNumberOfMonths(2);
      }
    };

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const changeSelectDate = (date) => {
    if (date && date.length == 1) {
      if (date[0].format() == values[1]) {
        setSingleValue([]);

        dispatch(setCalendarFilterValues([]));
      } else {
        setSingleValue(date);
        dispatch(setCalendarFilterValues(date.map((d) => d.format())));
      }
    }
    if (date.length == 2) {
      if (date[0].format() == date[1].format()) {
        dispatch(setCalendarFilterValues([]));
        setSingleValue([]);
      } else {
        if (date[0] == singleValue[0]) {
          dispatch(setCalendarFilterValues(date.map((d) => d.format())));
          setSingleValue([]);
        } else {
          const secondDate =
            date[0].dayOfYear == singleValue[0]?.dayOfYear ? date[1] : date[0];

          if (
            date[0].year == date[1].year &&
            secondDate.dayOfYear < singleValue[0]?.dayOfYear
          ) {
            dispatch(setCalendarFilterValues([secondDate.format()]));
            setSingleValue([secondDate]);
          } else if (
            date[0].year != date[1].year &&
            secondDate.dayOfYear > singleValue[0]?.dayOfYear
          ) {
            dispatch(setCalendarFilterValues([secondDate.format()]));
            setSingleValue([secondDate]);
          } else {
            dispatch(setCalendarFilterValues(date.map((d) => d.format())));
            setSingleValue([date[0]]);
          }
        }
      }
    }
  };
  return (
    <div className="w-full p-4 ">
      <div
        className={`w-full z-20 flex justify-around items-center gap-2
       
             rounded-lg border border-gray-300 px-2 h-12`}
      >
        {values.length && values[0] != 0 ? (
          <div
            className={`text-gray-300 flex flex-col gap-1  justify-center items-center`}
          >
            <span>ورود</span>
            <span className="text-sm text-gray-800 ">{values[0]}</span>
          </div>
        ) : (
          <span className={`text-gray-300 text-center py-1  `}>تاریخ ورود</span>
        )}
        <div className="h-8 bg-gray-300 w-[1px]"></div>
        {values.length == 2 ? (
          <div
            className={`text-gray-300 flex flex-col gap-1 justify-center items-center `}
          >
            <span>خروج</span>
            <span className="text-sm text-gray-800 ">{values[1]}</span>
          </div>
        ) : (
          <span className={`text-gray-300 text-center py-1 `}>تاریخ خروج</span>
        )}
      </div>
      <div
        className={`
           w-full bg-white
            shadow-gray-200  pb-4 transition-all duration-300`}
      >
        <Calendar
          weekDays={weekDays}
          style={{ width: "100%", position: "relative" }}
          className="custom-calendar-style"
          minDate={today}
          maxDate={maxDate}
          value={values}
          onChange={(date) => changeSelectDate(date)}
          range
          rangeClick
          numberOfMonths={numberOfMonths}
          disableMonthPicker
          disableYearPicker
          plugins={[]}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          mapDays={({
            date,
            today,
            selectedDate,
            currentMonth,
            isSameDate,
          }) => {
            let props = {};
            let isWeekend = date.weekDay.index == 6;
            const prevDays =
              date.day < today.day &&
              (today.year == date.year || today.year > date.year) &&
              today.month.index == date.month.index;

            return {
              children: (
                <div className={`flex items-center justify-center p-0 `}>
                  <div
                    className={`text-center ${
                      !prevDays &&
                      (isWeekend ||
                        HolidayDays.includes(
                          `${date.year}/${date.month.number}/${date.day}`
                        )) &&
                      "text-rose-600"
                    }`}
                  >
                    {date.format("D")}
                  </div>
                </div>
              ),
            };
          }}
        ></Calendar>
      </div>
      <div className="flex justify-between items-center">
        <button
          className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 border-dashed hover:border-gray-400 rounded-md"
          onClick={() => {
            dispatch(setCalendarFilterValues([]));
            dispatch(calendarActive(false));
          }}
        >
          <BsTrash3 className="w-5 h-5" />
          <span className="text-sm md:text-base"> پاک کردن </span>
        </button>
        <div className="flex justify-end gap-3 items-center">
          <button
            className="flex items-center gap-1 px-3 py-2 cursor-pointer border-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={() => {
              dispatch(setShowCalendar(false));
              dispatch(setCalendarFilterValues([]));
              dispatch(calendarActive(false));
            }}
          >
            <IoCloseOutline className="w-5 h-5" />
            <span className="text-sm md:text-base">بیخیال</span>
          </button>
          <button
            disabled={values.length != 2}
            className="flex items-center gap-1 px-3 py-2 cursor-pointer disabled:cursor-not-allowed  disabled:hover:bg-yellow-600 bg-yellow-500 hover:bg-yellow-600 border-2 rounded-md"
            onClick={() => {
              if (values?.length == 2)
                dispatch(calendarActive(true)),
                  dispatch(setShowCalendar(false));
            }}
          >
            <CiSearch className="w-5 h-5" />
            <span className="text-sm md:text-base">اعمال</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarFilterBox;
