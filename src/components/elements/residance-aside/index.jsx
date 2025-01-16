"use client";

import {
  discountCities,
  formatNumberToPersian,
} from "../../../../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarPrice from "../calendar-price";
import { FaChevronDown } from "react-icons/fa6";
import NumberGuestSection from "./number-guest-section";
import { useSession } from "next-auth/react";
import { setShowSignIn } from "@/store/slices/headerListSlice";
import { getDatesBetweenShamsi } from "../../../../utils/calendar-funcs";
import { setCalendarValues } from "@/store/slices/calendarSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
const ResidanceAside = ({
  littleBox,
  price,
  asideSticky,
  capacity,
  max_capacity,
  discount,
  residanceId,
  userId,
  rsrvs,
  reqId,
  singleValue,
  setSingleValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [showSideCalendar, setShowSideCalendar] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const router = useRouter();
  const reservedDays = useSelector((store) => store.calendarSlice.values);
  const dispatch = useDispatch();
  const session = useSession();
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#sideclndr")) {
        setShowSideCalendar(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showSideCalendar]);
  useEffect(() => {
    if (invalidDate && reservedDays.length > 1) {
      setInvalidDate(false);
    }
  }, [reservedDays]);
  const reserveHandler = async () => {
    if (reservedDays.length < 2) {
      setInvalidDate(true);
    } else {
      if (session.status == "authenticated") {
        setLoading(true);
        const dates = getDatesBetweenShamsi(reservedDays[0], reservedDays[1]);
        const formData = {
          residanceId,
          reservedBy: reqId._id,
          reservedDays: dates,
          numberOfGuest,
          totalCost,
        };

        const res = await fetch(`/api/residance/reqResidance`, {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });
        setNumberOfGuest(1);
        dispatch(setCalendarValues([]));
        setSingleValue(null);
        setTotalCost(0);
        if (res.status == 200) {
          toast.success('درخواست ارسال شد', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
   
            });
          router.push("/reserves");
          setLoading(false);
        } else {
          setLoading(false);
          toast.warning('مشکلی پیش آمده است', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
      } else {
        dispatch(setShowSignIn(true));
      }
    }
  };
  return (
    <div
      className={` pb-4 ${
        littleBox ? "h-[600px] bg-gray-200 " : null
      }  bg-white ${
        asideSticky
          ? " rounded-2xl rounded-tr-none rounded-tl-none"
          : "rounded-2xl"
      } shadow-lg`}
    >
      <div
        className={` ${
          littleBox ? "hidden" : "flex"
        } text-white py-3 px-5 justify-between items-center bg-zinc-700 ${
          asideSticky
            ? " rounded-br-2xl rounded-bl-2xl"
            : "rounded-tr-2xl rounded-tl-2xl"
        }`}
      >
        <h3 className="" dir="rtl">
          نرخ هرشب از:
        </h3>
        <div className="flex gap-2 items-center">
          <span>
            {price.holidays > price.notHolidays
              ? formatNumberToPersian(price.notHolidays)
              : formatNumberToPersian(price.holidays)}
          </span>
          <span className="text-xs">تومان</span>
        </div>
      </div>
      <div className=" font-[vazirregular] mt-5  px-5 relative">
        <h3 className=" text-sm text-gray-700 mb-1">تاریخ سفر</h3>
        <div
          onClick={() => (!showSideCalendar ? setShowSideCalendar(true) : {})}
          className={`w-full flex justify-around items-center gap-2
          ${showSideCalendar ? "z-10 relative" : "z-auto"}
             rounded-lg border ${
               invalidDate ? "border-red-500" : "border-gray-300"
             }  px-2 h-12`}
        >
          {reservedDays.length && reservedDays[0] != 0 ? (
            <div
              className={`text-gray-300 flex flex-col gap-1  justify-center items-center`}
            >
              <span>ورود</span>
              <span className="text-sm text-gray-800 ">{reservedDays[0]}</span>
            </div>
          ) : (
            <span
              className={`text-gray-300 text-center py-1 ${
                showSideCalendar ? "cursor-pointer" : "cursor-default"
              } `}
            >
              تاریخ ورود
            </span>
          )}
          <div className="h-8 bg-gray-300 w-[1px]"></div>
          {reservedDays.length == 2 ? (
            <div
              className={`text-gray-300 flex flex-col gap-1 justify-center items-center `}
            >
              <span>خروج</span>
              <span className="text-sm text-gray-800 ">{reservedDays[1]}</span>
            </div>
          ) : (
            <span
              className={`text-gray-300 text-center py-1 ${
                showSideCalendar ? "cursor-pointer" : "cursor-default"
              }`}
            >
              تاریخ خروج
            </span>
          )}
        </div>
        <span
          className={`${
            invalidDate ? "block" : "hidden"
          } text-red-500 text-xs `}
        >
          لطفا تاریخ را انتخاب کنید
        </span>
        {showSideCalendar ? (
          <div
            id="sideclndr"
            className={`${
              littleBox ? "w-full" : "w-[680px]"
            } bg-white absolute top-1 left-0
             rounded-2xl border border-gray-200 shadow-md shadow-gray-200 pt-[4.5rem] pb-4 transition-all duration-300`}
          >
            <CalendarPrice
              price={price}
              singleValue={singleValue}
              setSingleValue={setSingleValue}
              reservedDays={rsrvs}
            />
          </div>
        ) : null}
      </div>
      <NumberGuestSection
        price={price}
        discount={discount}
        capacity={capacity}
        max_capacity={max_capacity}
        numberOfGuest={numberOfGuest}
        setNumberOfGuest={setNumberOfGuest}
        totalCost={totalCost}
        setTotalCost={setTotalCost}
      />
      <div className="px-2 py-4 flex justify-center">
        {loading ? (
          <div className="px-6 w-full h-[38px] text-[14px] bg-[rgb(223,187,6)] text-[rgb(51,51,51)] flex gap-2 justify-center items-center leading-[38px] rounded-full py-2">
            <span> در حال ثبت درخواست </span>
            <Image
              src={"/images/loading.svg"}
              alt="loading"
              width={32}
              height={32}
            />
          </div>
        ) : (
          <button className="px-6 rsrvebtn py-2 " onClick={reserveHandler}>
            ثبت درخواست رزرو <span className="text-xs">(رایگان)</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ResidanceAside;
