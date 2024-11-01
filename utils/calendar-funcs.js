import jalaali from "jalaali-js";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";

const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
export const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
export const e2p = (inputString) => {
  // تعریف یک دیکشنری برای نگاشت اعداد فارسی به انگلیسی
  const persianToEnglish = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };

  // تبدیل اعداد فارسی به انگلیسی
  const persianNumberPattern = /[۰-۹]/g;
  let englishString = inputString.replace(
    persianNumberPattern,
    (match) => persianToEnglish[match]
  );

  // حذف صفرهای پیش‌رو از اعداد دو رقمی در تاریخ
  const dateParts = englishString.split("/");
  const formattedDateParts = dateParts.map((part) => part.replace(/^0+/, ""));

  // بازگرداندن رشته تاریخ با فرمت صحیح
  return formattedDateParts.join("/");
};

export const getDatesBetweenShamsi = (startShamsiDate, endShamsiDate) => {
  const startDate = new DateObject({
    date: p2e(startShamsiDate),
    calendar: persian,
  })
    .convert(gregorian)
    .toDate();
  const endDate = new DateObject({
    date: p2e(endShamsiDate),
    calendar: persian,
  })
    .convert(gregorian)
    .toDate();
  const dates = getDatesBetween(startDate, endDate);
  return dates.map((date) =>
    new DateObject({ date, calendar: persian }).format("YYYY/MM/DD")
  );
};

export const isFriday = (shamsiDate) => {
  const gregorianDate = new DateObject({
    date: p2e(shamsiDate),
    calendar: persian,
  })
    .convert(gregorian)
    .toDate();
  return gregorianDate.getDay() === 5; // In JavaScript, Friday is represented by 5
};

//--------------------------روز های تعطیل

export const isHoliday = async (shamsiDate) => {
  const [shamsiYear, shamsiMonth, shamsiDay] = shamsiDate.split("/");
  // Convert Shamsi date to Gregorian date
  const {
    gy: gregorianYear,
    gm: gregorianMonth,
    gd: gregorianDay,
  } = jalaali.toGregorian(+shamsiYear, +shamsiMonth, +shamsiDay);
  // Fetch holidays for the Gregorian year
  const holidays = await fetchHolidays(gregorianYear);
  // Check if the given date is a holiday
  // ادامه کد:
  return holidays.some((holiday) => {
    const holidayDate = new Date(holiday.date.iso);
    const holidayYear = holidayDate.getFullYear();
    const holidayMonth = holidayDate.getMonth() + 1; // getMonth() returns month from 0 to 11
    const holidayDay = holidayDate.getDate();

    // Convert Gregorian date to Shamsi date for comparison
    const shamsiHolidayDate = jalaali.toJalaali(
      holidayYear,
      holidayMonth,
      holidayDay
    );

    return (
      shamsiYear === shamsiHolidayDate.jy &&
      shamsiMonth === shamsiHolidayDate.jm &&
      shamsiDay === shamsiHolidayDate.jd
    );
  });
};

export const convertShamsiToDayObject = (shamsiDate) => {
  const [year, month, day] = shamsiDate.split("/");
  // محاسبه yearday
  const firstDayOfYear = jalaali.toGregorian(Number(year), 1, 1);
  const currentDay = jalaali.toGregorian(Number(year), Number(month), Number(day));
  const firstDate = new Date(
    firstDayOfYear.gy,
    firstDayOfYear.gm - 1,
    firstDayOfYear.gd
  );
  
  const currentDate = new Date(currentDay.gy, currentDay.gm - 1, currentDay.gd);

  const yearday =
    Math.floor((currentDate - firstDate) / (1000 * 60 * 60 * 24)) + 1;

  return {
    day: Number(day),
    month: Number(month),
    year: Number(year),
    yearday ,
  };
};

// استخراج reservedDays با acceptMode = "accepted"



export const convertToJalali = (isoDate) => {
  const date = new Date(isoDate);
  const jalaliDate = jalaali.toJalaali(date);
  return `${jalaliDate.jy}/${String(jalaliDate.jm).padStart(2, '0')}/${String(jalaliDate.jd).padStart(2, '0')}`;
};