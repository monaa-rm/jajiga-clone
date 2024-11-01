"use client";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import {
  e2p,
  getDatesBetweenShamsi,
  isFriday,
  p2e,
} from "../../../../utils/calendar-funcs";
import { holidays } from "../../../../utils/holidays";
import { LiaTimesSolid } from "react-icons/lia";
import { formatNumberToPersian } from "../../../../utils/constants";

const NumberGuestSection = ({
  capacity,
  max_capacity,
  price,
  discount,
  numberOfGuest,
  setNumberOfGuest,
  totalCost,
  setTotalCost,
}) => {
  const [showNumberGuest, setShowNumberGuest] = useState(false);
  const [holidayItems, setHolidayItems] = useState([]);
  const [notHolidayItems, setNotHolidayItems] = useState([]);
  const [dateValue, setDateValue] = useState([]);
  const [showCostBox, setShowCostBox] = useState(false);
  const guests = Array.from({ length: max_capacity }, (_, i) => i + 1);
  const reserved = useSelector((store) => store.calendarSlice.values);
  const holidayDays = holidays.map((day) => day.date);
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#guestnumberlist")) {
        setShowNumberGuest(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showNumberGuest]);
  useEffect(() => {
    if (reserved.length == 2) {
      const dates = getDatesBetweenShamsi(reserved[0], reserved[1]);
      setDateValue(dates);
      const holiday = [];
      const notHoliday = [];
      dates?.map((day, i) => {
        if (i != dates.length - 1) {
          if (holidayDays.includes(e2p(day)) || isFriday(e2p(day))) {
            holiday.push(day);
          } else {
            notHoliday.push(day);
          }
        }
      });
      setHolidayItems(holiday);
      setNotHolidayItems(notHoliday);
      const holidayCost = holiday.length * price.holidays;
      const notHolidayCost = notHoliday.length * price.notHolidays;
      const extraCost =
        numberOfGuest - capacity > 0
          ? (numberOfGuest - capacity) * price.extra
          : 0;
      const total = holidayCost + notHolidayCost + extraCost;
      setTotalCost(total);
    }
  }, [reserved, numberOfGuest]);
  const resultbill = (guestnum) => {
    setNumberOfGuest(guestnum);
    setShowNumberGuest(false);
    setShowCostBox(true);
    if (reserved.length == 2) {
      const dates = getDatesBetweenShamsi(reserved[0], reserved[1]);
      setDateValue(dates);
      const holiday = [];
      const notHoliday = [];
      dates?.map((day, i) => {
        if (i != dates.length - 1) {
          if (holidayDays.includes(e2p(day)) || isFriday(e2p(day))) {
            holiday.push(day);
          } else {
            notHoliday.push(day);
          }
        }
      });
      setHolidayItems(holiday);
      setNotHolidayItems(notHoliday);
      const holidayCost = holiday.length * price.holidays;
      const notHolidayCost = notHoliday.length * price.notHolidays;
      const extraCost =
        guestnum - capacity > 0 ? (guestnum - capacity) * price.extra : 0;
      const total = holidayCost + notHolidayCost + extraCost;
      setTotalCost(total);
    }
  };
  return (
    <div className=" font-[vazirregular] mt-5  px-5 relative z-10">
      <h3 className=" text-sm text-gray-700 mb-1">تعداد نفرات</h3>

      <div
        onClick={() => setShowNumberGuest(true)}
        className="cursor-pointer flex justify-between items-center gap-3 border px-2 h-12 border-gray-300 rounded-lg text-gray-800"
      >
        <span className="text-sm">
          {numberOfGuest < capacity + 1
            ? `${numberOfGuest} نفر `
            : ` ${numberOfGuest} نفر (${capacity} نفر + ${
                numberOfGuest - capacity
              } نفر اضافه)`}
        </span>
        <FaChevronDown className="w-2 h-2" />
      </div>
      <span className="text-xs text-gray-300 text-justify" dir="rtl">
        تا یک کودک زیر 5 سال در صورتحساب لحاظ نمیگردد.
      </span>
      {showNumberGuest ? (
        <div
          id="guestnumberlist"
          className={` absolute top-6 left-5 right-5 p-2 border border-gray-300 shadow-md shadow-gray-200 rounded-lg max-h-80 overflow-y-scroll bg-white`}
        >
          {guests.map((guestnum) => {
            return guestnum < capacity + 1 ? (
              <div
                key={guestnum}
                onClick={() => resultbill(guestnum)}
                className={`px-3 py-2 border-b border-gray-100 hover:bg-gray-50  transition-all duration-300 ${
                  guestnum == numberOfGuest ? "bg-gray-50" : "bg-none"
                }`}
              >
                {guestnum} نفر
              </div>
            ) : (
              <div
                onClick={() => resultbill(guestnum)}
                className={`px-3 py-2 border-b border-gray-100 hover:bg-gray-50  transition-all duration-300 ${
                  guestnum == numberOfGuest ? "bg-gray-50" : "bg-none"
                }`}
                key={guestnum}
              >
                {guestnum} نفر ({capacity} نفر + {guestnum - capacity} نفر
                اضافه)
              </div>
            );
          })}
        </div>
      ) : null}
      {showCostBox && reserved.length == 2 ? (
        <div className="p-2 border mt-4 flex flex-col gap-2 border-gray-200 rounded-md text-sm text-gray-600">
          {holidayItems.length ? (
            <div className="flex items-center justify-between gap-2 ">
              <span className=" flex items-center gap-1">
                {holidayItems.length} شب <LiaTimesSolid className="w-2 h-2" />{" "}
                {formatNumberToPersian(+price.holidays)} تومان
              </span>
              <div className="flex items-center gap-1 justify-end">
                <span>
                  {formatNumberToPersian(holidayItems.length * +price.holidays)}
                </span>
                <span className="text-xs">نومان</span>
              </div>
            </div>
          ) : null}
          {notHolidayItems.length ? (
            <div className="flex items-center justify-between gap-2 ">
              <span className=" flex items-center gap-1">
                {notHolidayItems.length} شب{" "}
                <LiaTimesSolid className="w-2 h-2" />{" "}
                {formatNumberToPersian(+price.notHolidays)} تومان
              </span>
              <div className="flex items-center gap-1 justify-end">
                <span>
                  {formatNumberToPersian(
                    notHolidayItems.length * +price.notHolidays
                  )}
                </span>
                <span className="text-xs">نومان</span>
              </div>
            </div>
          ) : null}
          <div className="w-full h-[1px] border-b border-b-gray-200"></div>
          <div className="flex justify-between items-center">
            <span className="">
              مجموع اجاره بها - {dateValue.length - 1} شب
            </span>
            <div className="flex items-center justify-end gap-1 ">
              <span className="">
                {formatNumberToPersian(
                  +price.holidays * holidayItems.length +
                    +price.notHolidays * notHolidayItems.length
                )}
              </span>
              <span className="text-xs ">تومان</span>
            </div>
          </div>

          {numberOfGuest - capacity > 0 ? (
            <div className="flex justify-between items-center">
              <span className="">هزینه نفرات اضافه</span>
              <div className="flex items-center justify-end gap-1 ">
                <span className="">
                  {formatNumberToPersian(
                    (numberOfGuest - capacity) * +price.extra
                  )}
                </span>
                <span className="text-xs ">تومان</span>
              </div>
            </div>
          ) : null}
          {discount ? (
            <>
              <div className="flex justify-between items-center">
                <span className="">تخفیف رزرو- {`${discount}%`}</span>
                <div className="flex items-center justify-end gap-1 ">
                  <span className="">
                    {formatNumberToPersian(totalCost * (discount / 100))}
                  </span>
                </div>
              </div>
              <div className="w-full h-[1px] border-b border-b-gray-200"></div>
            </>
          ) : null}

          <div className="flex justify-between items-center font-bold">
            <span className="">مبلغ قابل پرداخت</span>
            <div className="flex items-center justify-end gap-1 ">
              <span className="">
                {discount
                  ? formatNumberToPersian( totalCost - totalCost * (discount / 100))
                  : formatNumberToPersian(totalCost)}
              </span>
              <span className="text-xs ">تومان</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NumberGuestSection;
