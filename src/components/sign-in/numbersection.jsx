"use client";
import {
  setMobileNumber,
  setmobileNumberRegistered,
  setPassword,
  setShowMobileNumber,
  setShowSignIn,
  setUserfullname,
} from "@/store/slices/headerListSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { check_phone } from "../../../utils/constants";

const Numbersection = () => {
  const [placeHolder, setPlaceHolder] = useState(false);
  const [numNotValid, setNumNotValid] = useState(false);
  const dispatch = useDispatch();
  const mobileNumber = useSelector(
    (store) => store.headerListSlice.mobileNumber
  );
  const showSignIn = useSelector((store) => store.headerListSlice.showSignIn);
  const showMobileNumber = useSelector(
    (store) => store.headerListSlice.showMobileNumber
  );
  const numberRegistered = useSelector(
    (store) => store.headerListSlice.mobileNumberRegistered
  );
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest("#signinId")) {
        if (numberRegistered == false) {
          dispatch(setShowSignIn(false));
          dispatch(setMobileNumber(""));
          dispatch(setPassword(""));
          dispatch(setmobileNumberRegistered(false));
        }
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [showSignIn, numberRegistered]);
  const countineuHandler = async () => {
    if (mobileNumber) {
      const validphone = check_phone(mobileNumber);
      if (!validphone) setNumNotValid(true);

      if (validphone) {
        const res = await fetch("/api/auth/signupCheck", {
          method: "POST",
          body: JSON.stringify({ phone: mobileNumber }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
       
        dispatch(setShowMobileNumber(false));
        if (data.data.mobileRegistered == true) {
          dispatch(setmobileNumberRegistered(1));
          dispatch(setUserfullname(data.data.fullname))
        } else {
          dispatch(setmobileNumberRegistered(-1));
          dispatch(setUserfullname(""))
        }
      }
    }
  };
  return (
    <div
      id="signinId"
      className={`px-8 py-10 bg-white  rounded-tr-2xl rounded-tl-2xl sm:rounded-2xl  transition-all duration-300
    absolute ${
      showSignIn && showMobileNumber
        ? "top-auto sm:top-1/2 translate-y-0 sm:-translate-y-1/2  bottom-0 sm:bottom-auto opacity-100"
        : "bottom-[-500px] sm:bottom-auto sm:-top-[500px] opacity-0"
    } left-1/2  -translate-x-1/2  flex flex-col justify-center items-start gap-5 w-full sm:w-[500px] `}
    >
      <h2 className="">ورود / ثبت نام</h2>
      <span className="text-gray-700 font-[vazirRegular] ">
        برای ورود یا ثبت نام شماره همراه خود را وارد کنید
      </span>
      <div
        onFocus={() => setPlaceHolder(true)}
        onBlur={() => setPlaceHolder(false)}
        className={`rounded-lg mt-4 border px-3 ${
          numNotValid
            ? "border-red-500"
            : "border-gray-300 focus:border-gray-400 hover:border-gray-400 "
        } 
      flex justify-start items-center w-full h-10 relative`}
      >
        <input
          autoComplete="off"
          maxLength={10}
          minLength={10}
          value={mobileNumber}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              dispatch(setMobileNumber(e.target.value));
            }
            
            if (numNotValid) {
              const validnum = check_phone(e.target.value);
              setNumNotValid(!validnum);
            }
          }}
          dir="ltr"
          type="number"
          className="w-full outline-none h-full"
        />
        <span dir="ltr" className="text-gray-500 w-8 min-w-8  ">
          +98
        </span>
        <span
          className={`bg-white  text-gray-500 font-[vazirRegular]  px-1 absolute ${
            placeHolder || mobileNumber
              ? "-top-2 text-xs"
              : " top-1/2 -translate-y-1/2 text-sm "
          } transition-all duration-300`}
        >
          شماره همراه
        </span>
        {numNotValid ? (
          <div className="text-center absolute top-full pt-1 w-full sm:text-start text-red-500 text-xs">
            شماره وارد شده معتبر نمیباشد
          </div>
        ) : null}
      </div>

      <div className="flex justify-center w-full">
        <button
          onClick={() => countineuHandler()}
          className="w-52 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 font-[vazirRegular] "
        >
          ادامه
        </button>
      </div>
    </div>
  );
};

export default Numbersection;
