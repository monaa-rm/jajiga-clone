"use client";
import { setCalendarValues } from "@/store/slices/calendarSlice";
import { useEffect, useRef, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { BsTrash3 } from "react-icons/bs";
import { Calendar } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import jalaali from "jalaali-js";
import isHoliday from "shamsi-holiday";
import { holidays } from "../../../utils/holidays";
import { formatNumberToPersian } from "../../../utils/constants";

const CalendarPrice = ({
  price,
  singleValue,
  setSingleValue,
  reservedDays,
}) => {
  const values = useSelector((store) => store.calendarSlice.values);
  const [numberOfMonths, setNumberOfMonths] = useState(2);
  const [data, setData] = useState({});
  const ref = useRef();
  const dispatch = useDispatch();

  const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    today.getDate()
  );
  const showTooltip = (e, title) => {
    let spanRect = e.target.getBoundingClientRect();
    let calendarRect = ref.current
      .getElementsByClassName("rmdp-calendar")[0]
      .getBoundingClientRect();
    const tooltipWidth = 195;
    let left = spanRect.left - calendarRect.left;
    let top = spanRect.top - calendarRect.top;
    if (left + tooltipWidth > calendarRect.width) {
      left = calendarRect.width - tooltipWidth;
    }
    setData({
      ...data,
      left: left,
      top: top,
      visible: title ? true : false,
      title,
    });
  };
  const reservedDaysOfYear = reservedDays?.map((day) => day.yearday) ?? [];
  const HolidayDays = holidays.map((day) => day.date);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
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

        dispatch(setCalendarValues([]));
      } else {
        setSingleValue(date);
        dispatch(setCalendarValues(date.map((d) => d.format())));
      }
    }
    if (date.length == 2) {
      if (date[0].format() == date[1].format()) {
        dispatch(setCalendarValues([]));
        setSingleValue([]);
      } else {
        if (date[0] == singleValue[0]) {
          dispatch(setCalendarValues(date.map((d) => d.format())));
          setSingleValue([]);
        } else {
          const secondDate =
            date[0].dayOfYear == singleValue[0]?.dayOfYear ? date[1] : date[0];

          if (
            date[0].year == date[1].year &&
            secondDate.dayOfYear < singleValue[0]?.dayOfYear
          ) {
            dispatch(setCalendarValues([secondDate.format()]));
            setSingleValue([secondDate]);
          } else if (
            date[0].year != date[1].year &&
            secondDate.dayOfYear > singleValue[0]?.dayOfYear
          ) {
            dispatch(setCalendarValues([secondDate.format()]));
            setSingleValue([secondDate]);
          } else {
            dispatch(setCalendarValues(date.map((d) => d.format())));
            setSingleValue([date[0]]);
          }
        }
      }
    }
  };
  return (
    <div className={`w-full`}>
      <Calendar
        weekDays={weekDays}
        ref={ref}
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
        mapDays={({ date, today, selectedDate, currentMonth, isSameDate }) => {
          let props = {};
          //قرمز کردن جمعه
          let isWeekend = date.weekDay.index == 6;
          //پیدا کردن امروز در تاریخ برای چک کردن pending یا accepted
          const acceptModeCheck = reservedDays?.find(
            (item) => item.yearday == date.dayOfYear && date.year == item.year
          );
          // غیر فعال کردن روزهای قبل از امروز
          if (
            date.day < today.day &&
            (today.year == date.year || today.year > date.year) &&
            today.month.index == date.month.index
          ) {
            const title = "امکان انتخاب این تاریخ وجود ندارد.";
            return {
              disabled: true,
              style: {
                color: "#ccc",
                border: "1px solid #",
                padding: "3px",
                borderRadius: "4px",
                background: "#e9e8e8",
              },
              onMouseOver: (e) => showTooltip(e, title),

              onMouseLeave: () => {
                setData({
                  ...data,
                  visible: false,
                  title,
                });
              },
            };
          }

          const isReserve = reservedDays?.filter(
            (day) =>
              day.year == selectedDate[0]?.year &&
              day.yearday > selectedDate[0]?.dayOfYear
          );

          const compareReserved = isReserve?.sort(
            (a, b) => a.yearday - b.yearday
          );
          const isReserveotheryear = reservedDays?.filter(
            (day) =>
              day.year != selectedDate[0]?.year &&
              day.yearday < selectedDate[0]?.dayOfYear
          );

          const compareReservedotherYear = isReserveotheryear?.sort(
            (a, b) => a.yearday - b.yearday
          );

          // اگر تاریخی انتخاب شد، تا روز رزرو بعدی فقط بتونه انتخاب کنه
          if (
            selectedDate.length &&
            compareReserved?.length &&
            selectedDate.length == 1 &&
            selectedDate[0].year == date.year &&
            date.dayOfYear > compareReserved[0]?.yearday
          ) {
            const title = "با توجه به تاریخ سفر،این روز قابل انتخاب نمیباشد.";

            return {
              disabled: true,
              style: {
                background:
                  "repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)",
              },
              onMouseOver: (e) => showTooltip(e, title),
              onMouseLeave: () => {
                setData({
                  ...data,
                  visible: false,
                  title,
                });
              },
            };
          }
          if (
            selectedDate.length &&
            compareReservedotherYear?.length &&
            selectedDate.length == 1 &&
            selectedDate[0].year != date.year &&
            date.dayOfYear > compareReservedotherYear[0]?.yearday
          ) {
            const title = "با توجه به تاریخ سفر،این روز قابل انتخاب نمیباشد.";
            return {
              disabled: true,
              style: {
                background:
                  "repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)",
              },
              onMouseOver: (e) => showTooltip(e, title),
              onMouseLeave: () => {
                setData({
                  ...data,
                  visible: false,
                  title,
                });
              },
            };
          }
          // استایل روز ها
          if (
            // اونایی که روز بعدشون رزرو شده
            reservedDaysOfYear?.includes(date.dayOfYear) &&
            !reservedDaysOfYear?.includes(date.dayOfYear - 1) &&
            date.dayOfYear != 1 &&
            (date.dayOfYear != 366 ?? date.dayOfYear != 365)
          ) {
            const title =
              acceptModeCheck.acceptMode == "pending"
                ? "در انتظار تایید"
                : "این تاریخ پر است.";
            if (
              (selectedDate.length == 1 &&
                selectedDate[0]?.year == date.year &&
                selectedDate[0]?.dayOfYear < date.dayOfYear) ||
              (selectedDate.length == 2 &&
                selectedDate[1]?.year == date.year &&
                selectedDate[1]?.dayOfYear == date.dayOfYear)
            ) {
              return {
                disabled: false,
                style: {
                  color: "#000",
                  cursor: "pointer",
                  background: "none",
                },
                children: (
                  <div
                    className={`flex flex-col p-0 ${
                      (isWeekend ||
                        HolidayDays.includes(
                          `${date.year}/${date.month.number}/${date.day}`
                        )) &&
                      "text-rose-600"
                    } `}
                  >
                    <div style={{ textAlign: "center" }}>
                      {date.format("D")}
                    </div>
                    <div style={{ textAlign: "center", fontSize: "9px" }}>
                      {isWeekend ||
                      HolidayDays.includes(
                        `${date.year}/${date.month.number}/${date.day}`
                      )
                        ? formatNumberToPersian(price.holidays)
                        : formatNumberToPersian(price.notHolidays)}
                    </div>
                  </div>
                ),
              };
            } else {
              const tommarowAcceptModeCheck = reservedDays?.find(
                (item) =>
                  Number(item.yearday) == date.dayOfYear + 1 &&
                  date.year == item.year
              );
              const sameDays = reservedDays.filter(
                (item) =>
                  Number(item.yearday) == date.dayOfYear &&
                  Number(item.year) == date.year
              );
              const tomarrowsameDays = reservedDays.filter(
                (item) =>
                  Number(item.yearday) == date.dayOfYear + 1 &&
                  Number(item.year) == date.year
              );
              let findIndex;
              if (sameDays) {
                findIndex = reservedDays?.findIndex(
                  (item) =>
                    sameDays[0].yearday == item.yearday &&
                    sameDays[0].year == item.year
                );
              }
              return {
                disabled: true,
                style: {
                  color: "#8798ad",
                  cursor: "default",
                  background:
                    values.length &&
                    reservedDaysOfYear.includes(values[0].dayOfYear + 2) &&
                    date.dayOfYear < values[0].dayOfYear + 2 &&
                    date.dayOfYear > values[0].dayOfYear &&
                    selectedDate[1]?.dayOfYear == date.dayOfYear
                      ? "none"
                      : sameDays.length == 2 &&
                        reservedDays[findIndex - 1].acceptMode == "pending" &&
                        reservedDays[findIndex + 2].acceptMode == "accepted"
                      ? "linear-gradient(135deg, rgba(215, 215, 215, 0) 50%, rgba(255, 230, 3, 1) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                      : sameDays.length == 2 &&
                        reservedDays[findIndex - 1].acceptMode == "accepted" &&
                        reservedDays[findIndex + 2].acceptMode == "pending"
                      ? "linear-gradient(135deg, rgba(255, 230, 3, 1) 50%, rgba(215, 215, 215, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                      : sameDays.length == 2 &&
                        sameDays[0].acceptMode == "pending" &&
                        sameDays[1].acceptMode == "pending"
                      ? "rgb(255, 230, 3)"
                      : sameDays.length != 2 &&
                        acceptModeCheck?.acceptMode == "pending" &&
                        tommarowAcceptModeCheck &&
                        tommarowAcceptModeCheck?.acceptMode == "pending"
                      ? "linear-gradient(135deg, rgb(255, 230, 3) 50%, rgb(255, 255, 255) 50% )"
                      : sameDays.length != 2 &&
                        acceptModeCheck?.acceptMode == "pending" &&
                        tomarrowsameDays.length == 2 &&
                        (tomarrowsameDays[0].acceptMode == "pending" ||
                          tomarrowsameDays[1].acceptMode == "pending")
                      ? "linear-gradient(135deg, rgb(255, 230, 3) 50%, rgb(255, 255, 255) 50% )"
                      : sameDays.length != 2 &&
                        acceptModeCheck?.acceptMode == "accepted" &&
                        tommarowAcceptModeCheck &&
                        tommarowAcceptModeCheck?.acceptMode == "accepted"
                      ? "linear-gradient(-45deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                      : "linear-gradient(-45deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)",
                },
                onMouseOver: (e) => showTooltip(e, title),
                onMouseLeave: () => {
                  setData({
                    ...data,
                    visible: false,
                    title,
                  });
                },
              };
            }
          } else if (
            // اونایی که روز بعدشون رزرو شده
            date.dayOfYear == 1 &&
            reservedDaysOfYear?.includes(1) &&
            !reservedDaysOfYear?.includes(366) &&
            (date.dayOfYear != 366 ?? date.dayOfYear != 365) &&
            date.monthIndex == 11
          ) {
            const title =
              acceptModeCheck.acceptMode == "pending"
                ? "در انتظار تایید"
                : "این تاریخ پر است.";

            const acceptMode = reservedDays?.find(
              (item) => item.yearday == date.dayOfYear && date.year == item.year
            );
            if (
              selectedDate.length &&
              selectedDate[0]?.year == date.year &&
              selectedDate[0]?.dayOfYear < date.dayOfYear
            ) {
              return {
                disabled: false,
                style: {
                  color: "#000",
                  cursor: "pointer",
                  background: "none",
                },
                children: (
                  <div
                    className={`flex flex-col p-0 ${
                      (isWeekend ||
                        HolidayDays.includes(
                          `${date.year}/${date.month.number}/${date.day}`
                        )) &&
                      "text-rose-600"
                    } `}
                  >
                    <div style={{ textAlign: "center" }}>
                      {date.format("D")}
                    </div>
                    <div style={{ textAlign: "center", fontSize: "9px" }}>
                      {isWeekend ||
                      HolidayDays.includes(
                        `${date.year}/${date.month.number}/${date.day}`
                      )
                        ? formatNumberToPersian(price.holidays)
                        : formatNumberToPersian(price.notHolidays)}
                    </div>
                  </div>
                ),
              };
            } else {
              const tommarowAcceptModeCheck = reservedDays?.find(
                (item) =>
                  item.yearday == 1 &&
                  item.year == Number(acceptModeCheck?.year) + 1
              );

              const sameDays = reservedDays.filter(
                (item) =>
                  Number(item.yearday) == date.dayOfYear &&
                  Number(item.year) == date.year
              );
              const tomarrowsameDays = reservedDays.filter(
                (item) =>
                  date.dayOfYear == 1 && Number(item.year) + 1 == date.year
              );
              let findIndex;
              if (sameDays) {
                findIndex = reservedDays?.findIndex(
                  (item) =>
                    sameDays[0].yearday == item.yearday &&
                    sameDays[0].year == item.year
                );
              }
              return {
                disabled: true,
                style: {
                  color: "#8798ad",
                  cursor: "default",
                  background:
                    values.length &&
                    reservedDaysOfYear.includes(values[0].dayOfYear + 2) &&
                    date.dayOfYear < values[0].dayOfYear + 2 &&
                    date.dayOfYear > values[0].dayOfYear &&
                    selectedDate[1]?.dayOfYear == date.dayOfYear
                      ? "none"
                      : acceptModeCheck?.acceptMode == "pending"
                      ? "repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                      : "linear-gradient(-45deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)",
                },
                onMouseOver: (e) => showTooltip(e, title),
                onMouseLeave: () => {
                  setData({
                    ...data,
                    visible: false,
                    title,
                  });
                },
              };
            }
          } else if (
            // اونایی که روز بعدشون رزرو شده

            date.dayOfYear != 1 &&
            (date.dayOfYear == 366 ?? date.dayOfYear == 365) &&
            reservedDaysOfYear?.includes(366) &&
            !reservedDaysOfYear?.includes(date.dayOfYear - 1) &&
            date.monthIndex == 11
          ) {
            const title =
              acceptModeCheck.acceptMode == "pending"
                ? "در انتظار تایید"
                : "این تاریخ پر است.";

            const acceptMode = reservedDays?.find(
              (item) => item.yearday == date.dayOfYear && date.year == item.year
            );
            if (
              selectedDate.length &&
              selectedDate[0]?.year == date.year &&
              selectedDate[0]?.dayOfYear < date.dayOfYear
            ) {
              return {
                disabled: false,
                style: {
                  color: "#000",
                  cursor: "pointer",
                  background: "none",
                },
                children: (
                  <div
                    className={`flex flex-col p-0 ${
                      (isWeekend ||
                        HolidayDays.includes(
                          `${date.year}/${date.month.number}/${date.day}`
                        )) &&
                      "text-rose-600"
                    } `}
                  >
                    <div style={{ textAlign: "center" }}>
                      {date.format("D")}
                    </div>
                    <div style={{ textAlign: "center", fontSize: "9px" }}>
                      {isWeekend ||
                      HolidayDays.includes(
                        `${date.year}/${date.month.number}/${date.day}`
                      )
                        ? formatNumberToPersian(price.holidays)
                        : formatNumberToPersian(price.notHolidays)}
                    </div>
                  </div>
                ),
              };
            } else {
              const tommarowAcceptModeCheck = reservedDays?.find(
                (item) =>
                  item.yearday == 1 &&
                  item.year == Number(acceptModeCheck?.year) + 1
              );

              const sameDays = reservedDays.filter(
                (item) =>
                  Number(item.yearday) == date.dayOfYear &&
                  Number(item.year) == date.year
              );
              const tomarrowsameDays = reservedDays.filter(
                (item) =>
                  date.dayOfYear == 1 && Number(item.year) + 1 == date.year
              );
              let findIndex;
              if (sameDays) {
                findIndex = reservedDays?.findIndex(
                  (item) =>
                    sameDays[0].yearday == item.yearday &&
                    sameDays[0].year == item.year
                );
              }
              return {
                disabled: true,
                style: {
                  color: "#8798ad",
                  cursor: "default",
                  background:
                    values.length &&
                    reservedDaysOfYear.includes(values[0].dayOfYear + 2) &&
                    date.dayOfYear < values[0].dayOfYear + 2 &&
                    date.dayOfYear > values[0].dayOfYear &&
                    selectedDate[1]?.dayOfYear == date.dayOfYear
                      ? "none"
                      : acceptModeCheck?.acceptMode == "pending"
                      ? "linear-gradient(135deg, rgb(255, 230, 3) 50%, rgb(255, 255, 255) 50% )"
                      : "linear-gradient(-45deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)",
                },
                onMouseOver: (e) => showTooltip(e, title),
                onMouseLeave: () => {
                  setData({
                    ...data,
                    visible: false,
                    title,
                  });
                },
              };
            }
          } else if (
            //روز قبلش رزرو شده
            (date.dayOfYear != 366 ?? date.dayOfYear != 365) &&
            reservedDaysOfYear.includes(date.dayOfYear) &&
            !reservedDaysOfYear.includes(date.dayOfYear + 1)
          ) {
            return {
              style: {
                background:
                  selectedDate.length &&
                  selectedDate[0]?.dayOfYear == date.dayOfYear
                    ? "none"
                    : acceptModeCheck?.acceptMode == "accepted"
                    ? "linear-gradient(135deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                    : "linear-gradient(135deg, rgb(255, 255, 255) 50%, rgb(255, 230, 3) 50% )",
              },
              children: (
                <div className={`flex flex-col p-0`}>
                  <div style={{ textAlign: "center" }}>{date.format("D")}</div>
                  <div style={{ textAlign: "center", fontSize: "9px" }}>
                    {isWeekend ||
                    HolidayDays.includes(
                      `${date.year}/${date.month.number}/${date.day}`
                    )
                      ? formatNumberToPersian(price.holidays)
                      : formatNumberToPersian(price.notHolidays)}
                  </div>
                </div>
              ),
            };
          } else if (
            //روز قبلش رزرو شده
            (date.dayOfYear == 366 ?? date.dayOfYear == 365) &&
            !reservedDaysOfYear?.includes(1) &&
            reservedDaysOfYear?.includes(366) &&
            date.monthIndex == 11
          ) {
            return {
              style: {
                background:
                  selectedDate.length &&
                  selectedDate[0]?.dayOfYear == date.dayOfYear
                    ? "none"
                    : acceptModeCheck?.acceptMode == "accepted"
                    ? "linear-gradient(135deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                    : "linear-gradient(135deg, rgb(255, 255, 255) 50%, rgb(255, 230, 3) 50% )",
              },
              children: (
                <div className={`flex flex-col p-0`}>
                  <div style={{ textAlign: "center" }}>{date.format("D")}</div>
                  <div style={{ textAlign: "center", fontSize: "9px" }}>
                    {isWeekend ||
                    HolidayDays.includes(
                      `${date.year}/${date.month.number}/${date.day}`
                    )
                      ? formatNumberToPersian(price.holidays)
                      : formatNumberToPersian(price.notHolidays)}
                  </div>
                </div>
              ),
            };
          } else if (
            //هم امروز هم روز بعد رزرو شده
            reservedDaysOfYear.includes(date.dayOfYear) &&
            reservedDaysOfYear.includes(date.dayOfYear + 1) &&
            (date.dayOfYear != 366 ?? date.dayOfYear != 365)
          ) {
            const tommarowAcceptModeCheck = reservedDays?.find(
              (item) =>
                Number(item.yearday) == date.dayOfYear + 1 &&
                date.year == item.year
            );
            const sameDays = reservedDays.filter(
              (item) =>
                Number(item.yearday) == date.dayOfYear &&
                Number(item.year) == date.year
            );
            const tomarrowsameDays = reservedDays.filter(
              (item) =>
                Number(item.yearday) == date.dayOfYear + 1 &&
                Number(item.year) == date.year
            );
            let findIndex;
            if (sameDays) {
              findIndex = reservedDays?.findIndex(
                (item) =>
                  sameDays[0].yearday == item.yearday &&
                  sameDays[0].year == item.year
              );
            } else {
              findIndex = reservedDays?.findIndex(
                (item) =>
                  date.dayOfYear == item.yearday && date.year == item.year
              );
            }
            const title =
              sameDays.length == 2 &&
              reservedDays[findIndex - 1].acceptMode == "pending" &&
              reservedDays[findIndex + 2].acceptMode == "accepted"
                ? "این تاریخ پراست"
                : sameDays.length == 2 &&
                  reservedDays[findIndex - 1].acceptMode == "accepted" &&
                  reservedDays[findIndex + 2].acceptMode == "pending"
                ? "در انتطار تایید"
                : sameDays.length == 2 &&
                  sameDays[0].acceptMode == "pending" &&
                  sameDays[1].acceptMode == "pending"
                ? "در انتطار تایید"
                : sameDays.length != 2 &&
                  acceptModeCheck?.acceptMode == "pending" &&
                  tommarowAcceptModeCheck &&
                  tommarowAcceptModeCheck?.acceptMode == "pending"
                ? "در انتطار تایید"
                : sameDays.length != 2 &&
                  acceptModeCheck?.acceptMode == "pending" &&
                  tomarrowsameDays.length == 2 &&
                  (tomarrowsameDays[0].acceptMode == "pending" ||
                    tomarrowsameDays[1].acceptMode == "pending")
                ? "در انتطار تایید"
                : sameDays.length != 2 &&
                  acceptModeCheck?.acceptMode == "accepted" &&
                  tommarowAcceptModeCheck &&
                  tommarowAcceptModeCheck?.acceptMode == "accepted"
                ? "این تاریخ پراست"
                : "این تاریخ پراست";
            const difbg =
              (acceptModeCheck.situation != "end" &&
                tommarowAcceptModeCheck.situation != "start") ||
              (acceptModeCheck.situation != "start" &&
                reservedDays[findIndex - 1].situation != "end");

            return {
              disabled:
                acceptModeCheck.situation == "end" &&
                tommarowAcceptModeCheck.situation == "start"
                  ? false
                  : acceptModeCheck.situation == "start" &&
                    reservedDays[findIndex - 1].situation == "end" &&
                    selectedDate.length &&
                    ((selectedDate[0]?.year == date.year &&
                      selectedDate[0]?.dayOfYear == date.dayOfYear - 1) ||
                      (selectedDate[0]?.year + 1 == date.year &&
                        selectedDate[0]?.dayOfYear ==
                          reservedDays[findIndex - 1].yearday))
                  ? false
                  : sameDays.length == 2
                  ? true
                  : true,

              onMouseOver: (e) => showTooltip(e, title),
              onMouseLeave: () => {
                setData({
                  ...data,
                  visible: false,
                  title,
                });
              },
              style: {
                background:
                  selectedDate.length &&
                  ((selectedDate[0]?.year == date.year &&
                    selectedDate[0]?.dayOfYear == date.dayOfYear) ||
                    (selectedDate[1]?.year == date.year &&
                      selectedDate[1]?.dayOfYear == date.dayOfYear))
                    ? "none"
                    : acceptModeCheck.situation == "end" &&
                      acceptModeCheck.acceptMode == "accepted" &&
                      tommarowAcceptModeCheck.situation == "start"
                    ? "linear-gradient(135deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                    : acceptModeCheck.situation == "end" &&
                      acceptModeCheck.acceptMode == "pending" &&
                      tommarowAcceptModeCheck.situation == "start"
                    ? "linear-gradient(135deg, rgb(255, 255, 255) 50%, rgb(255, 230, 3) 50% )"
                    : acceptModeCheck.situation == "start" &&
                      acceptModeCheck.acceptMode == "accepted" &&
                      reservedDays[findIndex - 1].situation == "end"
                    ? "linear-gradient(-45deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                    : acceptModeCheck.situation == "start" &&
                      acceptModeCheck.acceptMode == "pending" &&
                      reservedDays[findIndex - 1].situation == "end"
                    ? "linear-gradient(135deg, rgb(255, 230, 3) 50%, rgb(255, 255, 255) 50% )"
                    : sameDays.length == 2 &&
                      reservedDays[findIndex - 1].acceptMode == "pending" &&
                      difbg &&
                      reservedDays[findIndex + 2].acceptMode == "accepted"
                    ? "linear-gradient(135deg, rgba(215, 215, 215, 0) 50%, rgba(255, 230, 3, 1) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length == 2 &&
                      reservedDays[findIndex - 1].acceptMode == "accepted" &&
                      difbg &&
                      reservedDays[findIndex + 2].acceptMode == "pending"
                    ? "linear-gradient(135deg, rgba(255, 230, 3, 1) 50%, rgba(215, 215, 215, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length == 2 &&
                      difbg &&
                      sameDays[0].acceptMode == "pending" &&
                      sameDays[1].acceptMode == "pending"
                    ? "rgb(255, 230, 3)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tommarowAcceptModeCheck &&
                      tommarowAcceptModeCheck?.acceptMode == "pending"
                    ? "rgb(255, 230, 3)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tomarrowsameDays.length == 2 &&
                      (tomarrowsameDays[0].acceptMode == "pending" ||
                        tomarrowsameDays[1].acceptMode == "pending")
                    ? "rgb(255, 230, 3)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tomarrowsameDays.length == 2 &&
                      (tomarrowsameDays[0].acceptMode == "accepted" ||
                        tomarrowsameDays[1].acceptMode == "accepted")
                    ? "linear-gradient(135deg, rgba(215, 215, 215, 0) 50%, rgba(255, 230, 3, 1) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "accepted" &&
                      tomarrowsameDays.length == 2 &&
                      (tomarrowsameDays[0].acceptMode == "pending" ||
                        tomarrowsameDays[1].acceptMode == "pending")
                    ? "linear-gradient(135deg, rgba(255, 230, 3, 1) 50%, rgba(215, 215, 215, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "accepted" &&
                      tommarowAcceptModeCheck &&
                      tommarowAcceptModeCheck?.acceptMode == "accepted"
                    ? "repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tommarowAcceptModeCheck &&
                      difbg &&
                      tommarowAcceptModeCheck?.acceptMode == "accepted"
                    ? "linear-gradient(135deg, rgba(215, 215, 215, 0) 50%, rgba(255, 230, 3, 1) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "accepted" &&
                      tommarowAcceptModeCheck &&
                      tommarowAcceptModeCheck?.acceptMode == "pending"
                    ? "linear-gradient(135deg, rgba(255, 230, 3, 1) 50%, rgba(215, 215, 215, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : "repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)",
              },
            };
          } else if (
            //هم امروز هم روز بعد رزرو شده
            (date.dayOfYear == 366 ?? date.dayOfYear == 365) &&
            reservedDaysOfYear?.includes(1) &&
            reservedDaysOfYear?.includes(366) &&
            date.dayOfYear != 1 &&
            date.monthIndex == 11
          ) {
            const tommarowAcceptModeCheck = reservedDays?.find(
              (item) =>
                item.yearday == 1 &&
                item.year == Number(acceptModeCheck?.year) + 1
            );

            const sameDays = reservedDays.filter(
              (item) =>
                Number(item.yearday) == date.dayOfYear &&
                Number(item.year) == date.year
            );
            const tomarrowsameDays = reservedDays.filter(
              (item) =>
                date.dayOfYear == 1 && Number(item.year) + 1 == date.year
            );
            let findIndex;
            if (sameDays) {
              findIndex = reservedDays?.findIndex(
                (item) =>
                  sameDays[0].yearday == item.yearday &&
                  sameDays[0].year == item.year
              );
            } else {
              findIndex = reservedDays?.findIndex(
                (item) =>
                  date.dayOfYear == item.yearday && date.year == item.year
              );
            }
            const title =
              sameDays.length == 2 &&
              reservedDays[findIndex - 1].acceptMode == "pending" &&
              reservedDays[findIndex + 2].acceptMode == "accepted"
                ? "این تاریخ پراست"
                : sameDays.length == 2 &&
                  reservedDays[findIndex - 1].acceptMode == "accepted" &&
                  reservedDays[findIndex + 2].acceptMode == "pending"
                ? "در انتطار تایید"
                : sameDays.length == 2 &&
                  sameDays[0].acceptMode == "pending" &&
                  sameDays[1].acceptMode == "pending"
                ? "در انتطار تایید"
                : sameDays.length != 2 &&
                  acceptModeCheck?.acceptMode == "pending" &&
                  tommarowAcceptModeCheck &&
                  tommarowAcceptModeCheck?.acceptMode == "pending"
                ? "در انتطار تایید"
                : sameDays.length != 2 &&
                  acceptModeCheck?.acceptMode == "pending" &&
                  tomarrowsameDays.length == 2 &&
                  (tomarrowsameDays[0].acceptMode == "pending" ||
                    tomarrowsameDays[1].acceptMode == "pending")
                ? "در انتطار تایید"
                : sameDays.length != 2 &&
                  acceptModeCheck?.acceptMode == "accepted" &&
                  tommarowAcceptModeCheck &&
                  tommarowAcceptModeCheck?.acceptMode == "accepted"
                ? "این تاریخ پراست"
                : "این تاریخ پراست";
            const difbg =
              (acceptModeCheck.situation != "end" &&
                tommarowAcceptModeCheck.situation != "start") ||
              (acceptModeCheck.situation != "start" &&
                tommarowAcceptModeCheck.situation != "end");

            return {
              disabled:
                acceptModeCheck.situation == "end" &&
                tommarowAcceptModeCheck.situation == "start"
                  ? false
                  : acceptModeCheck.situation == "start" &&
                    reservedDays[findIndex - 1].situation == "end" &&
                    selectedDate.length &&
                    selectedDate[0]?.year == date.year &&
                    selectedDate[0]?.dayOfYear == date.dayOfYear - 1
                  ? false
                  : sameDays.length == 2
                  ? true
                  : true,
              onMouseOver: (e) => showTooltip(e, title),
              onMouseLeave: () => {
                setData({
                  ...data,
                  visible: false,
                  title,
                });
              },
              style: {
                background:
                  selectedDate.length &&
                  ((selectedDate[0]?.year == date.year &&
                    selectedDate[0]?.dayOfYear == date.dayOfYear) ||
                    (selectedDate[1]?.year == date.year &&
                      selectedDate[1]?.dayOfYear == date.dayOfYear))
                    ? "none"
                    : acceptModeCheck.situation == "end" &&
                      acceptModeCheck.acceptMode == "accepted" &&
                      tommarowAcceptModeCheck.situation == "start"
                    ? "linear-gradient(135deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                    : acceptModeCheck.situation == "end" &&
                      acceptModeCheck.acceptMode == "pending" &&
                      tommarowAcceptModeCheck.situation == "start"
                    ? "linear-gradient(135deg, rgb(255, 255, 255) 50%, rgb(255, 230, 3) 50% )"
                    : acceptModeCheck.situation == "start" &&
                      acceptModeCheck.acceptMode == "accepted" &&
                      reservedDays[findIndex - 1].situation == "end"
                    ? "linear-gradient(-45deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                    : acceptModeCheck.situation == "start" &&
                      acceptModeCheck.acceptMode == "pending" &&
                      reservedDays[findIndex - 1].situation == "end"
                    ? "linear-gradient(135deg, rgb(255, 230, 3) 50%, rgb(255, 255, 255) 50% )"
                    : sameDays.length == 2 &&
                      reservedDays[findIndex - 1].acceptMode == "pending" &&
                      difbg &&
                      reservedDays[findIndex + 2].acceptMode == "accepted"
                    ? "linear-gradient(135deg, rgba(215, 215, 215, 0) 50%, rgba(255, 230, 3, 1) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length == 2 &&
                      reservedDays[findIndex - 1].acceptMode == "accepted" &&
                      difbg &&
                      reservedDays[findIndex + 2].acceptMode == "pending"
                    ? "linear-gradient(135deg, rgba(255, 230, 3, 1) 50%, rgba(215, 215, 215, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length == 2 &&
                      difbg &&
                      sameDays[0].acceptMode == "pending" &&
                      sameDays[1].acceptMode == "pending"
                    ? "rgb(255, 230, 3)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tommarowAcceptModeCheck &&
                      tommarowAcceptModeCheck?.acceptMode == "pending"
                    ? "rgb(255, 230, 3)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tomarrowsameDays.length == 2 &&
                      (tomarrowsameDays[0].acceptMode == "pending" ||
                        tomarrowsameDays[1].acceptMode == "pending")
                    ? "rgb(255, 230, 3)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tomarrowsameDays.length == 2 &&
                      (tomarrowsameDays[0].acceptMode == "accepted" ||
                        tomarrowsameDays[1].acceptMode == "accepted")
                    ? "linear-gradient(135deg, rgba(215, 215, 215, 0) 50%, rgba(255, 230, 3, 1) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "accepted" &&
                      tomarrowsameDays.length == 2 &&
                      (tomarrowsameDays[0].acceptMode == "pending" ||
                        tomarrowsameDays[1].acceptMode == "pending")
                    ? "linear-gradient(135deg, rgba(255, 230, 3, 1) 50%, rgba(215, 215, 215, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "accepted" &&
                      tommarowAcceptModeCheck &&
                      tommarowAcceptModeCheck?.acceptMode == "accepted"
                    ? "repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tommarowAcceptModeCheck &&
                      difbg &&
                      tommarowAcceptModeCheck?.acceptMode == "accepted"
                    ? "linear-gradient(135deg, rgba(215, 215, 215, 0) 50%, rgba(255, 230, 3, 1) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "accepted" &&
                      tommarowAcceptModeCheck &&
                      tommarowAcceptModeCheck?.acceptMode == "pending"
                    ? "linear-gradient(135deg, rgba(255, 230, 3, 1) 50%, rgba(215, 215, 215, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : "repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)",
              },
            };
          } else if (
            //هم امروز هم روز بعد رزرو شده
            date.dayOfYear == 1 &&
            (date.dayOfYear != 366 ?? date.dayOfYear != 365) &&
            reservedDaysOfYear?.includes(1) &&
            reservedDaysOfYear?.includes(366) &&
            date.monthIndex != 11
          ) {
            const tommarowAcceptModeCheck = reservedDays?.find(
              (item) =>
                item.yearday == 1 &&
                item.year == Number(acceptModeCheck?.year) + 1
            );

            const sameDays = reservedDays.filter(
              (item) =>
                Number(item.yearday) == date.dayOfYear &&
                Number(item.year) == date.year
            );
            const tomarrowsameDays = reservedDays.filter(
              (item) =>
                date.dayOfYear == 1 && Number(item.year) + 1 == date.year
            );
            let findIndex;
            if (sameDays) {
              findIndex = reservedDays?.findIndex(
                (item) =>
                  sameDays[0].yearday == item.yearday &&
                  sameDays[0].year == item.year
              );
            } else {
              findIndex = reservedDays?.findIndex(
                (item) =>
                  date.dayOfYear == item.yearday && date.year == item.year
              );
            }
            return {
              disabled:
                acceptModeCheck.situation == "end" &&
                tommarowAcceptModeCheck.situation == "start"
                  ? false
                  : acceptModeCheck.situation == "start" &&
                    reservedDays[findIndex - 1].situation == "end" &&
                    selectedDate.length
                  ? false
                  : sameDays.length == 2
                  ? true
                  : true,
              style: {
                background:
                  selectedDate.length &&
                  ((selectedDate[0]?.year == date.year &&
                    selectedDate[0]?.dayOfYear == date.dayOfYear) ||
                    (selectedDate[1]?.year == date.year &&
                      selectedDate[1]?.dayOfYear == date.dayOfYear))
                    ? "none"
                    : acceptModeCheck.situation == "end" &&
                      acceptModeCheck.acceptMode == "accepted" &&
                      tommarowAcceptModeCheck.situation == "start"
                    ? "linear-gradient(135deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                    : acceptModeCheck.situation == "end" &&
                      acceptModeCheck.acceptMode == "pending" &&
                      tommarowAcceptModeCheck.situation == "start"
                    ? "linear-gradient(135deg, rgb(255, 255, 255) 50%, rgb(255, 230, 3) 50% )"
                    : acceptModeCheck.situation == "start" &&
                      acceptModeCheck.acceptMode == "accepted" &&
                      reservedDays[findIndex - 1].situation == "end"
                    ? "linear-gradient(-45deg, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                    : acceptModeCheck.situation == "start" &&
                      acceptModeCheck.acceptMode == "pending" &&
                      reservedDays[findIndex - 1].situation == "end"
                    ? "linear-gradient(135deg, rgb(255, 230, 3) 50%, rgb(255, 255, 255) 50% )"
                    : sameDays.length == 2 &&
                      reservedDays[findIndex - 1].acceptMode == "pending" &&
                      difbg &&
                      reservedDays[findIndex + 2].acceptMode == "accepted"
                    ? "linear-gradient(135deg, rgba(215, 215, 215, 0) 50%, rgba(255, 230, 3, 1) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length == 2 &&
                      reservedDays[findIndex - 1].acceptMode == "accepted" &&
                      difbg &&
                      reservedDays[findIndex + 2].acceptMode == "pending"
                    ? "linear-gradient(135deg, rgba(255, 230, 3, 1) 50%, rgba(215, 215, 215, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length == 2 &&
                      difbg &&
                      sameDays[0].acceptMode == "pending" &&
                      sameDays[1].acceptMode == "pending"
                    ? "rgb(255, 230, 3)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tommarowAcceptModeCheck &&
                      tommarowAcceptModeCheck?.acceptMode == "pending"
                    ? "rgb(255, 230, 3)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tomarrowsameDays.length == 2 &&
                      (tomarrowsameDays[0].acceptMode == "pending" ||
                        tomarrowsameDays[1].acceptMode == "pending")
                    ? "rgb(255, 230, 3)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tomarrowsameDays.length == 2 &&
                      (tomarrowsameDays[0].acceptMode == "accepted" ||
                        tomarrowsameDays[1].acceptMode == "accepted")
                    ? "linear-gradient(135deg, rgba(215, 215, 215, 0) 50%, rgba(255, 230, 3, 1) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "accepted" &&
                      tomarrowsameDays.length == 2 &&
                      (tomarrowsameDays[0].acceptMode == "pending" ||
                        tomarrowsameDays[1].acceptMode == "pending")
                    ? "linear-gradient(135deg, rgba(255, 230, 3, 1) 50%, rgba(215, 215, 215, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "accepted" &&
                      tommarowAcceptModeCheck &&
                      tommarowAcceptModeCheck?.acceptMode == "accepted"
                    ? "repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "pending" &&
                      tommarowAcceptModeCheck &&
                      difbg &&
                      tommarowAcceptModeCheck?.acceptMode == "accepted"
                    ? "linear-gradient(135deg, rgba(215, 215, 215, 0) 50%, rgba(255, 230, 3, 1) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : sameDays.length != 2 &&
                      difbg &&
                      acceptModeCheck?.acceptMode == "accepted" &&
                      tommarowAcceptModeCheck &&
                      tommarowAcceptModeCheck?.acceptMode == "pending"
                    ? "linear-gradient(135deg, rgba(255, 230, 3, 1) 50%, rgba(215, 215, 215, 0) 50%), repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px), repeating-linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(255, 230, 3, 0.8) 0px, rgba(255, 230, 3, 0.8) 6px)"
                    : "repeating-linear-gradient(-45deg, rgb(255, 255, 255), rgb(255, 255, 255) 3px, rgba(215, 215, 215, 0.8) 0px, rgba(215, 215, 215, 0.8) 6px)",
              },
            };
          }
          return {
            children: (
              <div className={`flex flex-col p-0 `}>
                <div
                  className={`text-center ${
                    (isWeekend ||
                      HolidayDays.includes(
                        `${date.year}/${date.month.number}/${date.day}`
                      )) &&
                    "text-rose-600"
                  }`}
                >
                  {date.format("D")}
                </div>
                <div style={{ textAlign: "center", fontSize: "9px" }}>
                  {isWeekend ||
                  HolidayDays.includes(
                    `${date.year}/${date.month.number}/${date.day}`
                  )
                    ? formatNumberToPersian(price.holidays)
                    : formatNumberToPersian(price.notHolidays)}
                </div>
              </div>
            ),
          };
        }}
      >
        <div
          className={`flex justify-between items-center text-gray-600 px-3  mt-2 gap-2`}
        >
          <button
            className="flex items-center gap-2 px-3 py-2 cursor-pointer border-2 border-dashed rounded-md"
            onClick={() => dispatch(setCalendarValues([]))}
          >
            <span> پاک کردن </span>
            <BsTrash3 className="w-5 h-5" />
          </button>
          <h1 dir="rtl" className="text-sm">
            ارقام به تومان میباشد.
          </h1>
        </div>
        <span
          id="calendar-tooltip"
          dir="rtl"
          className={`absolute left-0  top-0 
           backdrop-blur-sm text-white  font-[vazirregular]
           border-gray-100 rounded-md px-2 py-3 text-justify transition-all 
           duration-300 text-xs ${
             data.visible
               ? "visible max-w-48 hidden sm:block  bg-slate-950"
               : "hidden"
           }`}
          style={{
            transform: `translate(${data.left}px, ${data.top - 50}px)`,
          }}
        >
          {data.title}
        </span>
      </Calendar>
    </div>
  );
};

export default CalendarPrice;
